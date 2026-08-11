import { prisma } from "@/lib/prisma";
import { ok, fail } from "@/lib/api-response";
import { getSession } from "@/lib/auth";
import { SKM_UNSUR, SKM_SKALA_MAX, nilaiPerUnsur, hitungIkm } from "@/lib/skm";

/** Rekap Survei Kepuasan Masyarakat (admin/operator). */
export async function GET() {
  const session = await getSession();
  if (!session || session.level > 2) return fail(["Akses ditolak"], 403);

  const rows = await prisma.skmJawaban.findMany({ orderBy: { createdAt: "desc" } });
  const totalResponden = rows.length;

  /**
   * Satu bentuk jawaban untuk semua: kunci `u0`–`u8`, skala 1–4 — sama antara
   * 107 responden warisan dan kiriman formulir portal (lihat `lib/skm.ts`).
   *
   * 🔴 Dua kesalahan yang pernah ada di sini, jangan diulang:
   *  1. rekap hanya membaca kunci `"0".."5"` sehingga **seluruh** data warisan
   *     tidak terhitung — dashboard menampilkan "107 responden" dengan
   *     IKM 0,00 & mutu D. Angka yang salah, bukan sekadar kosong;
   *  2. IKM dihitung `(rata / 5) × 100` padahal skala SKM adalah **1–4** dan
   *     rumus Permenpan RB 14/2017 adalah **NRR × 25** = `(rata / 4) × 100`.
   *     Membagi dengan 5 menyeret nilainya turun ± 20 poin — cukup untuk
   *     memindahkan mutu dari A ke C.
   */
  const perUnsur = rows.map((r) =>
    nilaiPerUnsur((r.jawaban ?? {}) as Record<string, unknown>),
  );

  // Rata-rata per unsur (NRR). Unsur yang tak dijawab dilewati, bukan dihitung 0.
  const rataPerAspek = SKM_UNSUR.map((u, i) => {
    const nilai = perUnsur.map((n) => n[i]).filter((v): v is number => v !== null);
    return {
      aspek: u.judul,
      pertanyaan: u.pertanyaan,
      rata: nilai.length
        ? Number((nilai.reduce((a, b) => a + b, 0) / nilai.length).toFixed(2))
        : 0,
      jumlahJawaban: nilai.length,
    };
  });

  // Responden yang menjawab setidaknya satu unsur — dasar rata-rata keseluruhan.
  const rataTiapResponden = perUnsur
    .map((n) => n.filter((v): v is number => v !== null))
    .filter((v) => v.length > 0)
    .map((v) => v.reduce((a, b) => a + b, 0) / v.length);

  const rataKeseluruhan = rataTiapResponden.length
    ? rataTiapResponden.reduce((a, b) => a + b, 0) / rataTiapResponden.length
    : 0;
  const nilaiIKM = hitungIkm(rataKeseluruhan);

  const respondenTerbaru = rows.slice(0, 15).map((r, idxAll) => {
    const vals = perUnsur[idxAll].filter((v): v is number => v !== null);
    const rata = vals.length
      ? Number((vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2))
      : 0;
    return {
      id: r.id,
      nama: r.nama ?? "Anonim",
      layanan: r.layanan,
      rataSkor: rata,
      saran: r.saran,
      usulanLayanan: r.usulanLayanan,
      masukanLayanan: r.masukanLayanan,
      createdAt: r.createdAt,
    };
  });

  return ok({
    totalResponden,
    respondenMenjawab: rataTiapResponden.length,
    rataPerAspek,
    rataKeseluruhan: Number(rataKeseluruhan.toFixed(2)),
    nilaiIKM,
    skalaMax: SKM_SKALA_MAX,
    respondenTerbaru,
  });
}
