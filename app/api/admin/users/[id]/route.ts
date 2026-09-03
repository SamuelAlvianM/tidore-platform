import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ok, fail } from "@/lib/api-response";
import { getSession } from "@/lib/auth";
import { catatAktivitas } from "@/lib/log-aktivitas";
import {
  LEVEL_ADMIN,
  LEVEL_OPD,
  NAMA_PERAN,
  isAdmin,
  isPetugas,
} from "@/lib/akun-level";
import { periksaDataAkun } from "@/lib/validasi-akun";
import { hapusFotoKtp, hapusFotoProfil } from "@/lib/foto-profil";

export const dynamic = "force-dynamic";

/**
 * Detail satu akun untuk panel samping di Manajemen Akun.
 *
 * Dipisah dari daftar supaya tabel tetap ringan: kolom seperti riwayat login,
 * IP, dan permohonan terakhir hanya diambil saat barisnya benar-benar dibuka.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session || session.level > 2) return fail(["Tidak diizinkan"], 403);

  const { id } = await params;
  const uid = Number(id);
  if (!Number.isInteger(uid)) return fail(["Id akun tidak valid"], 400);

  const user = await prisma.user.findUnique({
    where: { id: uid },
    select: {
      id: true,
      userId: true,
      userlevelId: true,
      userFullname: true,
      userNik: true,
      userNokk: true,
      userHp: true,
      userEmail: true,
      userKecamatan: true,
      userFoto: true,
      userKtp: true,
      status: true,
      ket: true,
      ipAddress: true,
      loginLast: true,
      activationTime: true,
      createdAt: true,
      updatedAt: true,
      level: { select: { nama: true } },
      _count: { select: { permohonans: true } },
    },
  });

  if (!user) return fail(["Akun tidak ditemukan"], 404);

  // Beberapa permohonan terakhir — konteks cepat sebelum petugas memutuskan
  // mengaktifkan atau menolak sebuah akun.
  const permohonanTerakhir = await prisma.permohonan.findMany({
    where: { userId: uid },
    orderBy: { id: "desc" },
    take: 5,
    select: {
      id: true,
      noregister: true,
      status: true,
      createdAt: true,
      jenis: { select: { nama: true } },
    },
  });

  return ok({
    ...user,
    jumlahPermohonan: user._count.permohonans,
    permohonanTerakhir: permohonanTerakhir.map((p) => ({
      id: p.id,
      noregister: p.noregister,
      status: p.status,
      createdAt: p.createdAt,
      jenisNama: p.jenis?.nama ?? "-",
    })),
  });
}

/**
 * Hapus akun secara PERMANEN — hanya Super Admin (level 1).
 *
 * Akun yang pernah dipakai TIDAK boleh dihapus: permohonan dan tiket adalah
 * arsip pelayanan yang harus tetap bisa ditelusuri pemiliknya (relasinya pun
 * restrict di DB, jadi penghapusan akan gagal di tengah jalan). Untuk kasus
 * itu petugas diarahkan menonaktifkan akun, yang efeknya sama bagi pengguna
 * tetapi arsipnya utuh.
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (session?.level !== 1) {
    return fail(["Info: Hanya Super Admin yang dapat menghapus akun"], 403);
  }

  const { id } = await params;
  const uid = Number(id);
  if (!Number.isInteger(uid)) return fail(["Id akun tidak valid"], 400);
  if (uid === session.uid) {
    return fail(["Info: Anda tidak dapat menghapus akun Anda sendiri"]);
  }

  const user = await prisma.user.findUnique({
    where: { id: uid },
    select: {
      id: true,
      userId: true,
      userFullname: true,
      userlevelId: true,
      userFoto: true,
      userKtp: true,
      _count: { select: { permohonans: true, tikets: true, tiketPesan: true } },
    },
  });
  if (!user) return fail(["Info: Akun tidak ditemukan"], 404);

  const jejak =
    user._count.permohonans + user._count.tikets + user._count.tiketPesan;
  if (jejak > 0) {
    return fail([
      `Info: Akun ini punya ${user._count.permohonans} permohonan dan tidak bisa dihapus. ` +
        `Nonaktifkan saja agar riwayat pelayanan tetap tersimpan.`,
    ]);
  }

  const nama = user.userFullname ?? user.userId;
  try {
    // Notifikasi & log milik akun ini ikut terhapus lewat cascade di skema.
    await prisma.user.delete({ where: { id: uid } });
    await hapusFotoProfil(user.userFoto);
    // Berkas KTP ikut dibuang bersama akunnya — kalau tidak, scan KTP warga
    // tertinggal di storage tanpa pemilik.
    await hapusFotoKtp(user.userKtp);

    await catatAktivitas(
      session,
      "HAPUS",
      "Akun",
      `Menghapus akun ${nama} (${user.userId})`,
      { entitasId: uid, req },
    );

    return ok(null, [`Info: Akun ${nama} telah dihapus permanen`]);
  } catch {
    return fail(["Info: Gagal menghapus akun"], 500);
  }
}

/**
 * Sunting profil akun (petugas dinas).
 *
 * 🔴 Sampai sekarang tidak ada cara memperbaiki data akun sama sekali. Satu
 * huruf salah pada nama, nomor telepon yang berganti, atau kecamatan yang
 * keliru saat pendaftaran hanya bisa diperbaiki dengan menghapus akun lalu
 * menyuruh warga mendaftar ulang — dan itu ikut membuang seluruh riwayat
 * permohonannya.
 *
 * ⚠️ MENYUNTING AKUN PETUGAS = MENYENTUH PEMEGANG KUNCI. Tanpa penjagaan di
 * bawah, seorang Operator bisa menyunting akun Super Admin — termasuk
 * `userId`-nya, yang sama saja dengan mengambil alih akun itu. Karena itu akun
 * petugas hanya boleh disunting Super Admin.
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session || !isPetugas(session.level)) {
    return fail(["Tidak diizinkan"], 403);
  }

  const { id } = await params;
  const uid = Number(id);
  if (!Number.isInteger(uid)) return fail(["Id akun tidak valid"], 400);

  const user = await prisma.user.findUnique({
    where: { id: uid },
    select: {
      id: true,
      userId: true,
      userlevelId: true,
      userFullname: true,
      userKecamatan: true,
    },
  });
  if (!user) return fail(["Info: Akun tidak ditemukan"], 404);

  if (isPetugas(user.userlevelId) && !isAdmin(session.level)) {
    return fail(
      ["Info: Hanya Super Admin yang dapat menyunting akun petugas"],
      403,
    );
  }

  const body = await req.json().catch(() => ({}));
  const d = body as {
    nama?: string;
    userId?: string;
    nik?: string;
    kk?: string;
    hp?: string;
    email?: string;
    kecamatan?: string;
    level?: number;
  };

  // Level boleh tidak dikirim sama sekali — artinya "jangan diubah".
  const levelBaru =
    typeof d.level === "number" ? d.level : user.userlevelId;

  if (!(levelBaru in NAMA_PERAN)) {
    return fail(["Info: Level akun tidak valid"], 422);
  }

  if (levelBaru !== user.userlevelId) {
    if (levelBaru === LEVEL_ADMIN) {
      return fail(
        [
          "Info: Level Super Admin tidak dapat diberikan dari sini — lewat server (seeder/skrip)",
        ],
        403,
      );
    }
    if (!isAdmin(session.level)) {
      return fail(["Info: Hanya Super Admin yang dapat mengubah level akun"], 403);
    }
    /*
     * 🔴 Tidak boleh mengubah level DIRI SENDIRI. Bukan soal kepercayaan:
     * Super Admin yang salah pilih menurunkan dirinya sendiri, lalu kehilangan
     * halaman ini — dan tidak ada seorang pun yang tersisa untuk
     * mengembalikannya kecuali lewat server.
     */
    if (user.id === session.uid) {
      return fail(["Info: Level akun sendiri tidak dapat diubah dari sini"], 403);
    }
  }

  /*
   * Kecamatan TIDAK BOLEH DIKOSONGKAN bila sudah terisi — wilayah permohonan
   * dibaca dari sana, dan mengosongkannya membuat permohonan akun itu hilang
   * dari seluruh rekap wilayah. Tapi akun lama yang memang belum pernah punya
   * tetap boleh disunting: menuntutnya di sini berarti petugas yang cuma ingin
   * memperbaiki satu huruf pada nama justru terhalang data yang bukan
   * urusannya.
   */
  const galat = periksaDataAkun(d, levelBaru, {
    wajibKecamatan: !!user.userKecamatan,
  });
  if (galat) return fail([galat], 422);

  const userIdBaru = (d.userId ?? "").trim();

  if (userIdBaru !== user.userId) {
    const bentrok = await prisma.user.count({
      where: { userId: userIdBaru, id: { not: uid } },
    });
    if (bentrok > 0) {
      return fail(["Info: NIK/Username sudah dipakai akun lain"], 422);
    }
  }

  try {
    const diperbarui = await prisma.user.update({
      where: { id: uid },
      data: {
        userId: userIdBaru,
        userlevelId: levelBaru,
        userFullname: (d.nama ?? "").trim(),
        // NIK untuk pemulihan sandi: warga memakai NIK login-nya sendiri,
        // OPD memakai NIK perwakilan instansi (kolom terpisah dari username).
        ...(levelBaru === LEVEL_OPD
          ? { userNik: (d.nik ?? "").trim() }
          : /^\d{16}$/.test(userIdBaru)
            ? // Warga: NIK login-nya sendiri, selalu ikut diperbarui.
              { userNik: userIdBaru }
            : d.nik !== undefined
              ? { userNik: d.nik.trim() || null }
              : {}),
        /*
         * 🔴 KOLOM YANG TIDAK DIKIRIM TIDAK DISENTUH.
         *
         * Sebelumnya `(d.kk ?? "").trim() || null` memperlakukan "tidak dikirim"
         * sama dengan "dikosongkan" — satu permintaan yang hanya memuat nama
         * ikut menghapus nomor KK, telepon, dan surel akun itu. Terbukti
         * terjadi saat menguji endpoint ini: tiga kolom Budi Warga hilang
         * tanpa satu pun galat, dan hilangnya baru ketahuan karena kebetulan
         * diperiksa.
         *
         * Sekarang tegas: field ABSEN artinya "jangan diubah", string KOSONG
         * artinya "kosongkan". Formulir mengirim seluruhnya, jadi perilakunya
         * tidak berubah bagi pemakai — yang berubah adalah apa yang terjadi
         * kalau suatu saat ada pemanggil yang mengirim sebagian.
         */
        ...(d.kk !== undefined ? { userNokk: d.kk.trim() || null } : {}),
        ...(d.hp !== undefined ? { userHp: d.hp.trim() || null } : {}),
        ...(d.email !== undefined ? { userEmail: d.email.trim() || null } : {}),
        // Nilai kosong tidak menimpa kecamatan yang sudah ada — lihat catatan
        // di atas soal rekap wilayah.
        ...((d.kecamatan ?? "").trim()
          ? { userKecamatan: (d.kecamatan ?? "").trim() }
          : {}),
        updatedBy: session.uid,
      },
      select: { id: true, userId: true, userFullname: true },
    });

    await catatAktivitas(
      session,
      "UBAH",
      "Akun",
      `Menyunting akun ${diperbarui.userFullname ?? diperbarui.userId} (${diperbarui.userId})`,
      { entitasId: diperbarui.id, req },
    );

    return ok({ id: diperbarui.id }, ["Info: Akun berhasil diperbarui"]);
  } catch {
    return fail(["Info: Gagal memperbarui akun"], 500);
  }
}
