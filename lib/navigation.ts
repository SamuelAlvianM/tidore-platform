/**
 * Struktur menu navbar publik — satu sumber untuk Navbar dan editor
 * Konten Halaman di dashboard (sidebar + submenu preview).
 */

import { siteConfig } from "@/lib/site-config";

export interface NavSubItem {
  title: string;
  href: string;
  description: string;
}

export interface NavItem {
  title: string;
  href: string;
  description: string;
  subItems?: NavSubItem[];
}

export interface NavMenu {
  title: string;
  /** Link langsung (menu tanpa dropdown). Abaikan bila `items` diisi. */
  href?: string;
  items?: NavItem[];
  /**
   * Menu ini dilayani APLIKASI LAIN, bukan portal ini — walau alamatnya bisa
   * terlihat satu domain (mis. `/antrian` yang diteruskan Apache ke proses
   * lain). Navbar merendernya sebagai `<a>` biasa supaya terjadi muat-ulang
   * penuh; `<Link>` Next akan mencari rute itu di dalam portal, tidak
   * menemukannya, lalu berakhir 404.
   */
  aplikasiLuar?: boolean;
}

export const navigationItems: NavMenu[] = [
  // "Pelayanan Online" dihapus dari navbar publik — pembuatan permohonan
  // dipindah ke dashboard (warga & OPD) sebagai halaman penuh, bukan modal.
  {
    title: "Produk",
    items: [
      {
        title: "Produk Disdukcapil",
        href: "/produk/produk-disdukcapil",
        description: "Produk dan layanan Disdukcapil",
      },
      {
        title: "Formulir Persyaratan",
        href: "/produk/formulir-persyaratan",
        description: "Persyaratan pengurusan dokumen kependudukan",
      },
      {
        title: "Hukum",
        href: "/produk/hukum",
        description: "Produk hukum terkait kependudukan",
      },

      {
        title: "Standar Operasional Prosedur (SOP)",
        href: "/produk/sop",
        description: "Standar operasional prosedur pelayanan",
      },
    ],
  },
  {
    title: "Media Informasi",
    items: [
      {
        title: "Berita",
        href: "/media/berita",
        description: "Berita dan informasi terkini",
      },
      {
        title: "Galeri",
        href: "/galeri",
        description: "Dokumentasi kegiatan Disdukcapil",
      },
      // "Data Demografi" (submenu per kategori) dihapus — sudah tercakup
      // halaman indeks "Laporan Data Demografi" di bawah.
      // "Peta" dihapus dari menu — sudah tercakup GIS Dukcapil di bawah.
      // "Survey Kepuasan Masyarakat" dipindah ke halaman Hubungi Kami.
      {
        title: "GIS Dukcapil — Peta Sebaran Penduduk",
        href: "/media/gis",
        description: "Peta sebaran jumlah penduduk per kecamatan",
      },
      {
        // Langsung ke halaman data ber-tab kategori (tanpa halaman indeks kartu).
        title: "Laporan Data Demografi",
        href: "/media/demografi",
        description: "Laporan lengkap data demografi",
      },
    ],
  },
  {
    // Disederhanakan dari 3 item jadi 2 menu utama — tiap menu mendarat di
    // halaman yang punya sub-tab sendiri (lihat components/ppid/ppid-subnav.tsx):
    // "Tentang PPID" → 6 tab (profil, pembentukan, visi-misi, struktur,
    // maklumat, tugas). "Informasi Publik" → 2 tab (Setiap Saat / Berkala),
    // menggabungkan dua halaman indeks kartu yang sebelumnya terpisah di navbar.
    title: "PPID",
    items: [
      {
        title: "Tentang PPID",
        href: "/ppid/profil-ppid",
        description:
          "Profil, gambaran pembentukan, visi-misi, struktur organisasi, maklumat, serta tugas dan tanggung jawab PPID",
      },
      {
        title: "Informasi Publik",
        href: "/ppid/informasi-setiap-saat",
        description:
          "Daftar Informasi Publik yang wajib tersedia setiap saat maupun diumumkan secara berkala (UU No. 14 Tahun 2008)",
      },
      {
        title: "Layanan & Formulir PPID",
        href: "/ppid/formulir-ppid",
        description:
          "Formulir permohonan & keberatan, SK, register, uji konsekuensi, penyelesaian sengketa, dan inovasi layanan PPID",
      },
    ],
  },
  {
    // Menu Pengaduan & WBS disatukan atas permintaan user: dua kanal ini isinya
    // sama dan menuju endpoint yang sama (/api/pengaduan), jadi cukup satu menu
    // langsung (tanpa dropdown) ke halaman WBS. Halaman /pengaduan lama
    // di-redirect ke sini agar tautan lama tidak mati.
    title: "WBS",
    href: "/wbs/tentang-wbs",
  },
  {
    // Tanpa dropdown — mendarat di halaman internal kita dulu (bukan langsung
    // melempar ke skm.go.id). Halaman itu menyematkan formulir SKM resmi lewat
    // iframe + tombol untuk membukanya penuh di tab baru. Lihat
    // app/survei-kepuasan/page.tsx.
    title: "Survei Kepuasan Masyarakat",
    href: "/survei-kepuasan",
  },
  // "Hubungi Kami" dihapus dari navbar atas permintaan user — informasi kontak
  // (alamat, email, jam layanan) sudah tersedia permanen di footer. Halaman
  // /hubungi-kami tetap ada dan dapat diakses lewat tautan footer.
  {
    // Paling kanan atas permintaan user. Ini PINTU ke aplikasi antrian loket
    // yang berdiri sendiri (repo `antrian-dukcapil` / folder
    // `tidore-platform-manda`) — portal cuma memanggil, tidak ikut memuat
    // kodenya. Alamatnya dari env supaya laptop & server bisa berbeda tanpa
    // ubah kode (lihat siteConfig.antrianUrl).
    // Ikonnya diatur di `navigationIcons` (components/shared/navbar.tsx).
    title: "Antrian",
    href: siteConfig.antrianUrl,
    aplikasiLuar: true,
  },
];
