/**
 * Level akun pengguna (`users.userlevel_id` → `m_userlevels`).
 *
 * Nilainya WARISAN migrasi Laravel, jadi bukan urutan yang rapi dan tidak boleh
 * ditebak dari pola. Isi tabelnya (terukur, 6 Agu 2026):
 *
 * | id | nama            | keterangan                                        |
 * |----|-----------------|---------------------------------------------------|
 * |  1 | administrator   | Super Admin — satu-satunya yang boleh mengubah isi |
 * |    |                 | situs, demografi, jam layanan, log, hapus akun,    |
 * |    |                 | dan membuat akun Staff.                            |
 * |  2 | operator capil  | Petugas harian: permohonan, pengaduan, SKM, akun.  |
 * |  3 | masyarakat      | Warga.                                             |
 * |  4 | developer       | 🔴 BUKAN OPD. Sempat dipakai portal sebagai OPD.   |
 * |  5 | operator opd    | Operator instansi pemerintah daerah — yang benar.  |
 * | 41 | operator        | 40 akun. Lihat catatan di bawah — isinya CAMPURAN. |
 *
 * 🔴 Level 41 tidak punya baris di `m_userlevels` MILIK DINAS — di database
 * Laravel lama tabel itu hanya berisi id 1–5, sementara 40 akun sudah memakai
 * 41. Jadi angka yatim. Nama "operator desa" yang sempat dipakai portal ini
 * adalah **karangan ETL kita** (`prisma/etl-permohonan.ts`), bukan istilah
 * dinas — karena itu boleh diganti tanpa merusak apa pun.
 * Diganti jadi **"operator"** (6 Agu 2026) setelah isinya diperiksa: mayoritas
 * memang operator wilayah (`admin-kaiyasa`, `admin-topo`, …) tapi ada juga
 * akun OPD (`opd-tidore`, `galang-opd`) dan akun bernama orang
 * (`admin-kurniawan`) — jadi menyebutnya "operator desa"/"operator wilayah"
 * akan salah untuk sebagian penghuninya.
 * ⚠️ Penamaan akun di dalamnya tidak konsisten (`admin-desagosale`,
 * `admin-kelurahanakelamo`, `lurah-ome`, nama polos) dan ada duplikat untuk
 * wilayah yang sama (`admin-folarora` & `admin-kelurahanfolarora`).
 *
 * 🔴 Dua jebakan yang sudah pernah kejadian, jangan diulang:
 *  1. **Jangan mengambil angka level kosong begitu saja.** Level 4 terlihat
 *     "bebas" padahal berisi 10 akun orang dinas; level 41 juga terpakai.
 *  2. **Jangan menyaring daftar akun tanpa jalan keluar "semua".** Tab yang
 *     hanya mengenal sebagian level membuat 40 akun level 41 tak terlihat
 *     DAN tak bisa dicari sama sekali.
 */

export const LEVEL_ADMIN = 1;
export const LEVEL_STAFF = 2;
export const LEVEL_WARGA = 3;
/** Operator OPD = **5**, bukan 4 (4 = "developer"). */
export const LEVEL_OPD = 5;
export const LEVEL_OPERATOR = 41;

/**
 * Predikat peran — SATU TEMPAT untuk menjawab "siapa boleh apa".
 *
 * 🔴 ANGKANYA BERBEDA DI TIAP PORTAL, dan di sini paling tidak rapi. Di SIDAKO
 * Operator OPD bernomor 4; di sini 4 justru "developer" dan OPD bernomor 5.
 * Yang disalin antar portal adalah NAMA perannya, bukan nomornya — file ini
 * yang menerjemahkan nama itu untuk TIDORE.
 */

/** Admin dinas — akses penuh, tanpa kecuali. */
export const isAdmin = (level?: number | null) => level === LEVEL_ADMIN;

/** Operator capil — petugas harian. */
export const isStaf = (level?: number | null) => level === LEVEL_STAFF;

/** Warga. */
export const isWarga = (level?: number | null) => level === LEVEL_WARGA;

/** Operator OPD instansi — level 5, satu-satunya yang benar menurut nama. */
export const isOpd = (level?: number | null) => level === LEVEL_OPD;

/**
 * Operator wilayah (level 41) — 40 akun desa/kelurahan yang sudah ada.
 *
 * ⚠️ Namanya "operator", BUKAN "operator opd", jadi ia bukan OPD menurut nama.
 * Tapi pekerjaannya sama persis: mengajukan permohonan atas nama warga di
 * wilayahnya. Karena itu ia mendapat kerangka dashboard dan pembatasan lingkup
 * yang sama — lihat `bolehDashboard` dan `lib/lingkup-permohonan.ts`.
 *
 * 🔴 Isinya CAMPURAN (lihat tabel di atas): mayoritas operator wilayah, tapi
 * ada juga akun OPD (`opd-tidore`, `galang-opd`) dan akun bernama orang
 * (`admin-kurniawan`). Justru itu sebabnya keduanya diperlakukan sama di sini
 * dan dibedakan hanya saat menamai, bukan saat memberi akses.
 */
export const isOperatorWilayah = (level?: number | null) =>
  level === LEVEL_OPERATOR;

/**
 * Petugas dinas = admin ATAU operator capil.
 *
 * 🔴 OPD DAN OPERATOR WILAYAH SENGAJA TIDAK TERMASUK, dan jangan pernah
 * ditambahkan. Predikat ini menjaga hal-hal yang memang milik dinas:
 * manajemen akun, konten situs, log aktivitas, pengaturan layanan. Mereka
 * adalah instansi/wilayah LUAR yang diberi jendela ke dashboard — memberinya
 * akses petugas berarti membuka data seluruh kota kepada satu kelurahan.
 *
 * Kalau yang Anda maksud "boleh masuk dashboard", itu `bolehDashboard`.
 */
export const isPetugas = (level?: number | null) =>
  isAdmin(level) || isStaf(level);

/**
 * Pengaju atas nama orang lain — OPD instansi maupun operator wilayah.
 * Keduanya melihat dashboard yang sama, dibatasi ke permohonannya sendiri.
 */
export const isPengajuInstansi = (level?: number | null) =>
  isOpd(level) || isOperatorWilayah(level);

/**
 * Siapa yang mendapat kerangka dashboard (sidebar + header).
 *
 * Sebelumnya `layout.tsx` memakai `level > 2` untuk menyingkirkan warga —
 * ungkapan yang ikut menyingkirkan OPD (5) dan 40 akun operator wilayah (41)
 * tanpa disengaja. Mereka tetap bisa login, tapi mendarat di halaman warga
 * tanpa satu pun tautan dashboard.
 *
 * Menyebut PERAN, bukan membandingkan angka, membuat kekeliruan itu tidak bisa
 * terulang saat peran baru ditambahkan di bawah nomor yang lebih besar — dan
 * di portal ini nomornya memang meloncat sampai 41.
 */
export const bolehDashboard = (level?: number | null) =>
  isPetugas(level) || isPengajuInstansi(level);

/**
 * Boleh melihat SELURUH permohonan kota. Pengaju instansi hanya miliknya —
 * penyaringnya di `lib/lingkup-permohonan.ts`, bukan di sini.
 */
export const bolehSemuaWilayah = (level?: number | null) => isPetugas(level);

/** Nama resmi tiap peran di `m_userlevels` — dipakai pemeriksa & tampilan. */
export const NAMA_PERAN: Record<number, string> = {
  [LEVEL_ADMIN]: 'administrator',
  [LEVEL_STAFF]: 'operator capil',
  [LEVEL_WARGA]: 'masyarakat',
  4: 'developer',
  [LEVEL_OPD]: 'operator opd',
  [LEVEL_OPERATOR]: 'operator',
};
