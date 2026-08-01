# Deploy DAGA (tidore-platform) — CUTOVER PENUH ke Next.js

Build dilakukan di **LOKAL**; hanya **output build** (`.next/standalone` + `static` +
`public`) yang dikirim — **source code tidak diunggah**.

## Tujuan akhir
**DAGA (Next.js) memegang domain utama `disdukcapil.tidorekota.go.id`.
Laravel lama DIMATIKAN 100%** (vhost dinonaktifkan; file & DB-nya tetap disimpan
sebagai cadangan sampai dinyatakan aman).

| | Sebelum | Sesudah cutover |
|---|---|---|
| Domain utama | Laravel/PHP (`tidore.conf`) | **DAGA** (`daga.conf` → proxy `127.0.0.1:3001`) |
| Apache | mod_php melayani PHP | **reverse proxy saja** |
| DB | `u179716481_dbtidorecapil001` | **`daga`** (hasil migrasi ETL) |
| SSL | snakeoil (self-signed) | **Let's Encrypt** (certbot) |

**DNS sudah menunjuk ke server ini** (`disdukcapil.tidorekota.go.id` → `76.13.17.46`),
jadi SSL asli bisa langsung diterbitkan.

## 0. Sekali saja: SSH tanpa password
```bash
cat ~/.ssh/id_ed25519.pub | ssh root@76.13.17.46 "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
```

## 1. Siapkan env runtime
```bash
cp deploy/.env.example deploy/.env
```
Isi: `DB_PASSWORD` + `DATABASE_URL`, `AUTH_SECRET` (`openssl rand -hex 32`),
`MASTER_PASSWORD`, `RECAPTCHA_V3_SECRET_KEY` & `MAIL_*` (opsional).

## 2. Buat user DB di server (sekali)
```bash
ssh root@76.13.17.46 "mysql -e \"CREATE USER IF NOT EXISTS 'daga'@'localhost' IDENTIFIED BY 'ISI_PASSWORD'; GRANT ALL ON \\\`daga\\\`.* TO 'daga'@'localhost'; FLUSH PRIVILEGES;\""
```

## 3. Provision (sekali) — Node 20 + PM2 + modul proxy + certbot
```bash
bash deploy/deploy.sh --provision
```
> **Tidak** memasang vhost dan **tidak** mematikan Laravel — situs lama tetap live.
> (Dua vhost dengan `ServerName` sama akan bentrok, jadi pemasangan vhost ditunda
> sampai `--cutover`.)

## 4. Impor data hasil migrasi (ETL)
```bash
bash deploy/deploy.sh --db-sync
```
Dump DB lokal `tidore` → impor ke DB `daga` di server.

## 5. Deploy bundle & uji (Laravel MASIH live)
```bash
bash deploy/deploy.sh
```
Uji Next dari server sebelum menyerahkan domain:
```bash
ssh root@76.13.17.46 "curl -sI -H 'Host: disdukcapil.tidorekota.go.id' http://127.0.0.1:3001/ | head -3"
```
Harus `HTTP/1.1 200 OK`. **Jangan lanjut ke cutover kalau belum 200.**

## 6. ⚠️ CUTOVER — matikan Laravel, serahkan domain ke DAGA
```bash
bash deploy/deploy.sh --cutover
```
- Menonaktifkan `tidore.conf` & `tidore-ssl.conf` (file **tetap ada**).
- Mengaktifkan `daga.conf`; `configtest` gagal → **otomatis rollback** ke Laravel.
- Daftar vhost sebelum cutover dicadangkan ke `/root/vhost-sebelum-cutover.txt`.

**Rollback manual (kalau perlu):**
```bash
ssh root@76.13.17.46 "a2dissite daga && a2ensite tidore tidore-ssl && systemctl reload apache2"
```

## 7. SSL asli (Let's Encrypt)
```bash
ssh root@76.13.17.46 "certbot --apache -d disdukcapil.tidorekota.go.id -d www.disdukcapil.tidorekota.go.id --agree-tos -m EMAIL_ADMIN --redirect -n"
```
Setelah HTTPS aktif:
1. **hapus** baris `AUTH_COOKIE_SECURE=false` di `deploy/.env` (agar cookie sesi `Secure`),
2. `bash deploy/deploy.sh` (deploy ulang dengan env baru).

## Catatan penting
- **Uploads warga (25.385 scan KTP/KK)** di-symlink ke **`storage/permohonan`**,
  **BUKAN** `public/uploads`. Berkas di `public/` disajikan Next sebagai aset statis
  **tanpa cek sesi**; lewat `storage/` ia dilayani `app/uploads/[...path]/route.ts`
  yang menegakkan izin (staff = semua; warga = hanya miliknya).
- **`next build --webpack` WAJIB** — Turbopack + `output: standalone` menghasilkan
  nama modul ber-hash yang gagal di-resolve saat runtime (sharp/@prisma/client).
- **sharp** & **engine Prisma** OS-specific. Engine Linux ikut dari build lokal
  (`binaryTargets = debian-openssl-3.0.x`); binary sharp Linux dipasang di server.
- Hentikan `npm run dev` sebelum deploy agar `prisma generate` tidak kena EPERM di Windows.
- `deploy/.env` berisi rahasia → **gitignored**, jangan commit.
- **Jangan hapus** `/var/www/html` (Laravel + 14 GB uploads) sampai DAGA terbukti stabil —
  uploads-nya masih dipakai DAGA lewat symlink.
