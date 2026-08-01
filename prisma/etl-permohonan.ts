/**
 * ETL Laravel (tidore_lama) → Prisma (tidore)
 * Prioritas: DATA MASUK & LOSSLESS. Seluruh kolom sumber disimpan di payload JSON,
 * kolom umum di-lift ke field Permohonan. Berkas dari kolom syaratDok_*.
 *
 * Jalankan:  npx tsx prisma/etl-permohonan.ts
 * Ulangi aman: script reset tabel target dulu (users, permohonan, berkas, dst).
 */
import { PrismaClient } from '@prisma/client';
import mysql from 'mysql2/promise';

const prisma = new PrismaClient();

const SOURCE = {
  host: 'localhost', port: 3306, user: 'root', password: 'saibatin123', database: 'tidore_lama',
};

// userlevel_id → nama (41 = operator desa/OPD, tak ada di m_userlevels lama)
const USER_LEVELS: Record<number, string> = {
  1: 'administrator', 2: 'operator capil', 3: 'masyarakat',
  4: 'developer', 5: 'operator opd', 41: 'operator desa',
};

// tabel sumber berisi → jenis permohonan. (tabel kosong dilewati.)
const TABEL_JENIS: { tabel: string; kode: string; nama: string; kategori: 'CAPIL' | 'DAFDUK' }[] = [
  { tabel: 't_kelahiran_1', kode: 'AKTA_KELAHIRAN_NIK_ADA', nama: 'Akta Kelahiran (NIK Sudah Ada)', kategori: 'CAPIL' },
  { tabel: 't_kelahiran_2', kode: 'AKTA_KELAHIRAN_NIK_TIDAK_ADA', nama: 'Akta Kelahiran (NIK Belum Ada)', kategori: 'CAPIL' },
  { tabel: 't_kematian', kode: 'AKTA_KEMATIAN', nama: 'Akta Kematian', kategori: 'CAPIL' },
  { tabel: 't_kk_tambahanak', kode: 'KK_TAMBAH_ANAK', nama: 'KK — Tambah Anak', kategori: 'DAFDUK' },
  { tabel: 't_kk_cetakulang', kode: 'KK_CETAK_ULANG', nama: 'KK — Cetak Ulang', kategori: 'DAFDUK' },
  { tabel: 't_kk_pisahkk', kode: 'KK_PISAH', nama: 'KK — Pisah KK', kategori: 'DAFDUK' },
  { tabel: 't_kk_perubahanbiodata', kode: 'KK_PERUBAHAN_BIODATA', nama: 'KK — Perubahan Biodata', kategori: 'DAFDUK' },
  { tabel: 't_kk_numpang', kode: 'KK_NUMPANG', nama: 'KK — Numpang KK', kategori: 'DAFDUK' },
  { tabel: 't_kedatangan', kode: 'KEDATANGAN', nama: 'Surat Pindah Datang', kategori: 'DAFDUK' },
  { tabel: 't_kia', kode: 'KIA', nama: 'Kartu Identitas Anak (KIA)', kategori: 'DAFDUK' },
  { tabel: 't_konsolidasiupdatedata', kode: 'KONSOLIDASI_DATA', nama: 'Konsolidasi / Update Data', kategori: 'DAFDUK' },
];

// progress_status (int) → status baru. Nilai mentah TETAP disimpan di payload.
function mapStatus(v: unknown): string {
  const n = Number(v);
  if (n === 0) return 'DITOLAK';
  if (n === 1) return 'SELESAI';
  if (n === 2) return 'DIPROSES';
  if (n === 5) return 'DITOLAK';   // cancelled
  if (n === 3 || n === 6 || n === 7) return 'DIPROSES';
  return 'MENUNGGU';
}

const findKey = (row: Record<string, any>, re: RegExp) =>
  Object.keys(row).find((k) => re.test(k));

async function main() {
  const src = await mysql.createConnection(SOURCE);
  console.log('🔌 Terhubung ke tidore_lama');

  // ── 0. RESET target (idempotent) ──────────────────────────────────────────
  console.log('🧹 Reset tabel target...');
  await prisma.berkas.deleteMany();
  await prisma.permohonan.deleteMany();
  // bersihkan dependensi user dari seed dummy (hindari FK error)
  await prisma.tiketPesan.deleteMany().catch(() => {});
  await prisma.tiket.deleteMany().catch(() => {});
  await prisma.notifikasi.deleteMany().catch(() => {});
  await prisma.logAktivitas.deleteMany().catch(() => {});
  await prisma.$executeRawUnsafe('DELETE FROM users');
  await prisma.$executeRawUnsafe('DELETE FROM m_jenis_permohonan');
  await prisma.$executeRawUnsafe('DELETE FROM m_userlevels');

  // ── 1. UserLevel ──────────────────────────────────────────────────────────
  for (const [id, nama] of Object.entries(USER_LEVELS)) {
    await prisma.userLevel.create({ data: { id: Number(id), nama } });
  }
  console.log(`✅ UserLevel: ${Object.keys(USER_LEVELS).length}`);

  // ── 2. Users (id dipertahankan utk FK) ─────────────────────────────────────
  const [users] = await src.query<any[]>('SELECT * FROM users');
  let uCount = 0;
  for (const u of users) {
    await prisma.user.create({
      data: {
        id: u.id,
        userId: String(u.user_id ?? `nouser-${u.id}`),
        password: u.password ?? '',
        userlevelId: USER_LEVELS[u.userlevel_id] ? u.userlevel_id : 3,
        userFullname: u.user_fullname ?? null,
        userNik: u.user_nik ?? null,
        userNokk: u.user_nokk ?? null,
        userHp: u.user_hp ?? null,
        userEmail: u.user_email ?? null,
        userKecamatan: u.user_kecamatan_name ?? null,
        userFoto: u.face_photo_path ?? null,
        activationCode: u.activation_code ?? null,
        activationTime: u.activation_time && !String(u.activation_time).startsWith('0000') ? u.activation_time : null,
        status: Number(u.status ?? 0),
        ket: u.ket ?? null,
        createdBy: u.created_by ?? null,
        updatedBy: u.updated_by ?? null,
        createdAt: u.created_at && !String(u.created_at).startsWith('0000') ? u.created_at : new Date(),
        updatedAt: u.updated_at && !String(u.updated_at).startsWith('0000') ? u.updated_at : new Date(),
      },
    });
    uCount++;
  }
  console.log(`✅ Users: ${uCount}`);

  // peta NIK → user.id + himpunan id user valid (untuk link permohonan)
  const nikToUser = new Map<string, number>();
  const validUserIds = new Set<number>();
  for (const u of users) {
    validUserIds.add(u.id);
    if (u.user_nik) nikToUser.set(String(u.user_nik), u.id);
    if (u.user_id) nikToUser.set(String(u.user_id), u.id);
  }
  // fallback user utk permohonan tanpa akun cocok
  const fallback = await prisma.user.create({
    data: { userId: 'migrasi-tanpa-akun', password: '', userlevelId: 3,
      userFullname: 'Pemohon Tanpa Akun (migrasi)', status: 0 },
  });

  // ── 3. JenisPermohonan ─────────────────────────────────────────────────────
  const jenisId = new Map<string, number>();
  for (let i = 0; i < TABEL_JENIS.length; i++) {
    const j = TABEL_JENIS[i];
    const rec = await prisma.jenisPermohonan.create({
      data: { kode: j.kode, nama: j.nama, kategori: j.kategori, urutan: i + 1 },
    });
    jenisId.set(j.tabel, rec.id);
  }
  console.log(`✅ JenisPermohonan: ${TABEL_JENIS.length}`);

  // ── 4. Permohonan + Berkas ─────────────────────────────────────────────────
  let pTotal = 0, bTotal = 0, dupNoreg = 0;
  const seenNoreg = new Set<string>();

  for (const j of TABEL_JENIS) {
    const [rows] = await src.query<any[]>(`SELECT * FROM \`${j.tabel}\``);
    if (!rows.length) { console.log(`  · ${j.tabel}: 0 baris`); continue; }

    const sample = rows[0];
    const kNoreg = findKey(sample, /nomorPermohonan|no_?register|noreg/i);
    const kNik = findKey(sample, /pemohon_?nik|nik_?pemohon/i);
    const kStatus = findKey(sample, /progress_status/i);
    const kCatatan = findKey(sample, /catatan/i);
    const kCreated = findKey(sample, /^created_at$/i);
    const kUpdated = findKey(sample, /^updated_at$/i);
    const kCreatedBy = findKey(sample, /^created_by$/i);
    const berkasKeys = Object.keys(sample).filter((k) => /syaratDok|^scan|berkas/i.test(k));

    let pn = 0, bn = 0;
    for (const r of rows) {
      // noregister unik
      let noreg = String(r[kNoreg!] ?? `${j.kode}-${r.id}`);
      if (seenNoreg.has(noreg)) { noreg = `${noreg}-${r.id}`; dupNoreg++; }
      seenNoreg.add(noreg);

      // link ke akun pembuat (created_by) — paling akurat; fallback ke NIK pemohon, lalu placeholder
      const nik = kNik ? String(r[kNik] ?? '') : '';
      const cby = kCreatedBy ? Number(r[kCreatedBy]) : NaN;
      const userId = (Number.isFinite(cby) && validUserIds.has(cby))
        ? cby
        : (nikToUser.get(nik) ?? fallback.id);
      const created = kCreated && r[kCreated] && !String(r[kCreated]).startsWith('0000') ? r[kCreated] : new Date();
      const updated = kUpdated && r[kUpdated] && !String(r[kUpdated]).startsWith('0000') ? r[kUpdated] : created;

      // payload = SELURUH baris (lossless) + tandai nilai mentah status
      const payload: Record<string, any> = { ...r, _progress_status_raw: kStatus ? r[kStatus] : null, _sumber_tabel: j.tabel };

      const p = await prisma.permohonan.create({
        data: {
          noregister: noreg,
          userId,
          jenisId: jenisId.get(j.tabel)!,
          status: mapStatus(kStatus ? r[kStatus] : undefined),
          payload,
          catatan: kCatatan ? (r[kCatatan] ?? null) : null,
          createdAt: created,
          updatedAt: updated,
        },
      });
      pn++;

      // Berkas dari kolom syaratDok_* yang terisi
      for (const bk of berkasKeys) {
        const val = r[bk];
        if (!val || String(val).trim() === '' || String(val) === '0') continue;
        await prisma.berkas.create({
          data: {
            permohonanId: p.id,
            namaFile: String(val),
            path: String(val).startsWith('/') || String(val).startsWith('uploads') ? String(val) : `/uploads/${val}`,
          },
        });
        bn++;
      }
    }
    console.log(`  · ${j.tabel}: ${pn} permohonan, ${bn} berkas`);
    pTotal += pn; bTotal += bn;
  }

  console.log(`\n✅ SELESAI — Permohonan: ${pTotal}, Berkas: ${bTotal}${dupNoreg ? `, noreg duplikat disuffix: ${dupNoreg}` : ''}`);
  await src.end();
  await prisma.$disconnect();
}

main().catch((e) => { console.error('❌ ETL gagal:', e); process.exit(1); });
