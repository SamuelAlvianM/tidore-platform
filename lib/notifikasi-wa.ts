import { kirimWa } from "@/lib/fonnte";
import { normalisasiHp } from "@/lib/otp";
import { siteConfig } from "@/lib/site-config";

/**
 * Notifikasi WhatsApp (Fonnte) untuk siklus pendaftaran akun warga:
 * pendaftaran diterima (masuk staging) → disetujui (aktif) / ditolak (+alasan).
 *
 * Semua fungsi tahan-gagal: bila FONNTE_TOKEN kosong atau nomor tidak valid,
 * mengembalikan false tanpa melempar — jadi aman dipanggil tanpa membungkus
 * try/catch dan tidak pernah menggagalkan alur utama (pendaftaran/aktivasi).
 */

const BASE = (siteConfig.url ?? "").replace(/\/$/, "");
const NAMA = "DAGA"; // nama portal untuk pesan

async function kirim(hp: string | null | undefined, pesan: string): Promise<boolean> {
  const target = normalisasiHp(hp ?? "");
  if (!target) return false;
  try {
    return await kirimWa(target, pesan);
  } catch {
    return false;
  }
}

/** Pendaftaran diterima → akun masuk tahap verifikasi (staging). */
export function waRegistrasiDiterima(hp: string | null | undefined, nama: string, nik: string) {
  return kirim(
    hp,
    `Halo ${nama},\n\n` +
      `Pendaftaran akun *${NAMA}* Anda (NIK ${nik}) telah kami TERIMA dan kini menunggu verifikasi petugas. ` +
      `Anda akan kami hubungi kembali setelah proses verifikasi selesai.\n\n` +
      `Cek status pendaftaran kapan saja:\n${BASE}/cek-pendaftaran\n\n` +
      `Terima kasih.`,
  );
}

/*
 * 🔴 DIMATIKAN — SENGAJA BELUM DISAMBUNG (keputusan user, 1 Sep 2026).
 *
 * `waAkunDisetujui()` dan `waAkunDitolak()` di bawah **tidak punya satu pun
 * pemanggil**. Alur setujui/tolak di `app/api/admin/users/route.ts` hanya
 * mengirim SUREL (`sendMail` + `tplAkunDisetujui`/`tplAkunDitolak`).
 *
 * Jadi warga dapat WhatsApp **saat mendaftar** (`waRegistrasiDiterima`, yang
 * memang dipakai), lalu **cuma surel** saat akunnya disetujui/ditolak.
 *
 * Ini BUKAN kode mati yang boleh dibuang begitu saja, dan BUKAN bug yang harus
 * langsung ditambal: fungsinya sudah jadi, tinggal dipanggil. Dibiarkan mati
 * sampai dinas memang mau notifikasi WA untuk tahap ini — menyambungkannya
 * berarti mulai mengirim pesan ke nomor warga sungguhan.
 *
 * CARA MENGHIDUPKAN (kalau nanti diminta): impor keduanya di
 * `app/api/admin/users/route.ts`, panggil bersebelahan dengan `sendMail` di
 * cabang setujui & tolak. Tidak ada perubahan lain yang diperlukan.
 *
 * Ditemukan lewat `tools/fungsi-yatim.py` — lihat `tools/README.md`.
 */

/** Akun disetujui/diaktifkan petugas. */
export function waAkunDisetujui(hp: string | null | undefined, nama: string) {
  return kirim(
    hp,
    `Halo ${nama},\n\n` +
      `Selamat! Akun *${NAMA}* Anda telah *AKTIF* dan siap digunakan untuk mengajukan permohonan administrasi kependudukan secara online.\n\n` +
      `Silakan masuk:\n${BASE}/login\n\n` +
      `Terima kasih telah menggunakan layanan kami.`,
  );
}

/** Pendaftaran ditolak dengan alasan; warga dapat mendaftar ulang. */
export function waAkunDitolak(hp: string | null | undefined, nama: string, alasan?: string | null) {
  return kirim(
    hp,
    `Halo ${nama},\n\n` +
      `Mohon maaf, pendaftaran akun *${NAMA}* Anda *BELUM DAPAT disetujui*.\n\n` +
      `Alasan: ${alasan?.trim() || "Persyaratan belum lengkap/valid."}\n\n` +
      `Silakan lengkapi/perbaiki persyaratan lalu daftar ulang di:\n${BASE}/register\n\n` +
      `Anda juga dapat memeriksa status di:\n${BASE}/cek-pendaftaran`,
  );
}
