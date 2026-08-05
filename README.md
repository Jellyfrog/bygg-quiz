# Byggkoll

Studiekort och quiz för byggbranschen. 182 bildkort i sex kategorier – verktyg,
maskiner, material, skydd, konstruktion och installationer – med fokus på
husbyggnad, t.ex. uppförande av ett lägenhetshus.

Ren HTML, CSS och JavaScript. Inget backend, inga beroenden i körläget och inga
externa anrop – allt är statiska filer som kan ligga på GitHub Pages eller vilken
filserver som helst.

Bilderna är foton från Wikimedia Commons som ligger nedladdade i `img/` – 455
foton på 163 begrepp, alltså i snitt knappt tre per kort. Appen slumpar fram två
av dem sida vid sida vid varje visning (ett foto om begreppet bara har ett), så
att du lär dig känna igen begreppet och inte en viss bild. Klicka på ett foto för
att förstora det över hela skärmen och klicka igen – eller tryck Escape – för att
stänga. Varje foto är granskat manuellt mot sin fråga; begrepp där Commons inte
har någon användbar bild finns helt enkelt inte som kort. Upphov och licenser
listas under "Bildkällor och licenser" i bläddra-vyn.

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

Korten kommer alltid i slumpad ordning och svarsalternativen blandas om varje
gång ett kort visas, så att rätt svar inte hamnar på samma plats. Kategorierna är
valbara och passets längd väljs till 10, 20, 40 eller alla kort.

Ett kort du svarar fel på läggs tillbaka i kön några kort senare och kommer
igen tills det sitter. Varje kort har en nivå 0–5 (Leitner-princip): rätt svar
höjer ett steg, fel svar sänker två. Från nivå 3 räknas kortet som "kan du" i
statistiken. Allt sparas i `localStorage` per webbläsare och nollställs med
knappen ↺ uppe till höger.

## Innehåll

| Kategori | Kort |
| --- | --- |
| Verktyg | 41 |
| Maskiner | 32 |
| Material | 42 |
| Skydd & säkerhet | 22 |
| Konstruktion | 24 |
| VVS & el | 21 |

Samtliga 182 kort är bildfrågor. De flesta frågar "Vad heter detta?", resten är
tillämpningsfrågor på samma bild ("Varför har skruven trumpetformat huvud?",
"På vilken sida av isoleringen ska ångspärren sitta?").

## Filer

```
index.html               gränssnitt
css/style.css            formgivning, ljust och mörkt läge
js/app.js                logik: pass, kö, självrättning, statistik
img/*.jpg                455 nedladdade foton (max 720 px, ca 32 MB totalt)
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
* `bild` – namnet på ett begrepp som har foton i `data/bilder.js`. Lägg till
  sökord i `tools/sokord.json` och kör hämtaren innan du lägger till frågan.
* `fraga` – valfri, standard är "Vad heter detta?".
* `fel` – minst tre alternativ. De fyra visade alternativen blandas varje gång.
* `typ: "anvandning"` – markerar en tillämpningsfråga. Sådana visas inte i
  bläddra-vyn, eftersom den listar ett kort per begrepp.

`build.mjs` kontrollerar dubbletter av id, att varje kort har foto, att rätt svar
inte råkat hamna bland felalternativen och att varje fråga har minst fyra
alternativ. Den avslutar med felkod om något är fel.

## Bilder

Fotona hämtas från Wikimedia Commons och filtreras på fri licens (public domain
och CC). Upphovsperson, licens och länk till källsidan sparas per bild i
`data/bilder.js` och listas samlat under "Bildkällor" i bläddra-vyn.

```bash
node tools/hamta-bilder.mjs --sok   # söker fram kandidater (nätverk, tar en stund)
node tools/hamta-bilder.mjs         # laddar ner valda bilder och krymper dem
```

Fritextsökning på Commons ger en del skräpträffar – sökningen på "cold chisel"
hittade rockbandet i stället för huggmejseln. Blir en bild fel: titta i
`tools/kandidater.json` på listan för det id:t och peka ut en annan i
`tools/val.json`, antingen med nummer, exakt filnamn eller `false` för att stänga
av kortet helt.

```json
{
  "hammare": [1, 4, 6],
  "tumstock": "File:Zollstock.jpg",
  "huggmejsel": false
}
```

En lista är ett granskat urval och används exakt som den står – den fylls aldrig
på med ogranskat material. Ett tal lägger den kandidaten först och fyller på med
de bäst rankade, `false` betyder inget foto alls. Utan post tas de bäst rankade
kandidaterna. `MAX_BILDER` i skriptet styr taket per kort.

`python3 tools/kontaktkarta.py` bygger en HTML-sida med alla nedladdade foton och
rätt svar under varje bild – snabbaste sättet att se om någon bild visar fel sak.

Kör sedan `TVINGA=1 node tools/hamta-bilder.mjs` för att hämta om. Vill du hellre
söka på något annat – ändra sökordet i `tools/sokord.json` och kör om med `--sok`.

Kommer ett kort tillbaka senare i passet visas det med en annan av sina bilder.
Ett kort utan foto i `data/bilder.js` underkänns av `node build.mjs`.

## Tangentbord

* `1`–`4` – svara i quiz
* `mellanslag` / `enter` – vänd kort och gå vidare
* i lärkortsläget efter vändning: `1` = öva mer, `2` = kunde den
