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

## Cara mengisi data

**Hampir semua yang kosong diisi lewat `js/config.js` saja.** Field yang masih
`''` (string kosong) dianggap belum diisi, dan elemen terkaitnya otomatis
disembunyikan — jadi tidak pernah ada tombol yang mengarah ke link mati atau
nomor telepon palsu yang tayang.

Foto: cukup taruh file di `assets/images/` dengan nama yang sudah ditentukan.

---

# Yang masih dibutuhkan dari pemilik cafe

Diurut dari yang paling menghambat. Tanda ⛔ = halaman belum layak tayang tanpa ini.

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

## 2. ⛔ Nomor WhatsApp
Isi `whatsapp` di `js/config.js`. Format bebas — `0812-3456-7890`,
`+62 812 3456 7890`, atau `6281234567890` semuanya dinormalisasi otomatis.

Selama kosong, tombol "Order via WA" di header otomatis berubah jadi
"Order via Instagram", dan tombol WhatsApp di section Lokasi disembunyikan.

## 3. ⛔ Alamat lengkap + embed Google Maps
Sekarang baru "Legoso, Ciputat Timur". Yang dibutuhkan:
- Nama jalan + nomor + kode pos → isi `address` di `js/config.js`
- Link Google Maps (Maps → **Share** → salin link) → `maps.link`
- Kode embed (Maps → **Share** → **Embed a map** → ambil URL di dalam `src="..."`) → `maps.embed`

Begitu `maps.embed` diisi, peta langsung tampil menggantikan placeholder.
Alamat lengkap juga perlu disalin ke blok JSON-LD di bagian bawah `index.html`
(`streetAddress`, `postalCode`) supaya listing di Google Search akurat.

## 4. Harga menu
Isi `prices` di `js/config.js` dengan angka polos (`22000`, bukan `"Rp 22.000"`).
Formatnya jadi "Rp 22.000" otomatis. Yang dibiarkan `null` tidak menampilkan
baris harga sama sekali — aman kalau harga masih sering berubah.

## 5. Promo yang sedang berjalan
Promo "Buy 2 Get 1 Free" masih hardcoded dari brief. Tiap bulan cukup ubah
`promo.label`, `promo.title`, `promo.description` di `js/config.js`.
Kalau lagi tidak ada promo: set `promo.active: false` → seluruh section hilang.

## 6. Domain final
Setelah domain ditentukan, ganti tiga hal di `<head>` `index.html`:
`<link rel="canonical">`, `og:url`, dan `og:image` (harus URL absolut,
mis. `https://skoee.id/assets/images/og-cover.jpg` — kalau relatif, preview
di WhatsApp/Instagram tidak muncul).

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
