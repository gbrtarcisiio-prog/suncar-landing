import type { Testimonial } from "@/types/testimonial";

export const testimonials: Testimonial[] = [
  {
    id: "cliente-01",
    published: true,
    verified: true,

    customerName: "[NOME REAL DO CLIENTE]",
    customerCity: "[CIDADE]",
    customerState: "[UF]",

    vehicle: "[VEÍCULO ADQUIRIDO]",

    quote:
      "[COLE AQUI O DEPOIMENTO REAL DO CLIENTE, COM AUTORIZAÇÃO PARA PUBLICAÇÃO]",

    rating: 5,

    purchaseType: "distancia",

    customerImage: undefined,
    deliveryImage: undefined,

    sourceLabel: "Depoimento autorizado",

    verificationLabel: "Aguardando publicação",
  },

  {
    id: "cliente-02",
    published: true,
    verified: true,

    customerName: "[NOME REAL DO CLIENTE]",
    customerCity: "[CIDADE]",
    customerState: "[UF]",

    vehicle: "[VEÍCULO ADQUIRIDO]",

    quote:
      "[COLE AQUI O DEPOIMENTO REAL DO CLIENTE, COM AUTORIZAÇÃO PARA PUBLICAÇÃO]",

    rating: 5,

    purchaseType: "presencial",

    customerImage: undefined,
    deliveryImage: undefined,

    sourceLabel: "Depoimento autorizado",

    verificationLabel: "Aguardando publicação",
  },

  {
    id: "cliente-03",
    published: false,
    verified: false,

    customerName: "[NOME REAL DO CLIENTE]",
    customerCity: "[CIDADE]",
    customerState: "[UF]",

    vehicle: "[VEÍCULO ADQUIRIDO]",

    quote:
      "[COLE AQUI O DEPOIMENTO REAL DO CLIENTE, COM AUTORIZAÇÃO PARA PUBLICAÇÃO]",

    rating: 5,

    purchaseType: "distancia",

    customerImage: undefined,
    deliveryImage: undefined,

    sourceLabel: "Depoimento autorizado",

    verificationLabel: "Aguardando publicação",
  },
];