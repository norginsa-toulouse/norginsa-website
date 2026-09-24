// Forsidens «Nye artikler»: de tre nyeste artiklene fra arkiv.json.
// Artikler merket "utkast": true i arkiv.json holdes utenfor, så uferdige
// sider ikke havner på forsiden.
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("templateListContent");
  container.innerHTML = ''; // Clear container before loading

  try {
    const res = await fetch("arkiv/arkiv.json");
    const data = await res.json();

    const topTemplates = data.templates
      .filter(t => !t.utkast)
      .sort((a, b) => datoTall(b.created) - datoTall(a.created))
      .slice(0, 3);

    topTemplates.forEach((template, index) => {
      const card = document.createElement("article");
      card.setAttribute("tabindex", "0");
      card.className =
        "kort kort-klikkbar flex flex-col overflow-hidden w-full";
      card.style.animationDelay = `${index * 150}ms`;

      card.innerHTML = `
        <img src="arkiv/${template.folder}/images/preview.jpg" alt="Forhåndsvisning av «${template.name}»" loading="lazy" decoding="async" width="800" height="448" class="w-full h-56 object-cover"/>
        <div class="p-6 flex flex-col flex-grow">
          <h3 class="text-2xl font-extrabold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2">${template.name}</h3>
          <p class="text-gray-700 dark:text-gray-300 text-sm mb-5 flex-grow line-clamp-3">${template.description}</p>
          <div class="merkerad flex flex-wrap gap-2 mb-5" aria-label="Kategorier">
            ${template.tags.map(tag => `<span class="tagg ${taggKlasse(tag)}">${tag}</span>`).join('')}
          </div>
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-5 truncate" aria-label="Forfatter og dato">
            Skrevet av <strong>${forfattere(template).join(", ")}</strong> · ${visDato(template.created)}
          </p>
          <div class="mt-auto space-y-3">
            <a href="arkiv/${template.folder}/${template.folder}.html" class="knapp knapp-primar w-full" aria-label="Les «${template.name}»">
              Les mer
            </a>
          </div>
        </div>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = `<p class="text-red-500 text-center py-6 font-semibold">Klarte ikke å laste artiklene. Prøv igjen senere.</p>`;
    console.error("Error loading template data:", err);
  }
});

// Noen artikler har flere forfattere: "author" kan være en streng eller en liste.
function forfattere(t) {
  return Array.isArray(t.author) ? t.author : [t.author];
}

// Datoene i arkiv.json er på formen DD-MM-ÅÅÅÅ. Gjør dem sorterbare.
function datoTall(dato) {
  const [dag, maaned, aar] = String(dato || "").split("-");
  return Number(`${aar || 0}${maaned || ""}${dag || ""}`) || 0;
}

/* Fade-in animation */
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.5s ease forwards;
  }
`;
document.head.appendChild(style);

// Datoene lagres som DD-MM-ÅÅÅÅ i arkiv.json, men vises med punktum, slik at
// kortene og artikkelsidene skriver dato på samme måte.
function visDato(dato) {
  return String(dato || "").replace(/-/g, ".");
}

