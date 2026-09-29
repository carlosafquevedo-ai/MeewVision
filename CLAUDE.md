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
3. **Formulário**: Netlify Function com Resend, campos configuráveis no Sanity, sucesso só com envio confirmado, mensagem de erro, proteção contra spam.
4. Passar o repositório para o GitHub da cliente e o site para a Netlify dela; confirmar que funciona igual.
5. Testes, SEO, redirecionamentos das páginas antigas do Squarespace, mudança do domínio.

## Regras (valem para tudo)

- **Design intocável:** não alterar CSS, classes, animações, tipografia nem espaçamentos sem o Carlos pedir. Comparar sempre capturas antes/depois a **1440 px e 390 px**.
- **Planos gratuitos** em tudo.
- **Netlify: 300 créditos/mês, 15 por publicação de produção.** As edições no Sanity **não** podem gerar uma publicação por alteração: renderização a pedido com cache, ou no máximo uma reconstrução por dia.
- **Imagens servidas pelo Sanity; vídeos por link do Vimeo**, nunca alojados no site.
- **Chaves e tokens só em `.env` (local) ou nas variáveis de ambiente da Netlify.** Nunca no código nem no GitHub.
- **Nada pode depender das contas pessoais do Carlos.** Toda a configuração de build (comando, pasta de publicação, funções, redirecionamentos, versão do Node) fica no `netlify.toml` do repositório. Só as variáveis de ambiente e o ramo de produção se configuram no painel.
- **Cada secção nova = componente Astro + schema no Sanity**, e entra na lista de secções que a cliente pode escolher.
- **Avisar sempre** antes de uma alteração que possa apagar ou esconder conteúdo que a cliente já criou.
- **Trabalhar em ramos e pull requests**; juntar ao `main` só com aprovação do Carlos.

## Estado atual (antes da fase 1)

- Site estático sem build: `index.html` + `css/styles.css` + `js/main.js` (JavaScript puro, sem dependências); imagens em `assets/img/`; `assets/video/` vazia (vídeo do hero por colocar).
- Conteúdo: textos no `index.html`; listas em arrays no topo de `js/main.js` (`PROJECTS`, `FEATURED`, `BRANDS`, `CLIENTS`, `VIMEO_ALL`).
- O formulário **não envia nada** (só valida e mostra "Obrigado"; há um `TODO` em `js/main.js`).
- Ver localmente: `npx serve .` (configurado em `.claude/launch.json`, porta 8080).

## Referência do design (não mudar)

- **Cores:** tinta `#1B1417` (superfícies `#241B1F` / `#2A2024`); creme `#F1EBDF` / `#E6DECF`; tomate `#E4502E` (botão principal `.btn-cta`); mostarda `#F2C14E` (detalhes, foco, etiquetas mono); texto secundário `#5E524D` (claro) e `#CFC4BB` / `#B8ACA4` (escuro).
- **Tipografia:** Bricolage Grotesque + IBM Plex Mono (Google Fonts).
- **Grelha:** tokens em `:root`: `--content: 1312px`, `--gutter` (64/40/20 px), `--sec-y` (112/88/72 px). Títulos de secção com `.h2`.
- **Movimento:** respeitar `prefers-reduced-motion`; efeitos 3D só com rato. Animações de scroll com `animation-timeline` dentro de `@supports`.
- **Secções, por ordem:** menu fixo em cápsula; hero "visor de câmara"; Os nossos serviços (carrossel de cartões escuros com "Ler mais"); Marcas que já confiaram em nós (faixa contínua); Projetos em destaque (4 projetos); Com Quem Trabalhamos? (5 painéis por setor); Quem Somos? + Como Trabalhamos (5 passos); Todos os Projetos (colagem "Show. don't tell." com filtro; grelha arrumada no tablet e no telemóvel; em baixo, "Todos os nossos vídeos no Vimeo" à esquerda e "Conheça o nosso trabalho" à direita); Contacto (formulário); rodapé; botão "voltar ao topo".
- **Seletores que dependem da ordem das secções:** `.hero + .scar`, `.scar:has(+ .logos)`, `.sectors-sec + .about`, `.wall-sec:has(+ .contact)`. Ter isto em conta quando a cliente puder reordenar ou esconder secções.

## Conteúdo: regras

- Usar os títulos e frases reais da cliente. Não inventar estatísticas, testemunhos, prazos nem clientes; onde falte informação, marcador visível entre [parênteses retos].
- Textos escritos por nós, a confirmar com a cliente: passos de "Como Trabalhamos" (exceto a frase do Planeamento), subtítulos de apoio, textos dos setores em "Com Quem Trabalhamos?".
- As fotografias de "Todos os Projetos" são provisórias (por categoria) e os cartões abrem a conta do Vimeo até haver o link de cada vídeo.
- Contactos reais: info@meewvision.com · (+351) 918 773 533 · instagram.com/meew_vision · vimeo.com/meewvision.
