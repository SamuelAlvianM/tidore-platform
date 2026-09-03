# Graph Report - tidore-platform  (2026-09-03)

## Corpus Check
- 347 files · ~239,822 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1857 nodes · 5105 edges · 182 communities (82 shown, 92 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4364813c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- KKPerubahanBiodataModal.tsx
- ok
- statistik-export.ts
- users/route.ts
- struktur-editor.tsx
- AdminPermohonan.tsx
- cn
- auth.ts
- utils.ts
- select.tsx
- button.tsx
- inline-edit.tsx
- useStaticContent
- informasi-index.tsx
- getSession
- statistik-kartu-editor.tsx
- compilerOptions
- [action]/route.ts
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
- info-content.ts
- halaman/[slug]/page.tsx
- footer.tsx
- Validator
- profil-kependudukan-view.tsx
- jam-layanan.ts
- components.json
- dashboard-sidebar.tsx
- app/page.tsx
- ppid/[...slug]/page.tsx
- App\Models\Fronts\Permohonans\KedatanganModel
- users/[id]/route.ts
- demografi-view.tsx
- AdminUsers.tsx
- accessibility-widget.tsx
- syarat-ketentuan-view.tsx
- parse/route.ts
- admin/skm/route.ts
- prisma
- hooks.ts
- galeri-profil.tsx
- static-content-registry.ts
- info-page.tsx
- peta-demografi.tsx
- devDependencies
- admin/berita/route.ts
- produk/[...slug]/page.tsx
- pengajuan/page.tsx
- hero-section.tsx
- navbar.tsx
- dependencies
- SurveiKepuasanContent.tsx
- skm/page.tsx
- scripts
- DAGA Platform
- dashboard/demografi/page.tsx
- AdminPengaduan.tsx
- berita-list-client.tsx
- field-editor.tsx
- etl-permohonan.ts
- kelola-kartu.tsx
- notification-bell.tsx
- etl-demografi.ts
- berita/[slug]/page.tsx
- pengaturan-pelayanan.tsx
- KIAModal.tsx
- etl-master.ts
- dashboard/kritik-saran/page.tsx
- navigasi/page.tsx
- gis/page.tsx
- sitemap.xml/route.ts
- package.json
- react-dom
- produk/page.tsx
- react-leaflet
- eslint.config.mjs
- etl-chat.ts
- seed-berita.ts
- @reduxjs/toolkit
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

## Communities (182 total, 92 thin omitted)

### Community 0 - "KKPerubahanBiodataModal.tsx"
Cohesion: 0.08
Nodes (72): AktaKelahiranNikAdaModalProps, FormData, UploadedFile, AktaKelahiranNikTidakAdaModalProps, FormData, UploadedFile, AktaKematianModalProps, FormData (+64 more)

### Community 1 - "ok"
Cohesion: 0.07
Nodes (49): cekPetugas(), DELETE(), dynamic, GET(), PUT(), SaveRow, dynamic, GET() (+41 more)

### Community 2 - "statistik-export.ts"
Cohesion: 0.05
Nodes (68): dynamic, GET(), runtime, dynamic, GET(), POST(), runtime, BULAN_PENDEK (+60 more)

### Community 3 - "users/route.ts"
Cohesion: 0.11
Nodes (37): PATCH(), STATUS_VALID, GET(), NAMA_LEVEL, PATCH(), POST(), requireAdmin(), dynamic (+29 more)

### Community 4 - "struktur-editor.tsx"
Cohesion: 0.06
Nodes (41): EditorBox(), nextId(), parse(), Row, serialize(), StrukturEditor(), BulletItem(), CONTENT (+33 more)

### Community 5 - "AdminPermohonan.tsx"
Cohesion: 0.06
Nodes (48): AdminPermohonan(), ALASAN_TOLAK, BerkasItem, Detail, FINAL_STATUS, Item, STATUS, STATUS_KEYS (+40 more)

### Community 6 - "cn"
Cohesion: 0.15
Nodes (31): AktaKelahiranNikAdaModal(), AktaKelahiranNikTidakAdaModal(), AktaKematianModal(), AktaNikahModal(), AktaPerceraianModal(), KedatanganPendudukModal(), KIAModal(), KKCetakUlangModal() (+23 more)

### Community 7 - "auth.ts"
Cohesion: 0.08
Nodes (34): DELETE(), PUT(), requireAdmin(), uniqueSlug(), dynamic, maxDuration, POST(), runtime (+26 more)

### Community 8 - "utils.ts"
Cohesion: 0.09
Nodes (30): JamLayananEditor(), Toggle(), URUTAN_HARI, Values, OcrUploadButton(), OcrUploadButtonProps, OcrUploadResult, CheckStatus (+22 more)

### Community 9 - "select.tsx"
Cohesion: 0.16
Nodes (12): AKSI_STYLE, fmtWaktu(), LogAktivitasClient(), LogItem, Petugas, GROUPS, Produk, SelectGroup() (+4 more)

### Community 10 - "button.tsx"
Cohesion: 0.13
Nodes (18): Foto, KATEGORI, KOSONG, NotFound(), ProfilInitial, MediaUpload(), FotoBukti, fmtWaktu() (+10 more)

### Community 11 - "inline-edit.tsx"
Cohesion: 0.15
Nodes (18): Ctx, EditModeToggle(), InlineEditCtx, DemografiMetric(), fmt(), Row, ImageCropperDialog(), ImageCropperDialogProps (+10 more)

### Community 12 - "useStaticContent"
Cohesion: 0.16
Nodes (10): metadata, BlockEditorDialog(), MODE, PpidModeSelector(), ProdukDisdukcapilView(), ProdukItem, KebijakanPrivasiView(), listeners (+2 more)

### Community 13 - "informasi-index.tsx"
Cohesion: 0.13
Nodes (18): dynamic, metadata, dynamic, metadata, PpidInformasiIndex(), PpidTambahKartu(), PpidSubnav(), HalamanIndeksKartu() (+10 more)

### Community 14 - "getSession"
Cohesion: 0.13
Nodes (23): dynamic, GET(), PUT(), VALID, GET(), dynamic, findTiketFor(), GET() (+15 more)

### Community 15 - "statistik-kartu-editor.tsx"
Cohesion: 0.13
Nodes (25): BULAN_PENDEK, GET(), Conflict, DemografiEditor(), digits(), EditGrid(), EditRow, nid() (+17 more)

### Community 16 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 17 - "[action]/route.ts"
Cohesion: 0.12
Nodes (26): dynamic, POST(), POST(), POST(), GET(), POST(), ALLOWED_EXT, FETCH_ACTIONS (+18 more)

### Community 18 - "send/route.ts"
Cohesion: 0.16
Nodes (22): dynamic, POST(), runtime, terakhirKirim, dynamic, POST(), runtime, fonnteAktif() (+14 more)

### Community 19 - "RegisterContent.tsx"
Cohesion: 0.15
Nodes (16): metadata, Kecamatan, namaWilayah, RegisterPage(), MenuItem, menuItems, MenuPopuler(), Card() (+8 more)

### Community 22 - "PengajuanBaruClient.tsx"
Cohesion: 0.13
Nodes (16): DashboardPengajuanBaruPage(), dynamic, ICONS, PengajuanBaruClient(), SheetContent(), SheetDescription(), SheetFooter(), SheetHeader() (+8 more)

### Community 23 - "layanan-forms.ts"
Cohesion: 0.06
Nodes (39): FormPageClient(), AjukanPermohonanPage(), dynamic, generateMetadata(), dynamic, metadata, PilihLayananPage(), PilihLayananClient() (+31 more)

### Community 25 - "stats.tsx"
Cohesion: 0.09
Nodes (16): OFFICE_LAT, OFFICE_LNG, pulseIcon, base, FALLBACK, KartuDemografi, MapCard(), OfficeMap (+8 more)

### Community 26 - "ktp/route.ts"
Cohesion: 0.14
Nodes (19): dynamic, getWorker(), isValidNik(), KtpParsed, loadSharp(), maxDuration, normalizeDigits(), parseKtpText() (+11 more)

### Community 27 - "back-button.tsx"
Cohesion: 0.15
Nodes (12): AdminGaleri(), DashboardGaleriPage(), dynamic, DashboardKontenPage(), dynamic, DashboardLogPage(), dynamic, AdminMedia() (+4 more)

### Community 28 - "authSlice.ts"
Cohesion: 0.12
Nodes (16): ForgotPasswordPage(), LoginPage(), metadata, Providers(), SessionHydrator(), ResetPasswordPage(), useAppDispatch(), authSlice (+8 more)

### Community 29 - "info-content.ts"
Cohesion: 0.18
Nodes (10): HubungiKamiPage(), metadata, sections, WbsPage(), EditableInfoPage(), hubungiKamiContent, ppidContent, produkContent (+2 more)

### Community 30 - "halaman/[slug]/page.tsx"
Cohesion: 0.12
Nodes (22): AdminKonten(), flatten(), Leaf, MenuEntry, EditorNavigasi(), HalamanTambahanClient(), cariMenu(), dynamic (+14 more)

### Community 31 - "footer.tsx"
Cohesion: 0.10
Nodes (14): GaleriClient(), GalleryItem, metadata, INFO, metadata, metadata, dynamic, metadata (+6 more)

### Community 33 - "profil-kependudukan-view.tsx"
Cohesion: 0.25
Nodes (7): dynamic, metadata, ProfilKependudukanView(), tahunDari(), TambahDokumen(), PROFIL_KEPENDUDUKAN_KUNCI, useMediaQuery()

### Community 34 - "jam-layanan.ts"
Cohesion: 0.20
Nodes (14): formatTanggalId(), hariIniZona(), PanelJamTutup(), StatusJamLayanan, URUTAN_HARI, cekJamLayanan(), HARI_LABEL, JAM_TIMEZONE (+6 more)

### Community 35 - "components.json"
Cohesion: 0.10
Nodes (19): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+11 more)

### Community 36 - "dashboard-sidebar.tsx"
Cohesion: 0.13
Nodes (22): DashboardLayout(), dynamic, InlineEditProvider(), isPublicPage(), ADMIN_ONLY_GROUPS, ADMIN_ONLY_HREFS, DashboardSidebar(), DesktopSidebar() (+14 more)

### Community 37 - "app/page.tsx"
Cohesion: 0.14
Nodes (12): smoothEase, AlurLayanan(), ease, STEPS, ProfileTabs(), News, QuickHighlights(), tglID() (+4 more)

### Community 38 - "ppid/[...slug]/page.tsx"
Cohesion: 0.16
Nodes (13): bacaKonfigTab(), dynamic, LAYANAN_PPID_SLUGS, PpidPage(), PROFIL_TERHUBUNG, TENTANG_PPID_SLUGS, PpidCampur(), TAB (+5 more)

### Community 40 - "users/[id]/route.ts"
Cohesion: 0.29
Nodes (8): DELETE(), dynamic, GET(), DELETE(), dynamic, PUT(), hapusFotoKtp(), hapusFotoProfil()

### Community 41 - "demografi-view.tsx"
Cohesion: 0.14
Nodes (21): dynamic, GET(), runtime, dynamic, GET(), runtime, DemografiKategoriPage(), DemografiView() (+13 more)

### Community 42 - "AdminUsers.tsx"
Cohesion: 0.05
Nodes (38): POST(), CekStatusClient(), Hasil, IKON, metadata, AdminUser, AdminUsers(), DetailUser (+30 more)

### Community 43 - "accessibility-widget.tsx"
Cohesion: 0.12
Nodes (21): cormorant, geistMono, geistSans, metadata, montserrat, SKEMA_ORGANISASI, AccessibilityWidget(), SPACING_LABEL (+13 more)

### Community 44 - "syarat-ketentuan-view.tsx"
Cohesion: 0.19
Nodes (9): metadata, BAGIAN, Data, SyaratKetentuanView(), SyaratLayananTabs(), KasusLayanan, LayananSyarat, SYARAT_KATEGORI (+1 more)

### Community 45 - "parse/route.ts"
Cohesion: 0.20
Nodes (13): Conflict, dynamic, maxDuration, POST(), runtime, sig(), Variant, cellNum() (+5 more)

### Community 46 - "admin/skm/route.ts"
Cohesion: 0.23
Nodes (11): GET(), POST(), hitungIkm(), nilaiPerUnsur(), SKM_ASPEK, SKM_KENDALA_LAYANAN, SKM_LAYANAN, SKM_PENDIDIKAN (+3 more)

### Community 47 - "prisma"
Cohesion: 0.30
Nodes (9): dynamic, GET(), PUT(), dynamic, GET(), JAM_LAYANAN_KEY, sanitizeJamLayanan(), loadJamLayanan() (+1 more)

### Community 48 - "hooks.ts"
Cohesion: 0.29
Nodes (9): useAuth(), useGuestOnly(), useRequireAuth(), useUser(), AppDispatch, AppStore, makeStore(), RootState (+1 more)

### Community 49 - "galeri-profil.tsx"
Cohesion: 0.15
Nodes (15): EditableBlock(), useInlineEdit(), StatsGrid(), clampKolom(), fmtTanggal(), GaleriItem, GaleriProfilPpid(), idBaru() (+7 more)

### Community 50 - "static-content-registry.ts"
Cohesion: 0.22
Nodes (12): GET(), blokGaleriPpid(), blokHalamanTambahan(), blokInfoHalaman(), DKB_PERIODE_KUNCI, getStaticBlock(), getStaticDefaults(), INFO_SECTIONS (+4 more)

### Community 51 - "info-page.tsx"
Cohesion: 0.15
Nodes (11): dynamic, metadata, dynamic, metadata, metadata, PpidLayananHalaman(), PpidSeksi, InfoBerkas (+3 more)

### Community 52 - "peta-demografi.tsx"
Cohesion: 0.24
Nodes (11): fmt(), Marker, PetaDemografi(), Row, GEO_BY_NAMA, geoForWilayah(), KECAMATAN_GEO, KecamatanGeo (+3 more)

### Community 53 - "devDependencies"
Cohesion: 0.15
Nodes (13): eslint, devDependencies, eslint, prisma, puppeteer-core, @tailwindcss/typography, tsx, tw-animate-css (+5 more)

### Community 54 - "admin/berita/route.ts"
Cohesion: 0.70
Nodes (4): GET(), POST(), requireAdmin(), uniqueSlug()

### Community 55 - "produk/[...slug]/page.tsx"
Cohesion: 0.32
Nodes (6): dynamic, ProdukPage(), DOKUMEN_KATEGORI, DOKUMEN_KEYS, dokumenJenisForPath(), DokumenKategori

### Community 56 - "pengajuan/page.tsx"
Cohesion: 0.23
Nodes (7): dynamic, UserPengajuanPage(), Permohonan, RiwayatList(), STATUS_CONFIG, TABS, useInfiniteScroll()

### Community 57 - "hero-section.tsx"
Cohesion: 0.17
Nodes (10): CarouselSlide, DEFAULT_SLIDES, ElegantCarousel(), ElegantCarouselProps, TODO: ganti `image` dengan foto asli DAGA/Disdukcapil Tidore Kepulauan —, TEXT_VARIANTS, ease, HeroSection() (+2 more)

### Community 58 - "navbar.tsx"
Cohesion: 0.22
Nodes (10): DropdownItem(), DropdownMenu(), isExternalHref(), KELAS_ITEM_MENU, MobileItemIcon(), MobileMenuItem(), Navbar(), navigationIcons (+2 more)

### Community 59 - "dependencies"
Cohesion: 0.18
Nodes (11): animejs, bcryptjs, dependencies, animejs, bcryptjs, react-advanced-cropper, react-organizational-chart, sharp (+3 more)

### Community 60 - "SurveiKepuasanContent.tsx"
Cohesion: 0.33
Nodes (4): metadata, SurveiKepuasanContent(), SurveyKepuasanForm(), SURVEI_KEPUASAN_KUNCI

### Community 61 - "skm/page.tsx"
Cohesion: 0.24
Nodes (8): DashboardSkmPage(), dynamic, AspekRata, Data, MasukanLayanan, mutu(), Responden, SkmDashboard()

### Community 62 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:generate, db:migrate, db:push, db:seed, db:studio, dev (+2 more)

### Community 63 - "DAGA Platform"
Cohesion: 0.29
Nodes (6): Akun demo (setelah seed), DAGA Platform, Deploy ke cPanel (ringkas), Menjalankan (lokal), Status migrasi, Struktur

### Community 64 - "dashboard/demografi/page.tsx"
Cohesion: 0.40
Nodes (4): AdminDemografi(), downloadFile(), DashboardDemografiPage(), dynamic

### Community 65 - "AdminPengaduan.tsx"
Cohesion: 0.28
Nodes (6): AdminPengaduan(), FILTERS, Item, pisahBukti(), DashboardPengaduanPage(), dynamic

### Community 66 - "berita-list-client.tsx"
Cohesion: 0.31
Nodes (5): ArticleCard(), BeritaListClient(), News, tglID(), metadata

### Community 67 - "field-editor.tsx"
Cohesion: 0.08
Nodes (21): AdminBerita(), EMPTY, FormState, News, DashboardBeritaPage(), dynamic, FieldEditor(), IconColumnInput() (+13 more)

### Community 68 - "etl-permohonan.ts"
Cohesion: 0.28
Nodes (8): findKey(), JENIS_TANPA_DATA_LAMA, main(), mapStatus(), prisma, SOURCE, TABEL_JENIS, USER_LEVELS

### Community 69 - "kelola-kartu.tsx"
Cohesion: 0.26
Nodes (10): StatCard(), FormKartu(), simpan(), keSlug(), PpidAksiKartu(), hapus(), simpanDaftar(), getIcon() (+2 more)

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

### Community 77 - "navigasi/page.tsx"
Cohesion: 0.50
Nodes (3): DashboardNavigasiPage(), dynamic, metadata

### Community 78 - "gis/page.tsx"
Cohesion: 0.40
Nodes (3): metadata, PetaDemografi, PetaDemografiLoader()

### Community 79 - "sitemap.xml/route.ts"
Cohesion: 0.40
Nodes (5): amanXml(), dynamic, Entri, GET(), RUTE_TETAP

### Community 80 - "package.json"
Cohesion: 0.33
Nodes (5): name, prisma, seed, private, version

### Community 82 - "produk/page.tsx"
Cohesion: 0.40
Nodes (4): AdminProduk(), DashboardProdukPage(), dynamic, getDokumenKategori()

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
- **568 isolated node(s):** `Akun demo (setelah seed)`, `Struktur`, `Status migrasi`, `Deploy ke cPanel (ringkas)`, `geistSans` (+563 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 707 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **92 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `KKPerubahanBiodataModal.tsx`, `struktur-editor.tsx`, `AdminPermohonan.tsx`, `utils.ts`, `select.tsx`, `button.tsx`, `inline-edit.tsx`, `useStaticContent`, `informasi-index.tsx`, `statistik-kartu-editor.tsx`, `RegisterContent.tsx`, `PengajuanBaruClient.tsx`, `layanan-forms.ts`, `stats.tsx`, `halaman/[slug]/page.tsx`, `profil-kependudukan-view.tsx`, `jam-layanan.ts`, `dashboard-sidebar.tsx`, `app/page.tsx`, `demografi-view.tsx`, `AdminUsers.tsx`, `accessibility-widget.tsx`, `galeri-profil.tsx`, `info-page.tsx`, `navbar.tsx`, `field-editor.tsx`, `kelola-kartu.tsx`, `notification-bell.tsx`, `pengaturan-pelayanan.tsx`, `KIAModal.tsx`?**
  _High betweenness centrality (0.112) - this node is a cross-community bridge._
- **Why does `getSession()` connect `getSession` to `ok`, `statistik-export.ts`, `users/route.ts`, `AdminPermohonan.tsx`, `auth.ts`, `informasi-index.tsx`, `[action]/route.ts`, `PengajuanBaruClient.tsx`, `layanan-forms.ts`, `ktp/route.ts`, `back-button.tsx`, `footer.tsx`, `dashboard-sidebar.tsx`, `users/[id]/route.ts`, `demografi-view.tsx`, `AdminUsers.tsx`, `parse/route.ts`, `admin/skm/route.ts`, `prisma`, `admin/berita/route.ts`, `pengajuan/page.tsx`, `skm/page.tsx`, `dashboard/demografi/page.tsx`, `AdminPengaduan.tsx`, `field-editor.tsx`, `dashboard/kritik-saran/page.tsx`, `navigasi/page.tsx`, `produk/page.tsx`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Why does `prisma` connect `prisma` to `ok`, `statistik-export.ts`, `users/route.ts`, `AdminPermohonan.tsx`, `auth.ts`, `informasi-index.tsx`, `getSession`, `statistik-kartu-editor.tsx`, `[action]/route.ts`, `halaman/[slug]/page.tsx`, `profil-kependudukan-view.tsx`, `ppid/[...slug]/page.tsx`, `users/[id]/route.ts`, `demografi-view.tsx`, `AdminUsers.tsx`, `parse/route.ts`, `admin/skm/route.ts`, `static-content-registry.ts`, `info-page.tsx`, `admin/berita/route.ts`, `produk/[...slug]/page.tsx`, `berita/[slug]/page.tsx`, `sitemap.xml/route.ts`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **What connects `Akun demo (setelah seed)`, `Struktur`, `Status migrasi` to the rest of the system?**
  _568 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `KKPerubahanBiodataModal.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08327613818348203 - nodes in this community are weakly interconnected._
- **Should `ok` be split into smaller, more focused modules?**
  _Cohesion score 0.06997408367271381 - nodes in this community are weakly interconnected._
- **Should `statistik-export.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.051615051615051616 - nodes in this community are weakly interconnected._