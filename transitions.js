(function () {
  'use strict';

  var DURATION = 500;
  var FLAG = 'page-leaving';

  // ── Fade in on new page arrival ─────────────────────────────────────────
  // The <head> script set opacity:0 on <html> if the flag was present,
  // preventing a flash. Now clear the flag and animate back to visible.
  if (sessionStorage.getItem(FLAG)) {
    sessionStorage.removeItem(FLAG);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        document.documentElement.style.transition = 'opacity ' + DURATION + 'ms ease';
        document.documentElement.style.opacity = '1';
      });
    });
    document.documentElement.addEventListener('transitionend', function cleanup(e) {
      if (e.propertyName !== 'opacity') return;
      document.documentElement.style.transition = '';
      document.documentElement.style.opacity = '';
      document.documentElement.removeEventListener('transitionend', cleanup);
    });
  }

  // ── Fade out before navigating ──────────────────────────────────────────
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a) return;

    // Skip new-tab, download, cross-origin
    if (a.target === '_blank' || a.hasAttribute('download') || a.origin !== location.origin) return;

    var raw = a.getAttribute('href');
    if (!raw || raw.charAt(0) === '#' || raw.indexOf('mailto:') === 0) return;

    // Don't animate a navigation to the same URL
    if (a.href.split('#')[0] === location.href.split('#')[0]) return;

    e.preventDefault();
    sessionStorage.setItem(FLAG, '1');
    document.documentElement.style.transition = 'opacity ' + DURATION + 'ms ease';
    document.documentElement.style.opacity = '0';

    setTimeout(function () { location.href = a.href; }, DURATION);
  });
}());
