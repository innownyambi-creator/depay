/**
 * LEGEND CUT LCB — Main JavaScript
 * Developed by Nhabinde I.
 * 
 * Features:
 *  - EmailJS booking email delivery
 *  - Sticky nav + mobile menu
 *  - Scroll animations
 *  - Live open/closed status
 *  - Gallery lightbox
 *  - Scroll-to-top button
 */

// ══════════════════════════════════════════
//  EMAILJS CONFIGURATION
//  ──────────────────────────────────────
//  SETUP STEPS:
//  1. Go to https://www.emailjs.com and create a FREE account
//  2. Add an Email Service (Gmail recommended) → copy the Service ID
//  3. Create an Email Template using the variables below → copy Template ID
//  4. Go to Account → API Keys → copy your Public Key
//  5. Replace the values below with your actual IDs
//
//  TEMPLATE VARIABLES TO USE IN YOUR EMAILJS TEMPLATE:
//    {{from_name}}      — customer's full name
//    {{from_phone}}     — customer's phone number
//    {{service}}        — selected service
//    {{price}}          — service price
//    {{date}}           — preferred date
//    {{time}}           — preferred time
//    {{message}}        — additional notes
//    {{to_email}}       — your email (auto-filled)
//    {{reply_to}}       — leave empty (phone bookings)
// ══════════════════════════════════════════
const EMAILJS_CONFIG = {
  publicKey:  'YOUR_EMAILJS_PUBLIC_KEY',   // ← Replace this
  serviceId:  'YOUR_SERVICE_ID',           // ← Replace this
  templateId: 'YOUR_TEMPLATE_ID',          // ← Replace this
  toEmail:    'legendcutlcb@gmail.com'     // ← Your receiving email
};

// ── SERVICE PRICE MAP ──
const SERVICE_PRICES = {
  'Cut': 'R50',
  'Cut and Dye': 'R70',
  'Trim': 'R20',
  'Cut and Colour Dye': 'R100'
};

// ══════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════
document.addEventListener('DOMContentLoaded', function () {
  initEmailJS();
  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  initBookingForm();
  initOpenStatus();
  initScrollTop();
  initMinDate();
  initServiceCards();
});

// ══════════════════════════════════════════
//  EMAILJS INIT
// ══════════════════════════════════════════
function initEmailJS() {
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_CONFIG.publicKey);
  }
}

// ══════════════════════════════════════════
//  STICKY NAVBAR
// ══════════════════════════════════════════
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ══════════════════════════════════════════
//  MOBILE MENU
// ══════════════════════════════════════════
function initMobileMenu() {
  const burger  = document.getElementById('hamburger');
  const menu    = document.getElementById('mobileMenu');
  const links   = menu ? menu.querySelectorAll('a') : [];

  if (!burger || !menu) return;

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    menu.classList.toggle('open');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ══════════════════════════════════════════
//  SCROLL ANIMATIONS
// ══════════════════════════════════════════
function initScrollAnimations() {
  const els = document.querySelectorAll('.fade-up');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  els.forEach(el => observer.observe(el));
}

// ══════════════════════════════════════════
//  OPEN / CLOSED STATUS
// ══════════════════════════════════════════
function initOpenStatus() {
  const badge = document.getElementById('openStatus');
  if (!badge) return;

  const now  = new Date();
  const hour = now.getHours();
  const min  = now.getMinutes();
  const time = hour + min / 60;

  // Open 08:00 – 18:30 every day
  const isOpen = time >= 8 && time < 18.5;

  badge.className = 'status-badge ' + (isOpen ? 'open' : 'closed');
  badge.innerHTML = `
    <span class="status-dot"></span>
    ${isOpen ? 'Open Now' : 'Closed Now'}
  `;
}

// ══════════════════════════════════════════
//  MIN BOOKING DATE
// ══════════════════════════════════════════
function initMinDate() {
  const dateInput = document.getElementById('date');
  if (!dateInput) return;
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
}

// ══════════════════════════════════════════
//  SERVICE CARD — QUICK BOOK BUTTONS
// ══════════════════════════════════════════
function initServiceCards() {
  document.querySelectorAll('[data-service-select]').forEach(btn => {
    btn.addEventListener('click', () => {
      const service = btn.getAttribute('data-service-select');
      const select  = document.getElementById('service');
      if (select) {
        select.value = service;
        document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ══════════════════════════════════════════
//  BOOKING FORM
// ══════════════════════════════════════════
function initBookingForm() {
  const form    = document.getElementById('bookingForm');
  const success = document.getElementById('bookingSuccess');
  const submit  = document.getElementById('submitBtn');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Get form values
    const data = {
      from_name:  form.querySelector('#name').value.trim(),
      from_phone: form.querySelector('#phone').value.trim(),
      service:    form.querySelector('#service').value,
      price:      SERVICE_PRICES[form.querySelector('#service').value] || '',
      date:       form.querySelector('#date').value,
      time:       form.querySelector('#time').value,
      message:    form.querySelector('#notes')?.value.trim() || '',
      to_email:   EMAILJS_CONFIG.toEmail,
      reply_to:   ''
    };

    // Validate
    if (!data.from_name || !data.from_phone || !data.service || !data.date || !data.time) {
      showFormError('Please fill in all required fields.');
      return;
    }

    // Update button
    submit.disabled = true;
    submit.textContent = 'Sending Booking...';

    try {
      if (typeof emailjs !== 'undefined' &&
          EMAILJS_CONFIG.publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY') {
        // ── REAL EmailJS send ──
        await emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateId,
          data
        );
      } else {
        // ── Demo mode (EmailJS not configured yet) ──
        await new Promise(r => setTimeout(r, 1200));
        console.log('📧 DEMO MODE — Booking data:', data);
        console.warn('Configure EmailJS in js/main.js to enable real email delivery.');
      }

      // Show success
      form.style.display = 'none';
      success.style.display = 'block';

    } catch (err) {
      console.error('EmailJS error:', err);
      submit.disabled = false;
      submit.textContent = 'Book My Appointment';
      showFormError('There was a problem sending your booking. Please call us directly at 0677779709.');
    }
  });
}

function showFormError(msg) {
  let errEl = document.getElementById('formError');
  if (!errEl) {
    errEl = document.createElement('p');
    errEl.id = 'formError';
    errEl.style.cssText = 'color:#e05555;font-size:13px;margin-top:10px;text-align:center;';
    document.getElementById('bookingForm')?.appendChild(errEl);
  }
  errEl.textContent = msg;
  setTimeout(() => { if (errEl) errEl.textContent = ''; }, 6000);
}

// ══════════════════════════════════════════
//  SCROLL TO TOP
// ══════════════════════════════════════════
function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 500);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ══════════════════════════════════════════
//  GALLERY LIGHTBOX (simple)
// ══════════════════════════════════════════
document.addEventListener('click', function (e) {
  const item = e.target.closest('.g-item[data-src]');
  if (!item) return;

  const src = item.getAttribute('data-src');
  if (!src) return;

  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:9999;
    background:rgba(0,0,0,0.92);
    display:flex;align-items:center;justify-content:center;cursor:zoom-out;
  `;
  const img = document.createElement('img');
  img.src = src;
  img.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:4px;border:1px solid rgba(201,168,76,0.3);';
  overlay.appendChild(img);
  document.body.appendChild(overlay);
  overlay.addEventListener('click', () => overlay.remove());
});
