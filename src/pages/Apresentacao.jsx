import React, { useEffect, useRef, useState } from "react";
import { useI18n } from "../i18n/I18nProvider";
import { DICTS } from "../i18n/langs";
import Navbar from "../components/layout/navbar";
import "../styles/apresentacao/slides.css";

export default function Slides() {
  const { lang } = useI18n();
  const L = (DICTS[lang] || DICTS.pt).slides;
  const slides = L.items;

  const [idx, setIdx] = useState(0);
  const max = slides.length;
  const canPrev = idx > 0;
  const canNext = idx < max - 1;

  const go = (d) => setIdx((i) => Math.max(0, Math.min(max - 1, i + d)));
  const goTo = (i) => setIdx(() => Math.max(0, Math.min(max - 1, i)));

  // teclado
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") go(1);
      if (e.key === "ArrowLeft" || e.key === "PageUp") go(-1);
      if (e.key === "Home") goTo(0);
      if (e.key === "End") goTo(max - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [max]);

  // swipe
  const vpRef = useRef(null);
  useEffect(() => {
    const el = vpRef.current;
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
      if (dx > 60) go(-1);
      else if (dx < -60) go(1);
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
  }, []);

  const progress = ((idx + 1) / max) * 100;

  useEffect(() => {
    const urls = [slides[idx]?.bg, slides[idx + 1]?.bg].filter(Boolean);
    urls.forEach((src) => { const im = new Image(); im.src = src; });
  }, [idx, slides]);

  return (
    <main className="slides-page" role="region" aria-label={L.aria.section}>
      <Navbar />

      <div className="slide-viewport" ref={vpRef}>
        {slides.map((s, i) => {
          const hasVideo = !!s.video || !!s.youtube;
          const useBg = !!(s.bg && (!s.img || s.keepBg) && !hasVideo);

          const side = s.side === "right" ? "right" : "left";
          const split = !!(s.img || (hasVideo && s.layout === "split"));

          return (
            <article
              key={s.id || i}
              className={`slide ${useBg ? "has-bg" : ""} ${i === idx ? "is-active" : "is-hidden"}`}
              style={useBg ? { backgroundImage: `url(${s.bg})` } : undefined}
              aria-hidden={i !== idx}
            >
              <div className={`slide-inner ${split ? "split" : ""} side-${side} ${hasVideo && !split ? "video-full" : ""}`}>

                {/* BLOCO VISUAL: imagem OU vídeo */}
                {/* BLOCO VISUAL: imagem OU vídeo OU pôster-link */}
                {(s.img || hasVideo) && (
                  <figure className={`slide-figure ${hasVideo ? "is-video" : ""}`} aria-hidden={false}>
                    {s.img && <img src={s.img} alt={s.imgAlt || ""} loading="lazy" />}

                    {/* >>> NOVO: pôster que abre YouTube em nova aba */}
                    {s.video?.poster && (s.video?.link || s.youtube) && !s.video?.src && (
                      <a
                        className="video-poster-link"
                        href={s.video.link || `https://www.youtube.com/watch?v=${s.youtube}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.title}
                      >
                        <img src={s.video.poster} alt="" loading="lazy" />
                        <span className="poster-play">
                          ▶ {lang === "pt" ? "Assistir no YouTube" : "Ver en YouTube"}
                        </span>
                      </a>
                    )}

                    {/* YouTube EMBED (se houver s.youtube e você quiser embed) */}
                    {s.youtube && !s.video?.poster && (
                      <div className="video-embed">
                        <iframe
                          src={`https://www.youtube.com/embed/${s.youtube}?rel=0`}
                          title={s.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          loading="lazy"
                        />
                      </div>
                    )}

                    {/* VÍDEO LOCAL (mp4/webm) */}
                    {s.video?.src && (
                      <video controls playsInline preload="metadata" poster={s.video?.poster}>
                        <source
                          src={s.video.src}
                          type={
                            s.video.src.endsWith(".webm") ? "video/webm" :
                              s.video.src.endsWith(".ogg") ? "video/ogg" : "video/mp4"
                          }
                        />
                        {(s.video.tracks || []).map((t, k) => (
                          <track key={k} src={t.src} srcLang={t.srclang} kind="subtitles" label={t.label} />
                        ))}
                        Seu navegador não suporta o elemento de vídeo.
                      </video>
                    )}
                  </figure>
                )}


                {/* TEXTO */}
                <div className="slide-content">
                  <header className="slide-header">
                    <h1 className="slide-title">{s.title}</h1>
                    {s.subtitle && <p className="slide-sub">{s.subtitle}</p>}
                  </header>

                  {Array.isArray(s.bullets) && s.bullets.length > 0 && (
                    <ul className="slide-list">
                      {s.bullets.map((b, j) => <li key={j}>{b}</li>)}
                    </ul>
                  )}

                  {i === 0 && (
                    <button className="slide-start" onClick={() => go(1)}>
                      {L.start}
                    </button>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="slides-progress" aria-hidden="true">
        <div className="bar" style={{ width: `${progress}%` }} />
      </div>

      <nav className="slides-nav" aria-label="Slides">
        <button className="snav prev" onClick={() => go(-1)} disabled={!canPrev} aria-label={L.aria.prev}>‹</button>
        <button className="snav next" onClick={() => go(1)} disabled={!canNext} aria-label={L.aria.next}>›</button>
      </nav>
    </main>
  );
}