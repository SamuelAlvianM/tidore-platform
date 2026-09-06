import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ok, fail } from "@/lib/api-response";
import { getSession } from "@/lib/auth";
import { isPetugas } from "@/lib/akun-level";
import { semesterSah, tahunSah } from "@/lib/periode-demografi";

export const dynamic = "force-dynamic";

/**
 * Jumlah kecamatan tersimpan per kategori, PADA PERIODE YANG DIMINTA PERSIS.
 *
 * 🔴 KENAPA ENDPOINT SENDIRI, bukan memakai `/api/demografi`.
 *
 * Endpoint publik itu sengaja JATUH KE PERIODE TERBARU bila periode yang
 * diminta tidak punya data — supaya tautan lama yang beredar di grup WA tidak
 * menjawab halaman kosong. Untuk warga itu benar. Untuk dasbor itu bencana:
 * dasbor bertanya "berapa isi Semester I 2026?" dan dijawab dengan isi
 * Semester II 2024, lalu memasang tulisan "8 dari 8 kategori terisi" pada
 * wadah yang sebenarnya kosong melompong.
 *
 * Terukur di TIDORE (7 Sep 2026): basis data hanya berisi 2024 Semester II,
 * tapi wadah Semester I 2026 melaporkan 8 kategori terisi dan 9 kecamatan,
 * dan tombol Export serta Hapus-nya menyala. Petugas bisa menekan Hapus untuk
 * periode yang tidak pernah ada isinya, atau mengira DKB-nya sudah diunggah.
 *
 * Di sini TIDAK ADA cadangan. Periode kosong dijawab nol, karena itulah
 * kebenarannya.
 *
 * ⚠️ Sekaligus menggantikan delapan permintaan (satu per kategori) dengan
 * satu. Membuka empat wadah periode dulu berarti 32 permintaan.
 */
export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session || !isPetugas(session.level)) return fail(["Tidak diizinkan"], 403);

  const sp = new URL(req.url).searchParams;
  const tahun = sp.get("tahun");
  const semester = sp.get("semester");

  if (!tahunSah(tahun) || !semesterSah(semester)) {
    return fail(["Tahun dan semester harus diisi dan masuk akal"]);
  }

  /*
   * Dihitung dari baris KECAMATAN (level 4) — angka yang ditampilkan dasbor
   * memang "N kecamatan tersimpan". Kategori yang entah bagaimana hanya punya
   * baris desa dihitung dari induknya yang berbeda, supaya tetap terlihat
   * berisi alih-alih dilaporkan kosong.
   */
  const [kecamatan, desa] = await Promise.all([
    prisma.demografiWilayah.groupBy({
      by: ["kategori"],
      where: { tahun: Number(tahun), semester: Number(semester), level: 4 },
      _count: { _all: true },
    }),
    prisma.demografiWilayah.findMany({
      where: { tahun: Number(tahun), semester: Number(semester), level: 5 },
      select: { kategori: true, parentKode: true },
    }),
  ]);

  const hitungan: Record<string, number> = {};
  for (const k of kecamatan) hitungan[k.kategori] = k._count._all;

  const indukPerKategori = new Map<string, Set<string>>();
  for (const d of desa) {
    if (!d.parentKode) continue;
    if (!indukPerKategori.has(d.kategori)) indukPerKategori.set(d.kategori, new Set());
    indukPerKategori.get(d.kategori)!.add(d.parentKode);
  }
  for (const [kat, induk] of indukPerKategori) {
    if (!hitungan[kat]) hitungan[kat] = induk.size;
  }

  return ok({ tahun: Number(tahun), semester: Number(semester), hitungan });
}
