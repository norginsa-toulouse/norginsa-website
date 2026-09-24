#!/usr/bin/env python3
"""Genererer FAQPage-strukturerte data for about.html fra FAQ-en på siden.

Kjør denne hver gang du endrer spørsmål eller svar:

    python3 faq-schema.py

Den leser <details class="faq-sporsmal"> som ikke er kommentert ut, og skriver
et <script type="application/ld+json"> nederst i <head>. Google kan da vise
spørsmålene rett i søkeresultatet.
"""
import json, pathlib, re, sys

SIDE = pathlib.Path("about.html")
URL = "https://www.norginsa.no/about"
START = "  <!-- FAQ-strukturerte data. Generert av faq-schema.py, ikke rediger for hånd. -->\n"
SLUTT = "\n  <!-- /FAQ-strukturerte data -->\n"

def ren(html):
    html = re.sub(r"<!--.*?-->", "", html, flags=re.S)
    return html

def tekst(html):
    t = re.sub(r"<[^>]+>", " ", html)
    t = (t.replace("&ndash;", "–").replace("&middot;", "·")
          .replace("&amp;", "&").replace("&nbsp;", " "))
    t = " ".join(t.split())
    # Taggene ble til mellomrom, så «teknologi </i>.» ble «teknologi .»
    t = re.sub(r"\s+([.,;:!?»)])", r"\1", t)
    t = re.sub(r"([«(])\s+", r"\1", t)
    return t

def main():
    s = SIDE.read_text(encoding="utf-8")
    par = re.findall(
        r'<details class="faq-sporsmal"[^>]*>\s*<summary>(.*?)</summary>\s*'
        r'<div class="faq-svar">(.*?)</div>\s*</details>', ren(s), re.S)
    if not par:
        sys.exit("Fant ingen spørsmål i about.html")

    data = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "url": URL,
        "mainEntity": [
            {"@type": "Question", "name": tekst(sp),
             "acceptedAnswer": {"@type": "Answer", "text": tekst(sv)}}
            for sp, sv in par
        ],
    }
    blokk = (START + '  <script type="application/ld+json">\n'
             + json.dumps(data, ensure_ascii=False, indent=2)
             + "\n  </script>" + SLUTT)

    s = re.sub(re.escape(START) + r"[\s\S]*?" + re.escape(SLUTT), "", s)
    s = s.replace("</head>", blokk + "</head>", 1)
    SIDE.write_text(s, encoding="utf-8")
    print(f"{len(par)} spørsmål skrevet til about.html")

if __name__ == "__main__":
    main()
