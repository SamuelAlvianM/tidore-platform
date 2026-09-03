import ExcelJS from "exceljs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { prisma } from "@/lib/prisma";
import { statsKunjungan } from "@/lib/kunjungan";
import {
  LEVEL_ADMIN,
  LEVEL_STAFF,
  LEVEL_WARGA,
  LEVEL_OPD,
  LEVEL_OPERATOR,
} from "@/lib/akun-level";

/**
 * Ekspor Excel data statistik dashboard — satu berkas per kartu statistik,
 * lengkap dengan KOP SURAT (logo instansi + nama pemerintah daerah + alamat)
 * dan **sheet kedua berisi data rincian** yang menjadi dasar angkanya.
 *
 * 🔴 Identitas di bawah ini SENGAJA berbeda di tiap project (Tidore/DAGA,
 * SIDAKO, SAIBATIN) — logo dan nama instansi tidak boleh disamakan saat fitur
 * ini disalin antar-project. Yang boleh sama hanya cara menggambarnya.
 */
const INSTANSI = {
  pemerintah: "PEMERINTAH KOTA TIDORE KEPULAUAN",
  dinas: "DINAS KEPENDUDUKAN DAN PENCATATAN SIPIL",
  alamat: "Jln. A. Yani No. 409  ·  Telp / Fax (0921) 3161384",
  wilayah: "T I D O R E  ·  Kode Pos 97813",
  portal: "Portal DAGA",
  logo: "LOGO-dinas_tidore.png",
  /** Warna aksen ARGB (teal DAGA #495E57). */
  aksen: "FF495E57",
  aksenMuda: "FFEDF1F0",
};

// ── Bagian statistik yang bisa diekspor ──────────────────────────────────────
// Kuncinya dipakai apa adanya di URL (?bagian=…) dan sebagai nama berkas.
export const BAGIAN_STATISTIK = {
  ringkasan: "Ringkasan Pelayanan",
  progress: "Progress Permohonan",
  tren: "Tren Permohonan 6 Bulan",
  layanan: "Layanan Terpopuler",
  harian: "Permohonan per Tanggal",
  aspirasi: "Aspirasi Warga",
  akun: "Akun Pengguna",
  pengunjung: "Pengunjung Situs",
  konten: "Konten Situs",
} as const;

export type BagianStatistik = keyof typeof BAGIAN_STATISTIK;

export function bagianValid(v: string): v is BagianStatistik {
  return Object.prototype.hasOwnProperty.call(BAGIAN_STATISTIK, v);
}

const BULAN_PENDEK = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
];

interface Kolom {
  label: string;
  lebar: number;
  /** Rata kanan + format ribuan + ikut dijumlah di baris TOTAL. */
  angka?: boolean;
}

interface Tabel {
  /** Nama tab sheet (dipotong 31 karakter, batas Excel). */
  sheet: string;
  judul: string;
  keterangan?: string;
  kolom: Kolom[];
  baris: (string | number)[][];
  /** Tambahkan baris TOTAL yang menjumlah seluruh kolom angka. */
  total?: boolean;
}

/**
 * Ukuran asli PNG dari header IHDR (lebar & tinggi = byte 16–24).
 *
 * Dipakai supaya logo dipasang sesuai perbandingan aslinya. Logo tiap dinas
 * beda rasio (Tidore 462×540, Tana Tidung 861×991, Pesisir Barat 415×601);
 * memaku lebar & tinggi ke angka tetap akan menggepengkan sebagian di antaranya
 * — persis kesalahan yang pernah terjadi pada ikon situs.
 */
function ukuranPng(buf: Buffer): { lebar: number; tinggi: number } | null {
  if (buf.length < 24 || buf.toString("ascii", 1, 4) !== "PNG") return null;
  return { lebar: buf.readUInt32BE(16), tinggi: buf.readUInt32BE(20) };
}

const TINGGI_LOGO_PX = 70;

async function muatLogo(wb: ExcelJS.Workbook) {
  const buf = await readFile(
    join(process.cwd(), "public", INSTANSI.logo),
  ).catch(() => null);
  if (!buf) return null;
  const ukuran = ukuranPng(buf);
  if (!ukuran) return null;
  return {
    // Cast: exceljs membawa deklarasi `Buffer` versinya sendiri yang lebih tua
    // dari @types/node di project ini — dua tipe bernama sama tapi dianggap
    // tak kompatibel. Pola yang sama sudah dipakai di lib/demografi-import.ts.
    id: wb.addImage({
      buffer: buf as unknown as ExcelJS.Image["buffer"],
      extension: "png",
    }),
    lebar: Math.round((ukuran.lebar / ukuran.tinggi) * TINGGI_LOGO_PX),
    tinggi: TINGGI_LOGO_PX,
  };
}

const fmtTanggalPanjang = (d: Date) =>
  d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

const fmtWaktu = (d: Date) =>
  d.toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

/** Huruf kolom Excel dari indeks 1-based (1→A, 27→AA). */
function kolomHuruf(n: number): string {
  let s = "";
  while (n > 0) {
    const sisa = (n - 1) % 26;
    s = String.fromCharCode(65 + sisa) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}

/**
 * Tulis satu sheet: kop surat → judul laporan → tabel → catatan cetak.
 *
 * KOP: logo mengambang di **kiri**, empat baris teks di-merge mulai kolom B
 * sampai kolom terakhir lalu di-tengah — jadi logo punya ruangnya sendiri di
 * kolom A dan tidak lagi menimpa tulisan (sebelumnya teks di-merge dari kolom A
 * sehingga logo menutupinya).
 */
function tulisSheet(
  wb: ExcelJS.Workbook,
  t: Tabel,
  logo: { id: number; lebar: number; tinggi: number } | null,
) {
  const ws = wb.addWorksheet(t.sheet.slice(0, 31), {
    pageSetup: { paperSize: 9, orientation: "landscape", fitToPage: true, fitToWidth: 1, fitToHeight: 0 },
    views: [{ state: "frozen", ySplit: 10 }], // kop + kepala tabel tetap terlihat saat scroll
  });

  const jmlKolom = t.kolom.length;
  const kolomAkhir = kolomHuruf(jmlKolom);
  const lebarPenuh = (baris: number) => `A${baris}:${kolomAkhir}${baris}`;
  // Teks kop mulai kolom B (kalau ada ≥2 kolom) supaya kolom A bebas untuk logo.
  const kopKiri = jmlKolom >= 2 ? "B" : "A";
  const kopRange = (baris: number) => `${kopKiri}${baris}:${kolomAkhir}${baris}`;

  // ── Kop surat ─────────────────────────────────────────────────────────────
  const kop: { teks: string; ukuran: number; tebal: boolean; tinggi: number }[] = [
    { teks: INSTANSI.pemerintah, ukuran: 12, tebal: true, tinggi: 19 },
    { teks: INSTANSI.dinas, ukuran: 13, tebal: true, tinggi: 22 },
    { teks: INSTANSI.alamat, ukuran: 9, tebal: false, tinggi: 15 },
    { teks: INSTANSI.wilayah, ukuran: 9, tebal: false, tinggi: 15 },
  ];
  kop.forEach((k, i) => {
    const r = i + 1;
    ws.mergeCells(kopRange(r));
    const sel = ws.getCell(`${kopKiri}${r}`);
    sel.value = k.teks;
    sel.font = { name: "Times New Roman", size: k.ukuran, bold: k.tebal, color: { argb: "FF000000" } };
    sel.alignment = { horizontal: "center", vertical: "middle" };
    ws.getRow(r).height = k.tinggi;
  });

  // Garis tebal khas kop surat resmi (sepenuh lebar, termasuk kolom logo).
  ws.getRow(5).height = 5;
  for (let c = 1; c <= jmlKolom; c++) {
    ws.getRow(5).getCell(c).border = {
      bottom: { style: "medium", color: { argb: INSTANSI.aksen } },
    };
  }

  // Logo: mengambang di kolom A, rentang baris 1–4. Ukuran absolut (piksel),
  // tidak bergantung lebar kolom, jadi tetap proporsional.
  if (logo) {
    ws.addImage(logo.id, {
      tl: { col: 0.12, row: 0.15 },
      ext: { width: logo.lebar, height: logo.tinggi },
      editAs: "oneCell",
    });
  }

  // ── Judul laporan ─────────────────────────────────────────────────────────
  ws.getRow(6).height = 8;
  ws.mergeCells(lebarPenuh(7));
  const judul = ws.getCell("A7");
  judul.value = t.judul;
  judul.font = { name: "Times New Roman", size: 12, bold: true, underline: true };
  judul.alignment = { horizontal: "center", vertical: "middle" };
  ws.getRow(7).height = 20;

  if (t.keterangan) {
    ws.mergeCells(lebarPenuh(8));
    const ket = ws.getCell("A8");
    ket.value = t.keterangan;
    ket.font = { size: 9, italic: true, color: { argb: "FF6B7280" } };
    ket.alignment = { horizontal: "center", vertical: "middle" };
  }
  ws.getRow(9).height = 6;

  // ── Kepala tabel ──────────────────────────────────────────────────────────
  const BARIS_KEPALA = 10;
  const kepala = ws.getRow(BARIS_KEPALA);
  t.kolom.forEach((k, i) => {
    const sel = kepala.getCell(i + 1);
    sel.value = k.label;
    sel.font = { bold: true, size: 10, color: { argb: "FFFFFFFF" } };
    sel.fill = { type: "pattern", pattern: "solid", fgColor: { argb: INSTANSI.aksen } };
    sel.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
    sel.border = kotak();
  });
  kepala.height = 22;

  // ── Isi tabel ─────────────────────────────────────────────────────────────
  t.baris.forEach((baris, i) => {
    const row = ws.getRow(BARIS_KEPALA + 1 + i);
    t.kolom.forEach((k, c) => {
      const sel = row.getCell(c + 1);
      sel.value = baris[c] ?? "";
      sel.font = { size: 10 };
      sel.alignment = {
        horizontal: k.angka ? "right" : c === 0 && k.lebar <= 8 ? "center" : "left",
        vertical: "middle",
        wrapText: !k.angka,
      };
      if (k.angka) sel.numFmt = "#,##0";
      sel.border = kotak();
      if (i % 2 === 1) {
        sel.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF7F9F9" } };
      }
    });
  });

  // ── Baris TOTAL ───────────────────────────────────────────────────────────
  if (t.total && t.baris.length > 0) {
    const row = ws.getRow(BARIS_KEPALA + 1 + t.baris.length);
    t.kolom.forEach((k, c) => {
      const sel = row.getCell(c + 1);
      if (k.angka) {
        sel.value = t.baris.reduce(
          (a, b) => a + (typeof b[c] === "number" ? (b[c] as number) : 0),
          0,
        );
        sel.numFmt = "#,##0";
        sel.alignment = { horizontal: "right", vertical: "middle" };
      } else if (c === 0) {
        sel.value = "TOTAL";
        sel.alignment = { horizontal: "center", vertical: "middle" };
      }
      sel.font = { bold: true, size: 10 };
      sel.fill = { type: "pattern", pattern: "solid", fgColor: { argb: INSTANSI.aksenMuda } };
      sel.border = { ...kotak(), top: { style: "medium", color: { argb: INSTANSI.aksen } } };
    });
    row.height = 18;
  }

  // ── Catatan cetak ─────────────────────────────────────────────────────────
  const barisCatatan = BARIS_KEPALA + t.baris.length + (t.total ? 2 : 1) + 2;
  ws.mergeCells(lebarPenuh(barisCatatan));
  const catatan = ws.getCell(`A${barisCatatan}`);
  catatan.value = `Dicetak dari ${INSTANSI.portal} pada ${fmtWaktu(new Date())}`;
  catatan.font = { size: 8, italic: true, color: { argb: "FF9CA3AF" } };
  catatan.alignment = { horizontal: "left" };

  t.kolom.forEach((k, i) => {
    ws.getColumn(i + 1).width = k.lebar;
  });

  // Kolom A harus cukup lebar untuk menampung logo, kalau tidak logo meluber ke
  // kolom B dan menyerempet teks kop yang di-tengah di sana. Lebar kolom Excel
  // dihitung dalam satuan karakter: piksel ≈ lebar × 7 + 5. Logo tiap dinas beda
  // rasio (Tana Tidung paling lebar), jadi angkanya diturunkan dari logo itu
  // sendiri — bukan dipaku, supaya tidak perlu disetel ulang tiap project.
  if (logo && jmlKolom >= 2) {
    const lebarMinimal = (logo.lebar + 10 - 5) / 7;
    const kolomA = ws.getColumn(1);
    if ((kolomA.width ?? 0) < lebarMinimal) kolomA.width = Math.ceil(lebarMinimal * 10) / 10;
  }

  return ws;
}

function kotak(): Partial<ExcelJS.Borders> {
  const tipis = { style: "thin" as const, color: { argb: "FFD5DBDB" } };
  return { top: tipis, left: tipis, bottom: tipis, right: tipis };
}

// ── Pengumpul data RINGKAS per bagian ────────────────────────────────────────

// Kolom Uraian sengaja lebar: selain enak dibaca, ia memberi ruang agar teks
// kop yang di-merge mulai kolom B (di-tengah) tidak menabrak logo di kolom A.
const KOLOM_URAIAN: Kolom[] = [
  { label: "No", lebar: 6 },
  { label: "Uraian", lebar: 52 },
  { label: "Jumlah", lebar: 16, angka: true },
];

/** Bentuk baris bernomor dari daftar [label, nilai]. */
function barisBernomor(data: [string, number][]): (string | number)[][] {
  return data.map(([label, nilai], i) => [i + 1, label, nilai]);
}

async function dataRingkasan(now: Date): Promise<Tabel> {
  const awalBulan = new Date(now.getFullYear(), now.getMonth(), 1);
  const [byStatus, bulanIni] = await Promise.all([
    prisma.permohonan.groupBy({ by: ["status"], _count: { _all: true } }),
    prisma.permohonan.count({ where: { createdAt: { gte: awalBulan } } }),
  ]);
  const hitung = (k: string) =>
    byStatus.find((s) => s.status === k)?._count._all ?? 0;
  const total = byStatus.reduce((a, s) => a + s._count._all, 0);

  return {
    sheet: "Ringkasan",
    judul: "REKAPITULASI PELAYANAN PERMOHONAN ONLINE",
    keterangan: `Keadaan per ${fmtTanggalPanjang(now)}`,
    kolom: KOLOM_URAIAN,
    // Sengaja TANPA baris TOTAL: isinya campuran total & bagian dari total,
    // menjumlahkannya menghasilkan angka yang tidak berarti apa-apa.
    baris: barisBernomor([
      ["Total permohonan (seluruh periode)", total],
      ["Permohonan selesai", hitung("SELESAI")],
      ["Permohonan sedang berjalan (menunggu + diproses)", hitung("MENUNGGU") + hitung("DIPROSES")],
      ["Permohonan ditolak", hitung("DITOLAK")],
      [`Permohonan bulan ${BULAN_PENDEK[now.getMonth()]} ${now.getFullYear()}`, bulanIni],
    ]),
  };
}

async function dataProgress(now: Date): Promise<Tabel> {
  const byStatus = await prisma.permohonan.groupBy({
    by: ["status"],
    _count: { _all: true },
  });
  const hitung = (k: string) =>
    byStatus.find((s) => s.status === k)?._count._all ?? 0;

  return {
    sheet: "Progress Permohonan",
    judul: "PROGRESS PERMOHONAN MENURUT STATUS",
    keterangan: `Keadaan per ${fmtTanggalPanjang(now)}`,
    kolom: [
      { label: "No", lebar: 6 },
      { label: "Status Permohonan", lebar: 46 },
      { label: "Jumlah", lebar: 16, angka: true },
    ],
    baris: barisBernomor([
      ["Menunggu Verifikasi", hitung("MENUNGGU")],
      ["Sedang Diproses", hitung("DIPROSES")],
      ["Selesai", hitung("SELESAI")],
      ["Ditolak", hitung("DITOLAK")],
    ]),
    total: true,
  };
}

async function dataTren(now: Date): Promise<Tabel> {
  const mulai = new Date(now.getFullYear(), now.getMonth() - 5, 1);
  const rows = await prisma.permohonan.findMany({
    where: { createdAt: { gte: mulai } },
    select: { createdAt: true },
  });

  const ember = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
    return { kunci: `${d.getFullYear()}-${d.getMonth()}`, label: `${BULAN_PENDEK[d.getMonth()]} ${d.getFullYear()}`, jumlah: 0 };
  });
  const indeks = new Map(ember.map((e, i) => [e.kunci, i]));
  for (const r of rows) {
    const d = new Date(r.createdAt);
    const i = indeks.get(`${d.getFullYear()}-${d.getMonth()}`);
    if (i !== undefined) ember[i].jumlah += 1;
  }

  return {
    sheet: "Tren 6 Bulan",
    judul: "TREN PERMOHONAN 6 BULAN TERAKHIR",
    keterangan: `Periode ${ember[0].label} s.d. ${ember[5].label}`,
    kolom: [
      { label: "No", lebar: 6 },
      { label: "Bulan", lebar: 40 },
      { label: "Jumlah Permohonan", lebar: 22, angka: true },
    ],
    baris: barisBernomor(ember.map((e) => [e.label, e.jumlah] as [string, number])),
    total: true,
  };
}

async function dataLayanan(now: Date): Promise<Tabel> {
  // Dashboard hanya menampilkan 5 teratas karena grafiknya sempit; ekspor
  // sengaja memuat SELURUH jenis layanan — laporan dinas memerlukan daftar
  // penuh, termasuk layanan yang belum pernah dimohon (jumlah 0).
  const [jenis, grouped] = await Promise.all([
    prisma.jenisPermohonan.findMany({ select: { id: true, nama: true, kategori: true } }),
    prisma.permohonan.groupBy({ by: ["jenisId"], _count: { _all: true } }),
  ]);
  const jumlahById = new Map(grouped.map((g) => [g.jenisId, g._count._all]));

  const baris = jenis
    .map((j) => ({ nama: j.nama, kategori: j.kategori, jumlah: jumlahById.get(j.id) ?? 0 }))
    .sort((a, b) => b.jumlah - a.jumlah || a.nama.localeCompare(b.nama, "id"))
    .map((j, i) => [i + 1, j.nama, j.kategori, j.jumlah]);

  return {
    sheet: "Layanan",
    judul: "DAFTAR PENERIMA MANFAAT MENURUT JENIS PERMOHONAN",
    keterangan: `Seluruh jenis layanan · keadaan per ${fmtTanggalPanjang(now)}`,
    kolom: [
      { label: "No", lebar: 6 },
      { label: "Jenis Permohonan", lebar: 42 },
      { label: "Kategori", lebar: 12 },
      { label: "Jumlah Pemohon", lebar: 18, angka: true },
    ],
    baris,
    total: true,
  };
}

async function dataHarian(now: Date): Promise<Tabel> {
  const HARI = 30;
  const mulai = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (HARI - 1));
  const rows = await prisma.permohonan.findMany({
    where: { createdAt: { gte: mulai } },
    select: { createdAt: true },
  });

  const ember = Array.from({ length: HARI }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (HARI - 1 - i));
    return {
      kunci: `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`,
      label: `${d.getDate()} ${BULAN_PENDEK[d.getMonth()]} ${d.getFullYear()}`,
      jumlah: 0,
    };
  });
  const indeks = new Map(ember.map((e, i) => [e.kunci, i]));
  for (const r of rows) {
    const d = new Date(r.createdAt);
    const i = indeks.get(`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`);
    if (i !== undefined) ember[i].jumlah += 1;
  }

  return {
    sheet: "Per Tanggal",
    judul: "PERMOHONAN PER TANGGAL — 30 HARI TERAKHIR",
    keterangan: `Periode ${ember[0].label} s.d. ${ember[HARI - 1].label}`,
    kolom: [
      { label: "No", lebar: 6 },
      { label: "Tanggal", lebar: 40 },
      { label: "Jumlah Permohonan", lebar: 22, angka: true },
    ],
    baris: barisBernomor(ember.map((e) => [e.label, e.jumlah] as [string, number])),
    total: true,
  };
}

async function dataAspirasi(now: Date): Promise<Tabel> {
  const awalBulan = new Date(now.getFullYear(), now.getMonth(), 1);
  const [byStatus, kritik, kritikBulanIni, skm] = await Promise.all([
    prisma.pengaduan.groupBy({ by: ["status"], _count: { _all: true } }),
    prisma.kritikSaran.count(),
    prisma.kritikSaran.count({ where: { createdAt: { gte: awalBulan } } }),
    prisma.skmJawaban.count(),
  ]);
  const hitung = (k: string) =>
    byStatus.find((s) => s.status === k)?._count._all ?? 0;

  return {
    sheet: "Aspirasi Warga",
    judul: "REKAPITULASI ASPIRASI DAN PENGADUAN WARGA",
    keterangan: `Keadaan per ${fmtTanggalPanjang(now)}`,
    kolom: KOLOM_URAIAN,
    baris: barisBernomor([
      ["Pengaduan baru", hitung("BARU")],
      ["Pengaduan sedang diproses", hitung("DIPROSES")],
      ["Pengaduan selesai", hitung("SELESAI")],
      ["Kritik & saran (seluruh periode)", kritik],
      [`Kritik & saran bulan ${BULAN_PENDEK[now.getMonth()]} ${now.getFullYear()}`, kritikBulanIni],
      ["Responden Survei Kepuasan Masyarakat", skm],
    ]),
  };
}

async function dataAkun(now: Date): Promise<Tabel> {
  const [byLevel, aktif, menunggu] = await Promise.all([
    prisma.user.groupBy({ by: ["userlevelId"], _count: { _all: true } }),
    prisma.user.count({ where: { status: 1 } }),
    prisma.user.count({ where: { status: 0 } }),
  ]);
  const jumlah = (ids: number[]) =>
    byLevel.filter((u) => ids.includes(u.userlevelId)).reduce((a, u) => a + u._count._all, 0);
  const total = byLevel.reduce((a, u) => a + u._count._all, 0);

  return {
    sheet: "Akun Pengguna",
    judul: "REKAPITULASI AKUN PENGGUNA PORTAL",
    keterangan: `Keadaan per ${fmtTanggalPanjang(now)}`,
    kolom: KOLOM_URAIAN,
    baris: barisBernomor([
      ["Warga", jumlah([LEVEL_WARGA])],
      ["Operator", jumlah([LEVEL_OPERATOR])],
      // Level 4 ("developer") ikut dihitung sebagai OPD, sama dengan dashboard.
      ["Operator OPD", jumlah([LEVEL_OPD, 4])],
      ["Staff Dinas (admin & operator capil)", jumlah([LEVEL_ADMIN, LEVEL_STAFF])],
      ["Jumlah seluruh akun", total],
      ["— di antaranya berstatus aktif", aktif],
      ["— di antaranya menunggu verifikasi", menunggu],
    ]),
  };
}

async function dataPengunjung(now: Date): Promise<Tabel> {
  const p = await statsKunjungan();
  return {
    sheet: "Pengunjung",
    judul: "STATISTIK PENGUNJUNG SITUS",
    keterangan: `Keadaan per ${fmtWaktu(now)}`,
    kolom: KOLOM_URAIAN,
    baris: barisBernomor([
      ["Pengunjung online (aktif 5 menit terakhir)", p.online],
      ["Pengunjung hari ini", p.hariIni],
      ["Total kunjungan (seluruh periode)", p.total],
    ]),
  };
}

async function dataKonten(now: Date): Promise<Tabel> {
  const [terbit, draf, galeri, produk] = await Promise.all([
    prisma.news.count({ where: { publish: true } }),
    prisma.news.count({ where: { publish: false } }),
    prisma.gallery.count(),
    prisma.produk.count(),
  ]);
  return {
    sheet: "Konten Situs",
    judul: "REKAPITULASI KONTEN SITUS",
    keterangan: `Keadaan per ${fmtTanggalPanjang(now)}`,
    kolom: KOLOM_URAIAN,
    baris: barisBernomor([
      ["Berita terbit", terbit],
      ["Draf berita", draf],
      ["Foto galeri", galeri],
      ["Dokumen publikasi", produk],
    ]),
    total: true,
  };
}

const PENGUMPUL: Record<BagianStatistik, (now: Date) => Promise<Tabel>> = {
  ringkasan: dataRingkasan,
  progress: dataProgress,
  tren: dataTren,
  layanan: dataLayanan,
  harian: dataHarian,
  aspirasi: dataAspirasi,
  akun: dataAkun,
  pengunjung: dataPengunjung,
  konten: dataKonten,
};

// ── Sheet RINCIAN (data detail di balik angka ringkas) ───────────────────────

const STATUS_LABEL_PERMOHONAN: Record<string, string> = {
  MENUNGGU: "Menunggu Verifikasi",
  DIPROSES: "Sedang Diproses",
  SELESAI: "Selesai",
  DITOLAK: "Ditolak",
};

const STATUS_LABEL_PENGADUAN: Record<string, string> = {
  BARU: "Baru",
  DIPROSES: "Diproses",
  SELESAI: "Selesai",
};

const STATUS_LABEL_AKUN: Record<number, string> = {
  0: "Menunggu verifikasi",
  1: "Aktif",
  2: "Ditolak",
  3: "Nonaktif",
};

/** Rincian permohonan (jadi dasar kartu Ringkasan/Progress/Tren/Harian/Layanan). */
async function detailPermohonan(
  now: Date,
  lingkup?: { gte: Date; labelPeriode: string },
): Promise<Tabel> {
  const rows = await prisma.permohonan.findMany({
    where: lingkup ? { createdAt: { gte: lingkup.gte } } : undefined,
    orderBy: { createdAt: "desc" },
    select: {
      noregister: true,
      status: true,
      createdAt: true,
      prosesByName: true,
      prosesAt: true,
      user: { select: { userFullname: true, userNik: true } },
      jenis: { select: { nama: true } },
    },
  });

  return {
    sheet: "Rincian Permohonan",
    judul: "RINCIAN PERMOHONAN",
    keterangan: `${rows.length.toLocaleString("id-ID")} permohonan${lingkup ? ` · ${lingkup.labelPeriode}` : ""} · per ${fmtTanggalPanjang(now)}`,
    kolom: [
      { label: "No", lebar: 6 },
      { label: "No. Registrasi", lebar: 24 },
      { label: "Jenis Layanan", lebar: 34 },
      { label: "Nama Pemohon", lebar: 26 },
      { label: "NIK", lebar: 20 },
      { label: "Status", lebar: 18 },
      { label: "Tgl Pengajuan", lebar: 20 },
      { label: "Diproses Oleh", lebar: 22 },
      { label: "Tgl Diproses", lebar: 20 },
    ],
    baris: rows.map((r, i) => [
      i + 1,
      r.noregister,
      r.jenis?.nama ?? "-",
      r.user?.userFullname ?? "-",
      r.user?.userNik ?? "-",
      STATUS_LABEL_PERMOHONAN[r.status] ?? r.status,
      fmtWaktu(new Date(r.createdAt)),
      r.prosesByName ?? "-",
      r.prosesAt ? fmtWaktu(new Date(r.prosesAt)) : "-",
    ]),
  };
}

/** Rincian pengaduan (dasar kartu Aspirasi Warga). */
async function detailAspirasi(now: Date): Promise<Tabel> {
  const rows = await prisma.pengaduan.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      nama: true, nik: true, subjek: true, isi: true, status: true, createdAt: true,
    },
  });
  return {
    sheet: "Rincian Aspirasi",
    judul: "RINCIAN ASPIRASI & PENGADUAN WARGA",
    keterangan: `${rows.length.toLocaleString("id-ID")} pengaduan · per ${fmtTanggalPanjang(now)}`,
    kolom: [
      { label: "No", lebar: 6 },
      { label: "Nama", lebar: 24 },
      { label: "NIK", lebar: 20 },
      { label: "Subjek", lebar: 28 },
      { label: "Isi Pengaduan", lebar: 50 },
      { label: "Status", lebar: 14 },
      { label: "Tanggal", lebar: 20 },
    ],
    baris: rows.map((r, i) => [
      i + 1,
      r.nama,
      r.nik ?? "-",
      r.subjek ?? "-",
      r.isi,
      STATUS_LABEL_PENGADUAN[r.status] ?? r.status,
      fmtWaktu(new Date(r.createdAt)),
    ]),
  };
}

/** Rincian akun pengguna (dasar kartu Akun Pengguna). */
async function detailAkun(now: Date): Promise<Tabel> {
  const rows = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      userId: true,
      userFullname: true,
      userlevelId: true,
      userEmail: true,
      userHp: true,
      userKecamatan: true,
      status: true,
      createdAt: true,
      level: { select: { nama: true } },
    },
  });
  return {
    sheet: "Rincian Akun",
    judul: "RINCIAN AKUN PENGGUNA PORTAL",
    keterangan: `${rows.length.toLocaleString("id-ID")} akun · per ${fmtTanggalPanjang(now)}`,
    kolom: [
      { label: "No", lebar: 6 },
      { label: "User ID / NIK", lebar: 22 },
      { label: "Nama", lebar: 26 },
      { label: "Peran", lebar: 18 },
      { label: "Status", lebar: 18 },
      { label: "Email", lebar: 26 },
      { label: "WhatsApp", lebar: 16 },
      { label: "Kecamatan", lebar: 20 },
      { label: "Terdaftar", lebar: 20 },
    ],
    baris: rows.map((r, i) => [
      i + 1,
      r.userId,
      r.userFullname ?? "-",
      r.level?.nama ?? `Level ${r.userlevelId}`,
      STATUS_LABEL_AKUN[r.status] ?? `Status ${r.status}`,
      r.userEmail ?? "-",
      r.userHp ?? "-",
      r.userKecamatan ?? "-",
      fmtWaktu(new Date(r.createdAt)),
    ]),
  };
}

/** Rincian konten (dasar kartu Konten Situs) — daftar berita. */
async function detailKonten(now: Date): Promise<Tabel> {
  const rows = await prisma.news.findMany({
    orderBy: { createdAt: "desc" },
    select: { judul: true, kategori: true, penulis: true, publish: true, createdAt: true },
  });
  return {
    sheet: "Rincian Konten",
    judul: "RINCIAN KONTEN SITUS (BERITA)",
    keterangan: `${rows.length.toLocaleString("id-ID")} berita · per ${fmtTanggalPanjang(now)}`,
    kolom: [
      { label: "No", lebar: 6 },
      { label: "Judul", lebar: 50 },
      { label: "Kategori", lebar: 18 },
      { label: "Penulis", lebar: 22 },
      { label: "Status", lebar: 14 },
      { label: "Tanggal", lebar: 20 },
    ],
    baris: rows.map((r, i) => [
      i + 1,
      r.judul,
      r.kategori ?? "-",
      r.penulis ?? "-",
      r.publish ? "Terbit" : "Draf",
      fmtWaktu(new Date(r.createdAt)),
    ]),
  };
}

/**
 * Sheet rincian yang menyertai satu kartu statistik. `null` = kartu itu memang
 * tak punya data baris (mis. Pengunjung yang hanya agregat).
 */
async function detailUntuk(
  bagian: BagianStatistik,
  now: Date,
): Promise<Tabel | null> {
  const enamBulan = new Date(now.getFullYear(), now.getMonth() - 5, 1);
  const tigaPuluhHari = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 29);
  switch (bagian) {
    case "ringkasan":
    case "progress":
    case "layanan":
      return detailPermohonan(now);
    case "tren":
      return detailPermohonan(now, { gte: enamBulan, labelPeriode: "6 bulan terakhir" });
    case "harian":
      return detailPermohonan(now, { gte: tigaPuluhHari, labelPeriode: "30 hari terakhir" });
    case "aspirasi":
      return detailAspirasi(now);
    case "akun":
      return detailAkun(now);
    case "konten":
      return detailKonten(now);
    case "pengunjung":
      return null;
  }
}

/**
 * Susun workbook satu bagian (2 sheet: ringkas + rincian), atau seluruh bagian
 * bila `bagian` tidak diisi (semua sheet ringkas dulu, lalu sheet-sheet rincian).
 */
export async function buatWorkbookStatistik(bagian?: BagianStatistik) {
  const wb = new ExcelJS.Workbook();
  wb.creator = `${INSTANSI.dinas} ${INSTANSI.pemerintah}`;
  wb.created = new Date();

  const logo = await muatLogo(wb);
  const now = new Date();

  if (bagian) {
    tulisSheet(wb, await PENGUMPUL[bagian](now), logo);
    const detail = await detailUntuk(bagian, now);
    if (detail) tulisSheet(wb, detail, logo);
  } else {
    // Ekspor lengkap: semua ringkasan dulu, lalu rincian inti (tanpa duplikat
    // daftar permohonan yang sama berkali-kali).
    for (const b of Object.keys(BAGIAN_STATISTIK) as BagianStatistik[]) {
      tulisSheet(wb, await PENGUMPUL[b](now), logo);
    }
    const rincian = await Promise.all([
      detailPermohonan(now),
      detailAspirasi(now),
      detailAkun(now),
      detailKonten(now),
    ]);
    for (const d of rincian) tulisSheet(wb, d, logo);
  }

  return wb;
}

/** Respon unduhan .xlsx dari workbook. */
export async function workbookStatistikResponse(
  wb: ExcelJS.Workbook,
  namaFile: string,
) {
  const buffer = await wb.xlsx.writeBuffer();
  return new Response(buffer, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${namaFile}"`,
      "Cache-Control": "no-store",
    },
  });
}
