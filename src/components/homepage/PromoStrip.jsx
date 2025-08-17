import React from "react";

export default function PromoStrip({
  title = "Conheça a HRTech",
  subtitle = "Uma das empresas mais promissoras da região!",
  linkHref = "https://hrtechsolutions.netlify.app/",
  linkLabel = "Ver website",
}) {
  return (
    <section className="gb-promo v2" aria-label="Destaque do site">
      {/* Arco decorativo (já existia) */}
      <span className="gb-promo-rings" aria-hidden="true" />

      {/* Camada de animação (SVG 100% da faixa) */}
      <svg
        className="gb-promo-anim"
        viewBox="0 0 1000 300"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          {/* Curva que a bolinha percorre */}
          <path id="promo-arc" d="M 0 220 Q 420 40 1000 200" />
          {/* Sombra suave da bolinha */}
          <filter id="ballShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" flood-opacity=".28" />
          </filter>
        </defs>

        {/* Trilhozinho discreto */}
        <use href="#promo-arc" stroke="rgba(82,107,124,.15)" strokeWidth="3" fill="none" />

        {/* Bolinha “rolando” no arco */}
        <g filter="url(#ballShadow)">
          <circle r="9" fill="#fff" stroke="#0b3d2e" strokeWidth="2">
            <animateMotion dur="9s" repeatCount="indefinite" rotate="auto">
              <mpath href="#promo-arc" />
            </animateMotion>
          </circle>
        </g>
      </svg>

      {/* Conteúdo */}
      <div className="gb-promo-inner">
        <div className="gb-promo-text">
          <span className="gb-promo-eyebrow">Destaque</span>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>

        <nav className="gb-promo-ctas" aria-label="Ações rápidas">
          <a className="gb-promo-link" href={linkHref}>
            {linkLabel}
            <svg className="i-arrow" width="18" height="18" viewBox="0 0 24 24">
              <path d="M5 12h12M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </nav>
      </div>
    </section>
  );
}
