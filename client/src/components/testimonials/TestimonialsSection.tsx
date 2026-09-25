import { useEffect, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Truck,
} from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";

import { testimonials } from "@/data/testimonials";
import { TestimonialCard } from "./TestimonialCard";

export function TestimonialsSection() {
  const publishedTestimonials = testimonials.filter(
    testimonial =>
      testimonial.published &&
      testimonial.quote.trim().length > 0
  );

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const updateCurrent = () => {
      setCurrent(api.selectedScrollSnap());
    };

    updateCurrent();

    api.on("select", updateCurrent);
    api.on("reInit", updateCurrent);

    return () => {
      api.off("select", updateCurrent);
      api.off("reInit", updateCurrent);
    };
  }, [api]);

  return (
    <section
      className="section testimonials-section"
      id="clientes"
    >
      <div className="container">
        <div className="testimonials-top">
          <div className="section-heading">
            <div className="eyebrow">
              <span className="eyebrow-line" />
              04 / EXPERIÊNCIAS REAIS
            </div>

            <h2>
              Quem compra com a SunCar,
              <br />
              conta a experiência.
            </h2>

            <p>
              Atendimento próximo, negociação transparente e
              acompanhamento mesmo quando o cliente está longe
              de Arapiraca.
            </p>
          </div>

          <div className="testimonial-mark">
            <span>“</span>

            <small>
              CLIENTES
              <br />
              QUE JÁ
              <br />
              VIVERAM
            </small>
          </div>
        </div>

        {publishedTestimonials.length > 0 ? (
          <div className="testimonial-carousel-area">
            <Carousel
              setApi={setApi}
              opts={{
                align: "start",
                loop: publishedTestimonials.length > 1,
              }}
              className="testimonial-carousel"
            >
              <CarouselContent>
                {publishedTestimonials.map(
                  (testimonial, index) => (
                    <CarouselItem
                      key={testimonial.id}
                      aria-label={`Depoimento ${
                        index + 1
                      } de ${
                        publishedTestimonials.length
                      }`}
                      aria-hidden={current !== index}
                      inert={current !== index}
                    >
                      <TestimonialCard
                        testimonial={testimonial}
                      />
                    </CarouselItem>
                  )
                )}
              </CarouselContent>
            </Carousel>

            <div className="testimonial-controls">
              <div className="testimonial-counter">
                <strong>
                  {String(current + 1).padStart(2, "0")}
                </strong>

                <span>
                  /{" "}
                  {String(
                    publishedTestimonials.length
                  ).padStart(2, "0")}
                </span>
              </div>

              <div className="testimonial-dots">
                {publishedTestimonials.map(
                  (testimonial, index) => (
                    <button
                      key={testimonial.id}
                      type="button"
                      className={
                        current === index
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        api?.scrollTo(index)
                      }
                      aria-label={`Ver depoimento ${
                        index + 1
                      }`}
                      aria-current={
                        current === index
                      }
                    />
                  )
                )}
              </div>

              <div className="testimonial-arrows">
                <button
                  type="button"
                  onClick={() => api?.scrollPrev()}
                  disabled={!api?.canScrollPrev()}
                  aria-label="Depoimento anterior"
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => api?.scrollNext()}
                  disabled={!api?.canScrollNext()}
                  aria-label="Próximo depoimento"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="testimonial-empty-state">
            <div className="testimonial-empty-icon">
              <BadgeCheck size={25} />
            </div>

            <div>
              <span>ESPAÇO RESERVADO PARA EXPERIÊNCIAS REAIS</span>

              <h3>
                Os próximos relatos serão contados
                por quem já comprou.
              </h3>

              <p>
                Estamos reunindo depoimentos autorizados
                de clientes reais para apresentar aqui
                suas experiências de compra com a SunCar.
              </p>
            </div>
          </div>
        )}

        <div className="testimonial-distance">
          <div className="testimonial-distance-heading">
            <div className="testimonial-distance-icon">
              <Truck size={19} />
            </div>

            <div>
              <span>COMPRA À DISTÂNCIA</span>

              <h3>
                Mora em outro estado?
                <br />
                A negociação também pode começar daqui.
              </h3>
            </div>
          </div>

          <div className="testimonial-process">
            <div>
              <span>01</span>
              <MapPin size={16} />
              <strong>Você</strong>
              <small>
                Sua cidade e seu veículo de interesse.
              </small>
            </div>

            <ArrowRight />

            <div>
              <span>02</span>
              <MessageCircle size={16} />
              <strong>SunCar</strong>
              <small>
                Atendimento, negociação e informações.
              </small>
            </div>

            <ArrowRight />

            <div>
              <span>03</span>
              <ShieldCheck size={16} />
              <strong>Documentação</strong>
              <small>
                Processo acompanhado caso a caso.
              </small>
            </div>

            <ArrowRight />

            <div>
              <span>04</span>
              <Truck size={16} />
              <strong>Transporte</strong>
              <small>
                Opções consultadas conforme o destino.
              </small>
            </div>

            <ArrowRight />

            <div>
              <span>05</span>
              <Check size={16} />
              <strong>Seu destino</strong>
              <small>
                Entrega conforme condições combinadas.
              </small>
            </div>
          </div>

          <p className="testimonial-distance-note">
            Custos, disponibilidade, prazo e condições de
            transporte são confirmados individualmente antes
            da negociação.
          </p>
        </div>
      </div>
    </section>
  );
}