'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import {
  CheckSquare,
  ChevronRight,
  Network,
  Pencil,
  Quote,
  Target,
  Users,
} from 'lucide-react';
import { Footer } from '@/components/shared/footer';
import { Button } from '@/components/ui/button';
import { useInlineEdit } from '@/components/konten/inline-edit';
import { useStaticContent } from '@/lib/use-static-content';
import { getIcon } from '@/lib/icon-map';
import { ProfilGambar } from '@/components/shared/profil-gambar';

/**
 * Konten tab "Tentang PPID" yang datanya DISATUKAN dengan beranda (seksi Profil
 * Instansi). Empat tab — Visi & Misi, Maklumat, Tugas & Fungsi, Struktur —
 * membaca kunci StaticContent `profil.*` yang sama dengan beranda, sehingga
 * apa pun yang diedit di sini otomatis tampil di beranda (dan sebaliknya).
 *
 * Struktur organisasi memakai bagan + editor yang sama persis dengan beranda
 * (components/landingpage/struktur-chart & components/konten/struktur-editor),
 * jadi gaya bagannya benar-benar terkoneksi.
 */

// react-organizational-chart menyentuh `document` saat import → client-only.
const StrukturChart = dynamic(
  () => import('@/components/landingpage/struktur-chart').then((m) => m.StrukturChart),
  {
    ssr: false,
    loading: () => (
      <p className="py-10 text-center text-sm text-slate-400">Memuat bagan struktur…</p>
    ),
  },
);
const StrukturEditor = dynamic(
  () => import('@/components/konten/struktur-editor').then((m) => m.StrukturEditor),
  { ssr: false },
);

export type ProfilJenis = 'visi-misi' | 'maklumat' | 'tugas' | 'struktur';

const KUNCI_PROFIL: Record<ProfilJenis, string> = {
  'visi-misi': 'profil.visi-misi',
  maklumat: 'profil.maklumat',
  tugas: 'profil.tugas',
  struktur: 'profil.struktur',
};

const IKON_JENIS: Record<ProfilJenis, React.ElementType> = {
  'visi-misi': Target,
  maklumat: Users,
  tugas: CheckSquare,
  struktur: Network,
};

const LABEL_BERANDA: Record<ProfilJenis, string> = {
  'visi-misi': 'Visi & Misi',
  maklumat: 'Maklumat',
  tugas: 'Tugas & Fungsi',
  struktur: 'Struktur',
};

// ─── Panel presentational (menerima data mentah dari StaticContent) ───────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-3 block text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">
      {children}
    </span>
  );
}

function Divider({ label }: { label?: string }) {
  return (
    <div className="my-2 flex items-center gap-3">
      <div className="h-px flex-1 bg-slate-100" />
      {label && <SectionLabel>{label}</SectionLabel>}
      <div className="h-px flex-1 bg-slate-100" />
    </div>
  );
}

function VisiMisiPanel({ data }: { data: { visi?: string; misi?: string[] } }) {
  const misi = Array.isArray(data?.misi) ? data.misi : [];
  return (
    <div className="space-y-10">
      <div className="animate-in fade-in slide-in-from-bottom-2 border-l-2 border-primary/30 pl-6 duration-500">
        <SectionLabel>Visi</SectionLabel>
        <p className="text-xl font-light leading-relaxed text-slate-800 md:text-2xl">
          {data?.visi}
        </p>
      </div>
      <div>
        <Divider label="Misi" />
        <div className="mt-4 space-y-2">
          {misi.map((item, i) => (
            <div
              key={i}
              className="group flex items-start gap-4 rounded-xl border border-transparent p-4 transition-all duration-300 hover:border-slate-100 hover:bg-slate-50"
            >
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-500 transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                {i + 1}
              </span>
              <p className="pt-0.5 text-sm leading-relaxed text-slate-600">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MaklumatPanel({
  data,
}: {
  data: { janji?: { icon?: string; title?: string; desc?: string }[]; standar?: string };
}) {
  const janji = Array.isArray(data?.janji) ? data.janji : [];
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {janji.map((item, i) => {
          const Icon = getIcon(item.icon ?? '');
          return (
            <div
              key={i}
              className="group flex flex-col items-center rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/[0.09] to-primary/[0.03] p-5 text-center shadow-[0_4px_20px_rgba(202,138,4,0.06)] transition-all duration-300 hover:-translate-y-1 hover:from-primary/[0.13] hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/10 bg-white text-primary shadow-sm transition-all duration-300 group-hover:scale-110">
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-sm font-semibold text-slate-800">{item.title}</p>
              <p className="mt-0.5 text-xs text-slate-500">{item.desc}</p>
            </div>
          );
        })}
      </div>
      {data?.standar && (
        <div
          className="relative overflow-hidden rounded-2xl p-7 text-white"
          style={{ background: 'linear-gradient(135deg, #495E57 0%, #3a4b45 100%)' }}
        >
          <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
          <Quote className="mb-3 h-7 w-7 text-white/40" />
          <p className="relative z-10 text-base font-light leading-relaxed text-white/90">
            {data.standar}
          </p>
        </div>
      )}
    </div>
  );
}

function TugasPanel({ data }: { data: { utama?: string; fungsi?: string[] } }) {
  const fungsi = Array.isArray(data?.fungsi) ? data.fungsi : [];
  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-primary/10 bg-primary/5 p-5">
        <SectionLabel>Tugas Pokok</SectionLabel>
        <p className="text-base font-light leading-relaxed text-slate-800">{data?.utama}</p>
      </div>
      <div>
        <SectionLabel>Fungsi</SectionLabel>
        <div className="space-y-1">
          {fungsi.map((item, i) => (
            <div
              key={i}
              className="group flex items-center gap-4 rounded-xl border border-transparent p-3.5 transition-all duration-300 hover:border-slate-100 hover:bg-slate-50"
            >
              <ChevronRight className="h-4 w-4 flex-shrink-0 text-slate-300 transition-colors group-hover:text-primary" />
              <span className="text-sm text-slate-700">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Wrapper terhubung StaticContent + editor ─────────────────────────────────

export function ProfilTerhubung({
  jenis,
  judul,
  deskripsi,
}: {
  jenis: ProfilJenis;
  judul: string;
  deskripsi: string;
}) {
  const kunci = KUNCI_PROFIL[jenis];
  const data = useStaticContent([kunci])[kunci] as Record<string, unknown>;
  const { editMode, openEditor } = useInlineEdit();
  const [strukturOpen, setStrukturOpen] = useState(false);
  const Ikon = IKON_JENIS[jenis];

  return (
    <div className="relative flex min-h-screen flex-col bg-slate-50/30">
      <div className="container mx-auto flex-1 px-4 py-12 md:px-8 lg:px-16 lg:py-16">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
              <Ikon className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
                {judul}
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-slate-500">{deskripsi}</p>
            </div>
          </div>
          {editMode && (
            <Button
              onClick={() =>
                jenis === 'struktur' ? setStrukturOpen(true) : openEditor(kunci)
              }
            >
              <Pencil className="mr-1.5 h-4 w-4" /> Edit {LABEL_BERANDA[jenis]}
            </Button>
          )}
        </div>

        {editMode && (
          <p className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
            Data ini otomatis sama dengan tab “{LABEL_BERANDA[jenis]}” di beranda
            (Profil Instansi). Diedit di sini atau di beranda, hasilnya sama.
          </p>
        )}

        <div className="animate-in fade-in slide-in-from-bottom-2 rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm duration-500 md:p-8">
          {jenis === 'struktur' ? (
            <StrukturChart data={data} />
          ) : data?.mode === 'gambar' && data?.gambar ? (
            // Mode gambar dipilih admin (toggle) → tampilkan gambar, bukan teks.
            <ProfilGambar src={String(data.gambar)} alt={LABEL_BERANDA[jenis]} />
          ) : (
            <>
              {jenis === 'visi-misi' && <VisiMisiPanel data={data} />}
              {jenis === 'maklumat' && <MaklumatPanel data={data} />}
              {jenis === 'tugas' && <TugasPanel data={data} />}
            </>
          )}
        </div>
      </div>

      {jenis === 'struktur' && (
        <StrukturEditor open={strukturOpen} onOpenChange={setStrukturOpen} />
      )}
      <Footer />
    </div>
  );
}
