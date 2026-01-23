(function(){
  'use strict';
  const $ = id => document.getElementById(id);

  // ======================
  // 🗂️ Data Kamus (LOCAL DICT)
  // ======================
  const DICT = {
    "Kata sapaan": {
      "sebutan": [
        {"ind":"ayah","ter":"baba","tido":"dadi","tob":"papa","img":"assets/img/bapak.png"},
        {"ind":"nasi","ter":"rice","tido":"ruce","tob":"race","img":"assets/img/bapak.png"},
        {"ind":"kuning","ter":"yel","tido":"wolu","tob":"wila","img":"assets/img/bapak.png"},
        {"ind":"nasi kuning","ter":"ampeng","tido":"tumpeng","tob":"apeng tu","img":"assets/img/bapak.png"},
        {"ind":"ibu","ter":"ina","tido":"ine","tob":"mama","img":"assets/img/ibu.png"},
        {"ind":"saudara","ter":"hira sebira","tido":"hirane","tob":"ne-hira","img":"img/mulut.png"},
        {"ind":"saudara laki-laki","ter":"ngofa","tido":"ihara","tob":"hiha","img":"assets/img/saudara.png"},
        {"ind":"saudara perempuan","ter":"ngofa bade","tido":"ihara bade","tob":"hiha bade","img":"assets/img/saudara2.png"},
        {"ind":"bibi","ter":"ngofa bade","tido":"ihara bade","tob":"hiha bade","img":"assets/img/saudara2.png"},
        {"ind":"paman","ter":"ngofa bade","tido":"ihara bade","tob":"hiha bade","img":"assets/img/saudara2.png"},
        {"ind":"kakek","ter":"ngofa bade","tido":"ihara bade","tob":"hiha bade","img":"assets/img/saudara2.png"},
        {"ind":"nenek","ter":"ngofa bade","tido":"ihara bade","tob":"hiha bade","img":"assets/img/saudara2.png"},
        {"ind":"tuan","ter":"tuan","tido":"tuan","tob":"tuan","img":"assets/img/tuan.png"},
        {"ind":"mbak","ter":"bade","tido":"bade","tob":"bade","img":"assets/img/mbak.png"},
        {"ind":"mas","ter":"kaka","tido":"kaka","tob":"kaka","img":"assets/img/mas.png"}
      ],
      "sapaan biasa": [
        {"ind":"halo","ter":"halo","tido":"halo","tob":"halo","img":"assets/img/hallo.png"},
        {"ind":"selamat pagi","ter":"selamat enjing","tido":"selamat fohin","tob":"selamat oini","img":"assets/img/selamat_pagi.png"},
        {"ind":"selamat malam","ter":"selamat dalu","tido":"selamat lale","tob":"selamat lafu","img":"assets/img/selamat_malam.png"}
      ]
    },
    "Kata bantu": {
      "kata kerja bantu": [
        {"ind":"akan","ter":"bakal","tido":"baka","tob":"gaga","img":"assets/img/akan.png"},
        {"ind":"sudah","ter":"suda","tido":"suda","tob":"so","img":"assets/img/sudah.png"},
        {"ind":"belum","ter":"belum","tido":"belo","tob":"tado","img":"assets/img/belum.png"},
        {"ind":"ingin","ter":"arep","tido":"hare","tob":"gola","img":"assets/img/ingin.png"}
      ]
    }
  };

  // ======================
  // 🧭 Build quick maps from DICT (multi-word keys supported)
  // ======================
  const maps = {
    "id-to-ter": new Map(),
    "ter-to-id": new Map(),
    "id-to-tido": new Map(),
    "tido-to-id": new Map(),
    "id-to-tob": new Map(),
    "tob-to-id": new Map()
  };

  (function buildMaps(){
    Object.values(DICT).forEach(themes=>{
      Object.values(themes).forEach(list=>{
        list.forEach(it=>{
          const ind = (it.ind||'').toLowerCase();
          if(!ind) return;
          if(it.ter) maps["id-to-ter"].set(ind, it.ter);
          if(it.ter) maps["ter-to-id"].set((it.ter||'').toLowerCase(), it.ind);
          if(it.tido) maps["id-to-tido"].set(ind, it.tido);
          if(it.tido) maps["tido-to-id"].set((it.tido||'').toLowerCase(), it.ind);
          if(it.tob) maps["id-to-tob"].set(ind, it.tob);
          if(it.tob) maps["tob-to-id"].set((it.tob||'').toLowerCase(), it.ind);
        });
      });
    });
  })();


  // ======================
  // 🔤 Normalisasi helper: buang tanda kutip/tanda baca kecuali '-' lalu collapse spasi
  // ======================
  function normalizeTextForLookup(text){
    if(!text) return '';
    // Buang quote jenis apapun dan tanda baca umum, tapi simpan huruf, angka, spasi, dan -
    // Note: \w mencakup [A-Za-z0-9_], kita hapus '_' jika perlu, tapi aman.
    // Pertama ubah ke lowercase
    let s = String(text).toLowerCase();
    // Hapus tanda kutip khusus dan tanda kutip biasa
    s = s.replace(/["“”‘’`]/g, '');
    // Hapus tanda baca lain kecuali '-' dan spasi
    s = s.replace(/[^\w\s-]/g, '');
    // Ganti underscore dengan spasi jika ada
    s = s.replace(/_/g, ' ');
    // Ganti jika ada
    s = s.replace(/\s*-\s*/g, "-");
    // Collapse multiple spaces
    s = s.replace(/\s+/g, ' ').trim();
    return s;
  }


  // ======================
  // 🔤 translateWithMap: cari frasa terpanjang dulu (multi kata/frasa)
  // dir: salah satu keys di maps
  // ======================
  function translateWithMap(text, dir){
    if(!text) return "";
    const dict = maps[dir] || new Map();

    // normalisasi
    text = normalizeTextForLookup(text);

    // token = kata (jaga tanda hubung sebagai satu unit)
    const tokens = text.split(/\s+/);
    let out = [], i = 0;

    while(i < tokens.length){
      let match = null, matchLen = 0;
      const maxLen = Math.min(8, tokens.length - i); // cukup 8 kata frasa
      for(let len = maxLen; len > 0; len--){
        const phrase = tokens.slice(i, i+len).join(" ");
        if(dict.has(phrase)){
          match = dict.get(phrase);
          matchLen = len;
          break;
        }
      }
      if(match){
        out.push(match);
        i += matchLen;
      } else {
        // fallback: kalau token mengandung '-', coba ganti '-' -> ' ' dan cek
        const t = tokens[i];
        const alt = t.replace(/-/g, ' ');
        if(dict.has(alt)){
          out.push(dict.get(alt));
        } else {
          out.push(t);
        }
        i++;
      }
    }

    return out.join(" ");
  }

  // ======================
  // 🧠 callOpenAIcorrect: minta GPT perbaiki TATA KALIMAT (bukan terjemahan ulang)
  // mengirim teks hasil kamus, menerima teks yang diperbaiki
  // ======================
  async function callOpenAIcorrect(text){
    if(!text) return text;
    try{
      const body = {
        model: (typeof OPENAI_MODEL !== 'undefined' ? OPENAI_MODEL : 'gpt-4o-mini'),
        messages: [
        {
          role: 'system',
          content:
            'Kamu adalah asisten bahasa. Tugasmu memperbaiki tata bahasa agar lebih alami **tanpa mengubah arti atau kata utama yang sudah diterjemahkan dari kamus lokal**. Jangan ganti kata dasar atau istilah lokal. Jika kalimat sudah wajar, biarkan sama.'
        },
        {
          role: 'user',
          content: `Perhalus kalimat hasil terjemahan ini agar lebih alami tanpa mengubah maknanya: "${text}".`
        }

        ],
        temperature: 0
      };

      const resp = await fetch((typeof API_PROXY_URL !== 'undefined' ? API_PROXY_URL : '/api/correct'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if(!resp.ok){
        // jika proxy/AI gagal, throw untuk ditangani di pemanggil
        const errBody = await resp.text();
        throw new Error(`AI proxy error ${resp.status}: ${errBody}`);
      }

      const j = await resp.json();
      // format response: choices[0].message.content
      const corrected = j?.choices?.[0]?.message?.content;
      return (corrected || text).trim();
    }catch(err){
      // lempar agar caller bisa fallback ke kamus
      throw err;
    }
  }

// 🔤 Sort A–Z berdasarkan Bahasa Indonesia
function sortAZByInd(list){
  return [...list].sort((a, b) =>
    (a.ind || '').localeCompare(b.ind || '', 'id', { sensitivity: 'base' })
  );
}


  // ======================
  // 🔠 Matching prefix functions
  // ======================
  // 🔠 PENCARIAN BARU: HURUF AWAL SAJA
function matchPrefixIndo(it, prefix){
  if(!prefix) return false;
  return it.ind && it.ind.toLowerCase().startsWith(prefix);
}
function matchPrefixDaerah(it, prefix, lang){
  if(!prefix) return false;
  const val = it[lang];
  return val && val.toLowerCase().startsWith(prefix);
}


  // ======================
  // 🪧 renderCategory: tampil kartu, pencarian, dan audio 1x/2x
  // ======================
  function renderCategory(category, theme){
    const cont = $('categoryContainer');
    cont.innerHTML = '';
    if(!category || !theme) return;

    const list = (DICT[category] && DICT[category][theme]) || [];
    const chosen = $('choosebahasa')?.value || 'ter';
    const search = ($('searchWord')?.value || '').toLowerCase().trim();
    const prefixInd = ($('searchPrefixInd')?.value || '').toLowerCase().trim();
    const prefixLoc = ($('searchPrefixLoc')?.value || '').toLowerCase().trim();

    // filter berdasarkan search & prefix
    const filtered = list.filter(it=>{

  // 🔤 1️⃣ PREFIX BAHASA INDONESIA
  if(prefixInd){
    return matchPrefixIndo(it, prefixInd);
  }

  // 🌍 2️⃣ PREFIX BAHASA DAERAH (sesuai pilihan)
  if(prefixLoc){
    return matchPrefixDaerah(it, prefixLoc, chosen);
  }

  // 🔍 3️⃣ SEARCH LAMA (includes)
  if(!search) return true;

  const combined = [it.ind, it.ter, it.tido, it.tob]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return combined.includes(search);
});

    // 🔤 URUTKAN A–Z BERDASARKAN BAHASA INDONESIA
    const sorted = sortAZByInd(filtered);

    if(filtered.length === 0){
      cont.innerHTML = `<div class="p-3 text-muted">Tidak ditemukan hasil untuk "<strong>${search}</strong>"</div>`;
      return;
    }

    sorted.forEach(it=>{
      const label = it[chosen] || '-';
      const card = document.createElement('div');
      card.className = 'card shadow-sm';
      card.style.width = '10rem';
      card.style.margin = '6px';
      card.innerHTML = `
        ${it.img?`<img src="${it.img}" class="card-img-top" alt="${it.ind}">`:''}
        <div class="card-body text-center">
          <h6 class="card-title mb-1">${it.ind}</h6>
          <p class="card-text small text-primary mb-0"><em>${label}</em></p>
        </div>`;

      // single click = read Indonesian; double click = read chosen language
      let clickTimer = null;
      card.addEventListener('click', ()=>{
        if(clickTimer){ clearTimeout(clickTimer); clickTimer = null; }
        clickTimer = setTimeout(()=>{
          const u = new SpeechSynthesisUtterance(it.ind);
          u.lang = 'id-ID';
          speechSynthesis.cancel();
          speechSynthesis.speak(u);
          clickTimer = null;
        }, 220);
      });

      card.addEventListener('dblclick', ()=>{
        if(clickTimer){ clearTimeout(clickTimer); clickTimer = null; }
        const chosenText = it[chosen] || '-';
        const u = new SpeechSynthesisUtterance(chosenText);
        u.lang = 'id-ID';
        speechSynthesis.cancel();
        speechSynthesis.speak(u);
      });

      cont.appendChild(card);
    });
  }

  // ======================
  // 🔽 populate dropdowns & allCategorySelect
  // ======================
  function populateDropdown(){
    const cat = $('categorySelect');
    const theme = $('themeSelect');
    if(!cat || !theme) return;

    cat.innerHTML = '';
    Object.keys(DICT).forEach(c=>{
      const o = document.createElement('option');
      o.value = c; o.textContent = c;
      cat.appendChild(o);
    });

    const firstCat = Object.keys(DICT)[0];
    cat.value = firstCat;

    theme.innerHTML = '';
    Object.keys(DICT[firstCat]).forEach(t=>{
      const o = document.createElement('option');
      o.value = t; o.textContent = t;
      theme.appendChild(o);
    });
    theme.value = Object.keys(DICT[firstCat])[0];

    renderCategory(firstCat, theme.value);

    // allCategorySelect
    const allCat = $('allCategorySelect');
    if(allCat){
      allCat.innerHTML = '<option value="all">Semua Kategori</option>' +
        Object.keys(DICT).map(c=>`<option value="${c}">${c}</option>`).join('');
    }

    // listeners
    cat.addEventListener('change', ()=>{
      theme.innerHTML = '';
      Object.keys(DICT[cat.value]).forEach(t=>{
        const o = document.createElement('option');
        o.value = t; o.textContent = t;
        theme.appendChild(o);
      });
      theme.value = Object.keys(DICT[cat.value])[0];
      renderCategory(cat.value, theme.value);
    });
    theme.addEventListener('change', ()=> renderCategory(cat.value, theme.value));
  }

  // ======================
  // 🧾 renderTable
  // ======================
  function renderTable(filterCat="all"){
    const tb = $('tableBody');
    if(!tb) return;
    tb.innerHTML = '';
    Object.entries(DICT).forEach(([cat,themes])=>{
      if(filterCat !== "all" && filterCat !== cat) return;
      Object.entries(themes).forEach(([theme,list])=>{
      const sortedList = sortAZByInd(list); // 🔤 A–Z
      sortedList.forEach(it=>{
          const tr = document.createElement('tr');
          tr.innerHTML = `<td>${cat}</td><td>${theme}</td><td>${it.ind||''}</td>
            <td>${it.ter||''}</td><td>${it.tido||''}</td><td>${it.tob||''}</td>`;
          tb.appendChild(tr);
        });
      });
    });
  }

  // ======================
  // 🚀 initUI: tombol & alur translate (kamus → optional GPT)
  // ======================
  function initUI(){
    populateDropdown();
    renderTable();

    // translate utama: ambil dari kamus dulu, lalu (opsional) minta GPT memperbaiki
    $('translateBtn')?.addEventListener('click', async ()=>{
      const raw = ($('inputText')?.value || '').trim();
      if(!raw) return;
      $('log').textContent = '⏳Memproses...';

      const dir = ($('direction')?.value) || 'id-to-ter';
      // 1) terjemahkan dulu dari kamus lokal
      let source=raw;

      if($('useAI').checked){
        try{
          const corrected=await callOpenAIcorrect(raw);
          source=corrected;
          $('log').textContent=`Kalimat dikoreksi: ${corrected}`;
        }catch(err){
          $('log').textContent='⚠️ GPT sibuk, hasil dari kamus lokal digunakan.';
        }
      }else{
        $('log').textContent='Mode tanpa AI (langsung kamus)';
      }

      $('outputText').value=translateWithMap(source, dir);
    });

    // translate simple: langsung kamus (tanpa AI)
    $('translateSimpleBtn')?.addEventListener('click', ()=>{
      const raw = normalizeTextForLookup(($('inputText')?.value || '').trim());
      if(!raw) return;
      const dir = ($('direction')?.value) || 'id-to-ter';
      $('outputText').value = translateWithMap(raw, dir);
      $('log').textContent = 'Terjemah langsung dari kamus lokal.';
    });

    $('searchPrefixInd')?.addEventListener('input', ()=>{
    $('searchPrefixLoc').value = ''; // matikan yang lain
    renderCategory(
      $('categorySelect')?.value,
      $('themeSelect')?.value
    );
  });

  $('searchPrefixLoc')?.addEventListener('input', ()=>{
    $('searchPrefixInd').value = ''; // matikan yang lain
    renderCategory(
      $('categorySelect')?.value,
      $('themeSelect')?.value
    );
  });


    // clear
    $('clearBtn')?.addEventListener('click', ()=>{
      if($('inputText')) $('inputText').value = '';
      if($('outputText')) $('outputText').value = '';
      if($('log')) $('log').textContent = '';
    });

    // copy
    $('copyBtn').addEventListener('click', async ()=>{
      try{
        await navigator.clipboard.writeText($('outputText').value||'');
        $('copyBtn').textContent='✓ Tersalin';
        setTimeout(()=>{$('copyBtn').textContent='📋 Salin';},1200);
      }catch{alert('Gagal salin');}
    });

    // speak output
    $('speakBtn')?.addEventListener('click', ()=>{
      const txt = ($('outputText')?.value || '').trim();
      if(!txt) return;
      const u = new SpeechSynthesisUtterance(txt);
      u.lang = 'id-ID';
      speechSynthesis.cancel(); speechSynthesis.speak(u);
    });

    // swap direction + pindahkan hasil ke input otomatis (agar bisa translate balik)
    $('swapBtn')?.addEventListener('click', ()=>{
      const sel = $('direction'); if(!sel) return;
      const p = {
        "id-to-ter":"ter-to-id","ter-to-id":"id-to-ter",
        "id-to-tido":"tido-to-id","tido-to-id":"id-to-tido",
        "id-to-tob":"tob-to-id","tob-to-id":"id-to-tob"
      };
      sel.value = p[sel.value] || sel.value;

      // pindahkan isi output ke input (normalisasi ringan untuk kenyamanan)
      const outVal = ($('outputText')?.value || '').trim();
      if(outVal){
        // keluarkan tanda kutip/tanda baca di ujung agar lookup bekerja
        const cleaned = outVal.replace(/^["“”‘’']+|["“”‘’.?!,;:]+$/g, '').trim();
        $('inputText').value = cleaned;
        $('outputText').value = '';
        $('log').textContent = '↔ Bahasa ditukar, hasil sebelumnya dipindahkan ke kolom input.';
      }
    });


    // search & choosebahasa interactions for cards
    $('btnSearch')?.addEventListener('click', ()=> renderCategory($('categorySelect')?.value, $('themeSelect')?.value));
    $('searchWord')?.addEventListener('input', ()=> renderCategory($('categorySelect')?.value, $('themeSelect')?.value));
    $('choosebahasa')?.addEventListener('change', ()=> renderCategory($('categorySelect')?.value, $('themeSelect')?.value));

    // allCategorySelect change
    const allCat = $('allCategorySelect');
    if(allCat){
      allCat.addEventListener('change', ()=> renderTable(allCat.value));
    }
  }

  document.addEventListener('DOMContentLoaded', initUI);

})();
