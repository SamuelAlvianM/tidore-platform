/**
 * Pastikan penerjemah kunci visibilitas benar-benar cocok — DENGAN DATA NYATA.
 *
 * 🔴 Inilah pemeriksaan yang, kalau ada sejak awal, akan menangkap kegagalan
 * senyap itu: pengaturan menyimpan `modalType` sementara pemilih layanan
 * memeriksa slug, dan 0 dari 15 layanan pernah cocok. Tidak ada galat, tidak
 * ada peringatan — admin mencentang, autosave berkata "tersimpan", layanannya
 * tetap terbuka.
 *
 *     npm run visibilitas:uji
 */
import { PELAYANAN_LIST, slugTersembunyi } from '../lib/pelayanan-list';
import { LAYANAN_FORMS } from '../lib/layanan-forms';
import { LAYANAN_KODE } from '../lib/layanan-kode';
import { LAYANAN_PERMOHONAN, ROUTE_KE_FORM_SLUG } from '../lib/permohonan-layanan';

let gagal = 0;
const cek = (nama: string, dapat: unknown, harap: unknown) => {
  const a = JSON.stringify(dapat), b = JSON.stringify(harap);
  if (a === b) console.log(`✓  ${nama}`);
  else { console.error(`❌ ${nama}\n     dapat : ${a}\n     harap : ${b}`); gagal++; }
};

// 1. Tiap slugForm HARUS ada di skema formulir DAN di peta kode master.
const slugForm = new Set(LAYANAN_FORMS.map((l) => l.slug));
cek('semua slugForm punya skema formulir',
  PELAYANAN_LIST.filter((p) => !slugForm.has(p.slugForm)).map((p) => p.modalType), []);
cek('semua slugForm punya kode master',
  PELAYANAN_LIST.filter((p) => !(p.slugForm in LAYANAN_KODE)).map((p) => p.modalType), []);

// 2. Tiap layanan warga harus terjangkau — kalau tidak, menutupnya tak berefek
//    di halaman yang justru dipakai warga.
const dariRute = new Set(
  LAYANAN_PERMOHONAN.map((l) => ROUTE_KE_FORM_SLUG[l.slug]).filter(Boolean),
);
cek('tiap layanan warga tercakup daftar visibilitas',
  [...dariRute].filter((s) => !PELAYANAN_LIST.some((p) => p.slugForm === s)), []);

// 3. Ketiga kosakata diterima penerjemah.
const contoh = PELAYANAN_LIST[4]; // kartuKeluargaPisahKK / kk-pisah
cek('modalType diterjemahkan', [...slugTersembunyi([contoh.modalType])], [contoh.slugForm]);
cek('slug formulir diterjemahkan', [...slugTersembunyi([contoh.slugForm])], [contoh.slugForm]);
cek('judul diterjemahkan', [...slugTersembunyi([contoh.title])], [contoh.slugForm]);

// 4. Kunci asing dibuang, bukan diteruskan.
cek('kunci tak dikenal diabaikan', [...slugTersembunyi(['layanan-karangan'])], []);
cek('bukan array aman', [...slugTersembunyi(null)], []);
cek('nilai bukan string aman', [...slugTersembunyi([1, {}, null])], []);

// 5. Sebelas kunci `modalType` yang ditemukan tersimpan di SIDAKO saat cacat
//    ini terbongkar — kesebelasnya tidak pernah cocok dengan apa pun.
//    ⚠️ Di TIDORE baris `pelayanan.visibilitas` BELUM PERNAH ADA: fiturnya
//    sama rusaknya, hanya belum sempat dipakai dinas. Kesebelas kunci itu
//    tetap diuji di sini karena kosakatanya sama persis — begitu dinas
//    memakainya, inilah yang harus cocok.
const nyata = [
  'aktaKelahiranNikAda', 'kartuKeluargaPerubahanData', 'kartuKeluargaPisahKK',
  'kartuKeluargaNumpang', 'kartuKeluargaPenambahanAnak', 'kartuKeluargaCetakUlang',
  'aktaKematian', 'kartuIdentitasAnak', 'perpindahanPenduduk',
  'kedatanganPenduduk', 'ktpElektronik',
];
cek('11 entri nyata kini semuanya terpetakan', slugTersembunyi(nyata).size, 11);

console.log();
if (gagal) { console.error(`${gagal} pemeriksaan GAGAL.`); process.exit(1); }
console.log('Semua pemeriksaan lolos.');
