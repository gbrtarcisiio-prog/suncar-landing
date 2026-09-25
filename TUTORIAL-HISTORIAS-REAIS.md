# Tutorial — seção “Histórias reais merecem espaço”

## Diagnóstico da falha

A seção estava presente em `client/src/pages/Home.tsx` e o conteúdo atual usa estes seletores:

```tsx
<article className="story-placeholder">
  <div className="story-placeholder-copy">...</div>
  <div className="distance-flow">...</div>
</article>
```

Mas em `client/src/index.css` havia regras herdadas para uma versão anterior (`.testimonial-grid`, `.testimonial-card`, `.quote-placeholder`), sem regras para `.story-placeholder` nem `.distance-flow`. O navegador renderizava o HTML sem o layout de card, a hierarquia e a sequência ilustrativa previstos. Também faltavam overrides móveis para esses seletores. A correção foi criar estilos desktop para o card escuro em duas colunas e, até 640 px, empilhar o texto e a sequência em uma coluna, com setas verticais.

> Não foram inventados depoimentos para “preencher” o espaço. Até existirem relatos reais e autorização de uso, a seção apresenta um estado vazio honesto. Quando houver depoimentos, use texto real, autorização documentada e, se aplicável, atribuição aprovada pelo cliente.

## Onde alterar

1. **Copy e estrutura:** `client/src/pages/Home.tsx`, busque `id="clientes"` e depois `className="story-placeholder"`.
2. **Desktop:** `client/src/index.css`, busque `.story-placeholder {` e `.distance-flow {`.
3. **Celular:** na mesma folha, dentro de `@media (max-width: 640px)`, busque `.story-placeholder {` e `.distance-flow {`.

A correção deve preservar essas relações:

- `.testimonials-top` contém o título e o marcador editorial.
- `.story-placeholder` é o grid pai: duas colunas em desktop, uma coluna no celular.
- `.story-placeholder-copy` controla o título, explicação e link.
- `.distance-flow` é um grid de 4 etapas mais 3 setas no desktop; no celular, vira uma lista vertical.
- `.states-ribbon` fecha a seção e não deve se sobrepor ao card.

## Como trocar o estado vazio por avaliações verdadeiras

1. Peça e guarde uma autorização para publicar nome/imagem/texto.
2. No JSX da seção, substitua **somente** o conteúdo de `<article className="story-placeholder">...</article>` por cards de avaliação, mantendo a section e o id `clientes`.
3. Crie uma classe explícita, por exemplo `customer-stories-grid` e `customer-story-card`, em `client/src/index.css`; não reutilize seletores antigos sem conferir o markup.
4. Dê `key` estável aos cards se forem renderizados com `.map()`.
5. No mobile, use uma coluna; em tablets, uma ou duas conforme o espaço. Verifique cada breakpoint e não deixe texto ou atribuição truncados.
6. Teste que cada imagem tem `alt` apropriado, os nomes são legíveis e contraste/foco continuam visíveis.

## Validação visual rápida

```bash
pnpm dev
```

Abra `http://localhost:3000/#clientes`. Confira 320, 375, 390, 414, 768, 1024, 1440 e 1920 px. No DevTools, selecione o `<article>` e confirme `display: grid`; em até 640 px, o `grid-template-columns` deve ser uma coluna. Confirme também que não existe overflow horizontal e que o link **Fale com a equipe** leva para `#contato`.

Antes de publicar, rode `pnpm lint`, `pnpm test` e `pnpm build:static`.
