'use strict';

/* ═══════════════════════════════════════════
   MOCK DATA — Suppliers
═══════════════════════════════════════════ */
const SUPPLIERS = [
  { id:1, initials:'SW', name:'Swastik Metal Components', location:'Greater Noida, UP', tags:['Nickel Strips','Copper Busbars','Battery Connectors'], rating:4.8, reviews:142, response:'< 2 hrs', verified:true, wa:'918112662827', match:'Nickel plating · Custom dimensions · 25T/month capacity', category:'battery' },
  { id:2, initials:'AR', name:'Arambhika Enablers', location:'Greater Noida, UP', tags:['Pure Nickel','Aluminium Busbars','Custom Connectors'], rating:4.9, reviews:89, response:'< 1 hr', verified:true, wa:'919307480409', match:'Pure nickel 99.6%+ · Zero tooling cost · 7-day lead time', category:'battery' },
  { id:3, initials:'RM', name:'Rajkot Metal Industries', location:'Rajkot, Gujarat', tags:['Steel Fasteners','Bolts','Nuts'], rating:4.6, reviews:312, response:'< 4 hrs', verified:true, wa:'919876543210', match:'Bulk fasteners · ISO certified · Pan-India delivery', category:'metals' },
  { id:4, initials:'PK', name:'Pune Copper Works', location:'Pune, Maharashtra', tags:['Copper Sheets','Copper Rods','Busbars'], rating:4.7, reviews:201, response:'< 3 hrs', verified:true, wa:'919765432109', match:'ETP Copper · IACS 100% · Custom shapes', category:'metals' },
  { id:5, initials:'MS', name:'Mumbai Steel Suppliers', location:'Mumbai, Maharashtra', tags:['Steel Sheets','HR Coils','CR Strips'], rating:4.5, reviews:445, response:'< 5 hrs', verified:true, wa:'919654321098', match:'HR/CR steel · Bulk orders · 48hr delivery Mumbai', category:'metals' },
  { id:6, initials:'GP', name:'Gujarat Polymer Pack', location:'Surat, Gujarat', tags:['HDPE Bags','PP Bags','Industrial Packaging'], rating:4.4, reviews:178, response:'< 6 hrs', verified:true, wa:'919543210987', match:'Custom print · Food-grade · Low MOQ available', category:'packaging' },
  { id:7, initials:'DI', name:'Delhi Industrial Electronics', location:'Delhi NCR', tags:['PCB Components','Sensors','Relays'], rating:4.6, reviews:93, response:'< 2 hrs', verified:true, wa:'919432109876', match:'Industrial grade · RoHS · Import substitution', category:'electronics' },
  { id:8, initials:'BT', name:'Bangalore Tech Metals', location:'Bangalore, Karnataka', tags:['Aluminium Sheets','Aluminium Profiles','Extrusions'], rating:4.7, reviews:156, response:'< 3 hrs', verified:true, wa:'919321098765', match:'6061/7075 alloy · CNC cut · Anodised finish', category:'metals' },
  { id:9, initials:'JT', name:'Jaipur Textile Mills', location:'Jaipur, Rajasthan', tags:['Cotton Fabric','Polyester Blend','Industrial Cloth'], rating:4.3, reviews:267, response:'< 8 hrs', verified:true, wa:'919210987654', match:'GSM 120-400 · Custom dyeing · Bulk wholesale', category:'textiles' },
  { id:10, initials:'CH', name:'Chennai Auto Parts Hub', location:'Chennai, Tamil Nadu', tags:['Engine Parts','Gaskets','Auto Fasteners'], rating:4.8, reviews:389, response:'< 2 hrs', verified:true, wa:'919109876543', match:'OEM quality · 10,000+ SKUs · Same-day dispatch', category:'auto' },
];

const AI_RESPONSES = {
  default: (q) => ({
    summary: `Found <strong>${SUPPLIERS.length} verified suppliers</strong> matching your query for <em>"${q}"</em>. Results ranked by relevance, rating, and response time.`,
    bullets: ['Suppliers verified with GST & business documents','Sorted by AI relevance score + buyer ratings','Click WhatsApp to connect instantly — your query is pre-filled'],
  }),
  nickel: {
    summary: `Found <strong>2 top-rated manufacturers</strong> for nickel strips in India. Both are Greater Noida-based with in-house plating and fast lead times.`,
    bullets: ['Swastik Metal Components — 25T/month, zero tooling cost','Arambhika Enablers — Pure nickel 99.6%, <7 day custom','Both supply to India\'s top battery OEMs'],
  },
  copper: {
    summary: `Found <strong>3 verified copper busbar manufacturers</strong>. Filtered for ETP-grade copper with custom shaping capability.`,
    bullets: ['Arambhika Enablers — Integrated plating, custom shapes','Pune Copper Works — 100% IACS, ISO certified','Bangalore Tech Metals — Aluminium alternative also available'],
  },
  steel: {
    summary: `Found <strong>4 steel & fastener suppliers</strong> across India. Bulk pricing available from all.`,
    bullets: ['Rajkot Metal Industries — ISO certified fasteners','Mumbai Steel Suppliers — HR/CR coils, 48hr Mumbai delivery','Pan-India logistics support from all 4 suppliers'],
  },
  packaging: {
    summary: `Found <strong>2 industrial packaging suppliers</strong> with custom print capability and low MOQ options.`,
    bullets: ['Gujarat Polymer Pack — HDPE/PP, food-grade available','Custom dimensions and print available within 5 days','GST invoice + E-way bill on all orders'],
  },
};

/* ═══════════════════════════════════════════
   SEARCH ENGINE
═══════════════════════════════════════════ */
function detectIntent(query) {
  const q = query.toLowerCase();
  if (q.includes('nickel') || q.includes('battery') || q.includes('busbar') && q.includes('nickel')) return 'nickel';
  if (q.includes('copper') || q.includes('busbar')) return 'copper';
  if (q.includes('steel') || q.includes('fastener') || q.includes('bolt')) return 'steel';
  if (q.includes('packag') || q.includes('hdpe') || q.includes('bag')) return 'packaging';
  return 'default';
}

function filterSuppliers(query) {
  const q = query.toLowerCase();
  const intent = detectIntent(query);
  let results = [...SUPPLIERS];
  if (intent === 'nickel' || intent === 'copper') results = results.filter(s => s.category === 'battery' || s.category === 'metals');
  else if (intent === 'steel') results = results.filter(s => s.category === 'metals');
  else if (intent === 'packaging') results = results.filter(s => s.category === 'packaging');
  // Sort: verified first, then rating
  results.sort((a,b) => b.rating - a.rating);
  return results;
}

/* ═══════════════════════════════════════════
   TYPEWRITER PLACEHOLDER
═══════════════════════════════════════════ */
const PLACEHOLDERS = [
  'nickel strips for 18650 battery packs, 0.15mm thick',
  'copper busbar manufacturer Delhi NCR, custom shape',
  'HDPE packaging bags bulk order Mumbai',
  'steel fasteners supplier 10.9 grade, 500 kg',
  'aluminium busbar for solar inverter 1000 pcs',
  'industrial PCB relay components, RoHS certified',
];
let phIdx = 0, phChar = 0, phDeleting = false, phTimer;
function typewriterTick() {
  const el = document.getElementById('searchTypewriter');
  const input = document.getElementById('searchInput');
  if (!el || document.activeElement === input || input.value) return;
  const current = PLACEHOLDERS[phIdx];
  if (!phDeleting) {
    phChar++;
    el.textContent = current.slice(0, phChar);
    if (phChar === current.length) { phDeleting = true; phTimer = setTimeout(typewriterTick, 2000); return; }
  } else {
    phChar--;
    el.textContent = current.slice(0, phChar);
    if (phChar === 0) { phDeleting = false; phIdx = (phIdx + 1) % PLACEHOLDERS.length; }
  }
  phTimer = setTimeout(typewriterTick, phDeleting ? 40 : 65);
}
setTimeout(typewriterTick, 800);

/* ═══════════════════════════════════════════
   AI CHAT
═══════════════════════════════════════════ */
function appendAiMessage(html, type = 'bot') {
  const msgs = document.getElementById('aiMessages');
  if (!msgs) return;
  const div = document.createElement('div');
  div.className = `ai-msg ${type}`;
  div.innerHTML = html;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function showTypingDots() {
  const msgs = document.getElementById('aiMessages');
  if (!msgs) return null;
  const div = document.createElement('div');
  div.className = 'ai-msg bot';
  div.id = 'typingDots';
  div.innerHTML = '<span class="typing-dots"><span></span><span></span><span></span></span>';
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  return div;
}

function removeTypingDots() {
  document.getElementById('typingDots')?.remove();
}

function buildSupplierCard(s) {
  return `
  <div class="supplier-card">
    <div class="sc-avatar">${s.initials}</div>
    <div class="sc-body">
      <div class="sc-top">
        <span class="sc-name">${s.name}</span>
        ${s.verified ? '<span class="sc-verified">✓ Verified</span>' : ''}
        <span class="sc-rating">⭐ ${s.rating} (${s.reviews})</span>
      </div>
      <p class="sc-location">📍 ${s.location}</p>
      <div class="sc-tags">${s.tags.map(t=>`<span class="sc-tag">${t}</span>`).join('')}</div>
      <p class="sc-match">🤖 AI match: <span>${s.match}</span></p>
      <div class="sc-meta"><span>⚡ Response: ${s.response}</span></div>
    </div>
    <div class="sc-actions">
      <a class="btn btn-wa" href="https://wa.me/${s.wa}?text=${encodeURIComponent('Hi, I found you on BazaarAI and need a quote for: ')}" target="_blank" rel="noopener">WhatsApp</a>
      <p class="sc-response">Typically replies ${s.response}</p>
    </div>
  </div>`;
}

async function runSearch(query) {
  if (!query.trim()) return;
  const searchInput = document.getElementById('searchInput');
  const resultsSection = document.getElementById('resultsSection');
  const aiMessages = document.getElementById('aiMessages');
  const aiStatus = document.getElementById('aiStatus');
  const resultsCount = document.getElementById('resultsCount');
  const supplierGrid = document.getElementById('supplierGrid');
  if (!resultsSection) return;

  // Show results section
  resultsSection.classList.remove('hidden');
  resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Clear previous
  aiMessages.innerHTML = '';
  supplierGrid.innerHTML = '';

  // User message
  appendAiMessage(query, 'user');
  aiStatus.textContent = 'Searching suppliers…';

  // Typing dots
  showTypingDots();

  await delay(600);
  supplierGrid.innerHTML = '<div style="padding:2rem;text-align:center;color:#94a3b8">Searching verified suppliers…</div>';

  await delay(900);
  removeTypingDots();

  const intent = detectIntent(query);
  const resp = AI_RESPONSES[intent] || AI_RESPONSES.default(query);
  const summary = typeof resp === 'function' ? resp(query) : resp;
  const bulletHtml = summary.bullets ? `<ul>${summary.bullets.map(b=>`<li>${b}</li>`).join('')}</ul>` : '';
  appendAiMessage(`${summary.summary}${bulletHtml}`);
  aiStatus.textContent = 'Results ready';

  const results = filterSuppliers(query);
  resultsCount.textContent = `${results.length} verified suppliers found for "${query}"`;
  supplierGrid.innerHTML = results.map(buildSupplierCard).join('');

  // Update WhatsApp links with actual query
  supplierGrid.querySelectorAll('.btn-wa').forEach(btn => {
    const base = btn.href.split('?text=')[0];
    btn.href = base + '?text=' + encodeURIComponent(`Hi, I found you on BazaarAI.\n\nMy requirement: ${query}\n\nPlease share pricing and availability.`);
  });
}

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

/* ═══════════════════════════════════════════
   SEARCH EVENTS
═══════════════════════════════════════════ */
document.getElementById('searchBtn')?.addEventListener('click', () => {
  const q = document.getElementById('searchInput')?.value.trim();
  if (q) runSearch(q);
});
document.getElementById('searchInput')?.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const q = e.target.value.trim();
    if (q) runSearch(q);
  }
  // Hide typewriter when typing
  document.getElementById('searchTypewriter').style.opacity = e.target.value ? '0' : '1';
});
document.querySelectorAll('.sugg-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    const q = chip.dataset.query;
    document.getElementById('searchInput').value = q;
    document.getElementById('searchTypewriter').style.opacity = '0';
    runSearch(q);
  });
});
document.querySelectorAll('.cat-card').forEach(card => {
  card.addEventListener('click', () => {
    const q = card.dataset.query;
    document.getElementById('searchInput').value = q;
    document.getElementById('searchTypewriter').style.opacity = '0';
    runSearch(q);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// AI follow-up
document.getElementById('aiFolowupBtn')?.addEventListener('click', () => {
  const q = document.getElementById('aiFollowup')?.value.trim();
  if (q) { runSearch(q); document.getElementById('aiFollowup').value = ''; }
});
document.getElementById('aiFollowup')?.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const q = e.target.value.trim();
    if (q) { runSearch(q); e.target.value = ''; }
  }
});

// Load more (just re-renders same results shuffled)
document.getElementById('loadMore')?.addEventListener('click', function() {
  const q = document.getElementById('searchInput')?.value || 'suppliers';
  const extra = [...SUPPLIERS].sort(() => Math.random() - 0.5).slice(0, 3);
  const grid = document.getElementById('supplierGrid');
  if (grid) extra.forEach(s => grid.insertAdjacentHTML('beforeend', buildSupplierCard(s)));
  this.textContent = 'All results shown';
  this.disabled = true;
});

/* ═══════════════════════════════════════════
   HOW IT WORKS TABS
═══════════════════════════════════════════ */
document.querySelectorAll('.hiw-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.hiw-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const role = tab.dataset.role;
    document.getElementById('hiwBuyer')?.classList.toggle('hidden', role !== 'buyer');
    document.getElementById('hiwSeller')?.classList.toggle('hidden', role !== 'seller');
  });
});

/* ═══════════════════════════════════════════
   AUTH MODAL
═══════════════════════════════════════════ */
function openModal(tab = 'buyer') {
  const modal = document.getElementById('authModal');
  if (!modal) return;
  modal.classList.add('open');
  switchModalTab(tab);
}
function closeModal() {
  document.getElementById('authModal')?.classList.remove('open');
}
document.getElementById('loginBtn')?.addEventListener('click', () => openModal('buyer'));
document.getElementById('ctaBuyerBtn')?.addEventListener('click', () => openModal('buyer'));
document.getElementById('modalClose')?.addEventListener('click', closeModal);
document.getElementById('authModal')?.addEventListener('click', e => { if (e.target.id === 'authModal') closeModal(); });
document.querySelectorAll('.modal-tab').forEach(tab => {
  tab.addEventListener('click', () => switchModalTab(tab.dataset.tab));
});
function switchModalTab(tab) {
  document.querySelectorAll('.modal-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  document.getElementById('tabBuyer')?.classList.toggle('hidden', tab !== 'buyer');
  document.getElementById('tabSeller')?.classList.toggle('hidden', tab !== 'seller');
}

// OTP flow
document.getElementById('sendOtp')?.addEventListener('click', () => {
  const mobile = document.getElementById('mobileInput')?.value.trim();
  if (!mobile || mobile.length < 10) { alert('Enter a valid 10-digit mobile number.'); return; }
  document.getElementById('mobileDisplay').textContent = mobile;
  document.getElementById('otpStep1')?.classList.add('hidden');
  document.getElementById('otpStep2')?.classList.remove('hidden');
  focusOtpBox(0);
  // Auto-fill demo OTP after 1s
  setTimeout(() => {
    const boxes = document.querySelectorAll('.otp-box');
    ['1','2','3','4','5','6'].forEach((d,i) => { if(boxes[i]) boxes[i].value = d; });
  }, 1000);
});
document.getElementById('verifyOtp')?.addEventListener('click', () => {
  const boxes = [...document.querySelectorAll('.otp-box')];
  const otp = boxes.map(b => b.value).join('');
  if (otp.length < 6) { alert('Enter the 6-digit OTP.'); return; }
  closeModal();
  showLoginSuccess();
});
document.getElementById('resendOtp')?.addEventListener('click', e => {
  e.preventDefault();
  document.querySelectorAll('.otp-box').forEach(b => b.value = '');
  focusOtpBox(0);
  setTimeout(() => {
    const boxes = document.querySelectorAll('.otp-box');
    ['1','2','3','4','5','6'].forEach((d,i) => { if(boxes[i]) boxes[i].value = d; });
  }, 1000);
});
function focusOtpBox(i) {
  const boxes = document.querySelectorAll('.otp-box');
  if (boxes[i]) boxes[i].focus();
}
document.querySelectorAll('.otp-box').forEach((box, i, all) => {
  box.addEventListener('input', () => { if (box.value && i < all.length - 1) all[i+1].focus(); });
  box.addEventListener('keydown', e => { if (e.key === 'Backspace' && !box.value && i > 0) all[i-1].focus(); });
});

// Google sign-in (demo)
document.getElementById('googleSignIn')?.addEventListener('click', () => { closeModal(); showLoginSuccess(); });
document.getElementById('googleSignInSeller')?.addEventListener('click', () => { closeModal(); window.location.href = 'seller.html'; });

function showLoginSuccess() {
  const btn = document.getElementById('loginBtn');
  if (btn) { btn.textContent = '👤 Signed In'; btn.style.color = '#22c55e'; }
}

/* ═══════════════════════════════════════════
   MOCKUP DEMO ANIMATION
═══════════════════════════════════════════ */
function startMockupDemo() {
  const typing = document.getElementById('mockupTyping');
  const chat = document.getElementById('mockupChat');
  if (!typing || !chat) return;
  setTimeout(() => {
    typing.remove();
    const msg = document.createElement('div');
    msg.className = 'mockup-msg ai';
    msg.innerHTML = `Found <strong>2 verified suppliers</strong> in Delhi NCR for pure nickel strips 0.15mm × 8mm:<br><br>
    ✅ <strong>Swastik Metal Components</strong> — Greater Noida, 99.6% purity, 25T/month<br>
    ✅ <strong>Arambhika Enablers</strong> — Greater Noida, custom dimensions, zero tooling cost<br><br>
    Both can deliver 100kg within 3–5 days. Want to compare pricing?`;
    chat.appendChild(msg);
    // Second round
    setTimeout(() => {
      const userMsg = document.createElement('div');
      userMsg.className = 'mockup-msg user';
      userMsg.textContent = 'Yes, show me pricing for Swastik';
      chat.appendChild(userMsg);
      const dots2 = document.createElement('div');
      dots2.className = 'mockup-msg ai typing';
      dots2.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
      chat.appendChild(dots2);
      setTimeout(() => {
        dots2.remove();
        const aiMsg2 = document.createElement('div');
        aiMsg2.className = 'mockup-msg ai';
        aiMsg2.innerHTML = `<strong>Swastik Metal Components</strong><br>Pure Nickel Strip 0.15mm × 8mm:<br>• 100–500 kg: ₹1,850/kg<br>• 500+ kg: ₹1,720/kg<br><br>Click below to send your requirement on WhatsApp 👇`;
        chat.appendChild(aiMsg2);
        const waBtn = document.createElement('a');
        waBtn.className = 'btn btn-wa';
        waBtn.href = 'https://wa.me/918112662827?text=' + encodeURIComponent('Hi, I found you on BazaarAI. Need quote for Pure Nickel Strip 0.15mm × 8mm, 100kg, Delhi delivery.');
        waBtn.target = '_blank';
        waBtn.rel = 'noopener';
        waBtn.style.marginTop = '.5rem';
        waBtn.style.display = 'inline-flex';
        waBtn.textContent = '💬 Chat on WhatsApp';
        chat.appendChild(waBtn);
      }, 1500);
    }, 2500);
  }, 2000);
}
// Start mockup when visible
const mockupObs = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) { startMockupDemo(); mockupObs.disconnect(); }
}, { threshold: 0.4 });
const mockupEl = document.getElementById('mockupChat');
if (mockupEl) mockupObs.observe(mockupEl);

/* ═══════════════════════════════════════════
   SELLER PAGE — ONBOARDING
═══════════════════════════════════════════ */
document.getElementById('startOnboarding')?.addEventListener('click', showWizard);
document.getElementById('sellerLoginBtn')?.addEventListener('click', () => {
  if (document.getElementById('sellerDashboard')?.classList.contains('hidden')) showWizard();
  else showDashboard();
});

function showWizard() {
  document.getElementById('sellerHero')?.classList.add('hidden');
  document.getElementById('onboardingWizard')?.classList.remove('hidden');
  document.getElementById('sellerDashboard')?.classList.add('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goStep(n) {
  document.querySelectorAll('.wizard-step').forEach((s,i) => s.classList.toggle('hidden', i !== n-1));
  document.querySelectorAll('.wp-step').forEach((s,i) => {
    s.classList.toggle('active', i === n-1);
    s.classList.toggle('done', i < n-1);
  });
  document.querySelectorAll('.wp-line').forEach((l,i) => l.classList.toggle('done', i < n-1));
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (n === 4) startAiProcessing();
}
window.goStep = goStep;

// Add product entries
let productCount = 1;
document.getElementById('addProductBtn')?.addEventListener('click', () => {
  if (productCount >= 5) return;
  const builder = document.getElementById('productsBuilder');
  const entry = document.createElement('div');
  entry.className = 'product-entry';
  entry.id = `productEntry${productCount}`;
  const idx = productCount;
  entry.innerHTML = `
    <div class="pe-header"><span class="pe-num">Product ${productCount+1}</span><button class="pe-remove" onclick="removeProduct(${idx})">✕</button></div>
    <div class="form-row">
      <label>Product Name *<input type="text" placeholder="e.g. Copper Busbars" /></label>
      <label>Category *<select><option>Battery Components</option><option>Metals & Alloys</option><option>Electronics</option><option>Machinery</option><option>Packaging</option><option>Other</option></select></label>
    </div>
    <label>Description<textarea rows="2" placeholder="Key specs, grades, sizes, applications…"></textarea></label>
    <div class="form-row">
      <label>Min. Order Qty<input type="text" placeholder="e.g. 50 kg" /></label>
      <label>Price Range<input type="text" placeholder="e.g. ₹300–₹450/kg" /></label>
    </div>`;
  builder.appendChild(entry);
  productCount++;
  if (productCount >= 5) document.getElementById('addProductBtn').style.display = 'none';
});
window.removeProduct = function(idx) {
  document.getElementById(`productEntry${idx}`)?.remove();
};

// File upload handling
function handleFileSelect(input, type) {
  const preview = document.getElementById(`${type}Preview`);
  const zone = document.getElementById(`${type}Zone`);
  if (!preview || !zone || !input.files.length) return;
  preview.classList.remove('hidden');
  preview.textContent = `✓ ${input.files.length} file(s) selected`;
  zone.classList.add('has-file');
}
window.handleFileSelect = handleFileSelect;

function handleDrop(e, type) {
  e.preventDefault();
  const files = e.dataTransfer.files;
  if (!files.length) return;
  const preview = document.getElementById(`${type}Preview`);
  const zone = document.getElementById(`${type}Zone`);
  if (preview) { preview.classList.remove('hidden'); preview.textContent = `✓ ${files.length} file(s) uploaded`; }
  if (zone) zone.classList.add('has-file');
}
window.handleDrop = handleDrop;

// AI Processing steps animation
function startAiProcessing() {
  const steps = [1,2,3,4,5];
  steps.forEach((n, i) => {
    setTimeout(() => {
      const el = document.getElementById(`proc${n}`);
      if (!el) return;
      el.classList.add('done');
      if (i === steps.length - 1) {
        setTimeout(() => {
          document.getElementById('aiProcessing')?.classList.add('hidden');
          document.getElementById('aiSuccess')?.classList.remove('hidden');
        }, 600);
      }
    }, (i + 1) * 1200);
  });
}

function showDashboard() {
  document.getElementById('onboardingWizard')?.classList.add('hidden');
  document.getElementById('sellerHero')?.classList.add('hidden');
  const dash = document.getElementById('sellerDashboard');
  if (!dash) return;
  dash.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  animateKPIs();
}
window.showDashboard = showDashboard;

function animateKPIs() {
  document.querySelectorAll('.kpi-val').forEach(el => {
    const target = parseInt(el.dataset.target);
    const isDecimal = el.dataset.decimal === 'true';
    const duration = 1500;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = isDecimal ? (current / 10).toFixed(1) + '★' : Math.floor(current).toLocaleString('en-IN');
      if (current >= target) clearInterval(timer);
    }, 16);
  });
}

/* ═══════════════════════════════════════════
   STICKY HEADER SHADOW
═══════════════════════════════════════════ */
window.addEventListener('scroll', () => {
  document.getElementById('header')?.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });
