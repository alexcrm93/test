/* ============================================================
   BLUE HOME TECHNOLOGIES — home-anim.js
   Animazione scroll-driven scena casa. Richiede GSAP + ScrollTrigger.
   ES5 — var, function, niente arrow/template literals
   ============================================================ */

(function () {
  'use strict';

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  var wrapper = document.querySelector('.scroll-scene-wrapper');
  if (!wrapper) return;

  /* helper: elemento per id, null se assente */
  function g(id) { return document.getElementById(id); }

  /* elementi SVG */
  var wire1    = g('wire1'),    wire2    = g('wire2'),    wire3    = g('wire3');
  var socket1  = g('socket1'), socket2  = g('socket2'), socket3  = g('socket3');
  var pipe1    = g('pipe1'),    pipe2    = g('pipe2');
  var tap1     = g('tap1'),     tap2     = g('tap2');
  var panel1   = g('panel1'),   panel2   = g('panel2'),  panel3   = g('panel3');
  var panel4   = g('panel4'),   panel5   = g('panel5');
  var sunCirc  = g('sunCircle'),sunCore  = g('sunCore');
  var room1    = g('room1glow'),room2    = g('room2glow'),room3   = g('room3glow');
  var icon1    = g('icon1'),    icon2    = g('icon2'),    icon3   = g('icon3');

  /* testo e dots */
  var steps = [g('step0'), g('step1'), g('step2'), g('step3')];
  var dots  = [g('dot0'),  g('dot1'),  g('dot2'),  g('dot3')];

  /* progress bar: crea se non esiste */
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

  /* mostra step e dot attivi */
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

  /* Timeline principale — 8 unità di durata, scrub mappa su scroll */
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: wrapper,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.4,
      onUpdate: function (self) {
        var p = self.progress;
        if (bar) bar.style.width = (p * 100) + '%';
        showStep(p < 0.25 ? 0 : p < 0.5 ? 1 : p < 0.75 ? 2 : 3);
      }
    }
  });

  /* ---- FASE 1 (0-2): Elettrico ---- */
  if (wire1)   tl.to(wire1,   { strokeDashoffset: 0, ease: 'none', duration: 1   }, 0.0);
  if (wire2)   tl.to(wire2,   { strokeDashoffset: 0, ease: 'none', duration: 1   }, 0.3);
  if (wire3)   tl.to(wire3,   { strokeDashoffset: 0, ease: 'none', duration: 1   }, 0.6);
  if (socket1) tl.to(socket1, { opacity: 1, duration: 0.4 }, 1.4);
  if (socket2) tl.to(socket2, { opacity: 1, duration: 0.4 }, 1.6);
  if (socket3) tl.to(socket3, { opacity: 1, duration: 0.4 }, 1.8);

  /* ---- FASE 2 (2-4): Idrico ---- */
  if (pipe1) tl.to(pipe1, { strokeDashoffset: 0, ease: 'none', duration: 1.5 }, 2.0);
  if (pipe2) tl.to(pipe2, { strokeDashoffset: 0, ease: 'none', duration: 1.2 }, 2.5);
  if (tap1)  tl.to(tap1,  { opacity: 1, duration: 0.4 }, 3.5);
  if (tap2)  tl.to(tap2,  { opacity: 1, duration: 0.4 }, 3.7);

  /* ---- FASE 3 (4-6): Solare ---- */
  if (sunCirc) tl.to(sunCirc, { attr: { cy: 110 }, opacity: 0.7, duration: 1.8 }, 4.0);
  if (sunCore) tl.to(sunCore, { attr: { cy: 110 }, opacity: 1.0, duration: 1.8 }, 4.0);
  var panels = [panel1, panel2, panel3, panel4, panel5];
  for (var pi = 0; pi < panels.length; pi++) {
    if (panels[pi]) {
      tl.to(panels[pi], { fill: '#0F4C81', stroke: '#0a3560', duration: 0.5 }, 4.8 + pi * 0.25);
    }
  }

  /* ---- FASE 4 (6-8): Smart ---- */
  if (room1) tl.to(room1, { opacity: 1, duration: 0.6 }, 6.0);
  if (room2) tl.to(room2, { opacity: 1, duration: 0.6 }, 6.4);
  if (room3) tl.to(room3, { opacity: 1, duration: 0.6 }, 6.8);
  if (icon1) tl.to(icon1, { opacity: 1, scale: 1, duration: 0.5 }, 7.2);
  if (icon2) tl.to(icon2, { opacity: 1, scale: 1, duration: 0.5 }, 7.5);
  if (icon3) tl.to(icon3, { opacity: 1, scale: 1, duration: 0.5 }, 7.8);

  /* stato iniziale: primo step visibile */
  showStep(0);

})();
