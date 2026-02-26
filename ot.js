// Förseningsövertid — bookmarklet overlay for MS Forms
// Loaded via: javascript:void(fetch('https://ke86.github.io/overtid/ot.js?v='+Date.now()).then(function(r){return r.text()}).then(function(c){(1,eval)(c)}))
(function() {
  if (document.getElementById('_ot_ov')) return;

  // === MS Forms Question IDs ===
  var Q = {
    trafikomrade: 'r08a877c91e5940aab46a20f29e8975c3',
    kompPengar:   're8987294ed2b4297bbf9b8fe1ee51526',
    tagNummer:    'r0a442fdb2676477885508e2f6359d9ce',
    ordTid:       'r34420eb0c53945ce856c8b32dd00d04b',
    orsak:        'rbe59ed60ea8148a6a2173f5cc4895e2f',
    forsening:    'rc33b805e58a54fc89981cf7e781b8027',
    faktTid:      'r90237a906de84044b602c67085e11e0d',
    namn:         'r37f071b4259d4c8cbed7031b788a030f',
    adNummer:     'r5f2541b0525848eebaacabc4d577a3dc',
    datum:        'r0030f2c942874489affd4c0b8edb4feb'
  };

  // === Settings (localStorage on MS Forms domain) ===
  function ld() { try { return JSON.parse(localStorage.getItem('_ot_s')) || {}; } catch(e) { return {}; } }
  function sv(s) { localStorage.setItem('_ot_s', JSON.stringify(s)); }
  var st = ld();
  var ex = 0;

  // === Today's date ===
  var d = new Date();
  var tod = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');

  // === Styles ===
  var I = 'width:100%;padding:10px 12px;font-size:16px;border:2px solid #dde2ea;border-radius:8px;outline:none;background:#fff;color:#222;-webkit-appearance:none;';
  var L = 'display:block;font-size:13px;font-weight:600;color:#555;margin-bottom:4px;';
  var SAV = ' \u2705';

  // === Saved phrases ===
  var phrases = st.phrases || ['Signalfel','Sp\u00e5rarbete','Fordonsfel','V\u00e4xelfel','V\u00e4nta p\u00e5 anslutning'];

  // === Build overlay ===
  var ov = document.createElement('div');
  ov.id = '_ot_ov';
  ov.style.cssText = 'position:fixed;inset:0;z-index:999999;background:rgba(0,0,0,.55);display:flex;align-items:flex-start;justify-content:center;overflow-y:auto;padding:16px 8px;font-family:-apple-system,system-ui,sans-serif;';

  var h = '<div style="background:#fff;border-radius:16px;width:100%;max-width:400px;padding:20px;box-shadow:0 20px 60px rgba(0,0,0,.4);margin:auto 0">';

  // Header
  h += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">';
  h += '<div style="font-size:18px;font-weight:700;color:#1a1a2e">\u23f1\ufe0f F\u00f6rsenings\u00f6vertid</div>';
  h += '<button id="_ot_x" style="background:none;border:none;font-size:24px;cursor:pointer;color:#888;padding:0 4px;line-height:1">\u2715</button>';
  h += '</div><div style="display:flex;flex-direction:column;gap:12px">';

  // 1. Trafikområde
  var tOpts = ['\u00d6resundst\u00e5g','P\u00e5gat\u00e5gen','T\u00e5g i Bergslagen','X-t\u00e5g','Norrt\u00e5g'];
  var savedT = st.trafikomrade || tOpts[0];
  h += '<div><label style="' + L + '">Trafikomr\u00e5de' + (st.trafikomrade ? SAV : '') + '</label>';
  h += '<select id="_ot_tr" style="' + I + '">';
  for (var t = 0; t < tOpts.length; t++) {
    h += '<option' + (tOpts[t] === savedT ? ' selected' : '') + '>' + tOpts[t] + '</option>';
  }
  h += '</select></div>';

  // 2. Namn
  h += '<div><label style="' + L + '">Namn' + (st.namn ? SAV : '') + '</label>';
  h += '<input id="_ot_nm" type="text" style="' + I + '" value="' + (st.namn || '').replace(/"/g,'&quot;') + '" placeholder="Ditt namn"></div>';

  // 3. Datum
  h += '<div><label style="' + L + '">Datum</label>';
  h += '<input id="_ot_dt" type="date" style="' + I + '" value="' + tod + '"></div>';

  // 4. AD-nummer
  h += '<div><label style="' + L + '">AD-nummer' + (st.adNummer ? SAV : '') + '</label>';
  h += '<input id="_ot_ad" type="text" style="' + I + '" value="' + (st.adNummer || '').replace(/"/g,'&quot;') + '" placeholder="AD-nummer"></div>';

  // 5. Tågnummer
  h += '<div><label style="' + L + '">T\u00e5gnummer</label>';
  h += '<input id="_ot_tag" type="text" inputmode="numeric" style="' + I + '" placeholder="T.ex. 1234"></div>';

  // 6-7. Tider
  h += '<div style="display:flex;gap:10px">';
  h += '<div style="flex:1"><label style="' + L + '">Ordinarie ankomsttid</label><input id="_ot_ord" type="time" style="' + I + '"></div>';
  h += '<div style="flex:1"><label style="' + L + '">Faktisk ankomsttid</label><input id="_ot_fkt" type="time" style="' + I + '"></div>';
  h += '</div>';

  // 8. Försening
  h += '<div style="background:#f8f9fa;padding:12px;border-radius:10px">';
  h += '<label style="' + L + '">F\u00f6rsening i minuter</label>';
  h += '<div style="display:flex;align-items:center;gap:12px">';
  h += '<span id="_ot_dl" style="font-size:20px;font-weight:700;color:#d97706">\u2014 min</span>';
  h += '<div style="margin-left:auto;display:flex;gap:6px;align-items:center">';
  h += '<button id="_ot_mn" style="width:36px;height:36px;border:2px solid #ddd;border-radius:8px;background:#fff;font-size:18px;cursor:pointer;font-weight:700;color:#333">\u2212</button>';
  h += '<span id="_ot_ex" style="min-width:24px;text-align:center;font-size:15px;font-weight:600">0</span>';
  h += '<button id="_ot_pl" style="width:36px;height:36px;border:2px solid #ddd;border-radius:8px;background:#fff;font-size:18px;cursor:pointer;font-weight:700;color:#333">+</button>';
  h += '</div></div></div>';

  // 9. Orsak
  var pOpts = '<option value="">V\u00e4lj sparad orsak...</option>';
  for (var p = 0; p < phrases.length; p++) {
    pOpts += '<option value="' + phrases[p].replace(/"/g,'&quot;') + '">' + phrases[p] + '</option>';
  }
  h += '<div><label style="' + L + '">Orsak</label>';
  h += '<select id="_ot_ps" style="' + I + 'color:#888;margin-bottom:8px">' + pOpts + '</select>';
  h += '<input id="_ot_or" type="text" style="' + I + '" placeholder="Eller skriv egen orsak...">';
  h += '<div style="display:flex;gap:6px;margin-top:6px">';
  h += '<button id="_ot_pa" style="flex:1;padding:8px;font-size:13px;background:#fef3c7;border:1px solid #d97706;border-radius:8px;cursor:pointer;color:#92400e;font-weight:600">+ Spara orsak</button>';
  h += '<button id="_ot_pd" style="padding:8px 12px;font-size:13px;background:#fee2e2;border:1px solid #dc2626;border-radius:8px;cursor:pointer;color:#dc2626;font-weight:600">\u2715 Ta bort vald</button>';
  h += '</div></div>';

  // 10. Komp/Pengar
  h += '<div><label style="' + L + '">Komp/Pengar' + (st.kompPengar ? SAV : '') + '</label>';
  h += '<div style="display:flex;gap:8px">';
  h += '<label id="_ot_lk" style="flex:1;padding:10px;border:2px solid #ddd;border-radius:8px;text-align:center;cursor:pointer;font-size:15px;font-weight:600;background:#fff;color:#333"><input type="radio" name="_otkp" value="Komp" style="margin-right:6px"' + ((!st.kompPengar || st.kompPengar === 'Komp') ? ' checked' : '') + '>Komp</label>';
  h += '<label id="_ot_lp" style="flex:1;padding:10px;border:2px solid #ddd;border-radius:8px;text-align:center;cursor:pointer;font-size:15px;font-weight:600;background:#fff;color:#333"><input type="radio" name="_otkp" value="Pengar" style="margin-right:6px"' + (st.kompPengar === 'Pengar' ? ' checked' : '') + '>Pengar</label>';
  h += '</div></div>';

  h += '</div>'; // close fields container

  // Submit button
  h += '<button id="_ot_go" style="width:100%;margin-top:18px;padding:14px;background:#d97706;color:#fff;border:none;border-radius:10px;font-size:16px;font-weight:700;cursor:pointer;box-shadow:0 4px 12px rgba(217,119,6,.3)">\ud83d\udcdd Fyll i formul\u00e4ret</button>';
  h += '</div>'; // close card

  ov.innerHTML = h;
  document.body.appendChild(ov);

  // === DOM helpers ===
  var $ = function(id) { return ov.querySelector('#' + id); };

  // === Close ===
  $('_ot_x').onclick = function() { ov.remove(); };
  ov.onclick = function(e) { if (e.target === ov) ov.remove(); };

  // === Orsak dropdown ===
  $('_ot_ps').onchange = function() {
    if (this.value) { $('_ot_or').value = this.value; this.style.color = '#222'; }
    else { this.style.color = '#888'; }
  };

  function rebuildPhraseSelect() {
    var sel = $('_ot_ps');
    sel.innerHTML = '<option value="">V\u00e4lj sparad orsak...</option>';
    for (var pi = 0; pi < phrases.length; pi++) {
      var o = document.createElement('option');
      o.value = phrases[pi]; o.textContent = phrases[pi];
      sel.appendChild(o);
    }
    sel.style.color = '#888'; sel.value = '';
  }

  $('_ot_pa').onclick = function() {
    var nv = $('_ot_or').value.trim();
    if (!nv) return;
    if (phrases.indexOf(nv) === -1) {
      phrases.push(nv); st.phrases = phrases; sv(st); rebuildPhraseSelect();
    }
  };

  $('_ot_pd').onclick = function() {
    var val = $('_ot_ps').value;
    if (!val) return;
    var idx = phrases.indexOf(val);
    if (idx > -1) {
      phrases.splice(idx, 1); st.phrases = phrases; sv(st);
      rebuildPhraseSelect(); $('_ot_or').value = '';
    }
  };

  // === Komp/Pengar radio styling ===
  function upR() {
    var c = ov.querySelector('input[name="_otkp"]:checked');
    $('_ot_lk').style.borderColor = (c && c.value === 'Komp') ? '#d97706' : '#ddd';
    $('_ot_lk').style.background = (c && c.value === 'Komp') ? '#fef3c7' : '#fff';
    $('_ot_lp').style.borderColor = (c && c.value === 'Pengar') ? '#d97706' : '#ddd';
    $('_ot_lp').style.background = (c && c.value === 'Pengar') ? '#fef3c7' : '#fff';
  }
  var rads = ov.querySelectorAll('input[name="_otkp"]');
  for (var r = 0; r < rads.length; r++) { rads[r].onchange = upR; }
  upR();

  // === Delay calculation ===
  function calcD() {
    var o = $('_ot_ord').value, f = $('_ot_fkt').value;
    if (!o || !f) { $('_ot_dl').textContent = '\u2014 min'; return; }
    var op = o.split(':').map(Number), fp = f.split(':').map(Number);
    var df = (fp[0]*60+fp[1]) - (op[0]*60+op[1]);
    if (df < 0) df += 1440;
    $('_ot_dl').textContent = (df + ex) + ' min';
  }
  $('_ot_ord').onchange = calcD;
  $('_ot_fkt').onchange = calcD;
  $('_ot_pl').onclick = function() { ex++; $('_ot_ex').textContent = ex; calcD(); };
  $('_ot_mn').onclick = function() { if (ex > 0) ex--; $('_ot_ex').textContent = ex; calcD(); };

  // === MS Forms: React-compatible value setter ===
  function setVal(el, v) {
    var pr = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    var setter = Object.getOwnPropertyDescriptor(pr, 'value').set;
    el.focus();
    el.dispatchEvent(new Event('focusin', {bubbles:true}));
    setter.call(el, v);
    el.dispatchEvent(new Event('input', {bubbles:true}));
    el.dispatchEvent(new Event('change', {bubbles:true}));
    el.dispatchEvent(new Event('keyup', {bubbles:true}));
    el.dispatchEvent(new Event('blur', {bubbles:true}));
    el.dispatchEvent(new Event('focusout', {bubbles:true}));
  }

  // === MS Forms: find question container by question ID ===
  function findQ(qid) {
    var sels = [
      '[data-automation-value*="'+qid+'"]',
      '[id*="'+qid+'"]',
      '[name*="'+qid+'"]',
      '[aria-describedby*="'+qid+'"]'
    ];
    for (var i = 0; i < sels.length; i++) {
      var e = document.querySelector(sels[i]);
      if (e) return e.closest('[data-automation-id]') || e;
    }
    var all = document.querySelectorAll('[data-automation-id]');
    for (var j = 0; j < all.length; j++) {
      if (all[j].innerHTML.indexOf(qid) > -1) return all[j];
    }
    return null;
  }

  // === MS Forms: fill a single field ===
  function fillField(qid, val) {
    var c = findQ(qid);
    if (!c) return false;
    var inp = c.querySelector('input:not([type=hidden]),textarea');
    if (inp) { setVal(inp, val); return true; }
    var opts = c.querySelectorAll('[role=radio],[role=option]');
    for (var i = 0; i < opts.length; i++) {
      if (opts[i].textContent.trim().indexOf(val) > -1) { opts[i].click(); return true; }
    }
    var dd = c.querySelector('[role=listbox],[role=combobox],select');
    if (dd) {
      dd.click();
      setTimeout(function() {
        var os = document.querySelectorAll('[role=option]');
        for (var k = 0; k < os.length; k++) {
          if (os[k].textContent.trim().indexOf(val) > -1) { os[k].click(); break; }
        }
      }, 300);
      return true;
    }
    return false;
  }

  // === MS Forms: activate + retry for stubborn fields (e.g. date picker) ===
  function activateAndFill(qid, val) {
    var c = findQ(qid);
    if (!c) return;
    c.click();
    var btn = c.querySelector('button,i,[role=button],[class*=icon]');
    if (btn) btn.click();
    setTimeout(function() {
      var inp = c.querySelector('input:not([type=hidden]),textarea');
      if (inp) setVal(inp, val);
    }, 300);
  }

  // === Submit: collect data, fill MS Forms, close overlay ===
  $('_ot_go').onclick = function() {
    var o = $('_ot_ord').value, f = $('_ot_fkt').value;
    var op = o ? o.split(':').map(Number) : [0,0];
    var fp = f ? f.split(':').map(Number) : [0,0];
    var df = (fp[0]*60+fp[1]) - (op[0]*60+op[1]);
    if (df < 0) df += 1440;
    var total = df + ex;

    var data = {};
    data[Q.trafikomrade] = $('_ot_tr').value;
    var kp = ov.querySelector('input[name="_otkp"]:checked');
    data[Q.kompPengar] = kp ? kp.value : 'Komp';
    data[Q.tagNummer] = $('_ot_tag').value;
    data[Q.ordTid] = o;
    data[Q.faktTid] = f;
    data[Q.forsening] = String(total);
    data[Q.orsak] = $('_ot_or').value;
    data[Q.namn] = $('_ot_nm').value;
    data[Q.adNummer] = $('_ot_ad').value;
    data[Q.datum] = $('_ot_dt').value;

    // Save settings for next time
    st.namn = $('_ot_nm').value;
    st.adNummer = $('_ot_ad').value;
    st.kompPengar = kp ? kp.value : 'Komp';
    st.trafikomrade = $('_ot_tr').value;
    sv(st);

    // Fill MS Forms fields
    var keys = Object.keys(data), ok = 0, failed = [];
    for (var i = 0; i < keys.length; i++) {
      if (data[keys[i]]) {
        if (fillField(keys[i], data[keys[i]])) ok++;
        else failed.push(keys[i]);
      }
    }

    ov.remove();

    // Retry failed fields (e.g. date pickers that need activation)
    if (failed.length > 0) {
      for (var f2 = 0; f2 < failed.length; f2++) {
        activateAndFill(failed[f2], data[failed[f2]]);
      }
      setTimeout(function() {
        var retry = 0;
        for (var ri = 0; ri < failed.length; ri++) {
          if (fillField(failed[ri], data[failed[ri]])) retry++;
        }
        ok += retry;
        showDone(ok, keys.length);
      }, 600);
    } else {
      showDone(ok, keys.length);
    }
  };

  // === Result toast ===
  function showDone(ok, total) {
    var m = document.createElement('div');
    m.style.cssText = 'position:fixed;left:50%;transform:translateX(-50%);top:20px;z-index:999999;padding:14px 24px;border-radius:12px;font:bold 15px -apple-system,sans-serif;box-shadow:0 4px 20px rgba(0,0,0,.3);background:#166534;color:#fff;transition:opacity .3s';
    m.textContent = '\u2705 ' + ok + '/' + total + ' f\u00e4lt ifyllda';
    document.body.appendChild(m);
    setTimeout(function() { m.style.opacity = '0'; setTimeout(function() { m.remove(); }, 400); }, 4000);
  }
})();
