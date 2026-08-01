/**
 * Model & gaya bersama untuk bagan struktur organisasi (kunci StaticContent
 * `profil.struktur`). Dipakai oleh:
 *  - components/landingpage/struktur-chart.tsx  (tampilan publik)
 *  - components/konten/struktur-editor.tsx       (editor admin)
 *
 * Ditaruh di modul biasa (bukan komponen 'use client') supaya tipe & fungsi
 * gaya bisa diimpor dua-duanya tanpa masalah batas server/client, dan supaya
 * pratinjau di editor benar-benar sama dengan tampilan publik.
 */

/** Tingkat jabatan — menentukan gaya kotak (padat vs garis). */
export type Tingkat = 'pimpinan' | 'kabid' | 'staff';

export interface OrgNode {
  jabatan: string;
  nama: string;
  /** Jabatan atasan (string) — kosong berarti jabatan paling atas. */
  parent?: string;
  /** Tingkat jabatan; bila kosong ditebak dari kedalaman (lihat tingkatEfektif). */
  tingkat?: Tingkat;
}

/** Isi kunci `profil.struktur`. */
export interface StrukturData {
  /** 'bagan' = bagan manual; 'gambar' = satu gambar unggahan. Default 'bagan'. */
  mode?: 'bagan' | 'gambar';
  /** URL gambar bagan (dipakai bila mode 'gambar'). */
  gambar?: string;
  organisasi?: OrgNode[];
}

/** Gradien kotak pimpinan — sama dengan aksen brand (navbar/hero). */
export const GRADIEN_PIMPINAN = 'linear-gradient(135deg, #495E57, #3a4b45)';

/** Pilihan tingkat untuk selektor di editor. */
export const TINGKAT_OPSI: { value: Tingkat; label: string }[] = [
  { value: 'pimpinan', label: 'Pimpinan' },
  { value: 'kabid', label: 'Kepala Bidang' },
  { value: 'staff', label: 'Staf' },
];

export interface GayaTingkat {
  /** true → kotak memakai gradien padat (komponen menerapkan style inline). */
  gradien: boolean;
  /** Kelas kotak (border + latar). */
  box: string;
  /** Kelas teks jabatan. */
  jabatan: string;
  /** Kelas teks nama. */
  nama: string;
}

/**
 * Gaya kotak per tingkat — pembeda visual solid → tint → garis:
 *  - pimpinan : padat, gradien amber, teks putih (penekanan tertinggi)
 *  - kabid    : padat lembut, latar amber tipis, teks amber
 *  - staff    : garis saja (outline), latar putih, teks abu
 */
export function gayaTingkat(tingkat: Tingkat): GayaTingkat {
  switch (tingkat) {
    case 'pimpinan':
      return {
        gradien: true,
        box: 'border-transparent text-white shadow-md shadow-primary/25',
        jabatan: 'text-white',
        nama: 'text-white/75',
      };
    case 'kabid':
      return {
        gradien: false,
        box: 'border-amber-300 bg-amber-50 shadow-sm dark:border-amber-500/40 dark:bg-amber-500/15',
        jabatan: 'text-amber-900 dark:text-amber-100',
        nama: 'text-amber-700/70 dark:text-amber-200/60',
      };
    case 'staff':
    default:
      return {
        gradien: false,
        box: 'border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900',
        jabatan: 'text-slate-800 dark:text-slate-100',
        nama: 'text-slate-500 dark:text-slate-400',
      };
  }
}

/** true bila node tidak punya atasan (atau atasannya tak ada di daftar). */
function adalahPuncak(node: OrgNode, org: OrgNode[]): boolean {
  return !node.parent || !org.some((x) => x.jabatan === node.parent);
}

/**
 * Tingkat efektif sebuah node. Bila `tingkat` sudah diisi, dipakai apa adanya;
 * jika tidak (data lama sebelum fitur ini), ditebak dari kedalaman:
 * puncak → pimpinan, anak langsung puncak → kabid, sisanya → staff.
 * Ini menjaga tampilan lama tetap masuk akal tanpa migrasi data.
 */
export function tingkatEfektif(node: OrgNode, org: OrgNode[]): Tingkat {
  if (node.tingkat === 'pimpinan' || node.tingkat === 'kabid' || node.tingkat === 'staff') {
    return node.tingkat;
  }
  if (adalahPuncak(node, org)) return 'pimpinan';
  const parent = org.find((x) => x.jabatan === node.parent);
  if (parent && adalahPuncak(parent, org)) return 'kabid';
  return 'staff';
}

/**
 * Tingkat default untuk jabatan baru berdasarkan tingkat atasannya:
 * anak pimpinan → kabid, anak lainnya → staff, tanpa atasan (puncak) → pimpinan.
 * Sekadar tebakan awal — admin bisa mengubahnya di editor.
 */
export function tingkatAnak(parentTingkat: Tingkat | null): Tingkat {
  if (parentTingkat === null) return 'pimpinan';
  if (parentTingkat === 'pimpinan') return 'kabid';
  return 'staff';
}
