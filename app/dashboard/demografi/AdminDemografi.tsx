'use client';

import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useAppSelector } from '@/store/hooks';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Loader2,
  Upload,
  CheckCircle2,
  FileSpreadsheet,
  Pencil,
  Download,
  Trash2,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';
import { DEMOGRAFI_KATEGORI } from '@/lib/demografi-kategori';
import { DEFAULT_KARTU, KARTU_STATISTIK_KUNCI } from '@/lib/beranda-statistik';
import { DemografiEditor } from '@/components/dashboard/demografi-editor';
import { DemografiView } from '@/components/landingpage/demografi-view';
import { PemilihPeriode } from '@/components/shared/pemilih-periode';
import {
  gabungPeriode,
  kueriPeriode,
  labelPeriode,
  periodeDugaan,
  type Periode,
  type PeriodeTersedia,
} from '@/lib/periode-demografi';

/** Unduh file dari endpoint (memicu dialog simpan browser). */
function downloadFile(url: string) {
  const a = document.createElement('a');
  a.href = url;
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function AdminDemografi() {
  const [counts, setCounts] = useState<Record<string, number | null>>({});
  /*
   * Periode yang sedang dikelola. Seluruh halaman ini — hitungan tersimpan,
   * unggah, unduh, hapus, dan editor — bekerja PADA periode ini saja.
   *
   * 🔴 Sebelum ada periode, mengunggah DKB semester baru menghapus semester
   * sebelumnya: tabelnya berkunci `(kategori, kode)`, satu baris per wilayah,
   * dan impor mengganti total. Dinas kehilangan datanya tanpa peringatan.
   */
  const [periode, setPeriode] = useState<Periode | null>(null);
  const [periodeTersedia, setPeriodeTersedia] = useState<PeriodeTersedia[]>([]);
  const [uploading, setUploading] = useState<string | null>(null);
  const [editing, setEditing] = useState<{ slug: string; label: string } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [resetting, setResetting] = useState(false);
  const inputs = useRef<Record<string, HTMLInputElement | null>>({});
  // Reset kartu beranda hanya untuk akun master (Super Admin / level 1).
  const isMaster = useAppSelector((s) => s.auth.user?.level) === 1;

  const refresh = (slug: string, pakai: Periode | null = periode) => {
    const q = kueriPeriode(pakai);
    fetch(`/api/demografi?kategori=${encodeURIComponent(slug)}${q ? `&${q}` : ''}`)
      .then((r) => r.json())
      .then((j) => setCounts((c) => ({ ...c, [slug]: j.data?.items?.length ?? 0 })))
      .catch(() => setCounts((c) => ({ ...c, [slug]: 0 })));
  };

  const refreshAll = (pakai: Periode | null = periode) =>
    DEMOGRAFI_KATEGORI.forEach((k) => refresh(k.slug, pakai));

  /*
   * Daftar periode diambil dari endpoint ADMIN, bukan publik.
   *
   * 🔴 `/api/demografi` menghitung periode untuk SATU kategori saja — angkanya
   * akan terbaca sebagai "129 baris" padahal seluruh kategori berjumlah 1.032.
   * Pemilih di halaman ini mengatur SEMUA kategori sekaligus, jadi hitungannya
   * harus lintas kategori pula.
   */
  const refreshPeriode = async () => {
    try {
      const res = await fetch(
        `/api/admin/demografi?kategori=${encodeURIComponent(DEMOGRAFI_KATEGORI[0]?.slug ?? '')}`,
      );
      const j = await res.json();
      const daftar: PeriodeTersedia[] = Array.isArray(j.data?.periodeTersedia)
        ? j.data.periodeTersedia
        : [];
      setPeriodeTersedia((lama) => gabungPeriode(lama, daftar));

      return { daftar, dariServer: (j.data?.periode ?? null) as Periode | null };
    } catch {
      return { daftar: [] as PeriodeTersedia[], dariServer: null };
    }
  };

  /*
   * Periode awal ditentukan SEKALI, dari data yang benar-benar ada — bukan
   * ditebak dari kalender. Kalau tabelnya masih kosong sama sekali, barulah
   * dugaan dari tanggal hari ini dipakai sebagai isian awal.
   */
  useEffect(() => {
    let batal = false;

    (async () => {
      const { daftar, dariServer } = await refreshPeriode();
      if (batal) return;

      setPeriode(
        dariServer ??
          (daftar[0] ? { tahun: daftar[0].tahun, semester: daftar[0].semester } : periodeDugaan()),
      );
    })();

    return () => { batal = true; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (periode) refreshAll(periode);
  }, [periode?.tahun, periode?.semester]); // eslint-disable-line react-hooks/exhaustive-deps

  const totalTersimpan = DEMOGRAFI_KATEGORI.reduce(
    (a, k) => a + (counts[k.slug] ?? 0),
    0,
  );

  const deleteAll = async () => {
    setDeleting(true);
    try {
      /*
       * 🔴 Menghapus HANYA periode yang sedang dipilih.
       *
       * Dulu tombol ini menyapu seluruh tabel. Sejak beberapa periode bisa
       * berdampingan, menyapu semuanya berarti satu klik menghapus data
       * bertahun-tahun — termasuk semester yang tidak sedang dilihat petugas.
       */
      const res = await fetch(`/api/admin/demografi?${kueriPeriode(periode)}`, {
        method: 'DELETE',
      });
      const j = await res.json();
      if (j.error?.length) {
        toast.error(j.error[0]);
        return;
      }
      toast.success(j.success?.[0] ?? 'Data periode ini dihapus');
      setConfirmDelete(false);
      setPeriodeTersedia((d) =>
        d.filter((x) => !(x.tahun === periode?.tahun && x.semester === periode?.semester)),
      );
      refreshAll();
    } catch {
      toast.error('Gagal menghapus data');
    } finally {
      setDeleting(false);
    }
  };

  /** Kembalikan susunan kartu statistik beranda ke 6 kartu bawaan. */
  const resetKartu = async () => {
    setResetting(true);
    try {
      const res = await fetch('/api/admin/static-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kunci: KARTU_STATISTIK_KUNCI,
          konten: { kartu: DEFAULT_KARTU },
        }),
      });
      const j = await res.json();
      if (j.error?.length) {
        toast.error(j.error[0]);
        return;
      }
      toast.success('Kartu beranda dikembalikan ke 6 kartu bawaan');
      setConfirmReset(false);
    } catch {
      toast.error('Gagal mereset kartu beranda');
    } finally {
      setResetting(false);
    }
  };

  const upload = async (slug: string, file: File | undefined) => {
    if (!file) return;
    setUploading(slug);
    try {
      const form = new FormData();
      form.append('file', file);
      form.append('kategori', slug);
      // Tanpa ini server memakai periode terbaru — dan berkas semester I bisa
      // mendarat menimpa semester II hanya karena periodenya tidak disebut.
      if (periode) {
        form.append('tahun', String(periode.tahun));
        form.append('semester', String(periode.semester));
      }
      const res = await fetch('/api/admin/demografi/import', { method: 'POST', body: form });
      const j = await res.json();
      if (j.error?.length) {
        toast.error(j.error[0]);
        return;
      }
      toast.success(j.success?.[0] ?? 'Import berhasil');
      refresh(slug);
      // Impor ke periode yang belum pernah ada menambah satu entri di pemilih.
      refreshPeriode();
    } catch {
      toast.error('Gagal mengunggah file');
    } finally {
      setUploading(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex-1 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-slate-700">
          Unggah file Excel agregat Dukcapil (format SIAK: kolom <b>IDEM, KODE, WILAYAH, …</b>) per kategori.
          Setiap unggahan <b>mengganti</b> data kategori tersebut{' '}
          <b>pada periode yang sedang dipilih saja</b> — periode lain tidak tersentuh. Klik{' '}
          <b>Edit / Import</b> untuk mengelola data kecamatan &amp; <b>detail desa</b>-nya.
        </div>
        <div className="flex flex-shrink-0 flex-wrap items-center gap-2">
          {/*
            Pemilih periode berdiri PALING KIRI di antara tombol-tombol ini,
            sebelum Export/Reset/Hapus — ketiganya bekerja pada periode yang
            dipilih di sini, dan urutan bacanya harus mencerminkan itu.
          */}
          <PemilihPeriode
            nilai={periode}
            tersedia={periodeTersedia}
            onPilih={setPeriode}
            bolehBaru
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => downloadFile(`/api/admin/demografi/export?${kueriPeriode(periode)}`)}
            disabled={totalTersimpan === 0}
            title="Unduh semua kategori dalam satu file Excel"
          >
            <Download className="mr-1.5 h-4 w-4" /> Export Semua
          </Button>
          {isMaster && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setConfirmReset(true)}
              title="Kembalikan kartu statistik beranda ke 6 kartu bawaan (khusus akun master)"
            >
              <RotateCcw className="mr-1.5 h-4 w-4" /> Reset Kartu Beranda
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setConfirmDelete(true)}
            disabled={totalTersimpan === 0}
            className="border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
            title="Hapus data demografi semua kategori PADA PERIODE INI"
          >
            <Trash2 className="mr-1.5 h-4 w-4" /> Hapus Periode Ini
          </Button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {DEMOGRAFI_KATEGORI.map((k) => {
          const count = counts[k.slug];
          const busy = uploading === k.slug;
          return (
            <div key={k.slug} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileSpreadsheet className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-900">{k.label}</p>
                <p className="truncate text-xs text-slate-400">File: {k.fileHint}</p>
                <p className="mt-0.5 text-xs">
                  {count == null ? (
                    <span className="text-slate-400">memeriksa…</span>
                  ) : count > 0 ? (
                    <span className="inline-flex items-center gap-1 text-success">
                      <CheckCircle2 className="h-3.5 w-3.5" /> {count} kecamatan tersimpan
                    </span>
                  ) : (
                    <span className="text-slate-400">Belum ada data</span>
                  )}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                disabled={busy}
                onClick={() => setEditing({ slug: k.slug, label: k.label })}
                className="flex-shrink-0"
                title="Edit / import (bisa banyak file) dengan pemeriksaan data berbeda"
              >
                <Pencil className="h-4 w-4" />
                <span className="ml-1.5 hidden sm:inline">Edit / Import</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                disabled={busy || !count}
                onClick={() =>
                  downloadFile(
                    `/api/admin/demografi/export?kategori=${encodeURIComponent(k.slug)}&${kueriPeriode(periode)}`,
                  )
                }
                className="flex-shrink-0"
                title="Unduh data kategori ini ke Excel"
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={busy}
                onClick={() => inputs.current[k.slug]?.click()}
                className="flex-shrink-0"
              >
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                <span className="ml-1.5">{count ? 'Ganti' : 'Unggah'}</span>
              </Button>
              <input
                ref={(el) => {
                  inputs.current[k.slug] = el;
                }}
                type="file"
                accept=".xlsx"
                className="hidden"
                disabled={busy}
                onChange={(e) => {
                  upload(k.slug, e.target.files?.[0]);
                  e.target.value = '';
                }}
              />
            </div>
          );
        })}
      </div>

      {editing && (
        <DemografiEditor
          kategori={editing.slug}
          label={editing.label}
          periode={periode}
          periodeTersedia={periodeTersedia}
          onPeriode={setPeriode}
          open
          onOpenChange={(o) => !o && setEditing(null)}
          onSaved={() => { refresh(editing.slug); refreshPeriode(); }}
        />
      )}

      {/* Pratinjau data tersimpan — sama persis dengan tampilan publik:
          tabel ringkasan per kecamatan (jumlah seluruh pekon) + tombol Detail. */}
      <div className="pt-2">
        <h2 className="mb-1 text-lg font-semibold text-slate-900">Data Tersimpan</h2>
        <p className="mb-4 text-sm text-slate-500">
          Angka per kecamatan = <b>jumlah seluruh desa</b> di bawahnya. Klik <b>Detail</b> untuk
          rincian per desa, atau <b>Edit data</b> untuk mengubah langsung.
        </p>
        <DemografiView editable onDataChanged={() => DEMOGRAFI_KATEGORI.forEach((k) => refresh(k.slug))} />
      </div>

      {/* Konfirmasi hapus seluruh data demografi */}
      <Dialog open={confirmDelete} onOpenChange={(o) => !deleting && setConfirmDelete(o)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" /> Hapus data{' '}
              {periode ? labelPeriode(periode.tahun, periode.semester) : 'periode ini'}?
            </DialogTitle>
            <DialogDescription>
              Data <b>semua kategori</b> (kecamatan &amp; desa) pada{' '}
              <b>{periode ? labelPeriode(periode.tahun, periode.semester) : 'periode ini'}</b> akan
              dihapus permanen — total <b>{totalTersimpan} kecamatan</b> tersimpan.{' '}
              <b>Periode lain tidak tersentuh.</b> Sebaiknya <b>Export Semua</b> dulu sebagai
              cadangan. Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDelete(false)} disabled={deleting}>
              Batal
            </Button>
            <Button
              onClick={deleteAll}
              disabled={deleting}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              {deleting ? (
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="mr-1.5 h-4 w-4" />
              )}
              Ya, hapus semua
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Konfirmasi reset kartu statistik beranda ke bawaan */}
      <Dialog open={confirmReset} onOpenChange={(o) => !resetting && setConfirmReset(o)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <RotateCcw className="h-5 w-5 text-primary" /> Reset kartu beranda?
            </DialogTitle>
            <DialogDescription>
              Susunan kartu <b>Statistik Demografi</b> di beranda dikembalikan ke{' '}
              <b>6 kartu bawaan</b> (Jumlah Penduduk, Kepala Keluarga, Laki-laki,
              Perempuan, Wajib KTP, Sudah Rekam KTP-el). Data demografi tidak
              terpengaruh — hanya tampilan kartunya. Penyesuaian ikon/kolom yang
              sudah Anda buat akan tergantikan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmReset(false)} disabled={resetting}>
              Batal
            </Button>
            <Button onClick={resetKartu} disabled={resetting}>
              {resetting ? (
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
              ) : (
                <RotateCcw className="mr-1.5 h-4 w-4" />
              )}
              Ya, kembalikan 6 kartu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
