import { prisma } from "@/lib/prisma";
import type { Periode, PeriodeTersedia } from "@/lib/periode-demografi";

/**
 * Periode yang benar-benar punya data — sumber tunggal bagi seluruh pemilih
 * periode di aplikasi ini.
 *
 * 🔴 Dipakai juga untuk MENENTUKAN periode yang tampil di beranda. Sebelum
 * ini badge "DKB Semester II 2024" cuma tulisan konten statis, lepas sama
 * sekali dari data yang ditampilkannya: badge bisa menyebut satu semester
 * sementara angka di bawahnya berasal dari semester lain, tanpa satu pun
 * tanda di layar. Untuk angka resmi kependudukan, keterangan periode yang
 * keliru lebih berbahaya daripada tidak ada keterangan.
 */
export async function periodeTersedia(kategori?: string): Promise<PeriodeTersedia[]> {
  const baris = await prisma.demografiWilayah.groupBy({
    by: ["tahun", "semester"],
    where: kategori ? { kategori } : undefined,
    _count: { _all: true },
    orderBy: [{ tahun: "desc" }, { semester: "desc" }],
  });

  return baris.map((b) => ({
    tahun: b.tahun,
    semester: b.semester,
    baris: b._count._all,
  }));
}

/** Periode TERBARU yang ada datanya, atau null bila tabelnya kosong. */
export async function periodeTerbaru(): Promise<Periode | null> {
  const baris = await prisma.demografiWilayah.findFirst({
    orderBy: [{ tahun: "desc" }, { semester: "desc" }],
    select: { tahun: true, semester: true },
  });

  return baris ? { tahun: baris.tahun, semester: baris.semester } : null;
}

/**
 * Periode yang diminta, dijamin ADA datanya — atau yang terbaru bila tidak.
 *
 * ⚠️ Permintaan ke periode yang tidak ada datanya jatuh ke periode terbaru,
 * bukan menjawab kosong. Tautan lama yang beredar di grup WA masih menunjuk
 * semester yang sudah lewat; menjawabnya dengan halaman kosong membuat warga
 * mengira datanya hilang.
 */
export function pilihPeriode(
  diminta: Periode | null,
  tersedia: PeriodeTersedia[],
): Periode | null {
  if (tersedia.length === 0) return null;

  const terbaru = { tahun: tersedia[0].tahun, semester: tersedia[0].semester };
  if (!diminta) return terbaru;

  const cocok = tersedia.find(
    (t) => t.tahun === diminta.tahun && t.semester === diminta.semester,
  );

  return cocok ? { tahun: cocok.tahun, semester: cocok.semester } : terbaru;
}
