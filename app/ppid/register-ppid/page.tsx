import { PpidLayananHalaman } from '@/components/ppid/ppid-layanan-halaman';

export const metadata = {
  title: 'Register PPID — Disdukcapil Tidore Kepulauan',
  description:
    'Register permintaan informasi publik dan register keberatan PPID Disdukcapil Kota Tidore Kepulauan.',
};

// Menampilkan berkas PDF unggahan dashboard → dinamis.
export const dynamic = 'force-dynamic';

export default function RegisterPpidPage() {
  return (
    <PpidLayananHalaman
      judul="Register PPID"
      deskripsi="Buku register pencatatan permohonan informasi publik dan register keberatan yang masuk ke PPID Disdukcapil Kota Tidore Kepulauan."
      duaKolom
      seksi={[
        {
          slug: 'register-permintaan',
          dokumenJenis: 'REGISTER_PERMINTAAN',
          fallback: {
            title: 'Register Permintaan Informasi Publik',
            description:
              'Daftar/rekapitulasi permohonan informasi publik yang diterima dan ditindaklanjuti PPID.',
            body: [
              'Register ini mencatat setiap permohonan informasi publik: identitas pemohon, informasi yang diminta, tanggal permohonan, serta status tindak lanjutnya. Dokumen register dapat diunduh pada tabel berkas di bawah.',
            ],
          },
        },
        {
          slug: 'register-keberatan',
          dokumenJenis: 'REGISTER_KEBERATAN',
          fallback: {
            title: 'Register Keberatan',
            description:
              'Daftar/rekapitulasi keberatan atas permohonan informasi publik yang diajukan kepada Atasan PPID.',
            body: [
              'Register ini mencatat setiap pengajuan keberatan: identitas pemohon, alasan keberatan, tanggal pengajuan, serta tanggapan dan penyelesaiannya. Dokumen register dapat diunduh pada tabel berkas di bawah.',
            ],
          },
        },
      ]}
    />
  );
}
