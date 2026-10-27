/* =========================================================
   ROSA OROYA · PORTFOLIO
   Lógica de la página. No hace falta tocar este archivo
   para cambiar textos o fotos: eso está en index.html.
   ========================================================= */

/* ---------- Fade suave al hacer scroll ---------- */
(function revealOnScroll() {
  const items = document.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  items.forEach((el) => observer.observe(el));
})();

/* ---------- Cartel: fichas desplegables ----------
   Cada botón [data-ficha="ID"] abre la ficha con ese id.
   Solo una abierta a la vez; se cierra con "✕ cerrar",
   tocando otra vez el nombre o con la tecla Escape. */
(function cartelFichas() {
  const triggers = document.querySelectorAll("[data-ficha]");
  if (!triggers.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let openFicha = null;
  let lastTrigger = null;

  // Estado inicial accesible
  triggers.forEach((btn) => {
    btn.setAttribute("aria-controls", btn.dataset.ficha);
    btn.setAttribute("aria-expanded", "false");
  });

  function setExpanded(fichaId, value) {
    triggers.forEach((btn) => {
      if (btn.dataset.ficha === fichaId) btn.setAttribute("aria-expanded", String(value));
    });
  }

  function close(returnFocus) {
    if (!openFicha) return;
    openFicha.hidden = true;
    setExpanded(openFicha.id, false);
    openFicha = null;
    if (returnFocus && lastTrigger) lastTrigger.focus();
  }

  function open(ficha, trigger) {
    close(false);
    ficha.hidden = false;
    setExpanded(ficha.id, true);
    openFicha = ficha;
    lastTrigger = trigger;

    ficha.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    ficha.querySelector("h3").focus({ preventScroll: true });
  }

  triggers.forEach((btn) => {
    btn.addEventListener("click", () => {
      const ficha = document.getElementById(btn.dataset.ficha);
      if (!ficha) return;
      if (ficha === openFicha) close(true);
      else open(ficha, btn);
    });
  });

  document.querySelectorAll(".ficha-close").forEach((btn) => {
    btn.addEventListener("click", () => close(true));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close(true);
  });
})();

/* ---------- Franja de bienvenida BIME ----------
   rosaoroya.com/bime redirige aquí con ?desde=bime */
(function welcomeBand() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("desde") === "bime") {
    const band = document.getElementById("welcome-bime");
    if (band) band.hidden = false;
  }
})();

/* ---------- Selector de idioma ---------- */
(function languageToggle() {
  const button = document.getElementById("language-toggle");
  if (!button) return;

  const translations = {
    "Saltar al contenido": "Skip to content",
    "¡Encantada de conocerte en BIME! Aquí tienes lo que he hecho y cómo contactarme.": "It was lovely meeting you at BIME! Here's what I've worked on and how to get in touch.",
    "Navegación principal": "Main navigation",
    "Cartel": "Selected work",
    "Historia": "My story",
    "Contacto": "Contact",
    "Rosa Oroya bailando con los brazos abiertos en una pista llena de gente": "Rosa Oroya dancing with her arms open in a crowded dancefloor",
    "EDICIÓN 2026 · BILBAO · EDICIÓN 2026 · BILBAO ·": "2026 EDITION · BILBAO · 2026 EDITION · BILBAO ·",
    "Me gusta hacer": "I love making",
    "que las cosas": "things",
    "pasen": "happen",
    "Periodista que se mueve entre medios y eventos.": "A journalist working across media and live events.",
    "Marketing, brand partnerships y activaciones de marca": "Marketing, brand partnerships and brand activations",
    "en medios de comunicación y festivales de gran formato.": "for media outlets and major festivals.",
    "Abierta a cambiar de ciudad": "Open to relocating",
    "Disponible": "Available",
    "Ver el cartel ↓": "Explore my work ↓",
    "Descarga mi CV": "Download my CV",
    "01 — El cartel": "01 — Selected work",
    "Toca un nombre ↓": "Tap a name ↓",
    "Rosa Oroya presenta": "Rosa Oroya presents",
    "Lo que he": "What I've",
    "hecho": "done",
    "hasta hoy": "so far",
    "Escenario festivales · Last Tour": "Festivals stage · Last Tour",
    "Escenario medios": "Media stage",
    "Escenario propio": "My own stage",
    "Organiza:": "Organised by:",
    "Puertas:": "Doors:",
    "abiertas a nuevos proyectos": "open to new projects",
    "Gira:": "On tour:",
    "Bilbao y donde haga falta": "Bilbao and wherever I'm needed",
    "Festivales Last Tour": "Last Tour festivals",
    "cerrar": "close",
    "Público frente al escenario principal de un festival al atardecer": "Crowd in front of a festival's main stage at sunset",
    "Dónde:": "Where:",
    "Mi papel:": "My role:",
    "Marcas:": "Brands:",
    "Qué hice:": "What I did:",
    "En vídeo:": "Watch:",
    "Last Tour · 2026": "Last Tour · 2026",
    "Apoyo a la coordinación de partners estratégicos.": "Supported the coordination of strategic partners.",
    "San Miguel, Coca-Cola, Fundación BBK.": "San Miguel, Coca-Cola, Fundación BBK.",
    "Comunicación con marcas, agencias y proveedores; seguimiento de presupuestos, invitaciones y certificados.": "Communicated with brands, agencies and suppliers; tracked budgets, invitations and certificates.",
    "Activaciones de Azulmarino en Bilbao BBK Live 2026 y el barco de Bereziak. Di soporte a la coordinación y ejecución de estas activaciones desde el equipo de Brand Partnerships de Last Tour.": "Azulmarino activations at Bilbao BBK Live 2026 and the Bereziak boat. I supported the coordination and delivery of these activations as part of Last Tour's Brand Partnerships team.",
    "→ Ver las activaciones de Azulmarino": "→ Watch the Azulmarino activations",
    "✕": "✕",
    "Last Tour · octubre 2026": "Last Tour · October 2026",
    "Apoyo al equipo de Brand Partnerships en las activaciones de dos marcas patrocinadoras.": "Supported the Brand Partnerships team with activations for two sponsor brands.",
    "Recepción de invitados en eventos privados de marca y revisión de prestaciones antes de cada evento.": "Welcomed guests at private brand events and checked sponsor deliverables before each event.",
    "Programa de la Cadena SER emitiendo en directo desde un set al aire libre": "Cadena SER programme broadcasting live from an outdoor set",
    "Cadena SER Euskadi · 2023–2026": "Cadena SER Euskadi · 2023–2026",
    "Marketing y eventos; después, asesora de publicidad y técnica de marketing.": "Marketing and events; later, advertising consultant and marketing specialist.",
    "Eventos de LOS40, salidas de programa y eventos de networking; propuestas comerciales para instituciones y anunciantes.": "LOS40 events, outside broadcasts and networking events; commercial proposals for institutions and advertisers.",
    "Cadena SER Euskadi": "Cadena SER Euskadi",
    "Eventos y conciertos de LOS40, coordinando dirección, redacción, comercial y proveedores.": "LOS40 events and concerts, coordinating management, editorial, sales and suppliers.",
    "[PENDIENTE: foto ECOdrive]": "[PENDING: ECOdrive photo]",
    "Qué es:": "About:",
    "Programación especial de Cadena SER desde Bilbao ECOdrive, el espacio de movilidad sostenible.": "A special Cadena SER broadcast from Bilbao ECOdrive, a sustainable mobility event.",
    "Lo llevé de principio a fin: coordiné el evento desde el área de marketing.": "I managed it from start to finish, coordinating the event within the marketing team.",
    "Coordinación con dirección, redacción, área comercial y proveedores.": "Coordination with management, editorial, sales and suppliers.",
    "→ Ver el trabajo": "→ See the project",
    "Cadena SER Euskadi · Premios Radio Bilbao a la Excelencia 2024": "Cadena SER Euskadi · Radio Bilbao Excellence Awards 2024",
    "Participé en la organización.": "I helped organise the event.",
    "Reportaje en elDiario.es": "Feature in elDiario.es",
    "«Sin patria y sin techo», reportaje publicado en elDiario.es Euskadi (blog Gazteberri), agosto de 2022.": "“No home, no homeland”, a feature published on elDiario.es Euskadi (Gazteberri blog), August 2022.",
    "De qué trata:": "About the story:",
    "La situación de las personas migrantes sin hogar en Bilbao, con testimonios de personas que han vivido en la calle y de voluntarios de Ongi Etorri Errefuxiatuak, además de datos de Eustat e Ikuspegi.": "The situation of migrants experiencing homelessness in Bilbao, with testimony from people who have lived on the streets and volunteers from Ongi Etorri Errefuxiatuak, alongside data from Eustat and Ikuspegi.",
    "Lo escribí junto a Ana Lee Urrutia Gonzales.": "I co-wrote it with Ana Lee Urrutia Gonzales.",
    "→ Leer el reportaje": "→ Read the feature",
    "Revista digital sobre la música emergente en Bilbao. Proyecto para la UPV/EHU (2022–2023), creada con tres compañeros.": "A digital magazine about Bilbao's emerging music scene. A UPV/EHU project (2022–2023), created with three classmates.",
    "Entrevistas, artículos de opinión y cobertura del BIME.": "Interviews, opinion pieces and BIME coverage.",
    "→ Ver la revista": "→ View the magazine",
    "Captura del reportaje Swing Soul Euskadi: «¡Swing, Clap y Tap! El baile que hace vibrar a Bilbao»": "Screenshot from the Swing Soul Euskadi feature: “Swing, Clap and Tap! The dance that gets Bilbao moving”",
    "Reportaje multimedia sobre la escena del swing en Bilbao. Mi TFG (2024).": "A multimedia feature about Bilbao's swing scene. My final degree project (2024).",
    "Investigación y contacto con profesionales y artistas de la escena local; entrevistas sobre la relación entre música y baile.": "Research and interviews with local professionals and artists about the relationship between music and dance.",
    "→ Ver el reportaje": "→ View the feature",
    "02 — ¿Cómo acabé aquí?": "02 — How did I get here?",
    "Finanzas y periodismo": "Finance and journalism",
    "Contabilidad primero, periodismo después.": "Accounting first, journalism later.",
    "Apareció el marketing": "Then came marketing",
    "Agencia de publicidad: SEM, contenidos.": "Advertising agency: SEM and content.",
    "Medios y eventos": "Media and events",
    "Cadena SER y LOS40: conciertos, proveedores, timings.": "Cadena SER and LOS40: concerts, suppliers and schedules.",
    "Llegó el barro": "Into the thick of it",
    "Festivales y marcas con Last Tour.": "Festivals and brands with Last Tour.",
    "Y cuando juntas las piezas…": "Put all the pieces together…",
    "Estrategia digital · contenidos · Meta Ads · Mailchimp · Canva · Photoshop": "Digital strategy · content · Meta Ads · Mailchimp · Canva · Photoshop",
    "listados · acreditaciones": "guest lists · accreditations",
    "Eventbrite · SeeTickets · listados · acreditaciones": "Eventbrite · SeeTickets · guest lists · accreditations",
    "Eventos / directo": "Events / live",
    "Proveedores · timings · hospitality · incidencias": "Suppliers · schedules · hospitality · troubleshooting",
    "Organización": "Organisation",
    "presupuestos · seguimiento · reporting": "budgets · tracking · reporting",
    "Excel · presupuestos · seguimiento · reporting": "Excel · budgets · tracking · reporting",
    "03 — Contacto": "03 — Contact",
    "¿Hacemos que pasen cosas?": "Shall we make things happen?",
    "¿Hacemos": "Shall we make",
    "que pasen": "things happen",
    "cosas?": "together?",
    "Rosa Oroya sonriendo, mirando por encima del hombro": "Rosa Oroya smiling and looking over her shoulder",
    "Eventos · marketing · patrocinios": "Events · marketing · partnerships",
    "Conectemos en LinkedIn": "Connect on LinkedIn",
    "¿Hablamos? · Email": "Let's talk · Email",
    "Con base en Bilbao · abierta a cambiar de ciudad": "Based in Bilbao · open to relocating"
  };

  const originalText = new WeakMap();
  const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (textWalker.nextNode()) {
    const node = textWalker.currentNode;
    originalText.set(node, node.nodeValue);
    textNodes.push(node);
  }

  const attributeTranslations = [
    [".skip-link", "aria-label", "Saltar al contenido", "Skip to content"],
    [".site-header nav", "aria-label", "Navegación principal", "Main navigation"],
    [".chips", "aria-label", "Datos rápidos", "Quick facts"],
    [".contact-title", "aria-label", "¿Hacemos que pasen cosas?", "Shall we make things happen?"],
    [".hero-photo img", "alt", "Rosa Oroya bailando con los brazos abiertos en una pista llena de gente", "Rosa Oroya dancing with her arms open in a crowded dancefloor"],
    [".ficha-photo[src$='festival.jpg']", "alt", "Público frente al escenario principal de un festival al atardecer", "Crowd in front of a festival's main stage at sunset"],
    [".ficha-photo[src$='ser.jpg']", "alt", "Programa de la Cadena SER emitiendo en directo desde un set al aire libre", "Cadena SER programme broadcasting live from an outdoor set"],
    [".ficha-photo[src$='swing.jpg']", "alt", "Captura del reportaje Swing Soul Euskadi: «¡Swing, Clap y Tap! El baile que hace vibrar a Bilbao»", "Screenshot from the Swing Soul Euskadi feature: “Swing, Clap and Tap! The dance that gets Bilbao moving”"],
    [".contact-photo", "alt", "Rosa Oroya sonriendo, mirando por encima del hombro", "Rosa Oroya smiling and looking over her shoulder"],
    ['meta[name="description"]', "content",
      "Periodista que se mueve entre medios y eventos. Marketing, brand partnerships y activaciones de marca en medios de comunicación y festivales de gran formato.",
      "A journalist working across media and live events. Marketing, brand partnerships and brand activations for media outlets and major festivals."],
    ['meta[property="og:title"]', "content",
      "Rosa Oroya · Eventos, marketing y brand partnerships",
      "Rosa Oroya · Events, marketing & brand partnerships"],
    ['meta[property="og:description"]', "content",
      "Periodista que se mueve entre medios y eventos. Marketing, brand partnerships y activaciones de marca.",
      "A journalist working across media and live events. Marketing, brand partnerships and brand activations."]
  ];

  function setTextLanguage(language) {
    textNodes.forEach((node) => {
      const original = originalText.get(node);
      const trimmed = original.trim().replace(/\s+/g, " ");
      const translated = language === "en" ? translations[trimmed] : null;
      if (!translated) {
        node.nodeValue = original;
        return;
      }

      const leading = original.match(/^\s*/)[0];
      const trailing = original.match(/\s*$/)[0];
      node.nodeValue = `${leading}${translated}${trailing}`;
    });

    attributeTranslations.forEach(([selector, attribute, spanish, english]) => {
      const element = document.querySelector(selector);
      if (element) element.setAttribute(attribute, language === "en" ? english : spanish);
    });

    document.documentElement.lang = language;
    document.title = language === "en"
      ? "Rosa Oroya · Events, marketing & brand partnerships"
      : "Rosa Oroya · Eventos, marketing y brand partnerships";
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) ogLocale.content = language === "en" ? "en_GB" : "es_ES";
    button.textContent = language === "en" ? "ES" : "EN";
    button.lang = language === "en" ? "es" : "en";
    button.setAttribute("aria-label", language === "en" ? "Cambiar idioma a español" : "Switch language to English");
    button.setAttribute("aria-pressed", String(language === "en"));
  }

  button.addEventListener("click", () => {
    setTextLanguage(document.documentElement.lang === "es" ? "en" : "es");
  });
})();
