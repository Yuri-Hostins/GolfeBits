import React, { useEffect, useState, useMemo } from "react";
import { useI18n } from "../../i18n/I18nProvider";
import { DICTS } from "../../i18n/langs"

/** utils */
const rnd = (min, max) => min + Math.random() * (max - min);
const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

function makeCloud({ midFlight = false } = {}) {
  const duration = rnd(38, 64);
  const topVH = rnd(8, 18);
  const scale = rnd(0.8, 1.35);
  const delay = midFlight ? -rnd(0, duration * 0.8) : 0;
  return { id: uid(), duration, topVH, scale, delay };
}

export default function Banner() {
  const { lang } = useI18n();
  const L = DICTS[lang] || DICTS.pt; // fallback seguro

  const [clouds, setClouds] = useState(() =>
    Array.from({ length: 5 }, () => makeCloud({ midFlight: true }))
  );

  const recycle = (id) =>
    setClouds((prev) => prev.map((c) => (c.id === id ? makeCloud() : c)));

  // strings do hero vindas do dicionário
  const hero = useMemo(
    () => ({
      title: L.banner.title,
      subtitle: L.banner.subtitle,
      ctaLabel: L.banner.cta,
      ctaHref: "#conteudos",
      sceneLabel: L.banner.a11y.scene,
      heroLabel: L.banner.a11y.hero
    }),
    [L]
  );

  useEffect(() => {
    const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduce) return;
    const onScroll = () => {
      const y = window.scrollY || 0;
      document.documentElement.style.setProperty("--parallax", String(y));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="banner" className="gb-banner" aria-label="Ambiente do campo (céu, colinas e nuvens)">
      {/* CÉU + TERRA (SVG) */}
      <div className="gb-scene" aria-hidden="true">
        <svg className="gb-scene-svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9fd7ff" />
              <stop offset="65%" stopColor="#dff3ff" />
              <stop offset="100%" stopColor="#f5fbf7" />
            </linearGradient>
            <linearGradient id="hillA" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7bc47f" />
              <stop offset="100%" stopColor="#58a86b" />
            </linearGradient>
            <linearGradient id="hillB" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6fbf77" />
              <stop offset="100%" stopColor="#4f9d63" />
            </linearGradient>
            {/* cores e brilho da bandeira */}
            <linearGradient id="flagRed" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ff7a7a" />
              <stop offset="55%" stopColor="#ff4b4b" />
              <stop offset="100%" stopColor="#ff2f2f" />
            </linearGradient>
            <linearGradient id="flagGloss" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(255,255,255,.55)" />
              <stop offset="60%" stopColor="rgba(255,255,255,.0)" />
            </linearGradient>

            <filter id="softShadow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="0.8" />
              <feOffset dx="1" dy="0" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* ondulação orgânica com intensidade menor */}
            <filter id="flagWave" filterUnits="userSpaceOnUse" x="1038" y="540" width="190" height="80">
              <feTurbulence type="fractalNoise" baseFrequency="0.012 0.04" numOctaves="2" seed="7">
                <animate attributeName="baseFrequency"
                  dur="6s"
                  values="0.012 0.040; 0.018 0.055; 0.012 0.040"
                  repeatCount="indefinite" />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" scale="6" xChannelSelector="R" yChannelSelector="G">
                <animate attributeName="scale"
                  dur="6s"
                  values="4;6;5;6;4"
                  repeatCount="indefinite" />
              </feDisplacementMap>
            </filter>
            <clipPath id="flagClip">
              <rect x="1043" y="540" width="180" height="74" />
            </clipPath>


          </defs>

          {/* Céu */}
          <rect x="0" y="0" width="1440" height="900" fill="url(#sky)" />

          {/* Colinas/Terra */}
          <path className="hillA" d="M0 640 C 260 600 560 680 820 640 C 1080 600 1250 660 1440 620 L1440 900 L0 900 Z" fill="url(#hillA)" />
          <path className="hillB" d="M0 700 C 300 660 560 730 820 700 C 1100 660 1240 710 1440 680 L1440 900 L0 900 Z" fill="url(#hillB)" />

          {/* Green + bandeira (polo no x=1043) */}
          <g className="gb-green">
            {/* green / sombra do buraco */}
            <ellipse cx="1040" cy="710" rx="170" ry="50" fill="#88d19a" />
            <ellipse cx="1040" cy="718" rx="48" ry="18" fill="rgba(11,61,46,.60)" />

            {/* mastro com leve oscilação */}
            <g className="gb-flag">
              <rect className="pole" x="1037" y="520" width="6" height="190" rx="2" fill="#1b4d3a" filter="url(#softShadow)" />
              <rect x="1041" y="544" width="4" height="26" rx="2" fill="#c9d6d0" />

              {/* pano único com filtro de ondulação + brilho */}
              <g className="cloth" filter="url(#flagWave)" clipPath="url(#flagClip)">
                <path
                  className="flag-main"
                  d="M1043 544
                    C 1120 558, 1184 572, 1214 584
                    L 1214 606
                    C 1178 594, 1112 578, 1043 566
                    Z"
                  fill="url(#flagRed)"
                />
                <path
                  d="M1043 546
                    C 1108 558, 1172 572, 1208 584
                    L 1208 594
                    C 1174 582, 1108 568, 1043 558
                    Z"
                  fill="url(#flagGloss)"
                  opacity=".45"
                />
                <path d="M1043 566 C 1112 578, 1178 594, 1214 606"
                  stroke="rgba(0,0,0,.18)" strokeWidth="2" fill="none" />
              </g>
            </g>
          </g>

        </svg>
      </div>

       {/* camada de nuvens (JS) */}
      <div className="gb-cloud-layer" aria-hidden="true">
        {clouds.map((c) => {
          const depth = Math.min(Math.max((c.topVH - 8) / 10, 0), 1);
          const alpha = 0.95 - depth * 0.3;
          return (
            <div
              key={c.id}
              className="cloud-js"
              style={{
                top: `calc(${c.topVH}vh)`,
                animationDuration: `${c.duration}s`,
                animationDelay: `${c.delay}s`,
                transform: `scale(${c.scale})`,
                opacity: alpha
              }}
              onAnimationEnd={() => recycle(c.id)}
            >
              <div className="puff p1" />
              <div className="puff p2" />
              <div className="puff p3" />
            </div>
          );
        })}
      </div>

      {/* card de boas-vindas */}
      <div className="gb-hero-card" role="dialog" aria-label={hero.heroLabel}>
        <h1>{hero.title}</h1>
        <p>{hero.subtitle}</p>
        <a className="gb-cta" href={hero.ctaHref}>{hero.ctaLabel}</a>
      </div>
    </section>
  );
}
