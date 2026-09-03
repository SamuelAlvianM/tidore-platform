-- ===========================================================================
-- Menu "Profil Kependudukan" — daftarkan 3 Buku Profil Perkembangan
-- Kependudukan (2021, 2022, 2023) sebagai dokumen publikasi.
--
-- APA YANG DILAKUKAN
-- 1. Menambah 3 baris di `t_produk` dengan `jenis = 'BUKU_PROFIL'` — kategori
--    yang SUDAH ADA di lib/dokumen-registry.ts. Ketiganya otomatis tampil di
--    dua halaman: /profil-kependudukan (menu navbar baru) dan
--    /ppid/buku-profil-kependudukan (halaman PPID lama).
-- 2. (opsional) Menambah 1 baris teks halaman di `t_static_contents`. Boleh
--    dilewati: tanpa baris ini halaman tetap memakai teks bawaan dari kode
--    (lib/static-content-registry.ts). Gunanya cuma supaya isinya sudah
--    terlihat "tersimpan" di dashboard Konten Halaman.
--
-- 🔴 PRASYARAT — BERKAS PDF HARUS SUDAH ADA DI SERVER.
--    Ketiga PDF ikut bundle deploy di `public/uploads/produk/`, jadi jalankan
--    SQL ini SETELAH `bash deploy/deploy.sh` selesai. Kalau dijalankan lebih
--    dulu, barisnya ada tapi tautannya 404.
--    Periksa dulu di server:
--      ls -la /root/tidore-platform/public/uploads/produk/profil-kependudukan-*.pdf
--
-- SIFAT: idempoten. Tiap INSERT dijaga `WHERE NOT EXISTS` pada `file` /
-- `ON DUPLICATE KEY UPDATE` pada `kunci`, jadi aman dijalankan berulang dan
-- tidak akan menggandakan dokumen.
--
-- ⚠️ Jangan dibungkus `ssh "..."` dari laptop. Paste langsung di shell server
--    dengan heredoc berkuota:
--      mysql daga <<'SQL'
--      … isi berkas ini …
--      SQL
-- ===========================================================================

-- Teks di bawah memuat tanda pisah "—" dan huruf beraksen. Tanpa baris ini,
-- klien mysql yang jatuh ke latin1 akan menyimpannya sebagai karakter rusak.
SET NAMES utf8mb4;

-- --------------------------------------------------------------------------
-- 1. Tiga buku profil
-- --------------------------------------------------------------------------
-- created_at/updated_at diisi eksplisit dengan UTC_TIMESTAMP(3): kolom waktu
-- portal ini disimpan dalam UTC (mysqld.cnf dipaku `default-time-zone='+00:00'`)
-- dan aplikasi yang mengubahnya ke WIT saat ditampilkan.

INSERT INTO t_produk (jenis, judul, file, created_at, updated_at)
SELECT 'BUKU_PROFIL',
       'Buku Profil Perkembangan Kependudukan Kota Tidore Kepulauan Tahun 2021',
       '/uploads/produk/profil-kependudukan-2021.pdf',
       UTC_TIMESTAMP(3), UTC_TIMESTAMP(3)
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM t_produk
  WHERE jenis = 'BUKU_PROFIL'
    AND file = '/uploads/produk/profil-kependudukan-2021.pdf'
);

INSERT INTO t_produk (jenis, judul, file, created_at, updated_at)
SELECT 'BUKU_PROFIL',
       'Buku Profil Perkembangan Kependudukan Kota Tidore Kepulauan Tahun 2022',
       '/uploads/produk/profil-kependudukan-2022.pdf',
       UTC_TIMESTAMP(3), UTC_TIMESTAMP(3)
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM t_produk
  WHERE jenis = 'BUKU_PROFIL'
    AND file = '/uploads/produk/profil-kependudukan-2022.pdf'
);

INSERT INTO t_produk (jenis, judul, file, created_at, updated_at)
SELECT 'BUKU_PROFIL',
       'Buku Profil Perkembangan Kependudukan Kota Tidore Kepulauan Tahun 2023',
       '/uploads/produk/profil-kependudukan-2023.pdf',
       UTC_TIMESTAMP(3), UTC_TIMESTAMP(3)
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM t_produk
  WHERE jenis = 'BUKU_PROFIL'
    AND file = '/uploads/produk/profil-kependudukan-2023.pdf'
);

-- --------------------------------------------------------------------------
-- 2. Teks halaman (opsional — halaman tetap jalan tanpa baris ini)
-- --------------------------------------------------------------------------
-- ON DUPLICATE KEY UPDATE id=id → kalau dinas SUDAH menyunting teksnya lewat
-- Mode Edit, suntingan itu TIDAK ditimpa saat SQL ini dijalankan ulang.

INSERT INTO t_static_contents (kunci, judul, konten, updated_at, created_at)
VALUES (
  'profil-kependudukan.halaman',
  'Halaman — Profil Kependudukan',
  JSON_OBJECT(
    'judul', 'Profil Perkembangan Kependudukan',
    'intro', 'Buku Profil Perkembangan Kependudukan Kota Tidore Kepulauan disusun setiap tahun sebagai penyajian data dan informasi kondisi kependudukan — jumlah dan persebaran penduduk, karakteristik demografi dan sosial, keluarga, kualitas penduduk, mobilitas, serta kepemilikan dokumen kependudukan. Pilih tahun terbitan di bawah ini untuk membaca atau mengunduh bukunya.',
    'sumber', 'Sumber data: Sistem Informasi Administrasi Kependudukan (SIAK) hasil konsolidasi Ditjen Dukcapil Kementerian Dalam Negeri, diolah Dinas Kependudukan dan Pencatatan Sipil Kota Tidore Kepulauan.'
  ),
  UTC_TIMESTAMP(3), UTC_TIMESTAMP(3)
)
ON DUPLICATE KEY UPDATE id = id;

-- --------------------------------------------------------------------------
-- 3. Verifikasi — harus 3 baris, semuanya menunjuk /uploads/produk/…
-- --------------------------------------------------------------------------
SELECT id, judul, file, created_at
FROM t_produk
WHERE jenis = 'BUKU_PROFIL'
ORDER BY judul;

SELECT kunci, judul, updated_at FROM t_static_contents
WHERE kunci = 'profil-kependudukan.halaman';
