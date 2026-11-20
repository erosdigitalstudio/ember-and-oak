/**
 * Ember & Oak — motion & interaction engine.
 * GSAP + ScrollTrigger + SplitText, Lenis smooth scrolling.
 * Every effect degrades gracefully: reduced-motion users get instant, static content.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import { initNewsletter } from './forms';

gsap.registerPlugin(ScrollTrigger, SplitText);

const root = document.documentElement;
const EASE = 'expo.out';
let lenis: Lenis | null = null;
const readyCallbacks: Array<(motion: boolean) => void> = [];
let isReady = false;

export const hasMotion = () => root.classList.contains('motion');
export const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;
export const getLenis = () => lenis;
export { gsap, ScrollTrigger, SplitText };

/** Run page code once the intro (preloader / page curtain) has finished. */
export function onReady(cb: (motion: boolean) => void) {
  if (isReady) cb(hasMotion());
  else readyCallbacks.push(cb);
}

export function scrollToEl(target: Element | number, offset = -96) {
  if (lenis) {
    lenis.resize();
    lenis.scrollTo(target as HTMLElement, { offset, duration: 1.4 });
  }
  else if (typeof target === 'number') window.scrollTo({ top: target });
  else {
    const top = (target as HTMLElement).getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top });
  }
}

/* --------------------------------------------------------------------- */

export function boot() {
  const motion = hasMotion();

  initHeader();
  initMobileMenu();
  initNewsletter();
  initTransitions(motion);
  initAccordions(motion);

  if (motion) {
    initLenis();
    if (finePointer()) {
      initCursor();
      initMagnetic();
    }
  }

  const fontsReady = Promise.race([
    document.fonts?.ready ?? Promise.resolve(),
    new Promise((r) => setTimeout(r, 1200)),
  ]);

  fontsReady.then(() => {
    if (motion) initReveals();
    root.classList.add('is-ready');
    playIntro(motion).then(() => {
      isReady = true;
      readyCallbacks.splice(0).forEach((cb) => cb(motion));
      try {
        sessionStorage.setItem('eo-visited', '1');
      } catch {}
    });
  });

  // Back/forward cache: make sure the page never comes back covered.
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      root.classList.remove('is-entering');
      const curtain = document.querySelector<HTMLElement>('[data-curtain]');
      if (curtain) {
        gsap.set(curtain.querySelectorAll('.curtain__panel'), { clearProps: 'transform' });
        gsap.set(curtain, { clearProps: 'visibility' });
      }
      lenis?.start();
      ScrollTrigger.refresh();
    }
  });
}

/* --------------------------------------------------------------------- */
/* Smooth scrolling                                                       */
/* --------------------------------------------------------------------- */
function initLenis() {
  lenis = new Lenis({
    lerp: 0.095,
    wheelMultiplier: 1,
    smoothWheel: true,
    anchors: { offset: -96 },
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* --------------------------------------------------------------------- */
/* Intro: preloader on first visit, curtain lift on internal navigation   */
/* --------------------------------------------------------------------- */
function playIntro(motion: boolean): Promise<void> {
  const preloader = document.querySelector<HTMLElement>('[data-preloader]');
  const curtain = document.querySelector<HTMLElement>('[data-curtain]');

  if (!motion) {
    preloader?.remove();
    return Promise.resolve();
  }

  if (root.classList.contains('first-visit') && preloader) {
    root.classList.remove('is-entering');
    lenis?.stop();
    return new Promise((resolve) => {
      const bar = preloader.querySelector('[data-preloader-bar]');
      const count = preloader.querySelector('[data-preloader-count]');
      const words = preloader.querySelectorAll('.logo__word, .logo__amp');
      const meta = preloader.querySelector('.logo-lockup__meta');
      const counter = { v: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          root.classList.remove('first-visit');
          preloader.remove();
          lenis?.start();
          resolve();
        },
      });
      tl.from(words, { yPercent: 60, opacity: 0, duration: 0.9, ease: EASE, stagger: 0.08 })
        .from(meta, { opacity: 0, duration: 0.6 }, '-=0.5')
        .to(bar, { scaleX: 1, duration: 0.9, ease: 'power2.inOut' }, 0.05)
        .to(
          counter,
          {
            v: 100,
            duration: 0.9,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (count) count.textContent = String(Math.round(counter.v)).padStart(3, '0');
            },
          },
          0.05,
        )
        .to(preloader.querySelector('.preloader__inner'), { opacity: 0, y: -20, duration: 0.35, ease: 'power2.in' }, '+=0.05')
        .to(preloader, { clipPath: 'inset(0 0 100% 0)', duration: 0.8, ease: 'expo.inOut' }, '-=0.05');
      // Hand off to the hero slightly before the preloader is fully gone.
      tl.call(() => document.dispatchEvent(new CustomEvent('eo:intro')), [], '-=0.55');
    });
  }

  preloader?.remove();

  if (root.classList.contains('is-entering') && curtain) {
    return new Promise((resolve) => {
      const panel = curtain.querySelector('[data-curtain-panel]');
      const ember = curtain.querySelector('[data-curtain-ember]');
      const mark = curtain.querySelector('[data-curtain-mark]');
      gsap.set(curtain, { visibility: 'visible' });
      gsap.set(mark, { opacity: 1 });
      const tl = gsap.timeline({
        onComplete: () => {
          root.classList.remove('is-entering');
          gsap.set(curtain, { clearProps: 'visibility' });
          gsap.set([panel, ember, mark], { clearProps: 'all' });
          resolve();
        },
      });
      tl.to(mark, { opacity: 0, y: -10, duration: 0.35, ease: 'power2.in' })
        .to(panel, { yPercent: -100, duration: 0.9, ease: 'expo.inOut' }, 0.1)
        .to(ember, { yPercent: -100, duration: 0.9, ease: 'expo.inOut' }, 0.2);
      tl.call(() => document.dispatchEvent(new CustomEvent('eo:intro')), [], 0.45);
    });
  }

  document.dispatchEvent(new CustomEvent('eo:intro'));
  return Promise.resolve();
}

/* --------------------------------------------------------------------- */
/* Page transitions (leave)                                               */
/* --------------------------------------------------------------------- */
function initTransitions(motion: boolean) {
  if (!motion) return;
  const curtain = document.querySelector<HTMLElement>('[data-curtain]');
  if (!curtain) return;
  let leaving = false;

  document.addEventListener('click', (e) => {
    const a = (e.target as Element).closest?.('a');
    if (!a || leaving) return;
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (a.target && a.target !== '_self') return;
    if (a.hasAttribute('download') || a.dataset.noTransition !== undefined) return;
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
    const dest = new URL(a.href, location.href);
    if (dest.origin !== location.origin) return;
    if (dest.pathname === location.pathname) {
      if (dest.hash) return; // same-page anchor: let Lenis handle it
      e.preventDefault();
      lenis ? lenis.scrollTo(0, { duration: 1.2 }) : window.scrollTo({ top: 0 });
      closeMobileMenu();
      return;
    }

    e.preventDefault();
    leaving = true;
    try {
      sessionStorage.setItem('eo-transition', '1');
    } catch {}

    const panel = curtain.querySelector('[data-curtain-panel]');
    const ember = curtain.querySelector('[data-curtain-ember]');
    const mark = curtain.querySelector('[data-curtain-mark]');
    gsap.set(curtain, { visibility: 'visible' });
    gsap.set([panel, ember], { y: 0, yPercent: 100 });
    lenis?.stop();

    gsap
      .timeline({
        onComplete: () => {
          window.location.href = dest.href;
          // Safety: if navigation is cancelled, restore the page.
          setTimeout(() => {
            leaving = false;
          }, 2500);
        },
      })
      .to(ember, { yPercent: 0, duration: 0.75, ease: 'expo.inOut' })
      .to(panel, { yPercent: 0, duration: 0.75, ease: 'expo.inOut' }, 0.08)
      .fromTo(mark, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0.55);
  });
}

/* --------------------------------------------------------------------- */
/* Header behaviour                                                       */
/* --------------------------------------------------------------------- */
function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;
  let lastY = window.scrollY;
  let ticking = false;

  const update = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 40);
    const menuOpen = document.querySelector('[data-mobile-menu].is-open');
    const focusInside = header.contains(document.activeElement);
    if (!menuOpen && !focusInside && y > 240 && y > lastY + 4) header.classList.add('is-hidden');
    else if (y < lastY - 4 || y <= 240) header.classList.remove('is-hidden');
    lastY = y;
    ticking = false;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true },
  );
  header.addEventListener('focusin', () => header.classList.remove('is-hidden'));
  update();
}

/* --------------------------------------------------------------------- */
/* Mobile menu                                                            */
/* --------------------------------------------------------------------- */
let closeMobileMenu = () => {};

function initMobileMenu() {
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-mobile-menu]');
  if (!toggle || !menu) return;

  const setOpen = (open: boolean) => {
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (open) {
      menu.removeAttribute('inert');
      lenis?.stop();
      document.body.style.overflow = 'hidden';
      setTimeout(() => menu.querySelector<HTMLElement>('a')?.focus({ preventScroll: true }), 350);
    } else {
      menu.setAttribute('inert', '');
      lenis?.start();
      document.body.style.overflow = '';
    }
  };
  closeMobileMenu = () => {
    if (menu.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  };

  toggle.addEventListener('click', () => setOpen(!menu.classList.contains('is-open')));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileMenu();
  });
  // Keep focus inside the dialog (toggle stays reachable to close it)
  document.addEventListener('focusin', (e) => {
    if (!menu.classList.contains('is-open')) return;
    const t = e.target as Node;
    if (!menu.contains(t) && t !== toggle) menu.querySelector<HTMLElement>('a')?.focus();
  });
  window.matchMedia('(min-width: 1081px)').addEventListener('change', (mq) => {
    if (mq.matches) setOpen(false);
  });
}

/* --------------------------------------------------------------------- */
/* Scroll reveals, split typography, image reveals, parallax              */
/* --------------------------------------------------------------------- */
function initReveals() {
  // Split headlines: line-by-line masked rise.
  // Hero titles split immediately; all others split lazily just before they scroll into view,
  // which spreads the work out and keeps the main thread free during page load.
  const splitHeading = (el: HTMLElement) => {
    const isHero = el.dataset.split === 'hero';
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      linesClass: 'split-line',
      autoSplit: true,
      onSplit(self) {
        const vars: gsap.TweenVars = {
          yPercent: 115,
          duration: isHero ? 1.5 : 1.25,
          ease: EASE,
          stagger: 0.1,
          delay: Number(el.dataset.delay ?? 0),
        };
        if (isHero) {
          const tween = gsap.from(self.lines, { ...vars, paused: true });
          onIntro(() => tween.play());
          return tween;
        }
        return gsap.from(self.lines, {
          ...vars,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      },
    });
  };
  const lazySplit = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        lazySplit.unobserve(entry.target);
        splitHeading(entry.target as HTMLElement);
      });
    },
    { rootMargin: '0px 0px 35% 0px' },
  );
  document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    if (el.dataset.split === 'hero') splitHeading(el);
    else lazySplit.observe(el);
  });

  // Fades & rises (batched for performance)
  const ups = gsap.utils.toArray<HTMLElement>('[data-reveal="up"], [data-reveal="fade"]');
  ups.forEach((el) => {
    const hero = el.dataset.hero !== undefined;
    const tweenVars: gsap.TweenVars = {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: EASE,
      delay: Number(el.dataset.delay ?? 0),
    };
    gsap.set(el, { y: el.dataset.reveal === 'up' ? 36 : 0 });
    if (hero) {
      onIntro(() => gsap.to(el, tweenVars));
    } else {
      gsap.to(el, { ...tweenVars, scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
    }
  });

  // Staggered children
  document.querySelectorAll<HTMLElement>('[data-reveal-stagger]').forEach((group) => {
    const items = Array.from(group.children) as HTMLElement[];
    gsap.set(items, { y: 28 });
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: EASE,
      stagger: Number(group.dataset.revealStagger || 0.08),
      scrollTrigger: { trigger: group, start: 'top 88%', once: true },
    });
  });

  // Image reveals: clip from bottom while the photo settles from a slight zoom.
  document.querySelectorAll<HTMLElement>('[data-reveal="image"]').forEach((el) => {
    const img = el.querySelector('img');
    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      delay: Number(el.dataset.delay ?? 0),
    });
    tl.to(el, { clipPath: 'inset(0% 0 0 0)', duration: 1.5, ease: 'expo.inOut' });
    if (img && !el.classList.contains('media--parallax')) {
      tl.from(img, { scale: 1.25, duration: 1.9, ease: EASE }, 0);
    }
  });

  // Parallax: images drift inside their frame; [data-speed] elements drift on their own.
  const mm = gsap.matchMedia();
  mm.add('(min-width: 0px)', () => {
    document.querySelectorAll<HTMLElement>('.media--parallax').forEach((frame) => {
      const img = frame.querySelector('img');
      if (!img) return;
      gsap.fromTo(
        img,
        { yPercent: -7 },
        {
          yPercent: 7,
          ease: 'none',
          scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );
    });
  });
  mm.add('(min-width: 900px)', () => {
    document.querySelectorAll<HTMLElement>('[data-speed]').forEach((el) => {
      const speed = Number(el.dataset.speed);
      gsap.to(el, {
        yPercent: speed * -20,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });
  });

  // Inner-page hero: slow drift + fade of the background photo.
  const heroBg = document.querySelector<HTMLElement>('.page-hero__bg img');
  if (heroBg) {
    gsap.fromTo(heroBg, { scale: 1.12 }, { scale: 1, duration: 2.4, ease: EASE, paused: true }).play();
    gsap.to(heroBg, {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: { trigger: '.page-hero', start: 'top top', end: 'bottom top', scrub: true },
    });
  }

  // Scroll-scrubbed word highlight (statements)
  document.querySelectorAll<HTMLElement>('[data-scrub-text]').forEach((el) => {
    const split = SplitText.create(el, { type: 'words', wordsClass: 'scrub-word', tag: 'span', aria: 'none' });
    gsap.fromTo(
      split.words,
      { opacity: 0.16 },
      {
        opacity: 1,
        ease: 'none',
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true },
      },
    );
  });

  // Draw-in rules
  document.querySelectorAll<HTMLElement>('[data-reveal="rule"]').forEach((el) => {
    gsap.from(el, {
      scaleX: 0,
      duration: 1.6,
      ease: 'expo.inOut',
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
    });
  });

  // Count-up numbers
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count);
    const obj = { v: 0 };
    el.textContent = '0';
    gsap.to(obj, {
      v: end,
      duration: 2,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => (el.textContent = Math.round(obj.v).toLocaleString('en-US')),
    });
  });

  // Recalculate once images have their final size
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
}

let introDone = false;
const introQueue: Array<() => void> = [];
document.addEventListener('eo:intro', () => {
  introDone = true;
  introQueue.splice(0).forEach((fn) => fn());
});
function onIntro(fn: () => void) {
  if (introDone) fn();
  else introQueue.push(fn);
}

/* --------------------------------------------------------------------- */
/* Custom cursor                                                          */
/* --------------------------------------------------------------------- */
function initCursor() {
  const el = document.querySelector<HTMLElement>('[data-cursor-el]');
  const ring = el?.querySelector<HTMLElement>('[data-cursor-ring]');
  const dot = el?.querySelector<HTMLElement>('[data-cursor-dot]');
  const label = el?.querySelector<HTMLElement>('[data-cursor-label]');
  if (!el || !ring || !dot || !label) return;

  root.classList.add('has-cursor');
  const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' });
  const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' });
  const dotX = gsap.quickSetter(dot, 'x', 'px');
  const dotY = gsap.quickSetter(dot, 'y', 'px');
  let shown = false;

  window.addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType !== 'mouse') return;
      if (!shown) {
        gsap.set(ring, { x: e.clientX, y: e.clientY });
        el.classList.remove('is-hidden');
        shown = true;
      }
      ringX(e.clientX);
      ringY(e.clientY);
      dotX(e.clientX);
      dotY(e.clientY);
    },
    { passive: true },
  );
  document.documentElement.addEventListener('pointerleave', () => {
    el.classList.add('is-hidden');
    shown = false;
  });

  const interactive = 'a, button, [role="tab"], [role="option"], label, summary, [data-cursor]';
  document.addEventListener('pointerover', (e) => {
    const t = e.target as Element;
    const field = t.closest('input:not([type="checkbox"]):not([type="radio"]), textarea, select');
    if (field) {
      el.classList.add('is-hidden');
      return;
    }
    if (shown) el.classList.remove('is-hidden');
    const labelled = t.closest<HTMLElement>('[data-cursor-label]');
    const hit = t.closest(interactive);
    if (labelled && labelled !== label) {
      label.textContent = labelled.dataset.cursorLabel ?? '';
      el.classList.add('is-label');
      el.classList.remove('is-hover');
    } else {
      el.classList.remove('is-label');
      el.classList.toggle('is-hover', !!hit);
    }
  });
  document.addEventListener('pointerdown', () => gsap.to(ring, { scale: 0.85, duration: 0.15 }));
  document.addEventListener('pointerup', () => gsap.to(ring, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.5)' }));
}

/* --------------------------------------------------------------------- */
/* Magnetic buttons                                                       */
/* --------------------------------------------------------------------- */
function initMagnetic() {
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((btn) => {
    const xTo = gsap.quickTo(btn, 'x', { duration: 0.6, ease: 'power3.out' });
    const yTo = gsap.quickTo(btn, 'y', { duration: 0.6, ease: 'power3.out' });
    btn.addEventListener('pointermove', (e) => {
      const r = btn.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.25);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
    });
    btn.addEventListener('pointerleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.45)' });
    });
  });
}

/* --------------------------------------------------------------------- */
/* Accordions: native <details>, smoothly animated height                 */
/* --------------------------------------------------------------------- */
function initAccordions(motion: boolean) {
  if (!motion) return;
  document.querySelectorAll<HTMLDetailsElement>('.accordion details').forEach((d) => {
    const summary = d.querySelector('summary');
    const body = d.querySelector<HTMLElement>('.accordion__body');
    if (!summary || !body) return;
    summary.addEventListener('click', (e) => {
      e.preventDefault();
      if (d.open) {
        gsap.to(body, {
          height: 0,
          duration: 0.45,
          ease: 'power3.inOut',
          overwrite: true,
          onComplete: () => {
            d.open = false;
            gsap.set(body, { clearProps: 'height' });
            ScrollTrigger.refresh();
          },
        });
      } else {
        d.open = true;
        gsap.fromTo(
          body,
          { height: 0 },
          {
            height: 'auto',
            duration: 0.6,
            ease: 'expo.out',
            overwrite: true,
            onComplete: () => {
              gsap.set(body, { clearProps: 'height' });
              ScrollTrigger.refresh();
            },
          },
        );
      }
    });
  });
}
