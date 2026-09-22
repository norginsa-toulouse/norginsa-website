
# NORGINSA - Nettside

Hva som mangler:
- [ ] Search engine optimisering
- [ ] Legge til oppsummering av NORGINSA-programmet på /about.html siden
- [ ] Passe på at tekstboksen i /arkiv.html er trygg og ikke kan ødelegge siden
- [ ] Skrive masse artikler!
    - [ ] ANSA-Toulouse - Aleksander skriver
    - [ ] PO-er
      - [ ] IMACS
      - [ ] IC
      - [ ] ICBE
    - [ ] Arrangementer
      - [ ] Vintur
      - [ ] Julebord
      - [ ] 17. Mai
      - [ ] Afterworks
      - [ ] PK
      - [ ] BOOM
    - [ ] Studiet
      - [ ] Søknadsprosessen
      - [ ] Førsteklasse
      - [ ] Utveksling / Dobbeldiplom
      - [ ] Stage / Internship
      - [ ] Feriesystem
      - [ ] Chazel
      - [ ] Hebras
      - [ ] Nyttige lenker (kopi av wiki-siden ish)
    - [ ] Campus
      - [ ] AS
      - [ ] RU
      - [ ] Campus-Appen
    - [ ] Livet i Toulouse
      - [ ] Barer i Toulouse
      - [ ] Bosituasjonen på campus
      - [ ] Bosituasjonen i byen
    - [ ] Quoi de nøff
    - [ ] Intervjue tidligere NORGINSA for erfaringer


## 🧱 Prosjektstruktur

```bash
.
├── ny-artikkel.sh              # lager en ny artikkel for deg (se under)
├── index.html                  # Hjemmeside
├── about.html                  # Om NORGINSA siden
├── kontakt.html                # Kontaktside
├── arkiv.html                  # Arkivside
├── sitemap.xml                 # må oppdateres når en artikkel publiseres
├── assets/
│   ├── css/
│   │   └── site.css            # felles komponenter: kort, knapper, animasjon
│   ├── images/                 # bilder som ikke hører til en artikkel
│   ├── vendor/                 # AOS (animasjoner), lokal kopi
│   └── js/
│       ├── getFooter.js        # genererer footeren
│       ├── getNavbar.js        # genererer navbaren (og temaknappen)
│       ├── navbar.js           # mobilmeny, animasjoner
│       ├── theme.js            # lys/mørk modus
│       └── bunnscript.js       # startes nederst på artikkelsidene
└── arkiv/
    ├── arkiv.json              # lista over alle artikler
    ├── eksempelartikkel/       # mal med alle formateringsmuligheter
    └── artikkelnavn/
        ├── artikkelnavn.html   # samme navn som mappa!
        └── images/
            ├── preview.jpg     # forhåndsvisning, må hete akkurat dette
            └── ...
```
# Hvordan skrive en artikkel

Kjør skriptet fra rota av prosjektet:

```bash
./ny-artikkel.sh
```

Det spør om mappenavn, tittel, beskrivelse og forfatter, og lager
mappa, en ferdig HTML-fil med riktige metatagger, og oppføringen i
`arkiv/arkiv.json`. Du kan også gi alt på én linje:

```bash
./ny-artikkel.sh sokeguiden "Søkeguiden" "Slik søker du på NORGINSA" "Ola Nordmann"
```

Artikkelen legges inn som **utkast**, så den dukker ikke opp på forsiden
før du er ferdig med den.

### Så gjenstår det fire ting

1. **Legg inn forhåndsvisningsbildet** i `arkiv/<mappe>/images/preview.jpg`.
   Filnavnet må være nøyaktig `preview.jpg` med små bokstaver, ellers blir
   kortet i arkivet stående med et ødelagt bilde.

2. **Skriv artikkelen** i `arkiv/<mappe>/<mappe>.html`, der det står
   `SKRIV ARTIKKELEN HER`. I `arkiv/eksempelartikkel/eksempelartikkel.html`
   ligger ferdige blokker for bilde med tekst ved siden av, bildegalleri,
   lister, sitater og lenker. Copy-paste derfra.

3. **Sjekk taggene** i `arkiv/arkiv.json`. Skriptet setter `"Studiet"` som
   standard. Taggene som er i bruk nå er `Studiet`, `Studiehverdagen`,
   `Studenthistorier`, `Tradisjoner`, `Tekna`, `ANSA` og `Diverse info`.

4. **Publiser**: fjern `"utkast": true` fra `arkiv/arkiv.json`, og legg
   artikkelen inn i `sitemap.xml`. Skriptet skriver ut den ferdige linja du
   skal lime inn.

### Oppføringen i `arkiv/arkiv.json`

Skriptet fyller ut dette for deg, men slik ser den ut:

```json
{
  "name": "NoTail",
  "description": "Et ellevillt barprosjekt i en promololeilighet",
  "folder": "notail",
  "tags": ["Studenthistorier"],
  "author": "Andreas Holmsen",
  "created": "08-06-2024",
  "featured": true
}
```

| felt | betyr |
|---|---|
| `name` | tittelen som vises på kortet i arkivet |
| `description` | én setning, vises under tittelen |
| `folder` | mappenavnet, og dermed også filnavnet |
| `tags` | liste med kategorier |
| `author` | `"Navn"`, eller `["Navn", "Annet navn"]` hvis dere er flere |
| `created` | dato på formen `DD-MM-ÅÅÅÅ`, styrer rekkefølgen på forsiden |
| `featured` | gir «Utvalgt»-merket i arkivet |
| `utkast` | `true` skjuler artikkelen fra forsiden mens du jobber |

Forsiden viser de tre nyeste artiklene som ikke er utkast, sortert på
`created`.

## 📚 Teknologier Brukt

* **HTML5**
* **Tailwind CSS**
* **JavaScript (Vanilla)**
* **JSON** for å dynamisk laste inn data

#### Template stjålet fra https://github.com/x01-open-source/webhub
