import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { BeritaDetailClient } from './berita-detail-client';

/**
 * Pembungkus SERVER untuk halaman detail berita.
 *
 * Isi artikelnya tetap dirender di klien (komponen di sebelah, yang menarik
 * datanya lewat /api/berita/[slug]). Yang dipindah ke server hanya METADATA-nya
 * — dan itu tidak bisa dihindari: `export const metadata` maupun
 * `generateMetadata` hanya berlaku di server component.
 *
 * Sebelumnya seluruh artikel memakai judul bawaan layout yang sama persis,
 * sehingga di hasil pencarian tak ada satu pun berita yang bisa dikenali dari
 * judulnya, dan tautan yang dibagikan ke WhatsApp/Facebook tidak pernah
 * menampilkan judul maupun gambar artikelnya.
 */

/** Buang tag HTML & rapikan spasi — konten berita disimpan sebagai HTML. */
function ringkasTeks(html: string, maks = 155): string {
  const teks = html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
  if (teks.length <= maks) return teks;
  // Potong di batas kata terdekat supaya tidak terpenggal di tengah kata.
  return teks.slice(0, teks.lastIndexOf(' ', maks)).trimEnd() + '…';
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const berita = await prisma.news
    .findFirst({
      where: { slug, publish: true },
      select: { judul: true, ringkasan: true, konten: true, gambar: true, createdAt: true, updatedAt: true },
    })
    .catch(() => null);

  if (!berita) {
    return { title: 'Berita tidak ditemukan', robots: { index: false, follow: true } };
  }

  const deskripsi =
    berita.ringkasan?.trim() || ringkasTeks(berita.konten) || undefined;
  const kanonik = `/media/berita/${slug}`;

  return {
    title: berita.judul,
    description: deskripsi,
    alternates: { canonical: kanonik },
    openGraph: {
      type: 'article',
      title: berita.judul,
      description: deskripsi,
      url: kanonik,
      publishedTime: berita.createdAt.toISOString(),
      modifiedTime: berita.updatedAt.toISOString(),
      // Gambar artikel bila ada; kalau tidak, og-image situs dari layout dipakai.
      ...(berita.gambar ? { images: [{ url: berita.gambar, alt: berita.judul }] } : {}),
    },
  };
}

export default function BeritaDetailPage() {
  return <BeritaDetailClient />;
}
