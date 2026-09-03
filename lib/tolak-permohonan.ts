import type { LayananForm } from '@/lib/layanan-forms';

/**
 * Penolakan permohonan: alasan baku, rincian data yang kurang, dan keterangan
 * petugas — beserta penyandian & penguraiannya ke `t_permohonan.catatan`.
 *
 * 🔴 KENAPA INI ADA. Sampai fitur ini dibuat, penolakan hanya punya SATU kolom
 * teks, dan formulirnya baru menyediakan tempat menulis ketika petugas memilih
 * "Lainnya". Petugas yang memilih "Berkas tidak lengkap" karena itu mengirim
 * tiga kata itu apa adanya — tidak ada tempat untuk menyebutkan berkas MANA
 * yang kurang. Servernya sendiri tidak pernah mewajibkan apa pun: `catatan`
 * boleh kosong, dan permohonan tetap tertolak.
 *
 * Akibatnya warga bisa menerima penolakan berkali-kali tanpa pernah tahu apa
 * yang harus diperbaiki. Itu keluhan nyata dari warga, bukan dugaan.
 *
 * ⚠️ DISIMPAN SEBAGAI SATU TEKS di `catatan`, tanpa kolom atau tabel baru.
 * Alasannya bukan kemalasan: `catatan` sudah dibaca EMPAT konsumen — halaman
 * riwayat warga, surel penolakan, notifikasi lonceng, dan PDF tanda terima.
 * Menambah kolom berarti menyentuh keempatnya sekaligus, sementara teks yang
 * tersusun rapi sudah terbaca benar di semuanya.
 *
 * Bentuknya sengaja dijaga TERBACA MANUSIA, bukan JSON — kalau suatu saat ada
 * yang membacanya langsung dari basis data, isinya harus tetap masuk akal:
 *
 *     Berkas tidak lengkap
 *     Data yang perlu dilengkapi: File Kartu Keluarga, File Akta Lahir.
 *     Kartu Keluarga yang diunggah terpotong pada bagian bawah.
 *
 * 🔴 PENOLAKAN LAMA TETAP TERBACA. Baris pertama yang tidak dikenali sebagai
 * alasan baku diperlakukan sebagai keterangan bebas — persis nasib catatan
 * yang sudah tersimpan sebelum fitur ini ada. Jangan menambah aturan yang
 * membuat catatan lama gagal diurai; yang hilang bukan kerapian data,
 * melainkan satu-satunya penjelasan yang pernah diterima warga.
 */

const PREFIX_RINCIAN = 'Data yang perlu dilengkapi: ';

/**
 * Alasan baku penolakan.
 *
 * ⚠️ Teksnya SAMA PERSIS dengan `ALASAN_TOLAK` lama di `AdminPermohonan.tsx`.
 * Itu disengaja: catatan penolakan yang sudah tersimpan berisi kalimat ini apa
 * adanya, dan `uraikan()` mengenalinya dengan mencocokkan teks. Mengubah satu
 * huruf pun membuat penolakan lama berhenti terbaca sebagai alasan.
 */
export const ALASAN = [
  'Berkas tidak lengkap',
  'Berkas tidak jelas / buram',
  'Data tidak sesuai dengan dokumen',
  'NIK / dokumen tidak valid',
  'Persyaratan belum terpenuhi',
  'Lainnya',
] as const;

/**
 * Alasan yang WAJIB disertai rincian data yang kurang.
 *
 * Keputusan dinas: keempatnya menunjuk pada berkas atau isian tertentu, jadi
 * menyebutkannya bukan tambahan — itu inti pesannya. Dua sisanya
 * (`NIK / dokumen tidak valid` dan `Lainnya`) cukup keterangan, karena
 * masalahnya tidak selalu bisa ditunjuk ke satu isian.
 */
export const WAJIB_RINCIAN: string[] = [
  'Berkas tidak lengkap',
  'Berkas tidak jelas / buram',
  'Data tidak sesuai dengan dokumen',
  'Persyaratan belum terpenuhi',
];

/** Apakah alasan ini menuntut rincian? */
export const perluRincian = (alasan: string) => WAJIB_RINCIAN.includes(alasan);

export interface GrupRincian {
  judul: string;
  item: string[];
}

export interface UraianTolak {
  alasan: string;
  rincian: string[];
  keterangan: string;
}

/**
 * Pilihan rincian untuk sebuah permohonan — SELURUH isian formulirnya,
 * dikelompokkan jadi "Isian" dan "Lampiran".
 *
 * 🔴 Diambil dari skema layanan itu sendiri, bukan daftar tetap. Tiap jenis
 * permohonan punya isian dan lampiran yang berbeda, dan daftar tetap akan
 * menawarkan berkas yang tidak diminta layanan itu — persis kebingungan yang
 * mau dihilangkan.
 *
 * `type === 'file'` yang membedakan lampiran dari isian; itu satu-satunya
 * penanda yang ada di skema.
 */
export function pilihanRincian(form?: LayananForm | null): GrupRincian[] {
  if (!form) return [];

  const isian: string[] = [];
  const lampiran: string[] = [];

  for (const sec of form.sections) {
    for (const fd of sec.fields) {
      const label = (fd.label ?? '').trim();
      if (!label) continue;
      (fd.type === 'file' ? lampiran : isian).push(label);
    }
  }

  // Label kembar dibuang: beberapa layanan memakai label yang sama di dua
  // seksi. Petugas memilih LABEL, jadi dua entri identik hanya jadi pilihan
  // yang mustahil dibedakan.
  const grup: GrupRincian[] = [];
  if (isian.length) grup.push({ judul: 'Isian', item: [...new Set(isian)] });
  if (lampiran.length) grup.push({ judul: 'Lampiran', item: [...new Set(lampiran)] });
  return grup;
}

/** Seluruh label yang sah untuk permohonan ini, tanpa pengelompokan. */
export const labelSah = (form?: LayananForm | null): string[] =>
  pilihanRincian(form).flatMap((g) => g.item);

/**
 * Gabungkan alasan + rincian + keterangan jadi satu teks `catatan`.
 *
 * Rincian yang kosong tidak menyisakan baris kosong — catatan ini dibaca warga
 * apa adanya di halaman riwayat dan di surel.
 */
export function susun(
  alasan: string,
  rincian: string[],
  keterangan: string,
): string {
  const baris: string[] = [];
  const a = (alasan ?? '').trim();
  const k = (keterangan ?? '').trim();

  // "Lainnya" bukan penjelasan apa pun bagi warga — yang berarti justru
  // keterangannya. Menuliskannya hanya menambah satu baris tanpa isi.
  if (a && a !== 'Lainnya') baris.push(a);

  const r = (rincian ?? []).map((s) => (s ?? '').trim()).filter(Boolean);
  if (r.length) baris.push(`${PREFIX_RINCIAN}${r.join(', ')}.`);

  if (k) baris.push(k);

  return baris.join('\n');
}

/**
 * Pisahkan `catatan` kembali jadi alasan, rincian, dan keterangan.
 *
 * Dipakai halaman detail supaya bisa menampilkannya sebagai daftar, bukan satu
 * blok teks — dan supaya formulir petugas bisa memuat ulang penolakan yang
 * sudah ada tanpa mengetik ulang.
 */
export function uraikan(catatan?: string | null): UraianTolak {
  const teks = (catatan ?? '').replace(/\r\n/g, '\n').trim();
  if (!teks) return { alasan: '', rincian: [], keterangan: '' };

  let alasan = '';
  let rincian: string[] = [];
  const sisa: string[] = [];

  teks.split('\n').forEach((raw, i) => {
    const b = raw.trim();

    // Baris PERTAMA saja yang boleh jadi alasan. Kalimat yang sama di tengah
    // keterangan adalah bagian dari kalimat petugas, bukan label.
    if (i === 0 && (ALASAN as readonly string[]).includes(b)) {
      alasan = b;
      return;
    }

    if (b.startsWith(PREFIX_RINCIAN)) {
      rincian = b
        .slice(PREFIX_RINCIAN.length)
        .replace(/\.$/, '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      return;
    }

    sisa.push(b);
  });

  return { alasan, rincian, keterangan: sisa.join('\n').trim() };
}
