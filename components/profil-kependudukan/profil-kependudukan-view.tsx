'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Footer } from '@/components/shared/footer';
import { EditableBlock, useInlineEdit } from '@/components/konten/inline-edit';
import { TambahDokumen, type InfoBerkas } from '@/components/shared/info-page';
import { useStaticContent } from '@/lib/use-static-content';
import { useMediaQuery } from '@/lib/use-media-query';
import { PROFIL_KEPENDUDUKAN_KUNCI } from '@/lib/static-content-registry';
import { cn } from '@/lib/utils';
import { BookOpen, Download, ExternalLink, FileText, Trash2 } from 'lucide-react';

/**
 * Halaman Profil Kependudukan: pemilih terbitan (per tahun) + penampil PDF.
 *
 * Isinya BUKAN teks yang diketik ulang — buku profil terbit sebagai PDF resmi
 * dinas, jadi yang ditampilkan berkas aslinya. Yang bisa diedit admin:
 * teks pembungkus (blok konten `profil-kependudukan.halaman`) dan daftar
 * bukunya sendiri (unggah/hapus dokumen kategori BUKU_PROFIL) — keduanya lewat
 * Mode Edit, tanpa menyentuh kode.
 */

/** Tahun terbitan dari judul dokumen ("… Tahun 2023" → 2023), untuk urutan. */
function tahunDari(judul: string): number | null {
  const cocok = judul.match(/(19|20)\d{2}/g);
  if (!cocok) return null;
  // Judul bisa memuat lebih dari satu tahun ("Profil 2023 data 2019-2023") —
  // yang dipakai angka terbesar, yaitu tahun terbitannya.
  return Math.max(...cocok.map(Number));
}

export function ProfilKependudukanView({ berkas }: { berkas: InfoBerkas[] }) {
  const { editMode } = useInlineEdit();
  const teks = useStaticContent([PROFIL_KEPENDUDUKAN_KUNCI])[
    PROFIL_KEPENDUDUKAN_KUNCI
  ] as { judul?: string; intro?: string; sumber?: string };

  const [items, setItems] = useState<InfoBerkas[]>(berkas);
  useEffect(() => setItems(berkas), [berkas]);

  const daftar = useMemo(
    () =>
      [...items].sort((a, b) => {
        const ta = tahunDari(a.judul);
        const tb = tahunDari(b.judul);
        if (ta !== null && tb !== null && ta !== tb) return tb - ta;
        if (ta !== null && tb === null) return -1;
        if (ta === null && tb !== null) return 1;
        return +new Date(b.createdAt) - +new Date(a.createdAt);
      }),
    [items],
  );

  const [aktifId, setAktifId] = useState<number | null>(null);
  // Terbitan terbaru terpilih otomatis; kalau yang terpilih dihapus, jatuh ke
  // terbitan berikutnya alih-alih menyisakan penampil kosong.
  useEffect(() => {
    if (daftar.length === 0) {
      setAktifId(null);
      return;
    }
    setAktifId((id) => (id && daftar.some((d) => d.id === id) ? id : daftar[0].id));
  }, [daftar]);

  const aktif = daftar.find((d) => d.id === aktifId) ?? null;

  // Peramban ponsel umumnya tidak menggambar PDF di dalam iframe (hasilnya
  // panel putih tanpa pesan apa pun), jadi di layar sempit penampilnya diganti
  // kartu berisi tombol buka/unduh.
  const layarLebar = useMediaQuery('(min-width: 768px)');

  const hapus = async (b: InfoBerkas) => {
    if (!confirm(`Hapus "${b.judul}" dari daftar buku profil?`)) return;
    const res = await fetch(`/api/admin/produk/${b.id}`, { method: 'DELETE' });
    const j = await res.json();
    if (j.error?.length) {
      toast.error(j.error[0]);
      return;
    }
    toast.success('Dokumen dihapus');
    setItems((prev) => prev.filter((x) => x.id !== b.id));
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-slate-50/30">
      <div className="container mx-auto flex-1 px-4 py-12 md:px-8 lg:px-16 lg:py-16">
        <EditableBlock kunci={PROFIL_KEPENDUDUKAN_KUNCI} label="Teks Halaman">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex items-start gap-4 pr-28"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
                {teks.judul || 'Profil Perkembangan Kependudukan'}
              </h1>
              {teks.intro && (
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-500">
                  {teks.intro}
                </p>
              )}
            </div>
          </motion.div>
        </EditableBlock>

        {/* Panel unggah sengaja DI ATAS daftar, bukan di bawahnya: daftar
            terbitan diikuti penampil PDF setinggi 80vh, jadi panel yang
            ditaruh di bawah baru terlihat setelah menggulir satu layar penuh
            dan admin mengira fitur unggahnya tidak ada. */}
        {editMode && (
          <div className="mb-6">
            <TambahDokumen
              jenis="BUKU_PROFIL"
              onAdded={(b) => setItems((prev) => [b, ...prev])}
            />
          </div>
        )}

        {daftar.length === 0 ? (
          <div className="rounded-2xl border border-slate-200/60 bg-white p-8 text-sm text-slate-500 shadow-sm">
            Buku Profil Perkembangan Kependudukan belum tersedia di portal ini.
            {editMode && ' Unggah berkas PDF-nya lewat panel di atas.'}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]"
          >
            {/* Pemilih terbitan */}
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Terbitan
              </h2>
              <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
                {daftar.map((b) => {
                  const tahun = tahunDari(b.judul);
                  const dipilih = b.id === aktifId;
                  return (
                    <div key={b.id} className="relative shrink-0 lg:shrink">
                      <button
                        type="button"
                        onClick={() => setAktifId(b.id)}
                        aria-current={dipilih ? 'true' : undefined}
                        className={cn(
                          'w-full rounded-xl border px-4 py-3 text-left transition-colors',
                          dipilih
                            ? 'border-primary bg-primary/5 ring-1 ring-primary/30'
                            : 'border-slate-200 bg-white hover:border-primary/40 hover:bg-slate-50',
                        )}
                      >
                        <span className="flex items-center gap-2">
                          <FileText
                            className={cn(
                              'h-4 w-4 shrink-0',
                              dipilih ? 'text-primary' : 'text-slate-400',
                            )}
                            aria-hidden
                          />
                          <span className="min-w-0">
                            <span
                              className={cn(
                                'block text-sm font-semibold',
                                dipilih ? 'text-primary' : 'text-slate-800',
                              )}
                            >
                              {tahun ? `Tahun ${tahun}` : b.judul}
                            </span>
                            {tahun && (
                              <span className="mt-0.5 block truncate text-xs text-slate-400">
                                {b.judul}
                              </span>
                            )}
                          </span>
                        </span>
                      </button>
                      {editMode && (
                        <button
                          type="button"
                          onClick={() => hapus(b)}
                          title={`Hapus ${b.judul}`}
                          className="absolute right-1.5 top-1.5 rounded-md bg-white/90 p-1 text-slate-400 transition-colors hover:text-destructive"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Penampil dokumen */}
            <div className="min-w-0 space-y-3">
              {aktif && (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
                    <p className="min-w-0 text-sm font-semibold text-slate-800">
                      {aktif.judul}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={aktif.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-primary/30 px-3 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary/5"
                      >
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                        Buka di tab baru
                      </a>
                      <a
                        href={aktif.file}
                        download
                        className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
                      >
                        <Download className="h-3.5 w-3.5" aria-hidden />
                        Unduh PDF
                      </a>
                    </div>
                  </div>

                  {layarLebar ? (
                    <iframe
                      // `key` memaksa iframe dibuat ulang saat ganti terbitan;
                      // tanpa itu sebagian peramban menahan PDF yang lama.
                      key={aktif.id}
                      src={aktif.file}
                      title={aktif.judul}
                      className="h-[80vh] w-full rounded-xl border border-slate-200 bg-white"
                    />
                  ) : (
                    <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
                      <FileText className="mx-auto h-8 w-8 text-primary" aria-hidden />
                      <p className="mt-3 text-sm text-slate-600">
                        Pratinjau PDF tidak tersedia di layar kecil. Buka atau unduh
                        berkasnya lewat tombol di atas.
                      </p>
                    </div>
                  )}
                </>
              )}

              {teks.sumber && (
                <p className="text-xs leading-relaxed text-slate-400">{teks.sumber}</p>
              )}
            </div>
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
}
