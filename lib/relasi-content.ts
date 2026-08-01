export interface Relasi {
  nama: string;
  logo: string; // path PNG/SVG asli di /public/relasi/
  href: string;
}

// Relasi Terkait — mengikuti portal Tidore lama (5 relasi resmi, dari
// resources/views/society/start.blade.php). Domain Tidore = KOTA → tidorekota.go.id.
export const relasiTerkait: Relasi[] = [
  { nama: 'Dinas Kependudukan dan Pencatatan Sipil', logo: '/LOGO-dinas_tidore.png', href: 'https://tidorekota.go.id' },
  { nama: 'Kementerian Dalam Negeri', logo: '/relasi/kemendagri.png', href: 'https://dukcapil.kemendagri.go.id' },
  { nama: 'LPSE Kota Tidore Kepulauan', logo: '/relasi/lpse.png', href: 'https://lpse.tidorekota.go.id' },
  { nama: 'Ombudsman RI', logo: '/relasi/ombudsman.jpg', href: 'https://ombudsman.go.id' },
  { nama: 'KemenPAN-RB', logo: '/relasi/panrb.png', href: 'https://sippn.menpan.go.id' },
];
