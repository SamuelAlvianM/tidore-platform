"use client";

import { useCallback, useEffect, useState } from "react";
import {
  FileText,
  Baby,
  Users,
  UserPlus,
  Printer,
  ScrollText,
  Heart,
  Book,
  IdCard,
  MapPin,
  Home,
  Zap,
  Search,
  ArrowRight,
  FilePlus2,
  SlidersHorizontal,
  EyeOff,
  Clock,
  ListChecks,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { BackButton } from "@/components/shared/back-button";
import { useAppSelector } from "@/store/hooks";
import { LAYANAN_FORMS, type LayananForm } from "@/lib/layanan-forms";
import { StaffPengajuanForm } from "@/components/dashboard/staff-pengajuan-form";
import { PengaturanPelayanan } from "@/components/dashboard/pengaturan-pelayanan";
import { cn } from "@/lib/utils";
import { slugTersembunyi } from "@/lib/pelayanan-list";
import { KATEGORI_LAYANAN } from "@/lib/permohonan-layanan";
import { kategoriSlug, warnaKategori, WARNA_MATI } from "@/lib/kategori";
import { isAdmin, isPetugas } from "@/lib/akun-level";
import { JamLayananEditor } from "@/components/dashboard/jam-layanan-editor";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const ICONS: Record<string, React.ElementType> = {
  FileText,
  Baby,
  Users,
  UserPlus,
  Printer,
  ScrollText,
  Heart,
  Book,
  IdCard,
  MapPin,
  Home,
  Zap,
};

export function PengajuanBaruClient() {
  const [selected, setSelected] = useState<LayananForm | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [q, setQ] = useState("");
  const [kat, setKat] = useState("all");
  const { user } = useAppSelector((s) => s.auth);
  const level = user?.level ?? 3;
  /*
   * Pengaturan layanan kini dibuka untuk STAF juga, bukan admin saja —
   * merekalah yang tahu lebih dulu saat blangko habis atau server SIAK padam,
   * dan menunggu admin berarti warga tetap mengirim permohonan yang sudah
   * pasti tidak bisa diproses.
   *
   * ⚠️ Yang tetap milik admin adalah MENEROBOS layanan yang tertutup — lihat
   * `bolehTerobos` di bawah dan penjagaan di API.
   */
  const bolehAtur = isPetugas(level);
  // Jam kerja = kebijakan dinas, dijaga level 1 di servernya. Lihat catatan
  // di drawer: kontrol yang pasti ditolak server tidak boleh ditampilkan.
  const bolehJam = isAdmin(level);
  const bolehTerobos = isAdmin(level);

  // Layanan yang dimatikan dinas. Petugas tetap melihat kartunya — berwarna
  // abu-abu — supaya ia tahu layanan itu ADA dan sedang ditutup, bukan
  // mengira daftarnya berubah tanpa sebab.
  const [mati, setMati] = useState<Set<string>>(new Set());

  /*
   * 🔴 Dijadikan fungsi supaya bisa DIPANGGIL ULANG saat drawer ditutup.
   *
   * Sebelumnya ini efek sekali-jalan. Petugas mematikan sebuah layanan lewat
   * drawer, menutupnya, lalu melihat layanan itu masih menyala di belakangnya
   * — dan menyimpulkan pengaturannya gagal tersimpan, padahal sudah. Satu-
   * satunya cara melihat keadaan sebenarnya adalah memuat ulang halaman.
   */
  const muatVisibilitas = useCallback(async () => {
    try {
      const res = await fetch('/api/static-content?keys=pelayanan.visibilitas', {
        // Jawaban lama dari cache peramban akan mengalahkan tujuan penyegaran.
        cache: 'no-store',
      });
      const j = await res.json();
      setMati(slugTersembunyi(j.data?.items?.['pelayanan.visibilitas']?.hidden));
    } catch {
      // Gagal memuat = tampilkan semua; bukan keadaan fatal.
    }
  }, []);

  useEffect(() => { muatVisibilitas(); }, [muatVisibilitas]);

  const cocokCari = (l: LayananForm) => {
    const cari = q.trim().toLowerCase();
    if (!cari) return true;
    return (
      l.title.toLowerCase().includes(cari) || l.desc.toLowerCase().includes(cari)
    );
  };

  const hasilCari = LAYANAN_FORMS.filter(cocokCari);

  /*
   * Hitungan tab dihitung dari HASIL PENCARIAN, bukan seluruh daftar.
   *
   * ⚠️ Kalau dihitung dari semuanya, tab bisa berbunyi "Akta 5" lalu terbuka
   * kosong karena kata kuncinya tidak cocok satu pun — angka yang berbohong.
   */
  const jumlahKat: Record<string, number> = { all: hasilCari.length };
  for (const l of hasilCari) {
    const k = kategoriSlug(l.slug);
    if (k) jumlahKat[k] = (jumlahKat[k] ?? 0) + 1;
  }

  const filtered =
    kat === "all"
      ? hasilCari
      : hasilCari.filter((l) => kategoriSlug(l.slug) === kat);

  // Tab kosong disembunyikan — tab yang tidak pernah bisa diklik hanya menambah
  // yang harus dipindai mata.
  const tabs = KATEGORI_LAYANAN.filter((k) => (jumlahKat[k.id] ?? 0) > 0);

  // ── Form inline (menu grid disembunyikan) ──
  if (selected) {
    return (
      <StaffPengajuanForm layanan={selected} onBack={() => setSelected(null)} />
    );
  }

  // ── Grid pilihan layanan ──
  return (
    <div>
      <BackButton href="/dashboard" />
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
            <FilePlus2 className="h-6 w-6 text-primary" /> Pengajuan Baru
          </h1>
          <p className="text-sm text-slate-500">
            Bantu warga mengajukan permohonan. Pilih jenis layanan untuk membuka
            formulirnya.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Cari layanan..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="pl-9"
            />
          </div>
          {bolehAtur && (
            <Button
              variant="outline"
              onClick={() => setShowSettings(true)}
              title="Atur ketersediaan layanan & jam kerja permohonan"
              className="shrink-0 gap-1.5"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline">Pengaturan</span>
            </Button>
          )}
        </div>
      </div>

      {/* Drawer pengaturan: meluncur dari kanan dengan overlay gelap */}
      {bolehAtur && (
        <Sheet
          open={showSettings}
          onOpenChange={(buka) => {
            setShowSettings(buka);
            // Menutup drawer = keadaan di layar mungkin sudah basi.
            if (!buka) muatVisibilitas();
          }}
        >
          <SheetContent
            side="right"
            className="w-full overflow-y-auto sm:max-w-xl"
          >
            <SheetHeader className="pb-0">
              <SheetTitle className="flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5 text-primary" /> Kelola
                Layanan
              </SheetTitle>
              <SheetDescription>
                {bolehJam
                  ? 'Atur ketersediaan jenis layanan & jam kerja permohonan.'
                  : 'Atur ketersediaan jenis layanan. Jam kerja hanya bisa diubah admin.'}
              </SheetDescription>
            </SheetHeader>
            {/*
              🔴 Tab "Jam Kerja" HANYA untuk admin (level 1).
              
              Endpoint `/api/admin/jam-layanan` menolak level lain dengan 403.
              Sebelumnya tabnya tetap ditampilkan ke staf: ia membuka drawer,
              melihat jam kerja gagal termuat tanpa pesan apa pun, dan
              simpan-otomatisnya bahkan menembakkan PUT yang juga ditolak.
              Menawarkan kontrol yang pasti ditolak servernya bukan cuma
              percuma — ia membuat petugas mengira portalnya rusak.
            */}
            <Tabs defaultValue={bolehJam ? 'jam' : 'layanan'} className="px-4 ">
              <TabsList className="flex flex-row w-full gap-1 rounded-xl bg-slate-100 p-1">
                {bolehJam && (
                <TabsTrigger
                  value="jam"
                  className="cursor-pointer gap-1.5 rounded-lg py-2 font-medium text-slate-500 transition-colors data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm"
                >
                  <Clock className="h-4 w-4" /> Jam Kerja
                </TabsTrigger>
                )}
                <TabsTrigger
                  value="layanan"
                  className="cursor-pointer gap-1.5 rounded-lg py-2 font-medium text-slate-500 transition-colors data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm"
                >
                  <ListChecks className="h-4 w-4" /> Ketersediaan Layanan
                </TabsTrigger>
              </TabsList>
              {bolehJam && (
                <TabsContent value="jam" className="pt-5">
                  <JamLayananEditor />
                </TabsContent>
              )}
              <TabsContent value="layanan" className="pt-5">
                <PengaturanPelayanan
                  /*
                   * 🔴 Kartu di belakang drawer ikut meredup SEKETIKA, tidak
                   * menunggu drawer ditutup. Petugas mencoret satu layanan dan
                   * langsung melihat akibatnya di halaman — itulah satu-satunya
                   * cara ia yakin mencoret yang benar.
                   */
                  onUbah={(tersembunyi) => setMati(slugTersembunyi([...tersembunyi]))}
                />
              </TabsContent>
            </Tabs>
          </SheetContent>
        </Sheet>
      )}

      {/* Tab kategori — warnanya dari `lib/kategori.ts`, satu peta dengan
          pemilih layanan warga supaya keduanya tidak menyimpang. */}
      {tabs.length > 1 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {tabs.map((k) => {
            const w = warnaKategori(k.id);
            const aktif = kat === k.id;
            return (
              <button
                key={k.id}
                type="button"
                onClick={() => setKat(k.id)}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors',
                  aktif
                    ? w.tab
                    : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50',
                )}
              >
                {k.name}
                <span
                  className={cn(
                    'inline-flex min-w-5 items-center justify-center rounded-full px-1.5 text-[0.65rem] font-semibold',
                    aktif ? w.hitung : 'bg-slate-100 text-slate-500',
                  )}
                >
                  {jumlahKat[k.id] ?? 0}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="py-16 text-center text-sm text-slate-500">
          Tidak ada layanan cocok "{q}".
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((l, i) => {
            const Icon = ICONS[l.icon] ?? FileText;
            const nonaktif = mati.has(l.slug);
            /*
             * 🔴 Kartu nonaktif SELALU abu-abu, MENGABAIKAN warna kategorinya.
             * Kalau ia ikut berwarna seperti yang lain, satu-satunya penanda
             * "sedang ditutup" tinggal teks kecil — dan itu terlewat.
             */
            const w = nonaktif ? WARNA_MATI : warnaKategori(kategoriSlug(l.slug));
            // Layanan tertutup tetap bisa dibuka Super Admin — ia yang
            // menutupnya, dan tetap perlu memasukkan permohonan susulan.
            const terkunci = nonaktif && !bolehTerobos;
            return (
              <button
                key={l.slug}
                onClick={() => !terkunci && setSelected(l)}
                disabled={terkunci}
                title={
                  nonaktif
                    ? terkunci
                      ? `${l.title} — sedang ditutup; hanya Super Admin yang masih bisa membukanya`
                      : `${l.title} — sedang ditutup untuk warga & staf; Anda masih bisa membukanya`
                    : l.title
                }
                style={{ animationDelay: `${i * 35}ms` }}
                className={cn(
                  'group flex animate-in fade-in slide-in-from-bottom-2 items-center gap-3 rounded-2xl border p-4 text-left shadow-sm transition-all duration-200',
                  /*
                   * 🔴 Kartu nonaktif ABU-ABU dan bergaris putus-putus.
                   * Itu satu-satunya penanda yang terbaca sekilas; teks kecil
                   * di bawah judul saja akan terlewat, dan petugas menekan
                   * layanan yang sudah pasti ditolak server.
                   */
                  nonaktif
                    ? 'border-dashed border-slate-300 bg-slate-50'
                    : 'border-slate-200 bg-white hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md',
                  terkunci && 'cursor-not-allowed opacity-80',
                )}
              >
                {/* ⚠️ Kotak di belakang ikon tetap `bg-primary/10` untuk SEMUA
                    kategori; yang berbeda hanya warna glif ikonnya. Kartu
                    berwarna penuh membuat halaman ramai dan melemahkan warna
                    yang memang harus menonjol: penanda layanan ditutup. */}
                <div className={cn(
                  'flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl transition-transform',
                  nonaktif
                    ? `bg-slate-200 ${w.ikon}`
                    : `bg-primary/10 ${w.ikon} group-hover:scale-105`,
                )}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className={cn(
                    'truncate text-sm font-semibold',
                    nonaktif ? 'text-slate-500' : 'text-slate-900 group-hover:text-primary',
                  )}>
                    {l.title}
                  </p>
                  {nonaktif ? (
/*
                      ⚠️ Badge kuning, bukan teks abu-abu.

                      "Layanan sedang ditutup" adalah KEADAAN, bukan keterangan
                      biasa — ia menggantikan deskripsi layanan di tempat yang
                      sama. Dengan warna abu-abu yang sama seperti deskripsi,
                      petugas memindai daftar dan tidak melihat bedanya; kartu
                      tertutup hanya terasa "agak pudar". Kuning adalah warna
                      status di portal ini, dan sengaja dipakai apa adanya —
                      bukan warna merek, jadi aman disamakan di keempat portal.
                    */
                    <span className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[0.68rem] font-semibold text-amber-800 ring-1 ring-amber-200">
                      <EyeOff className="h-3 w-3" />
                      Layanan sedang ditutup
                    </span>
                  ) : (
                    <p className="line-clamp-1 text-xs text-slate-500">{l.desc}</p>
                  )}
                </div>
                <ArrowRight className={cn(
                  'h-4 w-4 flex-shrink-0 text-slate-300 transition-all',
                  !nonaktif && 'group-hover:translate-x-0.5 group-hover:text-primary',
                )} />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
