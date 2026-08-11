import { InfoPage } from '@/components/shared/info-page';
import type { Metadata } from "next";

// Judul & deskripsi khas halaman ini. Tanpa ini halaman mewarisi judul
// bawaan layout, sehingga semua halaman terlihat sama di hasil pencarian.
export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description:
    "Kebijakan privasi dan perlindungan data pribadi pengguna Portal DAGA Disdukcapil Kota Tidore Kepulauan.",
  alternates: { canonical: "/privasi" },
  openGraph: { title: "Kebijakan Privasi", description: "Kebijakan privasi dan perlindungan data pribadi pengguna Portal DAGA Disdukcapil Kota Tidore Kepulauan.", url: "/privasi" },
};

export default function PrivasiPage() {
  return (
    <InfoPage
      content={{
        title: 'Privasi',
        description: 'Informasi privasi data pengguna pada portal DAGA.',
        body: [
          'Lihat detail lengkap kebijakan privasi kami pada halaman Kebijakan & Privasi.',
        ],
      }}
    />
  );
}
