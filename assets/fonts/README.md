# Skrifter

`ibm-plex-sans-latin.woff2` og `ibm-plex-sans-latin-ext.woff2` er IBM Plex Sans,
hentet fra Google Fonts (v23) og lagret her i stedet for å lastes fra
fonts.gstatic.com. Begge er variable fonter: samme fil dekker vekt 500, 600 og
700, som er de vektene siden bruker.

`@font-face`-reglene står i `assets/css/site.css`, med samme `unicode-range`
som Google brukte — latin-ext lastes bare ned hvis en bokstav trenger den.

Skal vektene endres, må fila byttes ut: hent ny CSS fra Google Fonts med en
vanlig nettleser-User-Agent, se hvilken `.woff2` den peker på, og last den ned.

Lisens: SIL Open Font License 1.1, se LICENSE.txt.
