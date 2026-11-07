import { animate, stagger } from 'animejs';

/**
 * Cached motion preference detection with reactive listener
 */
let isReducedMotionCached = typeof window !== 'undefined' && window.matchMedia
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false;

if (typeof window !== 'undefined' && window.matchMedia) {
  try {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = (e) => {
      isReducedMotionCached = e.matches;
    };
    if (motionQuery.addEventListener) {
      motionQuery.addEventListener('change', updateMotion);
    } else if (motionQuery.addListener) {
      motionQuery.addListener(updateMotion);
    }
  } catch (_) {}
}

export const prefersReducedMotion = () => isReducedMotionCached;

/**
 * Smooth entrance animation for routed views / pages
 */
export function animatePageEnter(target) {
  if (!target) return null;
  if (prefersReducedMotion()) {
    target.style.opacity = '1';
    target.style.transform = 'none';
    return null;
  }
  return animate(target, {
    opacity: [0, 1],
    translateY: [16, 0],
    duration: 500,
    ease: 'outCubic',
  });
}

/**
 * Animate a single element with a smooth fade-up scroll reveal
 * (20-30px lift, 600-800ms duration, smooth outCubic easing)
 */
export function animateFadeUp(target, options = {}) {
  if (!target) return null;
  const isReduced = prefersReducedMotion();
  if (isReduced) {
    target.style.opacity = '1';
    target.style.transform = 'none';
    target.setAttribute('data-animated', 'true');
    return null;
  }

  const {
    translateY = 24,
    duration = 700,
    delay = 0,
    ease = 'outCubic'
  } = options;

  target.setAttribute('data-animated', 'true');

  return animate(target, {
    opacity: [0, 1],
    translateY: [translateY, 0],
    duration,
    delay,
    ease,
  });
}

/**
 * Animate grouped elements with a staggered fade-up reveal
 */
export function animateStaggerGroup(container, options = {}) {
  if (!container) return null;
  const isReduced = prefersReducedMotion();

  container.setAttribute('data-animated', 'true');

  const children = Array.from(container.children).filter(
    (c) => c.nodeType === 1 && !c.hasAttribute('data-no-animate')
  );

  if (children.length === 0) return null;

  if (isReduced) {
    children.forEach((c) => {
      c.style.opacity = '1';
      c.style.transform = 'none';
    });
    return null;
  }

  const {
    delay = 80,
    startDelay = 40,
    duration = 700,
    translateY = 24,
    ease = 'outCubic'
  } = options;

  return animate(children, {
    opacity: [0, 1],
    translateY: [translateY, 0],
    duration,
    delay: stagger(delay, { start: startDelay }),
    ease,
  });
}

/**
 * Staggered card / element reveal for catalogs, service lists, grids
 */
export function animateStagger(targets, options = {}) {
  if (!targets) return null;
  if (prefersReducedMotion()) {
    Array.from(targets).forEach((t) => {
      t.style.opacity = '1';
      t.style.transform = 'none';
    });
    return null;
  }

  const {
    delay = 70,
    duration = 550,
    translateY = 20,
    scale = [0.97, 1],
    ease = 'outCubic'
  } = options;

  return animate(targets, {
    opacity: [0, 1],
    translateY: [translateY, 0],
    scale,
    duration,
    delay: stagger(delay),
    ease,
  });
}

/**
 * Modal dialog entry animation (smooth zoom and gentle fade)
 */
export function animateModalIn(dialogEl) {
  if (!dialogEl) return null;
  if (prefersReducedMotion()) {
    dialogEl.style.opacity = '1';
    dialogEl.style.transform = 'none';
    return null;
  }

  return animate(dialogEl, {
    opacity: [0, 1],
    scale: [0.93, 1],
    translateY: [10, 0],
    duration: 300,
    ease: 'outExpo',
  });
}

/**
 * Staggered items entrance for navigation drawer
 */
export function animateDrawerItems(targets) {
  if (!targets) return null;
  if (prefersReducedMotion()) {
    Array.from(targets).forEach((t) => {
      t.style.opacity = '1';
      t.style.transform = 'none';
    });
    return null;
  }

  return animate(targets, {
    opacity: [0, 1],
    translateX: [14, 0],
    duration: 320,
    delay: stagger(30),
    ease: 'outCubic',
  });
}

/**
 * Hero headline text entrance animation
 */
export function animateHeroHeadline(target) {
  if (!target) return null;
  if (prefersReducedMotion()) {
    target.style.opacity = '1';
    target.style.transform = 'none';
    return null;
  }

  return animate(target, {
    opacity: [0, 1],
    translateY: [24, 0],
    duration: 750,
    ease: 'outCubic',
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// INTERSECTION OBSERVER SCROLL REVEAL ENGINE
// ─────────────────────────────────────────────────────────────────────────────

let globalScrollObserver = null;
let mutationObserver = null;
let rafId = null;
let mutationDebounceTimer = null;

/**
 * Initialize the IntersectionObserver scroll engine.
 * Automatically discovers all [data-animate="fade-up"] and [data-animate-stagger] elements.
 * Unobserves elements once triggered to avoid unnecessary replays.
 * Returns a cleanup function for React useEffect unmounts.
 */
export function initScrollAnimations() {
  if (typeof window === 'undefined') return () => {};

  const isReduced = prefersReducedMotion();

  // If already initialized, just refresh scans
  if (globalScrollObserver) {
    refreshScrollAnimations();
    return cleanupScrollAnimations;
  }

  // Create single shared IntersectionObserver
  globalScrollObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        observer.unobserve(el);

        if (el.getAttribute('data-animated') === 'true') return;

        if (isReduced) {
          el.setAttribute('data-animated', 'true');
          el.style.opacity = '1';
          el.style.transform = 'none';
          if (el.hasAttribute('data-animate-stagger')) {
            Array.from(el.children).forEach((child) => {
              child.style.opacity = '1';
              child.style.transform = 'none';
            });
          }
          return;
        }

        if (el.hasAttribute('data-animate-stagger')) {
          animateStaggerGroup(el);
        } else {
          animateFadeUp(el);
        }
      });
    },
    {
      root: null,
      rootMargin: '0px 0px -50px 0px', // Triggers slightly before element enters view for fluid perception
      threshold: 0.1,
    }
  );

  // Watch for dynamic DOM changes with debouncing to prevent thrashing on input/typing
  if (typeof MutationObserver !== 'undefined' && !mutationObserver) {
    mutationObserver = new MutationObserver((mutations) => {
      // Ignore text input / form typing mutations
      const isFormInput = mutations.some((m) => {
        const tag = m.target?.tagName?.toLowerCase();
        return tag === 'input' || tag === 'textarea' || tag === 'select';
      });
      if (isFormInput) return;

      if (mutationDebounceTimer) clearTimeout(mutationDebounceTimer);
      mutationDebounceTimer = setTimeout(() => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          refreshScrollAnimations();
        });
      }, 120);
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  // Initial scan
  refreshScrollAnimations();

  return cleanupScrollAnimations;
}

/**
 * Clean up observers and pending timers on unmount
 */
export function cleanupScrollAnimations() {
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  if (mutationDebounceTimer) {
    clearTimeout(mutationDebounceTimer);
    mutationDebounceTimer = null;
  }
  if (mutationObserver) {
    mutationObserver.disconnect();
    mutationObserver = null;
  }
  if (globalScrollObserver) {
    globalScrollObserver.disconnect();
    globalScrollObserver = null;
  }
}

/**
 * Scan document and observe any elements that have not yet been animated
 */
export function refreshScrollAnimations(root = document) {
  if (typeof window === 'undefined' || !globalScrollObserver) return;

  const isReduced = prefersReducedMotion();

  const elements = root.querySelectorAll(
    '[data-animate="fade-up"]:not([data-animated="true"]), [data-animate-stagger]:not([data-animated="true"])'
  );

  elements.forEach((el) => {
    if (isReduced) {
      el.setAttribute('data-animated', 'true');
      el.style.opacity = '1';
      el.style.transform = 'none';
      return;
    }
    globalScrollObserver.observe(el);
  });
}
