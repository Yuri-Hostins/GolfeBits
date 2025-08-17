import React from "react";
import Navbar from "../components/layout/navbar";
import Banner from "../components/homepage/banner";
import Sobre from "../components/homepage/sobre";
import Promo from "../components/homepage/PromoStrip.jsx";
import Conteudos from "../components/homepage/conteudos";
import Contato from "../components/homepage/contato.jsx";
import Footer from "../components/layout/footer.jsx";

import "../styles/home.css";

export default function Homepage() {
  return (
    <div id="homepage">
       <Navbar />
       <Banner />
       <Sobre />
       <Promo />
       <Conteudos />
       <Contato />
       <Footer />

    </div>
  );
}
