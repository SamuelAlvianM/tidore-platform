'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { animate, stagger } from 'animejs';
import { useInView, animate as fmAnimate } from 'framer-motion';
import {
  Map as MapIcon,
  FileCheck,
  ArrowRight,
  ExternalLink,
  CalendarClock,
  Loader2,
  CalendarDays,
  CheckCircle2,
  Hourglass,
  Building2,
  Trees,
  MapPin,
  Pencil,
  MousePointerClick,
} from 'lucide-react';

// Ikon header kartu peta & pelayanan — lebih terlihat dari flat, tapi tetap
// subordinat terhadap 6 ikon kartu demografi (yang putih di atas gradient penuh).
const HEADER_ICON =
  'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-primary ' +
  'bg-gradient-to-br from-primary/25 to-primary/10 ring-1 ring-primary/15';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useInlineEdit } from '@/components/konten/inline-edit';
import { useStaticContent } from '@/lib/use-static-content';
import { DemografiMetric } from '@/components/landingpage/demografi-metric';
// Editor template kartu (judul/ikon/warna) DINONAKTIFKAN sementara — mode edit
// kini langsung membuka editor data Excel. Buka komentar untuk mengaktifkan lagi.
// import { StatistikKartuEditor } from '@/components/landingpage/statistik-kartu-editor';
import { DemografiEditor } from '@/components/dashboard/demografi-editor';
import { getDemografiKategori } from '@/lib/demografi-kategori';
import { getIcon } from '@/lib/icon-map';
import { DEFAULT_KARTU, warnaPreset } from '@/lib/beranda-statistik';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// Peta Leaflet dimuat hanya di klien (akses `window`) — tidak membebani SSR.
const OfficeMap = dynamic(() => import('./office-map'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-slate-100">
      <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
    </div>
  ),
});

// Grafik Highcharts (tren 6 bulan & layanan terpopuler) — klien saja.
const TrenChart = dynamic(() => import('./stats-charts').then((m) => m.TrenChart), {
  ssr: false,
  loading: () => <div className="h-[134px] w-full animate-pulse rounded-lg bg-slate-100/70" />,
});
const TopLayananChart = dynamic(() => import('./stats-charts').then((m) => m.TopLayananChart), {
  ssr: false,
  loading: () => <div className="h-[150px] w-full animate-pulse rounded-lg bg-slate-100/70" />,
});

// Kartu biru glassy — dipakai semua kartu statistik.
// Tanpa backdrop-blur: di atas latar putih efeknya nol tapi memicu flicker
// saat transisi hover. Gradasi tipis memberi kesan kaca seperti navbar.
const GLASS =
  'rounded-2xl bg-gradient-to-br from-white to-[#f6f9fb] ' +
  'border border-[#e7ebee] shadow-[0_6px_22px_rgba(69,71,75,0.07),inset_0_1px_0_rgba(255,255,255,0.9)]';

// ─── Types ────────────────────────────────────────────────────────────────────

interface TopJenis {
  nama: string;
  count: number;
}
interface TrendPoint {
  label: string;
  count: number;
}
interface PelayananStat {
  total: number;
  selesai: number;
  aktif: number;
  bulanIni: number;
  topJenis: TopJenis[];
  trend6: TrendPoint[];
}

/** Satu kartu demografi terkonfigurasi (dihitung server dari sumber data). */
interface KartuDemografi {
  title: string;
  icon: string; // nama ikon Lucide
  kategori: string;
  kolom: string;
  accent: string; // kelas warna teks (badge)
  accentBg: string; // kelas gradient latar ikon
  badge?: string;
  /**
   * 🔴 `null` = DATANYA BELUM ADA, dan itu berbeda dari nol.
   *
   * Nol adalah pernyataan — "kabupaten ini punya 0 kepala keluarga". Kartu yang
   * kolom sumbernya tidak ditemukan tidak boleh membuat pernyataan itu; ia
   * menampilkan "—". Lihat `sumCol()` di app/api/stats/route.ts.
   */
  value: number | null;
}

interface StatsData {
  kartuDemografi: KartuDemografi[];
  pelayanan: PelayananStat;
  periodeKependudukan: string;
}

// ─── Animated Counter ───────────────────────────────────────────────────────────

function AnimatedNumber({ value, duration = 1.6 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const ctrl = fmAnimate(0, value, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.floor(v)),
    });
    return () => ctrl.stop();
  }, [isInView, value, duration]);

  return <span ref={ref}>{display.toLocaleString('id-ID')}</span>;
}

function Divider() {
  return <div className="h-px w-full bg-primary/10" />;
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({ title, value, icon, accent, accentBg, badge, onClick, editHint }: KartuDemografi & { onClick?: () => void; editHint?: boolean }) {
  const Icon = getIcon(icon);
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        GLASS,
        'js-stat group relative flex flex-col justify-between gap-5 h-full w-full p-5 text-left',
        'hover:border-primary/30 hover:shadow-md hover:shadow-primary/10 transition-[box-shadow,border-color] duration-300',
        'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
      )}
      title={editHint ? `Atur kartu ${title}` : `Lihat rincian ${title} per kecamatan`}
    >
      {/* Petunjuk klik — muncul halus saat hover (pensil saat mode edit) */}
      {editHint ? (
        <Pencil className="absolute top-3 right-3 h-4 w-4 text-primary/40" />
      ) : (
        <MousePointerClick className="absolute top-3 right-3 h-4 w-4 text-primary/0 transition-colors duration-300 group-hover:text-primary/40" />
      )}

      <div className="flex items-start justify-between">
        <div className={cn('w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-105', accentBg)}>
          <span className="text-white"><Icon className="w-6 h-6" /></span>
        </div>
        {badge && (
          <span className={cn('text-xs font-bold px-2.5 py-1 rounded-full bg-white border border-primary/10 shadow-sm', accent)}>
            {badge}
          </span>
        )}
      </div>

      <div>
        {value === null ? (
          <p
            className="text-[1.7rem] font-bold tracking-tight leading-none mb-2 text-slate-300"
            title="Data untuk kartu ini belum tersedia — hubungi admin untuk mengatur sumber datanya"
          >
            &mdash;
          </p>
        ) : (
          <p className="text-[1.7rem] font-bold tracking-tight text-slate-900 leading-none mb-2">
            <AnimatedNumber value={value} />
          </p>
        )}
        <p className="text-[0.66rem] font-semibold uppercase tracking-widest text-slate-500">{title}</p>
        {value === null && (
          <p className="mt-1 text-[0.6rem] font-medium text-slate-400">Belum ada data</p>
        )}
      </div>
    </button>
  );
}

// Tren 6 bulan & Layanan Terpopuler kini pakai Highcharts (stats-charts.tsx).

// ─── Service Stats Card (agregasi informatif) ───────────────────────────────────

function ServiceCard({ pelayanan }: { pelayanan: PelayananStat }) {
  const { total, selesai, aktif, bulanIni, topJenis, trend6 } = pelayanan;

  const metrics = [
    { label: 'Bulan Ini', value: bulanIni, icon: <CalendarDays className="w-4 h-4" />, tint: 'text-primary bg-primary/10' },
    { label: 'Selesai', value: selesai, icon: <CheckCircle2 className="w-4 h-4" />, tint: 'text-success bg-success/10' },
    { label: 'Berjalan', value: aktif, icon: <Hourglass className="w-4 h-4" />, tint: 'text-[#8a7400] bg-[#faf3cf]' },
  ];

  return (
    <div className={cn(GLASS, 'js-stat relative flex flex-col h-full w-full overflow-hidden')}>
      {/* Header: total + completion */}
      <div className="flex items-center justify-between px-5 pt-5 pb-4">
        <div className="flex items-center gap-3">
          <div className={HEADER_ICON}>
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[0.62rem] font-bold uppercase tracking-widest text-primary">
              Total Pelayanan
            </p>
            <p className="text-2xl font-bold text-slate-900 leading-none mt-0.5">
              <AnimatedNumber value={total} />
            </p>
          </div>
        </div>
      </div>

      {/* 3 metrik agregat */}
      <div className="grid grid-cols-3 gap-2 px-5 pb-4">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-xl bg-white border border-[#eaedf0] p-2.5 text-center">
            <div className={cn('w-7 h-7 mx-auto rounded-lg flex items-center justify-center mb-1.5', m.tint)}>
              {m.icon}
            </div>
            <p className="text-lg font-bold text-slate-900 leading-none">{m.value.toLocaleString('id-ID')}</p>
            <p className="text-[0.6rem] font-medium text-slate-400 mt-1">{m.label}</p>
          </div>
        ))}
      </div>

      <Divider />

      {/* Tren 6 bulan */}
      <div className="px-5 pt-4 pb-3">
        <p className="text-[0.62rem] font-bold uppercase tracking-widest text-slate-400 mb-3">
          Tren Permohonan · 6 Bulan
        </p>
        <TrenChart data={trend6} />
      </div>

      <Divider />

      {/* Layanan terpopuler */}
      <div className="px-5 pt-4 pb-4 flex-1">
        <p className="text-[0.62rem] font-bold uppercase tracking-widest text-slate-400 mb-3">
          Layanan Terpopuler
        </p>
        {topJenis.length === 0 ? (
          <p className="text-xs text-slate-400 py-2">Belum ada data permohonan.</p>
        ) : (
          <TopLayananChart data={topJenis} />
        )}
      </div>

      <Divider />

      <div className="flex items-center justify-between px-5 py-3 mt-auto">
        <p className="text-xs text-slate-400">Data langsung dari sistem</p>
        <Link href="/permohonan-online" className="text-xs font-semibold text-primary hover:text-primary/80 flex items-center gap-1 transition-colors">
          Ajukan <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}

// ─── Map Card (full width, di bawah) ────────────────────────────────────────────

const WILAYAH = [
  { label: 'Kecamatan', value: '8', icon: <Building2 className="w-5 h-5" />, chip: 'bg-primary/10 text-primary' },
  { label: 'Desa / Kelurahan', value: '89', icon: <Trees className="w-5 h-5" />, chip: 'bg-emerald-50 text-emerald-600' },
];

function MapCard() {
  return (
    <div className={cn(GLASS, 'js-stat relative overflow-hidden')}>
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <div className="flex items-center gap-3">
          <div className={HEADER_ICON}>
            <MapIcon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[0.62rem] font-bold uppercase tracking-widest text-primary">
              Wilayah Administrasi
            </p>
            <p className="text-sm font-semibold text-slate-800">Lokasi Kantor Disdukcapil</p>
          </div>
        </div>
        <Link
          href="/media/peta"
          className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          Peta Lengkap <ExternalLink className="w-3 h-3" />
        </Link>
      </div>

      {/* items-stretch: peta ikut tinggi panel kanan agar sejajar */}
      <div className="flex flex-col md:flex-row items-stretch gap-4 px-4 pb-4">
        {/* Peta interaktif Leaflet — stretch mengikuti tinggi panel */}
        <div className="relative flex-1 min-h-[15rem] rounded-xl overflow-hidden ring-1 ring-primary/15 z-0">
          <OfficeMap />
        </div>

        {/* Panel info wilayah — dua tile statistik + alamat */}
        <div className="md:w-60 flex flex-col gap-3">
          <div className="grid grid-cols-2 md:grid-cols-1 gap-3 flex-1">
            {WILAYAH.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3.5 rounded-xl bg-white/90 border border-[#eaedf0] px-4 py-3.5"
              >
                <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center shrink-0', item.chip)}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 leading-none">{item.value}</p>
                  <p className="text-[0.68rem] text-slate-500 font-medium mt-1 uppercase tracking-wide">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-start gap-2 rounded-xl bg-primary/[0.05] border border-primary/[0.08] px-3.5 py-3">
            <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <p className="text-[0.72rem] text-slate-500 leading-snug">
              Jl. Ahmad Yani No.A, Indonesiana, Kota Tidore Kepulauan, Maluku Utara
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────────

// Placeholder sebelum /api/stats merespons: susunan kartu bawaan, nilai 0.
const FALLBACK: StatsData = {
  kartuDemografi: DEFAULT_KARTU.map((c) => {
    const p = warnaPreset(c.warna);
    return {
      title: c.title,
      icon: c.icon,
      kategori: c.kategori,
      kolom: c.kolom,
      accent: p.accent,
      accentBg: p.accentBg,
      badge: undefined,
      value: 0,
    };
  }),
  pelayanan: { total: 0, selesai: 0, aktif: 0, bulanIni: 0, topJenis: [], trend6: [] },
  periodeKependudukan: 'DKB Semester II 2024',
};

export default function StatsGrid() {
  const [stats, setStats] = useState<StatsData>(FALLBACK);
  const rootRef = useRef<HTMLDivElement>(null);
  const { editMode, openEditor } = useInlineEdit();
  // Label periode DKB — utamakan versi CMS (auto-refresh via refreshStaticContent
  // setelah disimpan), fallback ke nilai dari /api/stats bila belum pernah diubah.
  const dkbPeriode = useStaticContent(['beranda.dkb-periode'])['beranda.dkb-periode'] as {
    label?: string;
  };

  // Modal rincian demografi (dibuka saat kartu diklik di mode biasa).
  const [demoCard, setDemoCard] = useState<KartuDemografi | null>(null);
  // Mode edit: klik kartu → editor data Excel kategori tsb, difokuskan ke
  // KARTU yang diklik (kategori + kolom) agar preview & simpan tepat sasaran.
  const [editTarget, setEditTarget] = useState<{ kategori: string; kolom: string } | null>(null);
  // Editor template kartu (dinonaktifkan sementara):
  // const [editorIndex, setEditorIndex] = useState<number | null>(null);

  const refetchStats = useCallback(() => {
    return fetch('/api/stats')
      .then((r) => r.json())
      .then((j) => {
        if (j?.data) setStats((prev) => ({ ...prev, ...j.data }));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    let alive = true;
    fetch('/api/stats')
      .then((r) => r.json())
      .then((j) => {
        if (!alive || !j?.data) return;
        setStats((prev) => ({ ...prev, ...j.data }));
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!rootRef.current) return;
    const cards = rootRef.current.querySelectorAll('.js-stat');
    if (!cards.length) return;
    animate(cards, {
      opacity: [0, 1],
      translateY: [22, 0],
      scale: [0.97, 1],
      delay: stagger(80),
      duration: 620,
      ease: 'out(3)',
    });
  }, []);

  const cards = stats.kartuDemografi;

  return (
    <div className="space-y-4" ref={rootRef}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[0.66rem] font-bold uppercase tracking-widest text-slate-400 mb-1">
            Data Kependudukan
          </p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">Statistik Demografi</h2>
        </div>
        {editMode ? (
          <button
            type="button"
            onClick={() => openEditor('beranda.dkb-periode')}
            title="Ubah label periode data DKB"
            className="flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 border border-dashed border-primary/40 px-3 py-1.5 rounded-full shrink-0 hover:bg-primary/20 transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" />
            {dkbPeriode?.label || stats.periodeKependudukan}
          </button>
        ) : (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full shrink-0">
            <CalendarClock className="w-3.5 h-3.5" />
            {dkbPeriode?.label || stats.periodeKependudukan}
          </span>
        )}
      </div>

      {/* Info: mode biasa → klik untuk rincian; mode edit → klik untuk atur kartu. */}
      <p className="flex items-center gap-1.5 text-xs text-slate-400">
        {editMode ? (
          <span className="inline-flex items-center gap-1 font-semibold text-primary">
            <Pencil className="h-3.5 w-3.5" /> Mode edit aktif — klik kartu untuk mengubah datanya (import Excel / isi manual).
          </span>
        ) : (
          <>
            <MousePointerClick className="h-3.5 w-3.5" />
            Klik kartu untuk melihat rincian per kecamatan &amp; desa.
          </>
        )}
      </p>

      {/* Baris atas: kiri = 6 kartu demografi, kanan = pelayanan (tinggi sama) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 items-stretch">
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 lg:grid-rows-3 gap-3">
          {cards.map((card, i) => (
            <StatCard
              key={`${card.title}-${i}`}
              {...card}
              editHint={editMode}
              onClick={() =>
                editMode
                  ? setEditTarget({ kategori: card.kategori, kolom: card.kolom })
                  : setDemoCard(card)
              }
            />
          ))}
        </div>

        <div className="lg:col-span-5 flex">
          <ServiceCard pelayanan={stats.pelayanan} />
        </div>
      </div>

      {/* Peta full width di bawah */}
      <MapCard />

      {/* Modal rincian demografi terfokus (klik kartu di mode biasa). */}
      <Dialog open={!!demoCard} onOpenChange={(o) => !o && setDemoCard(null)}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{demoCard?.title ?? 'Data Demografi'}</DialogTitle>
            <DialogDescription>
              Angka per kecamatan di Kota Tidore Kepulauan — klik “Desa/Kelurahan” untuk rincian tiap desa.
            </DialogDescription>
          </DialogHeader>
          {demoCard && (
            <DemografiMetric
              kategori={demoCard.kategori}
              kolom={demoCard.kolom}
              title={demoCard.title}
              onDataChanged={refetchStats}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Mode edit: klik kartu → editor data Excel, difokuskan ke kartu tsb. */}
      {editTarget && (
        <DemografiEditor
          kategori={editTarget.kategori}
          label={getDemografiKategori(editTarget.kategori)?.label ?? editTarget.kategori}
          kartuKolom={editTarget.kolom}
          open
          onOpenChange={(o) => !o && setEditTarget(null)}
          onSaved={refetchStats}
        />
      )}

      {/* Editor template kartu (judul/ikon/warna/sumber data) — DINONAKTIFKAN
          sementara. Buka komentar (beserta import & state editorIndex) untuk
          mengaktifkan kembali.
      <StatistikKartuEditor
        open={editorIndex !== null}
        initialIndex={editorIndex ?? undefined}
        onClose={() => setEditorIndex(null)}
        onSaved={refetchStats}
      />
      */}
    </div>
  );
}
