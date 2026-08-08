var yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// language switcher
var body = document.body;
var langNames = { pt: 'PT', en: 'EN', es: 'ES', it: 'IT', fr: 'FR' };
var langSwitch = document.getElementById('langSwitch');
var langToggleBtn = document.getElementById('langToggleBtn');
var langCurrent = document.getElementById('langCurrent');
var langMenu = document.getElementById('langMenu');

function setLang(lang) {
  body.setAttribute('data-lang', lang);
  localStorage.setItem('lang', lang);
  if (langCurrent) langCurrent.textContent = langNames[lang] || 'PT';
  if (langMenu) {
    langMenu.querySelectorAll('button').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.dataset.lang === lang);
    });
  }
  document.querySelectorAll('[data-ph-pt]').forEach(function (el) {
    var ph = el.getAttribute('data-ph-' + lang);
    if (ph) el.setAttribute('placeholder', ph);
  });
}

setLang(localStorage.getItem('lang') || 'pt');

if (langToggleBtn && langSwitch) {
  langToggleBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    langSwitch.classList.toggle('open');
  });
  document.addEventListener('click', function () {
    langSwitch.classList.remove('open');
  });
}
if (langMenu) {
  langMenu.querySelectorAll('button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setLang(btn.dataset.lang);
      langSwitch.classList.remove('open');
    });
  });
}

// sticky header
var header = document.getElementById('header');
var toTopBtn = document.getElementById('toTop');
window.addEventListener('scroll', function () {
  if (header) header.classList.toggle('is-scrolled', window.scrollY > 40);
  if (toTopBtn) toTopBtn.classList.toggle('is-visible', window.scrollY > 500);
});

// mobile menu
var navToggle = document.getElementById('navToggle');
var navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', function () {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
    });
  });
}

// back to top
if (toTopBtn) {
  toTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Google Analytics (only loads after cookie consent, per GDPR)
var GA_ID = 'G-K3Q3PZ9740';
function loadAnalytics() {
  if (window.gtagLoaded) return;
  window.gtagLoaded = true;
  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_ID);
}

// cookie consent banner
var cookieBanner = document.getElementById('cookieBanner');
var cookieAccept = document.getElementById('cookieAccept');
if (localStorage.getItem('cookieConsent') === 'accepted') {
  loadAnalytics();
}
if (cookieBanner) {
  if (!localStorage.getItem('cookieConsent')) {
    setTimeout(function () { cookieBanner.classList.add('is-visible'); }, 600);
  }
  if (cookieAccept) {
    cookieAccept.addEventListener('click', function () {
      localStorage.setItem('cookieConsent', 'accepted');
      cookieBanner.classList.remove('is-visible');
      loadAnalytics();
    });
  }
}

// scroll reveal
var revealEls = document.querySelectorAll('.reveal');
var revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(function (el) { revealObserver.observe(el); });
