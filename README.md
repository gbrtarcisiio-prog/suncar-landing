# SunCar Multimarcas — landing page

Landing page responsiva em React 19, TypeScript e Vite, com identidade visual SunCar e build estático autossuficiente.

## Início rápido

```bash
pnpm install --frozen-lockfile
pnpm dev
```

O preview local fica em `http://localhost:3000`.

## Testar e criar os arquivos para hospedagem

```bash
pnpm lint
pnpm test
pnpm check
pnpm build:static
```

O diretório pronto para envio à hospedagem é `dist/public/`. O build estático inclui todos os assets em `dist/public/media` e não depende do storage do Manus. Para instruções completas, limitações de dados e itens a confirmar antes do anúncio, consulte [`PRODUCAO.md`](./PRODUCAO.md). Achados e validações estão em [`RELATORIO-AUDITORIA.md`](./RELATORIO-AUDITORIA.md).

Para corrigir/manter a seção social, veja [`TUTORIAL-HISTORIAS-REAIS.md`](./TUTORIAL-HISTORIAS-REAIS.md). Para configurar o envio do formulário pela internet usando Formspree, siga [`TUTORIAL-FORMSPREE.md`](./TUTORIAL-FORMSPREE.md); as fontes oficiais estão em [`REFERENCIAS-FORMSPREE.md`](./REFERENCIAS-FORMSPREE.md). Para transformar o template em outro negócio automotivo, siga [`TUTORIAL-REUTILIZACAO.md`](./TUTORIAL-REUTILIZACAO.md).

## Configurações pré-publicação

- Cadastre o número oficial em `client/src/lib/config.ts`.
- Cadastre um Form ID público em `.env.local` como `VITE_FORMSPREE_FORM_ID=...`; sem isso, os envios ficam bloqueados.
- Troque os veículos, valores e imagens demonstrativos em `client/src/data/vehicles.ts` pelas informações reais.
- Confirme condições financeiras e de entrega e atualize metadados sociais quando o domínio for conhecido.

O simulador é uma divisão simples do saldo pelo prazo, não uma oferta financeira. O projeto não tem backend próprio: depois de configurado, o formulário transmite os dados do contato ao Formspree, um serviço externo que armazena as submissões. Configure o aviso de privacidade e valide recebimentos antes de anunciar o formulário.
