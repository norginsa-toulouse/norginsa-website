function getNavbarHTML() {
  return `
  
  <header
    class="bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-red-100/30 dark:border-gray-800/70 fixed w-full z-50 shadow-sm transition-colors duration-300"
    role="navigation" aria-label="Hovedmeny">
    <div class="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
      <div class="flex justify-between items-center py-3 sm:py-4">
        <!-- Brand / Logo -->
        <a href="index.html"
          class="flex items-center gap-1.5 sm:gap-2 text-xl sm:text-2xl font-extrabold text-red-600 hover:text-red-700 transition tracking-tight select-none"
          aria-label="Til forsiden">
          <span>NORGINSA</span>
        </a>
        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-3 font-medium text-sm sm:text-base" aria-label="Hovedmeny">
          <a href="index.html"
            class="px-2 py-1 rounded transition hover:text-red-600 focus-visible:outline focus-visible:ring-2 focus-visible:ring-red-400 text-gray-700 dark:text-gray-100">Hjem</a>
          <a href="about.html"
            class="px-2 py-1 rounded transition hover:text-red-600 focus-visible:outline focus-visible:ring-2 focus-visible:ring-red-400 text-gray-700 dark:text-gray-100">Om programmet</a>
          <a href="sokeguiden.html"
            class="px-2 py-1 rounded transition hover:text-red-600 focus-visible:outline focus-visible:ring-2 focus-visible:ring-red-400 text-gray-700 dark:text-gray-100">Søkeguiden</a>
          <a href="arkiv.html"
            class="px-2 py-1 rounded transition hover:text-red-600 focus-visible:outline focus-visible:ring-2 focus-visible:ring-red-400 text-gray-700 dark:text-gray-100">Artikler</a>
          <a href="kontakt.html"
            class="px-2 py-1 rounded transition hover:text-red-600 focus-visible:outline focus-visible:ring-2 focus-visible:ring-red-400 text-gray-700 dark:text-gray-100">Kontakt oss</a>
          <a href="https://utdanning.no/tema/utdanning_i_utlandet/ingeniorstudier_i_toulouse"  rel="noopener"
            class="ml-2 bg-gradient-to-r from-red-600 to-rose-500 text-white px-4 sm:px-5 py-1.5 sm:py-2 rounded-lg shadow hover:from-red-700 hover:to-rose-600 font-semibold transition duration-200 flex items-center gap-1 sm:gap-2 focus:outline-none focus:ring-2 focus:ring-red-300 text-sm sm:text-base">
            SØK HER
          </a>
          <button id="themeToggleNav"
            class="ml-2 p-1.5 sm:p-2 bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700 transition"
            title="Bytt mellom lyst og mørkt tema" aria-label="Bytt mellom lyst og mørkt tema" type="button">
            <svg id="nav-sun" class="w-4 h-4 sm:w-5 sm:h-5 hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2">
              <circle cx="12" cy="12" r="5" />
              <path
                d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M16.36 16.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M16.36 7.64l1.42-1.42" />
            </svg>
            <svg id="nav-moon" class="w-4 h-4 sm:w-5 sm:h-5 block" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1111.21 3c.03 0 .06.01.09.01a7 7 0 0010.7 9.78z" />
            </svg>
          </button>
        </nav>
        <!-- Mobile Hamburger -->
        <div class="md:hidden flex items-center">
          <button id="sidebarOpenBtn" aria-label="Åpne meny"
            class="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Sidebar Overlay -->
    <div id="sidebarOverlay"
      class="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity md:hidden">
    </div>

    <!-- Mobile Sidebar -->
    <nav id="mobileSidebar"
      class="fixed top-0 left-0 bottom-0 h-[100dvh] w-[90vw] max-w-xs min-w-[240px] bg-white dark:bg-gray-900 border-r border-red-100/30 dark:border-gray-800/70 shadow-lg z-50
      transform -translate-x-full transition-transform duration-300 ease-in-out flex flex-col md:hidden
      overflow-y-auto backdrop-blur-md"
      aria-label="Mobilmeny" tabindex="-1" style="padding:0.75rem 0.9rem;">
      <div class="flex items-center justify-between mb-3">
        <span href="index.html" class="text-lg sm:text-xl font-bold text-red-600">NORGINSA</span>
        <button id="sidebarCloseBtn" aria-label="Lukk meny"
          class="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500">
          <svg class="w-5 h-5 text-gray-900 dark:text-gray-200" fill="none" stroke="currentColor" stroke-width="2"
            viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="flex-1 flex flex-col gap-1.5 sm:gap-2 py-2">
        <a href="index.html"
          class="block px-3 py-1.5 rounded hover:bg-red-100 dark:hover:bg-gray-700 text-sm">Hjem</a>
        <a href="about.html"
          class="block px-3 py-1.5 rounded hover:bg-red-100 dark:hover:bg-gray-700 text-sm">Om programmet</a>
        <a href="sokeguiden.html"
          class="block px-3 py-1.5 rounded hover:bg-red-100 dark:hover:bg-gray-700 text-sm">Søkeguiden</a>
        <a href="arkiv.html"
          class="block px-3 py-1.5 rounded hover:bg-red-100 dark:hover:bg-gray-700 text-sm">Artikler</a>
        <a href="kontakt.html"
          class="block px-3 py-1.5 rounded hover:bg-red-100 dark:hover:bg-gray-700 text-sm">Kontakt oss</a>
        <a href="https://utdanning.no/tema/utdanning_i_utlandet/ingeniorstudier_i_toulouse"  rel="noopener"
          class="block bg-gradient-to-r from-red-600 to-rose-500 text-white px-4 py-1.5 rounded-lg shadow hover:from-red-700 hover:to-rose-600 font-semibold transition duration-200 mt-2 text-sm">
          SØK HER
        </a>
        <button id="sidebarThemeToggle"
          class="mt-auto mb-3 p-2 flex items-center justify-center gap-1 sm:gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700 transition text-sm"
          type="button" aria-label="Bytt mellom lyst og mørkt tema">
          <svg id="sidebar-sun" class="w-5 h-5 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="5" stroke-width="2" />
            <path stroke-linecap="round" stroke-width="2"
              d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M16.36 16.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M16.36 7.64l1.42-1.42" />
          </svg>
          <svg id="sidebar-moon" class="w-5 h-5 block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-width="2"
              d="M21 12.79A9 9 0 1111.21 3c.03 0 .06.01.09.01a7 7 0 0010.7 9.78z" />
          </svg>
          Endre Tema
        </button>
      </div>
    </nav>
  </header><div class="pt-24"></div>
  `}

function getArtikkelNavbarHTML() {
  return `
  
  <header
    class="bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-red-100/30 dark:border-gray-800/70 fixed w-full z-50 shadow-sm transition-colors duration-300"
    role="navigation" aria-label="Hovedmeny">
    <div class="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
      <div class="flex justify-between items-center py-3 sm:py-4">
        <!-- Brand / Logo -->
        <a href="../../index.html"
          class="flex items-center gap-1.5 sm:gap-2 text-xl sm:text-2xl font-extrabold text-red-600 hover:text-red-700 transition tracking-tight select-none"
          aria-label="Til forsiden">
          <span>NORGINSA</span>
        </a>
        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-3 font-medium text-sm sm:text-base" aria-label="Hovedmeny">
          <a href="../../index.html"
            class="px-2 py-1 rounded transition hover:text-red-600 focus-visible:outline focus-visible:ring-2 focus-visible:ring-red-400 text-gray-700 dark:text-gray-100">Hjem</a>
          <a href="../../about.html"
            class="px-2 py-1 rounded transition hover:text-red-600 focus-visible:outline focus-visible:ring-2 focus-visible:ring-red-400 text-gray-700 dark:text-gray-100">Om programmet</a>
          <a href="../../sokeguiden.html"
            class="px-2 py-1 rounded transition hover:text-red-600 focus-visible:outline focus-visible:ring-2 focus-visible:ring-red-400 text-gray-700 dark:text-gray-100">Søkeguiden</a>
          <a href="../../arkiv.html"
            class="px-2 py-1 rounded transition hover:text-red-600 focus-visible:outline focus-visible:ring-2 focus-visible:ring-red-400 text-gray-700 dark:text-gray-100">Artikler</a>
          <a href="../../kontakt.html"
            class="px-2 py-1 rounded transition hover:text-red-600 focus-visible:outline focus-visible:ring-2 focus-visible:ring-red-400 text-gray-700 dark:text-gray-100">Kontakt oss</a>
          <a href="https://utdanning.no/tema/utdanning_i_utlandet/ingeniorstudier_i_toulouse"  rel="noopener"
            class="ml-2 bg-gradient-to-r from-red-600 to-rose-500 text-white px-4 sm:px-5 py-1.5 sm:py-2 rounded-lg shadow hover:from-red-700 hover:to-rose-600 font-semibold transition duration-200 flex items-center gap-1 sm:gap-2 focus:outline-none focus:ring-2 focus:ring-red-300 text-sm sm:text-base">
            SØK HER
          </a>
          <button id="themeToggleNav"
            class="ml-2 p-1.5 sm:p-2 bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700 transition"
            title="Bytt mellom lyst og mørkt tema" aria-label="Bytt mellom lyst og mørkt tema" type="button">
            <svg id="nav-sun" class="w-4 h-4 sm:w-5 sm:h-5 hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2">
              <circle cx="12" cy="12" r="5" />
              <path
                d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M16.36 16.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M16.36 7.64l1.42-1.42" />
            </svg>
            <svg id="nav-moon" class="w-4 h-4 sm:w-5 sm:h-5 block" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1111.21 3c.03 0 .06.01.09.01a7 7 0 0010.7 9.78z" />
            </svg>
          </button>
        </nav>
        <!-- Mobile Hamburger -->
        <div class="md:hidden flex items-center">
          <button id="sidebarOpenBtn" aria-label="Åpne meny"
            class="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <!-- Sidebar Overlay -->
    <div id="sidebarOverlay"
      class="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity md:hidden">
    </div>
    <!-- Mobile Sidebar -->
    <nav id="mobileSidebar"
      class="fixed top-0 left-0 bottom-0 h-[100dvh] w-[90vw] max-w-xs min-w-[240px] bg-white dark:bg-gray-900 border-r border-red-100/30 dark:border-gray-800/70 shadow-lg z-50
      transform -translate-x-full transition-transform duration-300 ease-in-out flex flex-col md:hidden
      overflow-y-auto backdrop-blur-md"
      aria-label="Mobilmeny" tabindex="-1" style="padding:0.75rem 0.9rem;">
      <div class="flex items-center justify-between mb-3">
        <span href="../../index.html" class="text-lg sm:text-xl font-bold text-red-600">NORGINSA</span>
        <button id="sidebarCloseBtn" aria-label="Lukk meny"
          class="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500">
          <svg class="w-5 h-5 text-gray-900 dark:text-gray-200" fill="none" stroke="currentColor" stroke-width="2"
            viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="flex-1 flex flex-col gap-1.5 sm:gap-2 py-2">
        <a href="../../index.html"
          class="block px-3 py-1.5 rounded hover:bg-red-100 dark:hover:bg-gray-700 text-sm">Hjem</a>
        <a href="../../about.html"
          class="block px-3 py-1.5 rounded hover:bg-red-100 dark:hover:bg-gray-700 text-sm">Om programmet</a>
        <a href="../../sokeguiden.html"
          class="block px-3 py-1.5 rounded hover:bg-red-100 dark:hover:bg-gray-700 text-sm">Søkeguiden</a>
        <a href="../../arkiv.html"
          class="block px-3 py-1.5 rounded hover:bg-red-100 dark:hover:bg-gray-700 text-sm">Artikler</a>
        <a href="../../kontakt.html"
          class="block px-3 py-1.5 rounded hover:bg-red-100 dark:hover:bg-gray-700 text-sm">Kontakt oss</a>
        <a href="https://utdanning.no/tema/utdanning_i_utlandet/ingeniorstudier_i_toulouse"  rel="noopener"
          class="block bg-gradient-to-r from-red-600 to-rose-500 text-white px-4 py-1.5 rounded-lg shadow hover:from-red-700 hover:to-rose-600 font-semibold transition duration-200 mt-2 text-sm">
          SØK HER
        </a>
        <button id="sidebarThemeToggle"
          class="mt-auto mb-3 p-2 flex items-center justify-center gap-1 sm:gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700 transition text-sm"
          type="button" aria-label="Bytt mellom lyst og mørkt tema">
          <svg id="sidebar-sun" class="w-5 h-5 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="5" stroke-width="2" />
            <path stroke-linecap="round" stroke-width="2"
              d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M16.36 16.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M16.36 7.64l1.42-1.42" />
          </svg>
          <svg id="sidebar-moon" class="w-5 h-5 block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-width="2"
              d="M21 12.79A9 9 0 1111.21 3c.03 0 .06.01.09.01a7 7 0 0010.7 9.78z" />
          </svg>
          Endre Tema
        </button>
      </div>
    </nav>
  </header><div class="pt-24"></div>
  `}
