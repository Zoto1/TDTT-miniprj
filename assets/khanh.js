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

  /* ---------- Shared DOM Refs ---------- */
  const scrollTrack = document.getElementById('scroll-track');
  const stageLayers = Array.from(document.querySelectorAll('[data-stage-layer]'));
  const layerInners = stageLayers.map((layer) => layer.querySelector('.stage-layer-inner'));
  const navLinks = Array.from(document.querySelectorAll('[data-nav-link]'));
  const hudLabel = document.querySelector('[data-stage-label]');
  const hudFill = document.querySelector('[data-stage-fill]');
  const stageDot = document.querySelector('[data-stage-dot]');
  const scrollTopBtn = document.querySelector('[data-scroll-top]');

  const LERP = 0.09;
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  let stageActive = false;
  let segments = [];
  let totalScroll = 0;
  let smoothY = 0;
  let targetY = 0;
  let rafId = 0;

  let debugState = {
    stageActive: false,
    smoothY: 0,
    targetY: 0,
    smoothProgress: 0,
    activeIndex: 0,
    activePhase: 1,
    morphT: 0,
    morphRadius: 0,
    totalScroll: 0,
    segments: []
  };

  function setActiveNav(id) {
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  }

  function isStageEligible() {
    if (reducedMotion || window.innerWidth < 960) return false;
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return false;
    return Boolean(scrollTrack && stageLayers.length);
  }

  function measureSegments() {
    if (!stageActive) return;
    const vh = window.innerHeight || 900;
    let cursor = 0;

    segments = stageLayers.map((layer, index) => {
      const inner = layerInners[index];
      const contentH = inner ? inner.scrollHeight : vh;
      const overflow = Math.max(0, Math.ceil(contentH - vh));
      const dwell = Math.round(vh * (overflow > 0 ? 0.14 : 0.24));
      const phase1Px = overflow + dwell;
      const phase2Px = index < stageLayers.length - 1 ? Math.round(vh * 0.78) : 0;

      const startY = cursor;
      const phase1EndY = startY + phase1Px;
      const endY = phase1EndY + phase2Px;
      cursor = endY;

      return {
        id: layer.id,
        label: layer.dataset.label || layer.id,
        startY,
        phase1EndY,
        endY,
        overflow,
        dwell,
        phase1Px,
        phase2Px
      };
    });

    totalScroll = segments.length ? segments[segments.length - 1].endY : 0;
    scrollTrack.style.height = `${totalScroll + vh}px`;
    targetY = clamp(window.scrollY, 0, totalScroll);
    smoothY = clamp(smoothY, 0, totalScroll);
  }

  function renderStage() {
    if (!stageActive || !segments.length) return;

    const y = clamp(smoothY, 0, totalScroll);
    const smoothProgress = totalScroll > 0 ? clamp(y / totalScroll, 0, 1) : 0;

    let segIndex = segments.length - 1;
    for (let i = 0; i < segments.length; i += 1) {
      if (y <= segments[i].endY || i === segments.length - 1) {
        segIndex = i;
        break;
      }
    }

    const seg = segments[segIndex];
    const inPhase2 = y > seg.phase1EndY && segIndex < segments.length - 1 && seg.phase2Px > 0;

    let activeIndex = segIndex;
    let morphT = 0;
    let morphRadius = 0;
    let morphPulse = 0;

    if (!inPhase2) {
      const innerOffset = seg.overflow > 0 ? clamp(y - seg.startY, 0, seg.overflow) : 0;

      stageLayers.forEach((layer, idx) => {
        const inner = layerInners[idx];
        if (idx === segIndex) {
          layer.style.zIndex = '2';
          layer.style.visibility = 'visible';
          layer.style.pointerEvents = 'auto';
          layer.style.opacity = '1';
          layer.style.transform = 'scale(1)';
          layer.style.clipPath = 'none';
          if (inner) inner.style.transform = `translate3d(0, -${innerOffset.toFixed(2)}px, 0)`;
        } else {
          layer.style.zIndex = '0';
          layer.style.visibility = 'hidden';
          layer.style.pointerEvents = 'none';
          layer.style.clipPath = 'none';
        }
      });
    } else {
      morphT = clamp((y - seg.phase1EndY) / seg.phase2Px, 0, 1);
      const eased = morphT < 0.5
        ? 2 * morphT * morphT
        : 1 - Math.pow(-2 * morphT + 2, 2) / 2;
      morphRadius = Number((eased * 150).toFixed(2));
      morphPulse = Math.sin(morphT * Math.PI);
      activeIndex = morphT >= 0.45 ? segIndex + 1 : segIndex;

      stageLayers.forEach((layer, idx) => {
        const inner = layerInners[idx];
        if (idx === segIndex) {
          layer.style.zIndex = '1';
          layer.style.visibility = 'visible';
          layer.style.pointerEvents = morphT < 0.5 ? 'auto' : 'none';
          layer.style.opacity = (1 - 0.36 * eased).toFixed(3);
          layer.style.transform = `scale(${(1 - 0.04 * eased).toFixed(4)})`;
          layer.style.clipPath = 'none';
          if (inner) inner.style.transform = `translate3d(0, -${seg.overflow.toFixed(2)}px, 0)`;
        } else if (idx === segIndex + 1) {
          layer.style.zIndex = '2';
          layer.style.visibility = 'visible';
          layer.style.pointerEvents = morphT >= 0.5 ? 'auto' : 'none';
          layer.style.opacity = '1';
          layer.style.transform = `scale(${(1.03 - 0.03 * eased).toFixed(4)})`;
          layer.style.clipPath = `circle(${morphRadius}% at 85% 50%)`;
          if (inner) inner.style.transform = 'translate3d(0, 0, 0)';
        } else {
          layer.style.zIndex = '0';
          layer.style.visibility = 'hidden';
          layer.style.pointerEvents = 'none';
          layer.style.clipPath = 'none';
        }
      });
    }

    const activeSeg = segments[activeIndex];
    if (activeSeg) {
      setActiveNav(activeSeg.id);
      if (hudLabel) hudLabel.textContent = activeSeg.label;
    }
    if (hudFill) {
      hudFill.style.transform = `scaleX(${smoothProgress.toFixed(4)})`;
    }
    if (stageDot) {
      stageDot.style.top = `${(smoothProgress * 100).toFixed(3)}%`;
      stageDot.style.transform = `translate(-50%, -50%) scale(${(1 + morphPulse * 0.85).toFixed(3)})`;
    }
    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle('is-visible', smoothProgress > 0.05);
    }

    debugState = {
      stageActive: true,
      smoothY: Math.round(y),
      targetY: Math.round(targetY),
      smoothProgress: Number(smoothProgress.toFixed(4)),
      activeIndex,
      activePhase: inPhase2 ? 2 : 1,
      morphT: Number(morphT.toFixed(4)),
      morphRadius,
      totalScroll,
      segments
    };
  }

  function tick() {
    if (!stageActive) {
      rafId = 0;
      return;
    }

    const diff = targetY - smoothY;
    if (Math.abs(diff) < 0.35) {
      smoothY = targetY;
    } else {
      smoothY += diff * LERP;
    }

    renderStage();
    rafId = requestAnimationFrame(tick);
  }

  function enableStageMode() {
    if (stageActive) return;
    stageActive = true;
    root.classList.add('stage-active');
    measureSegments();
    targetY = clamp(window.scrollY, 0, totalScroll);
    smoothY = targetY;
    renderStage();
    if (!rafId) rafId = requestAnimationFrame(tick);
  }

  function disableStageMode() {
    if (!stageActive) return;
    stageActive = false;
    root.classList.remove('stage-active');
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }
    scrollTrack.style.height = '';
    stageLayers.forEach((layer, idx) => {
      const inner = layerInners[idx];
      layer.style.zIndex = '';
      layer.style.visibility = '';
      layer.style.pointerEvents = '';
      layer.style.opacity = '';
      layer.style.transform = '';
      layer.style.clipPath = '';
      if (inner) inner.style.transform = '';
    });
    debugState.stageActive = false;
  }

  function syncMode() {
    if (isStageEligible()) {
      enableStageMode();
    } else {
      disableStageMode();
      updateFallbackUI();
    }
  }

  function updateFallbackUI() {
    if (stageActive) return;
    if (scrollTopBtn) {
      const heroH = stageLayers[0] ? stageLayers[0].offsetHeight : 600;
      scrollTopBtn.classList.toggle('is-visible', window.scrollY > Math.min(340, heroH * 0.5));
    }

    const probeY = window.scrollY + Math.min(140, (window.innerHeight || 844) * 0.25);
    let current = stageLayers[0];
    for (let i = stageLayers.length - 1; i >= 0; i -= 1) {
      const top = stageLayers[i].getBoundingClientRect().top + window.scrollY;
      if (probeY >= top - 4) {
        current = stageLayers[i];
        break;
      }
    }
    if (current) setActiveNav(current.id);
  }

  /* ---------- Scroll & Resize Listeners ---------- */
  window.addEventListener(
    'scroll',
    () => {
      if (stageActive) {
        targetY = clamp(window.scrollY, 0, totalScroll);
      } else {
        updateFallbackUI();
      }
    },
    { passive: true }
  );

  let resizeTimer = 0;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      syncMode();
      if (stageActive) measureSegments();
    }, 100);
  });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      if (stageActive) {
        measureSegments();
        renderStage();
      }
    });
  }

  window.addEventListener('load', () => {
    if (stageActive) {
      measureSegments();
      renderStage();
    }
  });

  document.querySelectorAll('details.project-details').forEach((det) => {
    det.addEventListener('toggle', () => {
      if (stageActive) {
        measureSegments();
        renderStage();
      }
    });
  });

  /* ---------- Sidebar, CTA & Back-to-Top Navigation ---------- */
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const hash = link.getAttribute('href');
    if (!hash || hash.length < 2) return;
    const targetId = hash.slice(1);
    const targetIdx = stageLayers.findIndex((layer) => layer.id === targetId);
    if (targetIdx === -1) return;

    if (stageActive && segments[targetIdx]) {
      event.preventDefault();
      window.scrollTo({ top: segments[targetIdx].startY, behavior: 'auto' });
      targetY = segments[targetIdx].startY;
    } else {
      setActiveNav(targetId);
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      if (stageActive) {
        window.scrollTo({ top: 0, behavior: 'auto' });
        targetY = 0;
      } else {
        window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
        setActiveNav('gioi-thieu');
      }
    });
  }

  /* ---------- Mobile Below-Fold Reveal ---------- */
  syncMode();

  if (!stageActive && !reducedMotion && 'IntersectionObserver' in window) {
    const mobileTargets = stageLayers.filter((sec) => sec.getBoundingClientRect().top > window.innerHeight);
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

  window.__khanhStage = {
    getState: () => ({
      ...debugState,
      scrollY: Math.round(window.scrollY)
    })
  };
})();
