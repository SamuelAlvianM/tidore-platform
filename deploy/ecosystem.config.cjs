// PM2 untuk tidore-platform / DAGA (Next.js standalone). Secret dibaca dari
// process.env (di-source dari deploy/.env oleh deploy.sh). JANGAN hardcode secret.
module.exports = {
  apps: [
    {
      name: 'daga',
      // server.js dihasilkan Next di root .next/standalone (dikirim ke REMOTE_DIR).
      script: 'server.js',
      cwd: '/root/tidore-platform',
      instances: 1,
      exec_mode: 'fork',
      env_production: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 3001, // internal; publik lewat Apache reverse proxy
        HOSTNAME: '127.0.0.1',          // hanya localhost
        DATABASE_URL: process.env.DATABASE_URL,
        AUTH_SECRET: process.env.AUTH_SECRET,
        // Selama SSL asli belum terbit → cookie sesi TIDAK boleh Secure (lihat deploy/.env).
        AUTH_COOKIE_SECURE: process.env.AUTH_COOKIE_SECURE || 'false',
        APP_URL: process.env.APP_URL,
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
        RECAPTCHA_V3_SECRET_KEY: process.env.RECAPTCHA_V3_SECRET_KEY,
        MAIL_HOST: process.env.MAIL_HOST,
        MAIL_PORT: process.env.MAIL_PORT,
        MAIL_USER: process.env.MAIL_USER,
        MAIL_PASS: process.env.MAIL_PASS,
        MAIL_FROM: process.env.MAIL_FROM,
        FONNTE_TOKEN: process.env.FONNTE_TOKEN,
        MASTER_PASSWORD: process.env.MASTER_PASSWORD,
        TIKET_AUTO_CLOSE_DAYS: process.env.TIKET_AUTO_CLOSE_DAYS,
      },
    },
  ],
};
