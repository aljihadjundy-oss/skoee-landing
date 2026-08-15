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
     maps.link   : link "Share" dari Google Maps — dipakai tombol
                   "Buka di Google Maps"

     maps.embed  : URL peta yang disuntik sebagai <iframe>.

                   HANYA menerima URL embed resmi:
                     https://www.google.com/maps/embed?pb=...

                   Bentuk lain (link Share biasa, atau
                   maps.google.com/maps?...&output=embed) ditolak Google
                   untuk di-iframe dan hasilnya kotak kosong, jadi
                   sengaja tidak diterima.

                   Cara ambil:
                     Google Maps → cari "Some Kind Of Coffee" → Share →
                     tab "Embed a map" → COPY HTML → salin URL di dalam src="..."

                   Selama kosong, slot peta menampilkan kartu lokasi
                   statis (nama + alamat + tombol ke Google Maps).       */
  address: 'Jl. Ciputat Molek III No.17, Pisangan, Ciputat Timur, Tangerang Selatan.',
  maps: {
    link: 'https://www.google.com/maps/search/?api=1&query=Some+Kind+Of+Coffee+Ciputat',
    embed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.616990527031!2d106.75310429999999!3d-6.313940100000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69efa73a58b489%3A0xb56d6ffafe9d562c!2sSkoee%20(Some%20Kind%20Of%20Coffee)!5e0!3m2!1sid!2sid!4v1786778695272!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>'
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
