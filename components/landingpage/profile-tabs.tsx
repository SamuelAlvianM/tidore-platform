'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useInView, LayoutGroup, easeInOut } from 'framer-motion';
import Image from 'next/image';
import {
  Target,
  FileText,
  Users,
  CheckSquare,
  Network,
  ChevronRight,
  Quote,
  Minus,
  Pencil,
  Contact,
  History,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import { useStaticContent } from '@/lib/use-static-content';
import { useInlineEdit } from '@/components/konten/inline-edit';
import { getIcon } from '@/lib/icon-map';
import { ProfilGambar } from '@/components/shared/profil-gambar';

// react-organizational-chart menyentuh `document` saat import → hanya di client.
const StrukturChart = dynamic(
  () => import('@/components/landingpage/struktur-chart').then((m) => m.StrukturChart),
  {
    ssr: false,
    loading: () => (
      <p className="text-sm text-slate-400 py-10 text-center">Memuat bagan struktur…</p>
    ),
  },
);
const StrukturEditor = dynamic(
  () => import('@/components/konten/struktur-editor').then((m) => m.StrukturEditor),
  { ssr: false },
);

// ─── Types ────────────────────────────────────────────────────────────────────

interface TabConfig {
  id: string;
  label: string;
  shortLabel: string;
  icon: React.ReactNode;
  description: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const TABS: TabConfig[] = [
  { id: 'visi-misi',  label: 'Visi & Misi',    shortLabel: 'Visi',     icon: <Target className="w-4 h-4" />,      description: 'Arah dan komitmen organisasi' },
  { id: 'motto',      label: 'Motto & Tujuan',  shortLabel: 'Motto',    icon: <FileText className="w-4 h-4" />,    description: 'Nilai dan sasaran strategis' },
  { id: 'maklumat',   label: 'Maklumat',         shortLabel: 'Maklumat', icon: <Users className="w-4 h-4" />,       description: 'Janji pelayanan publik' },
  { id: 'tugas',      label: 'Tugas & Fungsi',   shortLabel: 'Tugas',    icon: <CheckSquare className="w-4 h-4" />, description: 'Wewenang dan tanggung jawab' },
  { id: 'struktur',   label: 'Struktur',          shortLabel: 'Struktur', icon: <Network className="w-4 h-4" />,     description: 'Susunan organisasi' },
  { id: 'profil-pejabat', label: 'Profil Pejabat', shortLabel: 'Pejabat', icon: <Contact className="w-4 h-4" />,     description: 'Kepala Dinas Kependudukan & Pencatatan Sipil' },
  { id: 'sejarah',        label: 'Sejarah',        shortLabel: 'Sejarah', icon: <History className="w-4 h-4" />,     description: 'Perjalanan Disdukcapil Tidore Kepulauan' },
];

// Tab teks yang punya toggle "Tulis Manual | Gambar" di editornya: bila admin
// memilih mode gambar (konten.mode === 'gambar') dan mengunggah gambar, tab
// menampilkan gambar itu menggantikan teksnya.
// (Struktur punya mekanisme mode gambarnya sendiri lewat StrukturChart.)
const GAMBAR_OVERRIDE_TABS = new Set(['visi-misi', 'maklumat', 'tugas']);

/**
 * Tab yang isinya SATU gambar utuh (materi resmi dinas), bukan data terstruktur.
 * Gambarnya diunggah admin lewat Mode Edit (blok `profil.<id>`, field `gambar`)
 * — TIDAK lagi dipaku ke berkas di public/. Materi lama berasal dari dinas lain
 * (Kab. Tana Tidung) dan sudah dilepas, jadi defaultnya kosong.
 * Selama kosong, tab disembunyikan dari pengunjung dan hanya tampak bagi admin
 * dalam Mode Edit supaya ada jalan untuk mengunggahnya.
 */
const TAB_GAMBAR: Record<string, { alt: string }> = {
  'profil-pejabat': {
    alt: 'Profil Singkat Kepala Dinas Kependudukan dan Pencatatan Sipil Kota Tidore Kepulauan',
  },
  sejarah: {
    alt: 'Sejarah Disdukcapil Kota Tidore Kepulauan',
  },
};

const CONTENT: Record<string, any> = {
  'visi-misi': {
    visi: 'Terwujudnya Pusat Pelayanan Data Base Kependudukan yang Akurat dan Aktual Berbasis Sistem Informasi Administrasi Kependudukan',
    misi: [
      'Meningkatkan profesionalitas, efisiensi dan efektifitas organisasi',
      'Mengoptimalkan dan meningkatkan pengelolaan administrasi kependudukan',
      'Meningkatkan kualitas kinerja pelayanan administrasi kependudukan secara prima',
    ],
  },
  'motto': {
    motto: 'Profesional, Integritas, Prima',
    tujuan: [
      'Memberikan pelayanan kependudukan yang cepat, tepat, dan akurat',
      'Mewujudkan database kependudukan yang berkualitas dan terintegrasi',
      'Meningkatkan kepuasan masyarakat melalui pelayanan berbasis teknologi',
    ],
    sasaran: [
      'Tersedianya data kependudukan yang akurat dan mutakhir',
      'Terwujudnya pelayanan administrasi kependudukan yang prima',
      'Terbangunnya sistem informasi kependudukan yang terintegrasi',
    ],
  },
  'maklumat': {
    janji: [
      { title: 'Cepat',  desc: '15 menit',    icon: 'Clock' },
      { title: 'Akurat', desc: 'Data valid',   icon: 'ShieldCheck' },
      { title: 'Gratis', desc: 'Tanpa biaya',  icon: 'Gift' },
      { title: 'Ramah',  desc: 'Sikap prima',  icon: 'Smile' },
    ],
    standar: 'Kami berkomitmen memberikan pelayanan terbaik sesuai Standar Pelayanan Publik',
  },
  'tugas': {
    utama: 'Melaksanakan urusan pemerintahan bidang kependudukan dan pencatatan sipil',
    fungsi: [
      'Penyelenggaraan administrasi kependudukan',
      'Pelayanan pencatatan sipil',
      'Pengelolaan data dan informasi kependudukan',
      'Pelaksanaan identifikasi kependudukan',
      'Fasilitasi perpindahan penduduk',
    ],
  },
  'struktur': {
    // Fallback terakhir bila API tak menjawab; bentuknya mengikuti StrukturData
    // (mode + organisasi ber-parent & ber-tingkat). Umumnya tak terpakai karena
    // /api/static-content selalu mengembalikan default registry.
    mode: 'bagan',
    organisasi: [
      { jabatan: 'Kepala Dinas', nama: '-', parent: '', tingkat: 'pimpinan' },
      { jabatan: 'Sekretaris', nama: '-', parent: 'Kepala Dinas', tingkat: 'kabid' },
      { jabatan: 'Kabid Pelayanan Pendaftaran Penduduk', nama: '-', parent: 'Kepala Dinas', tingkat: 'kabid' },
      { jabatan: 'Kabid Pelayanan Pencatatan Sipil', nama: '-', parent: 'Kepala Dinas', tingkat: 'kabid' },
      { jabatan: 'Kabid Pengelolaan Informasi Administrasi Kependudukan', nama: '-', parent: 'Kepala Dinas', tingkat: 'kabid' },
    ],
  },
};

// ─── Animation presets ────────────────────────────────────────────────────────

const spring = { type: 'spring' as const, stiffness: 320, damping: 30 };
const easeCustom = [0.22, 1, 0.36, 1] as const;
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: easeCustom },
});

// ─── Shared sub-components ────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 block mb-3">
      {children}
    </span>
  );
}

function Divider({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 my-2">
      <div className="h-px flex-1 bg-slate-100" />
      {label && <SectionLabel>{label}</SectionLabel>}
      <div className="h-px flex-1 bg-slate-100" />
    </div>
  );
}

function NumberedItem({ index, children }: { index: number; children: string }) {
  return (
    <motion.div
      {...fadeUp(0.35 + index * 0.08)}
      className="group flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all duration-300"
    >
      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-semibold group-hover:bg-primary group-hover:text-white transition-all duration-300">
        {index + 1}
      </span>
      <p className="text-slate-600 leading-relaxed text-sm pt-0.5">{children}</p>
    </motion.div>
  );
}

function BulletItem({ index, children }: { index: number; children: string }) {
  return (
    <motion.div
      {...fadeUp(0.3 + index * 0.07)}
      className="group flex items-start gap-3 text-slate-600 text-sm leading-relaxed"
    >
      <ChevronRight className="w-4 h-4 text-slate-300 mt-0.5 flex-shrink-0 group-hover:text-primary transition-colors" />
      {children}
    </motion.div>
  );
}

// ─── Tab content panels ───────────────────────────────────────────────────────

function VisiMisiPanel({ data }: { data: typeof CONTENT['visi-misi'] }) {
  return (
    <div className="space-y-10">
      {/* Visi */}
      <motion.div {...fadeUp(0.15)} className="relative pl-6 border-l-2 border-primary/30">
        <SectionLabel>Visi</SectionLabel>
        <p className="text-xl md:text-2xl font-light text-slate-800 leading-relaxed">
          {data.visi}
        </p>
      </motion.div>

      {/* Misi */}
      <motion.div {...fadeUp(0.25)}>
        <Divider label="Misi" />
        <div className="space-y-2 mt-4">
          {data.misi.map((item: string, i: number) => (
            <NumberedItem key={i} index={i}>{item}</NumberedItem>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function MottoPanel({ data }: { data: typeof CONTENT['motto'] }) {
  const words = data.motto.split(', ');
  return (
    <div className="space-y-10">
      {/* Motto hero */}
      <motion.div {...fadeUp(0.15)} className="text-center py-6">
        <SectionLabel>Motto</SectionLabel>
        <h4 className="text-3xl md:text-4xl font-light text-slate-900 tracking-wide">
          {words.map((word: string, i: number) => (
            <span key={i}>
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
                {word}
              </span>
              {i < words.length - 1 && <span className="text-slate-300 mx-3">/</span>}
            </span>
          ))}
        </h4>
      </motion.div>

      {/* Two columns */}
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div {...fadeUp(0.3)}>
          <SectionLabel>Tujuan</SectionLabel>
          <div className="space-y-3">
            {data.tujuan.map((item: string, i: number) => (
              <BulletItem key={i} index={i}>{item}</BulletItem>
            ))}
          </div>
        </motion.div>
        <motion.div {...fadeUp(0.38)}>
          <SectionLabel>Sasaran</SectionLabel>
          <div className="space-y-3">
            {data.sasaran.map((item: string, i: number) => (
              <BulletItem key={i} index={i}>{item}</BulletItem>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function MaklumatPanel({ data }: { data: typeof CONTENT['maklumat'] }) {
  return (
    <div className="space-y-8">
      {/* Promise cards — biru glassy seperti kartu statistik */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {data.janji.map((item: any, i: number) => {
          const Icon = getIcon(item.icon);
          return (
            <motion.div
              key={i}
              {...fadeUp(0.15 + i * 0.08)}
              whileHover={{ y: -4 }}
              className="group flex flex-col items-center text-center p-5 rounded-2xl bg-gradient-to-br from-primary/[0.09] to-primary/[0.03] border border-primary/15 shadow-[0_4px_20px_rgba(202,138,4,0.06)] hover:from-primary/[0.13] hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-2xl bg-white shadow-sm border border-primary/10 flex items-center justify-center text-primary mb-3 group-hover:scale-110 group-hover:shadow-primary/20 transition-all duration-300">
                <Icon className="w-5 h-5" />
              </div>
              <p className="font-semibold text-slate-800 text-sm">{item.title}</p>
              <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Commitment statement — biru glassy seperti header navbar */}
      <motion.div
        {...fadeUp(0.55)}
        className="relative p-7 rounded-2xl text-white overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #495E57 0%, #3a4b45 100%)' }}
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <Quote className="w-7 h-7 text-white/40 mb-3" />
        <p className="text-base font-light leading-relaxed relative z-10 text-white/90">
          {data.standar}
        </p>
      </motion.div>
    </div>
  );
}

function TugasPanel({ data }: { data: typeof CONTENT['tugas'] }) {
  return (
    <div className="space-y-8">
      <motion.div
        {...fadeUp(0.15)}
        className="p-5 rounded-2xl bg-primary/5 border border-primary/10"
      >
        <SectionLabel>Tugas Pokok</SectionLabel>
        <p className="text-base text-slate-800 font-light leading-relaxed">{data.utama}</p>
      </motion.div>

      <motion.div {...fadeUp(0.25)}>
        <SectionLabel>Fungsi</SectionLabel>
        <div className="space-y-1">
          {data.fungsi.map((item: string, i: number) => (
            <motion.div
              key={i}
              {...fadeUp(0.3 + i * 0.07)}
              className="group flex items-center gap-4 p-3.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all duration-300"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-primary flex-shrink-0 transition-colors" />
              <span className="text-slate-700 text-sm">{item}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ── Bagan struktur organisasi (dimuat client-only via dynamic import) ──

function StrukturPanel({ data }: { data: typeof CONTENT['struktur'] }) {
  return <StrukturChart data={data} />;
}

/**
 * Panel bergambar generik — dipakai Profil Pejabat & Sejarah.
 * `src` berasal dari unggahan admin (blok `profil.<tabId>`, field `gambar`).
 * Dimensinya tak diketahui di muka, jadi memakai ProfilGambar (<img> polos),
 * sama seperti tab lain yang memakai mode gambar.
 */
function GambarPanel({ tabId, src }: { tabId: string; src: string }) {
  const g = TAB_GAMBAR[tabId];
  if (!g) return null;

  if (!src) {
    // Hanya terlihat admin dalam Mode Edit (tab disembunyikan dari pengunjung
    // selama kosong) — petunjuk agar materi resminya diunggah.
    return (
      <motion.div
        {...fadeUp(0.15)}
        className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/60 px-6 py-12 text-center"
      >
        <p className="text-sm font-medium text-slate-500">
          Belum ada gambar untuk tab ini.
        </p>
        <p className="mx-auto mt-1.5 max-w-md text-xs leading-relaxed text-slate-400">
          Klik tombol <b>Edit</b> di pojok kanan atas untuk mengunggah materi
          resmi Disdukcapil Tidore Kepulauan. Selama kosong, tab ini tidak tampil
          bagi pengunjung.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div {...fadeUp(0.15)}>
      <ProfilGambar src={src} alt={g.alt} />
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ProfileTabs() {
  const [activeTab, setActiveTab] = useState('visi-misi');
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  // Isi tab dari konten editable (dashboard → Konten Halaman), fallback default registry.
  const cms = useStaticContent([
    'profil.visi-misi',
    'profil.motto',
    'profil.maklumat',
    'profil.tugas',
    'profil.struktur',
    'profil.profil-pejabat',
    'profil.sejarah',
  ]);
  /** Gambar unggahan admin untuk tab bergambar; '' = belum diunggah. */
  const gambarTab: Record<string, string> = {
    'profil-pejabat': String(
      (cms['profil.profil-pejabat'] as { gambar?: string })?.gambar ?? '',
    ),
    sejarah: String((cms['profil.sejarah'] as { gambar?: string })?.gambar ?? ''),
  };
  const content: Record<string, any> = {
    'visi-misi': cms['profil.visi-misi'],
    motto: cms['profil.motto'],
    maklumat: cms['profil.maklumat'],
    tugas: cms['profil.tugas'],
    struktur: cms['profil.struktur'],
  };

  const activeContent = content[activeTab] ?? CONTENT[activeTab];
  const { editMode, openEditor } = useInlineEdit();
  const [strukturEditorOpen, setStrukturEditorOpen] = useState(false);
  // Semua tab kini punya editor CMS — termasuk tab bergambar (blok profil.<id>).
  const bisaEdit = true;

  // Tab bergambar yang belum diisi dinas disembunyikan dari pengunjung (daripada
  // memamerkan panel kosong), tapi TETAP tampak bagi admin dalam Mode Edit —
  // kalau ikut disembunyikan, tak ada jalan untuk mengunggah gambarnya.
  const tabTampil = useMemo(
    () => TABS.filter((t) => !(t.id in TAB_GAMBAR) || editMode || !!gambarTab[t.id]),
    // Bergantung pada NILAI gambarnya, bukan identitas objek `gambarTab` yang
    // dibentuk ulang tiap render (kalau tidak, memo & efek ikut terpicu terus).
    [editMode, gambarTab['profil-pejabat'], gambarTab.sejarah],
  );

  // Bila tab aktif baru saja tersembunyi (mis. admin menutup Mode Edit), pindah
  // ke tab pertama agar tidak menampilkan panel yang tak ada tombolnya.
  useEffect(() => {
    if (!tabTampil.some((t) => t.id === activeTab)) {
      setActiveTab(tabTampil[0]?.id ?? 'visi-misi');
    }
  }, [tabTampil, activeTab]);

  const activeTabConfig = TABS.find((t) => t.id === activeTab)!;

  return (
    <section ref={containerRef} className="relative py-14 overflow-hidden bg-white border-t border-slate-100">
      {activeTab === 'struktur' && (
        <StrukturEditor open={strukturEditorOpen} onOpenChange={setStrukturEditorOpen} />
      )}
      {/* Subtle ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-slate-50/80 to-transparent" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10 max-w-6xl">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 flex flex-col items-center text-center"
        >
          <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 mb-2">
            Profil Instansi
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 tracking-tight">
            Dinas Kependudukan & Pencatatan Sipil
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 w-16 h-0.5 bg-gradient-to-r from-primary to-primary/60 rounded-full origin-left"
          />
        </motion.div>

        <LayoutGroup>
          {/* ── Tab bar ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.55 }}
            className="flex flex-wrap justify-center gap-1.5 mb-6 p-1.5 bg-slate-100/70 backdrop-blur-md rounded-2xl max-w-fit mx-auto border border-slate-200/60"
          >
            {tabTampil.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200',
                    isActive ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700',
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBg"
                      className="absolute inset-0 bg-white rounded-xl shadow-sm border border-slate-200/80"
                      transition={spring}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <span className={cn('transition-colors duration-200', isActive ? 'text-primary' : 'text-slate-400')}>
                      {tab.icon}
                    </span>
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.shortLabel}</span>
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* ── Content card ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.99 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl shadow-[0_8px_40px_rgba(202,138,4,0.08)] border border-primary/15 bg-gradient-to-br from-primary/[0.06] to-primary/[0.02] overflow-hidden"
            >
              {/* Top accent line */}
              <div className="h-0.5 bg-gradient-to-r from-primary via-primary/70 to-primary/40" />

              <div className="p-7 md:p-10">
                {/* Card header */}
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
                  <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600">
                    {activeTabConfig.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{activeTabConfig.label}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{activeTabConfig.description}</p>
                  </div>
                  {/* Tombol edit duduk DI DALAM kartu, sebaris dengan judul panel.
                      Sebelumnya ia `absolute` milik <section> sehingga mendarat di
                      pojok halaman, jauh dari kotak yang sedang diedit. */}
                  {editMode && bisaEdit && (
                    <button
                      onClick={() =>
                        activeTab === 'struktur'
                          ? setStrukturEditorOpen(true)
                          : openEditor(`profil.${activeTab}`)
                      }
                      className="ml-auto shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white shadow-lg hover:bg-primary/90"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit {activeTabConfig.label}
                    </button>
                  )}
                </div>

                {/* Panel content */}
                <div className="min-h-[260px]">
                  {GAMBAR_OVERRIDE_TABS.has(activeTab) &&
                  activeContent?.mode === 'gambar' &&
                  activeContent?.gambar ? (
                    <ProfilGambar src={activeContent.gambar} alt={activeTabConfig.label} />
                  ) : (
                    <>
                      {activeTab === 'visi-misi'  && <VisiMisiPanel  data={activeContent} />}
                      {activeTab === 'motto'       && <MottoPanel     data={activeContent} />}
                      {activeTab === 'maklumat'    && <MaklumatPanel  data={activeContent} />}
                      {activeTab === 'tugas'       && <TugasPanel     data={activeContent} />}
                      {activeTab === 'struktur'    && <StrukturPanel  data={activeContent} />}
                      {activeTab === 'profil-pejabat' && <GambarPanel tabId={activeTab} src={gambarTab[activeTab]} />}
                      {activeTab === 'sejarah'        && <GambarPanel tabId={activeTab} src={gambarTab[activeTab]} />}
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </section>
  );
}