/**
 * Periode (tahun + semester) pada data demografi.
 *
 * 🔴 SIFAT YANG DIJAGA. Sebelum ada periode, `m_demografi_wilayah` berkunci
 * `(kategori, kode)` — satu baris per wilayah — dan impor MENGGANTI TOTAL isi
 * kategorinya. Mengunggah DKB semester berikutnya karena itu MENGHAPUS
 * semester sebelumnya, tanpa peringatan apa pun. Uji di berkas ini ada untuk
 * memastikan kerusakan itu tidak bisa kembali.
 *
 * ⚠️ Uji ini MENULIS ke basis data. Seluruh barisnya memakai kategori dan
 * tahun khusus uji supaya tidak mungkin bertabrakan dengan data dinas, dan
 * dibersihkan di akhir bagaimanapun hasilnya.
 *
 *     npx tsx scripts/uji-periode.ts
 */
import { PrismaClient } from "@prisma/client";
import {
  kueriPeriode,
  labelPeriode,
  labelPeriodePanjang,
  periodeDariQuery,
  periodeSama,
  semesterSah,
  tahunSah,
  gabungPeriode,
} from "../lib/periode-demografi";
import { pilihPeriode } from "../lib/demografi-periode";

const prisma = new PrismaClient();

/** Tahun yang mustahil dipakai data sungguhan. */
const TAHUN_UJI = 2001;
const KATEGORI = "jenis-kelamin";
const KODE = "9999999";

let lolos = 0;
let gagal = 0;

function cek(nama: string, benar: boolean, catatan = "") {
  if (benar) {
    lolos += 1;
    console.log("✓ ", nama);
  } else {
    gagal += 1;
    console.log("✗ ", nama, catatan ? `— ${catatan}` : "");
  }
}

const sama = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

async function tulis(semester: number, nilai: number) {
  await prisma.demografiWilayah.create({
    data: {
      kategori: KATEGORI,
      tahun: TAHUN_UJI,
      semester,
      kode: KODE,
      wilayah: "WILAYAH UJI",
      level: 4,
      parentKode: null,
      data: { L: nilai, P: nilai, JML: nilai * 2 },
    },
  });
}

async function bersihkan() {
  await prisma.demografiWilayah.deleteMany({ where: { tahun: TAHUN_UJI } });
}

async function main() {
  await bersihkan();

  // ── Murni, tanpa basis data ────────────────────────────────────────────
  cek("label memakai angka romawi", labelPeriode(2024, 1) === "Semester I 2024");
  cek("label panjang menyebut DKB", labelPeriodePanjang(2024, 2) === "DKB Semester II 2024");
  cek("semester hanya 1 dan 2",
    semesterSah(1) && semesterSah(2) && !semesterSah(0) && !semesterSah(3) && !semesterSah("dua"));
  cek("tahun di luar akal ditolak", !tahunSah(1899) && tahunSah(2024) && !tahunSah(new Date().getFullYear() + 2));
  cek("tahun depan diterima — DKB sem II kadang baru datang awal tahun berikutnya",
    tahunSah(new Date().getFullYear() + 1));
  cek("periodeSama membandingkan isinya", periodeSama({ tahun: 2024, semester: 2 }, { tahun: 2024, semester: 2 }));
  cek("periodeSama menolak null", !periodeSama(null, { tahun: 2024, semester: 2 }));
  cek("kueriPeriode kosong bila null", kueriPeriode(null) === "");
  cek("kueriPeriode benar", kueriPeriode({ tahun: 2025, semester: 1 }) === "tahun=2025&semester=1");

  cek("query tanpa periode = null",
    periodeDariQuery(new URLSearchParams("")) === null);
  cek("query separuh ditolak",
    periodeDariQuery(new URLSearchParams("tahun=2024")) === false);
  cek("query ngawur ditolak",
    periodeDariQuery(new URLSearchParams("tahun=2024&semester=9")) === false);
  cek("query sah terbaca",
    sama(periodeDariQuery(new URLSearchParams("tahun=2025&semester=1")), { tahun: 2025, semester: 1 }));

  cek("gabungPeriode membuang kembar & mengurutkan terbaru dulu",
    sama(
      gabungPeriode(
        [{ tahun: 2024, semester: 2, baris: 10 }],
        [{ tahun: 2025, semester: 1, baris: 5 }, { tahun: 2024, semester: 2, baris: 3 }],
      ),
      [
        { tahun: 2025, semester: 1, baris: 5 },
        { tahun: 2024, semester: 2, baris: 10 },
      ],
    ));

  const tersedia = [
    { tahun: 2025, semester: 1, baris: 5 },
    { tahun: 2024, semester: 2, baris: 10 },
  ];
  cek("tanpa permintaan → periode terbaru",
    sama(pilihPeriode(null, tersedia), { tahun: 2025, semester: 1 }));
  cek("permintaan yang ada dihormati",
    sama(pilihPeriode({ tahun: 2024, semester: 2 }, tersedia), { tahun: 2024, semester: 2 }));
  cek("permintaan ke periode kosong jatuh ke terbaru, bukan halaman kosong",
    sama(pilihPeriode({ tahun: 2020, semester: 1 }, tersedia), { tahun: 2025, semester: 1 }));
  cek("tabel kosong → null", pilihPeriode(null, []) === null);

  // ── Dengan basis data ──────────────────────────────────────────────────
  await tulis(1, 100);
  await tulis(2, 200);

  const dua = await prisma.demografiWilayah.count({ where: { tahun: TAHUN_UJI } });
  cek("dua semester boleh berdampingan", dua === 2, `dapat ${dua}`);

  let kembar = false;
  try {
    await tulis(1, 999);
  } catch {
    kembar = true;
  }
  cek("wilayah yang sama tidak boleh kembar dalam satu periode", kembar);

  const sem1 = await prisma.demografiWilayah.findMany({
    where: { tahun: TAHUN_UJI, semester: 1 },
  });
  cek("saringan periode hanya mengambil periodenya",
    sem1.length === 1 && (sem1[0].data as Record<string, number>).L === 100);

  /*
   * 🔴 Inti dari seluruh perubahan ini: menulis periode baru TIDAK BOLEH
   * menyentuh periode lama. Kalau uji ini gagal, dinas kehilangan data.
   */
  await prisma.$transaction([
    prisma.demografiWilayah.deleteMany({
      where: { kategori: KATEGORI, tahun: TAHUN_UJI, semester: 2 },
    }),
    prisma.demografiWilayah.createMany({
      data: [{
        kategori: KATEGORI, tahun: TAHUN_UJI, semester: 2, kode: KODE,
        wilayah: "WILAYAH UJI", level: 4, parentKode: null,
        data: { L: 555, P: 555, JML: 1110 },
      }],
    }),
  ]);

  const lama = await prisma.demografiWilayah.findFirst({
    where: { tahun: TAHUN_UJI, semester: 1 },
  });
  cek("menulis periode baru tidak menghapus yang lama",
    !!lama && (lama.data as Record<string, number>).L === 100,
    lama ? `L=${(lama.data as Record<string, number>).L}` : "baris Semester I hilang");

  const rekap = (await prisma.demografiWilayah.groupBy({
    by: ["tahun", "semester"],
    where: { tahun: TAHUN_UJI },
    _count: { _all: true },
    orderBy: [{ tahun: "desc" }, { semester: "desc" }],
  }));
  cek("periode tersedia terurut terbaru dulu",
    rekap.length === 2 && rekap[0].semester === 2 && rekap[1].semester === 1);

  await bersihkan();

  console.log(`\n${lolos} lolos, ${gagal} gagal`);
  if (gagal) process.exitCode = 1;
}

main()
  .catch(async (e) => {
    console.error(e);
    await bersihkan().catch(() => {});
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
