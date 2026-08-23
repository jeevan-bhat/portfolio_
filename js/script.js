/* =============================================================
   Jeevan G Bhat — Portfolio
   Interactivity: theme, nav, scroll effects, reveal, typing,
   counters, skill bars, and form validation.
   ============================================================= */
(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------
     1. Theme toggle (persisted in localStorage)
  --------------------------------------------------------- */
  const themeToggle = $('#themeToggle');
  const root = document.documentElement;

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (e) { /* storage blocked */ }
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  /* ---------------------------------------------------------
     2. Mobile navigation
  --------------------------------------------------------- */
  const navToggle = $('#navToggle');
  const navMenu = $('#navMenu');

  function closeMenu() {
    if (!navMenu) return;
    navMenu.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const open = navMenu.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', open);
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    // Close menu when a link is tapped or when clicking outside
    navMenu.addEventListener('click', (e) => { if (e.target.closest('a')) closeMenu(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
  }

  /* ---------------------------------------------------------
     3. Header state + scroll progress + back-to-top
  --------------------------------------------------------- */
  const header = $('#header');
  const progress = $('#scrollProgress');
  const toTop = $('#toTop');

  function onScroll() {
    const y = window.scrollY || document.documentElement.scrollTop;
    const docH = document.documentElement.scrollHeight - window.innerHeight;

    if (header) header.classList.toggle('is-scrolled', y > 8);
    if (progress) progress.style.width = docH > 0 ? `${(y / docH) * 100}%` : '0%';
    if (toTop) toTop.classList.toggle('is-visible', y > 600);
  }

  // rAF-throttled scroll handler for smoothness
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => { onScroll(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------------------------------------------------------
     4. Active nav link while scrolling (scroll-spy)
  --------------------------------------------------------- */
  const sections = $$('main section[id]');
  const navLinks = $$('.nav__link');

  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------------------------------------------------------
     5. Scroll-reveal animations
  --------------------------------------------------------- */
  const revealEls = $$('.reveal');
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // small stagger for groups of siblings
          entry.target.style.transitionDelay = `${Math.min(i * 60, 240)}ms`;
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => revealObserver.observe(el));
  }

  /* ---------------------------------------------------------
     6. Typing effect in the hero
  --------------------------------------------------------- */
  const typedEl = $('#typed');
  const roles = ['Full-Stack Developer', 'CSE Student', 'Python Developer', 'React Developer', 'AI & Cloud Enthusiast'];

  if (typedEl) {
    if (prefersReducedMotion) {
      typedEl.textContent = roles[0];
    } else {
      let roleIndex = 0, charIndex = 0, deleting = false;
      const type = () => {
        const word = roles[roleIndex];
        typedEl.textContent = word.slice(0, charIndex);

        if (!deleting && charIndex < word.length) {
          charIndex++;
          setTimeout(type, 90);
        } else if (deleting && charIndex > 0) {
          charIndex--;
          setTimeout(type, 45);
        } else {
          if (!deleting) {
            deleting = true;
            setTimeout(type, 1400); // pause at full word
          } else {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(type, 300);
          }
        }
      };
      type();
    }
  }

  /* ---------------------------------------------------------
     7. Count-up stats + skill bars (run once on reveal)
  --------------------------------------------------------- */
  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10) || 0;
    const suffix = el.dataset.suffix != null ? el.dataset.suffix : '+';
    if (prefersReducedMotion) { el.textContent = `${target}${suffix}`; return; }
    const duration = 1400;
    let startTime = null;
    const step = (ts) => {
      if (startTime === null) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = `${Math.floor(eased * target)}${p === 1 ? suffix : ''}`;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const counters = $$('[data-count]');
  const bars = $$('.bar__fill');

  if ('IntersectionObserver' in window) {
    const statObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (entry.target.hasAttribute('data-count')) animateCount(entry.target);
        if (entry.target.classList.contains('bar__fill')) {
          entry.target.style.width = `${entry.target.dataset.level}%`;
        }
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.4 });
    counters.forEach((c) => statObserver.observe(c));
    bars.forEach((b) => statObserver.observe(b));
  } else {
    counters.forEach((c) => { c.textContent = `${c.dataset.count}${c.dataset.suffix != null ? c.dataset.suffix : '+'}`; });
    bars.forEach((b) => { b.style.width = `${b.dataset.level}%`; });
  }

  /* ---------------------------------------------------------
     8. Contact form validation
  --------------------------------------------------------- */
  const form = $('#contactForm');
  const status = $('#formStatus');

  const validators = {
    name: (v) => v.trim().length >= 2 || 'Please enter your name (at least 2 characters).',
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Please enter a valid email address.',
    subject: (v) => v.trim().length >= 3 || 'Please add a short subject.',
    message: (v) => v.trim().length >= 10 || 'Your message should be at least 10 characters.',
  };

  function setFieldState(field, ok, msg) {
    const wrap = field.closest('.field');
    const error = wrap ? $('.field__error', wrap) : null;
    if (wrap) {
      wrap.classList.toggle('is-invalid', !ok);
      wrap.classList.toggle('is-valid', ok);
    }
    if (error) error.textContent = ok ? '' : msg;
    field.setAttribute('aria-invalid', String(!ok));
  }

  function validateField(field) {
    const rule = validators[field.name];
    if (!rule) return true;
    const result = rule(field.value);
    const ok = result === true;
    setFieldState(field, ok, ok ? '' : result);
    return ok;
  }

  if (form) {
    const fields = $$('input, textarea', form);

    // Validate on blur; clear error as the user fixes it
    fields.forEach((field) => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        if (field.closest('.field').classList.contains('is-invalid')) validateField(field);
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let allValid = true;
      let firstInvalid = null;

      fields.forEach((field) => {
        const ok = validateField(field);
        if (!ok && !firstInvalid) firstInvalid = field;
        allValid = allValid && ok;
      });

      if (!allValid) {
        status.textContent = 'Please fix the highlighted fields.';
        status.className = 'form__status is-error';
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // --- Real submission: deliver the message straight to the inbox ---
      // Static sites can't send email on their own, so we POST to FormSubmit
      // (https://formsubmit.co) — a free, no-backend relay that emails each
      // submission to jeevanbhat33@gmail.com. No Gmail window, no manual send.
      // NOTE: the very first submission triggers a one-time "Activate" email
      // from FormSubmit to that address; click it once and all future messages
      // arrive directly. (Prefer a key-based service? Swap the endpoint for a
      // Web3Forms / Formspree one — the fetch shape is the same.)
      const btn = $('#submitBtn');
      const original = btn.innerHTML;

      // Note: use form.elements — `form.name` resolves to the form's own
      // reserved `name` property, not the Name field.
      const val = (n) => (form.elements.namedItem(n)?.value || '').trim();

      btn.disabled = true;
      btn.innerHTML = 'Sending…';
      status.textContent = '';
      status.className = 'form__status';

      const ENDPOINT = 'https://formsubmit.co/ajax/jeevanbhat33@gmail.com';
      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: val('name'),
          email: val('email'),
          subject: val('subject'),
          message: val('message'),
          _subject: 'New portfolio message: ' + val('subject'),
          _replyto: val('email'),
          _captcha: 'false',
          _template: 'table',
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error('HTTP ' + res.status);
          return res.json().catch(() => ({}));
        })
        .then(() => {
          form.reset();
          fields.forEach((f) => f.closest('.field').classList.remove('is-valid', 'is-invalid'));
          status.textContent = '✓ Thanks! Your message has been sent — I\'ll get back to you soon.';
          status.className = 'form__status is-success';
          setTimeout(() => { status.textContent = ''; status.className = 'form__status'; }, 8000);
        })
        .catch(() => {
          status.textContent = '⚠ Couldn\'t send right now — please email me directly at jeevanbhat33@gmail.com.';
          status.className = 'form__status is-error';
        })
        .finally(() => {
          btn.disabled = false;
          btn.innerHTML = original;
        });
    });
  }

  /* ---------------------------------------------------------
     9. Footer year
  --------------------------------------------------------- */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
