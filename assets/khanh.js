(function () {
  const root = document.documentElement;
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reducedMotion) {
    root.classList.add('js-ready');
  }

  const toggleBtn = document.querySelector('[data-menu-toggle]');
  const drawer = document.querySelector('[data-mobile-drawer]');

  function closeDrawer() {
    if (!drawer || !toggleBtn) return;
    drawer.classList.remove('is-open');
    toggleBtn.setAttribute('aria-expanded', 'false');
  }

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      const open = drawer.classList.toggle('is-open');
      toggleBtn.setAttribute('aria-expanded', String(open));
    });

    drawer.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeDrawer();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeDrawer();
    });
  }

  const navLinks = Array.from(document.querySelectorAll('[data-nav-link]'));
  const sections = ['gioi-thieu', 'du-an', 've-minh', 'ky-nang', 'lien-he']
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  function setActiveNav(id) {
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  }

  if ('IntersectionObserver' in window && sections.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveNav(entry.target.id);
        });
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((sec) => navObserver.observe(sec));
  }

  const reveals = Array.from(document.querySelectorAll('.reveal'));
  if (!reducedMotion && 'IntersectionObserver' in window && reveals.length) {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => revealObserver.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }
})();
