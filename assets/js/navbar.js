/* Mobilmenyen. Temavekslingen ligger i assets/js/theme.js.
 *
 * En skuff som dekker siden er en dialog, og må oppføre seg som en: mens den
 * er åpen skal tabulator holde seg inni den, og når den lukkes skal fokus
 * tilbake dit man kom fra. Uten det havner man øverst på siden, og med
 * tastatur kan man tabbe rundt i innhold man ikke ser.
 */
(function () {
  const aapne = document.getElementById("sidebarOpenBtn");
  const lukkKnapp = document.getElementById("sidebarCloseBtn");
  const overlegg = document.getElementById("sidebarOverlay");
  const meny = document.getElementById("mobileSidebar");
  if (!aapne || !meny || !overlegg) return;

  const FOKUSERBAR = 'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])';
  let erApen = false;

  function apne() {
    erApen = true;
    meny.classList.add("er-apen");
    overlegg.classList.add("er-apen");
    meny.removeAttribute("inert");
    meny.setAttribute("aria-hidden", "false");
    aapne.setAttribute("aria-expanded", "true");
    document.body.classList.add("sidebar-open");
    const forste = meny.querySelector(FOKUSERBAR);
    if (forste) forste.focus();
  }

  function lukk() {
    if (!erApen) return;
    erApen = false;
    meny.classList.remove("er-apen");
    overlegg.classList.remove("er-apen");
    meny.setAttribute("inert", "");
    meny.setAttribute("aria-hidden", "true");
    aapne.setAttribute("aria-expanded", "false");
    document.body.classList.remove("sidebar-open");
    aapne.focus();                       // tilbake dit man kom fra
  }

  aapne.addEventListener("click", apne);
  lukkKnapp && lukkKnapp.addEventListener("click", lukk);
  overlegg.addEventListener("click", lukk);

  // Lenker til samme side (ankere) navigerer ikke bort, så menyen må lukkes selv
  meny.addEventListener("click", (e) => { if (e.target.closest("a")) lukk(); });

  document.addEventListener("keydown", (e) => {
    if (!erApen) return;
    if (e.key === "Escape") { lukk(); return; }
    if (e.key !== "Tab") return;

    // Hold tabulator inne i skuffen
    const felt = [...meny.querySelectorAll(FOKUSERBAR)].filter((el) => el.offsetParent !== null);
    if (!felt.length) return;
    const forste = felt[0];
    const siste = felt[felt.length - 1];
    if (e.shiftKey && document.activeElement === forste) {
      e.preventDefault(); siste.focus();
    } else if (!e.shiftKey && document.activeElement === siste) {
      e.preventDefault(); forste.focus();
    }
  });

  // Blir vinduet bredt nok til vanlig meny, skal skuffen ikke bli hengende
  matchMedia("(min-width: 48rem)").addEventListener("change", (e) => { if (e.matches) lukk(); });

  /* Marker hvilken side man er på, i begge menyene. */
  const na = location.pathname.replace(/\/$/, "").split("/").pop() || "index.html";
  const filnavn = na.includes(".") ? na : `${na}.html`;
  document.querySelectorAll("[data-side]").forEach((a) => {
    if (a.dataset.side !== filnavn) return;
    a.setAttribute("aria-current", "page");
    a.classList.add("er-aktiv");
  });
})();
