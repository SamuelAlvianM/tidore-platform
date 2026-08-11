import { Suspense } from "react";
import RegisterContent from "./RegisterContent";
import type { Metadata } from "next";

// Halaman akun/pribadi: tidak berguna di hasil pencarian dan hanya
// mengencerkan halaman layanan yang justru dicari warga.
export const metadata: Metadata = {
  title: "Daftar Akun",
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterContent />
    </Suspense>
  );
}
