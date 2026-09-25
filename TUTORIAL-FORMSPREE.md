# Tutorial — enviar o formulário do site pelo Formspree

O projeto continua **frontend-only**: não criamos API ou banco próprios. O navegador envia a submissão diretamente, por HTTPS, ao endpoint Formspree. Portanto os dados são enviados a um terceiro e ficam sujeitos à conta, configuração e políticas do Formspree. Isso não significa “sem armazenamento”.

## 1. Criar o endpoint no Formspree

1. Crie/aceda à conta Formspree e confirme o endereço de e-mail da conta.
2. No dashboard, crie um Form para a SunCar.
3. Abra a área **Integration**. O dashboard mostra algo no formato `https://formspree.io/f/SEU_ID`.
4. Copie apenas o `SEU_ID` (Form ID). O ID é público porque o formulário envia do navegador; **não** é uma API key e não substitua por credencial privada.
5. Configure no Formspree o destinatário de notificações e regras de spam conforme a conta. Faça uma submissão de teste controlada e verifique tanto a caixa de entrada quanto o painel Submissions. Siga as verificações de domínio/e-mail exibidas pelo Formspree.

## 2. Configurar o projeto no computador

Na raiz do projeto (a pasta que contém `package.json`), crie **localmente** o arquivo `.env.local` com uma linha:

```dotenv
VITE_FORMSPREE_FORM_ID=SEU_ID_AQUI
```

Não inclua aspas desnecessárias, a URL completa, `_`, espaços, token secreto nem API key. Este repositório já ignora `.env.local` pelo `.gitignore`; não remova essa proteção nem envie o arquivo no ZIP/repositório.

`VITE_` é a convenção Vite para expor um valor ao bundle do navegador. Como o Form ID não é segredo, isso é esperado; uma chave privada, por outro lado, **nunca** pode usar o prefixo `VITE_` nem ser embarcada no site.

Se houver dependências ainda não instaladas:

```bash
pnpm install --frozen-lockfile
```

Pare e inicie novamente o servidor depois de criar/alterar `.env.local` (variáveis Vite são lidas durante a inicialização):

```bash
# pare o processo atual com Ctrl+C
pnpm dev
```

Na página, confirme que o aviso de “envio desativado” desapareceu. Se o ID estiver vazio ou contiver caracteres fora do formato simples esperado, o handler bloqueia a solicitação antes de qualquer `fetch`.

## 3. O que o código faz

### Configuração

Em `client/src/lib/config.ts`:

```ts
export const FORMSPREE_FORM_ID = (
  import.meta.env.VITE_FORMSPREE_FORM_ID || ""
).trim();
```

### Cliente HTTP sem backend

Em `client/src/lib/formspree.ts`, `submitContactForm()` envia `FormData` com `POST` para:

```text
https://formspree.io/f/{FORM_ID}
```

Ele inclui `Accept: application/json`, não define manualmente `Content-Type` (o browser cria o boundary correto para `FormData`) e apresenta estados amigáveis de rede, validação e rate limit. Não há acesso privilegiado, token ou servidor próprio.

### Campos e anti-spam

O `<form>` em `client/src/pages/Home.tsx` dá `name` aos campos — estes nomes são as chaves que serão vistas no Formspree. Inclui `_subject`, `source`, consentimento e um campo oculto `_gotcha` (honeypot). O Formspree informa que submissões que chegam com `_gotcha` preenchido são tratadas como spam e ignoradas. O honeypot é defesa básica, não garantia anti-spam.

A checkbox de consentimento é obrigatória. Revise o texto e publique um aviso/política de privacidade adequado à empresa, sua finalidade e retenção. O consentimento da UI, sozinho, não substitui a revisão legal/regulatória aplicável.

## 4. Testar antes de enviar para produção

Os testes automatizados usam mocks do `fetch` — não enviam dados a nenhum serviço:

```bash
pnpm lint
pnpm test
```

Para um teste real, use dados de teste da empresa ou seus próprios dados autorizados; evite enviar dados de clientes sem necessidade. Preencha todos os campos obrigatórios, marque a autorização, envie uma vez e verifique o painel do Formspree. Confirme recebimento no destino configurado. Depois, gere o site:

```bash
pnpm build:static
```

Envie **o conteúdo** de `dist/public/` ao host estático. O Form ID precisa estar disponível no ambiente no momento do build, pois o Vite o incorpora ao JavaScript final. Se for alterado depois, gere e publique um novo build.

## 5. Estados esperados e problemas comuns

- **Form ID vazio:** nada é transmitido; a interface explica que é preciso configurar `.env.local`.
- **Todos campos válidos + consentimento marcado + resposta aceita:** mensagem de sucesso é mostrada; os dados chegam ao dashboard Formspree.
- **422/validação:** confira mensagens e nomes dos campos no Formspree; mantenha `name` em cada input.
- **429:** limite/rate limit; reduza testes consecutivos e confira o plano/limites no Formspree.
- **Falha de rede:** verifique conexão, bloqueadores, firewall ou restrições do navegador; o estado apresenta opção de tentar de novo.
- **Não chegou e-mail:** confira dashboard Submissions, endereço de notificação, spam/lixo eletrônico e configuração de destinatário. A submissão aceita e o e-mail de notificação são duas etapas distintas.
- **Build ainda aparenta estar sem configurar:** verifique o nome exato `VITE_FORMSPREE_FORM_ID`, reinicie Vite e faça novo `pnpm build:static`.

## Referências oficiais

- [Criar um HTML form / localizar o Form ID](https://help.formspree.io/articles/building-your-form/building-an-html-form)
- [Submit forms with JavaScript (AJAX)](https://help.formspree.io/articles/building-your-form/submit-forms-with-javascript-ajax)
- [Honeypot spam filtering](https://help.formspree.io/articles/building-your-form/honeypot-spam-filtering)
- [Biblioteca React oficial](https://help.formspree.io/articles/working-with-react/the-formspree-react-library)

A implementação local usa `fetch` para manter o componente atual e evitar dependência adicional. Formspree também oferece a biblioteca oficial `@formspree/react` como alternativa baseada em hooks.
