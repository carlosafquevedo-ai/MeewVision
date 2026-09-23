/* MeewVision Creative Studio — interatividade do site (JavaScript puro, sem dependências). */
(function () {
  'use strict';

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var mq = function (q) { try { return window.matchMedia(q).matches; } catch (e) { return false; } };

  var REDUCE = mq('(prefers-reduced-motion: reduce)');
  var CAN_TILT = mq('(hover: hover) and (pointer: fine)') && !REDUCE;

  /* ---------- Dados ---------- */
  // Marcas da faixa "Marcas que já confiaram em nós" (clientes reais do portfólio).
  // Para mostrar o logótipo: colocar o ficheiro em assets/img/logos/ e preencher logo, ex. { name: 'Sandeman', logo: 'assets/img/logos/sandeman.svg' }
  var BRANDS = [
    'Pestana Group', 'Volkswagen Portugal', 'Lota da Esquina', 'Intercontinental Estoril', 'Flor da Selva', 'Sandeman',
    'Palácio do Grilo', 'BPI Gestão de Ativos', 'Valverde Lisboa', 'Embaixada da Austrália', 'Soya Noodles', 'Almalusa Alfama',
    'Neida Ceramics', 'Hotel Baía Cascais', 'La Gran Boca', 'Pousada de Lisboa', 'The Lisbon Frame', 'Condes de Azevedo',
    'AQA Farina', 'Moss', 'Ayla', 'Avec Bakery', 'Ukino', 'EsteOeste', 'Bratus', 'La Firma', 'MJT Construction',
    'Restaurante OZ', 'Arriba Pub', 'Buffalo', 'SOI', 'Bar13 Aqaba', 'Buda Burguers', 'Yolo Jordan', 'ASNOVE'
  ].map(function (b) { return typeof b === 'string' ? { name: b, logo: null } : b; });

  /* ---------- Utilitário: escreve variáveis CSS uma vez por frame ---------- */
  function rafVars(el) {
    var id = 0;
    return function (vars) {
      cancelAnimationFrame(id);
      id = requestAnimationFrame(function () { for (var k in vars) el.style.setProperty(k, vars[k]); });
    };
  }

  /* ---------- Inclinação 3D genérica (colagem, cartões) ---------- */
  function bindTilt(el) {
    if (!CAN_TILT) return;
    var rect = null, set = rafVars(el);
    el.addEventListener('pointerenter', function () { rect = el.getBoundingClientRect(); });
    el.addEventListener('pointermove', function (e) {
      rect = rect || el.getBoundingClientRect();
      set({ '--tx': ((e.clientX - rect.left) / rect.width - 0.5).toFixed(3), '--ty': ((e.clientY - rect.top) / rect.height - 0.5).toFixed(3) });
    });
    el.addEventListener('pointerleave', function () { rect = null; set({ '--tx': '0', '--ty': '0' }); });
  }
  $$('.collage, .step, .scard').forEach(bindTilt);

  /* ---------- Navegação: fundo sólido depois do hero + menu móvel ---------- */
  var nav = $('.nav');
  var heroBody = $('.hero-body');
  if (nav && heroBody && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (en) { nav.classList.toggle('solid', !en[0].isIntersecting); }, { rootMargin: '-90px 0px 0px 0px' }).observe(heroBody);
  }
  var menu = $('#menu'), menuBtn = $('#menu-btn'), menuClose = $('#menu-close');
  function openMenu() { menu.hidden = false; menuBtn.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; menuClose.focus(); }
  function closeMenu() { menu.hidden = true; menuBtn.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; menuBtn.focus(); }
  if (menu && menuBtn) {
    menuBtn.addEventListener('click', openMenu);
    menuClose.addEventListener('click', closeMenu);
    $$('a', menu).forEach(function (a) { a.addEventListener('click', closeMenu); });
    menu.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  }

  /* ---------- Hero: visor de câmara (parallax, foco AF, timecode) ---------- */
  var hero = $('.hero');
  if (hero) {
    var setHero = rafVars(hero);
    hero.addEventListener('pointermove', function (e) {
      if (!CAN_TILT) return;
      var r = hero.getBoundingClientRect(), fx = e.clientX - r.left, fy = e.clientY - r.top;
      hero.classList.add('aim');
      setHero({ '--mx': (fx / r.width - 0.5).toFixed(3), '--my': (fy / r.height - 0.5).toFixed(3), '--fx': fx.toFixed(0) + 'px', '--fy': fy.toFixed(0) + 'px' });
    });
    hero.addEventListener('pointerleave', function () { hero.classList.remove('aim'); setHero({ '--mx': '0', '--my': '0' }); });
    var tc = $('#tc');
    if (tc && !REDUCE) {
      var t0 = Date.now(), pad = function (n) { return (n < 10 ? '0' : '') + n; };
      setInterval(function () {
        var ms = Date.now() - t0, f = Math.floor(ms / 40) % 25, s = Math.floor(ms / 1000);
        tc.textContent = pad(Math.floor(s / 3600)) + ':' + pad(Math.floor(s / 60) % 60) + ':' + pad(s % 60) + ':' + pad(f);
      }, 40);
    }
  }

  /* ---------- Setores (painéis que expandem) ---------- */
  var sectors = $$('.sec');
  function setSector(i) {
    sectors.forEach(function (li, k) {
      var on = k === i;
      li.classList.toggle('on', on);
      var hit = $('.sec-hit', li), link = $('.sec-body .btn', li), img = $('img', li);
      hit.setAttribute('aria-expanded', on ? 'true' : 'false');
      hit.tabIndex = on ? -1 : 0;
      if (link) link.tabIndex = on ? 0 : -1;
      if (img) img.alt = on ? (li.dataset.alt || img.alt || '') : '';
    });
  }
  sectors.forEach(function (li, i) {
    var img = $('img', li); if (img && img.alt) li.dataset.alt = img.alt;
    $('.sec-hit', li).addEventListener('click', function () { setSector(i); });
    li.addEventListener('pointerenter', function () { if (CAN_TILT) setSector(i); });
  });

  /* ---------- Carrossel de serviços ---------- */
  var track = $('#scar-track');
  if (track) {
    var step = function (dir) {
      var card = $('.scard', track);
      var w = card ? card.getBoundingClientRect().width + 18 : 340;
      track.scrollBy({ left: dir * w, behavior: REDUCE ? 'auto' : 'smooth' });
    };
    var ctl = $$('.scar-ctl .icon-btn');
    if (ctl[0]) ctl[0].addEventListener('click', function () { step(-1); });
    if (ctl[1]) ctl[1].addEventListener('click', function () { step(1); });
  }

  /* ---------- Marcas que já confiaram em nós (faixa contínua) ---------- */
  var logos = $('#logos-track');
  if (logos) {
    // Duas cópias seguidas: a animação desloca -50% e recomeça sem salto. A cópia fica escondida dos leitores de ecrã.
    [false, true].forEach(function (copy) {
      BRANDS.forEach(function (b) {
        var li = document.createElement('li');
        if (copy) li.setAttribute('aria-hidden', 'true');
        if (b.logo) {
          var img = document.createElement('img');
          img.src = b.logo; img.alt = b.name; img.loading = 'lazy'; img.decoding = 'async';
          li.appendChild(img);
        } else {
          var sp = document.createElement('span');
          sp.className = 'brand'; sp.textContent = b.name;
          li.appendChild(sp);
        }
        logos.appendChild(li);
      });
    });
    // Velocidade constante (~45 px/s), seja qual for o número de marcas
    var setDur = function () { logos.style.setProperty('--logos-dur', Math.round(logos.scrollWidth / 2 / 45) + 's'); };
    setDur();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(setDur);
  }

  /* ---------- Formulário de contacto ---------- */
  var form = $('.contact form');
  if (form) {
    var showErr = function (name, msg) {
      var input = form.elements[name], p = $('#e-' + name);
      input.setAttribute('aria-invalid', msg ? 'true' : 'false');
      p.textContent = msg || ''; p.hidden = !msg;
    };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nome = form.elements.nome.value.trim(), email = form.elements.email.value.trim();
      var eN = nome ? '' : 'Escreva o seu nome.';
      var eE = !email ? 'Escreva o seu email para podermos responder.' : (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Confirme o email: falta o @ ou o domínio.');
      showErr('nome', eN); showErr('email', eE);
      if (eN) { form.elements.nome.focus(); return; }
      if (eE) { form.elements.email.focus(); return; }
      var btn = $('button[type="submit"]', form);
      btn.disabled = true; btn.textContent = 'A enviar…';
      // TODO: ligar a um serviço de envio (Formspree, Netlify Forms, API própria...).
      setTimeout(function () {
        var sent = $('.contact .sent');
        $('[data-sent-name]', sent).textContent = nome.split(' ')[0];
        form.hidden = true; sent.hidden = false; sent.focus();
      }, 900);
    });
  }
})();
