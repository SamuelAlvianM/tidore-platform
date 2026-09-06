# Graph Report - tidore-platform  (2026-09-06)

## Corpus Check
- 370 files · ~268,806 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2027 nodes · 5804 edges · 151 communities (89 shown, 53 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `cab122f3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- KIAModal.tsx
- [action]/route.ts
- statistik-export.ts
- layanan-forms.ts
- profile-tabs.tsx
- riwayat/[id]/page.tsx
- CekStatusClient.tsx
- catatAktivitas
- input.tsx
- RegisterContent.tsx
- select.tsx
- admin/jam-layanan/route.ts
- dashboard-charts.tsx
- informasi-index.tsx
- cn
- demografi-editor.tsx
- compilerOptions
- demografi-registri.ts
- permohonan/[id]/route.ts
- authSlice.ts
- AdminDemografi.tsx
- static-content-registry.ts
- ok
- 1. SELESAI & TERVERIFIKASI — wajib di-port ke SAIBATIN
- AdminUsers.tsx
- stats.tsx
- ktp/route.ts
- back-button.tsx
- Yang Harus Dibuat
- PengajuanBaruClient.tsx
- button.tsx
- permohonan-detail.tsx
- info-page.tsx
- halaman/[slug]/page.tsx
- jam-layanan.ts
- components.json
- dashboard-sidebar.tsx
- PilihLayananClient.tsx
- useStaticContent
- app/page.tsx
- akun-status.ts
- inline-edit.tsx
- akun-level.ts
- accessibility-widget.tsx
- uji-visibilitas.ts
- admin/demografi/route.ts
- parse/route.ts
- navbar.tsx
- useAppSelector
- getSession
- AdminKonten.tsx
- footer.tsx
- peta-demografi.tsx
- devDependencies
- LoginPage
- Journal — TIDORE / DAGA (`tidore-platform`)
- RegisterPage
- profil/page.tsx
- app/layout.tsx
- dependencies
- kategori.ts
- skm/page.tsx
- scripts
- DAGA Platform
- isi-wilayah-akun.ts
- AdminPengaduan.tsx
- berita-list-client.tsx
- dashboard/berita/page.tsx
- etl-permohonan.ts
- pelayanan-list.ts
- media/page.tsx
- StaffPengajuanForm
- gis/page.tsx
- utils.ts
- etl-master.ts
- baru/page.tsx
- navigasi/page.tsx
- users/[id]/route.ts
- sitemap.xml/route.ts
- package.json
- image-upload-field.tsx
- eslint.config.mjs
- etl-chat.ts
- seed-berita.ts
- react-day-picker
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
- dashboard/kritik-saran/page.tsx
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
- FormKartu
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
2. `ok()` - 157 edges
3. `getSession()` - 154 edges
4. `fail()` - 145 edges
5. `prisma` - 79 edges
6. `Button()` - 68 edges
7. `Input()` - 54 edges
8. `catatAktivitas()` - 51 edges
9. `Label()` - 40 edges
10. `notifyError()` - 35 edges

## Surprising Connections (you probably didn't know these)
- `DashboardBeritaPage()` --calls--> `getSession()`  [EXTRACTED]
  app/dashboard/berita/page.tsx → lib/auth.ts
- `DashboardDemografiPage()` --calls--> `getSession()`  [EXTRACTED]
  app/dashboard/demografi/page.tsx → lib/auth.ts
- `DashboardGaleriPage()` --calls--> `getSession()`  [EXTRACTED]
  app/dashboard/galeri/page.tsx → lib/auth.ts
- `DashboardKontenPage()` --calls--> `getSession()`  [EXTRACTED]
  app/dashboard/konten/page.tsx → lib/auth.ts
- `DashboardKritikSaranPage()` --calls--> `getSession()`  [EXTRACTED]
  app/dashboard/kritik-saran/page.tsx → lib/auth.ts

## Import Cycles
- None detected.

## Communities (151 total, 53 thin omitted)

### Community 0 - "KIAModal.tsx"
Cohesion: 0.08
Nodes (74): AktaKelahiranNikAdaModalProps, FormData, UploadedFile, AktaKelahiranNikTidakAdaModalProps, FormData, UploadedFile, AktaKematianModalProps, FormData (+66 more)

### Community 1 - "[action]/route.ts"
Cohesion: 0.09
Nodes (35): PATCH(), STATUS_VALID, GET(), dynamic, POST(), GET(), POST(), ALLOWED_EXT (+27 more)

### Community 2 - "statistik-export.ts"
Cohesion: 0.10
Nodes (39): dynamic, GET(), runtime, BAGIAN_STATISTIK, BagianStatistik, bagianValid(), barisBernomor(), buatWorkbookStatistik() (+31 more)

### Community 3 - "layanan-forms.ts"
Cohesion: 0.11
Nodes (19): catatanSection, f(), FieldDef, FieldType, kelahiranDokumen, kelahiranSections(), OPT_AGAMA, OPT_GOLDAR (+11 more)

### Community 4 - "profile-tabs.tsx"
Cohesion: 0.07
Nodes (34): nextId(), parse(), Row, serialize(), StrukturEditor(), BulletItem(), CONTENT, easeCustom (+26 more)

### Community 5 - "riwayat/[id]/page.tsx"
Cohesion: 0.08
Nodes (37): PermohonanDetail(), dynamic, RiwayatDetailPage(), STATUS_CONFIG, AlasanDitolak(), UraianTolak, Permohonan, RiwayatList() (+29 more)

### Community 6 - "CekStatusClient.tsx"
Cohesion: 0.19
Nodes (10): CekStatusClient(), Hasil, IKON, metadata, KEY_BY_LABEL, KOLOM_TOLAK, KolomTolak, LABEL_BY_KEY (+2 more)

### Community 7 - "catatAktivitas"
Cohesion: 0.10
Nodes (30): DELETE(), PUT(), requireAdmin(), uniqueSlug(), GET(), POST(), requireAdmin(), uniqueSlug() (+22 more)

### Community 8 - "input.tsx"
Cohesion: 0.11
Nodes (23): EMPTY, FormState, News, Foto, KATEGORI, ProfilInitial, Values, ImagePickerField() (+15 more)

### Community 9 - "RegisterContent.tsx"
Cohesion: 0.20
Nodes (12): Kecamatan, namaWilayah, MenuItem, menuItems, MenuPopuler(), Card(), CardAction(), CardContent() (+4 more)

### Community 10 - "select.tsx"
Cohesion: 0.10
Nodes (17): AKSI_STYLE, fmtWaktu(), LogAktivitasClient(), LogItem, Petugas, ALASAN_TOLAK, FINAL_STATUS, Item (+9 more)

### Community 11 - "admin/jam-layanan/route.ts"
Cohesion: 0.33
Nodes (8): dynamic, GET(), PUT(), dynamic, GET(), JAM_LAYANAN_KEY, sanitizeJamLayanan(), loadJamLayanan()

### Community 12 - "dashboard-charts.tsx"
Cohesion: 0.25
Nodes (9): dasar, Kategori, Layanan, LayananPopulerChart(), PermohonanHarianChart(), ProgressPermohonanChart(), TitikLabel, TrenBulananChart() (+1 more)

### Community 13 - "informasi-index.tsx"
Cohesion: 0.12
Nodes (20): dynamic, metadata, dynamic, metadata, PpidInformasiIndex(), PpidTambahKartu(), PpidSubnav(), HalamanIndeksKartu() (+12 more)

### Community 14 - "cn"
Cohesion: 0.09
Nodes (44): NotFound(), FieldEditor(), IconColumnInput(), ImageColumnInput(), EditorBox(), IconPicker(), WarnaPicker(), AktaKelahiranNikAdaModal() (+36 more)

### Community 15 - "demografi-editor.tsx"
Cohesion: 0.14
Nodes (22): Conflict, DemografiEditor(), digits(), EditGrid(), EditRow, nid(), ParsedRow, petaKartuLain() (+14 more)

### Community 16 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 17 - "demografi-registri.ts"
Cohesion: 0.14
Nodes (23): DELETE(), dynamic, POST(), PUT(), dynamic, GET(), KategoriAdmin, DemografiKategoriPage() (+15 more)

### Community 18 - "permohonan/[id]/route.ts"
Cohesion: 0.07
Nodes (55): GET(), PATCH(), STATUS_VALID, POST(), POST(), dynamic, POST(), runtime (+47 more)

### Community 19 - "authSlice.ts"
Cohesion: 0.17
Nodes (12): ForgotPasswordPage(), SessionHydrator(), ResetPasswordPage(), useAppDispatch(), authSlice, AuthState, checkNikKk, forgotPassword (+4 more)

### Community 20 - "AdminDemografi.tsx"
Cohesion: 0.14
Nodes (32): AdminDemografi(), BerkasAsing, downloadFile(), HitunganPeriode, usulJudul(), DemografiView(), fmt(), KOLOM_LABEL (+24 more)

### Community 21 - "static-content-registry.ts"
Cohesion: 0.10
Nodes (26): HubungiKamiPage(), dynamic, ProdukPage(), metadata, sections, WbsPage(), EditableInfoPage(), DOKUMEN_KATEGORI (+18 more)

### Community 22 - "ok"
Cohesion: 0.07
Nodes (55): dynamic, GET(), GET(), GET(), JENIS_VALID, POST(), requireAdmin(), POST() (+47 more)

### Community 23 - "1. SELESAI & TERVERIFIKASI — wajib di-port ke SAIBATIN"
Cohesion: 0.14
Nodes (13): 0. Peta dua project — BACA DULU, 1.1 Sisa branding Pesisir Barat di SIDAKO, 1.2 Carousel landing page — kurang besar & kepotong, 1.3 Permohonan Online pindah ke dashboard, tanpa modal, 1.4 Input tanggal tidak bisa diketik, 1.5 Upload — batas ukuran, OOM, dan path traversal, 1.6 Animasi transisi, 1.7 Sub-menu navbar yang bisa dibuat admin (+5 more)

### Community 24 - "AdminUsers.tsx"
Cohesion: 0.13
Nodes (10): AdminUser, AdminUsers(), DetailUser, EMPTY_FORM, GRUP_AKUN, GrupKey, Kecamatan, PermohonanRingkas (+2 more)

### Community 25 - "stats.tsx"
Cohesion: 0.08
Nodes (20): DemografiMetric(), fmt(), OFFICE_LAT, OFFICE_LNG, pulseIcon, StatistikKartuEditor(), base, FALLBACK (+12 more)

### Community 26 - "ktp/route.ts"
Cohesion: 0.14
Nodes (19): dynamic, getWorker(), isValidNik(), KtpParsed, loadSharp(), maxDuration, normalizeDigits(), parseKtpText() (+11 more)

### Community 27 - "back-button.tsx"
Cohesion: 0.10
Nodes (17): DashboardDemografiPage(), dynamic, AdminGaleri(), DashboardGaleriPage(), dynamic, DashboardKontenPage(), dynamic, DashboardLogPage() (+9 more)

### Community 28 - "Yang Harus Dibuat"
Cohesion: 0.18
Nodes (10): 1. Komponen `AccessibilityWidget` (client component), 2. Daftar Kontrol Aksesibilitas (minimal set berikut), 3. Persistensi & anti-flicker, 4. Aksesibilitas dari widget itu sendiri (jangan ironis), 5. Integrasi & batasan, Deliverable, Konteks Teknis (WAJIB diikuti, sudah diverifikasi di codebase), Kualitas & Verifikasi (lakukan sebelum selesai) (+2 more)

### Community 29 - "PengajuanBaruClient.tsx"
Cohesion: 0.18
Nodes (13): ICONS, Sheet(), SheetContent(), SheetDescription(), SheetFooter(), SheetHeader(), SheetOverlay(), SheetTitle() (+5 more)

### Community 30 - "button.tsx"
Cohesion: 0.10
Nodes (30): KOSONG, Row, KategoriData, ImageCropperDialog(), ImageCropperDialogProps, MediaPicker(), MediaPickerProps, MediaItem (+22 more)

### Community 31 - "permohonan-detail.tsx"
Cohesion: 0.27
Nodes (8): GambarItem, ImageViewer(), BerkasGallery(), BerkasView, fmtTanggal(), isImagePath(), JourneyProps, PermohonanJourney()

### Community 32 - "info-page.tsx"
Cohesion: 0.11
Nodes (16): dynamic, metadata, dynamic, metadata, metadata, dynamic, metadata, PpidLayananHalaman() (+8 more)

### Community 33 - "halaman/[slug]/page.tsx"
Cohesion: 0.23
Nodes (11): EditorNavigasi(), cariMenu(), dynamic, generateMetadata(), HalamanTambahanPage(), buatSlug(), gabungNavigasi(), hrefTambahan() (+3 more)

### Community 34 - "jam-layanan.ts"
Cohesion: 0.16
Nodes (18): JamLayananEditor(), Toggle(), URUTAN_HARI, formatTanggalId(), hariIniZona(), PanelJamTutup(), StatusJamLayanan, URUTAN_HARI (+10 more)

### Community 35 - "components.json"
Cohesion: 0.10
Nodes (19): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+11 more)

### Community 36 - "dashboard-sidebar.tsx"
Cohesion: 0.15
Nodes (19): ADMIN_ONLY_GROUPS, ADMIN_ONLY_HREFS, DashboardSidebar(), DesktopSidebar(), GROUPS, groupsForLevel(), GRUP_OPD, KOLOM_BILAH (+11 more)

### Community 37 - "PilihLayananClient.tsx"
Cohesion: 0.24
Nodes (10): FormPageClient(), AjukanPermohonanPage(), dynamic, generateMetadata(), getLayananForm(), getLayanan(), KATEGORI_LAYANAN, LAYANAN_PERMOHONAN (+2 more)

### Community 38 - "useStaticContent"
Cohesion: 0.10
Nodes (19): HalamanTambahanClient(), metadata, metadata, EditableBlock(), ProdukDisdukcapilView(), ProdukItem, KebijakanPrivasiView(), BAGIAN (+11 more)

### Community 39 - "app/page.tsx"
Cohesion: 0.08
Nodes (22): smoothEase, AlurLayanan(), ease, STEPS, CarouselSlide, DEFAULT_SLIDES, ElegantCarousel(), ElegantCarouselProps (+14 more)

### Community 40 - "akun-status.ts"
Cohesion: 0.27
Nodes (9): dynamic, POST(), fmtTanggal(), IsiDetail(), INFO_STATUS, infoStatus, STATUS_AKUN, StatusAkun (+1 more)

### Community 41 - "inline-edit.tsx"
Cohesion: 0.07
Nodes (31): bacaKonfigTab(), dynamic, LAYANAN_PPID_SLUGS, PpidPage(), PROFIL_TERHUBUNG, TENTANG_PPID_SLUGS, BlockEditorDialog(), Ctx (+23 more)

### Community 42 - "akun-level.ts"
Cohesion: 0.08
Nodes (39): GET(), dynamic, GET(), PUT(), VALID, PUT(), dynamic, POST() (+31 more)

### Community 43 - "accessibility-widget.tsx"
Cohesion: 0.21
Nodes (14): AccessibilityWidget(), SPACING_LABEL, TileButton(), A11Y_INIT_SCRIPT, A11Y_STORAGE_KEY, A11yPrefs, applyPrefs(), DEFAULT_PREFS (+6 more)

### Community 44 - "uji-visibilitas.ts"
Cohesion: 0.22
Nodes (8): Props, LAYANAN_FORMS, LayananForm, LAYANAN_KODE, SLUG_DARI_KODE, dariRute, nyata, slugForm

### Community 45 - "admin/demografi/route.ts"
Cohesion: 0.14
Nodes (28): dynamic, GET(), runtime, cekPetugas(), DELETE(), dynamic, GET(), periodeDariBadan() (+20 more)

### Community 46 - "parse/route.ts"
Cohesion: 0.09
Nodes (34): dynamic, maxDuration, periodeDariForm(), POST(), runtime, Conflict, dynamic, maxDuration (+26 more)

### Community 47 - "navbar.tsx"
Cohesion: 0.15
Nodes (17): DropdownItem(), DropdownMenu(), isExternalHref(), KELAS_ITEM_MENU, MobileItemIcon(), MobileMenuItem(), Navbar(), navigationIcons (+9 more)

### Community 48 - "useAppSelector"
Cohesion: 0.22
Nodes (12): InlineEditProvider(), isPublicPage(), useAppSelector, useAuth(), useGuestOnly(), useRequireAuth(), useUser(), AppDispatch (+4 more)

### Community 49 - "getSession"
Cohesion: 0.08
Nodes (36): GET(), POST(), POST(), GET(), dynamic, GET(), PATCH(), dynamic (+28 more)

### Community 50 - "AdminKonten.tsx"
Cohesion: 0.24
Nodes (9): AdminKonten(), flatten(), Leaf, MenuEntry, navigationItems, NavItem, NavMenu, NavSubItem (+1 more)

### Community 51 - "footer.tsx"
Cohesion: 0.07
Nodes (21): GaleriClient(), GalleryItem, metadata, INFO, metadata, BeritaDetailClient(), News, generateMetadata() (+13 more)

### Community 52 - "peta-demografi.tsx"
Cohesion: 0.24
Nodes (11): fmt(), Marker, PetaDemografi(), Row, GEO_BY_NAMA, geoForWilayah(), KECAMATAN_GEO, KecamatanGeo (+3 more)

### Community 53 - "devDependencies"
Cohesion: 0.13
Nodes (15): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, tailwindcss, tw-animate-css, @types/bcryptjs (+7 more)

### Community 54 - "LoginPage"
Cohesion: 0.40
Nodes (3): LoginPage(), metadata, loginUser

### Community 55 - "Journal — TIDORE / DAGA (`tidore-platform`)"
Cohesion: 0.10
Nodes (20): 10. `wilayah:isi-akun` — SELESAI 3 Sep 2026, 1. Identitas project, 2. Dua aplikasi, satu VPS, satu domain, 3. 🔴 Lima hal berbahaya kalau lupa, 4. Keadaan repo per 8 Agu 2026 — **43 berkas menggantung**, 5. Sudah live & terverifikasi (7 Agu dini hari) — jangan dikerjakan ulang, 5b. Menu "Profil Kependudukan" — SELESAI di kode, BELUM di-deploy (14 Agu), 6. Antrean (+12 more)

### Community 56 - "RegisterPage"
Cohesion: 0.40
Nodes (3): metadata, RegisterPage(), registerUser

### Community 57 - "profil/page.tsx"
Cohesion: 0.21
Nodes (9): ChangePasswordForm(), FotoProfilCard(), dynamic, metadata, ProfilPage(), ProfilForm(), CameraCapture(), CameraCaptureProps (+1 more)

### Community 58 - "app/layout.tsx"
Cohesion: 0.20
Nodes (8): cormorant, geistMono, geistSans, metadata, montserrat, SKEMA_ORGANISASI, Providers(), KunjunganPing()

### Community 59 - "dependencies"
Cohesion: 0.18
Nodes (11): animejs, highcharts, highcharts-react-official, dependencies, animejs, highcharts, highcharts-react-official, @reduxjs/toolkit (+3 more)

### Community 60 - "kategori.ts"
Cohesion: 0.29
Nodes (6): KATEGORI_SLUG, kategoriSlug(), WARNA_KATEGORI, WARNA_MATI, WARNA_NETRAL, WarnaKategori

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

### Community 65 - "AdminPengaduan.tsx"
Cohesion: 0.28
Nodes (6): AdminPengaduan(), FILTERS, Item, pisahBukti(), DashboardPengaduanPage(), dynamic

### Community 66 - "berita-list-client.tsx"
Cohesion: 0.31
Nodes (5): ArticleCard(), BeritaListClient(), News, tglID(), metadata

### Community 67 - "dashboard/berita/page.tsx"
Cohesion: 0.50
Nodes (3): AdminBerita(), DashboardBeritaPage(), dynamic

### Community 68 - "etl-permohonan.ts"
Cohesion: 0.28
Nodes (8): findKey(), JENIS_TANPA_DATA_LAMA, main(), mapStatus(), prisma, SOURCE, TABEL_JENIS, USER_LEVELS

### Community 69 - "pelayanan-list.ts"
Cohesion: 0.36
Nodes (6): PELAYANAN_KATEGORI, PELAYANAN_LIST, PELAYANAN_VISIBILITY_KEY, PelayananItem, slugTersembunyi(), layananTersembunyi()

### Community 70 - "media/page.tsx"
Cohesion: 0.40
Nodes (4): AdminMedia(), fmtSize(), DashboardMediaPage(), dynamic

### Community 71 - "StaffPengajuanForm"
Cohesion: 0.67
Nodes (3): StaffPengajuanForm(), useStatusJamLayanan(), useImageViewer()

### Community 72 - "gis/page.tsx"
Cohesion: 0.40
Nodes (3): metadata, PetaDemografi, PetaDemografiLoader()

### Community 74 - "utils.ts"
Cohesion: 0.08
Nodes (32): Detail, FINAL, STATUS, PengaturanPelayanan(), PilihRincian(), norm(), SearchSelect(), SearchSelectOption (+24 more)

### Community 75 - "etl-master.ts"
Cohesion: 0.43
Nodes (6): asPath(), dt(), main(), prisma, slugify(), SOURCE

### Community 76 - "baru/page.tsx"
Cohesion: 0.40
Nodes (4): dynamic, metadata, PilihLayananPage(), PilihLayananClient()

### Community 77 - "navigasi/page.tsx"
Cohesion: 0.50
Nodes (3): DashboardNavigasiPage(), dynamic, metadata

### Community 78 - "users/[id]/route.ts"
Cohesion: 0.19
Nodes (15): DELETE(), dynamic, GET(), DELETE(), dynamic, PUT(), adalahDataUrlGambar(), DIR_KTP (+7 more)

### Community 79 - "sitemap.xml/route.ts"
Cohesion: 0.40
Nodes (5): amanXml(), dynamic, Entri, GET(), RUTE_TETAP

### Community 80 - "package.json"
Cohesion: 0.33
Nodes (5): name, prisma, seed, private, version

### Community 83 - "image-upload-field.tsx"
Cohesion: 0.67
Nodes (3): ImageUploadField(), kecilkan(), TIPE_DITERIMA

### Community 84 - "eslint.config.mjs"
Cohesion: 0.40
Nodes (4): compat, __dirname, eslintConfig, __filename

### Community 85 - "etl-chat.ts"
Cohesion: 0.50
Nodes (4): dt(), main(), prisma, SOURCE

### Community 86 - "seed-berita.ts"
Cohesion: 0.50
Nodes (4): BERITA, main(), prisma, slugify()

### Community 89 - "etl-berkas.ts"
Cohesion: 0.67
Nodes (3): main(), mimeOf(), prisma

### Community 90 - "gen-lookup.ts"
Cohesion: 0.67
Nodes (3): GROUPS, main(), norm()

### Community 105 - "dashboard/kritik-saran/page.tsx"
Cohesion: 0.40
Nodes (4): AdminKritikSaran(), Item, DashboardKritikSaranPage(), dynamic

### Community 122 - "FormKartu"
Cohesion: 0.33
Nodes (6): FormKartu(), simpan(), keSlug(), PpidAksiKartu(), hapus(), simpanDaftar()

### Community 143 - "pagination.tsx"
Cohesion: 0.67
Nodes (3): deretHalaman(), OPSI_PER_HALAMAN, Pagination()

## Knowledge Gaps
- **640 isolated node(s):** `SUBMIT_ACTIONS`, `FETCH_ACTIONS`, `ALLOWED_EXT`, `runtime`, `dynamic` (+635 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 755 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **53 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `KIAModal.tsx`, `profile-tabs.tsx`, `input.tsx`, `RegisterContent.tsx`, `select.tsx`, `informasi-index.tsx`, `demografi-editor.tsx`, `pagination.tsx`, `AdminDemografi.tsx`, `stats.tsx`, `PengajuanBaruClient.tsx`, `button.tsx`, `permohonan-detail.tsx`, `info-page.tsx`, `jam-layanan.ts`, `dashboard-sidebar.tsx`, `PilihLayananClient.tsx`, `useStaticContent`, `inline-edit.tsx`, `accessibility-widget.tsx`, `navbar.tsx`, `getSession`, `AdminKonten.tsx`, `StaffPengajuanForm`, `utils.ts`, `baru/page.tsx`, `image-upload-field.tsx`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Why does `getSession()` connect `getSession` to `[action]/route.ts`, `statistik-export.ts`, `riwayat/[id]/page.tsx`, `catatAktivitas`, `admin/jam-layanan/route.ts`, `informasi-index.tsx`, `demografi-registri.ts`, `permohonan/[id]/route.ts`, `ok`, `ktp/route.ts`, `back-button.tsx`, `PilihLayananClient.tsx`, `akun-level.ts`, `admin/demografi/route.ts`, `parse/route.ts`, `footer.tsx`, `profil/page.tsx`, `skm/page.tsx`, `AdminPengaduan.tsx`, `dashboard/berita/page.tsx`, `media/page.tsx`, `baru/page.tsx`, `navigasi/page.tsx`, `users/[id]/route.ts`, `dashboard/kritik-saran/page.tsx`?**
  _High betweenness centrality (0.098) - this node is a cross-community bridge._
- **Why does `prisma` connect `ok` to `[action]/route.ts`, `statistik-export.ts`, `riwayat/[id]/page.tsx`, `catatAktivitas`, `admin/jam-layanan/route.ts`, `informasi-index.tsx`, `demografi-registri.ts`, `permohonan/[id]/route.ts`, `static-content-registry.ts`, `info-page.tsx`, `halaman/[slug]/page.tsx`, `akun-status.ts`, `inline-edit.tsx`, `akun-level.ts`, `admin/demografi/route.ts`, `parse/route.ts`, `getSession`, `footer.tsx`, `profil/page.tsx`, `pelayanan-list.ts`, `users/[id]/route.ts`, `sitemap.xml/route.ts`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **What connects `SUBMIT_ACTIONS`, `FETCH_ACTIONS`, `ALLOWED_EXT` to the rest of the system?**
  _640 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `KIAModal.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07850877192982456 - nodes in this community are weakly interconnected._
- **Should `[action]/route.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08792270531400966 - nodes in this community are weakly interconnected._
- **Should `statistik-export.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10365853658536585 - nodes in this community are weakly interconnected._