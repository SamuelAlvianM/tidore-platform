import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build self-contained (server.js + node_modules ter-trace) untuk deploy ke VPS
  // via PM2 tanpa mengirim source/`npm install` di server.
  output: "standalone",
  // tesseract.js & sharp memuat worker/binary native sendiri — jangan di-bundle
  // oleh Turbopack (kalau di-bundle, resolusi path worker rusak → OCR menggantung).
  // pdfkit membaca font .afm-nya via `fs.readFileSync(__dirname + '/data/…afm')`;
  // kalau di-bundle, __dirname menunjuk ke chunk .next dan file tak ketemu →
  // route PDF melempar 500 → unduhan "gelap"/kosong. Jadikan eksternal supaya
  // di-require dari node_modules dengan __dirname yang benar.
  serverExternalPackages: ["tesseract.js", "sharp", "pdfkit"],
  // Selain eksternal, pastikan file font .afm ikut ter-trace ke output standalone
  // (dirujuk lewat string dinamis sehingga tidak terdeteksi tracer otomatis).
  outputFileTracingIncludes: {
    "/api/permohonan/[id]/pdf": ["./node_modules/pdfkit/js/data/*.afm"],
  },
  // `storage/` adalah DATA RUNTIME, bukan artefak build: 25rb+ scan KTP/KK warga
  // (~14 GB) plus foto verifikasi antrian. Tanpa pengecualian ini, penelusuran
  // berkas Next menyeret semuanya ke `.next/standalone` — bundle membengkak dari
  // ~120 MB jadi 15 GB, dan pernah menimpa symlink `storage/permohonan` di server
  // hingga lampiran 404 (lihat journal §O.1).
  //
  // deploy.sh sudah membuangnya lagi sebelum kirim, tapi mencegah lebih baik
  // daripada membersihkan: build jadi jauh lebih cepat dan tidak ada 14 GB yang
  // sempat ditulis ke disk. Berkas warga hidup di /var/www/html/uploads dan
  // HANYA ditunjuk symlink.
  outputFileTracingExcludes: {
    // Pola ditulis DUA bentuk dengan sengaja: pencocokan glob Next menormalkan
    // path relatif TANPA awalan "./", sehingga pola "./storage/**" saja tidak
    // pernah cocok. Diukur: dengan pola lama, `next build` bersih tetap
    // menyalin 25.410 berkas (14 GB) ke .next/standalone.
    "**/*": ["storage/**", "./storage/**"],
  },
  // Izinkan gambar dari domain resmi Disdukcapil Tana Tidung (storage publik) bila diperlukan.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "disdukcapil.tanatidungkab.go.id",
      },
    ],
  },
};

export default nextConfig;
