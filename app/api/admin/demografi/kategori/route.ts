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
  KATEGORI_TERKUNCI,
  slugKategori,
} from "@/lib/demografi-kategori";
import {
  bacaRegistri,
  daftarKategori,
  kategoriTampil,
  tulisRegistri,
} from "@/lib/demografi-registri";
import {
  KARTU_STATISTIK_KUNCI,
  MAKS_KARTU_BERANDA,
  normalizeKartu,
  selaraskanKartu,
} from "@/lib/beranda-statistik";

export const dynamic = "force-dynamic";

/** Batas jumlah kategori kustom — daftar yang tak terbatas jadi tak terpakai. */
const MAKS_KUSTOM = 24;

/**
 * Kategori data demografi: daftar, ganti nama, atur tampil di halaman utama.
 *
 * GET    → seluruh kategori + di mana ia benar-benar tampil + jumlah barisnya
 * PATCH  → { slug, judul } ganti NAMA TAMPILAN saja; slug tidak tersentuh
 * PUT    → { beranda: string[] } atur mana yang tampil di halaman utama
 * POST   → tambah kategori   } keduanya ditolak selama `KATEGORI_TERKUNCI`,
 * DELETE → hapus kategori    } lihat alasannya di lib/demografi-kategori.ts
 */

/** Balasan seragam saat daftar kategori sedang dikunci. */
function terkunci() {
  return fail(
    [
      "Daftar kategori dikunci. Kategori tidak dapat ditambah atau dihapus; "
      + "nama tampilannya masih bisa diubah lewat tombol Ganti Nama.",
    ],
    409,
  );
}
export async function GET() {
  const session = await getSession();
  if (!session || !isPetugas(session.level)) return fail(["Tidak diizinkan"], 403);

  const { beranda } = await bacaRegistri();
  const semua = await daftarKategori();
  const tampil = beranda === null ? null : new Set(beranda);

  /*
   * 🔴 Tiap kategori menyebut DI MANA ia benar-benar tampil, dan berapa
   * barisnya.
   *
   * Sebelumnya panel ini cuma berbunyi "8 tampil di halaman utama" — kalimat
   * yang tidak menyebut tampil di mana. Petugas membandingkannya dengan enam
   * kartu angka di beranda, menyimpulkan ada dua kategori yang hilang, lalu
   * hendak menghapus dua kategori yang sebetulnya berisi ribuan baris DKB.
   * Padahal keduanya hal yang berbeda: kategori mengisi TAB tabel demografi,
   * sedangkan kartu beranda konfigurasi tersendiri yang boleh menarik beberapa
   * angka dari kategori yang sama.
   *
   * Angka yang dikirim ke layar: `kartu` (berapa kartu beranda menarik dari
   * kategori ini) dan `baris` (seluruh periode). Keduanya yang membuat
   * pertanyaan "yang mana sebenarnya kosong" bisa dijawab dengan melihat,
   * bukan menebak.
   */
  const [hitungBaris, kartuRow] = await Promise.all([
    prisma.demografiWilayah.groupBy({ by: ["kategori"], _count: { _all: true } }),
    prisma.staticContent.findUnique({
      where: { kunci: KARTU_STATISTIK_KUNCI },
      select: { konten: true },
    }),
  ]);

  const barisPer = new Map(hitungBaris.map((r) => [r.kategori, r._count._all]));
  /*
   * 🔴 Dihitung dari hasil SELARAS, bukan dari konfigurasi mentah.
   *
   * Baris `beranda.statistik` masih boleh memuat sisa susunan lama — tiga
   * kartu berkategori `jenis-kelamin`, misalnya. Yang benar-benar tampil
   * di beranda adalah hasil `selaraskanKartu`, satu per kategori. Kalau
   * panel ini menghitung yang mentah, ia berkata "3 kartu beranda" untuk
   * kategori yang di beranda cuma punya satu — dan seluruh gunanya panel
   * ini adalah mengatakan apa yang SUNGGUH tampil.
   */
  const kartuPer = new Map<string, number>();
  for (const kartu of selaraskanKartu(
    normalizeKartu((kartuRow?.konten as { kartu?: unknown } | null)?.kartu),
    await kategoriTampil(),
  )) {
    if (kartu.kategori) kartuPer.set(kartu.kategori, (kartuPer.get(kartu.kategori) ?? 0) + 1);
  }

  return ok({
    terkunci: KATEGORI_TERKUNCI,
    kategori: semua.map((k) => ({
      ...k,
      bawaan: DEMOGRAFI_SLUGS.has(k.slug),
      beranda: tampil === null ? true : tampil.has(k.slug),
      kartu: kartuPer.get(k.slug) ?? 0,
      baris: barisPer.get(k.slug) ?? 0,
    })),
  });
}

/**
 * Ganti NAMA TAMPILAN satu kategori. Slug-nya tidak pernah ikut berubah.
 *
 * 🔴 Inilah satu-satunya cara mengubah daftar kategori sekarang, dan
 * sengaja dibuat begitu. Slug adalah nilai kolom `kategori` pada setiap baris
 * DKB yang sudah diimpor dan potongan URL publik `/media/demografi/<slug>`;
 * mengubahnya berarti seluruh data lama lepas dari kategorinya dalam satu klik.
 * Nama boleh salah ketik dan diperbaiki kapan saja — slug tidak.
 */
export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session || session.level !== 1) return fail(["Tidak diizinkan"], 403);

  const body = await req.json().catch(() => ({}));
  const slug = String((body as { slug?: unknown }).slug ?? "").trim();
  const judul = String((body as { judul?: unknown }).judul ?? "").trim();

  if (!slug) return fail(["Kategori tidak disebut"]);
  if (judul.length < 3) return fail(["Nama kategori minimal 3 huruf"]);
  if (judul.length > 60) return fail(["Nama kategori maksimal 60 huruf"]);

  const registri = await bacaRegistri();
  const dikenal = DEMOGRAFI_SLUGS.has(slug) || registri.kustom.some((k) => k.slug === slug);
  if (!dikenal) return fail(["Kategori tidak dikenal"]);

  const sekarang = (await daftarKategori()).find((k) => k.slug === slug);
  const label = { ...(registri.label ?? {}) };

  /*
   * Nama yang dikembalikan ke aslinya menghapus entrinya, bukan menyimpan
   * salinan yang kebetulan sama. Kalau tidak, label bawaan yang kelak
   * diperbaiki di kode akan kalah oleh salinan basi di basis data.
   */
  const asli = DEMOGRAFI_KATEGORI.find((k) => k.slug === slug)?.label
    ?? registri.kustom.find((k) => k.slug === slug)?.label;
  if (judul === asli) delete label[slug];
  else label[slug] = judul;

  registri.label = label;
  await tulisRegistri(registri, session.uid);
  await catatAktivitas(
    session,
    "UBAH",
    "Demografi",
    `Mengganti nama kategori "${sekarang?.label ?? slug}" menjadi "${judul}" (${slug})`,
    { entitasId: slug, req },
  );

  return ok({ slug, label: judul }, [`Nama kategori disimpan: "${judul}"`]);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session || session.level !== 1) return fail(["Tidak diizinkan"], 403);
  if (KATEGORI_TERKUNCI) return terkunci();

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
  const diminta = [
    ...new Set(raw.filter((s): s is string => typeof s === "string" && dikenal.has(s))),
  ];

  /*
   * 🔴 BATAS ENAM DITEGAKKAN DI SINI, bukan cuma di tombolnya.
   *
   * Beranda punya enam petak kartu dan tiap kategori berhak atas satu. Layar
   * yang menolak klik ketujuh sudah cukup untuk petugas, tapi tidak untuk
   * permintaan yang datang langsung ke alamat ini — dan kalau lolos, kartu
   * ketujuh muncul di beranda tanpa petak, merusak tata letaknya di ponsel.
   */
  /*
   * 🔴 MENYUSUT SELALU BOLEH, walau masih di atas batas.
   *
   * Portal yang sudah berjalan bisa punya delapan kategori menyala dari sebelum
   * aturan ini ada. Menolak setiap daftar yang panjangnya di atas enam akan
   * menolak juga usaha MEMATIKAN salah satunya — daftar 8 jadi 7 tetap di atas
   * enam — dan petugas terkunci pada keadaan yang justru diminta ia perbaiki,
   * tanpa satu pun jalan keluar di layar. Yang ditolak hanya yang MENAMBAH.
   */
  const sebelumnya = registri.beranda?.length ?? Number.MAX_SAFE_INTEGER;
  if (diminta.length > MAKS_KARTU_BERANDA && diminta.length >= sebelumnya) {
    return fail([
      `Paling banyak ${MAKS_KARTU_BERANDA} kategori yang boleh tampil di halaman utama. `
      + `Matikan salah satu dulu sebelum menyalakan yang lain.`,
    ]);
  }
  registri.beranda = diminta;

  await tulisRegistri(registri, session.uid);

  /*
   * 🔴 Kartu beranda IKUT DISELARASKAN, bukan dibiarkan sendiri.
   *
   * Sakelar ini menentukan kategori mana yang tampil; kalau kartunya tidak
   * ikut, mematikan sebuah kategori menyisakan kartunya menggantung di puncak
   * beranda (disaring /api/stats, tapi tetap tersimpan dan muncul lagi begitu
   * kategorinya dinyalakan kembali — dengan setelan lama yang membingungkan),
   * dan menyalakan kategori baru tidak memberinya kartu sama sekali.
   *
   * Sesudah ini jumlah kartu SELALU sama dengan jumlah kategori yang tampil.
   */
  await selaraskanKartuBeranda();
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
  if (KATEGORI_TERKUNCI) return terkunci();

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

/**
 * Tulis ulang `beranda.statistik` supaya persis satu kartu per kategori yang
 * tampil. Dipanggil setiap kali daftar tampil berubah.
 */
async function selaraskanKartuBeranda(): Promise<void> {
  const tampil = await kategoriTampil();
  const row = await prisma.staticContent.findUnique({
    where: { kunci: KARTU_STATISTIK_KUNCI },
    select: { konten: true },
  });
  /*
   * Kolom `konten` bertipe Json Prisma, yang menolak antarmuka bernama —
   * `KartuStatistik[]` tidak punya index signature. Disalin jadi objek biasa
   * supaya bentuk tersimpannya persis seperti yang dibaca `normalizeKartu`.
   */
  const kartu = selaraskanKartu(
    normalizeKartu((row?.konten as { kartu?: unknown } | null)?.kartu),
    tampil,
  ).map((k) => ({
    title: k.title,
    icon: k.icon,
    kategori: k.kategori,
    kolom: k.kolom,
    warna: k.warna,
    ...(k.badgeKolom ? { badgeKolom: k.badgeKolom } : {}),
  }));

  await prisma.staticContent.upsert({
    where: { kunci: KARTU_STATISTIK_KUNCI },
    create: {
      kunci: KARTU_STATISTIK_KUNCI,
      judul: "Kartu Statistik Beranda",
      konten: { kartu },
    },
    update: { konten: { kartu } },
  });
}
