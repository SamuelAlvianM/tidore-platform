import { NextRequest } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ok, fail } from "@/lib/api-response";
import { getSession } from "@/lib/auth";

/**
 * Daftar SEMUA permohonan untuk panel admin (filter status & pencarian).
 *
 * Paginasi BERNOMOR (page/limit), bukan cursor: petugas perlu tahu total data
 * dan bisa melompat ke halaman tertentu. Pencarian & filter dijalankan di
 * DATABASE, jadi hasilnya mencakup seluruh data — bukan hanya baris yang
 * kebetulan sedang tampil di halaman aktif.
 */
export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session || session.level > 2) return fail(["Akses ditolak"], 403);

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status"); // MENUNGGU | DIPROSES | SELESAI | DITOLAK
  const q = searchParams.get("q")?.trim();
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);
  const limit = Math.min(
    100,
    Math.max(10, parseInt(searchParams.get("limit") ?? "20", 10) || 20),
  );

  const where: Prisma.PermohonanWhereInput = {
    ...(status ? { status } : {}),
    ...(q
      ? {
          OR: [
            { noregister: { contains: q } },
            { user: { userFullname: { contains: q } } },
            { user: { userId: { contains: q } } },
          ],
        }
      : {}),
  };

  // Hitungan total & baris halaman diambil sekaligus (id desc ≈ createdAt desc).
  const [total, rows] = await Promise.all([
    prisma.permohonan.count({ where }),
    prisma.permohonan.findMany({
      where,
      include: {
        jenis: { select: { nama: true, kategori: true } },
        user: { select: { userId: true, userFullname: true, userHp: true } },
        _count: { select: { berkas: true } },
      },
      orderBy: { id: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);

  const totalHalaman = Math.max(1, Math.ceil(total / limit));

  const items = rows.map((i) => ({
    id: i.id,
    noregister: i.noregister,
    status: i.status,
    catatan: i.catatan,
    createdAt: i.createdAt,
    updatedAt: i.updatedAt,
    jenisNama: i.jenis?.nama ?? "-",
    kategori: i.jenis?.kategori ?? "-",
    pemohon: i.user?.userFullname ?? i.user?.userId ?? "-",
    pemohonId: i.user?.userId ?? "-",
    hp: i.user?.userHp ?? "-",
    jumlahBerkas: i._count.berkas,
  }));

  // Jumlah per status (untuk chip filter) — hanya di halaman pertama, isinya
  // sama untuk tiap halaman sehingga tak perlu dihitung ulang.
  let counts: Record<string, number> | undefined;
  if (page === 1) {
    // Mengikuti filter LAIN (pencarian), tapi bukan filter status itu sendiri —
    // supaya angka tiap chip menunjukkan "berapa yang muncul kalau chip diklik".
    const grouped = await prisma.permohonan.groupBy({
      by: ["status"],
      _count: { _all: true },
      where: { ...where, status: undefined },
    });
    counts = {};
    let semua = 0;
    for (const g of grouped) {
      counts[g.status] = g._count._all;
      semua += g._count._all;
    }
    counts[""] = semua; // "Semua"
  }

  return ok({
    items,
    page,
    limit,
    total,
    totalHalaman,
    ...(counts ? { counts } : {}),
  });
}
