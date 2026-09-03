'use client';

import { useState } from 'react';
import { Loader2, FileSpreadsheet } from 'lucide-react';
import { toast } from 'sonner';

/**
 * Tombol "Excel" di kanan atas kartu statistik dashboard.
 *
 * Sengaja mengunduh lewat fetch → blob, bukan `<a download>` biasa: berkasnya
 * dirakit di server (kop surat + logo + kueri agregat) sehingga ada jeda satu
 * dua detik. Tanpa keadaan "sedang menyiapkan", petugas mengira tombolnya tidak
 * bekerja lalu mengklik berkali-kali. Cara ini juga membuat galat 403/500
 * muncul sebagai toast, bukan sebagai tab kosong berisi JSON.
 */
export function ExportStatistikButton({
  bagian,
  label = 'Excel',
  judul,
}: {
  /** Kunci bagian statistik; kosongkan untuk mengekspor seluruh kartu. */
  bagian?: string;
  label?: string;
  /** Teks tooltip; bila kosong dipakai kalimat bawaan. */
  judul?: string;
}) {
  const [sibuk, setSibuk] = useState(false);

  const unduh = async () => {
    if (sibuk) return;
    setSibuk(true);
    try {
      const url = bagian
        ? `/api/admin/statistik/export?bagian=${encodeURIComponent(bagian)}`
        : '/api/admin/statistik/export';
      const res = await fetch(url);
      if (!res.ok) {
        const pesan =
          res.status === 403
            ? 'Akun Anda tidak berhak mengunduh statistik.'
            : 'Gagal menyiapkan berkas Excel.';
        toast.error(pesan);
        return;
      }

      // Nama berkas diambil dari Content-Disposition supaya sama dengan yang
      // ditentukan server (mengandung tanggal cetak).
      const disposisi = res.headers.get('Content-Disposition') ?? '';
      const cocok = disposisi.match(/filename="?([^"]+)"?/i);
      const namaFile = cocok?.[1] ?? `statistik-${bagian ?? 'semua'}.xlsx`;

      const blob = await res.blob();
      const objek = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = objek;
      a.download = namaFile;
      a.rel = 'noopener';
      document.body.appendChild(a);
      a.click();
      a.remove();
      // Beri jeda sebelum melepas URL — Firefox membatalkan unduhan bila objek
      // sudah dicabut saat berkasnya belum selesai ditulis.
      setTimeout(() => URL.revokeObjectURL(objek), 10_000);
    } catch {
      toast.error('Gagal mengunduh — periksa koneksi lalu coba lagi.');
    } finally {
      setSibuk(false);
    }
  };

  return (
    <button
      type="button"
      onClick={unduh}
      disabled={sibuk}
      title={judul ?? 'Unduh data ini sebagai Excel berkop surat'}
      className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-1 text-[0.68rem] font-semibold text-emerald-700 transition-colors hover:border-emerald-300 hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {sibuk ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <FileSpreadsheet className="h-3.5 w-3.5" />
      )}
      {label}
    </button>
  );
}
