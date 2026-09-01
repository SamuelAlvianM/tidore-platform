# Graph Report - tidore-platform  (2026-09-01)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 1874 nodes · 5125 edges · 184 communities (77 shown, 91 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7004aa3d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13
- Community 14
- Community 15
- Community 16
- Community 17
- Community 18
- Community 19
- Community 20
- Community 21
- Community 22
- Community 23
- Community 24
- Community 25
- Community 26
- Community 27
- Community 28
- Community 29
- Community 30
- Community 31
- Community 32
- Community 33
- Community 34
- Community 35
- Community 36
- Community 37
- Community 38
- Community 39
- Community 40
- Community 41
- Community 42
- Community 43
- Community 44
- Community 45
- Community 46
- Community 47
- Community 48
- Community 49
- Community 50
- Community 51
- Community 52
- Community 53
- Community 54
- Community 55
- Community 56
- Community 57
- Community 58
- Community 59
- Community 60
- Community 61
- Community 62
- Community 63
- Community 64
- Community 65
- Community 66
- Community 67
- Community 68
- Community 69
- Community 70
- Community 71
- Community 72
- Community 73
- Community 74
- Community 75
- Community 76
- Community 77
- Community 78
- Community 79
- Community 80
- Community 81
- Community 82
- Community 83
- Community 90
- Community 91
- Community 92
- Community 93
- Community 94
- Community 95
- Community 96
- Community 97
- Community 98
- Community 99
- Community 100
- Community 101
- Community 102
- Community 103
- Community 104
- Community 105
- Community 106
- Community 107
- Community 108
- Community 109
- Community 110
- Community 111
- Community 112
- Community 113
- Community 114
- Community 115
- Community 116
- Community 117
- Community 118
- Community 119
- Community 120
- Community 121
- Community 122
- Community 123
- Community 124
- Community 125
- Community 126
- Community 127
- Community 128
- Community 129
- Community 130
- Community 131
- Community 132
- Community 133
- Community 134
- Community 135
- Community 136
- Community 137
- Community 138
- Community 139
- Community 140
- Community 141
- Community 142
- Community 143
- Community 144
- Community 145
- Community 146
- Community 147
- Community 148
- Community 149
- Community 150
- Community 151
- Community 152
- Community 153
- Community 154
- Community 155
- Community 156
- Community 157
- Community 158
- Community 159
- Community 160
- Community 161
- Community 162
- Community 163
- Community 166
- Community 167
- Community 175
- Community 176
- Community 177
- Community 178
- Community 179
- Community 181
- Community 182
- Community 183

## God Nodes (most connected - your core abstractions)
1. `cn()` - 201 edges
2. `ok()` - 147 edges
3. `getSession()` - 146 edges
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

## Communities (184 total, 91 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.09
Nodes (66): AktaKelahiranNikAdaModalProps, FormData, UploadedFile, AktaKelahiranNikTidakAdaModalProps, FormData, UploadedFile, AktaKematianModalProps, FormData (+58 more)

### Community 1 - "Community 1"
Cohesion: 0.08
Nodes (50): cekPetugas(), DELETE(), dynamic, GET(), PUT(), SaveRow, DELETE(), dynamic (+42 more)

### Community 2 - "Community 2"
Cohesion: 0.05
Nodes (68): dynamic, GET(), runtime, dynamic, GET(), POST(), runtime, BULAN_PENDEK (+60 more)

### Community 3 - "Community 3"
Cohesion: 0.07
Nodes (42): EMPTY, FormState, News, Foto, KATEGORI, AKSI_STYLE, fmtWaktu(), LogAktivitasClient() (+34 more)

### Community 4 - "Community 4"
Cohesion: 0.06
Nodes (48): AdminPermohonan(), ALASAN_TOLAK, BerkasItem, Detail, FINAL_STATUS, Item, STATUS, STATUS_KEYS (+40 more)

### Community 5 - "Community 5"
Cohesion: 0.06
Nodes (39): CekStatusClient(), Hasil, IKON, metadata, AdminUser, AdminUsers(), DetailUser, EMPTY_FORM (+31 more)

### Community 6 - "Community 6"
Cohesion: 0.08
Nodes (31): ForgotPasswordPage(), LoginPage(), metadata, Providers(), SessionHydrator(), metadata, Kecamatan, namaWilayah (+23 more)

### Community 7 - "Community 7"
Cohesion: 0.09
Nodes (40): AktaKelahiranNikAdaModal(), AktaKelahiranNikTidakAdaModal(), AktaKematianModal(), AktaNikahModal(), AktaPerceraianModal(), KedatanganPendudukModal(), KIAModal(), KKCetakUlangModal() (+32 more)

### Community 8 - "Community 8"
Cohesion: 0.08
Nodes (34): EditorBox(), nextId(), parse(), Row, serialize(), StrukturEditor(), BulletItem(), CONTENT (+26 more)

### Community 9 - "Community 9"
Cohesion: 0.08
Nodes (30): HubungiKamiPage(), dynamic, ProdukPage(), metadata, sections, WbsPage(), EditableInfoPage(), DOKUMEN_KATEGORI (+22 more)

### Community 10 - "Community 10"
Cohesion: 0.13
Nodes (32): GET(), NAMA_LEVEL, PATCH(), POST(), requireAdmin(), POST(), POST(), POST() (+24 more)

### Community 11 - "Community 11"
Cohesion: 0.09
Nodes (24): HalamanTambahanClient(), metadata, SurveiKepuasanContent(), metadata, Ctx, EditableBlock(), EditModeToggle(), InlineEditCtx (+16 more)

### Community 12 - "Community 12"
Cohesion: 0.09
Nodes (25): dynamic, metadata, dynamic, metadata, dynamic, metadata, dynamic, metadata (+17 more)

### Community 13 - "Community 13"
Cohesion: 0.11
Nodes (30): BULAN_PENDEK, GET(), Conflict, DemografiEditor(), digits(), EditGrid(), EditRow, nid() (+22 more)

### Community 14 - "Community 14"
Cohesion: 0.08
Nodes (19): GaleriClient(), GalleryItem, metadata, metadata, metadata, dynamic, metadata, TiketPage() (+11 more)

### Community 15 - "Community 15"
Cohesion: 0.14
Nodes (24): PATCH(), STATUS_VALID, PATCH(), STATUS_VALID, dynamic, POST(), GET(), POST() (+16 more)

### Community 16 - "Community 16"
Cohesion: 0.11
Nodes (24): JamLayananEditor(), Toggle(), URUTAN_HARI, norm(), SearchSelect(), SearchSelectOption, SearchSelectProps, buttonVariants (+16 more)

### Community 17 - "Community 17"
Cohesion: 0.09
Nodes (21): AdminBerita(), DashboardBeritaPage(), dynamic, DashboardDemografiPage(), dynamic, AdminGaleri(), DashboardGaleriPage(), dynamic (+13 more)

### Community 18 - "Community 18"
Cohesion: 0.11
Nodes (22): EditorNavigasi(), KOSONG, DashboardNavigasiPage(), dynamic, metadata, cariMenu(), dynamic, generateMetadata() (+14 more)

### Community 19 - "Community 19"
Cohesion: 0.13
Nodes (22): GET(), dynamic, GET(), PATCH(), dynamic, GET(), runtime, dynamic (+14 more)

### Community 22 - "Community 22"
Cohesion: 0.14
Nodes (21): AdminDemografi(), downloadFile(), DemografiMetric(), fmt(), Row, ImageCropperDialog(), ImageCropperDialogProps, FormKartu() (+13 more)

### Community 23 - "Community 23"
Cohesion: 0.10
Nodes (19): smoothEase, metadata, dynamic, metadata, useInlineEdit(), AlurLayanan(), ease, STEPS (+11 more)

### Community 25 - "Community 25"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 26 - "Community 26"
Cohesion: 0.16
Nodes (22): dynamic, POST(), runtime, terakhirKirim, dynamic, POST(), runtime, fonnteAktif() (+14 more)

### Community 27 - "Community 27"
Cohesion: 0.12
Nodes (21): cormorant, geistMono, geistSans, metadata, montserrat, SKEMA_ORGANISASI, AccessibilityWidget(), SPACING_LABEL (+13 more)

### Community 28 - "Community 28"
Cohesion: 0.10
Nodes (19): bacaKonfigTab(), dynamic, LAYANAN_PPID_SLUGS, PpidPage(), PROFIL_TERHUBUNG, TENTANG_PPID_SLUGS, BlockEditorDialog(), MODE (+11 more)

### Community 29 - "Community 29"
Cohesion: 0.11
Nodes (19): dynamic, maxDuration, POST(), runtime, dynamic, passwordCocok(), POST(), runtime (+11 more)

### Community 30 - "Community 30"
Cohesion: 0.09
Nodes (16): OFFICE_LAT, OFFICE_LNG, pulseIcon, base, FALLBACK, KartuDemografi, MapCard(), OfficeMap (+8 more)

### Community 31 - "Community 31"
Cohesion: 0.14
Nodes (19): dynamic, getWorker(), isValidNik(), KtpParsed, loadSharp(), maxDuration, normalizeDigits(), parseKtpText() (+11 more)

### Community 33 - "Community 33"
Cohesion: 0.14
Nodes (16): DashboardPengajuanBaruPage(), dynamic, ICONS, PengajuanBaruClient(), Sheet(), SheetContent(), SheetDescription(), SheetFooter() (+8 more)

### Community 34 - "Community 34"
Cohesion: 0.10
Nodes (20): Props, catatanSection, f(), FieldDef, FieldType, kelahiranDokumen, kelahiranSections(), LAYANAN_FORMS (+12 more)

### Community 35 - "Community 35"
Cohesion: 0.10
Nodes (19): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+11 more)

### Community 36 - "Community 36"
Cohesion: 0.13
Nodes (15): clampKolom(), fmtTanggal(), GaleriItem, GaleriProfilPpid(), idBaru(), KOLOM_PILIHAN, Lebar, LinkItem (+7 more)

### Community 37 - "Community 37"
Cohesion: 0.15
Nodes (17): DashboardLayout(), dynamic, ADMIN_ONLY_GROUPS, ADMIN_ONLY_HREFS, DashboardSidebar(), DesktopSidebar(), GROUPS, groupsForLevel() (+9 more)

### Community 38 - "Community 38"
Cohesion: 0.22
Nodes (13): dynamic, GET(), runtime, dynamic, GET(), runtime, addSheet(), buildDemografiWorkbook() (+5 more)

### Community 40 - "Community 40"
Cohesion: 0.18
Nodes (14): DELETE(), dynamic, GET(), DELETE(), dynamic, PUT(), adalahDataUrlGambar(), DIR_KTP (+6 more)

### Community 41 - "Community 41"
Cohesion: 0.18
Nodes (15): formatTanggalId(), hariIniZona(), PanelJamTutup(), StatusJamLayanan, URUTAN_HARI, cekJamLayanan(), defaultJamLayanan(), HARI_LABEL (+7 more)

### Community 42 - "Community 42"
Cohesion: 0.19
Nodes (13): fmt(), PetaDemografi, PetaDemografiLoader(), Marker, PetaDemografi(), Row, GEO_BY_NAMA, geoForWilayah() (+5 more)

### Community 43 - "Community 43"
Cohesion: 0.20
Nodes (13): Conflict, dynamic, maxDuration, POST(), runtime, sig(), Variant, cellNum() (+5 more)

### Community 44 - "Community 44"
Cohesion: 0.24
Nodes (11): dynamic, GET(), PUT(), dynamic, GET(), GET(), POST(), JAM_LAYANAN_KEY (+3 more)

### Community 45 - "Community 45"
Cohesion: 0.23
Nodes (11): GET(), POST(), hitungIkm(), nilaiPerUnsur(), SKM_ASPEK, SKM_KENDALA_LAYANAN, SKM_LAYANAN, SKM_PENDIDIKAN (+3 more)

### Community 46 - "Community 46"
Cohesion: 0.23
Nodes (10): DELETE(), POST(), MIME_BY_EXT, MEDIA_ALLOWED_IMAGE, MEDIA_ALLOWED_OTHER, MEDIA_MAX_SIZE, MEDIA_STORAGE_ROOT, MEDIA_URL_PREFIX (+2 more)

### Community 47 - "Community 47"
Cohesion: 0.21
Nodes (10): metadata, DemografiKategoriPage(), DemografiView(), fmt(), KOLOM_LABEL, labelKolom(), Row, sumKolom() (+2 more)

### Community 48 - "Community 48"
Cohesion: 0.23
Nodes (10): FormPageClient(), AjukanPermohonanPage(), dynamic, generateMetadata(), getLayananForm(), getLayanan(), KATEGORI_LAYANAN, LAYANAN_PERMOHONAN (+2 more)

### Community 49 - "Community 49"
Cohesion: 0.22
Nodes (12): InlineEditProvider(), isPublicPage(), useAppSelector, useAuth(), useGuestOnly(), useRequireAuth(), useUser(), AppDispatch (+4 more)

### Community 50 - "Community 50"
Cohesion: 0.19
Nodes (12): AuthArea(), DropdownItem(), DropdownMenu(), isExternalHref(), KELAS_ITEM_MENU, MobileItemIcon(), MobileMenuItem(), Navbar() (+4 more)

### Community 51 - "Community 51"
Cohesion: 0.15
Nodes (13): eslint, devDependencies, eslint, prisma, puppeteer-core, @tailwindcss/typography, tsx, tw-animate-css (+5 more)

### Community 52 - "Community 52"
Cohesion: 0.32
Nodes (9): DELETE(), PUT(), requireAdmin(), uniqueSlug(), GET(), POST(), requireAdmin(), uniqueSlug() (+1 more)

### Community 53 - "Community 53"
Cohesion: 0.18
Nodes (11): animejs, bcryptjs, dependencies, animejs, bcryptjs, react-dom, react-leaflet, @reduxjs/toolkit (+3 more)

### Community 54 - "Community 54"
Cohesion: 0.24
Nodes (8): DashboardSkmPage(), dynamic, AspekRata, Data, MasukanLayanan, mutu(), Responden, SkmDashboard()

### Community 55 - "Community 55"
Cohesion: 0.29
Nodes (7): Values, OcrUploadButton(), OcrUploadButtonProps, OcrUploadResult, CheckStatus, PemohonAutoFill, PemohonNikFieldProps

### Community 56 - "Community 56"
Cohesion: 0.20
Nodes (10): scripts, build, db:generate, db:migrate, db:push, db:seed, db:studio, dev (+2 more)

### Community 57 - "Community 57"
Cohesion: 0.28
Nodes (7): AdminKonten(), flatten(), Leaf, MenuEntry, DashboardKontenPage(), dynamic, PPID_INFORMASI_GRUP

### Community 58 - "Community 58"
Cohesion: 0.28
Nodes (6): AdminPengaduan(), FILTERS, Item, pisahBukti(), DashboardPengaduanPage(), dynamic

### Community 59 - "Community 59"
Cohesion: 0.31
Nodes (5): ArticleCard(), BeritaListClient(), News, tglID(), metadata

### Community 60 - "Community 60"
Cohesion: 0.28
Nodes (8): FOLDER_PUBLIK, GET(), MIME_BY_EXT, ROOT_PRIVAT, ROOT_PROFIL, ROOT_PUBLIK, tidakDitemukan(), isStaff()

### Community 61 - "Community 61"
Cohesion: 0.28
Nodes (8): findKey(), JENIS_TANPA_DATA_LAMA, main(), mapStatus(), prisma, SOURCE, TABEL_JENIS, USER_LEVELS

### Community 62 - "Community 62"
Cohesion: 0.25
Nodes (6): CarouselSlide, DEFAULT_SLIDES, ElegantCarousel(), ElegantCarouselProps, TODO: ganti `image` dengan foto asli DAGA/Disdukcapil Tidore Kepulauan —, TEXT_VARIANTS

### Community 63 - "Community 63"
Cohesion: 0.43
Nodes (7): getAudioCtx(), NotificationBell(), Notifikasi, playDing(), TIPE_ICON, unlockAudio(), waktuRelatif()

### Community 64 - "Community 64"
Cohesion: 0.36
Nodes (7): GROUP_SLUG, levelOf(), main(), num(), parentOf(), prisma, SOURCE

### Community 65 - "Community 65"
Cohesion: 0.38
Nodes (4): BeritaDetailClient(), News, generateMetadata(), ringkasTeks()

### Community 66 - "Community 66"
Cohesion: 0.38
Nodes (4): RelasiTerkait(), SectionHeading(), Relasi, relasiTerkait

### Community 67 - "Community 67"
Cohesion: 0.29
Nodes (6): EMPTY_FORM, FILE_FIELDS, FormData, KedatanganPendudukModalProps, NUMERIC_FIELDS, UploadedFile

### Community 68 - "Community 68"
Cohesion: 0.29
Nodes (6): EMPTY_FORM, FILE_FIELDS, FormData, KIAModalProps, NIK_FIELDS, UploadedFile

### Community 69 - "Community 69"
Cohesion: 0.43
Nodes (6): asPath(), dt(), main(), prisma, slugify(), SOURCE

### Community 70 - "Community 70"
Cohesion: 0.40
Nodes (5): amanXml(), dynamic, Entri, GET(), RUTE_TETAP

### Community 71 - "Community 71"
Cohesion: 0.40
Nodes (3): demografiData, DemografiDataset, TODO: ganti dengan query Prisma nyata setelah model demografi tersedia.

### Community 72 - "Community 72"
Cohesion: 0.33
Nodes (5): name, prisma, seed, private, version

### Community 73 - "Community 73"
Cohesion: 0.40
Nodes (4): dynamic, metadata, PilihLayananPage(), PilihLayananClient()

### Community 74 - "Community 74"
Cohesion: 0.40
Nodes (5): StaffPengajuanForm(), useStatusJamLayanan(), useImageViewer(), validateFieldValue(), wajibSekarang()

### Community 75 - "Community 75"
Cohesion: 0.70
Nodes (4): err(), log(), deploy.sh script, warn()

### Community 76 - "Community 76"
Cohesion: 0.40
Nodes (4): compat, __dirname, eslintConfig, __filename

### Community 77 - "Community 77"
Cohesion: 0.40
Nodes (4): PELAYANAN_KATEGORI, PELAYANAN_LIST, PELAYANAN_VISIBILITY_KEY, PelayananItem

### Community 78 - "Community 78"
Cohesion: 0.50
Nodes (4): dt(), main(), prisma, SOURCE

### Community 79 - "Community 79"
Cohesion: 0.50
Nodes (4): BERITA, main(), prisma, slugify()

### Community 80 - "Community 80"
Cohesion: 0.67
Nodes (3): main(), mimeOf(), prisma

### Community 81 - "Community 81"
Cohesion: 0.67
Nodes (3): GROUPS, main(), norm()

## Knowledge Gaps
- **568 isolated node(s):** `LAYANAN_KODE`, `SUBMIT_ACTIONS`, `FETCH_ACTIONS`, `ALLOWED_EXT`, `runtime` (+563 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 714 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **91 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 7` to `Community 0`, `Community 3`, `Community 4`, `Community 5`, `Community 6`, `Community 8`, `Community 11`, `Community 12`, `Community 13`, `Community 16`, `Community 22`, `Community 23`, `Community 27`, `Community 28`, `Community 30`, `Community 33`, `Community 37`, `Community 41`, `Community 47`, `Community 48`, `Community 50`, `Community 55`, `Community 57`, `Community 63`, `Community 67`, `Community 68`, `Community 73`, `Community 74`?**
  _High betweenness centrality (0.136) - this node is a cross-community bridge._
- **Why does `getSession()` connect `Community 19` to `Community 1`, `Community 2`, `Community 4`, `Community 5`, `Community 10`, `Community 12`, `Community 14`, `Community 15`, `Community 17`, `Community 18`, `Community 29`, `Community 31`, `Community 33`, `Community 37`, `Community 38`, `Community 40`, `Community 43`, `Community 44`, `Community 45`, `Community 46`, `Community 48`, `Community 52`, `Community 54`, `Community 57`, `Community 58`, `Community 60`, `Community 73`?**
  _High betweenness centrality (0.093) - this node is a cross-community bridge._
- **Why does `prisma` connect `Community 1` to `Community 2`, `Community 4`, `Community 5`, `Community 9`, `Community 10`, `Community 12`, `Community 13`, `Community 15`, `Community 18`, `Community 19`, `Community 23`, `Community 28`, `Community 29`, `Community 38`, `Community 40`, `Community 43`, `Community 44`, `Community 45`, `Community 46`, `Community 52`, `Community 65`, `Community 70`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **What connects `LAYANAN_KODE`, `SUBMIT_ACTIONS`, `FETCH_ACTIONS` to the rest of the system?**
  _568 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.09466484268125855 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.07825507825507826 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.051615051615051616 - nodes in this community are weakly interconnected._