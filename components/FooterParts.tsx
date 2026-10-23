"use client";

import { useState } from "react";
import Link from "next/link";
import { smoothScrollTo } from "@/lib/lenis";
import { ArrowUp, Plus } from "./Icons";

/**
 * Footer link row: "Our services +" opens the four services underneath,
 * the rest are quiet grey links.
 */
export function FooterNav({
  services,
  links,
}: {
  services: { href: string; label: string }[];
  links: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const ring = "rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-white";

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-base md:gap-x-8 md:text-lg">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="footer-services"
          className={`inline-flex items-center gap-2 text-white ${ring}`}
        >
          Our services
          <Plus
            width={18}
            height={18}
            className={`transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? "rotate-45" : ""}`}
          />
        </button>
        {links.map((l) => (
          <Link key={l.href} href={l.href} className={`text-white/50 transition-colors hover:text-white ${ring}`}>
            {l.label}
          </Link>
        ))}
      </div>

      <div
        id="footer-services"
        className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden" inert={!open}>
          <ul className="nav-group flex flex-col gap-1 pt-6 md:pt-8">
            {services.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className={`inline-block text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.15] tracking-[-0.03em] ${ring}`}
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/** Smooth, eased scroll back to the top. */
export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => smoothScrollTo(0)}
      className="group inline-flex items-center gap-2 rounded-sm text-white outline-none focus-visible:ring-2 focus-visible:ring-white"
    >
      Back to top
      <ArrowUp width={16} height={16} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
}
