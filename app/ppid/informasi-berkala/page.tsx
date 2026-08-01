import { PpidInformasiIndex } from '@/components/ppid/informasi-index';
import { PPID_BERKALA, INFORMASI_PUBLIK_TABS } from '@/lib/ppid-informasi';
import { PpidSubnav } from '@/components/ppid/ppid-subnav';

export const metadata = {
  title: 'Informasi Wajib Diumumkan Secara Berkala — PPID Disdukcapil Tidore Kepulauan',
  description: PPID_BERKALA.deskripsi,
};

// Jumlah dokumen dihitung dari unggahan Dokumen Publikasi di DB.
export const dynamic = 'force-dynamic';

export default function InformasiBerkalaPage() {
  return (
    <PpidInformasiIndex
      grup={PPID_BERKALA}
      subnav={<PpidSubnav items={INFORMASI_PUBLIK_TABS} layoutId="informasi-publik" />}
    />
  );
}
