/** Kategori data demografi (media informasi). Slug = nilai kolom `kategori` di DB. */
export interface DemografiKategori {
  slug: string;
  label: string;
  /** Petunjuk nama file Excel Dukcapil yang sesuai (untuk bantuan admin). */
  fileHint: string;
}

export const DEMOGRAFI_KATEGORI: DemografiKategori[] = [
  { slug: "jenis-kelamin", label: "Jenis Kelamin", fileHint: "AGR_JK_DUSUN…" },
  { slug: "agama", label: "Agama", fileHint: "AGR_AGAMA…" },
  { slug: "gol-darah", label: "Golongan Darah", fileHint: "AGR_DRH_DUSUN / AGR_GOL_DRH…" },
  { slug: "pekerjaan", label: "Pekerjaan", fileHint: "AGR_PEKERJAAN / AGR_PKRJN_DUSUN…" },
  { slug: "pendidikan", label: "Pendidikan", fileHint: "AGR_PDDKN_DUSUN…" },
  { slug: "status-kawin", label: "Status Perkawinan", fileHint: "AGR_STAT_KWN_DUSUN…" },
  { slug: "kk", label: "Kartu Keluarga", fileHint: "AGR_KK_DUSUN…" },
  { slug: "wajib-ktp", label: "Wajib KTP", fileHint: "AGR_WKTP…" },
];

export const DEMOGRAFI_SLUGS = new Set(DEMOGRAFI_KATEGORI.map((k) => k.slug));

export function getDemografiKategori(slug: string): DemografiKategori | undefined {
  return DEMOGRAFI_KATEGORI.find((k) => k.slug === slug);
}

/**
 * Pola nama berkas SIAK per kategori.
 *
 * 🔴 KENAPA ADA. Petugas menerima satu paket berkas DKB sekaligus dan
 * mengunggahnya bersama-sama; ia tidak menghafal berkas mana milik kategori
 * mana. Selama kategori harus ditunjuk lebih dulu lewat tombol unggah pada
 * kartunya masing-masing, salah taruh cuma soal waktu — dan salah taruh berarti
 * data pekerjaan tertimpa data pendidikan tanpa peringatan.
 *
 * ⚠️ Nama berkas Dukcapil TIDAK seragam antar kabupaten: ada AGR_DRH_DUSUN, ada
 * AGR_GOL_DRH; ada AGR_PEKERJAAN, ada AGR_PKRJN_DUSUN. Karena itu polanya
 * longgar, dan nama kategori dalam bahasa Indonesia ikut dikenali — dinas yang
 * menamai berkasnya sendiri ("Data Pendidikan 2027.xlsx") tetap terbaca.
 */
const POLA_BERKAS: { slug: string; pola: RegExp }[] = [
  { slug: "jenis-kelamin", pola: /(agr[_\- ]*jk)|(jenis[_\- ]*kelamin)/i },
  { slug: "agama", pola: /(agr[_\- ]*agama)|(\bagama\b)/i },
  { slug: "gol-darah", pola: /(agr[_\- ]*(gol[_\- ]*)?drh)|(gol(ongan)?[_\- ]*darah)/i },
  { slug: "pekerjaan", pola: /(agr[_\- ]*(pekerjaan|pkrjn))|(\bpekerjaan\b)/i },
  { slug: "pendidikan", pola: /(agr[_\- ]*pddkn)|(\bpendidikan\b)/i },
  { slug: "status-kawin", pola: /(agr[_\- ]*stat[_\- ]*kwn)|(status[_\- ]*(per)?kawin)/i },
  { slug: "kk", pola: /(agr[_\- ]*kk)|(kartu[_\- ]*keluarga)/i },
  { slug: "wajib-ktp", pola: /(agr[_\- ]*wktp)|(wajib[_\- ]*ktp)/i },
];

/**
 * Tebak kategori dari NAMA BERKAS. `undefined` bila tidak ada yang cocok —
 * pemanggil wajib mengatakannya kepada petugas, bukan menebak sembarang
 * kategori: menaruh berkas di kategori yang salah menimpa data yang benar.
 */
export function deteksiKategori(namaBerkas: string): DemografiKategori | undefined {
  const nama = namaBerkas.replace(/\.xlsx$/i, "");
  const cocok = POLA_BERKAS.find((p) => p.pola.test(nama));

  return cocok ? getDemografiKategori(cocok.slug) : undefined;
}
