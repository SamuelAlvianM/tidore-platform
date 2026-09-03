import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ok, fail } from "@/lib/api-response";
import { getSession } from "@/lib/auth";
import { bolehDashboard, isPetugas } from "@/lib/akun-level";
import { bolehLihatPermohonan } from "@/lib/lingkup-permohonan";
import { sendMail } from "@/lib/mail";
import {
  tplPermohonanSelesai,
  tplPermohonanDitolak,
} from "@/lib/mail-templates";
import { createNotifikasi, safeNotify } from "@/lib/notifikasi";
import { catatAktivitas } from "@/lib/log-aktivitas";
import { formDariKode } from "@/lib/layanan-kode";
import {
  ALASAN,
  labelSah,
  perluRincian,
  pilihanRincian,
  susun,
  uraikan,
} from "@/lib/tolak-permohonan";

const STATUS_VALID = ["MENUNGGU", "DIPROSES", "SELESAI", "DITOLAK"];

/** Detail satu permohonan (admin). */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session || !bolehDashboard(session.level)) {
    return fail(["Akses ditolak"], 403);
  }

  const { id } = await params;
  const permohonan = await prisma.permohonan.findUnique({
    where: { id: Number(id) },
    include: {
      jenis: true,
      user: {
        select: {
          userId: true,
          userFullname: true,
          userHp: true,
          userEmail: true,
          userKecamatan: true,
        },
      },
      berkas: true,
    },
  });
  if (!permohonan) return fail(["Permohonan tidak ditemukan"], 404);

  /*
   * 🔴 404, BUKAN 403. "Terlarang" mengonfirmasi bahwa permohonan bernomor
   * ini ada; "tidak ditemukan" tidak mengonfirmasi apa pun. Untuk data
   * kependudukan, keberadaan sebuah permohonan pun bukan kabar yang boleh
   * bocor ke instansi lain — nomor registrasi berurutan, jadi menebaknya
   * mudah.
   */
  if (!bolehLihatPermohonan(session, permohonan.userId)) {
    return fail(["Permohonan tidak ditemukan"], 404);
  }

  const form = formDariKode(permohonan.jenis?.kode);

  return ok({
    permohonan,
    // Panel proses hanya digambar untuk yang benar-benar boleh memproses;
    // OPD membuka halaman ini untuk MEMBACA — terutama alasan penolakan.
    bolehProses: isPetugas(session.level),
    /*
     * Penolakan diurai DI SERVER, bukan di peramban.
     *
     * Bentuk `catatan` adalah urusan `lib/tolak-permohonan.ts`; kalau
     * penguraiannya juga ditulis di sisi peramban, ada dua tempat yang harus
     * berubah bersama setiap kali bentuknya digeser — dan yang satu selalu
     * ketinggalan. Halaman detail cukup menggambar apa yang diterimanya.
     */
    tolak: uraikan(permohonan.catatan),
    /*
     * Pilihan "data apa yang kurang" untuk permohonan INI — isian & lampiran
     * dari skema layanannya sendiri. Dikirim walau statusnya belum ditolak:
     * panel proses membutuhkannya begitu petugas memilih DITOLAK, dan
     * mengambilnya lewat permintaan kedua hanya menambah jeda tepat di saat
     * petugas sedang mengetik.
     */
    rincianPilihan: pilihanRincian(form),
  });
}

/** Ubah status & catatan petugas (admin/operator). */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  // ⚠️ Sengaja `isPetugas`, bukan `bolehDashboard`: Operator OPD MEMBACA
  // permohonannya, tidak memprosesnya. Ia mengajukan atas nama warga di
  // wilayahnya; keputusan menerima/menolak tetap di tangan dinas.
  if (!session || !isPetugas(session.level)) {
    return fail(["Akses ditolak"], 403);
  }

  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const { status, catatan, alasan, rincian, keterangan } = body as {
    status?: string;
    catatan?: string;
    alasan?: string;
    rincian?: string[];
    keterangan?: string;
  };

  if (status && !STATUS_VALID.includes(status)) {
    return fail(["Info: Status tidak valid"]);
  }
  if (!status && catatan === undefined && alasan === undefined) {
    return fail(["Info: Tidak ada perubahan"]);
  }

  try {
    const sebelum = await prisma.permohonan.findUnique({
      where: { id: Number(id) },
      select: { status: true, jenis: { select: { kode: true } } },
    });
    if (!sebelum) return fail(["Permohonan tidak ditemukan"], 404);

    // Status SELESAI/DITOLAK bersifat FINAL — data terkunci. Membuka kembali
    // hanya lewat halaman Master (/dashboard/master, POST /api/admin/master).
    if (sebelum.status === "SELESAI" || sebelum.status === "DITOLAK") {
      return fail([
        "Info: Permohonan sudah final (Selesai/Ditolak) dan terkunci — buka kunci lewat halaman Master",
      ], 423);
    }

    /*
     * 🔴 PENOLAKAN WAJIB PUNYA ALASAN — DITEGAKKAN DI SERVER.
     *
     * Sebelumnya syarat ini hanya ada di formulir petugas. Panel yang
     * mengirim PATCH tanpa `catatan` tetap diterima, dan permohonan tertolak
     * dengan penjelasan kosong. Warga yang menerimanya tidak punya apa pun
     * untuk diperbaiki — dan itulah keluhan yang membuat fitur ini dibuat:
     * ditolak berkali-kali "karena data tidak lengkap" tanpa pernah tahu data
     * mana yang dimaksud.
     *
     * Aturan sisi peramban bukan aturan. Yang menjaga isi basis data adalah
     * baris-baris di bawah ini.
     */
    let catatanFinal = catatan;

    if (status === "DITOLAK") {
      const a = (alasan ?? "").trim();
      const ket = (keterangan ?? "").trim();
      const rinci = (rincian ?? []).map((r) => String(r).trim()).filter(Boolean);

      if (!(ALASAN as readonly string[]).includes(a)) {
        return fail(["Info: Pilih alasan penolakan"]);
      }
      if (!ket) {
        return fail(["Info: Keterangan penolakan wajib diisi"]);
      }
      if (perluRincian(a) && rinci.length === 0) {
        return fail([
          "Info: Pilih minimal satu data yang perlu dilengkapi",
        ]);
      }

      /*
       * ⚠️ Rincian dicocokkan dengan LABEL FORMULIR layanan ini, bukan
       * diterima apa adanya. Teks yang dikirim peramban berakhir di surel dan
       * PDF yang dibaca warga; tanpa pencocokan, panel yang dimodifikasi bisa
       * menuliskan kalimat apa pun ke sana atas nama dinas.
       *
       * Jenis warisan (SAKINAH, PENCETAKAN_KTP) tidak punya formulir, jadi
       * daftar sahnya kosong — untuk itu rincian memang tidak ditawarkan dan
       * tidak diwajibkan, tapi kalau tetap dikirim ia ditolak, bukan diloloskan.
       */
      const sah = new Set(labelSah(formDariKode(sebelum.jenis?.kode)));
      const asing = rinci.filter((r) => !sah.has(r));
      if (asing.length > 0) {
        return fail([
          `Info: Rincian tidak dikenali pada layanan ini: ${asing.join(", ")}`,
        ]);
      }

      catatanFinal = susun(a, rinci, ket);
    }

    // Jejak petugas pemroses — dicatat saat status berubah.
    const gantiStatus = !!status && status !== sebelum.status;
    const updated = await prisma.permohonan.update({
      where: { id: Number(id) },
      data: {
        ...(status ? { status } : {}),
        ...(catatanFinal !== undefined ? { catatan: catatanFinal } : {}),
        ...(gantiStatus
          ? {
              prosesById: session.uid,
              prosesByName: session.nama ?? session.userId,
              prosesAt: new Date(),
            }
          : {}),
      },
      include: {
        jenis: { select: { nama: true } },
        user: { select: { userFullname: true, userId: true, userEmail: true } },
      },
    });

    // Email notifikasi ke warga saat status berubah menjadi SELESAI / DITOLAK.
    if (
      status &&
      status !== sebelum.status &&
      (status === "SELESAI" || status === "DITOLAK") &&
      updated.user.userEmail
    ) {
      const nama = updated.user.userFullname ?? updated.user.userId;
      const mail =
        status === "SELESAI"
          ? tplPermohonanSelesai(
              nama,
              updated.noregister,
              updated.jenis.nama,
              updated.catatan ?? undefined,
            )
          : tplPermohonanDitolak(
              nama,
              updated.noregister,
              updated.jenis.nama,
              updated.catatan ?? undefined,
            );
      await sendMail({ to: updated.user.userEmail, ...mail });
    }

    // Notifikasi in-app ke warga saat status berubah (diproses/selesai/ditolak).
    if (status && status !== sebelum.status) {
      const labelStatus: Record<string, { judul: string; isi: string }> = {
        DIPROSES: {
          judul: "Permohonan sedang diproses",
          isi: `Permohonan ${updated.jenis.nama} (${updated.noregister}) Anda sedang diproses petugas.`,
        },
        SELESAI: {
          judul: "Permohonan selesai",
          isi: `Permohonan ${updated.jenis.nama} (${updated.noregister}) Anda telah SELESAI.`,
        },
        DITOLAK: {
          judul: "Permohonan ditolak",
          isi:
            `Permohonan ${updated.jenis.nama} (${updated.noregister}) Anda ditolak.` +
            (updated.catatan ? ` Catatan: ${updated.catatan}` : ""),
        },
      };
      const info = labelStatus[status];
      if (info) {
        await safeNotify(() =>
          createNotifikasi({
            userId: updated.userId,
            tipe: "PERMOHONAN_STATUS",
            judul: info.judul,
            isi: info.isi,
            link: "/user/pengajuan",
            refType: "Permohonan",
            refId: updated.id,
          }),
        );
      }
    }

    await catatAktivitas(
      session,
      "UBAH",
      "Permohonan",
      gantiStatus
        ? `Mengubah status permohonan ${updated.noregister} menjadi ${status}`
        : `Memperbarui catatan permohonan ${updated.noregister}`,
      { entitasId: updated.id, req },
    );

    return ok(null, ["Info: Permohonan berhasil diperbarui"]);
  } catch {
    return fail(["Info: Gagal memperbarui permohonan"], 500);
  }
}
