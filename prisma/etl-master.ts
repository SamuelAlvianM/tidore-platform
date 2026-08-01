/**
 * ETL master data Laravel → Prisma: News, Produk, Gallery, SKM.
 * (Demografi & Chat/Tiket ditangani skrip terpisah karena pivot/FK.)
 * Jalankan: npx tsx prisma/etl-master.ts  (idempotent per-model)
 */
import { PrismaClient } from '@prisma/client';
import mysql from 'mysql2/promise';

const prisma = new PrismaClient();
const SOURCE = { host: 'localhost', port: 3306, user: 'root', password: 'saibatin123', database: 'tidore_lama' };

const slugify = (s: string, id: number) =>
  (String(s || 'item').toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-').slice(0, 60) || 'item') + '-' + id;

const dt = (v: any) => (v && !String(v).startsWith('0000') ? new Date(v) : new Date());
// Normalisасi path aset lama → jadikan absolut dari root. Path Laravel di sini
// berbentuk `img/...` (bukan `uploads/...`), jadi cukup pastikan satu leading `/`.
const asPath = (v: any) => { const s = String(v ?? '').trim(); if (!s) return null; if (s.startsWith('http')) return s; return '/' + s.replace(/^\/+/, ''); };

async function main() {
  const src = await mysql.createConnection(SOURCE);
  console.log('🔌 tidore_lama tersambung');

  // ── NEWS ──────────────────────────────────────────────────────────────────
  await prisma.news.deleteMany();
  const [news] = await src.query<any[]>('SELECT * FROM m_news_posts');
  // Gambar berita ada di tabel TERPISAH m_news_images (per news_posts_id),
  // bukan kolom di m_news_posts (news_post_feature = flag, bukan path).
  const [newsImgs] = await src.query<any[]>('SELECT news_posts_id, news_images_path FROM m_news_images WHERE status = 1');
  const newsImgMap = new Map<number, any>();
  for (const im of newsImgs) if (!newsImgMap.has(im.news_posts_id)) newsImgMap.set(im.news_posts_id, im.news_images_path);
  // news_post_category = ID kategori → petakan ke NAMA dari m_news_category.
  const [cats] = await src.query<any[]>('SELECT id, news_category_title FROM m_news_category');
  const catMap = new Map<number, string>();
  for (const c of cats) catMap.set(Number(c.id), String(c.news_category_title ?? '').replace(/^\w/, (ch) => ch.toUpperCase()));
  let n = 0;
  for (const r of news) {
    await prisma.news.create({ data: {
      judul: String(r.news_post_title ?? 'Tanpa Judul'),
      slug: slugify(r.news_post_title, r.id),
      kategori: catMap.get(Number(r.news_post_category)) ?? null,
      ringkasan: null,
      konten: String(r.news_post_content ?? ''),
      gambar: asPath(newsImgMap.get(r.id)),
      penulis: r.created_by != null ? String(r.created_by) : null,
      publish: Number(r.status) === 1,
      createdAt: dt(r.created_at), updatedAt: dt(r.updated_at),
    }});
    n++;
  }
  console.log(`✅ News: ${n}`);

  // ── PRODUK (hukum + disdukcapil) ────────────────────────────────────────────
  await prisma.produk.deleteMany();
  let p = 0;
  const [hukum] = await src.query<any[]>('SELECT * FROM m_product_hukums');
  for (const r of hukum) {
    await prisma.produk.create({ data: {
      jenis: 'HUKUM',
      judul: String(r.productHukum_name ?? 'Produk Hukum').slice(0, 255),
      konten: r.ket ?? null,
      file: asPath(r.productHukum_file),
      uploadedBy: r.created_by ?? null,
      createdAt: dt(r.created_at), updatedAt: dt(r.updated_at),
    }});
    p++;
  }
  const [dafduk] = await src.query<any[]>('SELECT * FROM m_product_disdukcapil');
  for (const r of dafduk) {
    await prisma.produk.create({ data: {
      jenis: 'DAFDUK',
      judul: String(r.productDisdukcapil_name ?? 'Produk Dafduk').slice(0, 255),
      konten: r.productDisdukcapil_desc ?? r.ket ?? null,
      file: asPath(r.productDisdukcapil_file),
      uploadedBy: r.created_by ?? null,
      createdAt: dt(r.created_at), updatedAt: dt(r.updated_at),
    }});
    p++;
  }
  console.log(`✅ Produk: ${p} (hukum ${hukum.length} + dafduk ${dafduk.length})`);

  // ── GALLERY ─────────────────────────────────────────────────────────────────
  await prisma.gallery.deleteMany();
  const [gal] = await src.query<any[]>('SELECT * FROM m_galleries');
  let g = 0;
  for (const r of gal) {
    // galleries_filename = JUDUL (mis. "zudan"), bukan bagian path → jangan digabung.
    const file = String(r.galleries_path ?? '').trim();
    await prisma.gallery.create({ data: {
      judul: String(r.galleries_filename ?? `Galeri ${r.id}`),
      kategori: String(r.galleries_kategori ?? 'PELAYANAN').toUpperCase().includes('BUPATI') ? 'BUPATI' : 'PELAYANAN',
      gambar: asPath(file) ?? '/uploads/galeri/placeholder.jpg',
      deskripsi: null,
      createdAt: dt(r.created_at),
    }});
    g++;
  }
  console.log(`✅ Gallery: ${g}`);

  // ── SKM (survey kepuasan) ───────────────────────────────────────────────────
  await prisma.skmJawaban.deleteMany();
  const [skm] = await src.query<any[]>('SELECT * FROM m_mediainformasi_skm_survey');
  let s = 0;
  for (const r of skm) {
    const jawaban: Record<string, any> = {};
    for (let i = 0; i <= 8; i++) {
      const k = `mediainformasiskmpertanyaan_u${i}`;
      if (r[k] != null) jawaban[`u${i}`] = r[k];
    }
    await prisma.skmJawaban.create({ data: {
      nama: r.mediainformasiskmsurvey_nama ?? null,
      umur: r.mediainformasiskmsurvey_usia != null && !isNaN(Number(r.mediainformasiskmsurvey_usia)) ? Number(r.mediainformasiskmsurvey_usia) : null,
      jenisKel: r.mediainformasiskmsurvey_jeniskelamin != null ? String(r.mediainformasiskmsurvey_jeniskelamin) : null,
      pekerjaan: r.mediainformasiskmsurvey_pekerjaan != null ? String(r.mediainformasiskmsurvey_pekerjaan) : null,
      jawaban,
      saran: r.mediainformasiskmpertanyaan_saranmasukan ?? null,
      createdAt: dt(r.created_at),
    }});
    s++;
  }
  console.log(`✅ SKM: ${s}`);

  console.log('\n🎉 Master data (News/Produk/Gallery/SKM) selesai.');
  await src.end(); await prisma.$disconnect();
}
main().catch((e) => { console.error('❌ gagal:', e); process.exit(1); });
