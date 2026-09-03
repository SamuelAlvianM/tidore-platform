import { prisma } from '@/lib/prisma';
import { type InfoBerkas } from '@/components/shared/info-page';
import { ProfilKependudukanView } from '@/components/profil-kependudukan/profil-kependudukan-view';

export const metadata = {
  title: 'Profil Perkembangan Kependudukan — Disdukcapil Tidore Kepulauan',
  description:
    'Buku Profil Perkembangan Kependudukan Kota Tidore Kepulauan per tahun — data jumlah dan persebaran penduduk, karakteristik demografi, keluarga, serta kepemilikan dokumen kependudukan.',
};

// Dinamis: daftar bukunya dokumen unggahan (t_produk), bukan data build.
export const dynamic = 'force-dynamic';

/**
 * Menu navbar "Profil Kependudukan" (/profil-kependudukan).
 *
 * Sumber dokumennya SAMA dengan PPID → Buku Profil Kependudukan: t_produk
 * kategori `BUKU_PROFIL`. Jadi satu unggahan tampil di dua tempat dan dinas
 * tidak perlu mengunggah berkas yang sama dua kali.
 */
export default async function ProfilKependudukanPage() {
  const rows = await prisma.produk.findMany({
    where: { jenis: 'BUKU_PROFIL', file: { not: null } },
    orderBy: { createdAt: 'desc' },
    select: { id: true, judul: true, file: true, createdAt: true },
  });

  const berkas: InfoBerkas[] = rows.map((b) => ({
    id: b.id,
    judul: b.judul,
    file: b.file as string,
    createdAt: b.createdAt.toISOString(),
  }));

  return <ProfilKependudukanView berkas={berkas} />;
}
