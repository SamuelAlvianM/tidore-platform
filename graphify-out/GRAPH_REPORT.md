# Graph Report - tidore-platform  (2026-09-04)

## Corpus Check
- 362 files · ~253,072 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1947 nodes · 5474 edges · 153 communities (89 shown, 56 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `98dc55fa`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- KKPerubahanBiodataModal.tsx
- ok
- statistik-export.ts
- users/route.ts
- struktur-editor.tsx
- PermohonanDetail.tsx
- cn
- auth.ts
- dialog.tsx
- KIAModal.tsx
- label.tsx
- layanan-forms.ts
- inline-edit.tsx
- informasi-index.tsx
- getSession
- statistik-kartu-editor.tsx
- compilerOptions
- api/permohonan/route.ts
- send/route.ts
- input.tsx
- galeri-profil.tsx
- static-content-registry.ts
- pelayanan-list.ts
- 1. SELESAI & TERVERIFIKASI — wajib di-port ke SAIBATIN
- ppid-layanan-halaman.tsx
- stats.tsx
- ktp/route.ts
- back-button.tsx
- Yang Harus Dibuat
- PengajuanBaruClient.tsx
- halaman/[slug]/page.tsx
- dashboard/page.tsx
- profile-tabs.tsx
- permohonan/[id]/page.tsx
- jam-layanan.ts
- components.json
- dashboard-sidebar.tsx
- carousel.tsx
- ppid/[...slug]/page.tsx
- relasi-terkait.tsx
- foto/route.ts
- media/demografi/page.tsx
- media/upload/route.ts
- accessibility-widget.tsx
- AdminUsers.tsx
- parse/route.ts
- admin/skm/route.ts
- [layanan]/page.tsx
- hooks.ts
- akun-level.ts
- syarat-ketentuan-view.tsx
- info-page.tsx
- peta-demografi.tsx
- devDependencies
- berita/[id]/route.ts
- Journal — TIDORE / DAGA (`tidore-platform`)
- bolehDashboard
- app/page.tsx
- navbar.tsx
- dependencies
- app/layout.tsx
- skm/page.tsx
- scripts
- DAGA Platform
- react-advanced-cropper
- AdminPengaduan.tsx
- berita-list-client.tsx
- react-organizational-chart
- etl-permohonan.ts
- uji-visibilitas.ts
- notification-bell.tsx
- etl-demografi.ts
- footer.tsx
- [action]/route.ts
- utils.ts
- etl-master.ts
- dashboard/kritik-saran/page.tsx
- prisma.ts
- gis/page.tsx
- sitemap.xml/route.ts
- package.json
- sharp
- PilihLayananClient.tsx
- statistik/export/route.ts
- eslint.config.mjs
- etl-chat.ts
- seed-berita.ts
- berita/[slug]/page.tsx
- pengajuan-baru/page.tsx
- etl-berkas.ts
- gen-lookup.ts
- seed.ts
- buat-akun.ts
- class-variance-authority
- clsx
- date-fns
- dashboard/berita/page.tsx
- exceljs
- framer-motion
- highcharts
- highcharts-react-official
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
- navigasi/page.tsx
- react-day-picker
- react-dropzone
- react-google-recaptcha-v3
- react-redux
- sonner
- tailwind-merge
- tesseract.js
- @tiptap/extension-image
- @tiptap/extension-link
- @tiptap/extension-text-align
- @tiptap/extension-underline
- @tiptap/extensions
- @tiptap/pm
- @tiptap/react
- @tiptap/starter-kit
- @types/leaflet
- tailwindcss
- @tailwindcss/postcss
- @types/node
- @types/react-dom
- typescript
- postcss.config.mjs
- prisma
- puppeteer-core
- @tailwindcss/typography
- tsx
- tw-animate-css
- CLAUDE.md

## God Nodes (most connected - your core abstractions)
1. `cn()` - 205 edges
2. `ok()` - 150 edges
3. `getSession()` - 149 edges
4. `fail()` - 140 edges
5. `prisma` - 76 edges
6. `Button()` - 68 edges
7. `Input()` - 54 edges
8. `catatAktivitas()` - 47 edges
9. `Label()` - 40 edges
10. `notifyError()` - 35 edges

## Surprising Connections (you probably didn't know these)
- `AlertTitle()` --calls--> `cn()`  [EXTRACTED]
  components/ui/alert.tsx → lib/utils.ts
- `ToolbarButton()` --calls--> `cn()`  [EXTRACTED]
  components/shared/rich-editor.tsx → lib/utils.ts
- `DashboardDemografiPage()` --calls--> `getSession()`  [EXTRACTED]
  app/dashboard/demografi/page.tsx → lib/auth.ts
- `EditModeToggle()` --calls--> `cn()`  [EXTRACTED]
  components/konten/inline-edit.tsx → lib/utils.ts
- `DashboardBeritaPage()` --calls--> `getSession()`  [EXTRACTED]
  app/dashboard/berita/page.tsx → lib/auth.ts

## Import Cycles
- None detected.

## Communities (153 total, 56 thin omitted)

### Community 0 - "KKPerubahanBiodataModal.tsx"
Cohesion: 0.07
Nodes (64): ProfilInitial, AktaKelahiranNikAdaModalProps, FormData, UploadedFile, AktaPerceraianModalProps, FormData, UploadedFile, d() (+56 more)

### Community 1 - "ok"
Cohesion: 0.08
Nodes (28): dynamic, POST(), POST(), POST(), GET(), GET(), GET(), dynamic (+20 more)

### Community 2 - "statistik-export.ts"
Cohesion: 0.13
Nodes (33): BAGIAN_STATISTIK, barisBernomor(), buatWorkbookStatistik(), BULAN_PENDEK, dataAkun(), dataAspirasi(), dataHarian(), dataKonten() (+25 more)

### Community 3 - "users/route.ts"
Cohesion: 0.10
Nodes (42): PATCH(), STATUS_VALID, GET(), PATCH(), STATUS_VALID, GET(), NAMA_LEVEL, PATCH() (+34 more)

### Community 4 - "struktur-editor.tsx"
Cohesion: 0.10
Nodes (24): EditorBox(), nextId(), parse(), Row, serialize(), StrukturEditor(), StrukturChart, OrgBox() (+16 more)

### Community 5 - "PermohonanDetail.tsx"
Cohesion: 0.06
Nodes (52): Detail, FINAL, PermohonanDetail(), STATUS, dynamic, RiwayatDetailPage(), STATUS_CONFIG, PilihRincian() (+44 more)

### Community 6 - "cn"
Cohesion: 0.10
Nodes (39): AktaKelahiranNikAdaModal(), AktaKelahiranNikTidakAdaModal(), AktaKematianModal(), AktaNikahModal(), AktaPerceraianModal(), KedatanganPendudukModal(), KIAModal(), KKCetakUlangModal() (+31 more)

### Community 7 - "auth.ts"
Cohesion: 0.10
Nodes (27): dynamic, maxDuration, POST(), runtime, cekPetugas(), DELETE(), dynamic, GET() (+19 more)

### Community 8 - "dialog.tsx"
Cohesion: 0.09
Nodes (36): AdminDemografi(), downloadFile(), AdminMedia(), fmtSize(), DemografiKategoriPage(), DemografiMetric(), fmt(), Row (+28 more)

### Community 9 - "KIAModal.tsx"
Cohesion: 0.10
Nodes (29): AKSI_STYLE, fmtWaktu(), LogAktivitasClient(), LogItem, Petugas, KOSONG, ALASAN_TOLAK, FINAL_STATUS (+21 more)

### Community 10 - "label.tsx"
Cohesion: 0.09
Nodes (20): EMPTY, FormState, News, Foto, KATEGORI, FieldEditor(), IconColumnInput(), ImageColumnInput() (+12 more)

### Community 11 - "layanan-forms.ts"
Cohesion: 0.10
Nodes (22): validatePayload(), StaffPengajuanForm(), catatanSection, f(), FieldDef, FieldType, kelahiranDokumen, kelahiranSections() (+14 more)

### Community 12 - "inline-edit.tsx"
Cohesion: 0.08
Nodes (31): metadata, metadata, SurveiKepuasanContent(), BlockEditorDialog(), Ctx, EditableBlock(), EditModeToggle(), InlineEditCtx (+23 more)

### Community 13 - "informasi-index.tsx"
Cohesion: 0.12
Nodes (20): dynamic, metadata, dynamic, metadata, PpidInformasiIndex(), PpidTambahKartu(), PpidSubnav(), HalamanIndeksKartu() (+12 more)

### Community 14 - "getSession"
Cohesion: 0.10
Nodes (35): dynamic, GET(), PUT(), dynamic, GET(), GET(), GET(), PATCH() (+27 more)

### Community 15 - "statistik-kartu-editor.tsx"
Cohesion: 0.11
Nodes (31): BULAN_PENDEK, GET(), Conflict, DemografiEditor(), digits(), EditGrid(), EditRow, nid() (+23 more)

### Community 16 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 17 - "api/permohonan/route.ts"
Cohesion: 0.14
Nodes (18): dynamic, POST(), POST(), POST(), GET(), POST(), GET(), POST() (+10 more)

### Community 18 - "send/route.ts"
Cohesion: 0.16
Nodes (22): dynamic, POST(), runtime, terakhirKirim, dynamic, POST(), runtime, fonnteAktif() (+14 more)

### Community 19 - "input.tsx"
Cohesion: 0.11
Nodes (23): ForgotPasswordPage(), LoginPage(), metadata, metadata, Kecamatan, namaWilayah, RegisterPage(), ResetPasswordPage() (+15 more)

### Community 20 - "galeri-profil.tsx"
Cohesion: 0.18
Nodes (12): clampKolom(), fmtTanggal(), GaleriItem, GaleriProfilPpid(), idBaru(), KOLOM_PILIHAN, Lebar, LinkItem (+4 more)

### Community 21 - "static-content-registry.ts"
Cohesion: 0.15
Nodes (17): GET(), metadata, sections, hubungiKamiContent, ppidContent, produkContent, blokGaleriPpid(), blokHalamanTambahan() (+9 more)

### Community 22 - "pelayanan-list.ts"
Cohesion: 0.21
Nodes (9): PengaturanPelayanan(), KATEGORI_SLUG, WARNA_KATEGORI, WARNA_MATI, WARNA_NETRAL, WarnaKategori, PELAYANAN_KATEGORI, PELAYANAN_LIST (+1 more)

### Community 23 - "1. SELESAI & TERVERIFIKASI — wajib di-port ke SAIBATIN"
Cohesion: 0.14
Nodes (13): 0. Peta dua project — BACA DULU, 1.1 Sisa branding Pesisir Barat di SIDAKO, 1.2 Carousel landing page — kurang besar & kepotong, 1.3 Permohonan Online pindah ke dashboard, tanpa modal, 1.4 Input tanggal tidak bisa diketik, 1.5 Upload — batas ukuran, OOM, dan path traversal, 1.6 Animasi transisi, 1.7 Sub-menu navbar yang bisa dibuat admin (+5 more)

### Community 24 - "ppid-layanan-halaman.tsx"
Cohesion: 0.14
Nodes (12): HubungiKamiPage(), dynamic, metadata, dynamic, metadata, WbsPage(), PpidLayananHalaman(), PpidSeksi (+4 more)

### Community 25 - "stats.tsx"
Cohesion: 0.09
Nodes (16): OFFICE_LAT, OFFICE_LNG, pulseIcon, base, FALLBACK, KartuDemografi, MapCard(), OfficeMap (+8 more)

### Community 26 - "ktp/route.ts"
Cohesion: 0.14
Nodes (19): dynamic, getWorker(), isValidNik(), KtpParsed, loadSharp(), maxDuration, normalizeDigits(), parseKtpText() (+11 more)

### Community 27 - "back-button.tsx"
Cohesion: 0.11
Nodes (16): DashboardDemografiPage(), dynamic, AdminGaleri(), DashboardGaleriPage(), dynamic, DashboardKontenPage(), dynamic, DashboardLogPage() (+8 more)

### Community 28 - "Yang Harus Dibuat"
Cohesion: 0.18
Nodes (10): 1. Komponen `AccessibilityWidget` (client component), 2. Daftar Kontrol Aksesibilitas (minimal set berikut), 3. Persistensi & anti-flicker, 4. Aksesibilitas dari widget itu sendiri (jangan ironis), 5. Integrasi & batasan, Deliverable, Konteks Teknis (WAJIB diikuti, sudah diverifikasi di codebase), Kualitas & Verifikasi (lakukan sebelum selesai) (+2 more)

### Community 29 - "PengajuanBaruClient.tsx"
Cohesion: 0.16
Nodes (14): ICONS, Sheet(), SheetContent(), SheetDescription(), SheetFooter(), SheetHeader(), SheetOverlay(), SheetTitle() (+6 more)

### Community 30 - "halaman/[slug]/page.tsx"
Cohesion: 0.12
Nodes (21): AdminKonten(), flatten(), Leaf, MenuEntry, EditorNavigasi(), HalamanTambahanClient(), cariMenu(), dynamic (+13 more)

### Community 31 - "dashboard/page.tsx"
Cohesion: 0.15
Nodes (17): BULAN_PENDEK, DashboardPage(), dynamic, fmt(), pct(), ProgressRow(), STATUS_PENGADUAN, dasar (+9 more)

### Community 32 - "profile-tabs.tsx"
Cohesion: 0.14
Nodes (15): BulletItem(), CONTENT, easeCustom, fadeUp(), GAMBAR_OVERRIDE_TABS, GambarPanel(), MottoPanel(), NumberedItem() (+7 more)

### Community 33 - "permohonan/[id]/page.tsx"
Cohesion: 0.32
Nodes (9): GET(), DetailPermohonanPage(), dynamic, bolehSemuaWilayah(), isOpd(), isOperatorWilayah(), isPengajuInstansi(), bolehLihatPermohonan() (+1 more)

### Community 34 - "jam-layanan.ts"
Cohesion: 0.13
Nodes (24): dynamic, GET(), JamLayananEditor(), Toggle(), URUTAN_HARI, formatTanggalId(), hariIniZona(), PanelJamTutup() (+16 more)

### Community 35 - "components.json"
Cohesion: 0.10
Nodes (19): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+11 more)

### Community 36 - "dashboard-sidebar.tsx"
Cohesion: 0.17
Nodes (19): ADMIN_ONLY_GROUPS, ADMIN_ONLY_HREFS, DesktopSidebar(), GROUPS, groupsForLevel(), GRUP_OPD, KOLOM_BILAH, LabelSidebar() (+11 more)

### Community 37 - "carousel.tsx"
Cohesion: 0.25
Nodes (6): CarouselSlide, DEFAULT_SLIDES, ElegantCarousel(), ElegantCarouselProps, TODO: ganti `image` dengan foto asli DAGA/Disdukcapil Tidore Kepulauan —, TEXT_VARIANTS

### Community 38 - "ppid/[...slug]/page.tsx"
Cohesion: 0.15
Nodes (16): AdminProduk(), bacaKonfigTab(), dynamic, LAYANAN_PPID_SLUGS, PpidPage(), PROFIL_TERHUBUNG, TENTANG_PPID_SLUGS, dynamic (+8 more)

### Community 39 - "relasi-terkait.tsx"
Cohesion: 0.38
Nodes (4): RelasiTerkait(), SectionHeading(), Relasi, relasiTerkait

### Community 40 - "foto/route.ts"
Cohesion: 0.22
Nodes (13): DELETE(), DELETE(), dynamic, PUT(), adalahDataUrlGambar(), DIR_KTP, DIR_SELFIE, FOLDER_KTP (+5 more)

### Community 42 - "media/upload/route.ts"
Cohesion: 0.30
Nodes (9): DELETE(), POST(), MEDIA_ALLOWED_IMAGE, MEDIA_ALLOWED_OTHER, MEDIA_MAX_SIZE, MEDIA_STORAGE_ROOT, MEDIA_URL_PREFIX, mediaPublicUrl() (+1 more)

### Community 43 - "accessibility-widget.tsx"
Cohesion: 0.23
Nodes (13): AccessibilityWidget(), SPACING_LABEL, TileButton(), A11Y_STORAGE_KEY, A11yPrefs, applyPrefs(), DEFAULT_PREFS, FONT_DEFAULT_IDX (+5 more)

### Community 44 - "AdminUsers.tsx"
Cohesion: 0.06
Nodes (38): CekStatusClient(), Hasil, IKON, metadata, AdminUser, AdminUsers(), DetailUser, EMPTY_FORM (+30 more)

### Community 45 - "parse/route.ts"
Cohesion: 0.11
Nodes (24): dynamic, GET(), runtime, Conflict, dynamic, maxDuration, POST(), runtime (+16 more)

### Community 46 - "admin/skm/route.ts"
Cohesion: 0.23
Nodes (11): GET(), POST(), hitungIkm(), nilaiPerUnsur(), SKM_ASPEK, SKM_KENDALA_LAYANAN, SKM_LAYANAN, SKM_PENDIDIKAN (+3 more)

### Community 47 - "[layanan]/page.tsx"
Cohesion: 0.26
Nodes (9): FormPageClient(), AjukanPermohonanPage(), dynamic, generateMetadata(), getLayananForm(), getLayanan(), LAYANAN_PERMOHONAN, LayananPermohonan (+1 more)

### Community 48 - "hooks.ts"
Cohesion: 0.15
Nodes (17): Providers(), SessionHydrator(), useAuth(), useGuestOnly(), useRequireAuth(), useUser(), authSlice, AuthState (+9 more)

### Community 49 - "akun-level.ts"
Cohesion: 0.17
Nodes (11): isStaf(), LEVEL_ADMIN, LEVEL_OPD, LEVEL_OPERATOR, LEVEL_STAFF, LEVEL_WARGA, NAMA_PERAN, DataAkun (+3 more)

### Community 50 - "syarat-ketentuan-view.tsx"
Cohesion: 0.19
Nodes (9): metadata, BAGIAN, Data, SyaratKetentuanView(), SyaratLayananTabs(), KasusLayanan, LayananSyarat, SYARAT_KATEGORI (+1 more)

### Community 51 - "info-page.tsx"
Cohesion: 0.16
Nodes (8): metadata, dynamic, metadata, PpidCampur(), TAB, Tampil, InfoBerkas, InfoPage()

### Community 52 - "peta-demografi.tsx"
Cohesion: 0.24
Nodes (11): fmt(), Marker, PetaDemografi(), Row, GEO_BY_NAMA, geoForWilayah(), KECAMATAN_GEO, KecamatanGeo (+3 more)

### Community 53 - "devDependencies"
Cohesion: 0.15
Nodes (13): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, @types/bcryptjs, @types/nodemailer, @types/pdfkit (+5 more)

### Community 54 - "berita/[id]/route.ts"
Cohesion: 0.32
Nodes (9): DELETE(), PUT(), requireAdmin(), uniqueSlug(), GET(), POST(), requireAdmin(), uniqueSlug() (+1 more)

### Community 55 - "Journal — TIDORE / DAGA (`tidore-platform`)"
Cohesion: 0.10
Nodes (19): 1. Identitas project, 2. Dua aplikasi, satu VPS, satu domain, 3. 🔴 Lima hal berbahaya kalau lupa, 4. Keadaan repo per 8 Agu 2026 — **43 berkas menggantung**, 5. Sudah live & terverifikasi (7 Agu dini hari) — jangan dikerjakan ulang, 5b. Menu "Profil Kependudukan" — SELESAI di kode, BELUM di-deploy (14 Agu), 6. Antrean, 7. Jebakan (+11 more)

### Community 56 - "bolehDashboard"
Cohesion: 0.21
Nodes (9): DashboardLayout(), dynamic, AdminPermohonan(), DashboardPermohonanPage(), dynamic, dynamic, UserPengajuanPage(), DashboardSidebar() (+1 more)

### Community 57 - "app/page.tsx"
Cohesion: 0.21
Nodes (8): smoothEase, AlurLayanan(), ease, STEPS, ProfileTabs(), News, QuickHighlights(), tglID()

### Community 58 - "navbar.tsx"
Cohesion: 0.24
Nodes (10): DropdownItem(), DropdownMenu(), isExternalHref(), KELAS_ITEM_MENU, MobileItemIcon(), MobileMenuItem(), Navbar(), navigationIcons (+2 more)

### Community 59 - "dependencies"
Cohesion: 0.18
Nodes (11): animejs, bcryptjs, dependencies, animejs, bcryptjs, react-dom, react-leaflet, @reduxjs/toolkit (+3 more)

### Community 60 - "app/layout.tsx"
Cohesion: 0.20
Nodes (8): cormorant, geistMono, geistSans, metadata, montserrat, SKEMA_ORGANISASI, KunjunganPing(), A11Y_INIT_SCRIPT

### Community 61 - "skm/page.tsx"
Cohesion: 0.24
Nodes (8): DashboardSkmPage(), dynamic, AspekRata, Data, MasukanLayanan, mutu(), Responden, SkmDashboard()

### Community 62 - "scripts"
Cohesion: 0.14
Nodes (14): scripts, akun:uji, build, db:generate, db:migrate, db:push, db:seed, db:studio (+6 more)

### Community 63 - "DAGA Platform"
Cohesion: 0.29
Nodes (6): Akun demo (setelah seed), DAGA Platform, Deploy ke cPanel (ringkas), Menjalankan (lokal), Status migrasi, Struktur

### Community 65 - "AdminPengaduan.tsx"
Cohesion: 0.28
Nodes (6): AdminPengaduan(), FILTERS, Item, pisahBukti(), DashboardPengaduanPage(), dynamic

### Community 66 - "berita-list-client.tsx"
Cohesion: 0.31
Nodes (5): ArticleCard(), BeritaListClient(), News, tglID(), metadata

### Community 68 - "etl-permohonan.ts"
Cohesion: 0.28
Nodes (8): findKey(), JENIS_TANPA_DATA_LAMA, main(), mapStatus(), prisma, SOURCE, TABEL_JENIS, USER_LEVELS

### Community 69 - "uji-visibilitas.ts"
Cohesion: 0.22
Nodes (8): Props, LAYANAN_FORMS, LayananForm, LAYANAN_KODE, SLUG_DARI_KODE, dariRute, nyata, slugForm

### Community 70 - "notification-bell.tsx"
Cohesion: 0.43
Nodes (7): getAudioCtx(), NotificationBell(), Notifikasi, playDing(), TIPE_ICON, unlockAudio(), waktuRelatif()

### Community 71 - "etl-demografi.ts"
Cohesion: 0.36
Nodes (7): GROUP_SLUG, levelOf(), main(), num(), parentOf(), prisma, SOURCE

### Community 72 - "footer.tsx"
Cohesion: 0.12
Nodes (13): GaleriClient(), GalleryItem, metadata, INFO, metadata, dynamic, metadata, TiketPage() (+5 more)

### Community 73 - "[action]/route.ts"
Cohesion: 0.13
Nodes (20): dynamic, GET(), PUT(), VALID, dynamic, GET(), PUT(), dynamic (+12 more)

### Community 74 - "utils.ts"
Cohesion: 0.08
Nodes (37): NotFound(), Values, AktaKelahiranNikTidakAdaModalProps, FormData, UploadedFile, AktaKematianModalProps, FormData, UploadedFile (+29 more)

### Community 75 - "etl-master.ts"
Cohesion: 0.43
Nodes (6): asPath(), dt(), main(), prisma, slugify(), SOURCE

### Community 76 - "dashboard/kritik-saran/page.tsx"
Cohesion: 0.40
Nodes (4): AdminKritikSaran(), Item, DashboardKritikSaranPage(), dynamic

### Community 77 - "prisma.ts"
Cohesion: 0.29
Nodes (8): dynamic, GET(), POST(), runtime, ONLINE_WINDOW_MS, statsKunjungan(), tanggalHariIni(), globalForPrisma

### Community 78 - "gis/page.tsx"
Cohesion: 0.40
Nodes (3): metadata, PetaDemografi, PetaDemografiLoader()

### Community 79 - "sitemap.xml/route.ts"
Cohesion: 0.40
Nodes (5): amanXml(), dynamic, Entri, GET(), RUTE_TETAP

### Community 80 - "package.json"
Cohesion: 0.33
Nodes (5): name, prisma, seed, private, version

### Community 82 - "PilihLayananClient.tsx"
Cohesion: 0.32
Nodes (6): dynamic, metadata, PilihLayananPage(), PilihLayananClient(), slugTersembunyi(), KATEGORI_LAYANAN

### Community 83 - "statistik/export/route.ts"
Cohesion: 0.38
Nodes (6): dynamic, GET(), runtime, BagianStatistik, bagianValid(), workbookStatistikResponse()

### Community 84 - "eslint.config.mjs"
Cohesion: 0.40
Nodes (4): compat, __dirname, eslintConfig, __filename

### Community 85 - "etl-chat.ts"
Cohesion: 0.50
Nodes (4): dt(), main(), prisma, SOURCE

### Community 86 - "seed-berita.ts"
Cohesion: 0.50
Nodes (4): BERITA, main(), prisma, slugify()

### Community 87 - "berita/[slug]/page.tsx"
Cohesion: 0.38
Nodes (4): BeritaDetailClient(), News, generateMetadata(), ringkasTeks()

### Community 88 - "pengajuan-baru/page.tsx"
Cohesion: 0.40
Nodes (4): DashboardPengajuanBaruPage(), dynamic, PengajuanBaruClient(), kategoriSlug()

### Community 89 - "etl-berkas.ts"
Cohesion: 0.67
Nodes (3): main(), mimeOf(), prisma

### Community 90 - "gen-lookup.ts"
Cohesion: 0.67
Nodes (3): GROUPS, main(), norm()

### Community 102 - "dashboard/berita/page.tsx"
Cohesion: 0.50
Nodes (3): AdminBerita(), DashboardBeritaPage(), dynamic

### Community 122 - "navigasi/page.tsx"
Cohesion: 0.50
Nodes (3): DashboardNavigasiPage(), dynamic, metadata

## Knowledge Gaps
- **625 isolated node(s):** `1. Identitas project`, `2. Dua aplikasi, satu VPS, satu domain`, `3. 🔴 Lima hal berbahaya kalau lupa`, `4. Keadaan repo per 8 Agu 2026 — **43 berkas menggantung**`, `5. Sudah live & terverifikasi (7 Agu dini hari) — jangan dikerjakan ulang` (+620 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 737 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **56 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `KKPerubahanBiodataModal.tsx`, `struktur-editor.tsx`, `PermohonanDetail.tsx`, `dialog.tsx`, `KIAModal.tsx`, `label.tsx`, `layanan-forms.ts`, `inline-edit.tsx`, `informasi-index.tsx`, `statistik-kartu-editor.tsx`, `input.tsx`, `pelayanan-list.ts`, `ppid-layanan-halaman.tsx`, `stats.tsx`, `PengajuanBaruClient.tsx`, `halaman/[slug]/page.tsx`, `profile-tabs.tsx`, `jam-layanan.ts`, `dashboard-sidebar.tsx`, `accessibility-widget.tsx`, `AdminUsers.tsx`, `app/page.tsx`, `navbar.tsx`, `notification-bell.tsx`, `utils.ts`, `PilihLayananClient.tsx`, `pengajuan-baru/page.tsx`?**
  _High betweenness centrality (0.128) - this node is a cross-community bridge._
- **Why does `getSession()` connect `getSession` to `ok`, `users/route.ts`, `PermohonanDetail.tsx`, `auth.ts`, `informasi-index.tsx`, `api/permohonan/route.ts`, `ktp/route.ts`, `back-button.tsx`, `dashboard/page.tsx`, `permohonan/[id]/page.tsx`, `foto/route.ts`, `media/upload/route.ts`, `AdminUsers.tsx`, `parse/route.ts`, `admin/skm/route.ts`, `[layanan]/page.tsx`, `berita/[id]/route.ts`, `bolehDashboard`, `skm/page.tsx`, `AdminPengaduan.tsx`, `footer.tsx`, `[action]/route.ts`, `dashboard/kritik-saran/page.tsx`, `PilihLayananClient.tsx`, `statistik/export/route.ts`, `pengajuan-baru/page.tsx`, `dashboard/berita/page.tsx`, `navigasi/page.tsx`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Why does `prisma` connect `getSession` to `ok`, `statistik-export.ts`, `users/route.ts`, `PermohonanDetail.tsx`, `auth.ts`, `informasi-index.tsx`, `statistik-kartu-editor.tsx`, `api/permohonan/route.ts`, `static-content-registry.ts`, `ppid-layanan-halaman.tsx`, `halaman/[slug]/page.tsx`, `dashboard/page.tsx`, `permohonan/[id]/page.tsx`, `jam-layanan.ts`, `ppid/[...slug]/page.tsx`, `foto/route.ts`, `media/upload/route.ts`, `AdminUsers.tsx`, `parse/route.ts`, `admin/skm/route.ts`, `info-page.tsx`, `berita/[id]/route.ts`, `[action]/route.ts`, `prisma.ts`, `sitemap.xml/route.ts`, `berita/[slug]/page.tsx`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **What connects `1. Identitas project`, `2. Dua aplikasi, satu VPS, satu domain`, `3. 🔴 Lima hal berbahaya kalau lupa` to the rest of the system?**
  _625 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `KKPerubahanBiodataModal.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07140902872777018 - nodes in this community are weakly interconnected._
- **Should `ok` be split into smaller, more focused modules?**
  _Cohesion score 0.080338266384778 - nodes in this community are weakly interconnected._
- **Should `statistik-export.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1265597147950089 - nodes in this community are weakly interconnected._