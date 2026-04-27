'use strict';

/* ── MOBILE NAV ── */
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger?.addEventListener('click', () => {
  nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', nav.classList.contains('open'));
});

/* Close nav when a link is clicked */
nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

/* ── STICKY HEADER shadow on scroll ── */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ── QUOTE FORM → WhatsApp ── */
const quoteForm = document.getElementById('quoteForm');
quoteForm?.addEventListener('submit', e => {
  e.preventDefault();
  const fd = new FormData(quoteForm);
  const name = fd.get('name')?.toString().trim();
  const company = fd.get('company')?.toString().trim();
  const mobile = fd.get('mobile')?.toString().trim();
  const email = fd.get('email')?.toString().trim();
  const product = fd.get('product')?.toString();
  const message = fd.get('message')?.toString().trim();

  if (!name || !company || !mobile || !product) {
    alert('Please fill in the required fields (Name, Company, Mobile, Product).');
    return;
  }

  const lines = [
    `*Quote Request – Arambhika Enablers B2B*`,
    ``,
    `*Name:* ${name}`,
    `*Company:* ${company}`,
    `*Mobile:* ${mobile}`,
    email ? `*Email:* ${email}` : null,
    `*Product:* ${product}`,
    message ? `*Requirements:* ${message}` : null,
  ].filter(Boolean).join('\n');

  const url = `https://wa.me/918112662827?text=${encodeURIComponent(lines)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
});

/* ── SMOOTH ACTIVE NAV HIGHLIGHT ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a[href^="#"]');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: '-50% 0px -50% 0px' });

sections.forEach(sec => observer.observe(sec));
