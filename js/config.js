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
     maps.embed  : URL di dalam src="..." pada kode <iframe> hasil
                   Google Maps → Share → Embed a map.
                   Kalau diisi, peta langsung tampil menggantikan
                   placeholder — tidak perlu edit HTML.                  */
  address: 'Legoso, Ciputat Timur,\nTangerang Selatan, Banten',
  maps: {
    link: 'https://www.google.com/maps/search/?api=1&query=Some+Kind+Of+Coffee+Ciputat',
    embed: ''
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
    'kopi-susu-gula-aren': null,
    'merona': null,
    'affogato': null,
    'filter-coffee': null,
    'dimsum-mentai': null
  }
};
