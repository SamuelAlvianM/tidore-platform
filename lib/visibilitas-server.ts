import { prisma } from '@/lib/prisma';
import { PELAYANAN_VISIBILITY_KEY, slugTersembunyi } from '@/lib/pelayanan-list';

/**
 * Layanan yang sedang dimatikan dinas — dibaca DARI SERVER.
 *
 * 🔴 Sebelumnya pemeriksaannya hanya di peramban: pemilih layanan warga
 * menyaring daftarnya (dan itu pun tidak berfungsi, lihat `pelayanan-list.ts`),
 * sementara endpoint pengiriman permohonan tidak memeriksa apa pun. Layanan
 * yang ditutup tetap menerima permohonan bagi siapa saja yang menyimpan
 * tautannya, menekan tombol Kembali, atau membuka bookmark lama.
 *
 * Menyembunyikan tombol bukan menutup layanan. Yang menutup layanan adalah
 * pemeriksaan di sini.
 */
export async function layananTersembunyi(): Promise<Set<string>> {
  try {
    const row = await prisma.staticContent.findUnique({
      where: { kunci: PELAYANAN_VISIBILITY_KEY },
      select: { konten: true },
    });
    const konten = (row?.konten ?? {}) as { hidden?: unknown };
    return slugTersembunyi(konten.hidden);
  } catch {
    /*
     * ⚠️ Gagal baca = TIDAK ada yang ditutup, bukan semua ditutup.
     *
     * Basis data yang sedang bermasalah tidak boleh menghentikan seluruh
     * pelayanan kependudukan. Kegagalan di sini berarti kembali ke keadaan
     * sebelum fitur ini ada, yang aman; menutup semuanya berarti seluruh
     * kabupaten kehilangan layanan karena satu query gagal.
     */
    return new Set();
  }
}
