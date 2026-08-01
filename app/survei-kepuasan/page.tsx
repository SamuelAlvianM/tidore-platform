import { Footer } from '@/components/shared/footer';
import { SurveiKepuasanContent } from './SurveiKepuasanContent';

export const metadata = {
  title: 'Survei Kepuasan Masyarakat — Disdukcapil Tidore Kepulauan',
  description:
    'Isi Survei Kepuasan Masyarakat Disdukcapil Kota Tidore Kepulauan langsung dari portal ini.',
};

/**
 * Halaman Survei Kepuasan Masyarakat.
 *
 * Isinya (judul, pengantar, dan TAUTAN formulir) diambil dari konten editable
 * `layanan.survei-kepuasan` sehingga dinas bisa memasang tautan surveinya
 * sendiri lewat Mode Edit — dulu alamatnya dipaku di kode. Karena itu isinya
 * dipisah ke komponen klien; halaman ini tinggal memegang metadata & Footer.
 */
export default function SurveiKepuasanPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-slate-50/30">
      <div className="flex-1">
        <SurveiKepuasanContent />
      </div>
      <Footer />
    </div>
  );
}
