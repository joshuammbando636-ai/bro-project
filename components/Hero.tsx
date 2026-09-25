"use client";

import { motion, type Variants } from "framer-motion";
import { siteConfig } from "@/config/site";
import { ButtonLink, OrderButton } from "./Button";
import { Check } from "./Icons";

const ease = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

/** Home hero. Page-load orchestration is Framer Motion; scroll motion lives in GSAP. */
export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-6 md:pb-28 md:pt-14">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:items-center">
        <motion.div variants={container} initial="hidden" animate="show" className="lg:col-span-7">
          <motion.p variants={item} className="eyebrow mb-6">
            Professional &amp; academic writing · Tanzania
          </motion.p>
          <motion.h1 variants={item} className="display">
            Words that get you <span className="text-brand">accepted, funded</span> and hired.
          </motion.h1>
          <motion.p variants={item} className="lead mt-7">
            Research papers, CVs, proposals and business plans, written by experienced Tanzanian writers. Message us,
            get a fixed quote within the hour, and pay with mobile money.
          </motion.p>
          <motion.div variants={item} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <OrderButton size="lg" label="Order on WhatsApp" />
            <ButtonLink href="/services" size="lg" variant="secondary" arrow>
              See our services
            </ButtonLink>
          </motion.div>
          <motion.ul variants={item} className="mt-9 flex flex-col gap-2.5 text-[0.95rem] text-muted sm:flex-row sm:flex-wrap sm:gap-x-6">
            {["Reply within 1 hour", `Pay by ${siteConfig.payments.methods[0]} or Tigo Pesa`, "2 free revisions"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check width={18} height={18} className="text-brand" /> {t}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <HeroVisual />
      </div>
    </section>
  );
}

/**
 * Signature moment: a stack of "documents" where the front page writes itself in.
 * Transform + opacity only.
 */
function HeroVisual() {
  const lines = [
    { w: "92%", strong: true },
    { w: "64%", strong: true },
    { w: "100%" },
    { w: "96%" },
    { w: "100%" },
    { w: "58%" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease, delay: 0.35 }}
      className="relative mx-auto w-full max-w-md lg:col-span-5"
      aria-hidden
    >
      {/* back pages */}
      <div className="absolute inset-0 translate-x-4 translate-y-3 rotate-[5deg] rounded-2xl border border-line bg-brand-soft" />
      <div className="absolute inset-0 -translate-x-3 translate-y-2 -rotate-[4deg] rounded-2xl border border-line bg-surface" />

      {/* front page */}
      <div className="relative rounded-2xl border border-line bg-surface p-7 shadow-[0_30px_60px_-30px_rgba(18,32,29,.35)] sm:p-9">
        <div className="mb-7 flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-brand text-sm font-bold text-brand-contrast">N</span>
          <div className="space-y-1.5">
            <span className="block h-2.5 w-28 rounded-full bg-ink/80" />
            <span className="block h-2 w-20 rounded-full bg-ink/15" />
          </div>
        </div>
        <div className="space-y-3.5">
          {lines.map((l, i) => (
            <motion.span
              key={i}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease, delay: 0.9 + i * 0.12 }}
              style={{ width: l.w, transformOrigin: "left" }}
              className={`block h-2.5 rounded-full ${l.strong ? "bg-ink/80" : "bg-ink/15"}`}
            />
          ))}
        </div>
        <div className="mt-7 grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease, delay: 1.7 + i * 0.1 }}
              className="h-14 rounded-xl bg-brand-soft"
            />
          ))}
        </div>
      </div>

      {/* floating chips */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 2 }}
        className="absolute -right-2 -top-4 flex items-center gap-2 rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-brand-contrast shadow-lg sm:-right-6"
      >
        <Check width={16} height={16} /> Delivered on time
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 2.15 }}
        className="absolute -bottom-5 -left-2 rounded-2xl border border-line bg-surface px-4 py-3 shadow-lg sm:-left-6"
      >
        <p className="text-xs text-muted">Typical CV turnaround</p>
        <p className="text-lg font-extrabold tracking-tight">24–48 hours</p>
      </motion.div>
    </motion.div>
  );
}
