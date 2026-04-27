'use strict';

/* ── SUPPLIER DATA ── */
const SUPPLIERS = [
  { id:1, initials:'SW', name:'Swastik Metal Components', location:'Greater Noida, UP', tags:['Nickel Plated Strips','Pure Nickel','Battery Connectors'], rating:4.8, reviews:142, response:'< 2 hrs', verified:true, phone:'+91 81126 62827', wa:'918112662827', match:'In-house plating · 25T/month · Zero tooling cost', keywords:['nickel','strip','battery','plated','pure','connector','cell','pack'] },
  { id:2, initials:'AR', name:'Arambhika Enablers', location:'Greater Noida, UP', tags:['Pure Nickel Strips','Copper Busbars','Aluminium Busbars'], rating:4.9, reviews:89, response:'< 1 hr', verified:true, phone:'+91 93074 80409', wa:'919307480409', match:'99.6% purity · Custom shapes · 7-day delivery', keywords:['nickel','copper','busbar','aluminium','battery','strip','custom','pure'] },
  { id:3, initials:'PC', name:'Pune Copper Works', location:'Pune, Maharashtra', tags:['Copper Sheets','Copper Busbars','Rods'], rating:4.7, reviews:201, response:'< 3 hrs', verified:true, phone:'+91 98765 43210', wa:'919876543210', match:'ETP Grade · 100% IACS · Custom cut', keywords:['copper','busbar','sheet','rod','metal','etp','conductor'] },
  { id:4, initials:'RM', name:'Rajkot Metal Industries', location:'Rajkot, Gujarat', tags:['Steel Fasteners','Bolts & Nuts','Stainless Steel'], rating:4.6, reviews:312, response:'< 4 hrs', verified:true, phone:'+91 97654 32109', wa:'919765432109', match:'ISO certified · 10,000+ SKUs · Bulk pricing', keywords:['steel','fastener','bolt','nut','screw','stainless','metal','industrial'] },
  { id:5, initials:'MS', name:'Mumbai Steel Suppliers', location:'Mumbai, Maharashtra', tags:['HR Coils','CR Strips','Steel Sheets'], rating:4.5, reviews:445, response:'< 5 hrs', verified:true, phone:'+91 96543 21098', wa:'919654321098', match:'HR/CR stock · 48hr Mumbai delivery · Bulk MOQ', keywords:['steel','coil','sheet','hr','cr','metal','iron','raw material'] },
  { id:6, initials:'GP', name:'Gujarat Polymer Pack', location:'Surat, Gujarat', tags:['HDPE Bags','PP Woven Bags','Industrial Packaging'], rating:4.4, reviews:178, response:'< 6 hrs', verified:true, phone:'+91 95432 10987', wa:'919543210987', match:'Custom print · Food-grade options · Low MOQ', keywords:['hdpe','packaging','bag','pp','woven','pack','plastic','polythene','polymer'] },
  { id:7, initials:'DI', name:'Delhi Industrial Electronics', location:'Delhi NCR', tags:['PCB Components','Sensors','Industrial Relays'], rating:4.6, reviews:93, response:'< 2 hrs', verified:true, phone:'+91 94321 09876', wa:'919432109876', match:'RoHS certified · Import substitution · 2hr response', keywords:['pcb','sensor','relay','electronic','component','industrial','circuit','board'] },
  { id:8, initials:'BT', name:'Bangalore Tech Metals', location:'Bangalore, Karnataka', tags:['Aluminium Profiles','Extrusions','Sheets'], rating:4.7, reviews:156, response:'< 3 hrs', verified:true, phone:'+91 93210 98765', wa:'919321098765', match:'6061/7075 alloy · CNC machining · Anodised', keywords:['aluminium','aluminum','profile','extrusion','sheet','alloy','anodised','lightweight'] },
  { id:9, initials:'JT', name:'Jaipur Textile Mills', location:'Jaipur, Rajasthan', tags:['Cotton Fabric','Polyester Blend','Industrial Cloth'], rating:4.3, reviews:267, response:'< 8 hrs', verified:true, phone:'+91 92109 87654', wa:'919210987654', match:'GSM 120–400 · Custom dyeing · Bulk wholesale', keywords:['textile','fabric','cotton','polyester','cloth','yarn','weave','thread'] },
  { id:10, initials:'CA', name:'Chennai Auto Parts Hub', location:'Chennai, Tamil Nadu', tags:['Engine Parts','Gaskets','Auto Fasteners'], rating:4.8, reviews:389, response:'< 2 hrs', verified:true, phone:'+91 91098 76543', wa:'919109876543', match:'OEM quality · 10,000+ SKUs · Same-day dispatch', keywords:['auto','automobile','car','engine','gasket','spare','part','vehicle','fastener'] },
];

/* ── SEARCH LOGIC ── */
function scoreSupplier(supplier, query) {
  const q = query.toLowerCase();
  const words = q.split(/\s+/).filter(w => w.length > 2);
  let score = 0;
  words.forEach(word => {
    if (supplier.keywords.some(k => k.includes(word) || word.includes(k))) score += 3;
    if (supplier.name.toLowerCase().includes(word)) score += 2;
    if (supplier.tags.some(t => t.toLowerCase().includes(word))) score += 2;
    if (supplier.location.toLowerCase().includes(word)) score += 1;
    if (supplier.match.toLowerCase().includes(word)) score += 1;
  });
  return score;
}

function getAiAnswer(query) {
  const q = query.toLowerCase();
  if (q.includes('nickel') || q.includes('strip')) return `Found verified <strong>nickel strip manufacturers</strong> for your query. Both suppliers are Greater Noida-based with in-house plating plants, zero tooling cost, and fast 7-day custom lead times. WhatsApp them directly for pricing.`;
  if (q.includes('copper') || q.includes('busbar')) return `Found <strong>copper busbar manufacturers</strong> matching your requirement. ETP-grade copper, 100% IACS conductivity, custom shapes available. Click WhatsApp to share your dimensions.`;
  if (q.includes('steel') || q.includes('fastener') || q.includes('bolt')) return `Found <strong>steel fastener & metal suppliers</strong> with ISO certification and bulk pricing. Pan-India delivery available. Contact directly for quantity-based rates.`;
  if (q.includes('hdpe') || q.includes('packag') || q.includes('bag')) return `Found <strong>industrial packaging manufacturers</strong> with custom print and low MOQ options. HDPE, PP woven, and specialty bags available.`;
  if (q.includes('alumin')) return `Found <strong>aluminium profile & extrusion manufacturers</strong>. 6061/7075 alloy, CNC machining, anodised finish available. Share your profile drawing on WhatsApp.`;
  if (q.includes('textile') || q.includes('fabric') || q.includes('cotton')) return `Found <strong>textile manufacturers</strong> offering bulk wholesale pricing. Custom GSM, dyeing, and weave patterns available.`;
  return `Found <strong>${SUPPLIERS.length} verified suppliers</strong> matching your query. Results sorted by relevance and rating. Contact them directly via phone or WhatsApp below.`;
}

function search(query) {
  if (!query.trim()) return;

  const resultsWrap = document.getElementById('resultsWrap');
  const resultsQuery = document.getElementById('resultsQuery');
  const aiAnswerBox = document.getElementById('aiAnswerBox');
  const contactsGrid = document.getElementById('contactsGrid');

  resultsWrap.style.display = 'block';
  resultsQuery.innerHTML = `Showing results for <strong>"${query}"</strong>`;
  aiAnswerBox.classList.remove('show');
  contactsGrid.innerHTML = '';

  // Scroll to results
  setTimeout(() => resultsWrap.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);

  // Show skeletons
  for (let i = 0; i < 4; i++) {
    contactsGrid.insertAdjacentHTML('beforeend', `
      <div class="skeleton-card">
        <div class="skel-header"></div>
        <div class="skel-body">
          <div class="skel-line"></div>
          <div class="skel-line short"></div>
          <div class="skel-line"></div>
          <div class="skel-btn"></div>
          <div class="skel-btn"></div>
        </div>
      </div>`);
  }

  // Simulate AI processing delay
  setTimeout(() => {
    const scored = SUPPLIERS
      .map(s => ({ ...s, score: scoreSupplier(s, query) }))
      .sort((a, b) => b.score - a.score || b.rating - a.rating);

    contactsGrid.innerHTML = '';
    scored.forEach(s => contactsGrid.insertAdjacentHTML('beforeend', buildCard(s, query)));

    aiAnswerBox.innerHTML = `🤖 <strong>AI Summary:</strong> ${getAiAnswer(query)}`;
    aiAnswerBox.classList.add('show');
  }, 900);
}

function buildCard(s, query) {
  const waMsg = `Hi, I found you on BazaarAI.\n\nMy requirement: ${query}\n\nPlease share pricing and availability.`;
  return `
  <div class="contact-card">
    <div class="cc-header">
      <div class="cc-avatar">${s.initials}</div>
      <div>
        <div class="cc-name">${s.name}</div>
        <div class="cc-location">📍 ${s.location}</div>
      </div>
      ${s.verified ? '<span class="cc-verified">✓ GST Verified</span>' : ''}
    </div>
    <div class="cc-body">
      <div class="cc-tags">${s.tags.map(t => `<span class="cc-tag">${t}</span>`).join('')}</div>
      <div class="cc-match">🤖 ${s.match}</div>
      <div class="cc-contacts">
        <a class="cc-phone" href="tel:${s.phone.replace(/\s/g,'')}">📞 ${s.phone}</a>
        <a class="cc-wa" href="https://wa.me/${s.wa}?text=${encodeURIComponent(waMsg)}" target="_blank" rel="noopener">💬 WhatsApp</a>
      </div>
    </div>
    <div class="cc-footer">
      <span class="cc-rating">⭐ ${s.rating} (${s.reviews} reviews)</span>
      <span>Responds ${s.response}</span>
    </div>
  </div>`;
}

/* ── SEARCH EVENTS ── */
document.getElementById('searchBtn')?.addEventListener('click', () => {
  const q = document.getElementById('queryInput').value.trim();
  if (q) search(q);
});

document.getElementById('queryInput')?.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const q = e.target.value.trim();
    if (q) search(q);
  }
});

document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    const q = chip.dataset.q;
    document.getElementById('queryInput').value = q;
    search(q);
  });
});

document.querySelectorAll('.cat-tile').forEach(tile => {
  tile.addEventListener('click', () => {
    const q = tile.dataset.q;
    document.getElementById('queryInput').value = q;
    search(q);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

document.getElementById('clearBtn')?.addEventListener('click', () => {
  document.getElementById('resultsWrap').style.display = 'none';
  document.getElementById('queryInput').value = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── SELLER PAGE ── */
let uploadedFiles = [];

document.getElementById('googleLoginBtn')?.addEventListener('click', function () {
  this.textContent = 'Signing in…';
  this.disabled = true;
  setTimeout(() => {
    document.getElementById('stepLogin').classList.add('hidden');
    const stepUpload = document.getElementById('stepUpload');
    stepUpload.classList.remove('hidden');
    document.getElementById('loggedInEmail').textContent = 'seller@gmail.com';
    stepUpload.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 1200);
});

document.getElementById('fileInput')?.addEventListener('change', function () {
  handleFiles(this.files);
});

function handleFiles(files) {
  [...files].forEach(f => {
    if (!uploadedFiles.find(u => u.name === f.name)) uploadedFiles.push(f);
  });
  renderFileList();
}
window.handleDrop = function (e) {
  e.preventDefault();
  document.getElementById('uploadZone').classList.remove('drag-over');
  handleFiles(e.dataTransfer.files);
};
function renderFileList() {
  const zone = document.getElementById('uploadZone');
  const idle = document.getElementById('uzIdle');
  const filesDiv = document.getElementById('uzFiles');
  const list = document.getElementById('uzFilesList');
  if (!uploadedFiles.length) { idle.classList.remove('hidden'); filesDiv.classList.add('hidden'); zone.classList.remove('has-files'); return; }
  idle.classList.add('hidden');
  filesDiv.classList.remove('hidden');
  zone.classList.add('has-files');
  list.innerHTML = uploadedFiles.map(f => {
    const ext = f.name.split('.').pop().toUpperCase();
    const icon = ext === 'PDF' ? '📄' : ['JPG','JPEG','PNG'].includes(ext) ? '🖼️' : ['XLS','XLSX'].includes(ext) ? '📊' : '📋';
    const size = f.size > 1024*1024 ? (f.size/1024/1024).toFixed(1)+' MB' : Math.round(f.size/1024)+' KB';
    return `<div class="uz-file-item"><span class="file-icon">${icon}</span><span>${f.name}</span><span class="file-size">${size}</span></div>`;
  }).join('');
}

document.getElementById('submitBtn')?.addEventListener('click', function () {
  const name = document.getElementById('bizName')?.value.trim();
  const wa = document.getElementById('waNumber')?.value.trim();
  const city = document.getElementById('bizCity')?.value.trim();
  const product = document.getElementById('bizProduct')?.value.trim();
  if (!name || !wa || !city || !product) { alert('Please fill in all required fields.'); return; }
  if (wa.length < 10) { alert('Enter a valid 10-digit WhatsApp number.'); return; }

  this.textContent = '⏳ Processing…';
  this.disabled = true;

  setTimeout(() => {
    document.getElementById('stepUpload').classList.add('hidden');
    const success = document.getElementById('stepSuccess');
    success.classList.remove('hidden');
    success.scrollIntoView({ behavior: 'smooth', block: 'start' });
    animateCount('ssProducts', 12);
    animateCount('ssKeywords', 48);
    document.getElementById('ssTime').textContent = '< 2 hrs';
  }, 2000);
});

function animateCount(id, target) {
  const el = document.getElementById(id);
  if (!el) return;
  let n = 0;
  const step = target / 40;
  const t = setInterval(() => {
    n = Math.min(n + step, target);
    el.textContent = Math.floor(n);
    if (n >= target) clearInterval(t);
  }, 30);
}

window.addMoreDocs = function () {
  document.getElementById('stepSuccess').classList.add('hidden');
  document.getElementById('stepUpload').classList.remove('hidden');
  document.getElementById('submitBtn').textContent = '🚀 Submit & Update Listing';
  document.getElementById('submitBtn').disabled = false;
};
