'use strict';

/* ══════════════════════════════════
   SUPPLIER DATA
══════════════════════════════════ */
const SUPPLIERS = [
  {
    initials: 'SW', name: 'Swastik Metal Components', location: 'Greater Noida, UP',
    tags: ['Nickel Plated Strips', 'Pure Nickel', 'Battery Connectors'],
    rating: 4.8, reviews: 142, response: '< 2 hrs', verified: true,
    phone: '+91 81126 62827', wa: '918112662827',
    detail: '<strong>25 T/month capacity</strong> · In-house plating plant · Zero tooling cost · 7-day custom lead time',
    keywords: ['nickel', 'strip', 'battery', 'plated', 'pure', 'connector', 'cell', 'pack', '18650', '21700']
  },
  {
    initials: 'AR', name: 'Arambhika Enablers', location: 'Greater Noida, UP',
    tags: ['Pure Nickel Strips', 'Copper Busbars', 'Aluminium Busbars'],
    rating: 4.9, reviews: 89, response: '< 1 hr', verified: true,
    phone: '+91 93074 80409', wa: '919307480409',
    detail: '<strong>99.6% purity nickel</strong> · Copper & aluminium busbars · Custom shapes · No tooling charge',
    keywords: ['nickel', 'copper', 'busbar', 'aluminium', 'battery', 'strip', 'custom', 'pure', 'connector']
  },
  {
    initials: 'PC', name: 'Pune Copper Works', location: 'Pune, Maharashtra',
    tags: ['Copper Sheets', 'Copper Busbars', 'Copper Rods'],
    rating: 4.7, reviews: 201, response: '< 3 hrs', verified: true,
    phone: '+91 98765 43210', wa: '919876543210',
    detail: '<strong>ETP Grade copper</strong> · 100% IACS conductivity · CNC cut · Custom profile available',
    keywords: ['copper', 'busbar', 'sheet', 'rod', 'etp', 'conductor', 'metal']
  },
  {
    initials: 'RM', name: 'Rajkot Metal Industries', location: 'Rajkot, Gujarat',
    tags: ['Steel Fasteners', 'Bolts & Nuts', 'Stainless Steel'],
    rating: 4.6, reviews: 312, response: '< 4 hrs', verified: true,
    phone: '+91 97654 32109', wa: '919765432109',
    detail: '<strong>ISO 9001 certified</strong> · Grade 4.6 to 12.9 · 10,000+ SKUs · Bulk pricing available',
    keywords: ['steel', 'fastener', 'bolt', 'nut', 'screw', 'stainless', 'metal', 'hardware', 'industrial']
  },
  {
    initials: 'MS', name: 'Mumbai Steel Suppliers', location: 'Mumbai, Maharashtra',
    tags: ['HR Coils', 'CR Strips', 'Steel Sheets'],
    rating: 4.5, reviews: 445, response: '< 5 hrs', verified: true,
    phone: '+91 96543 21098', wa: '919654321098',
    detail: '<strong>HR/CR coils & sheets</strong> · 48-hour delivery in Mumbai · Bulk MOQ · Multiple grades',
    keywords: ['steel', 'coil', 'sheet', 'hr', 'cr', 'metal', 'iron', 'raw', 'material', 'mild']
  },
  {
    initials: 'GP', name: 'Gujarat Polymer Pack', location: 'Surat, Gujarat',
    tags: ['HDPE Bags', 'PP Woven Bags', 'Industrial Packaging'],
    rating: 4.4, reviews: 178, response: '< 6 hrs', verified: true,
    phone: '+91 95432 10987', wa: '919543210987',
    detail: '<strong>Custom print & sizes</strong> · Food-grade options · Low MOQ · HDPE, PP, BOPP available',
    keywords: ['hdpe', 'packaging', 'bag', 'pp', 'woven', 'pack', 'plastic', 'polythene', 'polymer', 'sack', 'pouch']
  },
  {
    initials: 'DI', name: 'Delhi Industrial Electronics', location: 'Delhi NCR',
    tags: ['PCB Components', 'Industrial Sensors', 'Relays'],
    rating: 4.6, reviews: 93, response: '< 2 hrs', verified: true,
    phone: '+91 94321 09876', wa: '919432109876',
    detail: '<strong>RoHS certified</strong> · Import substitution · Low MOQ · Same-day dispatch Delhi',
    keywords: ['pcb', 'sensor', 'relay', 'electronic', 'component', 'industrial', 'circuit', 'board', 'electrical']
  },
  {
    initials: 'BT', name: 'Bangalore Tech Metals', location: 'Bangalore, Karnataka',
    tags: ['Aluminium Profiles', 'Extrusions', 'Alloy Sheets'],
    rating: 4.7, reviews: 156, response: '< 3 hrs', verified: true,
    phone: '+91 93210 98765', wa: '919321098765',
    detail: '<strong>6061 / 7075 alloy</strong> · CNC machining · Anodised finish · Solar & EV applications',
    keywords: ['aluminium', 'aluminum', 'profile', 'extrusion', 'sheet', 'alloy', 'anodised', 'solar', 'lightweight', 'busbar']
  },
  {
    initials: 'JT', name: 'Jaipur Textile Mills', location: 'Jaipur, Rajasthan',
    tags: ['Cotton Fabric', 'Polyester Blend', 'Industrial Cloth'],
    rating: 4.3, reviews: 267, response: '< 8 hrs', verified: true,
    phone: '+91 92109 87654', wa: '919210987654',
    detail: '<strong>GSM 120–400</strong> · Custom dyeing & weaving · Bulk wholesale · Export quality',
    keywords: ['textile', 'fabric', 'cotton', 'polyester', 'cloth', 'yarn', 'weave', 'thread', 'garment']
  },
  {
    initials: 'CA', name: 'Chennai Auto Parts Hub', location: 'Chennai, Tamil Nadu',
    tags: ['Engine Parts', 'Gaskets', 'Auto Fasteners'],
    rating: 4.8, reviews: 389, response: '< 2 hrs', verified: true,
    phone: '+91 91098 76543', wa: '919109876543',
    detail: '<strong>OEM quality</strong> · 10,000+ SKUs · Same-day dispatch · All major brands covered',
    keywords: ['auto', 'automobile', 'car', 'engine', 'gasket', 'spare', 'part', 'vehicle', 'fastener', 'motor']
  },
];

/* ══════════════════════════════════
   AI RESPONSE GENERATOR
══════════════════════════════════ */
function scoreSupplier(s, words) {
  let score = 0;
  words.forEach(w => {
    if (s.keywords.some(k => k.includes(w) || w.includes(k))) score += 3;
    if (s.name.toLowerCase().includes(w)) score += 2;
    if (s.tags.some(t => t.toLowerCase().includes(w))) score += 2;
    if (s.location.toLowerCase().includes(w)) score += 1;
  });
  return score;
}

function buildAIResponse(query) {
  const q = query.toLowerCase();
  const words = q.split(/\s+/).filter(w => w.length > 2);

  const scored = SUPPLIERS
    .map(s => ({ ...s, score: scoreSupplier(s, words) }))
    .sort((a, b) => b.score - a.score || b.rating - a.rating);

  const top = scored.slice(0, 3);

  // Natural language intro
  let intro = '';
  if (q.includes('nickel') || q.includes('strip')) {
    intro = `Sure! I found <strong>${top.length} verified nickel strip manufacturers</strong> in India that match your requirement. Both Greater Noida suppliers have in-house plating plants, zero tooling cost, and can deliver within 7 days. Here are their details:`;
  } else if (q.includes('copper') || q.includes('busbar')) {
    intro = `Great question! Here are <strong>${top.length} top-rated copper busbar manufacturers</strong> in India. They offer ETP-grade copper, custom shapes, and quick lead times. You can WhatsApp them directly with your dimensions:`;
  } else if (q.includes('hdpe') || q.includes('packag') || q.includes('bag')) {
    intro = `Found <strong>${top.length} verified industrial packaging suppliers</strong> for you. They offer custom print, food-grade options, and low MOQ. Contact them directly:`;
  } else if (q.includes('steel') || q.includes('fastener') || q.includes('bolt')) {
    intro = `Here are <strong>${top.length} ISO-certified steel & fastener suppliers</strong> with bulk pricing. They cover grades 4.6 to 12.9 and have pan-India delivery:`;
  } else if (q.includes('alumin')) {
    intro = `I found <strong>${top.length} aluminium profile & extrusion manufacturers</strong> that match your need. They work with 6061/7075 alloy and can do custom CNC shapes:`;
  } else if (q.includes('textile') || q.includes('fabric')) {
    intro = `Here are <strong>${top.length} textile manufacturers</strong> offering bulk wholesale pricing with custom dyeing options:`;
  } else if (q.includes('electronic') || q.includes('pcb') || q.includes('sensor')) {
    intro = `Found <strong>${top.length} industrial electronics suppliers</strong> with RoHS certification and low MOQ options:`;
  } else {
    intro = `I searched our network of <strong>50,000+ verified Indian suppliers</strong> and found <strong>${top.length} great matches</strong> for your requirement. Here are the top results with direct contact details:`;
  }

  // Closing line
  const closing = `\n\nYou can call or WhatsApp any of them directly — your query will be pre-filled in WhatsApp so they know exactly what you need. Let me know if you want to refine the search by location, quantity, or budget! 🙌`;

  return { intro, suppliers: top, closing };
}

/* ══════════════════════════════════
   CHAT ENGINE
══════════════════════════════════ */
const messagesArea  = document.getElementById('messagesArea');
const chatMessages  = document.getElementById('chatMessages');
const welcomeScreen = document.getElementById('welcomeScreen');
const userInput     = document.getElementById('userInput');
const sendBtn       = document.getElementById('sendBtn');

function appendMessage(role, html) {
  const row = document.createElement('div');
  row.className = `msg-row ${role}`;

  const avatar = document.createElement('div');
  avatar.className = 'msg-avatar';
  avatar.textContent = role === 'user' ? '👤' : '🏪';

  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';
  bubble.innerHTML = html;

  row.appendChild(avatar);
  row.appendChild(bubble);
  chatMessages.appendChild(row);
  scrollBottom();
  return bubble;
}

function showTyping() {
  const row = document.createElement('div');
  row.className = 'msg-row ai';
  row.id = 'typingRow';

  const avatar = document.createElement('div');
  avatar.className = 'msg-avatar';
  avatar.textContent = '🏪';

  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';
  bubble.innerHTML = '<div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>';

  row.appendChild(avatar);
  row.appendChild(bubble);
  chatMessages.appendChild(row);
  scrollBottom();
}

function removeTyping() {
  document.getElementById('typingRow')?.remove();
}

function buildSupplierCard(s, query) {
  const waText = encodeURIComponent(`Hi! I found you on BazaarAI.\n\nMy requirement: ${query}\n\nPlease share pricing and availability.`);
  return `
    <div class="sup-card">
      <div class="sup-card-header">
        <div class="sup-avatar">${s.initials}</div>
        <div>
          <div class="sup-name">${s.name}</div>
          <div class="sup-loc">📍 ${s.location}</div>
        </div>
        ${s.verified ? '<span class="sup-verified">✓ GST Verified</span>' : ''}
      </div>
      <div class="sup-card-body">
        <div class="sup-tags">${s.tags.map(t => `<span class="sup-tag">${t}</span>`).join('')}</div>
        <div class="sup-detail">${s.detail}</div>
        <div class="sup-actions">
          <a class="sup-phone" href="tel:${s.phone.replace(/\s/g, '')}">📞 ${s.phone}</a>
          <a class="sup-wa" href="https://wa.me/${s.wa}?text=${waText}" target="_blank" rel="noopener">💬 WhatsApp</a>
        </div>
      </div>
      <div class="sup-footer">
        <span class="sup-rating">⭐ ${s.rating} (${s.reviews} reviews)</span>
        <span>Responds ${s.response}</span>
      </div>
    </div>`;
}

async function handleQuery(query) {
  if (!query.trim()) return;

  // Hide welcome, show chat
  if (welcomeScreen) welcomeScreen.style.display = 'none';

  // User message
  appendMessage('user', query);
  userInput.value = '';
  userInput.style.height = 'auto';
  sendBtn.disabled = true;

  // Typing
  showTyping();
  await delay(500 + Math.random() * 600);
  removeTyping();

  // Build response
  const { intro, suppliers, closing } = buildAIResponse(query);

  // Supplier cards HTML
  const cardsHtml = `<div class="suppliers-inline">${suppliers.map(s => buildSupplierCard(s, query)).join('')}</div>`;

  // Stream the text in chunks
  const bubble = appendMessage('ai', '');
  await typeText(bubble, intro);
  bubble.insertAdjacentHTML('beforeend', cardsHtml);
  await typeText(bubble, closing);

  scrollBottom();
  sendBtn.disabled = false;
  userInput.focus();
}

async function typeText(bubble, text, speed = 12) {
  // Replace HTML tags — stream char by char for plain parts only
  const p = document.createElement('p');
  bubble.appendChild(p);
  // Fast-set HTML (no char-by-char on HTML tags — too risky)
  p.innerHTML = text;
  await delay(text.length * speed * 0.5); // simulate delay proportional to length
}

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }
function scrollBottom() {
  if (messagesArea) messagesArea.scrollTop = messagesArea.scrollHeight;
}

/* ══════════════════════════════════
   INPUT HANDLING
══════════════════════════════════ */
userInput?.addEventListener('input', function () {
  sendBtn.disabled = !this.value.trim();
  this.style.height = 'auto';
  this.style.height = Math.min(this.scrollHeight, 160) + 'px';
});

userInput?.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    if (userInput.value.trim()) handleQuery(userInput.value.trim());
  }
});

sendBtn?.addEventListener('click', () => {
  if (userInput.value.trim()) handleQuery(userInput.value.trim());
});

// Welcome example cards
document.querySelectorAll('.example-card').forEach(card => {
  card.addEventListener('click', () => handleQuery(card.dataset.q));
});

// Sidebar suggestions
document.querySelectorAll('.history-item').forEach(item => {
  item.addEventListener('click', () => handleQuery(item.dataset.q));
});

// New chat
document.getElementById('newChatBtn')?.addEventListener('click', () => {
  chatMessages.innerHTML = '';
  if (welcomeScreen) welcomeScreen.style.display = '';
  userInput.value = '';
  userInput.style.height = 'auto';
  sendBtn.disabled = true;
});

// Mobile sidebar
document.getElementById('menuBtn')?.addEventListener('click', () => {
  document.getElementById('sidebar')?.classList.toggle('open');
});

/* ══════════════════════════════════
   SELLER PAGE
══════════════════════════════════ */
let uploadedFiles = [];

document.getElementById('googleLoginBtn')?.addEventListener('click', function () {
  this.textContent = '⏳ Signing in…';
  this.disabled = true;
  setTimeout(() => {
    document.getElementById('stepLogin').classList.add('hidden');
    const up = document.getElementById('stepUpload');
    up.classList.remove('hidden');
    document.getElementById('loggedEmail').textContent = 'seller@gmail.com';
    up.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 1200);
});

document.getElementById('fileInput')?.addEventListener('change', function () {
  addFiles(this.files);
});

window.handleDrop = function (e) {
  e.preventDefault();
  document.getElementById('uploadZone')?.classList.remove('drag-over');
  addFiles(e.dataTransfer.files);
};

function addFiles(files) {
  [...files].forEach(f => { if (!uploadedFiles.find(u => u.name === f.name)) uploadedFiles.push(f); });
  renderFiles();
}

function renderFiles() {
  const zone = document.getElementById('uploadZone');
  const idle = document.getElementById('uzIdle');
  const filled = document.getElementById('uzFilled');
  const list = document.getElementById('fileList');
  if (!uploadedFiles.length) {
    idle?.classList.remove('hidden');
    filled?.classList.add('hidden');
    zone?.classList.remove('filled');
    return;
  }
  idle?.classList.add('hidden');
  filled?.classList.remove('hidden');
  zone?.classList.add('filled');
  const icons = { pdf: '📄', jpg: '🖼️', jpeg: '🖼️', png: '🖼️', xls: '📊', xlsx: '📊', doc: '📋', docx: '📋', ppt: '📊', pptx: '📊' };
  list.innerHTML = uploadedFiles.map(f => {
    const ext = f.name.split('.').pop().toLowerCase();
    const icon = icons[ext] || '📁';
    const sz = f.size > 1048576 ? (f.size / 1048576).toFixed(1) + ' MB' : Math.round(f.size / 1024) + ' KB';
    return `<div class="file-row"><span>${icon}</span><span>${f.name}</span><span class="fsz">${sz}</span></div>`;
  }).join('');
}

document.getElementById('submitBtn')?.addEventListener('click', function () {
  const name = document.getElementById('bizName')?.value.trim();
  const wa   = document.getElementById('waNumber')?.value.trim();
  const city = document.getElementById('bizCity')?.value.trim();
  const prod = document.getElementById('bizProduct')?.value.trim();
  if (!name || !wa || !city || !prod) { alert('Please fill in all required fields.'); return; }
  if (wa.length < 10) { alert('Enter a valid 10-digit WhatsApp number.'); return; }
  this.textContent = '⏳ Processing with AI…';
  this.disabled = true;
  setTimeout(() => {
    document.getElementById('stepUpload').classList.add('hidden');
    const suc = document.getElementById('stepSuccess');
    suc.classList.remove('hidden');
    suc.scrollIntoView({ behavior: 'smooth', block: 'start' });
    animCount('ssProducts', 12);
    animCount('ssKeywords', 48);
    document.getElementById('ssTime').textContent = '< 2 hrs';
  }, 2000);
});

function animCount(id, target) {
  const el = document.getElementById(id);
  if (!el) return;
  let n = 0, step = target / 40;
  const t = setInterval(() => { n = Math.min(n + step, target); el.textContent = Math.floor(n); if (n >= target) clearInterval(t); }, 30);
}

window.addMoreDocs = function () {
  document.getElementById('stepSuccess').classList.add('hidden');
  const up = document.getElementById('stepUpload');
  up.classList.remove('hidden');
  document.getElementById('submitBtn').textContent = '🚀 Submit & Update';
  document.getElementById('submitBtn').disabled = false;
};
