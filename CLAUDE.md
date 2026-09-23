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
  - Tomate (CTA principal, faixa, contacto): `#E4502E`
  - Mostarda (detalhes, foco, etiquetas mono): `#F2C14E`
  - Texto secundário sobre escuro: `#CFC4BB` / `#B8ACA4`; sobre claro: `#5E524D`
- **Tipografia (Google Fonts):** Bricolage Grotesque (títulos e texto) + IBM Plex Mono (etiquetas pequenas).
- **Tom:** moderno, profissional, com 3D e interatividade. Nada de estética "template" nem de sinais de site feito por IA (evitar gradientes chamativos, emoji, cartões iguais com a mesma sombra, rótulos em maiúsculas).
- **Movimento:** respeitar sempre `prefers-reduced-motion`. Os efeitos 3D de rato só existem com rato (`hover: hover` e `pointer: fine`).

## Estrutura da página (ordem atual)

1. **Menu** em cápsula flutuante (fica sólido depois do hero) + menu móvel em ecrã inteiro.
2. **Hero "visor de câmara":** fotografia com zoom lento (preparado para vídeo), moldura de vidro, marcas de enquadramento, REC com timecode a correr, quadrado de foco "AF" que segue o rato, régua de exposição, etiquetas de setores, título, subtítulo, 3 CTAs e um cartão de vidro com os serviços.
3. **Feito pela MeewVision:** galeria 3D em anel (arrastar, setas, clique leva ao projeto).
4. **Atalhos** (Portfólio / Contactos / Quem Somos?). *Secção de teste.*
5. **Faixa** vermelha a correr com os setores.
6. **Quem Somos?:** colagem 3D + texto que se preenche com o scroll + números reais do portfólio (16 hotéis, 14 restaurantes, 9 marcas).
7. **Os nossos serviços:** palco 3D com 3 painéis + seletor.
8. **Showreel:** fotografia a toda a largura com moldura e link para o Vimeo.
9. **Estúdio (colagem sobreposta):** "Somos um Creative Studio." / "Alavanque a sua marca." *Secção de teste.*
10. **Com Quem Trabalhamos?:** 5 painéis que expandem (Restaurantes, Lojas, Hotéis, Empresas, Influencers).
11. **Carrossel de serviços:** 8 cartões com setas. *Secção de teste (repete conteúdo do ponto 7).*
12. **Como Trabalhamos:** 4 cartões em escada (01 a 04).
13. **Trabalho Selecionado:** destaque a toda a largura com 4 projetos. *Secção de teste (repete conteúdo do ponto 10).*
14. **Outros Projetos:** grelha de nomes de clientes com filtro (Hotéis / Restaurantes / Marcas).
15. **Contacto:** "Alavanque a sua marca." / "Fale Connosco." + formulário com validação.
16. **Rodapé** com o logótipo em 3D.

As secções marcadas como *teste* foram adicionadas para o Carlos decidir quais ficam.

## Conteúdo: regras

- Usar **os títulos e frases reais do cliente** sempre que possível (vêm de meewvision.com e das páginas de projeto). Não inventar estatísticas, testemunhos, prazos ou clientes.
- Onde falta informação real, deixar um marcador visível entre [parênteses retos].
- Textos que **não** vêm do site deles e têm de ser confirmados com o cliente:
  - "Como Trabalhamos" (os 4 passos; só a frase do passo 02 vem do site deles).
  - Subtítulos de apoio escritos por nós (ex.: "Tudo o que a sua marca precisa para se destacar online…", "Veja o nosso trabalho em movimento.").
  - A imagem usada para ASNOVE/Influencers (`influencer.jpg`) é a capa da categoria Influencers do portfólio deles, não necessariamente do projeto ASNOVE.

## Contactos reais do cliente

- Email: info@meewvision.com
- Telefone: (+351) 918 773 533
- Instagram: https://www.instagram.com/meew_vision/
- Vimeo: https://vimeo.com/meewvision
- País: Portugal

## Pendentes

- [ ] **Vídeo do hero:** colocar `assets/video/hero.mp4` (15 a 30 s, 1080p, sem som, menos de 10 MB) e trocar o `<img>` do `.hero-media` pelo `<video>` indicado no comentário do `index.html`. O showreel de 50 s do site atual deles é uma boa fonte.
- [ ] **Formulário:** ainda não envia nada (há um `TODO` em `js/main.js`). Ligar a Formspree, Netlify Forms ou outro serviço.
- [ ] **Escolher secções:** decidir entre o palco 3D de serviços e o carrossel, e entre "Com Quem Trabalhamos?" e "Trabalho Selecionado". Remover também a secção de atalhos se não ficar.
- [ ] **Versão EN:** o público de hotelaria é internacional; considerar PT/EN.
- [ ] **Logótipos dos clientes:** se o cliente os enviar, trocar os nomes da grelha "Outros Projetos" por logótipos.
- [ ] **SEO e partilha:** imagens Open Graph, `sitemap.xml`, dados estruturados (LocalBusiness).
- [ ] **Publicação:** Netlify, Vercel ou GitHub Pages; ou migrar para um framework (Astro/Next.js) se o site crescer para várias páginas (páginas de projeto).

## Notas técnicas

- `js/main.js` está dividido por secções com comentários; cada efeito 3D escreve variáveis CSS (`--tx`, `--ty`, `--mx`, `--my`, `--drag`) uma vez por frame, sem re-render.
- A lista de clientes de "Outros Projetos" e os projetos em destaque estão como dados no topo de `js/main.js`.
- As animações de scroll usam `animation-timeline` (CSS) com `@supports`, por isso em browsers sem suporte simplesmente não aparecem.
- Testar sempre em 1440 px, 1024 px e 390 px de largura, e com teclado (Tab, setas no seletor de serviços, Esc no menu).
