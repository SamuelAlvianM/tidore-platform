"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Home,
  FileText,
  Building2,
  Newspaper,
  Image as ImageIcon,
  Phone,
  LogOut,
  LayoutDashboard,
  User as UserIcon,
  Loader2,
  Landmark,
  ShieldAlert,
  Gauge,
  Ticket,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { navigationItems } from "@/lib/navigation";

/** Menu tanpa dropdown yang href-nya situs luar (mis. portal SKM resmi)
 *  harus dibuka di tab baru, bukan lewat router Next di tab yang sama. */
const isExternalHref = (href: string) => /^https?:\/\//.test(href);
import { useStaticContent } from "@/lib/use-static-content";
import {
  gabungNavigasi,
  KUNCI_NAVIGASI,
  type MenuTambahan,
} from "@/lib/navigasi-tambahan";
import { NotificationBell } from "@/components/shared/notification-bell";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logoutUser } from "@/store/slices/authSlice";

/** Ambang navbar desktop (px). Di bawah ini navigasi memakai hamburger —
 *  samakan dengan kelas `min-[1360px]:` pada deretan menu di bawah. */
const AMBANG_MENU_DESKTOP = 1360;
/** Lebar panel dropdown saat belum sempat diukur — samakan dgn `min-w-70`. */
const LEBAR_PANEL_MIN = 280;
/** Jarak aman panel dari tepi layar. */
const MARGIN_LAYAR = 8;

function DropdownMenu({
  title,
  items,
  icon: Icon,
}: {
  title: string;
  items?: Array<{
    title: string;
    href: string;
    description: string;
    subItems?: Array<{ title: string; href: string; description: string }>;
  }>;
  icon?: React.ElementType;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [terpasang, setTerpasang] = React.useState(false);
  const [contentHeight, setContentHeight] = React.useState(0);
  const [perluScroll, setPerluScroll] = React.useState(false);
  const [posisi, setPosisi] = React.useState<{
    top: number;
    left: number;
  } | null>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Portal hanya boleh dirakit di klien (tak ada `document` saat SSR).
  React.useEffect(() => setTerpasang(true), []);

  /** Panel hidup di <body> (portal) dengan position:fixed, jadi posisinya
   *  dihitung sendiri dari rect tombol lalu dijepit ke dalam layar supaya
   *  menu paling kanan tidak menjorok keluar viewport. */
  const hitungPosisi = React.useCallback(() => {
    const tombol = triggerRef.current;
    if (!tombol) return;
    const r = tombol.getBoundingClientRect();
    const lebar = panelRef.current?.offsetWidth || LEBAR_PANEL_MIN;
    const batasKanan = window.innerWidth - lebar - MARGIN_LAYAR;
    setPosisi({
      top: r.bottom + 8,
      left: Math.max(MARGIN_LAYAR, Math.min(r.left, batasKanan)),
    });
  }, []);

  // Selama terbuka: pantau tinggi konten (untuk animasi) + posisi panel.
  // Scroll dipantau dengan capture supaya scroll di container mana pun ikut
  // memperbarui posisi, bukan cuma scroll halaman.
  React.useEffect(() => {
    if (!isOpen) return;
    const el = contentRef.current;
    if (!el) return;
    const perbarui = () => {
      hitungPosisi();
      const bawahTombol = triggerRef.current?.getBoundingClientRect().bottom ?? 0;
      const ruang = window.innerHeight - bawahTombol - 24;
      const penuh = el.scrollHeight;
      // Layar pendek: panel dibatasi tinggi layar & isinya yang bergulir,
      // bukan meluber keluar viewport.
      setPerluScroll(penuh > ruang);
      setContentHeight(Math.min(penuh, Math.max(160, ruang)));
    };
    perbarui();
    const resizeObserver = new ResizeObserver(perbarui);
    resizeObserver.observe(el);
    window.addEventListener("resize", perbarui);
    window.addEventListener("scroll", perbarui, true);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", perbarui);
      window.removeEventListener("scroll", perbarui, true);
    };
  }, [isOpen, hitungPosisi]);

  // Di bawah ambang desktop, deretan menu berganti jadi hamburger. Panel yang
  // terlanjur terbuka TIDAK ikut tersembunyi (ia di <body>, bukan di dalam
  // deretan menu), jadi harus ditutup sendiri saat layar mengecil.
  React.useEffect(() => {
    if (!isOpen) return;
    const cekLebar = () => {
      if (window.innerWidth < AMBANG_MENU_DESKTOP) setIsOpen(false);
    };
    cekLebar();
    window.addEventListener("resize", cekLebar);
    return () => window.removeEventListener("resize", cekLebar);
  }, [isOpen]);

  // click-outside (tombol maupun panel portal) + Escape
  React.useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        dropdownRef.current?.contains(target) ||
        panelRef.current?.contains(target)
      )
        return;
      setIsOpen(false);
    };
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={triggerRef}
        onClick={() => setIsOpen((prev) => !prev)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-expanded={items ? isOpen : undefined}
        className={cn(
          "relative px-2.5 py-2 text-sm font-medium flex items-center gap-1.5 rounded-md whitespace-nowrap text-slate-700",
          "transition-all duration-300 ease-out",
          "hover:text-[#495E57] hover:bg-[#495E57]/10",
          "before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-0.5 before:bg-[#F4CE14]",
          "before:transition-all before:duration-300 before:ease-out",
          "hover:before:w-[calc(100%-1.25rem)]",
          isOpen && "text-[#495E57] bg-[#495E57]/10",
        )}
      >
        {Icon && (
          <Icon
            className={cn(
              "h-4 w-4 flex-shrink-0 transition-transform duration-300 ease-out",
              isHovered && "scale-110",
            )}
            strokeWidth={2}
          />
        )}
        <span className="transition-transform duration-300 ease-out">
          {title}
        </span>
        {items && (
          <ChevronDown
            className={cn(
              "h-4 w-4 flex-shrink-0 transition-all duration-300 ease-out",
              isOpen && "rotate-180",
              isHovered && !isOpen && "translate-y-0.5",
            )}
            strokeWidth={2}
          />
        )}
      </button>

      {/* Slide-down / slide-up panel — height animates from 0 to scrollHeight.
          DIRENDER LEWAT PORTAL KE <body>, bukan sebagai anak deretan menu:
          deretan menu adalah kotak `overflow-x-auto` (jaring pengaman
          anti-bocor menyamping), dan overflow pada satu sumbu memaksa sumbu
          lain ikut ter-clip. Panel `absolute` di dalamnya jadi terpotong
          sepenuhnya — tak terlihat DAN tak bisa diklik. Dengan portal +
          position:fixed, panel bebas dari kotak itu tanpa mengorbankan
          jaring pengamannya. */}
      {items &&
        terpasang &&
        createPortal(
          <div
            ref={panelRef}
            className="fixed z-[60] min-w-70 transition-[height,opacity] duration-300 ease-out"
            style={{
              top: posisi?.top ?? 0,
              left: posisi?.left ?? 0,
              height: isOpen ? contentHeight : 0,
              opacity: isOpen ? 1 : 0,
              pointerEvents: isOpen ? "auto" : "none",
              visibility: posisi ? "visible" : "hidden",
              overflowY: isOpen && perluScroll ? "auto" : "visible",
            }}
            aria-hidden={!isOpen}
          >
            <div
              ref={contentRef}
              className={cn(
                "rounded-xl py-2",
                "transition-all duration-300 ease-out",
                isOpen ? "shadow-xl scale-100" : "shadow-lg scale-95",
              )}
              style={{
                background: "rgba(255,255,255,0.97)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(202,138,4,0.12)",
                boxShadow: "0 8px 32px rgba(202,138,4,0.12)",
                overflow: isOpen ? "visible" : "hidden",
              }}
            >
              {items.map((item, i) => (
                <DropdownItem
                  key={item.title}
                  item={item}
                  onClose={() => setIsOpen(false)}
                  index={i}
                  isVisible={isOpen}
                />
              ))}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}

function DropdownItem({
  item,
  onClose,
  index,
  isVisible,
}: {
  item: {
    title: string;
    href: string;
    description: string;
    subItems?: Array<{ title: string; href: string; description: string }>;
  };
  onClose: () => void;
  index: number;
  isVisible: boolean;
}) {
  const [showDescription, setShowDescription] = React.useState(false);
  const [showSubItems, setShowSubItems] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (item.subItems) {
      // Show submenu immediately for better UX
      setShowSubItems(true);
    } else {
      timeoutRef.current = setTimeout(() => setShowDescription(true), 250);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (!item.subItems) {
      setShowDescription(false);
    }
    // For subItems, use a small delay to allow moving to submenu
    if (item.subItems) {
      timeoutRef.current = setTimeout(() => setShowSubItems(false), 100);
    }
  };

  const handleSubmenuEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowSubItems(true);
  };

  const handleSubmenuLeave = () => {
    setShowSubItems(false);
  };

  React.useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  if (item.subItems) {
    return (
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleSubmenuLeave}
      >
        <div
          className={cn(
            "flex items-center justify-between px-4 py-3 cursor-default rounded-md mx-2",
            "transition-all duration-300 ease-out",
            "hover:bg-gradient-to-r hover:from-accent/80 hover:to-accent/40",
            "hover:shadow-sm hover:translate-x-1",
            "transition-[opacity,transform,background,shadow] ease-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1",
          )}
          style={{
            transitionDelay: isVisible ? `${index * 40}ms` : "0ms",
            transitionDuration: isVisible ? "250ms" : "200ms",
          }}
          onClick={(e) => e.preventDefault()}
        >
          <div
            className={cn(
              "font-medium text-sm transition-all duration-300 ease-out",
              isHovered && "text-primary translate-x-1",
            )}
          >
            {item.title}
          </div>
          <ChevronRight
            className={cn(
              "h-4 w-4 flex-shrink-0 transition-transform duration-300 ease-out",
              isHovered && "translate-x-1 text-primary",
            )}
            strokeWidth={2}
          />
        </div>

        {/* Sub-menu - appears to the right */}
        <div
          className={cn(
            "absolute left-full top-0 ml-1 min-w-[250px] z-[100]",
            "transition-all duration-300 ease-out",
            showSubItems
              ? "opacity-100 visible translate-x-0 scale-100"
              : "opacity-0 invisible -translate-x-2 scale-95 pointer-events-none",
          )}
          onMouseEnter={handleSubmenuEnter}
        >
          <div
            className="rounded-xl shadow-xl py-2"
            style={{
              background: "rgba(255,255,255,0.97)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(202,138,4,0.12)",
              boxShadow: "0 8px 32px rgba(202,138,4,0.12)",
            }}
          >
            {item.subItems.map((subItem, subIndex) => (
              <SubDropdownItem
                key={subItem.title}
                item={subItem}
                onClose={onClose}
                index={subIndex}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      className={cn(
        "block px-4 py-3 rounded-md mx-2",
        "transition-all duration-300 ease-out",
        "hover:bg-gradient-to-r hover:from-accent/80 hover:to-accent/40",
        "hover:shadow-sm hover:translate-x-1",
        "transition-[opacity,transform,background,shadow] ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1",
      )}
      style={{
        transitionDelay: isVisible ? `${index * 40}ms` : "0ms",
        transitionDuration: isVisible ? "250ms" : "200ms",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClose}
    >
      <div
        className={cn(
          "font-medium text-sm transition-all duration-300 ease-out",
          isHovered && "text-primary translate-x-1",
        )}
      >
        {item.title}
      </div>
      <div
        className={cn(
          "text-xs text-muted-foreground overflow-hidden",
          "transition-all duration-300 ease-out",
          showDescription ? "opacity-100 max-h-20 mt-1" : "opacity-0 max-h-0",
        )}
      >
        {item.description}
      </div>
    </Link>
  );
}

function SubDropdownItem({
  item,
  onClose,
  index,
}: {
  item: { title: string; href: string; description: string };
  onClose: () => void;
  index: number;
}) {
  const [showDescription, setShowDescription] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
    timeoutRef.current = setTimeout(() => setShowDescription(true), 250);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowDescription(false);
  };

  React.useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  return (
    <Link
      href={item.href}
      className={cn(
        "block px-4 py-3 rounded-md mx-2",
        "transition-all duration-300 ease-out",
        "hover:bg-gradient-to-r hover:from-accent/80 hover:to-accent/40",
        "hover:shadow-sm hover:translate-x-1",
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClose}
    >
      <div
        className={cn(
          "font-medium text-sm transition-all duration-300 ease-out",
          isHovered && "text-primary translate-x-1",
        )}
      >
        {item.title}
      </div>
      <div
        className={cn(
          "text-xs text-muted-foreground overflow-hidden",
          "transition-all duration-300 ease-out",
          showDescription ? "opacity-100 max-h-20 mt-1" : "opacity-0 max-h-0",
        )}
      >
        {item.description}
      </div>
    </Link>
  );
}

/** Kotak ikon kecil di kiri item menu mobile. */
function MobileItemIcon({
  icon: Icon,
  active,
}: {
  icon?: React.ElementType;
  active?: boolean;
}) {
  if (!Icon) return null;
  return (
    <span
      className={cn(
        "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-colors",
        active ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-500",
      )}
    >
      <Icon className="h-4 w-4" strokeWidth={2} />
    </span>
  );
}

function MobileMenuItem({
  title,
  href,
  items,
  onClose,
  icon: Icon,
  aplikasiLuar,
}: {
  title: string;
  /** Link langsung untuk menu tanpa dropdown. */
  href?: string;
  items?: Array<{
    title: string;
    href: string;
    description: string;
    subItems?: Array<{ title: string; href: string; description: string }>;
  }>;
  onClose: () => void;
  icon?: React.ElementType;
  /** Dilayani aplikasi lain (mis. Antrian) — lihat NavMenu.aplikasiLuar. */
  aplikasiLuar?: boolean;
}) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [expandedSubMenu, setExpandedSubMenu] = React.useState<string | null>(
    null,
  );

  if (!items) {
    const resolvedHref = href ?? `/${title.toLowerCase().replace(/\s+/g, "-")}`;
    const className =
      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[0.925rem] font-medium text-slate-700 transition-colors hover:bg-[#495E57]/8 hover:text-[#495E57]";
    // Aplikasi lain → `<a>` biasa di tab yang sama (muat-ulang penuh).
    // Situs luar → `<a>` di tab baru. Sisanya baru boleh lewat router Next.
    if (aplikasiLuar || isExternalHref(resolvedHref)) {
      const tabBaru = !aplikasiLuar;
      return (
        <a
          href={resolvedHref}
          {...(tabBaru ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className={className}
          onClick={onClose}
        >
          <MobileItemIcon icon={Icon} />
          {title}
        </a>
      );
    }
    return (
      <Link href={resolvedHref} className={className} onClick={onClose}>
        <MobileItemIcon icon={Icon} />
        {title}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setIsExpanded((prev) => !prev)}
        aria-expanded={isExpanded}
        className={cn(
          "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-[0.925rem] font-medium transition-colors",
          isExpanded
            ? "bg-primary/5 text-primary"
            : "text-slate-700 hover:bg-[#495E57]/8 hover:text-[#495E57]",
        )}
      >
        <span className="flex items-center gap-3">
          <MobileItemIcon icon={Icon} active={isExpanded} />
          {title}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 flex-shrink-0 text-slate-400 transition-transform duration-300 ease-out",
            isExpanded && "rotate-180 text-primary",
          )}
          strokeWidth={2}
        />
      </button>

      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-out",
          isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="ml-[1.35rem] mt-1 space-y-0.5 border-l border-slate-200 pl-3 pb-1">
          {items.map((item) => {
            if (item.subItems) {
              return (
                <div key={item.title} className="space-y-1">
                  <button
                    onClick={() =>
                      setExpandedSubMenu((prev) =>
                        prev === item.title ? null : item.title,
                      )
                    }
                    className={cn(
                      "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors",
                      expandedSubMenu === item.title
                        ? "text-primary"
                        : "text-slate-600 hover:bg-[#495E57]/8 hover:text-[#495E57]",
                    )}
                  >
                    <span>{item.title}</span>
                    <ChevronRight
                      className={cn(
                        "h-3.5 w-3.5 flex-shrink-0 text-slate-400 transition-transform duration-300 ease-out",
                        expandedSubMenu === item.title && "rotate-90 text-primary",
                      )}
                      strokeWidth={2}
                    />
                  </button>
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-out",
                      expandedSubMenu === item.title
                        ? "max-h-[1000px] opacity-100"
                        : "max-h-0 opacity-0",
                    )}
                  >
                    <div className="ml-3 mt-0.5 space-y-0.5 border-l border-slate-200 pl-3 pb-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          className="block rounded-lg px-3 py-1.5 text-[0.83rem] text-slate-500 transition-colors hover:bg-[#495E57]/8 hover:text-[#495E57]"
                          onClick={onClose}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.title}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-[#495E57]/8 hover:text-[#495E57]"
                onClick={onClose}
              >
                {item.title}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Navigation config
// ---------------------------------------------------------------------------

// Icon mapping for navigation items
const navigationIcons: { [key: string]: React.ElementType } = {
  Permohonan: FileText,
  "Pelayanan Online": Building2,
  Pengaduan: ShieldAlert,
  WBS: ShieldAlert,
  Produk: FileText,
  "Media Informasi": Newspaper,
  Gallery: ImageIcon,
  "Hubungi Kami": Phone,
  PPID: Landmark,
  "Survei Kepuasan Masyarakat": Gauge,
  Antrian: Ticket,
};

// navigationItems dipindah ke lib/navigation.ts (dipakai juga oleh dashboard Konten).

function AuthArea({
  mobile,
  onNavigate,
}: {
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [loggingOut, setLoggingOut] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  // Tutup dropdown saat klik di luar.
  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    if (open) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success("Berhasil keluar");
      setOpen(false);
      onNavigate?.();
      router.push("/login");
      router.refresh();
    } catch {
      toast.error("Gagal keluar, coba lagi");
    } finally {
      setLoggingOut(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <Button
        asChild
        className={cn(
          mobile && "w-full",
          "transition-all duration-300 ease-out hover:shadow-lg hover:scale-105 hover:-translate-y-0.5 active:scale-95 active:translate-y-0",
        )}
      >
        <Link href="/login" onClick={onNavigate}>
          Login/Daftar
        </Link>
      </Button>
    );
  }

  const displayName = user?.name || user?.user_id || "Pengguna";
  // Petugas (level 1-2) ke dashboard admin; warga/OPD langsung ke pengajuan.
  const isPetugas = (user?.level ?? 3) <= 2;
  const areaHref = isPetugas ? "/dashboard" : "/user/pengajuan";
  const areaLabel = isPetugas ? "Dashboard" : "Pengajuan Saya";
  // Dropdown akun sengaja dijaga tetap ringkas: petugas → Dashboard, warga/OPD
  // → Pengajuan Saya, keduanya + Pengaturan Akun. Menu "Ajukan Permohonan"
  // TIDAK ditaruh di sini karena jalurnya sudah ada di tempat yang tepat:
  // petugas lewat sidebar dashboard ("Pengajuan Baru"), warga/OPD lewat tombol
  // di halaman Pengajuan Saya.

  // ── Mobile: tersusun vertikal di dalam sheet ──
  if (mobile) {
    return (
      <div className="w-full space-y-1">
        <div className="flex items-center gap-2 px-1 py-2 text-sm font-medium">
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-900 text-white">
            <UserIcon className="h-4 w-4" />
          </span>
          <span className="truncate">{displayName}</span>
        </div>
        <Link
          href={areaHref}
          onClick={onNavigate}
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent/50"
        >
          <LayoutDashboard className="h-4 w-4" /> {areaLabel}
        </Link>
        <Link
          href="/profil"
          onClick={onNavigate}
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent/50"
        >
          <UserIcon className="h-4 w-4" /> Pengaturan Akun
        </Link>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
        >
          {loggingOut ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="h-4 w-4" />
          )}
          Keluar
        </button>
      </div>
    );
  }

  // ── Desktop: dropdown saat klik nama ──
  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((p) => !p)}
        className={cn(
          "inline-flex items-center gap-2 rounded-md px-2.5 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-[#495E57]/10",
          open && "bg-[#495E57]/10",
        )}
      >
        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#495E57]/12 text-[#45474B] ring-1 ring-[#495E57]/25">
          <UserIcon className="h-4 w-4" />
        </span>
        <span className="max-w-[10rem] truncate text-slate-700">{displayName}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-slate-500 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {/* Panel selalu dirender agar bisa dianimasikan buka/tutup (fade + slide + scale) */}
      <div
        className={cn(
          "absolute right-0 top-full mt-2 min-w-52 rounded-xl py-1 z-50 origin-top-right",
          "transition-all duration-200 ease-out",
          open
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible pointer-events-none -translate-y-1 scale-95 opacity-0",
        )}
        style={{
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(202,138,4,0.12)",
          boxShadow: "0 8px 32px rgba(202,138,4,0.15)",
        }}
      >
          <Link
            href={areaHref}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm transition-colors hover:bg-accent/50"
          >
            <LayoutDashboard className="h-4 w-4" /> {areaLabel}
          </Link>
          <Link
            href="/profil"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm transition-colors hover:bg-accent/50"
          >
            <UserIcon className="h-4 w-4" /> Pengaturan Akun
          </Link>
          <div className="my-1 border-t" />
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-60"
          >
            {loggingOut ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <LogOut className="h-4 w-4" />
            )}
            Keluar
          </button>
      </div>
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [logoHovered, setLogoHovered] = React.useState(false);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  // Akun OPD (level 4): navbar disederhanakan — hanya Permohonan; pengaturan
  // akun tetap lewat dropdown profil.
  const isOpd = isAuthenticated && user?.level === 4;

  // Menu bawaan (lib/navigation.ts) + sub-menu tambahan yang dibuat admin
  // lewat dashboard. Bawaan tidak pernah tersimpan di DB sehingga tak bisa
  // terhapus dari editor — lihat lib/navigasi-tambahan.ts.
  const cmsNav = useStaticContent([KUNCI_NAVIGASI]);
  const menuTambahan = (cmsNav[KUNCI_NAVIGASI]?.menu ?? []) as MenuTambahan[];
  const menuGabungan = React.useMemo(
    () => gabungNavigasi(menuTambahan),
    // Bandingkan isinya, bukan identitas array — useStaticContent membuat
    // objek baru tiap fetch sehingga perbandingan referensi selalu meleset.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(menuTambahan)],
  );

  const menuItems = isOpd
    ? [{ title: "Permohonan", href: "/user/pengajuan" } satisfies (typeof navigationItems)[number]]
    : menuGabungan;

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dashboard petugas punya top-bar & sidebar sendiri — navbar publik disembunyikan.
  if (pathname?.startsWith("/dashboard")) return null;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500 ease-out glass-nav",
        isScrolled
          ? "shadow-lg shadow-amber-900/20"
          : "shadow-md shadow-amber-900/10",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex min-h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 sm:space-x-3 group flex-shrink-0"
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
          >
            <div
              className={cn(
                "relative w-10 h-10 transition-all duration-500 ease-out",
                logoHovered && "scale-120",
              )}
            >
              <Image
                src="/LOGO-dinas_tidore.png"
                alt="DISDUKCAPIL Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span
                className={cn(
                  "font-bold text-base leading-tight transition-all duration-300 ease-out text-[#45474B]",
                  logoHovered && "text-[#495E57] translate-x-1",
                )}
              >
                DAGA
              </span>
              <span
                className={cn(
                  "hidden sm:block text-xs leading-tight transition-all duration-300 ease-out text-slate-500",
                  logoHovered && "translate-x-1",
                )}
              >
                Disdukcapil Kota Tidore Kepulauan
              </span>
            </div>
          </Link>

          {/* Desktop Navigation.
              Ambang 1360px, bukan `lg` (1024px): deretan menu memakai
              flex-nowrap + whitespace-nowrap sehingga TIDAK bisa menyusut — di
              layar yang lebih sempit ia mendorong blok kanan (flex-shrink-0)
              keluar layar, membuat SELURUH halaman bisa digeser menyamping.
              Angka 1360 = logo 241 + menu 726 + blok kanan 270 + padding & gap.
              Di bawah ambang ini navigasi memakai panel hamburger yang selalu muat.

              `min-w-0` + `overflow-x-auto`: jaring pengaman. Admin bisa menambah
              menu sendiri (blok konten `navigasi.tambahan`), jadi lebar deretan
              ini tidak terbatas — kalau sampai melebihi ruang, yang bergeser
              cukup deretan menunya, bukan seluruh halaman.
              ⚠️ Karena kotak ini ber-overflow, panel dropdown TIDAK boleh jadi
              anaknya (pasti ter-clip & tak bisa diklik) — lihat portal di
              `DropdownMenu`. Jangan tambahkan elemen mengambang di sini.

              Menu "Beranda" sengaja tidak ada di deret desktop (logo di kiri
              sudah menuju "/"); ia tetap tersedia di panel hamburger. */}
          <div className="hidden min-[1360px]:flex items-center flex-nowrap gap-0.5 flex-1 min-w-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden justify-center px-2">
            {menuItems.map((item) => {
              // Menu tanpa dropdown → link langsung (mis. Pelayanan Online).
              if (!item.items?.length && item.href) {
                const Icon = navigationIcons[item.title];
                // Aplikasi lain (Antrian) & situs luar sama-sama tidak boleh
                // lewat router Next; bedanya cuma tab baru atau tidak.
                const external = item.aplikasiLuar || isExternalHref(item.href);
                const linkClassName = cn(
                  "relative px-2.5 py-2 text-sm font-medium flex items-center gap-1.5 rounded-md whitespace-nowrap text-slate-700",
                  "transition-all duration-300 ease-out",
                  "hover:text-[#495E57] hover:bg-[#495E57]/10",
                  "before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-0.5 before:bg-[#F4CE14]",
                  "before:transition-all before:duration-300 before:ease-out",
                  "hover:before:w-[calc(100%-1.25rem)]",
                );
                if (external) {
                  const tabBaru = !item.aplikasiLuar;
                  return (
                    <a
                      key={item.title}
                      href={item.href}
                      {...(tabBaru
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className={linkClassName}
                    >
                      {Icon && <Icon className="h-4 w-4 flex-shrink-0" strokeWidth={2} />}
                      {item.title}
                    </a>
                  );
                }
                return (
                  <Link key={item.title} href={item.href} className={linkClassName}>
                    {Icon && <Icon className="h-4 w-4 flex-shrink-0" strokeWidth={2} />}
                    {item.title}
                  </Link>
                );
              }
              return (
                <DropdownMenu
                  key={item.title}
                  title={item.title}
                  items={item.items}
                  icon={navigationIcons[item.title]}
                />
              );
            })}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden min-[1360px]:flex items-center gap-1.5 flex-shrink-0">
            <NotificationBell tone="onLight" />
            <AuthArea />
          </div>

          {/* Mobile & tablet: lonceng notifikasi + hamburger */}
          <div className="flex items-center gap-1 min-[1360px]:hidden">
            <NotificationBell tone="onLight" />
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  aria-label="Buka menu navigasi"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#45474B]/15 bg-white/50 text-[#45474B] backdrop-blur transition-colors hover:bg-[#495E57]/10"
                >
                  <Menu className="h-5 w-5" strokeWidth={2} />
                </button>
              </SheetTrigger>
            <SheetContent
              side="right"
              showCloseButton={false}
              className="flex w-[320px] flex-col gap-0 border-l-0 p-0 sm:w-[380px] sm:max-w-[380px]"
            >
              {/* Kepala panel: identitas + tombol tutup */}
              <div
                className="flex items-center justify-between px-5 py-4"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(255,251,235,0.8) 100%)",
                  borderBottom: "1px solid rgba(202,138,4,0.22)",
                  backdropFilter: "blur(16px) saturate(180%)",
                  WebkitBackdropFilter: "blur(16px) saturate(180%)",
                }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="relative h-9 w-9">
                    <Image
                      src="/LOGO-dinas_tidore.png"
                      alt="Logo DAGA"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold leading-tight text-[#45474B]">DAGA</p>
                    <p className="text-[0.7rem] leading-tight text-slate-500">
                      Disdukcapil Kota Tidore Kepulauan
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Tutup menu"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#495E57]/10 text-slate-600 transition-colors hover:bg-[#495E57]/18"
                >
                  <X className="h-4 w-4" strokeWidth={2} />
                </button>
              </div>

              {/* Isi menu (scroll) */}
              <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
                <p className="px-3 pb-1.5 text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">
                  Menu
                </p>
                {!isOpd && (
                  <Link
                    href="/"
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[0.925rem] font-medium text-slate-700 transition-colors hover:bg-[#495E57]/8 hover:text-[#495E57]"
                    onClick={() => setMobileOpen(false)}
                  >
                    <MobileItemIcon icon={Home} />
                    Beranda
                  </Link>
                )}

                {menuItems.map((item) => (
                  <MobileMenuItem
                    key={item.title}
                    title={item.title}
                    href={item.href}
                    items={item.items}
                    onClose={() => setMobileOpen(false)}
                    icon={navigationIcons[item.title]}
                    aplikasiLuar={item.aplikasiLuar}
                  />
                ))}

              </nav>

              {/* Area akun menempel di bawah */}
              <div className="border-t border-slate-100 bg-slate-50/80 p-4">
                <AuthArea mobile onNavigate={() => setMobileOpen(false)} />
              </div>
            </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}
