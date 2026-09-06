import { prisma } from "@/lib/prisma";
import {
  DEMOGRAFI_KATEGORI,
  DEMOGRAFI_KATEGORI_KUNCI,
  DEMOGRAFI_SLUGS,
  type DemografiKategori,
  type RegistriKategori,
} from "@/lib/demografi-kategori";

/**
 * Registri kategori demografi — yang BAWAAN ditambah yang dibuat dinas.
 *
 * 🔴 KENAPA ADA. Delapan kategori bawaan adalah berkas DKB baku dari SIAK.
 * Tapi dinas juga menyusun agregatnya sendiri, dan isinya berubah tiap tahun
 * mengikuti apa yang diminta pimpinan. Selama daftarnya dipaku di kode,
 * menambah satu kategori berarti menunggu pengembang mengubah kode dan
 * menerbitkan ulang portalnya — untuk pekerjaan yang seharusnya milik dinas.
 *
 * ⚠️ SEMUA pemeriksaan "kategori dikenal" di API harus lewat sini. Kolom
 * `kategori` di basis data cuma teks bebas; kalau satu jalur saja memakai
 * `DEMOGRAFI_SLUGS` lama, kategori buatan dinas akan ditolak di jalur itu dan
 * petugas melihat "Kategori tidak dikenal" untuk kategori yang ia buat sendiri.
 */

const REGISTRI_KOSONG: RegistriKategori = { kustom: [], beranda: null };

function bacaKustom(nilai: unknown): DemografiKategori[] {
  if (!Array.isArray(nilai)) return [];

  const hasil: DemografiKategori[] = [];
  for (const k of nilai) {
    if (!k || typeof k !== "object") continue;
    const { slug, label, fileHint } = k as Record<string, unknown>;
    if (typeof slug !== "string" || typeof label !== "string") continue;
    // Slug bawaan tidak boleh dibayangi kategori kustom bernama sama —
    // yang menang jadi tak tentu, dan datanya bercampur di kolom yang sama.
    if (DEMOGRAFI_SLUGS.has(slug)) continue;

    hasil.push({
      slug,
      label,
      fileHint: typeof fileHint === "string" ? fileHint : "dibuat dinas",
    });
  }

  return hasil;
}

/** Isi registri apa adanya. Tidak pernah melempar — registri rusak = kosong. */
export async function bacaRegistri(): Promise<RegistriKategori> {
  try {
    const row = await prisma.staticContent.findUnique({
      where: { kunci: DEMOGRAFI_KATEGORI_KUNCI },
    });
    if (!row) return REGISTRI_KOSONG;

    const konten = (row.konten ?? {}) as Record<string, unknown>;

    return {
      kustom: bacaKustom(konten.kustom),
      beranda: Array.isArray(konten.beranda)
        ? konten.beranda.filter((b): b is string => typeof b === "string")
        : null,
    };
  } catch {
    return REGISTRI_KOSONG;
  }
}

/** Seluruh kategori: bawaan dulu, lalu buatan dinas. */
export async function daftarKategori(): Promise<DemografiKategori[]> {
  const { kustom } = await bacaRegistri();

  return [...DEMOGRAFI_KATEGORI, ...kustom];
}

/** Kategori ini dikenal? Dipakai SEMUA endpoint sebagai gantinya DEMOGRAFI_SLUGS. */
export async function slugDikenal(slug: string): Promise<boolean> {
  if (DEMOGRAFI_SLUGS.has(slug)) return true;

  const { kustom } = await bacaRegistri();

  return kustom.some((k) => k.slug === slug);
}

/**
 * Kategori yang tampil di halaman utama.
 *
 * `beranda: null` berarti belum pernah diatur — dan itu BUKAN daftar kosong.
 * Portal yang sudah berjalan tidak boleh mendadak kehilangan seluruh tabel
 * demografinya hanya karena pengaturan barunya belum pernah disentuh.
 */
export async function kategoriTampil(): Promise<DemografiKategori[]> {
  const { kustom, beranda } = await bacaRegistri();
  const semua = [...DEMOGRAFI_KATEGORI, ...kustom];

  if (beranda === null) return semua;

  const boleh = new Set(beranda);

  return semua.filter((k) => boleh.has(k.slug));
}

/** Tulis registri (dipakai endpoint admin). */
export async function tulisRegistri(
  registri: RegistriKategori,
  olehUid: number,
): Promise<void> {
  /*
   * Kolom `konten` bertipe Json Prisma, yang menolak antarmuka bernama —
   * `DemografiKategori[]` tidak punya index signature. Disalin jadi objek
   * biasa supaya bentuk yang tersimpan tetap persis seperti yang dibaca
   * kembali oleh `bacaRegistri`.
   */
  const konten = {
    kustom: registri.kustom.map((k) => ({
      slug: k.slug,
      label: k.label,
      fileHint: k.fileHint,
    })),
    beranda: registri.beranda,
  };

  await prisma.staticContent.upsert({
    where: { kunci: DEMOGRAFI_KATEGORI_KUNCI },
    create: {
      kunci: DEMOGRAFI_KATEGORI_KUNCI,
      judul: "Kategori Data Demografi",
      konten,
      updatedBy: olehUid,
    },
    update: { konten, updatedBy: olehUid },
  });
}
