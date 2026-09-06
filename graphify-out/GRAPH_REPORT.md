# Graph Report - tidore-platform  (2026-09-06)

## Corpus Check
- 367 files · ~265,016 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2002 nodes · 5709 edges · 155 communities (93 shown, 53 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4eb2f3c4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- KKPerubahanBiodataModal.tsx
- [action]/route.ts
- statistik-export.ts
- layanan-forms.ts
- struktur-editor.tsx
- riwayat/[id]/page.tsx
- CekStatusClient.tsx
- catatAktivitas
- input.tsx
- RegisterContent.tsx
- AktaKematianModal.tsx
- button.tsx
- useStaticContent
- informasi-index.tsx
- cn
- statistik-kartu-editor.tsx
- compilerOptions
- demografi-kategori.ts
- permohonan/[id]/route.ts
- authSlice.ts
- AdminDemografi.tsx
- ppid/[...slug]/page.tsx
- ok
- 1. SELESAI & TERVERIFIKASI — wajib di-port ke SAIBATIN
- AdminUsers.tsx
- stats.tsx
- ktp/route.ts
- back-button.tsx
- Yang Harus Dibuat
- PengajuanBaruClient.tsx
- inline-edit.tsx
- galeri-profil.tsx
- static-content-registry.ts
- halaman/[slug]/page.tsx
- jam-layanan.ts
- components.json
- dashboard-sidebar.tsx
- PilihLayananClient.tsx
- syarat-ketentuan-view.tsx
- app/page.tsx
- akun-status.ts
- profil-terhubung.tsx
- akun-level.ts
- accessibility-widget.tsx
- uji-visibilitas.ts
- admin/demografi/route.ts
- etl-demografi.ts
- navbar.tsx
- useAppSelector
- getSession
- AdminKonten.tsx
- footer.tsx
- peta-demografi.tsx
- devDependencies
- media/upload/route.ts
- Journal — TIDORE / DAGA (`tidore-platform`)
- riwayat-list.tsx
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
- berita/[slug]/page.tsx
- etl-permohonan.ts
- pelayanan-list.ts
- AdminMedia.tsx
- KIAModal.tsx
- gis/page.tsx
- produk/page.tsx
- utils.ts
- etl-master.ts
- baru/page.tsx
- navigasi/page.tsx
- users/route.ts
- sitemap.xml/route.ts
- package.json
- parse/route.ts
- prisma
- image-upload-field.tsx
- eslint.config.mjs
- etl-chat.ts
- seed-berita.ts
- react-day-picker
- notification-bell.tsx
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
- kelola-kartu.tsx
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
2. `ok()` - 150 edges
3. `getSession()` - 149 edges
4. `fail()` - 140 edges
5. `prisma` - 77 edges
6. `Button()` - 68 edges
7. `Input()` - 54 edges
8. `catatAktivitas()` - 47 edges
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

## Communities (155 total, 53 thin omitted)

### Community 0 - "KKPerubahanBiodataModal.tsx"
Cohesion: 0.07
Nodes (64): ProfilInitial, AktaKelahiranNikTidakAdaModalProps, FormData, UploadedFile, AktaNikahModalProps, FormData, UploadedFile, AktaPerceraianModalProps (+56 more)

### Community 1 - "[action]/route.ts"
Cohesion: 0.09
Nodes (35): PATCH(), STATUS_VALID, GET(), dynamic, POST(), GET(), POST(), ALLOWED_EXT (+27 more)

### Community 2 - "statistik-export.ts"
Cohesion: 0.06
Nodes (58): dynamic, GET(), POST(), runtime, BULAN_PENDEK, DashboardPage(), dynamic, fmt() (+50 more)

### Community 3 - "layanan-forms.ts"
Cohesion: 0.09
Nodes (22): StaffPengajuanForm(), useStatusJamLayanan(), useImageViewer(), catatanSection, f(), FieldDef, FieldType, kelahiranDokumen (+14 more)

### Community 4 - "struktur-editor.tsx"
Cohesion: 0.08
Nodes (35): EditorBox(), nextId(), parse(), Row, serialize(), StrukturEditor(), BulletItem(), CONTENT (+27 more)

### Community 5 - "riwayat/[id]/page.tsx"
Cohesion: 0.08
Nodes (37): PermohonanDetail(), dynamic, RiwayatDetailPage(), STATUS_CONFIG, AlasanDitolak(), BerkasGallery(), BerkasView, fmtTanggal() (+29 more)

### Community 6 - "CekStatusClient.tsx"
Cohesion: 0.19
Nodes (10): CekStatusClient(), Hasil, IKON, metadata, KEY_BY_LABEL, KOLOM_TOLAK, KolomTolak, LABEL_BY_KEY (+2 more)

### Community 7 - "catatAktivitas"
Cohesion: 0.12
Nodes (24): DELETE(), PUT(), requireAdmin(), uniqueSlug(), GET(), POST(), requireAdmin(), uniqueSlug() (+16 more)

### Community 8 - "input.tsx"
Cohesion: 0.12
Nodes (17): EMPTY, FormState, News, Foto, KATEGORI, FieldEditor(), IconColumnInput(), ImageColumnInput() (+9 more)

### Community 9 - "RegisterContent.tsx"
Cohesion: 0.16
Nodes (14): Kecamatan, namaWilayah, ResetPasswordPage(), MenuItem, menuItems, MenuPopuler(), Card(), CardAction() (+6 more)

### Community 10 - "AktaKematianModal.tsx"
Cohesion: 0.09
Nodes (31): AKSI_STYLE, fmtWaktu(), LogAktivitasClient(), LogItem, Petugas, KOSONG, ALASAN_TOLAK, FINAL_STATUS (+23 more)

### Community 11 - "button.tsx"
Cohesion: 0.12
Nodes (22): NotFound(), JamLayananEditor(), Toggle(), URUTAN_HARI, Values, AktaKelahiranNikAdaModalProps, FormData, UploadedFile (+14 more)

### Community 12 - "useStaticContent"
Cohesion: 0.11
Nodes (17): metadata, metadata, SurveiKepuasanContent(), EditableBlock(), useInlineEdit(), ProfileTabs(), StatsGrid(), MODE (+9 more)

### Community 13 - "informasi-index.tsx"
Cohesion: 0.12
Nodes (19): dynamic, metadata, dynamic, metadata, PpidInformasiIndex(), PpidTambahKartu(), PpidSubnav(), HalamanIndeksKartu() (+11 more)

### Community 14 - "cn"
Cohesion: 0.12
Nodes (35): AktaKelahiranNikAdaModal(), AktaKelahiranNikTidakAdaModal(), AktaKematianModal(), AktaNikahModal(), AktaPerceraianModal(), KedatanganPendudukModal(), KIAModal(), KKCetakUlangModal() (+27 more)

### Community 15 - "statistik-kartu-editor.tsx"
Cohesion: 0.13
Nodes (27): BULAN_PENDEK, GET(), Conflict, DemografiEditor(), digits(), EditGrid(), EditRow, nid() (+19 more)

### Community 16 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 17 - "demografi-kategori.ts"
Cohesion: 0.16
Nodes (16): dynamic, GET(), runtime, dynamic, runtime, DemografiKategoriPage(), StatistikKartuEditor(), addSheet() (+8 more)

### Community 18 - "permohonan/[id]/route.ts"
Cohesion: 0.07
Nodes (54): GET(), PATCH(), STATUS_VALID, POST(), POST(), dynamic, POST(), runtime (+46 more)

### Community 19 - "authSlice.ts"
Cohesion: 0.11
Nodes (16): ForgotPasswordPage(), LoginPage(), metadata, SessionHydrator(), metadata, RegisterPage(), useAppDispatch(), authSlice (+8 more)

### Community 20 - "AdminDemografi.tsx"
Cohesion: 0.14
Nodes (31): AdminDemografi(), downloadFile(), HitunganPeriode, DemografiView(), fmt(), KOLOM_LABEL, labelKolom(), Row (+23 more)

### Community 21 - "ppid/[...slug]/page.tsx"
Cohesion: 0.08
Nodes (32): HubungiKamiPage(), dynamic, metadata, dynamic, metadata, bacaKonfigTab(), dynamic, LAYANAN_PPID_SLUGS (+24 more)

### Community 22 - "ok"
Cohesion: 0.09
Nodes (38): dynamic, GET(), PUT(), dynamic, GET(), GET(), DELETE(), PUT() (+30 more)

### Community 23 - "1. SELESAI & TERVERIFIKASI — wajib di-port ke SAIBATIN"
Cohesion: 0.14
Nodes (13): 0. Peta dua project — BACA DULU, 1.1 Sisa branding Pesisir Barat di SIDAKO, 1.2 Carousel landing page — kurang besar & kepotong, 1.3 Permohonan Online pindah ke dashboard, tanpa modal, 1.4 Input tanggal tidak bisa diketik, 1.5 Upload — batas ukuran, OOM, dan path traversal, 1.6 Animasi transisi, 1.7 Sub-menu navbar yang bisa dibuat admin (+5 more)

### Community 24 - "AdminUsers.tsx"
Cohesion: 0.13
Nodes (10): AdminUser, AdminUsers(), DetailUser, EMPTY_FORM, GRUP_AKUN, GrupKey, Kecamatan, PermohonanRingkas (+2 more)

### Community 25 - "stats.tsx"
Cohesion: 0.09
Nodes (15): OFFICE_LAT, OFFICE_LNG, pulseIcon, base, FALLBACK, KartuDemografi, MapCard(), OfficeMap (+7 more)

### Community 26 - "ktp/route.ts"
Cohesion: 0.14
Nodes (19): dynamic, getWorker(), isValidNik(), KtpParsed, loadSharp(), maxDuration, normalizeDigits(), parseKtpText() (+11 more)

### Community 27 - "back-button.tsx"
Cohesion: 0.12
Nodes (14): AdminBerita(), DashboardBeritaPage(), dynamic, DashboardDemografiPage(), dynamic, AdminGaleri(), DashboardGaleriPage(), dynamic (+6 more)

### Community 28 - "Yang Harus Dibuat"
Cohesion: 0.18
Nodes (10): 1. Komponen `AccessibilityWidget` (client component), 2. Daftar Kontrol Aksesibilitas (minimal set berikut), 3. Persistensi & anti-flicker, 4. Aksesibilitas dari widget itu sendiri (jangan ironis), 5. Integrasi & batasan, Deliverable, Konteks Teknis (WAJIB diikuti, sudah diverifikasi di codebase), Kualitas & Verifikasi (lakukan sebelum selesai) (+2 more)

### Community 29 - "PengajuanBaruClient.tsx"
Cohesion: 0.18
Nodes (13): ICONS, Sheet(), SheetContent(), SheetDescription(), SheetFooter(), SheetHeader(), SheetOverlay(), SheetTitle() (+5 more)

### Community 30 - "inline-edit.tsx"
Cohesion: 0.15
Nodes (19): Ctx, EditModeToggle(), InlineEditCtx, DemografiMetric(), fmt(), Row, ImageCropperDialog(), ImageCropperDialogProps (+11 more)

### Community 31 - "galeri-profil.tsx"
Cohesion: 0.13
Nodes (15): clampKolom(), fmtTanggal(), GaleriItem, GaleriProfilPpid(), idBaru(), KOLOM_PILIHAN, Lebar, LinkItem (+7 more)

### Community 32 - "static-content-registry.ts"
Cohesion: 0.16
Nodes (15): GET(), BlockEditorDialog(), blokGaleriPpid(), blokHalamanTambahan(), blokInfoHalaman(), DKB_PERIODE_KUNCI, getStaticBlock(), getStaticDefaults() (+7 more)

### Community 33 - "halaman/[slug]/page.tsx"
Cohesion: 0.22
Nodes (12): EditorNavigasi(), HalamanTambahanClient(), cariMenu(), dynamic, generateMetadata(), HalamanTambahanPage(), buatSlug(), hrefTambahan() (+4 more)

### Community 34 - "jam-layanan.ts"
Cohesion: 0.16
Nodes (20): dynamic, GET(), formatTanggalId(), hariIniZona(), PanelJamTutup(), StatusJamLayanan, URUTAN_HARI, cekJamLayanan() (+12 more)

### Community 35 - "components.json"
Cohesion: 0.10
Nodes (19): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+11 more)

### Community 36 - "dashboard-sidebar.tsx"
Cohesion: 0.18
Nodes (16): ADMIN_ONLY_GROUPS, ADMIN_ONLY_HREFS, DesktopSidebar(), GROUPS, groupsForLevel(), GRUP_OPD, KOLOM_BILAH, LabelSidebar() (+8 more)

### Community 37 - "PilihLayananClient.tsx"
Cohesion: 0.24
Nodes (10): FormPageClient(), AjukanPermohonanPage(), dynamic, generateMetadata(), getLayananForm(), getLayanan(), KATEGORI_LAYANAN, LAYANAN_PERMOHONAN (+2 more)

### Community 38 - "syarat-ketentuan-view.tsx"
Cohesion: 0.19
Nodes (9): metadata, BAGIAN, Data, SyaratKetentuanView(), SyaratLayananTabs(), KasusLayanan, LayananSyarat, SYARAT_KATEGORI (+1 more)

### Community 39 - "app/page.tsx"
Cohesion: 0.08
Nodes (21): smoothEase, AlurLayanan(), ease, STEPS, CarouselSlide, DEFAULT_SLIDES, ElegantCarousel(), ElegantCarouselProps (+13 more)

### Community 40 - "akun-status.ts"
Cohesion: 0.27
Nodes (9): dynamic, POST(), fmtTanggal(), IsiDetail(), INFO_STATUS, infoStatus, STATUS_AKUN, StatusAkun (+1 more)

### Community 41 - "profil-terhubung.tsx"
Cohesion: 0.18
Nodes (6): IKON_JENIS, KUNCI_PROFIL, LABEL_BERANDA, MaklumatPanel(), ProfilJenis, StrukturEditor

### Community 42 - "akun-level.ts"
Cohesion: 0.09
Nodes (33): dynamic, GET(), PUT(), VALID, GET(), dynamic, GET(), PUT() (+25 more)

### Community 43 - "accessibility-widget.tsx"
Cohesion: 0.23
Nodes (13): AccessibilityWidget(), SPACING_LABEL, TileButton(), A11Y_STORAGE_KEY, A11yPrefs, applyPrefs(), DEFAULT_PREFS, FONT_DEFAULT_IDX (+5 more)

### Community 44 - "uji-visibilitas.ts"
Cohesion: 0.22
Nodes (8): Props, LAYANAN_FORMS, LayananForm, LAYANAN_KODE, SLUG_DARI_KODE, dariRute, nyata, slugForm

### Community 45 - "admin/demografi/route.ts"
Cohesion: 0.18
Nodes (21): dynamic, maxDuration, periodeDariForm(), runtime, periodeDariForm(), cekPetugas(), DELETE(), dynamic (+13 more)

### Community 46 - "etl-demografi.ts"
Cohesion: 0.19
Nodes (13): SEMESTER_BAWAAN, TAHUN_BAWAAN, GROUP_SLUG, levelOf(), main(), num(), parentOf(), prisma (+5 more)

### Community 47 - "navbar.tsx"
Cohesion: 0.19
Nodes (13): AuthArea(), DropdownItem(), DropdownMenu(), isExternalHref(), KELAS_ITEM_MENU, MobileItemIcon(), MobileMenuItem(), Navbar() (+5 more)

### Community 48 - "useAppSelector"
Cohesion: 0.21
Nodes (13): Providers(), InlineEditProvider(), isPublicPage(), useAppSelector, useAuth(), useGuestOnly(), useRequireAuth(), useUser() (+5 more)

### Community 49 - "getSession"
Cohesion: 0.08
Nodes (31): dynamic, GET(), runtime, POST(), GET(), dynamic, GET(), PATCH() (+23 more)

### Community 50 - "AdminKonten.tsx"
Cohesion: 0.19
Nodes (11): AdminKonten(), flatten(), Leaf, MenuEntry, DashboardKontenPage(), dynamic, navigationItems, NavItem (+3 more)

### Community 51 - "footer.tsx"
Cohesion: 0.08
Nodes (21): GaleriClient(), GalleryItem, metadata, INFO, metadata, metadata, dynamic, metadata (+13 more)

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

### Community 56 - "riwayat-list.tsx"
Cohesion: 0.24
Nodes (7): dynamic, UraianTolak, Permohonan, RiwayatList(), STATUS_CONFIG, TABS, useInfiniteScroll()

### Community 57 - "profil/page.tsx"
Cohesion: 0.21
Nodes (9): ChangePasswordForm(), FotoProfilCard(), dynamic, metadata, ProfilPage(), ProfilForm(), CameraCapture(), CameraCaptureProps (+1 more)

### Community 58 - "app/layout.tsx"
Cohesion: 0.20
Nodes (8): cormorant, geistMono, geistSans, metadata, montserrat, SKEMA_ORGANISASI, KunjunganPing(), A11Y_INIT_SCRIPT

### Community 59 - "dependencies"
Cohesion: 0.18
Nodes (11): animejs, highcharts, highcharts-react-official, dependencies, animejs, highcharts, highcharts-react-official, @reduxjs/toolkit (+3 more)

### Community 60 - "kategori.ts"
Cohesion: 0.25
Nodes (7): PengajuanBaruClient(), KATEGORI_SLUG, kategoriSlug(), WARNA_KATEGORI, WARNA_MATI, WARNA_NETRAL, WarnaKategori

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
Cohesion: 0.21
Nodes (8): AdminPengaduan(), FILTERS, Item, pisahBukti(), DashboardPengaduanPage(), dynamic, GambarItem, ImageViewer()

### Community 66 - "berita-list-client.tsx"
Cohesion: 0.31
Nodes (5): ArticleCard(), BeritaListClient(), News, tglID(), metadata

### Community 67 - "berita/[slug]/page.tsx"
Cohesion: 0.38
Nodes (4): BeritaDetailClient(), News, generateMetadata(), ringkasTeks()

### Community 68 - "etl-permohonan.ts"
Cohesion: 0.28
Nodes (8): findKey(), JENIS_TANPA_DATA_LAMA, main(), mapStatus(), prisma, SOURCE, TABEL_JENIS, USER_LEVELS

### Community 69 - "pelayanan-list.ts"
Cohesion: 0.31
Nodes (7): PengaturanPelayanan(), PELAYANAN_KATEGORI, PELAYANAN_LIST, PELAYANAN_VISIBILITY_KEY, PelayananItem, slugTersembunyi(), layananTersembunyi()

### Community 70 - "AdminMedia.tsx"
Cohesion: 0.47
Nodes (4): AdminMedia(), fmtSize(), DashboardMediaPage(), dynamic

### Community 71 - "KIAModal.tsx"
Cohesion: 0.29
Nodes (6): EMPTY_FORM, FILE_FIELDS, FormData, KIAModalProps, NIK_FIELDS, UploadedFile

### Community 72 - "gis/page.tsx"
Cohesion: 0.40
Nodes (3): metadata, PetaDemografi, PetaDemografiLoader()

### Community 73 - "produk/page.tsx"
Cohesion: 0.40
Nodes (4): AdminProduk(), DashboardProdukPage(), dynamic, getDokumenKategori()

### Community 74 - "utils.ts"
Cohesion: 0.12
Nodes (19): norm(), SearchSelect(), SearchSelectOption, SearchSelectProps, BARIS_KOSONG, MasukanLayanan, PEKERJAAN, WARNA_TERPILIH (+11 more)

### Community 75 - "etl-master.ts"
Cohesion: 0.43
Nodes (6): asPath(), dt(), main(), prisma, slugify(), SOURCE

### Community 76 - "baru/page.tsx"
Cohesion: 0.40
Nodes (4): dynamic, metadata, PilihLayananPage(), PilihLayananClient()

### Community 77 - "navigasi/page.tsx"
Cohesion: 0.50
Nodes (3): DashboardNavigasiPage(), dynamic, metadata

### Community 78 - "users/route.ts"
Cohesion: 0.16
Nodes (19): DELETE(), GET(), NAMA_LEVEL, PATCH(), POST(), requireAdmin(), DELETE(), dynamic (+11 more)

### Community 79 - "sitemap.xml/route.ts"
Cohesion: 0.40
Nodes (5): amanXml(), dynamic, Entri, GET(), RUTE_TETAP

### Community 80 - "package.json"
Cohesion: 0.33
Nodes (5): name, prisma, seed, private, version

### Community 81 - "parse/route.ts"
Cohesion: 0.20
Nodes (13): Conflict, dynamic, maxDuration, POST(), runtime, sig(), Variant, cellNum() (+5 more)

### Community 82 - "prisma"
Cohesion: 0.26
Nodes (13): dynamic, findTiketFor(), GET(), PATCH(), POST(), Session, dynamic, GET() (+5 more)

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

### Community 88 - "notification-bell.tsx"
Cohesion: 0.43
Nodes (7): getAudioCtx(), NotificationBell(), Notifikasi, playDing(), TIPE_ICON, unlockAudio(), waktuRelatif()

### Community 89 - "etl-berkas.ts"
Cohesion: 0.67
Nodes (3): main(), mimeOf(), prisma

### Community 90 - "gen-lookup.ts"
Cohesion: 0.67
Nodes (3): GROUPS, main(), norm()

### Community 105 - "dashboard/kritik-saran/page.tsx"
Cohesion: 0.40
Nodes (4): AdminKritikSaran(), Item, DashboardKritikSaranPage(), dynamic

### Community 122 - "kelola-kartu.tsx"
Cohesion: 0.26
Nodes (10): StatCard(), FormKartu(), simpan(), keSlug(), PpidAksiKartu(), hapus(), simpanDaftar(), getIcon() (+2 more)

### Community 143 - "pagination.tsx"
Cohesion: 0.67
Nodes (3): deretHalaman(), OPSI_PER_HALAMAN, Pagination()

## Knowledge Gaps
- **637 isolated node(s):** `SUBMIT_ACTIONS`, `FETCH_ACTIONS`, `ALLOWED_EXT`, `runtime`, `dynamic` (+632 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 752 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **53 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `KKPerubahanBiodataModal.tsx`, `layanan-forms.ts`, `struktur-editor.tsx`, `input.tsx`, `RegisterContent.tsx`, `AktaKematianModal.tsx`, `button.tsx`, `useStaticContent`, `informasi-index.tsx`, `statistik-kartu-editor.tsx`, `pagination.tsx`, `demografi-kategori.ts`, `AdminDemografi.tsx`, `ppid/[...slug]/page.tsx`, `stats.tsx`, `PengajuanBaruClient.tsx`, `inline-edit.tsx`, `static-content-registry.ts`, `jam-layanan.ts`, `dashboard-sidebar.tsx`, `PilihLayananClient.tsx`, `accessibility-widget.tsx`, `navbar.tsx`, `AdminKonten.tsx`, `footer.tsx`, `kategori.ts`, `AdminPengaduan.tsx`, `pelayanan-list.ts`, `KIAModal.tsx`, `utils.ts`, `baru/page.tsx`, `image-upload-field.tsx`, `notification-bell.tsx`, `kelola-kartu.tsx`?**
  _High betweenness centrality (0.134) - this node is a cross-community bridge._
- **Why does `getSession()` connect `getSession` to `[action]/route.ts`, `statistik-export.ts`, `riwayat/[id]/page.tsx`, `catatAktivitas`, `informasi-index.tsx`, `demografi-kategori.ts`, `permohonan/[id]/route.ts`, `ok`, `ktp/route.ts`, `back-button.tsx`, `PilihLayananClient.tsx`, `akun-level.ts`, `admin/demografi/route.ts`, `AdminKonten.tsx`, `footer.tsx`, `media/upload/route.ts`, `riwayat-list.tsx`, `profil/page.tsx`, `skm/page.tsx`, `AdminPengaduan.tsx`, `AdminMedia.tsx`, `produk/page.tsx`, `baru/page.tsx`, `navigasi/page.tsx`, `users/route.ts`, `parse/route.ts`, `prisma`, `dashboard/kritik-saran/page.tsx`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **Why does `prisma` connect `prisma` to `[action]/route.ts`, `statistik-export.ts`, `riwayat/[id]/page.tsx`, `catatAktivitas`, `informasi-index.tsx`, `statistik-kartu-editor.tsx`, `demografi-kategori.ts`, `permohonan/[id]/route.ts`, `ppid/[...slug]/page.tsx`, `ok`, `static-content-registry.ts`, `halaman/[slug]/page.tsx`, `jam-layanan.ts`, `akun-status.ts`, `akun-level.ts`, `admin/demografi/route.ts`, `getSession`, `footer.tsx`, `media/upload/route.ts`, `profil/page.tsx`, `berita/[slug]/page.tsx`, `pelayanan-list.ts`, `users/route.ts`, `sitemap.xml/route.ts`, `parse/route.ts`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **What connects `SUBMIT_ACTIONS`, `FETCH_ACTIONS`, `ALLOWED_EXT` to the rest of the system?**
  _637 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `KKPerubahanBiodataModal.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07222982216142271 - nodes in this community are weakly interconnected._
- **Should `[action]/route.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08792270531400966 - nodes in this community are weakly interconnected._
- **Should `statistik-export.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05827505827505827 - nodes in this community are weakly interconnected._