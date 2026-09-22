// Felles temaveksling for hele siden.
//
// Selve .dark-klassen settes av et lite inline-script i <head> på hver side,
// slik at temaet er på plass før siden tegnes (ingen hvit blinking).
// Denne filen kobler opp knappene og holder sol-/måneikonene i synk.
//
// Knappen bor bare ett sted: i navbaren. #themeToggleNav er desktop-varianten
// og #sidebarThemeToggle den i mobilmenyen - eller [data-theme-toggle].
(function () {
  const KNAPPER = "#themeToggleNav, #sidebarThemeToggle, [data-theme-toggle]";
  const SOL = "#nav-sun, #sidebar-sun, .icon-sun";
  const MAANE = "#nav-moon, #sidebar-moon, .icon-moon";

  function oppdaterIkoner() {
    const mork = document.documentElement.classList.contains("dark");
    document.querySelectorAll(SOL).forEach((el) => el.classList.toggle("hidden", !mork));
    document.querySelectorAll(MAANE).forEach((el) => el.classList.toggle("hidden", mork));
  }

  // Klikk fanges på document, ikke på knappen selv. Da virker knappene som
  // settes inn av getNavbar.js, uansett skriptrekkefølge.
  document.addEventListener("click", (e) => {
    const knapp = e.target instanceof Element ? e.target.closest(KNAPPER) : null;
    if (!knapp) return;
    const mork = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", mork ? "dark" : "light");
    } catch (err) {
      /* privat nettleservindu e.l. - temaet gjelder da bare denne økten */
    }
    oppdaterIkoner();
  });

  document.addEventListener("DOMContentLoaded", oppdaterIkoner);
  oppdaterIkoner();
})();
