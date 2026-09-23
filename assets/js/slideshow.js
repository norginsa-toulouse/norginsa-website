/* Bildegalleri for artiklene.
 *
 * Slik skriver du et galleri:
 *
 *     <div class="bildegalleri" data-bilder="images/1.jpg images/2.jpg"></div>
 *
 * Det er alt. Ingen array, ingen modal-div, ingen ekstra script-tagg, og du
 * kan ha flere gallerier på samme side.
 *
 * Den gamle måten (et tomt <div id="slideshowGrid"> pluss en global
 * slideshowImages) virker fortsatt, så eldre artikler ikke må skrives om.
 * Den lå brakk fordi artiklene erklærte lista med «const»: en const på
 * toppnivå blir ikke en egenskap på window, så vakten her slo alltid til.
 */
(function () {
  if (window.__galleriLastet) return;
  window.__galleriLastet = true;

  let bilder = [];
  let n = 0;
  let sisteKnapp = null;
  let modal, modalBilde, teller;

  function lagModal() {
    if (modal) return;
    modal = document.createElement("div");
    modal.className = "galleri-modal";
    modal.hidden = true;
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", "Bildevisning");
    modal.innerHTML = `
      <button type="button" class="galleri-lukk" aria-label="Lukk">&times;</button>
      <button type="button" class="galleri-pil galleri-forrige" aria-label="Forrige bilde">&#10094;</button>
      <figure class="galleri-ramme">
        <img alt="">
        <figcaption class="galleri-teller"></figcaption>
      </figure>
      <button type="button" class="galleri-pil galleri-neste" aria-label="Neste bilde">&#10095;</button>`;
    document.body.appendChild(modal);
    modalBilde = modal.querySelector("img");
    teller = modal.querySelector(".galleri-teller");

    modal.querySelector(".galleri-lukk").addEventListener("click", lukk);
    modal.querySelector(".galleri-forrige").addEventListener("click", () => bla(-1));
    modal.querySelector(".galleri-neste").addEventListener("click", () => bla(1));
    modal.addEventListener("click", (e) => { if (e.target === modal) lukk(); });
  }

  function vis() {
    modalBilde.src = bilder[n];
    modalBilde.alt = `Bilde ${n + 1} av ${bilder.length}`;
    teller.textContent = `${n + 1} / ${bilder.length}`;
    modal.querySelectorAll(".galleri-pil").forEach((b) => { b.hidden = bilder.length < 2; });
  }

  function aapne(liste, i, knapp) {
    lagModal();
    bilder = liste;
    n = i;
    sisteKnapp = knapp || null;
    vis();
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    modal.querySelector(".galleri-lukk").focus();
  }

  function lukk() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.style.overflow = "";
    if (sisteKnapp) sisteKnapp.focus();   // tilbake dit man kom fra
  }

  function bla(d) {
    n = (n + d + bilder.length) % bilder.length;
    vis();
  }

  document.addEventListener("keydown", (e) => {
    if (!modal || modal.hidden) return;
    if (e.key === "Escape") lukk();
    else if (e.key === "ArrowLeft") bla(-1);
    else if (e.key === "ArrowRight") bla(1);
  });

  function tegn(el, liste) {
    el.classList.add("bildegalleri");
    el.innerHTML = liste.map((src, i) => `
      <button type="button" class="galleri-miniatyr" data-i="${i}"
              aria-label="Vis bilde ${i + 1} i full størrelse">
        <img src="${src}" alt="" loading="lazy" decoding="async">
      </button>`).join("");
    el.addEventListener("click", (e) => {
      const b = e.target.closest("button[data-i]");
      if (b) aapne(liste, Number(b.dataset.i), b);
    });
  }

  function start() {
    document.querySelectorAll("[data-bilder]").forEach((el) => {
      const liste = el.dataset.bilder.split(/[\s,]+/).filter(Boolean);
      if (liste.length) tegn(el, liste);
    });

  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();

