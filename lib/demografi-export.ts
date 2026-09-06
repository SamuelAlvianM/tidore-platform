import ExcelJS from "exceljs";
import { prisma } from "@/lib/prisma";
import { daftarKategori } from "@/lib/demografi-registri";
import type { Periode } from "@/lib/periode-demografi";

/**
 * Penyusun workbook Excel data demografi — dipakai endpoint export admin
 * (/api/admin/demografi/export) dan publik (/api/demografi/export).
 */

interface DbRow {
  kode: string;
  wilayah: string;
  level: number;
  data: unknown;
}

/** Tambah satu sheet berisi baris (kecamatan + pekon) satu kategori. */
function addSheet(wb: ExcelJS.Workbook, label: string, rows: DbRow[]) {
  const ws = wb.addWorksheet(label.slice(0, 31)); // batas nama sheet Excel = 31
  const kolom = rows.length ? Object.keys((rows[0].data ?? {}) as object) : [];

  ws.addRow(["KODE", "WILAYAH", "LEVEL", ...kolom]);
  ws.getRow(1).font = { bold: true };
  ws.getRow(1).fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFE8F0F8" },
  };

  for (const r of rows) {
    const d = (r.data ?? {}) as Record<string, number>;
    ws.addRow([
      r.kode,
      r.wilayah,
      r.level === 5 ? "Desa" : "Kecamatan",
      ...kolom.map((k) => d[k] ?? 0),
    ]);
  }

  ws.columns.forEach((c, i) => {
    c.width = i === 1 ? 28 : i === 0 ? 14 : 12;
  });
}

/**
 * Susun workbook untuk satu kategori (bila diisi) atau semua kategori
 * (1 sheet per kategori). Mengembalikan null bila tidak ada data sama sekali.
 */
export async function buildDemografiWorkbook(kategori?: string,
  periode?: Periode | null,
) {
  const wb = new ExcelJS.Workbook();
  wb.creator = "DAGA Disdukcapil Tidore Kepulauan";
  wb.created = new Date();

  /*
   * 🔴 Daftar kategori diambil dari REGISTRI, bukan dari konstanta.
   *
   * Dua hal rusak kalau tidak: "Export Semua" diam-diam melewatkan seluruh
   * kategori buatan dinas — berkasnya terlihat lengkap padahal tidak — dan
   * ekspor satu kategori kustom menabrak `getDemografiKategori(...)!`, tanda
   * seru yang berbohong: nilainya `undefined`, dan `k.label` melempar.
   */
  const semua = await daftarKategori();
  const satu = kategori ? semua.find((k) => k.slug === kategori) : undefined;
  if (kategori && !satu) return null;

  const targets = satu ? [satu] : semua;

  let total = 0;
  for (const k of targets) {
    const rows = await prisma.demografiWilayah.findMany({
      where: {
        kategori: k.slug,
        ...(periode ? { tahun: periode.tahun, semester: periode.semester } : {}),
      },
      orderBy: { kode: "asc" },
      select: { kode: true, wilayah: true, level: true, data: true },
    });
    total += rows.length;
    addSheet(wb, k.label, rows);
  }

  if (total === 0) return null;
  return wb;
}

/** Respon unduhan .xlsx dari workbook. */
export async function workbookResponse(wb: ExcelJS.Workbook, namaFile: string) {
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
