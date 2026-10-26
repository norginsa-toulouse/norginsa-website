// Forsidens «Fremhevede artikler»: artiklene som står i data-artikler på
// beholderen (mappenavn fra arkiv.json), i den rekkefølgen de står der. Kortet
// er det samme som i artikkellista (artikkelKort i tagger.js). En mappe som
// ikke finnes i arkiv.json, eller er merket "utkast": true, hoppes over.
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("templateListContent");
  const valgt = container.dataset.artikler.split(/\s+/);

  try {
    const res = await fetch("arkiv/arkiv.json");
    const data = await res.json();

    container.innerHTML = valgt
      .map(mappe => data.templates.find(t => t.folder === mappe && !t.utkast))
      .filter(Boolean)
      .map(t => artikkelKort(t, false, "h3"))
      .join("");
  } catch (err) {
    container.innerHTML = `<p class="artikkel-feil">Klarte ikke å laste artiklene. Prøv igjen senere.</p>`;
    console.error("Error loading template data:", err);
  }
});
