/**
 * Isi `user_kecamatan` untuk akun instansi yang sudah ada.
 *
 * 🔴 KENAPA PERLU. Wilayah sebuah permohonan dibaca dari kecamatan akun
 * pengajunya — tidak ada tempat lain yang mencatatnya per baris. Saringan
 * wilayah di dashboard, dan rekap per kecamatan yang dipakai sebagai laporan
 * dinas, keduanya berdiri di atas kolom itu.
 *
 * Terukur 3 Sep 2026: dari 564 akun, hanya **1** yang punya kecamatan.
 * Saringannya karena itu menyaring 2.458 permohonan menjadi hampir nol, dan
 * tidak ada satu pun galat yang menandainya — saringan yang tidak menemukan
 * apa-apa terlihat persis seperti wilayah yang memang tidak punya permohonan.
 *
 * 🔴 SUMBERNYA DATA, BUKAN TEBAKAN. Nama akun instansi berbentuk
 * `<prefix>-<desa>` (`admin-kaiyasa`, `lurah-ome`, `Desa-aketobololo`), dan
 * bagian desanya dicocokkan dengan `m_wilayah` — desa sungguhan milik kota
 * ini. Kecamatannya diambil dari `parent` desa itu, bukan dari tafsiran
 * prefix. Sebagian nama menempelkan "desa"/"kelurahan" di depan
 * (`admin-desagosale`, `admin-kelurahanakelamo`); imbuhan itu dilepas lalu
 * dicocokkan ulang — masih pencocokan, bukan penerkaan.
 *
 * ⚠️ YANG TIDAK BISA DIPASTIKAN TIDAK DITULIS, dan itu disengaja. Contoh yang
 * betul-betul ada di sini:
 *
 *   `desa-maitarainduk` (40 permohonan) — `m_wilayah` punya MAITARA, MAITARA
 *   SELATAN, MAITARA UTARA, dan MAITARA TENGAH, tapi tidak "Maitara Induk".
 *   Mungkin yang dimaksud MAITARA; mungkin juga bukan. Salah satu wilayah
 *   berarti 40 permohonan masuk ke rekap kecamatan yang keliru — dan itu
 *   angka yang dipakai sebagai laporan resmi. Jadi dilaporkan, bukan ditebak.
 *
 *   `admin-kurniawan`, `desa-galang`, `galang-opd` — bukan nama desa sama
 *   sekali.
 *
 * ⚠️ SEKALIGUS MEMBAKUKAN NILAI YANG SUDAH ADA. Saringan wilayah mencocokkan
 * `user_kecamatan` PERSIS dengan nama di `m_wilayah`, jadi nilai yang ditulis
 * tangan seperti `"Kecamatan Tidore"` tidak akan pernah cocok dengan pilihan
 * `"TIDORE"` — permohonan akun itu lenyap dari setiap saringan wilayah tanpa
 * satu pun galat. Nilai yang cocok SETELAH imbuhan "kecamatan"/"kec" dilepas
 * dibakukan; yang tetap tidak cocok dilaporkan, tidak diubah.
 *
 * Idempoten: menjalankan ulang tidak mengubah apa pun yang sudah benar.
 *
 *     npm run wilayah:isi-akun            # laporan saja, TIDAK menulis
 *     npm run wilayah:isi-akun -- --tulis # baru menulis
 *     npm run wilayah:isi-akun -- --tulis --timpa   # ikut menimpa yang terisi
 */
import { PrismaClient } from '@prisma/client';
import { LEVEL_OPD, LEVEL_OPERATOR } from '../lib/akun-level';

const prisma = new PrismaClient();

const TULIS = process.argv.includes('--tulis');
const TIMPA = process.argv.includes('--timpa');

/** Samakan bentuk supaya "BUKIT DURIAN" cocok dengan "bukit durian". */
const normal = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

/** `admin-desagosale` → 'desagosale'; tanpa pemisah → seluruhnya. */
function sufiks(userId: string): string {
  const pos = userId.indexOf('-');
  return pos === -1 ? userId : userId.slice(pos + 1);
}

interface Siap {
  id: number;
  userId: string;
  desa: string | null;
  kecamatan: string;
  via: string;
}

async function main() {
  const kecamatan = await prisma.wilayah.findMany({
    where: { jenis: 'KECAMATAN' },
    select: { id: true, nama: true },
  });
  const desa = await prisma.wilayah.findMany({
    where: { jenis: 'KELURAHAN' },
    select: { nama: true, parentId: true },
  });

  if (desa.length === 0) {
    console.error('m_wilayah belum berisi desa/kelurahan — jalankan seeder wilayah lebih dulu.');
    process.exit(1);
  }

  const namaKec = new Map(kecamatan.map((k) => [k.id, k.nama]));
  /*
   * Peta kecamatan menerima dua bentuk: nama apa adanya, dan nama berimbuhan
   * "kecamatan"/"kec" di depan. Keduanya menunjuk baris `m_wilayah` yang sama,
   * jadi ini pencocokan — bukan penerkaan.
   */
  const petaKec = new Map<string, string>();
  for (const k of kecamatan) {
    petaKec.set(normal(k.nama), k.nama);
    petaKec.set(normal(`kecamatan ${k.nama}`), k.nama);
    petaKec.set(normal(`kec ${k.nama}`), k.nama);
  }

  /*
   * Satu nama desa bisa muncul di lebih dari satu kecamatan. Di Tidore saat
   * ini tidak ada yang kembar, tapi petanya tetap menyimpan DAFTAR — begitu
   * suatu saat ada yang kembar, akun itu jatuh ke daftar "perlu diputuskan"
   * dengan sendirinya, bukan diam-diam mendarat di kecamatan pertama.
   */
  const petaDesa = new Map<string, { nama: string; kec: string }[]>();
  for (const d of desa) {
    const k = normal(d.nama);
    petaDesa.set(k, [
      ...(petaDesa.get(k) ?? []),
      { nama: d.nama, kec: namaKec.get(d.parentId!) ?? '?' },
    ]);
  }

  /*
   * PENGISIAN hanya untuk akun instansi — merekalah yang nama akunnya memuat
   * nama desa. Warga mendaftar dengan nama orang; tidak ada yang bisa
   * disimpulkan dari situ, dan menebaknya justru berbahaya.
   */
  const akun = await prisma.user.findMany({
    where: { userlevelId: { in: [LEVEL_OPD, LEVEL_OPERATOR] } },
    select: { id: true, userId: true, userKecamatan: true },
    orderBy: { userId: 'asc' },
  });

  /*
   * PEMBAKUAN menjangkau SEMUA akun yang punya kecamatan, apa pun perannya.
   * Saringan wilayah mencocokkan kolom ini persis; satu akun staf bernilai
   * "Kecamatan Tidore" sudah cukup membuat permohonannya lenyap dari setiap
   * saringan — dan itu memang ditemukan di sini (`rayh4ze`, level 2).
   */
  const berkecamatan = await prisma.user.findMany({
    where: { userKecamatan: { not: null } },
    select: { id: true, userId: true, userKecamatan: true },
    orderBy: { userId: 'asc' },
  });

  const siap: Siap[] = [];
  const baku: { id: number; userId: string; dari: string; jadi: string }[] = [];
  const ragu: [string, string][] = [];
  let dilewati = 0;

  // ── Pembakuan nilai yang sudah ada, seluruh peran ──────────────────────
  const bentukSalah: [string, string][] = [];
  for (const u of berkecamatan) {
    const benar = petaKec.get(normal(u.userKecamatan!));
    if (!benar) {
      // Tidak cocok bahkan setelah imbuhan dilepas — dilaporkan, tidak diubah.
      bentukSalah.push([u.userId, u.userKecamatan!]);
    } else if (benar !== u.userKecamatan) {
      baku.push({ id: u.id, userId: u.userId, dari: u.userKecamatan!, jadi: benar });
    }
  }

  for (const u of akun) {
    if (!TIMPA && u.userKecamatan) {
      dilewati++; // sudah terisi — idempoten
      continue;
    }

    const s = sufiks(u.userId);
    // Urutan kandidat: apa adanya dulu, baru imbuhan dilepas. Dengan begitu
    // desa yang namanya memang berawalan "Desa…" tidak ikut terpotong.
    const kandidat = [s, s.replace(/^desa/i, ''), s.replace(/^kelurahan/i, ''), u.userId];

    let ketemu: Siap | null = null;
    let kembar: string[] | null = null;

    for (const c of kandidat) {
      const cocok = petaDesa.get(normal(c));
      if (cocok) {
        if (cocok.length > 1) {
          kembar = cocok.map((x) => x.kec);
          break;
        }
        ketemu = { id: u.id, userId: u.userId, desa: cocok[0].nama, kecamatan: cocok[0].kec, via: c };
        break;
      }
      /*
       * Sebagian akun menyebut KECAMATAN, bukan desa — akun OPD lazimnya
       * begitu (`opd-tidore`). Ia melayani satu kecamatan penuh, jadi
       * wilayahnya memang berhenti di situ.
       */
      const kec = petaKec.get(normal(c));
      if (kec) {
        ketemu = { id: u.id, userId: u.userId, desa: null, kecamatan: kec, via: c };
        break;
      }
    }

    if (ketemu) siap.push(ketemu);
    else if (kembar) {
      ragu.push([u.userId, `nama desa kembar di ${kembar.length} kecamatan (${kembar.join(', ')})`]);
    } else {
      ragu.push([u.userId, 'bukan nama desa maupun kecamatan di m_wilayah']);
    }
  }

  console.log(
    `Akun instansi: ${akun.length} · sudah baku (dilewati): ${dilewati} · ` +
      `siap diisi: ${siap.length} · perlu dibakukan: ${baku.length} · ` +
      `perlu diputuskan dinas: ${ragu.length}\n`,
  );

  if (siap.length) {
    console.log('Akan diisi:');
    for (const r of siap) {
      console.log(
        `  ${r.userId.padEnd(26)} -> ${(r.desa ?? '— (sekecamatan)').padEnd(20)} · ${r.kecamatan}`,
      );
    }
  }

  if (baku.length) {
    console.log('\nAkan dibakukan (wilayahnya benar, bentuknya tidak cocok m_wilayah):');
    for (const b of baku) {
      console.log(`  ${b.userId.padEnd(26)} "${b.dari}" -> "${b.jadi}"`);
    }
  }

  if (bentukSalah.length) {
    console.log('\n🔴 Nilai kecamatan yang TIDAK dikenali m_wilayah — tidak diubah,');
    console.log('   dan permohonan akun ini TIDAK akan muncul di saringan wilayah mana pun:');
    for (const [uid, nilai] of bentukSalah) console.log(`  ${uid.padEnd(26)} "${nilai}"`);
  }

  if (ragu.length) {
    console.log('\nTIDAK diisi — perlu keputusan dinas:');
    for (const [uid, sebab] of ragu) console.log(`  ${uid.padEnd(26)} ${sebab}`);
  }

  if (!TULIS) {
    console.log('\nIni laporan saja — belum ada yang disimpan. Tambahkan --tulis untuk menyimpan.');
    return;
  }

  for (const r of siap) {
    await prisma.user.update({
      where: { id: r.id },
      data: { userKecamatan: r.kecamatan },
    });
  }
  for (const b of baku) {
    await prisma.user.update({
      where: { id: b.id },
      data: { userKecamatan: b.jadi },
    });
  }
  console.log(`\n${siap.length} akun diisi · ${baku.length} akun dibakukan.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
