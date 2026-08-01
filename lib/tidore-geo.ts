/**
 * Titik perkiraan pusat tiap kecamatan Kota Tidore Kepulauan (Maluku Utara)
 * untuk peta sebaran penduduk. Koordinat bersifat PERKIRAAN (indikatif) — silakan
 * sesuaikan bila perlu. Pencocokan dengan data demografi memakai nama wilayah
 * yang dinormalisasi (huruf besar tanpa spasi berlebih).
 *
 * Wilayah Tidore Kepulauan terbagi dua: gugus PULAU TIDORE (kec. Tidore, Tidore
 * Utara, Tidore Selatan, Tidore Timur) dan daratan OBA di Pulau Halmahera
 * (kec. Oba, Oba Utara, Oba Tengah, Oba Selatan).
 */
export interface KecamatanGeo {
  nama: string;
  lat: number;
  lng: number;
}

// Pusat peta (antara Pulau Tidore & daratan Oba/Sofifi).
export const TIDORE_CENTER: [number, number] = [0.62, 127.52];
export const TIDORE_ZOOM = 10;

export const KECAMATAN_GEO: KecamatanGeo[] = [
  { nama: "TIDORE", lat: 0.683, lng: 127.401 },
  { nama: "TIDORE UTARA", lat: 0.749, lng: 127.383 },
  { nama: "TIDORE SELATAN", lat: 0.624, lng: 127.423 },
  { nama: "TIDORE TIMUR", lat: 0.701, lng: 127.443 },
  { nama: "OBA UTARA", lat: 0.732, lng: 127.566 },
  { nama: "OBA", lat: 0.552, lng: 127.583 },
  { nama: "OBA TENGAH", lat: 0.503, lng: 127.606 },
  { nama: "OBA SELATAN", lat: 0.402, lng: 127.634 },
];

const normNama = (s: string) => s.trim().toUpperCase().replace(/\s+/g, " ");

const GEO_BY_NAMA = new Map(KECAMATAN_GEO.map((k) => [normNama(k.nama), k]));

/** Cari koordinat kecamatan dari nama wilayah data demografi. */
export function geoForWilayah(wilayah: string): KecamatanGeo | undefined {
  return GEO_BY_NAMA.get(normNama(wilayah));
}
