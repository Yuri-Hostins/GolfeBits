export const DICTS = {
  pt: {
    nav: { home: "Início", about: "Sobre", contents: "Conteúdos", contact: "Contato", slides: "Slides" },
    team: { title: "Integrantes" },
    roles: { research: "Pesquisa", frontend: "Frontend / UX e UI" },
    modal: { close: "Fechar", instagram: "Instagram", whatsapp: "Whatsapp" },

    banner: {
      title: "Bem-vindo ao GolfeBits",
      subtitle: "Guia simples e visual sobre golfe: regras, equipamentos, pontuação e muito mais.",
      cta: "Explorar conteúdos",
      a11y: {
        scene: "Ambiente do campo (céu, colinas e nuvens)",
        hero: "Boas-vindas"
      }
    },
    about: {
      title: "Sobre",
      introAfterName:
        "foi desenvolvido para um trabalho escolar em espanhol. Por isso, inicialmente o site vem com o idioma espanhol. Se preferir, você pode trocar para português a qualquer momento.",
      body:
        "Aqui você encontra conteúdos sobre regras básicas, equipamentos, pontuação e etiqueta. Tudo de maneira visual, direta e amigável para quem está começando.",
      a11y: { section: "Sobre o projeto" }
    },
    promo: {
      aria: { section: "Destaque do site" },
      eyebrow: "Destaque",
      title: "Conheça a HRTech",
      subtitle: "Uma das empresas mais promissoras da região!",
      linkLabel: "Ver website"
    },
    contents: {
      aria: "Conteúdos do site",
      title: "Conteúdos",
      subtitle: "Aprenda rápido: guias curtos e diretos.",
      cta: "Abrir guia",
      cards: {
        apresentacao: {
          title: "Apresentação",
          text: "Como o projeto funciona e o que você vai encontrar.",
          bullets: ["Objetivo do site", "Como navegar", "Créditos & fontes"],
          href: "/apresentacao2"
        },
        oquee: {
          title: "O que é golfe",
          text: "A base do esporte em 1 minuto.",
          bullets: ["Meta: menos tacadas", "Buracos e par", "Etiqueta"],
          href: "#/conteudos/golfe"
        },
        regras: {
          title: "Regras básicas",
          text: "O essencial para jogar certo.",
          bullets: ["Jogue a bola como está", "Conte cada tacada", "Mantenha o ritmo"],
          href: "#/conteudos/regras"
        },
        equipamentos: {
          title: "Equipamentos",
          text: "O kit ideal para começar.",
          bullets: ["Tacos principais", "Bolas e tees", "Luva & marcador"],
          href: "#/conteudos/equipamentos"
        }
      }
    },

    contact: {
      aria: { section: "Contato" },
      title: "Contato",
      intro: "Fale com a equipe do trabalho para sugestões ou dúvidas.",
      form: {
        nome: "Nome",
        email: "E-mail",
        mensagem: "Mensagem",
        placeholders: {
          nome: "Seu nome",
          email: "seu@email.com",
          mensagem: "Escreva aqui..."
        },
        honeypot: "Se você é humano, deixe este campo em branco."
      },
      submit: "Enviar",
      sending: "Enviando...",
      status: {
        ok: "Mensagem enviada! Obrigado pelo contato 😊",
        fail: "Ops! Não foi possível enviar agora. Tente novamente em instantes.",
        spam: "Envio bloqueado."
      },
      errors: {
        nome: "Digite seu nome completo.",
        email: "Informe um e-mail válido.",
        msgRequired: "Escreva uma mensagem.",
        msgTooLong: "Sua mensagem excede {max} caracteres."
      }
    },
    footer: {
      aria: { social: "Redes sociais" },
      by: "Desenvolvido por",
      copyright: "©",
      social: {
        github: "GitHub",
        instagram: "Instagram",
        whatsapp: "WhatsApp",
        youtube: "YouTube"
      }
    },
    slides: {
      aria: { section: "Apresentação do trabalho", next: "Próximo slide", prev: "Slide anterior" },
      counter: "{cur} de {total}",
      start: "Começar",
      items: [
        {
          id: "capa", title: "GolfeBits", subtitle: "",
          bullets: ["Trabalho de Espanhol – Golfe",
            "Por Yuri (introdução), João Gabriel (história), Lucas (regras) e Cleverson (equipamentos)."
          ],
          bg: "/assets/img/slides/slide01.png"
        },

        {
          id: "objetivo", title: "História do Golfe",
          bg: "/assets/img/slides/slide02.png",
          bullets: [
            "O golfe teve origem na Escócia no século XV, onde pastores usavam bastões para acertar pedras em buracos no campo. Com o tempo, o jogo se popularizou entre a nobreza escocesa, tornando-se um esporte oficial em 1744, quando surgiram as primeiras regras formais.",
            "No século XIX, o golfe se espalhou para a Inglaterra e Estados Unidos, impulsionado pela criação dos primeiros campos e torneios. O esporte se consolidou como símbolo de tradição, estratégia e precisão.",
            "Hoje, o golfe é praticado em todo o mundo, unindo história, técnica e lazer em um dos esportes mais elegantes e respeitados globalmente."
          ]
        },

        {
          id: "oque", title: "Regras do Golfe",
          bg: "/assets/img/slides/slide03.png",
          bullets: [
            "O golfe é regido por um conjunto de normas internacionais que garantem justiça, respeito e organização no jogo.",
            "Entre as principais regras estão:",
            "O objetivo é colocar a bola no buraco com o menor número de tacadas possível.",
            "A bola deve ser jogada sempre do ponto onde ela para.",
            "Cada campo tem 18 buracos, com diferentes distâncias e obstáculos.",
            "Existem penalidades para situações como bola fora dos limites, em obstáculos de água ou quando é movida de forma irregular.",
            "Essas regras, criadas e atualizadas pelo The R&A e pela USGA, asseguram que o esporte mantenha sua tradição de honra e disciplina."
          ]
        },
        {
          id: "regras", title: "Equipamentos de Golfe",
          bg: "/assets/img/slides/slide04.png",
          bullets: ["O golfe utiliza equipamentos específicos que unem precisão e tradição:",
            "Tacos: existem diferentes tipos (driver, ferros, wedges e putter), cada um para uma situação de jogo.",
            "Bolas: desenvolvidas com tecnologia para garantir distância, controle e efeito.",
            "Tees: suportes usados para iniciar a tacada em cada buraco.",
            "Luvas, sapatos e acessórios: oferecem conforto, firmeza e melhor desempenho.",
            "Cada detalhe do equipamento faz diferença no resultado, tornando o golfe um esporte de técnica e elegância.",
          ]
        },
        {
          id: "video",
          video: {
            poster: "/assets/img/slides/poster.png",
            link: "https://www.youtube.com/watch?v=mmtj5DurYBU"
          }
        }
      ],
    },
  },

  es: {
    nav: { home: "Inicio", about: "Sobre", contents: "Contenidos", contact: "Contacto", slides: "Presentación" },
    team: { title: "Integrantes" },
    roles: { research: "Investigación", frontend: "Frontend / UX y UI" },
    modal: { close: "Cerrar", instagram: "Instagram", whatsapp: "Whatsapp" },

    banner: {
      title: "Bienvenido a GolfeBits",
      subtitle: "Guía sencilla y visual sobre golf: reglas, equipamiento, puntuación y mucho más.",
      cta: "Explorar contenidos",
      a11y: {
        scene: "Entorno del campo (cielo, colinas y nubes)",
        hero: "Bienvenida"
      }
    },
    about: {
      title: "Sobre",
      introAfterName:
        "fue desarrollado para un trabajo escolar en español. Por eso, el sitio viene en español por defecto. Si lo prefieres, puedes cambiar a portugués en cualquier momento.",
      body:
        "Aquí encontrarás contenidos sobre reglas básicas, equipamiento, puntuación y etiqueta. Todo de forma visual, directa y amigable para quien está empezando.",
      a11y: { section: "Acerca del proyecto" }
    },
    promo: {
      aria: { section: "Destacado del sitio" },
      eyebrow: "Destacado",
      title: "Conoce HRTech",
      subtitle: "¡Una de las empresas más prometedoras de la región!",
      linkLabel: "Visitar sitio"
    },
    contents: {
      aria: "Contenidos del sitio",
      title: "Contenidos",
      subtitle: "Aprende rápido: guías cortas y claras.",
      cta: "Abrir guía",
      cards: {
        apresentacao: {
          title: "Presentación",
          text: "Cómo funciona el proyecto y qué vas a encontrar.",
          bullets: ["Objetivo del sitio", "Cómo navegar", "Créditos y fuentes"],
          href: "/apresentacao2"
        },
        oquee: {
          title: "¿Qué es el golf?",
          text: "La base del deporte en 1 minuto.",
          bullets: ["Meta: menos golpes", "Hoyos y par", "Etiqueta"],
          href: "#/contenidos/golf"
        },
        regras: {
          title: "Reglas básicas",
          text: "Lo esencial para jugar bien.",
          bullets: ["Juega la bola como está", "Cuenta cada golpe", "Respeta el ritmo"],
          href: "#/contenidos/reglas"
        },
        equipamentos: {
          title: "Equipamiento",
          text: "El kit ideal para empezar.",
          bullets: ["Palos principales", "Bolas y tees", "Guante y marcador"],
          href: "#/contenidos/equipamiento"
        }
      }
    },
    contact: {
      aria: { section: "Contacto" },
      title: "Contacto",
      intro: "Habla con el equipo para sugerencias o dudas.",
      form: {
        nome: "Nombre",
        email: "Correo",
        mensagem: "Mensaje",
        placeholders: {
          nome: "Tu nombre",
          email: "tu@correo.com",
          mensagem: "Escribe aquí..."
        },
        honeypot: "Si eres humano, deja este campo en blanco."
      },
      submit: "Enviar",
      sending: "Enviando...",
      status: {
        ok: "¡Mensaje enviado! Gracias por contactarnos 😊",
        fail: "Ups, no fue posible enviar ahora. Inténtalo de nuevo en unos instantes.",
        spam: "Envío bloqueado."
      },
      errors: {
        nome: "Escribe tu nombre completo.",
        email: "Introduce un correo válido.",
        msgRequired: "Escribe un mensaje.",
        msgTooLong: "Tu mensaje supera {max} caracteres."
      }
    },
    footer: {
      aria: { social: "Redes sociales" },
      by: "Desarrollado por",
      copyright: "©",
      social: {
        github: "GitHub",
        instagram: "Instagram",
        whatsapp: "WhatsApp",
        youtube: "YouTube"
      }
    },
    slides: {
      aria: { section: "Presentación del trabajo", next: "Siguiente diapositiva", prev: "Diapositiva anterior" },
      counter: "{cur} de {total}",
      start: "Empezar",
      items: [
        {
          id: "capa", title: "GolfeBits", subtitle: "",
          side: "right",
          bullets: ["Trabajo de Español – Golf",
            "Por Yuri (introducción), João Gabriel (historia), Lucas (reglas) y Cleverson (equipos)."
          ],
          bg: "/assets/img/slides/slide01.png",
        },

        {
          id: "objetivo", title: "Historia del Golf",
          bg: "/assets/img/slides/slide02.png",
          bullets: [
            "El golf tuvo su origen en Escocia en el siglo XV, cuando pastores utilizaban palos para golpear piedras hacia agujeros en el campo. Con el tiempo, el juego se popularizó entre la nobleza escocesa y en 1744 se establecieron las primeras reglas oficiales.",
            "En el siglo XIX, el golf se expandió hacia Inglaterra y Estados Unidos, impulsado por la creación de los primeros campos y torneos. Con ello, se consolidó como un deporte de tradición, estrategia y precisión.",
            "Hoy en día, el golf se practica en todo el mundo, combinando historia, técnica y recreación en uno de los deportes más elegantes y respetados globalmente."
          ]
        },

        {
          id: "oque", title: "Reglas del Golf",
          bg: "/assets/img/slides/slide03.png",
          bullets: [
            "El golf está regido por un conjunto de normas internacionales que garantizan la justicia, el respeto y la organización en el juego.",
            "Entre las principales reglas se encuentran:",
            "El objetivo es introducir la bola en el hoyo con el menor número de golpes posible.",
            "La bola debe jugarse siempre desde el lugar donde se detiene.",
            "ada campo cuenta con 18 hoyos, con distintas distancias y obstáculos.",
            "Existen penalizaciones en casos como bola fuera de límites, en obstáculos de agua o cuando se mueve de manera irregular.",
            "Estas reglas, creadas y actualizadas por The R&A y la USGA, aseguran que el deporte mantenga su tradición de honor y disciplina."
          ]
        },

        {
          id: "regras", title: "Equipamiento de Golf",
          bg: "/assets/img/slides/slide04.png",
          bullets: ["El golf requiere un equipamiento específico que combina precisión y tradición:",
            "Palos: existen distintos tipos (driver, hierros, wedges y putter), cada uno para una situación de juego. ",
            "Bolas: diseñadas con tecnología para lograr distancia, control y efecto.",
            "Tees: soportes utilizados para iniciar el golpe en cada hoyo.",
            "Guantes, zapatos y accesorios: aportan comodidad, firmeza y mejor rendimiento.",
            "Cada detalle del equipamiento influye en el resultado, haciendo del golf un deporte de técnica y elegancia."
          ]
        },
        {
          id: "video",
          video: {
            poster: "/assets/img/slides/poster-es.png",
            link: "https://www.youtube.com/watch?v=mmtj5DurYBU"
          }
        }
      ]

    },
  }
};

export const AVAILABLE_LANGS = [
  { code: "pt", label: "Português" },
  { code: "es", label: "Español" }
];
