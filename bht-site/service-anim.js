/* ============================================================
   BLUE HOME TECHNOLOGIES — service-anim.js
   Animazione scroll-driven per pagine servizio.
   Ogni pagina usa gli stessi ID di wrapper/sticky/step/dot.
   ES5 — var, function, niente arrow/template literals
   ============================================================ */

(function () {
  'use strict';

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  var wrapper = document.querySelector('.scroll-scene-wrapper');
  if (!wrapper) return;

  function g(id) { return document.getElementById(id); }

  /* steps e dots (3 per le pagine servizio) */
  var steps = [g('step0'), g('step1'), g('step2')];
  var dots  = [g('dot0'),  g('dot1'),  g('dot2')];

  /* progress bar */
  var bar = g('progressBar');
  if (!bar) {
    var sticky = g('sceneSticky');
    if (sticky) {
      bar = document.createElement('div');
      bar.id = 'progressBar';
      bar.className = 'scroll-progress-bar';
      sticky.appendChild(bar);
    }
  }

  function showStep(idx) {
    var i;
    for (i = 0; i < steps.length; i++) {
      if (!steps[i]) continue;
      steps[i].classList[i === idx ? 'add' : 'remove']('active');
    }
    for (i = 0; i < dots.length; i++) {
      if (!dots[i]) continue;
      dots[i].classList[i === idx ? 'add' : 'remove']('active');
    }
  }

  /* ---- impiantistica.html — animazione parete ---- */
  if (g('wallSvg')) {
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.4,
        onUpdate: function (self) {
          var p = self.progress;
          if (bar) bar.style.width = (p * 100) + '%';
          showStep(p < 0.35 ? 0 : p < 0.68 ? 1 : 2);
        }
      }
    });

    /* FASE 1 — Elettrico (0–0.35 scroll → 0–2.8 tl) */
    if (g('elec-main'))  tl.to(g('elec-main'),  { strokeDashoffset: 0, ease: 'none', duration: 1.2 }, 0.0);
    if (g('elec-drop1')) tl.to(g('elec-drop1'), { strokeDashoffset: 0, ease: 'none', duration: 0.7 }, 0.8);
    if (g('elec-drop2')) tl.to(g('elec-drop2'), { strokeDashoffset: 0, ease: 'none', duration: 0.7 }, 1.1);
    if (g('elec-drop3')) tl.to(g('elec-drop3'), { strokeDashoffset: 0, ease: 'none', duration: 0.7 }, 1.4);
    if (g('elec-drop4')) tl.to(g('elec-drop4'), { strokeDashoffset: 0, ease: 'none', duration: 0.7 }, 1.7);
    if (g('socket-a'))   tl.to(g('socket-a'),   { opacity: 1, duration: 0.3 }, 2.2);
    if (g('socket-b'))   tl.to(g('socket-b'),   { opacity: 1, duration: 0.3 }, 2.4);
    if (g('socket-c'))   tl.to(g('socket-c'),   { opacity: 1, duration: 0.3 }, 2.5);
    if (g('socket-d'))   tl.to(g('socket-d'),   { opacity: 1, duration: 0.3 }, 2.6);

    /* FASE 2 — Idrico (0.35–0.68 scroll → 2.8–5.4 tl) */
    if (g('water-col'))  tl.to(g('water-col'),  { strokeDashoffset: 0, ease: 'none', duration: 1.0 }, 2.8);
    if (g('water-h1'))   tl.to(g('water-h1'),   { strokeDashoffset: 0, ease: 'none', duration: 0.9 }, 3.4);
    if (g('water-h2'))   tl.to(g('water-h2'),   { strokeDashoffset: 0, ease: 'none', duration: 0.9 }, 3.8);
    if (g('water-d1'))   tl.to(g('water-d1'),   { strokeDashoffset: 0, ease: 'none', duration: 0.5 }, 4.5);
    if (g('water-d2'))   tl.to(g('water-d2'),   { strokeDashoffset: 0, ease: 'none', duration: 0.5 }, 4.7);
    if (g('tap-a'))      tl.to(g('tap-a'),       { opacity: 1, duration: 0.3 }, 5.1);
    if (g('tap-b'))      tl.to(g('tap-b'),       { opacity: 1, duration: 0.3 }, 5.3);

    /* FASE 3 — Termico (0.68–1.0 scroll → 5.4–8.0 tl) */
    if (g('boiler'))        tl.to(g('boiler'),        { opacity: 1, duration: 0.5 }, 5.4);
    if (g('boiler-flame'))  tl.to(g('boiler-flame'),  { opacity: 1, duration: 0.4 }, 5.9);
    if (g('therm-l'))       tl.to(g('therm-l'),       { strokeDashoffset: 0, ease: 'none', duration: 0.8 }, 6.2);
    if (g('therm-r'))       tl.to(g('therm-r'),       { strokeDashoffset: 0, ease: 'none', duration: 0.8 }, 6.2);
    if (g('rad-l'))         tl.to(g('rad-l'),          { opacity: 1, duration: 0.4 }, 7.0);
    if (g('rad-r'))         tl.to(g('rad-r'),          { opacity: 1, duration: 0.4 }, 7.3);

    showStep(0);
  }

})();
