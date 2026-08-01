import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { fail } from "@/lib/api-response";
import { getSession } from "@/lib/auth";
import { buatPermohonanPdf } from "@/lib/permohonan-pdf";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) return fail(["Silakan login terlebih dahulu"], 401);

  const { id } = await params;
  const item = await prisma.permohonan.findUnique({
    where: { id: Number(id) },
    include: {
      jenis: true,
      user: {
        select: {
          userFullname: true,
          userId: true,
          userNik: true,
          userHp: true,
          userEmail: true,
        },
      },
      // Lampiran permohonan hasil migrasi ETL HANYA tercatat di t_berkas
      // (tidak di payload) — tanpa include ini PDF-nya keluar tanpa lampiran.
      berkas: {
        select: { namaFile: true, path: true },
        orderBy: { id: "asc" },
      },
    },
  });
  if (!item) return fail(["Permohonan tidak ditemukan"], 404);

  // Hanya pemilik atau admin/operator.
  if (session.level > 2 && item.userId !== session.uid) {
    return fail(["Akses ditolak"], 403);
  }

  const payload: Record<string, unknown> =
    item.payload && typeof item.payload === "object"
      ? (item.payload as Record<string, unknown>)
      : {};

  const buffer = await buatPermohonanPdf({
    noregister: item.noregister,
    jenis: item.jenis?.nama ?? "-",
    tanggal: new Date(item.createdAt).toLocaleString("id-ID", {
      dateStyle: "long",
      timeStyle: "short",
    }),
    status: item.status,
    catatan: item.catatan,
    pemohon: item.user?.userFullname ?? item.user?.userId ?? "-",
    // userId = NIK saat warga mendaftar; dipakai bila kolom NIK belum terisi.
    pemohonNik: item.user?.userNik ?? item.user?.userId ?? null,
    pemohonHp: item.user?.userHp ?? null,
    pemohonEmail: item.user?.userEmail ?? null,
    berkas: item.berkas.map((b) => ({ label: b.namaFile, path: b.path })),
    prosesTanggal: item.prosesAt
      ? new Date(item.prosesAt).toLocaleString("id-ID", {
          dateStyle: "long",
          timeStyle: "short",
        })
      : null,
    prosesOleh: item.prosesByName,
    payload,
  });

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      // `inline` agar PDF LANGSUNG TAMPIL di tab baru (tautan memakai
      // target="_blank"); pengguna tetap bisa menyimpannya dari penampil PDF.
      "Content-Disposition": `inline; filename="permohonan-${item.noregister}.pdf"`,
    },
  });
}
