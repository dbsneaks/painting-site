(function () {
  'use strict';

  /* ── Route ─────────────────────────────────────────────────────────────── */

  var params = new URLSearchParams(window.location.search);
  var id = parseInt(params.get('id'), 10);

  if (isNaN(id)) { window.location.replace('index.html'); return; }

  var idx = paintings.findIndex(function (p) { return p.id === id; });
  if (idx === -1) { window.location.replace('index.html'); return; }

  var painting = paintings[idx];

  document.title = painting.title + ' \u2014 Some Paintings I Painted';

  if (!Array.isArray(painting.images) || painting.images.length === 0) {
    painting.images = [painting.image];
  }

  var main = document.getElementById('detail-main');
  main.innerHTML = buildViewer(painting);
  initViewer();

  /* ── SVG helpers ────────────────────────────────────────────────────────── */

  function svgGrid() {
    return '<img src="images/icons/grid.svg" class="icon-blue" alt="" width="20" height="20" aria-hidden="true">';
  }

  function svgArrowBadge() {
    return '<img src="images/icons/arrow-right.svg" class="icon-white" alt="" width="16" height="16" aria-hidden="true">';
  }

  /* ── More module ─────────────────────────────────────────────────────────── */

  function buildMoreModule(p) {
    if (!p.theme) return '';

    var others = paintings.filter(function (x) {
      return x.theme === p.theme && x.id !== p.id;
    }).slice(0, 4);

    if (!others.length) return '';

    var heading = 'MORE ' + p.theme.toUpperCase();

    var items = others.map(function (other) {
      return '<article class="grid-item" data-theme="' + other.theme + '">' +
        '<a href="detail.html?id=' + other.id + '" class="grid-item__link" ' +
           'aria-label="' + other.title + (other.sold ? ', sold' : '') + '">' +
          '<div class="grid-item__image-wrap">' +
            '<img src="' + other.image + '" alt="' + other.title + '" ' +
                 'class="grid-item__image" loading="lazy" width="600" height="750">' +
          '</div>' +
          '<div class="grid-item__rule" role="separator"></div>' +
          '<div class="grid-item__meta">' +
            '<span class="grid-item__title">' + other.title + '</span>' +
            (other.sold ? '<span class="grid-item__sold-dot" aria-label="Sold"></span>' : '') +
          '</div>' +
        '</a>' +
      '</article>';
    }).join('');

    return '<section class="detail__more" aria-label="' + heading + '">' +
      '<h2 class="detail__more-title">' + heading + '</h2>' +
      '<div class="detail__more-grid">' + items + '</div>' +
      '<a href="index.html" class="detail__more-all">' + svgGrid() + 'ALL PAINTINGS</a>' +
      '</section>';
  }

  /* ── Info block ─────────────────────────────────────────────────────────── */

  function buildInfoBlock(p) {
    var price = p.price != null ? p.price : 'N/A';
    var subject = encodeURIComponent('Interested in ' + p.title);

    var status = p.sold
      ? '<div class="detail__status detail__status--sold">' +
          '<span class="detail__sold-dot" aria-hidden="true"></span>' +
          '<span>SOLD</span>' +
        '</div>'
      : '<a href="mailto:hello@example.com?subject=' + subject + '" class="detail__status detail__status--available btn-primary">' +
          '<span>INTERESTED? EMAIL ME</span>' +
          '<span class="btn-primary__badge" aria-hidden="true">' + svgArrowBadge() + '</span>' +
        '</a>';

    return '<div class="detail__info">' +
        '<p class="detail__blurb">' + p.blurb + '</p>' +
        '<dl class="detail__specs">' +
          '<div class="detail__spec"><dt>SIZE:</dt><dd>' + p.size + '</dd></div>' +
          '<div class="detail__spec"><dt>MEDIUM:</dt><dd>' + p.medium + '</dd></div>' +
          '<div class="detail__spec"><dt>PRICE:</dt><dd>' + price + '</dd></div>' +
        '</dl>' +
        status +
      '</div>';
  }

  /* ── Footer ─────────────────────────────────────────────────────────────── */

  function buildFooter() {
    return '<footer class="site-footer">' +
        '<span class="site-footer__copy">\u00A9 2026</span>' +
        '<a href="mailto:hello@example.com" class="site-footer__link">SAY HI</a>' +
      '</footer>';
  }

  /* ── Single image layout ────────────────────────────────────────────────── */
  /* Same two-column layout as viewer — image left, info right, no thumbnails  */

  function buildSingle(p) {
    return '<section class="detail detail--single">' +
        '<h1 class="detail__title">' + p.title + '</h1>' +
        '<div class="detail__collage-top">' +
          '<div class="detail__collage-main-wrap">' +
            '<img src="' + p.image + '" alt="' + p.title + '" ' +
              'class="detail__collage-main-image" loading="eager">' +
          '</div>' +
          buildInfoBlock(p) +
        '</div>' +
        buildMoreModule(p) +
      '</section>' +
      buildFooter();
  }

  /* ── Multi-image viewer layout ──────────────────────────────────────────── */

  function buildViewer(p) {
    var images = p.images;
    var count = images.length;

    var thumbsHTML = images.map(function (src, i) {
      return '<button class="detail__viewer-thumb' + (i === 0 ? ' is-active' : '') + '" ' +
        'data-index="' + i + '" aria-label="View image ' + (i + 1) + '">' +
        '<img src="' + src + '" alt="" loading="lazy">' +
        '</button>';
    }).join('');

    var carouselHTML = images.map(function (src, i) {
      return '<div class="detail__viewer-slide">' +
        '<img src="' + src + '" alt="' + p.title + ', photo ' + (i + 1) + '" ' +
        'loading="' + (i === 0 ? 'eager' : 'lazy') + '">' +
        '</div>';
    }).join('');

    var dotsHTML = images.map(function (_, i) {
      return '<button class="detail__viewer-dot' + (i === 0 ? ' is-active' : '') + '" ' +
        'data-index="' + i + '" aria-label="Image ' + (i + 1) + '"></button>';
    }).join('');

    return '<section class="detail detail--viewer">' +
      '<h1 class="detail__title">' + p.title + '</h1>' +
      '<div class="detail__collage-top">' +
        '<div class="detail__viewer-thumbs" id="viewer-thumbs">' + thumbsHTML + '</div>' +
        '<div class="detail__collage-main-wrap">' +
          '<div class="detail__viewer" id="detail-viewer">' +
            '<div class="detail__viewer-stage" id="viewer-stage">' +
              '<img src="' + images[0] + '" alt="' + p.title + '" ' +
                'class="detail__viewer-main-img" id="viewer-main-img" loading="eager">' +
              '<div class="detail__viewer-zone detail__viewer-zone--prev" ' +
                'id="viewer-zone-prev" role="button" tabindex="0" aria-label="Previous image"></div>' +
              '<div class="detail__viewer-zone detail__viewer-zone--next" ' +
                'id="viewer-zone-next" role="button" tabindex="0" aria-label="Next image"></div>' +
              '<div class="detail__viewer-cursor" id="viewer-cursor" aria-hidden="true">' +
                '<span id="viewer-cursor-glyph">&#8594;</span>' +
              '</div>' +
            '</div>' +
            '<div class="detail__viewer-carousel" id="viewer-carousel">' + carouselHTML + '</div>' +
            '<div class="detail__viewer-dots" id="viewer-dots">' + dotsHTML + '</div>' +
          '</div>' +
        '</div>' +
        buildInfoBlock(p) +
      '</div>' +
      buildMoreModule(p) +
      '</section>' +
      buildFooter();
  }

  /* ── Viewer JS ──────────────────────────────────────────────────────────── */

  function initViewer() {
    var images   = painting.images;
    var count    = images.length;
    var currentIdx = 0;

    var mainImg     = document.getElementById('viewer-main-img');
    var stage       = document.getElementById('viewer-stage');
    var cursorEl    = document.getElementById('viewer-cursor');
    var cursorGlyph = document.getElementById('viewer-cursor-glyph');
    var prevZone    = document.getElementById('viewer-zone-prev');
    var nextZone    = document.getElementById('viewer-zone-next');
    var thumbBtns   = document.querySelectorAll('.detail__viewer-thumb');
    var dots        = document.querySelectorAll('.detail__viewer-dot');
    var carousel    = document.getElementById('viewer-carousel');

    function setActive(idx) {
      idx = ((idx % count) + count) % count;
      currentIdx = idx;
      if (mainImg) mainImg.src = images[idx];
      thumbBtns.forEach(function (t, i) { t.classList.toggle('is-active', i === idx); });
      dots.forEach(function (d, i)      { d.classList.toggle('is-active', i === idx); });
      if (carousel) {
        var slides = carousel.querySelectorAll('.detail__viewer-slide');
        if (slides[idx]) {
          slides[idx].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      }
    }

    // Thumbnail clicks
    thumbBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        setActive(parseInt(btn.dataset.index, 10));
      });
    });

    // Zone clicks (desktop prev/next)
    if (prevZone) {
      prevZone.addEventListener('click', function () { setActive(currentIdx - 1); });
      prevZone.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive(currentIdx - 1); }
      });
    }
    if (nextZone) {
      nextZone.addEventListener('click', function () { setActive(currentIdx + 1); });
      nextZone.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive(currentIdx + 1); }
      });
    }

    // Custom cursor (desktop)
    if (stage && cursorEl) {
      stage.addEventListener('mousemove', function (e) {
        var rect = stage.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        cursorEl.style.transform = 'translate(' + (x - 30) + 'px, ' + (y - 30) + 'px)';
        cursorGlyph.textContent = x < rect.width / 2 ? '\u2190' : '\u2192';
      });
      stage.addEventListener('mouseenter', function () { cursorEl.classList.add('is-visible'); });
      stage.addEventListener('mouseleave', function () { cursorEl.classList.remove('is-visible'); });
    }

    // Dot clicks (mobile)
    dots.forEach(function (d) {
      d.addEventListener('click', function () {
        setActive(parseInt(d.dataset.index, 10));
      });
    });

    // Mobile carousel scroll → sync dots + thumbs
    if (carousel) {
      var scrollTimer;
      carousel.addEventListener('scroll', function () {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(function () {
          var slides = carousel.querySelectorAll('.detail__viewer-slide');
          var viewCenter = carousel.scrollLeft + carousel.offsetWidth / 2;
          var bestIdx = 0, bestDist = Infinity;
          slides.forEach(function (slide, i) {
            var center = slide.offsetLeft + slide.offsetWidth / 2;
            var dist = Math.abs(center - viewCenter);
            if (dist < bestDist) { bestDist = dist; bestIdx = i; }
          });
          currentIdx = bestIdx;
          dots.forEach(function (d, i)      { d.classList.toggle('is-active', i === bestIdx); });
          thumbBtns.forEach(function (t, i) { t.classList.toggle('is-active', i === bestIdx); });
        }, 50);
      });
    }
  }

}());
