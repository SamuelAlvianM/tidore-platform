# Graph Report - tidore-platform  (2026-09-07)

## Corpus Check
- 371 files · ~273,263 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2039 nodes · 5874 edges · 151 communities (89 shown, 53 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f6b02b81`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- KKPerubahanBiodataModal.tsx
- [action]/route.ts
- statistik-export.ts
- layanan-forms.ts
- back-button.tsx
- riwayat/[id]/page.tsx
- CekStatusClient.tsx
- mail-templates.ts
- input.tsx
- RegisterContent.tsx
- AktaKelahiranNikTidakAdaModal.tsx
- getSession
- admin/demografi/route.ts
- informasi-index.tsx
- cn
- statistik-kartu-editor.tsx
- compilerOptions
- demografi-registri.ts
- send/route.ts
- etl-demografi.ts
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
- button.tsx
- AdminDemografi.tsx
- AdminKonten.tsx
- halaman/[slug]/page.tsx
- jam-layanan.ts
- components.json
- dashboard-sidebar.tsx
- PilihLayananClient.tsx
- inline-edit.tsx
- app/page.tsx
- akun-level.ts
- admin/jam-layanan/route.ts
- AdminPengaduan.tsx
- accessibility-widget.tsx
- uji-visibilitas.ts
- profile-tabs.tsx
- profil/page.tsx
- PengajuanBaruClient.tsx
- permohonan/[id]/route.ts
- auth.ts
- dashboard/kritik-saran/page.tsx
- footer.tsx
- peta-demografi.tsx
- devDependencies
- media/upload/route.ts
- Journal — TIDORE / DAGA (`tidore-platform`)
- dashboard-charts.tsx
- akun-status.ts
- app/layout.tsx
- dependencies
- demografi-export.ts
- skm/page.tsx
- scripts
- DAGA Platform
- isi-wilayah-akun.ts
- useAppSelector
- berita-list-client.tsx
- gis/page.tsx
- etl-permohonan.ts
- media/page.tsx
- syarat-ketentuan-view.tsx
- ppid/[...slug]/page.tsx
- produk/page.tsx
- register/route.ts
- utils.ts
- etl-master.ts
- navigasi/page.tsx
- info-page.tsx
- image-upload-field.tsx
- sitemap.xml/route.ts
- package.json
- pagination.tsx
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
- [jenis]/route.ts
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
2. `ok()` - 160 edges
3. `getSession()` - 157 edges
4. `fail()` - 149 edges
5. `prisma` - 80 edges
6. `Button()` - 68 edges
7. `Input()` - 54 edges
8. `catatAktivitas()` - 52 edges
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

### Community 0 - "KKPerubahanBiodataModal.tsx"
Cohesion: 0.08
Nodes (67): AktaKelahiranNikAdaModalProps, FormData, UploadedFile, AktaKematianModalProps, FormData, UploadedFile, AktaNikahModalProps, FormData (+59 more)

### Community 1 - "[action]/route.ts"
Cohesion: 0.09
Nodes (35): PATCH(), STATUS_VALID, GET(), PATCH(), dynamic, POST(), GET(), POST() (+27 more)

### Community 2 - "statistik-export.ts"
Cohesion: 0.11
Nodes (36): dynamic, GET(), runtime, BAGIAN_STATISTIK, BagianStatistik, bagianValid(), barisBernomor(), buatWorkbookStatistik() (+28 more)

### Community 3 - "layanan-forms.ts"
Cohesion: 0.09
Nodes (22): StaffPengajuanForm(), useStatusJamLayanan(), useImageViewer(), catatanSection, f(), FieldDef, FieldType, kelahiranDokumen (+14 more)

### Community 4 - "back-button.tsx"
Cohesion: 0.12
Nodes (14): AdminBerita(), DashboardBeritaPage(), dynamic, DashboardDemografiPage(), dynamic, AdminGaleri(), DashboardGaleriPage(), dynamic (+6 more)

### Community 5 - "riwayat/[id]/page.tsx"
Cohesion: 0.07
Nodes (43): PermohonanDetail(), dynamic, RiwayatDetailPage(), STATUS_CONFIG, AlasanDitolak(), UraianTolak, BerkasGallery(), BerkasView (+35 more)

### Community 6 - "CekStatusClient.tsx"
Cohesion: 0.15
Nodes (13): CekStatusClient(), Hasil, IKON, metadata, fmtTanggal(), IsiDetail(), KEY_BY_LABEL, KOLOM_TOLAK (+5 more)

### Community 7 - "mail-templates.ts"
Cohesion: 0.28
Nodes (15): POST(), appUrl(), getTransporter(), mailEnabled(), sendMail(), SendMailOptions, esc(), layout() (+7 more)

### Community 8 - "input.tsx"
Cohesion: 0.17
Nodes (11): ProfilInitial, EMPTY_FORM, FILE_FIELDS, FormData, KIAModalProps, NIK_FIELDS, UploadedFile, FotoBukti (+3 more)

### Community 9 - "RegisterContent.tsx"
Cohesion: 0.09
Nodes (28): ForgotPasswordPage(), LoginPage(), metadata, metadata, Kecamatan, namaWilayah, RegisterPage(), ResetPasswordPage() (+20 more)

### Community 10 - "AktaKelahiranNikTidakAdaModal.tsx"
Cohesion: 0.08
Nodes (33): AKSI_STYLE, fmtWaktu(), LogAktivitasClient(), LogItem, Petugas, ALASAN_TOLAK, FINAL_STATUS, Item (+25 more)

### Community 11 - "getSession"
Cohesion: 0.09
Nodes (34): dynamic, GET(), dynamic, GET(), GET(), GET(), JENIS_VALID, POST() (+26 more)

### Community 12 - "admin/demografi/route.ts"
Cohesion: 0.15
Nodes (27): dynamic, maxDuration, periodeDariForm(), POST(), runtime, periodeDariForm(), cekPetugas(), DELETE() (+19 more)

### Community 13 - "informasi-index.tsx"
Cohesion: 0.09
Nodes (27): dynamic, metadata, dynamic, metadata, PpidInformasiIndex(), simpan(), PpidAksiKartu(), hapus() (+19 more)

### Community 14 - "cn"
Cohesion: 0.08
Nodes (43): NotFound(), JamLayananEditor(), Toggle(), URUTAN_HARI, FieldEditor(), IconColumnInput(), ImageColumnInput(), EditorBox() (+35 more)

### Community 15 - "statistik-kartu-editor.tsx"
Cohesion: 0.12
Nodes (29): BULAN_PENDEK, GET(), Conflict, DemografiEditor(), digits(), EditGrid(), EditRow, nid() (+21 more)

### Community 16 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 17 - "demografi-registri.ts"
Cohesion: 0.14
Nodes (18): dynamic, GET(), DemografiKategoriPage(), dynamic, DEMOGRAFI_KATEGORI, DEMOGRAFI_KATEGORI_KUNCI, DEMOGRAFI_SLUGS, deteksiKategori() (+10 more)

### Community 18 - "send/route.ts"
Cohesion: 0.16
Nodes (22): dynamic, POST(), runtime, terakhirKirim, dynamic, POST(), runtime, fonnteAktif() (+14 more)

### Community 19 - "etl-demografi.ts"
Cohesion: 0.19
Nodes (13): SEMESTER_BAWAAN, TAHUN_BAWAAN, GROUP_SLUG, levelOf(), main(), num(), parentOf(), prisma (+5 more)

### Community 20 - "parse/route.ts"
Cohesion: 0.18
Nodes (15): Conflict, dynamic, maxDuration, POST(), runtime, sig(), Variant, bacaLembar() (+7 more)

### Community 21 - "static-content-registry.ts"
Cohesion: 0.12
Nodes (21): GET(), HubungiKamiPage(), ProdukPage(), metadata, sections, WbsPage(), hubungiKamiContent, ppidContent (+13 more)

### Community 22 - "ok"
Cohesion: 0.09
Nodes (34): GET(), GET(), dynamic, POST(), samarkanNama(), GET(), dynamic, GET() (+26 more)

### Community 23 - "1. SELESAI & TERVERIFIKASI — wajib di-port ke SAIBATIN"
Cohesion: 0.14
Nodes (13): 0. Peta dua project — BACA DULU, 1.1 Sisa branding Pesisir Barat di SIDAKO, 1.2 Carousel landing page — kurang besar & kepotong, 1.3 Permohonan Online pindah ke dashboard, tanpa modal, 1.4 Input tanggal tidak bisa diketik, 1.5 Upload — batas ukuran, OOM, dan path traversal, 1.6 Animasi transisi, 1.7 Sub-menu navbar yang bisa dibuat admin (+5 more)

### Community 24 - "AdminUsers.tsx"
Cohesion: 0.13
Nodes (10): AdminUser, AdminUsers(), DetailUser, EMPTY_FORM, GRUP_AKUN, GrupKey, Kecamatan, PermohonanRingkas (+2 more)

### Community 25 - "stats.tsx"
Cohesion: 0.07
Nodes (25): DemografiMetric(), fmt(), OFFICE_LAT, OFFICE_LNG, pulseIcon, StatistikKartuEditor(), base, FALLBACK (+17 more)

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
Cohesion: 0.19
Nodes (12): AuthArea(), DropdownItem(), DropdownMenu(), isExternalHref(), KELAS_ITEM_MENU, MobileItemIcon(), MobileMenuItem(), Navbar() (+4 more)

### Community 30 - "button.tsx"
Cohesion: 0.08
Nodes (40): EMPTY, FormState, News, Foto, KATEGORI, KOSONG, Row, ImageCropperDialog() (+32 more)

### Community 31 - "AdminDemografi.tsx"
Cohesion: 0.15
Nodes (29): AdminDemografi(), AntreImpor, downloadFile(), HitunganPeriode, KategoriAdmin, usulJudul(), DemografiView(), fmt() (+21 more)

### Community 32 - "AdminKonten.tsx"
Cohesion: 0.19
Nodes (11): AdminKonten(), flatten(), Leaf, MenuEntry, DashboardKontenPage(), dynamic, navigationItems, NavItem (+3 more)

### Community 33 - "halaman/[slug]/page.tsx"
Cohesion: 0.23
Nodes (11): EditorNavigasi(), cariMenu(), dynamic, generateMetadata(), HalamanTambahanPage(), buatSlug(), gabungNavigasi(), hrefTambahan() (+3 more)

### Community 34 - "jam-layanan.ts"
Cohesion: 0.18
Nodes (14): formatTanggalId(), hariIniZona(), PanelJamTutup(), StatusJamLayanan, URUTAN_HARI, defaultJamLayanan(), HARI_LABEL, JAM_TIMEZONE (+6 more)

### Community 35 - "components.json"
Cohesion: 0.10
Nodes (19): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+11 more)

### Community 36 - "dashboard-sidebar.tsx"
Cohesion: 0.18
Nodes (16): ADMIN_ONLY_GROUPS, ADMIN_ONLY_HREFS, DesktopSidebar(), GROUPS, groupsForLevel(), GRUP_OPD, KOLOM_BILAH, LabelSidebar() (+8 more)

### Community 37 - "PilihLayananClient.tsx"
Cohesion: 0.16
Nodes (14): FormPageClient(), AjukanPermohonanPage(), dynamic, generateMetadata(), dynamic, metadata, PilihLayananPage(), PilihLayananClient() (+6 more)

### Community 38 - "inline-edit.tsx"
Cohesion: 0.09
Nodes (27): HalamanTambahanClient(), metadata, metadata, SurveiKepuasanContent(), BlockEditorDialog(), Ctx, EditableBlock(), EditModeToggle() (+19 more)

### Community 39 - "app/page.tsx"
Cohesion: 0.08
Nodes (22): smoothEase, AlurLayanan(), ease, STEPS, CarouselSlide, DEFAULT_SLIDES, ElegantCarousel(), ElegantCarouselProps (+14 more)

### Community 40 - "akun-level.ts"
Cohesion: 0.09
Nodes (34): dynamic, GET(), PUT(), VALID, dynamic, PUT(), dynamic, POST() (+26 more)

### Community 41 - "admin/jam-layanan/route.ts"
Cohesion: 0.31
Nodes (10): dynamic, GET(), PUT(), dynamic, GET(), cekJamLayanan(), JAM_LAYANAN_KEY, sanitizeJamLayanan() (+2 more)

### Community 42 - "AdminPengaduan.tsx"
Cohesion: 0.21
Nodes (8): AdminPengaduan(), FILTERS, Item, pisahBukti(), DashboardPengaduanPage(), dynamic, GambarItem, ImageViewer()

### Community 43 - "accessibility-widget.tsx"
Cohesion: 0.23
Nodes (13): AccessibilityWidget(), SPACING_LABEL, TileButton(), A11Y_STORAGE_KEY, A11yPrefs, applyPrefs(), DEFAULT_PREFS, FONT_DEFAULT_IDX (+5 more)

### Community 44 - "uji-visibilitas.ts"
Cohesion: 0.15
Nodes (12): Props, LAYANAN_FORMS, LayananForm, LAYANAN_KODE, SLUG_DARI_KODE, PELAYANAN_KATEGORI, PELAYANAN_LIST, PELAYANAN_VISIBILITY_KEY (+4 more)

### Community 45 - "profile-tabs.tsx"
Cohesion: 0.07
Nodes (33): nextId(), parse(), Row, serialize(), StrukturEditor(), BulletItem(), CONTENT, easeCustom (+25 more)

### Community 46 - "profil/page.tsx"
Cohesion: 0.21
Nodes (9): ChangePasswordForm(), FotoProfilCard(), dynamic, metadata, ProfilPage(), ProfilForm(), CameraCapture(), CameraCaptureProps (+1 more)

### Community 47 - "PengajuanBaruClient.tsx"
Cohesion: 0.12
Nodes (19): ICONS, SheetContent(), SheetDescription(), SheetFooter(), SheetHeader(), SheetOverlay(), SheetTitle(), SheetTrigger() (+11 more)

### Community 48 - "permohonan/[id]/route.ts"
Cohesion: 0.21
Nodes (16): GET(), PATCH(), STATUS_VALID, formDariKode(), ALASAN, labelSah(), perluRincian(), pilihanRincian() (+8 more)

### Community 49 - "auth.ts"
Cohesion: 0.11
Nodes (24): GET(), POST(), DashboardLayout(), dynamic, DashboardPengajuanBaruPage(), dynamic, PengajuanBaruClient(), AdminPermohonan() (+16 more)

### Community 50 - "dashboard/kritik-saran/page.tsx"
Cohesion: 0.40
Nodes (4): AdminKritikSaran(), Item, DashboardKritikSaranPage(), dynamic

### Community 51 - "footer.tsx"
Cohesion: 0.09
Nodes (17): GaleriClient(), GalleryItem, metadata, INFO, metadata, BeritaDetailClient(), News, generateMetadata() (+9 more)

### Community 52 - "peta-demografi.tsx"
Cohesion: 0.24
Nodes (11): fmt(), Marker, PetaDemografi(), Row, GEO_BY_NAMA, geoForWilayah(), KECAMATAN_GEO, KecamatanGeo (+3 more)

### Community 53 - "devDependencies"
Cohesion: 0.13
Nodes (15): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, tailwindcss, tw-animate-css, @types/bcryptjs (+7 more)

### Community 54 - "media/upload/route.ts"
Cohesion: 0.30
Nodes (9): DELETE(), POST(), MEDIA_ALLOWED_IMAGE, MEDIA_ALLOWED_OTHER, MEDIA_MAX_SIZE, MEDIA_STORAGE_ROOT, MEDIA_URL_PREFIX, mediaPublicUrl() (+1 more)

### Community 55 - "Journal — TIDORE / DAGA (`tidore-platform`)"
Cohesion: 0.10
Nodes (20): 10. `wilayah:isi-akun` — SELESAI 3 Sep 2026, 1. Identitas project, 2. Dua aplikasi, satu VPS, satu domain, 3. 🔴 Lima hal berbahaya kalau lupa, 4. Keadaan repo per 8 Agu 2026 — **43 berkas menggantung**, 5. Sudah live & terverifikasi (7 Agu dini hari) — jangan dikerjakan ulang, 5b. Menu "Profil Kependudukan" — SELESAI di kode, BELUM di-deploy (14 Agu), 6. Antrean (+12 more)

### Community 56 - "dashboard-charts.tsx"
Cohesion: 0.25
Nodes (9): dasar, Kategori, Layanan, LayananPopulerChart(), PermohonanHarianChart(), ProgressPermohonanChart(), TitikLabel, TrenBulananChart() (+1 more)

### Community 57 - "akun-status.ts"
Cohesion: 0.26
Nodes (9): dynamic, POST(), POST(), INFO_STATUS, infoStatus, pesanLoginStatus(), STATUS_AKUN, StatusAkun (+1 more)

### Community 58 - "app/layout.tsx"
Cohesion: 0.14
Nodes (13): cormorant, geistMono, geistSans, metadata, montserrat, SKEMA_ORGANISASI, Providers(), SessionHydrator() (+5 more)

### Community 59 - "dependencies"
Cohesion: 0.18
Nodes (11): animejs, highcharts, highcharts-react-official, dependencies, animejs, highcharts, highcharts-react-official, @reduxjs/toolkit (+3 more)

### Community 60 - "demografi-export.ts"
Cohesion: 0.19
Nodes (16): dynamic, GET(), runtime, dynamic, GET(), runtime, buildDemografiWorkbook(), DbRow (+8 more)

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

### Community 65 - "useAppSelector"
Cohesion: 0.27
Nodes (10): useAppSelector, useAuth(), useGuestOnly(), useRequireAuth(), useUser(), AppDispatch, AppStore, makeStore() (+2 more)

### Community 66 - "berita-list-client.tsx"
Cohesion: 0.31
Nodes (5): ArticleCard(), BeritaListClient(), News, tglID(), metadata

### Community 67 - "gis/page.tsx"
Cohesion: 0.40
Nodes (3): metadata, PetaDemografi, PetaDemografiLoader()

### Community 68 - "etl-permohonan.ts"
Cohesion: 0.28
Nodes (8): findKey(), JENIS_TANPA_DATA_LAMA, main(), mapStatus(), prisma, SOURCE, TABEL_JENIS, USER_LEVELS

### Community 69 - "media/page.tsx"
Cohesion: 0.40
Nodes (4): AdminMedia(), fmtSize(), DashboardMediaPage(), dynamic

### Community 70 - "syarat-ketentuan-view.tsx"
Cohesion: 0.19
Nodes (9): metadata, BAGIAN, Data, SyaratKetentuanView(), SyaratLayananTabs(), KasusLayanan, LayananSyarat, SYARAT_KATEGORI (+1 more)

### Community 71 - "ppid/[...slug]/page.tsx"
Cohesion: 0.09
Nodes (19): bacaKonfigTab(), dynamic, LAYANAN_PPID_SLUGS, PpidPage(), PROFIL_TERHUBUNG, TENTANG_PPID_SLUGS, PpidCampur(), TAB (+11 more)

### Community 72 - "produk/page.tsx"
Cohesion: 0.40
Nodes (4): AdminProduk(), DashboardProdukPage(), dynamic, getDokumenKategori()

### Community 73 - "register/route.ts"
Cohesion: 0.19
Nodes (16): DELETE(), POST(), POST(), DELETE(), dynamic, PUT(), adalahDataUrlGambar(), DIR_KTP (+8 more)

### Community 74 - "utils.ts"
Cohesion: 0.11
Nodes (25): PengaturanPelayanan(), PilihRincian(), norm(), SearchSelect(), SearchSelectOption, SearchSelectProps, buttonVariants, Calendar() (+17 more)

### Community 75 - "etl-master.ts"
Cohesion: 0.43
Nodes (6): asPath(), dt(), main(), prisma, slugify(), SOURCE

### Community 76 - "navigasi/page.tsx"
Cohesion: 0.50
Nodes (3): DashboardNavigasiPage(), dynamic, metadata

### Community 77 - "info-page.tsx"
Cohesion: 0.12
Nodes (15): dynamic, metadata, dynamic, metadata, metadata, dynamic, dynamic, metadata (+7 more)

### Community 78 - "image-upload-field.tsx"
Cohesion: 0.67
Nodes (3): ImageUploadField(), kecilkan(), TIPE_DITERIMA

### Community 79 - "sitemap.xml/route.ts"
Cohesion: 0.40
Nodes (5): amanXml(), dynamic, Entri, GET(), RUTE_TETAP

### Community 80 - "package.json"
Cohesion: 0.33
Nodes (5): name, prisma, seed, private, version

### Community 81 - "pagination.tsx"
Cohesion: 0.67
Nodes (3): deretHalaman(), OPSI_PER_HALAMAN, Pagination()

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
Cohesion: 0.11
Nodes (31): DELETE(), PUT(), requireAdmin(), uniqueSlug(), GET(), POST(), requireAdmin(), uniqueSlug() (+23 more)

### Community 89 - "etl-berkas.ts"
Cohesion: 0.67
Nodes (3): main(), mimeOf(), prisma

### Community 90 - "gen-lookup.ts"
Cohesion: 0.67
Nodes (3): GROUPS, main(), norm()

### Community 106 - "[jenis]/route.ts"
Cohesion: 0.40
Nodes (4): GET(), demografiData, DemografiDataset, TODO: ganti dengan query Prisma nyata setelah model demografi tersedia.

## Knowledge Gaps
- **639 isolated node(s):** `SUBMIT_ACTIONS`, `FETCH_ACTIONS`, `ALLOWED_EXT`, `runtime`, `dynamic` (+634 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 754 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **53 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `KKPerubahanBiodataModal.tsx`, `layanan-forms.ts`, `input.tsx`, `RegisterContent.tsx`, `AktaKelahiranNikTidakAdaModal.tsx`, `informasi-index.tsx`, `statistik-kartu-editor.tsx`, `stats.tsx`, `notification-bell.tsx`, `navbar.tsx`, `button.tsx`, `AdminDemografi.tsx`, `AdminKonten.tsx`, `jam-layanan.ts`, `dashboard-sidebar.tsx`, `PilihLayananClient.tsx`, `inline-edit.tsx`, `app/page.tsx`, `AdminPengaduan.tsx`, `accessibility-widget.tsx`, `profile-tabs.tsx`, `PengajuanBaruClient.tsx`, `auth.ts`, `utils.ts`, `info-page.tsx`, `image-upload-field.tsx`, `pagination.tsx`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **Why does `getSession()` connect `getSession` to `[action]/route.ts`, `statistik-export.ts`, `back-button.tsx`, `riwayat/[id]/page.tsx`, `admin/demografi/route.ts`, `informasi-index.tsx`, `parse/route.ts`, `ok`, `ktp/route.ts`, `AdminKonten.tsx`, `PilihLayananClient.tsx`, `akun-level.ts`, `admin/jam-layanan/route.ts`, `AdminPengaduan.tsx`, `profil/page.tsx`, `permohonan/[id]/route.ts`, `auth.ts`, `dashboard/kritik-saran/page.tsx`, `footer.tsx`, `media/upload/route.ts`, `demografi-export.ts`, `skm/page.tsx`, `media/page.tsx`, `produk/page.tsx`, `register/route.ts`, `navigasi/page.tsx`, `catatAktivitas`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **Why does `prisma` connect `ok` to `[action]/route.ts`, `statistik-export.ts`, `riwayat/[id]/page.tsx`, `mail-templates.ts`, `getSession`, `admin/demografi/route.ts`, `informasi-index.tsx`, `statistik-kartu-editor.tsx`, `demografi-registri.ts`, `parse/route.ts`, `static-content-registry.ts`, `halaman/[slug]/page.tsx`, `akun-level.ts`, `admin/jam-layanan/route.ts`, `profil/page.tsx`, `permohonan/[id]/route.ts`, `auth.ts`, `footer.tsx`, `media/upload/route.ts`, `akun-status.ts`, `demografi-export.ts`, `ppid/[...slug]/page.tsx`, `register/route.ts`, `info-page.tsx`, `sitemap.xml/route.ts`, `catatAktivitas`?**
  _High betweenness centrality (0.055) - this node is a cross-community bridge._
- **What connects `SUBMIT_ACTIONS`, `FETCH_ACTIONS`, `ALLOWED_EXT` to the rest of the system?**
  _639 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `KKPerubahanBiodataModal.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07584269662921349 - nodes in this community are weakly interconnected._
- **Should `[action]/route.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08502415458937199 - nodes in this community are weakly interconnected._
- **Should `statistik-export.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11379800853485064 - nodes in this community are weakly interconnected._