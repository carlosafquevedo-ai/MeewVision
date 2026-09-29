# MeewVision Creative Studio — website

Website da **MeewVision Creative Studio**, produtora de vídeo e fotografia em Lisboa (clientes: hotéis, restaurantes, marcas, empresas, influencers). Construído pelo Carlos (com o Claude) para ser entregue à cliente, que tem de editar o conteúdo sozinha, sem mexer em código. Responder e escrever conteúdo sempre em **português de Portugal**.

## Contas e quem é dono de quê

| Serviço | Hoje | Depois da entrega |
|---|---|---|
| GitHub | repositório na conta do Carlos (`carlosafquevedo-ai/MeewVision`) | transferido para a conta da cliente; o Carlos fica colaborador com escrita (atualizar o `remote` quando ele pedir) |
| Netlify (grátis) | publicado na conta do Carlos | projeto novo na Netlify da cliente, ligado ao GitHub dela; o da conta do Carlos é apagado |
| Sanity (grátis) | — | conta da cliente; o Carlos é administrador; painel em `/studio` |
| Resend (grátis) | — | conta da cliente; chave só em `RESEND_API_KEY` na Netlify |
| Domínio meewvision.com | Squarespace (da cliente), aponta para o site antigo | só os registos DNS do site passam para a Netlify dela; **os registos MX (email) não se mexem** |
| Vercel | já não se usa | — |

Em ambas as Netlify: ramo de produção `main`; cada push para o `main` publica em produção; pull requests geram pré-visualizações.

## Plano (uma fase por pedido)

1. Migrar para **Astro** no ramo `astro-sanity`, sem alterar nada no design nem no comportamento.
2. Ligar o **Sanity**: `/studio` dentro do site; página montada como lista de secções (adicionar, remover, esconder, reordenar); cards editáveis em todas as secções; coleção "Projetos"; "Definições gerais" (menu, botão do header, redes sociais, contactos, rodapé); SEO (título, descrição, imagem de partilha, texto alternativo); importar todo o conteúdo e imagens atuais.
   **Decisões já tomadas para a fase 2:**
   - Coleção "Projetos": título, categoria (lista), fotografia + texto alternativo, link do Vimeo, "Cartão grande no mosaico" (sim/não; **máximo 4 por categoria**, com validação no Sanity que impede publicar um 5.º), ordem, visível sim/não. Contagens do filtro e números de "Quem Somos" calculados a partir dos projetos.
   - "Projetos em destaque" (carrossel) é **independente** do "Cartão grande no mosaico": escolhe-se no bloco da própria secção, como lista ordenada de referências a projetos, e cada entrada tem os seus campos (frase curta, setor, "Entregámos", imagem de fundo, link da seta).
   - "Marcas que já confiaram em nós": lista editável (adicionar, retirar, reordenar); cada marca tem nome (opcional; é também o texto alternativo) e logótipo opcional (SVG/PNG transparente) que substitui o nome; sem nome nem logótipo a marca não aparece. **Aviso no Sanity** (validação de nível "warning", não impede publicar) quando a lista mistura marcas com e sem logótipo: "Algumas marcas têm logótipo e outras não. Para a faixa ficar uniforme, use logótipo em todas ou em nenhuma." A faixa mantém o loop sem salto, a velocidade constante (duração calculada pela largura), a pausa com o rato e o modo sem movimento, seja qual for o número de marcas.
   - "Os nossos serviços": cartões editáveis (adicionar, retirar, esconder, reordenar): título, fotografia + texto alternativo, descrição ("Ler mais"). No computador: até 4 cartões dividem a largura sem setas; 5 ou mais passam a carrossel com setas. Tablet/telemóvel: sempre carrossel.
   - "Com Quem Trabalhamos?": painéis editáveis (adicionar, retirar, esconder, reordenar): setor, slogan, descrição, etiquetas, fotografia + texto alternativo; número automático. Sem mínimo (lista vazia = secção não aparece), máximo 7 (decidido) com validação que bloqueia, porque no computador os painéis fechados ficam demasiado estreitos.
   - Cartão de vidro do hero ("Projetos em destaque:"): mostra os mesmos projetos e pela mesma ordem do carrossel "Projetos em destaque" (fotografia pequena, nome e link para a página do projeto); não tem campos próprios, lê a mesma lista.
   - **Páginas de projeto (decidido):** qualquer projeto pode ter página própria. No Sanity, interruptor "Criar página do projeto" que mostra: endereço `/projetos/<slug>` (gerado do título, editável), conteúdo em blocos ordenáveis (texto, galeria de fotografias, vídeo do Vimeo, ficha do projeto: cliente, setor, entregámos) e SEO próprio. Páginas renderizadas a pedido com cache (sem gastar publicações da Netlify). Só um projeto com página pode entrar em "Projetos em destaque" (validação que bloqueia). Links: destaques e cartão do hero → página do projeto; cartões de "Todos os Projetos" → página se existir, senão Vimeo. O desenho da página é novo: propor ao Carlos e aprovar antes de construir. Na fase 5, redirecionar as páginas antigas do Squarespace (ex.: `/pestanagroup` → `/projetos/pestana-group`). Hoje os links ainda apontam para as páginas antigas no Squarespace.
   - **Testemunhos (decidido):** secção entre "Todos os Projetos" e o Contacto. Dois tipos de cartão no Sanity, que a cliente adiciona, retira e reordena: **texto** (testemunho) e **vídeo horizontal** (ficheiro MP4 carregado no Sanity, não no Vimeo, + imagem de capa; toca numa janela `<dialog>` dentro do site). Todos têm logótipo da marca (opcional; sem logótipo mostra as iniciais), nome da pessoa e marca (com cargo, se quiser). Mosaico em 3 colunas (2 no tablet, 1 no telemóvel); mostra uma altura limitada com desvanecimento e o botão "Ver mais testemunhos" aparece só se houver mais cartões.
   - Hero: vídeo de fundo do Vimeo em dois campos (computador 16:9 e telemóvel 9:16, este opcional) + imagem de capa.
3. **Formulário**: Netlify Function com Resend, campos configuráveis no Sanity, sucesso só com envio confirmado, mensagem de erro, proteção contra spam.
4. Passar o repositório para o GitHub da cliente e o site para a Netlify dela; confirmar que funciona igual.
5. Testes, SEO, redirecionamentos das páginas antigas do Squarespace, mudança do domínio.

## Regras (valem para tudo)

- **Design intocável:** não alterar CSS, classes, animações, tipografia nem espaçamentos sem o Carlos pedir. Comparar sempre capturas antes/depois a **1440 px e 390 px**.
- **Planos gratuitos** em tudo.
- **Netlify: 300 créditos/mês, 15 por publicação de produção.** As edições no Sanity **não** podem gerar uma publicação por alteração: renderização a pedido com cache, ou no máximo uma reconstrução por dia.
- **Imagens servidas pelo Sanity; vídeos por link do Vimeo**, nunca alojados no site. **Exceção (decidida pelo Carlos): os testemunhos em vídeo são ficheiros carregados diretamente no Sanity** (MP4 curtos e comprimidos, com limite de tamanho no campo; só descarregam quando se carrega em play; tocam numa janela dentro do site).
- **Chaves e tokens só em `.env` (local) ou nas variáveis de ambiente da Netlify.** Nunca no código nem no GitHub.
- **Nada pode depender das contas pessoais do Carlos.** Toda a configuração de build (comando, pasta de publicação, funções, redirecionamentos, versão do Node) fica no `netlify.toml` do repositório. Só as variáveis de ambiente e o ramo de produção se configuram no painel.
- **Tudo é removível no Sanity (regra do Carlos):** em qualquer secção e página, a cliente pode remover ou deixar vazio qualquer elemento (cartão, título, subtítulo, etiqueta, imagem, vídeo, botão, secção inteira). Os componentes têm de lidar com isso: campo vazio = elemento não aparece (sem espaços em branco, molduras vazias, "undefined" ou ícones partidos); os espaçamentos ajustam-se; lista vazia = o bloco desaparece; secção vazia ou escondida = não aparece e os seletores que dependem da ordem das secções continuam certos. **Só são obrigatórios:** o título de cada projeto (gera o endereço `/projetos/<nome>`) e o título do site para SEO. Mínimos de quantidade não são permitidos (máximos sim, ex.: 4 cartões grandes por categoria, 7 setores). Testar cada componente com todos os campos vazios.
- **Esconder em vez de apagar (regra do Carlos):** cada secção (na home e nas páginas de projeto) tem um interruptor "Visível no site". Escondida, não aparece no site, mas todo o conteúdo fica guardado no Sanity e continua editável; ao voltar a ligar, reaparece no mesmo sítio da ordem. O mesmo interruptor existe em cada cartão/item de lista (projetos, serviços, setores, marcas, testemunhos, reels, fotografias). No painel, as secções escondidas aparecem marcadas (ex.: "Escondida") na lista para a cliente as encontrar. Apagar continua possível, mas o interruptor é o caminho recomendado.
- **Cada secção nova = componente Astro + schema no Sanity**, e entra na lista de secções que a cliente pode escolher.
- **Avisar sempre** antes de uma alteração que possa apagar ou esconder conteúdo que a cliente já criou.
- **Trabalhar em ramos e pull requests**; juntar ao `main` só com aprovação do Carlos.

## Estado atual (antes da fase 1)

- Site estático sem build: `index.html` + `css/styles.css` + `js/main.js` (JavaScript puro, sem dependências); imagens em `assets/img/`.
- Vídeo do hero da home: Vimeo **1191142595** ("25 Anos do Pestana Palace Lisboa", 30 s) em modo de fundo, **cortado dos 2,8 s aos 27,4 s** para não mostrar o texto do início nem o logótipo do fim (`data-vimeo`, `data-start`, `data-end` no `.hero-media` do `index.html`; o corte é feito pela API do leitor Vimeo por postMessage; o JS cria o leitor, ajusta-o para cobrir o hero e mostra-o em fade quando começa a tocar; a fotografia fica por baixo como capa e é a única coisa que aparece com "reduzir movimento"). A conta Vimeo é Starter (paga), por isso o modo de fundo sem botões funciona.
- Conteúdo: textos no `index.html`; listas em arrays no topo de `js/main.js` (`PROJECTS`, `FEATURED`, `BRANDS`, `CLIENTS`, `VIMEO_ALL`).
- O formulário **não envia nada** (só valida e mostra "Obrigado"; há um `TODO` em `js/main.js`).
- Ver localmente: `npx serve .` (configurado em `.claude/launch.json`, porta 8080).

## Páginas de projeto (modelo aprovado)

- **Todos os projetos em destaque têm de ter página, sempre com este modelo.** Hoje existem 4: `/projetos/pestana-group/`, `/projetos/lota-da-esquina/`, `/projetos/flor-da-selva/`, `/projetos/bpi-gestao-de-ativos/` (HTML estático em `projetos/<slug>/index.html`, com textos e fotografias reais das páginas antigas do Squarespace; imagens em `assets/img/projetos/<slug>/`, provisórias até irem para o Sanity). Na fase 2 passam a ser uma única página Astro (`/projetos/[slug]`) montada a partir do Sanity; um projeto só pode entrar em "Projetos em destaque" se tiver página.
- **Estrutura (cada bloco é opcional e pode ser escondido):** capa arredondada dentro da grelha com o logótipo do cliente no topo (cartão pequeno por omissão; `.is-knockout` para logótipos brancos sobre preto, que apaga o preto com `mix-blend-mode: screen`) e, por cima da fotografia, em baixo e ao centro, a etiqueta, o nome e a ficha (só Setor) → **O que fizemos** (cartões de serviço com o texto real; fundo tinta como o rodapé, texto claro, inclinação 3D com o rato e brilho que segue o rato; texto sem camadas `translateZ`, para ficar alinhado) → **Texto** (opcional, ver abaixo) → **Vídeos** (vídeo principal em 21:9, 16:9 no telemóvel, do Vimeo com `data-vimeo="<id>"`; reels em carrossel 3D, lista sem limite) → **Fotografias** (sem limite; mostram-se 13 e, a partir da 14.ª, "Ver mais"; janela de ampliação) → **Testemunho** (exemplo entre [ ] até haver um real) → **Vamos Falar?**.
- A home liga para as páginas: seta dos destaques, cartão do hero e, em "Todos os Projetos", os cartões com `page` em `CLIENTS` (Lota da Esquina, Flor da Selva) abrem a página em vez do Vimeo.
- Estilos no bloco "Página de projeto" do `css/styles.css`; JS no bloco "Página de projeto" do `js/main.js`. As 3 páginas novas foram geradas a partir da do Pestana por um script provisório; alterações ao modelo fazem-se nas 4 páginas.
- BPI Gestão de Ativos: sem logótipo e sem galeria (a página antiga não tinha fotografias); vídeo corporativo real do Vimeo (1013800333). A página antiga também tinha o vídeo 935534784 (não usado: confirmar com a cliente a que serviço pertence).

## Secção "Texto" (disponível em todo o site)

- Tipo de secção que a cliente pode pôr **antes ou depois de qualquer secção**, na home e nas páginas de projeto: um parágrafo a toda a largura (até 1080 px), **sem título**, em letra grande (`.txt-sec` / `.txt-body`), com o fundo e a cor da página onde fica. Exemplo: nas páginas de projeto, por baixo de "O que fizemos" (texto de exemplo entre [ ]; **escondido por agora** com o atributo `hidden`, como se o interruptor "Visível no site" estivesse desligado). No Sanity é um bloco "Texto" na lista de secções, com o interruptor "Visível no site" como as outras.

## Referência do design (não mudar)

- **Cores:** tinta `#1B1417` (superfícies `#241B1F` / `#2A2024`); creme `#F1EBDF` / `#E6DECF`; tomate `#E4502E` (botão principal `.btn-cta`); mostarda `#F2C14E` (detalhes, foco, etiquetas mono); texto secundário `#5E524D` (claro) e `#CFC4BB` / `#B8ACA4` (escuro).
- **Tipografia:** Bricolage Grotesque + IBM Plex Mono (Google Fonts).
- **Grelha:** tokens em `:root`: `--content: 1312px`, `--gutter` (64/40/20 px), `--sec-y` (112/88/72 px). Títulos de secção com `.h2`.
- **Movimento:** respeitar `prefers-reduced-motion`; efeitos 3D só com rato. Animações de scroll com `animation-timeline` dentro de `@supports`.
- **Secções, por ordem:** menu fixo em cápsula; hero "visor de câmara"; Os nossos serviços (4 cartões escuros com "Ler mais", lado a lado a toda a largura da grelha no computador e em carrossel com setas no tablet e no telemóvel: Vídeo Apresentação, Reels Redes Sociais, Fotografias Profissionais, Cobertura de Eventos); Marcas que já confiaram em nós (faixa contínua); Projetos em destaque (4 projetos); Com Quem Trabalhamos? (5 painéis por setor); Quem Somos? + Como Trabalhamos (5 passos); Todos os Projetos (colagem "Show. don't tell." com filtro; grelha arrumada no tablet e no telemóvel; em baixo, "Todos os nossos vídeos no Vimeo" à esquerda e "Conheça o nosso trabalho" à direita); Testemunhos (cartões de texto e de vídeo horizontal em mosaico de colunas, com desvanecimento e "Ver mais testemunhos"; dados em `REVIEWS` em `js/main.js`); Contacto (formulário; fundo creme, separado dos testemunhos por uma linha fina); rodapé; botão "voltar ao topo".
- **Seletores que dependem da ordem das secções:** `.hero + .scar`, `.scar:has(+ .logos)`, `.sectors-sec + .about`, `.wall-sec:has(+ .contact)`. Ter isto em conta quando a cliente puder reordenar ou esconder secções.

## Conteúdo: regras

- Usar os títulos e frases reais da cliente. Não inventar estatísticas, testemunhos, prazos nem clientes; onde falte informação, marcador visível entre [parênteses retos].
- **Testemunhos:** os cartões atuais são EXEMPLOS entre [parênteses retos]; nunca inventar testemunhos, nomes ou marcas. Só publicar a secção com testemunhos reais (ou escondê-la até lá).
- Textos escritos por nós, a confirmar com a cliente: subtítulo dos testemunhos ("Marcas, hotéis e restaurantes com quem trabalhámos contam como foi."), passos de "Como Trabalhamos" (exceto a frase do Planeamento), subtítulos de apoio, textos dos setores em "Com Quem Trabalhamos?".
- As fotografias de "Todos os Projetos" são provisórias (por categoria) e os cartões abrem a conta do Vimeo até haver o link de cada vídeo.
- Contactos reais: info@meewvision.com · (+351) 918 773 533 · instagram.com/meew_vision · vimeo.com/meewvision.
