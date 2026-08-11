-- ===========================================================================
-- Beri nama peran untuk level 41 → "operator".
--
-- 🔴 YANG TIDAK DISENTUH SAMA SEKALI: 40 akun penghuninya.
--    `user_id`, password, dan `userlevel_id` (tetap 41) tidak berubah satu pun,
--    jadi semua operator lama TETAP BISA LOGIN seperti biasa. Berkas ini hanya
--    mengubah SATU baris di `m_userlevels` — label peran, yang memang kita yang
--    tentukan, bukan data milik dinas.
--
-- LATAR BELAKANG
-- Di database Laravel dinas, `m_userlevels` HANYA berisi id 1–5
-- (administrator · operator capil · masyarakat · developer · operator opd),
-- sementara 40 akun sudah memakai `userlevel_id = 41`. Jadi 41 adalah angka
-- yatim: dipakai, tapi tak pernah punya baris nama.
-- Nama "operator desa" yang sempat tampil di portal ini adalah karangan skrip
-- migrasi kita (`prisma/etl-permohonan.ts`), BUKAN istilah dinas.
--
-- KENAPA "operator", bukan "operator desa"/"operator wilayah":
-- isi level 41 ternyata CAMPURAN — mayoritas operator wilayah
-- (`admin-kaiyasa`, `admin-topo`, …), tapi ada juga akun OPD (`opd-tidore`,
-- `galang-opd`) dan akun bernama orang (`admin-kurniawan`). Menyebutnya
-- "desa" atau "wilayah" akan salah untuk sebagian penghuninya.
-- Catatan: penamaan akunnya sendiri memang tidak konsisten sejak di sistem
-- lama (`admin-desagosale`, `admin-kelurahanakelamo`, `lurah-ome`, nama polos),
-- dan ada duplikat untuk wilayah yang sama (`admin-folarora` &
-- `admin-kelurahanfolarora`). Itu data mereka — dibiarkan apa adanya.
--
-- SIFAT: idempoten. `INSERT ... ON DUPLICATE KEY UPDATE` → aman dijalankan
-- berulang, dan tetap benar baik ketika baris 41 sudah ada maupun belum.
--
-- CARA MENJALANKAN DI SERVER (jangan dibungkus ssh "..." dari laptop):
--     mysql daga <<'SQL'
--     ...tempel isi berkas ini...
--     SQL
-- ===========================================================================

-- 1. Sebelum: lihat keadaan sekarang.
SELECT id, nama FROM m_userlevels ORDER BY id;

-- 2. Pastikan baris 41 ada dan bernama "operator".
INSERT INTO m_userlevels (id, nama) VALUES (41, 'operator')
  ON DUPLICATE KEY UPDATE nama = 'operator';

-- 3. Sesudah: nama level + jumlah akun tiap level.
SELECT l.id, l.nama, COUNT(u.id) AS jumlah_akun
FROM m_userlevels l
LEFT JOIN users u ON u.userlevel_id = l.id
GROUP BY l.id, l.nama
ORDER BY l.id;

-- 4. Bukti akun tidak tersentuh: 40 akun harus tetap di level 41 & status utuh.
SELECT COUNT(*) AS akun_level_41, SUM(status = 1) AS aktif
FROM users WHERE userlevel_id = 41;
