/* ══════════════════════════════════════════
   NAKUL SHARMA — PORTFOLIO SCRIPT
══════════════════════════════════════════ */

// ── Custom Cursor ──────────────────────────
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursorTrail');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  setTimeout(() => {
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
  }, 80);
});

document.querySelectorAll('a, button, .skill-card, .project-card, .contact-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursor.style.opacity = '0.6';
    trail.style.width = '50px';
    trail.style.height = '50px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '10px';
    cursor.style.height = '10px';
    cursor.style.opacity = '1';
    trail.style.width = '36px';
    trail.style.height = '36px';
  });
});

// ── Nav Scroll Effect ──────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ── Mobile Menu ────────────────────────────
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

navToggle.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  // Animate hamburger
  const spans = navToggle.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ── Reveal on Scroll ───────────────────────
const revealEls = document.querySelectorAll('.reveal, .skill-card, .project-card, .about-grid > *, .contact-card');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger the reveal
      setTimeout(() => {
        entry.target.classList.add('visible');
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach((el, i) => {
  if (!el.classList.contains('reveal')) {
    // Non-reveal elements: set initial state manually
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.7s ease ${i * 0.1}s, transform 0.7s ease ${i * 0.1}s`;
  }
  revealObserver.observe(el);
});

// ── Skill Bars Animation ───────────────────
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      const width = fill.style.width;
      fill.style.width = '0';
      setTimeout(() => { fill.style.width = width; }, 200);
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.5 });

skillFills.forEach(fill => skillObserver.observe(fill));

// ── Smooth Active Nav Link ─────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--gold)';
        }
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => sectionObserver.observe(s));

// ── Parallax Hero BG Text ──────────────────
const heroBg = document.querySelector('.hero-bg-text');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    heroBg.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.3}px))`;
  });
}

// ── Floating Chips Parallax ────────────────
const chips = document.querySelectorAll('.chip');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  chips.forEach((chip, i) => {
    const speed = 0.05 + (i * 0.02);
    chip.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// ── Staggered hero reveal on load ─────────
window.addEventListener('load', () => {
  const heroReveals = document.querySelectorAll('.hero .reveal');
  heroReveals.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 300 + i * 150);
  });
});
