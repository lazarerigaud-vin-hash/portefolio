// ===================================
//  PORTFOLIO LAZARE RIGAUD-VIN
// ===================================

// --- NAVBAR SCROLL ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// --- MOBILE MENU ---
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Fermer le menu en cliquant sur un lien
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// --- INTERSECTION OBSERVER : fade-in ---
const fadeEls = document.querySelectorAll(
  '.section-label, .section h2, .apropos-text, .apropos-timeline, ' +
  '.skill-category, .project-card, .mission, .stage-company, .stage-missions, ' +
  '.stage-bilan, .contact-text, .contact-form'
);

fadeEls.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach(el => observer.observe(el));

// --- SKILL BARS ANIMATION ---
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

skillFills.forEach(el => skillObserver.observe(el));

// --- SMOOTH ACTIVE NAV ---
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navItems.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}`
          ? 'var(--text)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// --- CONTACT FORM (à connecter à Formspree) ---
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Pour activer le formulaire :
    // 1. Créer un compte gratuit sur https://formspree.io
    // 2. Remplacer l'action ci-dessous par ton endpoint Formspree
    // 3. Décommenter les lignes fetch
    
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Message envoyé ✓';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    // Exemple avec Formspree :
    // fetch('https://formspree.io/f/TON_ID', {
    //   method: 'POST',
    //   body: new FormData(form),
    //   headers: { 'Accept': 'application/json' }
    // }).then(() => {
    //   btn.textContent = 'Message envoyé ✓';
    //   form.reset();
    // });
  });
}

// --- CURSOR GLOW (desktop) ---
if (window.innerWidth > 768) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed; width: 300px; height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(79,142,255,0.06) 0%, transparent 70%);
    pointer-events: none; z-index: 0;
    transform: translate(-50%, -50%);
    transition: left 0.15s ease, top 0.15s ease;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}
