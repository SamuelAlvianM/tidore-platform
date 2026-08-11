import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ok, fail } from "@/lib/api-response";
import bcrypt from "bcryptjs";
import { getSession } from "@/lib/auth";
import { sendMail } from "@/lib/mail";
import { tplAkunDisetujui, tplAkunDitolak } from "@/lib/mail-templates";
import { createNotifikasi, safeNotify } from "@/lib/notifikasi";
import { catatAktivitas } from "@/lib/log-aktivitas";
import { simpanFotoKtp, simpanFotoProfil } from "@/lib/foto-profil";
import { STATUS_AKUN } from "@/lib/akun-status";
import { susunAlasanTolak } from "@/lib/akun-tolak";
import { LEVEL_OPD, LEVEL_OPERATOR, LEVEL_STAFF, LEVEL_ADMIN, LEVEL_WARGA } from "@/lib/akun-level";

const NAMA_LEVEL: Record<number, string> = {
  [LEVEL_STAFF]: "Staff",
  [LEVEL_WARGA]: "Warga",
  [LEVEL_OPD]: "Operator OPD",
};

/** Pastikan pemanggil adalah operator/admin (level 1 atau 2). */
async function requireAdmin() {
  const session = await getSession();
  if (!session || session.level > 2) return null;
  return session;
}

/** Daftar user untuk panel admin (filter status, kelompok level & pencarian). */
export async function GET(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return fail(["Tidak diizinkan"], 403);

  const { searchParams } = new URL(req.url);
  const statusParam = searchParams.get("status"); // "0" | "1" | null
  const levelParam = searchParams.get("level");
  const q = searchParams.get("q")?.trim();

  // Kelompok akun (tab). 🔴 "all" WAJIB ada dan wajib jadi jaring pengaman:
  // `m_userlevels` hasil migrasi berisi level yang tidak dipakai UI —
  // 4 developer, 5 operator opd, dan 41 operator (40 akun). Dulu tab hanya
  // 3/4/staff sementara filter level SELALU dikirim, sehingga 40 akun level 41
  // tidak muncul di daftar mana pun DAN tidak bisa dicari (pencarian
  // selalu dibatasi kelompok yang sedang aktif). Kelompok baru boleh
  // ditambahkan di sini, tapi "all" tidak boleh dihapus.
  const KELOMPOK: Record<string, number[]> = {
    staff: [LEVEL_ADMIN, LEVEL_STAFF],
    [String(LEVEL_WARGA)]: [LEVEL_WARGA],
    // Kelompok OPD sengaja memuat 4 DAN 5: level 5 adalah yang benar, level 4
    // ikut supaya akun lama yang belum sempat dipindah tidak lenyap dari tab.
    opd: [LEVEL_OPD, 4],
    operator: [LEVEL_OPERATOR],
  };
  const levels = levelParam ? KELOMPOK[levelParam] : undefined;

  const where = {
    ...(["0", "1", "2", "3"].includes(statusParam ?? "")
      ? { status: Number(statusParam) }
      : {}),
    ...(levels ? { userlevelId: { in: levels } } : {}),
    ...(q
      ? {
          OR: [
            { userId: { contains: q } },
            { userFullname: { contains: q } },
            { userEmail: { contains: q } },
            { userNik: { contains: q } },
          ],
        }
      : {}),
  };

  // `total` dipakai UI untuk memberi tahu kalau daftar terpotong `take`.
  // Tanpa ini daftar diam-diam berhenti di batas dan terbaca seolah datanya
  // memang cuma segitu.
  const total = await prisma.user.count({ where });

  const items = await prisma.user.findMany({
    where,
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
      status: true,
      createdAt: true,
      level: { select: { nama: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 500,
  });

  return ok({ items, total });
}

/**
 * Buat akun baru oleh admin/operator.
 * Level yang bisa dibuat: 3 = Warga, LEVEL_OPD (5) = Operator OPD (instansi
 * pemerintah daerah). Level 2 (Operator dinas) hanya bisa dibuat Super Admin (level 1).
 * Akun langsung aktif karena dibuat petugas; email pemberitahuan dikirim
 * bila alamat email diisi.
 */
export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return fail(["Tidak diizinkan"], 403);

  const body = await req.json().catch(() => ({}));
  const { nama, userId, nik, kk, hp, email, level, password, kecamatan, foto, ktp } =
    body as {
      nama?: string;
      userId?: string; // NIK (warga) atau username (OPD/staff)
      nik?: string; // NIK perwakilan instansi (khusus OPD)
      kk?: string;
      hp?: string;
      email?: string;
      level?: number;
      password?: string;
      kecamatan?: string; // kecamatan domisili (khusus warga)
      foto?: string; // data URL selfie (opsional, khusus warga)
      ktp?: string; // data URL foto/scan KTP (opsional, khusus warga)
    };

  if (!nama?.trim() || !userId?.trim() || !password) {
    return fail(["Info: Nama, NIK/Username, dan password wajib diisi"]);
  }
  if (level !== 2 && level !== 3 && level !== LEVEL_OPD) {
    return fail(["Info: Level akun tidak valid"]);
  }
  if (level === 2 && session.level !== 1) {
    return fail(["Info: Hanya Super Admin yang dapat membuat akun Staff"], 403);
  }
  if (level === 3) {
    if (!/^\d{16}$/.test(userId)) {
      return fail(["Info: NIK warga harus 16 digit angka"]);
    }
    if (kk && !/^\d{16}$/.test(kk)) {
      return fail(["Info: Nomor Kartu Keluarga harus 16 digit angka"]);
    }
    // Sama seperti pendaftaran mandiri: kecamatan menentukan wilayah layanan.
    if (!kecamatan?.trim()) {
      return fail(["Info: Kecamatan domisili wajib dipilih untuk akun warga"]);
    }
  }
  // OPD login memakai USERNAME instansi (mis. rs.tidore); NIK perwakilan
  // disimpan terpisah untuk fitur lupa password.
  if (level === LEVEL_OPD) {
    if (!/^[a-z0-9][a-z0-9._-]{3,29}$/i.test(userId.trim())) {
      return fail([
        "Info: Username OPD 4-30 karakter (huruf/angka/titik/underscore/strip)",
      ]);
    }
    if (!/^\d{16}$/.test(nik ?? "")) {
      return fail(["Info: NIK perwakilan OPD harus 16 digit angka"]);
    }
  }
  if (level === 2 && userId.trim().length < 4) {
    return fail(["Info: Username minimal 4 karakter"]);
  }
  if (password.length < 6) {
    return fail(["Info: Password minimal 6 karakter"]);
  }

  try {
    const sudahAda = await prisma.user.count({
      where: { userId: userId.trim(), status: 1 },
    });
    if (sudahAda > 0) {
      return fail(["Info: NIK/Username sudah terdaftar dan aktif"]);
    }

    // Pastikan level Operator OPD ada (DB lama mungkin belum punya baris ini).
    await prisma.userLevel.upsert({
      where: { id: LEVEL_OPD },
      create: { id: LEVEL_OPD, nama: "Operator OPD" },
      update: {},
    });

    const hashpass = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        userId: userId.trim(),
        password: hashpass,
        userlevelId: level,
        userFullname: nama.trim(),
        // NIK untuk fitur lupa password: warga = NIK login-nya sendiri,
        // OPD = NIK perwakilan instansi (field terpisah dari username).
        userNik:
          level === LEVEL_OPD
            ? (nik ?? "").trim()
            : /^\d{16}$/.test(userId.trim())
              ? userId.trim()
              : null,
        userNokk: kk?.trim() || null,
        userHp: hp?.trim() || null,
        userEmail: email?.trim() || null,
        userKecamatan: level === 3 ? (kecamatan ?? "").trim() || null : null,
        status: 1, // dibuat petugas = langsung aktif
        activationTime: new Date(),
        createdBy: session.uid,
      },
    });

    // Foto wajah bersifat opsional di sini: warga belum tentu hadir saat
    // petugas membuatkan akunnya. Nama berkasnya diawali id pemilik — dasar
    // kontrol akses di app/uploads/[...path].
    if (foto || ktp) {
      const urlFoto = foto ? await simpanFotoProfil(foto, user.id) : null;
      const urlKtp = ktp ? await simpanFotoKtp(ktp, user.id) : null;
      if (urlFoto || urlKtp) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            ...(urlFoto ? { userFoto: urlFoto } : {}),
            ...(urlKtp ? { userKtp: urlKtp } : {}),
          },
        });
      }
    }

    if (user.userEmail) {
      const mail = tplAkunDisetujui(user.userFullname ?? user.userId);
      await sendMail({ to: user.userEmail, ...mail });
    }

    await catatAktivitas(
      session,
      "BUAT",
      "Akun",
      `Membuat akun ${user.userFullname ?? user.userId} (${NAMA_LEVEL[level] ?? `level ${level}`})`,
      { entitasId: user.id, req },
    );

    return ok({ id: user.id }, ["Info: Akun berhasil dibuat dan langsung aktif"]);
  } catch {
    return fail(["Info: Gagal membuat akun"], 500);
  }
}

/** Ubah status aktif/nonaktif user (aktivasi akun). */
export async function PATCH(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return fail(["Tidak diizinkan"], 403);

  const body = await req.json().catch(() => ({}));
  const { id, status, alasan, kolom } = body as {
    id?: number;
    status?: number;
    alasan?: string;
    /** Key kolom pendaftaran yang ditandai "tidak sesuai" (khusus penolakan). */
    kolom?: string[];
  };

  if (typeof id !== "number" || ![0, 1, 2, 3].includes(status as number)) {
    return fail(["Info: Parameter id/status tidak valid"]);
  }
  // Penolakan wajib disertai alasan — supaya warga tahu apa yang harus diperbaiki.
  if (status === STATUS_AKUN.DITOLAK && !alasan?.trim()) {
    return fail(["Info: Alasan penolakan wajib diisi"]);
  }

  // Penolakan → `ket` menggabungkan daftar kolom bermasalah + alasan (satu teks
  // human-readable). Status lain cukup menyimpan alasan apa adanya (opsional).
  const ketFinal =
    status === STATUS_AKUN.DITOLAK
      ? susunAlasanTolak(Array.isArray(kolom) ? kolom : [], (alasan ?? "").trim())
      : alasan?.trim() || undefined;

  try {
    const sebelum = await prisma.user.findUnique({
      where: { id },
      select: { status: true },
    });
    const user = await prisma.user.update({
      where: { id },
      data: {
        status,
        updatedBy: typeof session.uid === "number" ? session.uid : undefined,
        ...(status === STATUS_AKUN.AKTIF ? { activationTime: new Date() } : {}),
        ...(ketFinal ? { ket: ketFinal } : {}),
      },
    });

    // Email hanya saat status berubah: disetujui (aktif) atau ditolak (+alasan).
    // Menunggu & nonaktif tidak di-email — warga melihatnya saat login/cek status.
    if (user.userEmail && sebelum && sebelum.status !== status) {
      const nama = user.userFullname ?? user.userId;
      if (status === STATUS_AKUN.AKTIF) {
        await sendMail({ to: user.userEmail, ...tplAkunDisetujui(nama) });
      } else if (status === STATUS_AKUN.DITOLAK) {
        await sendMail({ to: user.userEmail, ...tplAkunDitolak(nama, ketFinal) });
      }
    }

    // Notifikasi in-app ke pemilik akun saat DIAKTIFKAN — terlihat begitu ia
    // login pertama kali. (Nonaktif tidak dinotifkan: pemiliknya tak bisa login.)
    if (status === 1 && sebelum && sebelum.status !== 1) {
      await safeNotify(() =>
        createNotifikasi({
          userId: user.id,
          tipe: "AKUN_STATUS",
          judul: "Akun Anda telah diaktifkan",
          isi: "Selamat datang! Akun Anda sudah aktif dan siap digunakan untuk mengajukan permohonan online.",
          link: "/user/pengajuan",
          refType: "User",
          refId: user.id,
        }),
      );
    }

    const AKSI: Record<number, string> = {
      [STATUS_AKUN.AKTIF]: "Mengaktifkan",
      [STATUS_AKUN.DITOLAK]: "Menolak",
      [STATUS_AKUN.NONAKTIF]: "Menonaktifkan",
      [STATUS_AKUN.MENUNGGU]: "Mengembalikan ke menunggu",
    };
    await catatAktivitas(
      session,
      "UBAH",
      "Akun",
      `${AKSI[status as number] ?? "Mengubah status"} akun ${user.userFullname ?? user.userId}`,
      { entitasId: user.id, req },
    );

    const PESAN: Record<number, string> = {
      [STATUS_AKUN.AKTIF]: "Info: Akun berhasil diaktifkan",
      [STATUS_AKUN.DITOLAK]: "Info: Akun ditolak, alasan dikirim ke pemohon",
      [STATUS_AKUN.NONAKTIF]: "Info: Akun dinonaktifkan",
      [STATUS_AKUN.MENUNGGU]: "Info: Akun dikembalikan ke status menunggu",
    };
    return ok(null, [PESAN[status as number] ?? "Info: Status akun diperbarui"]);
  } catch {
    return fail(["Info: Gagal memperbarui status user"], 500);
  }
}
