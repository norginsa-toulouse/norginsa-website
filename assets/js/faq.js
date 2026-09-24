/* Dyplenker til enkeltspørsmål i FAQ-en.
 *
 *   norginsa.no/about#faq-ma-jeg-kunne-fransk
 *
 * åpner det spørsmålet og ruller dit. Åpner du et spørsmål, oppdateres
 * adressefeltet, så lenka kan kopieres rett inn i en melding.
 */
(function () {
  const alle = document.querySelectorAll(".faq-sporsmal[id]");
  if (!alle.length) return;

  const roligere = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function aapneFraHash() {
    const id = decodeURIComponent(location.hash.slice(1));
    if (!id) return;
    const el = document.getElementById(id);
    if (!el || !el.classList.contains("faq-sporsmal")) return;
    el.open = true;
    el.scrollIntoView({ behavior: roligere ? "auto" : "smooth", block: "start" });
    el.classList.add("er-fremhevet");
    setTimeout(() => el.classList.remove("er-fremhevet"), 2000);
  }

  alle.forEach((d) => {
    d.addEventListener("toggle", () => {
      // replaceState og ikke pushState: tilbakeknappen skal ikke fylles opp
      // av hvert spørsmål man har åpnet.
      if (d.open) history.replaceState(null, "", "#" + d.id);
    });
  });

  addEventListener("hashchange", aapneFraHash);
  aapneFraHash();
})();
