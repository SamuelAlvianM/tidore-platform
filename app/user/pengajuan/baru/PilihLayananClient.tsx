'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Search, ArrowRight } from 'lucide-react';
import { getIcon } from '@/lib/icon-map';
import { cn } from '@/lib/utils';
import {
  LAYANAN_PERMOHONAN,
  KATEGORI_LAYANAN,
  ROUTE_KE_FORM_SLUG,
} from '@/lib/permohonan-layanan';
import { slugTersembunyi } from '@/lib/pelayanan-list';
import { warnaKategori } from '@/lib/kategori';

/**
 * Pemilih layanan permohonan untuk warga/OPD di dashboard.
 * Menggantikan grid kartu di halaman publik /permohonan-online — bedanya tiap
 * kartu kini menuju HALAMAN sendiri, bukan membuka modal.
 */
export function PilihLayananClient({
  kataKunciAwal = '',
}: {
  kataKunciAwal?: string;
}) {
  const [q, setQ] = useState(kataKunciAwal);
  const [kategori, setKategori] = useState('all');
  // Admin bisa menyembunyikan layanan tertentu (dashboard → Pengaturan
  // Pelayanan). Perilaku ini dipertahankan dari halaman lama.
  const [tersembunyi, setTersembunyi] = useState<Set<string>>(new Set());

  useEffect(() => {
    let batal = false;
    (async () => {
      try {
        const res = await fetch('/api/static-content?keys=pelayanan.visibilitas');
        const j = await res.json();
        const hidden = j.data?.items?.['pelayanan.visibilitas']?.hidden;
        if (!batal) setTersembunyi(slugTersembunyi(hidden));
      } catch {
        // Gagal memuat = tampilkan semua layanan; bukan kondisi fatal.
      }
    })();
    return () => {
      batal = true;
    };
  }, []);

  /*
   * Daftar yang lolos pencarian & visibilitas, TANPA saringan kategori —
   * dari sinilah hitungan tiap tab diambil.
   *
   * ⚠️ Kalau dihitung dari seluruh daftar, tab bisa berbunyi "Akta 5" lalu
   * terbuka kosong karena kata kuncinya tidak cocok satu pun.
   */
  const lolosCari = useMemo(() => {
    const cari = q.trim().toLowerCase();
    return LAYANAN_PERMOHONAN.filter((l) => {
      /*
       * 🔴 Dicocokkan lewat SLUG FORMULIR, bukan slug rute.
       *
       * Sebelumnya baris ini berbunyi `tersembunyi.has(l.slug) ||
       * tersembunyi.has(l.title)`, sementara yang tersimpan adalah `modalType`.
       * Tidak satu pun dari 15 layanan pernah cocok: layanan yang dimatikan
       * dinas tetap tampil di sini, tanpa satu pun galat.
       */
      if (tersembunyi.has(ROUTE_KE_FORM_SLUG[l.slug] ?? l.slug)) return false;
      if (!cari) return true;
      return (
        l.title.toLowerCase().includes(cari) ||
        l.description.toLowerCase().includes(cari)
      );
    });
  }, [q, tersembunyi]);

  const jumlahKat = useMemo(() => {
    const n: Record<string, number> = { all: lolosCari.length };
    for (const l of lolosCari) n[l.category] = (n[l.category] ?? 0) + 1;
    return n;
  }, [lolosCari]);

  const hasil = useMemo(
    () =>
      kategori === 'all'
        ? lolosCari
        : lolosCari.filter((l) => l.category === kategori),
    [lolosCari, kategori],
  );

  return (
    <>
      {/* Pencarian */}
      <div className="relative mb-5">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Cari layanan — misalnya KTP, akta kelahiran, kartu keluarga…"
          className="h-11 pl-10"
        />
      </div>

      {/* Filter kategori */}
      <div className="mb-6 flex flex-wrap gap-2">
        {KATEGORI_LAYANAN.filter((k) => (jumlahKat[k.id] ?? 0) > 0).map((k) => {
          const Ikon = getIcon(k.icon);
          const aktif = kategori === k.id;
          const w = warnaKategori(k.id);
          return (
            <button
              key={k.id}
              onClick={() => setKategori(k.id)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors',
                aktif
                  ? w.tab
                  : 'border-border bg-card text-muted-foreground hover:bg-accent',
              )}
            >
              {Ikon && <Ikon className="h-3.5 w-3.5" />}
              {k.name}
              <span
                className={cn(
                  'inline-flex min-w-5 items-center justify-center rounded-full px-1.5 text-[0.65rem] font-semibold',
                  aktif ? w.hitung : 'bg-muted text-muted-foreground',
                )}
              >
                {jumlahKat[k.id] ?? 0}
              </span>
            </button>
          );
        })}
      </div>

      {hasil.length === 0 ? (
        <p className="rounded-xl border border-dashed py-12 text-center text-sm text-muted-foreground">
          Tidak ada layanan yang cocok dengan pencarian Anda.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hasil.map((l) => {
            const Ikon = getIcon(l.icon);
            return (
              <Link
                key={l.slug}
                href={`/user/pengajuan/baru/${l.slug}`}
                className="group flex flex-col rounded-2xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                {/*
                  🔴 Warnanya dari KATEGORI, bukan gradasi per-layanan.

                  Gradasi lama tidak selaras kategori: Akta memakai empat warna
                  berbeda (pink, warning, slate, destructive), sementara
                  Perpindahan dan Data justru identik. Warnanya karena itu tidak
                  memberi tahu apa pun — dua layanan sejenis terlihat berbeda,
                  dua yang berbeda terlihat sama.

                  ⚠️ Kotak di belakang ikon tetap `bg-primary/10` untuk SEMUA
                  kategori; yang berbeda hanya warna glif ikonnya. Sama persis
                  dengan pemilih layanan petugas — satu peta, dua halaman.
                */}
                <div
                  className={cn(
                    'mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10',
                    warnaKategori(l.category).ikon,
                  )}
                >
                  {Ikon && <Ikon className="h-5 w-5" />}
                </div>
                <h3 className="font-semibold leading-snug text-foreground">
                  {l.title}
                </h3>
                <p className="mt-1 flex-1 text-sm text-muted-foreground">
                  {l.description}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Ajukan
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
