import { NextRequest } from "next/server";
import { fail } from "@/lib/api-response";
import { slugDikenal } from "@/lib/demografi-registri";
import { buildDemografiWorkbook, workbookResponse } from "@/lib/demografi-export";
import { periodeDariQuery } from "@/lib/periode-demografi";
import { periodeTerbaru } from "@/lib/demografi-periode";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Ekspor data demografi ke Excel — PUBLIK (data demografi memang terbuka,
 * sama dengan yang ditampilkan tabel /media/demografi).
 * GET /api/demografi/export             → semua kategori (1 sheet per kategori)
 * GET /api/demografi/export?kategori=…  → satu kategori
 * &tahun=2025&semester=1                 → periode tertentu (tanpa itu: terbaru)
 */
export async function GET(req: NextRequest) {
  const sp = new URL(req.url).searchParams;
  const kategori = (sp.get("kategori") ?? "").trim();
  if (kategori && !(await slugDikenal(kategori))) {
    return fail(["Kategori tidak dikenal"]);
  }

  /*
   * 🔴 Ekspor SELALU satu periode, tidak pernah "semua".
   *
   * Lembarnya berkolom IDEM/KODE/WILAYAH tanpa kolom periode — bentuk yang
   * sama dengan yang dibaca importer. Menuang dua semester ke lembar yang sama
   * berarti satu KODE muncul dua kali dengan angka berbeda dan tidak ada apa
   * pun yang membedakannya.
   */
  const diminta = periodeDariQuery(sp);
  if (diminta === false) return fail(["Periode tidak dikenal"]);
  const periode = diminta ?? (await periodeTerbaru());

  const wb = await buildDemografiWorkbook(kategori || undefined, periode);
  if (!wb) return fail(["Belum ada data untuk diekspor"], 404);

  // Periodenya masuk ke NAMA BERKAS: tanpa itu dua semester berakhir sebagai
  // dua "demografi-kk.xlsx" yang tak bisa dibedakan di folder unduhan.
  const tanda = periode ? `-${periode.tahun}-sem${periode.semester}` : "";
  const namaFile = kategori
    ? `demografi-${kategori}${tanda}.xlsx`
    : `demografi-semua${tanda}.xlsx`;

  return workbookResponse(wb, namaFile);
}
