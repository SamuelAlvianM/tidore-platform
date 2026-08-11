import { SyaratKetentuanView } from '@/components/shared/syarat-ketentuan-view';
import type { Metadata } from "next";

// Judul & deskripsi khas halaman ini. Tanpa ini halaman mewarisi judul
// bawaan layout, sehingga semua halaman terlihat sama di hasil pencarian.
export const metadata: Metadata = {
  title: "Syarat & Ketentuan",
  description:
    "Syarat dan ketentuan penggunaan Portal DAGA Disdukcapil Kota Tidore Kepulauan.",
  alternates: { canonical: "/syarat" },
  openGraph: { title: "Syarat & Ketentuan", description: "Syarat dan ketentuan penggunaan Portal DAGA Disdukcapil Kota Tidore Kepulauan.", url: "/syarat" },
};

/**
 * Syarat & Ketentuan — konten editable via blok `info.syarat-ketentuan`
 * (dashboard Konten Halaman / mode edit). Pola sama dengan Kebijakan & Privasi.
 */
export default function SyaratPage() {
  return <SyaratKetentuanView />;
}
