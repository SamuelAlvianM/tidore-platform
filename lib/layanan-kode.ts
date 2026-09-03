import { LAYANAN_FORMS, type LayananForm } from '@/lib/layanan-forms';

/**
 * Jembatan antara slug formulir dan `kode` di `m_jenis_permohonan`.
 *
 * 🔴 Dulu peta ini private di `app/api/[layanan]/[action]/route.ts`, jadi arah
 * sebaliknya — dari permohonan yang SUDAH tersimpan kembali ke skema
 * formulirnya — tidak mungkin ditempuh. Padahal itu yang dibutuhkan halaman
 * penolakan: untuk menawarkan "data apa yang kurang", ia harus tahu isian dan
 * lampiran apa saja yang diminta layanan ITU.
 *
 * ⚠️ Dua jenis di master TIDAK punya formulir di sini: `SAKINAH` dan
 * `PENCETAKAN_KTP`. Keduanya warisan dan tidak lagi bisa diajukan lewat
 * portal, tapi barisnya masih ada di basis data — permohonan lamanya harus
 * tetap bisa dibuka. Karena itu pencarian form mengembalikan `undefined`,
 * bukan melempar, dan pemanggilnya wajib tahan terhadap itu.
 */
export const LAYANAN_KODE: Record<string, string> = {
  'akta-kelahiran-nik-ada': 'AKTA_KELAHIRAN_NIK_ADA',
  'akta-kelahiran-nik-tidak-ada': 'AKTA_KELAHIRAN_NIK_BLM_ADA',
  'akta-kematian': 'AKTA_KEMATIAN',
  'akta-nikah': 'AKTA_NIKAH',
  'akta-perceraian': 'AKTA_PERCERAIAN',
  kia: 'KIA',
  ktpel: 'KTP_EL',
  'perpindahan-penduduk': 'PINDAH',
  kedatangan: 'KEDATANGAN',
  'konsolidasi-update-data': 'KONSOLIDASI',
  'kk-tambah-anak': 'KK_TAMBAH_ANAK',
  'kk-pisah': 'KK_PISAH',
  'kk-numpang': 'KK_NUMPANG',
  'kk-perubahan-biodata': 'KK_UBAH_BIODATA',
  'kk-cetak-ulang': 'KK_CETAK_ULANG',
};

/** Kode master → slug formulir. Dibangun sekali, bukan dicari tiap panggilan. */
const SLUG_DARI_KODE: Record<string, string> = Object.fromEntries(
  Object.entries(LAYANAN_KODE).map(([slug, kode]) => [kode, slug]),
);

/** Skema formulir untuk sebuah `kode` master — `undefined` bila warisan. */
export function formDariKode(kode?: string | null): LayananForm | undefined {
  if (!kode) return undefined;
  const slug = SLUG_DARI_KODE[kode];
  return slug ? LAYANAN_FORMS.find((l) => l.slug === slug) : undefined;
}
