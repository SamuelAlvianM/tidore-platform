'use client';

/**
 * Gerbang jam pelayanan untuk form permohonan.
 *
 * Server sudah menolak pembuatan permohonan di luar jam (403), tapi itu baru
 * terasa SETELAH form diisi & dikirim. Komponen ini memberi tahu LEBIH DULU:
 * begitu form dibuka di luar jam aktif, tombol kirim dinonaktifkan dan muncul
 * panel berisi status hari ini + jadwal jam hari lain + hari libur.
 *
 * `useStatusJamLayanan()` mengambil status dari GET /api/jam-layanan.
 * Dipakai bersama oleh form warga (mandiri) & form petugas.
 */

import { useEffect, useState } from 'react';
import { CalendarClock, Clock, CalendarOff, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  HARI_LABEL,
  JAM_TIMEZONE,
  JAM_TIMEZONE_LABEL,
  type JamHari,
} from '@/lib/jam-layanan';
import { cn } from '@/lib/utils';

export interface StatusJamLayanan {
  enabled: boolean;
  open: boolean;
  message: string;
  days: JamHari[];
  holidays: string[];
}

/** Ambil status jam pelayanan sekarang (zona JAM_TIMEZONE). loading→null selama fetch. */
export function useStatusJamLayanan() {
  const [status, setStatus] = useState<StatusJamLayanan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let batal = false;
    (async () => {
      try {
        const res = await fetch('/api/jam-layanan', { cache: 'no-store' });
        const json = await res.json();
        if (!batal) setStatus((json.data ?? json) as StatusJamLayanan);
      } catch {
        // Gagal ambil status → jangan halangi user (server tetap jadi penjaga).
        if (!batal) setStatus(null);
      } finally {
        if (!batal) setLoading(false);
      }
    })();
    return () => {
      batal = true;
    };
  }, []);

  // "Tertutup" hanya bila pembatasan aktif DAN sedang di luar jam.
  const tertutup = !!status?.enabled && !status.open;
  return { loading, status, tertutup };
}

/** Indeks hari ini (0=Minggu…6=Sabtu) pada zona JAM_TIMEZONE. */
function hariIniZona(): number {
  const wd = new Intl.DateTimeFormat('en-US', {
    timeZone: JAM_TIMEZONE,
    weekday: 'short',
  }).format(new Date());
  return { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[wd] ?? 0;
}

// Urutan tampil Senin→Minggu (lebih natural dari indeks 0=Minggu).
const URUTAN_HARI = [1, 2, 3, 4, 5, 6, 0];

function formatTanggalId(ymd: string): string {
  // Tengah hari UTC: aman dilabeli ulang di zona mana pun se-Indonesia (UTC+7..+9)
  // tanpa meleset sehari.
  const d = new Date(`${ymd}T12:00:00Z`);
  if (Number.isNaN(d.getTime())) return ymd;
  return new Intl.DateTimeFormat('id-ID', {
    timeZone: JAM_TIMEZONE,
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d);
}

/**
 * Panel "di luar jam pelayanan" — ditampilkan menggantikan isi form saat tutup.
 */
export function PanelJamTutup({
  status,
  onBack,
}: {
  status: StatusJamLayanan;
  onBack?: () => void;
}) {
  const hariIni = hariIniZona();
  const todayYmd = new Intl.DateTimeFormat('en-CA', {
    timeZone: JAM_TIMEZONE,
  }).format(new Date());
  const liburMendatang = status.holidays.filter((h) => h >= todayYmd).slice(0, 5);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="overflow-hidden rounded-2xl border border-amber-200 bg-white shadow-sm">
        {/* Kepala panel */}
        <div className="flex items-start gap-3 border-b border-amber-100 bg-amber-50 px-5 py-4">
          <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
            <Clock className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-base font-semibold text-amber-900">
              Di luar jam pelayanan
            </h3>
            <p className="mt-0.5 text-sm text-amber-800">
              {status.message ||
                'Permohonan online sedang tutup. Silakan kembali pada jam aktif.'}
            </p>
          </div>
        </div>

        {/* Jadwal seminggu */}
        <div className="px-5 py-4">
          <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <CalendarClock className="h-4 w-4" /> Jam aktif pelayanan
          </p>
          <ul className="divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200">
            {URUTAN_HARI.map((i) => {
              const d = status.days[i];
              const ini = i === hariIni;
              return (
                <li
                  key={i}
                  className={cn(
                    'flex items-center justify-between px-4 py-2.5 text-sm',
                    ini && 'bg-primary/5'
                  )}
                >
                  <span
                    className={cn(
                      'flex items-center gap-2',
                      ini ? 'font-semibold text-primary' : 'text-slate-600'
                    )}
                  >
                    {HARI_LABEL[i]}
                    {ini && (
                      <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[0.6rem] font-bold uppercase text-primary">
                        Hari ini
                      </span>
                    )}
                  </span>
                  {d?.buka ? (
                    <span
                      className={cn(
                        'tabular-nums',
                        ini ? 'font-semibold text-primary' : 'text-slate-700'
                      )}
                    >
                      {d.mulai}–{d.selesai} {JAM_TIMEZONE_LABEL}
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-slate-400">Tutup</span>
                  )}
                </li>
              );
            })}
          </ul>

          {liburMendatang.length > 0 && (
            <div className="mt-4">
              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <CalendarOff className="h-4 w-4" /> Hari libur (tutup penuh)
              </p>
              <div className="flex flex-wrap gap-1.5">
                {liburMendatang.map((h) => (
                  <span
                    key={h}
                    className="rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-700"
                  >
                    {formatTanggalId(h)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {onBack && (
            <div className="mt-5">
              <Button variant="outline" onClick={onBack} className="gap-1.5">
                <ArrowLeft className="h-4 w-4" /> Kembali
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
