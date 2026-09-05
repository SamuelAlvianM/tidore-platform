'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Check, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  PELAYANAN_LIST,
  PELAYANAN_KATEGORI,
} from '@/lib/pelayanan-list';

/**
 * Pengaturan layanan mana yang boleh tampil di halaman Permohonan Online publik.
 * Menyimpan daftar modalType yang DISEMBUNYIKAN ke StaticContent via API admin.
 */
export function PengaturanPelayanan({
  onUbah,
}: {
  /*
   * 🔴 Dipanggil pada SETIAP centang, bukan setelah tersimpan.
   *
   * Penyimpanannya ditunda 700 ms supaya mencentang beberapa layanan
   * berturut-turut tidak melahirkan satu permintaan per klik. Tapi petugas
   * menunggu jawabannya SEKARANG: ia mencoret satu layanan dan ingin kartunya
   * di belakang drawer langsung meredup. Menunggu simpan selesai membuat
   * layar tertinggal sedetik penuh dari tangannya — cukup lama untuk membuat
   * orang mengklik dua kali.
   *
   * ⚠️ Karena itu laporannya OPTIMISTIS. Bila penyimpanan gagal, keadaan yang
   * benar dilaporkan ulang lewat callback yang sama — layar kembali jujur.
   */
  onUbah?: (tersembunyi: Set<string>) => void;
} = {}) {
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [statusSimpan, setStatusSimpan] = useState<'idle' | 'menyimpan' | 'tersimpan'>('idle');
  const terakhirDisimpan = useRef<string>('');

  useEffect(() => {
    fetch('/api/admin/pelayanan-visibilitas')
      .then((r) => r.json())
      .then((j) => {
        const h = j.data?.hidden;
        if (Array.isArray(h)) setHidden(new Set(h));
        terakhirDisimpan.current = JSON.stringify(
          (Array.isArray(h) ? [...h] : []).sort(),
        );
      })
      .catch(() => toast.error('Gagal memuat pengaturan'))
      .finally(() => setLoading(false));
  }, []);

  /** Kembalikan tampilan ke keadaan terakhir yang benar-benar tersimpan. */
  const pulihkanKeTersimpan = useCallback(() => {
    try {
      const aman = new Set<string>(JSON.parse(terakhirDisimpan.current || '[]'));
      setHidden(aman);
      onUbah?.(aman);
    } catch {
      /* konfigurasi terakhir tak terbaca — biarkan apa adanya */
    }
  }, [onUbah]);

  // Autosave: simpan otomatis 700ms setelah perubahan berhenti.
  useEffect(() => {
    if (loading) return;
    const kini = JSON.stringify([...hidden].sort());
    if (kini === terakhirDisimpan.current) return;
    setStatusSimpan('menyimpan');
    const t = setTimeout(async () => {
      try {
        const res = await fetch('/api/admin/pelayanan-visibilitas', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ hidden: [...hidden] }),
        });
        const j = await res.json();
        if (j.error?.length) {
          toast.error(j.error[0]);
          setStatusSimpan('idle');
          // ⚠️ Layar sudah terlanjur memperlihatkan keadaan baru. Kembalikan
          // ke keadaan terakhir yang BENAR-BENAR tersimpan, kalau tidak
          // petugas mengira layanan sudah dimatikan padahal masih menyala.
          pulihkanKeTersimpan();
          return;
        }
        terakhirDisimpan.current = kini;
        setStatusSimpan('tersimpan');
      } catch {
        toast.error('Gagal menyimpan pengaturan');
        setStatusSimpan('idle');
        pulihkanKeTersimpan();
      }
    }, 700);
    return () => clearTimeout(t);
  }, [hidden, loading, pulihkanKeTersimpan]);

  const grouped = useMemo(() => {
    const g: Record<string, typeof PELAYANAN_LIST> = {};
    for (const item of PELAYANAN_LIST) {
      (g[item.category] ??= []).push(item);
    }
    return g;
  }, []);

  const visibleCount = PELAYANAN_LIST.length - hidden.size;

  const toggle = (modalType: string) => {
    /*
     * 🔴 `onUbah` DI LUAR pembaru state, bukan di dalamnya.
     *
     * Fungsi pembaru `setHidden(prev => …)` dijalankan React SAAT RENDER.
     * Memanggil setState milik induk dari dalamnya melanggar aturan React —
     * "Cannot update a component while rendering a different component" — dan
     * pada mode ketat bisa berujung render berulang tanpa henti.
     */
    const next = new Set(hidden);
    if (next.has(modalType)) next.delete(modalType);
    else next.add(modalType);

    setHidden(next);
    onUbah?.(next);
  };

  const setAll = (show: boolean) => {
    const next = show ? new Set<string>() : new Set(PELAYANAN_LIST.map((p) => p.modalType));
    setHidden(next);
    onUbah?.(next);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Ringkasan + aksi massal */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
        <p className="text-sm text-slate-700">
          <b>{visibleCount}</b> dari {PELAYANAN_LIST.length} layanan tampil di{' '}
          <b>Permohonan Online</b>. Hilangkan centang untuk menyembunyikan.
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setAll(true)}>
            <Eye className="h-4 w-4 mr-1.5" /> Tampilkan semua
          </Button>
          <Button variant="outline" size="sm" onClick={() => setAll(false)}>
            <EyeOff className="h-4 w-4 mr-1.5" /> Sembunyikan semua
          </Button>
        </div>
      </div>

      {/* Daftar per kategori */}
      <div className="space-y-5">
        {Object.entries(grouped).map(([cat, items]) => (
          <div key={cat} className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
              {PELAYANAN_KATEGORI[cat] ?? cat}
            </h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {items.map((item) => {
                const shown = !hidden.has(item.modalType);
                return (
                  <label
                    key={item.modalType}
                    className={cn(
                      'flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors',
                      shown
                        ? 'border-slate-200 hover:border-primary/40'
                        : 'border-dashed border-slate-200 bg-slate-50 opacity-70',
                    )}
                  >
                    <Checkbox
                      checked={shown}
                      onCheckedChange={() => toggle(item.modalType)}
                    />
                    <span
                      className={cn(
                        'text-sm font-medium',
                        shown ? 'text-slate-800' : 'text-slate-400 line-through',
                      )}
                    >
                      {item.title}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-1.5 text-xs text-slate-400">
        {statusSimpan === 'menyimpan' ? (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin" /> Menyimpan…
          </>
        ) : statusSimpan === 'tersimpan' ? (
          <>
            <Check className="h-3.5 w-3.5 text-success" /> Perubahan tersimpan otomatis
          </>
        ) : (
          <>Perubahan tersimpan otomatis</>
        )}
      </div>
    </div>
  );
}
