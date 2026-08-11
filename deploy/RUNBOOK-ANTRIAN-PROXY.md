# Runbook — menyambungkan aplikasi ANTRIAN ke domain DAGA (sisi Apache)

> Dikerjakan di server `76.13.17.46` (root). Semua perintah di bawah dijalankan
> **di shell server**, bukan dari laptop.

## Apa yang sedang disambung

`/antrian` **bukan rute DAGA**. Ia aplikasi terpisah:

| | DAGA (portal) | Antrian loket |
|---|---|---|
| Repo / folder | `tidore-platform` → `/root/tidore-platform` | `antrian-dukcapil` → `/var/www/antrian` |
| Proses | pm2 `daga`, port **3001** | pm2 `antrian`, port **3000** |
| Database | MySQL 8 `daga` | PostgreSQL `antrian_dukcapil` |
| Realtime | — | Socket.IO (butuh WebSocket) |

Portal hanya **menautkan**: menu navbar "Antrian" mengarah ke
`NEXT_PUBLIC_ANTRIAN_URL` (default `/antrian`) sebagai `<a>` biasa, sehingga
browser memuat ulang penuh dan Apache-lah yang memutuskan siapa yang melayani.

Konsekuensi yang menyenangkan: **deploy DAGA dan update antrian tidak saling
mengganggu.** `bash deploy/deploy.sh` tidak menyentuh `/var/www/antrian`, dan
`git pull` di antrian tidak menyentuh DAGA.

Sisa pekerjaannya hanya di Apache — pemilik aplikasi antrian sudah menyelesaikan
bagiannya (PostgreSQL, build, pm2). Dia sengaja **tidak** menyentuh konfigurasi
Apache karena itu milik DAGA.

---

## 0. Pra-periksa (2 menit, wajib)

```bash
pm2 list
curl -sI http://127.0.0.1:3000/antrian | head -1
curl -s "http://127.0.0.1:3000/antrian/socket.io/?EIO=4&transport=polling" | head -c 80
```

Yang diharapkan: proses `antrian` **online**, perintah kedua `HTTP/1.1 200`,
perintah ketiga berisi `"sid"`.

> 🔴 **Kalau yang kedua 404 tapi `curl -sI http://127.0.0.1:3000/` 200**, artinya
> aplikasi itu di-build **tanpa** `NEXT_PUBLIC_BASE_PATH=/antrian`. Proxy di
> bawah akan ikut 404. Perbaikannya di sisi aplikasi antrian, bukan di Apache:
> isi `NEXT_PUBLIC_BASE_PATH=/antrian` di `/var/www/antrian/.env`, lalu
> `npm run build && pm2 restart antrian`. Nilainya dibaku saat **build**.

---

## 1. Aktifkan modul WebSocket

```bash
sudo a2enmod proxy_wstunnel
```

DAGA sendiri tidak memakainya, jadi modul ini memang belum aktif. Tanpa modul
ini indikator **"Langsung"** di halaman status warga tidak akan pernah menyala.

---

## 2. Sisipkan blok proxy ke DUA vhost

Berkas yang harus diubah:

- `/etc/apache2/sites-available/daga.conf` (vhost :80)
- `/etc/apache2/sites-available/daga-le-ssl.conf` (vhost :443 — **ini yang
  benar-benar melayani warga**)

⚠️ **Urutan menentukan.** Apache memakai aturan `ProxyPass` yang cocok pertama.
Blok ini wajib **di atas** baris `ProxyPass        / http://127.0.0.1:3001/`.
Kalau di bawah, `/antrian` tertelan DAGA.

### Cadangkan dulu

```bash
sudo cp /etc/apache2/sites-available/daga.conf        /root/daga.conf.bak-$(date +%F)
sudo cp /etc/apache2/sites-available/daga-le-ssl.conf /root/daga-le-ssl.conf.bak-$(date +%F)
```

### Siapkan potongan blok

```bash
sudo tee /root/antrian-proxy.conf > /dev/null <<'CONF'

    # --- Antrian loket → 127.0.0.1:3000 (aplikasi terpisah) -----------------
    # WAJIB di atas `ProxyPass / …:3001/`. Butuh modul proxy_wstunnel.
    RewriteEngine On
    RewriteCond %{HTTP:Upgrade} =websocket [NC]
    RewriteRule ^/antrian/socket\.io/(.*) ws://127.0.0.1:3000/antrian/socket.io/$1 [P,L]
    RewriteCond %{HTTP:Upgrade} !=websocket [NC]
    RewriteRule ^/antrian/socket\.io/(.*) http://127.0.0.1:3000/antrian/socket.io/$1 [P,L]

    ProxyPass        /antrian http://127.0.0.1:3000/antrian retry=0 timeout=90
    ProxyPassReverse /antrian http://127.0.0.1:3000/antrian
    # --- akhir blok Antrian --------------------------------------------------

CONF
```

### Sisipkan di kedua berkas

Disisipkan **tepat sebelum** baris `ProxyPass` root, dan hanya bila belum ada
(aman diulang):

```bash
for f in /etc/apache2/sites-available/daga.conf /etc/apache2/sites-available/daga-le-ssl.conf; do
  if grep -q '/antrian' "$f"; then
    echo "SUDAH ADA, dilewati: $f"
  else
    sudo awk '/ProxyPass +\/ +http:\/\/127\.0\.0\.1:3001\// && !done { while ((getline line < "/root/antrian-proxy.conf") > 0) print line; done=1 } { print }' "$f" > /tmp/vhost.baru \
      && sudo cp /tmp/vhost.baru "$f" && echo "DISISIPKAN: $f"
  fi
done
```

Periksa hasilnya sebelum melangkah — `/antrian` harus muncul **di atas**
`ProxyPass        /`:

```bash
grep -n 'ProxyPass' /etc/apache2/sites-available/daga.conf
grep -n 'ProxyPass' /etc/apache2/sites-available/daga-le-ssl.conf
```

> Kalau `awk` di atas terasa rumit, sunting manual dengan `nano` sama sahnya:
> tempel isi `/root/antrian-proxy.conf` tepat di atas baris `ProxyPass /`.

---

## 3. Terapkan

```bash
sudo apache2ctl configtest && sudo systemctl reload apache2
```

`reload` (bukan `restart`) tidak memutus koneksi warga yang sedang membuka DAGA.
Kalau `configtest` gagal, **jangan reload** — kembalikan dari cadangan (§ Mundur).

---

## 4. Verifikasi (dari luar server)

```bash
curl -sI https://disdukcapil.tidorekota.go.id/          | head -1   # portal DAGA → 200
curl -sI https://disdukcapil.tidorekota.go.id/antrian   | head -1   # antrian    → 200
curl -s "https://disdukcapil.tidorekota.go.id/antrian/socket.io/?EIO=4&transport=polling" | head -c 80
```

Lalu di browser:

- `https://disdukcapil.tidorekota.go.id/` — portal normal, menu navbar
  **"Antrian"** muncul paling kanan.
- Klik menu itu → halaman depan antrian terbuka (muat-ulang penuh, wajar).
- `.../antrian/status` → indikator **"Langsung"** hijau. Kalau tertulis
  "Menyambung…" terus: `proxy_wstunnel` belum aktif, atau blok socket.io kalah
  urutan.
- `.../antrian/loket` → dialihkan ke `.../antrian/login`.

---

## Mundur (rollback)

```bash
sudo cp /root/daga.conf.bak-YYYY-MM-DD        /etc/apache2/sites-available/daga.conf
sudo cp /root/daga-le-ssl.conf.bak-YYYY-MM-DD /etc/apache2/sites-available/daga-le-ssl.conf
sudo apache2ctl configtest && sudo systemctl reload apache2
```

Modul `proxy_wstunnel` boleh dibiarkan aktif — tidak berpengaruh ke DAGA.

---

## Keputusan terpisah: `pm2 startup` + `pm2 save`

Kondisi sekarang: **tidak ada** unit systemd `pm2-root`, jadi kalau VPS reboot
**DAGA maupun antrian sama-sama tidak menyala sendiri**. Ini kondisi bawaan yang
sudah ada sebelum antrian dipasang.

```bash
pm2 startup     # cetak satu perintah — jalankan perintah yang dicetak itu
pm2 save        # menyimpan daftar SEMUA app (daga + antrian) ke ~/.pm2/dump.pm2
```

Ini mengubah cara **DAGA** dijalankan (ikut dipulihkan otomatis), jadi memang
keputusan pemilik DAGA — bukan pemilik aplikasi antrian. Disarankan dijalankan:
tanpa ini, satu kali reboot membuat situs warga mati sampai ada yang login ke
server.

---

## Yang JANGAN dilakukan

- **Jangan** menaruh blok `/antrian` di bawah `ProxyPass /` (jadi tak berguna).
- **Jangan** menghapus `ProxyPass /.well-known/acme-challenge !` — certbot
  memerlukannya saat perpanjangan SSL.
- **Jangan** menjalankan `bash deploy/deploy.sh --db-sync` (menimpa DB produksi —
  journal §P.5). Tidak ada hubungannya dengan antrian, tapi tetap berlaku.
- **Jangan** menambah rute `/antrian` di dalam kode DAGA. Kalau suatu saat DAGA
  punya rute bernama sama, ia tidak akan pernah terpanggil — Apache mencegat
  lebih dulu.

## Setelah ini, cara update masing-masing

```bash
# Antrian (dikerjakan pemilik aplikasi antrian)
cd /var/www/antrian && git pull && npm ci && npm run build && pm2 restart antrian

# DAGA (dari laptop)
bash deploy/deploy.sh
```
