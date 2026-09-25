# SunCar Multimarcas — guia de produção

## O que está incluído

Este projeto mantém a aplicação original em React + TypeScript + Vite e acrescenta um build estático com os arquivos de mídia locais. O diretório pronto para hospedagem é `dist/public/`; ele contém `index.html`, JavaScript/CSS compilados, favicon e nove imagens necessárias. O build público não depende do armazenamento privado do preview Manus.

## Requisitos e comandos

- Node.js 20 ou superior (validado com Node 22).
- pnpm 10 (ou Corepack habilitado).

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm test
pnpm build:static
```

O comando `pnpm build:static` executa o Vite com `VITE_ASSET_BASE=/media` e copia `hosting-assets/media/` para `dist/public/media/`.

## Hospedagem

Envie **o conteúdo** de `dist/public/` para a raiz de um host estático (por exemplo, Nginx, Apache, Cloudflare Pages, Netlify, Vercel ou S3/CloudFront). A página é uma landing page de rota única; não requer API para renderizar o site. Configure o host para servir `index.html` na raiz. Não publique a pasta `hosting-assets` separadamente: a cópia de produção já estará em `dist/public/media/`.

Para conferir localmente após o build:

```bash
pnpm exec vite preview --host 0.0.0.0
```

## Antes de anunciar/publicar

1. **Estoque:** `client/src/data/vehicles.ts` ainda tem seis veículos, preços, versões, quilometragens, anos, badges e fotos demonstrativos. Substitua todos os campos pelos dados confirmados ou remova os veículos indisponíveis.
2. **WhatsApp:** `client/src/lib/config.ts` tem o número oficial em branco. Preencha `WHATSAPP_NUMBER` somente com dígitos e código internacional + DDD (por exemplo, `55` + DDD + número). Sem isso, os CTAs mostram um aviso, e o formulário **não** abre uma conversa.
3. **Contato:** o formulário valida os campos no navegador. Quando o número for configurado, ele prepara uma mensagem no WhatsApp, mas o visitante ainda precisa revisar e tocar em **Enviar** no aplicativo. O site não grava nem envia dados por conta própria. Para geração de leads automática, será necessária integração futura com CRM/form service e aviso de privacidade adequado.
4. **Estimativa:** o simulador apenas divide o saldo pela quantidade de parcelas, sem juros ou custos. Não é taxa, proposta, parcela bancária nem aprovação de crédito. O texto da página esclarece essa limitação.
5. **Entrega:** custos, prazo e transporte são sob consulta; a página não afirma uma transportadora específica nem garante disponibilidade para cada destino.
6. **Prova social:** não existem avaliações inventadas. A seção informa que aguarda relatos reais autorizados.
7. **Endereço e SEO social:** apenas “Arapiraca — AL” foi fornecido. Não inclua rua, telefone, CNPJ, coordenadas, horário ou domínio antes de confirmar. Depois de definir o domínio, atualize `og:image` em `client/index.html` para uma URL absoluta e teste as prévias sociais.
8. **Logo e imagens:** a logo e as fotografias são locais no pacote; imagens de carros são ilustrativas. Substitua-as pelas fotos do estoque real antes da publicação comercial.

## Estrutura relevante

```text
client/                     aplicação React e arquivos de origem
hosting-assets/media/       logo e fotos otimizadas versionadas
scripts/build-static.mjs    build e montagem do diretório de hosting
dist/public/                artefato estático gerado (resultado do build)
package.json                scripts e dependências
pnpm-lock.yaml              lockfile para instalação reproduzível
```

`server/` é apenas a estrutura compatível do template; a entrega de produção sugerida aqui é estática e não necessita iniciá-lo. Não faça upload de `.env`, `node_modules`, `.git` ou arquivos de log.
