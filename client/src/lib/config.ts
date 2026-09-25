// Informe apenas os dígitos do WhatsApp com DDI + DDD (ex.: 55 82 99999-0000).
// Mantido em branco até que o número oficial da SunCar seja fornecido.
export const WHATSAPP_NUMBER = "";

export function whatsappLink(message: string) {
  const number = WHATSAPP_NUMBER.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
