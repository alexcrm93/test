/* ============================================================
   BLUE HOME TECHNOLOGIES — main.js
   Condiviso da tutte le pagine. Nessuna dipendenza esterna.
   ES5 — var, function, no arrow, no template literals
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     NAVBAR: diventa .scrolled dopo 60px di scroll
  ---------------------------------------------------------- */
  var navbar = document.getElementById('navbar');

  function onScroll() {
    if (!navbar) return;
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // stato iniziale

  /* ----------------------------------------------------------
     MENU MOBILE: hamburger toggle + overlay
  ---------------------------------------------------------- */
  var menuToggle = document.getElementById('menuToggle');
  var navOverlay = document.getElementById('navOverlay');

  function openMenu() {
    if (!menuToggle || !navOverlay) return;
    menuToggle.classList.add('open');
    navOverlay.classList.add('open');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!menuToggle || !navOverlay) return;
    menuToggle.classList.remove('open');
    navOverlay.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      if (menuToggle.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  // Chiude il menu cliccando un link nell'overlay
  if (navOverlay) {
    var overlayLinks = navOverlay.querySelectorAll('a');
    for (var i = 0; i < overlayLinks.length; i++) {
      overlayLinks[i].addEventListener('click', closeMenu);
    }
  }

  // Chiude con ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ----------------------------------------------------------
     REVEAL ON SCROLL — IntersectionObserver
  ---------------------------------------------------------- */
  var revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      for (var j = 0; j < entries.length; j++) {
        if (entries[j].isIntersecting) {
          entries[j].target.classList.add('visible');
          revealObserver.unobserve(entries[j].target);
        }
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    for (var k = 0; k < revealEls.length; k++) {
      revealObserver.observe(revealEls[k]);
    }
  } else {
    // Fallback: mostra tutto se IntersectionObserver non disponibile
    for (var m = 0; m < revealEls.length; m++) {
      revealEls[m].classList.add('visible');
    }
  }

  /* ----------------------------------------------------------
     COUNTER ANIMATO — elementi .stat-value[data-target]
  ---------------------------------------------------------- */
  var counters = document.querySelectorAll('.stat-value[data-target]');

  if (counters.length && 'IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function (entries) {
      for (var n = 0; n < entries.length; n++) {
        if (entries[n].isIntersecting) {
          animateCounter(entries[n].target);
          counterObserver.unobserve(entries[n].target);
        }
      }
    }, { threshold: 0.5 });

    for (var p = 0; p < counters.length; p++) {
      counterObserver.observe(counters[p]);
    }
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var suffix = el.getAttribute('data-suffix') || '+';
    var duration = 1400;
    var start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      var current = Math.round(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    }

    window.requestAnimationFrame(step);
  }

})();
