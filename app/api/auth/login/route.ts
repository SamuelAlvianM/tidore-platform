import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { ok, fail } from "@/lib/api-response";
import { createSession } from "@/lib/auth";
import { pesanLoginStatus } from "@/lib/akun-status";

/**
 * Login — port dari LoginController (Laravel data-2).
 * Identitas: user_id (NIK warga, atau USERNAME untuk OPD/staff).
 * Hanya akun status=1 (aktif) yang boleh masuk.
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { user_id, password } = body as Record<string, string>;

  // Username OPD sering tersalin dengan spasi berlebih dari catatan/WA —
  // normalisasi dulu supaya lookup tidak gagal karena whitespace.
  const identitas = (user_id ?? "").trim();

  if (!identitas || !password) {
    return fail(["Info: NIK/Username dan Password wajib diisi (L-01)"]);
  }

  try {
    const user = await prisma.user.findFirst({
      where: { userId: identitas },
      orderBy: { id: "desc" },
    });

    if (!user) return fail(["Info: NIK/Username belum terdaftar (L-02)"]);
    if (user.status !== 1) {
      // Pesan sesuai status (menunggu/ditolak/nonaktif) supaya warga tahu
      // langkah berikutnya — cek status pendaftaran / hubungi staff.
      // `data` membawa petunjuk agar halaman login memunculkan tombol menonjol
      // ke "Cek Status Pendaftaran" (khusus warga, karena berbasis NIK) beserta
      // NIK-nya, supaya warga tidak bingung menghadapi pesan gagal login.
      const warga = user.userlevelId === 3;
      return NextResponse.json(
        {
          error: [`Info: ${pesanLoginStatus(user.status)} (L-03)`],
          success: [],
          data: {
            cekStatus: warga,
            status: user.status,
            nik: warga ? user.userId : null,
          },
          html: [],
        },
        { status: 400 },
      );
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return fail(["Info: Password salah (L-04)"]);

    // Dibaca SEBELUM loginLast ditimpa di bawah: warga yang baru pertama kali
    // masuk dan belum punya foto diarahkan melengkapinya di Pengaturan Akun.
    // Sifatnya anjuran — halaman tujuan tetap bisa ditinggalkan.
    const lengkapiFoto =
      user.userlevelId === 3 && !user.userFoto && user.loginLast === null;

    await prisma.user.update({
      where: { id: user.id },
      data: { loginLast: new Date(), ipAddress: req.headers.get("x-forwarded-for") ?? "" },
    });

    await createSession({
      uid: user.id,
      userId: user.userId,
      nama: user.userFullname,
      level: user.userlevelId,
    });

    return ok(
      {
        user: {
          id: user.id,
          user_id: user.userId,
          name: user.userFullname,
          email: user.userEmail,
          level: user.userlevelId,
        },
        lengkapiFoto,
      },
      ["Info: Login berhasil"]
    );
  } catch {
    return fail(["Info: Terjadi kesalahan pada server (L-99)"], 500);
  }
}
