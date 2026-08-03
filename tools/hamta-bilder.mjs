/* Hämtar riktiga foton från Wikimedia Commons till img/ och skriver data/bilder.json.
 *
 *   node tools/hamta-bilder.mjs --sok     söker fram nya kandidater (nätverk)
 *   node tools/hamta-bilder.mjs           laddar ner valda bilder och skriver bilder.json
 *
 * Endast fritt licensierade filer används (public domain och CC). Upphovsperson,
 * licens och källa sparas per bild och visas i appen.
 *
 * tools/val.json styr vilken kandidat som väljs:
 *   { "hammare": 2 }                     -> kandidat nr 2 i listan
 *   { "hammare": "File:Exakt namn.jpg" } -> en specifik fil
 *   { "hammare": false }                 -> inget foto, behåll SVG-illustrationen
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, unlinkSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const rot = join(dirname(fileURLToPath(import.meta.url)), '..');
const API = 'https://commons.wikimedia.org/w/api.php';
const UA = 'ByggkollBildhamtare/1.0 (utbildningsmaterial; kontakt via GitHub)';
const BREDD = 800;
const KANDIDATER = 8;

const sokord = JSON.parse(readFileSync(join(rot, 'tools', 'sokord.json'), 'utf8'));
const val = existsSync(join(rot, 'tools', 'val.json'))
  ? JSON.parse(readFileSync(join(rot, 'tools', 'val.json'), 'utf8'))
  : {};

const ids = Object.keys(sokord).filter((k) => !k.startsWith('_'));

/* ------------------------------------------------------------------ hjälp */

const sov = (ms) => new Promise((r) => setTimeout(r, ms));

async function json(url, forsok = 8) {
  for (let i = 0; i < forsok; i++) {
    try {
      const r = await fetch(url, { headers: { 'User-Agent': UA } });
      if (r.status === 429) throw new Error('HTTP 429');
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return await r.json();
    } catch (e) {
      if (i === forsok - 1) throw e;
      await sov(2500 * (i + 1));   // Commons strypar i korta fönster – korta omförsök räcker
    }
  }
}

function text(meta, nyckel) {
  const v = meta && meta[nyckel] && meta[nyckel].value;
  if (!v) return '';
  return String(v).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

/* Fri licens? Commons har även en del filer med begränsningar. */
function arFri(meta) {
  const licens = (text(meta, 'LicenseShortName') || '').toLowerCase();
  const tillat = /^(cc|public domain|pd|gfdl|fal|no restrictions|attribution)/.test(licens) ||
    licens.includes('cc0');
  const begransning = (text(meta, 'Restrictions') || '').toLowerCase();
  return tillat && !licens.includes('fair') && !begransning.includes('trademark');
}

/* ----------------------------------------------------------------- sökning */

async function sok(id) {
  const u = new URL(API);
  u.search = new URLSearchParams({
    action: 'query',
    format: 'json',
    generator: 'search',
    gsrsearch: `filetype:bitmap ${sokord[id]}`,
    gsrnamespace: '6',
    gsrlimit: String(KANDIDATER * 2),
    prop: 'imageinfo',
    iiprop: 'url|size|mime|extmetadata',
    iiurlwidth: String(BREDD)
  });

  const data = await json(u.toString());
  const sidor = Object.values((data.query && data.query.pages) || {});
  sidor.sort((a, b) => (a.index || 0) - (b.index || 0));

  return sidor
    .map((p) => {
      const ii = p.imageinfo && p.imageinfo[0];
      if (!ii) return null;
      const meta = ii.extmetadata || {};
      if (!['image/jpeg', 'image/png'].includes(ii.mime)) return null;
      if (ii.width < 640) return null;
      if (!arFri(meta)) return null;
      return {
        titel: p.title,
        fil: ii.thumburl,
        mime: ii.mime,
        sida: ii.descriptionurl,
        upphov: text(meta, 'Artist') || 'Okänd',
        licens: text(meta, 'LicenseShortName') || 'Se Commons',
        beskrivning: text(meta, 'ObjectName')
      };
    })
    .filter(Boolean)
    .slice(0, KANDIDATER);
}

async function sokAlla() {
  const fil = join(rot, 'tools', 'kandidater.json');
  const ut = existsSync(fil) ? JSON.parse(readFileSync(fil, 'utf8')) : {};
  const kvar = ids.filter((id) => process.argv.includes('--allt') || !(ut[id] && ut[id].length));
  console.log(`Söker ${kvar.length} bilder (${ids.length - kvar.length} finns redan).`);

  let n = 0;
  for (const id of kvar) {
    try {
      ut[id] = await sok(id);
    } catch (e) {
      ut[id] = ut[id] || [];
      console.error(`  ! ${id}: ${e.message}`);
    }
    n++;
    if (!ut[id].length) console.log(`  tom: ${id} ("${sokord[id]}")`);
    if (n % 20 === 0) console.log(`  ${n}/${kvar.length} …`);
    await sov(1500);
  }
  writeFileSync(fil, JSON.stringify(ut, null, 1));
  console.log(`Kandidater sparade. Med träff: ${ids.filter((i) => ut[i] && ut[i].length).length}/${ids.length}`);
}

/* -------------------------------------------------------------- nedladdning */

/* Träffordningen från Commons sätter inte alltid den tydligaste bilden först.
   Poängsätt filnamnet mot sökorden och låt de första sökorden väga tyngst –
   de är huvudordet ("excavator"), medan de sista är kontext ("construction"). */
function poang(titel, id) {
  const ord = sokord[id].toLowerCase().split(/\s+/).filter((o) => o.length > 2);
  const t = titel.toLowerCase();
  return ord.reduce((sum, o, i) => sum + (t.includes(o) ? ord.length - i : 0), 0);
}

function valjKandidat(id, lista) {
  const v = val[id];
  if (v === false) return null;              // behåll den ritade illustrationen
  if (!lista || !lista.length) return null;
  if (typeof v === 'number') return lista[v - 1] || lista[0];
  if (typeof v === 'string') return lista.find((k) => k.titel === v) || lista[0];

  let bast = lista[0];
  let bastPoang = poang(lista[0].titel, id);
  lista.forEach(function (k) {
    const p = poang(k.titel, id);
    if (p > bastPoang) { bast = k; bastPoang = p; }
  });
  return bast;
}

async function hamtaFil(url, mal, forsok = 12) {
  for (let i = 0; i < forsok; i++) {
    const r = await fetch(url, { headers: { 'User-Agent': UA } });
    if (r.ok) { writeFileSync(mal, Buffer.from(await r.arrayBuffer())); return true; }
    if (r.status !== 429 || i === forsok - 1) throw new Error('HTTP ' + r.status);
    await sov(2000 * (i + 1));
  }
  return false;
}

async function laddaNer() {
  const kandidater = JSON.parse(readFileSync(join(rot, 'tools', 'kandidater.json'), 'utf8'));
  const raw = join(rot, 'tools', 'raw');
  if (!existsSync(raw)) mkdirSync(raw, { recursive: true });

  const valdaFil = join(raw, 'valda.json');
  const valda = existsSync(valdaFil) ? JSON.parse(readFileSync(valdaFil, 'utf8')) : {};

  const bilder = {};
  let hamtade = 0;
  let saknas = [];

  // Commons svarar 429 i korta fönster. Några parallella hämtningar med
  // omförsök ger klart bättre genomströmning än en i taget.
  const PARALLELLT = 3;
  const kö = ids.slice();

  async function arbetare() {
    while (kö.length) {
      const id = kö.shift();
      const k = valjKandidat(id, kandidater[id]);
      if (!k) { saknas.push(id); continue; }

      const ext = k.mime === 'image/png' ? 'png' : 'jpg';
      const kalla = join(raw, `${id}.${ext}`);
      const inaktuell = valda[id] !== k.titel;   // annat val än förra körningen

      if (!existsSync(kalla) || inaktuell || process.env.TVINGA) {
        try {
          await hamtaFil(k.fil, kalla);
        } catch (e) {
          console.error(`  ! ${id}: ${e.message}`);
          saknas.push(id);
          continue;
        }
        // ett tidigare val kan ha haft annat filformat – ta bort resten
        for (const annan of ['jpg', 'png']) {
          const gammal = join(raw, `${id}.${annan}`);
          if (annan !== ext && existsSync(gammal)) unlinkSync(gammal);
        }
        hamtade++;
        if (hamtade % 10 === 0) console.log(`  ${hamtade} hämtade …`);
        await sov(300);
      }
      valda[id] = k.titel;

      bilder[id] = {
        fil: `img/${id}.jpg`,
        titel: k.titel.replace(/^File:/, ''),
        upphov: k.upphov,
        licens: k.licens,
        kalla: k.sida
      };
    }
  }

  await Promise.all(Array.from({ length: PARALLELLT }, arbetare));

  writeFileSync(valdaFil, JSON.stringify(valda, null, 1));

  // krymp till webbstorlek: tools/raw/*.jpg|png -> img/*.jpg
  spawnSync('python3', [join(rot, 'tools', 'optimera.py')], { stdio: 'inherit' });

  writeFileSync(
    join(rot, 'data', 'bilder.json'),
    JSON.stringify({ _kommentar: 'Genererad av tools/hamta-bilder.mjs', bilder }, null, 1)
  );
  writeFileSync(
    join(rot, 'data', 'bilder.js'),
    '/* GENERERAD AV tools/hamta-bilder.mjs */\nwindow.BQ_BILDER = ' +
      JSON.stringify(bilder, null, 1) + ';\n'
  );

  console.log(`Bilder totalt : ${Object.keys(bilder).length} av ${ids.length}`);
  console.log(`Nyhämtade     : ${hamtade}`);
  if (saknas.length) console.log(`Utan foto     : ${saknas.join(', ')}`);
}

/* -------------------------------------------------------------------- kör */

if (process.argv.includes('--sok')) await sokAlla();
await laddaNer();
