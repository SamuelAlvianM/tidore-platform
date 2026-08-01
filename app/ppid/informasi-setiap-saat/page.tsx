import { PpidInformasiIndex } from '@/components/ppid/informasi-index';
import { PPID_SETIAP_SAAT, INFORMASI_PUBLIK_TABS } from '@/lib/ppid-informasi';
import { PpidSubnav } from '@/components/ppid/ppid-subnav';

export const metadata = {
  title: 'Informasi Wajib Tersedia Setiap Saat — PPID Disdukcapil Tidore Kepulauan',
  description: PPID_SETIAP_SAAT.deskripsi,
};

// Jumlah dokumen dihitung dari unggahan Dokumen Publikasi di DB.
export const dynamic = 'force-dynamic';

export default function InformasiSetiapSaatPage() {
  return (
    <PpidInformasiIndex
      grup={PPID_SETIAP_SAAT}
      subnav={<PpidSubnav items={INFORMASI_PUBLIK_TABS} layoutId="informasi-publik" />}
    />
  );
}
