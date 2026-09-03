import { redirect, notFound } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { bolehDashboard, isPetugas } from '@/lib/akun-level';
import { prisma } from '@/lib/prisma';
import { bolehLihatPermohonan } from '@/lib/lingkup-permohonan';
import { BackButton } from '@/components/shared/back-button';
import { PermohonanDetail } from './PermohonanDetail';

export const dynamic = 'force-dynamic';

/**
 * Detail satu permohonan — HALAMAN SENDIRI, bukan panel di dalam tabel.
 *
 * 🔴 KENAPA HALAMAN, BUKAN PANEL. Sebelumnya detail menggantikan isi tabel di
 * halaman yang sama: tidak punya URL, jadi tidak bisa dikirim ke rekan
 * ("lihat permohonan ini"), tidak bisa di-bookmark, dan tombol Kembali
 * peramban melempar petugas keluar dari daftar alih-alih menutup panel.
 *
 * Yang paling merugikan: Operator OPD tidak punya jalan sama sekali untuk
 * membaca alasan penolakan permohonannya. Halaman ini memberinya jalan itu —
 * dan menaruh alasan penolakan di posisi paling atas.
 *
 * Penjagaannya di SERVER, bukan di komponen: yang menentukan boleh-tidaknya
 * membuka halaman ini adalah pemeriksaan di bawah, bukan tombol yang
 * disembunyikan.
 */
export default async function DetailPermohonanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session) redirect('/login');
  if (!bolehDashboard(session.level)) redirect('/dashboard');

  const { id } = await params;
  const nomor = Number(id);
  if (!Number.isInteger(nomor) || nomor <= 0) notFound();

  // Hanya kepemilikan yang ditanyakan di sini; isi lengkapnya diambil klien
  // lewat API yang menerapkan pemeriksaan yang sama. Dua tempat memeriksa hal
  // yang sama memang disengaja: halaman ini tidak boleh sempat tergambar untuk
  // permohonan yang bukan haknya, sekalipun cuma sekejap sebelum API menolak.
  const ringkas = await prisma.permohonan.findUnique({
    where: { id: nomor },
    select: { id: true, userId: true, noregister: true },
  });

  // 404, bukan 403 — lihat `lib/lingkup-permohonan.ts`.
  if (!ringkas || !bolehLihatPermohonan(session, ringkas.userId)) notFound();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10 md:px-8 lg:px-16">
        <BackButton href="/dashboard/permohonan" />
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-slate-900">
            Detail Permohonan
          </h1>
          <p className="font-mono text-sm text-slate-500">
            {ringkas.noregister}
          </p>
        </div>

        <PermohonanDetail id={nomor} bolehProses={isPetugas(session.level)} />
      </div>
    </div>
  );
}
