/**
 * Periode data kependudukan: satu TAHUN dan satu SEMESTER (1 atau 2).
 *
 * 🔴 KENAPA ADA. Sebelum ini `m_demografi_wilayah` sama sekali tak punya
 * dimensi waktu — kuncinya `(kategori, kode)`, satu baris per wilayah, titik.
 * Padahal Dukcapil mengirim DKB dua kali setahun, dan setiap impor MENGGANTI
 * TOTAL isi kategorinya. Artinya begitu berkas semester berikutnya diunggah,
 * semester sebelumnya lenyap: tidak bisa dibandingkan, tidak bisa ditarik lagi,
 * tidak ada jejaknya.
 *
 * ⚠️ SEMESTER, BUKAN BULAN. Dinas boleh mengunggah kapan saja — berkas semester
 * I bisa datang Juni, bisa Agustus. Yang disebut dalam laporan resmi tetap
 * "semester I" dan "semester II", jadi itu pula yang disimpan.
 */

export interface Periode {
  tahun: number;
  semester: number;
}

export interface PeriodeTersedia extends Periode {
  baris: number;
}

/**
 * Periode bawaan untuk baris yang sudah terlanjur ada tanpa keterangan
 * periode. Sesuai badge yang selama ini tampil di beranda keempat portal —
 * "DKB Semester II 2024" — jadi menandainya begitu bukan tebakan, melainkan
 * menuliskan apa yang memang sudah diakui halaman depan.
 */
export const TAHUN_BAWAAN = 2024;
export const SEMESTER_BAWAAN = 2;

/** Tahun paling awal yang masuk akal untuk data DKB. */
export const TAHUN_MIN = 2000;

const ROMAWI: Record<number, string> = { 1: "I", 2: "II" };

/** Semester valid? Hanya 1 dan 2 — tidak ada semester 0 atau 3. */
export function semesterSah(semester: unknown): boolean {
  const n = Number(semester);
  return n === 1 || n === 2;
}

/**
 * Tahun valid? Batas atasnya tahun DEPAN, bukan tahun ini: DKB semester II
 * kadang baru diterima dinas di awal tahun berikutnya, dan petugas berhak
 * memberinya label tahun yang benar.
 */
export function tahunSah(tahun: unknown): boolean {
  const n = Number(tahun);
  return Number.isInteger(n) && n >= TAHUN_MIN && n <= new Date().getFullYear() + 1;
}

/** "Semester II 2024" */
export const labelPeriode = (tahun: number, semester: number) =>
  `Semester ${ROMAWI[semester] ?? semester} ${tahun}`;

/** "DKB Semester II 2024" — badge beranda, menyebut sumber datanya. */
export const labelPeriodePanjang = (tahun: number, semester: number) =>
  `DKB ${labelPeriode(tahun, semester)}`;

/** Dua periode menunjuk hal yang sama? */
export const periodeSama = (a?: Periode | null, b?: Periode | null) =>
  !!a && !!b && a.tahun === b.tahun && a.semester === b.semester;

/**
 * Kunci ringkas satu periode: "2024-2".
 *
 * Dipakai sebagai kunci objek/Set di sisi peramban — mis. wadah periode mana
 * yang sedang terbuka, dan hitungan kategori milik periode mana. Satu fungsi
 * supaya "2024-2" tidak pernah dieja berbeda di dua tempat.
 */
export const kunciPeriode = (p: Periode) => `${p.tahun}-${p.semester}`;

/** `tahun=…&semester=…`, atau string kosong bila periodenya belum ada. */
export const kueriPeriode = (p?: Periode | null) =>
  p ? `tahun=${p.tahun}&semester=${p.semester}` : "";

/**
 * Baca periode dari query string. `null` = tidak diminta; `false` = diminta
 * tapi tidak masuk akal, dan pemanggil harus MENOLAK, bukan diam-diam
 * memakai periode lain.
 */
export function periodeDariQuery(
  sp: URLSearchParams,
): Periode | null | false {
  const tahun = sp.get("tahun");
  const semester = sp.get("semester");

  if (!tahun && !semester) return null;
  if (!tahun || !semester) return false;
  if (!tahunSah(tahun) || !semesterSah(semester)) return false;

  return { tahun: Number(tahun), semester: Number(semester) };
}

/**
 * Semester yang MASUK AKAL untuk periode baru, dari sudut pandang hari ini.
 *
 * ⚠️ Ini cuma tebakan awal isian, bukan aturan. Dinas bebas mengunggah bulan
 * apa saja, jadi petugas selalu boleh menggantinya.
 */
export function periodeDugaan(kini = new Date()): Periode {
  const bulan = kini.getMonth() + 1;

  return bulan <= 6
    ? { tahun: kini.getFullYear() - 1, semester: 2 }
    : { tahun: kini.getFullYear(), semester: 1 };
}

/** Tahun yang boleh dipilih: dari yang sudah ada di data sampai tahun depan. */
export function tahunPilihan(tersedia: Periode[] = [], kini = new Date()): number[] {
  const batasAtas = kini.getFullYear() + 1;
  const adaTahun = tersedia.map((p) => p.tahun);
  const terkecil = Math.min(batasAtas - 5, ...(adaTahun.length ? adaTahun : [batasAtas]));

  const daftar: number[] = [];
  for (let t = batasAtas; t >= terkecil; t -= 1) daftar.push(t);

  return daftar;
}

/**
 * Gabungkan beberapa daftar periode jadi satu, terbaru dulu, tanpa kembar.
 *
 * ⚠️ Jawaban API kadang hanya memuat periode untuk SATU kategori. Menimpa
 * daftar begitu saja akan menghilangkan periode yang cuma dipunyai kategori
 * lain — dan periode itu lenyap dari pemilih meski datanya ada.
 */
export function gabungPeriode(...daftar: (PeriodeTersedia[] | undefined)[]): PeriodeTersedia[] {
  const peta = new Map<string, PeriodeTersedia>();

  for (const d of daftar) {
    for (const p of d ?? []) {
      const k = kunciPeriode(p);
      const ada = peta.get(k);
      peta.set(k, {
        tahun: p.tahun,
        semester: p.semester,
        baris: Math.max(ada?.baris ?? 0, p.baris ?? 0),
      });
    }
  }

  return [...peta.values()].sort(
    (a, b) => b.tahun - a.tahun || b.semester - a.semester,
  );
}
