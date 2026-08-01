/**
 * ETL berkas FISIK: baca daftar file nyata dari server (uploads-filelist.txt),
 * link ke Permohonan lewat segmen path yang = no_register (nama folder).
 * Menggantikan berkas hasil syaratDok (yang undercount).
 * Jalankan: npx tsx prisma/etl-berkas.ts
 */
import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';

const prisma = new PrismaClient();
const LIST = 'C:/Users/Viole/AppData/Local/Temp/claude/C--sam-SAM-AMANDA-GALANG/5d6aa94e-3fdd-4b07-8332-942957c4b737/scratchpad/uploads-filelist.txt';

const mimeOf = (f: string) => {
  const e = f.toLowerCase().split('.').pop() || '';
  return ({ jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', pdf: 'application/pdf',
    zip: 'application/zip', gif: 'image/gif', webp: 'image/webp' } as Record<string, string>)[e] ?? null;
};

async function main() {
  const noregMap = new Map<string, number>();
  for (const p of await prisma.permohonan.findMany({ select: { id: true, noregister: true } }))
    noregMap.set(p.noregister, p.id);
  console.log(`permohonan: ${noregMap.size}`);

  const lines = readFileSync(LIST, 'utf8').split('\n').filter(Boolean);
  console.log(`file di server: ${lines.length}`);

  const batch: { permohonanId: number; namaFile: string; path: string; mimeType: string | null; ukuran: number | null }[] = [];
  let linked = 0, orphan = 0;
  for (const line of lines) {
    const [path, sizeStr] = line.replace(/\r$/, '').split('\t');
    if (!path) continue;
    const segs = path.split('/');
    let pid: number | undefined;
    for (const s of segs) { pid = noregMap.get(s); if (pid) break; }
    if (!pid) { orphan++; continue; }
    batch.push({
      permohonanId: pid,
      namaFile: segs[segs.length - 1],
      path: path.startsWith('/') ? path : `/${path}`,
      mimeType: mimeOf(path),
      ukuran: sizeStr ? Number(sizeStr) : null,
    });
    linked++;
  }

  console.log('🧹 reset t_berkas...');
  await prisma.berkas.deleteMany();
  console.log(`💾 insert ${batch.length} berkas...`);
  for (let i = 0; i < batch.length; i += 1000)
    await prisma.berkas.createMany({ data: batch.slice(i, i + 1000) });

  console.log(`\n✅ Berkas fisik: ${linked} ter-link | ${orphan} orphan (folder ≠ no_register termigrasi)`);
  await prisma.$disconnect();
}
main().catch((e) => { console.error('❌ gagal:', e); process.exit(1); });
