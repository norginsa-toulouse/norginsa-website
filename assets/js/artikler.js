/* Artikkellista.
 *
 * Erstattet et sidefelt, en mobilskuff, to sett med kontroller, to
 * synkroniseringsfunksjoner, en «Søk»-knapp og paginering med én rad som
 * filtrerer i det du klikker. Det er én implementasjon i stedet for to.
 *
 * Filteret ligger i adressen (?tagg=…&sok=…), så en filtrert liste kan limes
 * rett inn i en melding.
 */
(function () {
  const rot = document.getElementById("artikkelliste");
  if (!rot) return;

  const elAntall = document.getElementById("artikkel-antall");
  const elTagger = document.getElementById("taggfilter");
  const elSok = document.getElementById("sokefelt");
  const elFramhevet = document.getElementById("framhevet");
  const elTomt = document.getElementById("ingen-treff");

  const forfattere = (t) => (Array.isArray(t.author) ? t.author : [t.author]);
  const visDato = (d) => String(d || "").replace(/-/g, ".");
  const datoTall = (d) => {
    const [dag, mnd, aar] = String(d || "").split("-");
    return Number(`${aar || 0}${mnd || ""}${dag || ""}`) || 0;
  };

  let alle = [];
  let tagg = "";
  let sok = "";

  /* ---------- lesing og skriving av adressen ---------- */

  function lesAdresse() {
    const p = new URLSearchParams(location.search);
    tagg = p.get("tagg") || "";
    sok = p.get("sok") || "";
    if (elSok) elSok.value = sok;
  }

  function skrivAdresse() {
    const p = new URLSearchParams();
    if (tagg) p.set("tagg", tagg);
    if (sok) p.set("sok", sok);
    const q = p.toString();
    // replaceState: tilbakeknappen skal ikke fylles opp av hvert tastetrykk
    history.replaceState(null, "", q ? `?${q}` : location.pathname);
  }

  /* ---------- utvalg ---------- */

  function treff() {
    const s = sok.trim().toLowerCase();
    return alle.filter((a) => {
      if (tagg && !a.tags.includes(tagg)) return false;
      if (!s) return true;
      return (a.name + " " + a.description + " " + forfattere(a).join(" "))
        .toLowerCase().includes(s);
    });
  }

  /* ---------- tegning ---------- */

  function kort(a, stor) {
    const merker = a.tags.map((t) => `<span class="tagg ${taggKlasse(t)}">${t}</span>`).join("");
    const meta = `${forfattere(a).join(", ")} &middot; ${visDato(a.created)}`;
    return `
      <a class="kort kort-klikkbar artikkel${stor ? " artikkel-stor" : ""}"
         href="/arkiv/${a.folder}/${a.folder}">
        <img class="artikkel-bilde" src="arkiv/${a.folder}/images/preview.jpg"
             alt="" loading="lazy" decoding="async" width="800" height="450">
        <div class="artikkel-tekst">
          <div class="artikkel-merker">${merker}</div>
          <h3 class="artikkel-tittel">${a.name}</h3>
          <p class="artikkel-ingress">${a.description}</p>
          <p class="artikkel-meta">${meta}</p>
        </div>
      </a>`;
  }

  function tegn() {
    const liste = treff();
    const filtrerer = Boolean(tagg || sok.trim());

    // Framhevet kort vises bare i den ufiltrerte visningen. Filtrerer du,
    // er du på jakt etter noe bestemt, og da er en lederartikkel i veien.
    const framhevet = !filtrerer
      ? liste.filter((a) => a.featured).sort((a, b) => datoTall(b.created) - datoTall(a.created))[0]
      : null;

    elFramhevet.innerHTML = framhevet ? kort(framhevet, true) : "";
    elFramhevet.hidden = !framhevet;

    const resten = liste.filter((a) => a !== framhevet);
    rot.innerHTML = resten.map((a) => kort(a, false)).join("");

    elTomt.hidden = liste.length > 0;

    const n = liste.length;
    elAntall.textContent = tagg
      ? `${n} ${n === 1 ? "artikkel" : "artikler"} merket ${tagg}`
      : `${n} ${n === 1 ? "artikkel" : "artikler"}`;

    elTagger.querySelectorAll("[data-tagg]").forEach((b) => {
      const på = b.dataset.tagg === tagg;
      b.classList.toggle("er-valgt", på);
      b.setAttribute("aria-pressed", på ? "true" : "false");
    });
  }

  /* ---------- hendelser ---------- */

  elTagger.addEventListener("click", (e) => {
    const b = e.target.closest("[data-tagg]");
    if (!b) return;
    tagg = b.dataset.tagg === tagg ? "" : b.dataset.tagg;   // klikk igjen = av
    skrivAdresse();
    tegn();
  });

  let pause;
  elSok.addEventListener("input", () => {
    sok = elSok.value;
    clearTimeout(pause);
    pause = setTimeout(() => { skrivAdresse(); tegn(); }, 120);
  });

  elTomt.addEventListener("click", (e) => {
    if (!e.target.closest("[data-nullstill]")) return;
    tagg = ""; sok = ""; elSok.value = "";
    skrivAdresse();
    tegn();
  });

  addEventListener("popstate", () => { lesAdresse(); tegn(); });

  // Uttoningen i høyre kant skal bare vises når det faktisk er mer å rulle til.
  function sjekkEnden() {
    const mer = elTagger.scrollWidth - elTagger.clientWidth - elTagger.scrollLeft;
    elTagger.classList.toggle("ved-enden", mer < 4);
  }
  elTagger.addEventListener("scroll", sjekkEnden, { passive: true });
  addEventListener("resize", sjekkEnden, { passive: true });

  /* ---------- oppstart ---------- */

  fetch("arkiv/arkiv.json")
    .then((r) => r.json())
    .then((d) => {
      alle = d.templates
        .filter((a) => !a.utkast)
        .sort((a, b) => datoTall(b.created) - datoTall(a.created));

      // Taggknappene bygges av taggene som faktisk er i bruk
      const brukte = [...new Set(alle.flatMap((a) => a.tags))]
        .sort((a, b) => a.localeCompare(b, "no"));
      // «Alle» først, så valgt-tilstanden alltid peker på nøyaktig én knapp
      elTagger.innerHTML =
        '<button type="button" class="taggknapp t-noytral" data-tagg="" aria-pressed="false">Alle</button>'
        + brukte
          .map((t) => `<button type="button" class="taggknapp ${taggKlasse(t)}"
                         data-tagg="${t}" aria-pressed="false">${t}</button>`)
          .join("");

      lesAdresse();
      tegn();
      sjekkEnden();
    })
    .catch(() => {
      rot.innerHTML = '<p class="artikkel-feil">Klarte ikke å laste artiklene. Prøv igjen senere.</p>';
    });
})();
