#!/usr/bin/env python3
"""Sjekker arkiv/arkiv.json før deploy.

    python3 sjekk-arkiv.py

Ett komma for mye i arkiv.json, og forsiden, artikkellista og «Les også»
står tomme. Kjøres i GitHub Actions på hver push og pull request, men kan
også kjøres lokalt.
"""
import json, pathlib, re, sys

try:
    artikler = json.loads(pathlib.Path("arkiv/arkiv.json").read_text(encoding="utf-8"))["templates"]
except (OSError, ValueError, KeyError) as e:
    sys.exit(f"arkiv/arkiv.json kan ikke leses: {e}")

feil = []
for a in artikler:
    m = a.get("folder", "")
    for fil in (f"arkiv/{m}/{m}.html", f"arkiv/{m}/images/preview.jpg"):
        if not pathlib.Path(fil).is_file():
            feil.append(f"{a.get('name', m)}: {fil} finnes ikke")
    # Sorteringen på forsiden og i arkivet forutsetter DD-MM-ÅÅÅÅ
    if not re.fullmatch(r"\d\d-\d\d-\d{4}", str(a.get("created", ""))):
        feil.append(f"{a.get('name', m)}: created må være DD-MM-ÅÅÅÅ, er {a.get('created')!r}")

if feil:
    sys.exit("\n".join(feil))
print(f"arkiv.json ok: {len(artikler)} artikler")
