/** Kategori data demografi (media informasi). Slug = nilai kolom `kategori` di DB. */
export interface DemografiKategori {
  slug: string;
  label: string;
  /** Petunjuk nama file Excel Dukcapil yang sesuai (untuk bantuan admin). */
  fileHint: string;
}

export const DEMOGRAFI_KATEGORI: DemografiKategori[] = [
  { slug: "jenis-kelamin", label: "Jenis Kelamin", fileHint: "AGR_JK_DUSUN…" },
  { slug: "agama", label: "Agama", fileHint: "AGR_AGAMA…" },
  { slug: "gol-darah", label: "Golongan Darah", fileHint: "AGR_DRH_DUSUN / AGR_GOL_DRH…" },
  { slug: "pekerjaan", label: "Pekerjaan", fileHint: "AGR_PEKERJAAN / AGR_PKRJN_DUSUN…" },
  { slug: "pendidikan", label: "Pendidikan", fileHint: "AGR_PDDKN_DUSUN…" },
  { slug: "status-kawin", label: "Status Perkawinan", fileHint: "AGR_STAT_KWN_DUSUN…" },
  { slug: "kk", label: "Kartu Keluarga", fileHint: "AGR_KK_DUSUN…" },
  { slug: "wajib-ktp", label: "Wajib KTP", fileHint: "AGR_WKTP…" },
];

export const DEMOGRAFI_SLUGS = new Set(DEMOGRAFI_KATEGORI.map((k) => k.slug));

/**
 * Kunci StaticContent tempat kategori BUATAN DINAS disimpan.
 *
 * 🔴 KENAPA TIDAK CUKUP DAFTAR DI ATAS. Delapan kategori itu berkas DKB baku
 * dari SIAK, tapi dinas juga menyusun agregatnya sendiri — "Penyandang
 * Disabilitas", "Kepemilikan Akta", apa pun yang diminta bupati tahun itu.
 * Selama daftarnya dipaku di kode, satu-satunya cara menambah kategori adalah
 * meminta pengembang mengubah kode dan menerbitkan ulang portalnya.
 *
 * ⚠️ Registri ini HANYA memuat kategori tambahan. Yang delapan tetap di kode:
 * halaman beranda, kartu statistik, dan berkas ekspor menyebut slug-nya secara
 * langsung, dan slug yang bisa dihapus dinas dari basis data akan membuat
 * semuanya menunjuk ke ruang kosong.
 */
export const DEMOGRAFI_KATEGORI_KUNCI = "demografi.kategori";

/**
 * Daftar kategori DIKUNCI: tidak bisa ditambah atau dihapus dari dasbor.
 *
 * 🔴 Kenapa dikunci. Kolom `kategori` di basis data cuma teks, dan setiap
 * baris DKB yang sudah diimpor menempel pada slug-nya. Menghapus satu kategori
 * meninggalkan ribuan baris yang tidak dikenal siapa pun — tidak muncul di
 * layar, tidak bisa diekspor, tidak bisa dihapus lewat antarmuka. Menambah
 * kategori yang lalu tidak jadi dipakai menghasilkan hal yang sama dari arah
 * sebaliknya.
 *
 * Yang tersisa untuk dinas adalah MENGGANTI NAMANYA, dan itu aman: yang
 * berubah cuma label di layar, slug-nya tidak tersentuh sedikit pun.
 *
 * ⚠️ Satu tetapan ini mengunci ANTARMUKA SEKALIGUS ENDPOINT-nya. Mengunci
 * tombolnya saja meninggalkan POST/DELETE yang masih menerima permintaan —
 * terkunci di layar, terbuka bagi siapa pun yang tahu alamatnya. Ubah ke
 * `false` untuk membuka keduanya kembali; kodenya utuh, tidak dibuang.
 */
export const KATEGORI_TERKUNCI = true;

export interface RegistriKategori {
  /** Kategori tambahan buatan dinas. */
  kustom: DemografiKategori[];
  /**
   * Nama tampilan pengganti, per slug.
   *
   * 🔴 HANYA LABEL. Slug tidak pernah ikut berubah, dan itu bukan
   * kelalaian: slug adalah nilai kolom `kategori` pada tiap baris DKB dan
   * potongan URL publik `/media/demografi/<slug>`. Mengganti slug saat dinas
   * mengganti nama berarti seluruh data lamanya lepas dari kategorinya dalam
   * satu klik, tanpa peringatan — persis "data menggantung" yang dihindari.
   */
  label?: Record<string, string>;
  /**
   * Slug yang ditampilkan di halaman utama.
   *
   * `null` berarti BELUM PERNAH DIATUR — dan itu bukan hal yang sama dengan
   * daftar kosong. Belum diatur = tampilkan semua (perilaku selama ini);
   * daftar kosong = petugas memang mematikan semuanya.
   */
  beranda: string[] | null;
}

/**
 * Judul → slug: huruf kecil, hanya huruf/angka, dipisah tanda hubung.
 *
 * ⚠️ Slug ini masuk ke kolom `kategori` di basis data dan ke URL publik
 * `/media/demografi/<slug>`, jadi ia tidak boleh mengandung spasi, tanda baca,
 * atau huruf non-ASCII.
 */
export function slugKategori(judul: string): string {
  return judul
    .normalize("NFD")
    // Buang tanda diakritik hasil NFD (mis. "é" → "e" + U+0301).
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function getDemografiKategori(slug: string): DemografiKategori | undefined {
  return DEMOGRAFI_KATEGORI.find((k) => k.slug === slug);
}

/**
 * Pola nama berkas SIAK per kategori.
 *
 * 🔴 KENAPA ADA. Petugas menerima satu paket berkas DKB sekaligus dan
 * mengunggahnya bersama-sama; ia tidak menghafal berkas mana milik kategori
 * mana. Selama kategori harus ditunjuk lebih dulu lewat tombol unggah pada
 * kartunya masing-masing, salah taruh cuma soal waktu — dan salah taruh berarti
 * data pekerjaan tertimpa data pendidikan tanpa peringatan.
 *
 * ⚠️ Nama berkas Dukcapil TIDAK seragam antar kabupaten: ada AGR_DRH_DUSUN, ada
 * AGR_GOL_DRH; ada AGR_PEKERJAAN, ada AGR_PKRJN_DUSUN. Karena itu polanya
 * longgar, dan nama kategori dalam bahasa Indonesia ikut dikenali — dinas yang
 * menamai berkasnya sendiri ("Data Pendidikan 2027.xlsx") tetap terbaca.
 */
const POLA_BERKAS: { slug: string; pola: RegExp }[] = [
  { slug: "jenis-kelamin", pola: /(agr[_\- ]*jk)|(jenis[_\- ]*kelamin)/i },
  { slug: "agama", pola: /(agr[_\- ]*agama)|(\bagama\b)/i },
  { slug: "gol-darah", pola: /(agr[_\- ]*(gol[_\- ]*)?drh)|(gol(ongan)?[_\- ]*darah)/i },
  { slug: "pekerjaan", pola: /(agr[_\- ]*(pekerjaan|pkrjn))|(\bpekerjaan\b)/i },
  { slug: "pendidikan", pola: /(agr[_\- ]*pddkn)|(\bpendidikan\b)/i },
  { slug: "status-kawin", pola: /(agr[_\- ]*stat[_\- ]*kwn)|(status[_\- ]*(per)?kawin)/i },
  { slug: "kk", pola: /(agr[_\- ]*kk)|(kartu[_\- ]*keluarga)/i },
  { slug: "wajib-ktp", pola: /(agr[_\- ]*wktp)|(wajib[_\- ]*ktp)/i },
];

/**
 * Tebak kategori dari NAMA BERKAS. `undefined` bila tidak ada yang cocok —
 * pemanggil wajib mengatakannya kepada petugas, bukan menebak sembarang
 * kategori: menaruh berkas di kategori yang salah menimpa data yang benar.
 */
export function deteksiKategori(
  namaBerkas: string,
  daftar: DemografiKategori[] = DEMOGRAFI_KATEGORI,
): DemografiKategori | undefined {
  const nama = namaBerkas.replace(/\.xlsx$/i, "");

  // 1. Pola berkas SIAK baku — paling dapat dipercaya.
  const cocok = POLA_BERKAS.find((p) => p.pola.test(nama));
  if (cocok) {
    const kat = daftar.find((k) => k.slug === cocok.slug);
    if (kat) return kat;
  }

  /*
   * 2. Kategori buatan dinas: dicocokkan lewat NAMANYA SENDIRI.
   *
   * Kategori seperti "Penyandang Disabilitas" tidak punya pola SIAK — dinas
   * yang menamainya, dan berkasnya pun mereka namai sendiri. Membandingkan
   * bentuk slug kedua sisi membuat "Penyandang Disabilitas 2027.xlsx",
   * "penyandang_disabilitas.xlsx", dan "Data-Penyandang-Disabilitas.xlsx"
   * sama-sama terbaca.
   *
   * ⚠️ Yang TERPANJANG menang. Kalau dinas punya "Akta" dan "Akta Kelahiran",
   * berkas "Akta Kelahiran.xlsx" mengandung keduanya; mengambil yang pertama
   * ketemu berarti data akta kelahiran mendarat di kategori "Akta".
   */
  const namaSlug = slugKategori(nama);
  const kandidat = daftar
    .filter((k) => k.slug.length >= 4 && slugMemuat(namaSlug, k.slug))
    .sort((a, b) => b.slug.length - a.slug.length);

  return kandidat[0];
}

/**
 * `nama` memuat `slug` sebagai POTONGAN UTUH, bukan sekadar substring.
 *
 * 🔴 Substring polos berbahaya di sini. Kategori bernama "Akta" akan cocok
 * dengan berkas "metadata-2027.xlsx", dan berkas itu lalu MENGGANTI seluruh
 * data akta pada periodenya — diam-diam, karena impor massal tidak bertanya.
 * Dengan batas tanda hubung, "akta-kelahiran" dan "akta" cocok, "metadata"
 * tidak.
 */
function slugMemuat(nama: string, slug: string): boolean {
  return (
    nama === slug ||
    nama.startsWith(`${slug}-`) ||
    nama.endsWith(`-${slug}`) ||
    nama.includes(`-${slug}-`)
  );
}
