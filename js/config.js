/* =========================================================
   SKOEE — Konfigurasi Situs
   ---------------------------------------------------------
   INI SATU-SATUNYA FILE YANG PERLU DIEDIT untuk mengisi data
   yang masih kosong. Tidak perlu menyentuh HTML/CSS.

   Aturan main:
   - Field yang masih '' (string kosong) dianggap BELUM DIISI.
     Tombol/elemen terkait otomatis disembunyikan, jadi tidak
     ada link mati atau nomor palsu yang tayang.
   - Begitu diisi, elemennya muncul sendiri.
   ========================================================= */

window.SKOEE_CONFIG = {

  /* --- Kontak ---------------------------------------------------------
     Nomor WhatsApp format internasional TANPA tanda + dan tanpa spasi.
     Contoh: 0812-3456-7890  ->  '6281234567890'
     Kosongkan ('') kalau memang belum mau pakai tombol WhatsApp.        */
  whatsapp: '082130820192',
  whatsappMessage: 'Halo SKOEE, mau tanya menu dong.',

  instagram: 'https://www.instagram.com/somekindof.coffee',
  threads: 'https://www.threads.net/@somekindof.coffee',

  /* --- Lokasi ---------------------------------------------------------
     address     : alamat lengkap (boleh multi-baris pakai \n)
     maps.link   : link "Share" dari Google Maps
     maps.embed  : URL peta yang disuntik sebagai <iframe>.

                   Nilai sekarang memakai bentuk "?q=<alamat>&output=embed",
                   yaitu peta hasil PENCARIAN ALAMAT. Ini sudah jalan, tapi
                   pin-nya mengikuti tebakan Google atas alamat tersebut.

                   Untuk pin yang persis menempel di listing SKOEE, ganti
                   dengan embed resmi: Google Maps → cari Some Kind Of Coffee
                   → Share → Embed a map → COPY HTML → ambil URL di dalam
                   src="..." (bentuknya https://www.google.com/maps/embed?pb=...)

                   Hanya dua bentuk di atas yang diterima; nilai lain
                   diabaikan dan placeholder peta tetap tampil.           */
  address: 'Jl. Ciputat Molek III No.17, Pisangan, Ciputat Timur, Tangerang Selatan.',
  maps: {
    link: 'https://www.google.com/maps/search/?api=1&query=Some+Kind+Of+Coffee+Ciputat',
    embed: 'https://maps.google.com/maps?q=Some+Kind+Of+Coffee%2C+Jl.+Ciputat+Molek+III+No.17%2C+Pisangan%2C+Ciputat+Timur%2C+Tangerang+Selatan&z=17&output=embed'
  },

  /* --- Jam operasional ------------------------------------------------
     Format 24 jam. Dipakai untuk indikator "Buka sekarang / Tutup"
     di hero. Kalau jam tiap hari berbeda, ubah jadi per-hari nanti.     */
  hours: { open: '08:00', close: '23:00' },

  /* --- Promo ----------------------------------------------------------
     active: false  -> seluruh section promo disembunyikan.
     Ganti judul/deskripsi tiap bulan tanpa menyentuh HTML.              */
  promo: {
    active: true,
    label: 'Promo Bulan Ini',
    title: 'Buy 2 Get 1 Free',
    description: 'Spesial bulan kemerdekaan — berlaku untuk dine-in & take-away, selama periode promo berlangsung.'
  },

  /* --- Harga menu -----------------------------------------------------
     Kunci di sini dicocokkan dengan urutan kartu menu di index.html.
     Isi angka polos (tanpa "Rp"/titik), contoh: 22000.
     Biarkan null kalau belum mau menampilkan harga.                     */
  prices: {
    'kopi-susu-gula-aren': 22000,
    'merona': 22000,
    'affogato': 22000,
    'filter-coffee': 22000,
    'dimsum-mentai': 22000
  }
};
