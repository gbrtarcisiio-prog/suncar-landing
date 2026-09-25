# Relatório de auditoria e refinamento — SunCar Multimarcas

## Alterações concluídas

A landing page existente foi preservada. A identidade vermelho/grafite/branco, a navegação, o hero, a vitrine, o simulador, o fluxo de entrega, o estado vazio de depoimentos, a seção institucional, o formulário e o rodapé permanecem no projeto; o trabalho foi feito incrementalmente, sem refazer a aplicação nem trocar a stack.

Foram corrigidos o lockup truncado em 320 px, a manchete desktop excessivamente quebrada, os elementos laterais que apertavam layouts intermediários e os alvos de toque do menu, do carrossel e de ações móveis. O botão flutuante do WhatsApp respeita a área segura do celular e sai de cena na seção de contato. A navegação mobile declara seus controles, move o foco ao abrir e o devolve ao botão ao fechar.

A taxa não confirmada de 1,79% foi removida: o simulador agora mostra apenas a divisão do saldo pelo prazo, o total simples e um aviso explícito de que não considera juros, tarifas, seguros ou outros custos. O fluxo de entrega passou a indicar transporte sob consulta, sem afirmar transportadora específica, inspeção já realizada ou cobertura garantida. Três avaliações fictícias foram substituídas por um aviso honesto de que a seção aguarda relatos autorizados.

O formulário não aparenta enviar ou armazenar dados. Sem o número oficial configurado, a tentativa apenas apresenta um aviso. Quando a empresa cadastrar o número, os dados serão pré-preenchidos em uma conversa WhatsApp para a pessoa revisar e enviar manualmente. O site não grava submissões. Foi também removido `framer-motion`, dependência sem uso; o movimento leve existente continua em CSS, com respeito a `prefers-reduced-motion`.

## Verificações executadas

- Capturas e inspeção visual em **320, 375, 390, 414, 768, 1024, 1280, 1440, 1920 e 2560 px**. Também foram revistas páginas completas em desktop e celular.
- Verificados carregamento de imagens, existência dos destinos de links internos, seleção de veículo no fluxo card → simulador, pré-seleção no fluxo card → formulário, labels dos campos obrigatórios e ausência de sucesso falso antes da submissão. Um formulário preenchido com dados sintéticos foi validado no navegador: com WhatsApp sem configuração, exibiu o aviso de bloqueio, não apresentou sucesso e não transmitiu dados. Nenhum dado real foi enviado.
- `pnpm install --frozen-lockfile --offline`: concluído.
- `pnpm lint`: concluído (TypeScript e formatação Prettier).
- `pnpm test`: **4 testes aprovados** para cálculo e formatação monetária.
- `pnpm build`: concluído.
- `pnpm build:static`: concluído e copiou **nove assets locais** para `dist/public/media`.
- Build estático inspecionado para assegurar a ausência do runtime, collector, caminho de storage e referências internas de preview Manus.

## Pré-requisitos comerciais antes de publicar

Os seis registros em `client/src/data/vehicles.ts`, incluindo modelos, preços, anos, quilometragens, versões, badges e fotos são **dados ilustrativos**, não estoque anunciado. Atualize-os ou remova os itens que não estejam confirmados. As imagens dos veículos também são conceituais.

Preencha `WHATSAPP_NUMBER` em `client/src/lib/config.ts` com o número oficial em dígitos, incluindo DDI e DDD. Confirme endereço completo, contato, domínio, condições financeiras, custos/prazos por destino e textos de cobertura antes de anunciá-los. Depoimentos só devem entrar com autorização. Se desejar captura automática de leads, será necessária integração apropriada e revisão de privacidade. O guia de instalação e publicação está em `PRODUCAO.md`.
