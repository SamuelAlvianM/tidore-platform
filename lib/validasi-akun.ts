import { LEVEL_OPD, LEVEL_WARGA } from '@/lib/akun-level';

/**
 * Aturan bentuk data akun — SATU SUMBER untuk pembuatan DAN penyuntingan.
 *
 * 🔴 Sebelumnya aturannya hanya ada di dalam handler POST. Begitu penyuntingan
 * ditambahkan, aturan yang sama harus ditulis ulang di tempat kedua — dan yang
 * satu selalu tertinggal. Yang paling berbahaya bukan aturan yang berbeda,
 * melainkan aturan yang LEBIH LONGGAR di jalur sunting: akun yang tidak akan
 * pernah lolos saat dibuat bisa masuk lewat pintu belakang.
 */

/** Peran yang login memakai NIK 16 digit, bukan username instansi. */
const MASUK_NIK: number[] = [LEVEL_WARGA];

export interface DataAkun {
  nama?: string;
  userId?: string;
  nik?: string;
  kk?: string;
  hp?: string;
  email?: string;
  kecamatan?: string;
}

/**
 * Periksa bentuk data akun untuk `level`. Mengembalikan pesan galat PERTAMA,
 * atau `null` bila lolos.
 *
 * ⚠️ `wajibKecamatan` sengaja bisa dimatikan. Akun warga BARU wajib berkecamatan
 * — itu yang menentukan wilayah layanannya. Tapi akun lama dibuat sebelum
 * aturan itu ada dan banyak yang kosong; menuntutnya saat menyunting berarti
 * petugas yang cuma ingin memperbaiki satu huruf pada nama justru terhalang
 * oleh data yang bukan urusannya. Pemanggilnya menetapkan kebijakan: TIDAK
 * BOLEH DIKOSONGKAN bila sudah terisi, tapi boleh tetap kosong bila memang
 * belum pernah ada.
 */
export function periksaDataAkun(
  d: DataAkun,
  level: number,
  opsi: { wajibKecamatan?: boolean } = {},
): string | null {
  const nama = (d.nama ?? '').trim();
  const userId = (d.userId ?? '').trim();
  const nik = (d.nik ?? '').trim();
  const kk = (d.kk ?? '').trim();
  const email = (d.email ?? '').trim();
  const kecamatan = (d.kecamatan ?? '').trim();

  if (!nama || !userId) return 'Info: Nama dan NIK/Username wajib diisi';

  // Bentuk `userId` mengikuti PERAN, bukan tebakan dari isinya.
  if (MASUK_NIK.includes(level)) {
    if (!/^\d{16}$/.test(userId)) return 'Info: NIK warga harus 16 digit angka';
    if (opsi.wajibKecamatan && !kecamatan) {
      return 'Info: Kecamatan domisili wajib dipilih untuk akun warga';
    }
  } else if (!/^[a-z0-9][a-z0-9._-]{3,29}$/i.test(userId)) {
    return 'Info: Username 4-30 karakter (huruf/angka/titik/underscore/strip)';
  }

  // OPD login pakai username instansi; NIK perwakilan disimpan terpisah dan
  // dipakai fitur lupa password — tanpa itu akunnya tidak bisa dipulihkan.
  if (level === LEVEL_OPD && !/^\d{16}$/.test(nik)) {
    return 'Info: NIK perwakilan OPD harus 16 digit angka';
  }
  if (level !== LEVEL_OPD && nik && !/^\d{16}$/.test(nik)) {
    return 'Info: NIK harus 16 digit angka';
  }
  if (kk && !/^\d{16}$/.test(kk)) {
    return 'Info: Nomor Kartu Keluarga harus 16 digit angka';
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Info: Format email tidak valid';
  }

  return null;
}

/**
 * Aturan sandi — disamakan dengan penggantian sandi mandiri, supaya sandi yang
 * ditolak di satu tempat tidak diterima di tempat lain.
 *
 * ⚠️ Pemeriksaan "sama dengan sandi lama" TIDAK di sini: ia butuh hash dari
 * basis data, dan modul ini sengaja tidak menyentuh basis data agar bisa
 * dipanggil dari mana saja.
 */
export function periksaSandi(sandi: string): string | null {
  if (sandi.length < 6) return 'Info: Password minimal 6 karakter';
  if (/^\d+$/.test(sandi)) return 'Info: Password tidak boleh angka semua';
  return null;
}
