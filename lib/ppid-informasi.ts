/**
 * Dua klasifikasi Informasi Publik PPID (UU No. 14 Tahun 2008) yang tampil
 * sebagai halaman indeks kartu (bukan submenu navbar): satu sumber untuk
 * halaman /ppid/informasi-setiap-saat, /ppid/informasi-berkala, navbar,
 * dan editor Konten Halaman.
 *
 * `icon` disimpan sebagai NAMA (string) — bukan komponen — agar kartu bisa
 * ditambah/diubah admin lewat database (StaticContent). Pemetaan nama →
 * komponen dilakukan `getIcon()` di lib/icon-map.ts saat render.
 */

export interface PpidInformasiItem {
  title: string;
  href: string;
  description: string;
  /** Nama ikon Lucide, harus ada di ICON_MAP (lib/icon-map.ts). */
  icon: string;
  /** Kelas gradien Tailwind untuk kotak ikon kartu (mis. "from-sky-400 to-sky-600"). */
  gradasi: string;
}

export interface PpidInformasiGrup {
  slug: string;
  /** Judul lengkap halaman indeks. */
  judul: string;
  /** Label pendek (dipakai editor Konten sebagai nama grup). */
  judulPendek: string;
  href: string;
  deskripsi: string;
  items: PpidInformasiItem[];
}

export const PPID_SETIAP_SAAT: PpidInformasiGrup = {
  slug: 'informasi-setiap-saat',
  judul: 'Informasi Wajib Tersedia Setiap Saat',
  judulPendek: 'Setiap Saat',
  href: '/ppid/informasi-setiap-saat',
  deskripsi:
    'Daftar Informasi Publik yang wajib disediakan dan dapat diakses masyarakat setiap saat, sesuai amanat Undang-Undang Nomor 14 Tahun 2008 tentang Keterbukaan Informasi Publik. Pilih salah satu kategori untuk melihat dokumen resminya.',
  items: [
    {
      title: 'Laporan PPID Pelaksana',
      href: '/ppid/laporan-ppid-pelaksana',
      description: 'Laporan pelaksanaan tugas layanan informasi publik PPID Pelaksana.',
      icon: 'FileText',
      gradasi: 'from-sky-400 to-sky-600',
    },
    {
      title: 'LKJIP (Laporan Kinerja Instansi Pemerintah)',
      href: '/ppid/lkjip',
      description: 'Laporan kinerja tahunan Disdukcapil Kota Tidore Kepulauan.',
      icon: 'ClipboardCheck',
      gradasi: 'from-amber-400 to-amber-600',
    },
    {
      title: 'Survey Kepuasan Masyarakat',
      href: '/ppid/survey-kepuasan-masyarakat',
      description: 'Hasil pengukuran kepuasan masyarakat terhadap pelayanan publik.',
      icon: 'Smile',
      gradasi: 'from-emerald-400 to-emerald-600',
    },
    {
      title: 'Buku Profil Kependudukan',
      href: '/ppid/buku-profil-kependudukan',
      description: 'Buku profil data kependudukan Kota Tidore Kepulauan.',
      icon: 'BookOpen',
      gradasi: 'from-violet-400 to-violet-600',
    },
    {
      title: 'Dokumen Pelaksana Anggaran (DPA)',
      href: '/ppid/dpa',
      description: 'Dokumen pelaksanaan anggaran tahunan perangkat daerah.',
      icon: 'Coins',
      gradasi: 'from-teal-400 to-teal-600',
    },
    {
      title: 'Indikator Kinerja Individu (IKI)',
      href: '/ppid/iki',
      description: 'Indikator kinerja individu pegawai di lingkungan Disdukcapil.',
      icon: 'Target',
      gradasi: 'from-rose-400 to-rose-600',
    },
    {
      title: 'Rencana Kinerja Tahunan (RKT)',
      href: '/ppid/rkt',
      description: 'Rencana kinerja tahunan Disdukcapil Kota Tidore Kepulauan.',
      icon: 'CalendarDays',
      gradasi: 'from-[#5c766d] to-[#3a4b45]',
    },
    {
      title: 'Rencana Kerja (Renka)',
      href: '/ppid/renka',
      description: 'Rencana kerja tahunan instansi.',
      icon: 'ClipboardList',
      gradasi: 'from-slate-500 to-slate-700',
    },
    {
      title: 'Perjanjian Kerjasama',
      href: '/ppid/perjanjian-kerjasama',
      description: 'Daftar perjanjian kerjasama Disdukcapil dengan pihak lain.',
      icon: 'Handshake',
      gradasi: 'from-cyan-400 to-cyan-600',
    },
    {
      title: 'Rencana Kerja dan Anggaran (RKA)',
      href: '/ppid/rka',
      description: 'Dokumen rencana kerja dan anggaran tahunan perangkat daerah.',
      icon: 'Coins',
      gradasi: 'from-teal-400 to-teal-600',
    },
    {
      title: 'Laporan Realisasi Anggaran (LRA)',
      href: '/ppid/lra',
      description: 'Laporan realisasi anggaran pendapatan dan belanja instansi.',
      icon: 'Wallet',
      gradasi: 'from-amber-400 to-amber-600',
    },
    {
      title: 'Realisasi Fisik dan Keuangan (RFK)',
      href: '/ppid/rfk',
      description: 'Laporan realisasi fisik dan keuangan pelaksanaan kegiatan.',
      icon: 'Gauge',
      gradasi: 'from-sky-400 to-sky-600',
    },
    {
      title: 'RUP Pengadaan',
      href: '/ppid/rup-pengadaan',
      description: 'Rencana Umum Pengadaan (RUP) barang/jasa Disdukcapil.',
      icon: 'ClipboardList',
      gradasi: 'from-violet-400 to-violet-600',
    },
    {
      title: 'Capaian Indikator Kinerja (Cakin)',
      href: '/ppid/cakin',
      description: 'Capaian indikator kinerja Disdukcapil Kota Tidore Kepulauan.',
      icon: 'Target',
      gradasi: 'from-rose-400 to-rose-600',
    },
    {
      title: 'Laporan Kinerja (Lapkin)',
      href: '/ppid/lapkin',
      description: 'Laporan kinerja pelaksanaan program dan kegiatan.',
      icon: 'FileCheck',
      gradasi: 'from-emerald-400 to-emerald-600',
    },
    {
      title: 'Sistem Akuntabilitas Kinerja Instansi Pemerintah (SAKIP)',
      href: '/ppid/sakip',
      description: 'Dokumen SAKIP Disdukcapil Kota Tidore Kepulauan.',
      icon: 'Award',
      gradasi: 'from-[#5c766d] to-[#3a4b45]',
    },
    {
      title: 'LPPD',
      href: '/ppid/lppd',
      description: 'Laporan Penyelenggaraan Pemerintahan Daerah (LPPD).',
      icon: 'FileText',
      gradasi: 'from-slate-500 to-slate-700',
    },
    {
      title: 'Rencana Aksi (RA)',
      href: '/ppid/rencana-aksi',
      description: 'Rencana aksi pelaksanaan program dan kegiatan instansi.',
      icon: 'Flag',
      gradasi: 'from-cyan-400 to-cyan-600',
    },
    {
      title: 'Catatan Atas Laporan Keuangan (CALK)',
      href: '/ppid/calk',
      description: 'Catatan atas laporan keuangan Disdukcapil Tidore Kepulauan.',
      icon: 'Book',
      gradasi: 'from-sky-400 to-sky-600',
    },
    {
      title: 'Pejabat Pelaksana Teknis Kegiatan',
      href: '/ppid/pejabat-pelaksana-teknis',
      description: 'Daftar pejabat pelaksana teknis kegiatan (PPTK) di lingkungan Disdukcapil.',
      icon: 'UserCheck',
      gradasi: 'from-amber-400 to-amber-600',
    },
    {
      title: 'Barang Milik Daerah (BMD)',
      href: '/ppid/bmd',
      description: 'Daftar dan pengelolaan barang milik daerah pada Disdukcapil.',
      icon: 'Landmark',
      gradasi: 'from-teal-400 to-teal-600',
    },
  ],
};

export const PPID_BERKALA: PpidInformasiGrup = {
  slug: 'informasi-berkala',
  judul: 'Informasi Wajib Diumumkan Secara Berkala',
  judulPendek: 'Berkala',
  href: '/ppid/informasi-berkala',
  deskripsi:
    'Daftar Informasi Publik yang wajib disediakan dan diumumkan secara berkala oleh Badan Publik, sesuai amanat Undang-Undang Nomor 14 Tahun 2008 tentang Keterbukaan Informasi Publik. Pilih salah satu kategori untuk melihat dokumen resminya.',
  items: [
    {
      title: 'Renstra OPD',
      href: '/ppid/renstra-opd',
      description: 'Rencana Strategis Organisasi Perangkat Daerah.',
      icon: 'Flag',
      gradasi: 'from-sky-400 to-sky-600',
    },
    {
      title: 'Standar Pelayanan',
      href: '/ppid/standar-pelayanan',
      description: 'Standar pelayanan publik Disdukcapil Kota Tidore Kepulauan.',
      icon: 'BadgeCheck',
      gradasi: 'from-emerald-400 to-emerald-600',
    },
    {
      title: 'Indikator Kinerja Utama (IKU)',
      href: '/ppid/iku',
      description: 'Indikator kinerja utama instansi.',
      icon: 'Gauge',
      gradasi: 'from-amber-400 to-amber-600',
    },
    {
      title: 'Perjanjian Kinerja',
      href: '/ppid/perjanjian-kinerja',
      description: 'Perjanjian kinerja pejabat Disdukcapil Kota Tidore Kepulauan.',
      icon: 'FileCheck',
      gradasi: 'from-violet-400 to-violet-600',
    },
    {
      title: 'Standar Operasional Prosedur (SOP)',
      href: '/ppid/sop',
      description: 'Standar operasional prosedur pelayanan.',
      icon: 'ClipboardCheck',
      gradasi: 'from-teal-400 to-teal-600',
    },
    {
      title: 'LHKPN',
      href: '/ppid/lhkpn',
      description: 'Laporan Harta Kekayaan Penyelenggara Negara pejabat Disdukcapil.',
      icon: 'Wallet',
      gradasi: 'from-rose-400 to-rose-600',
    },
    {
      title: 'Zona Integritas',
      href: '/ppid/zona-integritas',
      description: 'Pembangunan zona integritas menuju WBK/WBBM.',
      icon: 'ShieldCheck',
      gradasi: 'from-[#5c766d] to-[#3a4b45]',
    },
    {
      title: 'Pengendalian Gratifikasi',
      href: '/ppid/pengendalian-gratifikasi',
      description: 'Kebijakan dan pelaporan pengendalian gratifikasi.',
      icon: 'Gift',
      gradasi: 'from-cyan-400 to-cyan-600',
    },
    {
      title: 'Sistem Pengendalian Intern Pemerintah (SPIP)',
      href: '/ppid/spip',
      description: 'Penyelenggaraan Sistem Pengendalian Intern Pemerintah (SPIP).',
      icon: 'Shield',
      gradasi: 'from-slate-500 to-slate-700',
    },
  ],
};

export const PPID_INFORMASI_GRUP = [PPID_SETIAP_SAAT, PPID_BERKALA];

// ── Data sub-tab navbar PPID (dipakai PpidSubnav) ───────────────────────────
// Sengaja BUKAN di components/ppid/ppid-subnav.tsx ('use client'): array polos
// yang diimpor dari modul client tidak sampai utuh ke Server Component (jadi
// referensi buram, .map() meledak) — hanya JSX/komponen yang aman melewati
// batas itu. Data harus tinggal di modul biasa seperti ini.

export interface PpidSubnavItem {
  href: string;
  label: string;
  shortLabel?: string;
}

/** 6 sub-halaman menu navbar "Tentang PPID". */
export const TENTANG_PPID_TABS: PpidSubnavItem[] = [
  { href: '/ppid/profil-ppid', label: 'Profil PPID Pelaksana', shortLabel: 'Profil' },
  { href: '/ppid/gambaran-pembentukan-ppid', label: 'Gambaran Pembentukan', shortLabel: 'Pembentukan' },
  { href: '/ppid/visi-misi-ppid', label: 'Visi & Misi PPID', shortLabel: 'Visi & Misi' },
  { href: '/ppid/struktur-organisasi-ppid', label: 'Struktur Organisasi', shortLabel: 'Struktur' },
  { href: '/ppid/maklumat-ppid', label: 'Maklumat PPID', shortLabel: 'Maklumat' },
  { href: '/ppid/tugas-tanggungjawab-ppid', label: 'Tugas & Tanggung Jawab', shortLabel: 'Tugas' },
];

/** 2 sub-halaman menu navbar "Informasi Publik".
 *  Label ditulis lengkap sesuai istilah resmi UU KIP (selaras dengan judul
 *  halaman `PPID_SETIAP_SAAT.judul` / `PPID_BERKALA.judul`); `shortLabel`
 *  dipakai di layar sempit. */
export const INFORMASI_PUBLIK_TABS: PpidSubnavItem[] = [
  {
    href: '/ppid/informasi-setiap-saat',
    label: 'Informasi Wajib Tersedia Setiap Saat',
    shortLabel: 'Setiap Saat',
  },
  {
    href: '/ppid/informasi-berkala',
    label: 'Informasi Wajib Diumumkan Secara Berkala',
    shortLabel: 'Berkala',
  },
];

/** 6 sub-halaman menu navbar "Layanan & Formulir PPID".
 *  Grup ketiga PPID (di samping Tentang PPID & Informasi Publik) supaya tiap bar
 *  tab tetap ringkas maks 6 chip. Dua halaman berisi 2 seksi editable (Formulir,
 *  Register) dibuat sebagai route khusus; empat sisanya lewat catch-all
 *  /ppid/[...slug]. */
export const LAYANAN_PPID_TABS: PpidSubnavItem[] = [
  { href: '/ppid/formulir-ppid', label: 'Formulir PPID', shortLabel: 'Formulir' },
  { href: '/ppid/sk-disdukcapil', label: 'SK Disdukcapil', shortLabel: 'SK' },
  { href: '/ppid/register-ppid', label: 'Register', shortLabel: 'Register' },
  { href: '/ppid/uji-konsekuensi', label: 'Uji Konsekuensi', shortLabel: 'Uji Konsekuensi' },
  { href: '/ppid/sengketa-informasi', label: 'Penyelesaian Sengketa Informasi', shortLabel: 'Sengketa' },
  { href: '/ppid/inovasi-layanan', label: 'Inovasi Layanan', shortLabel: 'Inovasi' },
];

/** Pilihan gradasi warna kotak ikon — dipakai modal "Tambah menu baru". */
export const PPID_GRADASI_PILIHAN = [
  { label: 'Biru', value: 'from-sky-400 to-sky-600' },
  { label: 'Hijau', value: 'from-emerald-400 to-emerald-600' },
  { label: 'Kuning', value: 'from-amber-400 to-amber-600' },
  { label: 'Ungu', value: 'from-violet-400 to-violet-600' },
  { label: 'Toska', value: 'from-teal-400 to-teal-600' },
  { label: 'Merah', value: 'from-rose-400 to-rose-600' },
  { label: 'Biru Tua', value: 'from-[#5c766d] to-[#3a4b45]' },
  { label: 'Abu', value: 'from-slate-500 to-slate-700' },
  { label: 'Sian', value: 'from-cyan-400 to-cyan-600' },
];
