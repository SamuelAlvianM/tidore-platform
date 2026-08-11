import type { NextRequest } from "next/server";

/**
 * Pembatas laju sederhana berbasis memori proses.
 *
 * Dipakai untuk endpoint yang boleh dipanggil TANPA login dan berat di CPU —
 * saat ini hanya OCR KTP di halaman pendaftaran. Tanpa ini, satu skrip bisa
 * memanggilnya terus-menerus dan menghabiskan CPU server.
 *
 * 🔴 Batasannya harus dipahami sebelum dipakai untuk hal lain:
 *   - Hitungannya per PROSES. Aman selama aplikasi berjalan satu instance
 *     (pm2 `daga`/`sidako` dan Passenger cPanel memang begitu). Kalau suatu
 *     saat dijalankan dalam mode cluster, tiap worker punya hitungan sendiri
 *     sehingga batas efektifnya berlipat.
 *   - Hilang saat aplikasi restart. Itu disengaja: ini peredam penyalahgunaan,
 *     bukan kuota yang harus akurat.
 *   - Kuncinya IP dari header proxy. Beberapa warga di balik NAT yang sama
 *     berbagi jatah — karena itu batasnya dibuat longgar, bukan ketat.
 */

interface Jejak {
  /** Waktu (ms) tiap permintaan yang masih berada dalam jendela. */
  waktu: number[];
}

const jejak = new Map<string, Jejak>();

/** Jangan biarkan peta tumbuh tanpa batas kalau IP-nya sangat beragam. */
const MAKS_KUNCI = 5000;

/** Ambil IP pemanggil dari header proxy (Nginx/Apache: X-Forwarded-For). */
export function ipPemanggil(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() || "tak-dikenal";
  return req.headers.get("x-real-ip") ?? "tak-dikenal";
}

export interface HasilBatas {
  /** true bila permintaan ini masih boleh diproses. */
  boleh: boolean;
  /** Sisa jatah setelah permintaan ini dihitung. */
  sisa: number;
  /** Detik sampai jatah paling awal kedaluwarsa (untuk pesan & Retry-After). */
  tungguDetik: number;
}

/**
 * Catat satu permintaan untuk `kunci` dan putuskan boleh/tidak.
 *
 * Jendela geser: yang dihitung hanya permintaan dalam `jendelaMs` terakhir,
 * jadi jatah pulih bertahap — bukan hangus lalu terbuka penuh sekaligus.
 */
export function cekBatas(
  kunci: string,
  maks: number,
  jendelaMs: number,
): HasilBatas {
  const sekarang = Date.now();
  const batasBawah = sekarang - jendelaMs;

  // Pembersihan oportunistik: hanya saat peta membengkak, supaya jalur
  // normalnya tetap murah.
  if (jejak.size > MAKS_KUNCI) {
    for (const [k, v] of jejak) {
      if (v.waktu.length === 0 || v.waktu[v.waktu.length - 1] < batasBawah) {
        jejak.delete(k);
      }
    }
  }

  const catatan = jejak.get(kunci) ?? { waktu: [] };
  catatan.waktu = catatan.waktu.filter((t) => t >= batasBawah);

  if (catatan.waktu.length >= maks) {
    jejak.set(kunci, catatan);
    const tertua = catatan.waktu[0];
    return {
      boleh: false,
      sisa: 0,
      tungguDetik: Math.max(1, Math.ceil((tertua + jendelaMs - sekarang) / 1000)),
    };
  }

  catatan.waktu.push(sekarang);
  jejak.set(kunci, catatan);
  return { boleh: true, sisa: maks - catatan.waktu.length, tungguDetik: 0 };
}

/** Kosongkan seluruh catatan — hanya untuk pengujian. */
export function resetBatas() {
  jejak.clear();
}
