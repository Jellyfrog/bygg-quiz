/* Byggkoll – studiekort och quiz för byggbranschen.
   Frågorna ligger i data/*.json. Bilderna är foton från Wikimedia Commons
   (data/bilder.js + img/, flera per begrepp). */

(function () {
  'use strict';

  var KATEGORIER = ['verktyg', 'maskiner', 'material', 'skydd', 'konstruktion', 'installationer'];
  var LAGRING = 'byggkoll.v1';
  var MAX_BOX = 5;          // Leitner-nivå 0–5, 3 eller mer räknas som "kan"
  var ATERKOMST = 4;        // hur många kort senare ett feltaggat kort dyker upp igen

  var $ = function (id) { return document.getElementById(id); };

  /* ---------------------------------------------------------- data ---- */

  var kategorier = [];      // [{id, namn, emoji, beskrivning, fragor:[...]}]
  var allaFragor = [];      // platt lista, varje fråga har .kategori och .kategoriNamn

  function laddaKategori(id) {
    return fetch('data/' + id + '.json', { cache: 'no-cache' })
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .catch(function () {
        // fetch fungerar inte när sidan öppnas direkt från filsystemet (file://).
        // Då används den förgenererade kopian i data/bundle.js istället.
        var b = window.BQ_BUNDLE && window.BQ_BUNDLE[id];
        if (!b) throw new Error('Kunde inte läsa data/' + id + '.json');
        return JSON.parse(JSON.stringify(b));
      });
  }

  function laddaAllt() {
    return Promise.all(KATEGORIER.map(laddaKategori)).then(function (list) {
      kategorier = list;
      allaFragor = [];
      list.forEach(function (kat) {
        kat.fragor.forEach(function (f) {
          f.kategori = kat.id;
          f.kategoriNamn = kat.namn;
          allaFragor.push(f);
        });
      });
    });
  }

  /* ------------------------------------------------------- statistik ---- */

  var stat = { fragor: {} };

  function laesStat() {
    try {
      var rå = localStorage.getItem(LAGRING);
      if (rå) {
        var p = JSON.parse(rå);
        if (p && p.fragor) stat = p;
      }
    } catch (e) { /* ignorera trasig lagring */ }
  }

  function sparaStat() {
    try { localStorage.setItem(LAGRING, JSON.stringify(stat)); } catch (e) { /* full disk / privat läge */ }
  }

  function statFor(id) {
    if (!stat.fragor[id]) stat.fragor[id] = { box: 0, sedd: 0, ratt: 0, fel: 0 };
    return stat.fragor[id];
  }

  function registrera(fraga, korrekt) {
    var s = statFor(fraga.id);
    s.sedd++;
    if (korrekt) {
      s.ratt++;
      s.box = Math.min(MAX_BOX, s.box + 1);
    } else {
      s.fel++;
      s.box = Math.max(0, s.box - 2);
    }
    sparaStat();
  }

  function kanFraga(id) { return (stat.fragor[id] || {}).box >= 3; }

  function kategoriKoll(kat) {
    var kan = 0;
    kat.fragor.forEach(function (f) { if (kanFraga(f.id)) kan++; });
    return { kan: kan, totalt: kat.fragor.length, andel: kat.fragor.length ? kan / kat.fragor.length : 0 };
  }

  /* ---------------------------------------------------------- hjälp ---- */

  function blanda(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* Varje begrepp har flera foton. Listan tål även det äldre formatet med
     ett enda objekt per bild. */
  function foton(namn) {
    var f = window.BQ_BILDER && window.BQ_BILDER[namn];
    if (!f) return [];
    return Array.isArray(f) ? f : [f];
  }

  /* Slumpar fram ett av fotona. Samma kort visas alltså i olika utföranden –
     poängen är att känna igen begreppet, inte en viss bild. */
  function slumpatFoto(namn, undvik) {
    var lista = foton(namn);
    if (!lista.length) return null;
    if (lista.length > 1 && undvik) {
      var andra = lista.filter(function (b) { return b.fil !== undvik; });
      if (andra.length) lista = andra;
    }
    return lista[Math.floor(Math.random() * lista.length)];
  }

  /* Bilden är dekorativ – frågan står i texten – så alt hålls tomt för
     skärmläsare. Om filen mot förmodan inte kan laddas döljs den bara. */
  function bild(namn, valtFoto) {
    if (!namn) return '';
    var f = valtFoto || foton(namn)[0];
    if (!f) return '';
    return '<img class="bildfoto" src="' + f.fil + '" alt="" loading="lazy" ' +
      'onerror="this.style.visibility=\'hidden\'">';
  }

  function bildkredit(f) {
    if (!f) return '';
    return 'Foto: ' + f.upphov + ' · ' + f.licens + ' · Wikimedia Commons';
  }

  function fragetext(f) {
    if (f.fraga) return f.fraga;
    return 'Vad heter detta?';
  }

  function visaSkarm(id) {
    ['screen-start', 'screen-card', 'screen-result', 'screen-browse'].forEach(function (s) {
      $(s).hidden = (s !== id);
    });
    window.scrollTo(0, 0);
  }

  /* ------------------------------------------------------- startsida ---- */

  var valda = new Set(KATEGORIER);
  var langd = 20;
  var lage = 'plugg';

  function ritaKategorier() {
    var wrap = $('category-list');
    wrap.innerHTML = '';
    kategorier.forEach(function (kat) {
      var koll = kategoriKoll(kat);
      var label = document.createElement('label');
      label.className = 'cat' + (valda.has(kat.id) ? ' is-on' : '');
      label.innerHTML =
        '<input type="checkbox" ' + (valda.has(kat.id) ? 'checked' : '') + ' value="' + kat.id + '">' +
        '<span class="cat-emoji">' + kat.emoji + '</span>' +
        '<span class="cat-body">' +
          '<span class="cat-name">' + kat.namn + '</span><br>' +
          '<span class="cat-meta">' + kat.fragor.length + ' kort · ' + kat.beskrivning + '</span>' +
        '</span>' +
        '<span class="mastery">' + Math.round(koll.andel * 100) + '%' +
          '<span class="mastery-bar"><span style="width:' + Math.round(koll.andel * 100) + '%"></span></span>' +
        '</span>';
      label.querySelector('input').addEventListener('change', function (e) {
        if (e.target.checked) valda.add(kat.id); else valda.delete(kat.id);
        label.classList.toggle('is-on', e.target.checked);
        uppdateraSammanfattning();
      });
      wrap.appendChild(label);
    });
    uppdateraSammanfattning();
    uppdateraGlobal();
  }

  function poolen() {
    var p = allaFragor.filter(function (f) { return valda.has(f.kategori); });
    if (lage === 'repetera') {
      p = p.filter(function (f) {
        var s = stat.fragor[f.id];
        return !s || s.box <= 1;
      });
    }
    return p;
  }

  function uppdateraSammanfattning() {
    var n = poolen().length;
    var txt;
    if (!valda.size) txt = 'Välj minst en kategori för att kunna starta.';
    else if (lage === 'repetera' && n === 0) txt = 'Inga svaga kort kvar i de valda kategorierna – bra jobbat! Välj ett annat läge.';
    else txt = n + ' kort matchar ditt val.';
    $('selection-summary').textContent = txt;
    $('btn-start').disabled = n === 0;
  }

  function uppdateraGlobal() {
    var kan = 0;
    allaFragor.forEach(function (f) { if (kanFraga(f.id)) kan++; });
    $('global-stat').textContent = kan + ' / ' + allaFragor.length + ' kan du';
    $('foot-count').textContent = allaFragor.length + ' kort i ' + kategorier.length + ' kategorier';
  }

  /* ----------------------------------------------------------- pass ---- */

  var pass = null;

  function startaPass() {
    var pool = blanda(poolen());
    if (langd > 0) pool = pool.slice(0, langd);
    if (!pool.length) return;

    pass = {
      lage: lage,
      totalt: pool.length,
      ko: pool.slice(),
      klara: new Set(),
      forstaForsok: {},   // id -> true/false
      felade: [],         // frågor att repetera
      senasteFoto: {},    // id -> senast visad bildfil, för att variera vid repris
      aktuell: null,
      besvarad: false
    };
    visaSkarm('screen-card');
    nastaKort();
  }

  function nastaKort() {
    if (!pass.ko.length) return visaResultat();

    pass.aktuell = pass.ko.shift();
    pass.besvarad = false;

    var f = pass.aktuell;
    var s = statFor(f.id);

    $('card-category').textContent = f.kategoriNamn;
    $('card-box').textContent = s.sedd ? 'Nivå ' + s.box + '/' + MAX_BOX : 'Nytt kort';
    // ett kort som kommer tillbaka i passet visas med en annan bild än nyss
    var valtFoto = slumpatFoto(f.bild, pass.senasteFoto[f.id]);
    if (valtFoto) pass.senasteFoto[f.id] = valtFoto.fil;

    $('card-image').innerHTML = bild(f.bild, valtFoto);
    $('plate').hidden = !f.bild;
    var kredit = bildkredit(valtFoto);
    $('card-credit').textContent = kredit;
    $('card-credit').hidden = !kredit;
    $('card-question').textContent = fragetext(f);

    $('feedback').hidden = true;
    $('flip-answer').hidden = true;

    if (pass.lage === 'plugg') {
      $('options').hidden = true;
      $('options').innerHTML = '';
      $('flip-area').hidden = false;
      $('btn-flip').hidden = false;
      $('kbd-hint').textContent = 'Tangenter: mellanslag vänder kortet, 1 = öva mer, 2 = kunde den';
    } else {
      $('flip-area').hidden = true;
      $('options').hidden = false;
      ritaAlternativ(f);
      $('kbd-hint').textContent = 'Tangenter: 1–4 svarar, mellanslag går vidare';
    }

    uppdateraProgress();
  }

  function ritaAlternativ(f) {
    var alt = blanda([f.ratt].concat(f.fel.slice(0, 3)));
    var wrap = $('options');
    wrap.innerHTML = '';
    alt.forEach(function (text, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'opt';
      b.dataset.svar = text;
      b.innerHTML = '<span class="opt-key">' + (i + 1) + '</span><span>' + text + '</span>';
      b.addEventListener('click', function () { svara(text, b); });
      wrap.appendChild(b);
    });
  }

  function svara(text, knapp) {
    if (pass.besvarad) return;
    pass.besvarad = true;

    var f = pass.aktuell;
    var korrekt = text === f.ratt;

    Array.prototype.forEach.call($('options').children, function (b) {
      b.disabled = true;
      if (b.dataset.svar === f.ratt) b.classList.add('is-right');
      else if (b === knapp) b.classList.add('is-wrong');
      else b.classList.add('is-faded');
    });

    avslutaKort(f, korrekt, korrekt ? 'Rätt!' : 'Fel – rätt svar är ' + f.ratt);
  }

  function avslutaKort(f, korrekt, rubrik) {
    if (!(f.id in pass.forstaForsok)) pass.forstaForsok[f.id] = korrekt;
    registrera(f, korrekt);

    if (korrekt) {
      pass.klara.add(f.id);
    } else {
      if (!pass.felade.some(function (x) { return x.id === f.id; })) pass.felade.push(f);
      // lägg tillbaka kortet lite senare i passet
      var pos = Math.min(ATERKOMST, pass.ko.length);
      pass.ko.splice(pos, 0, f);
    }

    var v = $('verdict');
    v.textContent = rubrik;
    v.className = 'verdict ' + (korrekt ? 'ok' : 'no');
    $('fact').textContent = f.fakta || '';
    $('fact').hidden = !f.fakta;
    $('feedback').hidden = false;
    $('btn-next').textContent = pass.ko.length ? 'Nästa kort →' : 'Se resultat →';
    $('btn-next').focus({ preventScroll: true });

    uppdateraProgress();
  }

  function vandKort() {
    if ($('flip-answer').hidden === false) return;
    $('btn-flip').hidden = true;
    $('flip-name').textContent = pass.aktuell.ratt;
    $('flip-answer').hidden = false;
    $('fact').textContent = pass.aktuell.fakta || '';
    $('fact').hidden = !pass.aktuell.fakta;
  }

  function sjalvbedom(kunde) {
    if (pass.besvarad) return;
    if ($('flip-answer').hidden) vandKort();
    pass.besvarad = true;
    avslutaKort(pass.aktuell, kunde, kunde ? 'Bra – kortet flyttas uppåt.' : 'Kortet kommer tillbaka senare i passet.');
    $('flip-answer').hidden = true;
    $('btn-flip').hidden = false;
  }

  function uppdateraProgress() {
    var klara = pass.klara.size;
    var andel = Math.round((klara / pass.totalt) * 100);
    $('progress-fill').style.width = andel + '%';
    $('progress-text').textContent = klara + ' av ' + pass.totalt + ' klara' +
      (pass.ko.length ? ' · ' + (pass.ko.length + (pass.besvarad ? 0 : 1)) + ' kvar i kön' : '');

    var forsok = Object.keys(pass.forstaForsok);
    var ratt = forsok.filter(function (k) { return pass.forstaForsok[k]; }).length;
    $('score-text').textContent = forsok.length ? 'Rätt på första försöket: ' + ratt + '/' + forsok.length : '';
  }

  function visaResultat() {
    var forsok = Object.keys(pass.forstaForsok);
    var ratt = forsok.filter(function (k) { return pass.forstaForsok[k]; }).length;
    var procent = forsok.length ? Math.round((ratt / forsok.length) * 100) : 0;

    $('result-big').textContent = ratt + ' / ' + forsok.length;
    $('result-sub').textContent = 'rätt på första försöket (' + procent + ' %)';
    $('result-title').textContent =
      procent === 100 ? 'Fullpott! 🎉' :
      procent >= 80 ? 'Snyggt jobbat!' :
      procent >= 50 ? 'På god väg' : 'Fortsätt plugga';

    var lista = $('result-review');
    lista.innerHTML = '';
    $('result-review-panel').hidden = pass.felade.length === 0;
    pass.felade.forEach(function (f) {
      var d = document.createElement('div');
      d.className = 'review-item';
      d.innerHTML =
        '<span class="review-thumb">' + bild(f.bild) + '</span>' +
        '<span><span class="review-name">' + f.ratt + '</span>' +
        '<br><span class="review-fact">' + (f.fakta || '') + '</span></span>';
      lista.appendChild(d);
    });

    uppdateraGlobal();
    visaSkarm('screen-result');
  }

  /* -------------------------------------------------------- bläddra ---- */

  var browseKat = 'alla';

  function ritaBrowseFilter() {
    var wrap = $('browse-cats');
    wrap.innerHTML = '';
    var lista = [{ id: 'alla', namn: 'Alla' }].concat(kategorier.map(function (k) {
      return { id: k.id, namn: k.emoji + ' ' + k.namn };
    }));
    lista.forEach(function (k) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip' + (browseKat === k.id ? ' is-on' : '');
      b.textContent = k.namn;
      b.addEventListener('click', function () {
        browseKat = k.id;
        ritaBrowseFilter();
        ritaBrowse();
      });
      wrap.appendChild(b);
    });
  }

  function ritaBrowse() {
    var sok = ($('browse-search').value || '').trim().toLowerCase();
    var grid = $('browse-grid');
    grid.innerHTML = '';

    var kort = allaFragor.filter(function (f) {
      if (f.typ === 'anvandning') return false;                       // uppslagsverket visar namnkorten
      if (browseKat !== 'alla' && f.kategori !== browseKat) return false;
      if (sok && (f.ratt + ' ' + (f.fakta || '')).toLowerCase().indexOf(sok) === -1) return false;
      return true;
    });

    if (!kort.length) {
      grid.innerHTML = '<p class="empty">Inga kort matchar sökningen.</p>';
      return;
    }

    kort.forEach(function (f) {
      var d = document.createElement('div');
      d.className = 'browse-card';
      d.innerHTML =
        '<div class="browse-img">' + bild(f.bild) + '</div>' +
        '<div class="browse-body">' +
          '<div class="browse-cat">' + f.kategoriNamn + '</div>' +
          '<div class="browse-name">' + f.ratt + '</div>' +
          '<div class="browse-fact">' + (f.fakta || '') + '</div>' +
        '</div>';
      grid.appendChild(d);
    });
  }

  function ritaKallor() {
    var lista = $('kallor-lista');
    var bilder = window.BQ_BILDER || {};
    var namn = Object.keys(bilder);
    $('kallor').hidden = namn.length === 0;
    if (!namn.length || lista.childElementCount) return;

    namn.sort().forEach(function (n) {
      foton(n).forEach(function (b) {
        var li = document.createElement('li');
        li.innerHTML = '<a href="' + b.kalla + '" target="_blank" rel="noopener">' + b.titel + '</a> – ' +
          b.upphov + ' (' + b.licens + ')';
        lista.appendChild(li);
      });
    });
  }

  /* ------------------------------------------------------ händelser ---- */

  function kopplaHandelser() {
    $('btn-all').addEventListener('click', function () {
      valda = new Set(KATEGORIER); ritaKategorier();
    });
    $('btn-none').addEventListener('click', function () {
      valda = new Set(); ritaKategorier();
    });

    Array.prototype.forEach.call(document.querySelectorAll('input[name="mode"]'), function (r) {
      r.addEventListener('change', function () { lage = r.value; uppdateraSammanfattning(); });
    });

    Array.prototype.forEach.call($('length-chips').children, function (c) {
      c.addEventListener('click', function () {
        Array.prototype.forEach.call($('length-chips').children, function (x) { x.classList.remove('is-on'); });
        c.classList.add('is-on');
        langd = parseInt(c.dataset.len, 10);
      });
    });

    $('btn-start').addEventListener('click', startaPass);
    $('btn-next').addEventListener('click', nastaKort);
    $('btn-flip').addEventListener('click', vandKort);
    $('btn-knew').addEventListener('click', function () { sjalvbedom(true); });
    $('btn-again').addEventListener('click', function () { sjalvbedom(false); });

    $('btn-quit').addEventListener('click', function () {
      if (Object.keys(pass.forstaForsok).length) visaResultat();
      else { ritaKategorier(); visaSkarm('screen-start'); }
    });

    $('btn-again-session').addEventListener('click', startaPass);
    $('btn-home').addEventListener('click', function () { ritaKategorier(); visaSkarm('screen-start'); });
    $('btn-home2').addEventListener('click', function () { ritaKategorier(); visaSkarm('screen-start'); });
    $('brand').addEventListener('click', function () { ritaKategorier(); visaSkarm('screen-start'); });

    $('btn-browse').addEventListener('click', function () {
      ritaBrowseFilter(); ritaBrowse(); ritaKallor(); visaSkarm('screen-browse');
    });
    $('browse-search').addEventListener('input', ritaBrowse);

    $('btn-reset').addEventListener('click', function () {
      if (!confirm('Nollställa all din statistik?')) return;
      stat = { fragor: {} };
      sparaStat();
      ritaKategorier();
    });

    document.addEventListener('keydown', function (e) {
      if ($('screen-card').hidden) return;
      if (e.target.tagName === 'INPUT') return;

      if (pass.lage === 'plugg') {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          if (pass.besvarad) nastaKort();
          else if ($('flip-answer').hidden) vandKort();
        }
        if (!pass.besvarad && $('flip-answer').hidden === false) {
          if (e.key === '1') sjalvbedom(false);
          if (e.key === '2') sjalvbedom(true);
        }
        return;
      }

      if (e.key === ' ' || e.key === 'Enter') {
        if (pass.besvarad) { e.preventDefault(); nastaKort(); }
        return;
      }
      var n = parseInt(e.key, 10);
      if (n >= 1 && n <= 4 && !pass.besvarad) {
        var knapp = $('options').children[n - 1];
        if (knapp) knapp.click();
      }
    });
  }

  /* ---------------------------------------------------------- start ---- */

  laesStat();
  laddaAllt().then(function () {
    ritaKategorier();
    kopplaHandelser();
    $('load-note').textContent = '';
  }).catch(function (err) {
    $('load-note').textContent = 'Kunde inte läsa frågorna: ' + err.message +
      '. Kör sidan via en enkel webbserver, t.ex. "python3 -m http.server", eller kontrollera att data/bundle.js finns.';
  });

})();
