"""Krymper nedladdade foton till webbvänliga jpg i img/.

Läser tools/raw/<id>.<ext> och skriver img/<id>.jpg, max 720 px längsta sida.
Körs automatiskt av tools/hamta-bilder.mjs, men kan köras separat:

    python3 tools/optimera.py
"""

import os
import sys
from PIL import Image, ImageOps

ROT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROT, "tools", "raw")
UT = os.path.join(ROT, "img")
MAX = 720
KVALITET = 78

os.makedirs(UT, exist_ok=True)

antal = 0
byte_in = 0
byte_ut = 0

for namn in sorted(os.listdir(RAW)):
    kalla = os.path.join(RAW, namn)
    if not os.path.isfile(kalla):
        continue
    bild_id = os.path.splitext(namn)[0]
    mal = os.path.join(UT, bild_id + ".jpg")

    try:
        with Image.open(kalla) as im:
            im = ImageOps.exif_transpose(im)
            if im.mode in ("RGBA", "LA", "P"):
                im = im.convert("RGBA")
                platta = Image.new("RGB", im.size, (255, 255, 255))
                platta.paste(im, mask=im.split()[-1])
                im = platta
            else:
                im = im.convert("RGB")
            im.thumbnail((MAX, MAX), Image.LANCZOS)
            im.save(mal, "JPEG", quality=KVALITET, optimize=True, progressive=True)
    except Exception as fel:  # trasig nedladdning
        print(f"  ! {namn}: {fel}", file=sys.stderr)
        continue

    antal += 1
    byte_in += os.path.getsize(kalla)
    byte_ut += os.path.getsize(mal)

if antal:
    print(
        f"Optimerade {antal} bilder: {byte_in // 1024} kB -> {byte_ut // 1024} kB "
        f"({byte_ut // antal // 1024} kB i snitt)"
    )
