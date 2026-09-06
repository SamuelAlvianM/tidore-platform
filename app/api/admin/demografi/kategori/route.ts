import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ok, fail } from "@/lib/api-response";
import { getSession } from "@/lib/auth";
import { isPetugas } from "@/lib/akun-level";
import { catatAktivitas } from "@/lib/log-aktivitas";
import {
  DEMOGRAFI_KATEGORI,
  DEMOGRAFI_KATEGORI_KUNCI,
  DEMOGRAFI_SLUGS,
  slugKategori,
} from "@/lib/demografi-kategori";
import { bacaRegistri, tulisRegistri } from "@/lib/demografi-registri";

export const dynamic = "force-dynamic";

/** Batas jumlah kategori kustom — daftar yang tak terbatas jadi tak terpakai. */
const MAKS_KUSTOM = 24;

/**
 * Kategori data demografi: daftar, tambah, atur tampil di halaman utama, hapus.
 *
 * GET    → seluruh kategori + penanda bawaan/kustom + tampil-di-beranda
 * POST   → { judul } tambah kategori buatan dinas
 * PUT    → { beranda: string[] } atur mana yang tampil di halaman utama
 * DELETE → ?slug= hapus kategori kustom (ditolak bila masih berisi data)
 */
export async function GET() {
  const session = await getSession();
  if (!session || !isPetugas(session.level)) return fail(["Tidak diizinkan"], 403);

  const { kustom, beranda } = await bacaRegistri();
  const semua = [...DEMOGRAFI_KATEGORI, ...kustom];
  const tampil = beranda === null ? null : new Set(beranda);

  return ok({
    kategori: semua.map((k) => ({
      ...k,
      bawaan: DEMOGRAFI_SLUGS.has(k.slug),
      beranda: tampil === null ? true : tampil.has(k.slug),
    })),
  });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session || session.level !== 1) return fail(["Tidak diizinkan"], 403);

  const body = await req.json().catch(() => ({}));
  const judul = String((body as { judul?: unknown }).judul ?? "").trim();
  if (judul.length < 3) return fail(["Nama kategori minimal 3 huruf"]);
  if (judul.length > 60) return fail(["Nama kategori maksimal 60 huruf"]);

  const slug = slugKategori(judul);
  if (!slug) return fail(["Nama kategori harus mengandung huruf atau angka"]);

  const registri = await bacaRegistri();
  if (registri.kustom.length >= MAKS_KUSTOM) {
    return fail([`Kategori kustom sudah mencapai batas ${MAKS_KUSTOM}`]);
  }
  /*
   * ⚠️ Slug kembar DITOLAK, tidak diberi akhiran angka diam-diam.
   *
   * Kolom `kategori` di basis data cuma teks; dua kategori berslug sama akan
   * berbagi baris yang sama tanpa ada yang menyadarinya — impor yang satu
   * menghapus data yang lain. Dan "Pekerjaan-2" yang muncul sendiri di layar
   * hanya membuat petugas mengira ia salah pencet.
   */
  if (DEMOGRAFI_SLUGS.has(slug) || registri.kustom.some((k) => k.slug === slug)) {
    return fail([`Kategori "${judul}" sudah ada`]);
  }

  const baru = { slug, label: judul, fileHint: "dibuat dinas" };
  registri.kustom = [...registri.kustom, baru];
  /* Kategori baru ikut tampil di halaman utama bila daftar tampilnya sudah
     pernah diatur — kalau tidak, ia lahir tersembunyi tanpa ada yang meminta. */
  if (registri.beranda !== null) registri.beranda = [...registri.beranda, slug];

  await tulisRegistri(registri, session.uid);
  await catatAktivitas(
    session,
    "BUAT",
    "Demografi",
    `Menambah kategori demografi "${judul}" (${slug})`,
    { entitasId: slug, req },
  );

  return ok({ kategori: baru }, [`Kategori "${judul}" dibuat`]);
}

export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session || session.level !== 1) return fail(["Tidak diizinkan"], 403);

  const body = await req.json().catch(() => ({}));
  const raw = (body as { beranda?: unknown }).beranda;
  if (!Array.isArray(raw)) return fail(["Data tidak valid"]);

  const registri = await bacaRegistri();
  const dikenal = new Set([
    ...DEMOGRAFI_SLUGS,
    ...registri.kustom.map((k) => k.slug),
  ]);
  // Hanya simpan slug yang dikenal → cegah data sampah menumpuk di registri.
  registri.beranda = [
    ...new Set(raw.filter((s): s is string => typeof s === "string" && dikenal.has(s))),
  ];

  await tulisRegistri(registri, session.uid);
  await catatAktivitas(
    session,
    "UBAH",
    "Demografi",
    `Mengatur kategori tampil di halaman utama (${registri.beranda.length} dari ${dikenal.size})`,
    { entitasId: DEMOGRAFI_KATEGORI_KUNCI, req },
  );

  return ok({ beranda: registri.beranda }, ["Tampilan halaman utama disimpan"]);
}

export async function DELETE(req: NextRequest) {
  const session = await getSession();
  if (!session || session.level !== 1) return fail(["Tidak diizinkan"], 403);

  const slug = (new URL(req.url).searchParams.get("slug") ?? "").trim();
  if (!slug) return fail(["Kategori tidak disebut"]);
  if (DEMOGRAFI_SLUGS.has(slug)) {
    return fail(["Kategori bawaan DKB tidak dapat dihapus"]);
  }

  const registri = await bacaRegistri();
  const ada = registri.kustom.find((k) => k.slug === slug);
  if (!ada) return fail(["Kategori tidak dikenal"]);

  /*
   * 🔴 DITOLAK selama masih ada barisnya.
   *
   * Menghapus kategori dari registri tidak menghapus datanya — barisnya tetap
   * duduk di `m_demografi_wilayah` dengan slug yang tidak lagi dikenal siapa
   * pun: tidak muncul di layar, tidak bisa diekspor, tidak bisa dihapus lewat
   * antarmuka. Petugas diminta menghapus datanya lebih dulu, lewat tombol
   * Hapus pada periodenya, supaya keputusan itu sadar dan terlihat.
   */
  const baris = await prisma.demografiWilayah.count({ where: { kategori: slug } });
  if (baris > 0) {
    return fail([
      `Kategori "${ada.label}" masih berisi ${baris} baris. Hapus datanya dulu lewat tombol Hapus pada periodenya.`,
    ]);
  }

  registri.kustom = registri.kustom.filter((k) => k.slug !== slug);
  if (registri.beranda !== null) {
    registri.beranda = registri.beranda.filter((s) => s !== slug);
  }

  await tulisRegistri(registri, session.uid);
  await catatAktivitas(
    session,
    "HAPUS",
    "Demografi",
    `Menghapus kategori demografi "${ada.label}" (${slug})`,
    { entitasId: slug, req },
  );

  return ok({ slug }, [`Kategori "${ada.label}" dihapus`]);
}
