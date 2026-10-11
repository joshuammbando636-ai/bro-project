"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion, type Transition } from "framer-motion";
import gsap from "gsap";
import { siteConfig } from "@/config/site";
import { lockScroll, unlockScroll } from "@/lib/lenis";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";

const label = "text-lg text-white/55";
const ring = "rounded-md outline-none focus-visible:ring-2 focus-visible:ring-white";

/** Lines → X: the bars meet in the middle first, then rotate (and the reverse). */
const MORPH: Transition = { duration: 0.55, times: [0, 0.45, 1], ease: [0.65, 0, 0.35, 1] };
const WORD: Transition = { duration: 0.45, ease: [0.16, 1, 0.3, 1] };
const OPEN_CLIP = "inset(0px 0px 0px 0px round 0px)";

/**
 * Full-screen frosted menu that grows out of the Menu pill (top right) toward
 * the bottom-left, then its content rises in. Closing shrinks it back into the
 * pill. Interruptible: every toggle tweens from wherever it currently is.
 * The page keeps its own scrollbar; scrolling is blocked, not hidden (lib/lenis).
 * Hovering a link blurs its siblings in the same group (.nav-group, globals.css).
 */
export function Nav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduce = useReducedMotion() ?? false;

  const buttonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const everOpened = useRef(false);

  const close = useCallback(() => setIsOpen(false), []);

  // Close on navigation (state reset during render, per React docs)
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setIsOpen(false);
  }

  useEffect(() => {
    if (isOpen) everOpened.current = true;
    if (!everOpened.current) return;
    const nav = navRef.current;
    const panel = panelRef.current;
    const pill = buttonRef.current;
    if (!nav || !panel || !pill) return;
    const items = nav.querySelectorAll(".nav-item");
    const show = () => gsap.set(nav, { visibility: "visible", pointerEvents: "auto" });
    const hide = () => gsap.set(nav, { visibility: "hidden", pointerEvents: "none" });
    // The sheet's collapsed shape: exactly the pill's box
    const pillClip = () => {
      const b = pill.getBoundingClientRect();
      const w = document.documentElement.clientWidth;
      const h = window.innerHeight;
      return `inset(${b.top}px ${w - b.right}px ${h - b.bottom}px ${b.left}px round 10px)`;
    };

    gsap.killTweensOf([panel, ...items]);

    if (shouldReduce) {
      gsap.set(panel, { clipPath: "none" });
      gsap.set(items, { opacity: 1, y: 0 });
      if (isOpen) show();
      else hide();
      return;
    }

    if (isOpen) {
      if (nav.style.visibility !== "visible") gsap.set(panel, { clipPath: pillClip() });
      show();
      gsap.to(panel, { clipPath: OPEN_CLIP, duration: 0.9, ease: "power3.inOut" });
      gsap.fromTo(
        items,
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.05, delay: 0.35 },
      );
    } else {
      gsap.to(items, { opacity: 0, y: -10, duration: 0.25, ease: "power2.in" });
      gsap.to(panel, { clipPath: pillClip(), duration: 0.75, ease: "power3.inOut", delay: 0.1, onComplete: hide });
    }
  }, [isOpen, shouldReduce]);

  // Escape closes and returns focus to the pill
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  // Block page scroll while open (the menu itself may scroll on short screens)
  useEffect(() => {
    if (!isOpen) return;
    lockScroll(panelRef.current);
    return unlockScroll;
  }, [isOpen]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const { contact } = siteConfig;
  const barColor = `transition-colors duration-300 ${isOpen ? "bg-ink" : "bg-white"}`;

  return (
    <>
      {/* Menu / Close pill */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        aria-expanded={isOpen}
        aria-controls="site-nav"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className={`fixed right-3 top-3 z-70 flex items-center gap-2 rounded-[10px] border p-[3px] pr-2.5 backdrop-blur-md transition-[background-color,border-color] duration-300 outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 sm:right-5 sm:top-5 ${
          isOpen ? "border-white bg-white" : "border-white/25 bg-[rgb(40_40_40/0.5)] shadow-[0_4px_20px_rgba(0,0,0,.15)]"
        }`}
      >
        <span
          className="relative grid h-6 w-[46px] place-items-center overflow-hidden rounded-[7px] bg-ink text-[13px] font-medium text-white"
          aria-hidden
        >
          <AnimatePresence initial={false} mode="popLayout">
            <motion.span
              key={isOpen ? "close" : "menu"}
              initial={{ y: "100%", opacity: 0, filter: "blur(3px)" }}
              animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
              exit={{ y: "-100%", opacity: 0, filter: "blur(3px)" }}
              transition={WORD}
            >
              {isOpen ? "Close" : "Menu"}
            </motion.span>
          </AnimatePresence>
        </span>
        <span className="relative block h-[9px] w-[18px]" aria-hidden>
          <motion.span
            className={`absolute left-0 top-0 h-[1.5px] w-full rounded-full ${barColor}`}
            initial={false}
            animate={isOpen ? { y: [0, 3.75, 3.75], rotate: [0, 0, 45] } : { y: [3.75, 3.75, 0], rotate: [45, 0, 0] }}
            transition={MORPH}
          />
          <motion.span
            className={`absolute bottom-0 left-0 h-[1.5px] w-full rounded-full ${barColor}`}
            initial={false}
            animate={isOpen ? { y: [0, -3.75, -3.75], rotate: [0, 0, -45] } : { y: [-3.75, -3.75, 0], rotate: [-45, 0, 0] }}
            transition={MORPH}
          />
        </span>
      </button>

      {/* Overlay: always mounted, GSAP owns visibility */}
      <div
        ref={navRef}
        id="site-nav"
        aria-hidden={!isOpen}
        className="fixed inset-0 z-68"
        style={{ visibility: "hidden", pointerEvents: "none" }}
      >
        <div
          ref={panelRef}
          className="on-dark no-scrollbar absolute inset-0 overflow-y-auto overscroll-contain bg-[rgb(30_30_30/0.6)] text-white backdrop-blur-[40px] backdrop-saturate-150"
        >
          <div className="mx-auto flex min-h-full max-w-6xl flex-col px-5 pb-10 sm:px-8">
            <div className="nav-item flex h-20 items-center">
              <Logo inverted className={ring} />
            </div>
            <div className="nav-item mt-8 border-t border-white/15" />

            <nav aria-label="Main navigation" className="mt-8 grid flex-1 gap-12 lg:grid-cols-12">
              <div className="nav-item lg:col-span-7">
                <p className={label}>Our services</p>
                <ul className="nav-group mt-4">
                  {siteConfig.services.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services#${s.slug}`}
                        onClick={close}
                        className={`inline-block py-1 text-[clamp(2.25rem,4.2vw,3.75rem)] leading-[1.12] tracking-[-0.03em] ${ring}`}
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-12 lg:col-span-4 lg:col-start-9">
                <div className="nav-item">
                  <p className={label}>Explore</p>
                  <ul className="nav-group mt-4">
                    {siteConfig.nav.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={close}
                          aria-current={isActive(item.href) ? "page" : undefined}
                          className={`inline-block py-0.5 text-[clamp(1.75rem,2.6vw,2.375rem)] leading-[1.2] tracking-[-0.025em] ${ring}`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="nav-item">
                  <p className={label}>Good to know</p>
                  <ul className="nav-group mt-4">
                    {[
                      { label: "How it works", href: "/#process" },
                      { label: "Questions", href: "/#faq" },
                    ].map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={close}
                          className={`inline-block py-0.5 text-[clamp(1.75rem,2.6vw,2.375rem)] leading-[1.2] tracking-[-0.025em] ${ring}`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </nav>

            <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:items-end">
              <SocialLinks variant="icon" className="nav-item lg:col-span-7" />

              <div className="nav-item lg:col-span-4 lg:col-start-9">
                <p className="text-lg font-medium">{contact.location.city}</p>
                <p className="mt-3 text-white/80">{contact.location.country}</p>
                <p className="mt-3">
                  <a href={contact.phoneHref} className={ring}>
                    {contact.phone}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
