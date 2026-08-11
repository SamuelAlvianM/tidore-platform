'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ImagePlus, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/** Hanya tiga format ini yang diterima (permintaan user). */
const TIPE_DITERIMA = ['image/jpeg', 'image/jpg', 'image/png'];
const ACCEPT = '.jpg,.jpeg,.png,image/jpeg,image/png';
/** Batas berkas MENTAH sebelum dikecilkan di browser. */
const MAKS_BYTE_MENTAH = 10 * 1024 * 1024;
/** Sisi terpanjang setelah dikecilkan — cukup untuk KTP tetap terbaca. */
const SISI_MAKS = 1600;

/**
 * Pemilih satu gambar dari berkas (BUKAN kamera) → data URL JPEG.
 *
 * Dipakai untuk foto KTP: berbeda dari `CameraCapture` yang memaksa memotret
 * saat itu juga. KTP justru biasanya sudah ada sebagai berkas hasil scan/foto,
 * jadi memaksa kamera malah menyulitkan.
 *
 * Gambar dikecilkan DI BROWSER sebelum dikirim supaya payload registrasi tidak
 * membengkak (server tetap punya batasnya sendiri di lib/foto-profil.ts).
 */
export function ImageUploadField({
  value,
  onChange,
  disabled,
  label = 'Unggah Gambar',
  className,
}: {
  value: string;
  onChange: (dataUrl: string) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [memproses, setMemproses] = useState(false);
  const [galat, setGalat] = useState<string | null>(null);

  const pilihBerkas = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // Input direset lebih dulu supaya memilih berkas yang SAMA dua kali tetap
    // memicu onChange (browser tidak menembakkan event bila nilainya sama).
    e.target.value = '';
    if (!file) return;

    setGalat(null);
    if (!TIPE_DITERIMA.includes(file.type.toLowerCase())) {
      setGalat('Format harus JPG, JPEG, atau PNG.');
      return;
    }
    if (file.size > MAKS_BYTE_MENTAH) {
      setGalat('Ukuran berkas maksimal 10 MB.');
      return;
    }

    setMemproses(true);
    try {
      onChange(await kecilkan(file));
    } catch {
      setGalat('Gambar tidak dapat dibaca. Coba berkas lain.');
    } finally {
      setMemproses(false);
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      {value ? (
        <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
          <Image
            src={value}
            alt={label}
            width={1600}
            height={1000}
            unoptimized
            className="h-auto max-h-64 w-full object-contain"
          />
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={disabled}
            onClick={() => onChange('')}
            className="absolute right-2 top-2 h-8 gap-1.5 bg-white/90 text-slate-700 shadow hover:bg-white"
          >
            <X className="h-3.5 w-3.5" />
            Hapus
          </Button>
        </div>
      ) : (
        <button
          type="button"
          disabled={disabled || memproses}
          onClick={() => inputRef.current?.click()}
          className={cn(
            'flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center transition-colors',
            'hover:border-primary/50 hover:bg-primary/5',
            'dark:border-slate-600 dark:bg-slate-800/50',
            (disabled || memproses) && 'cursor-not-allowed opacity-60',
          )}
        >
          {memproses ? (
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          ) : (
            <ImagePlus className="h-6 w-6 text-slate-400" />
          )}
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            {memproses ? 'Memproses gambar…' : label}
          </span>
          <span className="text-[0.7rem] text-slate-500 dark:text-slate-400">
            Format JPG, JPEG, atau PNG — maksimal 10 MB
          </span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        onChange={pilihBerkas}
        className="hidden"
      />

      {galat && <p className="text-xs text-destructive">{galat}</p>}
    </div>
  );
}

/** Kecilkan gambar lewat canvas lalu keluarkan sebagai data URL JPEG. */
function kecilkan(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const skala = Math.min(1, SISI_MAKS / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * skala);
      canvas.height = Math.round(img.height * skala);
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('canvas tidak tersedia'));
      // PNG bisa transparan; diberi alas putih supaya tidak jadi hitam saat
      // dikonversi ke JPEG.
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/jpeg', 0.85));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('gagal memuat gambar'));
    };
    img.src = url;
  });
}
