'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  Image as ImageIcon,
  Table as TableIcon,
  LayoutGrid,
  Loader2,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useInlineEdit } from '@/components/konten/inline-edit';
import { useStaticContent, refreshStaticContent } from '@/lib/use-static-content';
import type { PpidTabMode } from '@/lib/static-content-registry';

const MODE: { nilai: PpidTabMode; label: string; ikon: React.ElementType; ket: string }[] = [
  { nilai: 'gambar', label: 'Gambar', ikon: ImageIcon, ket: 'Galeri gambar' },
  { nilai: 'tabel', label: 'Tabel', ikon: TableIcon, ket: 'Tabel berkas/dokumen' },
  { nilai: 'campur', label: 'Campur', ikon: LayoutGrid, ket: 'Gambar + slider ke dokumen' },
];

/**
 * Pemilih mode tampilan tab PPID (Gambar / Tabel / Campur) — hanya untuk admin
 * di mode edit. Menyimpan pilihan ke StaticContent lalu me-refresh halaman
 * (server component) agar konten yang sesuai mode langsung dirender.
 */
export function PpidModeSelector({ kunci }: { kunci: string }) {
  const { editMode } = useInlineEdit();
  const router = useRouter();
  const data = useStaticContent([kunci])[kunci] as Record<string, unknown>;
  const mode = (data?.mode as PpidTabMode) ?? 'tabel';
  const sembunyikan = !!data?.sembunyikanKonten;
  const [sibuk, setSibuk] = useState<string | null>(null);

  if (!editMode) return null;

  // Simpan sebagian konfigurasi tab lalu segarkan halaman (server component).
  const simpan = async (patch: Record<string, unknown>, tanda: string) => {
    setSibuk(tanda);
    try {
      const res = await fetch('/api/admin/static-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kunci, konten: { ...data, ...patch } }),
      });
      const json = await res.json();
      if (json.error?.length) {
        toast.error(json.error[0]);
        return;
      }
      refreshStaticContent();
      router.refresh();
    } catch {
      toast.error('Gagal menyimpan, coba lagi.');
    } finally {
      setSibuk(null);
    }
  };

  const ganti = (m: PpidTabMode) => {
    if (m !== mode) simpan({ mode: m }, m);
  };

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16">
      <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 p-2">
        <span className="px-1.5 text-xs font-semibold text-primary">Mode tampilan</span>
        {MODE.map((m) => {
          const aktif = mode === m.nilai;
          const Ikon = m.ikon;
          return (
            <button
              key={m.nilai}
              type="button"
              title={m.ket}
              onClick={() => ganti(m.nilai)}
              disabled={sibuk !== null}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                aktif
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              {sibuk === m.nilai ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Ikon className="h-4 w-4" />
              )}
              {m.label}
            </button>
          );
        })}

        {/* Mode Gambar: sembunyikan kartu teks agar hanya gambar yang tampil. */}
        {mode === 'gambar' && (
          <button
            type="button"
            onClick={() => simpan({ sembunyikanKonten: !sembunyikan }, 'hide')}
            disabled={sibuk !== null}
            title={
              sembunyikan
                ? 'Tampilkan kembali kartu teks'
                : 'Sembunyikan kartu teks — hanya gambar yang tampil'
            }
            className={`ml-auto inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              sembunyikan
                ? 'bg-[#495E57] text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            {sibuk === 'hide' ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : sembunyikan ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
            {sembunyikan ? 'Tampilkan kontainer' : 'Sembunyikan kontainer'}
          </button>
        )}
      </div>
    </div>
  );
}
