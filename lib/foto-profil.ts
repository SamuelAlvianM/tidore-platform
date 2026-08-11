import { mkdir, unlink, writeFile } from "fs/promises";
import { join } from "path";
import sharp from "sharp";

/**
 * Penyimpanan foto wajah/selfie akun.
 *
 * Foto disimpan DI LUAR public/ (sama seperti berkas permohonan) karena berisi
 * wajah warga; penyajiannya lewat app/uploads/[...path]/route.ts yang menolak
 * pengakses tanpa hak. Nama berkas diawali id pemilik — itulah yang dipakai
 * route tersebut untuk menentukan kepemilikan.
 */
export const ROOT_PROFIL = join(process.cwd(), "storage", "profil");

/**
 * Sub-folder di bawah ROOT_PROFIL sekaligus segmen URL-nya
 * (`storage/profil/selfie/x.jpg` ⇄ `/uploads/selfie/x.jpg`), sehingga route
 * penyaji cukup menyambung path apa adanya.
 */
export const FOLDER_SELFIE = "selfie";
const DIR_SELFIE = join(ROOT_PROFIL, FOLDER_SELFIE);

/**
 * Foto/scan KTP pendaftar. Folder terpisah dari selfie supaya keduanya bisa
 * dihapus/diaudit sendiri-sendiri, tapi tetap di bawah storage/profil sehingga
 * kontrol akses app/uploads/[...path] berlaku sama (default-deny).
 */
export const FOLDER_KTP = "ktp";
const DIR_KTP = join(ROOT_PROFIL, FOLDER_KTP);

/** Batas data URL mentah. Klien sudah mengecilkan; ini jaring pengaman saja. */
const MAKS_BYTE = 4 * 1024 * 1024;

const POLA_DATA_URL = /^data:image\/(jpeg|jpg|png|webp);base64,/i;

/** Apakah nilai ini data URL gambar yang layak diproses? */
export function adalahDataUrlGambar(nilai: unknown): nilai is string {
  return typeof nilai === "string" && POLA_DATA_URL.test(nilai);
}

/**
 * Simpan foto selfie milik `userId`, kembalikan URL-nya (`/uploads/selfie/…`).
 * Mengembalikan null bila data tidak valid — pendaftaran tidak perlu gagal
 * hanya karena fotonya bermasalah.
 */
export async function simpanFotoProfil(
  dataUrl: string,
  userId: number,
): Promise<string | null> {
  if (!adalahDataUrlGambar(dataUrl)) return null;

  const base64 = dataUrl.slice(dataUrl.indexOf(",") + 1);
  const mentah = Buffer.from(base64, "base64");
  if (mentah.length === 0 || mentah.length > MAKS_BYTE) return null;

  try {
    // Dinormalkan ke JPEG: WebP dari HP Android tidak bisa disematkan pdfkit
    // dan tidak semua peramban lama menampilkannya. `rotate()` menerapkan
    // orientasi EXIF supaya foto dari HP tidak tampil miring.
    const jpeg = await sharp(mentah)
      .rotate()
      .resize(720, 720, { fit: "inside", withoutEnlargement: true })
      .flatten({ background: "#ffffff" })
      .jpeg({ quality: 80 })
      .toBuffer();

    const nama = `${userId}_${Date.now()}.jpg`;
    await mkdir(DIR_SELFIE, { recursive: true });
    await writeFile(join(DIR_SELFIE, nama), jpeg);
    return `/uploads/${FOLDER_SELFIE}/${nama}`;
  } catch {
    return null;
  }
}

/** Hapus berkas foto lama saat diganti; kegagalan diabaikan. */
export async function hapusFotoProfil(url: string | null | undefined) {
  if (!url) return;
  const nama = url.split("/").pop();
  if (!nama || nama.includes("..")) return;
  await unlink(join(DIR_SELFIE, nama)).catch(() => {});
}

/**
 * Simpan foto/scan KTP milik `userId`, kembalikan URL-nya (`/uploads/ktp/…`).
 *
 * Beda perlakuan dari selfie: KTP harus tetap TERBACA (NIK, nama, alamat),
 * jadi sisi terpanjangnya 1600px dengan kualitas 85 — bukan 720px/80 seperti
 * foto wajah. Tanpa itu tulisan pada KTP pecah dan petugas tidak bisa
 * memverifikasi. Ukurannya tetap dibatasi agar tidak membebani penyimpanan.
 */
export async function simpanFotoKtp(
  dataUrl: string,
  userId: number,
): Promise<string | null> {
  if (!adalahDataUrlGambar(dataUrl)) return null;

  const base64 = dataUrl.slice(dataUrl.indexOf(",") + 1);
  const mentah = Buffer.from(base64, "base64");
  if (mentah.length === 0 || mentah.length > MAKS_BYTE) return null;

  try {
    const jpeg = await sharp(mentah)
      .rotate()
      .resize(1600, 1600, { fit: "inside", withoutEnlargement: true })
      .flatten({ background: "#ffffff" })
      .jpeg({ quality: 85 })
      .toBuffer();

    const nama = `${userId}_${Date.now()}.jpg`;
    await mkdir(DIR_KTP, { recursive: true });
    await writeFile(join(DIR_KTP, nama), jpeg);
    return `/uploads/${FOLDER_KTP}/${nama}`;
  } catch {
    return null;
  }
}

/** Hapus berkas foto KTP lama saat diganti; kegagalan diabaikan. */
export async function hapusFotoKtp(url: string | null | undefined) {
  if (!url) return;
  const nama = url.split("/").pop();
  if (!nama || nama.includes("..")) return;
  await unlink(join(DIR_KTP, nama)).catch(() => {});
}
