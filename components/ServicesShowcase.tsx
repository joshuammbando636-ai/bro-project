"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/config/site";
import { getLenis } from "@/lib/lenis";
import { orderProvider } from "@/lib/order";
import { ArrowRight, Check } from "./Icons";

gsap.registerPlugin(ScrollTrigger);

// Muted looping hero video (no audio track) + the still shown while it loads
const HERO_VIDEO = "/videos/services-hero.mp4";
const HERO_POSTER = "/images/services-hero-poster.webp";

/** Lower panel colour per card (dark neutrals so the white type always reads). */
const PANEL = ["#2a2a2a", "#3b3836", "#1f1f1f", "#46423f"];

/** How much of the card the image keeps once it has settled (the rest is the text panel). */
const MEDIA_SETTLED = "inset(0% 0% 44% 0%)";

/**
 * Services page hero + pinned horizontal gallery.
 *
 * The section pins at the top. Scrolling moves the strip left, so the service
 * cards slide in from the right over the (dimming) hero. In each card the
 * image's bottom edge rises from full height to a fixed line, then the text
 * rises into the panel underneath. Driven by one scrubbed tween; the per-card
 * effects ride on it via ScrollTrigger's containerAnimation.
 *
 * Without JS or with reduced motion the markup already shows the final state,
 * stacked vertically.
 */
export function ServicesShowcase() {
  const pathname = usePathname();
  const sectionRef = useRef<HTMLElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  // Scroll the page so a given card sits at (or as close as possible to) the left edge
  const scrollToCard = (index: number, immediate = false) => {
    const tween = tweenRef.current;
    const st = tween?.scrollTrigger;
    const card = stripRef.current?.children[index + 1] as HTMLElement | undefined;
    let y: number;
    if (st && card) {
      const distance = st.end - st.start;
      y = st.start + Math.min(1, card.offsetLeft / distance) * distance;
    } else {
      const el = card ?? sectionRef.current;
      if (!el) return;
      y = el.getBoundingClientRect().top + window.scrollY;
    }
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(y, { duration: immediate ? 0 : 1.8, immediate });
    else window.scrollTo({ top: y });
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const strip = stripRef.current;
    if (!section || !strip) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const distance = () => strip.scrollWidth - document.documentElement.clientWidth;
      const cards = gsap.utils.toArray<HTMLElement>(".svc-card", strip);

      const tween = gsap.to(strip, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
      tweenRef.current = tween;

      // Hero dims and recedes as the first card covers it
      gsap.to(".svc-hero-content", {
        opacity: 0.3,
        ease: "none",
        scrollTrigger: { containerAnimation: tween, trigger: cards[0], start: "left right", end: "left 15%", scrub: true },
      });
      gsap.to(".svc-hero-shade", {
        opacity: 0.85,
        ease: "none",
        scrollTrigger: { containerAnimation: tween, trigger: cards[0], start: "left right", end: "left 15%", scrub: true },
      });

      cards.forEach((card) => {
        const media = card.querySelector(".svc-media");
        const img = card.querySelector(".svc-img");
        const lines = card.querySelectorAll(".svc-line");

        // Image rectangle: full height → settles above the text panel
        gsap.fromTo(
          media,
          { clipPath: "inset(0% 0% 0% 0%)" },
          {
            clipPath: MEDIA_SETTLED,
            ease: "none",
            scrollTrigger: { containerAnimation: tween, trigger: card, start: "left 100%", end: "left 58%", scrub: true },
          },
        );
        // Slow drift inside the frame for depth
        gsap.fromTo(
          img,
          { scale: 1.25, xPercent: 6 },
          {
            scale: 1.04,
            xPercent: 0,
            ease: "none",
            scrollTrigger: { containerAnimation: tween, trigger: card, start: "left 100%", end: "left 40%", scrub: true },
          },
        );
        // Text rises in once the image has settled
        gsap.set(lines, { opacity: 0, y: 36 });
        ScrollTrigger.create({
          containerAnimation: tween,
          trigger: card,
          start: "left 60%",
          onEnter: () =>
            gsap.to(lines, { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.07, overwrite: true }),
          onLeaveBack: () => gsap.to(lines, { opacity: 0, y: 36, duration: 0.4, ease: "power2.in", overwrite: true }),
        });
      });

      return () => {
        tweenRef.current = null;
      };
    });

    return () => mm.revert();
  }, []);

  // /services#slug: jump to that card on load, and intercept same-page links to it
  useLayoutEffect(() => {
    if (pathname !== "/services") return;
    const slugs = siteConfig.services.map((s) => s.slug as string);

    const fromHash = window.location.hash.slice(1);
    const t = window.setTimeout(() => {
      const i = slugs.indexOf(fromHash);
      if (i >= 0) scrollToCard(i, true);
    }, 250);

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.("a");
      if (!a) return;
      const url = new URL(a.href, window.location.href);
      if (url.pathname !== "/services" || !url.hash) return;
      const i = slugs.indexOf(url.hash.slice(1));
      if (i < 0) return;
      e.preventDefault();
      history.replaceState(null, "", url.hash);
      scrollToCard(i);
    };
    document.addEventListener("click", onClick, true);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("click", onClick, true);
    };
  }, [pathname]);

  return (
    <section
      ref={sectionRef}
      aria-label="Our services"
      data-own-anchors
      className="on-dark relative h-svh overflow-hidden bg-ink text-white motion-reduce:h-auto"
    >
      {/* Hero layer */}
      <div className="absolute inset-0 motion-reduce:relative motion-reduce:h-svh">
        {HERO_VIDEO ? (
          <video
            className="absolute inset-0 size-full object-cover"
            src={HERO_VIDEO}
            poster={HERO_POSTER}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
          />
        ) : (
          <Image src={HERO_POSTER} alt="" fill priority sizes="100vw" className="object-cover" />
        )}
        <div className="svc-hero-shade absolute inset-0 bg-black opacity-55" aria-hidden />

        <div className="svc-hero-content relative mx-auto h-full max-w-6xl px-5 sm:px-8">
          <div className="absolute inset-x-5 top-[52%] grid grid-cols-2 items-center gap-4 text-[0.95rem] sm:inset-x-8 md:grid-cols-12">
            <p className="md:col-span-3">Academic + Professional</p>
            <p className="md:col-span-4">A deadline-first approach</p>
            <button
              type="button"
              onClick={() => scrollToCard(0)}
              className="group col-span-2 inline-flex items-center gap-3 justify-self-start rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white md:col-span-5 md:justify-self-end"
            >
              Scroll to explore
              <span className="grid size-9 place-items-center rounded-full border border-white/70 transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight width={16} height={16} />
              </span>
            </button>
          </div>

          <h1 className="display absolute inset-x-5 bottom-[9%] max-w-[18ch] text-[clamp(2.5rem,1.2rem+4.6vw,5.5rem)] sm:inset-x-8">
            We&apos;re a deadline-driven writing studio for study, work and business.
          </h1>
        </div>
      </div>

      {/* Horizontal strip: a viewport-wide spacer, then the cards */}
      <div
        ref={stripRef}
        className="absolute inset-y-0 left-0 flex will-change-transform motion-reduce:relative motion-reduce:flex-col"
      >
        <div className="w-screen shrink-0 motion-reduce:hidden" aria-hidden />
        {siteConfig.services.map((s, i) => (
          <article
            key={s.slug}
            id={s.slug}
            className="svc-card relative h-full w-[86vw] shrink-0 overflow-hidden md:w-[46vw] lg:w-[44vw] motion-reduce:h-[90svh] motion-reduce:w-full"
            style={{ backgroundColor: PANEL[i % PANEL.length] }}
          >
            <div className="svc-media absolute inset-0" style={{ clipPath: MEDIA_SETTLED }}>
              <Image
                src={s.image}
                alt={s.title}
                fill
                sizes="(min-width: 1024px) 44vw, (min-width: 768px) 46vw, 86vw"
                className="svc-img object-cover"
              />
            </div>

            <div className="absolute inset-x-0 bottom-0 flex h-[44%] flex-col justify-end gap-4 p-6 sm:p-8 lg:p-10">
              <p className="svc-line text-sm text-white/55">
                {String(i + 1).padStart(2, "0")} / {String(siteConfig.services.length).padStart(2, "0")} · {s.turnaround}
              </p>
              <h2 className="svc-line text-[clamp(2rem,3.4vw,3.5rem)] leading-none tracking-[-0.035em]">{s.title}</h2>
              <ul className="svc-line hidden gap-x-6 gap-y-1.5 text-[0.95rem] text-white/80 sm:grid sm:grid-cols-2">
                {s.includes.map((item) => (
                  <li key={item} className="flex gap-2">
                    <Check width={16} height={16} className="mt-1 shrink-0 text-white/60" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="svc-line text-[0.95rem] text-white/80 sm:hidden">{s.short}</p>
              <a
                href={orderProvider.getOrderUrl({ service: s.slug })}
                target="_blank"
                rel="noopener noreferrer"
                className="svc-line group inline-flex items-center gap-3 self-start rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span className="border-b border-white pb-1">Order on WhatsApp</span>
                <span className="grid size-8 place-items-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight width={14} height={14} />
                </span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
