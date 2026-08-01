// Generator lib/permohonan-lookup.ts dari m_options (tidore_lama).
// Jalankan sekali: npx tsx prisma/gen-lookup.ts
import mysql from 'mysql2/promise';
import { writeFileSync } from 'fs';

const GROUPS = ['agama', 'pekerjaan', 'pendidikan', 'golongandarah', 'statusperkawinan'];
// Title-case hanya bila string SELURUHNYA huruf kecil (jaga akronim spt "SLTP").
const norm = (s: string) => (/[A-Z]/.test(s) ? s : s.replace(/(^|[\s/])\w/g, (c) => c.toUpperCase())).trim();

async function main() {
  const c = await mysql.createConnection({
    host: 'localhost', user: 'root', password: 'saibatin123', database: 'tidore_lama',
  });
  const [rows] = await c.query<any[]>(
    'SELECT option_group, option_val, option_name FROM m_options WHERE option_group IN (?) AND status=1 ORDER BY option_group, CAST(option_val AS UNSIGNED)',
    [GROUPS],
  );
  const map: Record<string, Record<string, string>> = {};
  for (const r of rows) {
    (map[r.option_group] ??= {})[String(r.option_val)] = norm(String(r.option_name || ''));
  }
  const body =
    '// GENERATED dari m_options (tidore_lama) — jangan edit manual.\n' +
    '// Peta kode → nama untuk field berkode pada payload permohonan.\n' +
    'export const CODE_VALUES_MASTER: Record<string, Record<string, string>> = ' +
    JSON.stringify(map, null, 2) +
    ';\n';
  writeFileSync('lib/permohonan-lookup.ts', body);
  await c.end();
  console.log('✅ lib/permohonan-lookup.ts:', Object.entries(map).map(([g, v]) => `${g}=${Object.keys(v).length}`).join(', '));
}
main().catch((e) => { console.error(e); process.exit(1); });
