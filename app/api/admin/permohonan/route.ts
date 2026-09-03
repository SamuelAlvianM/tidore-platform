import { NextRequest } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ok, fail } from "@/lib/api-response";
import { getSession } from "@/lib/auth";
import { bolehDashboard, bolehSemuaWilayah } from "@/lib/akun-level";
import { lingkupPermohonan } from "@/lib/lingkup-permohonan";

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
  if (!session || !bolehDashboard(session.level)) {
    return fail(["Akses ditolak"], 403);
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status"); // MENUNGGU | DIPROSES | SELESAI | DITOLAK
  const q = searchParams.get("q")?.trim();
  const jenisId = Number(searchParams.get("jenis") ?? "") || null;
  const wilayah = searchParams.get("wilayah")?.trim() || null;
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);
  const limit = Math.min(
    100,
    Math.max(10, parseInt(searchParams.get("limit") ?? "20", 10) || 20),
  );

  /*
   * 🔴 LINGKUP DIGABUNG DI SINI, di `where` DASAR — bukan ditempel pada query
   * baris saja. Ketiga query di bawah (baris, total, hitungan per status)
   * berangkat dari objek ini; menyaringnya belakangan membuat daftarnya benar
   * sementara angkanya masih menghitung seluruh kabupaten.
   */
  const where: Prisma.PermohonanWhereInput = {
    ...lingkupPermohonan(session),
    ...(status ? { status } : {}),
    ...(jenisId ? { jenisId } : {}),
    // Wilayah permohonan dibaca dari kecamatan akun pengajunya — tidak ada
    // tempat lain yang mencatatnya per baris.
    ...(wilayah && bolehSemuaWilayah(session.level)
      ? { user: { userKecamatan: wilayah } }
      : {}),
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

  /*
   * Pilihan saringan — dikirim HANYA di halaman pertama, sama seperti
   * `counts`: isinya tidak berubah antar halaman, dan mengulangnya di tiap
   * permintaan berarti dua query tambahan untuk daftar yang sudah ada di
   * layar.
   *
   * `daftarJenis` diambil dari MASTER, bukan dari jenis yang kebetulan
   * muncul di halaman ini — saringan yang cuma berisi pilihan yang sudah
   * tampil tidak menyaring apa pun.
   *
   * ⚠️ `daftarWilayah` tidak dikirim ke Operator OPD. Seluruh permohonannya
   * berasal dari satu wilayah, jadi saringannya tidak berguna — dan daftar
   * kecamatan se-kabupaten di panelnya menyiratkan data yang memang bukan
   * haknya.
   */
  let daftarJenis: { id: number; nama: string }[] | undefined;
  let daftarWilayah: string[] | undefined;

  if (page === 1) {
    daftarJenis = await prisma.jenisPermohonan.findMany({
      select: { id: true, nama: true },
      orderBy: { nama: "asc" },
    });

    if (bolehSemuaWilayah(session.level)) {
      const kec = await prisma.wilayah.findMany({
        where: { jenis: "KECAMATAN" },
        select: { nama: true },
        orderBy: { nama: "asc" },
      });
      daftarWilayah = kec.map((k) => k.nama);
    }
  }

  return ok({
    items,
    page,
    limit,
    total,
    totalHalaman,
    ...(counts ? { counts } : {}),
    ...(daftarJenis ? { daftarJenis } : {}),
    ...(daftarWilayah ? { daftarWilayah } : {}),
  });
}
