import { ExternalLink, MapPin } from "lucide-react";

import { businessInfo } from "@/data/business";

export function GoogleBusinessMap() {
  return (
    <div className="google-business-map">
      <div className="google-business-map-header">
        <div>
          <span className="google-business-map-eyebrow">
            ONDE ESTAMOS
          </span>

          <h3>{businessInfo.name}</h3>

          <p>
            <MapPin size={13} />
            {businessInfo.address}
          </p>
        </div>

        <a
          href={businessInfo.googleBusinessUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="google-business-link"
        >
          <span>Google Business</span>
          <ExternalLink size={13} />
        </a>
      </div>

      <div className="google-business-map-frame">
        <iframe
          src={businessInfo.googleMapsEmbedUrl}
          title={`Localização da ${businessInfo.name}`}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>

      <div className="google-business-map-footer">
        <span>
          {businessInfo.city} · {businessInfo.state}
        </span>

        <a
          href={businessInfo.googleBusinessUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Abrir no Google Maps
          <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
}