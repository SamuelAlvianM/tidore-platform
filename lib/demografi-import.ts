import ExcelJS from "exceljs";

/**
 * Parser Excel agregat Dukcapil (format SIAK). Setiap file punya baris header:
 *   IDEM | KODE | WILAYAH | <kolom nilai...>
 *
 * PENTING: nomor IDEM TIDAK konsisten antar file (mis. kecamatan = IDEM 4 di file
 * jenis kelamin, tapi IDEM 3 di file KK/WKTP), dan format KODE berbeda (bertitik
 * "82.72.01" vs polos "827201"). Karena itu level ditentukan dari STRUKTUR KODE
 * (standar kode wilayah Kemendagri): 6 digit = kecamatan, 10 digit = desa/desa.
 * Baris kab/kota (≤4 digit) & dusun (mengandung huruf, mis. ".DUSUN") diabaikan.
 * Kolom setelah WILAYAH = nilai (mis. L, P, JML untuk jenis kelamin).
 */

export interface DemografiRow {
  kode: string;
  wilayah: string;
  level: number;
  parentKode: string | null;
  data: Record<string, number>;
}

export interface ParseResult {
  rows: DemografiRow[];
  kolom: string[]; // nama kolom nilai (untuk header tabel di UI)
  kecamatan: number;
  desa: number;
}

const norm = (s: unknown) => String(s ?? "").trim();
const cellNum = (v: unknown): number => {
  if (typeof v === "number") return v;
  const n = parseInt(String(v ?? "").replace(/[^\d-]/g, ""), 10);
  return Number.isFinite(n) ? n : 0;
};

/**
 * Dari KODE mentah → { kode ternormalisasi (digit saja), level }.
 *
 * Standar kode wilayah Kemendagri: 2 digit = provinsi, 4 = kabupaten/kota,
 * 6 = kecamatan, 10 = desa/kelurahan.
 *
 * 🔴 SATU ATURAN UNTUK SEMUA JALUR MASUK. Sebelum ini penyimpanan manual dari
 * editor punya aturannya sendiri — `kode.length === 10 ? 5 : 4` — sehingga
 * SEMUA yang bukan 10 digit jadi kecamatan, termasuk baris kabupaten/kota
 * berkode 4 digit. Akibatnya sekali saja petugas membuka editor lalu menekan
 * Simpan, baris "KOTA TIDORE KEPULAUAN" naik pangkat jadi kecamatan ke-9, dan
 * setiap penjumlahan tingkat kecamatan menghitung seluruh kota DUA KALI.
 *
 * Terukur di TIDORE (7 Sep 2026): tujuh kategori punya 8 kecamatan, tapi
 * `jenis-kelamin` — kategori yang paling sering disunting karena memasok tiga
 * kartu beranda — punya 9, dan yang ke-9 adalah kode 8272 sepanjang 4 digit.
 *
 * `null` = bentuk yang tidak dikenali (mis. baris DUSUN yang mengandung huruf);
 * pemanggil melewatinya, tidak menebaknya.
 */
export function klasifikasiKode(raw: string): { kode: string; level: number } | null {
  const teks = String(raw ?? "").trim();

  /*
   * 🔴 Mengandung HURUF → ditolak, bukan dikupas hurufnya.
   *
   * Dulu baris ini langsung membuang semua yang bukan angka. Untuk ".DUSUN"
   * hasilnya kebetulan benar (tak ada angka tersisa → null), tapi untuk teks
   * yang memuat angka hasilnya bencana: catatan kaki ekspor "Dicetak dari
   * Portal ... pada 07 Sep 2026, 10.33" menyusut jadi "0720261033" — sepuluh
   * digit, jadi terbaca sebagai KODE DESA yang sah, dan angka-angkanya ikut
   * tersimpan sebagai jumlah penduduk. Terukur saat berkas hasil ekspor
   * diunggah balik: satu desa hantu berpenduduk 720.261.033 jiwa, tanpa galat.
   *
   * Kode wilayah Kemendagri tidak pernah berhuruf; yang berhuruf memang bukan
   * baris data.
   */
  if (/[a-z]/i.test(teks)) return null;

  const digits = teks.replace(/\D/g, "");
  if (!digits) return null;
  if (digits.length === 10) return { kode: digits, level: 5 };
  if (digits.length === 6) return { kode: digits, level: 4 };
  if (digits.length === 4) return { kode: digits, level: 3 };

  return null;
}

/**
 * Versi untuk IMPOR Excel: kabupaten/kota sengaja dilewati.
 *
 * Berkas SIAK memuat baris kabupaten sebagai ringkasan, dan angkanya sudah
 * terkandung di baris kecamatan di bawahnya. Menyimpannya berarti menaruh
 * jebakan penjumlahan ganda di tabel yang sama.
 */
function classifyKode(raw: string): { kode: string; level: number } | null {
  const hasil = klasifikasiKode(raw);

  return hasil && hasil.level >= 4 ? hasil : null;
}

/** Akhiran nama sheet rincian desa yang dibuat oleh ekspor portal ini. */
const AKHIRAN_DESA = "— DESA";

/** Baca satu lembar: baris data + nama kolom nilainya. */
function bacaLembar(ws: ExcelJS.Worksheet): {
  rows: DemografiRow[];
  kolom: string[];
} {
  /*
   * Baris header DICARI, tidak dipakukan ke baris 1.
   *
   * 🔴 Berkas hasil ekspor portal ini sendiri berkop surat: nama dinas,
   * logo, judul laporan — barulah tabelnya, di baris kesepuluh. Selama
   * pengimpor bersikeras membaca baris 1, berkas yang baru saja diunduh
   * petugas ditolak "Header tidak dikenali", padahal isinya persis benar.
   * Lima belas baris pertama cukup untuk kop mana pun.
   *
   * IDEM juga tak lagi diwajibkan: levelnya toh ditentukan dari STRUKTUR KODE,
   * dan angka IDEM tidak konsisten antar berkas SIAK. Mewajibkan kolom yang
   * tidak pernah dipakai hanya menolak berkas yang sebetulnya bisa dibaca.
   */
  const BARIS_HEADER_MAKS = 15;
  /** Kolom penomoran laporan — bukan data, jangan ikut tersimpan. */
  const BUKAN_NILAI = new Set(["IDEM", "KODE", "WILAYAH", "NO", "NO."]);

  let header: string[] = [];
  let barisHeader = 0;
  for (let r = 1; r <= Math.min(BARIS_HEADER_MAKS, ws.rowCount); r++) {
    const calon: string[] = [];
    ws.getRow(r).eachCell({ includeEmpty: true }, (cell, col) => {
      calon[col] = norm(cell.value).toUpperCase();
    });
    if (calon.includes("KODE") && calon.includes("WILAYAH")) {
      header = calon;
      barisHeader = r;
      break;
    }
  }
  if (!barisHeader) {
    throw new Error(
      "Header tidak dikenali (butuh kolom KODE dan WILAYAH pada 15 baris pertama)",
    );
  }

  const findCol = (name: string) => header.findIndex((h) => h === name);
  const cKode = findCol("KODE");
  const cWil = findCol("WILAYAH");

  // Kolom nilai = kolom bernama yang bukan kolom penanda/penomoran.
  const valueCols: { col: number; name: string }[] = [];
  header.forEach((h, col) => {
    if (h && !BUKAN_NILAI.has(h)) valueCols.push({ col, name: h });
  });

  const rows: DemografiRow[] = [];
  ws.eachRow((row, rowNumber) => {
    if (rowNumber <= barisHeader) return;
    const cls = classifyKode(norm(row.getCell(cKode).value));
    if (!cls) return; // bukan kecamatan/desa (kab/dusun/lainnya)
    const wilayah = norm(row.getCell(cWil).value);
    if (!wilayah) return;

    const data: Record<string, number> = {};
    for (const { col, name } of valueCols) {
      data[name] = cellNum(row.getCell(col).value);
    }
    // Induk desa = 6 digit pertama (kode kecamatan).
    const parentKode = cls.level === 5 ? cls.kode.slice(0, 6) : null;
    rows.push({ kode: cls.kode, wilayah, level: cls.level, parentKode, data });
  });

  return { rows, kolom: valueCols.map((v) => v.name) };
}

/**
 * Baca berkas Excel agregat: sheet pertama, plus sheet rincian desanya bila ada.
 */
export async function parseDemografiExcel(buffer: Buffer): Promise<ParseResult> {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.load(buffer as unknown as ArrayBuffer);
  const ws = wb.worksheets[0];
  if (!ws) throw new Error("File Excel tidak memiliki sheet");

  /*
   * 🔴 Sheet KEDUA ikut dibaca bila ia rincian desa dari sheet pertama.
   *
   * Ekspor portal ini memisahkan kecamatan dan desa ke dua sheet, supaya baris
   * TOTAL tidak menjumlahkan angka yang sama dua kali. Membaca sheet pertama
   * saja berarti berkas yang diunduh lalu diunggah balik kehilangan SELURUH
   * rincian desanya — tanpa galat, tanpa peringatan; petugas baru sadar saat
   * tabel desa di halaman publik mendadak kosong.
   *
   * Hanya sheet ke-2, dan hanya bila namanya berakhiran "— Desa". Membaca
   * semua sheet akan menuang delapan kategori dari berkas "Export Semua" ke
   * dalam satu kategori tujuan — angka agama tersimpan sebagai jenis kelamin.
   */
  const wsDesa = wb.worksheets[1];
  const ikutDesa = !!wsDesa
    && wsDesa.name.trim().toUpperCase().endsWith(AKHIRAN_DESA);

  const utama = bacaLembar(ws);
  const rows = [...utama.rows];
  if (ikutDesa) {
    // Kode yang sudah ada menang: sheet kecamatan adalah sumber resminya.
    const ada = new Set(rows.map((r) => r.kode));
    for (const r of bacaLembar(wsDesa).rows) {
      if (!ada.has(r.kode)) rows.push(r);
    }
  }

  return {
    rows,
    kolom: utama.kolom,
    kecamatan: rows.filter((r) => r.level === 4).length,
    desa: rows.filter((r) => r.level === 5).length,
  };
}
