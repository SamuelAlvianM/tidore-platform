-- DAGA — tambah dimensi PERIODE (tahun + semester) pada m_demografi_wilayah.
--
-- WAJIB DIJALANKAN SEBELUM deploy build yang memuat pemilih periode demografi.
-- Kode sekarang menyaring SETIAP kueri demografi dengan `tahun` dan `semester`
-- (prisma/schema.prisma, model DemografiWilayah). Tanpa kedua kolom ini Prisma
-- menyebut kolom yang tidak ada -> seluruh endpoint demografi balas 500,
-- termasuk kartu statistik di beranda publik.
--
-- KENAPA TIDAK CUKUP `prisma db push` / `migrate diff` mentah.
-- SQL bawaannya menambah kedua kolom NOT NULL TANPA nilai awal. 784 baris yang
-- sudah ada akan terisi 0/0 -- tidak terhapus, tapi tak pernah cocok dengan
-- periode mana pun, jadi HILANG DARI LAYAR. Berkas ini menambah kolomnya BERIKUT
-- nilai isian, lalu membuang DEFAULT-nya supaya bentuk akhir tabel sama persis
-- dengan skema Prisma (kalau DEFAULT ditinggal, `migrate diff` berikutnya akan
-- terus melaporkan selisih).
--
-- PERIODE YANG DIPAKAI: 2025 Semester II.
-- Bukan tebakan: diambil dari catatan dinas sendiri di basis data ini,
--   SELECT konten FROM t_static_contents WHERE kunci='beranda.dkb-periode';
--   -> {"label": "DKB Semester II 2025"}
-- 784 baris ini: 8 kategori DKB; 8 kecamatan + 89 desa; kode 8272 Tidore
-- Kepulauan. Salinan lokalnya berlabel 2024 semester 2, tapi catatan dinas di
-- produksi inilah yang menang.
-- Kunci lama itu kini TIDAK dipakai lagi oleh kode: badge periode di beranda
-- dihitung dari kolom tahun/semester baris datanya, jadi isian ini yang akan
-- dibaca warga. Kalau perlu digeser, satu perintah dan tidak merusak apa pun:
--     UPDATE m_demografi_wilayah SET tahun = 2026, semester = 1;
--
-- DDL MySQL TIDAK bisa di-rollback (ALTER TABLE memicu commit implisit), jadi
-- backup di bawah BUKAN formalitas.
--
-- Jalankan di server produksi (VPS 76.13.17.46):
--
--   set -a; . /root/tidore-platform/.env; set +a
--   mysqldump -u"$DB_USER" -p"$DB_PASSWORD" --single-transaction --no-tablespaces --     "$DB_NAME" > /root/backup-sebelum-periode-$(date +%F-%H%M).sql
--   mysql -u"$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" < /root/periode-demografi.sql
--
-- Verifikasi sesudahnya (784 baris, semuanya 2025/2):
--   SELECT tahun, semester, COUNT(*) FROM m_demografi_wilayah GROUP BY tahun, semester;

-- 1. Kolom periode + isian untuk baris lama.
ALTER TABLE m_demografi_wilayah
  ADD COLUMN tahun    SMALLINT NOT NULL DEFAULT 2025 AFTER kategori,
  ADD COLUMN semester TINYINT  NOT NULL DEFAULT 2    AFTER tahun;

-- 2. Buang DEFAULT: skema Prisma tidak punya default, dan baris baru selalu
--    mengirim periodenya sendiri.
ALTER TABLE m_demografi_wilayah
  ALTER COLUMN tahun    DROP DEFAULT,
  ALTER COLUMN semester DROP DEFAULT;

-- 3. Tukar indeks lama -> indeks berperiode.
--    Unik lama (kategori, kode) HARUS pergi: tanpa itu satu kode wilayah tidak
--    bisa punya baris di dua semester berbeda.
DROP INDEX m_demografi_wilayah_kategori_kode_key  ON m_demografi_wilayah;
DROP INDEX m_demografi_wilayah_kategori_level_idx ON m_demografi_wilayah;

CREATE UNIQUE INDEX m_demografi_wilayah_periode_kode_key
  ON m_demografi_wilayah (kategori, tahun, semester, kode);
CREATE INDEX m_demografi_wilayah_periode_level_idx
  ON m_demografi_wilayah (kategori, tahun, semester, level);

-- 4. Selisih kecil di luar demografi: skema menandai user_ktp nullable.
ALTER TABLE users MODIFY user_ktp VARCHAR(191) NULL;
