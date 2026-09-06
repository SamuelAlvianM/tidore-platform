import { ok } from "@/lib/api-response";
import { kategoriTampil } from "@/lib/demografi-registri";

export const dynamic = "force-dynamic";

/**
 * Kategori demografi yang boleh tampil di halaman publik.
 *
 * 🔴 Halaman publik TIDAK boleh memakai daftar bawaan di kode. Sejak dinas
 * bisa membuat kategorinya sendiri, daftar di kode cuma sebagian kebenaran —
 * kategori buatan dinas tidak akan pernah muncul di tab halaman utama meski
 * datanya sudah diimpor. Dan sebaliknya: kategori yang sengaja disembunyikan
 * lewat "Tampilkan di Halaman utama" tetap terlihat warga.
 */
export async function GET() {
  return ok({ kategori: await kategoriTampil() });
}
