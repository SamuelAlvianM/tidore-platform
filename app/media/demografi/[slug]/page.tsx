import { notFound } from 'next/navigation';
import { Footer } from '@/components/shared/footer';
import { BackButton } from '@/components/shared/back-button';
import { DemografiView } from '@/components/landingpage/demografi-view';
import { DEMOGRAFI_KATEGORI } from '@/lib/demografi-kategori';
import { kategoriTampil } from '@/lib/demografi-registri';
import { Users } from 'lucide-react';

/*
 * Halaman ini dirender saat diminta, bukan dibekukan saat build.
 *
 * 🔴 Kategori buatan dinas lahir SETELAH portal dibangun. Halaman statis hanya
 * mengenal delapan slug bawaan, jadi kategori baru akan menjawab 404 kepada
 * warga meski datanya sudah tampil di tab beranda — dan tidak ada cara
 * memperbaikinya selain membangun ulang portalnya.
 */
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return DEMOGRAFI_KATEGORI.map((k) => ({ slug: k.slug }));
}

export default async function DemografiKategoriPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  /* Hanya kategori yang MEMANG ditampilkan di halaman utama. Kategori yang
     sengaja disembunyikan tidak boleh tetap terbuka lewat tautan langsung. */
  const info = (await kategoriTampil()).find((k) => k.slug === slug);
  if (!info) notFound();

  return (
    <>
      <div className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white">
        <div className="container relative z-10 mx-auto px-4 py-12 md:px-8 md:py-14 lg:px-16">
          <BackButton href="/" />
          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
                Data Demografi — {info.label}
              </h1>
              <p className="text-sm text-slate-500">
                Angka per kecamatan adalah <b>jumlah seluruh desa</b> di bawahnya — klik{' '}
                <b>Detail</b> untuk rincian tiap desa/kelurahan.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 md:px-8 lg:px-16">
        <DemografiView initialKategori={info.slug} />
      </div>

      <Footer />
    </>
  );
}
