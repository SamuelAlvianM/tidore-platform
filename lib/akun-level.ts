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
