-- ===========================================================================
-- Kolom tambahan untuk Survei Kepuasan Masyarakat (t_skm_jawaban).
--
-- LATAR BELAKANG
-- Kuesioner SKM asli dinas (portal Laravel lama) mengumpulkan lebih banyak
-- data responden daripada yang ditampung tabel baru: pendidikan, jenis layanan
-- yang diurus, WhatsApp, dan email. Kolom-kolom itu ditambahkan supaya
-- formulir portal bisa menanyakan hal yang sama.
--
-- SIFAT: ADITIF MURNI & idempoten-secara-manual.
--   * hanya ADD COLUMN, semuanya NULL — baris lama tidak tersentuh;
--   * tidak ada DROP/DELETE/TRUNCATE, tidak mengubah kolom yang sudah ada;
--   * MySQL tidak punya "ADD COLUMN IF NOT EXISTS", jadi menjalankan dua kali
--     akan menghasilkan error "Duplicate column name" — itu AMAN (tidak ada
--     yang berubah). Cek dulu dengan query di langkah 1 kalau ragu.
--
-- CARA MENJALANKAN DI SERVER (jangan dibungkus ssh "..." dari laptop):
--     mysql daga <<'SQL'
--     ...tempel isi berkas ini...
--     SQL
--
-- ⚠️ Jalankan SEBELUM men-deploy kode yang memakainya. Kalau kode lebih dulu
--    mendarat, penyimpanan survei akan gagal karena kolomnya belum ada.
-- ===========================================================================

-- 1. Cek dulu: 0 = belum ada (lanjut ke langkah 2), 6 = sudah pernah dijalankan.
SELECT COUNT(*) AS kolom_sudah_ada
FROM information_schema.COLUMNS
WHERE TABLE_SCHEMA = DATABASE()
  AND TABLE_NAME = 't_skm_jawaban'
  AND COLUMN_NAME IN ('pendidikan', 'layanan', 'hp', 'email',
                      'masukan_layanan', 'usulan_layanan');

-- 2a. Data responden tambahan (mengikuti kuesioner asli dinas).
ALTER TABLE t_skm_jawaban
  ADD COLUMN pendidikan VARCHAR(20)  NULL AFTER pekerjaan,
  ADD COLUMN layanan    VARCHAR(60)  NULL AFTER pendidikan,
  ADD COLUMN hp         VARCHAR(25)  NULL AFTER layanan,
  ADD COLUMN email      VARCHAR(150) NULL AFTER hp;

-- 2b. Bagian "permohonan online yang perlu ditingkatkan" & usulan layanan baru.
--     Dipisah dari 2a karena ditambahkan belakangan; kalau 2a sudah pernah
--     dijalankan sendirian, cukup jalankan blok ini.
ALTER TABLE t_skm_jawaban
  ADD COLUMN masukan_layanan JSON NULL AFTER saran,
  ADD COLUMN usulan_layanan  TEXT NULL AFTER masukan_layanan;

-- 3. Verifikasi bentuk akhir tabel.
SHOW COLUMNS FROM t_skm_jawaban;

-- 4. Data lama harus tetap utuh (harapan: 107 di produksi per 6 Agu 2026).
SELECT COUNT(*) AS total_responden FROM t_skm_jawaban;
