/**
 * Registry kategori dokumen publikasi (tabel t_produk, kolom `jenis`).
 * Satu sumber kebenaran untuk: dashboard upload (Dokumen Publikasi) dan
 * halaman publik mana saja yang menampilkan berkasnya — sehingga admin
 * selalu tahu "PDF ini bakal muncul di halaman apa".
 */

export interface DokumenKategori {
  /** Nilai kolom `jenis` di t_produk. */
  key: string;
  label: string;
  group: "Produk Layanan" | "PPID / Transparansi";
  /** Halaman publik yang menampilkan dokumen kategori ini. */
  halaman: { label: string; href: string }[];
}

export const DOKUMEN_KATEGORI: DokumenKategori[] = [
  // ── Produk layanan (kategori lama — nilai `jenis` dipertahankan) ──
  {
    key: "PERSYARATAN",
    label: "Formulir & Persyaratan",
    group: "Produk Layanan",
    halaman: [{ label: "Produk → Formulir & Persyaratan", href: "/produk/formulir-persyaratan" }],
  },
  {
    key: "HUKUM",
    label: "Produk Hukum",
    group: "Produk Layanan",
    halaman: [{ label: "Produk → Produk Hukum", href: "/produk/hukum" }],
  },
  {
    key: "SOP",
    label: "SOP",
    group: "Produk Layanan",
    halaman: [
      { label: "Produk → SOP", href: "/produk/sop" },
      { label: "PPID → SOP", href: "/ppid/sop" },
    ],
  },
  {
    key: "STANDAR_PELAYANAN",
    label: "Standar Pelayanan",
    group: "Produk Layanan",
    halaman: [{ label: "PPID → Standar Pelayanan", href: "/ppid/standar-pelayanan" }],
  },

  // ── PPID / transparansi ──
  {
    key: "PROFIL_PPID",
    label: "Profil PPID",
    group: "PPID / Transparansi",
    halaman: [{ label: "PPID → Tentang PPID → Profil PPID Pelaksana", href: "/ppid/profil-ppid" }],
  },
  {
    key: "PEMBENTUKAN_PPID",
    label: "Gambaran Pembentukan PPID",
    group: "PPID / Transparansi",
    halaman: [{ label: "PPID → Tentang PPID → Gambaran Pembentukan", href: "/ppid/gambaran-pembentukan-ppid" }],
  },
  {
    key: "VISI_MISI_PPID",
    label: "Visi & Misi PPID",
    group: "PPID / Transparansi",
    halaman: [{ label: "PPID → Tentang PPID → Visi & Misi", href: "/ppid/visi-misi-ppid" }],
  },
  {
    key: "STRUKTUR_PPID",
    label: "Struktur Organisasi PPID",
    group: "PPID / Transparansi",
    halaman: [{ label: "PPID → Tentang PPID → Struktur Organisasi", href: "/ppid/struktur-organisasi-ppid" }],
  },
  {
    key: "MAKLUMAT_PPID",
    label: "Maklumat PPID",
    group: "PPID / Transparansi",
    halaman: [{ label: "PPID → Tentang PPID → Maklumat", href: "/ppid/maklumat-ppid" }],
  },
  {
    key: "TUGAS_PPID",
    label: "Tugas & Tanggung Jawab PPID",
    group: "PPID / Transparansi",
    halaman: [{ label: "PPID → Tentang PPID → Tugas & Tanggung Jawab", href: "/ppid/tugas-tanggungjawab-ppid" }],
  },
  {
    key: "LHKPN",
    label: "LHKPN",
    group: "PPID / Transparansi",
    halaman: [{ label: "PPID → LHKPN", href: "/ppid/lhkpn" }],
  },
  {
    key: "LAPORAN_PPID",
    label: "Laporan PPID Pelaksana",
    group: "PPID / Transparansi",
    halaman: [{ label: "PPID → Laporan PPID Pelaksana", href: "/ppid/laporan-ppid-pelaksana" }],
  },
  {
    key: "LKJIP",
    label: "LKJIP",
    group: "PPID / Transparansi",
    halaman: [{ label: "PPID → LKJIP", href: "/ppid/lkjip" }],
  },
  {
    key: "SKM_LAPORAN",
    label: "Laporan Survey Kepuasan Masyarakat",
    group: "PPID / Transparansi",
    halaman: [{ label: "PPID → Survey Kepuasan Masyarakat", href: "/ppid/survey-kepuasan-masyarakat" }],
  },
  {
    key: "BUKU_PROFIL",
    label: "Buku Profil Kependudukan",
    group: "PPID / Transparansi",
    // Dua halaman, SATU kategori: PDF yang diunggah muncul di keduanya.
    // /profil-kependudukan = menu navbar sendiri (penampil PDF per tahun),
    // /ppid/buku-profil-kependudukan = daftar berkas versi PPID (tetap ada
    // supaya kewajiban keterbukaan informasi tidak pindah tempat).
    halaman: [
      { label: "Profil Kependudukan", href: "/profil-kependudukan" },
      { label: "PPID → Buku Profil Kependudukan", href: "/ppid/buku-profil-kependudukan" },
    ],
  },
  {
    key: "DPA",
    label: "Dokumen Pelaksana Anggaran (DPA)",
    group: "PPID / Transparansi",
    halaman: [{ label: "PPID → DPA", href: "/ppid/dpa" }],
  },
  {
    key: "IKI",
    label: "Indikator Kinerja Individu (IKI)",
    group: "PPID / Transparansi",
    halaman: [{ label: "PPID → IKI", href: "/ppid/iki" }],
  },
  {
    key: "RKT",
    label: "Rencana Kinerja Tahunan (RKT)",
    group: "PPID / Transparansi",
    halaman: [{ label: "PPID → RKT", href: "/ppid/rkt" }],
  },
  {
    key: "RENKA",
    label: "Rencana Kerja (Renka)",
    group: "PPID / Transparansi",
    halaman: [{ label: "PPID → Renka", href: "/ppid/renka" }],
  },
  {
    key: "PERJANJIAN_KERJASAMA",
    label: "Perjanjian Kerjasama",
    group: "PPID / Transparansi",
    halaman: [{ label: "PPID → Perjanjian Kerjasama", href: "/ppid/perjanjian-kerjasama" }],
  },
  {
    key: "RKA",
    label: "Rencana Kerja dan Anggaran (RKA)",
    group: "PPID / Transparansi",
    halaman: [{ label: "PPID → RKA", href: "/ppid/rka" }],
  },
  {
    key: "LRA",
    label: "Laporan Realisasi Anggaran (LRA)",
    group: "PPID / Transparansi",
    halaman: [{ label: "PPID → LRA", href: "/ppid/lra" }],
  },
  {
    key: "RFK",
    label: "Realisasi Fisik dan Keuangan (RFK)",
    group: "PPID / Transparansi",
    halaman: [{ label: "PPID → RFK", href: "/ppid/rfk" }],
  },
  {
    key: "RUP",
    label: "RUP Pengadaan",
    group: "PPID / Transparansi",
    halaman: [{ label: "PPID → RUP Pengadaan", href: "/ppid/rup-pengadaan" }],
  },
  {
    key: "CAKIN",
    label: "Capaian Indikator Kinerja (Cakin)",
    group: "PPID / Transparansi",
    halaman: [{ label: "PPID → Cakin", href: "/ppid/cakin" }],
  },
  {
    key: "LAPKIN",
    label: "Laporan Kinerja (Lapkin)",
    group: "PPID / Transparansi",
    halaman: [{ label: "PPID → Lapkin", href: "/ppid/lapkin" }],
  },
  {
    key: "SAKIP",
    label: "SAKIP",
    group: "PPID / Transparansi",
    halaman: [{ label: "PPID → SAKIP", href: "/ppid/sakip" }],
  },
  {
    key: "LPPD",
    label: "LPPD",
    group: "PPID / Transparansi",
    halaman: [{ label: "PPID → LPPD", href: "/ppid/lppd" }],
  },
  {
    key: "RENCANA_AKSI",
    label: "Rencana Aksi (RA)",
    group: "PPID / Transparansi",
    halaman: [{ label: "PPID → Rencana Aksi", href: "/ppid/rencana-aksi" }],
  },
  {
    key: "CALK",
    label: "Catatan Atas Laporan Keuangan (CALK)",
    group: "PPID / Transparansi",
    halaman: [{ label: "PPID → CALK", href: "/ppid/calk" }],
  },
  {
    key: "PPTK",
    label: "Pejabat Pelaksana Teknis Kegiatan",
    group: "PPID / Transparansi",
    halaman: [{ label: "PPID → Pejabat Pelaksana Teknis Kegiatan", href: "/ppid/pejabat-pelaksana-teknis" }],
  },
  {
    key: "BMD",
    label: "Barang Milik Daerah (BMD)",
    group: "PPID / Transparansi",
    halaman: [{ label: "PPID → BMD", href: "/ppid/bmd" }],
  },
  {
    key: "SPIP",
    label: "Sistem Pengendalian Intern Pemerintah (SPIP)",
    group: "PPID / Transparansi",
    halaman: [{ label: "PPID → SPIP", href: "/ppid/spip" }],
  },
  {
    key: "RENSTRA_OPD",
    label: "Renstra OPD",
    group: "PPID / Transparansi",
    halaman: [{ label: "PPID → Renstra OPD", href: "/ppid/renstra-opd" }],
  },
  {
    key: "IKU",
    label: "Indikator Kinerja Utama (IKU)",
    group: "PPID / Transparansi",
    halaman: [{ label: "PPID → IKU", href: "/ppid/iku" }],
  },
  {
    key: "PERJANJIAN_KINERJA",
    label: "Perjanjian Kinerja",
    group: "PPID / Transparansi",
    halaman: [{ label: "PPID → Perjanjian Kinerja", href: "/ppid/perjanjian-kinerja" }],
  },
  {
    key: "ZONA_INTEGRITAS",
    label: "Zona Integritas",
    group: "PPID / Transparansi",
    halaman: [{ label: "PPID → Zona Integritas", href: "/ppid/zona-integritas" }],
  },
  {
    key: "PENGENDALIAN_GRATIFIKASI",
    label: "Pengendalian Gratifikasi",
    group: "PPID / Transparansi",
    halaman: [{ label: "PPID → Pengendalian Gratifikasi", href: "/ppid/pengendalian-gratifikasi" }],
  },

  // ── Layanan & Formulir PPID (grup ketiga) ──
  {
    key: "FORMULIR_PERMOHONAN",
    label: "Formulir Permohonan Informasi",
    group: "PPID / Transparansi",
    halaman: [{ label: "PPID → Formulir PPID → Permohonan Informasi", href: "/ppid/formulir-ppid" }],
  },
  {
    key: "FORMULIR_KEBERATAN",
    label: "Formulir Pernyataan Keberatan",
    group: "PPID / Transparansi",
    halaman: [{ label: "PPID → Formulir PPID → Pernyataan Keberatan", href: "/ppid/formulir-ppid" }],
  },
  {
    key: "SK_DISDUKCAPIL",
    label: "SK Disdukcapil",
    group: "PPID / Transparansi",
    halaman: [{ label: "PPID → SK Disdukcapil", href: "/ppid/sk-disdukcapil" }],
  },
  {
    key: "REGISTER_PERMINTAAN",
    label: "Register Permintaan Informasi Publik",
    group: "PPID / Transparansi",
    halaman: [{ label: "PPID → Register → Permintaan Informasi", href: "/ppid/register-ppid" }],
  },
  {
    key: "REGISTER_KEBERATAN",
    label: "Register Keberatan",
    group: "PPID / Transparansi",
    halaman: [{ label: "PPID → Register → Keberatan", href: "/ppid/register-ppid" }],
  },
  {
    key: "UJI_KONSEKUENSI",
    label: "Uji Konsekuensi",
    group: "PPID / Transparansi",
    halaman: [{ label: "PPID → Uji Konsekuensi", href: "/ppid/uji-konsekuensi" }],
  },
  {
    key: "SENGKETA_INFORMASI",
    label: "Penyelesaian Sengketa Informasi",
    group: "PPID / Transparansi",
    halaman: [{ label: "PPID → Penyelesaian Sengketa Informasi", href: "/ppid/sengketa-informasi" }],
  },
  {
    key: "INOVASI_LAYANAN",
    label: "Inovasi Layanan",
    group: "PPID / Transparansi",
    halaman: [{ label: "PPID → Inovasi Layanan", href: "/ppid/inovasi-layanan" }],
  },
];

export const DOKUMEN_KEYS = new Set(DOKUMEN_KATEGORI.map((k) => k.key));

export function getDokumenKategori(key: string) {
  return DOKUMEN_KATEGORI.find((k) => k.key === key);
}

/** Semua kategori (nilai `jenis`) yang berkasnya tampil di path publik tsb. */
export function dokumenJenisForPath(path: string): string[] {
  return DOKUMEN_KATEGORI.filter((k) =>
    k.halaman.some((h) => h.href === path),
  ).map((k) => k.key);
}
