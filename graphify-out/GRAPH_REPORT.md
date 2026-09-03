# Graph Report - tidore-platform  (2026-09-03)

## Corpus Check
- 347 files · ~239,822 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1871 nodes · 5118 edges · 188 communities (88 shown, 92 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a29829aa`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- AktaKelahiranNikAdaModal.tsx
- ok
- statistik-export.ts
- users/route.ts
- profile-tabs.tsx
- AdminPermohonan.tsx
- AktaNikahModal.tsx
- auth.ts
- AktaPerceraianModal.tsx
- staff-pengajuan-form.tsx
- button.tsx
- inline-edit.tsx
- useStaticContent
- informasi-index.tsx
- getSession
- statistik-kartu-editor.tsx
- compilerOptions
- [action]/route.ts
- send/route.ts
- LoginContent.tsx
- App\Http\Controllers\Controller
- Illuminate\Http\Request
- PengajuanBaruClient.tsx
- layanan-forms.ts
- Auth
- stats.tsx
- ktp/route.ts
- back-button.tsx
- authSlice.ts
- static-content-registry.ts
- halaman/[slug]/page.tsx
- galeri-client.tsx
- Validator
- fail
- jam-layanan.ts
- components.json
- dashboard-sidebar.tsx
- app/page.tsx
- ppid/[...slug]/page.tsx
- App\Models\Fronts\Permohonans\KedatanganModel
- users/[id]/route.ts
- Footer
- AdminUsers.tsx
- accessibility-widget.tsx
- RegisterContent.tsx
- parse/route.ts
- admin/skm/route.ts
- [layanan]/page.tsx
- hooks.ts
- galeri-profil.tsx
- struktur-chart.tsx
- info-page.tsx
- peta-demografi.tsx
- devDependencies
- berita/[id]/route.ts
- Journal — TIDORE / DAGA (`tidore-platform`)
- pengajuan/page.tsx
- hero-section.tsx
- navbar.tsx
- dependencies
- footer.tsx
- skm/page.tsx
- scripts
- DAGA Platform
- AktaKematianModal.tsx
- AdminPengaduan.tsx
- berita-list-client.tsx
- cn
- etl-permohonan.ts
- kelola-kartu.tsx
- useAppSelector
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
- akun-status.ts
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
- app/layout.tsx
- react-day-picker
- react-dropzone
- react-google-recaptcha-v3
- formulir-ppid/page.tsx
- react-redux
- media/page.tsx
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
- pengajuan-baru/page.tsx
- StaffPengajuanForm
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
- `EditModeToggle()` --calls--> `cn()`  [EXTRACTED]
  components/konten/inline-edit.tsx → lib/utils.ts
- `DialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  components/ui/dialog.tsx → lib/utils.ts
- `DashboardBeritaPage()` --calls--> `getSession()`  [EXTRACTED]
  app/dashboard/berita/page.tsx → lib/auth.ts
- `DashboardDemografiPage()` --calls--> `getSession()`  [EXTRACTED]
  app/dashboard/demografi/page.tsx → lib/auth.ts
- `DashboardGaleriPage()` --calls--> `getSession()`  [EXTRACTED]
  app/dashboard/galeri/page.tsx → lib/auth.ts

## Import Cycles
- None detected.

## Communities (188 total, 92 thin omitted)

### Community 0 - "AktaKelahiranNikAdaModal.tsx"
Cohesion: 0.09
Nodes (52): AktaKelahiranNikAdaModalProps, FormData, UploadedFile, AktaKelahiranNikTidakAdaModalProps, FormData, UploadedFile, d(), FORM_PERMOHONAN (+44 more)

### Community 1 - "ok"
Cohesion: 0.10
Nodes (31): DELETE(), dynamic, GET(), GET(), GET(), DELETE(), PUT(), POST() (+23 more)

### Community 2 - "statistik-export.ts"
Cohesion: 0.05
Nodes (68): dynamic, GET(), runtime, dynamic, GET(), POST(), runtime, BULAN_PENDEK (+60 more)

### Community 3 - "users/route.ts"
Cohesion: 0.18
Nodes (25): PATCH(), STATUS_VALID, GET(), NAMA_LEVEL, PATCH(), POST(), requireAdmin(), POST() (+17 more)

### Community 4 - "profile-tabs.tsx"
Cohesion: 0.13
Nodes (17): BulletItem(), CONTENT, easeCustom, fadeUp(), GAMBAR_OVERRIDE_TABS, GambarPanel(), MaklumatPanel(), MottoPanel() (+9 more)

### Community 5 - "AdminPermohonan.tsx"
Cohesion: 0.07
Nodes (46): AdminPermohonan(), ALASAN_TOLAK, BerkasItem, Detail, FINAL_STATUS, Item, STATUS, STATUS_KEYS (+38 more)

### Community 6 - "AktaNikahModal.tsx"
Cohesion: 0.14
Nodes (22): AktaKelahiranNikAdaModal(), AktaKelahiranNikTidakAdaModal(), AktaNikahModal(), AktaNikahModalProps, FormData, UploadedFile, KedatanganPendudukModal(), KKCetakUlangModal() (+14 more)

### Community 7 - "auth.ts"
Cohesion: 0.07
Nodes (38): dynamic, maxDuration, POST(), runtime, dynamic, GET(), PUT(), dynamic (+30 more)

### Community 8 - "AktaPerceraianModal.tsx"
Cohesion: 0.18
Nodes (11): AktaPerceraianModal(), AktaPerceraianModalProps, FormData, UploadedFile, KkScanFieldProps, OcrUploadButton(), OcrUploadButtonProps, OcrUploadResult (+3 more)

### Community 9 - "staff-pengajuan-form.tsx"
Cohesion: 0.16
Nodes (20): AKSI_STYLE, fmtWaktu(), LogAktivitasClient(), LogItem, Petugas, KOSONG, GROUPS, Produk (+12 more)

### Community 10 - "button.tsx"
Cohesion: 0.11
Nodes (23): Hasil, IKON, EMPTY, FormState, News, Foto, KATEGORI, ProfilInitial (+15 more)

### Community 11 - "inline-edit.tsx"
Cohesion: 0.14
Nodes (22): Ctx, EditModeToggle(), InlineEditCtx, nextId(), parse(), Row, serialize(), StrukturEditor() (+14 more)

### Community 12 - "useStaticContent"
Cohesion: 0.10
Nodes (18): metadata, metadata, MODE, PpidModeSelector(), ProdukDisdukcapilView(), ProdukItem, KebijakanPrivasiView(), BAGIAN (+10 more)

### Community 13 - "informasi-index.tsx"
Cohesion: 0.12
Nodes (19): dynamic, metadata, dynamic, metadata, PpidInformasiIndex(), PpidTambahKartu(), PpidSubnav(), HalamanIndeksKartu() (+11 more)

### Community 14 - "getSession"
Cohesion: 0.14
Nodes (22): GET(), GET(), GET(), GET(), dynamic, findTiketFor(), GET(), PATCH() (+14 more)

### Community 15 - "statistik-kartu-editor.tsx"
Cohesion: 0.12
Nodes (26): BULAN_PENDEK, GET(), Conflict, DemografiEditor(), digits(), EditGrid(), EditRow, nid() (+18 more)

### Community 16 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 17 - "[action]/route.ts"
Cohesion: 0.14
Nodes (23): PATCH(), STATUS_VALID, dynamic, POST(), POST(), POST(), ALLOWED_EXT, FETCH_ACTIONS (+15 more)

### Community 18 - "send/route.ts"
Cohesion: 0.16
Nodes (22): dynamic, POST(), runtime, terakhirKirim, dynamic, POST(), runtime, fonnteAktif() (+14 more)

### Community 19 - "LoginContent.tsx"
Cohesion: 0.23
Nodes (12): ResetPasswordPage(), MenuItem, menuItems, MenuPopuler(), Card(), CardAction(), CardContent(), CardDescription() (+4 more)

### Community 22 - "PengajuanBaruClient.tsx"
Cohesion: 0.16
Nodes (14): ICONS, Sheet(), SheetContent(), SheetDescription(), SheetFooter(), SheetHeader(), SheetOverlay(), SheetTitle() (+6 more)

### Community 23 - "layanan-forms.ts"
Cohesion: 0.10
Nodes (21): Props, catatanSection, f(), FieldDef, FieldType, kelahiranDokumen, kelahiranSections(), LayananForm (+13 more)

### Community 25 - "stats.tsx"
Cohesion: 0.09
Nodes (17): OFFICE_LAT, OFFICE_LNG, pulseIcon, base, FALLBACK, KartuDemografi, MapCard(), OfficeMap (+9 more)

### Community 26 - "ktp/route.ts"
Cohesion: 0.14
Nodes (19): dynamic, getWorker(), isValidNik(), KtpParsed, loadSharp(), maxDuration, normalizeDigits(), parseKtpText() (+11 more)

### Community 27 - "back-button.tsx"
Cohesion: 0.11
Nodes (17): AdminBerita(), DashboardBeritaPage(), dynamic, AdminDemografi(), downloadFile(), DashboardDemografiPage(), dynamic, AdminGaleri() (+9 more)

### Community 28 - "authSlice.ts"
Cohesion: 0.15
Nodes (13): ForgotPasswordPage(), LoginPage(), metadata, SessionHydrator(), useAppDispatch(), authSlice, AuthState, checkNikKk (+5 more)

### Community 29 - "static-content-registry.ts"
Cohesion: 0.11
Nodes (23): GET(), HubungiKamiPage(), metadata, sections, WbsPage(), BlockEditorDialog(), hubungiKamiContent, ppidContent (+15 more)

### Community 30 - "halaman/[slug]/page.tsx"
Cohesion: 0.08
Nodes (27): AdminKonten(), flatten(), Leaf, MenuEntry, DashboardKontenPage(), dynamic, EditorNavigasi(), HalamanTambahanClient() (+19 more)

### Community 31 - "galeri-client.tsx"
Cohesion: 0.40
Nodes (3): GaleriClient(), GalleryItem, metadata

### Community 33 - "fail"
Cohesion: 0.12
Nodes (19): cekPetugas(), DELETE(), dynamic, GET(), PUT(), SaveRow, GET(), ALLOWED_EXT (+11 more)

### Community 34 - "jam-layanan.ts"
Cohesion: 0.14
Nodes (23): dynamic, GET(), JamLayananEditor(), Toggle(), URUTAN_HARI, formatTanggalId(), hariIniZona(), PanelJamTutup() (+15 more)

### Community 35 - "components.json"
Cohesion: 0.10
Nodes (19): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+11 more)

### Community 36 - "dashboard-sidebar.tsx"
Cohesion: 0.15
Nodes (17): DashboardLayout(), dynamic, ADMIN_ONLY_GROUPS, ADMIN_ONLY_HREFS, DashboardSidebar(), DesktopSidebar(), GROUPS, groupsForLevel() (+9 more)

### Community 37 - "app/page.tsx"
Cohesion: 0.13
Nodes (13): smoothEase, AlurLayanan(), ease, STEPS, ProfileTabs(), News, QuickHighlights(), tglID() (+5 more)

### Community 38 - "ppid/[...slug]/page.tsx"
Cohesion: 0.09
Nodes (22): bacaKonfigTab(), dynamic, LAYANAN_PPID_SLUGS, PpidPage(), PROFIL_TERHUBUNG, TENTANG_PPID_SLUGS, dynamic, ProdukPage() (+14 more)

### Community 40 - "users/[id]/route.ts"
Cohesion: 0.19
Nodes (15): DELETE(), dynamic, GET(), DELETE(), dynamic, PUT(), adalahDataUrlGambar(), DIR_KTP (+7 more)

### Community 41 - "Footer"
Cohesion: 0.12
Nodes (23): dynamic, GET(), runtime, dynamic, GET(), runtime, metadata, DemografiKategoriPage() (+15 more)

### Community 42 - "AdminUsers.tsx"
Cohesion: 0.06
Nodes (38): AdminUser, AdminUsers(), DetailUser, EMPTY_FORM, fmtTanggal(), GRUP_AKUN, GrupKey, IsiDetail() (+30 more)

### Community 43 - "accessibility-widget.tsx"
Cohesion: 0.21
Nodes (14): AccessibilityWidget(), SPACING_LABEL, TileButton(), A11Y_INIT_SCRIPT, A11Y_STORAGE_KEY, A11yPrefs, applyPrefs(), DEFAULT_PREFS (+6 more)

### Community 44 - "RegisterContent.tsx"
Cohesion: 0.14
Nodes (8): CekStatusClient(), metadata, metadata, Kecamatan, namaWilayah, RegisterPage(), labelKolom(), registerUser

### Community 45 - "parse/route.ts"
Cohesion: 0.20
Nodes (13): Conflict, dynamic, maxDuration, POST(), runtime, sig(), Variant, cellNum() (+5 more)

### Community 46 - "admin/skm/route.ts"
Cohesion: 0.23
Nodes (11): GET(), POST(), hitungIkm(), nilaiPerUnsur(), SKM_ASPEK, SKM_KENDALA_LAYANAN, SKM_LAYANAN, SKM_PENDIDIKAN (+3 more)

### Community 47 - "[layanan]/page.tsx"
Cohesion: 0.17
Nodes (12): AjukanPermohonanPage(), dynamic, generateMetadata(), dynamic, metadata, PilihLayananPage(), PilihLayananClient(), getLayanan() (+4 more)

### Community 48 - "hooks.ts"
Cohesion: 0.29
Nodes (9): useAuth(), useGuestOnly(), useRequireAuth(), useUser(), AppDispatch, AppStore, makeStore(), RootState (+1 more)

### Community 49 - "galeri-profil.tsx"
Cohesion: 0.13
Nodes (15): clampKolom(), fmtTanggal(), GaleriItem, GaleriProfilPpid(), idBaru(), KOLOM_PILIHAN, Lebar, LinkItem (+7 more)

### Community 50 - "struktur-chart.tsx"
Cohesion: 0.21
Nodes (11): EditorBox(), StrukturChart, OrgBox(), StrukturChart, adalahPuncak(), gayaTingkat, GRADIEN_PIMPINAN, OrgNode (+3 more)

### Community 51 - "info-page.tsx"
Cohesion: 0.19
Nodes (13): metadata, dynamic, metadata, EditableBlock(), useInlineEdit(), PpidSeksi, ProfilKependudukanView(), tahunDari() (+5 more)

### Community 52 - "peta-demografi.tsx"
Cohesion: 0.24
Nodes (11): fmt(), Marker, PetaDemografi(), Row, GEO_BY_NAMA, geoForWilayah(), KECAMATAN_GEO, KecamatanGeo (+3 more)

### Community 53 - "devDependencies"
Cohesion: 0.15
Nodes (13): eslint, devDependencies, eslint, prisma, puppeteer-core, @tailwindcss/typography, tsx, tw-animate-css (+5 more)

### Community 54 - "berita/[id]/route.ts"
Cohesion: 0.32
Nodes (9): DELETE(), PUT(), requireAdmin(), uniqueSlug(), GET(), POST(), requireAdmin(), uniqueSlug() (+1 more)

### Community 55 - "Journal — TIDORE / DAGA (`tidore-platform`)"
Cohesion: 0.14
Nodes (13): 1. Identitas project, 2. Dua aplikasi, satu VPS, satu domain, 3. 🔴 Lima hal berbahaya kalau lupa, 4. Keadaan repo per 8 Agu 2026 — **43 berkas menggantung**, 5. Sudah live & terverifikasi (7 Agu dini hari) — jangan dikerjakan ulang, 5b. Menu "Profil Kependudukan" — SELESAI di kode, BELUM di-deploy (14 Agu), 6. Antrean, 7. Jebakan (+5 more)

### Community 56 - "pengajuan/page.tsx"
Cohesion: 0.23
Nodes (7): dynamic, UserPengajuanPage(), Permohonan, RiwayatList(), STATUS_CONFIG, TABS, useInfiniteScroll()

### Community 57 - "hero-section.tsx"
Cohesion: 0.17
Nodes (10): CarouselSlide, DEFAULT_SLIDES, ElegantCarousel(), ElegantCarouselProps, TODO: ganti `image` dengan foto asli DAGA/Disdukcapil Tidore Kepulauan —, TEXT_VARIANTS, ease, HeroSection() (+2 more)

### Community 58 - "navbar.tsx"
Cohesion: 0.19
Nodes (12): AuthArea(), DropdownItem(), DropdownMenu(), isExternalHref(), KELAS_ITEM_MENU, MobileItemIcon(), MobileMenuItem(), Navbar() (+4 more)

### Community 59 - "dependencies"
Cohesion: 0.18
Nodes (11): animejs, bcryptjs, dependencies, animejs, bcryptjs, react-advanced-cropper, react-organizational-chart, sharp (+3 more)

### Community 60 - "footer.tsx"
Cohesion: 0.20
Nodes (7): metadata, SurveiKepuasanContent(), grup, SurveyKepuasanForm(), Stats, VisitorCount(), SURVEI_KEPUASAN_KUNCI

### Community 61 - "skm/page.tsx"
Cohesion: 0.24
Nodes (8): DashboardSkmPage(), dynamic, AspekRata, Data, MasukanLayanan, mutu(), Responden, SkmDashboard()

### Community 62 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:generate, db:migrate, db:push, db:seed, db:studio, dev (+2 more)

### Community 63 - "DAGA Platform"
Cohesion: 0.29
Nodes (6): Akun demo (setelah seed), DAGA Platform, Deploy ke cPanel (ringkas), Menjalankan (lokal), Status migrasi, Struktur

### Community 64 - "AktaKematianModal.tsx"
Cohesion: 0.19
Nodes (11): AktaKematianModal(), AktaKematianModalProps, FormData, UploadedFile, HOURS, isJam(), masker(), MINUTES (+3 more)

### Community 65 - "AdminPengaduan.tsx"
Cohesion: 0.28
Nodes (6): AdminPengaduan(), FILTERS, Item, pisahBukti(), DashboardPengaduanPage(), dynamic

### Community 66 - "berita-list-client.tsx"
Cohesion: 0.31
Nodes (5): ArticleCard(), BeritaListClient(), News, tglID(), metadata

### Community 67 - "cn"
Cohesion: 0.10
Nodes (27): NotFound(), FieldEditor(), IconColumnInput(), ImageColumnInput(), ImagePickerFieldProps, MediaPicker(), MediaPickerProps, MediaItem (+19 more)

### Community 68 - "etl-permohonan.ts"
Cohesion: 0.28
Nodes (8): findKey(), JENIS_TANPA_DATA_LAMA, main(), mapStatus(), prisma, SOURCE, TABEL_JENIS, USER_LEVELS

### Community 69 - "kelola-kartu.tsx"
Cohesion: 0.33
Nodes (8): StatCard(), FormKartu(), simpan(), keSlug(), PpidAksiKartu(), hapus(), simpanDaftar(), getIcon()

### Community 70 - "useAppSelector"
Cohesion: 0.23
Nodes (12): FormPageClient(), InlineEditProvider(), isPublicPage(), getAudioCtx(), NotificationBell(), Notifikasi, playDing(), TIPE_ICON (+4 more)

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
Cohesion: 0.17
Nodes (14): EMPTY_FORM, FILE_FIELDS, FormData, KIAModal(), KIAModalProps, NIK_FIELDS, UploadedFile, buttonVariants (+6 more)

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

### Community 88 - "akun-status.ts"
Cohesion: 0.26
Nodes (9): dynamic, POST(), POST(), INFO_STATUS, infoStatus, pesanLoginStatus(), STATUS_AKUN, StatusAkun (+1 more)

### Community 89 - "etl-berkas.ts"
Cohesion: 0.67
Nodes (3): main(), mimeOf(), prisma

### Community 90 - "gen-lookup.ts"
Cohesion: 0.67
Nodes (3): GROUPS, main(), norm()

### Community 122 - "app/layout.tsx"
Cohesion: 0.20
Nodes (8): cormorant, geistMono, geistSans, metadata, montserrat, SKEMA_ORGANISASI, Providers(), KunjunganPing()

### Community 126 - "formulir-ppid/page.tsx"
Cohesion: 0.22
Nodes (5): dynamic, metadata, dynamic, metadata, PpidLayananHalaman()

### Community 128 - "media/page.tsx"
Cohesion: 0.40
Nodes (4): AdminMedia(), fmtSize(), DashboardMediaPage(), dynamic

### Community 185 - "pengajuan-baru/page.tsx"
Cohesion: 0.50
Nodes (3): DashboardPengajuanBaruPage(), dynamic, PengajuanBaruClient()

### Community 186 - "StaffPengajuanForm"
Cohesion: 0.67
Nodes (3): StaffPengajuanForm(), useStatusJamLayanan(), useImageViewer()

## Knowledge Gaps
- **579 isolated node(s):** `1. Identitas project`, `2. Dua aplikasi, satu VPS, satu domain`, `3. 🔴 Lima hal berbahaya kalau lupa`, `4. Keadaan repo per 8 Agu 2026 — **43 berkas menggantung**`, `5. Sudah live & terverifikasi (7 Agu dini hari) — jangan dikerjakan ulang` (+574 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 719 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **92 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `AktaKelahiranNikAdaModal.tsx`, `profile-tabs.tsx`, `AdminPermohonan.tsx`, `AktaNikahModal.tsx`, `AktaPerceraianModal.tsx`, `staff-pengajuan-form.tsx`, `button.tsx`, `inline-edit.tsx`, `useStaticContent`, `informasi-index.tsx`, `statistik-kartu-editor.tsx`, `LoginContent.tsx`, `PengajuanBaruClient.tsx`, `stats.tsx`, `static-content-registry.ts`, `halaman/[slug]/page.tsx`, `jam-layanan.ts`, `dashboard-sidebar.tsx`, `app/page.tsx`, `Footer`, `AdminUsers.tsx`, `accessibility-widget.tsx`, `[layanan]/page.tsx`, `struktur-chart.tsx`, `info-page.tsx`, `StaffPengajuanForm`, `navbar.tsx`, `AktaKematianModal.tsx`, `kelola-kartu.tsx`, `useAppSelector`, `pengaturan-pelayanan.tsx`, `KIAModal.tsx`, `formulir-ppid/page.tsx`?**
  _High betweenness centrality (0.151) - this node is a cross-community bridge._
- **Why does `getSession()` connect `getSession` to `media/page.tsx`, `ok`, `statistik-export.ts`, `users/route.ts`, `AdminPermohonan.tsx`, `auth.ts`, `informasi-index.tsx`, `[action]/route.ts`, `ktp/route.ts`, `back-button.tsx`, `halaman/[slug]/page.tsx`, `fail`, `dashboard-sidebar.tsx`, `users/[id]/route.ts`, `Footer`, `AdminUsers.tsx`, `parse/route.ts`, `admin/skm/route.ts`, `[layanan]/page.tsx`, `berita/[id]/route.ts`, `pengajuan/page.tsx`, `pengajuan-baru/page.tsx`, `skm/page.tsx`, `AdminPengaduan.tsx`, `dashboard/kritik-saran/page.tsx`, `navigasi/page.tsx`, `produk/page.tsx`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Why does `prisma` connect `ok` to `statistik-export.ts`, `users/route.ts`, `AdminPermohonan.tsx`, `auth.ts`, `informasi-index.tsx`, `getSession`, `statistik-kartu-editor.tsx`, `[action]/route.ts`, `static-content-registry.ts`, `halaman/[slug]/page.tsx`, `fail`, `jam-layanan.ts`, `ppid/[...slug]/page.tsx`, `users/[id]/route.ts`, `Footer`, `AdminUsers.tsx`, `parse/route.ts`, `admin/skm/route.ts`, `info-page.tsx`, `berita/[id]/route.ts`, `berita/[slug]/page.tsx`, `sitemap.xml/route.ts`, `akun-status.ts`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._
- **What connects `1. Identitas project`, `2. Dua aplikasi, satu VPS, satu domain`, `3. 🔴 Lima hal berbahaya kalau lupa` to the rest of the system?**
  _579 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `AktaKelahiranNikAdaModal.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08516242317822652 - nodes in this community are weakly interconnected._
- **Should `ok` be split into smaller, more focused modules?**
  _Cohesion score 0.09579100145137881 - nodes in this community are weakly interconnected._
- **Should `statistik-export.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.051615051615051616 - nodes in this community are weakly interconnected._