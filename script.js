/* Manzo King — Interactive behaviors */

(function() {
  // ===== Mobile nav toggle =====
  const nav = document.querySelector('.nav');
  const burger = document.querySelector('.nav__burger');
  if (burger) {
    burger.addEventListener('click', () => nav.classList.toggle('is-open'));
    document.querySelectorAll('.nav__menu a').forEach(a =>
      a.addEventListener('click', () => nav.classList.remove('is-open'))
    );
  }

  // ===== Reservation Modal =====
  const modal = document.getElementById('booking-modal');
  document.querySelectorAll('[data-open="booking"]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      if (modal) modal.classList.add('is-open');
    });
  });
  if (modal) {
    modal.addEventListener('click', e => {
      if (e.target === modal || e.target.dataset.close !== undefined) {
        modal.classList.remove('is-open');
      }
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') modal.classList.remove('is-open');
    });
  }

  // Booking form handler
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', e => {
      e.preventDefault();
      const msg = bookingForm.querySelector('.form-msg');
      msg.classList.remove('is-error');
      msg.classList.add('is-show');
      msg.textContent = 'Grazie! La tua richiesta di prenotazione è stata ricevuta. Ti contatteremo a breve per conferma.';
      bookingForm.reset();
      setTimeout(() => msg.classList.remove('is-show'), 6000);
    });
  }

  // Contact form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const msg = contactForm.querySelector('.form-msg');
      msg.classList.remove('is-error');
      msg.classList.add('is-show');
      msg.textContent = 'Messaggio inviato. Ti risponderemo entro 24 ore. Grazie!';
      contactForm.reset();
      setTimeout(() => msg.classList.remove('is-show'), 6000);
    });
  }

  // ===== Reveal on scroll =====
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('is-visible');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // ===== Cookie consent =====
  const cookies = document.getElementById('cookies');
  if (cookies) {
    if (!localStorage.getItem('mk_cookies_ok')) {
      setTimeout(() => cookies.classList.add('is-visible'), 1200);
    }
    cookies.querySelectorAll('[data-cookie]').forEach(btn => {
      btn.addEventListener('click', () => {
        localStorage.setItem('mk_cookies_ok', btn.dataset.cookie);
        cookies.classList.remove('is-visible');
      });
    });
  }

  // ===== Menu category scrollspy =====
  const menuLinks = document.querySelectorAll('.menu-nav__link');
  if (menuLinks.length) {
    menuLinks.forEach(link => {
      link.addEventListener('click', e => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          e.preventDefault();
          const top = target.getBoundingClientRect().top + window.scrollY - 140;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
    const cats = document.querySelectorAll('.menu-cat');
    const spy = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          menuLinks.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === '#' + en.target.id));
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    cats.forEach(c => spy.observe(c));
  }

  // ===== Nav shrink =====
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (nav) nav.classList.toggle('is-scrolled', y > 30);
    lastY = y;
  });
})();
