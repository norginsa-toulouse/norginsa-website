function getFloatingButton() {
    return `
    <button id="themeToggleBtn"
    class="floating-btn bg-gradient-to-r from-red-600 to-rose-500 dark:from-gray-700 dark:to-gray-800 text-white p-3 rounded-full shadow-xl hover:scale-110 focus:outline-none duration-200"
    title="Bytt mellom lyst og mørkt tema" aria-label="Bytt mellom lyst og mørkt tema">
    <svg id="icon-sun" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hidden" fill="none" viewBox="0 0 24 24"
      stroke="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="5" stroke-width="2" />
      <path stroke-linecap="round" stroke-width="2"
        d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M16.36 16.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M16.36 7.64l1.42-1.42" />
    </svg>
    <svg id="icon-moon" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 block" fill="none" viewBox="0 0 24 24"
      stroke="currentColor" aria-hidden="true">
      <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        d="M21 12.79A9 9 0 1111.21 3c.03 0 .06.01.09.01a7 7 0 0010.7 9.78z" />
    </svg>
  </button>
    `;
}