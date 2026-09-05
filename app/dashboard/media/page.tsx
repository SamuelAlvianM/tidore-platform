import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { BackButton } from '@/components/shared/back-button';
import { AdminMedia } from './AdminMedia';

export const dynamic = 'force-dynamic';

export default async function DashboardMediaPage() {
  const session = await getSession();
  if (!session) redirect('/login');
  if (session.level !== 1) redirect('/dashboard');

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-[1600px] px-4 py-8 md:px-6 lg:px-8">
        <BackButton href="/dashboard" />
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-900">Pustaka Media</h1>
          <p className="text-sm text-slate-500">Kelola gambar &amp; berkas yang diunggah ke sistem.</p>
        </div>
        <AdminMedia />
      </div>
    </div>
  );
}
