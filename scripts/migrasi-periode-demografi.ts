/**
 * Migrasi: beri dimensi waktu pada `m_demografi_wilayah` — tahun + semester.
 *
 * 🔴 MASALAH YANG DIPERBAIKI. Kunci unik lama `(kategori, kode)` memaksa satu
 * baris per wilayah per kategori. Impor mengganti total isi kategorinya, jadi
 * mengunggah DKB semester berikutnya MENGHAPUS semester sebelumnya. Dinas
 * kehilangan datanya, dan tidak ada satu pun cara membandingkan dua semester.
 *
 * ⚠️ DIJALANKAN SEBAGAI SQL, BUKAN `prisma db push`. Push tidak bisa mengisi
 * kolom NOT NULL yang baru pada tabel yang sudah berisi ribuan baris — ia akan
 * menolak, atau (kalau diberi default) menaruh 0 dan melahirkan periode
 * "tahun 0" yang ikut muncul di pemilih.
 *
 * ⚠️ Baris lama ditandai Semester II 2024, bukan periode kosong. Badge beranda
 * keempat portal selama ini memang tertulis "DKB Semester II 2024"; menandainya
 * demikian hanya menuliskan apa yang sudah diakui halaman depan.
 *
 * Aman dijalankan berulang — setiap langkah diperiksa dulu.
 *
 *     npx tsx scripts/migrasi-periode-demografi.ts
 */
import { PrismaClient } from "@prisma/client";
import { SEMESTER_BAWAAN, TAHUN_BAWAAN } from "../lib/periode-demografi";

const prisma = new PrismaClient();

const TABEL = "m_demografi_wilayah";

async function adaKolom(nama: string): Promise<boolean> {
  const r = await prisma.$queryRawUnsafe<{ n: bigint }[]>(
    `SELECT COUNT(*) n FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
    TABEL,
    nama,
  );

  return Number(r[0]?.n ?? 0) > 0;
}

async function adaIndeks(nama: string): Promise<boolean> {
  const r = await prisma.$queryRawUnsafe<{ n: bigint }[]>(
    `SELECT COUNT(*) n FROM information_schema.STATISTICS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND INDEX_NAME = ?`,
    TABEL,
    nama,
  );

  return Number(r[0]?.n ?? 0) > 0;
}

async function main() {
  const tulis = process.argv.includes("--tulis");

  const punyaTahun = await adaKolom("tahun");
  const punyaSemester = await adaKolom("semester");
  const kunciLama = await adaIndeks("m_demografi_wilayah_kategori_kode_key");
  const kunciBaru = await adaIndeks("m_demografi_wilayah_periode_kode_key");
  const indeksBaru = await adaIndeks("m_demografi_wilayah_periode_level_idx");

  const total = await prisma.demografiWilayah.count().catch(() => -1);

  console.log("Keadaan sekarang");
  console.log("  kolom tahun     :", punyaTahun ? "ADA" : "belum");
  console.log("  kolom semester  :", punyaSemester ? "ADA" : "belum");
  console.log("  kunci unik lama :", kunciLama ? "ADA" : "sudah dilepas");
  console.log("  kunci unik baru :", kunciBaru ? "ADA" : "belum");
  console.log("  indeks periode  :", indeksBaru ? "ADA" : "belum");
  console.log("  baris tabel     :", total >= 0 ? total : "(belum bisa dihitung)");

  const langkah: string[] = [];

  if (!punyaTahun) {
    // Sementara NULL — diisi dulu, baru dijadikan wajib.
    langkah.push(`ALTER TABLE ${TABEL} ADD COLUMN tahun SMALLINT NULL AFTER kategori`);
  }
  if (!punyaSemester) {
    langkah.push(`ALTER TABLE ${TABEL} ADD COLUMN semester TINYINT NULL AFTER tahun`);
  }
  if (!punyaTahun || !punyaSemester) {
    langkah.push(
      `UPDATE ${TABEL} SET tahun = ${TAHUN_BAWAAN}, semester = ${SEMESTER_BAWAAN} WHERE tahun IS NULL OR semester IS NULL`,
      `ALTER TABLE ${TABEL} MODIFY tahun SMALLINT NOT NULL`,
      `ALTER TABLE ${TABEL} MODIFY semester TINYINT NOT NULL`,
    );
  }
  if (kunciLama) {
    langkah.push(`ALTER TABLE ${TABEL} DROP INDEX m_demografi_wilayah_kategori_kode_key`);
  }
  if (!kunciBaru) {
    langkah.push(
      `ALTER TABLE ${TABEL} ADD UNIQUE m_demografi_wilayah_periode_kode_key (kategori, tahun, semester, kode)`,
    );
  }
  if (!indeksBaru) {
    langkah.push(
      `ALTER TABLE ${TABEL} ADD INDEX m_demografi_wilayah_periode_level_idx (kategori, tahun, semester, level)`,
    );
  }

  if (langkah.length === 0) {
    console.log("\nSudah sesuai — tidak ada yang perlu dijalankan.");
    return;
  }

  console.log(`\n${langkah.length} langkah:`);
  langkah.forEach((l, i) => console.log(`  ${i + 1}. ${l}`));

  if (!tulis) {
    console.log("\n(uji coba) Tidak ada yang ditulis. Tambahkan --tulis untuk menjalankan.");
    return;
  }

  for (const l of langkah) {
    await prisma.$executeRawUnsafe(l);
    console.log("  ✓", l.slice(0, 78));
  }

  const rekap = await prisma.$queryRawUnsafe<{ tahun: number; semester: number; n: bigint }[]>(
    `SELECT tahun, semester, COUNT(*) n FROM ${TABEL} GROUP BY tahun, semester ORDER BY tahun DESC, semester DESC`,
  );

  console.log("\nHasil:");
  for (const r of rekap) {
    console.log(`  Semester ${r.semester === 2 ? "II" : "I"} ${r.tahun} → ${Number(r.n)} baris`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
