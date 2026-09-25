export type TestimonialPurchaseType =
  | "presencial"
  | "distancia";

export type Testimonial = {
  id: string;

  /**
   * Só será exibido no site quando true.
   */
  published: boolean;

  /**
   * Compra confirmada internamente pela SunCar.
   */
  verified: boolean;

  customerName: string;
  customerCity: string;
  customerState: string;

  vehicle: string;

  quote: string;

  rating?: number;

  purchaseType: TestimonialPurchaseType;

  customerImage?: string;
  deliveryImage?: string;

  sourceLabel?: string;
  sourceUrl?: string;

  verificationLabel?: string;
};