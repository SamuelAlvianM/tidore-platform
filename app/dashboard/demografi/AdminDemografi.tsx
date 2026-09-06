'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
  ChevronRight,
  Plus,
  CalendarDays,
  Tag,
  Eye,
  EyeOff,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DEMOGRAFI_KATEGORI,
  deteksiKategori,
  type DemografiKategori,
} from '@/lib/demografi-kategori';
import { DEFAULT_KARTU, KARTU_STATISTIK_KUNCI } from '@/lib/beranda-statistik';
import { DemografiEditor } from '@/components/dashboard/demografi-editor';
import {
  gabungPeriode,
  kueriPeriode,
  kunciPeriode,
  labelPeriode,
  periodeDugaan,
  tahunPilihan,
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

/**
 * Judul kategori yang DIUSULKAN dari nama berkas.
 *
 * 🔴 Ini yang dimaksud "sistem membaca judulnya sendiri". Berkas agregat
 * buatan dinas tidak punya pola SIAK yang bisa dikenali, dan namanya adalah
 * satu-satunya keterangan yang ikut bersama berkasnya. Mengusulkan judul dari
 * situ menghemat pengetikan — tapi usulan tetap DAPAT DISUNTING sebelum
 * disimpan, karena nama berkas sering mengandung sisa penamaan internal yang
 * tidak layak jadi judul publik.
 *
 * Yang dibuang hanya derau yang pasti: penanda AGR/DUSUN dari SIAK, tahun, dan
 * penanda semester. Kata seperti "Data" DIPERTAHANKAN — "Data Kemiskinan"
 * adalah judul yang sah, dan memangkasnya berarti menebak maksud dinas.
 */
function usulJudul(namaBerkas: string): string {
  const bersih = namaBerkas
    .replace(/\.xlsx$/i, '')
    .replace(/[_\-.]+/g, ' ')
    .replace(/\b(agr|dusun|kec|kel)\b/gi, ' ')
    .replace(/\bsem(ester)?\s*(i{1,3}|[12])\b/gi, ' ')
    .replace(/\b(19|20)\d{2}\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const judul = (bersih.length >= 3 ? bersih : namaBerkas.replace(/\.xlsx$/i, ''))
    .toLowerCase()
    .replace(/(^|\s)\S/g, (c) => c.toUpperCase());

  return judul.slice(0, 60);
}

/** Hitungan kategori satu periode: slug → jumlah kecamatan tersimpan. */
type HitunganPeriode = Record<string, number | null>;

/** Berkas yang kategorinya tidak terbaca, menunggu keputusan petugas. */
interface BerkasAsing {
  kunci: string;
  periode: Periode;
  item: { file: File; usul: string }[];
}

/** Kategori beserta dua penanda yang hanya ada di sisi admin. */
interface KategoriAdmin extends DemografiKategori {
  /** Bawaan DKB — tidak dapat dihapus. */
  bawaan: boolean;
  /** Tampil di halaman utama publik. */
  beranda: boolean;
}

export function AdminDemografi() {
  /*
   * 🔴 HALAMAN INI TIDAK PUNYA "PERIODE TERPILIH" LAGI.
   *
   * Dulu seluruh halaman bekerja pada satu periode aktif yang dipilih lewat
   * badge di pojok. Akibatnya periode adalah MODE, bukan benda: petugas yang
   * baru mengunggah DKB Semester I tidak punya cara melihat bahwa Semester II
   * ada dan masih kosong — ia harus membuka pemilih dan menebak. Yang lebih
   * berbahaya, tombol Hapus dan Unggah bekerja pada periode aktif tanpa
   * menyebutkan periode itu di dekat tombolnya sendiri.
   *
   * Sekarang tiap tahun adalah satu baris berisi DUA wadah — Semester I dan
   * Semester II — dan isi wadah yang dibuka terbentang penuh di bawahnya.
   * Menambah tahun berarti membuat sepasang wadah kosong, lalu berkasnya
   * dimasukkan ke dalamnya.
   */
  /*
   * 🔴 DAFTAR KATEGORI DIAMBIL DARI PELADEN, bukan dari konstanta di kode.
   *
   * Delapan kategori bawaan adalah berkas DKB baku dari SIAK, tapi dinas juga
   * menyusun agregatnya sendiri dan isinya berganti tiap tahun. Selama halaman
   * ini membaca konstanta, kategori buatan dinas tidak akan pernah muncul di
   * sini — datanya bisa masuk lewat API tapi tak ada barisnya di layar.
   */
  const [kategori, setKategori] = useState<KategoriAdmin[]>([]);
  const [hitungan, setHitungan] = useState<Record<string, HitunganPeriode>>({});
  const [periodeTersedia, setPeriodeTersedia] = useState<PeriodeTersedia[]>([]);
  /*
   * Tahun yang dibuat petugas tapi belum berisi apa pun — peladen tidak tahu
   * tentangnya, karena peladen hanya mendaftar periode yang PUNYA baris.
   *
   * ⚠️ Disemai dengan tahun berjalan, BUKAN dibiarkan kosong lalu ditambal
   * belakangan saat daftarnya nihil. Tambalan semacam itu menguap begitu tahun
   * pertama ditambahkan: wadah yang sedang ditatap petugas hilang dari layar
   * hanya karena ia membuat wadah lain.
   */
  const [tahunTambahan, setTahunTambahan] = useState<number[]>(() => [
    periodeDugaan().tahun,
  ]);
  const [terbuka, setTerbuka] = useState<Set<string>>(new Set());
  const [memuatDaftar, setMemuatDaftar] = useState(true);

  /** Periode yang sedang mengimpor, beserta kemajuannya. */
  const [impor, setImpor] = useState<
    { kunci: string; ke: number; dari: number; nama: string } | null
  >(null);
  const [menyunting, setMenyunting] = useState<
    { slug: string; label: string; periode: Periode } | null
  >(null);
  const [konfirmasiHapus, setKonfirmasiHapus] = useState<Periode | null>(null);
  const [menghapus, setMenghapus] = useState(false);
  const [konfirmasiReset, setKonfirmasiReset] = useState(false);
  const [mereset, setMereset] = useState(false);

  const [tambahBuka, setTambahBuka] = useState(false);
  const [tahunBaru, setTahunBaru] = useState<number>(new Date().getFullYear());
  const kotakTambah = useRef<HTMLDivElement>(null);

  const [panelKategori, setPanelKategori] = useState(false);
  const [judulKategoriBaru, setJudulKategoriBaru] = useState('');
  const [sibukKategori, setSibukKategori] = useState(false);
  const [konfirmasiHapusKategori, setKonfirmasiHapusKategori] =
    useState<KategoriAdmin | null>(null);
  const [berkasAsing, setBerkasAsing] = useState<BerkasAsing | null>(null);

  const berkas = useRef<Record<string, HTMLInputElement | null>>({});
  const sudahBukaAwal = useRef(false);

  // Reset kartu beranda hanya untuk akun master (Super Admin / level 1).
  const isMaster = useAppSelector((s) => s.auth.user?.level) === 1;

  /*
   * Daftar periode diambil dari endpoint ADMIN, bukan publik.
   *
   * 🔴 `/api/demografi` menghitung periode untuk SATU kategori saja — angkanya
   * akan terbaca sebagai "129 baris" padahal seluruh kategori berjumlah 1.032.
   * Halaman ini mengurus SEMUA kategori sekaligus, jadi hitungannya harus
   * lintas kategori pula.
   */
  const muatDaftarPeriode = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/admin/demografi?kategori=${encodeURIComponent(DEMOGRAFI_KATEGORI[0]?.slug ?? '')}`,
      );
      const j = await res.json();
      const daftar: PeriodeTersedia[] = Array.isArray(j.data?.periodeTersedia)
        ? j.data.periodeTersedia
        : [];
      setPeriodeTersedia((lama) => gabungPeriode(lama, daftar));

      return daftar;
    } catch {
      return [] as PeriodeTersedia[];
    }
  }, []);

  const muatKategori = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/demografi/kategori', { cache: 'no-store' });
      const j = await res.json();
      if (Array.isArray(j.data?.kategori)) setKategori(j.data.kategori);
    } catch {
      toast.error('Gagal memuat daftar kategori');
    }
  }, []);

  /*
   * ⚠️ Keduanya ditunggu SEBELUM daftar wadah dirender.
   *
   * Hitungan per kategori dibangun dari daftar kategori. Kalau wadah pertama
   * sempat terbuka sendiri sementara daftarnya masih kosong, hitungannya
   * tersimpan sebagai objek kosong — dan tiap barisnya tertahan di "memeriksa…"
   * selamanya, karena tidak ada permintaan susulan yang akan menjawabnya.
   */
  useEffect(() => {
    Promise.all([muatDaftarPeriode(), muatKategori()]).finally(() =>
      setMemuatDaftar(false),
    );
  }, [muatDaftarPeriode, muatKategori]);

  /*
   * Hitungan kategori dimuat SAAT WADAHNYA DIBUKA, bukan di awal.
   *
   * ⚠️ Delapan kategori dikali sekian periode berarti puluhan permintaan
   * sekaligus pada tiap kunjungan — untuk angka yang sebagian besarnya tidak
   * sedang dilihat siapa pun. Ringkasan pada wadah yang tertutup sudah cukup
   * dijawab oleh jumlah baris yang ikut datang bersama daftar periode.
   */
  const muatHitungan = useCallback(async (p: Periode) => {
    const k = kunciPeriode(p);
    const q = kueriPeriode(p);
    const hasil: HitunganPeriode = {};

    await Promise.all(
      kategori.map(async (kat) => {
        try {
          const r = await fetch(
            `/api/demografi?kategori=${encodeURIComponent(kat.slug)}&${q}`,
          );
          const j = await r.json();
          hasil[kat.slug] = j.data?.items?.length ?? 0;
        } catch {
          hasil[kat.slug] = 0;
        }
      }),
    );

    setHitungan((h) => ({ ...h, [k]: hasil }));
  }, [kategori]);

  /** Tahun yang punya wadah, terbaru di atas. Tiap tahun selalu dua semester. */
  const tahunUrut = useMemo(() => {
    const tahun = new Set<number>([
      ...periodeTersedia.map((p) => p.tahun),
      ...tahunTambahan,
    ]);

    return [...tahun].sort((a, b) => b - a);
  }, [periodeTersedia, tahunTambahan]);

  const barisPeriode = useCallback(
    (tahun: number, semester: number) =>
      periodeTersedia.find((p) => p.tahun === tahun && p.semester === semester)?.baris ?? 0,
    [periodeTersedia],
  );

  /* Periode terbaru yang BERISI dibuka sendiri sekali di awal — halaman yang
     seluruhnya terlipat tidak memberi tahu apa pun tentang isinya. */
  useEffect(() => {
    if (sudahBukaAwal.current || periodeTersedia.length === 0) return;
    // Menunggu daftar kategori: tanpanya hitungannya lahir kosong dan barisnya
    // tertahan di "memeriksa…" tanpa ada yang akan menjawabnya.
    if (kategori.length === 0) return;
    sudahBukaAwal.current = true;

    const p = periodeTersedia[0];
    setTerbuka(new Set([kunciPeriode(p)]));
    muatHitungan(p);
  }, [periodeTersedia, kategori, muatHitungan]);

  // Tutup panel "Tambah Tahun" saat klik di luar / Esc.
  useEffect(() => {
    if (!tambahBuka) return;

    const klikLuar = (e: MouseEvent) => {
      if (kotakTambah.current && !kotakTambah.current.contains(e.target as Node)) {
        setTambahBuka(false);
      }
    };
    const tekan = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setTambahBuka(false);
    };

    document.addEventListener('mousedown', klikLuar);
    document.addEventListener('keydown', tekan);

    return () => {
      document.removeEventListener('mousedown', klikLuar);
      document.removeEventListener('keydown', tekan);
    };
  }, [tambahBuka]);

  const bukaTutup = (p: Periode) => {
    const k = kunciPeriode(p);
    const akanBuka = !terbuka.has(k);

    setTerbuka((prev) => {
      const n = new Set(prev);
      if (akanBuka) {
        /*
         * Membuka satu semester MENUTUP pasangannya.
         *
         * 🔴 Isi wadah terbentang penuh di bawah pasangan kepalanya. Kalau
         * keduanya boleh terbuka bersamaan, dua panel setinggi delapan baris
         * bertumpuk di bawah satu baris kepala — dan tidak ada lagi petunjuk
         * visual panel mana milik semester mana. Satu terbuka pada satu waktu
         * menjaga jawaban "isi ini milik siapa" tetap satu.
         */
        n.delete(`${p.tahun}-${p.semester === 1 ? 2 : 1}`);
        n.add(k);
      } else {
        n.delete(k);
      }
      return n;
    });

    if (akanBuka && !hitungan[k]) muatHitungan(p);
  };

  const tahunBisaDitambah = useMemo(
    () => tahunPilihan(periodeTersedia).filter((t) => !tahunUrut.includes(t)),
    [periodeTersedia, tahunUrut],
  );

  /*
   * ⚠️ Isian tahun harus selalu menunjuk tahun yang MEMANG bisa ditambah.
   *
   * Nilai awalnya tahun berjalan — dan justru tahun itulah yang paling mungkin
   * sudah punya wadah, sehingga tersaring keluar dari daftar. Akibatnya kotak
   * pilihan memperlihatkan pilihan pertamanya (mis. 2027) sementara state masih
   * 2026: tombolnya bertuliskan "Buat wadah 2026" dan menekannya tidak
   * mengubah apa pun, karena 2026 sudah ada.
   */
  useEffect(() => {
    if (tahunBisaDitambah.length > 0 && !tahunBisaDitambah.includes(tahunBaru)) {
      setTahunBaru(tahunBisaDitambah[0]);
    }
  }, [tahunBisaDitambah, tahunBaru]);

  const tambahTahun = () => {
    setTahunTambahan((d) => (d.includes(tahunBaru) ? d : [...d, tahunBaru]));
    setTambahBuka(false);
    /* Wadah barunya langsung dibuka: yang dicari petugas sesudah membuatnya
       adalah tombol impor di dalamnya, bukan barisnya yang masih terlipat. */
    setTerbuka((prev) => new Set([...prev, `${tahunBaru}-1`]));

    /*
     * Wadah baru disemai NOL, bukan objek kosong.
     *
     * ⚠️ Objek kosong membuat tiap kategori terbaca `null` — dan `null` di sini
     * berarti "sedang diperiksa", sehingga barisnya tertahan di "memeriksa…"
     * selamanya karena tidak ada permintaan yang akan menjawabnya. Tahun ini
     * baru saja disaring keluar dari daftar periode yang punya baris, jadi
     * kosongnya bukan dugaan: sudah pasti.
     */
    const kosong = Object.fromEntries(
      kategori.map((kat) => [kat.slug, 0]),
    ) as HitunganPeriode;
    setHitungan((h) => ({
      ...h,
      [`${tahunBaru}-1`]: kosong,
      [`${tahunBaru}-2`]: kosong,
    }));

    toast.success(`Wadah tahun ${tahunBaru} dibuat — Semester I & II siap diisi`);
  };

  /** Tambah kategori buatan dinas. `judul` bebas; slug-nya disusun peladen. */
  const tambahKategori = async (judul: string) => {
    setSibukKategori(true);
    try {
      const res = await fetch('/api/admin/demografi/kategori', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ judul }),
      });
      const j = await res.json();
      if (j.error?.length) {
        toast.error(j.error[0]);
        return null;
      }
      toast.success(j.success?.[0] ?? 'Kategori dibuat');
      await muatKategori();

      return (j.data?.kategori ?? null) as DemografiKategori | null;
    } catch {
      toast.error('Gagal membuat kategori');
      return null;
    } finally {
      setSibukKategori(false);
    }
  };

  /*
   * Tampil di halaman utama.
   *
   * ⚠️ Dikirim sebagai DAFTAR LENGKAP, bukan satu slug yang di-toggle. Dua
   * petugas yang menyalakan kategori berbeda pada saat yang hampir sama akan
   * saling menimpa kalau tiap permintaan hanya membawa perubahannya sendiri
   * — dan yang kalah tidak pernah tahu pilihannya hilang. Daftar penuh
   * membuat keadaan akhir persis seperti yang terlihat di layar pengirimnya.
   */
  const ubahBeranda = async (slug: string, tampil: boolean) => {
    const sebelum = kategori;
    const sesudah = kategori.map((k) => (k.slug === slug ? { ...k, beranda: tampil } : k));
    setKategori(sesudah); // optimistis — jawabannya harus terasa seketika

    try {
      const res = await fetch('/api/admin/demografi/kategori', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ beranda: sesudah.filter((k) => k.beranda).map((k) => k.slug) }),
      });
      const j = await res.json();
      if (j.error?.length) {
        toast.error(j.error[0]);
        setKategori(sebelum); // layar kembali jujur
      }
    } catch {
      toast.error('Gagal menyimpan tampilan halaman utama');
      setKategori(sebelum);
    }
  };

  const hapusKategori = async (slug: string, label: string) => {
    setSibukKategori(true);
    try {
      const res = await fetch(
        `/api/admin/demografi/kategori?slug=${encodeURIComponent(slug)}`,
        { method: 'DELETE' },
      );
      const j = await res.json();
      if (j.error?.length) {
        toast.error(j.error[0]);
        return;
      }
      toast.success(j.success?.[0] ?? `Kategori "${label}" dihapus`);
      await muatKategori();
    } catch {
      toast.error('Gagal menghapus kategori');
    } finally {
      setSibukKategori(false);
    }
  };

  /**
   * Impor satu berkas ke satu kategori. Mengembalikan pesan galat, atau null
   * bila berhasil — pemanggilnya mengimpor berkas berurutan dan perlu tahu.
   */
  const imporSatu = async (slug: string, file: File, p: Periode) => {
    try {
      const form = new FormData();
      form.append('file', file);
      form.append('kategori', slug);
      // Tanpa ini peladen memakai periode terbaru — dan berkas Semester I bisa
      // mendarat menimpa Semester II hanya karena periodenya tidak disebut.
      form.append('tahun', String(p.tahun));
      form.append('semester', String(p.semester));

      const res = await fetch('/api/admin/demografi/import', { method: 'POST', body: form });
      const j = await res.json();

      return j.error?.length ? String(j.error[0]) : null;
    } catch {
      return 'Gagal mengunggah file';
    }
  };

  /*
   * 🔴 SATU TOMBOL IMPOR UNTUK SELURUH PERIODE, bukan satu per kategori.
   *
   * Dinas menerima paket DKB sebagai sekumpulan berkas sekaligus, dan tidak
   * menghafal berkas mana milik kategori mana. Selama kategorinya harus
   * ditunjuk lebih dulu lewat tombol unggah di kartunya masing-masing, salah
   * taruh hanya soal waktu — dan salah taruh berarti data pekerjaan tertimpa
   * data pendidikan, diam-diam, tanpa cara mengembalikannya.
   *
   * Di sini kategori DIBACA DARI NAMA BERKASNYA. Berkas yang tidak terbaca
   * TIDAK ditebak: namanya disebutkan kepada petugas supaya ia mengimpornya
   * lewat Edit pada kategori yang ia maksud sendiri.
   */
  const imporBanyak = async (daftar: FileList | null, p: Periode) => {
    if (!daftar || daftar.length === 0) return;

    const k = kunciPeriode(p);
    const semua = [...daftar];
    const dikenal: { file: File; slug: string; label: string }[] = [];
    const asing: { file: File; usul: string }[] = [];

    for (const f of semua) {
      const kat = deteksiKategori(f.name, kategori);
      if (kat) dikenal.push({ file: f, slug: kat.slug, label: kat.label });
      else asing.push({ file: f, usul: usulJudul(f.name) });
    }

    /*
     * Berkas yang tak terbaca TIDAK dibuang dan tidak ditebak — ia ditahan
     * bersama File-nya, dan petugas ditawari membuat kategorinya di tempat.
     * Menahan File-nya penting: tanpa itu petugas harus memilih berkas yang
     * sama untuk kedua kalinya setelah kategorinya jadi.
     */
    setBerkasAsing(asing.length > 0 ? { kunci: k, periode: p, item: asing } : null);

    if (dikenal.length === 0) return;

    const gagal: string[] = [];
    for (let i = 0; i < dikenal.length; i += 1) {
      const { file, slug, label } = dikenal[i];
      setImpor({ kunci: k, ke: i + 1, dari: dikenal.length, nama: label });
      const galat = await imporSatu(slug, file, p);
      if (galat) gagal.push(`${label}: ${galat}`);
    }
    setImpor(null);

    const berhasil = dikenal.length - gagal.length;
    if (berhasil > 0) {
      toast.success(
        `${berhasil} kategori terimpor ke ${labelPeriode(p.tahun, p.semester)}`,
      );
    }
    if (gagal.length > 0) toast.error(gagal.join(' · '));

    muatHitungan(p);
    // Impor ke periode yang belum pernah ada menambah satu entri di daftar.
    muatDaftarPeriode();
  };

  const hapusPeriode = async () => {
    const p = konfirmasiHapus;
    if (!p) return;

    setMenghapus(true);
    try {
      /*
       * 🔴 Menghapus HANYA periode wadah ini.
       *
       * Dulu tombol ini menyapu seluruh tabel. Sejak beberapa periode bisa
       * berdampingan, menyapu semuanya berarti satu klik menghapus data
       * bertahun-tahun — termasuk semester yang tidak sedang dilihat petugas.
       */
      const res = await fetch(`/api/admin/demografi?${kueriPeriode(p)}`, {
        method: 'DELETE',
      });
      const j = await res.json();
      if (j.error?.length) {
        toast.error(j.error[0]);
        return;
      }
      toast.success(j.success?.[0] ?? 'Data periode ini dihapus');
      setKonfirmasiHapus(null);
      setPeriodeTersedia((d) =>
        d.filter((x) => !(x.tahun === p.tahun && x.semester === p.semester)),
      );
      /* Wadahnya TETAP ada, hanya isinya yang hilang — tahunnya dipertahankan
         supaya petugas bisa langsung mengimpor ulang di tempat yang sama. */
      setTahunTambahan((d) => (d.includes(p.tahun) ? d : [...d, p.tahun]));
      muatHitungan(p);
    } catch {
      toast.error('Gagal menghapus data');
    } finally {
      setMenghapus(false);
    }
  };

  /** Kembalikan susunan kartu statistik beranda ke 6 kartu bawaan. */
  const resetKartu = async () => {
    setMereset(true);
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
      setKonfirmasiReset(false);
    } catch {
      toast.error('Gagal mereset kartu beranda');
    } finally {
      setMereset(false);
    }
  };

  /** Kepala wadah satu semester — separuh baris, bisa diklik untuk membuka. */
  const kepalaPeriode = (p: Periode) => {
    const k = kunciPeriode(p);
    const buka = terbuka.has(k);
    const isi = hitungan[k];
    const terisi = isi
      ? kategori.filter((kat) => (isi[kat.slug] ?? 0) > 0).length
      : 0;
    const baris = barisPeriode(p.tahun, p.semester);
    const adaData = isi ? terisi > 0 : baris > 0;

    return (
      <button
        key={k}
        type="button"
        onClick={() => bukaTutup(p)}
        aria-expanded={buka}
        title={`Buka isi ${labelPeriode(p.tahun, p.semester)}`}
        className={cn(
          'flex min-w-0 items-center gap-3 rounded-2xl border bg-white px-4 py-3 text-left transition-colors',
          buka
            ? 'border-primary/40 ring-1 ring-primary/20'
            : adaData
              ? 'border-slate-200 hover:border-primary/40'
              : 'border-dashed border-slate-300 hover:border-primary/40',
        )}
      >
        <ChevronRight
          className={cn(
            'h-4 w-4 flex-shrink-0 text-slate-400 transition-transform',
            buka && 'rotate-90',
          )}
        />
        <span
          className={cn(
            'flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl',
            adaData ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-400',
          )}
        >
          <CalendarDays className="h-4 w-4" />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-semibold text-slate-900">
            {labelPeriode(p.tahun, p.semester)}
          </span>
          <span className="block truncate text-xs text-slate-400">
            {isi
              ? terisi > 0
                ? `${terisi} dari ${kategori.length} kategori terisi`
                : 'Belum ada data'
              : baris > 0
                ? `${baris.toLocaleString('id-ID')} baris tersimpan`
                : 'Belum ada data'}
          </span>
        </span>
      </button>
    );
  };

  /** Isi wadah yang terbuka — membentang penuh di bawah pasangan semesternya. */
  const isiPeriode = (p: Periode) => {
    const k = kunciPeriode(p);
    const isi = hitungan[k];
    const sedangImpor = impor?.kunci === k;
    const adaData = isi
      ? kategori.some((kat) => (isi[kat.slug] ?? 0) > 0)
      : barisPeriode(p.tahun, p.semester) > 0;

    return (
      <div key={`isi-${k}`} className="rounded-2xl border border-slate-200 bg-white">
        {/*
          Impor, Export, dan Hapus DUDUK DI ATAS isi wadahnya.

          🔴 Ketiganya bekerja pada SELURUH periode ini. Ketika tombol unggah
          masih menempel pada tiap kategori, tidak ada satu pun tempat di layar
          yang berkata "ini yang berlaku untuk seluruh Semester I 2027" — dan
          tombol Hapus melayang di kepala halaman, jauh dari data yang
          dihapusnya.
        */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 px-4 py-3">
          <p className="mr-auto text-xs font-semibold uppercase tracking-wide text-slate-400">
            Isi {labelPeriode(p.tahun, p.semester)}
          </p>

          <Button size="sm" disabled={!!impor} onClick={() => berkas.current[k]?.click()}>
            {sedangImpor ? (
              <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
            ) : (
              <Upload className="mr-1.5 h-4 w-4" />
            )}
            {sedangImpor ? `${impor.nama} (${impor.ke}/${impor.dari})` : 'Import Excel'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={!adaData}
            onClick={() => downloadFile(`/api/admin/demografi/export?${kueriPeriode(p)}`)}
            title={`Unduh semua kategori ${labelPeriode(p.tahun, p.semester)} dalam satu file Excel`}
          >
            <Download className="mr-1.5 h-4 w-4" /> Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={!adaData}
            onClick={() => setKonfirmasiHapus(p)}
            className="border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
            title={`Hapus seluruh data ${labelPeriode(p.tahun, p.semester)}`}
          >
            <Trash2 className="mr-1.5 h-4 w-4" /> Hapus
          </Button>

          <input
            ref={(el) => {
              berkas.current[k] = el;
            }}
            type="file"
            accept=".xlsx"
            multiple
            className="hidden"
            disabled={!!impor}
            onChange={(e) => {
              imporBanyak(e.target.files, p);
              e.target.value = '';
            }}
          />
        </div>

        <p className="border-b border-slate-100 bg-slate-50/60 px-4 py-2 text-xs text-slate-500">
          Beberapa berkas sekaligus boleh dipilih — kategorinya dikenali dari nama
          berkas (mis. <b>AGR_JK_DUSUN</b> → Jenis Kelamin).
        </p>

        {/*
          Berkas yang kategorinya tidak terbaca.

          🔴 Ditawarkan menjadi KATEGORI BARU, bukan sekadar ditolak. Inilah
          jalan masuk agregat buatan dinas: judulnya dibaca dari nama berkasnya
          dan boleh disunting, lalu kategori dibuat dan berkasnya langsung
          diimpor ke periode ini. Menolak saja memaksa petugas menebak sendiri
          bahwa ia perlu membuat kategori lebih dulu — dan tak ada apa pun di
          layar yang mengatakan itu.
        */}
        {berkasAsing?.kunci === k && berkasAsing.item.length > 0 && (
          <div className="border-b border-amber-200 bg-amber-50 px-4 py-3">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-amber-800">
              <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
              {berkasAsing.item.length} berkas belum punya kategori
            </p>

            <div className="space-y-2">
              {berkasAsing.item.map((it, i) => (
                <div key={it.file.name} className="flex flex-wrap items-center gap-2">
                  <span className="min-w-0 flex-1 truncate text-xs text-amber-900">
                    {it.file.name}
                  </span>
                  <input
                    value={it.usul}
                    onChange={(e) =>
                      setBerkasAsing((b) =>
                        b
                          ? {
                              ...b,
                              item: b.item.map((x, j) =>
                                j === i ? { ...x, usul: e.target.value } : x,
                              ),
                            }
                          : b,
                      )
                    }
                    maxLength={60}
                    aria-label={`Nama kategori untuk ${it.file.name}`}
                    className="h-8 w-56 rounded-lg border border-amber-300 bg-white px-2 text-sm"
                  />
                  <Button
                    size="sm"
                    disabled={sibukKategori || it.usul.trim().length < 3}
                    onClick={async () => {
                      const dibuat = await tambahKategori(it.usul.trim());
                      if (!dibuat) return;

                      const galat = await imporSatu(dibuat.slug, it.file, berkasAsing.periode);
                      if (galat) {
                        toast.error(`${dibuat.label}: ${galat}`);
                        return;
                      }
                      toast.success(`${dibuat.label} terimpor ke ${labelPeriode(p.tahun, p.semester)}`);
                      setBerkasAsing((b) =>
                        b ? { ...b, item: b.item.filter((_, j) => j !== i) } : b,
                      );
                      muatHitungan(berkasAsing.periode);
                      muatDaftarPeriode();
                    }}
                  >
                    Buat kategori &amp; impor
                  </Button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setBerkasAsing(null)}
              className="mt-2 text-[0.7rem] font-medium text-amber-700 underline underline-offset-2"
            >
              Lewati berkas ini
            </button>
          </div>
        )}

        {!isi ? (
          <div className="flex justify-center py-10">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {kategori.map((kat) => {
              const jumlah = isi[kat.slug];

              return (
                <div key={kat.slug} className="flex items-center gap-3 px-4 py-3">
                  <div
                    className={cn(
                      'flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl',
                      jumlah ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-400',
                    )}
                  >
                    <FileSpreadsheet className="h-4 w-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-900">{kat.label}</p>
                    <p className="truncate text-xs text-slate-400">File: {kat.fileHint}</p>
                  </div>

                  <p className="hidden flex-shrink-0 text-xs sm:block">
                    {jumlah == null ? (
                      <span className="text-slate-400">memeriksa…</span>
                    ) : jumlah > 0 ? (
                      <span className="inline-flex items-center gap-1 text-success">
                        <CheckCircle2 className="h-3.5 w-3.5" /> {jumlah} kecamatan
                      </span>
                    ) : (
                      <span className="text-slate-400">Belum ada data</span>
                    )}
                  </p>

                  {/*
                    Hanya "Edit" di tiap baris.

                    Impor sudah pindah ke atas, dan editor inilah tempat satu
                    kategori diurus sendirian — termasuk mengimpor berkasnya
                    bila nama berkasnya tidak terbaca oleh impor massal.
                  */}
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!!impor}
                    onClick={() =>
                      setMenyunting({ slug: kat.slug, label: kat.label, periode: p })
                    }
                    className="flex-shrink-0"
                    title={`Edit / import ${kat.label} pada ${labelPeriode(p.tahun, p.semester)}`}
                  >
                    <Pencil className="mr-1.5 h-4 w-4" /> Edit
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/*
        Petunjuk membentang SATU BARIS PENUH di paling atas.

        🔴 Sebelumnya ia berbagi baris dengan deretan tombol aksi. Di layar
        selebar apa pun tombol-tombol itu mengambil haknya lebih dulu, dan
        petunjuknya terjepit jadi kolom sempit setinggi dua belas baris — masih
        terbaca, tapi terlihat seperti kerusakan tata letak. Petunjuk dibaca
        sekali lalu diabaikan; ia tidak perlu bersaing dengan apa pun.
      */}
      <p className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-2.5 text-sm text-slate-700">
        Unggah Excel agregat Dukcapil (format SIAK: kolom <b>IDEM, KODE, WILAYAH, …</b>)
        pada wadah periodenya. Setiap unggahan <b>mengganti</b> kategori itu{' '}
        <b>di periode tersebut saja</b> — periode lain tidak tersentuh.
      </p>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div ref={kotakTambah} className="relative">
          <Button variant="outline" size="sm" onClick={() => setTambahBuka((b) => !b)}>
            <Plus className="mr-1.5 h-4 w-4" /> Tambah Tahun
          </Button>

          {tambahBuka && (
            <div className="absolute left-0 z-40 mt-2 w-60 rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
              {tahunBisaDitambah.length === 0 ? (
                <p className="text-xs text-slate-500">
                  Semua tahun yang mungkin sudah punya wadah.
                </p>
              ) : (
                <>
                  <label className="block">
                    <span className="mb-1 block text-[0.65rem] font-semibold uppercase tracking-wide text-slate-500">
                      Tahun
                    </span>
                    <select
                      value={tahunBaru}
                      onChange={(e) => setTahunBaru(Number(e.target.value))}
                      className="h-9 w-full rounded-lg border border-slate-300 bg-white px-2 text-sm"
                    >
                      {tahunBisaDitambah.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </label>
                  <p className="mt-2 text-[0.7rem] leading-relaxed text-slate-500">
                    Membuat dua wadah kosong — <b>Semester I</b> dan <b>Semester II</b>.
                    Berkasnya diimpor ke dalamnya setelah itu.
                  </p>
                  <Button size="sm" className="mt-2 w-full" onClick={tambahTahun}>
                    Buat wadah {tahunBaru}
                  </Button>
                </>
              )}
            </div>
          )}
        </div>

        {isMaster && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setKonfirmasiReset(true)}
            title="Kembalikan kartu statistik beranda ke 6 kartu bawaan (khusus akun master)"
          >
            <RotateCcw className="mr-1.5 h-4 w-4" /> Reset Kartu Beranda
          </Button>
        )}
      </div>

      {/*
        KATEGORI berdiri SENDIRI, di luar wadah periode.

        🔴 Menambah kategori dan menampilkannya di halaman utama berlaku untuk
        SELURUH portal, bukan untuk satu semester. Menaruh sakelarnya di dalam
        wadah Semester I 2027 akan mengajarkan hal yang salah — seolah sebuah
        kategori bisa tampil di beranda untuk satu semester dan tidak untuk
        semester lain. Yang berbeda per periode hanyalah DATANYA.
      */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <button
          type="button"
          onClick={() => setPanelKategori((b) => !b)}
          aria-expanded={panelKategori}
          className="flex w-full items-center gap-3 px-4 py-3 text-left"
        >
          <ChevronRight
            className={cn(
              'h-4 w-4 flex-shrink-0 text-slate-400 transition-transform',
              panelKategori && 'rotate-90',
            )}
          />
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Tag className="h-4 w-4" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold text-slate-900">Kategori Data</span>
            <span className="block truncate text-xs text-slate-400">
              {kategori.length} kategori · {kategori.filter((k) => k.beranda).length} tampil
              di halaman utama
            </span>
          </span>
        </button>

        <div
          inert={!panelKategori}
          className={cn(
            'grid transition-[grid-template-rows] duration-300 ease-out',
            panelKategori ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          )}
        >
          <div className="overflow-hidden">
            <div className="divide-y divide-slate-100 border-t border-slate-100">
              {kategori.map((kat) => (
                <div key={kat.slug} className="flex flex-wrap items-center gap-2 px-4 py-2.5">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-800">
                      {kat.label}
                      {!kat.bawaan && (
                        <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-[0.65rem] font-semibold text-slate-500">
                          dibuat dinas
                        </span>
                      )}
                    </p>
                    <p className="truncate text-xs text-slate-400">{kat.slug}</p>
                  </div>

                  {/*
                    Sakelar tampil-di-beranda ditulis sebagai KALIMAT KEADAAN,
                    bukan ikon mata sendirian. Ikon mata punya dua bacaan yang
                    berlawanan — "sedang terlihat" dan "klik untuk melihat" —
                    dan petugas tidak boleh menebak yang mana pada pengaturan
                    yang mengubah apa yang dilihat warga.
                  */}
                  <button
                    type="button"
                    onClick={() => ubahBeranda(kat.slug, !kat.beranda)}
                    className={cn(
                      'inline-flex flex-shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 transition-colors',
                      kat.beranda
                        ? 'bg-primary/10 text-primary ring-primary/20 hover:bg-primary/15'
                        : 'bg-slate-100 text-slate-500 ring-slate-200 hover:bg-slate-200',
                    )}
                    title={
                      kat.beranda
                        ? 'Sedang tampil di halaman utama — klik untuk menyembunyikan'
                        : 'Tersembunyi dari halaman utama — klik untuk menampilkan'
                    }
                  >
                    {kat.beranda ? (
                      <Eye className="h-3.5 w-3.5" />
                    ) : (
                      <EyeOff className="h-3.5 w-3.5" />
                    )}
                    {kat.beranda ? 'Tampil di Halaman utama' : 'Tidak tampil'}
                  </button>

                  {!kat.bawaan && (
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={sibukKategori}
                      onClick={() => setKonfirmasiHapusKategori(kat)}
                      className="flex-shrink-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      title={`Hapus kategori ${kat.label}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {isMaster && (
              <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 bg-slate-50/60 px-4 py-3">
                <input
                  value={judulKategoriBaru}
                  onChange={(e) => setJudulKategoriBaru(e.target.value)}
                  placeholder="Nama kategori baru, mis. Penyandang Disabilitas"
                  maxLength={60}
                  className="h-9 min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 text-sm"
                />
                <Button
                  size="sm"
                  disabled={sibukKategori || judulKategoriBaru.trim().length < 3}
                  onClick={async () => {
                    const dibuat = await tambahKategori(judulKategoriBaru.trim());
                    if (dibuat) setJudulKategoriBaru('');
                  }}
                >
                  {sibukKategori ? (
                    <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="mr-1.5 h-4 w-4" />
                  )}
                  Tambah Kategori
                </Button>
                <p className="w-full text-[0.7rem] leading-relaxed text-slate-500">
                  Kategori baru langsung bisa diisi berkas di tiap periode. Berkas
                  dikenali bila namanya memuat nama kategori ini.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {memuatDaftar ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : (
        <div className="space-y-4">
          {tahunUrut.map((tahun) => (
            <div key={tahun}>
              {/*
                Satu tahun = SATU BARIS berisi dua wadah bersebelahan.

                Semester I dan II adalah pasangan; menumpuknya sebagai dua
                baris terpisah membuat tahun yang sama terbaca seperti dua hal
                yang tak berhubungan, dan daftar empat tahun langsung menjadi
                delapan baris yang harus digulir.
              */}
              <div className="grid gap-3 sm:grid-cols-2">
                {kepalaPeriode({ tahun, semester: 1 })}
                {kepalaPeriode({ tahun, semester: 2 })}
              </div>

              {/*
                Isinya terbentang PENUH di bawah pasangannya, bukan terjepit di
                kolom separuh layar tempat kepalanya berada.

                ⚠️ Panelnya SELALU ada di DOM, tingginya yang dianimasikan lewat
                `grid-rows-[0fr] → [1fr]`. Melepas dan memasang ulang elemennya
                membuat pergantian semester berkedip: yang lama lenyap seketika,
                yang baru muncul seketika, dan mata kehilangan jejak apa yang
                barusan terjadi. Trik grid ini menganimasikan tinggi tanpa perlu
                mengetahui tinggi isinya lebih dulu.
              */}
              {[1, 2].map((s) => {
                const buka = terbuka.has(`${tahun}-${s}`);

                return (
                  <div
                    key={`panel-${tahun}-${s}`}
                    /* `inert` mencabut panel tertutup dari urutan Tab dan dari
                       pohon aksesibilitas. Tanpa itu tombol Import/Hapus milik
                       semester yang TIDAK terlihat tetap bisa dijangkau
                       keyboard — dan ditekan tanpa pernah tampak di layar. */
                    inert={!buka}
                    className={cn(
                      'grid transition-[grid-template-rows] duration-300 ease-out',
                      buka ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                    )}
                  >
                    {/* Padding atasnya ikut di DALAM area yang menciut, supaya
                        panel tertutup benar-benar setinggi nol — bukan menyisakan
                        celah kosong di bawah tiap baris tahun. */}
                    <div className="overflow-hidden">
                      <div className="pt-3">{isiPeriode({ tahun, semester: s })}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {menyunting && (
        <DemografiEditor
          kategori={menyunting.slug}
          label={menyunting.label}
          /* Editor mewarisi periode WADAHNYA dan tidak boleh berpindah sendiri:
             tanpa `onPeriode` pemilih periode di dalamnya tidak dirender, jadi
             tidak ada jalan bagi berkas untuk mendarat di semester yang salah. */
          periode={menyunting.periode}
          open
          onOpenChange={(o) => !o && setMenyunting(null)}
          onSaved={() => {
            muatHitungan(menyunting.periode);
            muatDaftarPeriode();
          }}
        />
      )}

      {/*
        ⚠️ "Data Tersimpan" DIHAPUS dari halaman ini.

        Ia menyalin tampilan publik lengkap dengan pemilih periodenya sendiri —
        pemilih yang tidak tahu-menahu tentang wadah di atasnya. Jadi halaman
        ini memperlihatkan dua gagasan periode yang berbeda sekaligus, dan yang
        di bawah selalu berkata "Belum ada data" untuk periode yang wadahnya
        justru penuh. Pratinjau isi data tetap ada, di tempat yang benar: di
        dalam Edit tiap kategori, yang memang terikat pada satu periode.
      */}

      {/* Konfirmasi hapus data satu periode */}
      <Dialog
        open={!!konfirmasiHapus}
        onOpenChange={(o) => !menghapus && !o && setKonfirmasiHapus(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" /> Hapus data{' '}
              {konfirmasiHapus
                ? labelPeriode(konfirmasiHapus.tahun, konfirmasiHapus.semester)
                : 'periode ini'}
              ?
            </DialogTitle>
            <DialogDescription>
              Data <b>semua kategori</b> (kecamatan &amp; desa) pada{' '}
              <b>
                {konfirmasiHapus
                  ? labelPeriode(konfirmasiHapus.tahun, konfirmasiHapus.semester)
                  : 'periode ini'}
              </b>{' '}
              akan dihapus permanen. <b>Periode lain tidak tersentuh.</b> Sebaiknya{' '}
              <b>Export</b> dulu sebagai cadangan. Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setKonfirmasiHapus(null)}
              disabled={menghapus}
            >
              Batal
            </Button>
            <Button
              onClick={hapusPeriode}
              disabled={menghapus}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              {menghapus ? (
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="mr-1.5 h-4 w-4" />
              )}
              Ya, hapus periode ini
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Konfirmasi hapus kategori buatan dinas */}
      <Dialog
        open={!!konfirmasiHapusKategori}
        onOpenChange={(o) => !sibukKategori && !o && setKonfirmasiHapusKategori(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" /> Hapus kategori{' '}
              {konfirmasiHapusKategori?.label}?
            </DialogTitle>
            <DialogDescription>
              Kategori ini hilang dari dasbor dan dari halaman utama, di{' '}
              <b>semua periode</b>. Penghapusan <b>ditolak</b> selama masih ada
              datanya — hapus dulu isinya lewat tombol <b>Hapus</b> pada periode
              yang bersangkutan, supaya tidak ada baris yang tertinggal tanpa
              pemilik.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setKonfirmasiHapusKategori(null)}
              disabled={sibukKategori}
            >
              Batal
            </Button>
            <Button
              onClick={async () => {
                if (!konfirmasiHapusKategori) return;
                await hapusKategori(
                  konfirmasiHapusKategori.slug,
                  konfirmasiHapusKategori.label,
                );
                setKonfirmasiHapusKategori(null);
              }}
              disabled={sibukKategori}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              {sibukKategori ? (
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="mr-1.5 h-4 w-4" />
              )}
              Ya, hapus kategori
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Konfirmasi reset kartu statistik beranda ke bawaan */}
      <Dialog open={konfirmasiReset} onOpenChange={(o) => !mereset && setKonfirmasiReset(o)}>
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
            <Button variant="outline" onClick={() => setKonfirmasiReset(false)} disabled={mereset}>
              Batal
            </Button>
            <Button onClick={resetKartu} disabled={mereset}>
              {mereset ? (
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
