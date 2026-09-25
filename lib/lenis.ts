import type Lenis from "lenis";

/** Holder for the ONE app-wide Lenis instance so overlays can pause scrolling. */
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};
export const getLenis = () => instance;

export function lockScroll() {
  instance?.stop();
  document.documentElement.style.overflow = "hidden";
}
export function unlockScroll() {
  instance?.start();
  document.documentElement.style.overflow = "";
}
