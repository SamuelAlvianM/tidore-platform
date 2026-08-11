-- ===========================================================================
-- Pindahkan 10 akun petugas dinas dari level 4 ("developer") ke level 2
-- ("operator capil"), dan pastikan level 5 ("operator opd") tersedia.
--
-- LATAR BELAKANG
-- `m_userlevels` warisan migrasi Laravel:
--     1 administrator · 2 operator capil · 3 masyarakat
--     4 developer     · 5 operator opd   · 41 operator desa
-- Portal terlanjur memperlakukan level 4 sebagai "Operator OPD", padahal isinya
-- 10 akun ORANG DINAS. Akibatnya dua-duanya salah:
--   * mereka DITOLAK seluruh endpoint dashboard (gerbangnya `level > 2`),
--     jadi tidak bisa mengerjakan tugasnya sama sekali;
--   * tapi `isPetugas()` berbunyi `level !== 3`, sehingga mereka TETAP dihitung
--     petugas dan bisa membaca seluruh tiket bantuan warga.
-- Memindahkan mereka ke level 2 menutup keduanya sekaligus.
--
-- Keputusan user (6 Agu 2026): SEMUA sepuluh akun ke level 2. Tidak ada yang
-- dinaikkan ke level 1 — level 1 bisa menghapus akun permanen & mengubah isi
-- situs, jadi penambahannya harus disebut satu per satu, bukan diborong.
--
-- SIFAT: idempoten & bertarget.
--   * Hanya menyentuh `user_id` yang disebut eksplisit di bawah;
--   * dijaga `userlevel_id = 4`, jadi menjalankan ulang tidak mengubah apa pun
--     dan tidak akan menurunkan akun yang sudah dipindah/dinaikkan manual;
--   * tidak ada DROP/DELETE/TRUNCATE, tidak menyentuh password.
--
-- CARA MENJALANKAN DI SERVER (jangan dibungkus ssh "..." dari laptop —
-- lihat catatan jebakan heredoc di journal):
--     mysql daga <<'SQL'
--     ...tempel isi berkas ini...
--     SQL
-- ===========================================================================

-- 1. Pastikan baris level yang dipakai portal ada. `INSERT IGNORE` supaya nama
--    "developer" / "operator capil" yang sudah ada TIDAK tertimpa.
INSERT IGNORE INTO m_userlevels (id, nama) VALUES (2, 'operator capil');
INSERT IGNORE INTO m_userlevels (id, nama) VALUES (5, 'operator opd');

-- 2. Sebelum: berapa yang akan tersentuh (harus 10 pada jalankan pertama).
SELECT COUNT(*) AS akan_dipindah
FROM users
WHERE userlevel_id = 4
  AND user_id IN (
    'kadis-capil', 'sek-capil', 'operator-tidore',
    'OPERATOR-SIAK', 'OPERATOR-SIAK1', 'OPERATOR-SIAK2',
    'operator-dafduk', 'operator-dafduk1',
    'galang-capil', 'piak-rafika'
  );

-- 3. Pemindahan.
UPDATE users
SET userlevel_id = 2
WHERE userlevel_id = 4
  AND user_id IN (
    'kadis-capil', 'sek-capil', 'operator-tidore',
    'OPERATOR-SIAK', 'OPERATOR-SIAK1', 'OPERATOR-SIAK2',
    'operator-dafduk', 'operator-dafduk1',
    'galang-capil', 'piak-rafika'
  );

-- 4. Sesudah: sebaran level. Harapan di DB `daga`:
--    level 2 bertambah 10 · level 4 tersisa akun yang TIDAK ada di daftar ini
--    (kalau produksi punya akun level 4 lain, ia sengaja tidak disentuh —
--     laporkan supaya diputuskan terpisah).
SELECT l.id, l.nama, COUNT(u.id) AS jumlah
FROM m_userlevels l
LEFT JOIN users u ON u.userlevel_id = l.id
GROUP BY l.id, l.nama
ORDER BY l.id;

-- 5. Sisa level 4 (idealnya kosong). Kalau ada isinya, itu akun di luar daftar.
SELECT id, user_id, user_fullname, status
FROM users
WHERE userlevel_id = 4;
