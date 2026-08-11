import type { MetadataRoute } from "next";

/**
 * robots.txt — sebelumnya TIDAK ADA sama sekali (404), sehingga perayap tidak
 * pernah diberi tahu mana yang boleh diindeks dan di mana sitemap-nya.
 *
 * Yang dilarang bukan soal rahasia (itu dijaga sesi di sisi server), melainkan
 * supaya halaman yang tidak berguna di hasil pencarian — area login petugas,
 * riwayat pribadi, berkas warga — tidak ikut terindeks dan tidak mengencerkan
 * halaman layanan yang justru dicari warga.
 */
const SITUS =
  process.env.NEXT_PUBLIC_APP_URL || "https://disdukcapil.tidorekota.go.id";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        // `/uploads/media/` sengaja diizinkan meski `/uploads/` dilarang:
        // di situ tinggal gambar konten publik (berita, produk), sedangkan
        // `/uploads/` menyimpan scan KTP/KK warga.
        allow: ["/", "/uploads/media/"],
        disallow: [
          "/api/",
          "/dashboard",
          "/user/",
          "/uploads/",
          "/riwayat",
          "/profil",
          "/tiket",
          "/login",
          "/register",
          "/forgot-password",
          "/reset-password",
        ],
      },
    ],
    sitemap: `${SITUS}/sitemap.xml`,
  };
}
