import { NextRequest } from "next/server";
import { fail } from "@/lib/api-response";
import { getSession } from "@/lib/auth";
import { slugDikenal } from "@/lib/demografi-registri";
import { buildDemografiWorkbook, workbookResponse } from "@/lib/demografi-export";
import { periodeDariQuery } from "@/lib/periode-demografi";
import { periodeTerbaru } from "@/lib/demografi-periode";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Ekspor data demografi ke Excel (khusus petugas).
 * GET /api/admin/demografi/export             → semua kategori (1 sheet per kategori)
 * GET /api/admin/demografi/export?kategori=…  → satu kategori
 */
export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session || session.level !== 1) return fail(["Tidak diizinkan"], 403);

  const sp = new URL(req.url).searchParams;
  const kategori = (sp.get("kategori") ?? "").trim();
  if (kategori && !(await slugDikenal(kategori))) {
    return fail(["Kategori tidak dikenal"]);
  }

  /*
   * 🔴 Ekspor SELALU satu periode, tidak pernah "semua".
   *
   * Lembarnya berkolom IDEM/KODE/WILAYAH tanpa kolom periode — bentuk yang
   * sama dengan yang dibaca importer, supaya berkasnya bisa diunggah balik.
   * Menuang dua semester ke lembar yang sama berarti satu KODE muncul dua kali
   * dengan angka berbeda dan tidak ada apa pun yang membedakannya.
   */
  const diminta = periodeDariQuery(sp);
  if (diminta === false) return fail(["Periode tidak dikenal"]);
  const periode = diminta ?? (await periodeTerbaru());

  const wb = await buildDemografiWorkbook(kategori || undefined, periode);
  if (!wb) return fail(["Belum ada data untuk diekspor"], 404);

  /*
   * ⚠️ Periodenya masuk ke NAMA BERKAS. Berkas ekspor beredar lewat WhatsApp
   * dan folder bersama; tanpa periode di namanya, dua semester berakhir
   * sebagai dua "demografi-kk.xlsx" yang tak bisa dibedakan.
   */
  const tanda = periode ? `-${periode.tahun}-sem${periode.semester}` : "";
  const namaFile = kategori
    ? `demografi-${kategori}${tanda}.xlsx`
    : `demografi-semua${tanda}.xlsx`;

  return workbookResponse(wb, namaFile);
}
