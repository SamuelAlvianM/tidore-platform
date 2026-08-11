'use client';

import { Gauge, Info, ShieldCheck } from 'lucide-react';
import { EditableBlock } from '@/components/konten/inline-edit';
import { useStaticContent } from '@/lib/use-static-content';
import { SURVEI_KEPUASAN_KUNCI } from '@/lib/static-content-registry';
import { SurveyKepuasanForm } from '@/components/shared/survey-kepuasan-form';

/**
 * Isi halaman Survei Kepuasan Masyarakat — RUMAH RESMI formulir SKM.
 *
 * Formulirnya milik portal ini sendiri: jawaban masuk ke `t_skm_jawaban` lewat
 * /api/skm dan langsung terekap di /dashboard/skm (Nilai IKM per aspek).
 *
 * 🔴 Halaman ini DULU menyematkan formulir pihak luar (Google Form) lewat
 * iframe, dengan tautannya disimpan sebagai konten editable. Itu dihentikan
 * atas permintaan user, dan alasannya layak diingat:
 *   - jawabannya mendarat di Drive pihak lain dan TIDAK PERNAH masuk rekap
 *     IKM — dashboard SKM tak pernah bertambah walau warga mengisi;
 *   - formulir yang sempat terpasang di produksi ternyata milik instansi lain
 *     (WBS Disdukcapil Tana Tidung); tidak ada bagian sistem yang bisa
 *     menyadarinya, karena bidang bebas berisi URL tak bisa diperiksa mesin;
 *   - formulir yang belum disetel "Anyone with the link" membuat bingkainya
 *     tampil kosong tanpa pesan apa pun bagi warga.
 * Kalau kelak embed dikembalikan, ketiga hal itu kembali juga.
 */
export function SurveiKepuasanContent() {
  const data = useStaticContent([SURVEI_KEPUASAN_KUNCI])[
    SURVEI_KEPUASAN_KUNCI
  ] as { judul?: string; intro?: string };

  const judul = data.judul || 'Survei Kepuasan Masyarakat';
  const intro =
    data.intro ||
    'Penilaian Anda membantu kami meningkatkan mutu pelayanan administrasi kependudukan.';

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
          </div>
        </div>

        <div className="container mx-auto px-4 py-10 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
            {/* Formulir */}
            <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm">
              <div className="flex items-center gap-2 border-b border-slate-100 px-6 py-4">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Gauge className="h-4 w-4" />
                </span>
                <h2 className="text-sm font-semibold text-slate-900">
                  Formulir {judul}
                </h2>
              </div>
              <div className="px-6 py-6">
                <SurveyKepuasanForm />
              </div>
            </div>

            {/* Keterangan pendamping */}
            <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
              <div className="flex items-start gap-3 rounded-2xl border border-sky-200/70 bg-sky-50/60 p-4 text-sm text-slate-600">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-sky-500" />
                <p>
                  Pengisian hanya butuh beberapa menit. Semua aspek penilaian
                  wajib diberi nilai; data diri selain nama tidak wajib diisi
                  dan dipakai untuk rekap statistik saja.
                </p>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-white p-4 text-sm text-slate-600">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <p>
                  Jawaban Anda tersimpan langsung di sistem resmi Disdukcapil
                  Kota Tidore Kepulauan — tidak dikirim ke layanan pihak ketiga.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </EditableBlock>
  );
}
