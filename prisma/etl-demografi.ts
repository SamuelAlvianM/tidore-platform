/**
 * ETL demografi: m_maps_dapduks (33k, multi-periode) → DemografiWilayah.
 * Periode: 2024 Semester 2 (terbaru & lengkap). Pivot name→value per (kategori, kode).
 * jenis-kelamin = gabungan grup Penduduk Laki-Laki (L) + Perempuan (P) + Penduduk (JML).
 * Jalankan: npx tsx prisma/etl-demografi.ts
 */
import { PrismaClient } from '@prisma/client';
import mysql from 'mysql2/promise';

const prisma = new PrismaClient();
const SOURCE = { host: 'localhost', port: 3306, user: 'root', password: 'saibatin123', database: 'tidore_lama' };
const TAHUN = 2024, SEMESTER = 2;

// grup sumber → slug kategori app (Kelompok Usia & city-total tak dipakai langsung)
const GROUP_SLUG: Record<string, string> = {
  'Agama': 'agama', 'Golongan Darah': 'gol-darah', 'Pekerjaan': 'pekerjaan',
  'Pendidikan': 'pendidikan', 'Status Kawin': 'status-kawin', 'KK': 'kk', 'Wajib KTP': 'wajib-ktp',
};
const num = (v: any) => Math.round(Number(v) || 0);
const levelOf = (kode: string) => (kode.length >= 10 ? 5 : kode.length >= 6 ? 4 : 3);
const parentOf = (kode: string) => (kode.length >= 10 ? kode.slice(0, 6) : kode.length >= 6 ? kode.slice(0, 4) : null);

async function main() {
  const src = await mysql.createConnection(SOURCE);
  console.log(`🔌 tidore_lama — periode ${TAHUN} sem ${SEMESTER}`);

  const [rows] = await src.query<any[]>(
    'SELECT kode, site, `group` AS grp, name, value FROM m_maps_dapduks WHERE tahun=? AND semester=?',
    [TAHUN, SEMESTER],
  );
  console.log(`  ${rows.length} baris sumber`);

  // akumulasi: peta[kode] = { site, jk:{L,P,JML}, cats:{ slug:{name:val} } }
  type Acc = { site: string; jk: Record<string, number>; cats: Record<string, Record<string, number>> };
  const peta = new Map<string, Acc>();
  const get = (kode: string, site: string): Acc => {
    let a = peta.get(kode);
    if (!a) { a = { site, jk: {}, cats: {} }; peta.set(kode, a); }
    if (site && !a.site) a.site = site;
    return a;
  };

  for (const r of rows) {
    const kode = String(r.kode);
    const a = get(kode, String(r.site ?? ''));
    const grp = String(r.grp);
    if (grp === 'Penduduk Laki-Laki') a.jk.L = num(r.value);
    else if (grp === 'Penduduk Perempuan') a.jk.P = num(r.value);
    else if (grp === 'Penduduk') a.jk.JML = num(r.value);
    else {
      const slug = GROUP_SLUG[grp];
      if (!slug) continue; // Kelompok Usia dsb → dilewati
      (a.cats[slug] ??= {})[String(r.name)] = num(r.value);
    }
  }

  console.log('🧹 reset DemografiWilayah...');
  await prisma.demografiWilayah.deleteMany();

  let n = 0;
  for (const [kode, a] of peta) {
    const level = levelOf(kode), parentKode = parentOf(kode), wilayah = a.site || kode;
    // jenis-kelamin (kalau ada minimal 1 dari L/P/JML)
    if (Object.keys(a.jk).length) {
      if (a.jk.JML == null && (a.jk.L != null || a.jk.P != null)) a.jk.JML = (a.jk.L ?? 0) + (a.jk.P ?? 0);
      await prisma.demografiWilayah.create({ data: { kategori: 'jenis-kelamin', kode, wilayah, level, parentKode, data: a.jk } });
      n++;
    }
    for (const [slug, data] of Object.entries(a.cats)) {
      await prisma.demografiWilayah.create({ data: { kategori: slug, kode, wilayah, level, parentKode, data } });
      n++;
    }
  }

  console.log(`\n✅ DemografiWilayah: ${n} baris (${peta.size} wilayah × kategori)`);
  await src.end(); await prisma.$disconnect();
}
main().catch((e) => { console.error('❌ gagal:', e); process.exit(1); });
