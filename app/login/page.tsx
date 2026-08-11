import { Suspense } from "react";
import LoginContent from "./LoginContent";
import type { Metadata } from "next";

// Halaman akun/pribadi: tidak berguna di hasil pencarian dan hanya
// mengencerkan halaman layanan yang justru dicari warga.
export const metadata: Metadata = {
  title: "Masuk",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
