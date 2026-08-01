'use client';

import { ExternalLink, Gauge, Info } from 'lucide-react';
import { EditableBlock } from '@/components/konten/inline-edit';
import { useStaticContent } from '@/lib/use-static-content';
import { SURVEI_KEPUASAN_KUNCI } from '@/lib/static-content-registry';

/**
 * Isi halaman Survei Kepuasan Masyarakat.
 *
 * Formulir survei dilayani pihak luar, jadi yang disimpan hanya TAUTAN-nya —
 * admin menempelkannya lewat Mode Edit, tanpa perlu menyentuh kode. Tautan itu
 * dipakai dua-duanya: menyematkan formulir (iframe) dan mengisi tombol
 * "Buka di website" sebagai jalan keluar bila penyedia memasang header
 * anti-embed (X-Frame-Options / CSP frame-ancestors) sehingga iframe kosong.
 *
 * Sengaja HANYA ADA SATU tautan keluar (tombol di hero): tombol kedua di
 * kepala bingkai dulu menuju alamat yang sama persis — pengulangan tanpa guna.
 */
/**
 * Alamat versi-semat. Google Form baru tampil rapi di dalam iframe bila diberi
 * `?embedded=true` (versi tanpa header/menu — itu yang dipakai tombol "Sematkan"
 * milik Google). Admin biasanya menempelkan tautan `/viewform` biasa dari bilah
 * alamat, jadi parameternya ditambahkan sendiri di sini.
 *
 * Tombol "Buka di website" tetap memakai tautan ASLI supaya yang terbuka adalah
 * formulir versi penuh.
 */
function urlSemat(u: string): string {
  try {
    const url = new URL(u);
    if (url.hostname.endsWith('google.com') && url.pathname.includes('/forms/')) {
      url.searchParams.set('embedded', 'true');
    }
    return url.toString();
  } catch {
    return u; // bukan URL sah — biarkan apa adanya
  }
}

export function SurveiKepuasanContent() {
  const data = useStaticContent([SURVEI_KEPUASAN_KUNCI])[
    SURVEI_KEPUASAN_KUNCI
  ] as { url?: string; judul?: string; intro?: string };

  const url = (data.url ?? '').trim();
  const judul = data.judul || 'Survei Kepuasan Masyarakat';
  const intro =
    data.intro ||
    'Penilaian Anda membantu kami meningkatkan mutu pelayanan administrasi kependudukan.';

  // Nama penyedia untuk catatan bantuan — diambil dari tautannya sendiri
  // supaya tidak lagi menyebut satu portal tertentu secara paku mati.
  let penyedia = '';
  try {
    if (url) penyedia = new URL(url).hostname.replace(/^www\./, '');
  } catch {
    /* tautan belum lengkap/ tidak sah — cukup sembunyikan namanya */
  }

  return (
    <EditableBlock kunci={SURVEI_KEPUASAN_KUNCI} label="Halaman Survei">
      <div className="relative bg-slate-50/30">
        {/* Hero */}
        <div className="border-b border-slate-100 bg-gradient-to-b from-primary/[0.07] via-slate-50 to-transparent">
          <div className="container mx-auto px-4 pt-12 pb-10 md:px-8 lg:px-16 lg:pt-16">
            <p className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1 text-[0.7rem] font-bold uppercase tracking-widest text-primary">
              <Gauge className="h-3.5 w-3.5" />
              Layanan Publik · Disdukcapil
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              {judul}
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
              {intro}
            </p>

            {url && (
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:gap-3 hover:shadow-md"
                >
                  Buka di website <ExternalLink className="h-4 w-4" />
                </a>
                <span className="text-xs text-slate-500">
                  Formulir tidak muncul? Klik tombol di atas untuk membukanya penuh.
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="container mx-auto px-4 py-10 md:px-8 lg:px-16">
          {url ? (
            <>
              {/* Bingkai formulir tersemat */}
              <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm">
                <div className="flex items-center gap-2 border-b border-slate-100 px-6 py-4">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Gauge className="h-4 w-4" />
                  </span>
                  <h2 className="text-sm font-semibold text-slate-900">
                    Formulir {judul}
                  </h2>
                </div>

                <iframe
                  src={urlSemat(url)}
                  title={judul}
                  className="h-[1100px] w-full border-0 bg-white"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Catatan bantuan */}
              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-sky-200/70 bg-sky-50/60 p-4 text-sm text-slate-600">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-sky-500" />
                <p>
                  Formulir di atas dilayani oleh portal resmi
                  {penyedia ? (
                    <>
                      {' '}
                      <b>{penyedia}</b>
                    </>
                  ) : null}
                  . Bila formulir tampak kosong (beberapa perangkat/browser
                  memblokir konten tersemat), gunakan tombol{' '}
                  <b className="font-semibold text-slate-700">Buka di website</b>{' '}
                  di atas untuk mengisinya penuh. Anda juga dapat memindai QR code survei
                  yang tersedia di loket pelayanan kantor Disdukcapil.
                </p>
              </div>
            </>
          ) : (
            /* Tautan belum diisi dinas — jangan tampilkan bingkai kosong. */
            <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white px-6 py-14 text-center">
              <span className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                <Gauge className="h-5 w-5" />
              </span>
              <p className="text-sm font-medium text-slate-600">
                Formulir survei belum tersedia.
              </p>
              <p className="mx-auto mt-1.5 max-w-md text-xs leading-relaxed text-slate-400">
                Silakan hubungi loket pelayanan Disdukcapil untuk mengisi survei.
                Bagi admin: klik tombol <b>Edit</b> di pojok kanan atas lalu
                tempelkan tautan formulir survei resmi dari dinas — formulirnya
                akan langsung tampil di halaman ini.
              </p>
            </div>
          )}
        </div>
      </div>
    </EditableBlock>
  );
}
