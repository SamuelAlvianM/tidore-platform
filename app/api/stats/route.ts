import { prisma } from "@/lib/prisma";
import { ok } from "@/lib/api-response";
import {
  KARTU_STATISTIK_KUNCI,
  normalizeKartu,
  resolveKolom,
  selaraskanKartu,
  warnaPreset,
} from "@/lib/beranda-statistik";
import { labelPeriodePanjang, periodeDariQuery } from "@/lib/periode-demografi";
import { periodeTersedia, pilihPeriode } from "@/lib/demografi-periode";
import { kategoriTampil } from "@/lib/demografi-registri";

const BULAN_PENDEK = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
];

/**
 * Statistik ringkas untuk beranda publik.
 * - Pelayanan: agregasi langsung dari tabel permohonan (real-time DB) —
 *   total, bulan ini, tren 6 bulan, dan layanan terpopuler.
 * - Kependudukan: rekap demografi (sumber DKB, placeholder di
 *   lib/demografi-data.ts sampai model rekap DB tersedia).
 */
export async function GET(req: Request) {
  const now = new Date();
  const startBulanIni = new Date(now.getFullYear(), now.getMonth(), 1);
  const start6Bulan = new Date(now.getFullYear(), now.getMonth() - 5, 1);

  // Konfigurasi kartu beranda (judul, ikon, warna, kategori + kolom sumber
  // data). Menentukan kategori demografi mana yang perlu diambil dari DB.
  const kartuRow = await prisma.staticContent.findUnique({
    where: { kunci: KARTU_STATISTIK_KUNCI },
    select: { konten: true },
  });
  const kartuSemua = normalizeKartu(
    (kartuRow?.konten as { kartu?: unknown } | null)?.kartu,
  );

  /*
   * 🔴 KARTU IKUT SAKELAR "TAMPIL DI HALAMAN UTAMA".
   *
   * Kartu statistik adalah benda PALING TERLIHAT di halaman utama, dan
   * masing-masing menarik angkanya dari satu kategori demografi. Tanpa
   * penyaringan ini, petugas mematikan kategori Jenis Kelamin, tab-nya lenyap
   * dari tabel di bawah — tapi "Jumlah Penduduk 121.952" tetap terpampang
   * besar di puncak halaman, karena kartu itu diam-diam menarik angkanya dari
   * kategori yang sama. Sakelarnya jadi berbohong tentang namanya sendiri.
   *
   * Kartu yang belum ditentukan sumbernya (tanpa `kategori`) dibiarkan: ia
   * tidak menampilkan angka siapa pun, jadi tidak ada yang perlu disembunyikan.
   */
  /*
   * 🔴 Diselaraskan lagi SAAT DIBACA, bukan cuma saat disimpan.
   *
   * Baris `beranda.statistik` bisa berubah dari jalur lain — editor kartu,
   * tombol "Reset Kartu Beranda", atau tangan yang menyunting basis data
   * langsung. Menyaring saja tidak cukup: dua kartu berkategori sama akan
   * lolos saringan dan beranda kembali menampilkan satu kategori dua kali.
   * Di sini bentuk akhirnya dipastikan — satu kartu per kategori yang tampil,
   * seurut daftarnya, paling banyak enam.
   */
  const tampil = await kategoriTampil();
  const kartuKonfig = selaraskanKartu(kartuSemua, tampil);

  const kategoriSet = [
    ...new Set(kartuKonfig.map((k) => k.kategori).filter(Boolean)),
  ];

  /*
   * Periode yang ditampilkan. Warga boleh memilih lewat `?tahun&semester`;
   * tanpa itu, periode TERBARU yang punya data.
   *
   * 🔴 Angkanya WAJIB disaring periode. Sejak tabel ini bisa menyimpan dua
   * semester berdampingan, kueri tanpa saringan menjumlahkan keduanya —
   * beranda akan mengumumkan penduduk dua kali lipat.
   */
  const dimintaPeriode = periodeDariQuery(new URL(req.url).searchParams);
  const daftarPeriode = await periodeTersedia();
  const periode = pilihPeriode(
    dimintaPeriode === false ? null : dimintaPeriode,
    daftarPeriode,
  );

  const [
    total,
    selesai,
    aktif,
    bulanIni,
    totalBerita,
    grouped,
    recent,
    demografiRows,
  ] = await Promise.all([
    prisma.permohonan.count(),
    prisma.permohonan.count({ where: { status: "SELESAI" } }),
    prisma.permohonan.count({ where: { status: { in: ["MENUNGGU", "DIPROSES"] } } }),
    prisma.permohonan.count({ where: { createdAt: { gte: startBulanIni } } }),
    prisma.news.count({ where: { publish: true } }),
    prisma.permohonan.groupBy({
      by: ["jenisId"],
      _count: { _all: true },
      orderBy: { _count: { jenisId: "desc" } },
      take: 4,
    }),
    prisma.permohonan.findMany({
      where: { createdAt: { gte: start6Bulan } },
      select: { createdAt: true },
    }),
    // Rekap demografi hasil import Excel untuk kategori yang dipakai kartu.
    // Angka per kategori dihitung dari data desa (level 5) bila ada — konsisten
    // dengan tabel publik yang menjumlahkan desa; fallback ke baris kecamatan.
    periode
      ? prisma.demografiWilayah.findMany({
          where: {
            tahun: periode.tahun,
            semester: periode.semester,
            // Tingkat 3 ikut diambil supaya kategori yang HANYA punya baris
            // kabupaten tetap terhitung — `rowsFor` yang memastikan hanya satu
            // tingkat yang dijumlahkan.
            level: { in: [3, 4, 5] },
            kategori: { in: kategoriSet.length ? kategoriSet : ["__none__"] },
          },
          select: { kategori: true, level: true, data: true },
        })
      : Promise.resolve([]),
  ]);

  // Nama jenis untuk layanan terpopuler.
  const jenisIds = grouped.map((g) => g.jenisId);
  const jenisList = jenisIds.length
    ? await prisma.jenisPermohonan.findMany({
        where: { id: { in: jenisIds } },
        select: { id: true, nama: true },
      })
    : [];
  const namaById = new Map(jenisList.map((j) => [j.id, j.nama]));
  const topJenis = grouped.map((g) => ({
    nama: namaById.get(g.jenisId) ?? "Lainnya",
    count: g._count._all,
  }));

  // Tren 6 bulan terakhir (bucket per bulan).
  const trend6 = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
    return { key: `${d.getFullYear()}-${d.getMonth()}`, label: BULAN_PENDEK[d.getMonth()], count: 0 };
  });
  const trendIndex = new Map(trend6.map((t, i) => [t.key, i]));
  for (const r of recent) {
    const d = new Date(r.createdAt);
    const idx = trendIndex.get(`${d.getFullYear()}-${d.getMonth()}`);
    if (idx !== undefined) trend6[idx].count += 1;
  }

  /*
   * 🔴 SATU TINGKAT SAJA, TIDAK PERNAH DICAMPUR.
   *
   * Cadangannya dulu berbunyi "kalau tidak ada desa, pakai SEMUA baris
   * kategori ini". Itu menjumlahkan tingkat yang berbeda ke dalam satu angka:
   * satu baris kabupaten yang nilainya sudah merupakan jumlah kecamatan,
   * ditambah kecamatan-kecamatannya sendiri, menghasilkan penduduk DUA KALI
   * LIPAT. Tidak ada galat, tidak ada tanda — cuma angka resmi yang salah di
   * halaman depan portal pemerintah.
   *
   * Desa dulu (paling rinci), lalu kecamatan, lalu kabupaten. Berhenti pada
   * tingkat pertama yang punya isi.
   */
  const rowsFor = (kat: string) => {
    for (const level of [5, 4, 3]) {
      const baris = demografiRows.filter((d) => d.kategori === kat && d.level === level);
      if (baris.length) return baris;
    }

    return [];
  };
  /*
   * 🔴 KOLOM YANG TIDAK ADA MENGEMBALIKAN `null`, BUKAN 0.
   *
   * Ini pembedaan yang paling penting di berkas ini. Sebelumnya kolom yang
   * tidak dikenali dibaca `Number(undefined) || 0` → nol, dan beranda
   * mencetaknya sebagai angka penduduk. Nol adalah PERNYATAAN: "kabupaten ini
   * punya 0 kepala keluarga". Yang benar adalah "belum ada datanya" — dan
   * keduanya tidak boleh terlihat sama.
   *
   * Terukur: di TIDORE tiga dari enam kartu beranda menampilkan 0 padahal
   * datanya ada, cuma nama kolomnya `Total`. Tidak ada galat di mana pun.
   */
  const sumCol = (kat: string, col: string): number | null => {
    const rows = rowsFor(kat);
    if (!rows.length) return null;

    const kunci = Object.keys((rows[0].data ?? {}) as Record<string, unknown>);
    const nyata = resolveKolom(kunci, col);
    if (!nyata) return null;

    return rows.reduce(
      (a, d) => a + (Number((d.data as Record<string, unknown>)?.[nyata]) || 0),
      0,
    );
  };

  // Nilai tiap kartu mengikuti kolom yang dipilih admin; badge = persentase
  // terhadap total kolom acuan (badgeKolom) bila diset.
  const kartuDemografi = kartuKonfig.map((k) => {
    const value = k.kategori && k.kolom ? sumCol(k.kategori, k.kolom) : null;
    const preset = warnaPreset(k.warna);
    let badge: string | undefined;
    if (k.badgeKolom && value !== null) {
      const base = sumCol(k.kategori, k.badgeKolom);
      badge = base && base > 0 ? `${Math.round((value / base) * 100)}%` : undefined;
    }
    return {
      title: k.title,
      icon: k.icon,
      kategori: k.kategori,
      /*
       * 🔴 Nama kategori dikirim dari SINI, bukan dicari ulang di peramban.
       *
       * Sejak dinas bisa mengganti nama kategori, `getDemografiKategori()` di
       * sisi klien membaca konstanta di kode dan mengembalikan nama LAMA —
       * sementara tab, judul sheet ekspor, dan panel dasbor sudah memakai nama
       * baru. Satu portal menyebut satu kategori dengan dua nama berbeda, dan
       * yang melihatnya tidak punya cara menebak mana yang benar.
       */
      kategoriLabel: tampil.find((t) => t.slug === k.kategori)?.label ?? k.kategori,
      kolom: k.kolom,
      accent: preset.accent,
      accentBg: preset.accentBg,
      badge,
      /** `null` = datanya belum ada. Beranda menampilkan "—", bukan 0. */
      value,
    };
  });

  return ok({
    // ── Pelayanan (live dari database) ──
    pelayanan: {
      total,
      selesai,
      aktif,
      bulanIni,
      topJenis,
      trend6: trend6.map(({ label, count }) => ({ label, count })),
    },
    totalBerita,

    // ── Kependudukan (demografi / DKB) — kartu dinamis sesuai konfigurasi ──
    kartuDemografi,
    /*
     * 🔴 Label ini DIHITUNG dari data, bukan diketik di konten statis.
     *
     * Sebelumnya `beranda.dkb-periode` sekadar tulisan bebas: badge bisa
     * berbunyi "Semester II 2024" sementara angka di bawahnya sudah berasal
     * dari semester lain, dan tak ada satu pun tanda di layar. Untuk angka
     * resmi kependudukan, keterangan periode yang keliru lebih berbahaya
     * daripada tidak ada keterangan sama sekali.
     */
    periodeKependudukan: periode
      ? labelPeriodePanjang(periode.tahun, periode.semester)
      : null,
    periode,
    periodeTersedia: daftarPeriode,
  });
}
