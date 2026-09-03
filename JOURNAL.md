# Journal — TIDORE / DAGA (`tidore-platform`)

> **Terakhir diperbarui: 2026-09-03** · anak dari [`../journal.md`](../journal.md) §3.3
>
> Project **paling mutakhir** dari tiga bersaudara. Riwayat lengkapnya (rebranding,
> backup 15 GB, restore Laravel, ETL, cutover MySQL 8, uji 15 form, zona waktu, SEO)
> ada di [`../HISTORY.md`](../HISTORY.md) §2.9–§2.13 + §H.

## 1. Identitas project

| | |
|---|---|
| Client | Disdukcapil **Kota Tidore Kepulauan**, Maluku Utara |
| Lahir dari | **SIDAKO** (salinan paling baru saat itu) → mewarisi konvensi **LF** |
| Stack | Next.js 16 standalone + Prisma, **MySQL 8** |
| Warna | teal + kuning — `#495E57` / `#F4CE14` |
| Port dev | **3103** (`tidore-dev`) — 🔴 DIPATENKAN, jangan digeser; sudah nyala → pakai yang itu (lihat `../journal.md` §1) |
| Domain | `disdukcapil.tidorekota.go.id` · HTTPS Let's Encrypt s/d **2026-10-30** |
| Deploy | dari laptop: `bash deploy/deploy.sh` → VPS, PM2 `daga` :3001, **Apache** (bukan Nginx) |
| Cookie sesi | `tidore_session` |

⚠️ `www.` belum punya A-record → tidak masuk sertifikat.

## 2. Dua aplikasi, satu VPS, satu domain

| | **DAGA (portal)** — folder ini | **Antrian loket** |
|---|---|---|
| Kode | `tidore-platform` | [`../tidore-platform-manda`](../tidore-platform-manda/JOURNAL.md) |
| Server | `/root/tidore-platform` · pm2 `daga` · :3001 | `/var/www/antrian` · pm2 `antrian` · :3000 |
| DB | MySQL 8 `daga` | PostgreSQL `antrian_dukcapil` |
| Deploy | dari laptop: `bash deploy/deploy.sh` | di server: `git pull → prisma generate → next build → migrate deploy → pm2 restart` |

Apache mem-proxy `/antrian`. Blok proxy-nya ada di **`daga.conf` DAN `daga-le-ssl.conf`** —
mengubah satu saja tidak cukup. Port 3000/3001 hanya dengar di `127.0.0.1`.

## 3. 🔴 Lima hal berbahaya kalau lupa

1. **`deploy.sh --db-sync` HARAM.** Ia menimpa DB produksi dengan dump lokal — artinya
   **menghapus permohonan & akun warga yang masuk sejak cutover**. Perbaikan data produksi
   harus lewat **SQL bertarget**, dipaste dengan heredoc `<<'SQL'` di shell server.
2. **Jangan hapus `/var/www/html`** — **25.385 scan warga** hidup di `uploads/` di dalamnya,
   ditunjuk symlink `storage/permohonan`.
3. **Baris `default-time-zone='+00:00'` di `mysqld.cnf` wajib ada.** OS server sekarang
   `Asia/Jayapura`; tanpa baris itu MySQL yang restart diam-diam pindah garis waktu dan
   **17 kolom `created_at`** (default sisi-DB) melompat **+9 jam**.
4. **Angka acuan lokal ≠ produksi.** Lokal `tidore`: permohonan 2.458 · berkas 14.757 ·
   users 563 · jenis 15. Produksi per 7 Agu: permohonan **2.487** · users 563 · skm 107 ·
   level 1/2 = **3/15** (lokal 2/6, memang beda) — dan terus naik.
5. **`du -sh .next/standalone` ~14 GB itu WAJAR** di jalur `--webpack`. Ukuran yang bermakna:
   `du -sh --exclude=storage .next/standalone` → ± **300 MB**.

## 4. Keadaan repo per 8 Agu 2026 — **43 berkas menggantung**

```
HEAD : 5d48329 "chore(public): keluarkan 143 gambar warisan yang tidak dirujuk apa pun"
Working tree : 33 modified + 10 untracked
```

🔴 **Seluruh pekerjaan 6–7 Agustus yang SUDAH LIVE di produksi belum di-commit.** Kode yang
sedang melayani warga **hanya ada di working tree laptop** — satu `git checkout` yang salah
menghapusnya. Termasuk di dalamnya:

- 3 berkas SQL produksi: `deploy/sql/2026-08-06_nama-level-41.sql`,
  `…_pindah-level-akun-dinas.sql`, `…_skm-kolom-tambahan.sql`
- `lib/akun-level.ts` (BARU), `lib/skm.ts`, `SkmDashboard.tsx`, `AdminUsers.tsx`
- SEO: `app/robots.ts`, `app/sitemap.xml/`, `og-tidore.png`, komponen client berita/galeri
- `deploy/deploy.sh`, `deploy/apache-daga.conf`, `deploy/RUNBOOK-ANTRIAN-PROXY.md`
- `prisma/schema.prisma`

**Layak di-commit sebelum memulai pekerjaan baru.** Jangan `git add -A` buta — periksa dulu,
ada berkas termodifikasi yang bukan dari sesi terakhir.

## 5. Sudah live & terverifikasi (7 Agu dini hari) — jangan dikerjakan ulang

- **SEO**: robots, `sitemap.xml`, canonical, JSON-LD, og-image 1200×630.
- **Manajemen Akun**: tab **Semua** & **Operator** — 40 akun level 41 kini terlihat & bisa
  dicari. Nama peran "operator desa" ternyata **karangan ETL kita** (level 41 tak pernah punya
  baris nama di sistem dinas) → jadi **"operator"**. Akunnya tidak disentuh sama sekali,
  semua tetap bisa login.
- **10 akun petugas dinas** dipindah dari level 4 ("developer") ke level 2.
  Sebaran produksi sekarang: **3 · 15 · 505 · 0 · 0 · 40 = 563**.
- **Survei Kepuasan** lepas dari Google Form → formulir sendiri, **9 unsur skala 1–4**
  (kuesioner asli dinas, Permenpan RB 14/2017), datanya masuk rekap SKM & IKM.
- **Nilai IKM diperbaiki**: dashboard dulu menampilkan **0,00 / mutu D** karena 107 data
  warisan (kunci `u0`–`u8`) tak terhitung, dan rumusnya salah (`/5` alih-alih NRR × 25).
  Sekarang **91,72 / mutu A**, dihitung dari seluruh responden.

## 5b. Menu "Profil Kependudukan" — SELESAI di kode, BELUM di-deploy (14 Agu)

Menu navbar baru → `/profil-kependudukan`: pemilih terbitan + penampil PDF.
Isi buku sengaja **tidak** ditranskrip jadi HTML (keputusan user: "pdf dulu
saja, tapi editable") — yang editable teks pembungkusnya
(`profil-kependudukan.halaman`) dan daftar bukunya (unggah/hapus PDF lewat Mode
Edit). Dokumennya kategori **`BUKU_PROFIL` yang sudah ada**, jadi satu unggahan
tampil di halaman baru ini DAN di `/ppid/buku-profil-kependudukan`.
3 PDF (2021–2023) ada di `public/uploads/produk/`. Detail: [HISTORY §P](../HISTORY.md).

🔴 **Urutan turun ke produksi tidak boleh dibalik:** `bash deploy/deploy.sh`
dulu (PDF ikut bundle), baru `deploy/sql/2026-08-14_profil-kependudukan.sql`
(paste heredoc `<<'SQL'` di shell server). Kalau SQL duluan → baris ada, tautan 404.

**Susulan 14 Agu — panel unggah & navbar (belum di-deploy):**
- Panel **Tambah Dokumen** di `/profil-kependudukan` dipindah ke **atas** daftar.
  Sebelumnya di bawah, dan karena penampil PDF-nya setinggi `80vh`, admin harus
  menggulir satu layar penuh sebelum panelnya kelihatan.
- **Navbar dirapikan** — masuknya menu "Profil Kependudukan" (177px) membuat
  deretan menu **974px**, meluber di ambang 1360px saat login sebagai admin.
  Sekarang **±690px**, tanpa memindahkan/menyembunyikan menu mana pun:
  label `Survei Kepuasan Masyarakat` → **`Survei Kepuasan`** (judul lengkap tetap
  di halaman/footer/dashboard), padding item `px-2.5`→`px-2`, `gap-4`→`gap-2`
  antar-blok, serta **ikon menu & nama akun dipangkas di bawah 1500px**
  (`KELAS_IKON_MENU`, `max-w-[8rem]`). Ambang 1360 **tidak** diubah.
  ⚠️ Kalau ada sub-menu tambahan admin yang `menuInduk`-nya masih tertulis
  "Survei Kepuasan Masyarakat", ia akan jadi menu utama sendiri — perlu
  disunting di editor Navigasi.

## 6. Antrean

### 🔴 Wajib / berisiko kalau dibiarkan
1. **`pm2 startup` + `pm2 save` belum dijalankan di VPS** → **satu reboot mematikan DAGA
   dan antrian sekaligus.**
2. ~~reCAPTCHA mati di produksi~~ — **KEPUTUSAN USER 13 Agu 2026: tidak dipakai,
   biarkan mati.** Bukan lagi antrean pekerjaan, jangan diusulkan ulang.
   `RECAPTCHA_V3_SECRET_KEY` kosong + `lib/recaptcha.ts:8` `if (!secret) return true`
   (fail-open) → **6 endpoint tanpa proteksi bot**: login, register, forgot-password,
   reset-password, kritik-saran, permohonan. **Risiko yang diterima sadar**: tidak ada
   penahan pendaftaran/permohonan massal oleh bot di lapisan ini.
   Kunci v3 lama (kalau suatu saat dihidupkan) ada di `.env` Laravel dalam
   `/root/backup-final/laravel_app_FINAL.tar.gz`.
3. **Commit 43 berkas yang menggantung** (§4).
4. **Daftarkan sitemap di Google Search Console** (SEO-nya sendiri sudah live).
5. 🔴 **Perbaikan zona waktu belum di-deploy** (13 Agu, [HISTORY §M](../HISTORY.md)).
   `JAM_TIMEZONE` dulu `Asia/Makassar` (WITA) padahal Tidore = **WIT/UTC+9** → setelan
   "08.00–16.00" sesungguhnya berlaku 09.00–17.00 waktu setempat, dan tabel jadwal
   malah menulis "WIB". Sekarang `Asia/Jayapura` + `JAM_TIMEZONE_LABEL = "WIT"`.
   Deploy-nya **menggeser jam efektif form permohonan satu jam lebih awal** —
   kabari dinas dulu, jangan diturunkan diam-diam.

### Menunggu bahan dari user / dinas
5. Foto hero beranda masih **4 stok `images.unsplash.com`** (`carousel.tsx:20`).
6. Infografis WBS `public/wbs/tata-cara-pengaduan-wbs.png` **masih konten Tana Tidung**.
7. 3 email masih `disdukcapil@tidorekab.go.id`, harusnya **`tidorekota`**: footer,
   `lib/info-content.ts:319`, `app/hubungi-kami/page.tsx:41`.

### Perbaikan yang tinggal dikerjakan
8. Tabel dashboard tanpa versi kartu mobile (pola sudah ada di `AdminUsers`/`AdminPermohonan`):
   `berita`, `produk`, `media`, `pengaduan`, `skm`, `galeri`, `log`, `kritik-saran`,
   `pengajuan-baru`, `demografi`, `konten`. **Kandidat kuat dikerjakan serempak di tiga project.**
9. Beranda mengunduh Highcharts 273 KB + Leaflet 145 KB padahal keduanya di bawah layar →
   gerbang `IntersectionObserver` menunda **418 KB**. Menunggu keputusan user.
10. Dialog `max-w-4xl`/`max-w-2xl` tanpa varian `sm:` menempel ke tepi di layar sempit:
    `ppid/galeri-profil.tsx`, `media/image-cropper-dialog.tsx`, `EditorNavigasi.tsx`.

## 7. Jebakan

- 🔴 **Matikan dev server 3103 SEBELUM `bash deploy/deploy.sh`.** `prisma generate`
  di dalam deploy gagal **EPERM** ("operation not permitted, rename
  query_engine-windows.dll.node") karena dev server mengunci DLL-nya. Port dev
  sekarang dipaku 3103 (dan `autoPort` dibuang) supaya tidak ada lagi dev server
  siluman di port acak yang mengunci DLL tanpa ketahuan — lihat `../journal.md` §1.
- 🔴 **`components/shared/navbar.tsx`: deretan menu itu kotak ber-`overflow-x-auto`.**
  Overflow satu sumbu memaksa sumbu lain jadi `auto` → dropdown yang jadi anaknya
  **ter-clip total**, tak tergambar & tak bisa di-hit-test. Pakai **portal ke `<body>`**.
  Ambang desktop TIDORE **1360px**. Komentar peringatan sudah ditanam di berkasnya.
- 🔴 **Perintah berisi hash bcrypt atau backtick MySQL JANGAN dibungkus `ssh "..."`** dari
  laptop — `$` dan `` ` `` ter-expand shell lokal → hash rusak. Pakai heredoc `<<'SQL'`
  yang dipaste di shell server. Cek hasil: `LEFT(password,4)`=`$2a$`, `CHAR_LENGTH(password)`=60.
- **`deploy/sql/*.sql` ada di laptop dan tak pernah ikut deploy** (yang dikirim hanya hasil
  build) → `mysql db < /root/…/file.sql` = *No such file*.
- **MySQL client Windows menambah `\r`** di akhir baris → cek `[ -f … ]` palsu-negatif.
  Selalu `tr -d '\r'`.
- **Variabel berisi path lewat Git Bash kena konversi MSYS** (`/antrian` →
  `C:/Program Files (x86)/Git/antrian`). Pakai PowerShell atau `MSYS_NO_PATHCONV=1`.
- 🔴 **Berkas warga tidak pernah boleh masuk `public/`** — dilayani
  `app/uploads/[...path]/route.ts` dari `storage/permohonan`.
- **Panel browser yang tidak ditampilkan berhenti meng-compositing** → `getComputedStyle`
  bohong dan klik nyata tidak sampai. Suntik `transition:none` atau pakai `element.click()`.
- **Level 4 sudah terpakai** (Operator OPD) — jangan asal dipakai untuk peran baru.

## 8. Referensi

| Berkas | Isi |
|---|---|
| [`deploy/README.md`](deploy/README.md) | 7 langkah deploy DAGA + cutover + SSL |
| [`deploy/RUNBOOK-ANTRIAN-PROXY.md`](deploy/RUNBOOK-ANTRIAN-PROXY.md) | langkah Apache `/antrian` + cara mundur |
| `deploy/sql/*.sql` | SQL bertarget untuk produksi (**belum di-commit**) |
| [`../CHECKLIST-DEPLOY-2026-08-05.md`](../CHECKLIST-DEPLOY-2026-08-05.md) | pembagian kerja DAGA vs antrian |
| [`../HISTORY.md`](../HISTORY.md) | §2.9–§2.13 + §H — riwayat lengkap TIDORE |
| `../tidore-data-lama/` | backup master ~15 GB — 🔴 **jangan dihapus** |
| `HANDOFF-SIDAKO-2026-07-21.md`, `PROMPT-DISABILITAS.md` | warisan dari SIDAKO, arsip |

## 9. Sembilan poin rapat — SELESAI 3 Sep 2026

Diangkut dari SIDAKO; sebagian besar berkas identik sehingga disalin lalu
disesuaikan. Yang berbeda justru bagian terpenting: peta perannya.

| # | Poin | Berkas utama |
|---|---|---|
| 1,3,5 | Sidebar & header pengaju instansi, dua menu | `lib/akun-level.ts`, `components/shared/dashboard-sidebar.tsx` |
| 2 | Halaman detail permohonan tersendiri | `app/dashboard/permohonan/[id]/` |
| 4 | Penolakan wajib alasan + rincian + keterangan | `lib/tolak-permohonan.ts`, `components/dashboard/pilih-rincian.tsx` |
| 6 | Saringan jenis & wilayah | `app/api/admin/permohonan/route.ts` |
| 7 | Zoom foto lepas dari sidebar (portal) | `components/shared/image-viewer.tsx` |
| 8 | Sunting profil & setel sandi | `app/api/admin/users/[id]/`, `lib/validasi-akun.ts` |
| 9 | Tutup-buka jenis layanan + kartu abu-abu | `lib/pelayanan-list.ts`, `lib/visibilitas-server.ts` |
| — | Warna per kategori layanan | `lib/kategori.ts` |

### 🔴 Level 41 ikut mendapat dashboard — keputusan yang perlu diketahui

Namanya "operator", bukan "operator opd", jadi menurut nama ia bukan OPD.
Tapi **35 dari 40 akunnya memiliki 972 permohonan — 40% dari seluruh
permohonan portal ini**, dan pekerjaannya sama persis dengan OPD.

Karena itu `isPengajuInstansi()` mencakup level 5 DAN 41. Memakai `isOpd`
saja membuat mereka jatuh ke cabang terakhir `lingkupPermohonan()` dan
melihat daftar KOSONG — termasuk permohonan yang mereka ajukan sendiri.

Ketahuan hanya karena dilihat di peramban: sidebar level 41 semula
menampilkan menu staf lengkap.

### Dua cacat lama yang ikut ditemukan

1. 🔴 **`navbar.tsx` memakai `level === 4` sebagai OPD.** Level 4 adalah
   "developer" — persis jebakan yang sudah tertulis di §akun-level. Operator
   OPD sungguhan (5) dan 40 operator wilayah (41) mendapat navbar publik
   penuh; akun developer justru yang disederhanakan.
2. 🔴 **213 dari 219 penolakan (97%) `catatan`-nya KOSONG.** Warga yang
   ditolak tidak pernah diberi tahu apa pun. Enam sisanya teks bebas, dan
   keenamnya tetap terbaca — `uraikan()` memperlakukan baris tak dikenal
   sebagai keterangan.

### Perintah baru

```
npm run peran:periksa        # adu lib/akun-level.ts dengan m_userlevels
npm run tolak:uji            # 16 pemeriksaan penyandian penolakan
npm run visibilitas:uji      # 10 pemeriksaan penerjemah kunci visibilitas
npm run akun:uji             # akun uji LOKAL (OPD, wilayah, staf, admin)
```

### 🔴 Kerusakan data uji yang HARUS diketahui

Saat menguji penjagaan akun, saya menyetel sandi akun **id 1 (`rayh4ze`,
"DEVELOPER", level 2)** menjadi `apapun123` di **basis data LOKAL**. Label uji
saya keliru — saya kira sedang menguji "sandi akun sendiri", padahal id 1
bukan akun penguji. Sandi lamanya hash bcrypt dan tidak bisa dipulihkan.

**Produksi TIDAK tersentuh** — tidak pernah ada koneksi ke sana. Yang perlu
dilakukan pemilik akun: setel ulang sandinya di laptop, atau impor ulang
dump. Penjagaan kodenya sendiri terbukti benar saat diuji dengan sasaran yang
tepat (403 untuk akun sendiri).

### Belum dikerjakan

- ~~`userKecamatan` hanya terisi di 1 dari 564 akun~~ — **SELESAI**, lihat
  §10 di bawah.
- Warna kategori & alur penolakan belum dilihat dari sisi WARGA di TIDORE
  (diverifikasi penuh di SIDAKO dengan kode yang sama).
- Branch belum di-merge ke `main`.

## 10. `wilayah:isi-akun` — SELESAI 3 Sep 2026

Saringan wilayah berdiri di atas `users.user_kecamatan`, dan kolom itu terisi
di **1 dari 564 akun**. Saringannya menyaring 2.458 permohonan jadi hampir nol
tanpa satu pun galat — saringan yang tidak menemukan apa-apa terlihat persis
seperti wilayah yang memang belum punya permohonan.

```
npm run wilayah:isi-akun              # laporan saja
npm run wilayah:isi-akun -- --tulis   # baru menulis
```

**Hasil di basis data lokal:** 36 akun terisi, 1 dibakukan, 4 diserahkan ke
dinas. Permohonan yang kini punya wilayah: 928 dari 2.458.

| Kecamatan | Permohonan |
|---|---|
| OBA TENGAH | 404 |
| OBA UTARA | 345 |
| TIDORE SELATAN | 59 |
| TIDORE | 57 |
| TIDORE UTARA | 55 |
| OBA | 9 |

🔴 **Empat akun sengaja TIDAK diisi** — dilaporkan, bukan ditebak:

| Akun | Permohonan | Sebab |
|---|---|---|
| `desa-maitarainduk` | 40 | `m_wilayah` punya MAITARA, MAITARA SELATAN/UTARA/TENGAH — **tidak ada "Maitara Induk"**. Mungkin MAITARA; mungkin bukan. Salah satu wilayah berarti 40 permohonan masuk rekap kecamatan yang keliru, dan itu angka laporan resmi. |
| `admin-kurniawan` | 2 | nama orang, bukan desa |
| `desa-galang` | 1 | "galang" bukan desa di Tidore |
| `galang-opd` | 1 | idem |

🔴 **Satu cacat lain ikut ketemu:** akun `rayh4ze` (level 2) menyimpan
`"Kecamatan Tidore"`, sementara saringan mencocokkan PERSIS dengan nama di
`m_wilayah` (`"TIDORE"`). Permohonannya karena itu lenyap dari setiap saringan
wilayah. Perintah ini membakukan nilai yang cocok setelah imbuhan
"kecamatan"/"kec" dilepas — pembakuan menjangkau SEMUA peran, sementara
pengisian hanya akun instansi (hanya mereka yang nama akunnya memuat nama
desa).

⚠️ 1.529 permohonan tetap tanpa wilayah: pemiliknya akun WARGA, dan
pendaftaran warga di TIDORE memang tidak meminta kecamatan (berbeda dengan
SIDAKO). Itu keputusan produk, bukan data yang hilang.
