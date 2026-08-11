import { ProdukDisdukcapilView } from '@/components/produk/produk-disdukcapil-view';
import type { Metadata } from "next";

// Judul & deskripsi khas halaman ini. Tanpa ini halaman mewarisi judul
// bawaan layout, sehingga semua halaman terlihat sama di hasil pencarian.
export const metadata: Metadata = {
  title: "Produk & Layanan Disdukcapil",
  description:
    "Daftar produk dan layanan administrasi kependudukan Kota Tidore Kepulauan: KTP-el, Kartu Keluarga, akta kelahiran, akta kematian, dan lainnya.",
  alternates: { canonical: "/produk/produk-disdukcapil" },
  openGraph: { title: "Produk & Layanan Disdukcapil", description: "Daftar produk dan layanan administrasi kependudukan Kota Tidore Kepulauan: KTP-el, Kartu Keluarga, akta kelahiran, akta kematian, dan lainnya.", url: "/produk/produk-disdukcapil" },
};

/**
 * Produk Disdukcapil — diport dari app lama (produk layanan Capil & Dafduk).
 * Route statis ini mengalahkan catch-all /produk/[...slug].
 * Konten (pengantar + daftar produk) editable via blok `produk.disdukcapil`.
 */
export default function ProdukDisdukcapilPage() {
  return <ProdukDisdukcapilView />;
}
