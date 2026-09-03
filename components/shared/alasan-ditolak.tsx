import { AlertTriangle } from 'lucide-react';

export interface UraianTolak {
  alasan: string;
  rincian: string[];
  keterangan: string;
}

/**
 * Alasan penolakan yang dibaca PEMOHON.
 *
 * 🔴 Sampai fitur ini dibuat, permohonan yang ditolak hanya memunculkan
 * lencana "DITOLAK" di daftar, dan penjelasannya cuma dikirim lewat surel —
 * kanal yang bisa terlewat. Warga sungguhan melaporkan ditolak berulang kali
 * "karena data tidak lengkap" tanpa pernah tahu data mana yang dimaksud,
 * karena portalnya sendiri tidak pernah mengatakannya.
 *
 * Diletakkan LANGSUNG di kartunya dan DI ATAS perjalanan permohonan, bukan di
 * bawah atau di balik satu klik lagi: pemohon yang membuka halaman ini setelah
 * ditolak sedang mencari tepat satu hal, dan menyembunyikannya satu gulir
 * lebih jauh mengulang masalah yang sama.
 *
 * Bahasanya formal dan ringkas — ini layanan pemerintah, dan kalimat inilah
 * yang jadi dasar pemohon memperbaiki berkasnya.
 */
export function AlasanDitolak({
  tolak,
  ringkas = false,
}: {
  tolak?: UraianTolak | null;
  /** Bentuk padat untuk kartu daftar; bentuk penuh untuk halaman detail. */
  ringkas?: boolean;
}) {
  const alasan = tolak?.alasan ?? '';
  const rincian = tolak?.rincian ?? [];
  const keterangan = tolak?.keterangan ?? '';

  // Penolakan lama tidak punya struktur ini. Yang tidak berisi apa pun tetap
  // diberi kalimat yang mengarahkan, bukan dibiarkan kosong.
  if (!alasan && rincian.length === 0 && !keterangan) {
    return (
      <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
        <p className="text-sm text-slate-700">
          Alasan penolakan tidak tercatat. Silakan hubungi petugas Disdukcapil
          untuk keterangan lebih lanjut.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
      {!ringkas && (
        <div className="mb-2 flex items-center gap-2 text-destructive">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <h2 className="text-sm font-semibold">Permohonan Ditolak</h2>
        </div>
      )}

      {alasan && (
        <p className="text-sm font-semibold text-slate-900">{alasan}</p>
      )}

      {rincian.length > 0 && (
        <div className="mt-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Data yang perlu dilengkapi
          </p>
          {/* Dua kolom di layar lapang: daftar ini kerap berisi 5–10 butir, dan
              satu kolom panjang mendorong keterangan petugas ke luar layar. */}
          <ul className="mt-1 grid grid-cols-1 gap-x-4 gap-y-0.5 sm:grid-cols-2">
            {rincian.map((r) => (
              <li
                key={r}
                className="flex items-start gap-2 text-sm leading-snug text-slate-800"
              >
                <span
                  aria-hidden
                  className="mt-2 h-1 w-1 shrink-0 rounded-full bg-destructive/60"
                />
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}

      {keterangan && (
        <p className="mt-2 whitespace-pre-line border-t border-destructive/20 pt-2 text-sm text-slate-800">
          {keterangan}
        </p>
      )}

      {!ringkas && (
        <p className="mt-3 text-xs text-slate-500">
          Perbaiki data atau berkas sesuai keterangan di atas, lalu ajukan
          permohonan baru.
        </p>
      )}
    </div>
  );
}
