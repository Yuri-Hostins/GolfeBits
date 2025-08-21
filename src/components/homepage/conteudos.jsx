  import React, { useEffect, useRef, useState } from "react";
  import { useI18n } from "../../i18n/I18nProvider";
  import { DICTS } from "../../i18n/langs";

  /* Ícones simples em SVG */
  function Icon({ name }) {
    const common = { width: 28, height: 28, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
    switch (name) {
      case "golfe":
        return (
          <svg {...common} aria-hidden="true">
            <circle cx="8" cy="8" r="4" />
            <path d="M8 12v8" />
            <path d="M16 3l-6 3 6 3V3z" />
          </svg>
        );
      case "regras":
        return (
          <svg {...common} aria-hidden="true">
            <rect x="4" y="3" width="16" height="18" rx="2" />
            <path d="M8 7h8M8 11h8M8 15h6" />
          </svg>
        );
      case "equip":
        return (
          <svg {...common} aria-hidden="true">
            <path d="M6 20v-7a4 4 0 1 1 8 0v7" />
            <path d="M14 7l4-2" />
            <path d="M10 4l1.5 3" />
          </svg>
        );
      case "score":
        return (
          <svg {...common} aria-hidden="true">
            <path d="M3 3h18v6H3z" />
            <path d="M7 21V9m5 12V9m5 12V9" />
          </svg>
        );
      default:
        return <svg {...common} aria-hidden="true"><circle cx="12" cy="12" r="9" /></svg>;
    }
  }
  // ConteudosSection.jsx (só a parte do map)
  const ACCENTS = ["#16a34a", "#2563eb", "#f59e0b", "#8b5cf6"]; // verde, azul, laranja, roxo


  export default function ConteudosSection() {
    const { lang } = useI18n();
    const L = (DICTS[lang] || DICTS.pt).contents;

    // monta os cards a partir do dicionário (textos curtos e objetivos)
    const CARDS = [
      {
        id: "apresentacao",
        icon: "intro",
        color: ACCENTS[3],
        titulo: L.cards.apresentacao.title,
        texto: L.cards.apresentacao.text,
        pontos: L.cards.apresentacao.bullets,
        href: L.cards.apresentacao.href,
      },
      {
        id: "oque-e-golfe",
        icon: "golfe",
        color: ACCENTS[0],
        titulo: L.cards.oquee.title,
        texto: L.cards.oquee.text,
        pontos: L.cards.oquee.bullets,
        href: L.cards.oquee.href,
      },
      {
        id: "regras-basicas",
        icon: "regras",
        color: ACCENTS[1],
        titulo: L.cards.regras.title,
        texto: L.cards.regras.text,
        pontos: L.cards.regras.bullets,
        href: L.cards.regras.href,
      },
      {
        id: "equipamentos",
        icon: "equip",
        color: ACCENTS[2],
        titulo: L.cards.equipamentos.title,
        texto: L.cards.equipamentos.text,
        pontos: L.cards.equipamentos.bullets,
        href: L.cards.equipamentos.href,
      },
    ];

    const trackRef = useRef(null);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(true);

    const updateNav = () => {
      const el = trackRef.current;
      if (!el) return;
      setCanPrev(el.scrollLeft > 0);
      setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };

    const scrollByDir = (dir) => {
      const el = trackRef.current;
      if (!el) return;
      const card = el.querySelector(".conteudo-card");
      const gap = 16;
      const step = card ? card.offsetWidth + gap : Math.max(el.clientWidth * 0.85, 320);
      el.scrollBy({ left: dir * step, behavior: "smooth" });
    };

    useEffect(() => {
      updateNav();
      const el = trackRef.current;
      if (!el) return;
      const onScroll = () => updateNav();
      el.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", updateNav);
      return () => {
        el.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", updateNav);
      };
    }, []);

    const onKeyDown = (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); scrollByDir(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); scrollByDir(-1); }
    };

    const listId = "conteudos-track";

    const title = L?.title ?? "";
    const first = title.charAt(0);
    const rest = title.slice(1);

    return (
      <section
        id="conteudos"
        className="gb-section gb-section-alt"
        role="region"
        aria-label={L.aria}
      >
        <div className="gb-shell">
          <div className="gb-section-head">
            <h2 className="conteudos-title">
              <span className="dropcap">{first}</span>{rest}
            </h2>
            <p className="conteudos-sub">{L.subtitle}</p>
          </div>

          {/* bloco do carrossel */}
          <div className="conteudos-block">
            <button
              type="button"
              className="row-nav outside prev"
              aria-label={lang === "pt" ? "Mostrar cards anteriores" : "Mostrar tarjetas anteriores"}
              aria-controls={listId}
              onClick={() => scrollByDir(-1)}
              disabled={!canPrev}
            >
              ‹
            </button>

            <div className="conteudos-row-wrap">
              <div
                id={listId}
                className="conteudos-row"
                ref={trackRef}
                role="list"
                tabIndex={0}
                onKeyDown={onKeyDown}
              >
                {CARDS.map((item) => (
                  <article
                    key={item.id}
                    role="listitem"
                    className="conteudo-card v2"
                    style={{ "--accentCard": item.color }}
                    tabIndex={-1}
                  >
                    <div className="cc-head">
                      <span className="cc-icon"><Icon name={item.icon} /></span>
                      <h3 className="cc-title">{item.titulo}</h3>
                    </div>

                    <p className="cc-text">{item.texto}</p>

                    {Array.isArray(item.pontos) && item.pontos.length > 0 && (
                      <ul className="conteudo-lista">
                        {item.pontos.map((p, i) => <li key={i}>{p}</li>)}
                      </ul>
                    )}

                    <div className="cc-footer">
                      <a
                        className="cc-cta"
                        href={item.href}
                        aria-label={`${L.cta}: ${item.titulo}`}
                      >
                        {L.cta}
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
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="row-nav outside next"
              aria-label={lang === "pt" ? "Mostrar próximos cards" : "Mostrar próximas tarjetas"}
              aria-controls={listId}
              onClick={() => scrollByDir(1)}
              disabled={!canNext}
            >
              ›
            </button>
          </div>
        </div>
      </section>
    );
  }