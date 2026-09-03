/**
 * Pastikan `lib/akun-level.ts` masih cocok dengan `m_userlevels`.
 *
 * 🔴 KENAPA PERLU, DAN DI PORTAL INI LEBIH PERLU LAGI. Seluruh pembatasan
 * akses berdiri di atas angka level yang dipetakan di `lib/akun-level.ts`, dan
 * angka-angka itu WARISAN migrasi Laravel yang tidak berurutan: 4 = developer,
 * 5 = operator opd, 41 = operator. Peta yang ditulis tangan seperti itu tidak
 * bisa diperiksa dengan membacanya — harus diadu dengan basis data.
 *
 * Kalau seseorang menyunting `m_userlevels` lewat SQL, peta ini jadi bohong
 * TANPA satu pun galat. Yang terjadi bukan portal rusak, melainkan portal yang
 * tetap jalan sambil memberi akses kepada peran yang keliru.
 *
 * Dijalankan manual sebelum rilis, bukan saat boot: ia menyentuh basis data,
 * dan kegagalan koneksi tidak boleh menjatuhkan portal yang sedang melayani.
 *
 *     npm run peran:periksa
 */
import { PrismaClient } from '@prisma/client';
import { NAMA_PERAN } from '../lib/akun-level';

const prisma = new PrismaClient();

async function main() {
  const baris = await prisma.userLevel.findMany({ orderBy: { id: 'asc' } });
  const diDb = new Map(baris.map((b) => [b.id, b.nama]));

  let bermasalah = false;

  for (const [idStr, nama] of Object.entries(NAMA_PERAN)) {
    const id = Number(idStr);
    const ada = diDb.get(id);

    if (ada === undefined) {
      /*
       * ⚠️ Level 41 memang TIDAK punya baris di `m_userlevels` — ia angka
       * yatim warisan Laravel yang sudah dipakai 40 akun. Itu keadaan yang
       * diketahui, bukan kerusakan; cukup diperingatkan.
       */
      const jumlah = await prisma.user.count({ where: { userlevelId: id } });
      if (jumlah > 0) {
        console.warn(`⚠️  level ${id} ("${nama}") tidak ada di m_userlevels, tapi dipakai ${jumlah} akun — angka yatim yang diketahui`);
      } else {
        console.error(`❌ level ${id} ("${nama}") tidak ada di m_userlevels dan tidak dipakai siapa pun`);
        bermasalah = true;
      }
    } else if (ada !== nama) {
      console.error(`❌ level ${id}: lib/akun-level.ts "${nama}" ≠ basis data "${ada}"`);
      bermasalah = true;
    } else {
      console.log(`✓  level ${String(id).padStart(2)}  ${nama}`);
    }
  }

  for (const b of baris) {
    if (!(b.id in NAMA_PERAN)) {
      console.warn(`⚠️  level ${b.id} ("${b.nama}") ada di basis data tapi tidak dikenal lib/akun-level.ts`);
    }
  }

  if (bermasalah) {
    console.error('\nPeta peran TIDAK cocok dengan basis data. Perbaiki sebelum rilis.');
    process.exit(1);
  }
  console.log('\nPeta peran cocok dengan basis data.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
