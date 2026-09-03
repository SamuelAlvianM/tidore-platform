# Graph Report - tidore-platform  (2026-09-04)

## Corpus Check
- 362 files · ~252,564 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1942 nodes · 5468 edges · 148 communities (84 shown, 55 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `770d5d2a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- AktaKelahiranNikAdaModal.tsx
- ok
- statistik-export.ts
- permohonan/[id]/route.ts
- struktur-editor.tsx
- riwayat/[id]/page.tsx
- cn
- prisma
- dialog.tsx
- KTPELModal.tsx
- button.tsx
- AdminDemografi.tsx
- inline-edit.tsx
- informasi-index.tsx
- getSession
- statistik-kartu-editor.tsx
- compilerOptions
- register/route.ts
- send/route.ts
- RegisterContent.tsx
- galeri-profil.tsx
- static-content-registry.ts
- PengajuanBaruClient.tsx
- 1. SELESAI & TERVERIFIKASI — wajib di-port ke SAIBATIN
- ppid-layanan-halaman.tsx
- stats.tsx
- ktp/route.ts
- back-button.tsx
- Yang Harus Dibuat
- produk/[...slug]/page.tsx
- halaman/[slug]/page.tsx
- dashboard/page.tsx
- AdminKonten.tsx
- demografi-kategori.ts
- jam-layanan.ts
- components.json
- dashboard-sidebar.tsx
- carousel.tsx
- ppid/[...slug]/page.tsx
- relasi-terkait.tsx
- foto/route.ts
- demografi-view.tsx
- KIAModal.tsx
- accessibility-widget.tsx
- AdminUsers.tsx
- parse/route.ts
- admin/skm/route.ts
- PilihLayananClient.tsx
- hooks.ts
- akun-level.ts
- syarat-ketentuan-view.tsx
- info-page.tsx
- peta-demografi.tsx
- devDependencies
- berita/[id]/route.ts
- Journal — TIDORE / DAGA (`tidore-platform`)
- auth.ts
- quick-highlights.tsx
- navbar.tsx
- dependencies
- AktaKelahiranNikTidakAdaModal.tsx
- skm/page.tsx
- scripts
- DAGA Platform
- react-advanced-cropper
- AdminPengaduan.tsx
- berita-list-client.tsx
- react-organizational-chart
- etl-permohonan.ts
- kelola-kartu.tsx
- useAppSelector
- etl-demografi.ts
- footer.tsx
- [action]/route.ts
- utils.ts
- etl-master.ts
- dashboard/kritik-saran/page.tsx
- kunjungan/route.ts
- gis/page.tsx
- sitemap.xml/route.ts
- package.json
- sharp
- eslint.config.mjs
- etl-chat.ts
- seed-berita.ts
- etl-berkas.ts
- gen-lookup.ts
- seed.ts
- buat-akun.ts
- class-variance-authority
- clsx
- date-fns
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

## Communities (148 total, 55 thin omitted)

### Community 0 - "AktaKelahiranNikAdaModal.tsx"
Cohesion: 0.07
Nodes (63): AktaKelahiranNikAdaModalProps, FormData, UploadedFile, AktaKematianModalProps, FormData, UploadedFile, AktaNikahModalProps, FormData (+55 more)

### Community 1 - "ok"
Cohesion: 0.07
Nodes (44): cekPetugas(), DELETE(), dynamic, GET(), PUT(), SaveRow, dynamic, GET() (+36 more)

### Community 2 - "statistik-export.ts"
Cohesion: 0.10
Nodes (39): dynamic, GET(), runtime, BAGIAN_STATISTIK, BagianStatistik, bagianValid(), barisBernomor(), buatWorkbookStatistik() (+31 more)

### Community 3 - "permohonan/[id]/route.ts"
Cohesion: 0.06
Nodes (57): GET(), PATCH(), STATUS_VALID, PATCH(), POST(), Props, catatanSection, f() (+49 more)

### Community 4 - "struktur-editor.tsx"
Cohesion: 0.08
Nodes (35): EditorBox(), nextId(), parse(), Row, serialize(), StrukturEditor(), BulletItem(), CONTENT (+27 more)

### Community 5 - "riwayat/[id]/page.tsx"
Cohesion: 0.06
Nodes (48): PermohonanDetail(), dynamic, RiwayatDetailPage(), STATUS_CONFIG, StaffPengajuanForm(), useStatusJamLayanan(), AlasanDitolak(), UraianTolak (+40 more)

### Community 6 - "cn"
Cohesion: 0.10
Nodes (39): NotFound(), FieldEditor(), IconColumnInput(), ImageColumnInput(), AktaKelahiranNikAdaModal(), AktaKelahiranNikTidakAdaModal(), AktaKematianModal(), AktaNikahModal() (+31 more)

### Community 7 - "prisma"
Cohesion: 0.12
Nodes (26): DELETE(), dynamic, passwordCocok(), POST(), runtime, DELETE(), GET(), JENIS_VALID (+18 more)

### Community 8 - "dialog.tsx"
Cohesion: 0.14
Nodes (17): AdminMedia(), fmtSize(), DemografiMetric(), fmt(), Row, ImageCropperDialog(), ImageCropperDialogProps, MediaPickerProps (+9 more)

### Community 9 - "KTPELModal.tsx"
Cohesion: 0.08
Nodes (34): AKSI_STYLE, fmtWaktu(), LogAktivitasClient(), LogItem, Petugas, ALASAN_TOLAK, FINAL_STATUS, Item (+26 more)

### Community 10 - "button.tsx"
Cohesion: 0.13
Nodes (20): EMPTY, FormState, News, Foto, KATEGORI, KOSONG, ProfilInitial, Values (+12 more)

### Community 11 - "AdminDemografi.tsx"
Cohesion: 0.47
Nodes (4): AdminDemografi(), downloadFile(), DashboardDemografiPage(), dynamic

### Community 12 - "inline-edit.tsx"
Cohesion: 0.09
Nodes (27): smoothEase, metadata, Ctx, EditableBlock(), EditModeToggle(), InlineEditCtx, useInlineEdit(), AlurLayanan() (+19 more)

### Community 13 - "informasi-index.tsx"
Cohesion: 0.12
Nodes (19): dynamic, metadata, dynamic, metadata, PpidInformasiIndex(), PpidTambahKartu(), PpidSubnav(), HalamanIndeksKartu() (+11 more)

### Community 14 - "getSession"
Cohesion: 0.15
Nodes (20): GET(), dynamic, GET(), runtime, dynamic, findTiketFor(), GET(), PATCH() (+12 more)

### Community 15 - "statistik-kartu-editor.tsx"
Cohesion: 0.12
Nodes (26): BULAN_PENDEK, GET(), Conflict, DemografiEditor(), digits(), EditGrid(), EditRow, nid() (+18 more)

### Community 16 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 17 - "register/route.ts"
Cohesion: 0.11
Nodes (28): PATCH(), STATUS_VALID, dynamic, POST(), dynamic, POST(), POST(), POST() (+20 more)

### Community 18 - "send/route.ts"
Cohesion: 0.11
Nodes (25): dynamic, POST(), runtime, terakhirKirim, dynamic, POST(), runtime, INFO (+17 more)

### Community 19 - "RegisterContent.tsx"
Cohesion: 0.08
Nodes (31): ForgotPasswordPage(), LoginPage(), metadata, Providers(), SessionHydrator(), metadata, Kecamatan, namaWilayah (+23 more)

### Community 20 - "galeri-profil.tsx"
Cohesion: 0.13
Nodes (15): clampKolom(), fmtTanggal(), GaleriItem, GaleriProfilPpid(), idBaru(), KOLOM_PILIHAN, Lebar, LinkItem (+7 more)

### Community 21 - "static-content-registry.ts"
Cohesion: 0.22
Nodes (12): GET(), BlockEditorDialog(), blokGaleriPpid(), blokHalamanTambahan(), blokInfoHalaman(), getStaticBlock(), getStaticDefaults(), INFO_SECTIONS (+4 more)

### Community 22 - "PengajuanBaruClient.tsx"
Cohesion: 0.13
Nodes (19): ICONS, PengaturanPelayanan(), SheetDescription(), SheetHeader(), Tabs(), TabsContent(), TabsList(), tabsListVariants (+11 more)

### Community 23 - "1. SELESAI & TERVERIFIKASI — wajib di-port ke SAIBATIN"
Cohesion: 0.14
Nodes (13): 0. Peta dua project — BACA DULU, 1.1 Sisa branding Pesisir Barat di SIDAKO, 1.2 Carousel landing page — kurang besar & kepotong, 1.3 Permohonan Online pindah ke dashboard, tanpa modal, 1.4 Input tanggal tidak bisa diketik, 1.5 Upload — batas ukuran, OOM, dan path traversal, 1.6 Animasi transisi, 1.7 Sub-menu navbar yang bisa dibuat admin (+5 more)

### Community 24 - "ppid-layanan-halaman.tsx"
Cohesion: 0.19
Nodes (8): dynamic, metadata, dynamic, metadata, PpidLayananHalaman(), PpidSeksi, InfoPageContent, LAYANAN_PPID_TABS

### Community 25 - "stats.tsx"
Cohesion: 0.09
Nodes (16): OFFICE_LAT, OFFICE_LNG, pulseIcon, base, FALLBACK, KartuDemografi, MapCard(), OfficeMap (+8 more)

### Community 26 - "ktp/route.ts"
Cohesion: 0.14
Nodes (19): dynamic, getWorker(), isValidNik(), KtpParsed, loadSharp(), maxDuration, normalizeDigits(), parseKtpText() (+11 more)

### Community 27 - "back-button.tsx"
Cohesion: 0.10
Nodes (18): AdminBerita(), DashboardBeritaPage(), dynamic, AdminGaleri(), DashboardGaleriPage(), dynamic, DashboardLogPage(), dynamic (+10 more)

### Community 28 - "Yang Harus Dibuat"
Cohesion: 0.18
Nodes (10): 1. Komponen `AccessibilityWidget` (client component), 2. Daftar Kontrol Aksesibilitas (minimal set berikut), 3. Persistensi & anti-flicker, 4. Aksesibilitas dari widget itu sendiri (jangan ironis), 5. Integrasi & batasan, Deliverable, Konteks Teknis (WAJIB diikuti, sudah diverifikasi di codebase), Kualitas & Verifikasi (lakukan sebelum selesai) (+2 more)

### Community 29 - "produk/[...slug]/page.tsx"
Cohesion: 0.13
Nodes (16): HubungiKamiPage(), dynamic, ProdukPage(), metadata, sections, WbsPage(), EditableInfoPage(), DOKUMEN_KATEGORI (+8 more)

### Community 30 - "halaman/[slug]/page.tsx"
Cohesion: 0.16
Nodes (16): EditorNavigasi(), HalamanTambahanClient(), cariMenu(), dynamic, generateMetadata(), HalamanTambahanPage(), buatSlug(), hrefTambahan() (+8 more)

### Community 31 - "dashboard/page.tsx"
Cohesion: 0.15
Nodes (17): BULAN_PENDEK, DashboardPage(), dynamic, fmt(), pct(), ProgressRow(), STATUS_PENGADUAN, dasar (+9 more)

### Community 32 - "AdminKonten.tsx"
Cohesion: 0.28
Nodes (7): AdminKonten(), flatten(), Leaf, MenuEntry, DashboardKontenPage(), dynamic, PPID_INFORMASI_GRUP

### Community 33 - "demografi-kategori.ts"
Cohesion: 0.22
Nodes (13): dynamic, GET(), runtime, dynamic, GET(), runtime, addSheet(), buildDemografiWorkbook() (+5 more)

### Community 34 - "jam-layanan.ts"
Cohesion: 0.16
Nodes (20): dynamic, GET(), formatTanggalId(), hariIniZona(), PanelJamTutup(), StatusJamLayanan, URUTAN_HARI, cekJamLayanan() (+12 more)

### Community 35 - "components.json"
Cohesion: 0.10
Nodes (19): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+11 more)

### Community 36 - "dashboard-sidebar.tsx"
Cohesion: 0.14
Nodes (20): ADMIN_ONLY_GROUPS, ADMIN_ONLY_HREFS, DesktopSidebar(), GROUPS, groupsForLevel(), GRUP_OPD, KOLOM_BILAH, LabelSidebar() (+12 more)

### Community 37 - "carousel.tsx"
Cohesion: 0.25
Nodes (6): CarouselSlide, DEFAULT_SLIDES, ElegantCarousel(), ElegantCarouselProps, TODO: ganti `image` dengan foto asli DAGA/Disdukcapil Tidore Kepulauan —, TEXT_VARIANTS

### Community 38 - "ppid/[...slug]/page.tsx"
Cohesion: 0.13
Nodes (13): bacaKonfigTab(), dynamic, LAYANAN_PPID_SLUGS, PpidPage(), PROFIL_TERHUBUNG, TENTANG_PPID_SLUGS, IKON_JENIS, KUNCI_PROFIL (+5 more)

### Community 39 - "relasi-terkait.tsx"
Cohesion: 0.38
Nodes (4): RelasiTerkait(), SectionHeading(), Relasi, relasiTerkait

### Community 40 - "foto/route.ts"
Cohesion: 0.26
Nodes (11): DELETE(), dynamic, PUT(), adalahDataUrlGambar(), DIR_KTP, DIR_SELFIE, FOLDER_KTP, FOLDER_SELFIE (+3 more)

### Community 41 - "demografi-view.tsx"
Cohesion: 0.23
Nodes (9): metadata, DemografiKategoriPage(), DemografiView(), fmt(), KOLOM_LABEL, labelKolom(), Row, sumKolom() (+1 more)

### Community 42 - "KIAModal.tsx"
Cohesion: 0.29
Nodes (6): EMPTY_FORM, FILE_FIELDS, FormData, KIAModalProps, NIK_FIELDS, UploadedFile

### Community 43 - "accessibility-widget.tsx"
Cohesion: 0.12
Nodes (21): cormorant, geistMono, geistSans, metadata, montserrat, SKEMA_ORGANISASI, AccessibilityWidget(), SPACING_LABEL (+13 more)

### Community 44 - "AdminUsers.tsx"
Cohesion: 0.05
Nodes (37): CekStatusClient(), Hasil, IKON, metadata, AdminUser, AdminUsers(), DetailUser, EMPTY_FORM (+29 more)

### Community 45 - "parse/route.ts"
Cohesion: 0.15
Nodes (17): dynamic, maxDuration, POST(), runtime, Conflict, dynamic, maxDuration, POST() (+9 more)

### Community 46 - "admin/skm/route.ts"
Cohesion: 0.23
Nodes (11): GET(), POST(), hitungIkm(), nilaiPerUnsur(), SKM_ASPEK, SKM_KENDALA_LAYANAN, SKM_LAYANAN, SKM_PENDIDIKAN (+3 more)

### Community 47 - "PilihLayananClient.tsx"
Cohesion: 0.13
Nodes (15): AjukanPermohonanPage(), dynamic, generateMetadata(), dynamic, metadata, PilihLayananPage(), PilihLayananClient(), getLayanan() (+7 more)

### Community 48 - "hooks.ts"
Cohesion: 0.29
Nodes (9): useAuth(), useGuestOnly(), useRequireAuth(), useUser(), AppDispatch, AppStore, makeStore(), RootState (+1 more)

### Community 49 - "akun-level.ts"
Cohesion: 0.09
Nodes (32): dynamic, GET(), PUT(), VALID, DELETE(), dynamic, GET(), PUT() (+24 more)

### Community 50 - "syarat-ketentuan-view.tsx"
Cohesion: 0.19
Nodes (9): metadata, BAGIAN, Data, SyaratKetentuanView(), SyaratLayananTabs(), KasusLayanan, LayananSyarat, SYARAT_KATEGORI (+1 more)

### Community 51 - "info-page.tsx"
Cohesion: 0.18
Nodes (10): metadata, dynamic, metadata, ProfilKependudukanView(), tahunDari(), InfoBerkas, InfoPage(), TambahDokumen() (+2 more)

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
Cohesion: 0.14
Nodes (13): 1. Identitas project, 2. Dua aplikasi, satu VPS, satu domain, 3. 🔴 Lima hal berbahaya kalau lupa, 4. Keadaan repo per 8 Agu 2026 — **43 berkas menggantung**, 5. Sudah live & terverifikasi (7 Agu dini hari) — jangan dikerjakan ulang, 5b. Menu "Profil Kependudukan" — SELESAI di kode, BELUM di-deploy (14 Agu), 6. Antrean, 7. Jebakan (+5 more)

### Community 56 - "auth.ts"
Cohesion: 0.11
Nodes (22): GET(), POST(), DashboardLayout(), dynamic, DashboardPengajuanBaruPage(), dynamic, PengajuanBaruClient(), AdminPermohonan() (+14 more)

### Community 57 - "quick-highlights.tsx"
Cohesion: 0.67
Nodes (3): News, QuickHighlights(), tglID()

### Community 58 - "navbar.tsx"
Cohesion: 0.13
Nodes (17): AuthArea(), DropdownItem(), DropdownMenu(), isExternalHref(), KELAS_ITEM_MENU, MobileItemIcon(), MobileMenuItem(), Navbar() (+9 more)

### Community 59 - "dependencies"
Cohesion: 0.18
Nodes (11): animejs, bcryptjs, dependencies, animejs, bcryptjs, react-dom, react-leaflet, @reduxjs/toolkit (+3 more)

### Community 60 - "AktaKelahiranNikTidakAdaModal.tsx"
Cohesion: 0.50
Nodes (3): AktaKelahiranNikTidakAdaModalProps, FormData, UploadedFile

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

### Community 69 - "kelola-kartu.tsx"
Cohesion: 0.21
Nodes (12): StatCard(), FormKartu(), simpan(), keSlug(), PpidAksiKartu(), hapus(), simpanDaftar(), MaklumatPanel() (+4 more)

### Community 70 - "useAppSelector"
Cohesion: 0.23
Nodes (12): FormPageClient(), InlineEditProvider(), isPublicPage(), getAudioCtx(), NotificationBell(), Notifikasi, playDing(), TIPE_ICON (+4 more)

### Community 71 - "etl-demografi.ts"
Cohesion: 0.36
Nodes (7): GROUP_SLUG, levelOf(), main(), num(), parentOf(), prisma, SOURCE

### Community 72 - "footer.tsx"
Cohesion: 0.10
Nodes (16): GaleriClient(), GalleryItem, metadata, BeritaDetailClient(), News, generateMetadata(), ringkasTeks(), metadata (+8 more)

### Community 73 - "[action]/route.ts"
Cohesion: 0.29
Nodes (9): ALLOWED_EXT, FETCH_ACTIONS, POST(), SUBMIT_ACTIONS, validatePayload(), isWarga(), validateLayananPayload(), slugTersembunyi() (+1 more)

### Community 74 - "utils.ts"
Cohesion: 0.09
Nodes (30): JamLayananEditor(), Toggle(), URUTAN_HARI, FormData, JenisBiodataOption, KKPerubahanBiodataModalProps, UploadedFile, norm() (+22 more)

### Community 75 - "etl-master.ts"
Cohesion: 0.43
Nodes (6): asPath(), dt(), main(), prisma, slugify(), SOURCE

### Community 76 - "dashboard/kritik-saran/page.tsx"
Cohesion: 0.40
Nodes (4): AdminKritikSaran(), Item, DashboardKritikSaranPage(), dynamic

### Community 77 - "kunjungan/route.ts"
Cohesion: 0.36
Nodes (7): dynamic, GET(), POST(), runtime, ONLINE_WINDOW_MS, statsKunjungan(), tanggalHariIni()

### Community 78 - "gis/page.tsx"
Cohesion: 0.40
Nodes (3): metadata, PetaDemografi, PetaDemografiLoader()

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

### Community 89 - "etl-berkas.ts"
Cohesion: 0.67
Nodes (3): main(), mimeOf(), prisma

### Community 90 - "gen-lookup.ts"
Cohesion: 0.67
Nodes (3): GROUPS, main(), norm()

## Knowledge Gaps
- **620 isolated node(s):** `SUBMIT_ACTIONS`, `FETCH_ACTIONS`, `ALLOWED_EXT`, `runtime`, `dynamic` (+615 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 733 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **55 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `AktaKelahiranNikAdaModal.tsx`, `struktur-editor.tsx`, `riwayat/[id]/page.tsx`, `dialog.tsx`, `KTPELModal.tsx`, `button.tsx`, `inline-edit.tsx`, `informasi-index.tsx`, `statistik-kartu-editor.tsx`, `RegisterContent.tsx`, `static-content-registry.ts`, `PengajuanBaruClient.tsx`, `ppid-layanan-halaman.tsx`, `stats.tsx`, `AdminKonten.tsx`, `jam-layanan.ts`, `dashboard-sidebar.tsx`, `demografi-view.tsx`, `KIAModal.tsx`, `accessibility-widget.tsx`, `AdminUsers.tsx`, `PilihLayananClient.tsx`, `info-page.tsx`, `auth.ts`, `navbar.tsx`, `AktaKelahiranNikTidakAdaModal.tsx`, `kelola-kartu.tsx`, `useAppSelector`, `utils.ts`?**
  _High betweenness centrality (0.118) - this node is a cross-community bridge._
- **Why does `getSession()` connect `getSession` to `ok`, `statistik-export.ts`, `permohonan/[id]/route.ts`, `riwayat/[id]/page.tsx`, `prisma`, `AdminDemografi.tsx`, `informasi-index.tsx`, `register/route.ts`, `ktp/route.ts`, `back-button.tsx`, `dashboard/page.tsx`, `AdminKonten.tsx`, `demografi-kategori.ts`, `foto/route.ts`, `AdminUsers.tsx`, `parse/route.ts`, `admin/skm/route.ts`, `PilihLayananClient.tsx`, `akun-level.ts`, `berita/[id]/route.ts`, `auth.ts`, `skm/page.tsx`, `AdminPengaduan.tsx`, `footer.tsx`, `[action]/route.ts`, `dashboard/kritik-saran/page.tsx`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **Why does `prisma` connect `prisma` to `ok`, `statistik-export.ts`, `permohonan/[id]/route.ts`, `riwayat/[id]/page.tsx`, `informasi-index.tsx`, `getSession`, `statistik-kartu-editor.tsx`, `register/route.ts`, `static-content-registry.ts`, `ppid-layanan-halaman.tsx`, `produk/[...slug]/page.tsx`, `halaman/[slug]/page.tsx`, `dashboard/page.tsx`, `demografi-kategori.ts`, `jam-layanan.ts`, `ppid/[...slug]/page.tsx`, `foto/route.ts`, `AdminUsers.tsx`, `parse/route.ts`, `admin/skm/route.ts`, `akun-level.ts`, `info-page.tsx`, `berita/[id]/route.ts`, `auth.ts`, `footer.tsx`, `[action]/route.ts`, `kunjungan/route.ts`, `sitemap.xml/route.ts`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **What connects `SUBMIT_ACTIONS`, `FETCH_ACTIONS`, `ALLOWED_EXT` to the rest of the system?**
  _620 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `AktaKelahiranNikAdaModal.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0712962962962963 - nodes in this community are weakly interconnected._
- **Should `ok` be split into smaller, more focused modules?**
  _Cohesion score 0.07319347319347319 - nodes in this community are weakly interconnected._
- **Should `statistik-export.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10365853658536585 - nodes in this community are weakly interconnected._