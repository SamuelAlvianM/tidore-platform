/**
 * Registry blok konten statis yang bisa diedit dari dashboard.
 * - `fields` menentukan bentuk form editor di /dashboard/konten.
 * - `defaults` dipakai sebagai fallback bila belum pernah diedit (tidak perlu seeding).
 * Komponen publik membaca via useStaticContent(kunci) — hasil merge DB + default.
 */

import {
  produkContent,
  ppidContent,
  wbsContent,
  hubungiKamiContent,
} from "@/lib/info-content";
import type { InfoPageContent } from "@/components/shared/info-page";
import { KARTU_STATISTIK_KUNCI, DEFAULT_KARTU } from "@/lib/beranda-statistik";
import { SYARAT_LAYANAN } from "@/lib/syarat-layanan";
import { PPID_INFORMASI_GRUP } from "@/lib/ppid-informasi";

export type StaticFieldType =
  | "text"
  | "textarea"
  | "list"
  | "richtext"
  | "items"
  | "image";

export interface StaticField {
  name: string;
  label: string;
  type: StaticFieldType;
  /** Untuk type "items": definisi kolom tiap baris.
   *  `image` = pemilih gambar; `icon` = pemilih ikon; `parent` = pilih atasan
   *  (dropdown jabatan lain pada baris yang sama). */
  itemFields?: {
    name: string;
    label: string;
    type?: "text" | "image" | "icon" | "parent";
    /** Kolom `image`: rasio crop tetap saat unggah (mis. 1200/1050) supaya
     *  semua gambar seragam. */
    aspect?: number;
    /** Kolom `image`: keterangan ukuran singkat di bawah tile (mis. "1200×1050 px"). */
    hint?: string;
  }[];
  /** Untuk type "image" (top-level): rasio crop tetap saat unggah. */
  aspect?: number;
  placeholder?: string;
  /** Catatan/petunjuk tambahan yang ditampilkan di bawah label field editor. */
  catatan?: string;
}

export interface StaticBlock {
  kunci: string;
  judul: string;
  deskripsi: string;
  fields: StaticField[];
  defaults: Record<string, unknown>;
  /**
   * Blok dua-mode: editor menampilkan toggle "Tulis Manual | Gambar".
   * Mode "gambar" hanya menampilkan field bernama `gambar` (harus ada, type
   * image); mode "teks" menampilkan sisanya. Nilai mode disimpan di
   * `konten.mode` ('teks' | 'gambar'). Tampilan publik menghormati mode ini.
   */
  modeGambar?: boolean;
}

export const STATIC_BLOCKS: StaticBlock[] = [
  {
    kunci: "beranda.hero",
    judul: "Beranda — Hero",
    deskripsi:
      "Judul besar, sub-judul, dan teks pencarian di bagian atas beranda.",
    fields: [
      { name: "heading", label: "Judul Utama", type: "text" },
      { name: "subheading", label: "Sub-judul", type: "textarea" },
      {
        name: "searchPlaceholder",
        label: "Placeholder Pencarian",
        type: "text",
      },
    ],
    defaults: {
      heading: "Layanan Kependudukan Kota Tidore Kepulauan",
      subheading:
        "Urus akta kelahiran, KTP-el, Kartu Keluarga, dan layanan kependudukan lainnya secara online — cepat, mudah, dan gratis.",
      searchPlaceholder: "Mau mengurus apa hari ini?",
    },
  },
  {
    kunci: "profil.visi-misi",
    judul: "Profil — Visi & Misi",
    deskripsi: "Visi dan daftar misi dinas.",
    modeGambar: true,
    fields: [
      {
        name: "gambar",
        label: "Gambar",
        type: "image",
        catatan: "Unggah gambar yang akan ditampilkan sebagai isi tab ini.",
      },
      { name: "visi", label: "Visi", type: "textarea" },
      { name: "misi", label: "Daftar Misi", type: "list" },
    ],
    defaults: {
      visi: "Terwujudnya Pusat Pelayanan Data Base Kependudukan yang Akurat dan Aktual Berbasis Sistem Informasi Administrasi Kependudukan",
      misi: [
        "Meningkatkan profesionalitas, efisiensi dan efektifitas organisasi",
        "Mengoptimalkan dan meningkatkan pengelolaan administrasi kependudukan",
        "Meningkatkan kualitas kinerja pelayanan administrasi kependudukan secara prima",
      ],
    },
  },
  {
    kunci: "profil.motto",
    judul: "Profil — Motto & Tujuan",
    deskripsi: "Motto pelayanan, tujuan, dan sasaran strategis.",
    fields: [
      { name: "motto", label: "Motto", type: "text" },
      { name: "tujuan", label: "Daftar Tujuan", type: "list" },
      { name: "sasaran", label: "Daftar Sasaran", type: "list" },
    ],
    defaults: {
      motto: "Profesional, Integritas, Prima",
      tujuan: [
        "Memberikan pelayanan kependudukan yang cepat, tepat, dan akurat",
        "Mewujudkan database kependudukan yang berkualitas dan terintegrasi",
        "Meningkatkan kepuasan masyarakat melalui pelayanan berbasis teknologi",
      ],
      sasaran: [
        "Tersedianya data kependudukan yang akurat dan mutakhir",
        "Terwujudnya pelayanan administrasi kependudukan yang prima",
        "Terbangunnya sistem informasi kependudukan yang terintegrasi",
      ],
    },
  },
  {
    kunci: "profil.maklumat",
    judul: "Profil — Maklumat Pelayanan",
    deskripsi: "Janji pelayanan (4 kartu) dan pernyataan standar pelayanan.",
    modeGambar: true,
    fields: [
      {
        name: "gambar",
        label: "Gambar",
        type: "image",
        catatan: "Unggah gambar yang akan ditampilkan sebagai isi tab ini.",
      },
      {
        name: "janji",
        label: "Janji Pelayanan",
        type: "items",
        itemFields: [
          { name: "icon", label: "Ikon", type: "icon" },
          { name: "title", label: "Judul" },
          { name: "desc", label: "Keterangan" },
        ],
      },
      { name: "standar", label: "Pernyataan Standar", type: "textarea" },
    ],
    defaults: {
      janji: [
        { icon: "Clock", title: "Cepat", desc: "15 menit" },
        { icon: "ShieldCheck", title: "Akurat", desc: "Data valid" },
        { icon: "Gift", title: "Gratis", desc: "Tanpa biaya" },
        { icon: "Smile", title: "Ramah", desc: "Sikap prima" },
      ],
      standar:
        "Kami berkomitmen memberikan pelayanan terbaik sesuai Standar Pelayanan Publik",
    },
  },
  {
    kunci: "profil.tugas",
    judul: "Profil — Tugas & Fungsi",
    deskripsi: "Tugas utama dan daftar fungsi dinas.",
    modeGambar: true,
    fields: [
      {
        name: "gambar",
        label: "Gambar",
        type: "image",
        catatan: "Unggah gambar yang akan ditampilkan sebagai isi tab ini.",
      },
      { name: "utama", label: "Tugas Utama", type: "textarea" },
      { name: "fungsi", label: "Daftar Fungsi", type: "list" },
    ],
    defaults: {
      utama:
        "Melaksanakan urusan pemerintahan bidang kependudukan dan pencatatan sipil",
      fungsi: [
        "Penyelenggaraan administrasi kependudukan",
        "Pelayanan pencatatan sipil",
        "Pengelolaan data dan informasi kependudukan",
        "Pelaksanaan identifikasi kependudukan",
        "Fasilitasi perpindahan penduduk",
      ],
    },
  },
  {
    kunci: "profil.struktur",
    judul: "Profil — Struktur Organisasi",
    deskripsi:
      "Bagan struktur. Kolom 'Atasan' menentukan garis: pilih jabatan di atasnya. Biarkan kosong untuk jabatan paling atas (Kepala).",
    fields: [
      {
        name: "organisasi",
        label: "Susunan Organisasi",
        type: "items",
        itemFields: [
          { name: "jabatan", label: "Jabatan" },
          { name: "nama", label: "Nama Pejabat" },
          { name: "parent", label: "Atasan", type: "parent" },
        ],
      },
    ],
    defaults: {
      // mode 'bagan' = bagan manual; ganti ke 'gambar' + isi `gambar` lewat editor
      // untuk menampilkan satu gambar bagan. `tingkat` menentukan warna kotak
      // (pimpinan padat, kabid tint, staf outline).
      mode: "bagan",
      organisasi: [
        { jabatan: "Kepala Dinas", nama: "-", parent: "", tingkat: "pimpinan" },
        { jabatan: "Sekretaris", nama: "-", parent: "Kepala Dinas", tingkat: "kabid" },
        { jabatan: "Bidang Pelayanan Pendaftaran Penduduk", nama: "-", parent: "Kepala Dinas", tingkat: "kabid" },
        { jabatan: "Bidang Pelayanan Pencatatan Sipil", nama: "-", parent: "Kepala Dinas", tingkat: "kabid" },
        { jabatan: "Bidang Pengelolaan Informasi Administrasi Kependudukan", nama: "-", parent: "Kepala Dinas", tingkat: "kabid" },
      ],
    },
  },
  // Tab profil yang isinya SATU gambar utuh (materi resmi dinas), bukan data
  // terstruktur: Profil Pejabat & Sejarah. Default sengaja kosong — materi lama
  // berasal dari dinas lain dan sudah dilepas; dinas mengunggah miliknya sendiri
  // lewat Mode Edit. Selama kosong, tab disembunyikan dari pengunjung.
  {
    kunci: "profil.profil-pejabat",
    judul: "Profil — Profil Pejabat",
    deskripsi:
      "Gambar/infografis profil singkat Kepala Dinas. Unggah materi resmi Disdukcapil Tidore Kepulauan.",
    fields: [
      {
        name: "gambar",
        label: "Gambar Profil Pejabat",
        type: "image",
        catatan:
          "Unggah infografis profil Kepala Dinas dari materi resmi dinas. Selama kosong, tab ini tidak tampil bagi pengunjung.",
      },
    ],
    defaults: { gambar: "" },
  },
  {
    kunci: "profil.sejarah",
    judul: "Profil — Sejarah",
    deskripsi:
      "Gambar/infografis sejarah dinas. Unggah materi resmi Disdukcapil Tidore Kepulauan.",
    fields: [
      {
        name: "gambar",
        label: "Gambar Sejarah",
        type: "image",
        catatan:
          "Unggah infografis sejarah dinas dari materi resmi. Selama kosong, tab ini tidak tampil bagi pengunjung.",
      },
    ],
    defaults: { gambar: "" },
  },
  {
    kunci: "beranda.carousel",
    judul: "Beranda — Carousel Hero",
    deskripsi:
      "Slide gambar besar di beranda. Isi gambar + judul + sub-judul. Jika dikosongkan, beranda memakai slide bawaan.",
    fields: [
      {
        name: "slides",
        label: "Slide",
        type: "items",
        catatan:
          "Ukuran gambar disarankan 1200 × 1050 piksel (rasio ± 8:7) agar semua slide seragam dan pas mengisi bingkai carousel. Klik gambar yang sudah ada untuk menggantinya; saat mengunggah, gambar otomatis dipotong ke rasio ini.",
        itemFields: [
          {
            name: "image",
            label: "Gambar",
            type: "image",
            aspect: 1200 / 1050,
            hint: "1200 × 1050 px",
          },
          { name: "title", label: "Judul" },
          { name: "subtitle", label: "Sub-judul" },
        ],
      },
    ],
    defaults: { slides: [] },
  },
  {
    kunci: "beranda.tentang",
    judul: "Beranda — Tentang Dinas",
    deskripsi: "Paragraf perkenalan dinas (teks bebas, mendukung format).",
    fields: [{ name: "html", label: "Isi", type: "richtext" }],
    defaults: {
      html: "<p>Dinas Kependudukan dan Pencatatan Sipil Kota Tidore Kepulauan melayani administrasi kependudukan: KTP elektronik, Kartu Keluarga, akta kelahiran, akta kematian, perpindahan penduduk, dan layanan lainnya.</p>",
    },
  },
];

// ───────────────────────────────────────────────────────────────────────────
// Beranda — Kartu Statistik Demografi. Diedit lewat editor layar penuh khusus
// (bukan FieldEditor generik), jadi `fields` di sini hanya deskriptif. Default =
// susunan 6 kartu bawaan (lihat lib/beranda-statistik.ts).
// ───────────────────────────────────────────────────────────────────────────
STATIC_BLOCKS.push({
  kunci: KARTU_STATISTIK_KUNCI,
  judul: "Beranda — Kartu Statistik Demografi",
  deskripsi:
    "Judul, ikon, warna, dan sumber data (kategori + kolom) tiap kartu statistik di beranda.",
  fields: [{ name: "kartu", label: "Kartu Statistik", type: "items" }],
  defaults: { kartu: DEFAULT_KARTU },
});

// ───────────────────────────────────────────────────────────────────────────
// Survei Kepuasan Masyarakat — halaman /survei-kepuasan.
// Formulirnya MILIK PORTAL INI (lihat components/shared/survey-kepuasan-form),
// jadi yang editable tinggal judul & pengantar. Bidang "url" untuk menyematkan
// formulir pihak luar SUDAH DIHAPUS: jawaban lewat layanan luar tak pernah
// masuk rekap IKM, dan URL bebas tak bisa diperiksa mesin — di produksi sempat
// terpasang formulir WBS milik instansi lain tanpa ada yang bisa menyadarinya.
// ───────────────────────────────────────────────────────────────────────────
export const SURVEI_KEPUASAN_KUNCI = "layanan.survei-kepuasan";

STATIC_BLOCKS.push({
  kunci: SURVEI_KEPUASAN_KUNCI,
  judul: "Halaman — Survei Kepuasan Masyarakat",
  deskripsi:
    "Judul dan paragraf pengantar halaman survei. Formulirnya milik portal ini sendiri — jawaban warga langsung masuk ke rekap SKM & IKM di dashboard.",
  fields: [
    { name: "judul", label: "Judul Halaman", type: "text" },
    {
      name: "intro",
      label: "Paragraf Pengantar",
      type: "textarea",
      catatan: [
        "Formulir survei TIDAK lagi memakai layanan luar (Google Form). Pertanyaannya ada di dalam sistem dan jawabannya otomatis terekap di menu SKM & IKM pada dashboard.",
        "Kalau daftar aspek penilaian perlu diubah, itu bukan lewat Mode Edit — hubungi pengelola sistem (sumbernya lib/skm.ts, dipakai bersama oleh formulir dan rekap).",
      ].join("\n"),
    },
  ],
  defaults: {
    judul: "Survei Kepuasan Masyarakat",
    intro:
      "Penilaian Anda membantu kami meningkatkan mutu pelayanan administrasi kependudukan. Isi formulir survei resmi di bawah ini — cukup beberapa menit dan identitas Anda dijaga sesuai ketentuan.",
  },
});

/** Kunci blok konten statis untuk label periode data DKB (badge beranda). */
export const DKB_PERIODE_KUNCI = "beranda.dkb-periode";

STATIC_BLOCKS.push({
  kunci: DKB_PERIODE_KUNCI,
  judul: "Beranda — Periode Data Kependudukan (DKB)",
  deskripsi:
    "Label periode sumber data kependudukan (badge di pojok kanan atas kartu Statistik Demografi), mis. \"DKB Semester II 2024\". Perbarui tiap kali Disdukcapil menerima data DKB baru dari Kemendagri.",
  fields: [{ name: "label", label: "Label Periode", type: "text" }],
  defaults: { label: process.env.NEXT_PUBLIC_DKB_PERIODE ?? "DKB Semester II 2024" },
});

// ───────────────────────────────────────────────────────────────────────────
// Produk Disdukcapil — diport dari app lama (fronts/products/productdisdukcapil).
// Data produk di app lama tersimpan di DB produksi; nama & gambar direkonstruksi
// dari aset asli (public/produk-layanan/*), deskripsi bisa disempurnakan dinas
// lewat mode edit / dashboard Konten Halaman.
// ───────────────────────────────────────────────────────────────────────────
STATIC_BLOCKS.push({
  kunci: "produk.disdukcapil",
  judul: "Produk — Produk Disdukcapil",
  deskripsi:
    "Pengantar + daftar produk layanan (gambar, nama, penjelasan) di halaman Produk Disdukcapil.",
  fields: [
    { name: "intro", label: "Paragraf Pengantar", type: "textarea" },
    {
      name: "produk",
      label: "Daftar Produk Layanan",
      type: "items",
      itemFields: [
        { name: "image", label: "Gambar", type: "image" },
        { name: "nama", label: "Nama Produk" },
        { name: "desc", label: "Penjelasan" },
      ],
    },
  ],
  defaults: {
    intro:
      "Layanan Disdukcapil Tidore Kepulauan terdiri atas Layanan Pencatatan Sipil (Capil) dan Layanan Pendaftaran Penduduk (Dafduk). Pencatatan Sipil adalah pencatatan peristiwa penting yang dialami oleh seseorang dalam register pencatatan sipil pada Instansi Pelaksana; dokumen yang dicatat meliputi akta-akta serta catatan pinggir. Pendaftaran Penduduk adalah pencatatan biodata penduduk, pencatatan atas pelaporan peristiwa kependudukan dan pendataan penduduk rentan administrasi kependudukan, serta penerbitan dokumen penduduk berupa kartu identitas atau surat keterangan kependudukan.",
    produk: [
      {
        image: "/produk-layanan/kelahiran.png",
        nama: "Akta Kelahiran",
        desc: "Dokumen pencatatan resmi atas peristiwa kelahiran seseorang. Menjadi bukti sah identitas dan kewarganegaraan anak sejak lahir.",
      },
      {
        image: "/produk-layanan/kematian.png",
        nama: "Akta Kematian",
        desc: "Dokumen pencatatan resmi atas peristiwa kematian seseorang, diperlukan antara lain untuk pengurusan waris, asuransi, dan penataan data keluarga.",
      },
      {
        image: "/produk-layanan/perkawinan.png",
        nama: "Akta Perkawinan",
        desc: "Dokumen pencatatan perkawinan bagi penduduk non-muslim yang telah melangsungkan perkawinan sah menurut agama/kepercayaannya.",
      },
      {
        image: "/produk-layanan/perceraian.png",
        nama: "Akta Perceraian",
        desc: "Dokumen pencatatan perceraian berdasarkan putusan pengadilan yang telah berkekuatan hukum tetap.",
      },
      {
        image: "/produk-layanan/pengakuananak.png",
        nama: "Pengakuan & Pengesahan Anak",
        desc: "Pencatatan pengakuan anak oleh ayah biologis dan pengesahan anak setelah perkawinan sah orang tuanya.",
      },
      {
        image: "/produk-layanan/kutipankedua.png",
        nama: "Kutipan Kedua Akta",
        desc: "Penerbitan ulang kutipan akta pencatatan sipil (kelahiran, kematian, perkawinan, perceraian) yang hilang atau rusak.",
      },
      {
        image: "/produk-layanan/legalisasidokumen.png",
        nama: "Legalisasi Dokumen",
        desc: "Pengesahan fotokopi dokumen kependudukan dan akta pencatatan sipil agar sah digunakan untuk berbagai keperluan.",
      },
      {
        image: "/produk-layanan/suratketerangan.png",
        nama: "Surat Keterangan Kependudukan",
        desc: "Berbagai surat keterangan resmi terkait data kependudukan, misalnya surat keterangan pindah, domisili, atau pengganti identitas.",
      },
      {
        image: "/produk-layanan/catatanpinggir.png",
        nama: "Catatan Pinggir",
        desc: "Catatan resmi pada register dan kutipan akta atas perubahan peristiwa penting setelah akta diterbitkan.",
      },
      {
        image: "/produk-layanan/catatanpinggirperubahannama.png",
        nama: "Catatan Pinggir Perubahan Nama",
        desc: "Pencatatan perubahan nama berdasarkan penetapan pengadilan negeri pada register dan kutipan akta pencatatan sipil.",
      },
      {
        image: "/produk-layanan/catatanpinggirkewarganegaraan.png",
        nama: "Catatan Pinggir Perubahan Kewarganegaraan",
        desc: "Pencatatan perubahan status kewarganegaraan pada register dan kutipan akta pencatatan sipil.",
      },
      {
        image: "/produk-layanan/catatanpinggirpengangkatananak.png",
        nama: "Catatan Pinggir Pengangkatan Anak",
        desc: "Pencatatan pengangkatan anak berdasarkan penetapan pengadilan pada register dan kutipan akta kelahiran.",
      },
    ],
  },
});

// ───────────────────────────────────────────────────────────────────────────
// Kebijakan & Privasi — konten asli diport utuh dari app lama
// (fronts/kebijakanprivasis/index.blade.php), dirapikan ejaannya.
// ───────────────────────────────────────────────────────────────────────────
STATIC_BLOCKS.push({
  kunci: "info.kebijakan-privasi",
  judul: "Halaman — Kebijakan & Privasi",
  deskripsi: "Ketentuan umum dan ketentuan penggunaan aplikasi (halaman /kebijakan-privasi).",
  fields: [
    { name: "intro", label: "Kalimat Pembuka", type: "textarea" },
    { name: "umum", label: "Ketentuan Umum (per poin)", type: "list" },
    { name: "penggunaan", label: "Ketentuan Penggunaan Aplikasi (per poin)", type: "list" },
  ],
  defaults: {
    intro:
      "Terima kasih sudah menggunakan aplikasi DAGA — Dinas Kependudukan dan Pencatatan Sipil Kota Tidore Kepulauan.",
    umum: [
      "Aplikasi ini merupakan peralihan dari layanan offline (di kantor) Dinas Kependudukan dan Pencatatan Sipil Kota Tidore Kepulauan.",
      "Pengunduhan dan/atau penggunaan aplikasi ini bebas biaya. Koneksi ke jaringan internet diperlukan untuk dapat menggunakan layanan ini; segala biaya yang timbul atas koneksi perangkat pemohon dengan jaringan internet sepenuhnya ditanggung oleh pemohon.",
      "Aplikasi ini dapat digunakan oleh pemohon dengan terlebih dahulu melakukan pendaftaran yang disertai pemberian informasi data pribadi pemohon sebagaimana diminta dalam aplikasi. Informasi data pribadi yang diberikan hanya akan digunakan untuk pemberian layanan dan tujuan lain yang dimuat dalam kebijakan privasi. Informasi tambahan wajib pemohon berikan untuk dapat menggunakan layanan tertentu dalam aplikasi.",
      "Aplikasi ini bertujuan memberikan informasi secara umum terkait produk dan layanan yang kami sediakan. Kami senantiasa berupaya menjaga kebenaran dan kekinian informasi tersebut, namun tidak membuat pernyataan dan jaminan apa pun, baik tersurat maupun tersirat, mengenai kelengkapan, akurasi, keandalan, kesesuaian, keamanan, kecepatan, maupun ketersediaan fitur, informasi, produk, layanan, gambar, atau grafis dalam aplikasi. Gambar, grafis, dan/atau foto dalam aplikasi mungkin tunduk pada hak kekayaan intelektual pihak ketiga.",
      "Penggunaan beberapa layanan tertentu dalam aplikasi mensyaratkan Anda memberikan akses pada kamera dan media penyimpanan; ini diperlukan untuk mempermudah kami memverifikasi kebenaran data yang Anda berikan.",
      "Aplikasi ini tidak terhubung ke database kependudukan; aplikasi ini hanya merupakan alat bantu dalam pencatatan proses registrasi.",
      "Kami memiliki kebijakan sendiri dan menyeluruh untuk menerima, menunda, atau menolak permintaan Anda atas layanan.",
    ],
    penggunaan: [
      "Anda menyatakan dan menjamin bahwa Anda adalah individu yang secara hukum berhak dan cakap berdasarkan hukum Negara Republik Indonesia untuk meminta layanan dari Dinas Kependudukan dan Pencatatan Sipil Kota Tidore Kepulauan serta menggunakan aplikasi ini. Apabila ketentuan tersebut tidak terpenuhi, kami berhak membatalkan setiap layanan yang Anda buat.",
      "Jika Anda mendaftar untuk dan atas nama suatu institusi, Anda menyatakan dan menjamin bahwa Anda berwenang bertindak untuk dan atas nama institusi tersebut dengan menunjukkan surat penunjukan.",
      "Kami mengumpulkan dan memproses data pribadi Anda seperti nama, alamat, nomor kartu identitas, nomor telepon, alamat surel, dan tanggal lahir saat Anda mendaftar dan menggunakan aplikasi. Anda wajib memberikan informasi yang akurat dan lengkap serta memperbaruinya dari waktu ke waktu, dan setuju memberikan bukti identitas yang secara wajar kami minta.",
      "Dalam hal terjadi penggunaan kata sandi akun Anda dengan cara apa pun yang bukan karena kesalahan kami dan mengakibatkan penggunaan tanpa kewenangan, permintaan yang dilakukan melalui aplikasi tetap dianggap permintaan yang sah, kecuali Anda memberitahu kami sebelum layanan diberikan.",
      "Anda wajib melaporkan kepada kami bila kehilangan kendali atas akun Anda. Anda bertanggung jawab atas setiap penggunaan akun Anda meskipun akun tersebut disalahgunakan pihak lain.",
      "Anda dapat mengunggah informasi, foto, penilaian, dan komentar pada fitur dalam aplikasi. Anda dilarang mengunggah konten bermuatan SARA, pornografi, atau pelanggaran hak kekayaan intelektual. Kami berhak menghapus atau memblokir unggahan maupun akun yang melanggar ketentuan penggunaan.",
      "Anda tidak diperkenankan membahayakan, menyalahgunakan, mengubah, atau memodifikasi aplikasi dengan cara apa pun. Kami berhak menghentikan penggunaan akun Anda bila aplikasi digunakan tanpa mematuhi ketentuan penggunaan.",
      "Anda hanya diizinkan menggunakan aplikasi ini untuk layanan yang disediakan dan keperluan lain sesuai peraturan perundang-undangan. Anda dilarang menggunakan aplikasi untuk penipuan dalam bentuk apa pun, membuat ketidaknyamanan terhadap pihak lain, menyalahgunakan informasi yang diperoleh dari layanan, serta melecehkan atau mengancam pihak penyedia layanan.",
      "Anda memahami dan setuju bahwa penggunaan aplikasi tunduk pula pada kebijakan privasi kami yang dapat diubah dari waktu ke waktu; dengan menggunakan aplikasi, Anda dianggap memberikan persetujuan atas kebijakan privasi tersebut.",
      "Anda dilarang menggunakan layanan dalam aplikasi untuk hal-hal yang dilarang oleh hukum dan peraturan perundang-undangan yang berlaku.",
    ],
  },
});

// ───────────────────────────────────────────────────────────────────────────
// Syarat & Ketentuan — dibuat menyeluruh untuk seluruh fungsi & kegiatan portal.
// Editable via /syarat.
// ───────────────────────────────────────────────────────────────────────────
STATIC_BLOCKS.push({
  kunci: "info.syarat-ketentuan",
  judul: "Halaman — Syarat & Ketentuan",
  deskripsi:
    "Syarat & ketentuan penggunaan portal DAGA (halaman /syarat). Tiap bagian berupa daftar poin yang bisa diedit.",
  fields: [
    { name: "intro", label: "Kalimat Pembuka", type: "textarea" },
    { name: "pembaruan", label: "Label Terakhir Diperbarui", type: "text" },
    { name: "umum", label: "Ketentuan Umum (per poin)", type: "list" },
    { name: "akun", label: "Pendaftaran & Akun Pengguna (per poin)", type: "list" },
    { name: "layanan", label: "Layanan Permohonan Online (per poin)", type: "list" },
    { name: "kewajiban", label: "Kewajiban & Tanggung Jawab Pemohon (per poin)", type: "list" },
    { name: "verifikasi", label: "Verifikasi, Pemrosesan & Jam Pelayanan (per poin)", type: "list" },
    { name: "dokumen", label: "Penerbitan & Pengambilan Dokumen (per poin)", type: "list" },
    { name: "larangan", label: "Larangan Penggunaan (per poin)", type: "list" },
    { name: "penutup", label: "Ketentuan Penutup (per poin)", type: "list" },
    {
      name: "image",
      label: "Gambar/Infografis (opsional)",
      type: "image",
      catatan:
        "Opsional. Bila diisi, gambar tampil di atas isi (mis. infografis alur permohonan).",
    },
  ],
  defaults: {
    intro:
      "Selamat datang di DAGA — portal layanan administrasi kependudukan dan pencatatan sipil Dinas Kependudukan dan Pencatatan Sipil Kota Tidore Kepulauan. Dengan mendaftar dan/atau menggunakan layanan pada portal ini, Anda dianggap telah membaca, memahami, dan menyetujui seluruh Syarat & Ketentuan berikut.",
    pembaruan: "Terakhir diperbarui: Juli 2026",
    umum: [
      "DAGA adalah portal layanan administrasi kependudukan berbasis daring milik Dinas Kependudukan dan Pencatatan Sipil Kota Tidore Kepulauan, sebagai peralihan dari layanan tatap muka di kantor.",
      "Seluruh layanan pada portal ini tidak dipungut biaya (gratis). Biaya koneksi internet untuk mengakses layanan sepenuhnya menjadi tanggung jawab pemohon.",
      "Portal ini merupakan alat bantu pencatatan proses permohonan; penerbitan dokumen tetap tunduk pada verifikasi dan ketentuan Dinas Kependudukan dan Pencatatan Sipil Kota Tidore Kepulauan.",
      "Beberapa layanan mensyaratkan akses kamera dan media penyimpanan perangkat untuk pengambilan foto serta pengunggahan berkas verifikasi.",
      "Dinas berupaya menjaga kebenaran dan kekinian informasi pada portal, namun tidak menjamin secara mutlak kelengkapan, akurasi, keandalan, keamanan, maupun ketersediaan seluruh fitur setiap saat.",
      "Dengan menggunakan portal ini, Anda juga menyetujui Kebijakan Privasi yang berlaku dan dapat diperbarui sewaktu-waktu.",
    ],
    akun: [
      "Untuk mengajukan permohonan, Anda wajib memiliki akun dengan mendaftar dan mengisi data pribadi (nama, NIK, alamat, nomor telepon, surel, dan data lain) sesuai dokumen resmi.",
      "Saat pendaftaran, Anda wajib mengambil swafoto (foto wajah) secara langsung untuk dicocokkan dengan KTP-elektronik sebagai bagian verifikasi identitas; foto tersebut menjadi foto profil akun Anda.",
      "Anda menjamin bahwa seluruh data dan dokumen yang diberikan benar, akurat, terbaru, dan menjadi hak Anda, serta bersedia menunjukkan bukti identitas apabila diminta.",
      "Satu akun digunakan oleh satu orang. Anda bertanggung jawab menjaga kerahasiaan kata sandi dan seluruh aktivitas yang terjadi pada akun Anda.",
      "Setiap permohonan yang diajukan melalui akun Anda dianggap sah dan berasal dari Anda, kecuali Anda melaporkan kehilangan kendali atas akun sebelum layanan diproses.",
      "Anda wajib segera memberitahu Dinas apabila mengetahui adanya penggunaan akun tanpa izin.",
    ],
    layanan: [
      "Portal menyediakan permohonan dokumen kependudukan dan pencatatan sipil, antara lain: akta kelahiran, akta kematian, akta perkawinan, akta perceraian, Kartu Keluarga (KK), KTP-elektronik, Kartu Identitas Anak (KIA), surat pindah/datang (SKPWNI), serta layanan kependudukan lain yang tersedia.",
      "Setiap jenis permohonan mewajibkan pemohon melengkapi persyaratan dan mengunggah berkas pendukung yang sah, jelas, dan terbaca sesuai ketentuan masing-masing layanan.",
      "Data pada formulir permohonan harus sesuai dengan dokumen resmi; ketidaksesuaian dapat menyebabkan permohonan ditolak atau dikembalikan untuk diperbaiki.",
      "Satu permohonan diajukan untuk satu peristiwa atau satu subjek sesuai jenis layanan yang dipilih.",
      "Pengajuan permohonan hanya dapat dilakukan pada jam pelayanan aktif yang ditetapkan Dinas; di luar jam tersebut formulir permohonan dinonaktifkan sementara.",
    ],
    kewajiban: [
      "Memberikan data dan dokumen yang benar; permohonan dengan data atau dokumen palsu maupun menyesatkan dapat dibatalkan sepihak dan/atau diproses sesuai hukum yang berlaku.",
      "Mengunggah berkas milik sendiri atau yang Anda berhak menggunakannya, tanpa melanggar hak pihak lain.",
      "Menjaga kerahasiaan akun dan tidak mengalihkan akun kepada pihak lain.",
      "Tidak menyalahgunakan layanan untuk tujuan penipuan, komersial tanpa izin, atau perbuatan melawan hukum.",
      "Bertanggung jawab penuh atas seluruh permohonan dan unggahan yang dilakukan melalui akun Anda.",
    ],
    verifikasi: [
      "Dinas berhak memverifikasi ulang seluruh data dan berkas pemohon sebelum dokumen diterbitkan.",
      "Dinas berhak menerima, menunda, meminta perbaikan, atau menolak permohonan disertai alasan, sesuai ketentuan dan standar pelayanan yang berlaku.",
      "Waktu pemrosesan mengikuti Standar Operasional Prosedur (SOP) dan Standar Pelayanan masing-masing layanan; estimasi waktu bukan jaminan mutlak dan dipengaruhi kelengkapan berkas serta antrean.",
      "Permohonan hanya diproses atas berkas yang lengkap dan memenuhi syarat.",
      "Pengajuan hanya dilayani pada hari dan jam pelayanan aktif; permohonan di luar jam aktif dapat diajukan kembali pada jam pelayanan berikutnya.",
    ],
    dokumen: [
      "Dokumen yang telah selesai dapat berupa dokumen digital bertanda tangan elektronik (TTE) yang sah sesuai peraturan perundang-undangan.",
      "Pemohon memperoleh notifikasi status permohonan (diproses, perlu perbaikan, disetujui, atau ditolak) melalui portal.",
      "Dokumen digital dapat diunduh melalui akun pemohon; pengambilan dokumen fisik (bila ada) mengikuti ketentuan Dinas.",
      "Kehilangan atau kerusakan dokumen dapat diajukan penerbitan ulang sesuai prosedur yang berlaku.",
    ],
    larangan: [
      "Mengunggah konten bermuatan SARA, pornografi, kebencian, atau yang melanggar hak kekayaan intelektual pihak lain.",
      "Menggunakan portal untuk penipuan, pemalsuan dokumen atau identitas, maupun tindakan melawan hukum lainnya.",
      "Merusak, menyalahgunakan, mengubah, atau mengganggu keamanan dan kinerja sistem portal.",
      "Melecehkan, mengancam, atau membuat ketidaknyamanan terhadap petugas maupun pengguna lain.",
      "Dinas berhak menghapus unggahan, menonaktifkan, atau memblokir akun yang melanggar ketentuan ini.",
    ],
    penutup: [
      "Dinas dapat mengubah, memperbarui, atau menyesuaikan Syarat & Ketentuan ini sewaktu-waktu; perubahan berlaku sejak dipublikasikan pada portal.",
      "Syarat & Ketentuan ini merupakan satu kesatuan dengan Kebijakan Privasi yang berlaku.",
      "Segala hal yang timbul dari penggunaan portal tunduk pada hukum Negara Republik Indonesia.",
      "Untuk pertanyaan atau bantuan, silakan hubungi Dinas Kependudukan dan Pencatatan Sipil Kota Tidore Kepulauan melalui kanal resmi yang tersedia pada portal.",
    ],
    image: "",
  },
});

// Persyaratan & penjelasan per-layanan (tab yang bisa dicari di atas S&K umum).
// Default = lib/syarat-layanan.ts (berbasis peraturan nasional, branding-netral).
STATIC_BLOCKS.push({
  kunci: "info.syarat-layanan",
  judul: "Halaman — Persyaratan per Layanan (Syarat & Ketentuan)",
  deskripsi:
    "Daftar persyaratan & penjelasan tiap layanan permohonan yang tampil sebagai tab bisa dicari di halaman /syarat.",
  fields: [{ name: "layanan", label: "Daftar Layanan", type: "items" }],
  defaults: { layanan: SYARAT_LAYANAN },
});

// ───────────────────────────────────────────────────────────────────────────
// Halaman info (Produk / PPID / WBS / Hubungi Kami) — SEMUA jadi editable.
// Blok digenerate dari lib/info-content.ts (default awal), kunci =
// info.<seksi>.<slug>; halaman publik membaca merge DB+default lewat
// EditableInfoPage. Tautan (links) sengaja tidak ikut diedit.
// ───────────────────────────────────────────────────────────────────────────
const INFO_SECTIONS: {
  seksi: string;
  label: string;
  content: Record<string, InfoPageContent>;
}[] = [
  { seksi: "produk", label: "Produk", content: produkContent },
  { seksi: "ppid", label: "PPID", content: ppidContent },
  { seksi: "wbs", label: "WBS", content: wbsContent },
  { seksi: "hubungi-kami", label: "Hubungi Kami", content: hubungiKamiContent },
];

for (const { seksi, label, content } of INFO_SECTIONS) {
  for (const [slug, c] of Object.entries(content)) {
    // Punya halaman & blok khusus (produk.disdukcapil) — jangan digandakan.
    if (seksi === "produk" && slug === "produk-disdukcapil") continue;
    STATIC_BLOCKS.push({
      kunci: `info.${seksi}.${slug}`,
      judul: `${label} — ${c.title}`,
      deskripsi: `Konten halaman /${seksi}/${slug}.`,
      fields: [
        { name: "title", label: "Judul Halaman", type: "text" },
        { name: "description", label: "Deskripsi Singkat", type: "textarea" },
        {
          name: "image",
          label: "Gambar/Infografis",
          type: "image",
          catatan:
            "Opsional. Bila diisi, gambar tampil di atas paragraf isi (mis. infografis alur/tata cara). Kosongkan bila belum ada materi resmi dari dinas.",
        },
        { name: "body", label: "Paragraf Isi", type: "list" },
        { name: "list", label: "Daftar Poin", type: "list" },
      ],
      defaults: {
        title: c.title,
        description: c.description,
        image: c.image ?? "",
        body: c.body ?? [],
        list: c.list ?? [],
      },
    });
  }
}

// ───────────────────────────────────────────────────────────────────────────
// PPID — kartu indeks tiap klasifikasi informasi. Ditambah/diubah admin lewat
// tombol "Tambah menu baru" di halaman indeksnya (components/ppid/tambah-kartu).
// Nilainya = SELURUH daftar kartu grup (bawaan + tambahan); bila belum pernah
// disimpan, halaman memakai `defaults` di bawah.
// ───────────────────────────────────────────────────────────────────────────
export function ppidKartuKunci(grupSlug: string) {
  return `ppid.kartu.${grupSlug}`;
}

for (const grup of PPID_INFORMASI_GRUP) {
  STATIC_BLOCKS.push({
    kunci: ppidKartuKunci(grup.slug),
    judul: `PPID — Kartu ${grup.judulPendek}`,
    deskripsi: `Judul, deskripsi, ikon, dan warna kartu pada halaman ${grup.judul}.`,
    fields: [{ name: 'kartu', label: 'Kartu Menu', type: 'items' }],
    defaults: { kartu: grup.items },
  });
}

/** Kunci blok untuk halaman info /<seksi>/<slug>. */
export function infoBlockKey(seksi: string, slug: string) {
  return `info.${seksi}.${slug}`;
}

// ───────────────────────────────────────────────────────────────────────────
// Menu navbar tambahan buatan admin (dashboard → Menu Navigasi).
// Isinya HANYA tambahan; menu bawaan tetap di lib/navigation.ts sehingga tidak
// bisa terhapus lewat editor. Lihat lib/navigasi-tambahan.ts.
// ───────────────────────────────────────────────────────────────────────────
STATIC_BLOCKS.push({
  kunci: 'navigasi.tambahan',
  judul: 'Menu Navigasi — Tambahan',
  deskripsi: 'Sub-menu dan menu baru yang ditambahkan admin ke navbar publik.',
  fields: [{ name: 'menu', label: 'Menu Tambahan', type: 'items' }],
  defaults: { menu: [] },
});

/**
 * Halaman yang dibuat lewat editor menu navigasi. Slug-nya baru ada saat
 * runtime sehingga tidak bisa didaftarkan di muka — bloknya dibentuk saat
 * diminta. Pola slug dibatasi ketat supaya kunci sembarangan tetap ditolak.
 */
function blokHalamanTambahan(kunci: string): StaticBlock | undefined {
  const awalan = 'halaman.';
  if (!kunci.startsWith(awalan)) return undefined;
  const slug = kunci.slice(awalan.length);
  if (!/^[a-z0-9][a-z0-9-]{0,59}$/.test(slug)) return undefined;

  return {
    kunci,
    judul: `Halaman: ${slug}`,
    deskripsi: 'Isi halaman yang dibuat lewat editor menu navigasi.',
    fields: [
      { name: 'title', label: 'Judul Halaman', type: 'text' },
      { name: 'intro', label: 'Paragraf Pengantar', type: 'textarea' },
      { name: 'html', label: 'Isi', type: 'richtext' },
    ],
    defaults: {},
  };
}

/**
 * Halaman info (PPID/WBS/Produk/Hubungi Kami — lihat components/shared/info-page.tsx)
 * dibentuk lewat pola `EditableInfoPage` dengan kunci `info.<seksi>.<slug>`
 * (lihat infoBlockKey). Sama seperti halaman navigasi tambahan, jumlahnya
 * terlalu banyak dan bisa nambah kapan saja untuk didaftarkan satu-satu —
 * blok dibentuk generik saat diminta. TANPA ini, tombol "Edit" di halaman
 * info.* tidak berbuat apa-apa (getStaticBlock balas undefined → dialog
 * editor tidak pernah terbuka).
 */
function blokInfoHalaman(kunci: string): StaticBlock | undefined {
  const awalan = 'info.';
  if (!kunci.startsWith(awalan)) return undefined;
  const sisa = kunci.slice(awalan.length);
  const titikPertama = sisa.indexOf('.');
  if (titikPertama <= 0) return undefined;
  const seksi = sisa.slice(0, titikPertama);
  const slug = sisa.slice(titikPertama + 1);
  if (!/^[a-z0-9-]+$/.test(seksi) || !/^[a-z0-9][a-z0-9-]{0,59}$/.test(slug)) {
    return undefined;
  }

  return {
    kunci,
    judul: `Konten Halaman: ${slug}`,
    deskripsi: 'Judul, deskripsi, isi, daftar poin, dan gambar halaman ini.',
    fields: [
      { name: 'title', label: 'Judul', type: 'text' },
      { name: 'description', label: 'Deskripsi Singkat', type: 'textarea' },
      { name: 'image', label: 'Gambar/Infografis', type: 'image' },
      { name: 'body', label: 'Paragraf Isi', type: 'list' },
      { name: 'list', label: 'Daftar Poin', type: 'list' },
    ],
    defaults: {},
  };
}

/** Kunci konten tab PPID (mode + galeri + link) untuk sebuah slug halaman. */
export function ppidGaleriKunci(slug: string) {
  return `ppid.galeri.${slug}`;
}

/** Mode tampilan tab PPID. */
export type PpidTabMode = 'gambar' | 'tabel' | 'campur';

/**
 * Konten tab PPID editable (mis. "Profil PPID Pelaksana").
 * Menyimpan mode tampilan (gambar/tabel/campur), daftar gambar galeri, jumlah
 * kolom, dan daftar link. Dikelola komponen khusus (components/ppid/*), bukan
 * FieldEditor generik — jadi `fields` kosong. Perlu terdaftar di sini agar
 * PUT /api/admin/static-content menerima penyimpanannya.
 */
function blokGaleriPpid(kunci: string): StaticBlock | undefined {
  const awalan = 'ppid.galeri.';
  if (!kunci.startsWith(awalan)) return undefined;
  const slug = kunci.slice(awalan.length);
  if (!/^[a-z0-9][a-z0-9-]{0,59}$/.test(slug)) return undefined;
  return {
    kunci,
    judul: `Konten Tab PPID: ${slug}`,
    deskripsi: 'Mode tampilan, gambar galeri, jumlah kolom, dan link.',
    fields: [],
    // Default 'tabel' agar halaman tetap seperti semula (portal dokumen);
    // admin memilih 'gambar'/'campur' per tab lewat pemilih mode.
    defaults: { mode: 'tabel', items: [], kolom: 2, links: [] },
  };
}

export function getStaticBlock(kunci: string): StaticBlock | undefined {
  return (
    STATIC_BLOCKS.find((b) => b.kunci === kunci) ??
    blokHalamanTambahan(kunci) ??
    blokGaleriPpid(kunci) ??
    blokInfoHalaman(kunci)
  );
}

export function getStaticDefaults(kunci: string): Record<string, unknown> {
  return getStaticBlock(kunci)?.defaults ?? {};
}
