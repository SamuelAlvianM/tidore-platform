-- Samakan kode m_jenis_permohonan di DB produksi `daga` dengan kode kanonik
-- yang dicari API (LAYANAN_KODE di app/api/[layanan]/[action]/route.ts).
--
-- LATAR: ETL migrasi (scripts/etl-permohonan.ts) mengarang ejaan kode sendiri
-- dan hanya membuat jenis yang kebetulan punya arsip lama. Akibatnya 7 dari 15
-- layanan ditolak dengan "Jenis permohonan tidak valid" sejak cutover 1 Agustus.
-- DB lokal `tidore` sudah diperbaiki dengan perintah yang sama persis.
--
-- AMAN untuk permohonan yang sudah ada: 3 perintah pertama hanya mengganti
-- kolom `kode`; `id`/`jenisId` tidak disentuh, jadi 2.458 permohonan tetap utuh.
--
-- Jalankan di server:  mysql daga < 2026-08-03_perbaiki-jenis-permohonan.sql
-- (atau paste isinya di dalam sesi `mysql daga`)

-- ── 1. Tiga kode yang ejaannya beda ──
UPDATE m_jenis_permohonan SET kode = 'AKTA_KELAHIRAN_NIK_BLM_ADA'
  WHERE kode = 'AKTA_KELAHIRAN_NIK_TIDAK_ADA';
UPDATE m_jenis_permohonan SET kode = 'KK_UBAH_BIODATA'
  WHERE kode = 'KK_PERUBAHAN_BIODATA';
UPDATE m_jenis_permohonan SET kode = 'KONSOLIDASI'
  WHERE kode = 'KONSOLIDASI_DATA';

-- ── 2. Empat jenis yang belum punya barisnya (tabel lama kosong) ──
INSERT INTO m_jenis_permohonan (kode, nama, kategori, aktif, urutan)
SELECT * FROM (
  SELECT 'AKTA_NIKAH'      AS kode, 'Akta Perkawinan/Nikah'   AS nama, 'CAPIL'  AS kategori, 1 AS aktif, 12 AS urutan
  UNION ALL SELECT 'AKTA_PERCERAIAN', 'Akta Perceraian',        'CAPIL',  1, 13
  UNION ALL SELECT 'KTP_EL',          'KTP Elektronik',         'DAFDUK', 1, 14
  UNION ALL SELECT 'PINDAH',          'Surat Keterangan Pindah','DAFDUK', 1, 15
) AS baru
WHERE NOT EXISTS (
  SELECT 1 FROM m_jenis_permohonan m WHERE m.kode = baru.kode
);

-- ── 3. Verifikasi: harus 15 baris, dan daftar di bawah harus kosong ──
SELECT COUNT(*) AS jumlah_jenis FROM m_jenis_permohonan;

SELECT k.kode AS kode_hilang FROM (
  SELECT 'AKTA_KELAHIRAN_NIK_ADA' AS kode
  UNION ALL SELECT 'AKTA_KELAHIRAN_NIK_BLM_ADA'
  UNION ALL SELECT 'AKTA_KEMATIAN'
  UNION ALL SELECT 'AKTA_NIKAH'
  UNION ALL SELECT 'AKTA_PERCERAIAN'
  UNION ALL SELECT 'KIA'
  UNION ALL SELECT 'KTP_EL'
  UNION ALL SELECT 'PINDAH'
  UNION ALL SELECT 'KEDATANGAN'
  UNION ALL SELECT 'KONSOLIDASI'
  UNION ALL SELECT 'KK_TAMBAH_ANAK'
  UNION ALL SELECT 'KK_PISAH'
  UNION ALL SELECT 'KK_NUMPANG'
  UNION ALL SELECT 'KK_UBAH_BIODATA'
  UNION ALL SELECT 'KK_CETAK_ULANG'
) k
LEFT JOIN m_jenis_permohonan m ON m.kode = k.kode
WHERE m.kode IS NULL;

-- ── 4. Permohonan lama harus tetap utuh (angka acuan: 2458) ──
SELECT COUNT(*) AS jumlah_permohonan FROM t_permohonan;
