# Graph Report - tidore-platform  (2026-09-08)

## Corpus Check
- 371 files · ~275,798 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2045 nodes · 5888 edges · 155 communities (94 shown, 53 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ab862033`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- KKPerubahanBiodataModal.tsx
- [action]/route.ts
- statistik-export.ts
- layanan-forms.ts
- back-button.tsx
- PermohonanDetail.tsx
- akun-tolak.ts
- users/route.ts
- static-content-registry.ts
- authSlice.ts
- KKTambahAnakModal.tsx
- prisma.ts
- periode-demografi.ts
- informasi-index.tsx
- cn
- statistik-kartu-editor.tsx
- compilerOptions
- admin/demografi/kategori/route.ts
- send/route.ts
- kunjungan/route.ts
- demografi-import.ts
- ppid/[...slug]/page.tsx
- ok
- 1. SELESAI & TERVERIFIKASI — wajib di-port ke SAIBATIN
- admin/skm/route.ts
- demografi-view.tsx
- ktp/route.ts
- notification-bell.tsx
- Yang Harus Dibuat
- permohonan/[id]/page.tsx
- button.tsx
- AdminDemografi.tsx
- halaman/[slug]/page.tsx
- PengajuanBaruClient.tsx
- jam-layanan.ts
- components.json
- dashboard-sidebar.tsx
- [layanan]/page.tsx
- useStaticContent
- app/page.tsx
- akun-level.ts
- utils.ts
- AdminPengaduan.tsx
- accessibility-widget.tsx
- isi-wilayah-akun.ts
- struktur-editor.tsx
- RegisterContent.tsx
- PilihLayananClient.tsx
- permohonan/[id]/route.ts
- bolehDashboard
- time-picker.tsx
- footer.tsx
- peta-demografi.tsx
- devDependencies
- media/upload/route.ts
- Journal — TIDORE / DAGA (`tidore-platform`)
- dashboard/page.tsx
- textarea.tsx
- app/layout.tsx
- dependencies
- LoginContent.tsx
- skm/page.tsx
- scripts
- DAGA Platform
- navbar.tsx
- useAppSelector
- CekStatusClient.tsx
- profil-terhubung.tsx
- etl-permohonan.ts
- tiket/[id]/route.ts
- uji-visibilitas.ts
- galeri-profil.tsx
- produk/page.tsx
- isPetugas
- AdminUsers.tsx
- etl-master.ts
- navigasi/page.tsx
- info-page.tsx
- AdminKonten.tsx
- sitemap.xml/route.ts
- package.json
- berita-list-client.tsx
- stats.tsx
- KIAModal.tsx
- eslint.config.mjs
- etl-chat.ts
- seed-berita.ts
- react-day-picker
- [jenis]/route.ts
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
- camera-capture.tsx
- cek-pendaftaran/route.ts
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
- image-upload-field.tsx
- StaffPengajuanForm
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
1. `cn()` - 212 edges
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
- `TeksTumbuh()` --calls--> `cn()`  [EXTRACTED]
  components/dashboard/demografi-editor.tsx → lib/utils.ts
- `AlertTitle()` --calls--> `cn()`  [EXTRACTED]
  components/ui/alert.tsx → lib/utils.ts
- `ImageColumnInput()` --calls--> `cn()`  [EXTRACTED]
  components/konten/field-editor.tsx → lib/utils.ts
- `SelectScrollDownButton()` --calls--> `cn()`  [EXTRACTED]
  components/ui/select.tsx → lib/utils.ts
- `SelectScrollUpButton()` --calls--> `cn()`  [EXTRACTED]
  components/ui/select.tsx → lib/utils.ts

## Import Cycles
- None detected.

## Communities (155 total, 53 thin omitted)

### Community 0 - "KKPerubahanBiodataModal.tsx"
Cohesion: 0.08
Nodes (57): AktaNikahModalProps, FormData, UploadedFile, AktaPerceraianModalProps, FormData, UploadedFile, d(), FORM_PERMOHONAN (+49 more)

### Community 1 - "[action]/route.ts"
Cohesion: 0.11
Nodes (27): PATCH(), STATUS_VALID, dynamic, POST(), dynamic, POST(), POST(), POST() (+19 more)

### Community 2 - "statistik-export.ts"
Cohesion: 0.09
Nodes (44): dynamic, GET(), runtime, buildDemografiWorkbook(), DbRow, kolomNilai(), susunBaris(), susunKolom() (+36 more)

### Community 3 - "layanan-forms.ts"
Cohesion: 0.11
Nodes (19): catatanSection, f(), FieldDef, FieldType, kelahiranDokumen, kelahiranSections(), OPT_AGAMA, OPT_GOLDAR (+11 more)

### Community 4 - "back-button.tsx"
Cohesion: 0.11
Nodes (15): AdminBerita(), DashboardBeritaPage(), dynamic, DashboardDemografiPage(), dynamic, AdminGaleri(), DashboardGaleriPage(), dynamic (+7 more)

### Community 5 - "PermohonanDetail.tsx"
Cohesion: 0.06
Nodes (49): Detail, FINAL, PermohonanDetail(), STATUS, dynamic, RiwayatDetailPage(), STATUS_CONFIG, PilihRincian() (+41 more)

### Community 6 - "akun-tolak.ts"
Cohesion: 0.24
Nodes (9): fmtTanggal(), IsiDetail(), KEY_BY_LABEL, KOLOM_TOLAK, KolomTolak, LABEL_BY_KEY, labelKolom(), susunAlasanTolak() (+1 more)

### Community 7 - "users/route.ts"
Cohesion: 0.21
Nodes (21): GET(), NAMA_LEVEL, PATCH(), POST(), requireAdmin(), POST(), simpanFotoKtp(), appUrl() (+13 more)

### Community 8 - "static-content-registry.ts"
Cohesion: 0.09
Nodes (26): GET(), metadata, SurveiKepuasanContent(), BlockEditorDialog(), Ctx, EditModeToggle(), InlineEditCtx, InlineEditProvider() (+18 more)

### Community 9 - "authSlice.ts"
Cohesion: 0.12
Nodes (15): ForgotPasswordPage(), LoginPage(), metadata, SessionHydrator(), ResetPasswordPage(), useAppDispatch(), authSlice, AuthState (+7 more)

### Community 10 - "KKTambahAnakModal.tsx"
Cohesion: 0.07
Nodes (36): AKSI_STYLE, fmtWaktu(), LogAktivitasClient(), LogItem, Petugas, ALASAN_TOLAK, FINAL_STATUS, Item (+28 more)

### Community 11 - "prisma.ts"
Cohesion: 0.08
Nodes (28): dynamic, dynamic, maxDuration, runtime, dynamic, POST(), POST(), dynamic (+20 more)

### Community 12 - "periode-demografi.ts"
Cohesion: 0.09
Nodes (46): dynamic, GET(), runtime, periodeDariForm(), Conflict, dynamic, maxDuration, periodeDariForm() (+38 more)

### Community 13 - "informasi-index.tsx"
Cohesion: 0.08
Nodes (26): dynamic, metadata, dynamic, metadata, dynamic, metadata, dynamic, metadata (+18 more)

### Community 14 - "cn"
Cohesion: 0.12
Nodes (33): NotFound(), AktaKelahiranNikAdaModal(), AktaKelahiranNikTidakAdaModal(), AktaKematianModal(), AktaNikahModal(), AktaPerceraianModal(), KedatanganPendudukModal(), KIAModal() (+25 more)

### Community 15 - "statistik-kartu-editor.tsx"
Cohesion: 0.08
Nodes (42): BULAN_PENDEK, GET(), Conflict, DemografiEditor(), digits(), EditGrid(), EditRow, nid() (+34 more)

### Community 16 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 17 - "admin/demografi/kategori/route.ts"
Cohesion: 0.13
Nodes (31): DELETE(), dynamic, GET(), PATCH(), POST(), PUT(), selaraskanKartuBeranda(), terkunci() (+23 more)

### Community 18 - "send/route.ts"
Cohesion: 0.16
Nodes (22): dynamic, POST(), runtime, terakhirKirim, dynamic, POST(), runtime, fonnteAktif() (+14 more)

### Community 19 - "kunjungan/route.ts"
Cohesion: 0.36
Nodes (7): dynamic, GET(), POST(), runtime, ONLINE_WINDOW_MS, statsKunjungan(), tanggalHariIni()

### Community 20 - "demografi-import.ts"
Cohesion: 0.39
Nodes (7): bacaLembar(), cellNum(), classifyKode(), DemografiRow, klasifikasiKode(), norm(), ParseResult

### Community 21 - "ppid/[...slug]/page.tsx"
Cohesion: 0.10
Nodes (24): HubungiKamiPage(), bacaKonfigTab(), dynamic, LAYANAN_PPID_SLUGS, PpidPage(), PROFIL_TERHUBUNG, TENTANG_PPID_SLUGS, dynamic (+16 more)

### Community 22 - "ok"
Cohesion: 0.07
Nodes (64): DELETE(), PUT(), requireAdmin(), uniqueSlug(), GET(), POST(), requireAdmin(), uniqueSlug() (+56 more)

### Community 23 - "1. SELESAI & TERVERIFIKASI — wajib di-port ke SAIBATIN"
Cohesion: 0.14
Nodes (13): 0. Peta dua project — BACA DULU, 1.1 Sisa branding Pesisir Barat di SIDAKO, 1.2 Carousel landing page — kurang besar & kepotong, 1.3 Permohonan Online pindah ke dashboard, tanpa modal, 1.4 Input tanggal tidak bisa diketik, 1.5 Upload — batas ukuran, OOM, dan path traversal, 1.6 Animasi transisi, 1.7 Sub-menu navbar yang bisa dibuat admin (+5 more)

### Community 24 - "admin/skm/route.ts"
Cohesion: 0.23
Nodes (11): GET(), POST(), hitungIkm(), nilaiPerUnsur(), SKM_ASPEK, SKM_KENDALA_LAYANAN, SKM_LAYANAN, SKM_PENDIDIKAN (+3 more)

### Community 25 - "demografi-view.tsx"
Cohesion: 0.15
Nodes (18): DemografiMetric(), fmt(), Row, DemografiView(), fmt(), KOLOM_LABEL, labelKolom(), Row (+10 more)

### Community 26 - "ktp/route.ts"
Cohesion: 0.14
Nodes (19): dynamic, getWorker(), isValidNik(), KtpParsed, loadSharp(), maxDuration, normalizeDigits(), parseKtpText() (+11 more)

### Community 27 - "notification-bell.tsx"
Cohesion: 0.43
Nodes (7): getAudioCtx(), NotificationBell(), Notifikasi, playDing(), TIPE_ICON, unlockAudio(), waktuRelatif()

### Community 28 - "Yang Harus Dibuat"
Cohesion: 0.18
Nodes (10): 1. Komponen `AccessibilityWidget` (client component), 2. Daftar Kontrol Aksesibilitas (minimal set berikut), 3. Persistensi & anti-flicker, 4. Aksesibilitas dari widget itu sendiri (jangan ironis), 5. Integrasi & batasan, Deliverable, Konteks Teknis (WAJIB diikuti, sudah diverifikasi di codebase), Kualitas & Verifikasi (lakukan sebelum selesai) (+2 more)

### Community 29 - "permohonan/[id]/page.tsx"
Cohesion: 0.32
Nodes (9): GET(), DetailPermohonanPage(), dynamic, bolehSemuaWilayah(), isOpd(), isOperatorWilayah(), isPengajuInstansi(), bolehLihatPermohonan() (+1 more)

### Community 30 - "button.tsx"
Cohesion: 0.12
Nodes (21): Foto, KATEGORI, AdminKritikSaran(), Item, AdminMedia(), fmtSize(), KOSONG, GROUPS (+13 more)

### Community 31 - "AdminDemografi.tsx"
Cohesion: 0.16
Nodes (24): AdminDemografi(), downloadFile(), HitunganPeriode, KategoriAdmin, usulJudul(), BadgePeriode(), BadgePeriodeEdit(), StatsGrid() (+16 more)

### Community 32 - "halaman/[slug]/page.tsx"
Cohesion: 0.17
Nodes (15): EditorNavigasi(), cariMenu(), dynamic, generateMetadata(), HalamanTambahanPage(), buatSlug(), gabungNavigasi(), hrefTambahan() (+7 more)

### Community 33 - "PengajuanBaruClient.tsx"
Cohesion: 0.18
Nodes (13): ICONS, Sheet(), SheetContent(), SheetDescription(), SheetFooter(), SheetHeader(), SheetOverlay(), SheetTitle() (+5 more)

### Community 34 - "jam-layanan.ts"
Cohesion: 0.14
Nodes (24): dynamic, GET(), JamLayananEditor(), Toggle(), URUTAN_HARI, formatTanggalId(), hariIniZona(), PanelJamTutup() (+16 more)

### Community 35 - "components.json"
Cohesion: 0.10
Nodes (19): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+11 more)

### Community 36 - "dashboard-sidebar.tsx"
Cohesion: 0.18
Nodes (16): ADMIN_ONLY_GROUPS, ADMIN_ONLY_HREFS, DesktopSidebar(), GROUPS, groupsForLevel(), GRUP_OPD, KOLOM_BILAH, LabelSidebar() (+8 more)

### Community 37 - "[layanan]/page.tsx"
Cohesion: 0.23
Nodes (10): FormPageClient(), AjukanPermohonanPage(), dynamic, generateMetadata(), getLayananForm(), getLayanan(), KATEGORI_LAYANAN, LAYANAN_PERMOHONAN (+2 more)

### Community 38 - "useStaticContent"
Cohesion: 0.07
Nodes (27): HalamanTambahanClient(), metadata, metadata, CarouselSlide, DEFAULT_SLIDES, ElegantCarousel(), ElegantCarouselProps, TODO: ganti `image` dengan foto asli DAGA/Disdukcapil Tidore Kepulauan — (+19 more)

### Community 39 - "app/page.tsx"
Cohesion: 0.14
Nodes (12): smoothEase, AlurLayanan(), ease, STEPS, ProfileTabs(), News, QuickHighlights(), tglID() (+4 more)

### Community 40 - "akun-level.ts"
Cohesion: 0.18
Nodes (11): isStaf(), LEVEL_ADMIN, LEVEL_OPD, LEVEL_OPERATOR, LEVEL_STAFF, LEVEL_WARGA, NAMA_PERAN, DataAkun (+3 more)

### Community 41 - "utils.ts"
Cohesion: 0.12
Nodes (21): Values, AktaKelahiranNikAdaModalProps, FormData, UploadedFile, AktaKelahiranNikTidakAdaModalProps, FormData, UploadedFile, AktaKematianModalProps (+13 more)

### Community 42 - "AdminPengaduan.tsx"
Cohesion: 0.28
Nodes (6): AdminPengaduan(), FILTERS, Item, pisahBukti(), DashboardPengaduanPage(), dynamic

### Community 43 - "accessibility-widget.tsx"
Cohesion: 0.21
Nodes (14): AccessibilityWidget(), SPACING_LABEL, TileButton(), A11Y_INIT_SCRIPT, A11Y_STORAGE_KEY, A11yPrefs, applyPrefs(), DEFAULT_PREFS (+6 more)

### Community 44 - "isi-wilayah-akun.ts"
Cohesion: 0.32
Nodes (7): main(), normal(), prisma, Siap, sufiks(), TIMPA, TULIS

### Community 45 - "struktur-editor.tsx"
Cohesion: 0.08
Nodes (34): EditorBox(), nextId(), parse(), Row, serialize(), StrukturEditor(), BulletItem(), CONTENT (+26 more)

### Community 46 - "RegisterContent.tsx"
Cohesion: 0.20
Nodes (5): metadata, Kecamatan, namaWilayah, RegisterPage(), registerUser

### Community 47 - "PilihLayananClient.tsx"
Cohesion: 0.18
Nodes (13): PengajuanBaruClient(), PilihLayananClient(), PengaturanPelayanan(), KATEGORI_SLUG, kategoriSlug(), WARNA_KATEGORI, WARNA_MATI, WARNA_NETRAL (+5 more)

### Community 48 - "permohonan/[id]/route.ts"
Cohesion: 0.21
Nodes (16): GET(), PATCH(), STATUS_VALID, GET(), formDariKode(), ALASAN, labelSah(), perluRincian() (+8 more)

### Community 49 - "bolehDashboard"
Cohesion: 0.17
Nodes (11): DashboardLayout(), dynamic, DashboardPengajuanBaruPage(), dynamic, AdminPermohonan(), DashboardPermohonanPage(), dynamic, dynamic (+3 more)

### Community 50 - "time-picker.tsx"
Cohesion: 0.18
Nodes (13): norm(), SearchSelect(), SearchSelectOption, SearchSelectProps, Popover(), PopoverContent(), PopoverTrigger(), HOURS (+5 more)

### Community 51 - "footer.tsx"
Cohesion: 0.09
Nodes (17): GaleriClient(), GalleryItem, metadata, INFO, metadata, BeritaDetailClient(), News, generateMetadata() (+9 more)

### Community 52 - "peta-demografi.tsx"
Cohesion: 0.16
Nodes (14): metadata, fmt(), PetaDemografi, PetaDemografiLoader(), Marker, PetaDemografi(), Row, GEO_BY_NAMA (+6 more)

### Community 53 - "devDependencies"
Cohesion: 0.13
Nodes (15): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, tailwindcss, tw-animate-css, @types/bcryptjs (+7 more)

### Community 54 - "media/upload/route.ts"
Cohesion: 0.38
Nodes (8): POST(), MEDIA_ALLOWED_IMAGE, MEDIA_ALLOWED_OTHER, MEDIA_MAX_SIZE, MEDIA_STORAGE_ROOT, MEDIA_URL_PREFIX, mediaPublicUrl(), mediaSubdir()

### Community 55 - "Journal — TIDORE / DAGA (`tidore-platform`)"
Cohesion: 0.10
Nodes (20): 10. `wilayah:isi-akun` — SELESAI 3 Sep 2026, 1. Identitas project, 2. Dua aplikasi, satu VPS, satu domain, 3. 🔴 Lima hal berbahaya kalau lupa, 4. Keadaan repo per 8 Agu 2026 — **43 berkas menggantung**, 5. Sudah live & terverifikasi (7 Agu dini hari) — jangan dikerjakan ulang, 5b. Menu "Profil Kependudukan" — SELESAI di kode, BELUM di-deploy (14 Agu), 6. Antrean (+12 more)

### Community 56 - "dashboard/page.tsx"
Cohesion: 0.15
Nodes (17): BULAN_PENDEK, DashboardPage(), dynamic, fmt(), pct(), ProgressRow(), STATUS_PENGADUAN, dasar (+9 more)

### Community 57 - "textarea.tsx"
Cohesion: 0.16
Nodes (10): EMPTY, FormState, News, ImagePickerField(), ImagePickerFieldProps, MediaPicker(), RichEditor(), RichEditorProps (+2 more)

### Community 58 - "app/layout.tsx"
Cohesion: 0.20
Nodes (8): cormorant, geistMono, geistSans, metadata, montserrat, SKEMA_ORGANISASI, Providers(), KunjunganPing()

### Community 59 - "dependencies"
Cohesion: 0.18
Nodes (11): animejs, highcharts, highcharts-react-official, dependencies, animejs, highcharts, highcharts-react-official, @reduxjs/toolkit (+3 more)

### Community 60 - "LoginContent.tsx"
Cohesion: 0.32
Nodes (10): MenuItem, menuItems, MenuPopuler(), Card(), CardAction(), CardContent(), CardDescription(), CardFooter() (+2 more)

### Community 61 - "skm/page.tsx"
Cohesion: 0.24
Nodes (8): DashboardSkmPage(), dynamic, AspekRata, Data, MasukanLayanan, mutu(), Responden, SkmDashboard()

### Community 62 - "scripts"
Cohesion: 0.13
Nodes (15): scripts, akun:uji, build, db:generate, db:migrate, db:push, db:seed, db:studio (+7 more)

### Community 63 - "DAGA Platform"
Cohesion: 0.29
Nodes (6): Akun demo (setelah seed), DAGA Platform, Deploy ke cPanel (ringkas), Menjalankan (lokal), Status migrasi, Struktur

### Community 64 - "navbar.tsx"
Cohesion: 0.19
Nodes (12): AuthArea(), DropdownItem(), DropdownMenu(), isExternalHref(), KELAS_ITEM_MENU, MobileItemIcon(), MobileMenuItem(), Navbar() (+4 more)

### Community 65 - "useAppSelector"
Cohesion: 0.27
Nodes (10): useAppSelector, useAuth(), useGuestOnly(), useRequireAuth(), useUser(), AppDispatch, AppStore, makeStore() (+2 more)

### Community 66 - "CekStatusClient.tsx"
Cohesion: 0.20
Nodes (8): CekStatusClient(), Hasil, IKON, metadata, AdminUsers(), DashboardUsersPage(), dynamic, infoStatus

### Community 67 - "profil-terhubung.tsx"
Cohesion: 0.17
Nodes (7): IKON_JENIS, KUNCI_PROFIL, LABEL_BERANDA, MaklumatPanel(), ProfilJenis, ProfilTerhubung(), StrukturEditor

### Community 68 - "etl-permohonan.ts"
Cohesion: 0.28
Nodes (8): findKey(), JENIS_TANPA_DATA_LAMA, main(), mapStatus(), prisma, SOURCE, TABEL_JENIS, USER_LEVELS

### Community 69 - "tiket/[id]/route.ts"
Cohesion: 0.31
Nodes (10): dynamic, findTiketFor(), GET(), PATCH(), POST(), Session, GET(), POST() (+2 more)

### Community 70 - "uji-visibilitas.ts"
Cohesion: 0.22
Nodes (8): Props, LAYANAN_FORMS, LayananForm, LAYANAN_KODE, SLUG_DARI_KODE, dariRute, nyata, slugForm

### Community 71 - "galeri-profil.tsx"
Cohesion: 0.13
Nodes (15): clampKolom(), fmtTanggal(), GaleriItem, GaleriProfilPpid(), idBaru(), KOLOM_PILIHAN, Lebar, LinkItem (+7 more)

### Community 72 - "produk/page.tsx"
Cohesion: 0.40
Nodes (4): AdminProduk(), DashboardProdukPage(), dynamic, getDokumenKategori()

### Community 73 - "isPetugas"
Cohesion: 0.10
Nodes (28): GET(), dynamic, GET(), PUT(), VALID, DELETE(), dynamic, GET() (+20 more)

### Community 74 - "AdminUsers.tsx"
Cohesion: 0.12
Nodes (11): AdminUser, DetailUser, EMPTY_FORM, GRUP_AKUN, GrupKey, Kecamatan, PermohonanRingkas, STATUS_PERMOHONAN (+3 more)

### Community 75 - "etl-master.ts"
Cohesion: 0.43
Nodes (6): asPath(), dt(), main(), prisma, slugify(), SOURCE

### Community 76 - "navigasi/page.tsx"
Cohesion: 0.50
Nodes (3): DashboardNavigasiPage(), dynamic, metadata

### Community 77 - "info-page.tsx"
Cohesion: 0.20
Nodes (11): metadata, dynamic, metadata, EditableBlock(), useInlineEdit(), ProfilKependudukanView(), tahunDari(), InfoBerkas (+3 more)

### Community 78 - "AdminKonten.tsx"
Cohesion: 0.28
Nodes (7): AdminKonten(), flatten(), Leaf, MenuEntry, DashboardKontenPage(), dynamic, PPID_INFORMASI_GRUP

### Community 79 - "sitemap.xml/route.ts"
Cohesion: 0.40
Nodes (5): amanXml(), dynamic, Entri, GET(), RUTE_TETAP

### Community 80 - "package.json"
Cohesion: 0.33
Nodes (5): name, prisma, seed, private, version

### Community 81 - "berita-list-client.tsx"
Cohesion: 0.31
Nodes (5): ArticleCard(), BeritaListClient(), News, tglID(), metadata

### Community 82 - "stats.tsx"
Cohesion: 0.09
Nodes (19): AntreImpor, OFFICE_LAT, OFFICE_LNG, pulseIcon, base, FALLBACK, KartuDemografi, MapCard() (+11 more)

### Community 83 - "KIAModal.tsx"
Cohesion: 0.29
Nodes (6): EMPTY_FORM, FILE_FIELDS, FormData, KIAModalProps, NIK_FIELDS, UploadedFile

### Community 84 - "eslint.config.mjs"
Cohesion: 0.40
Nodes (4): compat, __dirname, eslintConfig, __filename

### Community 85 - "etl-chat.ts"
Cohesion: 0.50
Nodes (4): dt(), main(), prisma, SOURCE

### Community 86 - "seed-berita.ts"
Cohesion: 0.50
Nodes (4): BERITA, main(), prisma, slugify()

### Community 88 - "[jenis]/route.ts"
Cohesion: 0.40
Nodes (4): GET(), demografiData, DemografiDataset, TODO: ganti dengan query Prisma nyata setelah model demografi tersedia.

### Community 89 - "etl-berkas.ts"
Cohesion: 0.67
Nodes (3): main(), mimeOf(), prisma

### Community 90 - "gen-lookup.ts"
Cohesion: 0.67
Nodes (3): GROUPS, main(), norm()

### Community 105 - "camera-capture.tsx"
Cohesion: 0.47
Nodes (4): FotoProfilCard(), CameraCapture(), CameraCaptureProps, keDataUrl()

### Community 106 - "cek-pendaftaran/route.ts"
Cohesion: 0.67
Nodes (3): dynamic, POST(), samarkanNama()

### Community 122 - "image-upload-field.tsx"
Cohesion: 0.67
Nodes (3): ImageUploadField(), kecilkan(), TIPE_DITERIMA

### Community 123 - "StaffPengajuanForm"
Cohesion: 0.67
Nodes (3): StaffPengajuanForm(), useStatusJamLayanan(), useImageViewer()

## Knowledge Gaps
- **641 isolated node(s):** `EditRow`, `ParsedRow`, `Conflict`, `AktaNikahModalProps`, `FormData` (+636 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 756 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **53 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `KKPerubahanBiodataModal.tsx`, `PermohonanDetail.tsx`, `static-content-registry.ts`, `KKTambahAnakModal.tsx`, `informasi-index.tsx`, `statistik-kartu-editor.tsx`, `demografi-view.tsx`, `notification-bell.tsx`, `button.tsx`, `AdminDemografi.tsx`, `PengajuanBaruClient.tsx`, `jam-layanan.ts`, `dashboard-sidebar.tsx`, `useStaticContent`, `app/page.tsx`, `utils.ts`, `accessibility-widget.tsx`, `struktur-editor.tsx`, `PilihLayananClient.tsx`, `time-picker.tsx`, `textarea.tsx`, `LoginContent.tsx`, `navbar.tsx`, `AdminUsers.tsx`, `info-page.tsx`, `AdminKonten.tsx`, `stats.tsx`, `KIAModal.tsx`, `image-upload-field.tsx`, `StaffPengajuanForm`?**
  _High betweenness centrality (0.133) - this node is a cross-community bridge._
- **Why does `getSession()` connect `ok` to `[action]/route.ts`, `statistik-export.ts`, `back-button.tsx`, `PermohonanDetail.tsx`, `users/route.ts`, `prisma.ts`, `periode-demografi.ts`, `informasi-index.tsx`, `admin/demografi/kategori/route.ts`, `admin/skm/route.ts`, `ktp/route.ts`, `permohonan/[id]/page.tsx`, `[layanan]/page.tsx`, `AdminPengaduan.tsx`, `permohonan/[id]/route.ts`, `bolehDashboard`, `footer.tsx`, `media/upload/route.ts`, `dashboard/page.tsx`, `skm/page.tsx`, `CekStatusClient.tsx`, `tiket/[id]/route.ts`, `produk/page.tsx`, `isPetugas`, `navigasi/page.tsx`, `AdminKonten.tsx`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **Why does `prisma` connect `prisma.ts` to `[action]/route.ts`, `statistik-export.ts`, `PermohonanDetail.tsx`, `users/route.ts`, `static-content-registry.ts`, `periode-demografi.ts`, `informasi-index.tsx`, `statistik-kartu-editor.tsx`, `admin/demografi/kategori/route.ts`, `kunjungan/route.ts`, `ppid/[...slug]/page.tsx`, `ok`, `admin/skm/route.ts`, `permohonan/[id]/page.tsx`, `halaman/[slug]/page.tsx`, `jam-layanan.ts`, `permohonan/[id]/route.ts`, `footer.tsx`, `media/upload/route.ts`, `dashboard/page.tsx`, `tiket/[id]/route.ts`, `isPetugas`, `info-page.tsx`, `sitemap.xml/route.ts`, `cek-pendaftaran/route.ts`?**
  _High betweenness centrality (0.055) - this node is a cross-community bridge._
- **What connects `EditRow`, `ParsedRow`, `Conflict` to the rest of the system?**
  _641 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `KKPerubahanBiodataModal.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07589984350547731 - nodes in this community are weakly interconnected._
- **Should `[action]/route.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10810810810810811 - nodes in this community are weakly interconnected._
- **Should `statistik-export.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09158186864014801 - nodes in this community are weakly interconnected._