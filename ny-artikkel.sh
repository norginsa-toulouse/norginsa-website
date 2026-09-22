#!/usr/bin/env bash
#
# Lager en ny artikkel i arkivet: mappe, ferdig utfylt HTML og oppføring i
# arkiv/arkiv.json. Artikkelen legges inn som utkast, så den dukker ikke opp
# på forsiden før du er ferdig.
#
#   ./ny-artikkel.sh                          (spør om alt)
#   ./ny-artikkel.sh sokeguiden               (spør om resten)
#   ./ny-artikkel.sh sokeguiden "Søkeguiden" "Slik søker du" "Ola Nordmann"
#
set -euo pipefail

[[ -f arkiv/arkiv.json ]] || { echo "Kjør skriptet fra rota av nettsideprosjektet." >&2; exit 1; }

spør() {  # spør <ledetekst> <eksisterende verdi>
  local svar="$2"
  while [[ -z "$svar" ]]; do read -r -p "$1: " svar; done
  printf '%s' "$svar"
}

MAPPE="${1:-}"; TITTEL="${2:-}"; BESKRIVELSE="${3:-}"; FORFATTER="${4:-}"

MAPPE=$(spør "Mappenavn (små bokstaver, ingen mellomrom, f.eks. sokeguiden)" "$MAPPE")
if [[ ! "$MAPPE" =~ ^[a-zA-Z0-9_-]+$ ]]; then
  echo "Ugyldig mappenavn: «$MAPPE». Bruk bokstaver, tall, _ og - (ingen mellomrom eller æøå)." >&2
  exit 1
fi
[[ -e "arkiv/$MAPPE" ]] && { echo "arkiv/$MAPPE finnes allerede. Velg et annet navn." >&2; exit 1; }

TITTEL=$(spør "Tittel (vises som overskrift og i Google)" "$TITTEL")
BESKRIVELSE=$(spør "Kort beskrivelse (én setning, vises på kortet i arkivet)" "$BESKRIVELSE")
FORFATTER=$(spør "Forfatter (Fornavn Etternavn)" "$FORFATTER")

DATO=$(date +%d-%m-%Y)

mkdir -p "arkiv/$MAPPE/images"

# HTML-en skrives med python3 for å slippe skallets tegnsetting i teksten.
MAPPE="$MAPPE" TITTEL="$TITTEL" BESKRIVELSE="$BESKRIVELSE" FORFATTER="$FORFATTER" DATO="$DATO" \
python3 - <<'PY'
import html, json, os, pathlib, re

mappe = os.environ["MAPPE"]
tittel = os.environ["TITTEL"]
beskrivelse = os.environ["BESKRIVELSE"]
forfatter = os.environ["FORFATTER"]
dato = os.environ["DATO"]

e = html.escape          # trygt i attributter og tekst
url = f"https://www.norginsa.no/arkiv/{mappe}/{mappe}"

sider = f"""<!DOCTYPE html>
<html lang="no" class="scroll-smooth">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{e(tittel)} | NORGINSA</title>
  <meta name="description" content="{e(beskrivelse)}">
  <link rel="canonical" href="{url}">

  <!-- Open Graph / deling på sosiale medier -->
  <meta property="og:site_name" content="NORGINSA">
  <meta property="og:type" content="article">
  <meta property="og:url" content="{url}">
  <meta property="og:title" content="{e(tittel)} | NORGINSA">
  <meta property="og:description" content="{e(beskrivelse)}">
  <meta property="og:image" content="https://www.norginsa.no/arkiv/{mappe}/images/preview.jpg">
  <meta property="og:locale" content="nb_NO">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" type="image/x-icon" href="../../assets/images/icon.ico">

  <!-- Skrift, stil og Tailwind -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@500;600;700&display=swap">
  <link rel="stylesheet" href="../../assets/css/site.css">
  <link href="../../assets/vendor/aos.css" rel="stylesheet" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="../../assets/js/tailwind-oppsett.js"></script>

  <!-- Temaet settes før siden tegnes, så den ikke blinker hvit i mørk modus -->
  <script>
    (function () {{
      try {{
        var lagret = localStorage.getItem("theme");
        var mork = lagret ? lagret === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
        if (mork) document.documentElement.classList.add("dark");
      }} catch (e) {{}}
    }})();
  </script>
  <script src="../../assets/js/theme.js" defer></script>
</head>

<body class="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300 relative font-sans">

  <!-- Navbar -->
  <div id="navbar"></div>
  <script src="../../assets/js/getNavbar.js"></script>
  <script>document.getElementById("navbar").innerHTML = getArtikkelNavbarHTML();</script>
  <script src="../../assets/js/navbar.js"></script>

  <!-- ======= TITTEL ======= -->
  <section class="fade-down-anim max-w-7xl mx-auto px-4">
    <div class="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
      <div class="px-6 py-16 text-center">
        <p class="inline-flex items-center gap-2 text-sm font-medium text-red-600 dark:text-red-400">
          SIST OPPDATERT: {e(dato)}
        </p>
        <h1 class="mt-3 text-3xl sm:text-5xl font-bold tracking-tight">
          {e(tittel)}
        </h1>
        <p class="mt-3 text-base sm:text-lg text-gray-600 dark:text-gray-300">
          SKREVET AV: {e(forfatter)}
        </p>
      </div>
    </div>
  </section>

  <div class="mx-2 md:mx-0">

    <!-- ======= SKRIV ARTIKKELEN HER =======
         arkiv/eksempelartikkel/eksempelartikkel.html har ferdige blokker for
         bilde med tekst ved siden av, bildegalleri, lister, sitater og lenker.
         Copy-paste derfra og bytt ut innholdet. -->

    <div class="fade-down-anim max-w-4xl mx-auto my-12">
      <h2 class="text-2xl font-bold mb-4">Første overskrift</h2>
      <p class="mb-4">
        Skriv her.
      </p>
    </div>

  </div>

  <!-- Footer -->
  <div id="footer"></div>
  <script src="../../assets/js/getFooter.js"></script>
  <script>document.getElementById("footer").innerHTML = getFooterHTML();</script>

  <!-- Scripts -->
  <script src="../../assets/vendor/aos.js"></script>
  <script src="../../assets/js/bunnscript.js"></script>
</body>

</html>
"""

pathlib.Path(f"arkiv/{mappe}/{mappe}.html").write_text(sider, encoding="utf-8")

# Ny oppføring settes inn øverst i arkiv.json. Teksten settes inn som streng
# i stedet for å dumpe hele JSON-en på nytt, så resten av fila beholder
# formateringen sin og diffen blir liten.
p = pathlib.Path("arkiv/arkiv.json")
s = p.read_text(encoding="utf-8")
j = lambda v: json.dumps(v, ensure_ascii=False)
ny = (
    "\n    {\n"
    f"      \"name\": {j(tittel)},\n"
    f"      \"description\": {j(beskrivelse)},\n"
    f"      \"folder\": {j(mappe)},\n"
    "      \"utkast\": true,\n"
    "      \"tags\": [\n        \"Studiet\"\n      ],\n"
    f"      \"author\": {j(forfatter)},\n"
    f"      \"created\": {j(dato)},\n"
    "      \"featured\": false\n"
    "    },"
)
m = re.search(r'"templates"\s*:\s*\[', s)
if not m:
    raise SystemExit("Fant ikke \"templates\"-lista i arkiv/arkiv.json")
s = s[: m.end()] + ny + s[m.end():]
json.loads(s)                      # stopper før skriving hvis noe ble ugyldig
p.write_text(s, encoding="utf-8")
PY

cat <<EOF

Ferdig. Opprettet:
  arkiv/$MAPPE/$MAPPE.html
  arkiv/$MAPPE/images/
  + oppføring i arkiv/arkiv.json (som utkast)

Neste steg:
  1. Legg et forhåndsvisningsbilde i arkiv/$MAPPE/images/preview.jpg
     (må hete nøyaktig preview.jpg, med små bokstaver)
  2. Skriv artikkelen i arkiv/$MAPPE/$MAPPE.html
  3. Sjekk taggene i arkiv/arkiv.json - den står på "Studiet" nå
  4. Når den er klar: fjern "utkast": true fra arkiv.json, og legg denne
     linja i sitemap.xml:

  <url><loc>https://www.norginsa.no/arkiv/$MAPPE/$MAPPE</loc><lastmod>$(date +%Y-%m-%d)</lastmod></url>

EOF
