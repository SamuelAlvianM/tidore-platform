import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { BackButton } from '@/components/shared/back-button';
import { AdminPengaduan } from './AdminPengaduan';

export const dynamic = 'force-dynamic';

export default async function DashboardPengaduanPage() {
  const session = await getSession();
  if (!session) redirect('/login');
  if (session.level > 2) redirect('/dashboard');

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-[1600px] px-4 py-8 md:px-6 lg:px-8">
        <BackButton href="/dashboard" />
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-900">Pengaduan Masyarakat</h1>
          <p className="text-sm text-slate-500">Tinjau dan tangani pengaduan yang masuk.</p>
        </div>
        <AdminPengaduan />
      </div>
    </div>
  );
}
