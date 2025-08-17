import React, { useEffect, useRef, useState } from "react";

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

const DEFAULT_ITEMS = [
  {
    id: "apresentacao",
    icon: "option",
    color: "#17A673",
    titulo: "Apresentação do trabalho",
    texto:
      "Esporte de precisão: acerte a bola no buraco com o menor número de tacadas.",
    pontos: [
      "Campo com 18 buracos (padrão)",
      "Menos tacadas = melhor",
      "Etiqueta e segurança",
    ],
    href: "#/conteudos/golfe"
  },
  {
    id: "oque-e-golfe",
    icon: "golfe",
    color: "#17A673",
    titulo: "O que é golfe",
    texto:
      "Esporte de precisão: acerte a bola no buraco com o menor número de tacadas.",
    pontos: [
      "Campo com 18 buracos (padrão)",
      "Menos tacadas = melhor",
      "Etiqueta e segurança",
    ],
    href: "#/conteudos/golfe"
  },
  {
    id: "regras-basicas",
    icon: "regras",
    color: "#2E7DD7",
    titulo: "Regras básicas",
    texto:
      "Jogue a bola como ela está, conte cada tacada e respeite o ritmo de jogo.",
    href: "#/conteudos/regras"
  },
  {
    id: "equipamentos",
    icon: "equip",
    color: "#D9822B",
    titulo: "Equipamentos",
    texto:
      "Tacos (driver, ferros, wedges, putter), bolas, tees, luva e marcador.",
    href: "#/conteudos/equipamentos"
  }
];
// ConteudosSection.jsx (só a parte do map)
const ACCENTS = ["#16a34a", "#2563eb", "#f59e0b", "#8b5cf6"]; // verde, azul, laranja, roxo


export default function ConteudosSection({ items = DEFAULT_ITEMS }) {
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
    if (e.key === "ArrowLeft")  { e.preventDefault(); scrollByDir(-1); }
  };

  const listId = "conteudos-track";

  return (
    <section id="conteudos" className="gb-section gb-section-alt" role="region" aria-label="Conteúdos do site">
      <div className="gb-shell">
        <div className="gb-section-head">
          <h2 className="conteudos-title"><span className="dropcap">C</span>onteudos</h2>
          <p className="conteudos-sub">
            Tudo o que você precisa para começar no golfe, organizado em tópicos curtos.
          </p>
        </div>

        {/* BLOCO DO CARROSSEL (as setas ficam FORA do wrap) */}
        <div className="conteudos-block">
          <button
            type="button"
            className="row-nav outside prev"
            aria-label="Mostrar cards anteriores"
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
              {items.map((item) => (
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
                    <a className="cc-cta" href={item.href} aria-label={`Abrir: ${item.titulo}`}>
                      Abrir guia
                      <svg className="i-arrow" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M5 12h12M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2"
                              strokeLinecap="round" strokeLinejoin="round" />
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
            aria-label="Mostrar próximos cards"
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