"""Bygger en HTML-kontaktkarta över alla nedladdade foton, för snabb granskning.

    python3 tools/kontaktkarta.py && open tools/kontaktkarta.html
"""

import json
import os

ROT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

with open(os.path.join(ROT, "data", "bilder.json"), encoding="utf8") as f:
    bilder = json.load(f)["bilder"]

# id -> visningsnamn från frågedatan, så att bild och rätt svar kan jämföras
namn = {}
for fil in os.listdir(os.path.join(ROT, "data")):
    if not fil.endswith(".json") or fil == "bilder.json":
        continue
    with open(os.path.join(ROT, "data", fil), encoding="utf8") as f:
        for fraga in json.load(f)["fragor"]:
            if fraga.get("bild") and fraga.get("typ") != "anvandning":
                namn.setdefault(fraga["bild"], fraga["ratt"])

celler = []
for bild_id in sorted(bilder):
    b = bilder[bild_id]
    celler.append(
        f'<div class=c><img src="../{b["fil"]}" loading="lazy">'
        f'<div class=n>{namn.get(bild_id, bild_id)}</div>'
        f'<div class=i>{bild_id}</div></div>'
    )

html = (
    "<meta charset=utf8><style>"
    "body{background:#fff;font:12px system-ui;margin:0;padding:8px}"
    ".g{display:grid;grid-template-columns:repeat(6,1fr);gap:6px}"
    ".c{border:1px solid #ddd;border-radius:6px;overflow:hidden}"
    ".c img{width:100%;height:110px;object-fit:cover;display:block}"
    ".n{font-weight:600;padding:3px 5px 0}"
    ".i{color:#777;padding:0 5px 4px;font-size:10px}"
    f"</style><div class=g>{''.join(celler)}</div>"
)

ut = os.path.join(ROT, "tools", "kontaktkarta.html")
with open(ut, "w", encoding="utf8") as f:
    f.write(html)
print(f"{len(celler)} bilder -> {ut}")
