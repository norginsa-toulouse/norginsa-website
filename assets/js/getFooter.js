function getFooterHTML() {
  // Footeren injiseres både fra rota og fra arkiv/<mappe>/, så stiene må
  // få riktig dybde. Navbaren løser det med to funksjoner; her holder det
  // med å se på adressen.
  const rot = location.pathname.includes("/arkiv/") ? "../../" : "";
  return `
  <footer class="bg-gradient-to-tr from-red-700 to-rose-600 text-white mt-16 border-t border-red-500 dark:border-rose-700" role="contentinfo">
  <div class="max-w-7xl mx-auto px-6 py-12">
    <div class="flex flex-col md:flex-row justify-between items-center md:items-start gap-6 md:gap-0">
      <div class="text-center md:text-left max-w-md">
        <p class="text-sm md:text-base font-light">
          © ${new Date().getFullYear()} <span class="font-semibold">NORGINSA</span>. Bygget med masse
          <svg class="inline-block w-5 h-5 mx-1 text-red-500 -mt-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" aria-label="Hjerte">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 1.01 4.5 2.5C13.09 4.01 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          av studentene.
        </p>
      </div>
      <nav class="grid grid-cols-2 gap-x-10 gap-y-2 text-sm md:text-base" aria-label="Bunnmeny">
        <div>
          <p class="font-semibold mb-2 text-white/70 text-xs uppercase tracking-wider">Sider</p>
          <ul class="space-y-1.5 list-none p-0 m-0">
            <li><a href="${rot}index.html" class="hover:text-white/80 underline-offset-4 hover:underline">Hjem</a></li>
            <li><a href="${rot}about.html" class="hover:text-white/80 underline-offset-4 hover:underline">Om programmet</a></li>
            <li><a href="${rot}sokeguiden.html" class="hover:text-white/80 underline-offset-4 hover:underline">Søkeguiden</a></li>
            <li><a href="${rot}artikler.html" class="hover:text-white/80 underline-offset-4 hover:underline">Artikler</a></li>
            <li><a href="${rot}kontakt.html" class="hover:text-white/80 underline-offset-4 hover:underline">Kontakt oss</a></li>
          </ul>
        </div>
        <div>
          <p class="font-semibold mb-2 text-white/70 text-xs uppercase tracking-wider">Kontakt</p>
          <ul class="space-y-1.5 list-none p-0 m-0">
            <li><a href="mailto:toulouse@ansa.no" class="hover:text-white/80 underline-offset-4 hover:underline">toulouse@ansa.no</a></li>
            <li><a href="https://www.instagram.com/norginsa/" rel="noopener" class="hover:text-white/80 underline-offset-4 hover:underline">@norginsa</a></li>
            <li><a href="https://www.instagram.com/ansatoulouse/" rel="noopener" class="hover:text-white/80 underline-offset-4 hover:underline">@ansatoulouse</a></li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</footer>
  `}