import type { Testimonial } from "@/types/testimonial";

export const testimonials: Testimonial[] = [
  {
    id: "cliente-01",
    published: true,
    verified: true,

    customerName: "Marcos Vinícius de Oliveira",
    customerCity: "Maceió",
    customerState: "AL",

    vehicle: "Jeep Compass 2022",

    quote:
      "Estou muito feliz com minha nova aquisição! A SunCar me proporcionou uma experiência de compra incrível, com atendimento personalizado e total transparência. Recomendo a todos que buscam um veículo de qualidade e um serviço excepcional.",

    rating: 5,

    purchaseType: "presencial",

    customerImage: "cliente1.png",
    deliveryImage: "marcos.png",

    sourceLabel: "Depoimento autorizado",

    verificationLabel: "Aguardando publicação",
  },

  {
    id: "cliente-02",
    published: true,
    verified: true,

    customerName: "Francisco José da Silva",
    customerCity: "Salvador",
    customerState: "BA",

    vehicle: "VW Virtus 2021",

    quote:
      "No princípio estava com um pouco de receio por conta da distância mas quando percebi a seriedade e a transparência da SunCar, me senti seguro e confiante. A entrega do meu carro foi feita de forma impecável, e a equipe me manteve informado durante todo o processo. Estou extremamente satisfeito com minha compra e com o atendimento recebido.",

    rating: 5,

    purchaseType: "distancia",

    customerImage: "cliente2.png",
    deliveryImage: undefined,

    sourceLabel: "Depoimento autorizado",

    verificationLabel: "Aguardando publicação",
  },

  {
    id: "cliente-03",
    published: true,
    verified: true,

    customerName: "Marcelo Pereira da Silva",
    customerCity: "Boca Da Mata",
    customerState: "AL",

    vehicle: "Hyundai Creta 2020",

    quote:
      "Fui atendido de forma excepcional pela equipe da SunCar. Desde o primeiro contato, eles foram muito prestativos e esclareceram todas as minhas dúvidas. A compra à distância foi tranquila e eficiente, e a entrega do meu carro foi feita com todo cuidado e atenção. Estou muito satisfeito com minha experiência e recomendo a SunCar a todos que buscam um serviço de qualidade.",

    rating: 5,

    purchaseType: "distancia",

    customerImage: "cliente3.png",
    deliveryImage: undefined,

    sourceLabel: "Depoimento autorizado",

    verificationLabel: "Aguardando publicação",
  },

  {
    id: "cliente-04",
    published: true,
    verified: true,

    customerName: "Francisca Luciana da Silva",
    customerCity: "Arapiraca",
    customerState: "AL",

    vehicle: "Chevrolet Onix 2023",

    quote:
      "Já conhecia a SunCar e sabia da reputação da empresa, mas a experiência de compra superou minhas expectativas. A equipe foi extremamente atenciosa e profissional, estou muito feliz com meu novo carro e com o atendimento que recebi. Recomendo a SunCar a todos que buscam um serviço de qualidade e confiança.",

    rating: 5,

    purchaseType: "presencial",

    customerImage: "cliente4.png",
    deliveryImage: undefined,

    sourceLabel: "Depoimento autorizado",

    verificationLabel: "Aguardando publicação",
  },
];