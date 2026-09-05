import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { BackButton } from '@/components/shared/back-button';
import { EditorNavigasi } from './EditorNavigasi';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Menu Navigasi' };

export default async function DashboardNavigasiPage() {
  const session = await getSession();
  if (!session) redirect('/login');
  // Sama seperti Dokumen Publikasi: hanya superadmin yang boleh mengubah
  // struktur navigasi publik.
  if (session.level !== 1) redirect('/dashboard');

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-[1600px] px-4 py-8 md:px-6 lg:px-8">
        <BackButton href="/dashboard" />
        <div className="mb-6 mt-4">
          <h1 className="text-2xl font-semibold text-slate-900">Menu Navigasi</h1>
          <p className="text-sm text-slate-500">
            Tambahkan sub-menu ke navbar publik. Menu bawaan sistem terkunci
            agar navigasi utama tidak rusak.
          </p>
        </div>
        <EditorNavigasi />
      </div>
    </div>
  );
}
