import React from "react";

export default function SobreSection({
  imageSrc = "/assets/img/sobre/background.png",
}) {
  return (
    <section id="sobre" className="gb-section sobre" role="region" aria-label="Sobre o projeto">
      <div className="gb-shell">
        <div className="sobre-grid">
          {/* Coluna de texto */}
          <div className="sobre-copy">
            <h2 className="sobre-title">
              <span className="dropcap">S</span>obre
            </h2>

            <p className="sobre-intro">
              O <b>GolfeBits</b> foi desenvolvido para um <strong>trabalho escolar em espanhol</strong>.
              Por isso, inicalmente o site vem com o idioma espanhol. Se preferir, você pode <strong>trocar para português</strong>
              a qualquer momento.
            </p>

            <p className="sobre-paragraph">
              Aqui você encontra conteúdos sobre regras básicas, equipamentos,
              pontuação e etiqueta. Tudo de maneira visual, direta e amigável
              para quem está começando.
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
