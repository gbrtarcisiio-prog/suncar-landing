import {
  BadgeCheck,
  CarFront,
  MapPin,
  Quote,
  Truck,
} from "lucide-react";

import type { Testimonial } from "@/types/testimonial";
import { assetPath } from "@/lib/assetPath";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({
  testimonial,
}: TestimonialCardProps) {
  const initials = testimonial.customerName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase())
    .join("");

  return (
    <article className="testimonial-card-modern">
      <div className="testimonial-media">
        {testimonial.customerImage ? (
          <img
            src={assetPath(testimonial.customerImage)}
            alt={`Foto de ${testimonial.customerName}`}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="testimonial-media-placeholder">
            <span>{initials || "SC"}</span>

            <small>
              EXPERIÊNCIA
              <br />
              SUNCAR
            </small>
          </div>
        )}

        <div className="testimonial-media-overlay" />

        <div className="testimonial-media-label">
          <Quote size={13} />
          Experiência real
        </div>
      </div>

      <div className="testimonial-card-content">
        <div className="testimonial-card-top">
          <div>
            {testimonial.rating && (
              <div
                className="testimonial-stars"
                aria-label={`Avaliação de ${testimonial.rating} de 5`}
              >
                {Array.from({
                  length: testimonial.rating,
                }).map((_, index) => (
                  <span key={index}>★</span>
                ))}
              </div>
            )}

            <span className="testimonial-eyebrow">
              EXPERIÊNCIA DO CLIENTE
            </span>
          </div>

          {testimonial.verified && (
            <span className="testimonial-verified">
              <BadgeCheck size={13} />
              {testimonial.verificationLabel ||
                "Compra confirmada"}
            </span>
          )}
        </div>

        <blockquote className="testimonial-quote">
          “{testimonial.quote}”
        </blockquote>

        <div className="testimonial-divider" />

        <div className="testimonial-customer">
          <div className="testimonial-avatar">
            {initials || "SC"}
          </div>

          <div className="testimonial-customer-info">
            <strong>{testimonial.customerName}</strong>

            <span>
              <MapPin size={11} />
              {testimonial.customerCity} ·{" "}
              {testimonial.customerState}
            </span>
          </div>
        </div>

        <div className="testimonial-purchase-info">
          <span>
            <CarFront size={13} />
            {testimonial.vehicle}
          </span>

          <span>
            {testimonial.purchaseType === "distancia" ? (
              <>
                <Truck size={13} />
                Compra à distância
              </>
            ) : (
              <>
                <MapPin size={13} />
                Compra presencial
              </>
            )}
          </span>
        </div>

        {testimonial.sourceLabel && (
          <div className="testimonial-source">
            {testimonial.sourceUrl ? (
              <a
                href={testimonial.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {testimonial.sourceLabel}
              </a>
            ) : (
              <span>{testimonial.sourceLabel}</span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}