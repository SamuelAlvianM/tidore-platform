/**
 * Konfigurasi kartu "Statistik Demografi" di beranda.
 * Admin dapat mengubah judul, ikon, sumber data (kategori demografi + kolom),
 * dan warna tiap kartu lewat editor layar penuh (mode edit beranda). Nilai kartu
 * mengikuti kolom yang dipilih — dihitung server di /api/stats.
 *
 * Disimpan sebagai blok konten statis (kunci di bawah) agar ikut sistem
 * konten yang sudah ada (default registry + override DB).
 */

/** Kunci blok konten statis untuk konfigurasi kartu beranda. */
export const KARTU_STATISTIK_KUNCI = "beranda.statistik";

export interface KartuStatistik {
  /** Nama ikon Lucide (lihat ICON_MAP). */
  icon: string;
  /** Judul/label kartu (mis. "Jumlah Penduduk"). */
  title: string;
  /** Slug kategori demografi sumber data (lihat DEMOGRAFI_KATEGORI). */
  kategori: string;
  /** Kunci kolom nilai yang ditampilkan (mis. "JML", "L", "KK_JML"). */
  kolom: string;
  /** Preset warna (kunci WARNA_PRESET). */
  warna: string;
  /**
   * Opsional: tampilkan badge persentase = nilai / total(kolom ini) × 100%.
   * Kosong = tanpa badge. Mis. kartu "Laki-laki" pakai badgeKolom "JML".
   */
  badgeKolom?: string;
}

/** Preset warna kartu → kelas Tailwind lengkap (harus literal agar ter-scan). */
export const WARNA_PRESET: Record<string, { accentBg: string; accent: string; label: string }> = {
  biru: { accentBg: "bg-gradient-to-br from-[#2e6da4] to-[#1b4b72]", accent: "text-[#1b4b72]", label: "Biru" },
  amber: { accentBg: "bg-gradient-to-br from-amber-400 to-amber-600", accent: "text-amber-600", label: "Kuning" },
  sky: { accentBg: "bg-gradient-to-br from-sky-400 to-sky-600", accent: "text-sky-600", label: "Langit" },
  rose: { accentBg: "bg-gradient-to-br from-rose-400 to-rose-600", accent: "text-rose-500", label: "Merah" },
  teal: { accentBg: "bg-gradient-to-br from-teal-400 to-teal-600", accent: "text-teal-600", label: "Tosca" },
  emerald: { accentBg: "bg-gradient-to-br from-emerald-400 to-emerald-600", accent: "text-emerald-600", label: "Hijau" },
  violet: { accentBg: "bg-gradient-to-br from-violet-400 to-violet-600", accent: "text-violet-600", label: "Ungu" },
  slate: { accentBg: "bg-gradient-to-br from-slate-500 to-slate-700", accent: "text-slate-600", label: "Abu" },
  tealtua: { accentBg: "bg-gradient-to-br from-[#5c766d] to-[#3a4b45]", accent: "text-[#3a4b45]", label: "Teal" },
  arang: { accentBg: "bg-gradient-to-br from-[#63666b] to-[#45474B]", accent: "text-[#45474B]", label: "Arang" },
};

export const WARNA_DEFAULT = "biru";

export function warnaPreset(warna: string | undefined) {
  return WARNA_PRESET[warna ?? ""] ?? WARNA_PRESET[WARNA_DEFAULT];
}

/** Label ramah untuk kunci kolom singkat; kolom lain dipakai apa adanya. */
const KOLOM_LABEL: Record<string, string> = {
  L: "Laki-laki",
  P: "Perempuan",
  JML: "Jumlah",
  KK_JML: "Jumlah KK",
  JML_WKTP: "Sudah Rekam KTP-el",
};
export const labelKolom = (k: string) => KOLOM_LABEL[k] ?? k;

/**
 * Ejaan header yang menyebut KUANTITAS YANG SAMA di berkas agregat Dukcapil.
 *
 * 🔴 KENAPA PERLU. Importer mengambil nama kolom apa adanya dari header Excel,
 * dan header itu tidak seragam antar berkas maupun antar kabupaten: berkas KK
 * satu daerah menulis `KK_JML`, daerah lain `JML`, daerah lain lagi `Total`.
 * Kartu beranda menuntut satu nama pasti, jadi kartu yang benar pun membaca
 * kolom yang tidak ada — lalu menampilkan **0**.
 *
 * Terukur 3 Sep 2026: di TIDORE, "Kepala Keluarga", "Wajib KTP", dan "Sudah
 * Rekam KTP-el" semuanya 0 di beranda padahal datanya ada — kolomnya bernama
 * `Total`. Tidak ada galat di mana pun; angka nol terlihat seperti fakta.
 *
 * ⚠️ INI PENYETARAAN EJAAN, BUKAN TEBAKAN. Yang disetarakan hanya nama yang
 * benar-benar menyebut hal yang sama: "jumlah seluruhnya".
 *
 * 🔴 `JML_WKTP` SENGAJA TIDAK IKUT. "Sudah rekam KTP-el" adalah kuantitas yang
 * BERBEDA dari "jumlah wajib KTP". Menyetarakannya dengan `JML` akan
 * menampilkan seolah SELURUH wajib KTP sudah merekam — angka resmi yang salah,
 * dan jauh lebih berbahaya daripada kolom yang kosong.
 */
const SINONIM_JUMLAH = ['JML', 'JUMLAH', 'TOTAL', 'KK_JML', 'JML_KK'];

/**
 * Cari nama kolom yang benar-benar ada di sebuah baris data.
 *
 * Urutannya sengaja menyempit: persis → abaikan besar-kecil huruf → sinonim
 * "jumlah". Mengembalikan `null` bila tidak ketemu — dan `null` itu HARUS
 * dibedakan dari nol oleh pemanggilnya.
 */
export function resolveKolom(
  kunciData: string[],
  kolom: string,
): string | null {
  if (!kolom) return null;
  if (kunciData.includes(kolom)) return kolom;

  const naik = kolom.toUpperCase();
  const samaAbai = kunciData.find((k) => k.toUpperCase() === naik);
  if (samaAbai) return samaAbai;

  if (SINONIM_JUMLAH.includes(naik)) {
    const sinonim = kunciData.find((k) => SINONIM_JUMLAH.includes(k.toUpperCase()));
    if (sinonim) return sinonim;
  }
  return null;
}

/** Susunan kartu bawaan — sama dengan tampilan lama sebelum bisa diatur. */
export const DEFAULT_KARTU: KartuStatistik[] = [
  { title: "Jumlah Penduduk", icon: "Users", kategori: "jenis-kelamin", kolom: "JML", warna: "biru" },
  { title: "Kepala Keluarga", icon: "Home", kategori: "kk", kolom: "KK_JML", warna: "tealtua" },
  { title: "Laki-laki", icon: "User", kategori: "jenis-kelamin", kolom: "L", warna: "sky", badgeKolom: "JML" },
  { title: "Perempuan", icon: "UserCircle", kategori: "jenis-kelamin", kolom: "P", warna: "arang", badgeKolom: "JML" },
  { title: "Wajib KTP", icon: "IdCard", kategori: "wajib-ktp", kolom: "JML", warna: "teal" },
  { title: "Sudah Rekam KTP-el", icon: "ScanLine", kategori: "wajib-ktp", kolom: "JML_WKTP", warna: "emerald", badgeKolom: "JML" },
];

/** Bersihkan/normalkan konfigurasi kartu dari sumber tak tepercaya (DB/klien). */
export function normalizeKartu(raw: unknown): KartuStatistik[] {
  if (!Array.isArray(raw)) return DEFAULT_KARTU;
  const list = raw
    .filter((r): r is Record<string, unknown> => !!r && typeof r === "object")
    .map((r) => ({
      title: String(r.title ?? "").trim() || "Tanpa Judul",
      icon: String(r.icon ?? "Sparkles"),
      kategori: String(r.kategori ?? ""),
      kolom: String(r.kolom ?? ""),
      warna: WARNA_PRESET[String(r.warna ?? "")] ? String(r.warna) : WARNA_DEFAULT,
      badgeKolom: r.badgeKolom ? String(r.badgeKolom) : undefined,
    }));
  return list.length ? list : DEFAULT_KARTU;
}
