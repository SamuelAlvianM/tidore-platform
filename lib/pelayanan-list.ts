/**
 * Daftar kanonik layanan permohonan online, dan penerjemah kunci antar tiga
 * kosakata slug yang sudah terlanjur hidup berdampingan di portal ini.
 *
 * 🔴 KENAPA PENERJEMAHNYA ADA — INI PERNAH MEMATIKAN SELURUH FITURNYA.
 * Satu layanan disebut dengan tiga nama berbeda:
 *
 *   `modalType`      `kartuKeluargaPisahKK`   ← disimpan pengaturan visibilitas
 *   slug rute publik `kk-pisah-kk`            ← lib/permohonan-layanan.ts
 *   slug formulir    `kk-pisah`               ← lib/layanan-forms.ts & API
 *
 * Pengaturan menyimpan `modalType`, sementara pemilih layanan warga memeriksa
 * `tersembunyi.has(slug) || tersembunyi.has(title)`. Tidak satu pun dari 15
 * layanan pernah cocok. Admin mencentang "sembunyikan", autosave menjawab
 * "tersimpan", dan layanannya tetap terbuka untuk warga maupun petugas —
 * tanpa galat, tanpa peringatan, tanpa satu pun tanda bahwa perintahnya
 * hilang di antara dua kosakata.
 *
 * (Saat ini diperiksa, basis data memuat 11 layanan bertanda tersembunyi.
 * Kesebelasnya masih menerima permohonan.)
 *
 * ⚠️ `modalType` DIPERTAHANKAN sebagai kunci simpan, bukan diganti slug.
 * Baris `pelayanan.visibilitas` yang sudah ada memakai nama-nama itu; menukar
 * kosakatanya berarti seluruh pilihan yang pernah disetel dinas terbaca
 * sebagai layanan yang tidak dikenal, lalu diam-diam hilang. Yang ditambahkan
 * di sini adalah `slugForm` — jembatan ke kosakata yang dipakai formulir dan
 * API, sehingga satu kunci simpan bisa dibaca semua pihak.
 */

export interface PelayananItem {
  /** Kunci simpan di StaticContent. Warisan; jangan diganti. */
  modalType: string;
  /**
   * Slug skema formulir (`lib/layanan-forms.ts`) — sekaligus slug yang dipakai
   * API catch-all `/api/[layanan]/[action]`. Inilah kosakata yang dipakai
   * seluruh pemeriksaan visibilitas setelah diterjemahkan.
   */
  slugForm: string;
  title: string;
  category: string;
}

/** Kunci StaticContent tempat menyimpan daftar layanan yang disembunyikan. */
export const PELAYANAN_VISIBILITY_KEY = "pelayanan.visibilitas";

export const PELAYANAN_LIST: PelayananItem[] = [
  { modalType: "konsolidasi", slugForm: "konsolidasi-update-data", title: "Konsolidasi Update Data", category: "data" },
  { modalType: "aktaKelahiranNikTidakAda", slugForm: "akta-kelahiran-nik-tidak-ada", title: "Akta Kelahiran (Blm Ada Nik)", category: "akta" },
  { modalType: "aktaKelahiranNikAda", slugForm: "akta-kelahiran-nik-ada", title: "Akta Kelahiran (Ada Nik)", category: "akta" },
  { modalType: "kartuKeluargaPerubahanData", slugForm: "kk-perubahan-biodata", title: "Kartu Keluarga Perubahan Biodata", category: "kk" },
  { modalType: "kartuKeluargaPisahKK", slugForm: "kk-pisah", title: "Kartu Keluarga Pisah KK", category: "kk" },
  { modalType: "kartuKeluargaNumpang", slugForm: "kk-numpang", title: "Kartu Keluarga Numpang KK", category: "kk" },
  { modalType: "kartuKeluargaPenambahanAnak", slugForm: "kk-tambah-anak", title: "Kartu Keluarga Penambahan Anak", category: "kk" },
  { modalType: "kartuKeluargaCetakUlang", slugForm: "kk-cetak-ulang", title: "Kartu Keluarga Cetak Ulang", category: "kk" },
  { modalType: "aktaPerceraian", slugForm: "akta-perceraian", title: "Akta Perceraian", category: "akta" },
  { modalType: "aktaKematian", slugForm: "akta-kematian", title: "Akta Kematian", category: "akta" },
  { modalType: "aktaPerkawinan", slugForm: "akta-nikah", title: "Akta Perkawinan", category: "akta" },
  { modalType: "kartuIdentitasAnak", slugForm: "kia", title: "Kartu Identitas Anak (KIA)", category: "identitas" },
  { modalType: "perpindahanPenduduk", slugForm: "perpindahan-penduduk", title: "Perpindahan Penduduk", category: "pindah" },
  { modalType: "kedatanganPenduduk", slugForm: "kedatangan", title: "Kedatangan Penduduk", category: "pindah" },
  { modalType: "ktpElektronik", slugForm: "ktpel", title: "KTP Elektronik", category: "identitas" },
];

/** Label kategori untuk pengelompokan di UI pengaturan. */
export const PELAYANAN_KATEGORI: Record<string, string> = {
  data: "Data Kependudukan",
  akta: "Akta Pencatatan Sipil",
  kk: "Kartu Keluarga",
  identitas: "Identitas",
  pindah: "Pindah / Datang",
};

/**
 * Terjemahkan daftar tersimpan menjadi himpunan SLUG FORMULIR.
 *
 * Menerima kunci dalam kosakata mana pun — `modalType`, slug formulir, atau
 * judul — supaya baris `pelayanan.visibilitas` yang sudah ada, termasuk yang
 * ditulis sebelum jembatan ini dibuat, tetap terbaca. Kunci yang tidak
 * dikenali DIABAIKAN, bukan diteruskan: satu-satunya hal yang boleh menutup
 * layanan adalah nama yang benar-benar menunjuk layanan itu.
 */
export function slugTersembunyi(tersimpan: unknown): Set<string> {
  if (!Array.isArray(tersimpan)) return new Set();

  const peta = new Map<string, string>();
  for (const p of PELAYANAN_LIST) {
    peta.set(p.modalType, p.slugForm);
    peta.set(p.slugForm, p.slugForm);
    peta.set(p.title, p.slugForm);
  }

  const hasil = new Set<string>();
  for (const k of tersimpan) {
    const slug = typeof k === "string" ? peta.get(k) : undefined;
    if (slug) hasil.add(slug);
  }
  return hasil;
}
