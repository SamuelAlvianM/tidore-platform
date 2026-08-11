import type { Metadata } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/navbar";
import { KunjunganPing } from "@/components/shared/kunjungan-ping";
import { Providers } from "./providers";
import { A11Y_INIT_SCRIPT } from "@/lib/a11y";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

const ALAMAT_SITUS =
  process.env.NEXT_PUBLIC_APP_URL || "https://disdukcapil.tidorekota.go.id";

/** Identitas instansi untuk mesin pencari (schema.org). */
const SKEMA_ORGANISASI = {
  "@context": "https://schema.org",
  "@type": "GovernmentOrganization",
  name: "Dinas Kependudukan dan Pencatatan Sipil Kota Tidore Kepulauan",
  alternateName: "DAGA — Disdukcapil Tidore Kepulauan",
  url: ALAMAT_SITUS,
  logo: `${ALAMAT_SITUS}/LOGO-dinas_tidore.png`,
  image: `${ALAMAT_SITUS}/og-tidore.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Ahmad Yani No.A, Indonesiana",
    addressLocality: "Kota Tidore Kepulauan",
    addressRegion: "Maluku Utara",
    addressCountry: "ID",
  },
  areaServed: { "@type": "AdministrativeArea", name: "Kota Tidore Kepulauan" },
  openingHours: "Mo-Fr 08:00-16:00",
};

const JUDUL_BAWAAN = "DAGA - Disdukcapil Tidore Kepulauan";
const DESKRIPSI_BAWAAN =
  "DAGA — Portal layanan administrasi kependudukan & pencatatan sipil Disdukcapil Kota Tidore Kepulauan.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3300",
  ),
  title: {
    default: JUDUL_BAWAAN,
    // Halaman yang menyetel judulnya sendiri otomatis mendapat akhiran ini.
    // Sebelumnya SELURUH halaman memakai judul yang sama persis, sehingga
    // mesin pencari tidak punya cara membedakannya dan jatuh kembali ke judul
    // aplikasi Laravel lama yang masih tersimpan di indeksnya.
    template: "%s · DAGA Disdukcapil Tidore Kepulauan",
  },
  description: DESKRIPSI_BAWAAN,
  applicationName: "DAGA",
  authors: [{ name: "Disdukcapil Kota Tidore Kepulauan" }],
  keywords: [
    "disdukcapil tidore",
    "dukcapil kota tidore kepulauan",
    "akta kelahiran tidore",
    "KTP elektronik tidore",
    "kartu keluarga tidore",
    "pelayanan kependudukan maluku utara",
  ],
  // ⚠️ `alternates.canonical` SENGAJA tidak diisi di sini. Nilai di layout
  // diwarisi setiap halaman yang tidak menimpanya, jadi mengisinya "/" berarti
  // memberi tahu mesin pencari bahwa seluruh halaman adalah beranda. Canonical
  // diisi per halaman.
  openGraph: {
    title: JUDUL_BAWAAN,
    description: DESKRIPSI_BAWAAN,
    siteName: "Portal DAGA",
    locale: "id_ID",
    type: "website",
    url: "/",
    images: [{ url: "/og-tidore.png", width: 1200, height: 630, alt: "Logo Disdukcapil Kota Tidore Kepulauan" }],
  },
  twitter: {
    card: "summary_large_image",
    title: JUDUL_BAWAAN,
    images: ["/og-tidore.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  // Diisi hanya bila kuncinya ada — meta kosong lebih buruk daripada tidak ada.
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION_ID
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION_ID } }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={[
        geistSans.variable,
        geistMono.variable,
        cormorant.variable,
        montserrat.variable,
      ].join(" ")}
    >
      <head>
        {/* Terapkan preferensi aksesibilitas tersimpan SEBELUM paint
            (anti-flicker) — baca localStorage, set kelas/style di <html>. */}
        <script dangerouslySetInnerHTML={{ __html: A11Y_INIT_SCRIPT }} />
      </head>
      <body className={geistSans.className}>
        {/* Structured data — memberi tahu mesin pencari SIAPA pemilik situs ini
            (instansi pemerintah, bukan blog), sehingga nama & logo resmi yang
            dipakai di hasil pencarian, bukan tebakan dari isi halaman. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SKEMA_ORGANISASI) }}
        />
        <a href="#konten-utama" className="skip-to-content">
          Lompat ke konten utama
        </a>
        <Providers>
          <KunjunganPing />
          <Navbar />
          <main id="konten-utama">{children}</main>
        </Providers>
      </body>
    </html>
  );
}