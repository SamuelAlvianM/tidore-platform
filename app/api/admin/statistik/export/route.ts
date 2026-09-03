import { NextRequest } from "next/server";
import { fail } from "@/lib/api-response";
import { getSession } from "@/lib/auth";
import {
  bagianValid,
  buatWorkbookStatistik,
  workbookStatistikResponse,
  type BagianStatistik,
} from "@/lib/statistik-export";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Ekspor statistik dashboard ke Excel berkop surat (khusus petugas).
 * GET /api/admin/statistik/export            → semua bagian (1 sheet per kartu)
 * GET /api/admin/statistik/export?bagian=…   → satu kartu statistik
 *
 * Izinnya disamakan dengan yang boleh MELIHAT dashboard (level 1 & 2) — angka
 * yang diekspor persis angka di layar, jadi memasang syarat yang lebih ketat
 * hanya akan membuat operator memfoto layarnya.
 */
export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session || session.level > 2) return fail(["Tidak diizinkan"], 403);

  const diminta = (new URL(req.url).searchParams.get("bagian") ?? "").trim();
  let bagian: BagianStatistik | undefined;
  if (diminta) {
    if (!bagianValid(diminta)) return fail(["Bagian statistik tidak dikenal"]);
    bagian = diminta;
  }

  const wb = await buatWorkbookStatistik(bagian);
  const tanggal = new Date().toISOString().slice(0, 10);
  const namaFile = `statistik-${bagian ?? "semua"}-${tanggal}.xlsx`;

  return workbookStatistikResponse(wb, namaFile);
}
