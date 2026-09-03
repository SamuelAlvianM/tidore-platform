/**
 * Uji bolak-balik penyandian alasan penolakan.
 *
 * 🔴 KENAPA INI ADA. `susun()` dan `uraikan()` adalah satu-satunya jalan masuk
 * dan keluar untuk seluruh penolakan permohonan, dan keduanya bekerja pada
 * SATU kolom teks. Kalau salah satu bergeser sedikit saja — satu spasi, satu
 * titik — penolakan yang sudah tersimpan berhenti terbaca sebagai alasan dan
 * jatuh jadi keterangan bebas. Tidak ada galat: warga cuma melihat blok teks
 * alih-alih daftar.
 *
 * Yang dijaga terutama: CATATAN LAMA HARUS TETAP TERBACA. Ribuan penolakan
 * ditulis sebelum fitur ini ada, dan isinya satu-satunya penjelasan yang
 * pernah diterima warga.
 *
 * Dijalankan dengan tsx yang sudah dipakai project — sengaja tidak menambah
 * kerangka uji baru ke portal yang sedang melayani.
 *
 *     npm run tolak:uji
 */
import { susun, uraikan, pilihanRincian, labelSah } from '../lib/tolak-permohonan';
import { formDariKode } from '../lib/layanan-kode';

let gagal = 0;

function cek(nama: string, dapat: unknown, harap: unknown) {
  const a = JSON.stringify(dapat);
  const b = JSON.stringify(harap);
  if (a === b) {
    console.log(`✓  ${nama}`);
  } else {
    console.error(`❌ ${nama}\n     dapat : ${a}\n     harap : ${b}`);
    gagal++;
  }
}

// ── 1. Bolak-balik lengkap ────────────────────────────────────────────────
const teks = susun(
  'Berkas tidak lengkap',
  ['File Kartu Keluarga', 'File Akta Lahir'],
  'Kartu Keluarga yang diunggah terpotong pada bagian bawah.',
);
cek('susun() menghasilkan tiga baris', teks.split('\n').length, 3);
cek('bolak-balik utuh', uraikan(teks), {
  alasan: 'Berkas tidak lengkap',
  rincian: ['File Kartu Keluarga', 'File Akta Lahir'],
  keterangan: 'Kartu Keluarga yang diunggah terpotong pada bagian bawah.',
});

// ── 2. "Lainnya" tidak ditulis sebagai baris ──────────────────────────────
cek('"Lainnya" tidak jadi baris sendiri',
  susun('Lainnya', [], 'Pemohon belum berusia 17 tahun.'),
  'Pemohon belum berusia 17 tahun.');

// ── 3. Rincian kosong tidak menyisakan baris kosong ───────────────────────
cek('tanpa rincian, tetap dua baris',
  susun('NIK / dokumen tidak valid', [], 'NIK tidak terdaftar di database.'),
  'NIK / dokumen tidak valid\nNIK tidak terdaftar di database.');

// ── 4. 🔴 Catatan LAMA (teks bebas) tetap terbaca ─────────────────────────
cek('catatan lama jadi keterangan, bukan hilang',
  uraikan('Silakan lengkapi berkas dan ajukan kembali.'),
  { alasan: '', rincian: [], keterangan: 'Silakan lengkapi berkas dan ajukan kembali.' });

cek('catatan lama berisi alasan baku saja',
  uraikan('Berkas tidak lengkap'),
  { alasan: 'Berkas tidak lengkap', rincian: [], keterangan: '' });

// ── 5. Alasan hanya dikenali di baris PERTAMA ─────────────────────────────
cek('alasan di tengah keterangan bukan label',
  uraikan('Menurut petugas loket:\nBerkas tidak lengkap'),
  { alasan: '', rincian: [], keterangan: 'Menurut petugas loket:\nBerkas tidak lengkap' });

// ── 6. Kosong & null ──────────────────────────────────────────────────────
cek('null aman', uraikan(null), { alasan: '', rincian: [], keterangan: '' });
cek('spasi saja aman', uraikan('   \n  '), { alasan: '', rincian: [], keterangan: '' });

// ── 7. CRLF dari salin-tempel Windows ─────────────────────────────────────
cek('CRLF diurai sama dengan LF',
  uraikan('Berkas tidak lengkap\r\nData yang perlu dilengkapi: File Ijazah.'),
  { alasan: 'Berkas tidak lengkap', rincian: ['File Ijazah'], keterangan: '' });

// ── 8. Pilihan rincian dibaca dari skema formulir ─────────────────────────
const form = formDariKode('KK_UBAH_BIODATA');
const grup = pilihanRincian(form);
cek('dua grup: Isian & Lampiran', grup.map((g) => g.judul), ['Isian', 'Lampiran']);
cek('lampiran berisi File Kartu Keluarga',
  grup.find((g) => g.judul === 'Lampiran')?.item.includes('File Kartu Keluarga'), true);
cek('tidak ada label kembar',
  labelSah(form).length, new Set(labelSah(form)).size);

// ── 9. Jenis warisan tanpa formulir tidak melempar ────────────────────────
cek('SAKINAH tak punya formulir', formDariKode('SAKINAH'), undefined);
cek('pilihan untuk jenis warisan = daftar kosong', pilihanRincian(formDariKode('SAKINAH')), []);

// ── 10. Rincian yang mengandung koma tidak diurai jadi dua ────────────────
// ⚠️ Batas yang diketahui: pemisahnya koma, jadi label ber-koma akan pecah.
// Tidak ada label demikian di 15 formulir — diperiksa di sini supaya
// pelanggarannya ketahuan saat label baru ditambahkan, bukan saat warga
// menerima daftar yang aneh.
const semuaLabel = [
  'AKTA_KELAHIRAN_NIK_ADA', 'AKTA_KELAHIRAN_NIK_BLM_ADA', 'AKTA_KEMATIAN',
  'AKTA_NIKAH', 'AKTA_PERCERAIAN', 'KIA', 'KTP_EL', 'PINDAH', 'KEDATANGAN',
  'KONSOLIDASI', 'KK_TAMBAH_ANAK', 'KK_PISAH', 'KK_NUMPANG',
  'KK_UBAH_BIODATA', 'KK_CETAK_ULANG',
].flatMap((k) => labelSah(formDariKode(k)));
cek('tidak ada label mengandung koma',
  semuaLabel.filter((l) => l.includes(',')), []);

console.log();
if (gagal) {
  console.error(`${gagal} pemeriksaan GAGAL.`);
  process.exit(1);
}
console.log('Semua pemeriksaan lolos.');
