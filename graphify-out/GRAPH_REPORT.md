# Graph Report - tidore-platform  (2026-09-07)

## Corpus Check
- 371 files · ~275,414 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2046 nodes · 5892 edges · 143 communities (81 shown, 53 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `82d9d1dd`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- KIAModal.tsx
- fail
- statistik-export.ts
- layanan-forms.ts
- back-button.tsx
- PermohonanDetail.tsx
- CekStatusClient.tsx
- users/route.ts
- demografi-view.tsx
- LoginContent.tsx
- PerpindahanPendudukModal.tsx
- getSession
- periode-demografi.ts
- informasi-index.tsx
- cn
- statistik-kartu-editor.tsx
- compilerOptions
- admin/demografi/kategori/route.ts
- send/route.ts
- prisma
- demografi-import.ts
- static-content-registry.ts
- ok
- 1. SELESAI & TERVERIFIKASI — wajib di-port ke SAIBATIN
- admin/skm/route.ts
- stats.tsx
- ktp/route.ts
- notification-bell.tsx
- Yang Harus Dibuat
- permohonan/[id]/page.tsx
- button.tsx
- AdminDemografi.tsx
- navigasi-tambahan.ts
- halaman/[slug]/page.tsx
- jam-layanan.ts
- components.json
- navbar.tsx
- useAppSelector
- inline-edit.tsx
- app/page.tsx
- akun-level.ts
- AktaKematianModal.tsx
- AdminPengaduan.tsx
- accessibility-widget.tsx
- isi-wilayah-akun.ts
- struktur-editor.tsx
- RegisterContent.tsx
- PengajuanBaruClient.tsx
- permohonan/[id]/route.ts
- bolehDashboard
- import/route.ts
- footer.tsx
- peta-demografi.tsx
- devDependencies
- catatAktivitas
- Journal — TIDORE / DAGA (`tidore-platform`)
- dashboard/page.tsx
- berita/[slug]/page.tsx
- app/layout.tsx
- dependencies
- skm/page.tsx
- scripts
- DAGA Platform
- hooks.ts
- gis/page.tsx
- etl-permohonan.ts
- galeri-profil.tsx
- produk/page.tsx
- isPetugas
- utils.ts
- etl-master.ts
- navigasi/page.tsx
- info-page.tsx
- sitemap.xml/route.ts
- package.json
- eslint.config.mjs
- etl-chat.ts
- seed-berita.ts
- react-day-picker
- berita/[id]/route.ts
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
- `DashboardBeritaPage()` --calls--> `getSession()`  [EXTRACTED]
  app/dashboard/berita/page.tsx → lib/auth.ts
- `DashboardDemografiPage()` --calls--> `getSession()`  [EXTRACTED]
  app/dashboard/demografi/page.tsx → lib/auth.ts
- `DashboardGaleriPage()` --calls--> `getSession()`  [EXTRACTED]
  app/dashboard/galeri/page.tsx → lib/auth.ts
- `DashboardKontenPage()` --calls--> `getSession()`  [EXTRACTED]
  app/dashboard/konten/page.tsx → lib/auth.ts
- `DashboardLogPage()` --calls--> `getSession()`  [EXTRACTED]
  app/dashboard/log/page.tsx → lib/auth.ts

## Import Cycles
- None detected.

## Communities (143 total, 53 thin omitted)

### Community 0 - "KIAModal.tsx"
Cohesion: 0.07
Nodes (70): ProfilInitial, AktaKelahiranNikAdaModalProps, FormData, UploadedFile, AktaKelahiranNikTidakAdaModalProps, FormData, UploadedFile, AktaNikahModalProps (+62 more)

### Community 1 - "fail"
Cohesion: 0.14
Nodes (26): PATCH(), STATUS_VALID, dynamic, POST(), GET(), POST(), ALLOWED_EXT, FETCH_ACTIONS (+18 more)

### Community 2 - "statistik-export.ts"
Cohesion: 0.09
Nodes (44): dynamic, GET(), runtime, buildDemografiWorkbook(), DbRow, kolomNilai(), susunBaris(), susunKolom() (+36 more)

### Community 3 - "layanan-forms.ts"
Cohesion: 0.11
Nodes (19): catatanSection, f(), FieldDef, FieldType, kelahiranDokumen, kelahiranSections(), OPT_AGAMA, OPT_GOLDAR (+11 more)

### Community 4 - "back-button.tsx"
Cohesion: 0.11
Nodes (17): AdminUsers(), AdminBerita(), DashboardBeritaPage(), dynamic, DashboardDemografiPage(), dynamic, AdminGaleri(), DashboardGaleriPage() (+9 more)

### Community 5 - "PermohonanDetail.tsx"
Cohesion: 0.06
Nodes (49): Detail, FINAL, PermohonanDetail(), STATUS, dynamic, RiwayatDetailPage(), STATUS_CONFIG, PilihRincian() (+41 more)

### Community 6 - "CekStatusClient.tsx"
Cohesion: 0.16
Nodes (14): CekStatusClient(), Hasil, IKON, metadata, fmtTanggal(), IsiDetail(), infoStatus, KEY_BY_LABEL (+6 more)

### Community 7 - "users/route.ts"
Cohesion: 0.13
Nodes (33): GET(), NAMA_LEVEL, PATCH(), POST(), requireAdmin(), POST(), POST(), DELETE() (+25 more)

### Community 8 - "demografi-view.tsx"
Cohesion: 0.12
Nodes (21): DemografiMetric(), fmt(), Row, DemografiView(), fmt(), KOLOM_LABEL, labelKolom(), Row (+13 more)

### Community 9 - "LoginContent.tsx"
Cohesion: 0.12
Nodes (25): ForgotPasswordPage(), LoginPage(), metadata, SessionHydrator(), ResetPasswordPage(), MenuItem, menuItems, MenuPopuler() (+17 more)

### Community 10 - "PerpindahanPendudukModal.tsx"
Cohesion: 0.11
Nodes (27): AKSI_STYLE, fmtWaktu(), LogAktivitasClient(), LogItem, Petugas, KOSONG, ALASAN_TOLAK, FINAL_STATUS (+19 more)

### Community 11 - "getSession"
Cohesion: 0.06
Nodes (43): dynamic, GET(), GET(), POST(), GET(), PATCH(), dynamic, GET() (+35 more)

### Community 12 - "periode-demografi.ts"
Cohesion: 0.09
Nodes (46): dynamic, GET(), runtime, periodeDariForm(), Conflict, dynamic, maxDuration, periodeDariForm() (+38 more)

### Community 13 - "informasi-index.tsx"
Cohesion: 0.09
Nodes (25): dynamic, metadata, dynamic, metadata, ProdukPage(), PpidInformasiIndex(), PpidTambahKartu(), PpidSubnav() (+17 more)

### Community 14 - "cn"
Cohesion: 0.09
Nodes (42): AktaKelahiranNikAdaModal(), AktaKelahiranNikTidakAdaModal(), AktaKematianModal(), AktaNikahModal(), AktaPerceraianModal(), KedatanganPendudukModal(), KIAModal(), KKCetakUlangModal() (+34 more)

### Community 15 - "statistik-kartu-editor.tsx"
Cohesion: 0.08
Nodes (38): Conflict, DemografiEditor(), digits(), EditGrid(), EditRow, nid(), ParsedRow, petaKartuLain() (+30 more)

### Community 16 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 17 - "admin/demografi/kategori/route.ts"
Cohesion: 0.11
Nodes (34): DELETE(), dynamic, GET(), PATCH(), POST(), PUT(), selaraskanKartuBeranda(), terkunci() (+26 more)

### Community 18 - "send/route.ts"
Cohesion: 0.16
Nodes (22): dynamic, POST(), runtime, terakhirKirim, dynamic, POST(), runtime, fonnteAktif() (+14 more)

### Community 19 - "prisma"
Cohesion: 0.20
Nodes (12): dynamic, passwordCocok(), POST(), runtime, dynamic, GET(), POST(), runtime (+4 more)

### Community 20 - "demografi-import.ts"
Cohesion: 0.39
Nodes (7): bacaLembar(), cellNum(), classifyKode(), DemografiRow, klasifikasiKode(), norm(), ParseResult

### Community 21 - "static-content-registry.ts"
Cohesion: 0.12
Nodes (20): GET(), HubungiKamiPage(), metadata, sections, WbsPage(), hubungiKamiContent, ppidContent, produkContent (+12 more)

### Community 22 - "ok"
Cohesion: 0.07
Nodes (31): dynamic, POST(), POST(), POST(), POST(), GET(), GET(), GET() (+23 more)

### Community 23 - "1. SELESAI & TERVERIFIKASI — wajib di-port ke SAIBATIN"
Cohesion: 0.14
Nodes (13): 0. Peta dua project — BACA DULU, 1.1 Sisa branding Pesisir Barat di SIDAKO, 1.2 Carousel landing page — kurang besar & kepotong, 1.3 Permohonan Online pindah ke dashboard, tanpa modal, 1.4 Input tanggal tidak bisa diketik, 1.5 Upload — batas ukuran, OOM, dan path traversal, 1.6 Animasi transisi, 1.7 Sub-menu navbar yang bisa dibuat admin (+5 more)

### Community 24 - "admin/skm/route.ts"
Cohesion: 0.23
Nodes (10): GET(), hitungIkm(), nilaiPerUnsur(), SKM_ASPEK, SKM_KENDALA_LAYANAN, SKM_LAYANAN, SKM_PENDIDIKAN, SKM_SKALA_MAX (+2 more)

### Community 25 - "stats.tsx"
Cohesion: 0.09
Nodes (15): OFFICE_LAT, OFFICE_LNG, pulseIcon, base, FALLBACK, KartuDemografi, MapCard(), OfficeMap (+7 more)

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
Cohesion: 0.09
Nodes (27): EMPTY, FormState, News, Foto, KATEGORI, AdminMedia(), fmtSize(), NotFound() (+19 more)

### Community 31 - "AdminDemografi.tsx"
Cohesion: 0.15
Nodes (26): AdminDemografi(), AntreImpor, downloadFile(), HitunganPeriode, KategoriAdmin, usulJudul(), BadgePeriode(), BadgePeriodeEdit() (+18 more)

### Community 32 - "navigasi-tambahan.ts"
Cohesion: 0.15
Nodes (16): AdminKonten(), flatten(), Leaf, MenuEntry, DashboardKontenPage(), dynamic, EditorNavigasi(), buatSlug() (+8 more)

### Community 33 - "halaman/[slug]/page.tsx"
Cohesion: 0.38
Nodes (6): cariMenu(), dynamic, generateMetadata(), HalamanTambahanPage(), KUNCI_NAVIGASI, MenuTambahan

### Community 34 - "jam-layanan.ts"
Cohesion: 0.14
Nodes (24): dynamic, GET(), JamLayananEditor(), Toggle(), URUTAN_HARI, formatTanggalId(), hariIniZona(), PanelJamTutup() (+16 more)

### Community 35 - "components.json"
Cohesion: 0.10
Nodes (19): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+11 more)

### Community 36 - "navbar.tsx"
Cohesion: 0.08
Nodes (33): ADMIN_ONLY_GROUPS, ADMIN_ONLY_HREFS, DesktopSidebar(), GROUPS, groupsForLevel(), GRUP_OPD, KOLOM_BILAH, LabelSidebar() (+25 more)

### Community 37 - "useAppSelector"
Cohesion: 0.31
Nodes (7): FormPageClient(), AjukanPermohonanPage(), dynamic, generateMetadata(), getLayananForm(), getLayanan(), useAppSelector

### Community 38 - "inline-edit.tsx"
Cohesion: 0.08
Nodes (27): HalamanTambahanClient(), metadata, metadata, SurveiKepuasanContent(), metadata, Ctx, EditableBlock(), EditModeToggle() (+19 more)

### Community 39 - "app/page.tsx"
Cohesion: 0.08
Nodes (22): smoothEase, AlurLayanan(), ease, STEPS, CarouselSlide, DEFAULT_SLIDES, ElegantCarousel(), ElegantCarouselProps (+14 more)

### Community 40 - "akun-level.ts"
Cohesion: 0.18
Nodes (11): isStaf(), LEVEL_ADMIN, LEVEL_OPD, LEVEL_OPERATOR, LEVEL_STAFF, LEVEL_WARGA, NAMA_PERAN, DataAkun (+3 more)

### Community 41 - "AktaKematianModal.tsx"
Cohesion: 0.31
Nodes (8): AktaKematianModalProps, FormData, UploadedFile, DatePicker(), DatePickerProps, keTampilan(), masker(), parseValue()

### Community 42 - "AdminPengaduan.tsx"
Cohesion: 0.28
Nodes (6): AdminPengaduan(), FILTERS, Item, pisahBukti(), DashboardPengaduanPage(), dynamic

### Community 43 - "accessibility-widget.tsx"
Cohesion: 0.23
Nodes (13): AccessibilityWidget(), SPACING_LABEL, TileButton(), A11Y_STORAGE_KEY, A11yPrefs, applyPrefs(), DEFAULT_PREFS, FONT_DEFAULT_IDX (+5 more)

### Community 44 - "isi-wilayah-akun.ts"
Cohesion: 0.32
Nodes (7): main(), normal(), prisma, Siap, sufiks(), TIMPA, TULIS

### Community 45 - "struktur-editor.tsx"
Cohesion: 0.08
Nodes (34): EditorBox(), nextId(), parse(), Row, serialize(), StrukturEditor(), BulletItem(), CONTENT (+26 more)

### Community 46 - "RegisterContent.tsx"
Cohesion: 0.14
Nodes (9): FotoProfilCard(), metadata, Kecamatan, namaWilayah, RegisterPage(), CameraCapture(), CameraCaptureProps, keDataUrl() (+1 more)

### Community 47 - "PengajuanBaruClient.tsx"
Cohesion: 0.09
Nodes (33): ICONS, PengajuanBaruClient(), PilihLayananClient(), PengaturanPelayanan(), Props, SheetDescription(), SheetHeader(), Tabs() (+25 more)

### Community 48 - "permohonan/[id]/route.ts"
Cohesion: 0.23
Nodes (15): GET(), PATCH(), STATUS_VALID, formDariKode(), ALASAN, labelSah(), perluRincian(), pilihanRincian() (+7 more)

### Community 49 - "bolehDashboard"
Cohesion: 0.17
Nodes (11): DashboardLayout(), dynamic, DashboardPengajuanBaruPage(), dynamic, AdminPermohonan(), DashboardPermohonanPage(), dynamic, dynamic (+3 more)

### Community 50 - "import/route.ts"
Cohesion: 0.33
Nodes (6): dynamic, maxDuration, POST(), runtime, POST(), parseDemografiExcel()

### Community 51 - "footer.tsx"
Cohesion: 0.08
Nodes (19): GaleriClient(), GalleryItem, metadata, INFO, metadata, ArticleCard(), BeritaListClient(), News (+11 more)

### Community 52 - "peta-demografi.tsx"
Cohesion: 0.24
Nodes (11): fmt(), Marker, PetaDemografi(), Row, GEO_BY_NAMA, geoForWilayah(), KECAMATAN_GEO, KecamatanGeo (+3 more)

### Community 53 - "devDependencies"
Cohesion: 0.13
Nodes (15): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, tailwindcss, tw-animate-css, @types/bcryptjs (+7 more)

### Community 54 - "catatAktivitas"
Cohesion: 0.10
Nodes (26): DELETE(), dynamic, GET(), PUT(), DELETE(), GET(), JENIS_VALID, POST() (+18 more)

### Community 55 - "Journal — TIDORE / DAGA (`tidore-platform`)"
Cohesion: 0.10
Nodes (20): 10. `wilayah:isi-akun` — SELESAI 3 Sep 2026, 1. Identitas project, 2. Dua aplikasi, satu VPS, satu domain, 3. 🔴 Lima hal berbahaya kalau lupa, 4. Keadaan repo per 8 Agu 2026 — **43 berkas menggantung**, 5. Sudah live & terverifikasi (7 Agu dini hari) — jangan dikerjakan ulang, 5b. Menu "Profil Kependudukan" — SELESAI di kode, BELUM di-deploy (14 Agu), 6. Antrean (+12 more)

### Community 56 - "dashboard/page.tsx"
Cohesion: 0.15
Nodes (17): BULAN_PENDEK, DashboardPage(), dynamic, fmt(), pct(), ProgressRow(), STATUS_PENGADUAN, dasar (+9 more)

### Community 57 - "berita/[slug]/page.tsx"
Cohesion: 0.38
Nodes (4): BeritaDetailClient(), News, generateMetadata(), ringkasTeks()

### Community 58 - "app/layout.tsx"
Cohesion: 0.18
Nodes (9): cormorant, geistMono, geistSans, metadata, montserrat, SKEMA_ORGANISASI, Providers(), KunjunganPing() (+1 more)

### Community 59 - "dependencies"
Cohesion: 0.18
Nodes (11): animejs, highcharts, highcharts-react-official, dependencies, animejs, highcharts, highcharts-react-official, @reduxjs/toolkit (+3 more)

### Community 61 - "skm/page.tsx"
Cohesion: 0.24
Nodes (8): DashboardSkmPage(), dynamic, AspekRata, Data, MasukanLayanan, mutu(), Responden, SkmDashboard()

### Community 62 - "scripts"
Cohesion: 0.13
Nodes (15): scripts, akun:uji, build, db:generate, db:migrate, db:push, db:seed, db:studio (+7 more)

### Community 63 - "DAGA Platform"
Cohesion: 0.29
Nodes (6): Akun demo (setelah seed), DAGA Platform, Deploy ke cPanel (ringkas), Menjalankan (lokal), Status migrasi, Struktur

### Community 65 - "hooks.ts"
Cohesion: 0.29
Nodes (9): useAuth(), useGuestOnly(), useRequireAuth(), useUser(), AppDispatch, AppStore, makeStore(), RootState (+1 more)

### Community 67 - "gis/page.tsx"
Cohesion: 0.40
Nodes (3): metadata, PetaDemografi, PetaDemografiLoader()

### Community 68 - "etl-permohonan.ts"
Cohesion: 0.28
Nodes (8): findKey(), JENIS_TANPA_DATA_LAMA, main(), mapStatus(), prisma, SOURCE, TABEL_JENIS, USER_LEVELS

### Community 71 - "galeri-profil.tsx"
Cohesion: 0.06
Nodes (35): bacaKonfigTab(), dynamic, LAYANAN_PPID_SLUGS, PpidPage(), PROFIL_TERHUBUNG, TENTANG_PPID_SLUGS, BlockEditorDialog(), useInlineEdit() (+27 more)

### Community 72 - "produk/page.tsx"
Cohesion: 0.40
Nodes (4): AdminProduk(), DashboardProdukPage(), dynamic, getDokumenKategori()

### Community 73 - "isPetugas"
Cohesion: 0.14
Nodes (18): dynamic, GET(), dynamic, GET(), PUT(), VALID, DELETE(), dynamic (+10 more)

### Community 74 - "utils.ts"
Cohesion: 0.06
Nodes (38): AdminUser, DetailUser, EMPTY_FORM, GRUP_AKUN, GrupKey, Kecamatan, PermohonanRingkas, STATUS_PERMOHONAN (+30 more)

### Community 75 - "etl-master.ts"
Cohesion: 0.43
Nodes (6): asPath(), dt(), main(), prisma, slugify(), SOURCE

### Community 76 - "navigasi/page.tsx"
Cohesion: 0.50
Nodes (3): DashboardNavigasiPage(), dynamic, metadata

### Community 77 - "info-page.tsx"
Cohesion: 0.10
Nodes (19): dynamic, metadata, dynamic, metadata, metadata, dynamic, dynamic, metadata (+11 more)

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

### Community 88 - "berita/[id]/route.ts"
Cohesion: 0.32
Nodes (9): DELETE(), PUT(), requireAdmin(), uniqueSlug(), GET(), POST(), requireAdmin(), uniqueSlug() (+1 more)

### Community 89 - "etl-berkas.ts"
Cohesion: 0.67
Nodes (3): main(), mimeOf(), prisma

### Community 90 - "gen-lookup.ts"
Cohesion: 0.67
Nodes (3): GROUPS, main(), norm()

## Knowledge Gaps
- **641 isolated node(s):** `SUBMIT_ACTIONS`, `FETCH_ACTIONS`, `ALLOWED_EXT`, `runtime`, `dynamic` (+636 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 757 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **53 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `KIAModal.tsx`, `PermohonanDetail.tsx`, `demografi-view.tsx`, `LoginContent.tsx`, `PerpindahanPendudukModal.tsx`, `informasi-index.tsx`, `statistik-kartu-editor.tsx`, `stats.tsx`, `notification-bell.tsx`, `button.tsx`, `AdminDemografi.tsx`, `navigasi-tambahan.ts`, `jam-layanan.ts`, `navbar.tsx`, `inline-edit.tsx`, `app/page.tsx`, `AktaKematianModal.tsx`, `accessibility-widget.tsx`, `struktur-editor.tsx`, `PengajuanBaruClient.tsx`, `galeri-profil.tsx`, `utils.ts`, `info-page.tsx`?**
  _High betweenness centrality (0.129) - this node is a cross-community bridge._
- **Why does `getSession()` connect `getSession` to `fail`, `statistik-export.ts`, `back-button.tsx`, `PermohonanDetail.tsx`, `users/route.ts`, `periode-demografi.ts`, `informasi-index.tsx`, `admin/demografi/kategori/route.ts`, `prisma`, `ok`, `admin/skm/route.ts`, `ktp/route.ts`, `permohonan/[id]/page.tsx`, `navigasi-tambahan.ts`, `useAppSelector`, `AdminPengaduan.tsx`, `permohonan/[id]/route.ts`, `bolehDashboard`, `import/route.ts`, `footer.tsx`, `catatAktivitas`, `dashboard/page.tsx`, `skm/page.tsx`, `produk/page.tsx`, `isPetugas`, `navigasi/page.tsx`, `berita/[id]/route.ts`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **Why does `prisma` connect `prisma` to `fail`, `statistik-export.ts`, `PermohonanDetail.tsx`, `users/route.ts`, `getSession`, `periode-demografi.ts`, `informasi-index.tsx`, `admin/demografi/kategori/route.ts`, `static-content-registry.ts`, `ok`, `admin/skm/route.ts`, `permohonan/[id]/page.tsx`, `halaman/[slug]/page.tsx`, `jam-layanan.ts`, `permohonan/[id]/route.ts`, `import/route.ts`, `catatAktivitas`, `dashboard/page.tsx`, `berita/[slug]/page.tsx`, `galeri-profil.tsx`, `isPetugas`, `info-page.tsx`, `sitemap.xml/route.ts`, `berita/[id]/route.ts`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **What connects `SUBMIT_ACTIONS`, `FETCH_ACTIONS`, `ALLOWED_EXT` to the rest of the system?**
  _641 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `KIAModal.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06615240766713418 - nodes in this community are weakly interconnected._
- **Should `fail` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Should `statistik-export.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09158186864014801 - nodes in this community are weakly interconnected._