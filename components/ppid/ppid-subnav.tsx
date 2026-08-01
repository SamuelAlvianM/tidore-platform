'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, LayoutGroup } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { PpidSubnavItem } from '@/lib/ppid-informasi';

export type { PpidSubnavItem };

/**
 * Bar sub-tab untuk dua menu PPID yang masing-masing sebenarnya beberapa
 * halaman terpisah (route asli tetap ada — komponen ini cuma menaut mereka
 * secara visual jadi terlihat satu halaman bertab). Beda dari `Tabs` Radix:
 * klik di sini benar-benar BERPINDAH RUTE (Link), bukan menukar konten.
 */
export function PpidSubnav({
  items,
  layoutId,
}: {
  items: PpidSubnavItem[];
  /** ID unik LayoutGroup — beda grup (Tentang PPID vs Informasi Publik) harus beda. */
  layoutId: string;
}) {
  const pathname = usePathname();

  return (
    <LayoutGroup id={layoutId}>
      <nav
        aria-label="Sub-navigasi PPID"
        className="mx-auto flex w-fit max-w-full flex-wrap items-stretch justify-center gap-1 rounded-2xl border border-white/60 bg-white/45 p-1.5 shadow-lg shadow-primary/10 ring-1 ring-black/[0.04] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:ring-white/5"
      >
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'relative flex items-center justify-center rounded-xl px-3.5 py-2.5 text-center text-sm font-semibold leading-snug transition-colors duration-200 sm:px-4',
                isActive
                  ? 'text-primary-foreground'
                  : 'text-slate-600 hover:bg-white/60 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white',
              )}
            >
              {isActive && (
                <motion.span
                  layoutId={`${layoutId}-bg`}
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#495E57] to-[#3a4b45] shadow-md shadow-primary/40 ring-1 ring-white/20"
                  transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                />
              )}
              <span className="relative z-10">
                <span className="hidden sm:inline">{item.label}</span>
                <span className="sm:hidden">{item.shortLabel ?? item.label}</span>
              </span>
            </Link>
          );
        })}
      </nav>
    </LayoutGroup>
  );
}
