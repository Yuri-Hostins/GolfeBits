import React from "react";
import Navbar from "../components/layout/navbar";
import Banner from "../components/homepage/banner";
import Sobre from "../components/homepage/sobre";
import Promo from "../components/homepage/PromoStrip";
import Conteudos from "../components/homepage/conteudos";
import Integrantes from "../components/homepage/integrantes";
import Contato from "../components/homepage/contato";
import Footer from "../components/layout/footer";

import "../styles/home.css";

export default function Homepage() {
  return (
    <div id="homepage">
       <Navbar />
       <Banner />
       <Sobre />
       <Promo />
       <Conteudos />
       <Integrantes />
       <Contato />
       <Footer />

    </div>
  );
}
