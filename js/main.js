/* =========================================================
   SKOEE — main.js
   Semua interaksi halaman. Ditulis defensif: kalau sebuah
   elemen tidak ada, script tetap jalan tanpa error.
   Data yang bisa berubah diambil dari js/config.js.
   ========================================================= */
(function () {
  'use strict';

  var CFG = window.SKOEE_CONFIG || {};
  var $  = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  var hoverQuery  = window.matchMedia('(hover: hover) and (pointer: fine)');
  var reduceMotion = function () { return motionQuery.matches; };

  /* ---------------------------------------------------------
     1. Tahun di footer
     --------------------------------------------------------- */
  var yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------------------------------------------------------
     2. Navigasi mobile
        - tutup lewat Escape, klik di luar, atau klik link
        - reset otomatis saat viewport melebar ke desktop
     --------------------------------------------------------- */
  var navToggle = $('#navToggle');
  var mainNav   = $('#mainNav');
  var header    = $('.site-header');

  function setNav(open) {
    if (!navToggle || !mainNav) return;
    mainNav.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Tutup menu navigasi' : 'Buka menu navigasi');
  }
  function navIsOpen() {
    return !!mainNav && mainNav.classList.contains('is-open');
  }

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () { setNav(!navIsOpen()); });

    $$('a', mainNav).forEach(function (link) {
      link.addEventListener('click', function () { setNav(false); });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navIsOpen()) {
        setNav(false);
        navToggle.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (navIsOpen() && header && !header.contains(e.target)) setNav(false);
    });

    var desktopQuery = window.matchMedia('(min-width: 860px)');
    var onBreakpoint = function (e) { if (e.matches) setNav(false); };
    if (desktopQuery.addEventListener) desktopQuery.addEventListener('change', onBreakpoint);
    else if (desktopQuery.addListener) desktopQuery.addListener(onBreakpoint);
  }

  /* ---------------------------------------------------------
     3. Tinggi header → dipakai untuk scroll-margin anchor
     --------------------------------------------------------- */
  function syncHeaderHeight() {
    if (!header) return;
    document.documentElement.style.setProperty('--header-h', header.offsetHeight + 'px');
  }
  syncHeaderHeight();
  window.addEventListener('resize', syncHeaderHeight);

  /* ---------------------------------------------------------
     4. Status gambar: tampilkan placeholder kalau file belum ada
     --------------------------------------------------------- */
  $$('.media-img').forEach(function (img) {
    var frame = img.parentElement;
    if (!frame) return;

    var ok   = function () { frame.classList.add('is-loaded'); frame.classList.remove('is-failed'); };
    var fail = function () { frame.classList.add('is-failed'); frame.classList.remove('is-loaded'); };

    if (img.complete) {
      (img.naturalWidth > 0 ? ok : fail)();
    } else {
      img.addEventListener('load', ok, { once: true });
      img.addEventListener('error', fail, { once: true });
    }
  });

  /* ---------------------------------------------------------
     5. Scroll reveal
     --------------------------------------------------------- */
  var revealEls = $$('[data-reveal]');
  if (reduceMotion() || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------------------------------------------------------
     6. Header shrink + shadow saat scroll
     --------------------------------------------------------- */
  if (header) {
    var updateHeader = function () { header.classList.toggle('scrolled', window.scrollY > 40); };
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  /* ---------------------------------------------------------
     7. Scrollspy — tandai link nav sesuai section yang terlihat
     --------------------------------------------------------- */
  if ('IntersectionObserver' in window && mainNav) {
    var navLinks = $$('a[href^="#"]', mainNav);
    var linkFor = {};
    var sections = [];

    navLinks.forEach(function (link) {
      var id = link.getAttribute('href').slice(1);
      var section = id && document.getElementById(id);
      if (section) { linkFor[id] = link; sections.push(section); }
    });

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = linkFor[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach(function (l) { l.classList.remove('is-active'); });
          link.classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------------------------------------------------------
     8. Efek pointer (parallax, magnetic, tilt)
        Hanya aktif di perangkat ber-mouse & tanpa reduced-motion.
     --------------------------------------------------------- */
  function initPointerEffects() {
    if (reduceMotion()) return;

    /* Parallax background hero */
    var heroBg = $('#heroBg');
    if (heroBg) {
      var ticking = false;
      var applyParallax = function () {
        heroBg.style.transform = 'translate3d(0,' + (Math.min(window.scrollY, 700) * 0.18) + 'px,0)';
        ticking = false;
      };
      window.addEventListener('scroll', function () {
        if (!ticking) { window.requestAnimationFrame(applyParallax); ticking = true; }
      }, { passive: true });
      applyParallax();
    }

    if (!hoverQuery.matches) return;

    /* Magnetic buttons — lewat CSS variable, jadi tidak menimpa :active */
    $$('.btn').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        btn.style.setProperty('--mx', ((e.clientX - r.left - r.width / 2) * 0.22).toFixed(1) + 'px');
        btn.style.setProperty('--my', ((e.clientY - r.top - r.height / 2) * 0.3).toFixed(1) + 'px');
        btn.style.setProperty('--scale', '1.05');
      });
      btn.addEventListener('mouseleave', function () {
        btn.style.removeProperty('--mx');
        btn.style.removeProperty('--my');
        btn.style.removeProperty('--scale');
      });
    });

    /* Tilt kartu menu */
    $$('[data-tilt]').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty('--rx', (-py * 8).toFixed(2) + 'deg');
        card.style.setProperty('--ry', (px * 8).toFixed(2) + 'deg');
        card.style.setProperty('--ty', '-4px');
      });
      card.addEventListener('mouseleave', function () {
        card.style.removeProperty('--rx');
        card.style.removeProperty('--ry');
        card.style.removeProperty('--ty');
      });
    });
  }
  initPointerEffects();

  /* ---------------------------------------------------------
     9. Terapkan config.js ke halaman
     --------------------------------------------------------- */

  /* 9a. WhatsApp — sembunyikan tombol kalau nomor belum diisi */
  (function applyWhatsApp() {
    var targets = $$('[data-site-link="whatsapp"]');
    if (!targets.length) return;

    // Normalisasi ke format internasional: 0812.. / 812.. / +62812.. → 62812..
    var number = String(CFG.whatsapp || '').replace(/[^0-9]/g, '');
    if (number.indexOf('0') === 0)      number = '62' + number.slice(1);
    else if (number.indexOf('62') !== 0 && number.indexOf('8') === 0) number = '62' + number;

    targets.forEach(function (el) {
      if (number) {
        el.href = 'https://wa.me/' + number +
          (CFG.whatsappMessage ? '?text=' + encodeURIComponent(CFG.whatsappMessage) : '');
        el.target = '_blank';
        el.hidden = false;
      } else if (el.classList.contains('header-cta')) {
        // Belum ada nomor WA → alihkan CTA header ke Instagram, jangan biarkan link mati.
        el.href = CFG.instagram || '#location';
        el.target = CFG.instagram ? '_blank' : '';
        el.textContent = CFG.instagram ? 'Order via Instagram' : 'Lihat Lokasi';
      } else {
        el.hidden = true;
      }
    });
  })();

  /* 9b. Google Maps */
  (function applyMaps() {
    var maps = CFG.maps || {};

    $$('[data-site-link="maps"]').forEach(function (el) {
      if (maps.link) el.href = maps.link;
    });

    var slot = $('#mapSlot');
    var raw = String(maps.embed || '').trim();

    // Tombol di Google Maps bertuliskan "COPY HTML", jadi yang tersalin biasanya
    // satu blok <iframe ...> utuh — bukan URL-nya saja. Terima dua-duanya:
    // kalau yang diisi blok HTML, ambil isi src="..."-nya.
    var srcMatch = raw.match(/<iframe[^>]*\ssrc=["']([^"']+)["']/i);
    var embedUrl = srcMatch ? srcMatch[1] : raw;

    // Hanya URL embed resmi (https://www.google.com/maps/embed?...) yang disuntik.
    // Bentuk lain — link Share biasa, maps.google.com/maps?...&output=embed, apalagi
    // google.com polos — ditolak Google untuk di-iframe dan hasilnya kotak kosong.
    // Kalau tidak valid, kartu lokasi statis dibiarkan tampil.
    var isEmbedUrl = /^https:\/\/(www\.)?google\.com\/maps\/embed\?/.test(embedUrl);

    if (slot && raw && !isEmbedUrl) {
      console.warn(
        '[SKOEE] maps.embed di js/config.js diabaikan karena bukan embed resmi.\n' +
        'Ambil lewat: Google Maps → Share → tab "Embed a map" → COPY HTML.\n' +
        'Boleh ditempel apa adanya (blok <iframe ...>) atau URL-nya saja;\n' +
        'yang penting URL-nya diawali https://www.google.com/maps/embed?\n' +
        'Nilai sekarang: ' + raw.slice(0, 120)
      );
    }

    if (slot && isEmbedUrl) {
      var frame = document.createElement('iframe');
      frame.src = embedUrl;
      frame.title = 'Peta lokasi Some Kind Of Coffee';
      frame.loading = 'lazy';
      frame.referrerPolicy = 'no-referrer-when-downgrade';
      frame.setAttribute('allowfullscreen', '');
      slot.textContent = '';
      slot.appendChild(frame);
      slot.classList.add('has-embed');
    }
  })();

  /* 9c. Alamat */
  (function applyAddress() {
    if (!CFG.address) return;
    var lines = String(CFG.address).split('\n');
    // Alamat muncul di lebih dari satu tempat (info lokasi + kartu peta)
    $$('[data-site-text="address"]').forEach(function (el) {
      el.innerHTML = '';
      lines.forEach(function (line, i) {
        if (i) el.appendChild(document.createElement('br'));
        el.appendChild(document.createTextNode(line));
      });
    });
  })();

  /* 9d. Promo */
  (function applyPromo() {
    var section = $('[data-promo]');
    var promo = CFG.promo;
    if (!section || !promo) return;

    if (promo.active === false) { section.hidden = true; return; }

    var map = {
      '[data-promo-label]': promo.label,
      '[data-promo-title]': promo.title,
      '[data-promo-desc]':  promo.description
    };
    Object.keys(map).forEach(function (sel) {
      var el = $(sel, section);
      if (el && map[sel]) el.textContent = map[sel];
    });
  })();

  /* 9e. Harga menu — tampil hanya kalau sudah diisi di config */
  (function applyPrices() {
    var prices = CFG.prices || {};
    var formatter = new Intl.NumberFormat('id-ID');

    $$('[data-price]').forEach(function (el) {
      var value = prices[el.getAttribute('data-price')];
      var slot = $('span', el);
      if (typeof value === 'number' && isFinite(value) && slot) {
        slot.textContent = formatter.format(value);
        el.hidden = false;
      } else {
        el.hidden = true;
      }
    });
  })();

  /* 9f. Indikator "Buka sekarang" (pakai jam perangkat pengunjung) */
  (function applyOpenStatus() {
    var el = $('#openStatus');
    var hours = CFG.hours;
    if (!el || !hours || !hours.open || !hours.close) return;

    var toMinutes = function (hhmm) {
      var p = String(hhmm).split(':');
      return (parseInt(p[0], 10) || 0) * 60 + (parseInt(p[1], 10) || 0);
    };

    var now   = new Date();
    var mins  = now.getHours() * 60 + now.getMinutes();
    var open  = toMinutes(hours.open);
    var close = toMinutes(hours.close);
    // Dukung jam tutup lewat tengah malam (mis. 08.00–01.00)
    var isOpen = close > open ? (mins >= open && mins < close) : (mins >= open || mins < close);

    el.hidden = false;
    el.setAttribute('data-open', String(isOpen));
    el.textContent = isOpen
      ? 'Buka sekarang — sampai ' + hours.close.replace(':', '.')
      : 'Lagi tutup — buka lagi jam ' + hours.open.replace(':', '.');
  })();

})();
