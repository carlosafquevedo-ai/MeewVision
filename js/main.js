/* MeewVision Creative Studio — interatividade do site (JavaScript puro, sem dependências). */
(function () {
  'use strict';

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var mq = function (q) { try { return window.matchMedia(q).matches; } catch (e) { return false; } };

  var REDUCE = mq('(prefers-reduced-motion: reduce)');
  var CAN_TILT = mq('(hover: hover) and (pointer: fine)') && !REDUCE;

  /* ---------- Dados ---------- */
  var PROJECTS = [
    { cat: 'Restaurantes', title: 'Lota da Esquina', tagline: 'Vibrante. Sofisticado. Elegante.', url: 'https://www.meewvision.com/lota-da-esquina' },
    { cat: 'Lojas', title: 'Flor da Selva', tagline: 'Artesanal. Familiar. Autêntico. Exclusivo.', url: 'https://www.meewvision.com/flor-da-selva' },
    { cat: 'Hotéis', title: 'Pestana Group', tagline: 'Exclusivo. Distinto. Elegante.', url: 'https://www.meewvision.com/pestanagroup' },
    { cat: 'Empresas', title: 'BPI Gestão de Ativos', tagline: 'Profissional. Jovem. Dinâmica. Inspiradora.', url: 'https://www.meewvision.com/bpi-gestao-de-ativos' },
    { cat: 'Influencers', title: 'ASNOVE', tagline: 'Criativa. Inspiradora. Simplista.', url: 'https://www.meewvision.com/portfolio1' }
  ];
  var FEATURED = [
    { p: 2, type: 'Reels, vídeo e fotografia' },
    { p: 0, type: 'Reels, vídeo de evento e fotografia' },
    { p: 1, type: 'Vídeo, reels e fotografia' },
    { p: 3, type: 'Vídeo corporativo e entrevistas' }
  ];
  // Marcas da faixa "Marcas que já confiaram em nós" (clientes reais do portfólio).
  // Para mostrar o logótipo: colocar o ficheiro em assets/img/logos/ e preencher logo, ex. { name: 'Sandeman', logo: 'assets/img/logos/sandeman.svg' }
  var BRANDS = [
    'Pestana Group', 'Volkswagen Portugal', 'Lota da Esquina', 'Intercontinental Estoril', 'Flor da Selva', 'Sandeman',
    'Palácio do Grilo', 'BPI Gestão de Ativos', 'Valverde Lisboa', 'Embaixada da Austrália', 'Soya Noodles', 'Almalusa Alfama',
    'Neida Ceramics', 'Hotel Baía Cascais', 'La Gran Boca', 'Pousada de Lisboa', 'The Lisbon Frame', 'Condes de Azevedo',
    'AQA Farina', 'Moss', 'Ayla', 'Avec Bakery', 'Ukino', 'EsteOeste', 'Bratus', 'La Firma', 'MJT Construction',
    'Restaurante OZ', 'Arriba Pub', 'Buffalo', 'SOI', 'Bar13 Aqaba', 'Buda Burguers', 'Yolo Jordan', 'ASNOVE'
  ].map(function (b) { return typeof b === 'string' ? { name: b, logo: null } : b; });
  // Mosaico de "Outros Projetos". Cada cliente pode ser só o nome ('Ayla') ou um objeto:
  //   { name: 'Ayla', logo: 'assets/img/logos/ayla.svg', img: 'assets/img/…' }
  // logo: aparece no círculo por cima do nome (enquanto não houver, mostram-se as iniciais). img: fotografia do projeto no bloco;
  // sem img, usa-se uma das imagens da categoria (bgs), à vez.
  var CLIENTS = [
    { label: 'Hotéis', bgs: ['pestana-salao', 'pestana-escadaria', 'pestana-rececao', 'pestana-piscina'], names: ['Pestana Palace', 'Valverde Lisboa', 'Pestana Viana do Castelo', 'Hotel Baía Cascais', 'Condes de Azevedo', 'Pestana Alvor Praia', 'Intercontinental Estoril', 'Bratus', 'Pestana Serra da Estrela', 'Pestana Alvor', 'Ayla', 'Almalusa Alfama', 'Ukino', 'Pestana Castelo Óbidos', 'Pousada de Lisboa', 'Pestana Palace 25 anos'] },
    { label: 'Restaurantes', bgs: ['lota-polvo', 'lota-prato', 'lota-sopa', 'lota-evento'], names: ['Palácio do Grilo', 'Arriba Pub', 'Lota da Esquina', 'Soya Noodles', 'Buffalo', 'AQA Farina', 'La Firma', 'Restaurante OZ', 'Avec Bakery', 'Bar13 Aqaba', 'SOI', 'Buda Burguers', 'EsteOeste', 'La Gran Boca'] },
    { label: 'Marcas', bgs: ['flor-torra', 'bpi-entrevista', 'flor-graos', 'bpi-gestor', 'flor-maos', 'influencer'], names: ['Volkswagen Portugal', 'Neida Ceramics', 'Flor da Selva', 'Embaixada da Austrália', 'Moss', 'Sandeman', 'MJT Construction', 'Yolo Jordan', 'The Lisbon Frame'] }
  ];

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
  $$('.collage, .scard, .step').forEach(bindTilt);

  /* ---------- Navegação: fundo sólido depois do hero + menu móvel ---------- */
  var nav = $('.nav');
  var heroBody = $('.hero-body');
  if (nav && heroBody && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (en) { nav.classList.toggle('solid', !en[0].isIntersecting); }, { rootMargin: '-90px 0px 0px 0px' }).observe(heroBody);
  }

  // Link da secção atual aceso no menu
  var navLinks = $$('.nav-links a[href^="#"]');
  if (navLinks.length && 'IntersectionObserver' in window) {
    var byId = {}, SPY_ALIAS = {};
    navLinks.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var link = byId[en.target.id] || byId[SPY_ALIAS[en.target.id]];
        if (!link && en.target.id !== 'topo') return; // secções sem link no menu mantêm o anterior
        navLinks.forEach(function (a) { a.removeAttribute('aria-current'); });
        if (link) link.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main > section').forEach(function (s) { spy.observe(s); });
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

  /* ---------- Botão "voltar ao topo": aparece depois de 35% de scroll ---------- */
  var toTop = $('.to-top');
  if (toTop) {
    var topTick = false;
    var checkTop = function () {
      topTick = false;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var on = max > 0 && window.scrollY / max >= 0.35;
      toTop.classList.toggle('show', on);
      toTop.tabIndex = on ? 0 : -1;  // fora do teclado e dos leitores de ecrã enquanto está escondido
      toTop.setAttribute('aria-hidden', on ? 'false' : 'true');
    };
    window.addEventListener('scroll', function () { if (!topTick) { topTick = true; requestAnimationFrame(checkTop); } }, { passive: true });
    window.addEventListener('resize', checkTop);
    checkTop();
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: REDUCE ? 'auto' : 'smooth' });
      var logo = $('.nav .logo'); if (logo) logo.focus({ preventScroll: true });
    });
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
    var ctl = $$('#servicos .scar-ctl .icon-btn');
    if (ctl[0]) ctl[0].addEventListener('click', function () { step(-1); });
    if (ctl[1]) ctl[1].addEventListener('click', function () { step(1); });
  }

  /* ---------- Carrossel de passos ("Como Trabalhamos", tablet e telemóvel) ---------- */
  var stepsTrack = $('#steps-track');
  if (stepsTrack) {
    var stepBy = function (dir) {
      var card = $('.step', stepsTrack);
      var gap = parseFloat(getComputedStyle(stepsTrack).columnGap) || 12;
      stepsTrack.scrollBy({ left: dir * (card ? card.getBoundingClientRect().width + gap : 300), behavior: REDUCE ? 'auto' : 'smooth' });
    };
    var sc = $$('.steps-ctl .icon-btn');
    if (sc[0]) sc[0].addEventListener('click', function () { stepBy(-1); });
    if (sc[1]) sc[1].addEventListener('click', function () { stepBy(1); });
  }

  /* ---------- Trabalho Selecionado (destaque) ---------- */
  var feat = $('.feat');
  if (feat) {
    var imgs = $$('.feat-bg img', feat), dots = $$('.dots button', feat), fi = 0;
    var h3 = $('.feat-title h3', feat), tl = $('.feat-title p', feat), dds = $$('.feat-meta dd', feat);
    var go = $('.feat-go', feat), count = $('.feat-ctl .count', feat), box = $('.feat-title', feat);
    var setFeat = function (i) {
      var n = FEATURED.length; fi = ((i % n) + n) % n;
      var f = FEATURED[fi], pr = PROJECTS[f.p];
      imgs.forEach(function (im, k) { im.classList.toggle('on', k === fi); });
      dots.forEach(function (d, k) { d.setAttribute('aria-current', k === fi ? 'true' : 'false'); });
      h3.textContent = pr.title; tl.textContent = pr.tagline;
      dds[0].textContent = pr.title; dds[1].textContent = pr.cat; dds[2].textContent = f.type;
      go.href = pr.url; go.setAttribute('aria-label', 'Ver projeto completo: ' + pr.title);
      count.textContent = '0' + (fi + 1) + ' / 0' + n;
      box.style.animation = 'none'; void box.offsetWidth; box.style.animation = '';
    };
    dots.forEach(function (d, k) { d.addEventListener('click', function () { setFeat(k); }); });
    var fb = $$('.feat-ctl > .icon-btn', feat);
    if (fb[0]) fb[0].addEventListener('click', function () { setFeat(fi - 1); });
    if (fb[1]) fb[1].addEventListener('click', function () { setFeat(fi + 1); });
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

  /* ---------- Outros Projetos: mosaico "bento" com filtro e "ver mais" ---------- */
  var bento = $('.bento'), moreBtn = $('.bento-more .btn'), segBtns = $$('.seg button'), live = $('.wall-sec .sr');
  var CAT_TAG = { 'Hotéis': 'hotel', 'Restaurantes': 'restaurante', 'Marcas': 'marca' };
  // tamanho de cada bloco, por ordem; o padrão de 8 preenche uma grelha 4x4 sem buracos
  var BENTO = ['xl', 's', 'tall', 's', 'wide', 'tall', 'tall', 'wide'];
  var FIRST = 8;
  var initials = function (n) { return n.replace(/[^A-Za-zÀ-ÿ0-9 ]/g, '').split(' ').filter(function (w) { return w && !/^(de|da|do|dos|das|e)$/i.test(w); }).slice(0, 2).map(function (w) { return w[0].toUpperCase(); }).join(''); };
  if (bento) {
    var catIdx = 0, expanded = false;
    var render = function () {
      var c = CLIENTS[catIdx], names = expanded ? c.names : c.names.slice(0, FIRST), imgN = 0;
      bento.innerHTML = '';
      names.forEach(function (item, k) {
        var cl = typeof item === 'string' ? { name: item } : item;
        // grupos completos de 8 seguem o padrão; os restantes ficam em linhas de 4 e a última linha estica para não deixar buracos
        var full = Math.floor(k / 8) < Math.floor(names.length / 8), size = BENTO[k % 8];
        if (!full) {
          var j = k - Math.floor(names.length / 8) * 8, rest = names.length % 8, m = rest % 4, inLast = j >= rest - m;
          size = 's';
          if (m && inLast) size = m === 1 ? 'row' : m === 2 ? 'wide' : (j === rest - 1 ? 'wide' : 's');
        }
        var li = document.createElement('li');
        li.className = 'tile ' + size;
        li.style.animationDelay = ((k % FIRST) * 0.05).toFixed(2) + 's';
        li.innerHTML = '<div class="tile-in"><img class="tile-img" alt="" loading="lazy" decoding="async" src="' + (cl.img || 'assets/img/' + c.bgs[k % c.bgs.length] + '.jpg') + '">' +
          '<div class="tile-top"><span class="tile-tag">' + (CAT_TAG[c.label] || c.label) + '</span><span class="tile-n">' + String(k + 1).padStart(2, '0') + '</span></div>' +
          '<div class="tile-center"><span class="tile-logo"></span><h3 class="tile-name"></h3></div></div>';
        $('.tile-name', li).textContent = cl.name;
        var logo = $('.tile-logo', li);
        if (cl.logo) { var l = document.createElement('img'); l.src = cl.logo; l.alt = ''; logo.appendChild(l); }
        else { logo.textContent = initials(cl.name); logo.classList.add('is-empty'); } // sem logótipo: iniciais como marcador
        bento.appendChild(li);
        bindTilt(li);
      });
      if (moreBtn) {
        var rest = c.names.length - FIRST;
        moreBtn.hidden = rest <= 0;
        moreBtn.textContent = expanded ? 'Ver menos' : 'Ver mais ' + rest + (rest === 1 ? ' projeto' : ' projetos');
        moreBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      }
      if (live) live.textContent = c.names.length + ' projetos em ' + c.label;
    };
    segBtns.forEach(function (b, k) { b.addEventListener('click', function () {
      segBtns.forEach(function (x, j) { x.setAttribute('aria-pressed', j === k ? 'true' : 'false'); });
      catIdx = k; expanded = false; render();
    }); });
    if (moreBtn) moreBtn.addEventListener('click', function () { expanded = !expanded; render(); });
    render();
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
      btn.disabled = true; btn.firstChild.textContent = 'A enviar…';
      // TODO: ligar a um serviço de envio (Formspree, Netlify Forms, API própria...).
      setTimeout(function () {
        var sent = $('.contact .sent');
        $('[data-sent-name]', sent).textContent = nome.split(' ')[0];
        form.hidden = true; sent.hidden = false; sent.focus();
      }, 900);
    });
  }
})();
