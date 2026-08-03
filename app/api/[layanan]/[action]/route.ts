import { NextRequest } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join, extname } from "path";
import { prisma } from "@/lib/prisma";
import { ok, fail } from "@/lib/api-response";
import { getSession } from "@/lib/auth";
import { createNotifikasi, notifyPetugas, safeNotify } from "@/lib/notifikasi";
import { cekJamLayananSekarang } from "@/lib/jam-layanan-server";
import { payloadBerkasEntries } from "@/lib/permohonan-display";
import { catatAktivitas } from "@/lib/log-aktivitas";
import { getLayananForm, validateLayananPayload } from "@/lib/layanan-forms";

/**
 * Catch-all kompatibilitas untuk modal permohonan (warisan struktur Laravel).
 * Setiap modal di components/permohonan-online/* memanggil endpoint berpola
 * /api/<layanan>/<action>:
 *   - action "upload"            → simpan file, balas { url } + success:[url]
 *   - action "fetch|fetchDatas|jenis" → prefill (kosong, non-blocking)
 *   - action "create|update|postdata|insertdata|store" → buat permohonan
 *
 * <layanan> dipetakan ke kode JenisPermohonan di DB.
 */
const LAYANAN_KODE: Record<string, string> = {
  "akta-kelahiran-nik-ada": "AKTA_KELAHIRAN_NIK_ADA",
  "akta-kelahiran-nik-tidak-ada": "AKTA_KELAHIRAN_NIK_BLM_ADA",
  "akta-kematian": "AKTA_KEMATIAN",
  "akta-nikah": "AKTA_NIKAH",
  "akta-perceraian": "AKTA_PERCERAIAN",
  kia: "KIA",
  ktpel: "KTP_EL",
  "perpindahan-penduduk": "PINDAH",
  kedatangan: "KEDATANGAN",
  "konsolidasi-update-data": "KONSOLIDASI",
  "kk-tambah-anak": "KK_TAMBAH_ANAK",
  "kk-pisah": "KK_PISAH",
  "kk-numpang": "KK_NUMPANG",
  "kk-perubahan-biodata": "KK_UBAH_BIODATA",
  "kk-cetak-ulang": "KK_CETAK_ULANG",
};

const SUBMIT_ACTIONS = ["create", "update", "postdata", "insertdata", "store"];

/**
 * Validasi payload sisi server — kumpulkan SEMUA kekurangan lalu balas
 * sekaligus (bukan satu-satu), agar warga tahu persis data apa saja yang
 * belum lengkap.
 *
 * Aturannya diambil dari skema `lib/layanan-forms.ts` — sumber yang sama yang
 * dipakai form di layar — jadi apa pun yang lolos di form pasti lolos di sini.
 * Sebelumnya validasi server menebak dari nama kolom (akhiran "nik"/"kk"), dan
 * itu memblokir layanan yang kolomnya kebetulan berakhiran begitu padahal
 * isinya bukan nomor identitas (mis. `alasannumpangkk` = "Pekerjaan" →
 * KK Numpang mustahil diajukan siapa pun).
 *
 * Layanan tanpa skema (tak seharusnya ada, tapi jaga-jaga) tetap dicek
 * seadanya: data pemohon wajib ada dan formatnya benar.
 */
function validatePayload(
  layanan: string,
  payload: Record<string, unknown>,
): string[] {
  const skema = getLayananForm(layanan);
  if (skema) return validateLayananPayload(skema, payload);

  const errors: string[] = [];
  const val = (k: string) => String(payload?.[k] ?? "").trim();

  const wajib: [string, string][] = [
    ["pemohonnik", "NIK pemohon"],
    ["pemohonnama", "Nama pemohon"],
    ["pemohonhp", "Nomor HP pemohon"],
    ["pemohonemail", "Email pemohon"],
  ];
  for (const [k, label] of wajib) {
    if (!val(k)) errors.push(`${label} wajib diisi`);
  }

  const nik = val("pemohonnik");
  if (nik && !/^\d{16}$/.test(nik)) {
    errors.push("NIK pemohon harus 16 digit angka");
  }
  const hp = val("pemohonhp");
  if (hp && !/^0\d{9,12}$/.test(hp)) {
    errors.push("Nomor HP pemohon harus 10-13 digit dan diawali 0");
  }
  const email = val("pemohonemail");
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("Format email pemohon tidak valid");
  }

  return errors;
}
const FETCH_ACTIONS = ["fetch", "fetchdatas", "jenis", "fetchdata"];

const MAX_SIZE = 5 * 1024 * 1024;
// Berkas permohonan HANYA gambar (scan/foto dokumen) — PDF tidak diterima.
const ALLOWED_EXT = [".jpg", ".jpeg", ".png", ".webp"];

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ layanan: string; action: string }> }
) {
  const { layanan, action: rawAction } = await params;
  const action = rawAction.toLowerCase();

  // Hanya tangani layanan permohonan yang dikenal; sisanya 404 alami.
  if (!(layanan in LAYANAN_KODE)) {
    return fail(["Layanan tidak ditemukan"], 404);
  }

  const session = await getSession();
  if (!session) return fail(["Silakan login terlebih dahulu"], 401);

  // ── Prefill (non-blocking) ──
  if (FETCH_ACTIONS.includes(action)) {
    return ok({});
  }

  // ── Upload berkas ──
  if (action === "upload") {
    try {
      const form = await req.formData();
      let file: File | null = null;
      for (const v of form.values()) {
        if (v instanceof File) {
          file = v;
          break;
        }
      }
      if (!file) return fail(["File tidak ditemukan"]);
      if (file.size > MAX_SIZE) return fail(["Ukuran file maksimal 5 MB"]);

      const ext = extname(file.name).toLowerCase();
      if (!ALLOWED_EXT.includes(ext)) {
        return fail(["Berkas permohonan harus berupa gambar (JPG, PNG, atau WebP)"]);
      }

      const safeName = `${session.uid}_${Date.now()}${ext}`;
      // DI LUAR public/ — berkas permohonan memuat KTP/KK warga. Apa pun di
      // public/ dilayani Next sebagai aset statis TANPA melewati kontrol akses
      // di app/uploads/[...path]/route.ts. URL publiknya tetap /uploads/<layanan>/…
      const uploadDir = join(process.cwd(), "storage", "permohonan", layanan);
      await mkdir(uploadDir, { recursive: true });
      await writeFile(join(uploadDir, safeName), Buffer.from(await file.arrayBuffer()));

      const url = `/uploads/${layanan}/${safeName}`;
      // success[0] = url → modal menyimpannya ke payload.
      return ok({ url }, [url]);
    } catch {
      return fail(["Gagal mengunggah file"], 500);
    }
  }

  // ── Submit permohonan ──
  if (SUBMIT_ACTIONS.includes(action)) {
    // Jam layanan berlaku untuk semua pembuat permohonan (warga & staff).
    const jam = await cekJamLayananSekarang();
    if (!jam.open) return fail([jam.message], 403);

    const payload = await req.json().catch(() => ({}));

    const kekurangan = validatePayload(layanan, payload as Record<string, unknown>);
    if (kekurangan.length > 0) return fail(kekurangan, 422);

    const jenis = await prisma.jenisPermohonan.findUnique({
      where: { kode: LAYANAN_KODE[layanan] },
    });
    if (!jenis) return fail(["Jenis permohonan tidak valid"]);

    const noregister = `REG${Date.now()}`;
    const permohonan = await prisma.permohonan.create({
      data: {
        noregister,
        userId: session.uid,
        jenisId: jenis.id,
        status: "MENUNGGU",
        payload: (payload ?? {}) as object,
      },
    });

    // Daftarkan berkas upload (field file* di payload) ke t_berkas agar
    // tampil sebagai lampiran di detail warga maupun dashboard petugas.
    const berkasBaru = payloadBerkasEntries(payload as Record<string, unknown>);
    if (berkasBaru.length > 0) {
      await prisma.berkas.createMany({
        data: berkasBaru.map((b) => ({
          permohonanId: permohonan.id,
          namaFile: b.label,
          path: b.path,
        })),
      });
    }

    // Notifikasi ke petugas: ada permohonan masuk. Pembuat dikecualikan
    // (form staf "Pengajuan Baru" juga lewat endpoint ini).
    const namaPemohon =
      String((payload as Record<string, unknown>)?.pemohonnama ?? "").trim() ||
      session.nama ||
      session.userId;
    await safeNotify(() =>
      notifyPetugas({
        tipe: "PERMOHONAN_BARU",
        judul: "Permohonan baru masuk",
        isi: `${namaPemohon} mengajukan ${jenis.nama} (${noregister}).`,
        link: "/dashboard/permohonan",
        refType: "Permohonan",
        refId: permohonan.id,
        kecualiUserId: session.uid,
      }),
    );

    // Konfirmasi in-app untuk warga/OPD pengaju (petugas tidak perlu).
    if (session.level > 2) {
      await safeNotify(() =>
        createNotifikasi({
          userId: session.uid,
          tipe: "PERMOHONAN_STATUS",
          judul: "Permohonan terkirim",
          isi: `Permohonan ${jenis.nama} Anda terkirim dengan No. Registrasi ${noregister} dan menunggu diproses petugas.`,
          link: "/user/pengajuan",
          refType: "Permohonan",
          refId: permohonan.id,
        }),
      );
    }

    // Bila pembuatnya petugas (form "Pengajuan Baru" atas nama warga), catat ke
    // log aktivitas. Warga/OPD (level > 2) diabaikan oleh helper.
    await catatAktivitas(
      session,
      "BUAT",
      "Permohonan",
      `Membuat permohonan ${jenis.nama} (${noregister}) atas nama warga`,
      { entitasId: permohonan.id, req },
    );

    return ok({ noregister: permohonan.noregister, id: permohonan.id }, [
      `Permohonan berhasil diajukan — No. Registrasi ${permohonan.noregister}`,
    ]);
  }

  return fail(["Aksi tidak dikenal"], 404);
}
