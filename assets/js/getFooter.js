function getFooterHTML() {
  return `
  <footer class="bg-gradient-to-tr from-red-700 to-rose-600 text-white mt-16 border-t border-red-500 dark:border-rose-700" role="contentinfo">
  <div class="max-w-7xl mx-auto px-6 py-12">
    <div class="flex flex-col md:flex-row justify-between items-center md:items-start gap-6 md:gap-0">
      <div class="text-center md:text-left max-w-md">
        <p class="text-sm md:text-base font-light">
          © 2025 <span class="font-semibold">NORGINSA</span>. Bygget med masse
          <svg class="inline-block w-5 h-5 mx-1 text-red-500 -mt-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" aria-label="Hjerte">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 1.01 4.5 2.5C13.09 4.01 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          av studentene.
        </p>
        <p class="mt-2 text-red-100 text-xs md:text-sm italic tracking-wide">
          Fordi vi er travle folk - template stjålet <a href="https://github.com/x01-open-source/webhub">herfra🌍</a>
        </p>
      </div>
      <nav class="flex space-x-8 justify-center md:justify-end text-sm md:text-base font-medium" aria-label="Bunnmeny">
        <!--<a href="index.html" class="relative group hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-300 rounded">
          Home
          <span class="absolute left-0 bottom-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
        </a>
        <a href="arkiv.html" class="relative group hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-300 rounded">
          Templates
          <span class="absolute left-0 bottom-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
        </a>
        <a href="about.html" class="relative group hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-300 rounded">
          About
          <span class="absolute left-0 bottom-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
        </a>
        <a href="https://github.com/x01-open-source/NORGINSA" target="_blank" rel="noopener" class="relative group hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-300 rounded inline-flex items-center gap-1">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true" aria-label="GitHub">
            <path d="M12 2C6.5 2 2 6.5 2 12a10 10 0 006.8 9.5c.5.1.7-.2.7-.5v-2c-2.3.5-2.8-1-2.8-1-.4-.9-1-.95-1-.95-.8-.5.1-.5.1-.5 1 .1 1.5 1 1.5 1 .8 1.5 2 1 2.5.8a2.7 2.7 0 01.8-1.7c-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6 1-2.1 0-.2-.4-1 .1-2a6.2 6.2 0 011.5 0 5 5 0 013 0 6.3 6.3 0 011.5 0c.4 1 .1 1.8.1 2 .6.5 1 1.2 1 2.1 0 3-1.8 3.7-3.6 4 .3.4.6 1.3.6 2.6v3.8c0 .3.2.6.7.5A10 10 0 0022 12c0-5.5-4.5-10-10-10z"/>
          </svg>
          GitHub
        </a>-->
      </nav>
    </div>
  </div>
</footer>
  `}