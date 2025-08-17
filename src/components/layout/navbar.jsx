import React, { useEffect, useState } from "react";
import "../../styles/layout/navbar.css";

const logoUrl = `${process.env.PUBLIC_URL}/assets/img/logo.png`; // ou simplesmente "/assets/img/logo.png"

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 860) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
   <header className="gb-navbar">
      <div className="gb-nav-inner">
        <div className="gb-brand">
          <a href="#banner" className="gb-logoLink" aria-label="GolfeBits — Início">
            <img
              className="gb-logo"
              src={logoUrl}
              alt="GolfeBits"
              width="34"
              height="34"
              loading="eager"
              fetchpriority="high"
              decoding="async"
            />
          </a>
          |
          <strong className="gb-brand-text">GolfeBits</strong>
        </div>

        {/* Botão hamburguer */}
        <button
          className={`gb-menu-btn ${open ? "is-open" : ""}`}
          aria-label="Abrir menu de navegação"
          aria-controls="gb-primary-nav"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="gb-menu-line" />
          <span className="gb-menu-line" />
          <span className="gb-menu-line" />
        </button>

        <nav
          id="gb-primary-nav"
          className={`gb-nav-links ${open ? "is-open" : ""}`}
          aria-label="Navegação principal"
        >
          <a href="#banner" onClick={closeMenu}>Início</a>
          <a href="#sobre" onClick={closeMenu}>Sobre</a>
          <a href="#conteudos" onClick={closeMenu}>Conteúdos</a>
          <a href="#contato" onClick={closeMenu}>Contato</a>
        </nav>
      </div>

      {open && <button className="gb-overlay" aria-label="Fechar menu" onClick={closeMenu} />}
    </header>
  );
}
