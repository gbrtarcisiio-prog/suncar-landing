// Número oficial de WhatsApp: somente dígitos, com DDI + DDD. Opcional.
export const WHATSAPP_NUMBER = "";

// O Form ID é público no frontend; configure VITE_FORMSPREE_FORM_ID no .env.local.
// Nunca adicione uma API key privada ao código do navegador.
export const FORMSPREE_FORM_ID = (
  import.meta.env.VITE_FORMSPREE_FORM_ID || ""
).trim();

export function isFormspreeConfigured(formId = FORMSPREE_FORM_ID) {
  return /^[a-zA-Z0-9]+$/.test(formId);
}

export function whatsappLink(message: string) {
  const number = WHATSAPP_NUMBER.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
