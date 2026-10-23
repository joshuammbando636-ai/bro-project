"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { siteConfig } from "@/config/site";
import { orderProvider, telUrl } from "@/lib/order";
import { ArrowPill } from "./ArrowPill";

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
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pb-14 pt-16 md:pb-32 md:pt-28">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-6xl px-5 sm:px-8"
      >
        <motion.h1 variants={item} className="display max-w-[16ch] text-[clamp(2.75rem,1.2rem+5.6vw,5.75rem)]">
          Clear writing. Fixed quotes. On time, every time.
        </motion.h1>

        <div className="mt-10 grid gap-8 md:mt-24 md:grid-cols-12">
          <motion.p variants={item} className="hidden md:col-span-3 md:block">
            Listen. Draft.
            <br />
            Revise. Deliver.
          </motion.p>
          <motion.div variants={item} className="md:col-span-8 md:col-start-5">
            <p className="text-lg leading-relaxed text-muted md:hidden">
              Research papers, CVs, proposals and business plans. Fixed quote, on time.
            </p>
            <p className="hidden max-w-[62ch] text-lg leading-relaxed md:block">
              At {siteConfig.name}, we write research papers, CVs, proposals and business plans with you at the
              centre. Every project starts with a quick call: we listen, give you a fixed quote, and keep you in the
              loop until the final file lands. Pay with {siteConfig.payments.methods.join(", ")}.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-5 md:mt-10">
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
      className="arrow-host inline-flex items-center gap-3 text-lg"
    >
      <span className="border-b border-ink pb-1">{children}</span>
      <ArrowPill />
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
