import { NextRequest } from "next/server";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { ok } from "@/lib/api-response";
import { statsKunjungan, tanggalHariIni } from "@/lib/kunjungan";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VID_COOKIE = "tidore_vid";

/**
 * Jendela satu "kunjungan" (sesi). Selama pengunjung masih aktif dalam rentang
 * ini, me-refresh atau pindah halaman TIDAK menambah hitungan — supaya angka
 * tidak bisa digelembungkan dengan sengaja menekan refresh berulang. Hitungan
 * baru bertambah hanya bila pengunjung kembali setelah tidak aktif lebih lama
 * dari jendela ini (dianggap kunjungan/sesi baru).
 */
const JENDELA_KUNJUNGAN_MS = 30 * 60_000; // 30 menit

/** Statistik pengunjung: { online, hariIni, total }. */
export async function GET() {
  return ok(await statsKunjungan());
}

/**
 * Ping kunjungan dari halaman publik (komponen KunjunganPing).
 * body { pv?: boolean } — pv=true (default) menambah hitungan tampilan
 * halaman; pv=false hanya menyegarkan status online.
 */
export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as { pv?: boolean };
  const pv = body.pv !== false;

  const store = await cookies();
  let vid = store.get(VID_COOKIE)?.value ?? "";
  if (!/^[0-9a-f-]{36}$/i.test(vid)) {
    vid = randomUUID();
    store.set(VID_COOKIE, vid, {
      httpOnly: true,
      sameSite: "lax",
      secure:
        process.env.NODE_ENV === "production" &&
        process.env.AUTH_COOKIE_SECURE !== "false",
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });
  }

  const now = new Date();
  const hariIni = tanggalHariIni();
  try {
    // Aktivitas terakhir pengunjung ini hari ini (untuk menilai sesi baru/lama).
    const sebelum = await prisma.kunjungan.findUnique({
      where: { visitorId_tanggal: { visitorId: vid, tanggal: hariIni } },
      select: { lastSeen: true },
    });

    // Tambah hitungan hanya bila memang tampilan halaman (pv) DAN ini kunjungan
    // baru: belum pernah tercatat hari ini, atau sudah tidak aktif melewati
    // jendela sesi. Refresh beruntun (lastSeen masih baru) → tidak menambah.
    const kunjunganBaru =
      pv &&
      (!sebelum ||
        now.getTime() - sebelum.lastSeen.getTime() > JENDELA_KUNJUNGAN_MS);

    await prisma.kunjungan.upsert({
      where: { visitorId_tanggal: { visitorId: vid, tanggal: hariIni } },
      create: { visitorId: vid, tanggal: hariIni, hits: pv ? 1 : 0, lastSeen: now },
      update: { lastSeen: now, ...(kunjunganBaru ? { hits: { increment: 1 } } : {}) },
    });
  } catch {
    /* pencatatan gagal tidak boleh mengganggu halaman */
  }

  return ok(null);
}
