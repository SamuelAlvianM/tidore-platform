#!/usr/bin/env bash
set -euo pipefail
# ---------------------------------------------------------------------------
# deploy.sh — Build DAGA (tidore-platform) di LOKAL, kirim HANYA .next/standalone
# ke VPS, jalankan via PM2 di belakang Apache reverse-proxy.
# TUJUAN AKHIR: DAGA memegang domain utama disdukcapil.tidorekota.go.id;
# Laravel lama dimatikan 100% (lihat --cutover).
# Source code TIDAK dikirim — hanya output build (standalone + static + public).
#
# Jalankan dari root tidore-platform:
#   bash deploy/deploy.sh                 # build + kirim bundle + restart PM2
#   bash deploy/deploy.sh --provision     # (sekali) pasang Node20/PM2 + modul proxy + certbot
#   bash deploy/deploy.sh --db-sync       # buat DB server + IMPOR data migrasi dari lokal
#   bash deploy/deploy.sh --cutover       # ⚠️ MATIKAN Laravel & serahkan domain utama ke DAGA
#   bash deploy/deploy.sh --skip-build    # pakai build yang sudah ada
#
# Urutan aman: --provision → --db-sync → (deploy biasa, uji) → --cutover
# ---------------------------------------------------------------------------

REMOTE="${REMOTE:-root@76.13.17.46}"
REMOTE_DIR="/root/tidore-platform"
PORT="${PORT:-3001}"
LOCAL_DB="${LOCAL_DB:-tidore}"          # DB lokal berisi data hasil ETL
LOCAL_DB_USER="${LOCAL_DB_USER:-root}"
LOCAL_DB_PASS="${LOCAL_DB_PASS:-saibatin123}"
SERVER_DB="${SERVER_DB:-daga}"          # DB baru di server utk DAGA (terpisah dari Laravel)
SHARP_VER="0.35.3"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

PROVISION=false; DB_SYNC=false; SKIP_BUILD=false; CUTOVER=false
for a in "$@"; do case "$a" in
  --provision) PROVISION=true ;; --db-sync) DB_SYNC=true ;; --skip-build) SKIP_BUILD=true ;;
  --cutover) CUTOVER=true ;;
esac; done

G='\033[0;32m'; Y='\033[1;33m'; R='\033[0;31m'; N='\033[0m'
log(){ echo -e "${G}[deploy]${N} $*"; }; warn(){ echo -e "${Y}[warn]${N} $*"; }; err(){ echo -e "${R}[error]${N} $*"; exit 1; }

[[ -f deploy/.env ]] || err "deploy/.env tidak ada. Salin dari deploy/.env.example lalu isi."

# Mode SETUP-ONLY: --provision/--db-sync/--cutover digabung --skip-build → hanya
# tugas server (belum perlu ada hasil build sama sekali).
SETUP_ONLY=false
if [[ "$SKIP_BUILD" == true ]] && { [[ "$PROVISION" == true ]] || [[ "$DB_SYNC" == true ]] || [[ "$CUTOVER" == true ]]; }; then
  SETUP_ONLY=true
  warn "Mode setup-only: build & transfer bundle dilewati."
fi

# ============================================================ BUILD (lokal)
if [[ "$SETUP_ONLY" == false && "$SKIP_BUILD" == false ]]; then
  log "prisma generate (sertakan engine Linux debian-openssl-3.0.x)..."
  npx prisma generate || err "prisma generate gagal (stop dev server dulu bila EPERM)."
  # --webpack WAJIB: Turbopack+standalone hasilkan modul ber-hash yg gagal resolve runtime.
  log "next build --webpack (standalone)..."
  npx next build --webpack || err "build gagal."
else
  warn "Build di-skip."
fi
if [[ "$SETUP_ONLY" == false ]]; then
  [[ -d .next/standalone ]] || err ".next/standalone tidak ada — jangan pakai --skip-build."
  find .next/standalone -name "libquery_engine-debian-openssl-3.0.x.so.node" | grep -q . \
    || warn "Engine Prisma Linux belum terlihat di standalone — cek binaryTargets."

  # ========================================================== RAKIT BUNDLE (artefak saja)
  log "Rakit bundle standalone (static + public + tessdata)..."
  # ⚠️ WAJIB: `next build` ikut menyalin folder data runtime `storage/` (dan `app/uploads`)
  # ke dalam standalone. Di laptop, storage/permohonan berisi 25.4rb SCAN KTP/KK WARGA (14 GB)
  # hasil ekstraksi backup — kalau ikut ter-tar, deploy (a) mengirim 14 GB tak berguna
  # tiap kali, (b) MENIMPA symlink storage/permohonan di server dengan direktori nyata
  # berisi salinan separuh → lampiran 404 (persis insiden 2026-08-01 §I3-14; akarnya ini,
  # bukan "transfer terputus"). Berkas warga hidup di /var/www/html/uploads dan HANYA
  # ditunjuk symlink — jangan pernah ikut dikirim.
  rm -rf .next/standalone/storage
  rm -rf .next/standalone/.next/static .next/standalone/public .next/standalone/tessdata
  mkdir -p .next/standalone/.next
  cp -r .next/static .next/standalone/.next/static
  [[ -d public ]]   && cp -r public   .next/standalone/public
  [[ -d tessdata ]] && cp -r tessdata .next/standalone/tessdata
  # Mesin OCR (tesseract.js) — WAJIB disalin manual.
  # Next TIDAK menelusuri berkas ini karena tesseract memuatnya lewat path saat
  # runtime, bukan lewat import. Tanpa ini folder tesseract.js-core ikut terkirim
  # TAPI KOSONG dari .wasm, lalu emscripten abort() dan permintaan OCR
  # menggantung selamanya. Persis yang terjadi di produksi 11 Agu 2026.
  for m in tesseract.js/dist tesseract.js-core; do
    if [[ -d "node_modules/$m" ]]; then
      mkdir -p ".next/standalone/node_modules/$m"
      cp -r "node_modules/$m/." ".next/standalone/node_modules/$m/"
    fi
  done
  # Gagal cepat kalau ternyata tetap kosong — lebih baik daripada deploy diam-diam rusak.
  ls .next/standalone/node_modules/tesseract.js-core/*.wasm >/dev/null 2>&1   || err "tesseract.js-core/*.wasm tidak ikut ke bundle — OCR akan menggantung di server."

  # Buang .env DEV yg ikut disalin Next → jangan menimpa .env produksi server.
  # `.env.development.local` ikut disebut: isinya nilai khusus laptop (mis.
  # NEXT_PUBLIC_ANTRIAN_URL ke localhost:3000) yang tak boleh nyasar ke server.
  rm -f .next/standalone/.env .next/standalone/.env.local .next/standalone/.env.production \
        .next/standalone/.env.development .next/standalone/.env.development.local \
        .next/standalone/.env.example
fi

# ============================================================ KIRIM CONFIG + PROVISION
ssh "$REMOTE" "mkdir -p '$REMOTE_DIR/deploy'"
scp deploy/ecosystem.config.cjs "$REMOTE:$REMOTE_DIR/"
scp deploy/apache-daga.conf     "$REMOTE:$REMOTE_DIR/deploy/"

if [[ "$PROVISION" == true ]]; then
  log "Provision: Node 20 + PM2 + modul proxy + certbot (Apache & MySQL 8 sudah disiapkan)..."
  # CATATAN: provision TIDAK memasang vhost DAGA — selama Laravel masih memegang
  # domain, dua vhost dengan ServerName sama akan bentrok. Pemasangan vhost +
  # mematikan Laravel dilakukan terpisah & sadar lewat --cutover.
  ssh "$REMOTE" bash <<EOF
set -e
if ! command -v node >/dev/null || [ "\$(node -v | cut -c2-3)" -lt 20 ]; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  DEBIAN_FRONTEND=noninteractive apt-get install -y nodejs
fi
command -v pm2 >/dev/null || npm install -g pm2
a2enmod proxy proxy_http headers >/dev/null 2>&1 || true
command -v certbot >/dev/null || { DEBIAN_FRONTEND=noninteractive apt-get update -qq; \
  DEBIAN_FRONTEND=noninteractive apt-get install -y certbot python3-certbot-apache; }
mkdir -p /var/www/certbot/.well-known/acme-challenge
apache2ctl configtest && systemctl reload apache2
echo "node: \$(node -v) | pm2: \$(pm2 -v) | certbot: \$(certbot --version 2>&1 | head -1)"
echo "Laravel MASIH melayani domain (belum cutover) — ini disengaja."
EOF
fi

# ============================================================ CUTOVER (⚠️ mematikan Laravel)
if [[ "$CUTOVER" == true ]]; then
  warn "CUTOVER: Laravel akan DIMATIKAN; domain utama diserahkan ke DAGA."
  ssh "$REMOTE" bash <<EOF
set -e
# Cadangkan daftar vhost aktif → memudahkan rollback.
ls /etc/apache2/sites-enabled/ > /root/vhost-sebelum-cutover.txt
cp '$REMOTE_DIR/deploy/apache-daga.conf' /etc/apache2/sites-available/daga.conf
# Matikan vhost Laravel (file-nya TETAP ada → rollback: a2ensite tidore tidore-ssl).
a2dissite tidore tidore-ssl >/dev/null 2>&1 || true
a2ensite daga >/dev/null 2>&1
if apache2ctl configtest; then
  systemctl reload apache2
  echo "✅ vhost DAGA aktif; Laravel dinonaktifkan."
else
  echo "❌ configtest GAGAL → kembalikan Laravel"; a2dissite daga; a2ensite tidore tidore-ssl; systemctl reload apache2; exit 1
fi
echo "--- vhost aktif sekarang ---"; ls /etc/apache2/sites-enabled/
EOF
  log "Cutover vhost selesai. Terbitkan SSL asli (DNS sudah menunjuk ke server ini):"
  echo "    ssh $REMOTE \"certbot --apache -d disdukcapil.tidorekota.go.id -d www.disdukcapil.tidorekota.go.id --agree-tos -m <email-admin> --redirect -n\""
  warn "Setelah SSL aktif: hapus AUTH_COOKIE_SECURE=false di deploy/.env, ubah APP_URL ke https://…, lalu deploy ulang."
fi

# ============================================================ DB SYNC (impor data migrasi)
if [[ "$DB_SYNC" == true ]]; then
  command -v mysqldump >/dev/null || err "mysqldump tak ada di PATH lokal."
  log "Dump DB lokal '$LOCAL_DB' (data hasil ETL)..."
  DUMP="$(mktemp --suffix=.sql)"
  mysqldump -u"$LOCAL_DB_USER" -p"$LOCAL_DB_PASS" --single-transaction --no-tablespaces "$LOCAL_DB" > "$DUMP"
  log "Buat DB server '$SERVER_DB' + impor..."
  ssh "$REMOTE" "mysql -e \"CREATE DATABASE IF NOT EXISTS \\\`$SERVER_DB\\\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\""
  gzip -c "$DUMP" | ssh "$REMOTE" "gunzip | mysql '$SERVER_DB'"
  rm -f "$DUMP"
  warn "Pastikan deploy/.env DATABASE_URL menunjuk ke DB '$SERVER_DB' di server + user/password valid."
fi

if [[ "$SETUP_ONLY" == true ]]; then
  log "Setup-only selesai (build/transfer/PM2 dilewati)."
  exit 0
fi

# ============================================================ TRANSFER BUNDLE
log "Transfer bundle standalone ke server (source TIDAK ikut)..."
# --exclude ./storage: sabuk pengaman kedua (selain rm di atas) supaya berkas warga
# tidak pernah ikut terkirim & tidak menimpa symlink storage/permohonan di server.
tar czf - --exclude=./storage -C .next/standalone . | ssh "$REMOTE" "mkdir -p '$REMOTE_DIR' && tar xzf - -C '$REMOTE_DIR'"

# .env produksi FINAL (setelah bundle, agar tak tertimpa): secrets deploy/.env + NEXT_PUBLIC_ dari build.
log "Pasang .env produksi final di server..."
TMP_ENV="$(mktemp)"
{ cat deploy/.env; echo; grep '^NEXT_PUBLIC_' .env 2>/dev/null || true; } > "$TMP_ENV"
scp "$TMP_ENV" "$REMOTE:$REMOTE_DIR/.env"; rm -f "$TMP_ENV"
ssh "$REMOTE" "rm -f '$REMOTE_DIR/.env.local' '$REMOTE_DIR/.env.production' '$REMOTE_DIR/.env.development'"

# ============================================================ FINALIZE + PM2
log "Finalisasi (sharp Linux, symlink uploads Laravel, restart PM2)..."
ssh "$REMOTE" bash <<EOF
set -e
cd '$REMOTE_DIR'
if [ ! -d node_modules/@img/sharp-linux-x64 ]; then
  npm install --os=linux --cpu=x64 --libc=glibc "sharp@$SHARP_VER" --no-audit --no-fund --prefix . 2>/dev/null \
    || npm install "sharp@$SHARP_VER" --no-audit --no-fund || true
fi
# Uploads 14G Laravel dipakai bersama (symlink, JANGAN copy) → hemat disk.
# PENTING: di-symlink ke storage/permohonan, BUKAN public/uploads. Isinya scan
# KTP/KK/akta warga — kalau ditaruh di public/, Next menyajikannya sebagai aset
# STATIS tanpa cek sesi (siapa pun yang tahu URL bisa mengunduh). Lewat
# storage/, berkas dilayani app/uploads/[...path]/route.ts yang menegakkan izin
# (staff = semua; warga = hanya miliknya). public/uploads tetap dari bundle
# (hanya berkas publik: produk/ppid/berita/galeri).
mkdir -p storage app
# -sfn: tegakkan symlink SETIAP deploy. Dulu memakai '[ -e ] || ln -s' sehingga saat
# transfer bundle sempat menaruh direktori nyata di sini, symlink tidak pernah
# dipulihkan → berkas lampiran 404 (folder tersalin separuh). Kalau yang ada
# direktori nyata, pindahkan dulu supaya ln tidak menaruh symlink DI DALAMNYA.
if [ -e storage/permohonan ] && [ ! -L storage/permohonan ]; then
  mv storage/permohonan storage/permohonan-LAMA-\$(date +%s)
fi
ln -sfn /var/www/html/uploads storage/permohonan
set -a; source .env; set +a
command -v pm2 >/dev/null || npm install -g pm2
PORT=$PORT pm2 startOrRestart ecosystem.config.cjs --env production --update-env
pm2 save
pm2 status
EOF

log "Selesai."
if [[ "$CUTOVER" == true ]]; then
  log "DAGA sekarang melayani http://disdukcapil.tidorekota.go.id — terbitkan SSL (langkah 7 README)."
else
  log "Uji dulu dari server (Laravel masih melayani domain):"
  echo "    ssh $REMOTE \"curl -sI -H 'Host: disdukcapil.tidorekota.go.id' http://127.0.0.1:$PORT/ | head -3\""
  echo "    → kalau 200 OK, lanjut: bash deploy/deploy.sh --cutover"
fi
