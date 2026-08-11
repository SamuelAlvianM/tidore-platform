import type { Metadata } from "next";
import { GaleriClient } from "./galeri-client";

// Pembungkus SERVER. Isi halaman tetap komponen klien di sebelah; yang
// dipindah ke sini hanya metadata — `export const metadata` memang hanya
// berlaku di server component, dan tanpa ini halaman mewarisi judul bawaan
// layout sehingga semua halaman terlihat sama di hasil pencarian.
export const metadata: Metadata = {
  title: "Galeri Kegiatan",
  description:
    "Dokumentasi kegiatan dan pelayanan Disdukcapil Kota Tidore Kepulauan.",
  alternates: { canonical: "/galeri" },
  openGraph: { title: "Galeri Kegiatan", description: "Dokumentasi kegiatan dan pelayanan Disdukcapil Kota Tidore Kepulauan.", url: "/galeri" },
};

export default function Page() {
  return <GaleriClient />;
}
