"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/config/site";
import { Reveal } from "./Reveal";

gsap.registerPlugin(ScrollTrigger);

/**
 * How an order works. The vertical line fills as you scroll (scrubbed, scaleY only).
 * With reduced motion it simply stays filled. No pinning, so it's cheap on phones.
 */
export function ProcessSteps() {
  const list = useRef<HTMLOListElement>(null);
  const fill = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        fill.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: list.current, start: "top 65%", end: "bottom 70%", scrub: 0.6 },
        },
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <ol ref={list} className="relative space-y-8 pl-16 sm:pl-20 md:space-y-12">
      <span aria-hidden className="absolute bottom-3 left-[1.375rem] top-3 w-0.5 bg-line sm:left-[1.625rem]" />
      <span
        ref={fill}
        aria-hidden
        className="absolute bottom-3 left-[1.375rem] top-3 w-0.5 origin-top bg-brand sm:left-[1.625rem]"
      />
      {siteConfig.process.map((step, i) => (
        <li key={step.title} className="relative">
          <span className="absolute -left-16 top-0 grid size-12 place-items-center rounded-full border-2 border-brand bg-paper text-lg font-medium text-brand sm:-left-20 sm:size-14">
            {i + 1}
          </span>
          <Reveal>
            <h3 className="h3 pt-2.5">{step.title}</h3>
            <p className="mt-2 hidden max-w-[55ch] text-muted md:block">{step.body}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
