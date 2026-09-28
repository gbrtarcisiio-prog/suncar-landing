import { assetPath } from "@/lib/assetPath";

export type Vehicle = {
  id: string;
  brand: string;
  model: string;
  version: string;
  year: string;
  mileage: number;
  transmission: string;
  fuel: string;
  price: number;
  image: string;
  badge: string;
};

// Dados de demonstração: substitua modelos, valores e fotos por estoque confirmado antes da publicação.
export const vehicles: Vehicle[] = [
  {
    id: "golbranco",
    brand: "Volkswagen",
    model: "Gol",
    version: "1.6 Branco",
    year: "2010",
    mileage: 170000,
    transmission: "Manual",
    fuel: "Flex",
    price: 19900,
    image: assetPath("golbranco.jpg"),
    badge: "Hatch • ABAIXO DA FIPE",
  },
  {
    id: "golpreto",
    brand: "Volkswagen",
    model: "Gol G5",
    version: "1.6 Preto",
    year: "2011/12",
    mileage: 175000,
    transmission: "Manual",
    fuel: "Flex",
    price: 19990,
    image: assetPath("frente1.jpg"),
    badge: "Hatch • ABAIXO DA FIPE",
  },
  {
    id: "gli",
    brand: "Volkswagen",
    model: "Gol GLI",
    version: "1.8 Vermelho",
    year: "1996",
    mileage: 110000,
    transmission: "Manual",
    fuel: "Gasolina",
    price: 8900,
    image: assetPath("glivermelho.jpg"),
    badge: "Hatch • ABAIXO DA FIPE",
  },
  {
    id: "paliov",
    brand: "FIAT",
    model: "Palio Celebration",
    version: "Vinho 1.0",
    year: "2009",
    mileage: 190000,
    transmission: "Manual",
    fuel: "Flex",
    price: 16400,
    image: assetPath("paliov.jpeg"),
    badge: "Hatch • ABAIXO DA FIPE",
  },
  {
    id: "paliop",
    brand: "FIAT",
    model: "Palio Fire",
    version: "Cinza 1.0",
    year: "2008",
    mileage: 170000,
    transmission: "Manual",
    fuel: "Flex",
    price: 15900,
    image: assetPath("frante2.jpg"),
    badge: "Hatch • ABAIXO DA FIPE",
  },
  {
    id: "paliovv",
    brand: "FIAT",
    model: "Palio Celebration",
    version: "Vermelho 1.0",
    year: "2009",
    mileage: 157000,
    transmission: "Manual",
    fuel: "Flex",
    price: 16700,
    image: assetPath("palio2.jpeg"),
    badge: "Hatch • ABAIXO DA FIPE",
  },
];
