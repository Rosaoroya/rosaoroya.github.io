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
