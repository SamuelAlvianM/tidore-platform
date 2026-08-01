export interface DemografiDataset {
  title: string;
  description: string;
  unit: string;
  items: { label: string; value: number }[];
}

/**
 * Data demografi contoh (placeholder) — sumber data resmi belum terhubung
 * ke backend (belum ada model Prisma untuk rekap demografi).
 * TODO: ganti dengan query Prisma nyata setelah model demografi tersedia.
 */
export const demografiData: Record<string, DemografiDataset> = {
  agama: {
    title: 'Statistik Penduduk Berdasarkan Agama',
    description: 'Distribusi jumlah penduduk Kota Tidore Kepulauan menurut agama yang dianut.',
    unit: 'jiwa',
    items: [
      { label: 'Islam', value: 24650 },
      { label: 'Kristen Protestan', value: 2480 },
      { label: 'Kristen Katolik', value: 720 },
      { label: 'Hindu', value: 85 },
      { label: 'Buddha', value: 57 },
      { label: 'Konghucu', value: 8 },
    ],
  },
  'golongan-darah': {
    title: 'Statistik Penduduk Berdasarkan Golongan Darah',
    description: 'Distribusi jumlah penduduk menurut golongan darah.',
    unit: 'jiwa',
    items: [
      { label: 'A', value: 5900 },
      { label: 'B', value: 6400 },
      { label: 'AB', value: 2100 },
      { label: 'O', value: 8600 },
      { label: 'Tidak Tahu', value: 5000 },
    ],
  },
  'jenis-kelamin': {
    title: 'Statistik Penduduk Berdasarkan Jenis Kelamin',
    description: 'Distribusi jumlah penduduk menurut jenis kelamin.',
    unit: 'jiwa',
    items: [
      { label: 'Laki-laki', value: 14720 },
      { label: 'Perempuan', value: 13280 },
    ],
  },
  'kepala-keluarga': {
    title: 'Statistik Kepala Keluarga',
    description: 'Jumlah kepala keluarga per kecamatan di Kota Tidore Kepulauan.',
    unit: 'KK',
    items: [
      { label: 'Sesayap', value: 2850 },
      { label: 'Sesayap Hilir', value: 2140 },
      { label: 'Tana Lia', value: 1620 },
      { label: 'Betayau', value: 980 },
      { label: 'Muruk Rian', value: 640 },
    ],
  },
  pendidikan: {
    title: 'Statistik Penduduk Berdasarkan Pendidikan Terakhir',
    description: 'Distribusi jumlah penduduk menurut jenjang pendidikan terakhir.',
    unit: 'jiwa',
    items: [
      { label: 'Tidak/Belum Sekolah', value: 5200 },
      { label: 'SD', value: 7400 },
      { label: 'SMP', value: 5600 },
      { label: 'SMA/SMK', value: 7100 },
      { label: 'Diploma', value: 750 },
      { label: 'S1/S2/S3', value: 1950 },
    ],
  },
  'status-perkawinan': {
    title: 'Statistik Penduduk Berdasarkan Status Perkawinan',
    description: 'Distribusi jumlah penduduk menurut status perkawinan.',
    unit: 'jiwa',
    items: [
      { label: 'Belum Kawin', value: 11900 },
      { label: 'Kawin', value: 14300 },
      { label: 'Cerai Hidup', value: 780 },
      { label: 'Cerai Mati', value: 1020 },
    ],
  },
  'wajib-ktp': {
    title: 'Statistik Wajib KTP',
    description: 'Jumlah penduduk wajib KTP dan yang sudah memiliki KTP-el.',
    unit: 'jiwa',
    items: [
      { label: 'Sudah Memiliki KTP-el', value: 19400 },
      { label: 'Belum Memiliki KTP-el', value: 1450 },
    ],
  },
};
