"use client";

import { useLayoutEffect, useRef, type MouseEvent, type ReactNode, type RefObject } from "react";
import { useRouter } from "next/navigation";
import { motion, type Variants } from "framer-motion";
import gsap from "gsap";
import { siteConfig } from "@/config/site";
import { orderProvider, telUrl } from "@/lib/order";
import { ArrowRight } from "./Icons";

const ease = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease } },
};

/**
 * Home hero: a big regular-weight statement, then a quiet two-column row.
 * On desktop an "Explore" circle follows the cursor; clicking empty hero space
 * goes to /services (the links inside keep their own behaviour).
 */
export function Hero() {
  const router = useRouter();
  const areaRef = useRef<HTMLElement>(null);

  const onClick = (e: MouseEvent) => {
    if ((e.target as HTMLElement).closest("a, button")) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    router.push("/services");
  };

  return (
    <section ref={areaRef} onClick={onClick} className="relative overflow-hidden pb-20 pt-16 md:pb-32 md:pt-28">
      <ExploreCursor areaRef={areaRef} />
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-6xl px-5 sm:px-8"
      >
        <motion.h1 variants={item} className="display max-w-[16ch] text-[clamp(2.75rem,1.2rem+5.6vw,5.75rem)]">
          Clear writing. Fixed quotes. On time, every time.
        </motion.h1>

        <div className="mt-16 grid gap-8 md:mt-24 md:grid-cols-12">
          <motion.p variants={item} className="md:col-span-3">
            Listen. Draft.
            <br />
            Revise. Deliver.
          </motion.p>
          <motion.div variants={item} className="md:col-span-8 md:col-start-5">
            <p className="max-w-[62ch] text-lg leading-relaxed">
              At {siteConfig.name}, we write research papers, CVs, proposals and business plans with you at the
              centre. Every project starts with a quick call: we listen, give you a fixed quote, and keep you in the
              loop until the final file lands. Pay with {siteConfig.payments.methods.join(", ")}.
            </p>
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-5">
              <ArrowLink href={telUrl()}>Call us</ArrowLink>
              <ArrowLink href={orderProvider.getOrderUrl({})} external>
                WhatsApp us
              </ArrowLink>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/** Underlined text link with a round grey arrow chip (LPAS "More about us" style). */
function ArrowLink({ href, external, children }: { href: string; external?: boolean; children: ReactNode }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group inline-flex items-center gap-3 text-lg"
    >
      <span className="border-b border-ink pb-1">{children}</span>
      <span className="grid size-9 place-items-center rounded-full bg-line transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
        <ArrowRight width={16} height={16} />
      </span>
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}

/**
 * Translucent "Explore" circle that trails the cursor inside the hero.
 * Fine pointers only, off for reduced motion, shrinks away over links.
 * Transform + opacity only, driven by gsap.quickTo.
 */
function ExploreCursor({ areaRef }: { areaRef: RefObject<HTMLElement | null> }) {
  const circleRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const area = areaRef.current;
    const circle = circleRef.current;
    if (!area || !circle) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.set(circle, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 });
    const xTo = gsap.quickTo(circle, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(circle, "y", { duration: 0.6, ease: "power3" });
    let shown = false;

    const show = (on: boolean) => {
      if (on === shown) return;
      shown = on;
      gsap.to(circle, { scale: on ? 1 : 0, opacity: on ? 1 : 0, duration: 0.4, ease: "power3.out", overwrite: "auto" });
    };
    const onMove = (e: PointerEvent) => {
      const r = area.getBoundingClientRect();
      xTo(e.clientX - r.left);
      yTo(e.clientY - r.top);
      show(!(e.target as HTMLElement).closest("a, button"));
    };
    const onLeave = () => show(false);

    area.addEventListener("pointermove", onMove);
    area.addEventListener("pointerleave", onLeave);
    return () => {
      area.removeEventListener("pointermove", onMove);
      area.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(circle);
    };
  }, [areaRef]);

  return (
    <div
      ref={circleRef}
      aria-hidden
      className="pointer-events-none absolute left-0 top-0 z-10 grid size-36 place-items-center rounded-full bg-ink/45 text-lg text-white opacity-0 backdrop-blur-sm"
    >
      Explore
    </div>
  );
}
