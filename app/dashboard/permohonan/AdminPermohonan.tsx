'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Pagination } from '@/components/shared/pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Loader2, Search, ClipboardList, Clock, CheckCircle2, XCircle, FileText,
  Eye, Lock,
} from 'lucide-react';

/** Status final — data terkunci, hanya bisa dibuka lewat halaman Master. */
const FINAL_STATUS = ['SELESAI', 'DITOLAK'];

interface Item {
  id: number;
  noregister: string;
  status: string;
  catatan: string | null;
  createdAt: string;
  jenisNama: string;
  kategori: string;
  pemohon: string;
  pemohonId: string;
  hp: string;
  jumlahBerkas: number;
}

/** Pilihan alasan penolakan yang lazim; "Lainnya" -> alasan diketik bebas. */
const ALASAN_TOLAK = [
  'Berkas tidak lengkap',
  'Berkas tidak jelas / buram',
  'Data tidak sesuai dengan dokumen',
  'NIK / dokumen tidak valid',
  'Persyaratan belum terpenuhi',
  'Lainnya',
];

const STATUS: Record<string, { label: string; cls: string; icon: React.ElementType }> = {
  MENUNGGU: { label: 'Menunggu', cls: 'text-warning bg-warning/10 border-warning/20', icon: Clock },
  DIPROSES: { label: 'Diproses', cls: 'text-primary bg-primary/10 border-primary/20', icon: Clock },
  SELESAI: { label: 'Selesai', cls: 'text-success bg-success/10 border-success/20', icon: CheckCircle2 },
  DITOLAK: { label: 'Ditolak', cls: 'text-destructive bg-destructive/10 border-destructive/20', icon: XCircle },
};
const STATUS_KEYS = ['MENUNGGU', 'DIPROSES', 'SELESAI', 'DITOLAK'];

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS[status] ?? { label: status, cls: 'text-slate-600 bg-slate-50 border-slate-200', icon: FileText };
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${cfg.cls}`}>
      <Icon className="h-3 w-3" /> {cfg.label}
    </span>
  );
}

export function AdminPermohonan() {
  const [items, setItems] = useState<Item[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [statusFilter, setStatusFilter] = useState('');
  const [jenisFilter, setJenisFilter] = useState('');
  const [wilayahFilter, setWilayahFilter] = useState('');
  const [q, setQ] = useState('');
  /*
   * Pilihan saringan datang dari server, bukan disusun dari baris yang sedang
   * tampil: saringan yang cuma berisi pilihan yang sudah kelihatan tidak
   * menyaring apa pun.
   *
   * ⚠️ `daftarWilayah` sengaja KOSONG untuk Operator OPD — server tidak
   * mengirimnya. Seluruh permohonannya berasal dari satu wilayah, jadi
   * saringannya tak berguna, dan daftar kecamatan se-kabupaten di panelnya
   * menyiratkan data yang memang bukan haknya.
   */
  const [daftarJenis, setDaftarJenis] = useState<{ id: number; nama: string }[]>([]);
  const [daftarWilayah, setDaftarWilayah] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  // Paginasi bernomor. Pencarian & filter dijalankan di server, jadi hasilnya
  // menjangkau SELURUH data — data di halaman 3 tetap ketemu walau kita sedang
  // berada di halaman 1.
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [total, setTotal] = useState(0);
  const [totalHalaman, setTotalHalaman] = useState(1);
  // Token anti-race saat filter/pencarian berubah.
  const reqId = useRef(0);
  const router = useRouter();

  const load = useCallback(
    async (halaman: number, baris = limit) => {
      const my = ++reqId.current;
      setLoading(true);
      const params = new URLSearchParams({
        limit: String(baris),
        page: String(halaman),
      });
      if (statusFilter) params.set('status', statusFilter);
      if (jenisFilter) params.set('jenis', jenisFilter);
      if (wilayahFilter) params.set('wilayah', wilayahFilter);
      if (q.trim()) params.set('q', q.trim());
      const res = await fetch(`/api/admin/permohonan?${params.toString()}`);
      const json = await res.json();
      if (my !== reqId.current) return; // filter/pencarian sudah berganti
      setItems(json.data?.items ?? []);
      setTotal(json.data?.total ?? 0);
      setTotalHalaman(json.data?.totalHalaman ?? 1);
      if (json.data?.counts) setCounts(json.data.counts);
      // Hanya dikirim di halaman 1; jangan menimpanya dengan array kosong saat
      // petugas berpindah halaman.
      if (json.data?.daftarJenis) setDaftarJenis(json.data.daftarJenis);
      if (json.data?.daftarWilayah) setDaftarWilayah(json.data.daftarWilayah);
      setLoading(false);
    },
    [statusFilter, jenisFilter, wilayahFilter, q, limit],
  );

  // Ganti filter → selalu balik ke halaman 1, kalau tidak bisa terdampar di
  // halaman yang sudah tidak ada isinya.
  useEffect(() => {
    setPage(1);
    load(1);
  }, [statusFilter, jenisFilter, wilayahFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  const gantiHalaman = (p: number) => {
    setPage(p);
    load(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Ganti jumlah baris → mulai lagi dari halaman 1 supaya posisi tidak melompat
  // ke luar jangkauan (mis. halaman 9 dari 10 saat baris dinaikkan ke 100).
  const gantiLimit = (l: number) => {
    setLimit(l);
    setPage(1);
    load(1, l);
  };

  /*
   * Detail kini HALAMAN SENDIRI (`/dashboard/permohonan/[id]`), bukan panel
   * yang menggantikan tabel ini.
   *
   * 🔴 Panel lama tidak punya URL: tidak bisa dikirim ke rekan, tidak bisa
   * di-bookmark, dan tombol Kembali peramban melempar petugas keluar dari
   * daftar alih-alih menutup panel. Operator OPD pun tidak punya jalan sama
   * sekali untuk membaca alasan penolakan permohonannya.
   *
   * Formulir prosesnya ikut pindah ke sana — satu tempat, bukan dua.
   */
  const bukaDetail = (it: Item) => router.push(`/dashboard/permohonan/${it.id}`);

  return (
    <div className="glass-card rounded-2xl p-5 md:p-6">
          {/* ─────────── TABEL ─────────── */}
          <div className="flex items-center gap-2 mb-4">
            <ClipboardList className="h-5 w-5 text-slate-700" />
            <h2 className="font-semibold text-slate-900">Daftar Permohonan</h2>
            {!loading && (
              <span className="ml-auto rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500">
                {total} data
              </span>
            )}
          </div>

          {/* Filter & search */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="flex flex-wrap gap-1">
              {[['', 'Semua'], ...STATUS_KEYS.map((k) => [k, STATUS[k].label])].map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setStatusFilter(val)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                    statusFilter === val
                      ? 'bg-primary text-primary-foreground border-transparent'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-primary/40'
                  }`}
                >
                  {label}
                  {counts[val] !== undefined && (
                    <span
                      className={`ml-1.5 inline-flex items-center justify-center rounded-full px-1.5 text-xs font-semibold ${
                        statusFilter === val ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {counts[val]}
                    </span>
                  )}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setPage(1);
                load(1);
              }}
              className="flex gap-2 flex-1"
            >
              <Input placeholder="Cari no. register / nama / NIK..." value={q} onChange={(e) => setQ(e.target.value)} />
              <Button type="submit" variant="outline">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>

          {/* Saringan jenis & wilayah — baris sendiri supaya tidak berdesakan
              dengan chip status dan kotak pencarian di layar sedang. */}
          <div className="mb-4 flex flex-col gap-2 sm:flex-row">
            <Select
              value={jenisFilter || 'semua'}
              onValueChange={(v) => setJenisFilter(v === 'semua' ? '' : v)}
            >
              <SelectTrigger className="w-full sm:w-72">
                <SelectValue placeholder="Semua jenis layanan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="semua">Semua jenis layanan</SelectItem>
                {daftarJenis.map((j) => (
                  <SelectItem key={j.id} value={String(j.id)}>
                    {j.nama}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {daftarWilayah.length > 0 && (
              <Select
                value={wilayahFilter || 'semua'}
                onValueChange={(v) => setWilayahFilter(v === 'semua' ? '' : v)}
              >
                <SelectTrigger className="w-full sm:w-60">
                  <SelectValue placeholder="Semua kecamatan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="semua">Semua kecamatan</SelectItem>
                  {daftarWilayah.map((w) => (
                    <SelectItem key={w} value={w}>
                      {w}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {(jenisFilter || wilayahFilter) && (
              <Button
                variant="ghost"
                onClick={() => {
                  setJenisFilter('');
                  setWilayahFilter('');
                }}
                className="shrink-0 text-slate-500"
              >
                Bersihkan saringan
              </Button>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12 text-sm text-slate-500">Tidak ada permohonan.</div>
          ) : (
            <>
            {/* ── Ponsel: daftar kartu ──────────────────────────────────────
                Tabel 6 kolom harus digeser menyamping di layar sempit; sebagai
                kartu, seluruh isi baris terbaca sekaligus. Mengetuk kartu =
                menekan tombol Detail pada tabel. */}
            <ul className="space-y-2 md:hidden">
              {items.map((it) => (
                <li key={it.id}>
                  <button
                    type="button"
                    onClick={() => bukaDetail(it)}
                    title="Lihat detail, berkas & proses"
                    className="flex w-full items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left transition-colors hover:border-primary/40"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-1.5">
                        <StatusBadge status={it.status} />
                        {FINAL_STATUS.includes(it.status) && (
                          <span
                            className="text-slate-300"
                            title="Permohonan final — buka kunci lewat halaman Master"
                          >
                            <Lock className="h-3.5 w-3.5" />
                          </span>
                        )}
                        <span className="text-[0.7rem] text-slate-400">
                          {new Date(it.createdAt).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </span>
                      <span className="mt-1.5 block truncate text-sm font-medium text-slate-800">
                        {it.jenisNama}
                      </span>
                      <span className="block truncate font-mono text-[0.7rem] text-slate-500">
                        {it.noregister}
                      </span>
                      <span className="mt-1 block truncate text-xs text-slate-500">
                        {it.pemohon}
                      </span>
                      <span className="block truncate text-[0.7rem] text-slate-400">
                        {it.kategori} &middot; {it.jumlahBerkas} berkas
                      </span>
                    </span>
                    <Eye className="mt-0.5 h-4 w-4 shrink-0 text-slate-300" />
                  </button>
                </li>
              ))}
            </ul>

            {/* ── Layar sedang ke atas: tabel ── */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-500 border-b border-slate-200">
                    <th className="py-2 pr-4 font-medium">No. Register</th>
                    <th className="py-2 pr-4 font-medium">Pemohon</th>
                    <th className="py-2 pr-4 font-medium">Jenis</th>
                    <th className="py-2 pr-4 font-medium">Tanggal</th>
                    <th className="py-2 pr-4 font-medium">Status</th>
                    <th className="py-2 pr-4 font-medium">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it) => (
                    <tr key={it.id} className="border-b border-slate-100 align-top">
                      <td className="py-2.5 pr-4 font-mono text-xs">{it.noregister}</td>
                      <td className="py-2.5 pr-4">
                        <div>{it.pemohon}</div>
                        <div className="text-xs text-slate-400 font-mono">{it.pemohonId}</div>
                      </td>
                      <td className="py-2.5 pr-4">
                        <div>{it.jenisNama}</div>
                        <div className="text-xs text-slate-400">{it.kategori} &middot; {it.jumlahBerkas} berkas</div>
                      </td>
                      <td className="py-2.5 pr-4 text-xs text-slate-500">
                        {new Date(it.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="py-2.5 pr-4"><StatusBadge status={it.status} /></td>
                      <td className="py-2.5 pr-4">
                        <div className="flex items-center gap-2">
                          {/* Proses dilakukan dari DETAIL — baca data & berkas dulu. */}
                          <Button size="sm" variant="outline" onClick={() => bukaDetail(it)} title="Lihat detail, berkas & proses">
                            <Eye className="h-3.5 w-3.5 mr-1.5" /> Detail
                          </Button>
                          {FINAL_STATUS.includes(it.status) && (
                            <span className="text-slate-300" title="Permohonan final — buka kunci lewat halaman Master">
                              <Lock className="h-3.5 w-3.5" />
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              page={page}
              totalHalaman={totalHalaman}
              total={total}
              limit={limit}
              onChange={gantiHalaman}
              onLimitChange={gantiLimit}
              disabled={loading}
            />
            </>
          )}

    </div>
  );
}
