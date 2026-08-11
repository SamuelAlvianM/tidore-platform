import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ok, fail } from "@/lib/api-response";
import { SKM_UNSUR, SKM_SKALA_MAX, nilaiPerUnsur } from "@/lib/skm";
import { notifyPetugas, safeNotify } from "@/lib/notifikasi";

/** Simpan jawaban Survei Kepuasan Masyarakat (publik). */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const {
    nama,
    layanan,
    jenisKel,
    umur,
    pendidikan,
    pekerjaan,
    hp,
    email,
    jawaban,
    saran,
    masukanLayanan,
    usulanLayanan,
  } = body as {
    nama?: string;
    layanan?: string;
    jenisKel?: string;
    umur?: number;
    pendidikan?: string;
    pekerjaan?: string;
    hp?: string;
    email?: string;
    jawaban?: Record<string, number>;
    saran?: string;
    masukanLayanan?: { layanan?: string; aspek?: string; saran?: string }[];
    usulanLayanan?: string;
  };

  if (!nama?.trim()) return fail(["Info: Nama wajib diisi"]);
  if (!layanan?.trim()) return fail(["Info: Layanan yang diurus wajib dipilih"]);
  if (!jawaban || typeof jawaban !== "object") {
    return fail(["Info: Jawaban tidak valid"]);
  }
  // Semua 9 unsur wajib dinilai 1–SKM_SKALA_MAX. `nilaiPerUnsur` menerima
  // kunci "u0".."u8" (bentuk resmi) maupun "0".."8", dan mengembalikan null
  // untuk yang kosong/di luar rentang.
  const nilai = nilaiPerUnsur(jawaban as Record<string, unknown>);
  const kurang = nilai
    .map((v, i) => (v === null ? SKM_UNSUR[i].nomor : null))
    .filter((n): n is number => n !== null);
  if (kurang.length) {
    return fail([
      `Info: Mohon nilai semua unsur pelayanan (1-${SKM_SKALA_MAX}). Belum dinilai: unsur ${kurang.join(", ")}`,
    ]);
  }

  // Simpan dalam bentuk resmi berkunci u0..u8 — sama dengan data warisan,
  // supaya rekap tidak perlu mengenali dua bentuk.
  const jawabanRapi: Record<string, number> = {};
  SKM_UNSUR.forEach((u, i) => {
    jawabanRapi[u.kunci] = nilai[i] as number;
  });

  // Demografi opsional, tapi kalau diisi harus masuk akal — kolom `umur` di
  // data migrasi sempat berisi 300, dan angka seperti itu merusak rekap.
  if (umur != null && (!Number.isInteger(umur) || umur < 10 || umur > 100)) {
    return fail(["Info: Umur harus antara 10 dan 100 tahun"]);
  }
  // "L"/"P" ditulis eksplisit untuk data BARU. Data migrasi memakai kode
  // angka lama ("0"/"1") yang artinya tidak terdokumentasi di mana pun —
  // sengaja tidak ditebak, dan tidak dicampur ke nilai baru.
  if (jenisKel && jenisKel !== "L" && jenisKel !== "P") {
    return fail(["Info: Jenis kelamin tidak valid"]);
  }

  // Masukan per layanan: hanya baris yang benar-benar berisi, dan dipangkas
  // supaya kiriman jahil tak bisa menitipkan teks panjang/field asing.
  const masukanRapi = (Array.isArray(masukanLayanan) ? masukanLayanan : [])
    .map((m) => ({
      layanan: String(m?.layanan ?? "").slice(0, 80),
      aspek: String(m?.aspek ?? "").slice(0, 80),
      saran: String(m?.saran ?? "").trim().slice(0, 1000),
    }))
    .filter((m) => m.layanan || m.aspek || m.saran)
    .slice(0, 15); // sebanyak-banyaknya jenis layanan yang ada

  const jawabanBaru = await prisma.skmJawaban.create({
    data: {
      nama: nama.trim(),
      layanan: layanan.trim(),
      jenisKel: jenisKel || null,
      umur: typeof umur === "number" ? umur : null,
      pendidikan: pendidikan || null,
      pekerjaan: pekerjaan || null,
      hp: hp?.trim() || null,
      email: email?.trim() || null,
      jawaban: jawabanRapi,
      saran: saran?.trim() || null,
      masukanLayanan: masukanRapi.length ? masukanRapi : undefined,
      usulanLayanan: usulanLayanan?.trim() || null,
    },
  });

  // Notifikasi ke petugas: ada responden survei kepuasan baru.
  await safeNotify(() =>
    notifyPetugas({
      tipe: "SKM_BARU",
      judul: "Responden SKM baru",
      isi: `${nama.trim()} mengisi Survei Kepuasan Masyarakat${saran?.trim() ? ` — saran: "${saran.trim().slice(0, 120)}"` : ""}.`,
      link: "/dashboard/skm",
      refType: "SkmJawaban",
      refId: jawabanBaru.id,
    }),
  );

  return ok(null, ["Info: Terima kasih, survei Anda berhasil dikirim"]);
}
