/* Navbaren, bygget ett sted.
 *
 * Lå tidligere som to nesten identiske kopier - én for rotsidene og én for
 * artiklene - som bare skilte seg ved «../../» foran lenkene. Nå er det én
 * mal som tar imot prefikset. De to funksjonene under finnes fortsatt, så
 * sidene ikke må endres.
 */
const NG_SIDER = [
  ["index.html", "Hjem"],
  ["about.html", "Om programmet"],
  ["sokeguiden.html", "Søkeguiden"],
  ["artikler.html", "Artikler"],
  ["kontakt.html", "Kontakt oss"],
];

const NG_SOK = "https://utdanning.no/tema/utdanning_i_utlandet/ingeniorstudier_i_toulouse";

function ngSolIkon(id, klasse) {
  return `<svg id="${id}" class="${klasse} hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <circle cx="12" cy="12" r="5" />
      <path stroke-linecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M16.36 16.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M16.36 7.64l1.42-1.42" />
    </svg>`;
}

function ngMaaneIkon(id, klasse) {
  return `<svg id="${id}" class="${klasse}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1111.21 3c.03 0 .06.01.09.01a7 7 0 0010.7 9.78z" />
    </svg>`;
}

function byggNavbar(p) {
  const desktopLenker = NG_SIDER.map(([h, t]) => `
          <a href="${p}${h}" data-side="${h}"
            class="navlenke px-2 py-1 rounded transition hover:text-red-600 dark:hover:text-red-400 focus-visible:outline focus-visible:ring-2 focus-visible:ring-red-400 text-gray-700 dark:text-gray-100">${t}</a>`).join("");

  const menyLenker = NG_SIDER.map(([h, t]) => `
        <a href="${p}${h}" data-side="${h}" class="mobilmeny-lenke">${t}</a>`).join("");

  return `
  <header
    class="bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-200 dark:border-gray-800 fixed w-full z-40 shadow-sm transition-colors duration-300"
    role="navigation" aria-label="Hovedmeny">
    <div class="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
      <div class="flex justify-between items-center py-3 sm:py-4">

        <a href="${p}index.html"
          class="flex items-center text-xl sm:text-2xl font-bold text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400 transition tracking-tight select-none"
          aria-label="Til forsiden">NORGINSA</a>

        <nav class="hidden md:flex items-center gap-3 font-medium text-sm sm:text-base" aria-label="Sider">${desktopLenker}
          <a href="${NG_SOK}" rel="noopener"
            class="ml-2 bg-gradient-to-r from-red-600 to-rose-500 text-white px-4 sm:px-5 py-1.5 sm:py-2 rounded-lg shadow hover:from-red-700 hover:to-rose-600 font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-300 text-sm sm:text-base">
            SØK HER
          </a>
          <button id="themeToggleNav"
            class="ml-2 p-1.5 sm:p-2 bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700 transition"
            title="Bytt mellom lyst og mørkt tema" aria-label="Bytt mellom lyst og mørkt tema" type="button">
            ${ngSolIkon("nav-sun", "w-4 h-4 sm:w-5 sm:h-5")}
            ${ngMaaneIkon("nav-moon", "w-4 h-4 sm:w-5 sm:h-5")}
          </button>
        </nav>

        <button id="sidebarOpenBtn" type="button" class="mobilmeny-knapp md:hidden"
          aria-label="Åpne meny" aria-expanded="false" aria-controls="mobileSidebar">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  </header>

  <div id="sidebarOverlay" class="mobilmeny-overlegg md:hidden"></div>

  <nav id="mobileSidebar" class="mobilmeny md:hidden" aria-label="Meny" aria-hidden="true" inert>
    <div class="mobilmeny-topp">
      <a href="${p}index.html" class="text-lg font-bold text-red-600 dark:text-red-500">NORGINSA</a>
      <button id="sidebarCloseBtn" type="button" class="mobilmeny-lukk" aria-label="Lukk meny">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <div class="mobilmeny-lenker">${menyLenker}</div>

    <div class="mobilmeny-bunn">
      <a href="${NG_SOK}" rel="noopener" class="knapp knapp-primar w-full">SØK HER</a>
      <button id="sidebarThemeToggle" type="button" class="mobilmeny-tema"
        aria-label="Bytt mellom lyst og mørkt tema">
        ${ngSolIkon("sidebar-sun", "w-5 h-5")}
        ${ngMaaneIkon("sidebar-moon", "w-5 h-5")}
        <span>Bytt tema</span>
      </button>
    </div>
  </nav>
  <div class="pt-24"></div>
  `;
}

function getNavbarHTML() {
  return byggNavbar("");
}

function getArtikkelNavbarHTML() {
  return byggNavbar("../../");
}
