# Tutorial — reutilizar este template em outra empresa automotiva

Este guia orienta uma adaptação por novo projeto/cliente. Faça isso somente dentro do contrato de prestação de serviços correspondente, com autorização para utilizar marca, logotipo, fotografias, dados de estoque, depoimentos, informações pessoais e domínio. Não reutilize dados pessoais/leads da SunCar para outro negócio.

## 0. Faça uma cópia de trabalho e preserve o original

1. Extraia `SunCar-Multimarcas-Projeto-Completo.zip` em uma nova pasta por cliente.
2. Duplique o diretório de trabalho e mantenha o projeto original inalterado como base de comparação/rollback.
3. Não copie `.env.local`, `.git`, logs, dados de leads ou `node_modules` de outro cliente. Cada empresa deve ter Form ID próprio, número próprio e materiais autorizados.
4. Instale dependências e rode baseline:

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm test
pnpm dev
```

## 1. Troque marca e localização no texto

O conteúdo editorial está em `client/src/pages/Home.tsx`.

1. Use busca do editor (`Ctrl+Shift+F`) por `SunCar`, `Arapiraca`, `Alagoas` e atualize todos os textos confirmados: hero, descrições, cabeçalho, entregas, seção Sobre, formulário, mensagens de sucesso, rodapé e textos acessíveis (`aria-label`, `alt`).
2. A navegação está no array `navItems` próximo ao início do arquivo. Se renomear seções, preserve os IDs que ainda existem no JSX ou altere ambos: por exemplo, `"Clientes", "clientes"` deve corresponder a `id="clientes"`.
3. Cada section usa um `id` para âncoras: `inicio`, `veiculos`, `financiamento`, `como-funciona`, `clientes`, `sobre`, `contato`. Um link apontando para ID inexistente deixa a navegação quebrada.
4. Atualize também a descrição/título e Open Graph em `client/index.html`, além de `document title` e localização do favicon, se necessário.
5. Não afirme taxas, aprovação de crédito, preço, garantia, estoque, transporte, prazo, endereço ou horário sem confirmação formal do cliente.

## 2. Troque a logo, fotos e mídias

O projeto usa arquivos locais:

```text
hosting-assets/media/logo.png
hosting-assets/media/hero-editorial-opt.jpg
hosting-assets/media/showroom-editorial-opt.jpg
hosting-assets/media/car-*.jpg
```

1. Substitua a logo e as fotos pelos arquivos licenciados/aprovados da nova empresa. Preferir imagem de boa qualidade e versões otimizadas para web; não use fotos de pessoas/placas/veículos sem autorização apropriada.
2. Mantenha os nomes existentes se quiser evitar editar os componentes. Para novo filename, atualize as referências no código: o logo e hero ficam em `client/src/pages/Home.tsx`; o showroom fica na seção Sobre do mesmo arquivo; estoque fica em `client/src/data/vehicles.ts`.
3. Em desenvolvimento local e no build estático, `assetPath()` aponta para `/media/<filename>`; a mídia local de preview é servida pelo plugin de Vite em `vite.config.ts`; o build `build:static` copia `hosting-assets/media` para `dist/public/media`.
4. O preview hospedado Manus tem mapeamento de filenames hashados em `client/src/lib/assetPath.ts`. Se mudar o nome e testar nesse preview, ajuste também `previewAssets` para o hash novo do asset armazenado ou teste pelo preview local com assets em `hosting-assets/media`.
5. Atualize texto `alt`, `aria-label`, `og:image` e favicon. Confira direitos de uso e tamanho do arquivo; teste as imagens em desktop e celular.

## 3. Atualize o estoque (não apenas a imagem)

O schema dos veículos está em `client/src/data/vehicles.ts`:

```ts
{
  id: "corolla-xei",          // identificador único e estável
  brand: "Toyota",
  model: "Corolla",
  version: "XEi 2.0 Flex",
  year: "2023/2024",
  mileage: 28400,              // número em km
  transmission: "Automático",
  fuel: "Flex",
  price: 149900,               // número, em reais
  image: assetPath("car-red-dealership-opt.jpg"),
  badge: "Sedã • demonstração",
}
```

Substitua **todos** os campos pelos dados conferidos e remova os itens vendidos. Use `id` sem duplicação; preserve `price` como número sem `R$` ou separador de milhar; `mileage` como número; `image` apontando para arquivo que existe. Não rotule foto genérica como o veículo exato. Após editar, revise a vitrine, carrossel, simulador e seletor de veículo de interesse no formulário.

## 4. Troque a paleta

Os principais tokens estão no começo de `client/src/index.css`, dentro de `:root`:

```css
--red: #d80e15;
--red-dark: #a8070d;
--red-bright: #ff555b;
--red-soft: #fbf0f1;
--red-rgb: 216, 14, 21;
--ink: #141416;
--muted: #77777b;
--line: #e8e8e9;
--soft: #f5f5f5;
```

1. Atualize `--red`, suas variantes (`--red-dark`, `--red-bright`, `--red-soft`) e `--red-rgb`. Por exemplo, se a cor base for `#123456`, o RGB correspondente é `18, 52, 86`.
2. `--red-rgb` é usado em bordas, sombras e realces translúcidos. Se mudar o hex vermelho e não atualizar os três números RGB, alguns halos e sombras continuarão com a cor SunCar.
3. Atualize os tokens globais `--primary`, `--primary-foreground`, `--ring`, e variáveis `--background`, `--foreground`, `--card`, `--border` se a proposta pedir tema distinto. Mantenha contraste legível.
4. Há tons neutros específicos e cores de estados nos componentes. Faça busca no CSS por `#` e `rgb` para localizar exceções intencionais antes de concluir; não substitua todos os cinzas por uma cor única.
5. O import de fontes fica na primeira linha de `client/src/index.css`. Atualize famílias/pesos de modo consistente com o uso de `DM Sans` e `Space Grotesk` no restante do arquivo; confirme licença e disponibilidade do serviço de fonte.
6. Confira botões, foco por teclado (`:focus-visible`), texto sobre imagens, ícones e cores dos estados de sucesso/erro.

## 5. Ajuste histórias, entrega e simulador sem inventar dados

- **Clientes/histórias:** `Home.tsx`, section `id="clientes"`. A área vazia está desenhada para não exibir avaliação inventada. Inclua testemunho apenas com relato real e autorização. CSS específico está em `.story-placeholder`, `.distance-flow` e breakpoint `@media (max-width: 640px)` de `index.css`.
- **Transporte:** a seção `id="como-funciona"` e a faixa do rodapé descrevem transporte sob consulta; adapte apenas a política confirmada. Não prometa cobertura nem parceria sem contrato/validação.
- **Simulador:** `client/src/lib/financing.ts` faz uma conta aritmética simples de saldo dividido pelo prazo. Não a apresente como taxa, crédito aprovado, parcela de banco ou oferta. Para qualquer simulador real de crédito será necessário obter dados comerciais corretos e explicitar premissas/encargos.

## 6. Configure contatos para cada empresa

- **Formspree:** siga [`TUTORIAL-FORMSPREE.md`](./TUTORIAL-FORMSPREE.md) e use um form/ID criado pela empresa contratante. O ID é embedado no build e é público; não reutilize o ID da SunCar nem cole API keys.
- **WhatsApp:** em `client/src/lib/config.ts`, substitua `WHATSAPP_NUMBER` por apenas dígitos, com código do país, DDD e número. Exemplo de formato: `55` + DDD + número. Não use espaços, `+`, hífen ou parênteses. Teste `wa.me` no celular e desktop.
- Atualize as finalidades/campos do formulário quando mudar o processo e revise consentimento, aviso de privacidade e destinatários Formspree. Dados submetidos são tratados pelo Formspree e não pelo banco local.

## 7. SEO, domínio e favicon

1. Em `client/index.html`, atualize `lang` (se o conteúdo deixar de ser pt-BR), `theme-color`, `description`, Open Graph title/description/image e `<title>`.
2. O preview social precisa de imagem acessível publicamente. Depois de confirmar o domínio, configure URL absoluta para `og:image` e verifique com ferramenta de depuração da rede social.
3. Substitua `client/public/favicon.svg` pela marca correta e atualize nome/alt da logo em `Home.tsx`.
4. Não publique endereço/telefone/CNPJ ou outros dados até a empresa confirmar o conteúdo.

## 8. Rodada de verificação obrigatória

```bash
pnpm lint
pnpm test
pnpm build:static
pnpm exec vite preview --host 0.0.0.0
```

Inspecione toda a página nos breakpoints 320, 375, 390, 414, 768, 1024, 1280, 1440, 1920 e 2560 px. Teste menu mobile, links âncora, cada card do estoque, controle de carrossel, cálculo do simulador, validação do formulário, consentimento e a ausência/presença de Form ID. Verifique no navegador Console/Network: nenhuma imagem deve retornar erro, o formulário sem ID não pode transmitir e o formulário configurado deve enviar só depois de consentimento. Antes do go-live, faça uma submissão controlada e confirme-a no Formspree.

Depois de fechar a homologação, publique **somente o conteúdo** de `dist/public/` na hospedagem estática. Não suba `.env.local`, `node_modules`, a pasta `.git`, credenciais privadas ou dados de outro cliente.
