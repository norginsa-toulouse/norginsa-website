/* Fargene til taggene, ett sted. Nederst: hjelpere for artikkelkortene.
 *
 * Én farge per tema, hentet fra Toulouse: pastellblå etter vaidplanten byen
 * ble rik på, sandstein, murstein og violette de Toulouse.
 *
 * Fargen betyr HVILKET tema. På filterknappene betyr fylt mot tonet om
 * taggen er valgt. Det er to forskjellige ting, og de må ikke blandes -
 * gjør man det, ser en ufiltrert liste ut som om noe allerede er valgt.
 */
window.TAGGFARGE = {
  "Studiet": "t-blaa",
  "Praktisk": "t-sand",
  "Livet i Toulouse": "t-tegl",
  "Studenthistorier": "t-violett",
};

window.taggKlasse = function (tagg) {
  return window.TAGGFARGE[tagg] || "t-noytral";
};

/* Felles for forsiden (main.js) og artikkellista (artikler.js), også selve
 * artikkelkortet, så de to sidene viser artiklene likt. relaterte.js
 * har sin egen kopi av datoTall, så artiklene slipper å laste denne fila. */

// Noen artikler har flere forfattere: "author" kan være en streng eller en liste.
window.forfattere = function (t) {
  return Array.isArray(t.author) ? t.author : [t.author];
};

// Datoene i arkiv.json er på formen DD-MM-ÅÅÅÅ. Gjør dem sorterbare.
window.datoTall = function (dato) {
  const [dag, maaned, aar] = String(dato || "").split("-");
  return Number(`${aar || 0}${maaned || ""}${dag || ""}`) || 0;
};

// Vises med punktum, slik at kortene og artikkelsidene skriver dato likt.
window.visDato = function (dato) {
  return String(dato || "").replace(/-/g, ".");
};

// Artikkelkortet. Hele kortet er lenken. «niva» er overskriftsnivået:
// h2 i artikkellista, h3 under «Nye artikler» på forsiden.
window.artikkelKort = function (a, stor, niva) {
  const h = niva || "h2";
  const merker = a.tags.map((t) => `<span class="tagg ${taggKlasse(t)}">${t}</span>`).join("");
  const meta = `${forfattere(a).join(", ")} &middot; ${visDato(a.created)}`;
  return `
    <a class="kort kort-klikkbar artikkel${stor ? " artikkel-stor" : ""}"
       href="arkiv/${a.folder}/${a.folder}.html">
      <img class="artikkel-bilde" src="arkiv/${a.folder}/images/preview.jpg"
           alt="" loading="lazy" decoding="async" width="800" height="450">
      <div class="artikkel-tekst">
        <div class="artikkel-merker">${merker}</div>
        <${h} class="artikkel-tittel">${a.name}</${h}>
        <p class="artikkel-ingress">${a.description}</p>
        <p class="artikkel-meta">${meta}</p>
      </div>
    </a>`;
};
