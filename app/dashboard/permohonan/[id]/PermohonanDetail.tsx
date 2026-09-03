'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  CheckCircle2,
  Clock,
  Download,
  FileText,
  Loader2,
  Lock,
  Mail,
  Phone,
  User,
  XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BerkasGallery,
  PermohonanJourney,
} from '@/components/shared/permohonan-detail';
import { AlasanDitolak } from '@/components/shared/alasan-ditolak';
import { PilihRincian } from '@/components/dashboard/pilih-rincian';
import {
  labelField,
  payloadBerkasEntries,
  payloadDataEntries,
} from '@/lib/permohonan-display';
import {
  ALASAN,
  perluRincian,
  type GrupRincian,
  type UraianTolak,
} from '@/lib/tolak-permohonan';

const STATUS: Record<
  string,
  { label: string; cls: string; icon: React.ElementType }
> = {
  MENUNGGU: { label: 'Menunggu', cls: 'text-warning bg-warning/10 border-warning/20', icon: Clock },
  DIPROSES: { label: 'Diproses', cls: 'text-primary bg-primary/10 border-primary/20', icon: Clock },
  SELESAI: { label: 'Selesai', cls: 'text-success bg-success/10 border-success/20', icon: CheckCircle2 },
  DITOLAK: { label: 'Ditolak', cls: 'text-destructive bg-destructive/10 border-destructive/20', icon: XCircle },
};

/** Status yang mengunci permohonan; hanya halaman Master yang bisa membuka. */
const FINAL = ['SELESAI', 'DITOLAK'];

interface Detail {
  id: number;
  noregister: string;
  status: string;
  catatan: string | null;
  payload: unknown;
  prosesByName: string | null;
  prosesAt: string | null;
  createdAt: string;
  updatedAt: string;
  jenis?: { nama: string; kategori: string } | null;
  user?: {
    userId: string;
    userFullname: string | null;
    userHp: string | null;
    userEmail: string | null;
    userKecamatan: string | null;
  } | null;
  berkas?: { namaFile: string; path: string }[];
}

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS[status] ?? {
    label: status,
    cls: 'text-slate-600 bg-slate-50 border-slate-200',
    icon: FileText,
  };
  const Icon = cfg.icon;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${cfg.cls}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {cfg.label}
    </span>
  );
}

export function PermohonanDetail({
  id,
  bolehProses,
}: {
  id: number;
  /** Dari sesi di server; OPD membuka halaman ini untuk MEMBACA saja. */
  bolehProses: boolean;
}) {
  const router = useRouter();
  const [detail, setDetail] = useState<Detail | null>(null);
  const [tolak, setTolak] = useState<UraianTolak | null>(null);
  const [rincianPilihan, setRincianPilihan] = useState<GrupRincian[]>([]);
  const [memuat, setMemuat] = useState(true);

  // ── Formulir proses (INLINE, bukan modal) ──────────────────────────────
  const [formTerbuka, setFormTerbuka] = useState(false);
  const [status, setStatus] = useState('');
  const [catatan, setCatatan] = useState('');
  const [alasan, setAlasan] = useState('');
  const [rincian, setRincian] = useState<string[]>([]);
  const [keterangan, setKeterangan] = useState('');
  const [galat, setGalat] = useState<Record<string, boolean>>({});
  const [menyimpan, setMenyimpan] = useState(false);
  const [konfirmasiFinal, setKonfirmasiFinal] = useState(false);

  const muat = useCallback(async () => {
    setMemuat(true);
    const res = await fetch(`/api/admin/permohonan/${id}`);
    const j = await res.json();
    setMemuat(false);

    if (j.error?.length) {
      toast.error(j.error[0]);
      return;
    }
    setDetail(j.data?.permohonan ?? null);
    setTolak(j.data?.tolak ?? null);
    setRincianPilihan(j.data?.rincianPilihan ?? []);
  }, [id]);

  useEffect(() => {
    muat();
  }, [muat]);

  if (memuat) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!detail) {
    return (
      <p className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
        Permohonan tidak dapat dimuat.
      </p>
    );
  }

  const payload: Record<string, unknown> =
    detail.payload && typeof detail.payload === 'object'
      ? (detail.payload as Record<string, unknown>)
      : {};
  const isian = payloadDataEntries(payload);

  // Berkas: gabungan t_berkas + berkas yang hanya tercatat di payload.
  const jalurTercatat = new Set((detail.berkas ?? []).map((b) => b.path));
  const berkas = [
    ...(detail.berkas ?? []).map((b) => ({ label: b.namaFile, path: b.path })),
    ...payloadBerkasEntries(payload).filter((b) => !jalurTercatat.has(b.path)),
  ];

  const terkunci = FINAL.includes(detail.status);
  const menolak = status === 'DITOLAK';
  const wajibRinci = menolak && perluRincian(alasan);

  const bukaForm = () => {
    setStatus(detail.status);
    setCatatan(detail.catatan ?? '');
    setAlasan(tolak?.alasan ?? '');
    setRincian(tolak?.rincian ?? []);
    setKeterangan(tolak?.keterangan ?? '');
    setGalat({});
    setKonfirmasiFinal(false);
    setFormTerbuka(true);
  };

  const simpan = async () => {
    // Validasi dikumpulkan SEKALIGUS, bukan berhenti di kekurangan pertama —
    // petugas yang harus memperbaiki tiga hal tidak perlu menekan Simpan tiga
    // kali untuk menemukannya satu per satu.
    if (menolak) {
      const g = {
        alasan: !alasan,
        keterangan: !keterangan.trim(),
        rincian: wajibRinci && rincian.length === 0,
      };
      setGalat(g);
      if (g.alasan || g.keterangan || g.rincian) {
        toast.error('Lengkapi alasan penolakan sebelum menyimpan');
        return;
      }
    }

    if (FINAL.includes(status) && !konfirmasiFinal) {
      setKonfirmasiFinal(true);
      return;
    }

    setMenyimpan(true);
    const res = await fetch(`/api/admin/permohonan/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        menolak
          ? { status, alasan, rincian, keterangan }
          : { status, catatan },
      ),
    });
    const j = await res.json();
    setMenyimpan(false);

    if (j.error?.length) {
      toast.error(j.error[0]);
      return;
    }
    toast.success(j.success?.[0] ?? 'Tersimpan');
    setFormTerbuka(false);
    setKonfirmasiFinal(false);
    await muat();
    // Daftar di halaman sebelumnya ikut disegarkan supaya lencana statusnya
    // tidak tertinggal di keadaan lama saat petugas menekan Kembali.
    router.refresh();
  };

  return (
    <div className="space-y-4">
      {/*
        Alasan penolakan PALING ATAS.

        🔴 Ini satu-satunya alasan halaman ini ada bagi Operator OPD: ia perlu
        tahu apa yang harus diperbaiki. Menaruhnya di bawah data permohonan
        berarti ia menggulir melewati seluruh isian — persis yang membuat
        warga sebelumnya tidak pernah menemukan penjelasannya.
      */}
      {detail.status === 'DITOLAK' && <AlasanDitolak tolak={tolak} />}

      {/* Kepala permohonan */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="font-semibold text-slate-900">
              {detail.jenis?.nama ?? 'Permohonan'}
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              <span className="font-mono font-semibold">{detail.noregister}</span>
              {' · '}
              {detail.jenis?.kategori ?? '-'}
              {' · diajukan '}
              {new Date(detail.createdAt).toLocaleString('id-ID', {
                dateStyle: 'long',
                timeStyle: 'short',
              })}
            </p>
          </div>
          <StatusBadge status={detail.status} />
        </div>
      </div>

      {/* Perjalanan status */}
      <div className="rounded-xl border border-slate-200 p-4">
        <PermohonanJourney
          status={detail.status}
          createdAt={detail.createdAt}
          prosesAt={detail.prosesAt}
          updatedAt={detail.updatedAt}
        />
      </div>

      {/* Pemohon */}
      <div className="rounded-xl border border-slate-200 p-4">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Pemohon
        </h3>
        <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <p className="flex items-center gap-2 text-slate-700">
            <User className="h-4 w-4 shrink-0 text-slate-400" />
            <span>
              {detail.user?.userFullname ?? '-'}
              <span className="block font-mono text-xs text-slate-400">
                {detail.user?.userId ?? '-'}
              </span>
            </span>
          </p>
          <p className="flex items-center gap-2 text-slate-700">
            <Phone className="h-4 w-4 shrink-0 text-slate-400" />
            {detail.user?.userHp ?? '-'}
          </p>
          <p className="flex items-center gap-2 break-all text-slate-700">
            <Mail className="h-4 w-4 shrink-0 text-slate-400" />
            {detail.user?.userEmail ?? '-'}
          </p>
          <p className="text-slate-700">
            <span className="block text-xs text-slate-400">Kecamatan</span>
            {detail.user?.userKecamatan ?? '-'}
          </p>
        </div>
      </div>

      {/* Data permohonan */}
      {isian.length > 0 && (
        <div className="rounded-xl border border-slate-200 p-4">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Data Permohonan ({isian.length} isian)
          </h3>
          <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {isian.map(([k, v]) => (
              <div key={k} className="rounded-lg bg-slate-50/80 px-3 py-2">
                <dt className="text-xs text-slate-400">{labelField(k)}</dt>
                <dd className="mt-0.5 break-words text-sm font-medium text-slate-800">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {/* Berkas lampiran */}
      <div className="rounded-xl border border-slate-200 p-4">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Berkas Lampiran ({berkas.length})
        </h3>
        <BerkasGallery items={berkas} />
      </div>

      {/* Catatan kerja petugas — hanya bila BUKAN penolakan; penolakan sudah
          digambar utuh di atas, dan mengulangnya di sini membuatnya terbaca
          seperti dua keterangan berbeda. */}
      {((detail.catatan && detail.status !== 'DITOLAK') || detail.prosesByName) && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          {detail.catatan && detail.status !== 'DITOLAK' && (
            <>
              <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Catatan Petugas
              </h3>
              <p className="whitespace-pre-line text-sm text-slate-700">
                {detail.catatan}
              </p>
            </>
          )}
          {detail.prosesByName && (
            <p
              className={`flex flex-wrap items-center gap-1.5 text-xs text-slate-500 ${
                detail.catatan && detail.status !== 'DITOLAK'
                  ? 'mt-2 border-t border-slate-200 pt-2'
                  : ''
              }`}
            >
              <User className="h-3.5 w-3.5 text-slate-400" />
              Diproses oleh{' '}
              <b className="text-slate-700">{detail.prosesByName}</b>
              {detail.prosesAt && (
                <>
                  {' · '}
                  {new Date(detail.prosesAt).toLocaleString('id-ID', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </>
              )}
            </p>
          )}
        </div>
      )}

      {/* ── Aksi ──────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-end gap-2 border-t border-slate-100 pt-4">
        {/* ⚠️ Tab baru, bukan navigasi biasa. Balasannya berkas PDF — tanpa
            `target`, peramban meninggalkan halaman detail ini dan petugas
            kehilangan posisinya hanya untuk mengunduh satu berkas. `rel` wajib
            menyertainya: tanpa `noopener`, halaman tujuan bisa menyentuh
            `window.opener`. */}
        {detail.status === 'SELESAI' && (
          <a
            href={`/api/permohonan/${detail.id}/pdf`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="border-success/40 text-success hover:bg-success/10 hover:text-success"
            >
              <Download className="mr-1.5 h-4 w-4" /> Unduh Dokumen (PDF)
            </Button>
          </a>
        )}

        {bolehProses &&
          (terkunci ? (
            <span
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-500"
              title="Permohonan final — buka kunci lewat halaman Master"
            >
              <Lock className="h-3.5 w-3.5" /> Permohonan final &amp; terkunci
            </span>
          ) : (
            !formTerbuka && (
              <Button
                onClick={bukaForm}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Proses Permohonan
              </Button>
            )
          ))}
      </div>

      {/*
        Formulir proses tumbuh DI HALAMAN, bukan sebagai modal.

        Petugas memutuskan sambil membaca berkas dan isian di atas. Modal
        menutupi keduanya tepat pada saat keduanya paling dibutuhkan — dan
        daftar "data yang perlu dilengkapi" justru disusun dengan menengok
        kembali ke isian itu.
      */}
      {bolehProses && formTerbuka && !terkunci && (
        <div className="rounded-xl border-2 border-primary/30 bg-primary/[0.03] p-4">
          <h3 className="mb-4 text-sm font-semibold text-slate-900">
            Proses Permohonan
          </h3>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  {['MENUNGGU', 'DIPROSES', 'SELESAI', 'DITOLAK'].map((s) => (
                    <SelectItem key={s} value={s}>
                      {STATUS[s].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {menolak ? (
              <>
                <div className="space-y-1.5">
                  <Label>
                    Alasan Penolakan{' '}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={alasan}
                    onValueChange={(v) => {
                      setAlasan(v);
                      // Rincian dikosongkan saat alasan berganti: daftar yang
                      // tersisa dari alasan sebelumnya bisa tidak masuk akal
                      // lagi, dan warga membacanya sebagai pernyataan dinas.
                      setRincian([]);
                      setGalat((g) => ({ ...g, alasan: false }));
                    }}
                  >
                    <SelectTrigger
                      className={`w-full ${galat.alasan ? 'border-destructive' : ''}`}
                    >
                      <SelectValue placeholder="Pilih alasan penolakan" />
                    </SelectTrigger>
                    <SelectContent>
                      {ALASAN.map((a) => (
                        <SelectItem key={a} value={a}>
                          {a}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {wajibRinci && (
                  <div className="space-y-1.5">
                    <Label>
                      Data yang Perlu Dilengkapi{' '}
                      <span className="text-destructive">*</span>
                    </Label>
                    <PilihRincian
                      nilai={rincian}
                      grup={rincianPilihan}
                      galat={!!galat.rincian}
                      onUbah={(v) => {
                        setRincian(v);
                        setGalat((g) => ({ ...g, rincian: false }));
                      }}
                    />
                    <p className="text-xs text-slate-500">
                      Pilih minimal satu. Daftar ini diambil dari isian dan
                      lampiran formulir layanan tersebut, dan akan dibaca
                      pemohon apa adanya.
                    </p>
                  </div>
                )}

                <div className="space-y-1.5">
                  <Label>
                    Keterangan <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    rows={3}
                    value={keterangan}
                    onChange={(e) => {
                      setKeterangan(e.target.value);
                      setGalat((g) => ({ ...g, keterangan: false }));
                    }}
                    placeholder="Jelaskan secara ringkas apa yang harus diperbaiki pemohon."
                    className={galat.keterangan ? 'border-destructive' : ''}
                  />
                  <p className="text-xs text-slate-500">
                    Kalimat ini dikirim ke pemohon lewat surel dan tampil di
                    halaman riwayatnya.
                  </p>
                </div>
              </>
            ) : (
              <div className="space-y-1.5">
                <Label>Catatan Petugas</Label>
                <Textarea
                  rows={3}
                  value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                  placeholder="Opsional — catatan internal atau informasi untuk pemohon."
                />
              </div>
            )}

            {konfirmasiFinal && (
              <div className="rounded-lg border border-warning/40 bg-warning/10 p-3 text-sm text-slate-700">
                Status <b>{STATUS[status]?.label ?? status}</b> bersifat final.
                Setelah disimpan, permohonan terkunci dan hanya bisa dibuka
                kembali lewat halaman Master. Tekan <b>Simpan</b> sekali lagi
                untuk melanjutkan.
              </div>
            )}

            <div className="flex flex-wrap justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setFormTerbuka(false);
                  setKonfirmasiFinal(false);
                }}
                disabled={menyimpan}
              >
                Batal
              </Button>
              <Button
                onClick={simpan}
                disabled={menyimpan || !status}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {menyimpan && <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />}
                Simpan
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
