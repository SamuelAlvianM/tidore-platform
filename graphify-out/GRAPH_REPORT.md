# Graph Report - tidore-platform  (2026-09-07)

## Corpus Check
- 371 files · ~271,768 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2033 nodes · 5847 edges · 153 communities (92 shown, 53 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d502975b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- AktaNikahModal.tsx
- [action]/route.ts
- statistik-export.ts
- layanan-forms.ts
- struktur-chart.tsx
- riwayat/[id]/page.tsx
- RegisterContent.tsx
- button.tsx
- input.tsx
- useAppSelector
- AktaKelahiranNikAdaModal.tsx
- isPetugas
- admin/demografi/route.ts
- informasi-index.tsx
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
- profil-kependudukan-view.tsx
- halaman/[slug]/page.tsx
- jam-layanan.ts
- components.json
- dashboard-sidebar.tsx
- PilihLayananClient.tsx
- inline-edit.tsx
- hero-section.tsx
- akun-level.ts
- galeri-profil.tsx
- tiket/[id]/route.ts
- accessibility-widget.tsx
- uji-visibilitas.ts
- profile-tabs.tsx
- KIAModal.tsx
- PengajuanBaruClient.tsx
- permohonan/[id]/route.ts
- getSession
- AdminBerita.tsx
- footer.tsx
- peta-demografi.tsx
- devDependencies
- media/upload/route.ts
- Journal — TIDORE / DAGA (`tidore-platform`)
- dashboard/page.tsx
- akun-status.ts
- app/layout.tsx
- dependencies
- demografi-export.ts
- SkmDashboard.tsx
- scripts
- DAGA Platform
- isi-wilayah-akun.ts
- hooks.ts
- berita-list-client.tsx
- ppid/[...slug]/page.tsx
- etl-permohonan.ts
- pelayanan-list.ts
- syarat-ketentuan-view.tsx
- profil-terhubung.tsx
- baru/page.tsx
- users/route.ts
- utils.ts
- etl-master.ts
- app/page.tsx
- formulir-ppid/page.tsx
- kunjungan/route.ts
- sitemap.xml/route.ts
- package.json
- struktur-editor.tsx
- statistik/export/route.ts
- berita/[slug]/page.tsx
- eslint.config.mjs
- etl-chat.ts
- seed-berita.ts
- react-day-picker
- admin/demografi/kategori/route.ts
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
- relasi-terkait.tsx
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
- `AlertTitle()` --calls--> `cn()`  [EXTRACTED]
  components/ui/alert.tsx → lib/utils.ts
- `SelectScrollDownButton()` --calls--> `cn()`  [EXTRACTED]
  components/ui/select.tsx → lib/utils.ts
- `SelectScrollUpButton()` --calls--> `cn()`  [EXTRACTED]
  components/ui/select.tsx → lib/utils.ts
- `SelectSeparator()` --calls--> `cn()`  [EXTRACTED]
  components/ui/select.tsx → lib/utils.ts
- `NotFound()` --calls--> `cn()`  [EXTRACTED]
  app/not-found.tsx → lib/utils.ts

## Import Cycles
- None detected.

## Communities (153 total, 53 thin omitted)

### Community 0 - "AktaNikahModal.tsx"
Cohesion: 0.07
Nodes (61): AktaNikahModalProps, FormData, UploadedFile, AktaPerceraianModalProps, FormData, UploadedFile, d(), FORM_PERMOHONAN (+53 more)

### Community 1 - "[action]/route.ts"
Cohesion: 0.10
Nodes (29): GET(), GET(), POST(), ALLOWED_EXT, FETCH_ACTIONS, POST(), SUBMIT_ACTIONS, validatePayload() (+21 more)

### Community 2 - "statistik-export.ts"
Cohesion: 0.14
Nodes (29): BAGIAN_STATISTIK, barisBernomor(), buatWorkbookStatistik(), BULAN_PENDEK, dataAkun(), dataAspirasi(), dataHarian(), dataKonten() (+21 more)

### Community 3 - "layanan-forms.ts"
Cohesion: 0.11
Nodes (19): catatanSection, f(), FieldDef, FieldType, kelahiranDokumen, kelahiranSections(), OPT_AGAMA, OPT_GOLDAR (+11 more)

### Community 4 - "struktur-chart.tsx"
Cohesion: 0.21
Nodes (11): EditorBox(), StrukturChart, OrgBox(), StrukturChart, adalahPuncak(), gayaTingkat, GRADIEN_PIMPINAN, OrgNode (+3 more)

### Community 5 - "riwayat/[id]/page.tsx"
Cohesion: 0.07
Nodes (43): PermohonanDetail(), dynamic, RiwayatDetailPage(), STATUS_CONFIG, AlasanDitolak(), UraianTolak, BerkasGallery(), BerkasView (+35 more)

### Community 6 - "RegisterContent.tsx"
Cohesion: 0.12
Nodes (9): INFO, metadata, metadata, Kecamatan, namaWilayah, RegisterPage(), labelKolom(), SiteConfig (+1 more)

### Community 7 - "button.tsx"
Cohesion: 0.16
Nodes (16): NotFound(), AktaKematianModalProps, FormData, UploadedFile, FormData, JenisBiodataOption, KKPerubahanBiodataModalProps, UploadedFile (+8 more)

### Community 8 - "input.tsx"
Cohesion: 0.11
Nodes (20): AdminKritikSaran(), Item, KOSONG, Detail, FINAL, STATUS, ProfilInitial, StaffPengajuanForm() (+12 more)

### Community 9 - "useAppSelector"
Cohesion: 0.17
Nodes (18): ForgotPasswordPage(), LoginPage(), metadata, ResetPasswordPage(), MenuItem, menuItems, MenuPopuler(), AuthArea() (+10 more)

### Community 10 - "AktaKelahiranNikAdaModal.tsx"
Cohesion: 0.09
Nodes (29): AKSI_STYLE, fmtWaktu(), LogAktivitasClient(), LogItem, Petugas, ALASAN_TOLAK, FINAL_STATUS, Item (+21 more)

### Community 11 - "isPetugas"
Cohesion: 0.24
Nodes (11): dynamic, GET(), dynamic, GET(), PUT(), dynamic, POST(), isAdmin() (+3 more)

### Community 12 - "admin/demografi/route.ts"
Cohesion: 0.17
Nodes (24): dynamic, GET(), runtime, cekPetugas(), DELETE(), dynamic, GET(), periodeDariBadan() (+16 more)

### Community 13 - "informasi-index.tsx"
Cohesion: 0.12
Nodes (20): dynamic, metadata, dynamic, metadata, PpidInformasiIndex(), PpidTambahKartu(), PpidSubnav(), HalamanIndeksKartu() (+12 more)

### Community 14 - "cn"
Cohesion: 0.11
Nodes (36): AktaKelahiranNikAdaModal(), AktaKelahiranNikTidakAdaModal(), AktaKematianModal(), AktaNikahModal(), AktaPerceraianModal(), KedatanganPendudukModal(), KIAModal(), KKCetakUlangModal() (+28 more)

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
Cohesion: 0.13
Nodes (18): HubungiKamiPage(), metadata, sections, WbsPage(), hubungiKamiContent, ppidContent, produkContent, wbsContent (+10 more)

### Community 22 - "ok"
Cohesion: 0.07
Nodes (69): DELETE(), PUT(), requireAdmin(), uniqueSlug(), GET(), POST(), requireAdmin(), uniqueSlug() (+61 more)

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

### Community 32 - "profil-kependudukan-view.tsx"
Cohesion: 0.23
Nodes (8): AdminUsers(), dynamic, metadata, ProfilKependudukanView(), tahunDari(), TambahDokumen(), PROFIL_KEPENDUDUKAN_KUNCI, useMediaQuery()

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

### Community 38 - "inline-edit.tsx"
Cohesion: 0.10
Nodes (24): HalamanTambahanClient(), metadata, metadata, SurveiKepuasanContent(), BlockEditorDialog(), Ctx, EditableBlock(), EditModeToggle() (+16 more)

### Community 39 - "hero-section.tsx"
Cohesion: 0.17
Nodes (10): CarouselSlide, DEFAULT_SLIDES, ElegantCarousel(), ElegantCarouselProps, TODO: ganti `image` dengan foto asli DAGA/Disdukcapil Tidore Kepulauan —, TEXT_VARIANTS, ease, HeroSection() (+2 more)

### Community 40 - "akun-level.ts"
Cohesion: 0.16
Nodes (13): isOpd(), isOperatorWilayah(), isPengajuInstansi(), isStaf(), LEVEL_ADMIN, LEVEL_OPD, LEVEL_STAFF, LEVEL_WARGA (+5 more)

### Community 41 - "galeri-profil.tsx"
Cohesion: 0.13
Nodes (15): clampKolom(), fmtTanggal(), GaleriItem, GaleriProfilPpid(), idBaru(), KOLOM_PILIHAN, Lebar, LinkItem (+7 more)

### Community 42 - "tiket/[id]/route.ts"
Cohesion: 0.27
Nodes (12): dynamic, findTiketFor(), GET(), PATCH(), POST(), Session, dynamic, GET() (+4 more)

### Community 43 - "accessibility-widget.tsx"
Cohesion: 0.21
Nodes (14): AccessibilityWidget(), SPACING_LABEL, TileButton(), A11Y_INIT_SCRIPT, A11Y_STORAGE_KEY, A11yPrefs, applyPrefs(), DEFAULT_PREFS (+6 more)

### Community 44 - "uji-visibilitas.ts"
Cohesion: 0.22
Nodes (8): Props, LAYANAN_FORMS, LayananForm, LAYANAN_KODE, SLUG_DARI_KODE, dariRute, nyata, slugForm

### Community 45 - "profile-tabs.tsx"
Cohesion: 0.15
Nodes (15): BulletItem(), CONTENT, easeCustom, fadeUp(), GAMBAR_OVERRIDE_TABS, GambarPanel(), MaklumatPanel(), MottoPanel() (+7 more)

### Community 46 - "KIAModal.tsx"
Cohesion: 0.29
Nodes (6): EMPTY_FORM, FILE_FIELDS, FormData, KIAModalProps, NIK_FIELDS, UploadedFile

### Community 47 - "PengajuanBaruClient.tsx"
Cohesion: 0.20
Nodes (13): ICONS, PengajuanBaruClient(), Tabs(), TabsContent(), TabsList(), tabsListVariants, TabsTrigger(), KATEGORI_SLUG (+5 more)

### Community 48 - "permohonan/[id]/route.ts"
Cohesion: 0.21
Nodes (16): GET(), PATCH(), STATUS_VALID, formDariKode(), ALASAN, labelSah(), perluRincian(), pilihanRincian() (+8 more)

### Community 49 - "getSession"
Cohesion: 0.05
Nodes (64): GET(), POST(), GET(), dynamic, GET(), runtime, ALLOWED_EXT, folderAman() (+56 more)

### Community 50 - "AdminBerita.tsx"
Cohesion: 0.15
Nodes (11): EMPTY, FormState, News, Foto, KATEGORI, ImagePickerField(), ImagePickerFieldProps, MediaPicker() (+3 more)

### Community 51 - "footer.tsx"
Cohesion: 0.10
Nodes (18): GaleriClient(), GalleryItem, metadata, metadata, metadata, dynamic, dynamic, metadata (+10 more)

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

### Community 57 - "akun-status.ts"
Cohesion: 0.18
Nodes (13): dynamic, POST(), dynamic, POST(), POST(), IsiDetail(), INFO_STATUS, infoStatus (+5 more)

### Community 58 - "app/layout.tsx"
Cohesion: 0.22
Nodes (7): cormorant, geistMono, geistSans, metadata, montserrat, SKEMA_ORGANISASI, KunjunganPing()

### Community 59 - "dependencies"
Cohesion: 0.18
Nodes (11): animejs, highcharts, highcharts-react-official, dependencies, animejs, highcharts, highcharts-react-official, @reduxjs/toolkit (+3 more)

### Community 60 - "demografi-export.ts"
Cohesion: 0.31
Nodes (9): buildDemografiWorkbook(), DbRow, kolomNilai(), susunBaris(), susunKolom(), daftarKategori(), Kolom, muatLogo() (+1 more)

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

### Community 65 - "hooks.ts"
Cohesion: 0.29
Nodes (9): useAuth(), useGuestOnly(), useRequireAuth(), useUser(), AppDispatch, AppStore, makeStore(), RootState (+1 more)

### Community 66 - "berita-list-client.tsx"
Cohesion: 0.31
Nodes (5): ArticleCard(), BeritaListClient(), News, tglID(), metadata

### Community 67 - "ppid/[...slug]/page.tsx"
Cohesion: 0.20
Nodes (12): bacaKonfigTab(), dynamic, LAYANAN_PPID_SLUGS, PpidPage(), PROFIL_TERHUBUNG, TENTANG_PPID_SLUGS, ProdukPage(), DOKUMEN_KATEGORI (+4 more)

### Community 68 - "etl-permohonan.ts"
Cohesion: 0.28
Nodes (8): findKey(), JENIS_TANPA_DATA_LAMA, main(), mapStatus(), prisma, SOURCE, TABEL_JENIS, USER_LEVELS

### Community 69 - "pelayanan-list.ts"
Cohesion: 0.31
Nodes (7): PengaturanPelayanan(), PELAYANAN_KATEGORI, PELAYANAN_LIST, PELAYANAN_VISIBILITY_KEY, PelayananItem, slugTersembunyi(), layananTersembunyi()

### Community 70 - "syarat-ketentuan-view.tsx"
Cohesion: 0.19
Nodes (9): metadata, BAGIAN, Data, SyaratKetentuanView(), SyaratLayananTabs(), KasusLayanan, LayananSyarat, SYARAT_KATEGORI (+1 more)

### Community 71 - "profil-terhubung.tsx"
Cohesion: 0.17
Nodes (7): IKON_JENIS, KUNCI_PROFIL, LABEL_BERANDA, MaklumatPanel(), ProfilJenis, StrukturEditor, ProfilGambar()

### Community 72 - "baru/page.tsx"
Cohesion: 0.40
Nodes (4): dynamic, metadata, PilihLayananPage(), PilihLayananClient()

### Community 73 - "users/route.ts"
Cohesion: 0.11
Nodes (37): DELETE(), GET(), NAMA_LEVEL, PATCH(), POST(), requireAdmin(), POST(), POST() (+29 more)

### Community 74 - "utils.ts"
Cohesion: 0.13
Nodes (19): PilihRincian(), AktaKelahiranNikTidakAdaModalProps, FormData, UploadedFile, norm(), SearchSelect(), SearchSelectOption, SearchSelectProps (+11 more)

### Community 75 - "etl-master.ts"
Cohesion: 0.43
Nodes (6): asPath(), dt(), main(), prisma, slugify(), SOURCE

### Community 76 - "app/page.tsx"
Cohesion: 0.21
Nodes (8): smoothEase, AlurLayanan(), ease, STEPS, ProfileTabs(), News, QuickHighlights(), tglID()

### Community 77 - "formulir-ppid/page.tsx"
Cohesion: 0.22
Nodes (5): dynamic, metadata, dynamic, metadata, PpidLayananHalaman()

### Community 78 - "kunjungan/route.ts"
Cohesion: 0.31
Nodes (8): dynamic, GET(), POST(), runtime, ONLINE_WINDOW_MS, statsKunjungan(), tanggalHariIni(), dataPengunjung()

### Community 79 - "sitemap.xml/route.ts"
Cohesion: 0.40
Nodes (5): amanXml(), dynamic, Entri, GET(), RUTE_TETAP

### Community 80 - "package.json"
Cohesion: 0.33
Nodes (5): name, prisma, seed, private, version

### Community 81 - "struktur-editor.tsx"
Cohesion: 0.39
Nodes (8): nextId(), parse(), Row, serialize(), StrukturEditor(), StrukturEditor, Tingkat, tingkatAnak()

### Community 82 - "statistik/export/route.ts"
Cohesion: 0.38
Nodes (6): dynamic, GET(), runtime, BagianStatistik, bagianValid(), workbookStatistikResponse()

### Community 83 - "berita/[slug]/page.tsx"
Cohesion: 0.38
Nodes (4): BeritaDetailClient(), News, generateMetadata(), ringkasTeks()

### Community 84 - "eslint.config.mjs"
Cohesion: 0.40
Nodes (4): compat, __dirname, eslintConfig, __filename

### Community 85 - "etl-chat.ts"
Cohesion: 0.50
Nodes (4): dt(), main(), prisma, SOURCE

### Community 86 - "seed-berita.ts"
Cohesion: 0.50
Nodes (4): BERITA, main(), prisma, slugify()

### Community 88 - "admin/demografi/kategori/route.ts"
Cohesion: 0.44
Nodes (8): DELETE(), dynamic, GET(), POST(), PUT(), slugKategori(), bacaRegistri(), tulisRegistri()

### Community 89 - "etl-berkas.ts"
Cohesion: 0.67
Nodes (3): main(), mimeOf(), prisma

### Community 90 - "gen-lookup.ts"
Cohesion: 0.67
Nodes (3): GROUPS, main(), norm()

### Community 105 - "relasi-terkait.tsx"
Cohesion: 0.38
Nodes (4): RelasiTerkait(), SectionHeading(), Relasi, relasiTerkait

### Community 106 - "[jenis]/route.ts"
Cohesion: 0.40
Nodes (4): GET(), demografiData, DemografiDataset, TODO: ganti dengan query Prisma nyata setelah model demografi tersedia.

## Knowledge Gaps
- **641 isolated node(s):** `HitunganPeriode`, `AntreImpor`, `KategoriAdmin`, `AktaNikahModalProps`, `FormData` (+636 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 755 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **53 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `AktaNikahModal.tsx`, `struktur-chart.tsx`, `button.tsx`, `input.tsx`, `useAppSelector`, `AktaKelahiranNikAdaModal.tsx`, `informasi-index.tsx`, `statistik-kartu-editor.tsx`, `AdminUsers.tsx`, `stats.tsx`, `notification-bell.tsx`, `navbar.tsx`, `dialog.tsx`, `AdminDemografi.tsx`, `profil-kependudukan-view.tsx`, `halaman/[slug]/page.tsx`, `jam-layanan.ts`, `dashboard-sidebar.tsx`, `PilihLayananClient.tsx`, `inline-edit.tsx`, `accessibility-widget.tsx`, `profile-tabs.tsx`, `KIAModal.tsx`, `PengajuanBaruClient.tsx`, `AdminBerita.tsx`, `footer.tsx`, `pelayanan-list.ts`, `profil-terhubung.tsx`, `baru/page.tsx`, `utils.ts`, `app/page.tsx`, `formulir-ppid/page.tsx`, `struktur-editor.tsx`?**
  _High betweenness centrality (0.133) - this node is a cross-community bridge._
- **Why does `getSession()` connect `getSession` to `[action]/route.ts`, `dashboard/page.tsx`, `riwayat/[id]/page.tsx`, `PilihLayananClient.tsx`, `baru/page.tsx`, `users/route.ts`, `tiket/[id]/route.ts`, `isPetugas`, `admin/demografi/route.ts`, `informasi-index.tsx`, `permohonan/[id]/route.ts`, `statistik/export/route.ts`, `footer.tsx`, `parse/route.ts`, `ok`, `media/upload/route.ts`, `admin/demografi/kategori/route.ts`, `ktp/route.ts`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **Why does `prisma` connect `ok` to `[action]/route.ts`, `statistik-export.ts`, `riwayat/[id]/page.tsx`, `isPetugas`, `admin/demografi/route.ts`, `informasi-index.tsx`, `demografi-registri.ts`, `parse/route.ts`, `profil-kependudukan-view.tsx`, `halaman/[slug]/page.tsx`, `jam-layanan.ts`, `tiket/[id]/route.ts`, `permohonan/[id]/route.ts`, `getSession`, `footer.tsx`, `media/upload/route.ts`, `dashboard/page.tsx`, `akun-status.ts`, `demografi-export.ts`, `ppid/[...slug]/page.tsx`, `pelayanan-list.ts`, `users/route.ts`, `kunjungan/route.ts`, `sitemap.xml/route.ts`, `berita/[slug]/page.tsx`, `admin/demografi/kategori/route.ts`?**
  _High betweenness centrality (0.055) - this node is a cross-community bridge._
- **What connects `HitunganPeriode`, `AntreImpor`, `KategoriAdmin` to the rest of the system?**
  _641 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `AktaNikahModal.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07075624797143784 - nodes in this community are weakly interconnected._
- **Should `[action]/route.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09957325746799431 - nodes in this community are weakly interconnected._
- **Should `statistik-export.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.14482758620689656 - nodes in this community are weakly interconnected._