// Bildeslideshow for artikler.
// Artikkelen definerer `slideshowImages`, har et tomt rutenett med
// id="slideshowGrid", og setter inn modalen med getSlideshowPopup().
//
// Modalen settes inn ETTER at denne filen er lastet, så den slås opp først når
// den brukes. Før krasjet scriptet her på en null-referanse, slik at «lukk ved
// klikk utenfor bildet» aldri ble koblet opp.
let currentSlide = 0;

function slideshowModalEl() {
  return document.getElementById('slideshowModal');
}

const slideshowGrid = document.getElementById('slideshowGrid');
if (slideshowGrid && Array.isArray(window.slideshowImages)) {
  slideshowImages.forEach((src, i) => {
    const btn = document.createElement('button');
    btn.className = "focus:outline-none";
    btn.onclick = () => openSlideshow(i);
    btn.innerHTML = `<img src="${src}" alt="Bilde ${i + 1}" loading="lazy" decoding="async" class="w-full h-40 object-cover rounded-lg shadow" />`;
    slideshowGrid.appendChild(btn);
  });
}

// Close on ESC or click outside image
document.addEventListener('keydown', function (e) {
  const modal = slideshowModalEl();
  if (!modal || modal.classList.contains('hidden')) return;
  if (e.key === "Escape") closeSlideshow();
  if (e.key === "ArrowLeft") changeSlide(-1);
  if (e.key === "ArrowRight") changeSlide(1);
});
document.addEventListener('click', function (e) {
  const modal = slideshowModalEl();
  if (modal && e.target === modal) closeSlideshow();
});

function openSlideshow(index) {
  currentSlide = index;
  document.getElementById('slideshowImage').src = slideshowImages[currentSlide];
  slideshowModalEl().classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeSlideshow() {
  slideshowModalEl().classList.add('hidden');
  document.body.style.overflow = '';
}

function changeSlide(direction) {
  currentSlide = (currentSlide + direction + slideshowImages.length) % slideshowImages.length;
  document.getElementById('slideshowImage').src = slideshowImages[currentSlide];
}

function getSlideshowPopup() {
  return `
        <div id="slideshowModal" class="fixed inset-0 z-[9999] bg-black bg-opacity-80 flex items-center justify-center hidden">
      <button onclick="closeSlideshow()" class="absolute top-6 right-8 text-white text-3xl font-bold hover:text-red-400 focus:outline-none" aria-label="Lukk">&times;</button>
      <button onclick="changeSlide(-1)" class="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 text-white text-4xl font-bold px-3 py-1 bg-black bg-opacity-40 rounded-full hover:bg-opacity-70 focus:outline-none" aria-label="Forrige bilde">&#10094;</button>
      <img id="slideshowImage" src="" alt="Slideshow bilde" class="max-h-[80vh] max-w-[90vw] rounded-lg shadow-xl border-4 border-white" />
      <button onclick="changeSlide(1)" class="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 text-white text-4xl font-bold px-3 py-1 bg-black bg-opacity-40 rounded-full hover:bg-opacity-70 focus:outline-none" aria-label="Neste bilde">&#10095;</button>
    </div>
        `;
}
