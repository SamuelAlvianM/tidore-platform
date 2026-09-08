import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ok, fail } from "@/lib/api-response";
import { getSession } from "@/lib/auth";
import { parseDemografiExcel } from "@/lib/demografi-import";
import { slugDikenal } from "@/lib/demografi-registri";
import { catatAktivitas } from "@/lib/log-aktivitas";
import { labelPeriode, semesterSah, tahunSah, type Periode } from "@/lib/periode-demografi";
import { periodeTerbaru } from "@/lib/demografi-periode";
import { SEMESTER_BAWAAN, TAHUN_BAWAAN } from "@/lib/periode-demografi";

/**
 * Periode dari FormData. Tanpa periode → periode terbaru yang ada datanya.
 *
 * 🔴 Dibaca dari form yang SAMA dengan berkasnya, bukan dari query string:
 * unggahan dikirim sebagai multipart, dan periode yang tercecer di tempat lain
 * hampir pasti akan lupa dikirim suatu hari — lalu berkas semester I mendarat
 * menimpa semester II tanpa ada yang menyadarinya.
 */
async function periodeDariForm(form: FormData): Promise<Periode | null | false> {
  const tahun = form.get("tahun");
  const semester = form.get("semester");

  if (!tahun && !semester) return await periodeTerbaru() ?? { tahun: TAHUN_BAWAAN, semester: SEMESTER_BAWAAN };
  if (!tahun || !semester) return false;
  if (!tahunSah(tahun) || !semesterSah(semester)) return false;

  return { tahun: Number(tahun), semester: Number(semester) };
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MAX_UPLOAD = 10 * 1024 * 1024; // 10 MB

/** Import Excel demografi (SIAK) untuk satu kategori. Mengganti data lama kategori tsb. */
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session || session.level !== 1) return fail(["Tidak diizinkan"], 403);

  let file: File | null = null;
  let kategori = "";
  let periode: Periode | null | false = null;
  try {
    const form = await req.formData();
    const f = form.get("file");
    if (f instanceof File) file = f;
    kategori = String(form.get("kategori") ?? "").trim();
    periode = await periodeDariForm(form);
  } catch {
    return fail(["Format unggahan tidak valid"]);
  }

  if (!(await slugDikenal(kategori))) return fail(["Kategori tidak dikenal"]);
  // Ditolak SEBELUM berkasnya diurai: menolak lebih awal lebih murah daripada
  // membaca 10 MB Excel lalu baru menyadari periodenya salah.
  if (periode === false) return fail(["Tahun dan semester harus diisi dan masuk akal"]);
  if (!periode) return fail(["Periode tidak dapat ditentukan"]);
  if (!file) return fail(["Tidak ada file yang dikirim"]);
  if (!/\.xlsx$/i.test(file.name)) return fail(["File harus berformat .xlsx"]);
  if (file.size > MAX_UPLOAD) return fail(["Ukuran file maksimal 10 MB"]);

  let parsed;
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    parsed = await parseDemografiExcel(buffer);
  } catch (e) {
    return fail([e instanceof Error ? e.message : "Gagal membaca file Excel"]);
  }

  if (parsed.rows.length === 0) {
    return fail(["Tidak ada baris kecamatan/desa yang terbaca dari file"]);
  }

  /*
   * Ganti total kategori ini PADA SATU PERIODE (import = kebenaran terbaru
   * untuk periode itu).
   *
   * 🔴 `deleteMany` WAJIB menyaring periode. Tanpa itu, mengunggah DKB
   * semester berikutnya menghapus semester sebelumnya — dinas kehilangan
   * datanya tanpa peringatan apa pun.
   */
  await prisma.$transaction([
    prisma.demografiWilayah.deleteMany({
      where: { kategori, tahun: periode.tahun, semester: periode.semester },
    }),
    prisma.demografiWilayah.createMany({
      data: parsed.rows.map((r) => ({
        kategori,
        tahun: periode.tahun,
        semester: periode.semester,
        kode: r.kode,
        wilayah: r.wilayah,
        level: r.level,
        parentKode: r.parentKode,
        data: r.data,
      })),
    }),
  ]);

  const labelP = labelPeriode(periode.tahun, periode.semester);

  await catatAktivitas(
    session,
    "IMPOR",
    "Demografi",
    `Impor Excel demografi kategori ${kategori} ${labelP}: ${parsed.kecamatan} kecamatan, ${parsed.desa} desa`,
    { entitasId: kategori, req },
  );

  return ok(
    { kecamatan: parsed.kecamatan, desa: parsed.desa, kolom: parsed.kolom, periode },
    [`Import ${labelP} berhasil: ${parsed.kecamatan} kecamatan, ${parsed.desa} desa`],
  );
}
