import { prisma } from "@/lib/prisma";

/**
 * sitemap.xml — sebelumnya 404, jadi perayap tak pernah diberi daftar halaman.
 *
 * ⚠️ Ditulis sebagai route handler, BUKAN `app/sitemap.ts` bawaan Next.
 * Konvensi itu mendaftarkan rutenya sebagai `/sitemap`, dan portal ini SUDAH
 * punya halaman `/sitemap` versi HTML untuk manusia — Next menolak
 * menjalankannya ("Conflicting page and metadata at /sitemap") dan seluruh
 * situs balas 500. Route handler menempati `/sitemap.xml` saja, jadi keduanya
 * bisa hidup berdampingan.
 *
 * Dibuat saat diminta supaya berita yang terbit setelah deploy langsung ikut
 * terdaftar: build DAGA dijalankan di laptop dengan DB lokal, jadi sitemap yang
 * dibekukan saat build akan mengikuti data laptop, bukan produksi.
 */
export const dynamic = "force-dynamic";

const SITUS =
  process.env.NEXT_PUBLIC_APP_URL || "https://disdukcapil.tidorekota.go.id";

type Entri = { path: string; prioritas: number; ubah: string; diubah?: Date };

/** Halaman tetap yang layak muncul di hasil pencarian. */
const RUTE_TETAP: Entri[] = [
  { path: "/", prioritas: 1.0, ubah: "daily" },
  { path: "/produk/produk-disdukcapil", prioritas: 0.9, ubah: "monthly" },
  { path: "/produk/formulir-persyaratan", prioritas: 0.9, ubah: "monthly" },
  { path: "/produk/sop", prioritas: 0.7, ubah: "yearly" },
  { path: "/produk/hukum", prioritas: 0.7, ubah: "yearly" },
  { path: "/media/berita", prioritas: 0.8, ubah: "daily" },
  { path: "/galeri", prioritas: 0.6, ubah: "monthly" },
  { path: "/media/gis", prioritas: 0.6, ubah: "monthly" },
  { path: "/media/demografi", prioritas: 0.7, ubah: "monthly" },
  { path: "/cek-status", prioritas: 0.8, ubah: "yearly" },
  { path: "/hubungi-kami", prioritas: 0.7, ubah: "yearly" },
  { path: "/hubungi-kami/kritik-saran", prioritas: 0.5, ubah: "yearly" },
  { path: "/survei-kepuasan", prioritas: 0.5, ubah: "yearly" },
  { path: "/wbs/tentang-wbs", prioritas: 0.6, ubah: "yearly" },
  { path: "/wbs/form-pengaduan", prioritas: 0.6, ubah: "yearly" },
  { path: "/ppid/profil-ppid", prioritas: 0.6, ubah: "yearly" },
  { path: "/ppid/informasi-setiap-saat", prioritas: 0.6, ubah: "monthly" },
  { path: "/ppid/formulir-ppid", prioritas: 0.5, ubah: "yearly" },
  { path: "/ppid/register-ppid", prioritas: 0.4, ubah: "monthly" },
  { path: "/sitemap", prioritas: 0.3, ubah: "monthly" },
  { path: "/syarat", prioritas: 0.2, ubah: "yearly" },
  { path: "/privasi", prioritas: 0.2, ubah: "yearly" },
];

/** Judul berita bisa memuat &, <, dan kutip — semuanya haram di XML mentah. */
function amanXml(teks: string): string {
  return teks
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const sekarang = new Date();
  const entri: Entri[] = [...RUTE_TETAP];

  // Berita punya tanggal ubah yang nyata, jadi `lastmod`-nya jujur — itu yang
  // dipakai perayap untuk memutuskan perlu berkunjung lagi atau tidak.
  try {
    const rows = await prisma.news.findMany({
      where: { publish: true },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
      take: 1000,
    });
    for (const n of rows) {
      entri.push({
        path: `/media/berita/${n.slug}`,
        prioritas: 0.6,
        ubah: "monthly",
        diubah: n.updatedAt,
      });
    }
  } catch {
    // DB sedang tak terjangkau — menyajikan halaman tetap saja lebih baik
    // daripada 500 yang membuat perayap berhenti mencoba.
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entri
  .map(
    (e) => `  <url>
    <loc>${amanXml(SITUS + e.path)}</loc>
    <lastmod>${(e.diubah ?? sekarang).toISOString()}</lastmod>
    <changefreq>${e.ubah}</changefreq>
    <priority>${e.prioritas.toFixed(1)}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
