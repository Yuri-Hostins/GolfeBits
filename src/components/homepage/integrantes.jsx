import React, { useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "../../i18n/I18nProvider";
import { DICTS } from "../../i18n/langs";

const MEMBERS = [
  {
    name: "Cleverson Barbosa Matias",
    role: "Pesquisa",
    photo: "/assets/img/team/cleber.jpg",
    avatar: "/assets/img/team/cleber.jpg",
    banner: "/assets/img/team/cleberbg.png",
    backdrop: "/assets/img/team/background.png",
    message:
      "Responsável pela pesquisa e validação das fontes.\nCurte organizar dados e transformar informação bruta em conteúdo claro.",
    instagram: "https://www.instagram.com/cleber.mnz",
    whatsapp:
      "https://api.whatsapp.com/send/?phone=554799504892&text=Olá%21+Estou+entrando+em+contato+porque+gostaria+de+saber+mais+sobre+você%2C+Cleverson.+Peguei+seu+número+no+site+da+ChuvaBits%21&type=phone_number&app_absent=0",
  },
  {
    name: "João Gabriel Lopes tenfen",
    role: "Pesquisa",
    photo: "/assets/img/team/joao.jpg",
    avatar: "/assets/img/team/joao.jpg",
    banner: "/assets/img/team/joaobg.png",
    backdrop: "/assets/img/team/background.png",
    message:
      "Coleta e organiza materiais para os guias.\nFoco em revisão, clareza e confiabilidade do conteúdo.",
    instagram: "https://www.instagram.com/gab_tenf",
    whatsapp:
      "https://api.whatsapp.com/send/?phone=554791606832&text=Olá%21+Estou+entrando+em+contato+porque+gostaria+de+saber+mais+sobre+você%2C+João.+Peguei+seu+número+no+site+da+ChuvaBits%21&type=phone_number&app_absent=0",
  },
  {
    name: "Lucas Roberto Tay",
    role: "Pesquisa",
    photo: "/assets/img/team/lucas.jpg",
    avatar: "/assets/img/team/lucas.jpg",
    banner: "/assets/img/team/lucasbg.png",
    backdrop: "/assets/img/team/background.png",
    message:
      "Pesquisa aplicada e testes práticos dos tópicos.\nAjuda a transformar teoria em exemplos simples e úteis.",
    instagram: "https://www.instagram.com/llucas_rt",
    whatsapp:
      "https://api.whatsapp.com/send/?phone=554796198344&text=Olá%21+Estou+entrando+em+contato+porque+gostaria+de+saber+mais+sobre+você%2C+Lucas.+Peguei+seu+número+no+site+da+ChuvaBits%21&type=phone_number&app_absent=0",
  },
  {
    name: "Yuri Hostins Raimundo",
    role: "Frontend / UX e UI",
    photo: "/assets/img/team/yuri.jpg",
    avatar: "/assets/img/team/yuri.jpg",
    banner: "/assets/img/team/yuribg.png",
    backdrop: "/assets/img/team/background.png",
    message:
      "Sou movido pela paixão por tecnologia, inovação e pelo poder transformador que boas ideias têm na vida das pessoas...",
    instagram: "https://www.instagram.com/yurihr.___",
    whatsapp:
      "https://api.whatsapp.com/send/?phone=554797155070&text=Quero+Reportar+Um+Bug+Ou+Entrar+Em+Contato&type=phone_number&app_absent=0",
  },
];

export default function Integrantes() {
  const { lang } = useI18n();
  const T = DICTS[lang] || DICTS.pt;

  const [idx, setIdx] = useState(0);
  const count = MEMBERS.length;

  // modal
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState(MEMBERS[0]);

  // navegação
  const go = (dir) =>
    setIdx((i) => {
      const ni = (i + dir + count) % count;
      if (open) setSel(MEMBERS[ni]);
      return ni;
    });

  const goTo = (i) => {
    const ni = ((i % count) + count) % count;
    setIdx(ni);
    if (open) setSel(MEMBERS[ni]);
  };

  // posições relativas -2..+2 (mostra centro e vizinhos; oposto fica oculto)
  const deltas = useMemo(() => {
    return MEMBERS.map((_, i) => {
      let d = i - idx;
      if (d > count / 2) d -= count;
      if (d < -count / 2) d += count;
      return d;
    });
  }, [idx, count]);

  const posClass = (i) => {
    const d = deltas[i];
    if (d === 0) return "center";
    if (d === -1) return "left-1";
    if (d === 1) return "right-1";
    if (d === -2 || d === 2) return "hidden";
    return "hidden";
  };

  // teclado + swipe
  const trackRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, open]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let sx = 0, dx = 0, dragging = false;

    const down = (e) => {
      const p = "touches" in e ? e.touches[0] : e;
      dragging = true; sx = p.clientX; dx = 0;
    };
    const move = (e) => {
      if (!dragging) return;
      const p = "touches" in e ? e.touches[0] : e;
      dx = p.clientX - sx;
    };
    const up = () => {
      if (!dragging) return;
      dragging = false;
      if (dx > 50) go(-1);
      else if (dx < -50) go(1);
    };

    el.addEventListener("pointerdown", down, { passive: true });
    el.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup", up);
    el.addEventListener("touchstart", down, { passive: true });
    el.addEventListener("touchmove", move, { passive: true });
    window.addEventListener("touchend", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      el.removeEventListener("touchstart", down);
      el.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", up);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const openModal = (m) => { setSel(m); setOpen(true); };
  const closeModal = () => setOpen(false);

  useEffect(() => { if (open) setSel(MEMBERS[idx]); }, [idx, open]);

  const handleCardClick = (i) => {
    setIdx(i);           // centraliza
    setSel(MEMBERS[i]);  // carrega dados
    setOpen(true);       // abre modal
  };

  // rótulos/aria por idioma
  const ariaPrev = lang === "pt" ? "Anterior" : "Anterior";
  const ariaNext = lang === "pt" ? "Próximo" : "Siguiente";
  const ariaDots = lang === "pt" ? "Selecionar integrante" : "Seleccionar integrante";
  const fotoDe = lang === "pt" ? "foto do" : "foto de";

  // traduz rótulo de cargo quando possível
  const roleLabel = (r) => {
    const s = (r || "").toLowerCase();
    if (s.includes("pesquisa")) return T.roles.research;
    if (s.includes("frontend")) return T.roles.frontend;
    return r;
  };

  return (
    <section id="integrantes">
      <div className="container-about--title">
        <h1 className="about-title">{T.team.title}</h1>
      </div>

      <div className="carousel-container" aria-roledescription="carrossel">
        <button className="nav-arrow left" aria-label={ariaPrev} onClick={() => go(-1)}>‹</button>

        <div className="carousel-track" ref={trackRef}>
          {MEMBERS.map((m, i) => (
            <div
              key={m.name + i}
              className={`card ${posClass(i)}`}
              data-index={i}
              role="button"
              tabIndex={0}
              aria-current={i === idx ? "true" : undefined}
              onClick={() => handleCardClick(i)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleCardClick(i)}
            >
              <img src={m.photo} alt={`${fotoDe} ${m.name}`} />
            </div>
          ))}
        </div>

        <button className="nav-arrow right" aria-label={ariaNext} onClick={() => go(1)}>›</button>
      </div>

      <div className="member-info">
        <h2 className="member-name">{MEMBERS[idx].name}</h2>
        <p className="member-role">{roleLabel(MEMBERS[idx].role)}</p>
      </div>

      <div className="dots" role="tablist" aria-label={ariaDots}>
        {MEMBERS.map((_, i) => (
          <div
            key={i}
            className={`dot ${i === idx ? "active" : ""}`}
            data-index={i}
            role="button"
            tabIndex={0}
            onClick={() => goTo(i)}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && goTo(i)}
          />
        ))}
      </div>

      {/* MODAL */}
      {open && (
        <div
          id="modalPerfil"
          className="w-full h-full bg-center overflow-auto active"
          style={{ '--modal-bg': `url('${sel.backdrop || sel.banner || sel.photo}')` }}
          onClick={(e) => e.target.id === "modalPerfil" && closeModal()}
        >
          <div className="modal-content">
            <div className="max-w-4xl mx-auto p-4 text-[#222324]">
              <div className="bg-[#FBFBFB] rounded-[20px] p-4 pb-6 relative">
                <button id="closeModal" onClick={closeModal} aria-label={T.modal.close}>X</button>

                {/* banner DO MODAL (topo do card) */}
                <div className="h-[240px] md:h-[170px] rounded-[20px] overflow-hidden modal-hero">
                  <img
                    id="bannerIntegrante"
                    className="w-full h-full object-cover"
                    src={sel.banner || sel.photo}
                    alt=""
                  />
                </div>

                <div className="w-[140px] h-[140px] p-[5px] bg-white rounded-full overflow-hidden relative z-10 -mt-20 ml-4 md:mx-auto">
                  <img
                    id="fotodeperfilIntegrante"
                    className="w-full h-full rounded-full"
                    src={sel.avatar || sel.photo}
                    alt=""
                  />
                </div>

                <div className="flex flex-wrap justify-center px-6 gap-x-10 gap-y-4 mt-4">
                  <div className="flex-1 min-w-[300px] text-center md:text-left">
                    <div id="Container_NomeIntegrante" className="flex items-center justify-center md:justify-start gap-4">
                      <h1 id="NomeIntegrante" className="text-[22px] font-semibold text-[#222324]">
                        {sel.name}
                      </h1>
                    </div>

                    <p className="text-xs font-medium text-[#6F6F70] my-2">{roleLabel(sel.role)}</p>
                    <p id="mensagemIntegrante" className="text-sm text-[#6F6F70]" style={{ whiteSpace: "pre-line" }}>
                      {sel.message || ""}
                    </p>
                  </div>
                </div>

                <div className="container-contato">
                  {sel.instagram && (
                    <div>
                      <a
                        id="instagramProfile"
                        className="botao-contato in-botao box-botao"
                        href={sel.instagram}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Instagram"
                      >
                        <span className="text-botao">{T.modal.instagram}</span>
                        <svg width="40" height="40" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                        </svg>
                      </a>
                    </div>
                  )}
                  {sel.whatsapp && (
                    <div>
                      <a
                        id="whatsappProfile"
                        className="botao-contato wh-botao box-botao"
                        href={sel.whatsapp}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Whatsapp"
                      >
                        <span className="text-botao">{T.modal.whatsapp}</span>
                        <svg width="40" height="40" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
