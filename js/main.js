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
    { cat: 'Restaurantes', title: 'Lota da Esquina', tagline: 'Vibrante. Sofisticado. Elegante.', url: '/projetos/lota-da-esquina/' },
    { cat: 'Lojas', title: 'Flor da Selva', tagline: 'Artesanal. Familiar. Autêntico. Exclusivo.', url: '/projetos/flor-da-selva/' },
    { cat: 'Hotéis', title: 'Pestana Group', tagline: 'Exclusivo. Distinto. Elegante.', url: '/projetos/pestana-group/' },
    { cat: 'Empresas', title: 'BPI Gestão de Ativos', tagline: 'Profissional. Jovem. Dinâmica. Inspiradora.', url: '/projetos/bpi-gestao-de-ativos/' },
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
  // Mosaico de "Todos os Projetos". Cada cliente pode ser só o nome ('Ayla') ou um objeto:
  //   { name: 'Ayla', img: 'assets/img/…', vimeo: 'https://vimeo.com/…', page: '/projetos/…/' }
  // page: página própria do projeto (tem prioridade sobre o vimeo).
  // img: fotografia do projeto no cartão; sem img, usa-se uma das imagens da categoria (bgs), à vez.
  // vimeo: link do vídeo do projeto; sem vimeo, o cartão abre a conta da MeewVision no Vimeo (VIMEO_ALL).
  // Os 4 primeiros de cada lista aparecem em destaque (maiores).
  var VIMEO_ALL = 'https://vimeo.com/meewvision';
  var CLIENTS = [
    { label: 'Hotéis', bgs: ['pestana-salao', 'pestana-escadaria', 'pestana-rececao', 'pestana-piscina'], names: ['Pestana Palace', 'Valverde Lisboa', 'Pestana Viana do Castelo', 'Hotel Baía Cascais', 'Condes de Azevedo', 'Pestana Alvor Praia', 'Intercontinental Estoril', 'Bratus', 'Pestana Serra da Estrela', 'Pestana Alvor', 'Ayla', 'Almalusa Alfama', 'Ukino', 'Pestana Castelo Óbidos', 'Pousada de Lisboa', 'Pestana Palace 25 anos'] },
    { label: 'Restaurantes', bgs: ['lota-polvo', 'lota-prato', 'lota-sopa', 'lota-evento'], names: ['Palácio do Grilo', 'Arriba Pub', { name: 'Lota da Esquina', page: '/projetos/lota-da-esquina/' }, 'Soya Noodles', 'Buffalo', 'AQA Farina', 'La Firma', 'Restaurante OZ', 'Avec Bakery', 'Bar13 Aqaba', 'SOI', 'Buda Burguers', 'EsteOeste', 'La Gran Boca'] },
    { label: 'Marcas', bgs: ['flor-torra', 'bpi-entrevista', 'flor-graos', 'bpi-gestor', 'flor-maos', 'influencer'], names: ['Volkswagen Portugal', 'Neida Ceramics', { name: 'Flor da Selva', page: '/projetos/flor-da-selva/' }, 'Embaixada da Austrália', 'Moss', 'Sandeman', 'MJT Construction', 'Yolo Jordan', 'The Lisbon Frame'] }
  ];

  // Testemunhos. Dois tipos de cartão: { tipo: 'texto', texto, nome, marca, logo } e
  // { tipo: 'video', video, imagem, nome, marca, logo } (vídeo horizontal carregado no site, NÃO no Vimeo:
  // video = ficheiro MP4, ex. 'assets/video/testemunho-ana.mp4', na fase 2 vem do Sanity; imagem = capa do vídeo).
  // logo: 'assets/img/logos/…' (opcional; sem logo aparecem as iniciais da marca).
  // ATENÇÃO: os cartões abaixo são EXEMPLOS entre [parênteses retos]. Substituir por testemunhos reais da cliente.
  var REVIEWS = [
    { tipo: 'texto', texto: '[Testemunho real do cliente: duas a quatro frases sobre como foi trabalhar com a MeewVision.]', nome: '[Nome da pessoa]', marca: '[Cargo, Marca]' },
    { tipo: 'video', video: '', imagem: 'assets/img/bpi-entrevista.jpg', nome: '[Nome da pessoa]', marca: '[Cargo, Marca]' },
    { tipo: 'texto', texto: '[Testemunho real do cliente.]', nome: '[Nome da pessoa]', marca: '[Cargo, Marca]' },
    { tipo: 'texto', texto: '[Testemunho real do cliente: um texto mais comprido também cabe, e o cartão cresce com ele sem desalinhar os outros.]', nome: '[Nome da pessoa]', marca: '[Cargo, Marca]' },
    { tipo: 'texto', texto: '[Testemunho real do cliente.]', nome: '[Nome da pessoa]', marca: '[Cargo, Marca]' },
    { tipo: 'video', video: '', imagem: 'assets/img/pestana-rececao.jpg', nome: '[Nome da pessoa]', marca: '[Cargo, Marca]' },
    { tipo: 'video', video: '', imagem: 'assets/img/flor-maos.jpg', nome: '[Nome da pessoa]', marca: '[Cargo, Marca]' },
    { tipo: 'texto', texto: '[Testemunho real do cliente.]', nome: '[Nome da pessoa]', marca: '[Cargo, Marca]' },
    { tipo: 'texto', texto: '[Testemunho real do cliente: duas a quatro frases.]', nome: '[Nome da pessoa]', marca: '[Cargo, Marca]' }
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
  $$('.collage, .step').forEach(bindTilt);

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
      var card = $('.dcard', track);
      var w = card ? card.getBoundingClientRect().width + 18 : 340;
      track.scrollBy({ left: dir * w, behavior: REDUCE ? 'auto' : 'smooth' });
    };
    var ctl = $$('#servicos .scar-ctl .icon-btn');
    if (ctl[0]) ctl[0].addEventListener('click', function () { step(-1); });
    if (ctl[1]) ctl[1].addEventListener('click', function () { step(1); });
  }

  /* ---------- Serviços: "Ler mais" / "Ler menos" (a descrição abre por cima da fotografia) ---------- */
  $$('.dcard-more').forEach(function (b) {
    var desc = document.getElementById(b.getAttribute('aria-controls')), label = $('span', b);
    b.addEventListener('click', function () {
      var open = b.getAttribute('aria-expanded') !== 'true';
      b.setAttribute('aria-expanded', open ? 'true' : 'false');
      desc.classList.toggle('open', open);
      label.textContent = open ? 'Ler menos' : 'Ler mais';
    });
  });

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
      dds[0].textContent = pr.cat; dds[1].textContent = f.type;
      go.href = pr.url; go.setAttribute('aria-label', 'Ver projeto completo: ' + pr.title);
      // páginas do site novo abrem no mesmo separador; as antigas (Squarespace) num novo
      if (pr.url.charAt(0) === '/') go.removeAttribute('target'); else go.target = '_blank';
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

  /* ---------- Testemunhos: cartões de texto e de vídeo + "Ver mais" ---------- */
  var rvGrid = $('#rv-grid'), rvWall = $('#rv-wall');
  if (rvGrid && rvWall) {
    var rvInitials = function (n) { return n.replace(/[^A-Za-zÀ-ÿ0-9 ]/g, '').split(' ').filter(Boolean).slice(0, 2).map(function (w) { return w[0].toUpperCase(); }).join(''); };
    var PLAY = '<svg viewBox="0 0 14 14" fill="currentColor" aria-hidden="true"><path d="M3 1.5v11l9-5.5z"/></svg>';
    // janela com o vídeo: só carrega o ficheiro quando se abre, e pára e liberta-o ao fechar
    var rvModal = $('#rv-modal'), rvBody = rvModal && $('.rv-modal-body', rvModal), rvLast = null;
    var openReview = function (r) {
      if (!rvModal || !rvModal.showModal) return;
      rvLast = document.activeElement;
      rvBody.innerHTML = '';
      if (r.video) {
        var v = document.createElement('video');
        v.src = r.video; v.poster = r.imagem || ''; v.controls = true; v.playsInline = true; v.preload = 'metadata';
        if (!REDUCE) v.autoplay = true;
        rvBody.appendChild(v);
      } else {
        var p = document.createElement('p'); p.className = 'rv-empty'; p.textContent = '[Vídeo do testemunho por carregar]';
        rvBody.appendChild(p);
      }
      $('.rv-modal-cap', rvModal).textContent = r.nome + ' · ' + r.marca;
      rvModal.showModal();
    };
    if (rvModal) {
      rvModal.addEventListener('close', function () { rvBody.innerHTML = ''; if (rvLast) rvLast.focus(); });
      rvModal.addEventListener('click', function (e) { if (e.target === rvModal) rvModal.close(); });
      $('.rv-modal-x', rvModal).addEventListener('click', function () { rvModal.close(); });
    }
    REVIEWS.forEach(function (r) {
      var li = document.createElement('li');
      li.className = 'rv-card ' + (r.tipo === 'video' ? 'rv-video' : 'rv-text');
      var who = '<div class="rv-who"><span class="rv-logo"></span><div><span class="rv-name"></span><span class="rv-brand"></span></div></div>';
      if (r.tipo === 'video') {
        li.innerHTML = '<button class="rv-open" type="button"><img class="rv-thumb" alt="" loading="lazy" decoding="async"><span class="rv-play">' + PLAY + '</span>' + who + '</button>';
        var ob = $('.rv-open', li);
        ob.setAttribute('aria-label', 'Ver o testemunho em vídeo de ' + r.nome + ', ' + r.marca);
        $('.rv-thumb', li).src = r.imagem;
        ob.addEventListener('click', function () { openReview(r); });
      } else {
        li.innerHTML = '<figure><blockquote></blockquote><figcaption>' + who + '</figcaption></figure>';
        $('blockquote', li).textContent = '“' + r.texto + '”';
      }
      $('.rv-name', li).textContent = r.nome;
      $('.rv-brand', li).textContent = r.marca;
      var logo = $('.rv-logo', li);
      if (r.logo) { var im = document.createElement('img'); im.src = r.logo; im.alt = ''; logo.appendChild(im); }
      else logo.textContent = rvInitials(r.marca.split(',').pop()) || '·';
      rvGrid.appendChild(li);
    });
    var rvBtn = $('.rv-more', rvWall);
    // o botão só aparece se houver cartões escondidos pela altura máxima
    var rvCheck = function () {
      if (rvWall.classList.contains('is-open')) return;
      var more = rvGrid.offsetHeight > rvGrid.parentNode.clientHeight + 4;
      rvWall.classList.toggle('no-more', !more);
      rvBtn.hidden = !more;
    };
    rvBtn.addEventListener('click', function () {
      var open = !rvWall.classList.contains('is-open');
      rvWall.classList.toggle('is-open', open);
      rvBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      $('span', rvBtn).textContent = open ? 'Ver menos' : 'Ver mais testemunhos';
      if (!open) { rvCheck(); rvWall.scrollIntoView({ behavior: REDUCE ? 'auto' : 'smooth', block: 'start' }); }
    });
    rvCheck();
    window.addEventListener('resize', rvCheck);
    window.addEventListener('load', rvCheck);
  }

  /* ---------- Todos os Projetos: mosaico de fotografias quadradas com filtro ---------- */
  // Todos os projetos da categoria ficam visíveis. Os 4 primeiros de cada lista são os destaques (--lg células);
  // os outros são pequenos (--sm). Colunas e tamanhos vêm do CSS: computador 16 colunas, 2x2 e 3x3, com vazios
  // (--holes) e uma faixa a meio para o título (--th); tablet 6 e telemóvel 3 colunas, 1x1 e 2x2, sem vazios.
  // Cada cartão ocupa o primeiro lugar livre; os destaques alternam entre a esquerda e a direita.
  var pgrid = $('.pgrid'), bento = $('.bento'), segBtns = $$('.seg button'), live = $('.wall-sec .sr');
  var FEATURED_N = 4;
    if (bento && pgrid) {
    var catIdx = 0, lastCols = 0;
    var cssNum = function (name) { return parseInt(getComputedStyle(pgrid).getPropertyValue(name), 10); };
    // ordem de colocação: os destaques espalhados pela lista (colagem: 0, n/4, n/2, 3n/4; grelha arrumada: 0, n/5… para
    // que os últimos cartões sejam pequenos e tapem os vazios que ficam ao lado dos destaques)
    var order = function (list, spread) {
      var f = list.slice(0, FEATURED_N), rest = list.slice(FEATURED_N), out = [], n = list.length;
      var at = f.map(function (_, i) { return Math.round(i * n / (f.length + spread)); });
      for (var k = 0, fi = 0, ri = 0; k < n; k++) {
        if (fi < f.length && at[fi] === k) out.push({ item: f[fi], idx: fi++, lg: true });
        else out.push({ item: rest[ri], idx: FEATURED_N + ri++, lg: false });
      }
      return out;
    };
    // vazios fixos (sempre nos mesmos sítios) para os cartões não formarem uma grelha cheia
    var hole = function (r, c, cols) { var h = Math.sin((r + 1) * 12.9898 + (c + 1) * 78.233 + cols) * 43758.5453; return h - Math.floor(h) < (cols > 6 ? 0.055 : 0.02); };
    // faixa do título (linhas tr a tr+th): o miolo fica vazio para as letras se lerem; só as pontas ficam por baixo das fotografias
    var pack = function (list, cols, sm, lg, tr, th, holes, alt) {
      var occ = [], nf = 0;
      var c0 = Math.floor(cols * 0.3), c1 = Math.ceil(cols * 0.7);
      for (var hr = 0; hr < 60; hr++) {
        occ[hr] = [];
        for (var hc = 0; hc < cols; hc++) if ((holes && hole(hr, hc, cols)) || (hr >= tr && hr < tr + th && hc >= c0 && hc < c1)) occ[hr][hc] = 1;
      }
      var free = function (r, c, w, h) {
        for (var y = r; y < r + h; y++) for (var x = c; x < c + w; x++) if (occ[y] && occ[y][x]) return false;
        return true;
      };
      return list.map(function (o) {
        var h = o.lg ? lg : sm, w = o.full ? cols : o.wide ? h * 2 : h, right = alt && o.lg && (nf++ % 2 === 1);
        for (var r = 0; ; r++) {
          for (var i = 0; i <= cols - w; i++) {
            var c = right ? cols - w - i : i;
            if (free(r, c, w, h)) {
              for (var y = r; y < r + h; y++) { occ[y] = occ[y] || []; for (var x = c; x < c + w; x++) occ[y][x] = 1; }
              o.r = r + 1; o.c = c + 1; o.s = h; o.w = w;
              return o;
            }
          }
        }
      });
    };
    var render = function () {
      var c = CLIENTS[catIdx], cols = cssNum('--cols'), sm = cssNum('--sm'), lg = cssNum('--lg');
      lastCols = cols;
      bento.innerHTML = '';
      // a faixa do título fica a meio do mosaico: calcula, mede o número de linhas e volta a calcular até estabilizar
      var th = cssNum('--th'), holes = cssNum('--holes'), tr = 1, placed;
      var countRows = function (p) { return p.reduce(function (m, o) { return Math.max(m, o.r - 1 + o.s); }, 0); };
      if (holes) {
        // colagem: a faixa do título fica a meio do mosaico; calcula, mede o número de linhas e volta a calcular até estabilizar
        for (var it = 0; it < 4; it++) {
          placed = pack(order(c.names, 0), cols, sm, lg, tr, th, 1, true);
          var next = Math.max(1, Math.round((countRows(placed) - th) / 2));
          if (next === tr) break;
          tr = next;
        }
      } else {
        // grelha arrumada: alguns cartões pequenos passam a largos (2x1) para o total de células encher a última linha;
        // experimenta algumas ordens (destaques mais cedo ou mais tarde, a alternar lados ou não) e fica com a primeira sem buracos;
        // se não houver cartões pequenos que cheguem para encher ao lado dos destaques, os últimos destaques passam à largura toda
        var tries = [[1, true], [1, false], [2, true], [2, false], [0, true], [0, false]], done = false;
        for (var full = 0; full <= FEATURED_N && !done; full++) {
          for (var t = 0; t < tries.length && !done; t++) {
            var list = order(c.names, tries[t][0]);
            list.filter(function (o) { return o.lg; }).slice(FEATURED_N - full).forEach(function (o) { o.full = true; });
            var cells = list.reduce(function (a, o) { return a + (o.full ? cols * lg : o.lg ? lg * lg : sm * sm); }, 0), extra = (cols - cells % cols) % cols;
            list.filter(function (o) { return !o.lg; }).slice(0, extra).forEach(function (o) { o.wide = true; });
            var p = pack(list, cols, sm, lg, 0, 0, 0, tries[t][1]);
            if (!placed || countRows(p) < countRows(placed)) placed = p;
            done = countRows(p) * cols === cells + extra;
            if (done) placed = p;
          }
        }
      }
      pgrid.style.setProperty('--tr', tr);
      placed.forEach(function (o, k) {
        var cl = typeof o.item === 'string' ? { name: o.item } : o.item;
        var li = document.createElement('li');
        li.className = 'tile' + (o.lg ? ' lg' : '');
        li.style.gridArea = o.r + ' / ' + o.c + ' / span ' + o.s + ' / span ' + o.w;
        li.style.animationDelay = (k * 0.03).toFixed(2) + 's';
        li.innerHTML = '<a class="tile-in" target="_blank" rel="noopener"><img class="tile-img" alt="" loading="lazy" decoding="async" src="' + (cl.img || 'assets/img/' + c.bgs[o.idx % c.bgs.length] + '.jpg') + '">' +
          '<span class="tile-go" aria-hidden="true"><svg viewBox="0 0 14 14" fill="currentColor"><path d="M3 1.5v11l9-5.5z"/></svg></span>' +
          '<h3 class="tile-name"></h3></a>';
        $('.tile-name', li).textContent = cl.name;
        var link = $('.tile-in', li);
        // projeto com página própria: abre a página no mesmo separador; senão abre o vídeo no Vimeo
        if (cl.page) { link.href = cl.page; link.removeAttribute('target'); link.setAttribute('aria-label', 'Ver o projeto ' + cl.name); }
        else { link.href = cl.vimeo || VIMEO_ALL; link.setAttribute('aria-label', 'Ver o vídeo de ' + cl.name + ' no Vimeo (abre num novo separador)'); }
        bento.appendChild(li);
      });
      if (live) live.textContent = c.names.length + ' projetos em ' + c.label;
    };
    segBtns.forEach(function (b, k) { b.addEventListener('click', function () {
      segBtns.forEach(function (x, j) { x.setAttribute('aria-pressed', j === k ? 'true' : 'false'); });
      catIdx = k; render();
    }); });
    // ao mudar de breakpoint (16, 6 ou 3 colunas) recalcula as posições
    window.addEventListener('resize', function () { if (cssNum('--cols') !== lastCols) render(); });
    render();
  }

  /* ---------- Página de projeto: galeria com janela de ampliação e vídeos do Vimeo ---------- */
  var lb = $('#pj-lightbox');
  if (lb && lb.showModal) {
    var shots = $$('.pj-shot'), lbImg = $('img', lb), lbCount = $('.pj-lb-count', lb), li = 0, lbLast = null;
    var showShot = function (i) {
      li = (i + shots.length) % shots.length;
      lbImg.src = shots[li].dataset.full;
      lbCount.textContent = (li + 1) + ' / ' + shots.length;
    };
    shots.forEach(function (b, i) { b.addEventListener('click', function () { lbLast = b; showShot(i); lb.showModal(); }); });
    $('.pj-lb-prev', lb).addEventListener('click', function () { showShot(li - 1); });
    $('.pj-lb-next', lb).addEventListener('click', function () { showShot(li + 1); });
    $('.pj-lb-close', lb).addEventListener('click', function () { lb.close(); });
    lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
    lb.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') showShot(li + 1);
      if (e.key === 'ArrowLeft') showShot(li - 1);
    });
    lb.addEventListener('close', function () { lbImg.removeAttribute('src'); if (lbLast) lbLast.focus(); });
  }
  // reels em carrossel 3D: o reel ativo fica ao centro; os outros recuam para os lados (circular a partir de 3 reels)
  var reelList = $('#pj-reel-list'), reelCtl = $('.pj-reels-ctl');
  if (reelList) {
    var reels = Array.prototype.slice.call(reelList.children), rn = reels.length, rc = 0;
    var placeReels = function () {
      var w = reels[0] ? reels[0].offsetWidth : 280;   // offsetWidth ignora a escala aplicada
      var gap = 1.05;   // distância entre centros, em larguras de reel (deixa espaço entre os vídeos)
      reels.forEach(function (li, i) {
        var d = i - rc;
        if (rn >= 3) { if (d > rn / 2) d -= rn; if (d < -rn / 2) d += rn; }   // o caminho mais curto, à volta
        var ad = Math.abs(d), sgn = d < 0 ? -1 : 1;
        var x = ad === 0 ? 0 : sgn * w * (gap + (ad - 1) * gap * 0.8);
        var sc = ad === 0 ? 1 : Math.max(0.62, 1 - ad * 0.16);
        li.style.setProperty('--x', x.toFixed(1) + 'px');
        li.style.setProperty('--s', sc.toFixed(3));
        li.style.setProperty('--r', (ad === 0 ? 0 : -sgn * Math.min(ad * 7, 12)) + 'deg');
        li.style.setProperty('--o', ad > 2 ? '0' : '1');
        li.style.setProperty('--dim', ad === 0 ? '0' : (0.18 + ad * 0.12).toFixed(2));
        li.style.zIndex = String(10 - ad);
        li.classList.toggle('is-center', ad === 0);
        li.inert = ad !== 0;
        var num = $('.pj-reel-n', li); if (num) num.textContent = (i + 1) + ' / ' + rn;
      });
    };
    var goReel = function (i) { rc = (i + rn) % rn; placeReels(); };
    reels.forEach(function (li, i) { li.addEventListener('click', function () { if (i !== rc) goReel(i); }); });
    if (reelCtl && rn > 1) {
      reelCtl.hidden = false;
      var rb = $$('.icon-btn', reelCtl);
      rb[0].addEventListener('click', function () { goReel(rc - 1); });
      rb[1].addEventListener('click', function () { goReel(rc + 1); });
    }
    reelList.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); goReel(rc + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); goReel(rc - 1); }
    });
    var rx0 = null;
    reelList.addEventListener('pointerdown', function (e) { rx0 = e.clientX; });
    reelList.addEventListener('pointerup', function (e) {
      if (rx0 === null) return; var dx = e.clientX - rx0; rx0 = null;
      if (Math.abs(dx) > 40) goReel(rc + (dx < 0 ? 1 : -1));
    });
    reelList.addEventListener('pointercancel', function () { rx0 = null; });
    placeReels();
    window.addEventListener('resize', placeReels);
  }
  // galeria sem limite: a partir da 14.ª fotografia aparece o botão "Ver mais" (a janela de ampliação percorre todas)
  var pjGrid = $('#pj-grid'), pjMore = $('.pj-more');
  if (pjGrid && pjMore) {
    var GAL_VISIBLE = 13, extra = Array.prototype.slice.call(pjGrid.children, GAL_VISIBLE);
    if (extra.length) {
      extra.forEach(function (li) { li.hidden = true; });
      pjMore.hidden = false;
      pjMore.addEventListener('click', function () {
        var open = pjMore.getAttribute('aria-expanded') !== 'true';
        extra.forEach(function (li) { li.hidden = !open; });
        pjMore.setAttribute('aria-expanded', open ? 'true' : 'false');
        $('span', pjMore).textContent = open ? 'Ver menos' : 'Ver mais';
        if (!open) pjGrid.scrollIntoView({ behavior: REDUCE ? 'auto' : 'smooth', block: 'start' });
      });
    }
  }
  // vídeos com data-vimeo="<id>": ao carregar, o vídeo do Vimeo substitui a capa e começa a tocar
  $$('.pj-video[data-vimeo]').forEach(function (v) {
    var played = false;
    var play = function () {
      if (played) return; played = true;
      var f = document.createElement('iframe');
      f.src = 'https://player.vimeo.com/video/' + v.dataset.vimeo + '?autoplay=1&title=0&byline=0&portrait=0';
      f.allow = 'autoplay; fullscreen; picture-in-picture'; f.allowFullscreen = true;
      f.title = v.getAttribute('aria-label') || 'Vídeo';
      f.className = 'pj-iframe';
      v.appendChild(f); v.removeAttribute('role'); v.removeAttribute('tabindex');
    };
    v.setAttribute('role', 'button'); v.tabIndex = 0;
    v.addEventListener('click', play);
    v.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); play(); } });
  });

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
