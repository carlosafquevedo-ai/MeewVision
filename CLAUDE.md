# MeewVision — redesign do website

Proposta de redesign do site de **MeewVision Creative Studio** (https://www.meewvision.com), um estúdio de vídeo e fotografia em Portugal. O Carlos está a desenvolver este site para o cliente. Responder e escrever conteúdo sempre em **português de Portugal**.

## Estado atual

- Site estático: `index.html` + `css/styles.css` + `js/main.js` (JavaScript puro, sem dependências nem build).
- Imagens reais do cliente em `assets/img/` (tiradas do site e das páginas de projeto deles).
- Pasta `assets/video/` vazia, à espera do vídeo do hero (ver "Pendentes").
- Este projeto nasceu como protótipo num canvas de design do Claude e foi convertido para HTML/CSS/JS normal.

Para ver: abrir `index.html` no browser, ou `npx serve .` e abrir o endereço indicado.

## Marca e direção visual

- **Logótipo:** `assets/img/logo-meewvision.png` (creme, estilo retro anos 70, com "Creative Studio" em letra de máquina de escrever).
- **Assinatura da marca:** "show. don’t tell." (usada entre parênteses retos, em mono: `[show. don’t tell.]`).
- **Cores:**
  - Tinta (fundo escuro): `#1B1417`; superfície escura: `#241B1F` / `#2A2024`
  - Creme (logótipo, fundos claros): `#F1EBDF`; creme 2: `#E6DECF`
  - Tomate (botão principal `.btn-cta`: hero e "Como Trabalhamos", hover creme; círculo do botão de envio do formulário): `#E4502E`
  - Mostarda (detalhes, foco, etiquetas mono): `#F2C14E`
  - Texto secundário sobre escuro: `#CFC4BB` / `#B8ACA4`; sobre claro: `#5E524D`
- **Tipografia (Google Fonts):** Bricolage Grotesque (títulos e texto) + IBM Plex Mono (etiquetas pequenas).
- **Tom:** moderno, profissional, com 3D e interatividade. Nada de estética "template" nem de sinais de site feito por IA (evitar gradientes chamativos, emoji, cartões iguais com a mesma sombra, rótulos em maiúsculas).
- **Movimento:** respeitar sempre `prefers-reduced-motion`. Os efeitos 3D de rato só existem com rato (`hover: hover` e `pointer: fine`).

## Estrutura da página (ordem atual)

1. **Menu** em cápsula flutuante com os links Projetos (`#outros`), Serviços (`#servicos`) e Sobre Nós (`#sobre`) (fixo no topo; fica sólido e mais compacto depois do hero; o link da secção atual acende com uma linha branca (creme) por baixo), com ícones do Instagram e do Vimeo à esquerda do CTA, + menu móvel em ecrã inteiro.
2. **Hero "visor de câmara":** fotografia com zoom lento (preparado para vídeo), moldura de vidro, marcas de enquadramento, REC com timecode a correr, quadrado de foco "AF" que segue o rato, título, subtítulo, botão "Ver Projetos" (leva a Outros Projetos), botão secundário "Ver todos os Vídeos" (abre o Vimeo) e um cartão de vidro com os serviços.
3. **Os nossos serviços (`#servicos`, etiqueta "[Vídeos, Reels e Fotografias]"):** "Os nossos serviços" + carrossel de 8 cartões com setas.
4. **Marcas que já confiaram em nós:** faixa compacta (etiqueta à esquerda + cápsulas a deslizar da direita para a esquerda, inspirada no TrustStrip do portfólio do Carlos) com os clientes do portfólio; pausa com o rato por cima; com `prefers-reduced-motion` fica parada e desliza com o dedo/scroll. Dados em `BRANDS` no topo de `js/main.js`.
5. **Projetos em Destaque (antes "Trabalho Selecionado"):** destaque a toda a largura com 4 projetos.
6. **Com Quem Trabalhamos?:** 5 painéis que expandem, genéricos por setor (sem nomes de clientes nem botões), pela ordem Empresas, Influencers, Hotéis, Lojas, Restaurantes; cada um com o setor como título, slogan, descrição e etiquetas de serviços.
7. **Quem Somos? + Como Trabalhamos (uma só secção, `#sobre`):** 1.ª parte: colagem 3D + texto que se preenche com o scroll + números reais do portfólio (16 hotéis, 14 restaurantes, 9 marcas). 2.ª parte (`#processo`, depois de uma linha fina): etiqueta em cápsula, título e subtítulo à esquerda e o único botão "Vamos Falar?" à direita; 5 cartões 3D lado a lado (Planeamento, Produção, Edição, Validação, Entrega) (inclinam com o rato, com número grande cortado a tomate, ícone, título e texto em profundidades diferentes), ligados por uma linha horizontal que se enche a tomate; ao entrar na secção os cartões levantam-se em perspetiva, em sequência (timeline `--steps`). Até 1180 px: 2 por linha; telemóvel: carrossel que desliza para o lado.
8. **Showreel:** fotografia a toda a largura com moldura e link para o Vimeo.
9. **Todos os Projetos (`#outros`, antes "Outros Projetos"):** mosaico "bento" com filtro Hotéis / Restaurantes / Marcas: blocos de tamanhos diferentes (grande, alto, largo, pequeno; padrão de 8 que preenche uma grelha 4x4), todos com a fotografia do projeto e, ao centro, o logótipo num círculo creme com o nome por baixo (sem logótipo mostram-se as iniciais); etiqueta e número em cima; inclinação 3D com o rato, entrada em cascata ao mudar de filtro; mostra 8 e o botão "Ver mais" revela o resto (a última linha estica para não deixar buracos). Dados em `CLIENTS` (`js/main.js`).
10. **Contacto:** fundo tinta (`#1B1417`, como o rodapé), com o cartão claro do formulário em contraste; à esquerda etiqueta, título grande em inglês "Let’s create something amazing together!" (pedido do Carlos) e "Conte-nos o que precisa e marcamos uma reunião."; à direita o formulário num cartão claro com brilho quente suave: "Fale Connosco." a cinzento, Nome | Email, Mensagem, "O que procura?" em caixas brancas (3 colunas; 7 serviços reais + "Outro", `name="servicos"`) e botão escuro "Vamos Falar?" com círculo tomate (`.btn-send`). No tablet e no telemóvel o título fica por cima do cartão.
11. **Rodapé** compacto: logótipo + links do menu; linha de contactos diretos (Email, Telefone, Instagram, Vimeo, com etiqueta e seta; 4 colunas no computador, 2 no tablet, 1 no telemóvel); © MeewVision Creative Studio, Portugal.

Extra: botão redondo "voltar ao topo" no canto inferior esquerdo (`.to-top`), que aparece depois de 35% de scroll da página.

As secções marcadas como *teste* foram adicionadas para o Carlos decidir quais ficam.

## Conteúdo: regras

- Usar **os títulos e frases reais do cliente** sempre que possível (vêm de meewvision.com e das páginas de projeto). Não inventar estatísticas, testemunhos, prazos ou clientes.
- Onde falta informação real, deixar um marcador visível entre [parênteses retos].
- Textos que **não** vêm do site deles e têm de ser confirmados com o cliente:
  - "Como Trabalhamos" (5 passos: Planeamento, Produção, Edição, Validação, Entrega; os textos de Edição, Validação e Entrega foram escritos por nós; só a frase do Planeamento vem do site deles).
  - Subtítulos de apoio escritos por nós (ex.: "Cada formato pensado para o canal onde vai viver…", "Veja o nosso trabalho em movimento.").
  - "Com Quem Trabalhamos?": o subtítulo, os slogans e as descrições de cada setor (Empresas, Influencers, Hotéis, Lojas, Restaurantes) foram escritos por nós; as etiquetas usam os nomes dos serviços do cliente. As imagens são do portfólio (ex.: `influencer.jpg` é a capa da categoria Influencers).

## Contactos reais do cliente

- Email: info@meewvision.com
- Telefone: (+351) 918 773 533
- Instagram: https://www.instagram.com/meew_vision/
- Vimeo: https://vimeo.com/meewvision
- País: Portugal

## Pendentes

- [ ] **Vídeo do hero:** colocar `assets/video/hero.mp4` (15 a 30 s, 1080p, sem som, menos de 10 MB) e trocar o `<img>` do `.hero-media` pelo `<video>` indicado no comentário do `index.html`. O showreel de 50 s do site atual deles é uma boa fonte.
- [ ] **Formulário:** ainda não envia nada (há um `TODO` em `js/main.js`). Ligar a Formspree, Netlify Forms ou outro serviço.
- [ ] **Versão EN:** o público de hotelaria é internacional; considerar PT/EN.
- [ ] **Logótipos dos clientes:** pedir ao cliente os logótipos (SVG ou PNG transparente) e colocá-los em `assets/img/logos/`. Na faixa "Marcas que já confiaram em nós", basta preencher `logo` em `BRANDS` (`js/main.js`); até lá aparecem os nomes. Também se podem usar na grelha "Outros Projetos". Em "Outros Projetos", cada cliente em `CLIENTS` aceita `{ name, logo, img }`: `logo` vai para o círculo por cima do nome (substitui as iniciais; de preferência logótipo a cores ou escuro, porque o círculo é creme) e `img` é a fotografia do projeto no bloco. **As fotografias atuais são provisórias** (imagens do portfólio usadas por categoria, não do projeto de cada cliente).
- [ ] **SEO e partilha:** imagens Open Graph, `sitemap.xml`, dados estruturados (LocalBusiness).
- [ ] **Publicação em WordPress (decidido):** o cliente tem de poder editar o conteúdo sozinho (textos, títulos, imagens, vídeos, ordem das secções) sem estragar o design. Plano: acabar o design aqui como site estático e, no fim, converter para um **tema WordPress à medida com ACF Pro** (blocos ACF no Gutenberg ou "Flexible Content"). Cada secção passa a ser um bloco com campos; `css/styles.css` e `js/main.js` mantêm-se quase iguais; as listas de `js/main.js` (`BRANDS`, `PROJECTS`, `FEATURED`, `CLIENTS`) passam a campos no painel; o formulário passa para Contact Form 7, WPForms ou Fluent Forms. Squarespace foi descartado: código próprio não fica editável pelo cliente e perdem-se os efeitos. Page builders (Elementor, Divi) também não: pesados e fáceis de desformatar. Alternativa considerada: Webflow (modo Editor), mas obriga a remontar o site. Falta escolher alojamento (ex.: SiteGround, Raiola, Hostinger).

## Notas técnicas

- **Títulos de secção:** todos usam `.h2` (clamp 32–44 px; 28 px no telemóvel) com a etiqueta mono por cima (`.label + .h2` dá o espaço) e o subtítulo em `.sub` (17 px). Não pôr tamanhos nem margens em `style=""` no HTML.
- **Preparar para WordPress:** cada secção deve ficar autónoma (um `<section>` com o seu bloco de CSS e de JS, sem depender da ordem das outras) e o conteúdo repetido deve vir de dados (como `BRANDS`), para cada secção se converter diretamente num bloco ACF.
- **Grelha:** todo o conteúdo alinha pelas mesmas duas linhas verticais. Tokens em `:root` no `css/styles.css`: `--content: 1312px` (largura máxima) e `--gutter` (64 px; 40 px até 1180 px; 20 px até 860 px). Dentro de `.wrap` isto é automático; em elementos a toda a largura (hero, carrossel, moldura do showreel) usar `max(var(--gutter), calc((100% - var(--content)) / 2))`. Não usar paddings laterais fixos em secções novas. O espaço vertical das secções também vem de um token, `--sec-y` (112 px; 88 px até 1180 px; 72 px até 860 px): usar `padding: var(--sec-y) 0` e não valores fixos.
- `js/main.js` está dividido por secções com comentários; cada efeito 3D escreve variáveis CSS (`--tx`, `--ty`, `--mx`, `--my`, `--drag`) uma vez por frame, sem re-render.
- A lista de clientes de "Outros Projetos" e os projetos em destaque estão como dados no topo de `js/main.js`.
- As animações de scroll usam `animation-timeline` (CSS) com `@supports`, por isso em browsers sem suporte simplesmente não aparecem.
- Testar sempre em 1440 px, 1024 px e 390 px de largura, e com teclado (Tab, setas do carrossel de serviços, Esc no menu).
