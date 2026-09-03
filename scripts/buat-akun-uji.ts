/**
 * Akun uji LOKAL untuk peran yang tidak punya akun demo di seeder.
 *
 * Tanpa akun Operator OPD dan operator wilayah, tidak ada cara memeriksa
 * sidebar dua-menu, penyaringan lingkup permohonan, maupun penjagaan "hanya
 * Super Admin yang boleh menyunting akun petugas" — dan justru penjagaan
 * itulah yang paling mahal bila salah.
 *
 * ⚠️ Sengaja TIDAK dimasukkan ke seeder: akun bersandi tetap tidak boleh ikut
 * ke basis data mana pun selain laptop. Id 99900x dan nama ber-"uji lokal"
 * dipilih supaya mencolok bila tak sengaja terbawa.
 *
 *     npm run akun:uji
 *
 *     opd.uji.lokal      / opd12345     (Operator OPD, level 5)
 *     wilayah.uji.lokal  / wil12345     (operator wilayah, level 41)
 *     staf.uji.lokal     / staf12345    (operator capil, level 2)
 *     admin.uji.lokal    / adm12345     (Super Admin, level 1)
 */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { LEVEL_ADMIN, LEVEL_OPD, LEVEL_OPERATOR, LEVEL_STAFF } from '../lib/akun-level';

const prisma = new PrismaClient();

async function main() {
  const kec = await prisma.wilayah.findFirst({
    where: { jenis: 'KECAMATAN' },
    select: { nama: true },
    orderBy: { nama: 'asc' },
  });

  const akun = [
    { id: 999001, userId: 'opd.uji.lokal', sandi: 'opd12345', level: LEVEL_OPD, nama: 'Operator OPD (uji lokal)', kec: kec?.nama ?? null },
    { id: 999003, userId: 'wilayah.uji.lokal', sandi: 'wil12345', level: LEVEL_OPERATOR, nama: 'Operator Wilayah (uji lokal)', kec: kec?.nama ?? null },
    { id: 999002, userId: 'staf.uji.lokal', sandi: 'staf12345', level: LEVEL_STAFF, nama: 'Operator Capil (uji lokal)', kec: null },
    /*
     * 🔴 Akun ADMIN uji dibuat TERPISAH, bukan memakai admin dinas.
     *
     * Penjagaan "hanya Super Admin" tidak bisa diperiksa tanpa satu sesi Super
     * Admin. Memakai akun admin sungguhan berarti mengganti sandinya —
     * mengunci orang yang memakainya keluar dari portalnya sendiri.
     */
    { id: 999004, userId: 'admin.uji.lokal', sandi: 'adm12345', level: LEVEL_ADMIN, nama: 'Super Admin (uji lokal)', kec: null },
  ];

  for (const a of akun) {
    const hash = await bcrypt.hash(a.sandi, 10);
    const u = await prisma.user.upsert({
      where: { id: a.id },
      update: { password: hash, status: 1, userlevelId: a.level },
      create: {
        id: a.id,
        userId: a.userId,
        password: hash,
        userlevelId: a.level,
        userFullname: a.nama,
        userKecamatan: a.kec,
        status: 1,
        activationTime: new Date(),
      },
      select: { userId: true, userlevelId: true, userKecamatan: true },
    });
    console.log(
      `✓  ${u.userId.padEnd(20)} level ${String(u.userlevelId).padStart(2)}  sandi ${a.sandi}` +
        (u.userKecamatan ? `  · ${u.userKecamatan}` : ''),
    );
  }

  console.log('\n⚠️  Akun ini hanya untuk laptop. Jangan pernah ada di produksi.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
