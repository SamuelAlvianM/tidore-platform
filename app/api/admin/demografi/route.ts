import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ok, fail } from "@/lib/api-response";
import { getSession } from "@/lib/auth";
import { slugDikenal } from "@/lib/demografi-registri";
import { catatAktivitas } from "@/lib/log-aktivitas";
import {
  SEMESTER_BAWAAN,
  TAHUN_BAWAAN,
  labelPeriode,
  periodeDariQuery,
  semesterSah,
  tahunSah,
  type Periode,
} from "@/lib/periode-demografi";
import { periodeTerbaru, periodeTersedia } from "@/lib/demografi-periode";
import { klasifikasiKode } from "@/lib/demografi-import";

export const dynamic = "force-dynamic";

/** Pesan akses yang jelas: bedakan sesi habis vs level akun kurang. */
async function cekPetugas() {
  const session = await getSession();
  if (!session)
    return { session: null, error: fail(["Sesi berakhir — silakan login ulang sebagai petugas"], 401) };
  if (session.level !== 1)
    return { session: null, error: fail(["Akses khusus petugas dinas — akun Anda bukan petugas"], 403) };
  return { session, error: null };
}

/** Ambil seluruh baris (kecamatan + desa) satu kategori untuk editor manual. */
export async function GET(req: NextRequest) {
  const { error } = await cekPetugas();
  if (error) return error;

  const sp = new URL(req.url).searchParams;
  const kategori = (sp.get("kategori") ?? "").trim();
  if (!(await slugDikenal(kategori))) return fail(["Kategori tidak dikenal"]);

  const diminta = periodeDariQuery(sp);
  if (diminta === false) return fail(["Periode tidak dikenal"]);

  /*
   * Tanpa periode → periode TERBARU yang ada datanya. Editor yang belum
   * mengirim periode tetap bekerja alih-alih menabrak, dan yang ia tampilkan
   * adalah data terbaru — bukan gabungan semua semester.
   */
  const periode = diminta ?? (await periodeTerbaru());
  const tersedia = await periodeTersedia();

  const rows = periode
    ? await prisma.demografiWilayah.findMany({
        where: { kategori, tahun: periode.tahun, semester: periode.semester },
        orderBy: { kode: "asc" },
        select: { kode: true, wilayah: true, level: true, parentKode: true, data: true },
      })
    : [];

  const kolom = rows.length
    ? Object.keys(rows[0].data as Record<string, number>)
    : [];

  return ok({ kolom, rows, periode, periodeTersedia: tersedia });
}

/**
 * Periode dari BADAN permintaan (PUT/POST). Tanpa periode → periode terbaru
 * yang ada datanya, dan bila tabelnya masih kosong, periode bawaan.
 */
async function periodeDariBadan(body: unknown): Promise<Periode | null> {
  const b = (body ?? {}) as { tahun?: unknown; semester?: unknown };
  const adaTahun = b.tahun !== undefined && b.tahun !== null && b.tahun !== "";
  const adaSemester = b.semester !== undefined && b.semester !== null && b.semester !== "";

  if (!adaTahun && !adaSemester) {
    return (await periodeTerbaru()) ?? { tahun: TAHUN_BAWAAN, semester: SEMESTER_BAWAAN };
  }
  if (!adaTahun || !adaSemester) return null;
  if (!tahunSah(b.tahun) || !semesterSah(b.semester)) return null;

  return { tahun: Number(b.tahun), semester: Number(b.semester) };
}

interface SaveRow {
  kode: string;
  wilayah: string;
  level: number;
  parentKode: string | null;
  data: Record<string, number>;
}

/** Simpan (ganti total) data satu kategori dari editor manual. */
export async function PUT(req: NextRequest) {
  const { session, error } = await cekPetugas();
  if (error) return error;

  const body = await req.json().catch(() => ({}));
  const kategori = String((body as { kategori?: string }).kategori ?? "").trim();
  const raw = (body as { rows?: unknown }).rows;
  if (!(await slugDikenal(kategori))) return fail(["Kategori tidak dikenal"]);
  if (!Array.isArray(raw)) return fail(["Data tidak valid"]);

  const periode = await periodeDariBadan(body);
  if (!periode) return fail(["Tahun dan semester harus diisi dan masuk akal"]);

  /*
   * 🔴 LEVEL DITENTUKAN OLEH ATURAN YANG SAMA DENGAN IMPORTIR.
   *
   * Dulu di sini berbunyi `kode.length === 10 ? 5 : 4` — apa pun yang bukan
   * 10 digit dianggap kecamatan. Baris kabupaten/kota berkode 4 digit yang
   * ikut tampil di editor karena itu NAIK PANGKAT jadi kecamatan setiap kali
   * petugas menekan Simpan, dan sejak itu tiap penjumlahan tingkat kecamatan
   * menghitung seluruh kota dua kali. Komentar di baris ini bahkan sudah
   * menuliskan aturan yang benar; kodenya yang tidak mengikutinya.
   */
  const seen = new Set<string>();
  const rows: SaveRow[] = [];
  for (const r of raw as SaveRow[]) {
    const wilayah = String(r?.wilayah ?? "").trim();
    if (!wilayah) continue;

    const kelas = klasifikasiKode(String(r?.kode ?? ""));
    if (!kelas) continue; // bentuk kode tak dikenali → dilewati, bukan ditebak

    const { kode, level } = kelas;
    if (seen.has(kode)) continue;
    seen.add(kode);
    const data: Record<string, number> = {};
    for (const [k, v] of Object.entries(r?.data ?? {})) {
      data[k] = Number(v) || 0;
    }
    rows.push({
      kode,
      wilayah,
      level,
      parentKode: level === 5 ? kode.slice(0, 6) : null,
      data,
    });
  }

  /*
   * 🔴 Penghapusannya WAJIB disaring periode. Tanpa `tahun`/`semester` di
   * `where`, menyimpan satu semester akan menghapus semester lain — persis
   * kerusakan yang seluruh perubahan ini ada untuk mencegahnya.
   */
  await prisma.$transaction([
    prisma.demografiWilayah.deleteMany({
      where: { kategori, tahun: periode.tahun, semester: periode.semester },
    }),
    ...(rows.length
      ? [
          prisma.demografiWilayah.createMany({
            data: rows.map((r) => ({
              kategori,
              tahun: periode.tahun,
              semester: periode.semester,
              ...r,
            })),
          }),
        ]
      : []),
  ]);

  await catatAktivitas(
    session,
    "UBAH",
    "Demografi",
    `Menyimpan data demografi kategori ${kategori} ${labelPeriode(periode.tahun, periode.semester)} (${rows.length} baris)`,
    { entitasId: kategori, req },
  );

  return ok({ tersimpan: rows.length }, ["Data demografi disimpan"]);
}

/**
 * Hapus data demografi. Tanpa `?kategori` → hapus SEMUA kategori (reset total);
 * dengan `?kategori=slug` → hapus satu kategori saja.
 */
export async function DELETE(req: NextRequest) {
  const { session, error } = await cekPetugas();
  if (error) return error;

  const sp = new URL(req.url).searchParams;
  const kategori = (sp.get("kategori") ?? "").trim();
  if (kategori && !(await slugDikenal(kategori))) {
    return fail(["Kategori tidak dikenal"]);
  }

  // Periode OPSIONAL di sini: tanpa periode = hapus seluruh periode, supaya
  // "hapus semua" tetap berarti apa yang tertulis.
  const periode = periodeDariQuery(sp);
  if (periode === false) return fail(["Periode tidak dikenal"]);

  const res = await prisma.demografiWilayah.deleteMany({
    where: {
      ...(kategori ? { kategori } : {}),
      ...(periode ? { tahun: periode.tahun, semester: periode.semester } : {}),
    },
  });

  const tandaPeriode = periode
    ? ` ${labelPeriode(periode.tahun, periode.semester)}`
    : "";

  await catatAktivitas(
    session,
    "HAPUS",
    "Demografi",
    kategori
      ? `Menghapus data demografi kategori ${kategori}${tandaPeriode} (${res.count} baris)`
      : `Menghapus SEMUA data demografi${tandaPeriode} (${res.count} baris)`,
    { entitasId: kategori || "semua", req },
  );

  return ok({ dihapus: res.count }, [
    kategori
      ? `Data kategori dihapus (${res.count} baris)`
      : `Data demografi${tandaPeriode || " semua periode"} dihapus (${res.count} baris)`,
  ]);
}
