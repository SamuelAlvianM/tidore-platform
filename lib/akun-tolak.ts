/**
 * Penolakan pendaftaran akun: daftar kolom yang bisa ditandai petugas sebagai
 * "tidak sesuai", plus penyandian/penguraiannya ke kolom `users.ket`.
 *
 * Tujuan: saat menolak, petugas memilih BAGIAN DATA mana yang bermasalah
 * (multi-pilih) + alasan. Warga melihat daftar itu di Cek Status lalu diminta
 * MEMPERBAIKI data tersebut saat mendaftar ulang (tidak sekadar mengajukan
 * ulang tanpa perubahan).
 *
 * Penyimpanan TANPA migrasi DB: keduanya digabung menjadi satu teks `ket`.
 * `ket` juga dipakai fitur lain (alamat profil) sehingga sengaja dijaga tetap
 * HUMAN-READABLE — bukan JSON. Baris pertama (bila ada) memuat daftar kolom,
 * sisanya alasan bebas.
 */

export interface KolomTolak {
  /** Dipakai form Daftar Ulang (query `?perbaiki=`) untuk menyorot field. */
  key: string;
  /** Label tampilan — juga yang tersimpan di `ket` agar terbaca manusia. */
  label: string;
}

/** Urutan mengikuti formulir pendaftaran (RegisterContent). */
export const KOLOM_TOLAK: KolomTolak[] = [
  { key: 'nama', label: 'Nama' },
  { key: 'nik', label: 'NIK' },
  { key: 'kk', label: 'Nomor KK' },
  { key: 'hp', label: 'WhatsApp' },
  { key: 'email', label: 'Email' },
  { key: 'kecamatan', label: 'Kecamatan' },
  { key: 'foto', label: 'Foto selfie' },
  { key: 'ktp', label: 'Foto KTP' },
];

const LABEL_BY_KEY: Record<string, string> = Object.fromEntries(
  KOLOM_TOLAK.map((k) => [k.key, k.label]),
);
const KEY_BY_LABEL: Record<string, string> = Object.fromEntries(
  KOLOM_TOLAK.map((k) => [k.label.toLowerCase(), k.key]),
);

const PREFIX = 'Data yang perlu diperbaiki: ';

/** Label siap-tampil untuk sekumpulan key kolom (mengabaikan key tak dikenal). */
export function labelKolom(keys: string[]): string[] {
  return keys.map((k) => LABEL_BY_KEY[k]).filter(Boolean);
}

/**
 * Gabungkan daftar kolom bermasalah + alasan menjadi satu teks `ket`.
 * Tanpa kolom → hanya alasan (kompatibel dengan penolakan lama).
 */
export function susunAlasanTolak(kolom: string[], alasan: string): string {
  const label = labelKolom(kolom);
  const reason = (alasan ?? '').trim();
  if (label.length === 0) return reason;
  return `${PREFIX}${label.join(', ')}.\n${reason}`;
}

/** Pisahkan kembali `ket` menjadi { kolom, alasan } untuk ditampilkan/disorot. */
export function uraikanAlasanTolak(ket: string | null | undefined): {
  kolom: string[];
  alasan: string;
} {
  const teks = (ket ?? '').replace(/\r\n/g, '\n');
  if (!teks.startsWith(PREFIX)) return { kolom: [], alasan: teks.trim() };
  const nl = teks.indexOf('\n');
  const baris = nl === -1 ? teks : teks.slice(0, nl);
  const sisa = nl === -1 ? '' : teks.slice(nl + 1);
  const kolom = baris
    .slice(PREFIX.length)
    .replace(/\.\s*$/, '')
    .split(',')
    .map((s) => KEY_BY_LABEL[s.trim().toLowerCase()])
    .filter(Boolean);
  return { kolom, alasan: sisa.trim() };
}
