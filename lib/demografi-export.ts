import ExcelJS from "exceljs";
import { prisma } from "@/lib/prisma";
import { daftarKategori } from "@/lib/demografi-registri";
import { labelPeriodePanjang, type Periode } from "@/lib/periode-demografi";
import { muatLogo, tulisSheet, type Kolom } from "@/lib/statistik-export";

/**
 * Penyusun workbook Excel data demografi — dipakai endpoint export admin
 * (/api/admin/demografi/export) dan publik (/api/demografi/export).
 *
 * 🔴 MEMAKAI KOP SURAT YANG SAMA dengan ekspor statistik.
 *
 * Berkas ini keluar dari portal pemerintah dan beredar sebagai lampiran surat,
 * bahan rapat, dan cetakan. Sebelumnya isinya cuma baris header abu-abu tanpa
 * satu pun keterangan: tidak ada nama dinas, tidak ada periode, tidak ada
 * tanggal cetak. Berkas seperti itu tidak bisa dipertanggungjawabkan — dilihat
 * seminggu kemudian, tidak ada yang tahu ini data semester berapa.
 *
 * ⚠️ SATU SHEET UNTUK KECAMATAN, SATU LAGI UNTUK DESA. Baris kecamatan adalah
 * jumlah desa di bawahnya; menaruh keduanya dalam satu tabel membuat baris
 * TOTAL menjumlahkan angka yang sama dua kali. Pemisahan ini bukan soal rapi,
 * melainkan soal angkanya benar.
 */

interface DbRow {
  kode: string;
  wilayah: string;
  level: number;
  parentKode: string | null;
  data: unknown;
}

/** Kolom nilai (L, P, JML, …) dari baris pertama — semuanya kolom angka. */
function kolomNilai(rows: DbRow[]): string[] {
  return rows.length ? Object.keys((rows[0].data ?? {}) as object) : [];
}

/*
 * 🔴 Kepala kolom memakai istilah SIAK apa adanya: KODE dan WILAYAH.
 *
 * Berkas ekspor ini bukan cuma bacaan — ia juga dipakai untuk diunggah balik,
 * mis. setelah satu angka dikoreksi di Excel. Menamainya "Kecamatan" atau
 * "Desa / Kelurahan" membuatnya lebih enak dibaca tapi tidak lagi dikenali
 * pengimpor, dan petugas baru tahu setelah unggahannya ditolak. Baris mana
 * yang dimuat sudah disebut pada keterangan di bawah judul.
 */
function susunKolom(nilai: string[]): Kolom[] {
  return [
    { label: "No", lebar: 6 },
    { label: "KODE", lebar: 14 },
    { label: "WILAYAH", lebar: 30 },
    ...nilai.map((n) => ({ label: n, lebar: Math.max(12, n.length + 4), angka: true })),
  ];
}

function susunBaris(rows: DbRow[], nilai: string[]): (string | number)[][] {
  return rows.map((r, i) => {
    const d = (r.data ?? {}) as Record<string, number>;

    return [i + 1, r.kode, r.wilayah, ...nilai.map((k) => Number(d[k]) || 0)];
  });
}

/**
 * Susun workbook untuk satu kategori (bila diisi) atau semua kategori.
 * Mengembalikan null bila tidak ada data sama sekali.
 */
export async function buildDemografiWorkbook(
  kategori?: string,
  periode?: Periode | null,
) {
  const wb = new ExcelJS.Workbook();
  wb.creator = "DAGA Disdukcapil Tidore Kepulauan";
  wb.created = new Date();

  const logo = await muatLogo(wb);

  /*
   * 🔴 Daftar kategori diambil dari REGISTRI, bukan dari konstanta.
   *
   * Dua hal rusak kalau tidak: "Export Semua" diam-diam melewatkan seluruh
   * kategori buatan dinas — berkasnya terlihat lengkap padahal tidak — dan
   * ekspor satu kategori kustom menabrak konstanta yang tidak memuatnya.
   */
  const semua = await daftarKategori();
  const satu = kategori ? semua.find((k) => k.slug === kategori) : undefined;
  if (kategori && !satu) return null;

  const targets = satu ? [satu] : semua;
  const keterangan = periode
    ? labelPeriodePanjang(periode.tahun, periode.semester)
    : "Seluruh periode";

  let total = 0;
  for (const k of targets) {
    const rows = (await prisma.demografiWilayah.findMany({
      where: {
        kategori: k.slug,
        ...(periode ? { tahun: periode.tahun, semester: periode.semester } : {}),
      },
      orderBy: { kode: "asc" },
      select: { kode: true, wilayah: true, level: true, parentKode: true, data: true },
    })) as DbRow[];

    if (rows.length === 0) continue;
    total += rows.length;

    const kecamatan = rows.filter((r) => r.level === 4);
    const desa = rows.filter((r) => r.level === 5);

    // Kecamatan: tabel utama, lengkap dengan baris TOTAL.
    if (kecamatan.length > 0) {
      const nilai = kolomNilai(kecamatan);
      tulisSheet(
        wb,
        {
          sheet: k.label,
          judul: `DATA KEPENDUDUKAN — ${k.label.toUpperCase()}`,
          keterangan: `${keterangan} · per kecamatan`,
          kolom: susunKolom(nilai),
          baris: susunBaris(kecamatan, nilai),
          total: true,
        },
        logo,
      );
    }

    /*
     * Desa: sheet terpisah, TANPA baris TOTAL.
     *
     * Totalnya sudah ada di sheet kecamatan; mengulangnya di sini hanya
     * mengundang orang menjumlahkan keduanya.
     */
    if (desa.length > 0) {
      const nilai = kolomNilai(desa);
      tulisSheet(
        wb,
        {
          sheet: `${k.label} — Desa`.slice(0, 31),
          judul: `DATA KEPENDUDUKAN — ${k.label.toUpperCase()} (RINCIAN DESA)`,
          keterangan: `${keterangan} · per desa/kelurahan`,
          kolom: susunKolom(nilai),
          baris: susunBaris(desa, nilai),
        },
        logo,
      );
    }
  }

  return total > 0 ? wb : null;
}

/** Kirim workbook sebagai unduhan .xlsx. */
export async function workbookResponse(wb: ExcelJS.Workbook, namaFile: string) {
  const buf = await wb.xlsx.writeBuffer();

  return new Response(buf as ArrayBuffer, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${namaFile}"`,
      "Cache-Control": "no-store",
    },
  });
}
