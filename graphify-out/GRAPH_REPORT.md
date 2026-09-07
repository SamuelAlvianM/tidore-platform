# Graph Report - tidore-platform  (2026-09-07)

## Corpus Check
- 371 files · ~271,532 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2034 nodes · 5849 edges · 148 communities (86 shown, 53 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0bf687a7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- AktaNikahModal.tsx
- [action]/route.ts
- statistik-export.ts
- layanan-forms.ts
- struktur-editor.tsx
- riwayat/[id]/page.tsx
- RegisterContent.tsx
- berita/[id]/route.ts
- button.tsx
- useAppSelector
- KKPerubahanBiodataModal.tsx
- isPetugas
- getSession
- ppid/[...slug]/page.tsx
- cn
- statistik-kartu-editor.tsx
- compilerOptions
- demografi-registri.ts
- send/route.ts
- authSlice.ts
- parse/route.ts
- static-content-registry.ts
- ok
- 1. SELESAI & TERVERIFIKASI — wajib di-port ke SAIBATIN
- AdminUsers.tsx
- stats.tsx
- ktp/route.ts
- notification-bell.tsx
- Yang Harus Dibuat
- navbar.tsx
- dialog.tsx
- AdminDemografi.tsx
- inline-edit.tsx
- halaman/[slug]/page.tsx
- jam-layanan.ts
- components.json
- dashboard-sidebar.tsx
- PilihLayananClient.tsx
- useStaticContent
- app/page.tsx
- profile-tabs.tsx
- galeri-profil.tsx
- akun-level.ts
- accessibility-widget.tsx
- uji-visibilitas.ts
- admin/demografi/route.ts
- KIAModal.tsx
- PengajuanBaruClient.tsx
- admin/skm/route.ts
- back-button.tsx
- berita-list-client.tsx
- footer.tsx
- peta-demografi.tsx
- devDependencies
- produk/page.tsx
- Journal — TIDORE / DAGA (`tidore-platform`)
- bolehDashboard
- akun-status.ts
- app/layout.tsx
- dependencies
- media/upload/route.ts
- skm/page.tsx
- scripts
- DAGA Platform
- isi-wilayah-akun.ts
- hooks.ts
- dashboard-charts.tsx
- permohonan/[id]/page.tsx
- etl-permohonan.ts
- pelayanan-list.ts
- demografi-export.ts
- dashboard/kritik-saran/page.tsx
- baru/page.tsx
- users/route.ts
- utils.ts
- etl-master.ts
- AktaKelahiranNikTidakAdaModal.tsx
- ppid-layanan-halaman.tsx
- sitemap.xml/route.ts
- package.json
- eslint.config.mjs
- etl-chat.ts
- seed-berita.ts
- react-day-picker
- auth.ts
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
1. `cn()` - 211 edges
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
- `DashboardBeritaPage()` --calls--> `getSession()`  [EXTRACTED]
  app/dashboard/berita/page.tsx → lib/auth.ts
- `KategoriAdmin` --inherits--> `DemografiKategori`  [EXTRACTED]
  app/dashboard/demografi/AdminDemografi.tsx → lib/demografi-kategori.ts
- `DashboardDemografiPage()` --calls--> `getSession()`  [EXTRACTED]
  app/dashboard/demografi/page.tsx → lib/auth.ts
- `DashboardGaleriPage()` --calls--> `getSession()`  [EXTRACTED]
  app/dashboard/galeri/page.tsx → lib/auth.ts
- `DashboardKontenPage()` --calls--> `getSession()`  [EXTRACTED]
  app/dashboard/konten/page.tsx → lib/auth.ts

## Import Cycles
- None detected.

## Communities (148 total, 53 thin omitted)

### Community 0 - "AktaNikahModal.tsx"
Cohesion: 0.07
Nodes (60): AktaNikahModalProps, FormData, UploadedFile, AktaPerceraianModalProps, FormData, UploadedFile, d(), FORM_PERMOHONAN (+52 more)

### Community 1 - "[action]/route.ts"
Cohesion: 0.12
Nodes (19): dynamic, POST(), GET(), POST(), ALLOWED_EXT, FETCH_ACTIONS, POST(), SUBMIT_ACTIONS (+11 more)

### Community 2 - "statistik-export.ts"
Cohesion: 0.09
Nodes (43): dynamic, GET(), runtime, dynamic, GET(), POST(), runtime, ONLINE_WINDOW_MS (+35 more)

### Community 3 - "layanan-forms.ts"
Cohesion: 0.11
Nodes (19): catatanSection, f(), FieldDef, FieldType, kelahiranDokumen, kelahiranSections(), OPT_AGAMA, OPT_GOLDAR (+11 more)

### Community 4 - "struktur-editor.tsx"
Cohesion: 0.09
Nodes (27): EditorBox(), nextId(), parse(), Row, serialize(), StrukturEditor(), StrukturChart, StrukturEditor (+19 more)

### Community 5 - "riwayat/[id]/page.tsx"
Cohesion: 0.07
Nodes (43): PermohonanDetail(), dynamic, RiwayatDetailPage(), STATUS_CONFIG, AlasanDitolak(), UraianTolak, BerkasGallery(), BerkasView (+35 more)

### Community 6 - "RegisterContent.tsx"
Cohesion: 0.12
Nodes (9): INFO, metadata, metadata, Kecamatan, namaWilayah, RegisterPage(), labelKolom(), SiteConfig (+1 more)

### Community 7 - "berita/[id]/route.ts"
Cohesion: 0.32
Nodes (9): DELETE(), PUT(), requireAdmin(), uniqueSlug(), GET(), POST(), requireAdmin(), uniqueSlug() (+1 more)

### Community 8 - "button.tsx"
Cohesion: 0.12
Nodes (23): EMPTY, FormState, News, Foto, KATEGORI, KOSONG, ProfilInitial, StaffPengajuanForm() (+15 more)

### Community 9 - "useAppSelector"
Cohesion: 0.17
Nodes (18): ForgotPasswordPage(), LoginPage(), metadata, ResetPasswordPage(), MenuItem, menuItems, MenuPopuler(), AuthArea() (+10 more)

### Community 10 - "KKPerubahanBiodataModal.tsx"
Cohesion: 0.08
Nodes (35): AKSI_STYLE, fmtWaktu(), LogAktivitasClient(), LogItem, Petugas, ALASAN_TOLAK, FINAL_STATUS, Item (+27 more)

### Community 11 - "isPetugas"
Cohesion: 0.11
Nodes (26): dynamic, GET(), PUT(), VALID, DELETE(), dynamic, GET(), PUT() (+18 more)

### Community 12 - "getSession"
Cohesion: 0.16
Nodes (19): GET(), dynamic, findTiketFor(), GET(), PATCH(), POST(), Session, dynamic (+11 more)

### Community 13 - "ppid/[...slug]/page.tsx"
Cohesion: 0.08
Nodes (31): dynamic, metadata, dynamic, metadata, bacaKonfigTab(), dynamic, LAYANAN_PPID_SLUGS, PpidPage() (+23 more)

### Community 14 - "cn"
Cohesion: 0.10
Nodes (39): NotFound(), FieldEditor(), IconColumnInput(), ImageColumnInput(), AktaKelahiranNikAdaModal(), AktaKelahiranNikTidakAdaModal(), AktaKematianModal(), AktaNikahModal() (+31 more)

### Community 15 - "statistik-kartu-editor.tsx"
Cohesion: 0.12
Nodes (26): Conflict, DemografiEditor(), digits(), EditGrid(), EditRow, nid(), ParsedRow, petaKartuLain() (+18 more)

### Community 16 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 17 - "demografi-registri.ts"
Cohesion: 0.18
Nodes (13): dynamic, GET(), DemografiKategoriPage(), dynamic, DEMOGRAFI_KATEGORI, DEMOGRAFI_KATEGORI_KUNCI, DEMOGRAFI_SLUGS, DemografiKategori (+5 more)

### Community 18 - "send/route.ts"
Cohesion: 0.16
Nodes (22): dynamic, POST(), runtime, terakhirKirim, dynamic, POST(), runtime, fonnteAktif() (+14 more)

### Community 19 - "authSlice.ts"
Cohesion: 0.16
Nodes (12): Providers(), SessionHydrator(), InlineEditProvider(), isPublicPage(), authSlice, AuthState, checkNikKk, forgotPassword (+4 more)

### Community 20 - "parse/route.ts"
Cohesion: 0.09
Nodes (32): periodeDariForm(), Conflict, dynamic, maxDuration, periodeDariForm(), POST(), runtime, sig() (+24 more)

### Community 21 - "static-content-registry.ts"
Cohesion: 0.12
Nodes (22): HubungiKamiPage(), dynamic, ProdukPage(), metadata, sections, WbsPage(), BlockEditorDialog(), EditableInfoPage() (+14 more)

### Community 22 - "ok"
Cohesion: 0.08
Nodes (45): dynamic, GET(), dynamic, GET(), GET(), GET(), GET(), JENIS_VALID (+37 more)

### Community 23 - "1. SELESAI & TERVERIFIKASI — wajib di-port ke SAIBATIN"
Cohesion: 0.14
Nodes (13): 0. Peta dua project — BACA DULU, 1.1 Sisa branding Pesisir Barat di SIDAKO, 1.2 Carousel landing page — kurang besar & kepotong, 1.3 Permohonan Online pindah ke dashboard, tanpa modal, 1.4 Input tanggal tidak bisa diketik, 1.5 Upload — batas ukuran, OOM, dan path traversal, 1.6 Animasi transisi, 1.7 Sub-menu navbar yang bisa dibuat admin (+5 more)

### Community 24 - "AdminUsers.tsx"
Cohesion: 0.05
Nodes (33): CekStatusClient(), Hasil, IKON, metadata, AdminUser, DetailUser, EMPTY_FORM, fmtTanggal() (+25 more)

### Community 25 - "stats.tsx"
Cohesion: 0.08
Nodes (21): DemografiMetric(), fmt(), Row, OFFICE_LAT, OFFICE_LNG, pulseIcon, StatistikKartuEditor(), base (+13 more)

### Community 26 - "ktp/route.ts"
Cohesion: 0.14
Nodes (19): dynamic, getWorker(), isValidNik(), KtpParsed, loadSharp(), maxDuration, normalizeDigits(), parseKtpText() (+11 more)

### Community 27 - "notification-bell.tsx"
Cohesion: 0.43
Nodes (7): getAudioCtx(), NotificationBell(), Notifikasi, playDing(), TIPE_ICON, unlockAudio(), waktuRelatif()

### Community 28 - "Yang Harus Dibuat"
Cohesion: 0.18
Nodes (10): 1. Komponen `AccessibilityWidget` (client component), 2. Daftar Kontrol Aksesibilitas (minimal set berikut), 3. Persistensi & anti-flicker, 4. Aksesibilitas dari widget itu sendiri (jangan ironis), 5. Integrasi & batasan, Deliverable, Konteks Teknis (WAJIB diikuti, sudah diverifikasi di codebase), Kualitas & Verifikasi (lakukan sebelum selesai) (+2 more)

### Community 29 - "navbar.tsx"
Cohesion: 0.12
Nodes (17): DropdownItem(), DropdownMenu(), isExternalHref(), KELAS_ITEM_MENU, MobileItemIcon(), MobileMenuItem(), Navbar(), navigationIcons (+9 more)

### Community 30 - "dialog.tsx"
Cohesion: 0.12
Nodes (23): AdminMedia(), fmtSize(), StatCard(), ImageCropperDialog(), ImageCropperDialogProps, MediaPickerProps, MediaItem, MediaUpload() (+15 more)

### Community 31 - "AdminDemografi.tsx"
Cohesion: 0.12
Nodes (36): AdminDemografi(), AntreImpor, downloadFile(), HitunganPeriode, KategoriAdmin, usulJudul(), DemografiView(), fmt() (+28 more)

### Community 32 - "inline-edit.tsx"
Cohesion: 0.15
Nodes (16): AdminUsers(), metadata, dynamic, metadata, Ctx, EditableBlock(), EditModeToggle(), InlineEditCtx (+8 more)

### Community 33 - "halaman/[slug]/page.tsx"
Cohesion: 0.13
Nodes (20): AdminKonten(), flatten(), Leaf, MenuEntry, EditorNavigasi(), cariMenu(), dynamic, generateMetadata() (+12 more)

### Community 34 - "jam-layanan.ts"
Cohesion: 0.14
Nodes (24): dynamic, GET(), JamLayananEditor(), Toggle(), URUTAN_HARI, formatTanggalId(), hariIniZona(), PanelJamTutup() (+16 more)

### Community 35 - "components.json"
Cohesion: 0.10
Nodes (19): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+11 more)

### Community 36 - "dashboard-sidebar.tsx"
Cohesion: 0.17
Nodes (17): ADMIN_ONLY_GROUPS, ADMIN_ONLY_HREFS, DesktopSidebar(), GROUPS, groupsForLevel(), GRUP_OPD, KOLOM_BILAH, LabelSidebar() (+9 more)

### Community 37 - "PilihLayananClient.tsx"
Cohesion: 0.24
Nodes (10): FormPageClient(), AjukanPermohonanPage(), dynamic, generateMetadata(), getLayananForm(), getLayanan(), KATEGORI_LAYANAN, LAYANAN_PERMOHONAN (+2 more)

### Community 38 - "useStaticContent"
Cohesion: 0.11
Nodes (18): HalamanTambahanClient(), metadata, MODE, PpidModeSelector(), KebijakanPrivasiView(), BAGIAN, Data, SyaratKetentuanView() (+10 more)

### Community 39 - "app/page.tsx"
Cohesion: 0.08
Nodes (22): smoothEase, AlurLayanan(), ease, STEPS, CarouselSlide, DEFAULT_SLIDES, ElegantCarousel(), ElegantCarouselProps (+14 more)

### Community 40 - "profile-tabs.tsx"
Cohesion: 0.15
Nodes (15): BulletItem(), CONTENT, easeCustom, fadeUp(), GAMBAR_OVERRIDE_TABS, GambarPanel(), MaklumatPanel(), MottoPanel() (+7 more)

### Community 41 - "galeri-profil.tsx"
Cohesion: 0.13
Nodes (15): clampKolom(), fmtTanggal(), GaleriItem, GaleriProfilPpid(), idBaru(), KOLOM_PILIHAN, Lebar, LinkItem (+7 more)

### Community 42 - "akun-level.ts"
Cohesion: 0.12
Nodes (19): BULAN_PENDEK, DashboardPage(), dynamic, fmt(), pct(), ProgressRow(), STATUS_PENGADUAN, ExportStatistikButton() (+11 more)

### Community 43 - "accessibility-widget.tsx"
Cohesion: 0.21
Nodes (14): AccessibilityWidget(), SPACING_LABEL, TileButton(), A11Y_INIT_SCRIPT, A11Y_STORAGE_KEY, A11yPrefs, applyPrefs(), DEFAULT_PREFS (+6 more)

### Community 44 - "uji-visibilitas.ts"
Cohesion: 0.22
Nodes (8): Props, LAYANAN_FORMS, LayananForm, LAYANAN_KODE, SLUG_DARI_KODE, dariRute, nyata, slugForm

### Community 45 - "admin/demografi/route.ts"
Cohesion: 0.17
Nodes (24): dynamic, GET(), runtime, cekPetugas(), DELETE(), dynamic, GET(), periodeDariBadan() (+16 more)

### Community 46 - "KIAModal.tsx"
Cohesion: 0.29
Nodes (6): EMPTY_FORM, FILE_FIELDS, FormData, KIAModalProps, NIK_FIELDS, UploadedFile

### Community 47 - "PengajuanBaruClient.tsx"
Cohesion: 0.20
Nodes (13): ICONS, PengajuanBaruClient(), Tabs(), TabsContent(), TabsList(), tabsListVariants, TabsTrigger(), KATEGORI_SLUG (+5 more)

### Community 48 - "admin/skm/route.ts"
Cohesion: 0.23
Nodes (11): GET(), POST(), hitungIkm(), nilaiPerUnsur(), SKM_ASPEK, SKM_KENDALA_LAYANAN, SKM_LAYANAN, SKM_PENDIDIKAN (+3 more)

### Community 49 - "back-button.tsx"
Cohesion: 0.06
Nodes (28): AdminBerita(), DashboardBeritaPage(), dynamic, DashboardDemografiPage(), dynamic, AdminGaleri(), DashboardGaleriPage(), dynamic (+20 more)

### Community 50 - "berita-list-client.tsx"
Cohesion: 0.31
Nodes (5): ArticleCard(), BeritaListClient(), News, tglID(), metadata

### Community 51 - "footer.tsx"
Cohesion: 0.07
Nodes (21): GaleriClient(), GalleryItem, metadata, BeritaDetailClient(), News, generateMetadata(), ringkasTeks(), metadata (+13 more)

### Community 52 - "peta-demografi.tsx"
Cohesion: 0.16
Nodes (14): metadata, fmt(), PetaDemografi, PetaDemografiLoader(), Marker, PetaDemografi(), Row, GEO_BY_NAMA (+6 more)

### Community 53 - "devDependencies"
Cohesion: 0.13
Nodes (15): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, tailwindcss, tw-animate-css, @types/bcryptjs (+7 more)

### Community 54 - "produk/page.tsx"
Cohesion: 0.40
Nodes (4): AdminProduk(), DashboardProdukPage(), dynamic, getDokumenKategori()

### Community 55 - "Journal — TIDORE / DAGA (`tidore-platform`)"
Cohesion: 0.10
Nodes (20): 10. `wilayah:isi-akun` — SELESAI 3 Sep 2026, 1. Identitas project, 2. Dua aplikasi, satu VPS, satu domain, 3. 🔴 Lima hal berbahaya kalau lupa, 4. Keadaan repo per 8 Agu 2026 — **43 berkas menggantung**, 5. Sudah live & terverifikasi (7 Agu dini hari) — jangan dikerjakan ulang, 5b. Menu "Profil Kependudukan" — SELESAI di kode, BELUM di-deploy (14 Agu), 6. Antrean (+12 more)

### Community 56 - "bolehDashboard"
Cohesion: 0.17
Nodes (11): DashboardLayout(), dynamic, DashboardPengajuanBaruPage(), dynamic, AdminPermohonan(), DashboardPermohonanPage(), dynamic, dynamic (+3 more)

### Community 57 - "akun-status.ts"
Cohesion: 0.24
Nodes (10): dynamic, POST(), POST(), IsiDetail(), INFO_STATUS, infoStatus, pesanLoginStatus(), StatusAkun (+2 more)

### Community 58 - "app/layout.tsx"
Cohesion: 0.22
Nodes (7): cormorant, geistMono, geistSans, metadata, montserrat, SKEMA_ORGANISASI, KunjunganPing()

### Community 59 - "dependencies"
Cohesion: 0.18
Nodes (11): animejs, highcharts, highcharts-react-official, dependencies, animejs, highcharts, highcharts-react-official, @reduxjs/toolkit (+3 more)

### Community 60 - "media/upload/route.ts"
Cohesion: 0.30
Nodes (9): DELETE(), POST(), MEDIA_ALLOWED_IMAGE, MEDIA_ALLOWED_OTHER, MEDIA_MAX_SIZE, MEDIA_STORAGE_ROOT, MEDIA_URL_PREFIX, mediaPublicUrl() (+1 more)

### Community 61 - "skm/page.tsx"
Cohesion: 0.24
Nodes (8): DashboardSkmPage(), dynamic, AspekRata, Data, MasukanLayanan, mutu(), Responden, SkmDashboard()

### Community 62 - "scripts"
Cohesion: 0.13
Nodes (15): scripts, akun:uji, build, db:generate, db:migrate, db:push, db:seed, db:studio (+7 more)

### Community 63 - "DAGA Platform"
Cohesion: 0.29
Nodes (6): Akun demo (setelah seed), DAGA Platform, Deploy ke cPanel (ringkas), Menjalankan (lokal), Status migrasi, Struktur

### Community 64 - "isi-wilayah-akun.ts"
Cohesion: 0.32
Nodes (7): main(), normal(), prisma, Siap, sufiks(), TIMPA, TULIS

### Community 65 - "hooks.ts"
Cohesion: 0.29
Nodes (9): useAuth(), useGuestOnly(), useRequireAuth(), useUser(), AppDispatch, AppStore, makeStore(), RootState (+1 more)

### Community 66 - "dashboard-charts.tsx"
Cohesion: 0.25
Nodes (9): dasar, Kategori, Layanan, LayananPopulerChart(), PermohonanHarianChart(), ProgressPermohonanChart(), TitikLabel, TrenBulananChart() (+1 more)

### Community 67 - "permohonan/[id]/page.tsx"
Cohesion: 0.33
Nodes (8): DetailPermohonanPage(), dynamic, bolehSemuaWilayah(), isOpd(), isOperatorWilayah(), isPengajuInstansi(), bolehLihatPermohonan(), lingkupPermohonan()

### Community 68 - "etl-permohonan.ts"
Cohesion: 0.28
Nodes (8): findKey(), JENIS_TANPA_DATA_LAMA, main(), mapStatus(), prisma, SOURCE, TABEL_JENIS, USER_LEVELS

### Community 69 - "pelayanan-list.ts"
Cohesion: 0.31
Nodes (7): PengaturanPelayanan(), PELAYANAN_KATEGORI, PELAYANAN_LIST, PELAYANAN_VISIBILITY_KEY, PelayananItem, slugTersembunyi(), layananTersembunyi()

### Community 70 - "demografi-export.ts"
Cohesion: 0.31
Nodes (9): buildDemografiWorkbook(), DbRow, kolomNilai(), susunBaris(), susunKolom(), daftarKategori(), Kolom, muatLogo() (+1 more)

### Community 71 - "dashboard/kritik-saran/page.tsx"
Cohesion: 0.40
Nodes (4): AdminKritikSaran(), Item, DashboardKritikSaranPage(), dynamic

### Community 72 - "baru/page.tsx"
Cohesion: 0.40
Nodes (4): dynamic, metadata, PilihLayananPage(), PilihLayananClient()

### Community 73 - "users/route.ts"
Cohesion: 0.11
Nodes (42): GET(), PATCH(), STATUS_VALID, GET(), NAMA_LEVEL, PATCH(), POST(), requireAdmin() (+34 more)

### Community 74 - "utils.ts"
Cohesion: 0.10
Nodes (28): AktaKelahiranNikAdaModalProps, FormData, UploadedFile, AktaKematianModalProps, FormData, UploadedFile, norm(), SearchSelect() (+20 more)

### Community 75 - "etl-master.ts"
Cohesion: 0.43
Nodes (6): asPath(), dt(), main(), prisma, slugify(), SOURCE

### Community 76 - "AktaKelahiranNikTidakAdaModal.tsx"
Cohesion: 0.50
Nodes (3): AktaKelahiranNikTidakAdaModalProps, FormData, UploadedFile

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

### Community 88 - "auth.ts"
Cohesion: 0.09
Nodes (32): dynamic, maxDuration, POST(), runtime, DELETE(), dynamic, GET(), POST() (+24 more)

### Community 89 - "etl-berkas.ts"
Cohesion: 0.67
Nodes (3): main(), mimeOf(), prisma

### Community 90 - "gen-lookup.ts"
Cohesion: 0.67
Nodes (3): GROUPS, main(), norm()

## Knowledge Gaps
- **639 isolated node(s):** `SUBMIT_ACTIONS`, `FETCH_ACTIONS`, `ALLOWED_EXT`, `runtime`, `dynamic` (+634 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 754 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **53 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `getSession()` connect `getSession` to `[action]/route.ts`, `statistik-export.ts`, `riwayat/[id]/page.tsx`, `berita/[id]/route.ts`, `isPetugas`, `ppid/[...slug]/page.tsx`, `parse/route.ts`, `ok`, `ktp/route.ts`, `PilihLayananClient.tsx`, `akun-level.ts`, `admin/demografi/route.ts`, `admin/skm/route.ts`, `back-button.tsx`, `footer.tsx`, `produk/page.tsx`, `bolehDashboard`, `media/upload/route.ts`, `skm/page.tsx`, `permohonan/[id]/page.tsx`, `dashboard/kritik-saran/page.tsx`, `baru/page.tsx`, `users/route.ts`, `auth.ts`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `AktaNikahModal.tsx`, `struktur-editor.tsx`, `button.tsx`, `useAppSelector`, `KKPerubahanBiodataModal.tsx`, `ppid/[...slug]/page.tsx`, `statistik-kartu-editor.tsx`, `static-content-registry.ts`, `AdminUsers.tsx`, `stats.tsx`, `notification-bell.tsx`, `navbar.tsx`, `dialog.tsx`, `AdminDemografi.tsx`, `inline-edit.tsx`, `halaman/[slug]/page.tsx`, `jam-layanan.ts`, `dashboard-sidebar.tsx`, `PilihLayananClient.tsx`, `app/page.tsx`, `profile-tabs.tsx`, `accessibility-widget.tsx`, `KIAModal.tsx`, `PengajuanBaruClient.tsx`, `footer.tsx`, `pelayanan-list.ts`, `baru/page.tsx`, `utils.ts`, `AktaKelahiranNikTidakAdaModal.tsx`, `ppid-layanan-halaman.tsx`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Why does `prisma` connect `ok` to `[action]/route.ts`, `statistik-export.ts`, `riwayat/[id]/page.tsx`, `berita/[id]/route.ts`, `isPetugas`, `getSession`, `ppid/[...slug]/page.tsx`, `demografi-registri.ts`, `parse/route.ts`, `static-content-registry.ts`, `inline-edit.tsx`, `halaman/[slug]/page.tsx`, `jam-layanan.ts`, `akun-level.ts`, `admin/demografi/route.ts`, `admin/skm/route.ts`, `back-button.tsx`, `footer.tsx`, `akun-status.ts`, `media/upload/route.ts`, `permohonan/[id]/page.tsx`, `pelayanan-list.ts`, `demografi-export.ts`, `users/route.ts`, `ppid-layanan-halaman.tsx`, `sitemap.xml/route.ts`, `auth.ts`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **What connects `SUBMIT_ACTIONS`, `FETCH_ACTIONS`, `ALLOWED_EXT` to the rest of the system?**
  _639 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `AktaNikahModal.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07313738892686261 - nodes in this community are weakly interconnected._
- **Should `[action]/route.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.12333333333333334 - nodes in this community are weakly interconnected._
- **Should `statistik-export.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08880666049953746 - nodes in this community are weakly interconnected._