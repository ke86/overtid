// ot.js - Forseningsovertid overlay (extracted from index.html fn function body, lines 336-455)
// Self-executing IIFE wrapper
(function() {
  if (document.getElementById('_ot_ov')) return;
  var Q={trafikomrade:'r08a877c91e5940aab46a20f29e8975c3',kompPengar:'re8987294ed2b4297bbf9b8fe1ee51526',tagNummer:'r0a442fdb2676477885508e2f6359d9ce',ordTid:'r34420eb0c53945ce856c8b32dd00d04b',orsak:'rbe59ed60ea8148a6a2173f5cc4895e2f',forsening:'rc33b805e58a54fc89981cf7e781b8027',faktTid:'r90237a906de84044b602c67085e11e0d',namn:'r37f071b4259d4c8cbed7031b788a030f',adNummer:'r5f2541b0525848eebaacabc4d577a3dc',datum:'r0030f2c942874489affd4c0b8edb4feb'};
  var LS=window['local'+'Storage'];
  function ld(){try{return JSON.parse(LS.getItem('_ot_s'))||{}}catch(e){return{}}}
  function svS(s){LS.setItem('_ot_s',JSON.stringify(s))}
  function getDrafts(){try{return JSON.parse(LS.getItem('_ot_d'))||[]}catch(e){return[]}}
  function setDrafts(arr){LS.setItem('_ot_d',JSON.stringify(arr))}
  function getHist(){try{return JSON.parse(LS.getItem('_ot_h'))||[]}catch(e){return[]}}
  function setHist(arr){LS.setItem('_ot_h',JSON.stringify(arr))}
  var st=ld(), ex=0;
  var dn=new Date(),tod=dn.getFullYear()+'-'+String(dn.getMonth()+1).padStart(2,'0')+'-'+String(dn.getDate()).padStart(2,'0');
  /* Mobile-optimized styles: 16px+ fonts prevent iOS zoom, large touch targets (44px+), safe-area padding */
  var I='width:100%;padding:12px 14px;font-size:16px;border:2px solid #dde2ea;border-radius:10px;outline:none;background:#fff;color:#222;-webkit-appearance:none;box-sizing:border-box;min-height:48px;';
  var L='display:block;font-size:14px;font-weight:600;color:#555;margin-bottom:5px;';
  var SAV=' \u2705';
  var B='padding:14px 16px;border-radius:10px;font-size:16px;font-weight:600;cursor:pointer;-webkit-tap-highlight-color:transparent;touch-action:manipulation;min-height:48px;border:none;';
  var phrases=st.phrases||[];
  var ov=document.createElement('div');ov.id='_ot_ov';
  ov.style.cssText='position:fixed;inset:0;z-index:999999;background:rgba(0,0,0,.55);display:flex;align-items:flex-start;justify-content:center;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:env(safe-area-inset-top,12px) 10px env(safe-area-inset-bottom,12px);font-family:-apple-system,system-ui,sans-serif;';
  var h='<div style="background:#fff;border-radius:16px;width:100%;max-width:420px;padding:20px 18px;box-shadow:0 20px 60px rgba(0,0,0,.4);margin:auto 0">';
  h+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">';
  h+='<div style="font-size:18px;font-weight:700;color:#1a1a2e">\u23f1\ufe0f F\u00f6rsenings\u00f6vertid</div>';
  h+='<div style="display:flex;align-items:center;gap:6px">';
  var hCount=getHist().length;
  h+='<button id="_ot_hi" style="'+B+'padding:8px 12px;background:#f3f4f6;color:#555;border:1.5px solid #ddd;font-size:14px;min-height:40px">\ud83d\udccb'+(hCount>0?' '+hCount:'')+'</button>';
  h+='<button id="_ot_x" style="'+B+'padding:8px 12px;background:none;font-size:24px;color:#888;min-height:40px">\u2715</button>';
  h+='</div></div>';
  var drafts=getDrafts();
  if(drafts.length>0){
    h+='<div id="_ot_dbar" style="margin-bottom:12px;padding:12px;background:#f0f7ff;border:1.5px solid #bfdbfe;border-radius:12px">';
    h+='<div style="display:flex;align-items:center;gap:8px">';
    h+='<select id="_ot_dsel" style="flex:1;padding:10px 12px;font-size:16px;border:1.5px solid #93c5fd;border-radius:8px;background:#fff;color:#1e40af;font-weight:500;min-height:48px;-webkit-appearance:none">';
    h+='<option value="">\ud83d\udcc2 Utkast ('+drafts.length+')</option>';
    for(var di=0;di<drafts.length;di++){var dr=drafts[di];h+='<option value="'+di+'">'+((dr.datum||'')+' t\u00e5g '+(dr.tagNummer||'?')).trim()+'</option>'}
    h+='</select>';
    h+='<button id="_ot_dld" style="'+B+'background:#2563eb;color:#fff;padding:10px 14px;min-height:48px">Ladda</button>';
    h+='<button id="_ot_ddel" style="'+B+'background:#fee2e2;color:#dc2626;border:1px solid #fca5a5;padding:10px 12px;min-height:48px">\u2715</button>';
    h+='</div></div>';
  }
  h+='<div style="display:flex;flex-direction:column;gap:14px">';
  var tOpts=['\u00d6resundst\u00e5g','P\u00e5gat\u00e5gen','T\u00e5g i Bergslagen','X-t\u00e5g','Norrt\u00e5g'];
  var savedT=st.trafikomrade||tOpts[0];
  h+='<div><label style="'+L+'">Trafikomr\u00e5de'+(st.trafikomrade?SAV:'')+'</label>';
  h+='<select id="_ot_tr" style="'+I+'">';
  for(var t=0;t<tOpts.length;t++){h+='<option'+(tOpts[t]===savedT?' selected':'')+'>'+tOpts[t]+'</option>'}
  h+='</select></div>';
  h+='<div><label style="'+L+'">Namn'+(st.namn?SAV:'')+'</label>';
  h+='<input id="_ot_nm" type="text" style="'+I+'" value="'+(st.namn||'').replace(/"/g,'&quot;')+'" placeholder="Ditt namn" autocomplete="name" autocorrect="off"></div>';
  h+='<div><label style="'+L+'">Datum</label>';
  h+='<input id="_ot_dt" type="date" style="'+I+'" value="'+tod+'"></div>';
  h+='<div><label style="'+L+'">AD-nummer'+(st.adNummer?SAV:'')+'</label>';
  h+='<input id="_ot_ad" type="text" style="'+I+'" value="'+(st.adNummer||'').replace(/"/g,'&quot;')+'" placeholder="AD-nummer" autocorrect="off"></div>';
  h+='<div><label style="'+L+'">T\u00e5gnummer</label>';
  h+='<input id="_ot_tag" type="text" inputmode="numeric" pattern="[0-9]*" style="'+I+'" placeholder="T.ex. 1234"></div>';
  h+='<div style="display:flex;gap:10px">';
  h+='<div style="flex:1"><label style="'+L+'">Ord. ankomsttid</label><input id="_ot_ord" type="time" style="'+I+'"></div>';
  h+='<div style="flex:1"><label style="'+L+'">Fakt. ankomsttid</label><input id="_ot_fkt" type="time" style="'+I+'"></div>';
  h+='</div>';
  h+='<div style="background:#f8f9fa;padding:14px;border-radius:12px">';
  h+='<label style="'+L+'">F\u00f6rsening i minuter</label>';
  h+='<div style="display:flex;align-items:center;gap:12px">';
  h+='<span id="_ot_dl" style="font-size:22px;font-weight:700;color:#d97706">\u2014 min</span>';
  h+='<div style="margin-left:auto;display:flex;gap:8px;align-items:center">';
  h+='<button id="_ot_mn" style="'+B+'width:48px;height:48px;padding:0;background:#fff;border:2px solid #ddd;font-size:20px;color:#333;display:grid;place-items:center">\u2212</button>';
  h+='<span id="_ot_ex" style="min-width:28px;text-align:center;font-size:16px;font-weight:700">0</span>';
  h+='<button id="_ot_pl" style="'+B+'width:48px;height:48px;padding:0;background:#fff;border:2px solid #ddd;font-size:20px;color:#333;display:grid;place-items:center">+</button>';
  h+='</div></div></div>';
  h+='<div><label style="'+L+'">Orsak</label>';
  if(phrases.length>0){
    var pOpts='<option value="">V\u00e4lj sparad orsak...</option>';
    for(var p=0;p<phrases.length;p++){pOpts+='<option value="'+phrases[p].replace(/"/g,'&quot;')+'">'+phrases[p]+'</option>'}
    h+='<select id="_ot_ps" style="'+I+'color:#888;margin-bottom:8px">'+pOpts+'</select>';
  }else{
    h+='<select id="_ot_ps" style="'+I+'color:#888;margin-bottom:8px"><option value="">Inga sparade orsaker</option></select>';
  }
  h+='<input id="_ot_or" type="text" style="'+I+'" placeholder="Skriv orsak...">';
  h+='<div style="display:flex;gap:8px;margin-top:8px">';
  h+='<button id="_ot_pa" style="'+B+'flex:1;background:#fef3c7;color:#92400e;border:1px solid #d97706">+ Spara orsak</button>';
  h+='<button id="_ot_pd" style="'+B+'background:#fee2e2;color:#dc2626;border:1px solid #fca5a5;padding:14px 14px">\u2715 Ta bort</button>';
  h+='</div></div>';
  h+='<div><label style="'+L+'">Komp/Pengar'+(st.kompPengar?SAV:'')+'</label>';
  h+='<div style="display:flex;gap:8px">';
  h+='<label id="_ot_lk" style="flex:1;padding:14px;border:2px solid #ddd;border-radius:10px;text-align:center;cursor:pointer;font-size:16px;font-weight:600;background:#fff;color:#333;-webkit-tap-highlight-color:transparent;min-height:48px"><input type="radio" name="_otkp" value="Komp" style="margin-right:6px"'+((!st.kompPengar||st.kompPengar==='Komp')?' checked':'')+'>Komp</label>';
  h+='<label id="_ot_lp" style="flex:1;padding:14px;border:2px solid #ddd;border-radius:10px;text-align:center;cursor:pointer;font-size:16px;font-weight:600;background:#fff;color:#333;-webkit-tap-highlight-color:transparent;min-height:48px"><input type="radio" name="_otkp" value="Pengar" style="margin-right:6px"'+(st.kompPengar==='Pengar'?' checked':'')+'>Pengar</label>';
  h+='</div></div>';
  h+='</div>';
  h+='<div style="display:flex;gap:8px;margin-top:18px">';
  h+='<button id="_ot_go" style="'+B+'flex:1;background:#d97706;color:#fff;font-size:17px;font-weight:700;box-shadow:0 4px 12px rgba(217,119,6,.3)">\ud83d\udcdd Fyll i</button>';
  h+='<button id="_ot_sv" style="'+B+'background:#eff6ff;color:#2563eb;border:1.5px solid #93c5fd;white-space:nowrap">\ud83d\udcbe Spara</button>';
  h+='</div>';
  h+='</div>';
  ov.innerHTML=h;document.body.appendChild(ov);
  var $=function(id){return ov.querySelector('#'+id)};
  $('_ot_x').onclick=function(){ov.remove()};
  ov.onclick=function(e){if(e.target===ov)ov.remove()};
  function getFormVals(){var kp=ov.querySelector('input[name="_otkp"]:checked');return{trafikomrade:$('_ot_tr').value,namn:$('_ot_nm').value,datum:$('_ot_dt').value,adNummer:$('_ot_ad').value,tagNummer:$('_ot_tag').value,ordTid:$('_ot_ord').value,faktTid:$('_ot_fkt').value,orsak:$('_ot_or').value,kompPengar:kp?kp.value:'Komp',extra:ex}}
  function loadDraft(d){$('_ot_tr').value=d.trafikomrade||$('_ot_tr').value;$('_ot_nm').value=d.namn||'';$('_ot_dt').value=d.datum||tod;$('_ot_ad').value=d.adNummer||'';$('_ot_tag').value=d.tagNummer||'';$('_ot_ord').value=d.ordTid||'';$('_ot_fkt').value=d.faktTid||'';$('_ot_or').value=d.orsak||'';if(d.extra){ex=d.extra;$('_ot_ex').textContent=ex}var r=ov.querySelector('input[name="_otkp"][value="'+(d.kompPengar||'Komp')+'"]');if(r)r.checked=true;upR();calcD()}
  function showMini(txt,bg){var m=document.createElement('div');m.style.cssText='position:absolute;top:8px;left:50%;transform:translateX(-50%);padding:10px 18px;border-radius:10px;font-size:14px;font-weight:600;z-index:10;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,.15);'+bg;m.textContent=txt;var card=ov.querySelector('div');card.style.position='relative';card.appendChild(m);setTimeout(function(){m.remove()},2000)}
  $('_ot_sv').onclick=function(){var vals=getFormVals();vals.savedAt=new Date().toISOString();var dr=getDrafts();dr.unshift(vals);if(dr.length>20)dr.length=20;setDrafts(dr);showMini('\u2705 Utkast sparat!','background:#dcfce7;color:#166534')};
  if($('_ot_dld')){$('_ot_dld').onclick=function(){var sel=$('_ot_dsel');var idx=parseInt(sel.value);if(isNaN(idx))return;var dr=getDrafts();if(dr[idx]){loadDraft(dr[idx]);showMini('\u2705 Utkast laddat!','background:#dbeafe;color:#1e40af')}}}
  if($('_ot_ddel')){$('_ot_ddel').onclick=function(){var sel=$('_ot_dsel');var idx=parseInt(sel.value);if(isNaN(idx))return;var dr=getDrafts();dr.splice(idx,1);setDrafts(dr);var bar=$('_ot_dbar');if(dr.length===0){if(bar)bar.remove()}else{sel.innerHTML='<option value="">\ud83d\udcc2 Utkast ('+dr.length+')</option>';for(var di=0;di<dr.length;di++){var d=dr[di];sel.innerHTML+='<option value="'+di+'">'+((d.datum||'')+' t\u00e5g '+(d.tagNummer||'?')).trim()+'</option>'}sel.value=''}showMini('\u2705 Utkast borttaget','background:#fee2e2;color:#991b1b')}}
  $('_ot_hi').onclick=function(){var ep=ov.querySelector('#_ot_hp');if(ep){ep.remove();return}var hi=getHist();var hp=document.createElement('div');hp.id='_ot_hp';hp.style.cssText='margin-bottom:12px;padding:14px;background:#f9fafb;border:1.5px solid #e5e7eb;border-radius:12px;max-height:280px;overflow-y:auto;-webkit-overflow-scrolling:touch';if(hi.length===0){hp.innerHTML='<div style="text-align:center;color:#999;font-size:14px;padding:16px">Ingen historik \u00e4nnu</div>'}else{var hh='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px"><span style="font-size:14px;font-weight:700;color:#374151">\ud83d\udccb Inskickade ('+hi.length+')</span><button id="_ot_hclr" style="font-size:13px;padding:6px 12px;background:#fee2e2;color:#dc2626;border:1px solid #fca5a5;border-radius:6px;cursor:pointer;min-height:36px;-webkit-tap-highlight-color:transparent">Rensa</button></div>';for(var i=0;i<hi.length;i++){var e=hi[i];var ts=e.sentAt?new Date(e.sentAt).toLocaleString('sv-SE',{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}):'';hh+='<div style="padding:10px 0;border-top:1px solid #e5e7eb;font-size:14px;color:#374151">';hh+='<div style="display:flex;justify-content:space-between"><strong>'+(e.datum||'?')+'</strong><span style="color:#999;font-size:12px">'+ts+'</span></div>';hh+='<div style="color:#666;margin-top:3px">T\u00e5g '+(e.tagNummer||'?')+' \u2022 '+(e.forsening||'?')+' min \u2022 '+(e.orsak||'?')+' \u2022 '+(e.kompPengar||'?')+'</div>';hh+='</div>'}hp.innerHTML=hh;setTimeout(function(){var cb=hp.querySelector('#_ot_hclr');if(cb)cb.onclick=function(){setHist([]);hp.innerHTML='<div style="text-align:center;color:#999;font-size:14px;padding:16px">Historik rensad</div>'}},0)}var ref=$('_ot_dbar')||ov.querySelector('[style*="flex-direction:column"]');if(ref)ref.parentNode.insertBefore(hp,ref)};
  $('_ot_ps').onchange=function(){if(this.value){$('_ot_or').value=this.value;this.style.color='#222'}else{this.style.color='#888'}};
  function rebuildPS(){var sel=$('_ot_ps');sel.innerHTML=phrases.length>0?'<option value="">V\u00e4lj sparad orsak...</option>':'<option value="">Inga sparade orsaker</option>';for(var pi=0;pi<phrases.length;pi++){var o=document.createElement('option');o.value=phrases[pi];o.textContent=phrases[pi];sel.appendChild(o)}sel.style.color='#888';sel.value=''}
  $('_ot_pa').onclick=function(){var nv=$('_ot_or').value.trim();if(!nv)return;if(phrases.indexOf(nv)===-1){phrases.push(nv);st.phrases=phrases;svS(st);rebuildPS();showMini('\u2705 Orsak sparad!','background:#dcfce7;color:#166534')}};
  $('_ot_pd').onclick=function(){var val=$('_ot_ps').value;if(!val)return;var idx=phrases.indexOf(val);if(idx>-1){phrases.splice(idx,1);st.phrases=phrases;svS(st);rebuildPS();$('_ot_or').value='';showMini('\u2705 Orsak borttagen','background:#fee2e2;color:#991b1b')}};
  function upR(){var c=ov.querySelector('input[name="_otkp"]:checked');$('_ot_lk').style.borderColor=(c&&c.value==='Komp')?'#d97706':'#ddd';$('_ot_lk').style.background=(c&&c.value==='Komp')?'#fef3c7':'#fff';$('_ot_lp').style.borderColor=(c&&c.value==='Pengar')?'#d97706':'#ddd';$('_ot_lp').style.background=(c&&c.value==='Pengar')?'#fef3c7':'#fff'}
  var rads=ov.querySelectorAll('input[name="_otkp"]');for(var r=0;r<rads.length;r++){rads[r].onchange=upR}upR();
  function calcD(){var o=$('_ot_ord').value,f=$('_ot_fkt').value;if(!o||!f){$('_ot_dl').textContent='\u2014 min';return}var op=o.split(':').map(Number),fp=f.split(':').map(Number);var df=(fp[0]*60+fp[1])-(op[0]*60+op[1]);if(df<0)df+=1440;$('_ot_dl').textContent=(df+ex)+' min'}
  $('_ot_ord').onchange=calcD;$('_ot_fkt').onchange=calcD;
  $('_ot_pl').onclick=function(){ex++;$('_ot_ex').textContent=ex;calcD()};
  $('_ot_mn').onclick=function(){if(ex>0)ex--;$('_ot_ex').textContent=ex;calcD()};
  function setVal(el,v){var pr=el.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:HTMLInputElement.prototype;var setter=Object.getOwnPropertyDescriptor(pr,'value').set;el.focus();el.dispatchEvent(new Event('focusin',{bubbles:true}));setter.call(el,v);el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));el.dispatchEvent(new Event('keyup',{bubbles:true}));el.dispatchEvent(new Event('blur',{bubbles:true}));el.dispatchEvent(new Event('focusout',{bubbles:true}))}
  function findQ(qid){var sels=['[data-automation-value*="'+qid+'"]','[id*="'+qid+'"]','[name*="'+qid+'"]','[aria-describedby*="'+qid+'"]'];for(var i=0;i<sels.length;i++){var e=document.querySelector(sels[i]);if(e)return e.closest('[data-automation-id]')||e}var all=document.querySelectorAll('[data-automation-id]');for(var j=0;j<all.length;j++){if(all[j].innerHTML.indexOf(qid)>-1)return all[j]}return null}
  function fillField(qid,val){var c=findQ(qid);if(!c)return false;var inp=c.querySelector('input:not([type=hidden]),textarea');if(inp){setVal(inp,val);return true}var opts=c.querySelectorAll('[role=radio],[role=option]');for(var i=0;i<opts.length;i++){if(opts[i].textContent.trim().indexOf(val)>-1){opts[i].click();return true}}var dd=c.querySelector('[role=listbox],[role=combobox],select');if(dd){dd.click();setTimeout(function(){var os=document.querySelectorAll('[role=option]');for(var k=0;k<os.length;k++){if(os[k].textContent.trim().indexOf(val)>-1){os[k].click();break}}},300);return true}return false}
  function actFill(qid,val){var c=findQ(qid);if(!c)return;c.click();var btn=c.querySelector('button,i,[role=button],[class*=icon]');if(btn)btn.click();setTimeout(function(){var inp=c.querySelector('input:not([type=hidden]),textarea');if(inp){inp.click();inp.focus();setVal(inp,val)}},300)}
  function closePicker(inp){if(inp){inp.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',code:'Escape',keyCode:27,bubbles:true}));inp.blur();inp.dispatchEvent(new Event('blur',{bubbles:true}));inp.dispatchEvent(new Event('focusout',{bubbles:true}))}setTimeout(function(){document.body.click()},50)}
  function fillDate(qid,val){var c=findQ(qid);if(!c)return;c.click();setTimeout(function(){var inp=c.querySelector('input:not([type=hidden])');if(!inp){var btn=c.querySelector('button,i,[role=button],[class*=icon]');if(btn)btn.click();setTimeout(function(){inp=c.querySelector('input:not([type=hidden])');if(inp){inp.click();inp.focus();setVal(inp,val);setTimeout(function(){closePicker(inp)},150)}},300);return}inp.click();inp.focus();setVal(inp,val);setTimeout(function(){closePicker(inp);setTimeout(function(){var inp2=c.querySelector('input:not([type=hidden])');if(inp2&&inp2.value!==val){inp2.click();inp2.focus();setVal(inp2,val);setTimeout(function(){closePicker(inp2)},150)}},300)},150)},200)}
  $('_ot_go').onclick=function(){var o=$('_ot_ord').value,f=$('_ot_fkt').value;var op=o?o.split(':').map(Number):[0,0];var fp=f?f.split(':').map(Number):[0,0];var df=(fp[0]*60+fp[1])-(op[0]*60+op[1]);if(df<0)df+=1440;var total=df+ex;var datumVal=$('_ot_dt').value;var data={};data[Q.trafikomrade]=$('_ot_tr').value;var kp=ov.querySelector('input[name="_otkp"]:checked');data[Q.kompPengar]=kp?kp.value:'Komp';data[Q.tagNummer]=$('_ot_tag').value;data[Q.ordTid]=o;data[Q.faktTid]=f;data[Q.forsening]=String(total);data[Q.orsak]=$('_ot_or').value;data[Q.namn]=$('_ot_nm').value;data[Q.adNummer]=$('_ot_ad').value;st.namn=$('_ot_nm').value;st.adNummer=$('_ot_ad').value;st.kompPengar=kp?kp.value:'Komp';st.trafikomrade=$('_ot_tr').value;svS(st);var vals=getFormVals();vals.forsening=String(total);vals.sentAt=new Date().toISOString();var hi=getHist();hi.unshift(vals);if(hi.length>50)hi.length=50;setHist(hi);var keys=Object.keys(data),ok=0,failed=[];for(var i=0;i<keys.length;i++){if(data[keys[i]]){if(fillField(keys[i],data[keys[i]]))ok++;else failed.push(keys[i])}}ov.remove();if(datumVal){fillDate(Q.datum,datumVal);ok++}if(failed.length>0){for(var f2=0;f2<failed.length;f2++){actFill(failed[f2],data[failed[f2]])}setTimeout(function(){var retry=0;for(var ri=0;ri<failed.length;ri++){if(fillField(failed[ri],data[failed[ri]]))retry++}ok+=retry;showD(ok,keys.length+1)},800)}else{setTimeout(function(){showD(ok,keys.length+1)},800)}};
  function showD(ok,total){var m=document.createElement('div');m.style.cssText='position:fixed;left:50%;transform:translateX(-50%);top:20px;z-index:999999;padding:14px 24px;border-radius:12px;font:bold 15px -apple-system,sans-serif;box-shadow:0 4px 20px rgba(0,0,0,.3);background:#166534;color:#fff;transition:opacity .3s';m.textContent='\u2705 '+ok+'/'+total+' f\u00e4lt ifyllda';document.body.appendChild(m);setTimeout(function(){m.style.opacity='0';setTimeout(function(){m.remove()},400)},4000)}
})();
