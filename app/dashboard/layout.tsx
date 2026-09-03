import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { bolehDashboard } from '@/lib/akun-level';
import { DashboardSidebar } from '@/components/shared/dashboard-sidebar';

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect('/login');

  /*
   * Warga tidak memakai kerangka dashboard.
   *
   * 🔴 Syaratnya dulu `session.level > 2`. Itu memang menyingkirkan warga
   * (level 3) — tapi juga Operator OPD (level 4), yang justru DIMAKSUDKAN
   * memakai dashboard. Akibatnya akun OPD masuk ke halaman dashboard tanpa
   * sidebar dan tanpa header sama sekali: tidak ada satu pun tautan, dan
   * satu-satunya cara berpindah halaman adalah mengetik URL.
   *
   * Menyebut PERAN, bukan membandingkan angka, membuat kekeliruan ini tidak
   * bisa terulang saat peran baru ditambahkan di bawah nomor yang lebih besar.
   */
  if (!bolehDashboard(session.level)) return <>{children}</>;

  return (
    <div className="min-h-screen bg-background lg:flex">
      <DashboardSidebar />
      {/* pb-20: ruang untuk bottom-nav mobile */}
      <div className="flex-1 min-w-0 pb-20 lg:pb-0">{children}</div>
    </div>
  );
}
