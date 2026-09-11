/* Shared analytics and utilities for condition and procedure pages. */
window.GA4_ID = 'G-XXXXXXXXXX';
(function () {
  var isLocal = /^(localhost|127\.0\.0\.1|::1)$/.test(location.hostname) || location.protocol === 'file:';
  if (isLocal || !/^G-[A-Z0-9]{6,}$/.test(window.GA4_ID)) return;
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + window.GA4_ID;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  gtag('js', new Date());
  gtag('config', window.GA4_ID);
})();

document.addEventListener('click', function (e) {
  var a = e.target.closest && e.target.closest('a[href]');
  if (!a) return;
  var h = a.getAttribute('href') || '';
  var ev = null;

  if (h.indexOf('tel:') === 0) ev = ['click_to_call', 'phone'];
  else if (h.indexOf('wa.me') > -1) ev = ['whatsapp_click', 'whatsapp'];
  else if (h.indexOf('apollohospitals.com') > -1) ev = ['booking_click', 'apollo'];
  else if (h.indexOf('maps.app.goo.gl') > -1) ev = ['directions_click', 'google_maps'];
  else if (h.indexOf('g.page') > -1) ev = ['review_click', 'google_reviews'];
  else if (h.indexOf('youtube.com') > -1) ev = ['social_click', 'youtube'];
  else if (h.indexOf('instagram.com') > -1) ev = ['social_click', 'instagram'];
  else if (h.indexOf('facebook.com') > -1) ev = ['social_click', 'facebook'];
  if (!ev || typeof window.gtag !== 'function') return;

  gtag('event', ev[0], {
    method: ev[1],
    link_url: a.href,
    link_location: (a.closest('section, header, footer, nav') || {}).id || a.className
  });
});

(function () {
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
