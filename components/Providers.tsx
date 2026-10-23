"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { MotionConfig } from "framer-motion";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis, setLenis, smoothScrollTo } from "@/lib/lenis";

gsap.registerPlugin(ScrollTrigger);

/**
 * App-wide motion setup, mounted once in the root layout:
 *  - ONE Lenis instance, driven by GSAP's ticker so ScrollTrigger stays in sync
 *  - Framer Motion honours prefers-reduced-motion everywhere
 */
function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1 });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  // Start every page at the top (and let Lenis + ScrollTrigger know). Arriving
  // with a #hash (e.g. /#faq from another page), glide down to it from the top.
  const pathname = usePathname();
  useEffect(() => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
    const t = setTimeout(() => ScrollTrigger.refresh(), 120);
    const el = hashTarget(window.location.hash);
    const glide = el ? setTimeout(() => smoothScrollTo(el), 350) : undefined;
    return () => {
      clearTimeout(t);
      clearTimeout(glide);
    };
  }, [pathname]);

  // Same-page #links (How it works, Questions…): smooth, eased scroll instead of a jump.
  // Capture phase so it runs before Next's <Link> handler (which then skips navigating).
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest?.("a[href*='#']") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank") return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) return;
      const el = hashTarget(url.hash);
      if (!el) return;
      e.preventDefault();
      history.pushState(null, "", url.hash);
      smoothScrollTo(el);
    };
    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, []);

  return null;
}

/**
 * Arrow pills fill from the side the cursor enters (and drain toward the side
 * it leaves): record which half of the pill the pointer crossed. One delegated
 * listener for the whole site; see .arrow-pill in globals.css.
 */
function ArrowPillDirection() {
  useEffect(() => {
    // Touch screens: no hover fill to steer. An empty touch listener lets iOS
    // Safari apply :active, which drives the tap fill instead.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const noop = () => {};
      document.addEventListener("touchstart", noop, { passive: true });
      return () => document.removeEventListener("touchstart", noop);
    }
    const onCross = (e: PointerEvent) => {
      const pill = (e.target as Element).closest?.<HTMLElement>(".arrow-pill");
      if (!pill || (e.relatedTarget instanceof Node && pill.contains(e.relatedTarget))) return;
      const r = pill.getBoundingClientRect();
      pill.dataset.from = e.clientX > r.left + r.width / 2 ? "right" : "left";
    };
    document.addEventListener("pointerover", onCross);
    document.addEventListener("pointerout", onCross);
    return () => {
      document.removeEventListener("pointerover", onCross);
      document.removeEventListener("pointerout", onCross);
    };
  }, []);

  return null;
}

/** Element for a #hash, unless it lives in a section that handles its own anchors (data-own-anchors). */
function hashTarget(hash: string) {
  if (hash.length < 2) return null;
  const el = document.getElementById(decodeURIComponent(hash.slice(1)));
  return el && !el.closest("[data-own-anchors]") ? el : null;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      <ArrowPillDirection />
      {children}
    </MotionConfig>
  );
}
