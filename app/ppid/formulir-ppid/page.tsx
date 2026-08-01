import { PpidLayananHalaman } from '@/components/ppid/ppid-layanan-halaman';

export const metadata = {
  title: 'Formulir PPID — Disdukcapil Tidore Kepulauan',
  description:
    'Formulir permohonan informasi publik dan pernyataan keberatan PPID Disdukcapil Kota Tidore Kepulauan, lengkap dengan berkas PDF yang dapat diunduh.',
};

// Menampilkan berkas PDF unggahan dashboard → dinamis.
export const dynamic = 'force-dynamic';

export default function FormulirPpidPage() {
  return (
    <PpidLayananHalaman
      judul="Formulir PPID"
      deskripsi="Unduh formulir permohonan informasi publik dan formulir pernyataan keberatan, lengkapi, lalu ajukan sesuai ketentuan layanan PPID."
      seksi={[
        {
          slug: 'formulir-permohonan',
          dokumenJenis: 'FORMULIR_PERMOHONAN',
          fallback: {
            title: 'Formulir Permohonan Informasi',
            description:
              'Alur dan formulir untuk mengajukan permohonan informasi publik kepada PPID Disdukcapil Tidore Kepulauan.',
            // Infografis dilepas (materi milik dinas lain) — dinas mengunggah
            // miliknya lewat Mode Edit; field `image` blok ini sudah editable.
            body: [
              'Pemohon mengajukan permohonan informasi kepada PPID, baik secara langsung maupun melalui surat/email/telepon. PPID mencatat, memverifikasi, dan menyampaikan informasi paling lama 10 hari kerja sesuai ketentuan. Unduh formulir permohonan pada tabel berkas di bawah dan lampirkan fotokopi KTP.',
            ],
          },
        },
        {
          slug: 'formulir-keberatan',
          dokumenJenis: 'FORMULIR_KEBERATAN',
          fallback: {
            title: 'Formulir Pernyataan Keberatan Atas Permohonan Informasi',
            description:
              'Alur dan formulir untuk mengajukan keberatan bila permohonan informasi tidak dipenuhi atau tidak sesuai.',
            // Infografis dilepas (materi milik dinas lain) — unggah via Mode Edit.
            body: [
              'Jika pemohon informasi tidak puas dengan jawaban/keputusan PPID, pemohon dapat mengajukan keberatan kepada Atasan PPID paling lambat 30 hari kerja sejak ditemukannya alasan keberatan. Unduh formulir pernyataan keberatan pada tabel berkas di bawah.',
            ],
          },
        },
      ]}
    />
  );
}
