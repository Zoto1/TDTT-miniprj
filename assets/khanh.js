(function () {
  const root = document.documentElement;
  const reducedMotion = Boolean(
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  if (!reducedMotion) {
    root.classList.add('js-ready');
  }

  /* ---------- Mobile Drawer ---------- */
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

  /* ---------- Sections & Active Nav ---------- */
  const SECTION_IDS = ['gioi-thieu', 'du-an', 've-minh', 'ky-nang', 'lien-he'];
  const sections = SECTION_IDS
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const navLinks = Array.from(document.querySelectorAll('[data-nav-link]'));
  const scrollTopBtn = document.querySelector('[data-scroll-top]');

  function setActiveNav(id) {
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  }

  function isDesktopControlled() {
    if (reducedMotion || window.innerWidth < 960) return false;
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return false;
    return true;
  }

  /* ---------- Controlled Section Transition Engine ---------- */
  const DURATION = 680;
  const LOCK_BUFFER = 160;
  const EDGE_EPS = 4;
  const WHEEL_THRESHOLD = 20;

  let isTransitioning = false;
  let rafId = 0;
  let unlockTimer = 0;
  let cleanupTimer = 0;
  let wheelAccum = 0;
  let wheelResetTimer = 0;

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function getSectionBounds(sec) {
    const rect = sec.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    return { top, bottom: top + sec.offsetHeight, rect };
  }

  function getCurrentSectionIndex() {
    if (!sections.length) return 0;
    const vh = window.innerHeight || 900;
    const docHeight = document.documentElement.scrollHeight;
    if (window.scrollY + vh >= docHeight - EDGE_EPS) {
      return sections.length - 1;
    }

    const probeY = window.scrollY + Math.min(140, vh * 0.25);
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const top = sections[i].getBoundingClientRect().top + window.scrollY;
      if (probeY >= top - EDGE_EPS) return i;
    }
    return 0;
  }

  function updateScrollTopBtn() {
    if (!scrollTopBtn) return;
    const heroHeight = sections[0] ? sections[0].offsetHeight : 640;
    const threshold = Math.min(360, heroHeight * 0.55);
    scrollTopBtn.classList.toggle('is-visible', window.scrollY > threshold);
  }

  function clearSectionAnimClasses() {
    sections.forEach((sec) => {
      sec.classList.remove('is-leaving', 'is-entering-down', 'is-entering-up', 'is-entering-active');
    });
  }

  function transitionToSection(targetIndex, direction, align = 'top') {
    if (!sections.length) return;
    const clampedIndex = Math.max(0, Math.min(sections.length - 1, targetIndex));
    if (isTransitioning) return;

    const fromIndex = getCurrentSectionIndex();
    const fromSec = sections[fromIndex];
    const toSec = sections[clampedIndex];

    const bounds = getSectionBounds(toSec);
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const rawTarget = align === 'bottom'
      ? Math.max(bounds.top, bounds.bottom - window.innerHeight)
      : bounds.top;
    const targetY = Math.max(0, Math.min(rawTarget, maxScroll));
    const startY = window.scrollY;

    if (Math.abs(targetY - startY) < 2) {
      setActiveNav(toSec.id);
      return;
    }

    isTransitioning = true;
    clearTimeout(unlockTimer);
    clearTimeout(cleanupTimer);
    if (rafId) cancelAnimationFrame(rafId);

    root.classList.add('is-section-transitioning');
    setActiveNav(toSec.id);
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, '', `#${toSec.id}`);
    }

    clearSectionAnimClasses();
    if (fromSec && fromSec !== toSec) {
      fromSec.classList.add('is-leaving');
    }

    const enterClass = direction === 'up' ? 'is-entering-up' : 'is-entering-down';
    toSec.classList.add(enterClass);
    void toSec.offsetHeight;
    toSec.classList.remove(enterClass);
    toSec.classList.add('is-entering-active');

    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / DURATION);
      const eased = easeInOutCubic(progress);
      window.scrollTo(0, startY + (targetY - startY) * eased);

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
        return;
      }

      rafId = 0;
      window.scrollTo(0, targetY);
      root.classList.remove('is-section-transitioning');
      if (fromSec) fromSec.classList.remove('is-leaving');
      updateScrollTopBtn();

      cleanupTimer = setTimeout(() => {
        toSec.classList.remove('is-entering-active');
      }, 360);

      unlockTimer = setTimeout(() => {
        isTransitioning = false;
        wheelAccum = 0;
      }, LOCK_BUFFER);
    }

    rafId = requestAnimationFrame(step);
  }

  /* ---------- Desktop Wheel Listener ---------- */
  window.addEventListener(
    'wheel',
    (event) => {
      if (!isDesktopControlled()) return;

      if (isTransitioning) {
        event.preventDefault();
        return;
      }

      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if (event.deltaY === 0) return;

      const idx = getCurrentSectionIndex();
      const currentSec = sections[idx];
      if (!currentSec) return;

      const rect = currentSec.getBoundingClientRect();
      const vh = window.innerHeight || 900;

      if (event.deltaY > 0) {
        if (idx >= sections.length - 1) return;
        const atBottom = rect.bottom <= vh + EDGE_EPS;
        if (!atBottom) {
          wheelAccum = 0;
          return;
        }
        event.preventDefault();
        wheelAccum += event.deltaY;
        clearTimeout(wheelResetTimer);
        wheelResetTimer = setTimeout(() => { wheelAccum = 0; }, 140);
        if (wheelAccum >= WHEEL_THRESHOLD) {
          wheelAccum = 0;
          transitionToSection(idx + 1, 'down', 'top');
        }
      } else {
        if (idx <= 0) return;
        const atTop = rect.top >= -EDGE_EPS;
        if (!atTop) {
          wheelAccum = 0;
          return;
        }
        event.preventDefault();
        wheelAccum += Math.abs(event.deltaY);
        clearTimeout(wheelResetTimer);
        wheelResetTimer = setTimeout(() => { wheelAccum = 0; }, 140);
        if (wheelAccum >= WHEEL_THRESHOLD) {
          wheelAccum = 0;
          transitionToSection(idx - 1, 'up', 'bottom');
        }
      }
    },
    { passive: false }
  );

  /* ---------- Internal Anchor Clicks & Back-to-Top ---------- */
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const hash = link.getAttribute('href');
    if (!hash || hash.length < 2) return;
    const targetId = hash.slice(1);
    const targetIdx = SECTION_IDS.indexOf(targetId);
    if (targetIdx === -1) return;

    if (isDesktopControlled()) {
      event.preventDefault();
      if (isTransitioning) return;
      const curIdx = getCurrentSectionIndex();
      transitionToSection(targetIdx, targetIdx < curIdx ? 'up' : 'down', 'top');
    } else {
      setActiveNav(targetId);
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      if (isDesktopControlled()) {
        if (isTransitioning) return;
        transitionToSection(0, 'up', 'top');
      } else {
        window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
        setActiveNav('gioi-thieu');
      }
    });
  }

  /* ---------- Keyboard Navigation (PageDown / PageUp) ---------- */
  document.addEventListener('keydown', (event) => {
    if (!isDesktopControlled()) return;
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;

    const active = document.activeElement;
    if (active) {
      const tag = active.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || active.isContentEditable) {
        return;
      }
    }

    if (event.key === 'PageDown') {
      event.preventDefault();
      if (isTransitioning) return;
      const idx = getCurrentSectionIndex();
      if (idx < sections.length - 1) transitionToSection(idx + 1, 'down', 'top');
    } else if (event.key === 'PageUp') {
      event.preventDefault();
      if (isTransitioning) return;
      const idx = getCurrentSectionIndex();
      if (idx > 0) transitionToSection(idx - 1, 'up', 'top');
    }
  });

  /* ---------- Passive Scroll Sync ---------- */
  let scrollTicking = false;
  window.addEventListener(
    'scroll',
    () => {
      updateScrollTopBtn();
      if (isTransitioning || scrollTicking) return;
      scrollTicking = true;
      requestAnimationFrame(() => {
        scrollTicking = false;
        const cur = sections[getCurrentSectionIndex()];
        if (cur) setActiveNav(cur.id);
      });
    },
    { passive: true }
  );

  updateScrollTopBtn();

  /* ---------- Mobile Subtle Reveal ---------- */
  if (!isDesktopControlled() && !reducedMotion && 'IntersectionObserver' in window) {
    const mobileTargets = sections.filter((sec) => sec.getBoundingClientRect().top > window.innerHeight);
    mobileTargets.forEach((sec) => sec.classList.add('mobile-reveal'));
    if (mobileTargets.length) {
      const mobObs = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          });
        },
        { threshold: 0.05 }
      );
      mobileTargets.forEach((sec) => mobObs.observe(sec));
    }
  }

  window.__khanhScroll = {
    getState: () => ({
      isTransitioning,
      currentIndex: getCurrentSectionIndex(),
      sections: sections.map((s) => s.id),
      scrollY: window.scrollY
    })
  };
})();
