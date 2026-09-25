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
    id: "corolla-xei",
    brand: "Toyota",
    model: "Corolla",
    version: "XEi 2.0 Flex",
    year: "2023/2024",
    mileage: 28400,
    transmission: "Automático",
    fuel: "Flex",
    price: 149900,
    image: assetPath("car-red-dealership-opt.jpg"),
    badge: "Sedã • demonstração",
  },
  {
    id: "honda-civic",
    brand: "Honda",
    model: "Civic",
    version: "EXL 2.0 Flex",
    year: "2022/2023",
    mileage: 31600,
    transmission: "Automático",
    fuel: "Flex",
    price: 137900,
    image: assetPath("car-showroom-side-opt.jpg"),
    badge: "Sedã • demonstração",
  },
  {
    id: "jeep-compass",
    brand: "Jeep",
    model: "Compass",
    version: "Longitude T270",
    year: "2023/2024",
    mileage: 22100,
    transmission: "Automático",
    fuel: "Flex",
    price: 159900,
    image: assetPath("car-suv-opt.jpg"),
    badge: "SUV • demonstração",
  },
  {
    id: "chevrolet-onix",
    brand: "Chevrolet",
    model: "Onix",
    version: "Premier 1.0 Turbo",
    year: "2023/2024",
    mileage: 18700,
    transmission: "Automático",
    fuel: "Flex",
    price: 94900,
    image: assetPath("car-blue-sedan-opt.jpg"),
    badge: "Hatch • demonstração",
  },
  {
    id: "hyundai-creta",
    brand: "Hyundai",
    model: "Creta",
    version: "Platinum 1.0 TGDI",
    year: "2022/2023",
    mileage: 35200,
    transmission: "Automático",
    fuel: "Flex",
    price: 128900,
    image: assetPath("car-lineup-opt.jpg"),
    badge: "SUV • demonstração",
  },
  {
    id: "volkswagen-tcross",
    brand: "Volkswagen",
    model: "T-Cross",
    version: "Highline 1.4 TSI",
    year: "2023/2024",
    mileage: 24800,
    transmission: "Automático",
    fuel: "Flex",
    price: 143900,
    image: assetPath("car-sedan-opt.jpg"),
    badge: "SUV • demonstração",
  },
];
