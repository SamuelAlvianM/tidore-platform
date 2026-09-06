# Graph Report - tidore-platform  (2026-09-07)

## Corpus Check
- 371 files · ~269,444 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2030 nodes · 5827 edges · 159 communities (97 shown, 53 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `054a2126`
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
- berita/[id]/route.ts
- input.tsx
- LoginContent.tsx
- staff-pengajuan-form.tsx
- permohonan/[id]/route.ts
- dashboard/page.tsx
- informasi-index.tsx
- cn
- statistik-kartu-editor.tsx
- compilerOptions
- AdminDemografi.tsx
- register/route.ts
- authSlice.ts
- periode-demografi.ts
- produk/[...slug]/page.tsx
- ok
- 1. SELESAI & TERVERIFIKASI — wajib di-port ke SAIBATIN
- AdminUsers.tsx
- stats.tsx
- ktp/route.ts
- dokumen-registry.ts
- Yang Harus Dibuat
- PengajuanBaruClient.tsx
- dialog.tsx
- struktur-editor.tsx
- info-page.tsx
- navbar.tsx
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
- demografi-registri.ts
- parse/route.ts
- useAppSelector
- admin/skm/route.ts
- getSession
- AdminKonten.tsx
- footer.tsx
- peta-demografi.tsx
- devDependencies
- LoginPage
- Journal — TIDORE / DAGA (`tidore-platform`)
- RegisterContent.tsx
- profil/page.tsx
- app/layout.tsx
- dependencies
- tiket/[id]/route.ts
- SkmDashboard.tsx
- scripts
- DAGA Platform
- isi-wilayah-akun.ts
- AdminPengaduan.tsx
- berita-list-client.tsx
- ppid/[...slug]/page.tsx
- etl-permohonan.ts
- pelayanan-list.ts
- etl-demografi.ts
- static-content-registry.ts
- syarat-ketentuan-view.tsx
- tolak-permohonan.ts
- utils.ts
- etl-master.ts
- baru/page.tsx
- ppid-layanan-halaman.tsx
- hero-section.tsx
- sitemap.xml/route.ts
- package.json
- import/route.ts
- stats/route.ts
- image-upload-field.tsx
- eslint.config.mjs
- etl-chat.ts
- seed-berita.ts
- react-day-picker
- media/upload/route.ts
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
- admin/demografi/route.ts
- kunjungan/route.ts
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
- profil-terhubung.tsx
- buatWorkbookStatistik
- react-dropzone
- statistik/export/route.ts
- berita/[slug]/page.tsx
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
- `DashboardTiketPage()` --calls--> `getSession()`  [EXTRACTED]
  app/dashboard/tiket/page.tsx → lib/auth.ts
- `DemografiKategoriPage()` --calls--> `kategoriTampil()`  [EXTRACTED]
  app/media/demografi/[slug]/page.tsx → lib/demografi-registri.ts
- `ProfilPage()` --calls--> `getSession()`  [EXTRACTED]
  app/profil/page.tsx → lib/auth.ts
- `TiketPage()` --calls--> `getSession()`  [EXTRACTED]
  app/tiket/page.tsx → lib/auth.ts
- `PilihLayananPage()` --calls--> `getSession()`  [EXTRACTED]
  app/user/pengajuan/baru/page.tsx → lib/auth.ts

## Import Cycles
- None detected.

## Communities (159 total, 53 thin omitted)

### Community 0 - "KIAModal.tsx"
Cohesion: 0.05
Nodes (83): DashboardTiketPage(), dynamic, AktaKelahiranNikAdaModal(), AktaKelahiranNikAdaModalProps, FormData, UploadedFile, AktaKelahiranNikTidakAdaModal(), AktaKematianModal() (+75 more)

### Community 1 - "[action]/route.ts"
Cohesion: 0.13
Nodes (24): PATCH(), STATUS_VALID, dynamic, POST(), GET(), POST(), ALLOWED_EXT, FETCH_ACTIONS (+16 more)

### Community 2 - "statistik-export.ts"
Cohesion: 0.13
Nodes (24): BAGIAN_STATISTIK, barisBernomor(), BULAN_PENDEK, dataAkun(), dataAspirasi(), dataHarian(), dataKonten(), dataLayanan() (+16 more)

### Community 3 - "layanan-forms.ts"
Cohesion: 0.11
Nodes (19): catatanSection, f(), FieldDef, FieldType, kelahiranDokumen, kelahiranSections(), OPT_AGAMA, OPT_GOLDAR (+11 more)

### Community 4 - "profile-tabs.tsx"
Cohesion: 0.13
Nodes (17): BulletItem(), CONTENT, easeCustom, fadeUp(), GAMBAR_OVERRIDE_TABS, GambarPanel(), MaklumatPanel(), MottoPanel() (+9 more)

### Community 5 - "riwayat/[id]/page.tsx"
Cohesion: 0.07
Nodes (43): PermohonanDetail(), dynamic, RiwayatDetailPage(), STATUS_CONFIG, AlasanDitolak(), UraianTolak, BerkasGallery(), BerkasView (+35 more)

### Community 6 - "CekStatusClient.tsx"
Cohesion: 0.19
Nodes (10): CekStatusClient(), Hasil, IKON, metadata, KEY_BY_LABEL, KOLOM_TOLAK, KolomTolak, LABEL_BY_KEY (+2 more)

### Community 7 - "berita/[id]/route.ts"
Cohesion: 0.28
Nodes (10): DELETE(), PUT(), requireAdmin(), uniqueSlug(), GET(), POST(), requireAdmin(), uniqueSlug() (+2 more)

### Community 8 - "input.tsx"
Cohesion: 0.11
Nodes (26): Foto, KATEGORI, ProfilInitial, AktaKelahiranNikTidakAdaModalProps, FormData, UploadedFile, AktaNikahModal(), AktaNikahModalProps (+18 more)

### Community 9 - "LoginContent.tsx"
Cohesion: 0.22
Nodes (13): ForgotPasswordPage(), ResetPasswordPage(), MenuItem, menuItems, MenuPopuler(), Card(), CardContent(), CardDescription() (+5 more)

### Community 10 - "staff-pengajuan-form.tsx"
Cohesion: 0.09
Nodes (34): AKSI_STYLE, fmtWaktu(), LogAktivitasClient(), LogItem, Petugas, AdminPermohonan(), ALASAN_TOLAK, FINAL_STATUS (+26 more)

### Community 11 - "permohonan/[id]/route.ts"
Cohesion: 0.13
Nodes (24): dynamic, GET(), PUT(), VALID, GET(), PATCH(), STATUS_VALID, GET() (+16 more)

### Community 12 - "dashboard/page.tsx"
Cohesion: 0.15
Nodes (17): BULAN_PENDEK, DashboardPage(), dynamic, fmt(), pct(), ProgressRow(), STATUS_PENGADUAN, dasar (+9 more)

### Community 13 - "informasi-index.tsx"
Cohesion: 0.13
Nodes (18): dynamic, metadata, dynamic, metadata, PpidInformasiIndex(), PpidTambahKartu(), PpidSubnav(), HalamanIndeksKartu() (+10 more)

### Community 14 - "cn"
Cohesion: 0.08
Nodes (31): EMPTY, FormState, News, NotFound(), Toggle(), FieldEditor(), IconColumnInput(), ImageColumnInput() (+23 more)

### Community 15 - "statistik-kartu-editor.tsx"
Cohesion: 0.15
Nodes (23): Conflict, DemografiEditor(), digits(), EditGrid(), EditRow, nid(), ParsedRow, petaKartuLain() (+15 more)

### Community 16 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 17 - "AdminDemografi.tsx"
Cohesion: 0.15
Nodes (18): HitunganPeriode, KategoriAdmin, DemografiKategoriPage(), dynamic, DemografiView(), fmt(), KOLOM_LABEL, labelKolom() (+10 more)

### Community 18 - "register/route.ts"
Cohesion: 0.10
Nodes (39): POST(), POST(), dynamic, POST(), runtime, terakhirKirim, dynamic, POST() (+31 more)

### Community 19 - "authSlice.ts"
Cohesion: 0.16
Nodes (14): SessionHydrator(), InlineEditProvider(), isPublicPage(), authSlice, AuthState, checkNikKk, initialState, User (+6 more)

### Community 20 - "periode-demografi.ts"
Cohesion: 0.18
Nodes (21): AdminDemografi(), downloadFile(), usulJudul(), BadgePeriode(), PemilihPeriode(), gabungPeriode(), kunciPeriode(), labelPeriode() (+13 more)

### Community 21 - "produk/[...slug]/page.tsx"
Cohesion: 0.16
Nodes (13): HubungiKamiPage(), dynamic, ProdukPage(), metadata, sections, WbsPage(), EditableInfoPage(), dokumenJenisForPath() (+5 more)

### Community 22 - "ok"
Cohesion: 0.07
Nodes (63): dynamic, GET(), DELETE(), dynamic, GET(), POST(), PUT(), DELETE() (+55 more)

### Community 23 - "1. SELESAI & TERVERIFIKASI — wajib di-port ke SAIBATIN"
Cohesion: 0.14
Nodes (13): 0. Peta dua project — BACA DULU, 1.1 Sisa branding Pesisir Barat di SIDAKO, 1.2 Carousel landing page — kurang besar & kepotong, 1.3 Permohonan Online pindah ke dashboard, tanpa modal, 1.4 Input tanggal tidak bisa diketik, 1.5 Upload — batas ukuran, OOM, dan path traversal, 1.6 Animasi transisi, 1.7 Sub-menu navbar yang bisa dibuat admin (+5 more)

### Community 24 - "AdminUsers.tsx"
Cohesion: 0.14
Nodes (8): AdminUser, DetailUser, EMPTY_FORM, GRUP_AKUN, GrupKey, Kecamatan, PermohonanRingkas, STATUS_PERMOHONAN

### Community 25 - "stats.tsx"
Cohesion: 0.09
Nodes (20): DemografiMetric(), fmt(), Row, OFFICE_LAT, OFFICE_LNG, pulseIcon, base, FALLBACK (+12 more)

### Community 26 - "ktp/route.ts"
Cohesion: 0.14
Nodes (19): dynamic, getWorker(), isValidNik(), KtpParsed, loadSharp(), maxDuration, normalizeDigits(), parseKtpText() (+11 more)

### Community 27 - "dokumen-registry.ts"
Cohesion: 0.33
Nodes (5): AdminProduk(), DOKUMEN_KATEGORI, DOKUMEN_KEYS, DokumenKategori, getDokumenKategori()

### Community 28 - "Yang Harus Dibuat"
Cohesion: 0.18
Nodes (10): 1. Komponen `AccessibilityWidget` (client component), 2. Daftar Kontrol Aksesibilitas (minimal set berikut), 3. Persistensi & anti-flicker, 4. Aksesibilitas dari widget itu sendiri (jangan ironis), 5. Integrasi & batasan, Deliverable, Konteks Teknis (WAJIB diikuti, sudah diverifikasi di codebase), Kualitas & Verifikasi (lakukan sebelum selesai) (+2 more)

### Community 29 - "PengajuanBaruClient.tsx"
Cohesion: 0.14
Nodes (16): ICONS, JamLayananEditor(), PengaturanPelayanan(), Sheet(), SheetContent(), SheetDescription(), SheetFooter(), SheetHeader() (+8 more)

### Community 30 - "dialog.tsx"
Cohesion: 0.18
Nodes (11): AdminMedia(), fmtSize(), ImageCropperDialog(), ImageCropperDialogProps, MediaPickerProps, MediaItem, MediaUpload(), MediaUploadProps (+3 more)

### Community 31 - "struktur-editor.tsx"
Cohesion: 0.20
Nodes (16): EditorBox(), nextId(), parse(), Row, serialize(), StrukturEditor(), OrgBox(), adalahPuncak() (+8 more)

### Community 32 - "info-page.tsx"
Cohesion: 0.17
Nodes (11): AdminUsers(), metadata, dynamic, metadata, ProfilKependudukanView(), tahunDari(), InfoBerkas, InfoPage() (+3 more)

### Community 33 - "navbar.tsx"
Cohesion: 0.12
Nodes (25): EditorNavigasi(), KOSONG, cariMenu(), dynamic, generateMetadata(), HalamanTambahanPage(), DropdownItem(), DropdownMenu() (+17 more)

### Community 34 - "jam-layanan.ts"
Cohesion: 0.16
Nodes (21): dynamic, GET(), formatTanggalId(), hariIniZona(), PanelJamTutup(), StatusJamLayanan, URUTAN_HARI, cekJamLayanan() (+13 more)

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
Cohesion: 0.13
Nodes (12): HalamanTambahanClient(), metadata, metadata, SurveiKepuasanContent(), ProdukDisdukcapilView(), ProdukItem, KebijakanPrivasiView(), SurveyKepuasanForm() (+4 more)

### Community 39 - "app/page.tsx"
Cohesion: 0.14
Nodes (12): smoothEase, AlurLayanan(), ease, STEPS, ProfileTabs(), News, QuickHighlights(), tglID() (+4 more)

### Community 40 - "akun-status.ts"
Cohesion: 0.27
Nodes (9): dynamic, POST(), fmtTanggal(), IsiDetail(), INFO_STATUS, infoStatus, STATUS_AKUN, StatusAkun (+1 more)

### Community 41 - "inline-edit.tsx"
Cohesion: 0.11
Nodes (23): BlockEditorDialog(), Ctx, EditableBlock(), InlineEditCtx, useInlineEdit(), clampKolom(), fmtTanggal(), GaleriItem (+15 more)

### Community 42 - "akun-level.ts"
Cohesion: 0.09
Nodes (34): DELETE(), dynamic, GET(), PUT(), POST(), GET(), NAMA_LEVEL, PATCH() (+26 more)

### Community 43 - "accessibility-widget.tsx"
Cohesion: 0.23
Nodes (13): AccessibilityWidget(), SPACING_LABEL, TileButton(), A11Y_STORAGE_KEY, A11yPrefs, applyPrefs(), DEFAULT_PREFS, FONT_DEFAULT_IDX (+5 more)

### Community 44 - "uji-visibilitas.ts"
Cohesion: 0.22
Nodes (8): Props, LAYANAN_FORMS, LayananForm, LAYANAN_KODE, SLUG_DARI_KODE, dariRute, nyata, slugForm

### Community 45 - "demografi-registri.ts"
Cohesion: 0.14
Nodes (21): dynamic, GET(), runtime, dynamic, GET(), runtime, dynamic, GET() (+13 more)

### Community 46 - "parse/route.ts"
Cohesion: 0.18
Nodes (15): Conflict, dynamic, maxDuration, periodeDariForm(), POST(), runtime, sig(), Variant (+7 more)

### Community 47 - "useAppSelector"
Cohesion: 0.26
Nodes (12): getAudioCtx(), NotificationBell(), Notifikasi, playDing(), TIPE_ICON, unlockAudio(), waktuRelatif(), useAppSelector (+4 more)

### Community 48 - "admin/skm/route.ts"
Cohesion: 0.23
Nodes (11): GET(), POST(), hitungIkm(), nilaiPerUnsur(), SKM_ASPEK, SKM_KENDALA_LAYANAN, SKM_LAYANAN, SKM_PENDIDIKAN (+3 more)

### Community 49 - "getSession"
Cohesion: 0.05
Nodes (48): GET(), GET(), POST(), GET(), GET(), PATCH(), POST(), dynamic (+40 more)

### Community 50 - "AdminKonten.tsx"
Cohesion: 0.40
Nodes (5): AdminKonten(), flatten(), Leaf, MenuEntry, PPID_INFORMASI_GRUP

### Community 51 - "footer.tsx"
Cohesion: 0.10
Nodes (14): GaleriClient(), GalleryItem, metadata, INFO, metadata, metadata, dynamic, metadata (+6 more)

### Community 52 - "peta-demografi.tsx"
Cohesion: 0.16
Nodes (14): metadata, fmt(), PetaDemografi, PetaDemografiLoader(), Marker, PetaDemografi(), Row, GEO_BY_NAMA (+6 more)

### Community 53 - "devDependencies"
Cohesion: 0.13
Nodes (15): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, tailwindcss, tw-animate-css, @types/bcryptjs (+7 more)

### Community 54 - "LoginPage"
Cohesion: 0.40
Nodes (3): LoginPage(), metadata, loginUser

### Community 55 - "Journal — TIDORE / DAGA (`tidore-platform`)"
Cohesion: 0.10
Nodes (20): 10. `wilayah:isi-akun` — SELESAI 3 Sep 2026, 1. Identitas project, 2. Dua aplikasi, satu VPS, satu domain, 3. 🔴 Lima hal berbahaya kalau lupa, 4. Keadaan repo per 8 Agu 2026 — **43 berkas menggantung**, 5. Sudah live & terverifikasi (7 Agu dini hari) — jangan dikerjakan ulang, 5b. Menu "Profil Kependudukan" — SELESAI di kode, BELUM di-deploy (14 Agu), 6. Antrean (+12 more)

### Community 56 - "RegisterContent.tsx"
Cohesion: 0.19
Nodes (6): metadata, Kecamatan, namaWilayah, RegisterPage(), useAppDispatch(), registerUser

### Community 57 - "profil/page.tsx"
Cohesion: 0.21
Nodes (9): ChangePasswordForm(), FotoProfilCard(), dynamic, metadata, ProfilPage(), ProfilForm(), CameraCapture(), CameraCaptureProps (+1 more)

### Community 58 - "app/layout.tsx"
Cohesion: 0.18
Nodes (9): cormorant, geistMono, geistSans, metadata, montserrat, SKEMA_ORGANISASI, Providers(), KunjunganPing() (+1 more)

### Community 59 - "dependencies"
Cohesion: 0.18
Nodes (11): animejs, highcharts, highcharts-react-official, dependencies, animejs, highcharts, highcharts-react-official, @reduxjs/toolkit (+3 more)

### Community 60 - "tiket/[id]/route.ts"
Cohesion: 0.27
Nodes (12): dynamic, findTiketFor(), GET(), PATCH(), POST(), Session, dynamic, GET() (+4 more)

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
Cohesion: 0.28
Nodes (8): LEVEL_OPERATOR, main(), normal(), prisma, Siap, sufiks(), TIMPA, TULIS

### Community 65 - "AdminPengaduan.tsx"
Cohesion: 0.28
Nodes (6): AdminPengaduan(), FILTERS, Item, pisahBukti(), GambarItem, ImageViewer()

### Community 66 - "berita-list-client.tsx"
Cohesion: 0.31
Nodes (5): ArticleCard(), BeritaListClient(), News, tglID(), metadata

### Community 67 - "ppid/[...slug]/page.tsx"
Cohesion: 0.17
Nodes (12): bacaKonfigTab(), dynamic, LAYANAN_PPID_SLUGS, PpidPage(), PROFIL_TERHUBUNG, TENTANG_PPID_SLUGS, PpidCampur(), TAB (+4 more)

### Community 68 - "etl-permohonan.ts"
Cohesion: 0.28
Nodes (8): findKey(), JENIS_TANPA_DATA_LAMA, main(), mapStatus(), prisma, SOURCE, TABEL_JENIS, USER_LEVELS

### Community 69 - "pelayanan-list.ts"
Cohesion: 0.17
Nodes (13): PengajuanBaruClient(), KATEGORI_SLUG, kategoriSlug(), WARNA_KATEGORI, WARNA_MATI, WARNA_NETRAL, WarnaKategori, PELAYANAN_KATEGORI (+5 more)

### Community 70 - "etl-demografi.ts"
Cohesion: 0.19
Nodes (13): SEMESTER_BAWAAN, TAHUN_BAWAAN, GROUP_SLUG, levelOf(), main(), num(), parentOf(), prisma (+5 more)

### Community 71 - "static-content-registry.ts"
Cohesion: 0.22
Nodes (12): GET(), blokGaleriPpid(), blokHalamanTambahan(), blokInfoHalaman(), DKB_PERIODE_KUNCI, getStaticBlock(), getStaticDefaults(), INFO_SECTIONS (+4 more)

### Community 72 - "syarat-ketentuan-view.tsx"
Cohesion: 0.19
Nodes (9): metadata, BAGIAN, Data, SyaratKetentuanView(), SyaratLayananTabs(), KasusLayanan, LayananSyarat, SYARAT_KATEGORI (+1 more)

### Community 73 - "tolak-permohonan.ts"
Cohesion: 0.20
Nodes (11): formDariKode(), ALASAN, GrupRincian, labelSah(), pilihanRincian(), UraianTolak, WAJIB_RINCIAN, form (+3 more)

### Community 74 - "utils.ts"
Cohesion: 0.10
Nodes (30): URUTAN_HARI, PilihRincian(), FormData, JenisBiodataOption, KKPerubahanBiodataModalProps, UploadedFile, norm(), SearchSelect() (+22 more)

### Community 75 - "etl-master.ts"
Cohesion: 0.43
Nodes (6): asPath(), dt(), main(), prisma, slugify(), SOURCE

### Community 76 - "baru/page.tsx"
Cohesion: 0.40
Nodes (4): dynamic, metadata, PilihLayananPage(), PilihLayananClient()

### Community 77 - "ppid-layanan-halaman.tsx"
Cohesion: 0.19
Nodes (8): dynamic, metadata, dynamic, metadata, PpidLayananHalaman(), PpidSeksi, InfoPageContent, LAYANAN_PPID_TABS

### Community 78 - "hero-section.tsx"
Cohesion: 0.17
Nodes (10): CarouselSlide, DEFAULT_SLIDES, ElegantCarousel(), ElegantCarouselProps, TODO: ganti `image` dengan foto asli DAGA/Disdukcapil Tidore Kepulauan —, TEXT_VARIANTS, ease, HeroSection() (+2 more)

### Community 79 - "sitemap.xml/route.ts"
Cohesion: 0.40
Nodes (5): amanXml(), dynamic, Entri, GET(), RUTE_TETAP

### Community 80 - "package.json"
Cohesion: 0.33
Nodes (5): name, prisma, seed, private, version

### Community 81 - "import/route.ts"
Cohesion: 0.24
Nodes (9): dynamic, maxDuration, periodeDariForm(), POST(), runtime, BerkasAsing, StatsData, Periode (+1 more)

### Community 82 - "stats/route.ts"
Cohesion: 0.44
Nodes (7): dynamic, GET(), BULAN_PENDEK, GET(), periodeTersedia(), pilihPeriode(), periodeDariQuery()

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

### Community 88 - "media/upload/route.ts"
Cohesion: 0.38
Nodes (8): POST(), MEDIA_ALLOWED_IMAGE, MEDIA_ALLOWED_OTHER, MEDIA_MAX_SIZE, MEDIA_STORAGE_ROOT, MEDIA_URL_PREFIX, mediaPublicUrl(), mediaSubdir()

### Community 89 - "etl-berkas.ts"
Cohesion: 0.67
Nodes (3): main(), mimeOf(), prisma

### Community 90 - "gen-lookup.ts"
Cohesion: 0.67
Nodes (3): GROUPS, main(), norm()

### Community 105 - "admin/demografi/route.ts"
Cohesion: 0.42
Nodes (8): cekPetugas(), DELETE(), dynamic, GET(), periodeDariBadan(), PUT(), SaveRow, slugDikenal()

### Community 106 - "kunjungan/route.ts"
Cohesion: 0.36
Nodes (7): dynamic, GET(), POST(), runtime, ONLINE_WINDOW_MS, statsKunjungan(), tanggalHariIni()

### Community 122 - "profil-terhubung.tsx"
Cohesion: 0.11
Nodes (17): StatCard(), FormKartu(), simpan(), keSlug(), PpidAksiKartu(), hapus(), simpanDaftar(), IKON_JENIS (+9 more)

### Community 123 - "buatWorkbookStatistik"
Cohesion: 0.42
Nodes (9): buatWorkbookStatistik(), detailAkun(), detailAspirasi(), detailKonten(), detailPermohonan(), detailUntuk(), fmtWaktu(), muatLogo() (+1 more)

### Community 125 - "statistik/export/route.ts"
Cohesion: 0.38
Nodes (6): dynamic, GET(), runtime, BagianStatistik, bagianValid(), workbookStatistikResponse()

### Community 126 - "berita/[slug]/page.tsx"
Cohesion: 0.38
Nodes (4): BeritaDetailClient(), News, generateMetadata(), ringkasTeks()

### Community 143 - "pagination.tsx"
Cohesion: 0.67
Nodes (3): deretHalaman(), OPSI_PER_HALAMAN, Pagination()

## Knowledge Gaps
- **641 isolated node(s):** `SUBMIT_ACTIONS`, `FETCH_ACTIONS`, `ALLOWED_EXT`, `runtime`, `dynamic` (+636 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 756 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **53 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `getSession()` connect `getSession` to `KIAModal.tsx`, `[action]/route.ts`, `riwayat/[id]/page.tsx`, `berita/[id]/route.ts`, `permohonan/[id]/route.ts`, `dashboard/page.tsx`, `informasi-index.tsx`, `ok`, `ktp/route.ts`, `PilihLayananClient.tsx`, `akun-level.ts`, `demografi-registri.ts`, `parse/route.ts`, `admin/skm/route.ts`, `footer.tsx`, `profil/page.tsx`, `tiket/[id]/route.ts`, `baru/page.tsx`, `import/route.ts`, `media/upload/route.ts`, `admin/demografi/route.ts`, `statistik/export/route.ts`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `KIAModal.tsx`, `profile-tabs.tsx`, `input.tsx`, `LoginContent.tsx`, `staff-pengajuan-form.tsx`, `informasi-index.tsx`, `statistik-kartu-editor.tsx`, `pagination.tsx`, `AdminDemografi.tsx`, `periode-demografi.ts`, `stats.tsx`, `PengajuanBaruClient.tsx`, `dialog.tsx`, `struktur-editor.tsx`, `info-page.tsx`, `navbar.tsx`, `jam-layanan.ts`, `dashboard-sidebar.tsx`, `PilihLayananClient.tsx`, `useStaticContent`, `app/page.tsx`, `inline-edit.tsx`, `accessibility-widget.tsx`, `useAppSelector`, `AdminKonten.tsx`, `AdminPengaduan.tsx`, `pelayanan-list.ts`, `utils.ts`, `baru/page.tsx`, `ppid-layanan-halaman.tsx`, `image-upload-field.tsx`, `profil-terhubung.tsx`?**
  _High betweenness centrality (0.105) - this node is a cross-community bridge._
- **Why does `prisma` connect `ok` to `[action]/route.ts`, `statistik-export.ts`, `riwayat/[id]/page.tsx`, `berita/[id]/route.ts`, `permohonan/[id]/route.ts`, `dashboard/page.tsx`, `informasi-index.tsx`, `register/route.ts`, `produk/[...slug]/page.tsx`, `info-page.tsx`, `navbar.tsx`, `jam-layanan.ts`, `akun-status.ts`, `akun-level.ts`, `demografi-registri.ts`, `parse/route.ts`, `admin/skm/route.ts`, `getSession`, `profil/page.tsx`, `tiket/[id]/route.ts`, `ppid/[...slug]/page.tsx`, `pelayanan-list.ts`, `static-content-registry.ts`, `ppid-layanan-halaman.tsx`, `sitemap.xml/route.ts`, `import/route.ts`, `stats/route.ts`, `media/upload/route.ts`, `admin/demografi/route.ts`, `kunjungan/route.ts`, `berita/[slug]/page.tsx`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **What connects `SUBMIT_ACTIONS`, `FETCH_ACTIONS`, `ALLOWED_EXT` to the rest of the system?**
  _641 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `KIAModal.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05349324195697697 - nodes in this community are weakly interconnected._
- **Should `[action]/route.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.12903225806451613 - nodes in this community are weakly interconnected._
- **Should `statistik-export.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._