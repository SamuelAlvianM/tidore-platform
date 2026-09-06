# Graph Report - tidore-platform  (2026-09-07)

## Corpus Check
- 371 files · ~270,079 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2031 nodes · 5832 edges · 144 communities (81 shown, 54 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `82cf8fec`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- KIAModal.tsx
- prisma.ts
- statistik-export.ts
- layanan-forms.ts
- struktur-editor.tsx
- riwayat/[id]/page.tsx
- labelKolom
- berita/[id]/route.ts
- button.tsx
- RegisterContent.tsx
- AdminPermohonan.tsx
- foto/route.ts
- syarat-ketentuan-view.tsx
- informasi-index.tsx
- cn
- statistik-kartu-editor.tsx
- compilerOptions
- AdminDemografi.tsx
- register/route.ts
- authSlice.ts
- periode-demografi.ts
- ppid/[...slug]/page.tsx
- ok
- 1. SELESAI & TERVERIFIKASI — wajib di-port ke SAIBATIN
- AdminUsers.tsx
- stats.tsx
- ktp/route.ts
- notification-bell.tsx
- Yang Harus Dibuat
- PengajuanBaruClient.tsx
- dialog.tsx
- KedatanganPendudukModal.tsx
- info-page.tsx
- halaman/[slug]/page.tsx
- jam-layanan.ts
- components.json
- dashboard-sidebar.tsx
- PilihLayananClient.tsx
- static-content-registry.ts
- app/page.tsx
- akun-status.ts
- galeri-profil.tsx
- akun-level.ts
- accessibility-widget.tsx
- uji-visibilitas.ts
- admin/demografi/route.ts
- parse/route.ts
- navbar.tsx
- admin/skm/route.ts
- getSession
- hooks.ts
- footer.tsx
- peta-demografi.tsx
- devDependencies
- admin/demografi/kategori/route.ts
- Journal — TIDORE / DAGA (`tidore-platform`)
- LogAktivitasClient.tsx
- profil/page.tsx
- app/layout.tsx
- dependencies
- akun-tolak.ts
- SkmDashboard.tsx
- scripts
- DAGA Platform
- isi-wilayah-akun.ts
- AdminPengaduan.tsx
- AdminKritikSaran.tsx
- etl-permohonan.ts
- pelayanan-list.ts
- permohonan/[id]/route.ts
- utils.ts
- etl-master.ts
- ppid-layanan-halaman.tsx
- sitemap.xml/route.ts
- package.json
- eslint.config.mjs
- etl-chat.ts
- seed-berita.ts
- react-day-picker
- catatAktivitas
- etl-berkas.ts
- gen-lookup.ts
- seed.ts
- buat-akun.ts
- class-variance-authority
- clsx
- date-fns
- @tiptap/extensions
- exceljs
- framer-motion
- jose
- leaflet
- lucide-react
- mysql2
- next
- next.config.ts
- nodemailer
- pdfkit
- @prisma/client
- radix-ui
- @radix-ui/react-dialog
- @radix-ui/react-navigation-menu
- @radix-ui/react-popover
- @radix-ui/react-slot
- react
- react-dropzone
- react-redux
- sonner
- tailwind-merge
- tesseract.js
- @tiptap/extension-image
- @tiptap/extension-link
- @tiptap/extension-underline
- @tiptap/pm
- @tiptap/react
- @tiptap/starter-kit
- @types/leaflet
- pagination.tsx
- react-advanced-cropper
- react-organizational-chart
- sharp
- @types/nodemailer
- @types/pdfkit
- bcryptjs
- react-dom
- react-leaflet
- @tailwindcss/postcss
- @types/react-dom
- typescript
- postcss.config.mjs
- prisma
- puppeteer-core
- @tailwindcss/typography
- tsx
- CLAUDE.md

## God Nodes (most connected - your core abstractions)
1. `cn()` - 210 edges
2. `ok()` - 159 edges
3. `getSession()` - 156 edges
4. `fail()` - 147 edges
5. `prisma` - 80 edges
6. `Button()` - 68 edges
7. `Input()` - 54 edges
8. `catatAktivitas()` - 51 edges
9. `Label()` - 40 edges
10. `notifyError()` - 35 edges

## Surprising Connections (you probably didn't know these)
- `ProfilPage()` --calls--> `getSession()`  [EXTRACTED]
  app/profil/page.tsx → lib/auth.ts
- `TiketPage()` --calls--> `getSession()`  [EXTRACTED]
  app/tiket/page.tsx → lib/auth.ts
- `Toggle()` --calls--> `cn()`  [EXTRACTED]
  components/dashboard/jam-layanan-editor.tsx → lib/utils.ts
- `EditModeToggle()` --calls--> `cn()`  [EXTRACTED]
  components/konten/inline-edit.tsx → lib/utils.ts
- `WarnaPicker()` --calls--> `cn()`  [EXTRACTED]
  components/landingpage/statistik-kartu-editor.tsx → lib/utils.ts

## Import Cycles
- None detected.

## Communities (144 total, 54 thin omitted)

### Community 0 - "KIAModal.tsx"
Cohesion: 0.08
Nodes (72): AktaKelahiranNikAdaModalProps, FormData, UploadedFile, AktaKelahiranNikTidakAdaModalProps, FormData, UploadedFile, AktaKematianModalProps, FormData (+64 more)

### Community 1 - "prisma.ts"
Cohesion: 0.10
Nodes (32): dynamic, GET(), PUT(), PATCH(), STATUS_VALID, dynamic, POST(), dynamic (+24 more)

### Community 2 - "statistik-export.ts"
Cohesion: 0.05
Nodes (63): dynamic, GET(), runtime, dynamic, GET(), POST(), runtime, BULAN_PENDEK (+55 more)

### Community 3 - "layanan-forms.ts"
Cohesion: 0.11
Nodes (19): catatanSection, f(), FieldDef, FieldType, kelahiranDokumen, kelahiranSections(), OPT_AGAMA, OPT_GOLDAR (+11 more)

### Community 4 - "struktur-editor.tsx"
Cohesion: 0.06
Nodes (42): EditorBox(), nextId(), parse(), Row, serialize(), StrukturEditor(), BulletItem(), CONTENT (+34 more)

### Community 5 - "riwayat/[id]/page.tsx"
Cohesion: 0.07
Nodes (43): PermohonanDetail(), dynamic, RiwayatDetailPage(), STATUS_CONFIG, AlasanDitolak(), UraianTolak, BerkasGallery(), BerkasView (+35 more)

### Community 6 - "labelKolom"
Cohesion: 0.20
Nodes (6): CekStatusClient(), metadata, metadata, RegisterPage(), labelKolom(), registerUser

### Community 7 - "berita/[id]/route.ts"
Cohesion: 0.28
Nodes (10): DELETE(), PUT(), requireAdmin(), uniqueSlug(), GET(), POST(), requireAdmin(), uniqueSlug() (+2 more)

### Community 8 - "button.tsx"
Cohesion: 0.08
Nodes (37): Hasil, IKON, EMPTY, FormState, News, Foto, KATEGORI, KOSONG (+29 more)

### Community 9 - "RegisterContent.tsx"
Cohesion: 0.18
Nodes (15): Kecamatan, namaWilayah, MenuItem, menuItems, ImageUploadField(), kecilkan(), TIPE_DITERIMA, Alert() (+7 more)

### Community 10 - "AdminPermohonan.tsx"
Cohesion: 0.29
Nodes (5): ALASAN_TOLAK, FINAL_STATUS, Item, STATUS, STATUS_KEYS

### Community 11 - "foto/route.ts"
Cohesion: 0.22
Nodes (13): DELETE(), DELETE(), dynamic, PUT(), adalahDataUrlGambar(), DIR_KTP, DIR_SELFIE, FOLDER_KTP (+5 more)

### Community 12 - "syarat-ketentuan-view.tsx"
Cohesion: 0.19
Nodes (9): metadata, BAGIAN, Data, SyaratKetentuanView(), SyaratLayananTabs(), KasusLayanan, LayananSyarat, SYARAT_KATEGORI (+1 more)

### Community 13 - "informasi-index.tsx"
Cohesion: 0.12
Nodes (19): dynamic, metadata, dynamic, metadata, PpidInformasiIndex(), PpidTambahKartu(), PpidSubnav(), HalamanIndeksKartu() (+11 more)

### Community 14 - "cn"
Cohesion: 0.08
Nodes (44): NotFound(), FieldEditor(), IconColumnInput(), ImageColumnInput(), MenuPopuler(), MediaPicker(), AktaKelahiranNikAdaModal(), AktaKelahiranNikTidakAdaModal() (+36 more)

### Community 15 - "statistik-kartu-editor.tsx"
Cohesion: 0.12
Nodes (31): BULAN_PENDEK, GET(), Conflict, DemografiEditor(), digits(), EditGrid(), EditRow, nid() (+23 more)

### Community 16 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 17 - "AdminDemografi.tsx"
Cohesion: 0.11
Nodes (29): dynamic, GET(), AdminDemografi(), downloadFile(), HitunganPeriode, KategoriAdmin, usulJudul(), DemografiKategoriPage() (+21 more)

### Community 18 - "register/route.ts"
Cohesion: 0.08
Nodes (40): POST(), dynamic, POST(), runtime, terakhirKirim, dynamic, POST(), runtime (+32 more)

### Community 19 - "authSlice.ts"
Cohesion: 0.12
Nodes (15): ForgotPasswordPage(), LoginPage(), metadata, SessionHydrator(), ResetPasswordPage(), useAppDispatch(), authSlice, AuthState (+7 more)

### Community 20 - "periode-demografi.ts"
Cohesion: 0.12
Nodes (31): periodeDariForm(), periodeDariForm(), BadgePeriode(), PemilihPeriode(), labelPeriode(), labelPeriodePanjang(), periodeSama(), ROMAWI (+23 more)

### Community 21 - "ppid/[...slug]/page.tsx"
Cohesion: 0.09
Nodes (28): AdminProduk(), HubungiKamiPage(), bacaKonfigTab(), dynamic, LAYANAN_PPID_SLUGS, PpidPage(), PROFIL_TERHUBUNG, TENTANG_PPID_SLUGS (+20 more)

### Community 22 - "ok"
Cohesion: 0.06
Nodes (57): dynamic, GET(), GET(), POST(), POST(), POST(), POST(), GET() (+49 more)

### Community 23 - "1. SELESAI & TERVERIFIKASI — wajib di-port ke SAIBATIN"
Cohesion: 0.14
Nodes (13): 0. Peta dua project — BACA DULU, 1.1 Sisa branding Pesisir Barat di SIDAKO, 1.2 Carousel landing page — kurang besar & kepotong, 1.3 Permohonan Online pindah ke dashboard, tanpa modal, 1.4 Input tanggal tidak bisa diketik, 1.5 Upload — batas ukuran, OOM, dan path traversal, 1.6 Animasi transisi, 1.7 Sub-menu navbar yang bisa dibuat admin (+5 more)

### Community 24 - "AdminUsers.tsx"
Cohesion: 0.13
Nodes (10): AdminUser, DetailUser, EMPTY_FORM, GRUP_AKUN, GrupKey, Kecamatan, PermohonanRingkas, STATUS_PERMOHONAN (+2 more)

### Community 25 - "stats.tsx"
Cohesion: 0.08
Nodes (20): AntreImpor, OFFICE_LAT, OFFICE_LNG, pulseIcon, base, FALLBACK, KartuDemografi, MapCard() (+12 more)

### Community 26 - "ktp/route.ts"
Cohesion: 0.14
Nodes (19): dynamic, getWorker(), isValidNik(), KtpParsed, loadSharp(), maxDuration, normalizeDigits(), parseKtpText() (+11 more)

### Community 27 - "notification-bell.tsx"
Cohesion: 0.43
Nodes (7): getAudioCtx(), NotificationBell(), Notifikasi, playDing(), TIPE_ICON, unlockAudio(), waktuRelatif()

### Community 28 - "Yang Harus Dibuat"
Cohesion: 0.18
Nodes (10): 1. Komponen `AccessibilityWidget` (client component), 2. Daftar Kontrol Aksesibilitas (minimal set berikut), 3. Persistensi & anti-flicker, 4. Aksesibilitas dari widget itu sendiri (jangan ironis), 5. Integrasi & batasan, Deliverable, Konteks Teknis (WAJIB diikuti, sudah diverifikasi di codebase), Kualitas & Verifikasi (lakukan sebelum selesai) (+2 more)

### Community 29 - "PengajuanBaruClient.tsx"
Cohesion: 0.16
Nodes (14): ICONS, Sheet(), SheetContent(), SheetDescription(), SheetFooter(), SheetHeader(), SheetOverlay(), SheetTitle() (+6 more)

### Community 30 - "dialog.tsx"
Cohesion: 0.11
Nodes (25): AdminMedia(), fmtSize(), DemografiMetric(), fmt(), Row, ImageCropperDialog(), ImageCropperDialogProps, MediaPickerProps (+17 more)

### Community 31 - "KedatanganPendudukModal.tsx"
Cohesion: 0.29
Nodes (6): EMPTY_FORM, FILE_FIELDS, FormData, KedatanganPendudukModalProps, NUMERIC_FIELDS, UploadedFile

### Community 32 - "info-page.tsx"
Cohesion: 0.16
Nodes (13): metadata, dynamic, metadata, useInlineEdit(), ProfileTabs(), StatsGrid(), ProfilKependudukanView(), tahunDari() (+5 more)

### Community 33 - "halaman/[slug]/page.tsx"
Cohesion: 0.13
Nodes (19): AdminKonten(), flatten(), Leaf, MenuEntry, EditorNavigasi(), cariMenu(), dynamic, generateMetadata() (+11 more)

### Community 34 - "jam-layanan.ts"
Cohesion: 0.16
Nodes (17): StaffPengajuanForm(), formatTanggalId(), hariIniZona(), PanelJamTutup(), StatusJamLayanan, URUTAN_HARI, useStatusJamLayanan(), useImageViewer() (+9 more)

### Community 35 - "components.json"
Cohesion: 0.10
Nodes (19): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+11 more)

### Community 36 - "dashboard-sidebar.tsx"
Cohesion: 0.14
Nodes (22): FormPageClient(), ADMIN_ONLY_GROUPS, ADMIN_ONLY_HREFS, DashboardSidebar(), DesktopSidebar(), GROUPS, groupsForLevel(), GRUP_OPD (+14 more)

### Community 37 - "PilihLayananClient.tsx"
Cohesion: 0.24
Nodes (9): AjukanPermohonanPage(), dynamic, generateMetadata(), PilihLayananClient(), getLayanan(), KATEGORI_LAYANAN, LAYANAN_PERMOHONAN, LayananPermohonan (+1 more)

### Community 38 - "static-content-registry.ts"
Cohesion: 0.08
Nodes (34): HalamanTambahanClient(), metadata, metadata, SurveiKepuasanContent(), BlockEditorDialog(), Ctx, EditableBlock(), EditModeToggle() (+26 more)

### Community 39 - "app/page.tsx"
Cohesion: 0.08
Nodes (21): smoothEase, AlurLayanan(), ease, STEPS, CarouselSlide, DEFAULT_SLIDES, ElegantCarousel(), ElegantCarouselProps (+13 more)

### Community 40 - "akun-status.ts"
Cohesion: 0.24
Nodes (10): dynamic, POST(), AdminUsers(), fmtTanggal(), IsiDetail(), INFO_STATUS, infoStatus, STATUS_AKUN (+2 more)

### Community 41 - "galeri-profil.tsx"
Cohesion: 0.18
Nodes (12): clampKolom(), fmtTanggal(), GaleriItem, GaleriProfilPpid(), idBaru(), KOLOM_PILIHAN, Lebar, LinkItem (+4 more)

### Community 42 - "akun-level.ts"
Cohesion: 0.06
Nodes (49): dynamic, GET(), dynamic, GET(), PUT(), VALID, GET(), dynamic (+41 more)

### Community 43 - "accessibility-widget.tsx"
Cohesion: 0.21
Nodes (14): AccessibilityWidget(), SPACING_LABEL, TileButton(), A11Y_INIT_SCRIPT, A11Y_STORAGE_KEY, A11yPrefs, applyPrefs(), DEFAULT_PREFS (+6 more)

### Community 44 - "uji-visibilitas.ts"
Cohesion: 0.22
Nodes (8): Props, LAYANAN_FORMS, LayananForm, LAYANAN_KODE, SLUG_DARI_KODE, dariRute, nyata, slugForm

### Community 45 - "admin/demografi/route.ts"
Cohesion: 0.16
Nodes (25): dynamic, GET(), runtime, cekPetugas(), DELETE(), dynamic, GET(), periodeDariBadan() (+17 more)

### Community 46 - "parse/route.ts"
Cohesion: 0.19
Nodes (14): Conflict, dynamic, maxDuration, POST(), runtime, sig(), Variant, cellNum() (+6 more)

### Community 47 - "navbar.tsx"
Cohesion: 0.24
Nodes (10): DropdownItem(), DropdownMenu(), isExternalHref(), KELAS_ITEM_MENU, MobileItemIcon(), MobileMenuItem(), Navbar(), navigationIcons (+2 more)

### Community 48 - "admin/skm/route.ts"
Cohesion: 0.23
Nodes (11): GET(), POST(), hitungIkm(), nilaiPerUnsur(), SKM_ASPEK, SKM_KENDALA_LAYANAN, SKM_LAYANAN, SKM_PENDIDIKAN (+3 more)

### Community 49 - "getSession"
Cohesion: 0.07
Nodes (38): GET(), DashboardBeritaPage(), dynamic, DashboardDemografiPage(), dynamic, AdminGaleri(), DashboardGaleriPage(), dynamic (+30 more)

### Community 50 - "hooks.ts"
Cohesion: 0.29
Nodes (9): useAuth(), useGuestOnly(), useRequireAuth(), useUser(), AppDispatch, AppStore, makeStore(), RootState (+1 more)

### Community 51 - "footer.tsx"
Cohesion: 0.08
Nodes (20): GaleriClient(), GalleryItem, metadata, ArticleCard(), BeritaListClient(), News, tglID(), metadata (+12 more)

### Community 52 - "peta-demografi.tsx"
Cohesion: 0.16
Nodes (14): metadata, fmt(), PetaDemografi, PetaDemografiLoader(), Marker, PetaDemografi(), Row, GEO_BY_NAMA (+6 more)

### Community 53 - "devDependencies"
Cohesion: 0.13
Nodes (15): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, tailwindcss, tw-animate-css, @types/bcryptjs (+7 more)

### Community 54 - "admin/demografi/kategori/route.ts"
Cohesion: 0.38
Nodes (9): DELETE(), dynamic, GET(), POST(), PUT(), slugKategori(), bacaKustom(), bacaRegistri() (+1 more)

### Community 55 - "Journal — TIDORE / DAGA (`tidore-platform`)"
Cohesion: 0.10
Nodes (20): 10. `wilayah:isi-akun` — SELESAI 3 Sep 2026, 1. Identitas project, 2. Dua aplikasi, satu VPS, satu domain, 3. 🔴 Lima hal berbahaya kalau lupa, 4. Keadaan repo per 8 Agu 2026 — **43 berkas menggantung**, 5. Sudah live & terverifikasi (7 Agu dini hari) — jangan dikerjakan ulang, 5b. Menu "Profil Kependudukan" — SELESAI di kode, BELUM di-deploy (14 Agu), 6. Antrean (+12 more)

### Community 56 - "LogAktivitasClient.tsx"
Cohesion: 0.40
Nodes (5): AKSI_STYLE, fmtWaktu(), LogAktivitasClient(), LogItem, Petugas

### Community 57 - "profil/page.tsx"
Cohesion: 0.21
Nodes (9): ChangePasswordForm(), FotoProfilCard(), dynamic, metadata, ProfilPage(), ProfilForm(), CameraCapture(), CameraCaptureProps (+1 more)

### Community 58 - "app/layout.tsx"
Cohesion: 0.20
Nodes (8): cormorant, geistMono, geistSans, metadata, montserrat, SKEMA_ORGANISASI, Providers(), KunjunganPing()

### Community 59 - "dependencies"
Cohesion: 0.18
Nodes (11): animejs, highcharts, highcharts-react-official, dependencies, animejs, highcharts, highcharts-react-official, @reduxjs/toolkit (+3 more)

### Community 60 - "akun-tolak.ts"
Cohesion: 0.40
Nodes (4): KEY_BY_LABEL, KOLOM_TOLAK, KolomTolak, LABEL_BY_KEY

### Community 61 - "SkmDashboard.tsx"
Cohesion: 0.33
Nodes (6): AspekRata, Data, MasukanLayanan, mutu(), Responden, SkmDashboard()

### Community 62 - "scripts"
Cohesion: 0.13
Nodes (15): scripts, akun:uji, build, db:generate, db:migrate, db:push, db:seed, db:studio (+7 more)

### Community 63 - "DAGA Platform"
Cohesion: 0.29
Nodes (6): Akun demo (setelah seed), DAGA Platform, Deploy ke cPanel (ringkas), Menjalankan (lokal), Status migrasi, Struktur

### Community 64 - "isi-wilayah-akun.ts"
Cohesion: 0.32
Nodes (7): main(), normal(), prisma, Siap, sufiks(), TIMPA, TULIS

### Community 65 - "AdminPengaduan.tsx"
Cohesion: 0.40
Nodes (4): AdminPengaduan(), FILTERS, Item, pisahBukti()

### Community 68 - "etl-permohonan.ts"
Cohesion: 0.28
Nodes (8): findKey(), JENIS_TANPA_DATA_LAMA, main(), mapStatus(), prisma, SOURCE, TABEL_JENIS, USER_LEVELS

### Community 69 - "pelayanan-list.ts"
Cohesion: 0.17
Nodes (12): KATEGORI_SLUG, kategoriSlug(), WARNA_KATEGORI, WARNA_MATI, WARNA_NETRAL, WarnaKategori, PELAYANAN_KATEGORI, PELAYANAN_LIST (+4 more)

### Community 73 - "permohonan/[id]/route.ts"
Cohesion: 0.17
Nodes (19): GET(), PATCH(), STATUS_VALID, POST(), GET(), formDariKode(), sendMail(), ALASAN (+11 more)

### Community 74 - "utils.ts"
Cohesion: 0.09
Nodes (29): JamLayananEditor(), Toggle(), URUTAN_HARI, PengaturanPelayanan(), PilihRincian(), norm(), SearchSelect(), SearchSelectOption (+21 more)

### Community 75 - "etl-master.ts"
Cohesion: 0.43
Nodes (6): asPath(), dt(), main(), prisma, slugify(), SOURCE

### Community 77 - "ppid-layanan-halaman.tsx"
Cohesion: 0.19
Nodes (8): dynamic, metadata, dynamic, metadata, PpidLayananHalaman(), PpidSeksi, InfoPageContent, LAYANAN_PPID_TABS

### Community 79 - "sitemap.xml/route.ts"
Cohesion: 0.40
Nodes (5): amanXml(), dynamic, Entri, GET(), RUTE_TETAP

### Community 80 - "package.json"
Cohesion: 0.33
Nodes (5): name, prisma, seed, private, version

### Community 84 - "eslint.config.mjs"
Cohesion: 0.40
Nodes (4): compat, __dirname, eslintConfig, __filename

### Community 85 - "etl-chat.ts"
Cohesion: 0.50
Nodes (4): dt(), main(), prisma, SOURCE

### Community 86 - "seed-berita.ts"
Cohesion: 0.50
Nodes (4): BERITA, main(), prisma, slugify()

### Community 88 - "catatAktivitas"
Cohesion: 0.09
Nodes (29): dynamic, maxDuration, POST(), runtime, DELETE(), dynamic, passwordCocok(), POST() (+21 more)

### Community 89 - "etl-berkas.ts"
Cohesion: 0.67
Nodes (3): main(), mimeOf(), prisma

### Community 90 - "gen-lookup.ts"
Cohesion: 0.67
Nodes (3): GROUPS, main(), norm()

### Community 143 - "pagination.tsx"
Cohesion: 0.67
Nodes (3): deretHalaman(), OPSI_PER_HALAMAN, Pagination()

## Knowledge Gaps
- **641 isolated node(s):** `SUBMIT_ACTIONS`, `FETCH_ACTIONS`, `ALLOWED_EXT`, `runtime`, `dynamic` (+636 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 756 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **54 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `getSession()` connect `getSession` to `prisma.ts`, `statistik-export.ts`, `riwayat/[id]/page.tsx`, `PilihLayananClient.tsx`, `berita/[id]/route.ts`, `permohonan/[id]/route.ts`, `akun-level.ts`, `foto/route.ts`, `admin/demografi/route.ts`, `parse/route.ts`, `informasi-index.tsx`, `admin/skm/route.ts`, `footer.tsx`, `admin/demografi/kategori/route.ts`, `ok`, `catatAktivitas`, `profil/page.tsx`, `ktp/route.ts`?**
  _High betweenness centrality (0.108) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `KIAModal.tsx`, `struktur-editor.tsx`, `button.tsx`, `RegisterContent.tsx`, `informasi-index.tsx`, `statistik-kartu-editor.tsx`, `pagination.tsx`, `AdminDemografi.tsx`, `periode-demografi.ts`, `AdminUsers.tsx`, `stats.tsx`, `notification-bell.tsx`, `PengajuanBaruClient.tsx`, `dialog.tsx`, `KedatanganPendudukModal.tsx`, `info-page.tsx`, `halaman/[slug]/page.tsx`, `jam-layanan.ts`, `dashboard-sidebar.tsx`, `PilihLayananClient.tsx`, `static-content-registry.ts`, `akun-level.ts`, `accessibility-widget.tsx`, `navbar.tsx`, `LogAktivitasClient.tsx`, `utils.ts`, `ppid-layanan-halaman.tsx`?**
  _High betweenness centrality (0.105) - this node is a cross-community bridge._
- **Why does `prisma` connect `ok` to `prisma.ts`, `statistik-export.ts`, `riwayat/[id]/page.tsx`, `berita/[id]/route.ts`, `foto/route.ts`, `informasi-index.tsx`, `statistik-kartu-editor.tsx`, `AdminDemografi.tsx`, `register/route.ts`, `ppid/[...slug]/page.tsx`, `info-page.tsx`, `halaman/[slug]/page.tsx`, `akun-status.ts`, `akun-level.ts`, `admin/demografi/route.ts`, `parse/route.ts`, `admin/skm/route.ts`, `footer.tsx`, `admin/demografi/kategori/route.ts`, `profil/page.tsx`, `pelayanan-list.ts`, `permohonan/[id]/route.ts`, `ppid-layanan-halaman.tsx`, `sitemap.xml/route.ts`, `catatAktivitas`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **What connects `SUBMIT_ACTIONS`, `FETCH_ACTIONS`, `ALLOWED_EXT` to the rest of the system?**
  _641 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `KIAModal.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0789293067947838 - nodes in this community are weakly interconnected._
- **Should `prisma.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10299003322259136 - nodes in this community are weakly interconnected._
- **Should `statistik-export.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0539906103286385 - nodes in this community are weakly interconnected._