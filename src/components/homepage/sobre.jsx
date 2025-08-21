import React from "react";
import { useI18n } from "../../i18n/I18nProvider";
import { DICTS } from "../../i18n/langs";

export default function SobreSection({
  imageSrc = "/assets/img/sobre/background.png",
}) {
  const { lang } = useI18n();
  const L = DICTS[lang] || DICTS.pt;

  const title = L.about.title;
  const first = title.slice(0, 1);
  const rest = title.slice(1);

  return (
    <section
      id="sobre"
      className="gb-section sobre"
      role="region"
      aria-label={L.about.a11y.section}
    >
      <div className="gb-shell">
        <div className="sobre-grid">
          {/* Coluna de texto */}
          <div className="sobre-copy">
            <h2 className="sobre-title">
              <span className="dropcap">{first}</span>{rest}
            </h2>

            <p className="sobre-intro">
              <b>GolfeBits</b> {L.about.introAfterName}
            </p>

            <p className="sobre-paragraph">
              {L.about.body}
            </p>
          </div>

          {/* Coluna de imagem */}
          <figure className="sobre-figure" aria-hidden="true">
            <img src={imageSrc} alt="" loading="lazy" />
          </figure>
        </div>
      </div>
    </section>
  );
}
