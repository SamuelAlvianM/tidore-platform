import type { Metadata } from "next";
import { BeritaListClient } from "./berita-list-client";

// Pembungkus SERVER. Isi halaman tetap komponen klien di sebelah; yang
// dipindah ke sini hanya metadata — `export const metadata` memang hanya
// berlaku di server component, dan tanpa ini halaman mewarisi judul bawaan
// layout sehingga semua halaman terlihat sama di hasil pencarian.
export const metadata: Metadata = {
  title: "Berita & Pengumuman",
  description:
    "Berita, pengumuman, dan informasi terbaru dari Dinas Kependudukan dan Pencatatan Sipil Kota Tidore Kepulauan.",
  alternates: { canonical: "/media/berita" },
  openGraph: { title: "Berita & Pengumuman", description: "Berita, pengumuman, dan informasi terbaru dari Dinas Kependudukan dan Pencatatan Sipil Kota Tidore Kepulauan.", url: "/media/berita" },
};

export default function Page() {
  return <BeritaListClient />;
}
