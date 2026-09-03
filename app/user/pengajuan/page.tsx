import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getSession } from '@/lib/auth';
import { bolehDashboard } from '@/lib/akun-level';
import { Footer } from '@/components/shared/footer';
import { RiwayatList } from '@/components/shared/riwayat-list';
import { FilePlus2, ClipboardList } from 'lucide-react';

export const dynamic = 'force-dynamic';

/**
 * Halaman utama WARGA setelah login — tidak ada "dashboard": langsung
 * riwayat pengajuan + tombol ajukan permohonan & pengaturan akun.
 *
 * ⚠️ Operator OPD dulu ikut mendarat di sini, sebab ia bukan level 1/2.
 * Sejak ia punya kerangka dashboard sendiri, tempatnya `/dashboard/permohonan`
 * — daftar yang sama, tapi di dalam sidebar yang memang disediakan untuknya.
 */
export default async function UserPengajuanPage() {
  const session = await getSession();
  if (!session) redirect('/login?redirect=/user/pengajuan');
  // Petugas & OPD sama-sama memakai dashboard, bukan halaman warga ini.
  if (bolehDashboard(session.level)) redirect('/dashboard');

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative py-12 overflow-hidden" style={{ background: 'linear-gradient(135deg, #3a4b45 0%, #495E57 100%)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10 max-w-4xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl glass-card-blue flex items-center justify-center">
                <ClipboardList className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  Pengajuan Saya
                </h1>
                <p className="text-primary-foreground/80 mt-0.5 text-sm">
                  Halo, {session.nama ?? session.userId} — pantau semua permohonan Anda di sini.
                </p>
              </div>
            </div>
            {/* Pengaturan Akun cukup lewat dropdown akun di navbar — tidak
                diduplikasi di sini. Ajukan Permohonan dipertahankan karena
                tidak ada di dropdown (satu-satunya jalur OPD ke form). */}
            <div className="flex gap-2 shrink-0">
              <Link
                href="/user/pengajuan/baru"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[#3a4b45] shadow-lg hover:bg-slate-100 transition-colors"
              >
                <FilePlus2 className="w-4 h-4" />
                Ajukan Permohonan
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Riwayat langsung terbuka */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8 max-w-4xl">
        <RiwayatList />
      </div>

      <Footer />
    </div>
  );
}
