# Some Kind Of Coffee (SKOEE) — Landing Page

Static site (HTML + CSS + JS, tanpa build step). Mobile-first, karena mayoritas
pengunjung datang dari link bio Instagram.

```
index.html          — seluruh konten & markup
css/style.css       — styling
js/config.js        — SEMUA data yang perlu diisi (nomor WA, maps, harga, promo)
js/main.js          — interaksi (nav, animasi, penerapan config)
assets/images/      — foto & logo (lihat README di dalamnya)
```

## Cara menjalankan lokal

```bash
python3 -m http.server 8000
# buka http://localhost:8000
```

Buka lewat server, bukan double-click file — beberapa fitur butuh HTTP.

## Deploy (GitHub Pages)

Workflow `.github/workflows/deploy-pages.yml` sudah terpasang. Setiap push ke
branch `claude/skoee-landing-page-review-5h9gfv` (branch default repo ini)
otomatis men-deploy ulang. Bisa juga dijalankan manual lewat tab **Actions** →
**Deploy ke GitHub Pages** → **Run workflow**.

URL hasil deploy:

```
https://aljihadjundy-oss.github.io/skoee-landing/
```

### Setup sekali di awal

Deploy pertama gagal dengan
`Create Pages site failed: Resource not accessible by integration`.
Penyebabnya: GitHub Pages gratis hanya untuk repo publik, sedangkan repo ini
dibuat privat — token Actions tidak diizinkan menyalakan Pages di sana.

Dua langkah manual yang perlu dilakukan sekali:

1. **Settings → General → Danger Zone → Change visibility → Make public**
2. **Settings → Pages → Build and deployment → Source: GitHub Actions**
   (kemungkinan sudah otomatis terisi setelah langkah 1 — cek saja)

Lalu jalankan ulang: **Actions → Deploy ke GitHub Pages → Re-run all jobs**.

Alternatif kalau repo harus tetap privat: **Netlify** atau **Vercel** —
keduanya gratis untuk repo privat dan tidak butuh konfigurasi tambahan karena
situs ini statis murni.

Kalau nanti pakai domain sendiri, ganti `canonical`, `og:url`, dan `og:image`
di `<head>` `index.html` ke domain baru.

## Cara mengisi data

**Hampir semua yang kosong diisi lewat `js/config.js` saja.** Field yang masih
`''` (string kosong) dianggap belum diisi, dan elemen terkaitnya otomatis
disembunyikan — jadi tidak pernah ada tombol yang mengarah ke link mati atau
nomor telepon palsu yang tayang.

Foto: cukup taruh file di `assets/images/` dengan nama yang sudah ditentukan.

---

# Yang masih dibutuhkan dari pemilik cafe

Diurut dari yang paling menghambat.
⛔ = belum layak tayang tanpa ini · ⚠️ = sudah diisi tapi perlu dibetulkan · ✅ = beres.

## 1. ⛔ Foto & logo asli
Belum ada satu pun file gambar, jadi semua slot masih menampilkan placeholder.
Daftar lengkap nama file, rasio, dan panduan kompresi ada di
[`assets/images/README.md`](assets/images/README.md).

Yang paling krusial: `logo.png`, `interior.jpg` (background hero), dan lima foto menu.

> **Catatan penting soal sumber foto.** Brief awal meminta gambar di-crop dari
> enam postingan Instagram SKOEE. Itu tidak saya lakukan, karena dua alasan:
> Instagram memblokir akses dari environment ini (koneksi ditolak, bukan sekadar
> 404), dan mengambil ulang media dari halaman Instagram itu cara yang rapuh —
> URL CDN-nya berumur pendek dan hasil crop-nya resolusi rendah. Kalau posting
> itu memang milik SKOEE, file aslinya jauh lebih baik: minta langsung ke
> pemiliknya, kualitasnya penuh dan status hak pakainya jelas.

## 2. ✅ Nomor WhatsApp — selesai
✅ Sudah diisi (`082130820192` → jadi link `wa.me/6282130820192`).

## 3. ⚠️ Embed Google Maps — masih salah isi
✅ Alamat sudah diisi: *Jl. Ciputat Molek III No.17, Pisangan, Ciputat Timur*.

❌ `maps.embed` masih berisi `https://google.com` — itu bukan URL embed, dan
kalau dipaksa disuntik hasilnya cuma kotak kosong (Google menolak halamannya
di-iframe). Sementara ini nilainya diabaikan dan placeholder peta tetap tampil.

Cara ambil yang benar:
1. Buka Google Maps → cari **Some Kind Of Coffee**
2. **Share** → tab **Embed a map** → **COPY HTML**
3. Dari HTML itu, ambil URL yang ada di dalam `src="..."` saja
4. Tempel ke `maps.embed` — bentuknya `https://www.google.com/maps/embed?pb=...`

Alamat lengkap juga masih perlu disalin ke blok JSON-LD di bagian bawah
`index.html` (`streetAddress`, `postalCode`) supaya listing di Google Search akurat.

## 4. ⚠️ Harga menu — perlu dicek ulang
✅ Sudah diisi, semua Rp 22.000.

Cek lagi kalau ini cuma angka sementara — Merona 1000ml dan Dimsum Mentai
kemungkinan besar beda harga dari kopi susu segelas. Formatnya otomatis jadi
"Rp 22.000"; isi `null` kalau ada item yang harganya belum mau ditampilkan.

## 5. Promo yang sedang berjalan
Promo "Buy 2 Get 1 Free" masih hardcoded dari brief. Tiap bulan cukup ubah
`promo.label`, `promo.title`, `promo.description` di `js/config.js`.
Kalau lagi tidak ada promo: set `promo.active: false` → seluruh section hilang.

## 6. Domain final
Sudah diarahkan ke URL GitHub Pages. Ganti `canonical`, `og:url`, dan `og:image`
di `<head>` `index.html` kalau nanti pindah ke domain sendiri.

> Catatan kecil: indikator "Buka sekarang / Lagi tutup" di hero memakai jam
> perangkat pengunjung. Akurat untuk pengunjung di Indonesia; kalau dibuka dari
> zona waktu lain, statusnya ikut zona waktu tersebut.

## 7. Opsional, tapi berpengaruh besar untuk cafe lokal
- **Nomor telepon** → tambahkan `telephone` di blok JSON-LD
- **Koordinat GPS** (klik kanan di Google Maps → salin lat/long) → tambahkan
  `geo` di JSON-LD. Ini yang bikin cafe gampang muncul di pencarian "kopi dekat sini"
- **Link Google Business Profile & GoFood/GrabFood** kalau ada
- **Foto orang** (barista, suasana ramai) hanya kalau sudah ada izin tertulis
  dari yang bersangkutan

---

# Yang belum ada di halaman ini (dan kapan perlu dipikirkan)

Situs ini **murni statis — tidak ada back end**, dan untuk kebutuhan sekarang
itu memang pilihan yang tepat: hosting gratis (GitHub Pages / Netlify / Vercel),
tidak ada server yang bisa down, tidak ada data pribadi yang disimpan sehingga
kewajiban UU PDP praktis nol.

Back end baru betul-betul dibutuhkan kalau nanti mau:

| Kebutuhan | Yang diperlukan |
|---|---|
| Form pemesanan / reservasi meja | Backend atau layanan form (Formspree, Google Forms) |
| Newsletter / kumpul email pelanggan | Layanan email (Mailchimp, Buttondown) |
| Menu yang bisa diedit sendiri tanpa buka kode | Headless CMS (Sanity, Contentful) atau cukup Google Sheets |
| Pembayaran online | Payment gateway (Midtrans, Xendit) — butuh badan usaha |
| Statistik pengunjung | Cukup Plausible / Umami / Google Analytics (tanpa backend sendiri) |

Selama alur pemesanan masih lewat DM Instagram dan WhatsApp, menambah backend
cuma menambah biaya dan hal yang bisa rusak.
