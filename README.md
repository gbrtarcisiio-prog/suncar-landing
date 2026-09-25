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

## Configurações pré-publicação

- Cadastre o número oficial em `client/src/lib/config.ts`.
- Troque os veículos, valores e imagens demonstrativos em `client/src/data/vehicles.ts` pelas informações reais.
- Confirme condições financeiras e de entrega e atualize metadados sociais quando o domínio for conhecido.

O simulador é uma divisão simples do saldo pelo prazo, não uma oferta financeira. O formulário não armazena dados; quando WhatsApp estiver configurado, abre uma mensagem preenchida para a pessoa revisar e enviar manualmente.
