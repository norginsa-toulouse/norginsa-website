/* Tidslinja på «Om programmet».
 *
 * Tre ting: streken fylles etter hvor langt ned du har rullet, hvert steg
 * tones inn når det kommer til syne, og linjevalget i år 2 skriver om
 * innholdet i stegene for år 2 til 5.
 *
 * Teksten per linje ligger i LINJER under. Skal du fylle inn IC, ICBE eller
 * IMACS, er det bare å skrive i feltene «aar23» og «aar45».
 */
(function () {
  const rot = document.querySelector("[data-tidslinje]");
  if (!rot) return;

  /* ------------------------------------------------------------------ */
  /* Innhold per linje                                                   */
  /* ------------------------------------------------------------------ */
  const LINJER = {
    MIC: {
      navn: "MIC",
      fullt: "Modélisation, Informatique et Communication",
      kort: "Matematikk, modellering og informatikk",
      artikkel: "arkiv/mic/mic.html",
      aar23:
        "Matte- og informatikklinja, med en god del elektronikk og automasjon ved siden av. " +
        "Folk som tar denne linjen ender ofte opp med å drive med: Utvikling (programmering), cybersikkerhet, " +
        "databehandling, matematisk modellering og utvikling av KI. Her kommer du til å trives, enten om du vil hacke pentagon eller begynne med finans.",
      aar45:
        "MIC blir til <b>IR (Informatikk og Nettverk)</b> eller <b>MA (Anvendt Matematikk)</b>. " +
        "IR-gjengen lager verktøy for å videostreaming, får en seilbåt til å justere seg selv etter vindforhold og lager sitt eget programmeringsspråk. MA-folka " +
        "bruker maskinlæring til mye rart, beviser at rettsystemet er rasistisk og behandler store mengder data i sin egen Twitter-app.",
      lenke: "arkiv/ir/ir.html",
      lenketekst: "Les om IR i fjerde og femte klasse",
    },
    IC: {
      navn: "IC",
      fullt: "Ingénierie de la Construction",
      kort: "Konstruksjon og maskinteknikk",
      artikkel: "arkiv/ic/ic.html",
      // TODO: skriv hva andre og tredje klasse på IC faktisk inneholder.
      aar23: "",
      // TODO: skriv hva fjerde og femte klasse inneholder.
      aar45: "",
    },
    ICBE: {
      navn: "ICBE",
      fullt: "Ingénierie Chimique, Biochimique et Environnementale",
      kort: "Kjemi, biokjemi og miljøteknologi",
      artikkel: "arkiv/icbe/icbe.html",
      aar23: "",   // TODO
      aar45: "",   // TODO
    },
    IMACS: {
      navn: "IMACS",
      fullt: "Ingénierie des Matériaux, Composants et Systèmes",
      kort: "Fysikk, elektronikk og automatikk",
      artikkel: "arkiv/imacs/imacs.html",
      aar23: "",   // TODO
      aar45: "",   // TODO
    },
  };

  const LAGER = "norginsa-linje";

  /* ------------------------------------------------------------------ */
  /* Streken fylles etter rulling                                        */
  /* ------------------------------------------------------------------ */
  // Skrur på innaningen. Står den i CSS alene, blir tidslinja usynlig hvis
  // skriptet aldri kjører.
  rot.classList.add("tidslinje-aktiv");

  const liste = rot.querySelector(".tidslinje");
  let venter = false;

  let linjeTopp = 0;
  let linjeHoyde = 0;

  // Streken skal gå fra midten av første prikk til midten av siste, ikke fra
  // toppen til bunnen av lista. Kortene endrer høyde når <details> åpnes og
  // når linjevalget skriver om innholdet, så dette må måles på nytt.
  function maalLinje() {
    const prikker = liste.querySelectorAll(".tidslinje-prikk");
    if (prikker.length < 2) return;
    const r = liste.getBoundingClientRect();
    const a = prikker[0].getBoundingClientRect();
    const b = prikker[prikker.length - 1].getBoundingClientRect();
    linjeTopp = a.top - r.top + a.height / 2;
    linjeHoyde = b.top - r.top + b.height / 2 - linjeTopp;
    liste.style.setProperty("--linje-topp", `${linjeTopp}px`);
    liste.style.setProperty("--linje-hoyde", `${linjeHoyde}px`);
    oppdaterFyll();
  }

  function oppdaterFyll() {
    venter = false;
    const r = liste.getBoundingClientRect();
    const midt = window.innerHeight * 0.55;
    const andel = (midt - r.top - linjeTopp) / (linjeHoyde || 1);
    liste.style.setProperty("--fyll", `${Math.min(linjeHoyde, Math.max(0, andel * linjeHoyde)).toFixed(1)}px`);
  }

  addEventListener("scroll", () => {
    if (!venter) { venter = true; requestAnimationFrame(oppdaterFyll); }
  }, { passive: true });
  addEventListener("resize", maalLinje, { passive: true });

  // Kortene vokser når noe åpnes. Mål på nytt i stedet for å gjette.
  if ("ResizeObserver" in window) new ResizeObserver(maalLinje).observe(liste);
  maalLinje();
  addEventListener("load", maalLinje);

  /* ------------------------------------------------------------------ */
  /* Stegene tones inn                                                   */
  /* ------------------------------------------------------------------ */
  const steg = [...rot.querySelectorAll(".tidslinje-steg")];
  if ("IntersectionObserver" in window) {
    const kikker = new IntersectionObserver((treff) => {
      treff.forEach((t) => {
        if (t.isIntersecting) { t.target.classList.add("er-synlig"); kikker.unobserve(t.target); }
      });
    }, { rootMargin: "0px 0px -12% 0px" });
    steg.forEach((s) => kikker.observe(s));
  } else {
    steg.forEach((s) => s.classList.add("er-synlig"));   // uten støtte: vis alt
  }

  /* ------------------------------------------------------------------ */
  /* Fagene i første klasse                                              */
  /* ------------------------------------------------------------------ */
  /* Bildene hentes fra assets/images/fagliste1a/ etter nøkkelen under, altså
     «matte» -> assets/images/fagliste1a/matte.jpg. Slipp bare fila inn i mappa,
     så dukker den opp. Mangler den, vises panelet uten bilde.
     Heter fila noe annet, sett «bilde» på faget med hele stien.

     Fyll inn «tekst» for hvert fag. */
  const BILDEMAPPE = "assets/images/fagliste1a/";

  const FAG = {
    matte: {
      navn: "Matte",
      tekst: "Alt fra komplekse tall til funksjonslære, matriser, integraler, bevis, Taylor-rekker og vektorrom.",
    },
    mekanikk:        { navn: "Mekanikk", tekst: "Punktmekanikk: Regne på legemer i bevegelse... Der referansesystemet også er under akselerasjon!" },
    kjemi:           { navn: "Kjemi", tekst: "Syrer & Baser, reduksjon og atomlære. Mye labforsøk! Hvor mange blå schtroumpfs kan en spise før man dør av forgiftning?" },
    optikk:          { navn: "Optikk", tekst: "Bruk av linser til å gjøre mye kult! Projeksjon, splitting av lys og teleskop." },
    fransk:          { navn: "Fransk", tekst: "Flere klasser etter ferdighetsnivå. Her tar folk det svært svært rolig." },
    elektrokinetikk: { navn: "Elektrokinetikk", tekst: "Lyspære + strøm = Mange gode ideer" },
    elektrostatikk:  { navn: "Elektrostatikk", tekst: "Punktmekanikk, men for legemer med elektrisk ladning!" },
    termodynamikk:   { navn: "Termodynamikk", tekst: "Energi inn og ut av systemer. Hvor mye energi sparer du ved å koke vann med lokket på?" },
    industriell:     { navn: "Industriell teknikk", tekst: "Her drar dere på et stort industrielt bygg utenfor campus for å leke med alle maskinene" },
    programmering:   { navn: "Programmering", tekst: "Dere programmerer et fly til å ikke kræsje, og konverterer bilder til tekst (ASCII Art)" },
    gym:             { navn: "Gym", tekst: "Ja, du hørte riktig! Vi har gym som fag de første fire årene. Kjempegod arena til å møte franskmenn, og få i seg litt D-vitamin i Toulouse-sola." },
  };

  const fagListe = rot.querySelector("[data-fagliste]");
  const fagPanel = rot.querySelector("[data-fag-panel]");

  if (fagListe && fagPanel) {
    // Knappene bygges fra FAG, så lista finnes bare ett sted.
    fagListe.innerHTML = Object.entries(FAG).map(([id, f]) =>
      `<button type="button" class="fag" data-fag="${id}" aria-pressed="false">${f.navn}</button>`
    ).join("");

    fagListe.addEventListener("click", (e) => {
      const b = e.target.closest("[data-fag]");
      if (!b) return;
      const id = b.dataset.fag;
      const alt = fagListe.querySelectorAll("[data-fag]");
      const alleredePa = b.getAttribute("aria-pressed") === "true";
      alt.forEach((x) => { x.setAttribute("aria-pressed", "false"); x.classList.remove("er-valgt"); });

      if (alleredePa) {            // klikk på samme fag lukker panelet
        fagPanel.hidden = true;
        return;
      }
      b.setAttribute("aria-pressed", "true");
      b.classList.add("er-valgt");

      const f = FAG[id];
      const bilde = f.bilde || `${BILDEMAPPE}${id}.jpg`;
      fagPanel.innerHTML = `
        <h4>${f.navn}</h4>
        <img src="${bilde}" alt="" loading="lazy" decoding="async" class="fag-bilde">
        ${f.tekst
          ? `<p>${f.tekst}</p>`
          : `<p class="tidslinje-mangler">Vi skriver om ${f.navn} nå. Lurer du på noe om faget?
             <a href="kontakt.html">Spør oss</a>.</p>`}`;

      // Finnes det ikke noe bilde for faget ennå, fjernes det stille.
      const img = fagPanel.querySelector(".fag-bilde");
      img.addEventListener("error", () => { img.remove(); maalLinje(); });

      fagPanel.hidden = false;
      maalLinje();               // panelet endrer korthøyden
    });
  }

  /* ------------------------------------------------------------------ */
  /* Linjevalget                                                         */
  /* ------------------------------------------------------------------ */
  const knapper = [...rot.querySelectorAll("[data-linje-valg]")];
  const felter = [...rot.querySelectorAll("[data-linje-innhold]")];

  function tekst(l, felt) {
    if (l[felt]) return `<p>${l[felt]}</p>`;
    return `<p class="tidslinje-mangler">Vi holder på å skrive om ${l.navn} for dette trinnet.</p>`;
  }

  function velg(navn, lagre) {
    const l = LINJER[navn];
    if (!l) return;
    rot.dataset.valgtLinje = navn;
    knapper.forEach((b) => {
      const på = b.dataset.linjeValg === navn;
      b.setAttribute("aria-pressed", på ? "true" : "false");
      b.classList.toggle("er-valgt", på);
    });
    felter.forEach((f) => {
      const felt = f.dataset.linjeInnhold;            // "aar23" eller "aar45"
      f.innerHTML = `
        <p class="tidslinje-valgt-navn">${l.navn} &middot; <span>${l.kort}</span></p>
        ${tekst(l, felt)}
        <p class="tidslinje-lenke">
          <a href="${felt === "aar45" && l.lenke ? l.lenke : l.artikkel}">
            ${felt === "aar45" && l.lenketekst ? l.lenketekst : "Les mer om " + l.navn}
          </a>
        </p>`;
    });
    if (lagre) { try { localStorage.setItem(LAGER, navn); } catch (e) { /* privat vindu */ } }
  }

  knapper.forEach((b) => b.addEventListener("click", () => velg(b.dataset.linjeValg, true)));

  let lagret = null;
  try { lagret = localStorage.getItem(LAGER); } catch (e) { /* ignorer */ }
  if (lagret && LINJER[lagret]) velg(lagret, false);
})();
