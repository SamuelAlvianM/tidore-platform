# Graph Report - tidore-platform  (2026-09-04)

## Corpus Check
- 363 files · ~254,617 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1958 nodes · 5488 edges · 161 communities (97 shown, 55 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a3aa2401`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- AktaKelahiranNikTidakAdaModal.tsx
- ok
- statistik-export.ts
- permohonan/[id]/route.ts
- struktur-editor.tsx
- riwayat/[id]/page.tsx
- cn
- auth.ts
- statistik-kartu-editor.tsx
- KKCetakUlangModal.tsx
- button.tsx
- staff-pengajuan-form.tsx
- inline-edit.tsx
- informasi-index.tsx
- getSession
- demografi-editor.tsx
- compilerOptions
- prisma
- send/route.ts
- RegisterContent.tsx
- galeri-profil.tsx
- static-content-registry.ts
- fail
- 1. SELESAI & TERVERIFIKASI — wajib di-port ke SAIBATIN
- ppid-layanan-halaman.tsx
- stats.tsx
- ktp/route.ts
- back-button.tsx
- Yang Harus Dibuat
- PengajuanBaruClient.tsx
- navbar.tsx
- dashboard/page.tsx
- profile-tabs.tsx
- demografi-view.tsx
- jam-layanan.ts
- components.json
- dashboard-sidebar.tsx
- carousel.tsx
- produk/[...slug]/page.tsx
- relasi-terkait.tsx
- users/route.ts
- ppid/[...slug]/page.tsx
- profil/page.tsx
- accessibility-widget.tsx
- AdminUsers.tsx
- parse/route.ts
- admin/skm/route.ts
- PilihLayananClient.tsx
- hooks.ts
- akun-level.ts
- AdminKonten.tsx
- info-page.tsx
- peta-demografi.tsx
- devDependencies
- berita/[id]/route.ts
- Journal — TIDORE / DAGA (`tidore-platform`)
- bolehDashboard
- app/page.tsx
- hubungi-kami/page.tsx
- dependencies
- app/layout.tsx
- skm/page.tsx
- scripts
- DAGA Platform
- isi-wilayah-akun.ts
- AdminPengaduan.tsx
- berita-list-client.tsx
- CekStatusClient.tsx
- etl-permohonan.ts
- KIAModal.tsx
- notification-bell.tsx
- etl-demografi.ts
- footer.tsx
- users/[id]/route.ts
- utils.ts
- etl-master.ts
- dashboard/kritik-saran/page.tsx
- AdminMedia.tsx
- gis/page.tsx
- sitemap.xml/route.ts
- package.json
- galeri-client.tsx
- produk/page.tsx
- statistik/export/route.ts
- eslint.config.mjs
- etl-chat.ts
- seed-berita.ts
- berita/[slug]/page.tsx
- halaman/[slug]/page.tsx
- etl-berkas.ts
- gen-lookup.ts
- seed.ts
- buat-akun.ts
- class-variance-authority
- clsx
- date-fns
- KKPerubahanBiodataModal.tsx
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
- akun-tolak.ts
- react-day-picker
- react-dropzone
- react-google-recaptcha-v3
- users/page.tsx
- react-redux
- survei-kepuasan/page.tsx
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
- AktaKematianModal.tsx
- image-upload-field.tsx
- pagination.tsx
- react-advanced-cropper
- react-organizational-chart
- sharp
- @types/nodemailer
- @types/pdfkit
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

## Communities (161 total, 55 thin omitted)

### Community 0 - "AktaKelahiranNikTidakAdaModal.tsx"
Cohesion: 0.08
Nodes (52): AktaKelahiranNikTidakAdaModalProps, FormData, UploadedFile, AktaNikahModalProps, FormData, UploadedFile, AktaPerceraianModalProps, FormData (+44 more)

### Community 1 - "ok"
Cohesion: 0.08
Nodes (34): dynamic, GET(), GET(), GET(), POST(), POST(), GET(), GET() (+26 more)

### Community 2 - "statistik-export.ts"
Cohesion: 0.13
Nodes (33): BAGIAN_STATISTIK, barisBernomor(), buatWorkbookStatistik(), BULAN_PENDEK, dataAkun(), dataAspirasi(), dataHarian(), dataKonten() (+25 more)

### Community 3 - "permohonan/[id]/route.ts"
Cohesion: 0.06
Nodes (58): GET(), PATCH(), STATUS_VALID, POST(), Props, catatanSection, f(), FieldDef (+50 more)

### Community 4 - "struktur-editor.tsx"
Cohesion: 0.11
Nodes (23): EditorBox(), nextId(), parse(), Row, serialize(), StrukturEditor(), StrukturChart, OrgBox() (+15 more)

### Community 5 - "riwayat/[id]/page.tsx"
Cohesion: 0.07
Nodes (43): PermohonanDetail(), dynamic, RiwayatDetailPage(), STATUS_CONFIG, AlasanDitolak(), UraianTolak, BerkasGallery(), BerkasView (+35 more)

### Community 6 - "cn"
Cohesion: 0.13
Nodes (31): AktaKelahiranNikAdaModal(), AktaKelahiranNikTidakAdaModal(), AktaKematianModal(), AktaNikahModal(), AktaPerceraianModal(), KedatanganPendudukModal(), KIAModal(), KKCetakUlangModal() (+23 more)

### Community 7 - "auth.ts"
Cohesion: 0.09
Nodes (31): DELETE(), dynamic, GET(), PUT(), dynamic, passwordCocok(), POST(), runtime (+23 more)

### Community 8 - "statistik-kartu-editor.tsx"
Cohesion: 0.08
Nodes (36): AdminDemografi(), downloadFile(), ImageColumnInput(), Row, IconPicker(), KategoriData, WarnaPicker(), ImageCropperDialog() (+28 more)

### Community 9 - "KKCetakUlangModal.tsx"
Cohesion: 0.08
Nodes (35): AKSI_STYLE, fmtWaktu(), LogAktivitasClient(), LogItem, Petugas, ALASAN_TOLAK, FINAL_STATUS, Item (+27 more)

### Community 10 - "button.tsx"
Cohesion: 0.12
Nodes (23): EMPTY, FormState, News, Foto, KATEGORI, NotFound(), ProfilInitial, FormData (+15 more)

### Community 11 - "staff-pengajuan-form.tsx"
Cohesion: 0.29
Nodes (8): StaffPengajuanForm(), Values, useStatusJamLayanan(), KkScanFieldProps, OcrUploadButton(), OcrUploadButtonProps, OcrUploadResult, useImageViewer()

### Community 12 - "inline-edit.tsx"
Cohesion: 0.07
Nodes (37): HalamanTambahanClient(), metadata, metadata, FieldEditor(), BlockEditorDialog(), Ctx, EditableBlock(), EditModeToggle() (+29 more)

### Community 13 - "informasi-index.tsx"
Cohesion: 0.12
Nodes (19): dynamic, metadata, dynamic, metadata, PpidInformasiIndex(), PpidTambahKartu(), PpidSubnav(), HalamanIndeksKartu() (+11 more)

### Community 14 - "getSession"
Cohesion: 0.13
Nodes (22): dynamic, GET(), runtime, GET(), dynamic, findTiketFor(), GET(), PATCH() (+14 more)

### Community 15 - "demografi-editor.tsx"
Cohesion: 0.14
Nodes (21): BULAN_PENDEK, GET(), Conflict, DemografiEditor(), digits(), EditGrid(), EditRow, nid() (+13 more)

### Community 16 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 17 - "prisma"
Cohesion: 0.11
Nodes (32): PATCH(), STATUS_VALID, dynamic, POST(), POST(), POST(), POST(), POST() (+24 more)

### Community 18 - "send/route.ts"
Cohesion: 0.16
Nodes (22): dynamic, POST(), runtime, terakhirKirim, dynamic, POST(), runtime, fonnteAktif() (+14 more)

### Community 19 - "RegisterContent.tsx"
Cohesion: 0.10
Nodes (28): ForgotPasswordPage(), LoginPage(), metadata, metadata, Kecamatan, namaWilayah, RegisterPage(), ResetPasswordPage() (+20 more)

### Community 20 - "galeri-profil.tsx"
Cohesion: 0.18
Nodes (12): clampKolom(), fmtTanggal(), GaleriItem, GaleriProfilPpid(), idBaru(), KOLOM_PILIHAN, Lebar, LinkItem (+4 more)

### Community 21 - "static-content-registry.ts"
Cohesion: 0.15
Nodes (16): metadata, sections, hubungiKamiContent, ppidContent, produkContent, blokGaleriPpid(), blokHalamanTambahan(), blokInfoHalaman() (+8 more)

### Community 22 - "fail"
Cohesion: 0.11
Nodes (22): dynamic, GET(), runtime, cekPetugas(), DELETE(), dynamic, GET(), PUT() (+14 more)

### Community 23 - "1. SELESAI & TERVERIFIKASI — wajib di-port ke SAIBATIN"
Cohesion: 0.14
Nodes (13): 0. Peta dua project — BACA DULU, 1.1 Sisa branding Pesisir Barat di SIDAKO, 1.2 Carousel landing page — kurang besar & kepotong, 1.3 Permohonan Online pindah ke dashboard, tanpa modal, 1.4 Input tanggal tidak bisa diketik, 1.5 Upload — batas ukuran, OOM, dan path traversal, 1.6 Animasi transisi, 1.7 Sub-menu navbar yang bisa dibuat admin (+5 more)

### Community 24 - "ppid-layanan-halaman.tsx"
Cohesion: 0.19
Nodes (8): dynamic, metadata, dynamic, metadata, PpidLayananHalaman(), PpidSeksi, InfoPageContent, LAYANAN_PPID_TABS

### Community 25 - "stats.tsx"
Cohesion: 0.08
Nodes (18): DemografiMetric(), fmt(), OFFICE_LAT, OFFICE_LNG, pulseIcon, base, FALLBACK, KartuDemografi (+10 more)

### Community 26 - "ktp/route.ts"
Cohesion: 0.14
Nodes (19): dynamic, getWorker(), isValidNik(), KtpParsed, loadSharp(), maxDuration, normalizeDigits(), parseKtpText() (+11 more)

### Community 27 - "back-button.tsx"
Cohesion: 0.13
Nodes (14): AdminBerita(), DashboardBeritaPage(), dynamic, DashboardDemografiPage(), dynamic, AdminGaleri(), DashboardGaleriPage(), dynamic (+6 more)

### Community 28 - "Yang Harus Dibuat"
Cohesion: 0.18
Nodes (10): 1. Komponen `AccessibilityWidget` (client component), 2. Daftar Kontrol Aksesibilitas (minimal set berikut), 3. Persistensi & anti-flicker, 4. Aksesibilitas dari widget itu sendiri (jangan ironis), 5. Integrasi & batasan, Deliverable, Konteks Teknis (WAJIB diikuti, sudah diverifikasi di codebase), Kualitas & Verifikasi (lakukan sebelum selesai) (+2 more)

### Community 29 - "PengajuanBaruClient.tsx"
Cohesion: 0.10
Nodes (27): ICONS, PengajuanBaruClient(), PengaturanPelayanan(), Sheet(), SheetContent(), SheetDescription(), SheetFooter(), SheetHeader() (+19 more)

### Community 30 - "navbar.tsx"
Cohesion: 0.14
Nodes (22): EditorNavigasi(), KOSONG, DropdownItem(), DropdownMenu(), isExternalHref(), KELAS_ITEM_MENU, MobileItemIcon(), MobileMenuItem() (+14 more)

### Community 31 - "dashboard/page.tsx"
Cohesion: 0.15
Nodes (17): BULAN_PENDEK, DashboardPage(), dynamic, fmt(), pct(), ProgressRow(), STATUS_PENGADUAN, dasar (+9 more)

### Community 32 - "profile-tabs.tsx"
Cohesion: 0.12
Nodes (19): BulletItem(), CONTENT, easeCustom, fadeUp(), GAMBAR_OVERRIDE_TABS, GambarPanel(), MaklumatPanel(), MottoPanel() (+11 more)

### Community 33 - "demografi-view.tsx"
Cohesion: 0.17
Nodes (17): dynamic, GET(), runtime, DemografiKategoriPage(), DemografiView(), fmt(), KOLOM_LABEL, labelKolom() (+9 more)

### Community 34 - "jam-layanan.ts"
Cohesion: 0.16
Nodes (20): dynamic, GET(), formatTanggalId(), hariIniZona(), PanelJamTutup(), StatusJamLayanan, URUTAN_HARI, cekJamLayanan() (+12 more)

### Community 35 - "components.json"
Cohesion: 0.10
Nodes (19): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+11 more)

### Community 36 - "dashboard-sidebar.tsx"
Cohesion: 0.17
Nodes (17): ADMIN_ONLY_GROUPS, ADMIN_ONLY_HREFS, DesktopSidebar(), GROUPS, groupsForLevel(), GRUP_OPD, KOLOM_BILAH, LabelSidebar() (+9 more)

### Community 37 - "carousel.tsx"
Cohesion: 0.25
Nodes (6): CarouselSlide, DEFAULT_SLIDES, ElegantCarousel(), ElegantCarouselProps, TODO: ganti `image` dengan foto asli DAGA/Disdukcapil Tidore Kepulauan —, TEXT_VARIANTS

### Community 38 - "produk/[...slug]/page.tsx"
Cohesion: 0.18
Nodes (11): HubungiKamiPage(), dynamic, ProdukPage(), WbsPage(), EditableInfoPage(), DOKUMEN_KATEGORI, DOKUMEN_KEYS, dokumenJenisForPath() (+3 more)

### Community 39 - "relasi-terkait.tsx"
Cohesion: 0.38
Nodes (4): RelasiTerkait(), SectionHeading(), Relasi, relasiTerkait

### Community 40 - "users/route.ts"
Cohesion: 0.18
Nodes (18): GET(), NAMA_LEVEL, PATCH(), POST(), requireAdmin(), DELETE(), dynamic, PUT() (+10 more)

### Community 41 - "ppid/[...slug]/page.tsx"
Cohesion: 0.21
Nodes (10): bacaKonfigTab(), dynamic, LAYANAN_PPID_SLUGS, PpidPage(), PROFIL_TERHUBUNG, TENTANG_PPID_SLUGS, PpidCampur(), TAB (+2 more)

### Community 42 - "profil/page.tsx"
Cohesion: 0.21
Nodes (9): ChangePasswordForm(), FotoProfilCard(), dynamic, metadata, ProfilPage(), ProfilForm(), CameraCapture(), CameraCaptureProps (+1 more)

### Community 43 - "accessibility-widget.tsx"
Cohesion: 0.23
Nodes (13): AccessibilityWidget(), SPACING_LABEL, TileButton(), A11Y_STORAGE_KEY, A11yPrefs, applyPrefs(), DEFAULT_PREFS, FONT_DEFAULT_IDX (+5 more)

### Community 44 - "AdminUsers.tsx"
Cohesion: 0.14
Nodes (11): AdminUser, DetailUser, EMPTY_FORM, fmtTanggal(), GRUP_AKUN, GrupKey, Kecamatan, PermohonanRingkas (+3 more)

### Community 45 - "parse/route.ts"
Cohesion: 0.15
Nodes (17): dynamic, maxDuration, POST(), runtime, Conflict, dynamic, maxDuration, POST() (+9 more)

### Community 46 - "admin/skm/route.ts"
Cohesion: 0.23
Nodes (10): GET(), hitungIkm(), nilaiPerUnsur(), SKM_ASPEK, SKM_KENDALA_LAYANAN, SKM_LAYANAN, SKM_PENDIDIKAN, SKM_SKALA_MAX (+2 more)

### Community 47 - "PilihLayananClient.tsx"
Cohesion: 0.16
Nodes (14): FormPageClient(), AjukanPermohonanPage(), dynamic, generateMetadata(), dynamic, metadata, PilihLayananPage(), PilihLayananClient() (+6 more)

### Community 48 - "hooks.ts"
Cohesion: 0.18
Nodes (14): Providers(), SessionHydrator(), InlineEditProvider(), isPublicPage(), useAuth(), useGuestOnly(), useRequireAuth(), useUser() (+6 more)

### Community 49 - "akun-level.ts"
Cohesion: 0.13
Nodes (19): DetailPermohonanPage(), dynamic, bolehSemuaWilayah(), isOpd(), isOperatorWilayah(), isPengajuInstansi(), isStaf(), LEVEL_ADMIN (+11 more)

### Community 50 - "AdminKonten.tsx"
Cohesion: 0.28
Nodes (7): AdminKonten(), flatten(), Leaf, MenuEntry, DashboardKontenPage(), dynamic, PPID_INFORMASI_GRUP

### Community 51 - "info-page.tsx"
Cohesion: 0.18
Nodes (10): metadata, dynamic, metadata, ProfilKependudukanView(), tahunDari(), InfoBerkas, InfoPage(), TambahDokumen() (+2 more)

### Community 52 - "peta-demografi.tsx"
Cohesion: 0.24
Nodes (11): fmt(), Marker, PetaDemografi(), Row, GEO_BY_NAMA, geoForWilayah(), KECAMATAN_GEO, KecamatanGeo (+3 more)

### Community 53 - "devDependencies"
Cohesion: 0.13
Nodes (15): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, tailwindcss, tw-animate-css, @types/bcryptjs (+7 more)

### Community 54 - "berita/[id]/route.ts"
Cohesion: 0.32
Nodes (9): DELETE(), PUT(), requireAdmin(), uniqueSlug(), GET(), POST(), requireAdmin(), uniqueSlug() (+1 more)

### Community 55 - "Journal — TIDORE / DAGA (`tidore-platform`)"
Cohesion: 0.10
Nodes (20): 10. `wilayah:isi-akun` — SELESAI 3 Sep 2026, 1. Identitas project, 2. Dua aplikasi, satu VPS, satu domain, 3. 🔴 Lima hal berbahaya kalau lupa, 4. Keadaan repo per 8 Agu 2026 — **43 berkas menggantung**, 5. Sudah live & terverifikasi (7 Agu dini hari) — jangan dikerjakan ulang, 5b. Menu "Profil Kependudukan" — SELESAI di kode, BELUM di-deploy (14 Agu), 6. Antrean (+12 more)

### Community 56 - "bolehDashboard"
Cohesion: 0.17
Nodes (11): DashboardLayout(), dynamic, DashboardPengajuanBaruPage(), dynamic, AdminPermohonan(), DashboardPermohonanPage(), dynamic, dynamic (+3 more)

### Community 57 - "app/page.tsx"
Cohesion: 0.17
Nodes (10): smoothEase, AlurLayanan(), ease, STEPS, MenuItem, menuItems, MenuPopuler(), News (+2 more)

### Community 58 - "hubungi-kami/page.tsx"
Cohesion: 0.32
Nodes (3): INFO, metadata, SiteConfig

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

### Community 67 - "CekStatusClient.tsx"
Cohesion: 0.33
Nodes (4): CekStatusClient(), Hasil, IKON, metadata

### Community 68 - "etl-permohonan.ts"
Cohesion: 0.28
Nodes (8): findKey(), JENIS_TANPA_DATA_LAMA, main(), mapStatus(), prisma, SOURCE, TABEL_JENIS, USER_LEVELS

### Community 69 - "KIAModal.tsx"
Cohesion: 0.29
Nodes (6): EMPTY_FORM, FILE_FIELDS, FormData, KIAModalProps, NIK_FIELDS, UploadedFile

### Community 70 - "notification-bell.tsx"
Cohesion: 0.43
Nodes (7): getAudioCtx(), NotificationBell(), Notifikasi, playDing(), TIPE_ICON, unlockAudio(), waktuRelatif()

### Community 71 - "etl-demografi.ts"
Cohesion: 0.36
Nodes (7): GROUP_SLUG, levelOf(), main(), num(), parentOf(), prisma, SOURCE

### Community 72 - "footer.tsx"
Cohesion: 0.17
Nodes (8): metadata, dynamic, metadata, TiketPage(), Footer(), grup, Stats, VisitorCount()

### Community 73 - "users/[id]/route.ts"
Cohesion: 0.14
Nodes (20): dynamic, GET(), PUT(), VALID, DELETE(), dynamic, GET(), PUT() (+12 more)

### Community 74 - "utils.ts"
Cohesion: 0.11
Nodes (26): JamLayananEditor(), Toggle(), URUTAN_HARI, AktaKelahiranNikAdaModalProps, FormData, UploadedFile, norm(), SearchSelect() (+18 more)

### Community 75 - "etl-master.ts"
Cohesion: 0.43
Nodes (6): asPath(), dt(), main(), prisma, slugify(), SOURCE

### Community 76 - "dashboard/kritik-saran/page.tsx"
Cohesion: 0.40
Nodes (4): AdminKritikSaran(), Item, DashboardKritikSaranPage(), dynamic

### Community 77 - "AdminMedia.tsx"
Cohesion: 0.47
Nodes (4): AdminMedia(), fmtSize(), DashboardMediaPage(), dynamic

### Community 78 - "gis/page.tsx"
Cohesion: 0.40
Nodes (3): metadata, PetaDemografi, PetaDemografiLoader()

### Community 79 - "sitemap.xml/route.ts"
Cohesion: 0.40
Nodes (5): amanXml(), dynamic, Entri, GET(), RUTE_TETAP

### Community 80 - "package.json"
Cohesion: 0.33
Nodes (5): name, prisma, seed, private, version

### Community 81 - "galeri-client.tsx"
Cohesion: 0.40
Nodes (3): GaleriClient(), GalleryItem, metadata

### Community 82 - "produk/page.tsx"
Cohesion: 0.40
Nodes (4): AdminProduk(), DashboardProdukPage(), dynamic, getDokumenKategori()

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

### Community 88 - "halaman/[slug]/page.tsx"
Cohesion: 0.60
Nodes (4): cariMenu(), dynamic, generateMetadata(), HalamanTambahanPage()

### Community 89 - "etl-berkas.ts"
Cohesion: 0.67
Nodes (3): main(), mimeOf(), prisma

### Community 90 - "gen-lookup.ts"
Cohesion: 0.67
Nodes (3): GROUPS, main(), norm()

### Community 102 - "KKPerubahanBiodataModal.tsx"
Cohesion: 0.40
Nodes (4): FormData, JenisBiodataOption, KKPerubahanBiodataModalProps, UploadedFile

### Community 122 - "akun-tolak.ts"
Cohesion: 0.40
Nodes (4): KEY_BY_LABEL, KOLOM_TOLAK, KolomTolak, LABEL_BY_KEY

### Community 126 - "users/page.tsx"
Cohesion: 0.50
Nodes (3): AdminUsers(), DashboardUsersPage(), dynamic

### Community 141 - "AktaKematianModal.tsx"
Cohesion: 0.50
Nodes (3): AktaKematianModalProps, FormData, UploadedFile

### Community 142 - "image-upload-field.tsx"
Cohesion: 0.67
Nodes (3): ImageUploadField(), kecilkan(), TIPE_DITERIMA

### Community 143 - "pagination.tsx"
Cohesion: 0.67
Nodes (3): deretHalaman(), OPSI_PER_HALAMAN, Pagination()

## Knowledge Gaps
- **631 isolated node(s):** `SUBMIT_ACTIONS`, `FETCH_ACTIONS`, `ALLOWED_EXT`, `runtime`, `dynamic` (+626 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 744 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **55 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `AktaKelahiranNikTidakAdaModal.tsx`, `struktur-editor.tsx`, `statistik-kartu-editor.tsx`, `KKCetakUlangModal.tsx`, `button.tsx`, `staff-pengajuan-form.tsx`, `inline-edit.tsx`, `AktaKematianModal.tsx`, `informasi-index.tsx`, `demografi-editor.tsx`, `image-upload-field.tsx`, `pagination.tsx`, `RegisterContent.tsx`, `ppid-layanan-halaman.tsx`, `stats.tsx`, `PengajuanBaruClient.tsx`, `navbar.tsx`, `profile-tabs.tsx`, `demografi-view.tsx`, `jam-layanan.ts`, `dashboard-sidebar.tsx`, `accessibility-widget.tsx`, `AdminUsers.tsx`, `PilihLayananClient.tsx`, `AdminKonten.tsx`, `info-page.tsx`, `app/page.tsx`, `KIAModal.tsx`, `notification-bell.tsx`, `utils.ts`, `KKPerubahanBiodataModal.tsx`?**
  _High betweenness centrality (0.118) - this node is a cross-community bridge._
- **Why does `getSession()` connect `getSession` to `ok`, `permohonan/[id]/route.ts`, `riwayat/[id]/page.tsx`, `auth.ts`, `informasi-index.tsx`, `prisma`, `fail`, `ktp/route.ts`, `back-button.tsx`, `dashboard/page.tsx`, `users/route.ts`, `profil/page.tsx`, `parse/route.ts`, `admin/skm/route.ts`, `PilihLayananClient.tsx`, `akun-level.ts`, `AdminKonten.tsx`, `berita/[id]/route.ts`, `bolehDashboard`, `skm/page.tsx`, `AdminPengaduan.tsx`, `footer.tsx`, `users/[id]/route.ts`, `dashboard/kritik-saran/page.tsx`, `AdminMedia.tsx`, `produk/page.tsx`, `statistik/export/route.ts`, `users/page.tsx`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **Why does `prisma` connect `prisma` to `ok`, `statistik-export.ts`, `permohonan/[id]/route.ts`, `riwayat/[id]/page.tsx`, `auth.ts`, `informasi-index.tsx`, `getSession`, `demografi-editor.tsx`, `fail`, `ppid-layanan-halaman.tsx`, `PengajuanBaruClient.tsx`, `dashboard/page.tsx`, `demografi-view.tsx`, `jam-layanan.ts`, `produk/[...slug]/page.tsx`, `users/route.ts`, `ppid/[...slug]/page.tsx`, `profil/page.tsx`, `parse/route.ts`, `admin/skm/route.ts`, `akun-level.ts`, `info-page.tsx`, `berita/[id]/route.ts`, `users/[id]/route.ts`, `sitemap.xml/route.ts`, `berita/[slug]/page.tsx`, `halaman/[slug]/page.tsx`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **What connects `SUBMIT_ACTIONS`, `FETCH_ACTIONS`, `ALLOWED_EXT` to the rest of the system?**
  _631 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `AktaKelahiranNikTidakAdaModal.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07785547785547786 - nodes in this community are weakly interconnected._
- **Should `ok` be split into smaller, more focused modules?**
  _Cohesion score 0.07744107744107744 - nodes in this community are weakly interconnected._
- **Should `statistik-export.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1265597147950089 - nodes in this community are weakly interconnected._