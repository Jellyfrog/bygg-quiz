# Byggkoll

Studiekort och quiz för byggbranschen. 161 bildkort i sex kategorier – verktyg,
maskiner, material, skydd, konstruktion och installationer – med fokus på
husbyggnad, t.ex. uppförande av ett lägenhetshus.

Ren HTML, CSS och JavaScript. Inget backend, inga beroenden i körläget och inga
externa anrop – allt är statiska filer som kan ligga på GitHub Pages eller vilken
filserver som helst.

Bilderna är foton från Wikimedia Commons som ligger nedladdade i `img/` – 119 av
143 begrepp. För resten saknar Commons användbara bilder, och där visas i stället
en handritad SVG. Varje kort har en SVG som reserv, så appen fungerar även om ett
foto skulle saknas eller inte kunna laddas.

## Kör

```bash
python3 -m http.server 8000
# öppna http://localhost:8000
```

Det går även att öppna `index.html` direkt från filsystemet. Webbläsare blockerar
`fetch()` mot lokala JSON-filer, så appen faller då tillbaka på den förgenererade
kopian i `data/bundle.js`.

## Publicering

`.github/workflows/pages.yml` publicerar sajten till GitHub Pages vid varje push
till `main`, `master` eller utvecklingsgrenen. Flödet validerar frågedatan med
`node build.mjs`, kontrollerar att `data/bundle.js` är i synk med JSON-filerna,
kopierar bara det sajten behöver till `_site` och deployar.

Engångsinställning i repot: **Settings → Pages → Source = "GitHub Actions"**.
Därefter sker allt vid push. Ingen server, ingen databas.

## Lägen

| Läge | Vad det gör |
| --- | --- |
| **Lärkort** | Bilden visas, du tänker efter och vänder kortet. Du bedömer själv om du kunde det. Bäst för inlärning. |
| **Quiz** | Fyra alternativ, direkt rätt/fel och faktaruta efter varje svar. |
| **Repetera svaga** | Quiz med bara de kort du brukar svara fel på eller inte sett än. |
| **Bläddra** | Uppslagsverk över alla kort med bild, namn och fakta. Sökbart. |

Korten kommer alltid i slumpad ordning, kategorierna är valbara och passets
längd väljs till 10, 20, 40 eller alla kort.

Ett kort du svarar fel på läggs tillbaka i kön några kort senare och kommer
igen tills det sitter. Varje kort har en nivå 0–5 (Leitner-princip): rätt svar
höjer ett steg, fel svar sänker två. Från nivå 3 räknas kortet som "kan du" i
statistiken. Allt sparas i `localStorage` per webbläsare och nollställs med
knappen ↺ uppe till höger.

## Innehåll

| Kategori | Kort |
| --- | --- |
| Verktyg | 30 |
| Maskiner | 25 |
| Material | 39 |
| Skydd & säkerhet | 19 |
| Konstruktion | 29 |
| VVS & el | 19 |

Samtliga 161 kort är bildfrågor. De flesta frågar "Vad heter detta?", resten är
tillämpningsfrågor på samma bild ("Varför har skruven trumpetformat huvud?",
"På vilken sida av isoleringen ska ångspärren sitta?").

## Filer

```
index.html               gränssnitt
css/style.css            formgivning, ljust och mörkt läge
js/app.js                logik: pass, kö, självrättning, statistik
js/icons/*.js            143 SVG-illustrationer, en fil per kategori
img/*.jpg                119 nedladdade foton (max 720 px, ca 8 MB totalt)
data/*.json              frågorna – redigeras här
data/bundle.js           genererad kopia av JSON för file://-läge
data/bilder.js           genererad bildkatalog med upphov och licens
build.mjs                genererar bundle.js och validerar frågorna
tools/sokord.json        sökord mot Commons per bild
tools/val.json           överstyrning: vilken kandidat som ska användas
tools/hamta-bilder.mjs   hämtar foton och skriver data/bilder.js
tools/optimera.py        krymper fotona till max 720 px jpg
.github/workflows/       publicering till GitHub Pages
```

## Lägga till frågor

Redigera rätt fil i `data/` och kör sedan `node build.mjs`.

```json
{
  "id": "vt-fogsvans",
  "bild": "fogsvans",
  "fraga": "Vad heter detta?",
  "ratt": "Fogsvans",
  "fel": ["Bågfil", "Ryggsåg", "Kapsåg"],
  "fakta": "Handsåg för grovkapning i trä."
}
```

* `id` – unikt, används för statistiken. Byt inte i onödan.
* `bild` – namnet på en ikon i `js/icons/`. Nya ikoner läggs till i samma
  format: `namn: \`<svg viewBox="0 0 120 120"> … </svg>\`` med två inledande
  mellanslag, så hittar `build.mjs` dem.
* `fraga` – valfri, standard är "Vad heter detta?".
* `fel` – minst tre alternativ. De fyra visade alternativen blandas varje gång.
* `typ: "anvandning"` – markerar en tillämpningsfråga. Sådana visas inte i
  bläddra-vyn, eftersom den listar ett kort per begrepp.

`build.mjs` kontrollerar dubbletter av id, att ikonerna finns, att rätt svar
inte råkat hamna bland felalternativen och att varje fråga har minst fyra
alternativ. Den avslutar med felkod om något är fel.

## Bilder

Fotona hämtas från Wikimedia Commons och filtreras på fri licens (public domain
och CC). Upphovsperson, licens och länk till källsidan sparas per bild i
`data/bilder.js`, visas under bilden i appen och listas samlat under
"Bildkällor" i bläddra-vyn.

```bash
node tools/hamta-bilder.mjs --sok   # söker fram kandidater (nätverk, tar en stund)
node tools/hamta-bilder.mjs         # laddar ner valda bilder och krymper dem
```

Fritextsökning på Commons ger en del skräpträffar – sökningen på "cold chisel"
hittade rockbandet i stället för huggmejseln. Blir en bild fel: titta i
`tools/kandidater.json` på listan för det id:t och peka ut en annan i
`tools/val.json`, antingen med nummer, exakt filnamn eller `false` för att behålla
SVG-illustrationen.

```json
{
  "hammare": 3,
  "tumstock": "File:Zollstock.jpg",
  "huggmejsel": false
}
```

`python3 tools/kontaktkarta.py` bygger en HTML-sida med alla nedladdade foton och
rätt svar under varje bild – snabbaste sättet att se om någon bild visar fel sak.

Kör sedan `TVINGA=1 node tools/hamta-bilder.mjs` för att hämta om. Vill du hellre
söka på något annat – ändra sökordet i `tools/sokord.json` och kör om med `--sok`.

Kort utan foto faller tillbaka på SVG-illustrationen automatiskt, både om filen
saknas i `data/bilder.js` och om `<img>` misslyckas med att ladda.

## Tangentbord

* `1`–`4` – svara i quiz
* `mellanslag` / `enter` – vänd kort och gå vidare
* i lärkortsläget efter vändning: `1` = öva mer, `2` = kunde den
