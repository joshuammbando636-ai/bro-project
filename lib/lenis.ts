import type Lenis from "lenis";

/** Holder for the ONE app-wide Lenis instance so overlays can pause scrolling. */
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};
export const getLenis = () => instance;

/** Gentle start, gentle stop: the page visibly travels to the target and settles. */
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Smoothly scroll to an element or a Y position. Duration grows with distance
 * (0.9–2s) so short hops stay quick and long trips don't feel rushed.
 * Instant when Lenis isn't running (reduced motion).
 */
export function smoothScrollTo(target: HTMLElement | number, { offset = -24 }: { offset?: number } = {}) {
  const y = typeof target === "number" ? target : target.getBoundingClientRect().top + window.scrollY + offset;
  if (!instance) {
    window.scrollTo({ top: y });
    return;
  }
  const duration = Math.min(2, Math.max(0.9, 0.6 + Math.abs(y - window.scrollY) / 2500));
  instance.scrollTo(y, { duration, easing: easeInOutCubic });
}

const SCROLL_KEYS = new Set([" ", "PageUp", "PageDown", "Home", "End", "ArrowUp", "ArrowDown"]);
let release: (() => void) | null = null;

/**
 * Block page scrolling (wheel, touch, keys) WITHOUT hiding the scrollbar, so
 * the page doesn't jump and its scrollbar stays put behind an overlay.
 * Input never reaches Lenis. `scrollable` may still scroll natively when its
 * content overflows (e.g. a tall menu on a short phone).
 */
export function lockScroll(scrollable?: HTMLElement | null) {
  unlockScroll();
  const canScroll = (t: EventTarget | null) =>
    !!scrollable && t instanceof Node && scrollable.contains(t) && scrollable.scrollHeight > scrollable.clientHeight;

  const onInput = (e: Event) => {
    e.stopImmediatePropagation();
    if (!canScroll(e.target) && e.cancelable) e.preventDefault();
  };
  const onKey = (e: KeyboardEvent) => {
    if (!SCROLL_KEYS.has(e.key) || canScroll(e.target)) return;
    if ((e.target as HTMLElement).closest?.("button, input, textarea, select")) return;
    e.preventDefault();
  };

  const opts = { capture: true, passive: false } as const;
  window.addEventListener("wheel", onInput, opts);
  window.addEventListener("touchmove", onInput, opts);
  window.addEventListener("keydown", onKey, opts);
  release = () => {
    window.removeEventListener("wheel", onInput, opts);
    window.removeEventListener("touchmove", onInput, opts);
    window.removeEventListener("keydown", onKey, opts);
  };
}
export function unlockScroll() {
  release?.();
  release = null;
}
