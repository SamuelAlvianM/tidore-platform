// Buat/aktifkan akun login administrator untuk DAGA (dev).
// Jalankan: npx tsx prisma/buat-akun.ts [userId] [password]
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const userId = process.argv[2] || 'galang';
  const plain = process.argv[3] || 'DagaGalang#2026';
  const hash = await bcrypt.hash(plain, 10);

  const existing = await prisma.user.findFirst({ where: { userId } });
  const base = {
    password: hash,
    userlevelId: 1, // 1 = administrator (akses penuh)
    status: 1, // aktif
    userFullname: 'Galang (Administrator)',
    emailVerifiedAt: new Date(),
    activationTime: new Date(),
  };

  const u = existing
    ? await prisma.user.update({ where: { id: existing.id }, data: base })
    : await prisma.user.create({ data: { userId, ...base } });

  console.log(`\n✅ Akun siap login:`);
  console.log(`   userId   : ${u.userId}`);
  console.log(`   password : ${plain}`);
  console.log(`   level    : ${u.userlevelId} (administrator) · status ${u.status} · id ${u.id}`);
}

main()
  .catch((e) => { console.error('❌', e); process.exit(1); })
  .finally(() => prisma.$disconnect());
