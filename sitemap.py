#!/usr/bin/env python3
"""Genererer sitemap.xml fra arkiv/arkiv.json og de faste sidene.

Kjør denne hver gang du publiserer eller fjerner en artikkel:

    python3 sitemap.py

Artikler merket "utkast": true holdes utenfor. Det er hele poenget: en
uferdig side skal ikke meldes inn til Google, for tynt innhold trekker ned
hele domenet. Før dette ble laget hadde fire utkast sneket seg inn.
"""
import json, pathlib, re, sys

BASE = "https://www.norginsa.no"
FASTE = ["/", "/about", "/sokeguiden", "/kontakt", "/artikler"]
ARKIV = pathlib.Path("arkiv/arkiv.json")
UT = pathlib.Path("sitemap.xml")


def iso(dato):
    """DD-MM-ÅÅÅÅ eller DD.MM.ÅÅÅÅ -> ÅÅÅÅ-MM-DD."""
    d = re.split(r"[-.]", str(dato or "").strip())
    if len(d) != 3 or len(d[2]) != 4:
        return None
    return f"{d[2]}-{d[1]}-{d[0]}"


def main():
    if not ARKIV.exists():
        sys.exit("Kjør skriptet fra rota av nettsideprosjektet.")
    artikler = json.loads(ARKIV.read_text(encoding="utf-8"))["templates"]

    publisert = [a for a in artikler if not a.get("utkast")]
    utkast = [a for a in artikler if a.get("utkast")]

    linjer = ['<?xml version="1.0" encoding="UTF-8"?>',
              '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', ""]
    for sti in FASTE:
        linjer.append(f"  <url><loc>{BASE}{sti}</loc></url>")
    linjer += ["", "  <!-- Artikler. Utkast holdes utenfor, se sitemap.py -->"]

    for a in sorted(publisert, key=lambda x: x["folder"].lower()):
        m = a["folder"]
        sti = f"{BASE}/arkiv/{m}/{m}"
        d = iso(a.get("created"))
        mangler = not (pathlib.Path("arkiv") / m / f"{m}.html").exists()
        if mangler:
            print(f"  ADVARSEL: arkiv/{m}/{m}.html finnes ikke, hopper over")
            continue
        linjer.append(f"  <url><loc>{sti}</loc>"
                      + (f"<lastmod>{d}</lastmod>" if d else "") + "</url>")

    linjer += ["", "</urlset>", ""]
    UT.write_text("\n".join(linjer), encoding="utf-8")

    print(f"sitemap.xml: {len(FASTE)} faste sider + {len(publisert)} artikler")
    if utkast:
        print(f"holdt utenfor ({len(utkast)} utkast): "
              + ", ".join(a["name"] for a in utkast))


if __name__ == "__main__":
    main()
