/**
 * Survei Kepuasan Masyarakat (SKM) — 9 unsur, skala 1–4.
 *
 * 🔴 ISI DI BAWAH BUKAN KARANGAN. Ini kuesioner SKM yang BENAR-BENAR DIPAKAI
 * Disdukcapil pada portal Laravel lama, diambil apa adanya dari tabel
 * `m_mediainformasi_skm_pertanyaan` & `m_mediainformasi_skm_opsi` di database
 * `tidore_lama` (dibuat 2021-09-12, `status=1`, diurutkan `sort` 1–9).
 * Formatnya mengikuti **Permenpan RB 14/2017**: 9 unsur, skala 1–4, dan tiap
 * unsur punya LABEL SENDIRI ("Sangat Mudah" vs "Sangat Sesuai" vs "Gratis") —
 * bukan angka telanjang.
 *
 * ⚠️ Sebelum ini portal memakai **6 aspek karangan sendiri dengan skala 1–5**.
 * Dua akibatnya:
 *   1. jawaban baru tidak sebanding dengan 107 responden warisan;
 *   2. Nilai IKM dihitung `(rata/5)×100`, padahal SKM memakai `NRR × 25`
 *      (yaitu `(rata/4)×100`) — angkanya jadi jauh lebih rendah dari seharusnya.
 *
 * KUNCI PENYIMPANAN `u0`–`u8` sengaja dipertahankan sama persis dengan data
 * lama (`SkmJawaban.jawaban`), supaya jawaban lama & baru berada dalam satu
 * bentuk dan bisa direkap bersama tanpa penebakan. Urutannya terverifikasi:
 * blade lama mengurutkan pertanyaan dengan `sort` lalu merender indeks 0–8,
 * jadi `u0` = unsur bernomor 1.
 */

export interface UnsurSkm {
  /** Kunci di `SkmJawaban.jawaban` — sama dengan kolom `..._u0`..`_u8` lama. */
  kunci: string;
  /** Nomor unsur 1–9 (Permenpan). */
  nomor: number;
  /** Label pendek untuk grafik dashboard. */
  judul: string;
  /** Kalimat penuh yang dibaca warga di formulir. */
  pertanyaan: string;
  /** Label nilai 1, 2, 3, 4 — khas per unsur. */
  opsi: readonly [string, string, string, string];
}

export const SKM_UNSUR: readonly UnsurSkm[] = [
  {
    kunci: "u0",
    nomor: 1,
    judul: "Persyaratan",
    pertanyaan:
      "Kesesuaian persyaratan pelayanan dengan jenis pelayanan yang didapatkan",
    opsi: ["Tidak Sesuai", "Kurang Sesuai", "Sesuai", "Sangat Sesuai"],
  },
  {
    kunci: "u1",
    nomor: 2,
    judul: "Prosedur",
    pertanyaan: "Kemudahan prosedur pelayanan Administrasi Kependudukan",
    opsi: ["Tidak Mudah", "Kurang Mudah", "Mudah", "Sangat Mudah"],
  },
  {
    kunci: "u2",
    nomor: 3,
    judul: "Waktu Pelayanan",
    pertanyaan: "Kecepatan waktu dalam pelayanan Administrasi Kependudukan",
    opsi: ["Tidak Cepat", "Kurang Cepat", "Cepat", "Sangat Cepat"],
  },
  {
    kunci: "u3",
    nomor: 4,
    judul: "Biaya/Tarif",
    pertanyaan:
      "Biaya/tarif pelayanan dokumen Kependudukan dan Pencatatan Sipil",
    opsi: ["Sangat Mahal", "Cukup Mahal", "Murah", "Gratis"],
  },
  {
    kunci: "u4",
    nomor: 5,
    judul: "Produk & SOP",
    pertanyaan:
      "Kesesuaian SOP dan standar pelayanan setiap produk pelayanan dengan hasil yang diterima",
    opsi: ["Tidak Sesuai", "Kurang Sesuai", "Sesuai", "Sangat Sesuai"],
  },
  {
    kunci: "u5",
    nomor: 6,
    judul: "Kompetensi Petugas",
    pertanyaan:
      "Kemampuan dan kecakapan petugas dalam memberikan pelayanan",
    opsi: ["Tidak Mampu", "Kurang Mampu", "Mampu", "Sangat Mampu"],
  },
  {
    kunci: "u6",
    nomor: 7,
    judul: "Perilaku Petugas",
    pertanyaan:
      "Perilaku petugas (kesopanan dan keramahan) dalam memberikan pelayanan kepada masyarakat",
    opsi: ["Tidak Sopan", "Kurang Sopan", "Sopan", "Sangat Sopan"],
  },
  {
    kunci: "u7",
    nomor: 8,
    judul: "Sarana & Prasarana",
    pertanyaan:
      "Kualitas sarana dan prasarana pada Dinas Kependudukan dan Pencatatan Sipil",
    opsi: ["Tidak Memadai", "Kurang Memadai", "Memadai", "Sangat Memadai"],
  },
  {
    kunci: "u8",
    nomor: 9,
    judul: "Penanganan Pengaduan",
    pertanyaan: "Ketersediaan pelayanan pengaduan bagi pengguna layanan",
    opsi: ["Tidak Mudah", "Kurang Mudah", "Mudah", "Sangat Mudah"],
  },
] as const;

/** Skala SKM = 1–4 (Permenpan RB 14/2017). Bukan 1–5. */
export const SKM_SKALA_MAX = 4;

/**
 * Pilihan jenis permohonan pada formulir survei.
 *
 * 🔴 Daftar ini HARUS sama dengan yang benar-benar bisa diajukan warga di
 * `/user/pengajuan/baru` — sumbernya `LAYANAN_FORMS` (`lib/layanan-forms.ts`),
 * 15 layanan. Disalin sebagai teks (bukan diimpor) supaya halaman survei publik
 * tidak ikut menyeret seluruh skema formulir permohonan ke bundel klien.
 * ⚠️ Kalau `LAYANAN_FORMS` bertambah/berubah judul, perbarui daftar ini juga.
 */
export const SKM_LAYANAN = [
  "Konsolidasi Data",
  "Akta Kelahiran (Blm Ada NIK)",
  "Akta Kelahiran (Ada NIK)",
  "KK Perubahan Biodata",
  "KK Pisah KK",
  "KK Numpang KK",
  "KK Penambahan Anak",
  "KK Cetak Ulang",
  "Akta Perceraian",
  "Akta Kematian",
  "Akta Perkawinan",
  "Kartu Identitas Anak (KIA)",
  "Perpindahan Penduduk",
  "Kedatangan Penduduk",
  "KTP Elektronik",
] as const;

/**
 * Pilihan kendala pada masukan per layanan.
 *
 * Sengaja BUKAN 9 unsur SKM: unsur itu menilai pelayanan loket secara umum
 * (biaya, keramahan petugas, sarana), sedangkan bagian ini menanyakan kendala
 * pada **layanan online** — yang bisa langsung ditindaklanjuti dengan
 * memperbaiki portal.
 */
export const SKM_KENDALA_LAYANAN = [
  "Formulir sulit diisi / membingungkan",
  "Persyaratan dokumen kurang jelas",
  "Kesulitan mengunggah berkas",
  "Proses persetujuan terlalu lama",
  "Status permohonan sulit dipantau",
  "Informasi di website kurang lengkap",
  "Kesulitan mendaftar / masuk akun",
  "Sulit diakses lewat HP",
  "Permohonan ditolak tanpa alasan jelas",
  "Lainnya",
] as const;

/** Pilihan pendidikan terakhir — kode mengikuti `m_options` pendidikan. */
export const SKM_PENDIDIKAN: readonly { kode: string; label: string }[] = [
  { kode: "1", label: "Tidak/Belum Sekolah" },
  { kode: "2", label: "Belum Tamat SD/Sederajat" },
  { kode: "3", label: "Tamat SD/Sederajat" },
  { kode: "4", label: "SLTP/Sederajat" },
  { kode: "5", label: "SLTA/Sederajat" },
  { kode: "6", label: "Diploma I/II" },
  { kode: "7", label: "Akademi/Diploma III" },
  { kode: "8", label: "Diploma IV/Strata I" },
  { kode: "9", label: "Strata II" },
  { kode: "10", label: "Strata III" },
];

/** Label pendek tiap unsur — dipakai grafik dashboard. */
export const SKM_ASPEK = SKM_UNSUR.map((u) => u.judul);

/**
 * Ambil nilai per unsur dari satu baris jawaban.
 * Menerima kunci `u0`–`u8` (bentuk resmi, dipakai data lama & baru) maupun
 * `"0"`–`"8"`. Nilai di luar 1–`SKM_SKALA_MAX` dianggap tidak terisi (null),
 * bukan nol — nol akan menyeret rata-rata ke bawah secara diam-diam.
 */
export function nilaiPerUnsur(jawaban: Record<string, unknown>): (number | null)[] {
  return SKM_UNSUR.map((u, i) => {
    const mentah = jawaban[u.kunci] ?? jawaban[String(i)];
    const v = Number(mentah);
    return Number.isFinite(v) && v >= 1 && v <= SKM_SKALA_MAX ? v : null;
  });
}

/**
 * Nilai IKM dari rata-rata unsur (NRR), sesuai Permenpan RB 14/2017:
 * IKM = NRR × 25 — setara `(NRR / 4) × 100`.
 */
export function hitungIkm(nrr: number): number {
  return Number(((nrr / SKM_SKALA_MAX) * 100).toFixed(2));
}

/** Mutu pelayanan menurut ambang Permenpan RB 14/2017. */
export function mutuIkm(ikm: number): { kode: string; label: string } {
  if (ikm >= 88.31) return { kode: "A", label: "Sangat Baik" };
  if (ikm >= 76.61) return { kode: "B", label: "Baik" };
  if (ikm >= 65.0) return { kode: "C", label: "Kurang Baik" };
  return { kode: "D", label: "Tidak Baik" };
}
