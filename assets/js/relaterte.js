/* Relaterte artikler nederst på artikkelsidene.
 *
 * Velger ut fra delte tagger i arkiv.json, og fyller opp med de nyeste hvis
 * artikkelen har få slektninger. Seksjonen står skjult til den har noe å vise,
 * så en artikkel uten treff bare ser ut som før. */
(function () {
  const rot = document.getElementById("relaterte");
  if (!rot) return;

  // /arkiv/<mappe>/<mappe> - mappenavnet er nest siste ledd, med og uten .html
  const ledd = location.pathname.replace(/\/+$/, "").split("/").filter(Boolean);
  const mappe = decodeURIComponent(ledd[ledd.length - 2] || "");

  const datoTall = (d) => {
    const [dag, mnd, aar] = String(d || "").split("-");
    return Number(`${aar || 0}${mnd || ""}${dag || ""}`) || 0;
  };
  const forfattere = (t) => (Array.isArray(t.author) ? t.author : [t.author]);
  const nyest = (a, b) => datoTall(b.created) - datoTall(a.created);

  fetch("../arkiv.json")
    .then((r) => r.json())
    .then((data) => {
      const alle = data.templates.filter((t) => !t.utkast && t.folder !== mappe);
      const meg = data.templates.find((t) => t.folder === mappe);
      if (!meg || !alle.length) return;

      const mine = new Set(meg.tags);
      const slekt = alle
        .map((t) => ({ t, felles: t.tags.filter((x) => mine.has(x)).length }))
        .filter((x) => x.felles > 0)
        .sort((a, b) => b.felles - a.felles || nyest(a.t, b.t))
        .map((x) => x.t);

      // Fyll opp med de nyeste hvis det er under tre med felles tagg.
      const valgt = slekt.slice(0, 3);
      for (const t of [...alle].sort(nyest)) {
        if (valgt.length >= 3) break;
        if (!valgt.includes(t)) valgt.push(t);
      }
      if (!valgt.length) return;

      rot.innerHTML = `
        <h2 class="text-2xl font-bold mb-5">Les også</h2>
        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          ${valgt.map((t) => `
            <a href="/arkiv/${t.folder}/${t.folder}"
               class="kort kort-klikkbar overflow-hidden flex flex-col no-underline">
              <img src="../${t.folder}/images/preview.jpg" alt="" loading="lazy" decoding="async"
                   width="800" height="384" class="w-full h-36 object-cover">
              <div class="p-4 flex flex-col flex-1">
                <h3 class="text-base font-bold mb-1">${t.name}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 flex-1">${t.description}</p>
                <p class="mt-3 text-xs text-gray-500 dark:text-gray-400">
                  ${forfattere(t).join(", ")}
                </p>
              </div>
            </a>`).join("")}
        </div>`;
      rot.hidden = false;
    })
    .catch(() => {});
})();
