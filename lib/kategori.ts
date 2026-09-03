import { PELAYANAN_LIST } from '@/lib/pelayanan-list';

/**
 * Warna lembut per kategori layanan — dipakai BERSAMA oleh pemilih layanan
 * petugas (`dashboard/pengajuan-baru`) dan pemohon (`user/pengajuan/baru`).
 *
 * 🔴 SATU SUMBER, DUA HALAMAN. Keduanya menampilkan daftar layanan yang sama;
 * kalau petanya disalin ke masing-masing, keduanya akan menyimpang pada
 * perubahan berikutnya — kategori baru cuma diberi warna di satu sisi, dan dua
 * halaman berisi layanan yang sama mulai terlihat seperti dua aplikasi
 * berbeda.
 *
 * Dipakai TERBATAS: glif ikon di kartu, tab yang sedang aktif, dan lencana
 * jumlahnya. Badan kartu tetap putih dan kotak di belakang ikon tetap
 * `bg-primary/10` untuk semua kategori — yang berbeda hanya warna gambar
 * ikonnya. Kartu berwarna penuh membuat halaman ramai dan melemahkan
 * satu-satunya warna yang memang harus menonjol: penanda layanan yang ditutup.
 *
 * 🔴 KELASNYA DITULIS UTUH, bukan dirakit (`bg-${w}-100`). Tailwind memindai
 * kode sebagai teks; kelas yang baru terbentuk saat program berjalan tidak
 * pernah ikut ter-build, dan hasilnya elemen tanpa warna sama sekali — tanpa
 * satu pun galat yang menandainya.
 *
 * ⚠️ Warna MEREK portal tidak disentuh. Palet di bawah semuanya warna Tailwind
 * biasa plus token `primary` untuk "Semua"; ganti tema portal dan tab "Semua"
 * ikut, sementara warna kategori tetap seperti apa adanya. Itu disengaja:
 * kategori layanan sama di semua portal, identitas warnanya tidak.
 *
 * `all` sengaja memakai warna merek: ia bukan kategori, melainkan "semuanya".
 */

export interface WarnaKategori {
  tab: string;
  ikon: string;
  hitung: string;
}

export const WARNA_KATEGORI: Record<string, WarnaKategori> = {
  all: {
    tab: 'border-primary/40 bg-primary/10 text-primary',
    ikon: 'text-primary',
    hitung: 'bg-primary/15 text-primary',
  },
  akta: {
    tab: 'border-violet-300 bg-violet-100 text-violet-700',
    ikon: 'text-violet-600',
    hitung: 'bg-violet-200/70 text-violet-700',
  },
  kk: {
    tab: 'border-amber-300 bg-amber-100 text-amber-700',
    ikon: 'text-amber-600',
    hitung: 'bg-amber-200/70 text-amber-700',
  },
  identitas: {
    tab: 'border-emerald-300 bg-emerald-100 text-emerald-700',
    ikon: 'text-emerald-600',
    hitung: 'bg-emerald-200/70 text-emerald-700',
  },
  pindah: {
    tab: 'border-cyan-300 bg-cyan-100 text-cyan-700',
    ikon: 'text-cyan-600',
    hitung: 'bg-cyan-200/70 text-cyan-700',
  },
  data: {
    tab: 'border-rose-300 bg-rose-100 text-rose-700',
    ikon: 'text-rose-600',
    hitung: 'bg-rose-200/70 text-rose-700',
  },
};

/** Kategori tak dikenal tetap tampil rapi, bukan tanpa warna. */
export const WARNA_NETRAL: WarnaKategori = {
  tab: 'border-slate-300 bg-slate-100 text-slate-700',
  ikon: 'text-slate-600',
  hitung: 'bg-slate-200 text-slate-600',
};

/** Layanan yang ditutup SELALU abu-abu, mengabaikan warna kategorinya. */
export const WARNA_MATI: WarnaKategori = {
  tab: 'border-slate-300 bg-slate-100 text-slate-500',
  ikon: 'text-slate-500',
  hitung: 'bg-slate-200 text-slate-500',
};

export const warnaKategori = (id?: string | null): WarnaKategori =>
  (id && WARNA_KATEGORI[id]) || WARNA_NETRAL;

/**
 * Kategori sebuah layanan dari SLUG FORMULIR-nya.
 *
 * ⚠️ `LAYANAN_FORMS` tidak menyimpan kategori — pemilih layanan petugas bekerja
 * dari sana, jadi kategorinya diambil dari `PELAYANAN_LIST` yang memang
 * menjembatani ketiga kosakata slug portal ini.
 */
const KATEGORI_SLUG: Record<string, string> = Object.fromEntries(
  PELAYANAN_LIST.map((p) => [p.slugForm, p.category]),
);

export const kategoriSlug = (slugForm: string): string | undefined =>
  KATEGORI_SLUG[slugForm];
