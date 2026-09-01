# Graph Report - tidore-platform  (2026-09-01)

## Corpus Check
- 347 files · ~239,822 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1850 nodes · 5099 edges · 186 communities (86 shown, 92 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `bc50ef5e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- AktaKelahiranNikAdaModal.tsx
- ok
- statistik-export.ts
- users/route.ts
- struktur-editor.tsx
- AdminPermohonan.tsx
- cn
- auth.ts
- utils.ts
- KKPerubahanBiodataModal.tsx
- button.tsx
- inline-edit.tsx
- useStaticContent
- informasi-index.tsx
- getSession
- statistik-kartu-editor.tsx
- compilerOptions
- prisma
- send/route.ts
- RegisterContent.tsx
- App\Http\Controllers\Controller
- Illuminate\Http\Request
- PengajuanBaruClient.tsx
- layanan-forms.ts
- Auth
- stats.tsx
- ktp/route.ts
- back-button.tsx
- authSlice.ts
- produk/[...slug]/page.tsx
- halaman/[slug]/page.tsx
- footer.tsx
- Validator
- info-page.tsx
- jam-layanan.ts
- components.json
- dashboard-sidebar.tsx
- app/page.tsx
- ppid/[...slug]/page.tsx
- App\Models\Fronts\Permohonans\KedatanganModel
- users/[id]/route.ts
- demografi-kategori.ts
- CekStatusClient.tsx
- accessibility-widget.tsx
- demografi-view.tsx
- parse/route.ts
- admin/skm/route.ts
- [layanan]/page.tsx
- useAppSelector
- galeri-profil.tsx
- static-content-registry.ts
- ppid-layanan-halaman.tsx
- peta-demografi.tsx
- devDependencies
- berita/[id]/route.ts
- profil/page.tsx
- pengajuan/page.tsx
- hero-section.tsx
- navbar.tsx
- dependencies
- app/layout.tsx
- skm/page.tsx
- scripts
- kunjungan/route.ts
- AdminKonten.tsx
- AdminPengaduan.tsx
- berita-list-client.tsx
- rich-editor.tsx
- etl-permohonan.ts
- getIcon
- notification-bell.tsx
- etl-demografi.ts
- berita/[slug]/page.tsx
- pengaturan-pelayanan.tsx
- KIAModal.tsx
- etl-master.ts
- dashboard/kritik-saran/page.tsx
- galeri-client.tsx
- gis/page.tsx
- sitemap.xml/route.ts
- package.json
- media/page.tsx
- produk/page.tsx
- baru/page.tsx
- eslint.config.mjs
- etl-chat.ts
- seed-berita.ts
- users/page.tsx
- AktaKematianModal.tsx
- etl-berkas.ts
- gen-lookup.ts
- seed.ts
- buat-akun.ts
- class-variance-authority
- clsx
- date-fns
- eslint-config-next
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
- react-advanced-cropper
- react-day-picker
- react-dropzone
- react-google-recaptcha-v3
- react-organizational-chart
- react-redux
- sharp
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
- App\Models\Fronts\Permohonans\Kelahiran1Model
- App\Models\Fronts\Permohonans\Kelahiran2Model
- App\Models\Fronts\Permohonans\KematianModel
- App\Models\Fronts\Permohonans\KIAModel
- App\Models\Fronts\Permohonans\KKCetakUlangModel
- App\Models\Fronts\Permohonans\KKNumpangModel
- App\Models\Fronts\Permohonans\KKPerubahhanBiodataModel
- App\Models\Fronts\Permohonans\KKPisahKKModel
- App\Models\Fronts\Permohonans\KKTambahAnakModel
- App\Models\Fronts\Permohonans\KonsolidasiUpdateDataModel
- App\Models\Fronts\Permohonans\KTPELModel
- App\Models\Fronts\Permohonans\PerceraianModel
- App\Models\Fronts\Permohonans\PerkawinanModel
- App\Models\Fronts\Permohonans\PindahModel
- App\Models\Fronts\Users\UserlevelModel
- App\Models\Fronts\Users\UsersModel
- App\Models\Imports\BiodataWNILcModel
- App\Models\Includes\MenuModel
- App\Models\Includes\OptionModel
- App\Models\Settings\OperasionalWaktuModel
- App\Quotation
- Carbon\Carbon
- @tailwindcss/postcss
- @types/bcryptjs
- DataTables
- DB
- @types/node
- @types/nodemailer
- @types/pdfkit
- @types/react
- @types/react-dom
- typescript
- postcss.config.mjs
- Exception
- File
- GoogleReCaptchaV3
- Hash
- Illuminate\Support\Facades\Storage
- t_skm_jawaban
- users
- Zip
- CLAUDE.md

## God Nodes (most connected - your core abstractions)
1. `cn()` - 201 edges
2. `ok()` - 147 edges
3. `getSession()` - 144 edges
4. `fail()` - 137 edges
5. `prisma` - 73 edges
6. `Button()` - 67 edges
7. `Input()` - 53 edges
8. `catatAktivitas()` - 43 edges
9. `Label()` - 39 edges
10. `notifyError()` - 35 edges

## Surprising Connections (you probably didn't know these)
- `AlertTitle()` --calls--> `cn()`  [EXTRACTED]
  components/ui/alert.tsx → lib/utils.ts
- `DashboardBeritaPage()` --calls--> `getSession()`  [EXTRACTED]
  app/dashboard/berita/page.tsx → lib/auth.ts
- `DashboardDemografiPage()` --calls--> `getSession()`  [EXTRACTED]
  app/dashboard/demografi/page.tsx → lib/auth.ts
- `DashboardGaleriPage()` --calls--> `getSession()`  [EXTRACTED]
  app/dashboard/galeri/page.tsx → lib/auth.ts
- `DashboardKontenPage()` --calls--> `getSession()`  [EXTRACTED]
  app/dashboard/konten/page.tsx → lib/auth.ts

## Import Cycles
- None detected.

## Communities (186 total, 92 thin omitted)

### Community 0 - "AktaKelahiranNikAdaModal.tsx"
Cohesion: 0.07
Nodes (56): AktaKelahiranNikAdaModalProps, FormData, UploadedFile, AktaKelahiranNikTidakAdaModalProps, FormData, UploadedFile, AktaNikahModalProps, FormData (+48 more)

### Community 1 - "ok"
Cohesion: 0.08
Nodes (46): cekPetugas(), DELETE(), dynamic, GET(), PUT(), SaveRow, dynamic, GET() (+38 more)

### Community 2 - "statistik-export.ts"
Cohesion: 0.06
Nodes (61): dynamic, GET(), runtime, BULAN_PENDEK, DashboardPage(), dynamic, fmt(), pct() (+53 more)

### Community 3 - "users/route.ts"
Cohesion: 0.09
Nodes (45): PATCH(), STATUS_VALID, PATCH(), STATUS_VALID, GET(), NAMA_LEVEL, PATCH(), POST() (+37 more)

### Community 4 - "struktur-editor.tsx"
Cohesion: 0.06
Nodes (41): EditorBox(), nextId(), parse(), Row, serialize(), StrukturEditor(), BulletItem(), CONTENT (+33 more)

### Community 5 - "AdminPermohonan.tsx"
Cohesion: 0.07
Nodes (46): AdminPermohonan(), ALASAN_TOLAK, BerkasItem, Detail, FINAL_STATUS, Item, STATUS, STATUS_KEYS (+38 more)

### Community 6 - "cn"
Cohesion: 0.08
Nodes (46): NotFound(), ImageColumnInput(), EditModeToggle(), IconPicker(), WarnaPicker(), MapCard(), ServiceCard(), AktaKelahiranNikAdaModal() (+38 more)

### Community 7 - "auth.ts"
Cohesion: 0.08
Nodes (36): dynamic, maxDuration, POST(), runtime, DELETE(), dynamic, passwordCocok(), POST() (+28 more)

### Community 8 - "utils.ts"
Cohesion: 0.08
Nodes (36): AdminUser, DetailUser, EMPTY_FORM, GRUP_AKUN, GrupKey, Kecamatan, PermohonanRingkas, STATUS_PERMOHONAN (+28 more)

### Community 9 - "KKPerubahanBiodataModal.tsx"
Cohesion: 0.10
Nodes (30): AKSI_STYLE, fmtWaktu(), LogAktivitasClient(), LogItem, Petugas, GROUPS, Produk, AktaPerceraianModalProps (+22 more)

### Community 10 - "button.tsx"
Cohesion: 0.14
Nodes (20): AdminBerita(), EMPTY, FormState, News, Foto, KATEGORI, KOSONG, ProfilInitial (+12 more)

### Community 11 - "inline-edit.tsx"
Cohesion: 0.14
Nodes (21): AdminDemografi(), downloadFile(), FieldEditor(), IconColumnInput(), Ctx, InlineEditCtx, Row, ImageCropperDialog() (+13 more)

### Community 12 - "useStaticContent"
Cohesion: 0.10
Nodes (19): metadata, SurveiKepuasanContent(), metadata, EditableBlock(), ProdukDisdukcapilView(), ProdukItem, KebijakanPrivasiView(), SurveyKepuasanForm() (+11 more)

### Community 13 - "informasi-index.tsx"
Cohesion: 0.10
Nodes (22): dynamic, metadata, dynamic, metadata, PpidInformasiIndex(), PpidTambahKartu(), PpidSubnav(), HalamanIndeksKartu() (+14 more)

### Community 14 - "getSession"
Cohesion: 0.13
Nodes (22): GET(), dynamic, GET(), runtime, dynamic, findTiketFor(), GET(), PATCH() (+14 more)

### Community 15 - "statistik-kartu-editor.tsx"
Cohesion: 0.15
Nodes (23): BULAN_PENDEK, GET(), Conflict, DemografiEditor(), digits(), EditGrid(), EditRow, nid() (+15 more)

### Community 16 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 17 - "prisma"
Cohesion: 0.15
Nodes (19): dynamic, GET(), PUT(), POST(), POST(), dynamic, GET(), GET() (+11 more)

### Community 18 - "send/route.ts"
Cohesion: 0.16
Nodes (22): dynamic, POST(), runtime, terakhirKirim, dynamic, POST(), runtime, fonnteAktif() (+14 more)

### Community 19 - "RegisterContent.tsx"
Cohesion: 0.16
Nodes (14): Kecamatan, namaWilayah, ResetPasswordPage(), MenuItem, menuItems, MenuPopuler(), Card(), CardAction() (+6 more)

### Community 22 - "PengajuanBaruClient.tsx"
Cohesion: 0.13
Nodes (17): DashboardPengajuanBaruPage(), dynamic, ICONS, PengajuanBaruClient(), Sheet(), SheetContent(), SheetDescription(), SheetFooter() (+9 more)

### Community 23 - "layanan-forms.ts"
Cohesion: 0.09
Nodes (22): Props, catatanSection, f(), FieldDef, FieldType, kelahiranDokumen, kelahiranSections(), LAYANAN_FORMS (+14 more)

### Community 25 - "stats.tsx"
Cohesion: 0.10
Nodes (14): OFFICE_LAT, OFFICE_LNG, pulseIcon, base, FALLBACK, KartuDemografi, OfficeMap, PelayananStat (+6 more)

### Community 26 - "ktp/route.ts"
Cohesion: 0.14
Nodes (19): dynamic, getWorker(), isValidNik(), KtpParsed, loadSharp(), maxDuration, normalizeDigits(), parseKtpText() (+11 more)

### Community 27 - "back-button.tsx"
Cohesion: 0.12
Nodes (15): DashboardBeritaPage(), dynamic, DashboardDemografiPage(), dynamic, AdminGaleri(), DashboardGaleriPage(), dynamic, DashboardLogPage() (+7 more)

### Community 28 - "authSlice.ts"
Cohesion: 0.12
Nodes (16): ForgotPasswordPage(), LoginPage(), metadata, SessionHydrator(), metadata, RegisterPage(), useAppDispatch(), authSlice (+8 more)

### Community 29 - "produk/[...slug]/page.tsx"
Cohesion: 0.16
Nodes (13): HubungiKamiPage(), dynamic, ProdukPage(), metadata, sections, WbsPage(), EditableInfoPage(), dokumenJenisForPath() (+5 more)

### Community 30 - "halaman/[slug]/page.tsx"
Cohesion: 0.16
Nodes (17): EditorNavigasi(), HalamanTambahanClient(), cariMenu(), dynamic, generateMetadata(), HalamanTambahanPage(), buatSlug(), gabungNavigasi() (+9 more)

### Community 31 - "footer.tsx"
Cohesion: 0.13
Nodes (11): INFO, metadata, metadata, dynamic, metadata, TiketPage(), Footer(), grup (+3 more)

### Community 33 - "info-page.tsx"
Cohesion: 0.15
Nodes (14): metadata, dynamic, metadata, useInlineEdit(), ProfileTabs(), StatsGrid(), ProfilTerhubung(), ProfilKependudukanView() (+6 more)

### Community 34 - "jam-layanan.ts"
Cohesion: 0.16
Nodes (18): JamLayananEditor(), Toggle(), URUTAN_HARI, formatTanggalId(), hariIniZona(), PanelJamTutup(), StatusJamLayanan, URUTAN_HARI (+10 more)

### Community 35 - "components.json"
Cohesion: 0.10
Nodes (19): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+11 more)

### Community 36 - "dashboard-sidebar.tsx"
Cohesion: 0.15
Nodes (17): DashboardLayout(), dynamic, ADMIN_ONLY_GROUPS, ADMIN_ONLY_HREFS, DashboardSidebar(), DesktopSidebar(), GROUPS, groupsForLevel() (+9 more)

### Community 37 - "app/page.tsx"
Cohesion: 0.14
Nodes (12): smoothEase, AlurLayanan(), ease, STEPS, HeroSection(), News, QuickHighlights(), tglID() (+4 more)

### Community 38 - "ppid/[...slug]/page.tsx"
Cohesion: 0.15
Nodes (15): bacaKonfigTab(), dynamic, LAYANAN_PPID_SLUGS, PpidPage(), PROFIL_TERHUBUNG, TENTANG_PPID_SLUGS, BlockEditorDialog(), PpidCampur() (+7 more)

### Community 40 - "users/[id]/route.ts"
Cohesion: 0.19
Nodes (15): DELETE(), dynamic, GET(), DELETE(), dynamic, PUT(), adalahDataUrlGambar(), DIR_KTP (+7 more)

### Community 41 - "demografi-kategori.ts"
Cohesion: 0.22
Nodes (13): dynamic, GET(), runtime, dynamic, GET(), runtime, addSheet(), buildDemografiWorkbook() (+5 more)

### Community 42 - "CekStatusClient.tsx"
Cohesion: 0.16
Nodes (13): CekStatusClient(), Hasil, IKON, metadata, fmtTanggal(), IsiDetail(), infoStatus, KEY_BY_LABEL (+5 more)

### Community 43 - "accessibility-widget.tsx"
Cohesion: 0.21
Nodes (14): AccessibilityWidget(), SPACING_LABEL, TileButton(), A11Y_INIT_SCRIPT, A11Y_STORAGE_KEY, A11yPrefs, applyPrefs(), DEFAULT_PREFS (+6 more)

### Community 44 - "demografi-view.tsx"
Cohesion: 0.19
Nodes (11): metadata, DemografiKategoriPage(), DemografiMetric(), fmt(), DemografiView(), fmt(), KOLOM_LABEL, labelKolom() (+3 more)

### Community 45 - "parse/route.ts"
Cohesion: 0.20
Nodes (13): Conflict, dynamic, maxDuration, POST(), runtime, sig(), Variant, cellNum() (+5 more)

### Community 46 - "admin/skm/route.ts"
Cohesion: 0.23
Nodes (11): GET(), POST(), hitungIkm(), nilaiPerUnsur(), SKM_ASPEK, SKM_KENDALA_LAYANAN, SKM_LAYANAN, SKM_PENDIDIKAN (+3 more)

### Community 47 - "[layanan]/page.tsx"
Cohesion: 0.23
Nodes (10): FormPageClient(), AjukanPermohonanPage(), dynamic, generateMetadata(), getLayananForm(), getLayanan(), KATEGORI_LAYANAN, LAYANAN_PERMOHONAN (+2 more)

### Community 48 - "useAppSelector"
Cohesion: 0.22
Nodes (12): InlineEditProvider(), isPublicPage(), useAppSelector, useAuth(), useGuestOnly(), useRequireAuth(), useUser(), AppDispatch (+4 more)

### Community 49 - "galeri-profil.tsx"
Cohesion: 0.18
Nodes (12): clampKolom(), fmtTanggal(), GaleriItem, GaleriProfilPpid(), idBaru(), KOLOM_PILIHAN, Lebar, LinkItem (+4 more)

### Community 50 - "static-content-registry.ts"
Cohesion: 0.22
Nodes (12): GET(), blokGaleriPpid(), blokHalamanTambahan(), blokInfoHalaman(), DKB_PERIODE_KUNCI, getStaticBlock(), getStaticDefaults(), INFO_SECTIONS (+4 more)

### Community 51 - "ppid-layanan-halaman.tsx"
Cohesion: 0.19
Nodes (8): dynamic, metadata, dynamic, metadata, PpidLayananHalaman(), PpidSeksi, InfoPageContent, LAYANAN_PPID_TABS

### Community 52 - "peta-demografi.tsx"
Cohesion: 0.24
Nodes (11): fmt(), Marker, PetaDemografi(), Row, GEO_BY_NAMA, geoForWilayah(), KECAMATAN_GEO, KecamatanGeo (+3 more)

### Community 53 - "devDependencies"
Cohesion: 0.15
Nodes (13): eslint, devDependencies, eslint, prisma, puppeteer-core, @tailwindcss/typography, tsx, tw-animate-css (+5 more)

### Community 54 - "berita/[id]/route.ts"
Cohesion: 0.32
Nodes (9): DELETE(), PUT(), requireAdmin(), uniqueSlug(), GET(), POST(), requireAdmin(), uniqueSlug() (+1 more)

### Community 55 - "profil/page.tsx"
Cohesion: 0.21
Nodes (9): ChangePasswordForm(), FotoProfilCard(), dynamic, metadata, ProfilPage(), ProfilForm(), CameraCapture(), CameraCaptureProps (+1 more)

### Community 56 - "pengajuan/page.tsx"
Cohesion: 0.23
Nodes (7): dynamic, UserPengajuanPage(), Permohonan, RiwayatList(), STATUS_CONFIG, TABS, useInfiniteScroll()

### Community 57 - "hero-section.tsx"
Cohesion: 0.18
Nodes (9): CarouselSlide, DEFAULT_SLIDES, ElegantCarousel(), ElegantCarouselProps, TODO: ganti `image` dengan foto asli DAGA/Disdukcapil Tidore Kepulauan —, TEXT_VARIANTS, ease, QUICK_ACTIONS (+1 more)

### Community 58 - "navbar.tsx"
Cohesion: 0.21
Nodes (11): AuthArea(), DropdownItem(), DropdownMenu(), isExternalHref(), KELAS_ITEM_MENU, MobileItemIcon(), MobileMenuItem(), Navbar() (+3 more)

### Community 59 - "dependencies"
Cohesion: 0.18
Nodes (11): animejs, bcryptjs, dependencies, animejs, bcryptjs, react-dom, react-leaflet, @reduxjs/toolkit (+3 more)

### Community 60 - "app/layout.tsx"
Cohesion: 0.20
Nodes (8): cormorant, geistMono, geistSans, metadata, montserrat, SKEMA_ORGANISASI, Providers(), KunjunganPing()

### Community 61 - "skm/page.tsx"
Cohesion: 0.24
Nodes (8): DashboardSkmPage(), dynamic, AspekRata, Data, MasukanLayanan, mutu(), Responden, SkmDashboard()

### Community 62 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:generate, db:migrate, db:push, db:seed, db:studio, dev (+2 more)

### Community 63 - "kunjungan/route.ts"
Cohesion: 0.36
Nodes (7): dynamic, GET(), POST(), runtime, ONLINE_WINDOW_MS, statsKunjungan(), tanggalHariIni()

### Community 64 - "AdminKonten.tsx"
Cohesion: 0.28
Nodes (7): AdminKonten(), flatten(), Leaf, MenuEntry, DashboardKontenPage(), dynamic, PPID_INFORMASI_GRUP

### Community 65 - "AdminPengaduan.tsx"
Cohesion: 0.28
Nodes (6): AdminPengaduan(), FILTERS, Item, pisahBukti(), DashboardPengaduanPage(), dynamic

### Community 66 - "berita-list-client.tsx"
Cohesion: 0.31
Nodes (5): ArticleCard(), BeritaListClient(), News, tglID(), metadata

### Community 67 - "rich-editor.tsx"
Cohesion: 0.22
Nodes (5): ImagePickerFieldProps, MediaPicker(), RichEditor(), RichEditorProps, ToolbarButton()

### Community 68 - "etl-permohonan.ts"
Cohesion: 0.28
Nodes (8): findKey(), JENIS_TANPA_DATA_LAMA, main(), mapStatus(), prisma, SOURCE, TABEL_JENIS, USER_LEVELS

### Community 69 - "getIcon"
Cohesion: 0.25
Nodes (8): StatCard(), FormKartu(), simpan(), keSlug(), PpidAksiKartu(), hapus(), simpanDaftar(), getIcon()

### Community 70 - "notification-bell.tsx"
Cohesion: 0.43
Nodes (7): getAudioCtx(), NotificationBell(), Notifikasi, playDing(), TIPE_ICON, unlockAudio(), waktuRelatif()

### Community 71 - "etl-demografi.ts"
Cohesion: 0.36
Nodes (7): GROUP_SLUG, levelOf(), main(), num(), parentOf(), prisma, SOURCE

### Community 72 - "berita/[slug]/page.tsx"
Cohesion: 0.38
Nodes (4): BeritaDetailClient(), News, generateMetadata(), ringkasTeks()

### Community 73 - "pengaturan-pelayanan.tsx"
Cohesion: 0.38
Nodes (5): PengaturanPelayanan(), PELAYANAN_KATEGORI, PELAYANAN_LIST, PELAYANAN_VISIBILITY_KEY, PelayananItem

### Community 74 - "KIAModal.tsx"
Cohesion: 0.29
Nodes (6): EMPTY_FORM, FILE_FIELDS, FormData, KIAModalProps, NIK_FIELDS, UploadedFile

### Community 75 - "etl-master.ts"
Cohesion: 0.43
Nodes (6): asPath(), dt(), main(), prisma, slugify(), SOURCE

### Community 76 - "dashboard/kritik-saran/page.tsx"
Cohesion: 0.40
Nodes (4): AdminKritikSaran(), Item, DashboardKritikSaranPage(), dynamic

### Community 77 - "galeri-client.tsx"
Cohesion: 0.40
Nodes (3): GaleriClient(), GalleryItem, metadata

### Community 78 - "gis/page.tsx"
Cohesion: 0.40
Nodes (3): metadata, PetaDemografi, PetaDemografiLoader()

### Community 79 - "sitemap.xml/route.ts"
Cohesion: 0.40
Nodes (5): amanXml(), dynamic, Entri, GET(), RUTE_TETAP

### Community 80 - "package.json"
Cohesion: 0.33
Nodes (5): name, prisma, seed, private, version

### Community 81 - "media/page.tsx"
Cohesion: 0.40
Nodes (4): AdminMedia(), fmtSize(), DashboardMediaPage(), dynamic

### Community 82 - "produk/page.tsx"
Cohesion: 0.40
Nodes (4): AdminProduk(), DashboardProdukPage(), dynamic, getDokumenKategori()

### Community 83 - "baru/page.tsx"
Cohesion: 0.40
Nodes (4): dynamic, metadata, PilihLayananPage(), PilihLayananClient()

### Community 84 - "eslint.config.mjs"
Cohesion: 0.40
Nodes (4): compat, __dirname, eslintConfig, __filename

### Community 85 - "etl-chat.ts"
Cohesion: 0.50
Nodes (4): dt(), main(), prisma, SOURCE

### Community 86 - "seed-berita.ts"
Cohesion: 0.50
Nodes (4): BERITA, main(), prisma, slugify()

### Community 87 - "users/page.tsx"
Cohesion: 0.50
Nodes (3): AdminUsers(), DashboardUsersPage(), dynamic

### Community 88 - "AktaKematianModal.tsx"
Cohesion: 0.50
Nodes (3): AktaKematianModalProps, FormData, UploadedFile

### Community 89 - "etl-berkas.ts"
Cohesion: 0.67
Nodes (3): main(), mimeOf(), prisma

### Community 90 - "gen-lookup.ts"
Cohesion: 0.67
Nodes (3): GROUPS, main(), norm()

## Knowledge Gaps
- **564 isolated node(s):** `BASE`, `AktaKelahiranNikAdaModalProps`, `FormData`, `UploadedFile`, `AktaKelahiranNikTidakAdaModalProps` (+559 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 702 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **92 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `AktaKelahiranNikAdaModal.tsx`, `struktur-editor.tsx`, `AdminPermohonan.tsx`, `utils.ts`, `KKPerubahanBiodataModal.tsx`, `button.tsx`, `inline-edit.tsx`, `useStaticContent`, `informasi-index.tsx`, `statistik-kartu-editor.tsx`, `RegisterContent.tsx`, `PengajuanBaruClient.tsx`, `stats.tsx`, `info-page.tsx`, `jam-layanan.ts`, `dashboard-sidebar.tsx`, `ppid/[...slug]/page.tsx`, `accessibility-widget.tsx`, `demografi-view.tsx`, `[layanan]/page.tsx`, `ppid-layanan-halaman.tsx`, `navbar.tsx`, `AdminKonten.tsx`, `rich-editor.tsx`, `getIcon`, `notification-bell.tsx`, `pengaturan-pelayanan.tsx`, `KIAModal.tsx`, `baru/page.tsx`, `AktaKematianModal.tsx`?**
  _High betweenness centrality (0.156) - this node is a cross-community bridge._
- **Why does `getSession()` connect `getSession` to `ok`, `statistik-export.ts`, `users/route.ts`, `AdminPermohonan.tsx`, `auth.ts`, `informasi-index.tsx`, `prisma`, `PengajuanBaruClient.tsx`, `ktp/route.ts`, `back-button.tsx`, `footer.tsx`, `dashboard-sidebar.tsx`, `users/[id]/route.ts`, `demografi-kategori.ts`, `parse/route.ts`, `admin/skm/route.ts`, `[layanan]/page.tsx`, `berita/[id]/route.ts`, `profil/page.tsx`, `pengajuan/page.tsx`, `skm/page.tsx`, `AdminKonten.tsx`, `AdminPengaduan.tsx`, `dashboard/kritik-saran/page.tsx`, `media/page.tsx`, `produk/page.tsx`, `baru/page.tsx`, `users/page.tsx`?**
  _High betweenness centrality (0.086) - this node is a cross-community bridge._
- **Why does `prisma` connect `prisma` to `ok`, `statistik-export.ts`, `users/route.ts`, `AdminPermohonan.tsx`, `auth.ts`, `informasi-index.tsx`, `getSession`, `statistik-kartu-editor.tsx`, `produk/[...slug]/page.tsx`, `halaman/[slug]/page.tsx`, `info-page.tsx`, `ppid/[...slug]/page.tsx`, `users/[id]/route.ts`, `demografi-kategori.ts`, `parse/route.ts`, `admin/skm/route.ts`, `static-content-registry.ts`, `ppid-layanan-halaman.tsx`, `berita/[id]/route.ts`, `profil/page.tsx`, `kunjungan/route.ts`, `berita/[slug]/page.tsx`, `sitemap.xml/route.ts`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **What connects `BASE`, `AktaKelahiranNikAdaModalProps`, `FormData` to the rest of the system?**
  _564 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `AktaKelahiranNikAdaModal.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07316118935837246 - nodes in this community are weakly interconnected._
- **Should `ok` be split into smaller, more focused modules?**
  _Cohesion score 0.07645875251509054 - nodes in this community are weakly interconnected._
- **Should `statistik-export.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.057971014492753624 - nodes in this community are weakly interconnected._