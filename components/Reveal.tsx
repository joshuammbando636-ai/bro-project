"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: ReactNode;
  delay?: number;
  /** Reveal direct children one after another instead of the wrapper as a whole */
  stagger?: boolean;
  className?: string;
}

/**
 * THE scroll-reveal recipe. Used everywhere so the motion feels intentional.
 * 24px rise + fade, 0.7s, power3.out, triggers at 85% of the viewport.
 * Only transform + opacity. Respects prefers-reduced-motion. Cleans up on unmount.
 */
export function Reveal({ children, delay = 0, stagger = false, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(stagger ? Array.from(el.children) : el, {
        y: 24,
        opacity: 0,
        duration: 0.7,
        delay,
        ease: "power3.out",
        stagger: stagger ? 0.08 : 0,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [delay, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
