import React from "react";
import { useI18n } from "../i18n/I18nProvider";

export default function LanguageSwitcher({ compact = false }) {
  const { lang, setLang, available } = useI18n();

  if (compact) {
    const next = lang === "pt" ? "es" : "pt";
    const flagBR = `${process.env.PUBLIC_URL}/assets/img/bandeira/brasil.png`;
    const flagES = `${process.env.PUBLIC_URL}/assets/img/bandeira/espanha.png`;
    const isPT = lang === "pt";

    return (
      <button
        className="gb-langbtn"
        aria-label={isPT ? "Cambiar a español" : "Mudar para português (Brasil)"}
        title={isPT ? "Cambiar a español" : "Mudar para português (Brasil)"}
        onClick={() => setLang(next)}
        type="button"
      >
        <img
          className="gb-flag"
          src={isPT ? flagBR : flagES}
          alt={isPT ? "Português (Brasil)" : "Español"}
        />
        <span className="gb-langcode" aria-hidden="true">
          {lang.toUpperCase()}
        </span>
      </button>
    );
  }

  return (
    <select
      className="lang-select"
      value={lang}
      onChange={(e) => setLang(e.target.value)}
      aria-label="Idioma"
    >
      {available.map((l) => (
        <option key={l.code} value={l.code}>
          {l.label}
        </option>
      ))}
    </select>
  );
}
