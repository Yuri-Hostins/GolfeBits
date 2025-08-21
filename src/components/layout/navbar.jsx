// src/components/layout/navbar.jsx
import React, { useEffect, useState } from "react";
import "../../styles/layout/navbar.css";
import { useI18n } from "../../i18n/I18nProvider";
import { DICTS } from "../../i18n/langs";
import LanguageSwitcher from "../LanguageSwitcher";

const logoUrl = `${process.env.PUBLIC_URL}/assets/img/logo.png`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  const { lang } = useI18n();
  const L = DICTS[lang] || DICTS.pt;

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
        {/* Marca */}
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
          <span className="gb-divider" aria-hidden="true">|</span>
          <strong className="gb-brand-text">GolfeBits</strong>
        </div>

        {/* Toggle de idioma por bandeira */}
        <LanguageSwitcher compact />

        {/* Botão hambúrguer (mobile) */}
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

        {/* Navegação */}
        <nav
          id="gb-primary-nav"
          className={`gb-nav-links ${open ? "is-open" : ""}`}
          aria-label="Navegação principal"
        >
          <a href="#banner" onClick={closeMenu}>{L.nav.home}</a>
          <a href="#sobre" onClick={closeMenu}>{L.nav.about}</a>
          <a href="#conteudos" onClick={closeMenu}>{L.nav.contents}</a>
          <a href="#contato" onClick={closeMenu}>{L.nav.contact}</a>
        </nav>
      </div>

      {open && <button className="gb-overlay" aria-label="Fechar menu" onClick={closeMenu} />}
    </header>
  );
}
