/* Søkeguiden.
 *
 * Tre ting: navbarhøyden måles så det klebrige stegbåndet legger seg rett
 * under den, båndet følger med på hvor langt ned i prosessen man har rullet,
 * og hvert steg tones inn med tallet sitt når det kommer til syne.
 *
 * Ingenting her er nødvendig for å lese siden. Blokkeres JavaScript, står
 * stegene der de skal - de er bare ikke merket av underveis.
 */
(function () {
  const rot = document.querySelector("[data-sokeguide]");
  if (!rot) return;

  const stripe = rot.querySelector(".stegstripe");
  const liste = rot.querySelector(".stegstripe-liste");
  const steg = [...rot.querySelectorAll(".sok-steg")];
  if (!steg.length) return;

  /* ------------------------------------------------------------------ */
  /* Navbarhøyden                                                        */
  /* ------------------------------------------------------------------ */
  /* Navbaren er fixed og injiseres av getNavbar.js, så høyden er ikke kjent
     før den står der. Den endrer seg også mellom mobil og desktop.
     Rollen står i selektoren fordi toppen på denne siden også er en <header>. */
  const navbar = document.querySelector('header[role="navigation"]');

  function maalNavbar() {
    if (!navbar) return;
    document.documentElement.style.setProperty("--ng-navhoyde", `${navbar.offsetHeight}px`);
  }

  maalNavbar();
  addEventListener("resize", maalNavbar, { passive: true });
  if (navbar && "ResizeObserver" in window) new ResizeObserver(maalNavbar).observe(navbar);

  /* ------------------------------------------------------------------ */
  /* Stegbåndet følger rullingen                                         */
  /* ------------------------------------------------------------------ */
  const lenker = stripe ? [...stripe.querySelectorAll("a")] : [];
  let venter = false;
  let forrige = -1;

  /* Det aktive steget er det øverste som har passert lesepunktet. Punktet
     ligger litt over midten: da skifter båndet når man begynner å lese et
     steg, ikke når man er ferdig med det. */
  function aktivtSteg() {
    const punkt = innerHeight * 0.42;
    let i = 0;
    for (let n = 0; n < steg.length; n++) {
      if (steg[n].getBoundingClientRect().top <= punkt) i = n;
    }
    return i;
  }

  function oppdater() {
    venter = false;
    if (!stripe) return;

    // Fyllstreken: fra toppen av første steg til bunnen av det siste.
    const forste = steg[0].getBoundingClientRect();
    const siste = steg[steg.length - 1].getBoundingClientRect();
    const hoyde = siste.bottom - forste.top;
    const gaatt = innerHeight * 0.42 - forste.top;
    const andel = Math.min(1, Math.max(0, gaatt / (hoyde || 1)));
    stripe.style.setProperty("--fyll", `${(andel * 100).toFixed(1)}%`);

    const naa = aktivtSteg();
    if (naa === forrige) return;
    forrige = naa;

    lenker.forEach((a, i) => {
      if (i === naa) a.setAttribute("aria-current", "step");
      else a.removeAttribute("aria-current");
      a.classList.toggle("er-passert", i < naa);
    });

    rullTilAktiv(naa);
  }

  /* Mobil: båndet rulles sideveis. scrollIntoView ville tatt hele sida med
     seg loddrett, så posisjonen regnes ut for hånd. */
  function rullTilAktiv(i) {
    if (!liste || !lenker[i]) return;
    if (liste.scrollWidth <= liste.clientWidth + 1) return;
    const a = lenker[i];
    const mal = a.offsetLeft - (liste.clientWidth - a.offsetWidth) / 2;
    liste.scrollTo({ left: Math.max(0, mal), behavior: "smooth" });
  }

  addEventListener("scroll", () => {
    if (!venter) { venter = true; requestAnimationFrame(oppdater); }
  }, { passive: true });
  addEventListener("resize", () => { forrige = -1; oppdater(); }, { passive: true });

  /* ------------------------------------------------------------------ */
  /* Stegene tones inn                                                   */
  /* ------------------------------------------------------------------ */
  if ("IntersectionObserver" in window) {
    rot.classList.add("sok-aktiv");
    const kikker = new IntersectionObserver((treff) => {
      treff.forEach((t) => {
        if (t.isIntersecting) { t.target.classList.add("er-synlig"); kikker.unobserve(t.target); }
      });
    }, { rootMargin: "0px 0px -12% 0px" });
    steg.forEach((s) => kikker.observe(s));
  } else {
    steg.forEach((s) => s.classList.add("er-synlig"));   // uten støtte: vis alt
  }

  oppdater();
  addEventListener("load", oppdater);
})();
