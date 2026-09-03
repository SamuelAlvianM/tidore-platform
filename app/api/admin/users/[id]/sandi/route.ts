import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { ok, fail } from "@/lib/api-response";
import { getSession } from "@/lib/auth";
import { catatAktivitas } from "@/lib/log-aktivitas";
import { isAdmin, isPetugas } from "@/lib/akun-level";
import { periksaSandi } from "@/lib/validasi-akun";

export const dynamic = "force-dynamic";

/**
 * Setel ulang sandi akun oleh petugas dinas.
 *
 * 🔴 KENAPA PERLU. Pemulihan sandi mandiri berjalan lewat surel dan WhatsApp.
 * Warga yang mendaftar dengan surel yang salah ketik, atau yang nomornya sudah
 * berganti, tidak punya jalan sama sekali untuk masuk kembali — dan akun itu
 * memuat seluruh riwayat permohonannya. Satu-satunya "solusi" sebelum ini
 * adalah membuat akun baru, yang meninggalkan akun lama menggantung dengan
 * NIK yang sama.
 *
 * ⚠️ MENYETEL SANDI AKUN PETUGAS = MENGAMBIL ALIH AKUN ITU. Aturannya sama
 * dengan penyuntingan: hanya Super Admin. Seorang Operator yang bisa menyetel
 * sandi Super Admin bukan lagi Operator.
 *
 * ⚠️ Sandi akun SENDIRI tidak diubah dari sini. Bukan sekadar kerapian: jalur
 * ini tidak meminta sandi lama, jadi memakainya untuk diri sendiri berarti
 * sesi yang tertinggal terbuka di komputer bersama bisa mengunci pemiliknya
 * keluar dari akunnya sendiri.
 */
export async function POST(
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

  if (uid === session.uid) {
    return fail(
      ["Info: Sandi akun sendiri diubah lewat Pengaturan Akun, bukan dari sini"],
      403,
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: uid },
    select: {
      id: true,
      userId: true,
      userFullname: true,
      userlevelId: true,
      password: true,
    },
  });
  if (!user) return fail(["Info: Akun tidak ditemukan"], 404);

  if (isPetugas(user.userlevelId) && !isAdmin(session.level)) {
    return fail(
      ["Info: Hanya Super Admin yang dapat menyetel sandi akun petugas"],
      403,
    );
  }

  const { password } = (await req.json().catch(() => ({}))) as {
    password?: string;
  };
  const sandi = String(password ?? "");

  const galat = periksaSandi(sandi);
  if (galat) return fail([galat], 422);

  if (await bcrypt.compare(sandi, user.password)) {
    return fail(
      ["Info: Password baru tidak boleh sama dengan password lama"],
      422,
    );
  }

  try {
    await prisma.user.update({
      where: { id: uid },
      data: {
        password: await bcrypt.hash(sandi, 10),
        /*
         * Kode pemulihan yang mungkin masih beredar dimatikan: sesudah sandinya
         * disetel petugas, tautan "lupa password" lama tidak boleh lagi bisa
         * dipakai mengubahnya kembali.
         */
        forgottenCode: null,
        forgottenTime: null,
        updatedBy: session.uid,
      },
    });

    // 🔴 Sandinya sendiri TIDAK pernah masuk log.
    await catatAktivitas(
      session,
      "UBAH",
      "Akun",
      `Menyetel ulang sandi akun ${user.userFullname ?? user.userId} (${user.userId})`,
      { entitasId: user.id, req },
    );

    return ok({ id: user.id }, [
      "Info: Sandi berhasil disetel — sampaikan ke pemilik akun",
    ]);
  } catch {
    return fail(["Info: Gagal menyetel sandi"], 500);
  }
}
