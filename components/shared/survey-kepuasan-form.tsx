'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SearchSelect } from '@/components/shared/search-select';
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  ClipboardCheck,
  Plus,
  Trash2,
  Lightbulb,
} from 'lucide-react';
import {
  SKM_UNSUR,
  SKM_SKALA_MAX,
  SKM_LAYANAN,
  SKM_PENDIDIKAN,
  SKM_KENDALA_LAYANAN,
} from '@/lib/skm';
import { CODE_VALUES_MASTER } from '@/lib/permohonan-lookup';

/**
 * Formulir Survei Kepuasan Masyarakat.
 *
 * Lima bagian: data responden · penilaian 9 unsur (skala 1–4, Permenpan RB
 * 14/2017) · saran umum · masukan per layanan · usulan layanan baru.
 *
 * 🔴 Pertanyaan & label opsi WAJIB dari `lib/skm.ts` — jangan disalin ke sini.
 * Isinya bukan karangan: diambil dari kuesioner SKM asli Disdukcapil di portal
 * Laravel lama. Jawaban disimpan berkunci `u0`–`u8`, bentuk yang sama dengan
 * 107 responden warisan, supaya rekap IKM menghitung keduanya sekaligus.
 */

/** Bintang merah penanda isian wajib. */
function Wajib() {
  return <span className="text-rose-500"> *</span>;
}

/** 89 pilihan → SearchSelect (bisa diketik), bukan dropdown biasa. */
const PEKERJAAN = Object.entries(CODE_VALUES_MASTER.pekerjaan ?? {})
  .map(([value, label]) => ({ value, label }))
  .sort((a, b) => a.label.localeCompare(b.label, 'id'));

const UMUR_MIN = 10;
const UMUR_MAX = 100;

/** Warna terpilih per nilai — merah (1) ke hijau (4). */
const WARNA_TERPILIH: Record<number, string> = {
  1: 'border-rose-400 bg-rose-50 text-rose-700 ring-2 ring-rose-200',
  2: 'border-amber-400 bg-amber-50 text-amber-800 ring-2 ring-amber-200',
  3: 'border-sky-400 bg-sky-50 text-sky-700 ring-2 ring-sky-200',
  4: 'border-emerald-500 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-200',
};

interface MasukanLayanan {
  layanan: string;
  aspek: string;
  saran: string;
}

const BARIS_KOSONG: MasukanLayanan = { layanan: '', aspek: '', saran: '' };

export function SurveyKepuasanForm() {
  // Bagian 1 — responden
  const [nama, setNama] = useState('');
  const [layanan, setLayanan] = useState('');
  const [jenisKel, setJenisKel] = useState('');
  const [umur, setUmur] = useState('');
  const [pendidikan, setPendidikan] = useState('');
  const [pekerjaan, setPekerjaan] = useState('');
  const [hp, setHp] = useState('');
  const [email, setEmail] = useState('');

  // Bagian 2 — nilai 9 unsur
  const [nilai, setNilai] = useState<Record<string, number>>({});

  // Bagian 3–5
  const [saran, setSaran] = useState('');
  const [semuaBaik, setSemuaBaik] = useState(false);
  const [masukan, setMasukan] = useState<MasukanLayanan[]>([{ ...BARIS_KOSONG }]);
  const [usulan, setUsulan] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const terisi = useMemo(
    () => SKM_UNSUR.filter((u) => nilai[u.kunci]).length,
    [nilai],
  );
  const lengkap = terisi === SKM_UNSUR.length;

  const ubahMasukan = (i: number, patch: Partial<MasukanLayanan>) =>
    setMasukan((prev) => prev.map((m, idx) => (idx === i ? { ...m, ...patch } : m)));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!nama.trim()) return setError('Mohon isi nama Anda.');
    if (!layanan) return setError('Mohon pilih layanan yang Anda urus.');
    if (!lengkap) {
      const kurang = SKM_UNSUR.filter((u) => !nilai[u.kunci]).map((u) => u.nomor);
      return setError(
        `Masih ada ${kurang.length} unsur yang belum dinilai (nomor ${kurang.join(', ')}).`,
      );
    }
    const umurAngka = umur.trim() ? Number(umur) : null;
    if (
      umurAngka !== null &&
      (!Number.isInteger(umurAngka) || umurAngka < UMUR_MIN || umurAngka > UMUR_MAX)
    ) {
      return setError(`Umur harus antara ${UMUR_MIN} dan ${UMUR_MAX} tahun.`);
    }

    // Baris masukan yang benar-benar diisi. Kalau "semua sudah baik" dicentang,
    // bagian ini sengaja diabaikan seluruhnya.
    const masukanBersih = semuaBaik
      ? []
      : masukan
          .filter((m) => m.layanan || m.aspek || m.saran.trim())
          .map((m) => ({ ...m, saran: m.saran.trim() }));
    // Baris yang disentuh harus lengkap bertiga — masukan tanpa saran tidak
    // bisa ditindaklanjuti dinas, jadi tak ada gunanya disimpan separuh.
    const nomorTakLengkap = masukanBersih
      .map((m, i) => (!m.layanan || !m.aspek || !m.saran ? i + 1 : null))
      .filter((n): n is number => n !== null);
    if (nomorTakLengkap.length) {
      return setError(
        `Pada Bagian 3 masukan ke-${nomorTakLengkap.join(', ')}: jenis permohonan, kendala, dan saran perbaikan harus diisi semua — atau centang "semua permohonan online sudah baik".`,
      );
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/skm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nama: nama.trim(),
          layanan,
          jenisKel: jenisKel || null,
          umur: umurAngka,
          pendidikan: pendidikan || null,
          pekerjaan: pekerjaan || null,
          hp: hp.trim() || null,
          email: email.trim() || null,
          jawaban: nilai, // berkunci u0..u8
          saran: saran.trim() || null,
          masukanLayanan: masukanBersih,
          usulanLayanan: usulan.trim() || null,
        }),
      });
      const json = await res.json();
      if (json.error?.length) setError(json.error[0]);
      else setSuccess(true);
    } catch {
      setError('Gagal mengirim survei. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 px-6 py-10 text-center">
        <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-6 w-6" />
        </span>
        <p className="text-base font-semibold text-emerald-800">
          Terima kasih, survei Anda berhasil dikirim.
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-emerald-700/80">
          Penilaian Anda langsung tercatat dan menjadi bahan perhitungan Indeks
          Kepuasan Masyarakat (IKM) Disdukcapil Kota Tidore Kepulauan.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <p className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
        Isian bertanda <span className="font-bold text-rose-500">*</span> wajib diisi.
      </p>

      {/* ── Bagian 1: data responden ───────────────────────────────────── */}
      <section className="space-y-4">
        <header className="border-b border-slate-100 pb-2">
          <h3 className="text-sm font-bold text-slate-900">
            Bagian 1 — Data Responden
          </h3>
          <p className="mt-0.5 text-xs text-slate-500">
            Selain yang bertanda bintang, semuanya tidak wajib diisi dan dipakai
            untuk rekap statistik.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="skm-nama">
              Nama Lengkap
              <Wajib />
            </Label>
            <Input
              id="skm-nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Nama sesuai KTP"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="skm-layanan">
              Layanan yang Diurus
              <Wajib />
            </Label>
            <Select value={layanan} onValueChange={setLayanan}>
              <SelectTrigger id="skm-layanan" className="w-full">
                <SelectValue placeholder="Pilih layanan" />
              </SelectTrigger>
              <SelectContent>
                {SKM_LAYANAN.map((l) => (
                  <SelectItem key={l} value={l}>
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="skm-jk">Jenis Kelamin</Label>
            <Select value={jenisKel} onValueChange={setJenisKel}>
              <SelectTrigger id="skm-jk" className="w-full">
                <SelectValue placeholder="Pilih jenis kelamin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="L">Laki-laki</SelectItem>
                <SelectItem value="P">Perempuan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="skm-umur">Umur</Label>
            <Input
              id="skm-umur"
              type="number"
              inputMode="numeric"
              min={UMUR_MIN}
              max={UMUR_MAX}
              value={umur}
              onChange={(e) => setUmur(e.target.value)}
              placeholder="mis. 32"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="skm-pendidikan">Pendidikan Terakhir</Label>
            <Select value={pendidikan} onValueChange={setPendidikan}>
              <SelectTrigger id="skm-pendidikan" className="w-full">
                <SelectValue placeholder="Pilih pendidikan" />
              </SelectTrigger>
              <SelectContent>
                {SKM_PENDIDIKAN.map((p) => (
                  <SelectItem key={p.kode} value={p.kode}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            {/* 89 pilihan — dropdown biasa tak terpakai, pakai yang bisa diketik. */}
            <Label htmlFor="skm-kerja">Pekerjaan</Label>
            <SearchSelect
              id="skm-kerja"
              value={pekerjaan}
              onValueChange={setPekerjaan}
              options={PEKERJAAN}
              placeholder="Pilih pekerjaan"
              searchPlaceholder="Ketik untuk mencari…"
              emptyText="Pekerjaan tidak ditemukan"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="skm-hp">No. WhatsApp</Label>
            <Input
              id="skm-hp"
              inputMode="numeric"
              value={hp}
              onChange={(e) => setHp(e.target.value)}
              placeholder="08xxxxxxxxxx"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="skm-email">Email</Label>
            <Input
              id="skm-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
            />
          </div>
        </div>

        <p className="text-xs text-slate-400">
          Nomor WhatsApp & email hanya dipakai bila dinas perlu menindaklanjuti
          masukan Anda — tidak ditampilkan ke publik.
        </p>
      </section>

      {/* ── Bagian 2: 9 unsur penilaian ────────────────────────────────── */}
      <section className="space-y-4">
        <header className="border-b border-slate-100 pb-2">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-sm font-bold text-slate-900">
              Bagian 2 — Penilaian 9 Unsur Pelayanan
              <Wajib />
            </h3>
            <span
              className={`text-xs font-semibold tabular-nums ${
                lengkap ? 'text-emerald-600' : 'text-slate-500'
              }`}
            >
              {terisi} / {SKM_UNSUR.length} terisi
            </span>
          </div>
          <p className="mt-0.5 text-xs text-slate-500">
            Pilih satu jawaban untuk setiap unsur.
          </p>
          <div
            className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100"
            role="progressbar"
            aria-valuenow={terisi}
            aria-valuemin={0}
            aria-valuemax={SKM_UNSUR.length}
            aria-label="Kemajuan pengisian survei"
          >
            <div
              className={`h-full rounded-full transition-all ${
                lengkap ? 'bg-emerald-500' : 'bg-primary'
              }`}
              style={{ width: `${(terisi / SKM_UNSUR.length) * 100}%` }}
            />
          </div>
        </header>

        <div className="space-y-3">
          {SKM_UNSUR.map((u) => {
            const dipilih = nilai[u.kunci];
            return (
              <fieldset
                key={u.kunci}
                className={`rounded-xl border p-4 transition-colors ${
                  dipilih ? 'border-slate-200 bg-white' : 'border-slate-200 bg-slate-50/50'
                }`}
              >
                <legend className="sr-only">{u.pertanyaan}</legend>
                <div className="mb-3 flex gap-3">
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      dipilih
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {u.nomor}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-snug text-slate-800">
                      {u.pertanyaan}
                    </p>
                    <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      {u.judul}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {u.opsi.map((label, idx) => {
                    const v = idx + 1;
                    const aktif = dipilih === v;
                    return (
                      <button
                        key={v}
                        type="button"
                        aria-pressed={aktif}
                        onClick={() =>
                          setNilai((prev) => ({ ...prev, [u.kunci]: v }))
                        }
                        className={`rounded-lg border px-2 py-2 text-center text-xs font-medium transition-all ${
                          aktif
                            ? WARNA_TERPILIH[v]
                            : 'border-slate-200 bg-white text-slate-600 hover:border-primary/40 hover:bg-primary/5'
                        }`}
                      >
                        <span className="block text-[10px] font-bold opacity-60">{v}</span>
                        {label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            );
          })}
        </div>
      </section>

      {/* ── Bagian 3: layanan yang perlu ditingkatkan ──────────────────── */}
      <section className="space-y-4">
        <header className="border-b border-slate-100 pb-2">
          <h3 className="text-sm font-bold text-slate-900">
            Bagian 3 — Permohonan Online yang Perlu Ditingkatkan
          </h3>
          <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
            Bagian ini khusus tentang <b>pengajuan permohonan lewat website</b>:
            apakah formulirnya sulit diisi, berkasnya susah diunggah, atau
            informasinya kurang jelas. Pilih permohonan yang Anda maksud, lalu
            tuliskan saran perbaikannya. Boleh menambah lebih dari satu.
          </p>
        </header>

        <label className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50/50 p-3">
          <Checkbox
            checked={semuaBaik}
            onCheckedChange={(v) => setSemuaBaik(v === true)}
            className="mt-0.5"
          />
          <span className="text-sm text-emerald-800">
            <span className="font-semibold">
              Tidak ada — semua permohonan online sudah baik
            </span>
            <span className="mt-0.5 block text-xs text-emerald-700/80">
              Centang bila Anda tidak menemui kendala. Kolom di bawah akan
              dinonaktifkan.
            </span>
          </span>
        </label>

        {/* Dicentang → kartu dinonaktifkan (diredupkan & tak bisa disentuh),
            bukan disembunyikan: warga tetap melihat apa yang dilewati. */}
        <div
          className={
            semuaBaik ? 'pointer-events-none select-none opacity-40' : undefined
          }
          aria-disabled={semuaBaik}
        >
          <div className="space-y-3">
            {masukan.map((m, i) => (
              <div key={i} className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Masukan {i + 1}
                  </span>
                  {masukan.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        setMasukan((prev) => prev.filter((_, idx) => idx !== i))
                      }
                      className="inline-flex items-center gap-1 text-xs font-medium text-rose-600 hover:text-rose-700"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Hapus
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={`m-layanan-${i}`}>Jenis Permohonan</Label>
                    <Select
                      value={m.layanan}
                      onValueChange={(v) => ubahMasukan(i, { layanan: v })}
                    >
                      <SelectTrigger id={`m-layanan-${i}`} className="w-full">
                        <SelectValue placeholder="Pilih permohonan" />
                      </SelectTrigger>
                      <SelectContent>
                        {SKM_LAYANAN.map((l) => (
                          <SelectItem key={l} value={l}>
                            {l}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`m-aspek-${i}`}>Kendala yang Dialami</Label>
                    <Select
                      value={m.aspek}
                      onValueChange={(v) => ubahMasukan(i, { aspek: v })}
                    >
                      <SelectTrigger id={`m-aspek-${i}`} className="w-full">
                        <SelectValue placeholder="Pilih kendala" />
                      </SelectTrigger>
                      <SelectContent>
                        {SKM_KENDALA_LAYANAN.map((a) => (
                          <SelectItem key={a} value={a}>
                            {a}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mt-3 space-y-2">
                  <Label htmlFor={`m-saran-${i}`}>
                    Saran Perbaikan
                    <Wajib />
                  </Label>
                  <Textarea
                    id={`m-saran-${i}`}
                    value={m.saran}
                    onChange={(e) => ubahMasukan(i, { saran: e.target.value })}
                    rows={2}
                    placeholder="Menurut Anda, apa yang sebaiknya diperbaiki agar permohonan ini lebih mudah diajukan?"
                  />
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() => setMasukan((prev) => [...prev, { ...BARIS_KOSONG }])}
              className="w-full border-dashed"
            >
              <Plus className="mr-1.5 h-4 w-4" /> Tambah permohonan lain
            </Button>
          </div>
        </div>
      </section>

      {/* ── Bagian 4: usulan layanan baru ──────────────────────────────── */}
      <section className="space-y-3">
        <header className="border-b border-slate-100 pb-2">
          <h3 className="text-sm font-bold text-slate-900">
            Bagian 4 — Usulan Layanan Baru
          </h3>
        </header>
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/50 p-3">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
          <p className="text-xs leading-relaxed text-slate-600">
            Ada jenis permohonan atau layanan yang belum tersedia dan Anda
            harapkan ada di Disdukcapil Kota Tidore Kepulauan?
          </p>
        </div>
        <Textarea
          id="skm-usulan"
          value={usulan}
          onChange={(e) => setUsulan(e.target.value)}
          rows={3}
          placeholder="Tuliskan usulan layanan baru… (tidak wajib diisi)"
        />
      </section>

      {/* ── Bagian 5: saran umum ───────────────────────────────────────── */}
      <section className="space-y-3">
        <header className="border-b border-slate-100 pb-2">
          <h3 className="text-sm font-bold text-slate-900">
            Bagian 5 — Saran & Masukan Umum
          </h3>
        </header>
        <Textarea
          id="skm-saran"
          value={saran}
          onChange={(e) => setSaran(e.target.value)}
          rows={4}
          placeholder="Masukan lain tentang pelayanan kami… (tidak wajib diisi)"
        />
      </section>

      <div className="space-y-2">
        <Button type="submit" className="w-full" disabled={isLoading} size="lg">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <ClipboardCheck className="mr-2 h-4 w-4" />
          )}
          Kirim Survei
        </Button>
        {!lengkap && (
          <p className="text-center text-xs text-slate-400">
            Masih ada {SKM_UNSUR.length - terisi} unsur penilaian yang belum diisi.
          </p>
        )}
      </div>
    </form>
  );
}
