function getFooterHTML() {
  // Footeren har med vilje ingen sidemeny: navbaren står fast øverst på alle
  // sider, så lenkene var bare en ekstra kolonne som tok halve mobilskjermen.
  // Igjen står kontaktpunktene og én linje med opphavsrett og forbehold.
  const kontakt = [
    ["mailto:toulouse@ansa.no", "toulouse@ansa.no"],
    ["https://www.instagram.com/norginsa/", "@norginsa"],
    ["https://www.instagram.com/ansatoulouse/", "@ansatoulouse"],
  ].map(([href, tekst]) =>
    `<a href="${href}" rel="noopener" class="hover:text-white/75 underline-offset-4 hover:underline">${tekst}</a>`
  ).join("");

  return `
  <footer class="bg-gradient-to-tr from-red-700 to-rose-600 text-white mt-12 border-t border-red-500 dark:border-rose-700" role="contentinfo">
  <div class="max-w-7xl mx-auto px-6 py-4 sm:py-5">
    <div class="flex flex-col items-center gap-x-8 gap-y-2 md:flex-row-reverse md:justify-between">
      <div class="flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm">${kontakt}
      </div>
      <p class="text-center text-xs text-white/75 md:text-left">
        © ${new Date().getFullYear()} <span class="font-semibold text-white">NORGINSA</span> &middot; uoffisiell side, bygget med masse
        <svg class="inline-block w-4 h-4 mx-0.5 text-red-500 -mt-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" aria-label="Hjerte">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 1.01 4.5 2.5C13.09 4.01 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        av studentene i Toulouse.
      </p>
    </div>
  </div>
</footer>
  `}
