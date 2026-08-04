/* Bygger data/bundle.js av JSON-filerna och validerar innehållet.
   Körs med:  node build.mjs
   bundle.js används när sidan öppnas direkt från filsystemet (file://),
   där fetch() av lokala JSON-filer blockeras av webbläsaren. */

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const rot = dirname(fileURLToPath(import.meta.url));
const KATEGORIER = ['verktyg', 'maskiner', 'material', 'skydd', 'konstruktion', 'installationer'];

/* --- foton från data/bilder.json: varje kort måste ha minst ett --- */
const foton = new Set(Object.keys(JSON.parse(readFileSync(join(rot, 'data', 'bilder.json'), 'utf8')).bilder));

const fel = [];
const varningar = [];
const anvanda = new Set();
const bundle = {};
let antal = 0;

for (const id of KATEGORIER) {
  const sokvag = join(rot, 'data', `${id}.json`);
  const kat = JSON.parse(readFileSync(sokvag, 'utf8'));
  bundle[id] = kat;

  if (kat.id !== id) fel.push(`${id}.json: fältet "id" är "${kat.id}"`);
  if (!Array.isArray(kat.fragor) || !kat.fragor.length) fel.push(`${id}.json: saknar frågor`);

  const sedda = new Set();
  for (const f of kat.fragor) {
    antal++;
    if (!f.id) fel.push(`${id}: fråga utan id (${f.ratt})`);
    if (sedda.has(f.id)) fel.push(`${id}: dubblett av id "${f.id}"`);
    sedda.add(f.id);

    if (!f.ratt) fel.push(`${f.id}: saknar rätt svar`);
    if (!Array.isArray(f.fel) || f.fel.length < 3) fel.push(`${f.id}: behöver minst 3 felaktiga alternativ`);
    if (f.fel && f.fel.includes(f.ratt)) fel.push(`${f.id}: rätt svar finns även bland felalternativen`);
    if (f.fel && new Set(f.fel).size !== f.fel.length) fel.push(`${f.id}: dubbletter bland felalternativen`);
    if (!f.fakta) varningar.push(`${f.id}: saknar faktatext`);

    if (f.bild) {
      anvanda.add(f.bild);
      if (!foton.has(f.bild)) fel.push(`${f.id}: "${f.bild}" saknar foto i data/bilder.json`);
    } else {
      varningar.push(`${f.id}: bildlös fråga`);
    }
  }
}

const oanvandaFoton = [...foton].filter((i) => !anvanda.has(i));

const huvud = '/* GENERERAD AV build.mjs – redigera data/*.json och kör "node build.mjs" istället. */\n';
writeFileSync(join(rot, 'data', 'bundle.js'), `${huvud}window.BQ_BUNDLE = ${JSON.stringify(bundle, null, 1)};\n`);

const medBild = Object.values(bundle).flatMap((k) => k.fragor).filter((f) => f.bild).length;

console.log(`Kategorier : ${KATEGORIER.length}`);
console.log(`Frågor     : ${antal} (${medBild} med bild, ${Math.round((medBild / antal) * 100)} %)`);
console.log(`Foton      : ${foton.size} kort med foto`);
if (oanvandaFoton.length) console.log(`Foton utan fråga: ${oanvandaFoton.join(', ')}`);
if (varningar.length) console.log(`Varningar  : ${varningar.length}\n  ${varningar.join('\n  ')}`);
if (fel.length) {
  console.error(`\nFEL (${fel.length}):\n  ${fel.join('\n  ')}`);
  process.exit(1);
}
console.log('\nOK – data/bundle.js skriven.');
