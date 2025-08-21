import React from "react";
import { useI18n } from "../../i18n/I18nProvider";
import { DICTS } from "../../i18n/langs";

export default function PromoStrip({
  // se vierem via props, sobrepõem o texto do dicionário
  title,
  subtitle,
  linkHref = "https://hrtechsolutions.netlify.app/",
  linkLabel,
}) {
  const { lang } = useI18n();
  const L = (DICTS[lang] || DICTS.pt).promo;

  const t = {
    eyebrow: L.eyebrow,
    title: title ?? L.title,
    subtitle: subtitle ?? L.subtitle,
    linkLabel: linkLabel ?? L.linkLabel,
    aria: L.aria.section,
  };

  return (
    <section className="gb-promo v2" aria-label={t.aria}>
      {/* Arco decorativo */}
      <span className="gb-promo-rings" aria-hidden="true" />

      {/* Camada de animação (SVG 100%) */}
      <svg
        className="gb-promo-anim"
        viewBox="0 0 1000 300"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <path id="promo-arc" d="M 0 220 Q 420 40 1000 200" />
          <filter id="ballShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity=".28" />
          </filter>
        </defs>

        <use href="#promo-arc" stroke="rgba(82,107,124,.15)" strokeWidth="3" fill="none" />

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
          <span className="gb-promo-eyebrow">{t.eyebrow}</span>
          <h2>{t.title}</h2>
          <p>{t.subtitle}</p>
        </div>

        <nav className="gb-promo-ctas" aria-label="Ações rápidas">
          <a className="gb-promo-link" href={linkHref}>
            {t.linkLabel}
            <svg className="i-arrow" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M5 12h12M13 5l7 7-7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </nav>
      </div>
    </section>
  );
}
