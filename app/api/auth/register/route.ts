import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { ok, fail } from "@/lib/api-response";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { sendMail } from "@/lib/mail";
import { tplRegistrasiDiterima } from "@/lib/mail-templates";
import { cekBukti, normalisasiHp, otpWajib } from "@/lib/otp";
import { notifyPetugas, safeNotify } from "@/lib/notifikasi";
import { simpanFotoKtp, simpanFotoProfil } from "@/lib/foto-profil";
import { waRegistrasiDiterima } from "@/lib/notifikasi-wa";
import { STATUS_AKUN } from "@/lib/akun-status";

/**
 * Registrasi warga — port dari RegisterController@postDatas (Laravel data-2).
 * Aturan dipertahankan: NIK 16 digit, password >= 6 karakter & tidak semua angka,
 * konfirmasi password cocok, cek NIK/email yang sudah aktif.
 * Perbedaan keamanan: TIDAK menyimpan password plaintext (passwordnote dibuang).
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const {
    nama,
    nik,
    kk,
    hp,
    email,
    pass,
    pass2,
    kecamatan,
    foto,
    ktp,
    recaptchaToken,
    otpBukti,
  } = body as Record<string, string>;

  if (!(await verifyRecaptcha(recaptchaToken))) {
    return fail(["Info: Verifikasi reCAPTCHA gagal, harap dicoba kembali (N-00)"]);
  }

  // Validasi wajib
  if (!nama || !nik || !kk || !hp || !email || !pass || !pass2) {
    return fail(["Info: Semua field wajib diisi (N-10)"]);
  }
  if (String(nik).length !== 16) {
    return fail(["Info: NIK Harus 16 Digit (N-15)"]);
  }
  if (!kecamatan?.trim()) {
    return fail(["Info: Kecamatan domisili wajib dipilih (N-17)"]);
  }
  if (!foto?.trim()) {
    return fail(["Info: Foto wajah/selfie wajib dilampirkan (N-18)"]);
  }
  if (!ktp?.trim()) {
    return fail(["Info: Foto KTP wajib diunggah (N-19)"]);
  }
  if (/^\d+$/.test(pass)) {
    return fail(["Info: Password Tidak Boleh Angka Semua (N-07)"]);
  }
  if (pass.length < 6) {
    return fail(["Info: Password Minimal 6 Karakter (N-08)"]);
  }
  if (pass !== pass2) {
    return fail(["Info: Password Konfirmasi Tidak Sama (N-09)"]);
  }

  // Nomor WhatsApp wajib lolos OTP (kecuali layanan OTP belum dikonfigurasi
  // di production — lihat lib/otp.ts otpWajib()).
  if (otpWajib()) {
    const hpNormal = normalisasiHp(hp);
    if (!hpNormal || !cekBukti(hpNormal, otpBukti ?? "")) {
      return fail(["Info: Nomor WhatsApp belum diverifikasi OTP (N-16)"]);
    }
  }

  try {
    // Akun dengan NIK ini sudah ada? Perlakuannya bergantung status:
    // - aktif (1)    → sudah punya akun, arahkan login.
    // - menunggu (0) → sedang diverifikasi, jangan buat duplikat.
    // - nonaktif (3) → diblokir petugas, arahkan hubungi Staff (via cek-status).
    // - ditolak (2)  → boleh DAFTAR ULANG: perbarui data record yang sama & set
    //                  kembali MENUNGGU. Inilah jalur "perbaiki data lalu ajukan
    //                  ulang" — warga harus mengubah datanya, bukan sekali klik.
    const existing = await prisma.user.findFirst({
      where: { userId: nik },
      orderBy: { id: "desc" },
      select: { id: true, status: true },
    });
    if (existing) {
      if (existing.status === STATUS_AKUN.AKTIF) {
        return fail([
          "Info: NIK sudah terdaftar dan aktif. Silahkan Login (N-03)",
        ]);
      }
      if (existing.status !== STATUS_AKUN.DITOLAK) {
        // Menunggu / nonaktif → belum boleh daftar ulang; arahkan ke halaman
        // Cek Status Pendaftaran (di sana terlihat status & langkah lanjutan).
        return ok({ redirect: "cek-status", nik }, [
          "Info: NIK ini sudah pernah didaftarkan. Kami arahkan ke halaman status pendaftaran.",
        ]);
      }
    }

    const aktifByEmail = await prisma.user.count({
      where: {
        userEmail: email,
        status: STATUS_AKUN.AKTIF,
        ...(existing ? { NOT: { id: existing.id } } : {}),
      },
    });
    if (aktifByEmail > 0) {
      return fail([
        "Info: Alamat Email sudah terdaftar, Gunakan Email yg Berbeda atau Silahkan Login (N-15)",
      ]);
    }

    const activationCode = String(Math.floor(1000 + Math.random() * 9000));
    const hashpass = await bcrypt.hash(pass, 10);
    const activationCodeUrl = await bcrypt.hash(nik + Date.now(), 10);

    const dataAkun = {
      userId: nik,
      password: hashpass,
      userlevelId: 3,
      userFullname: nama,
      userNik: nik,
      userNokk: kk,
      userHp: hp,
      userEmail: email,
      userKecamatan: kecamatan.trim(),
      activationCode,
      activationCodeUrl,
      ipAddress: req.headers.get("x-forwarded-for") ?? "",
      status: 0,
    };

    // NIK yang DITOLAK → perbarui record yang sama (daftar ulang) & bersihkan
    // sisa penolakan; selain itu buat akun baru.
    const userBaru = existing
      ? await prisma.user.update({
          where: { id: existing.id },
          data: {
            ...dataAkun,
            status: STATUS_AKUN.MENUNGGU,
            ket: null,
            activationTime: null,
            updatedBy: 3,
          },
        })
      : await prisma.user.create({
          data: { ...dataAkun, createdBy: 3 },
        });

    // Foto baru bisa disimpan setelah akun ada — nama berkasnya diawali id
    // pemilik, dan itulah dasar kontrol akses di app/uploads/[...path].
    const urlFoto = await simpanFotoProfil(foto, userBaru.id);
    const urlKtp = await simpanFotoKtp(ktp, userBaru.id);
    if (urlFoto || urlKtp) {
      await prisma.user.update({
        where: { id: userBaru.id },
        data: {
          ...(urlFoto ? { userFoto: urlFoto } : {}),
          ...(urlKtp ? { userKtp: urlKtp } : {}),
        },
      });
    }

    // Email konfirmasi — kegagalan kirim tidak menggagalkan pendaftaran.
    const konfirmasi = tplRegistrasiDiterima(nama);
    await sendMail({ to: email, ...konfirmasi });

    // Notifikasi ke petugas: pendaftaran baru, atau pengajuan ulang setelah
    // ditolak (datanya sudah diperbaiki) yang perlu ditinjau kembali.
    await safeNotify(() =>
      notifyPetugas({
        tipe: "AKUN_BARU",
        judul: existing ? "Pengajuan ulang pendaftaran" : "Pendaftaran akun baru",
        isi: existing
          ? `${nama} (NIK ${nik}) memperbaiki data & mengajukan ulang pendaftaran — mohon ditinjau kembali.`
          : `${nama} (NIK ${nik}) mendaftar dan menunggu aktivasi akun.`,
        link: "/dashboard/users",
        refType: "User",
        refId: userBaru.id,
      }),
    );

    // Konfirmasi WhatsApp (Fonnte) — pendaftaran diterima & masuk verifikasi.
    // Tahan-gagal: token kosong / nomor invalid tidak menggagalkan pendaftaran.
    await waRegistrasiDiterima(hp, nama, nik);

    return ok(
      { nik, email, hp, ulang: !!existing },
      [
        existing
          ? "Info: Pendaftaran ulang terkirim. Data Anda diperbarui dan kembali menunggu verifikasi petugas."
          : "Info: Permohonan akun Anda sedang diproses dan menunggu verifikasi/aktivasi",
      ]
    );
  } catch {
    return fail(["Info: Data tidak berhasil disimpan (N-02)"], 500);
  }
}
