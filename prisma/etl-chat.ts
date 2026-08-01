/**
 * ETL chat: chat_conversations → Tiket, chat_messages → TiketPesan.
 * userId/senderId divalidasi ke users; fallback ke user pertama bila tak valid.
 * Jalankan: npx tsx prisma/etl-chat.ts
 */
import { PrismaClient } from '@prisma/client';
import mysql from 'mysql2/promise';

const prisma = new PrismaClient();
const SOURCE = { host: 'localhost', port: 3306, user: 'root', password: 'saibatin123', database: 'tidore_lama' };
const dt = (v: any) => (v && !String(v).startsWith('0000') ? new Date(v) : new Date());

async function main() {
  const src = await mysql.createConnection(SOURCE);
  const validIds = new Set((await prisma.user.findMany({ select: { id: true } })).map((u) => u.id));
  const fallbackId = Math.min(...validIds);
  const valid = (v: any) => { const n = Number(v); return Number.isFinite(n) && validIds.has(n) ? n : null; };

  await prisma.tiketPesan.deleteMany();
  await prisma.tiket.deleteMany();

  const [convs] = await src.query<any[]>('SELECT * FROM chat_conversations');
  const convToTiket = new Map<number, number>();
  for (const c of convs) {
    const uid = valid(c.user_id) ?? fallbackId;
    const closed = /close|tutup|selesai/i.test(String(c.status ?? ''));
    const t = await prisma.tiket.create({ data: {
      nomor: c.chat_id ? String(c.chat_id) : `TKT${c.id}`,
      userId: uid,
      subjek: String(c.subject ?? 'Percakapan').slice(0, 190),
      kategori: 'LAYANAN',
      status: closed ? 'TERTUTUP' : 'TERBUKA',
      closedAt: closed ? dt(c.updated_at) : null,
      createdAt: dt(c.created_at), updatedAt: dt(c.updated_at ?? c.created_at),
    }});
    convToTiket.set(c.id, t.id);
  }
  console.log(`✅ Tiket: ${convs.length}`);

  const [msgs] = await src.query<any[]>('SELECT * FROM chat_messages ORDER BY id');
  let m = 0, skip = 0;
  for (const g of msgs) {
    const tiketId = convToTiket.get(g.conversation_id);
    if (!tiketId) { skip++; continue; }
    const sender = valid(g.sender_id) ?? fallbackId;
    await prisma.tiketPesan.create({ data: {
      tiketId, userId: sender,
      isi: String(g.message ?? ''),
      createdAt: dt(g.created_at),
    }});
    m++;
  }
  console.log(`✅ TiketPesan: ${m}${skip ? ` (lewati ${skip} tanpa tiket)` : ''}`);

  await src.end(); await prisma.$disconnect();
}
main().catch((e) => { console.error('❌ gagal:', e); process.exit(1); });
