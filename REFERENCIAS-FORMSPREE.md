# Referências oficiais consultadas

1. Formspree — Building an HTML Form (criação do form no painel, endpoint/ID e processamento/armazenamento de submissões): https://help.formspree.io/articles/building-your-form/building-an-html-form
2. Formspree — Submit forms with JavaScript (AJAX) (submissão sem recarregar página e resposta JSON): https://help.formspree.io/articles/building-your-form/submit-forms-with-javascript-ajax
3. Formspree — Honeypot spam filtering (campo `_gotcha` e sua finalidade): https://help.formspree.io/articles/building-your-form/honeypot-spam-filtering
4. Formspree — The Formspree React library (alternativa oficial com `useForm`, estado submitting/succeeded e ValidationError): https://help.formspree.io/articles/working-with-react/the-formspree-react-library

A implementação do projeto usa o endpoint público com `fetch` e o cabeçalho `Accept: application/json`; não inclui API key privada no bundle. A documentação oficial também oferece o pacote React `@formspree/react`, que seria alternativa se a equipe preferir a integração oficial por hook.
