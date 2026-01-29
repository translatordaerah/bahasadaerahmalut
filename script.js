(function(){
  'use strict';
  const $ = id => document.getElementById(id);

  // ======================
  // 🗂️ Data Kamus (LOCAL DICT)
  // ======================
  const DICT = {
    "Kata Benda": {
      "Keluarga": [
        {"ind":"ayah","ter":"baba","tido":"dadi","tob":"papa","img":"https://img.freepik.com/premium-photo/3d-illustration-cartoon-character-with-happy-expression-his-face_1057-44581.jpg?w=360"},
        {"ind":"ibu","ter":"ina","tido":"ine","tob":"mama","img":"https://img.freepik.com/free-photo/celebration-labour-day-with-3d-cartoon-portrait-working-woman_23-2151306628.jpg?semt=ais_hybrid&w=740&q=80"},
        {"ind":"anak","ter":"anak","tido":"anak","tob":"anak","img":"https://marketplace.canva.com/4aiT4/MAGid44aiT4/1/tl/canva-happy-cartoon-boy-drawing-outdoors-MAGid44aiT4.jpg"},
        {"ind":"anak laki-laki","ter":"anak lanang","tido":"anak mane","tob":"anak lang","img":"https://png.pngtree.com/png-clipart/20250119/original/pngtree-3d-animated-boy-character-with-cool-outfit-and-energetic-pose-png-image_19860542.png"},
        {"ind":"anak perempuan","ter":"anak wadon","tido":"anak fona","tob":"anak weng","img":"https://i.pinimg.com/236x/56/e5/06/56e506857047aa0d16225da817f68108.jpg"},
        {"ind":"kakak","ter":"kaka","tido":"kaka","tob":"kaka","img":"https://img.freepik.com/foto-gratis/pria-kebugaran-kartun-3d_23-2151691490.jpg"},
        {"ind":"adik","ter":"bade","tido":"bade","tob":"bade","img":"https://png.pngtree.com/png-vector/20250823/ourmid/pngtree-2d-animated-character-for-a-kids-anime-style-character-character-png-image_17303971.png"},
        {"ind":"kakek","ter":"ngofa bade","tido":"ihara bade","tob":"hiha bade","img":"assets/img/saudara2.png"},
        {"ind":"nenek","ter":"ngofa bade","tido":"ihara bade","tob":"hiha bade","img":"assets/img/saudara2.png"},
        {"ind":"suami","ter":"suami","tido":"suami","tob":"suami","img":"assets/img/suami.png"},
        {"ind":"istri","ter":"istri","tido":"istri","tob":"istri","img":"assets/img/istri.png"},
        {"ind":"paman","ter":"ngofa bade","tido":"ihara bade","tob":"hiha bade","img":"assets/img/saudara2.png"},
        {"ind":"paman","ter":"ngofa bade","tido":"ihara bade","tob":"hiha bade","img":"assets/img/saudara2.png"},
        {"ind":"bibi","ter":"ngofa bade","tido":"ihara bade","tob":"hiha bade","img":"assets/img/saudara2.png"},
        {"ind":"sepupu","ter":"sepupu","tido":"sepupu","tob":"sepupu","img":"assets/img/sepupu.png"},
        {"ind":"cucu","ter":"cucu","tido":"cucu","tob":"cucu","img":"assets/img/cucu.png"},
        {"ind":"mertua","ter":"mertua","tido":"mertua","tob":"mertua","img":"assets/img/mertua.png"},
        {"ind":"mertua laki-laki","ter":"bapa mertua","tido":"dadi mertua","tob":"papa mertua","img":"assets/img/mertua.png"},
        {"ind":"mertua perempuan","ter":"ibu mertua","tido":"ine mertua","tob":"mama mertua","img":"assets/img/mertua2.png"},
        {"ind":"menantu","ter":"menantu","tido":"menantu","tob":"menantu","img":"assets/img/menantu.png"},
        {"ind":"menantu laki-laki","ter":"menantu lanang","tido":"menantu mane","tob":"menantu lang","img":"assets/img/menantu_laki.png"},
        {"ind":"menantu perempuan","ter":"menantu wadon","tido":"menantu fona","tob":"menantu weng","img":"assets/img/menantu_perempuan.png"},
        {"ind":"saudara","ter":"hira sebira","tido":"hirane","tob":"ne-hira","img":"img/mulut.png"},
        {"ind":"saudara laki-laki","ter":"ngofa","tido":"ihara","tob":"hiha","img":"assets/img/saudara.png"},
        {"ind":"saudara perempuan","ter":"ngofa bade","tido":"ihara bade","tob":"hiha bade","img":"assets/img/saudara2.png"},
        {"ind":"sepupu laki-laki","ter":"sepupu lanang","tido":"sepupu mane","tob":"sepupu lang","img":"assets/img/sepupu.png"},
        {"ind":"sepupu perempuan","ter":"sepupu wadon","tido":"sepupu fona","tob":"sepupu weng","img":"assets/img/sepupu2.png"},
        {"ind":"seibu","ter":"seibu","tido":"seibu","tob":"seibu","img":"assets/img/seibu.png"},
        {"ind":"seayah","ter":"seayah","tido":"seayah","tob":"seayah","img":"assets/img/seayah.png"},
        {"ind":"bayi","ter":"bayi","tido":"bayi","tob":"bayi","img":"assets/img/bayi.png"},
        {"ind":"ipar laki-laki","ter":"ipar lanang","tido":"ipar mane","tob":"ipar lang","img":"assets/img/ipar_laki.png"},
        {"ind":"ipar perempuan","ter":"ipar wadon","tido":"ipar fona","tob":"ipar weng","img":"assets/img/ipar_perempuan.png"},
        {"ind":"laki-laki","ter":"lanang","tido":"mane","tob":"lang","img":"assets/img/laki_laki.png"},
        {"ind":"perempuan","ter":"wadon","tido":"fona","tob":"weng","img":"assets/img/perempuan.png"},
      ],
      "Tubuh": [
        {"ind":"kepala","ter":"sirah","tido":"kapa","tob":"kafa","img":"assets/img/kepala.png"},
        {"ind":"mata","ter":"mripat","tido":"mata","tob":"mata","img":"assets/img/mata.png"},
        {"ind":"telinga","ter":"kuping","tido":"kuli","tob":"kufi","img":"assets/img/telinga.png"},
        {"ind":"hidung","ter":"irung","tido":"hidu","tob":"hidu","img":"assets/img/hidung.png"},
        {"ind":"mulut","ter":"cangkem","tido":"loma","tob":"loma","img":"assets/img/mulut.png"},
        {"ind":"gigi","ter":"untu","tido":"gigi","tob":"gigi","img":"assets/img/gigi.png"},
        {"ind":"leher","ter":"gulu","tido":"leher","tob":"leher","img":"assets/img/leher.png"},
        {"ind":"tangan","ter":"tangan","tido":"tangan","tob":"tangan","img":"assets/img/tangan.png"},
        {"ind":"kaki","ter":"sikil","tido":"kaki","tob":"kaki","img":"assets/img/kaki.png"},
        {"ind":"perut","ter":"weteng","tido":"perut","tob":"perut","img":"assets/img/perut.png"},
        {"ind":"punggung","ter":"punggung","tido":"punggung","tob":"punggung","img":"assets/img/punggung.png"},
        {"ind":"jantung","ter":"jantung","tido":"jantung","tob":"jantung","img":"assets/img/jantung.png"},
        {"ind":"otak","ter":"otak","tido":"otak","tob":"otak","img":"assets/img/otak.png"},
        {"ind":"dagu","ter":"dagu","tido":"dagu","tob":"dagu","img":"assets/img/dagu.png"},
        {"ind":"dahi","ter":"dahi","tido":"dahi","tob":"dahi","img":"assets/img/dahi.png"},
        {"ind":"pipi","ter":"pipi","tido":"pipi","tob":"pipi","img":"assets/img/pipi.png"},
        {"ind":"lengan","ter":"lengan","tido":"lengan","tob":"lengan","img":"assets/img/lengan.png"},
        {"ind":"lutut","ter":"lutut","tido":"lutut","tob":"lutut","img":"assets/img/lutut.png"},
        {"ind":"bahu","ter":"badhuk","tido":"bahu","tob":"bahu","img":"assets/img/bahu.png"},
        {"ind":"paha","ter":"paha","tido":"paha","tob":"paha","img":"assets/img/paha.png"},
        {"ind":"betis","ter":"betis","tido":"betis","tob":"betis","img":"assets/img/betis.png"},
        {"ind":"rambut","ter":"rambut","tido":"rambut","tob":"rambut","img":"assets/img/rambut.png"},
        {"ind":"alis","ter":"alis","tido":"alis","tob":"alis","img":"assets/img/alis.png"},
        {"ind":"jari","ter":"driji","tido":"jari","tob":"jari","img":"assets/img/jari.png"},
        {"ind":"lidah","ter":"lidah","tido":"lidah","tob":"lidah","img":"assets/img/lidah.png"},
        {"ind":"kuku","ter":"kuku","tido":"kuku","tob":"kuku","img":"assets/img/kuku.png"},
        {"ind":"siku","ter":"siku","tido":"siku","tob":"siku","img":"assets/img/siku.png"}
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
        {"ind":"ingin","ter":"arep","tido":"hare","tob":"gola","img":"assets/img/ingin.png"},
        {"ind":"nenek","ter":"ngofa bade","tido":"ihara bade","tob":"hiha bade","img":"assets/img/saudara2.png"}        
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
// ======================
// 🧠 callOpenAIcorrect
// KOREKSI BAHASA INDONESIA (SEBELUM TERJEMAH)
// ======================
async function callOpenAIcorrect(text){
  if(!text) return text;

  try{
    const body = {
      model: OPENAI_MODEL || "gpt-5.2-mini",
      messages: [
        {
          role: "system",
          content:
            "Kamu adalah asisten bahasa Indonesia. Tugasmu memperbaiki tata bahasa agar baku dan alami. Jangan menerjemahkan ke bahasa lain. Jangan mengubah makna. Jangan menambah informasi."
        },
        {
          role: "user",
          content:
`Perbaiki kalimat Bahasa Indonesia berikut agar sesuai tata bahasa baku.
Tambahkan kata hubung atau preposisi yang hilang (misalnya: ke, di, dari).
Kembalikan HANYA hasil koreksi.

Kalimat:
${text}`
        }
      ],
      temperature: 0
    };

    const resp = await fetch(API_PROXY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if(!resp.ok){
      const err = await resp.text();
      throw new Error(err);
    }

    const data = await resp.json();

    // 🔑 KOMPATIBEL DENGAN BACKEND KAMU
    const corrected =
      data?.choices?.[0]?.message?.content ||
      text;

    return corrected.trim();

  }catch(err){
    throw err;
  }
}

  // ======================
  // 🔤 countAllVocabulary: hitung total kosakata di DICT
  // ======================
  function countAllVocabulary(){
  let total = 0;

  Object.values(DICT).forEach(themes=>{
    Object.values(themes).forEach(list=>{
      total += list.length;
    });
  });

  return total;
}

  // ======================
  // 🔤 countUniqueVocabulary: hitung total kosakata unik di DICT
  // ======================
function countUniqueVocabulary(){
  const set = new Set();

  Object.values(DICT).forEach(themes=>{
    Object.values(themes).forEach(list=>{
      list.forEach(it=>{
        if(it.ind){
          set.add(it.ind.toLowerCase().trim());
        }
      });
    });
  });

  return set.size;
}


  // ======================
  // 🔤 detectDuplicateVocabulary: deteksi kosakata duplikat di DIC
  // ======================
function detectDuplicateVocabulary(){
  const map = new Map();

  Object.values(DICT).forEach(themes=>{
    Object.values(themes).forEach(list=>{
      list.forEach(it=>{
        if(!it.ind) return;
        const key = it.ind.toLowerCase().trim();
        map.set(key, (map.get(key) || 0) + 1);
      });
    });
  });

  // ambil yang lebih dari 1
  return [...map.entries()]
    .filter(([_, count]) => count > 1)
    .map(([word, count]) => ({ word, count }));
}


function renderVocabularyStats(){
  const total = countAllVocabulary();
  const unik = countUniqueVocabulary();
  const duplikat = detectDuplicateVocabulary();

  $('totalUnik').textContent =
    `Total kosa kata unik: ${unik}`;

  $('statKamus').innerHTML = `
    <div>📘 Total data: <b>${total}</b></div>
    <div>✅ Total unik: <b>${unik}</b></div>
    <div>⚠️ Duplikat: <b>${duplikat.length}</b></div>
  `;
}

function detectDuplicateWithLocation(){
  const map = {};

  Object.entries(DICT).forEach(([kategori, themes])=>{
    Object.entries(themes).forEach(([tema, list])=>{
      list.forEach(it=>{
        if(!it.ind) return;

        const key = it.ind.toLowerCase().trim();
        if(!map[key]) map[key] = [];
        map[key].push({ kategori, tema });
      });
    });
  });

  return Object.entries(map)
    .filter(([_, arr]) => arr.length > 1)
    .map(([kata, lokasi]) => ({
      kata,
      jumlah: lokasi.length,
      lokasi
    }));
}

function renderDuplicateDetail(){
  const data = detectDuplicateWithLocation();
  const box = $('duplicateDetail');

  if(data.length === 0){
    box.classList.add('d-none');
    return;
  }

  let html = `<b>⚠️ Kata duplikat terdeteksi:</b><ul class="mb-0">`;

  data.forEach(d=>{
    html += `
      <li>
        <b>${d.kata}</b> (${d.jumlah}x)
        <br>
        <small>
          ${d.lokasi.map(l=>`${l.kategori} → ${l.tema}`).join(' | ')}
        </small>
      </li>`;
  });

  html += `</ul>`;
  box.innerHTML = html;
  box.classList.remove('d-none');
}



  // ======================
  // 🔤 sortAZByInd: mengurutkan A–Z berdasarkan Bahasa Indonesia
  // ======================
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
      card.className = "card vocab-card shadow-sm h-100 border-0";
      card.style.width = '10rem';
      card.style.margin = '6px';
      card.innerHTML = `
        ${it.img?`<img src="${it.img}" class="card-img-top" alt="${it.ind}">`:''}
        <div class="card-body text-center p-3">
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
    renderVocabularyStats();
    renderDuplicateDetail();

    // translate utama: ambil dari kamus dulu, lalu (opsional) minta GPT memperbaiki
    $('translateBtn')?.addEventListener('click', async ()=>{
    const raw = ($('inputText')?.value || '').trim();
    if(!raw) return;

    $('translateBtn').disabled = true;
    $('log').textContent = '⏳ Memproses...';

    const dir = $('direction')?.value || 'id-to-ter';

    // 1️⃣ TERJEMAH DENGAN KAMUS DULU
    let translated = translateWithMap(raw, dir);

    // 2️⃣ GPT HANYA MEMPERHALUS
    if($('useAI').checked){
      try{
        translated = await callOpenAIcorrect(translated);
        $('log').textContent = 'Kalimat dikoreksi oleh GPT';
      }catch(e){
        $('log').textContent = '❌ AI Error: ' + e.message;
      }
    } else {
      $('log').textContent = 'Mode tanpa AI';
    }

    $('outputText').value = translated;
    $('translateBtn').disabled = false;
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
