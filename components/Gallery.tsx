"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig, type ServiceSlug } from "@/config/site";
import { lockScroll, unlockScroll } from "@/lib/lenis";
import { DocPreview } from "./DocPreview";
import { OrderButton } from "./Button";
import { ArrowLeft, ArrowRight, Close } from "./Icons";

type Filter = "all" | ServiceSlug;
const serviceTitle = (slug: ServiceSlug) => siteConfig.services.find((s) => s.slug === slug)?.title ?? "";

export function Gallery() {
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<number | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const items = filter === "all" ? siteConfig.samples : siteConfig.samples.filter((s) => s.service === filter);
  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: "All" },
    ...siteConfig.services.map((s) => ({ id: s.slug as Filter, label: s.title })),
  ];

  const close = useCallback(() => {
    setActive(null);
    openerRef.current?.focus();
  }, []);

  return (
    <>
      <div role="group" aria-label="Filter samples by service" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={`min-h-11 shrink-0 rounded-full border px-5 text-[0.95rem] font-semibold transition-colors duration-200 ${
              filter === f.id
                ? "border-brand bg-brand text-brand-contrast"
                : "border-line bg-surface hover:border-ink"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <ul className="mt-8 grid grid-cols-1 gap-5 min-[520px]:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        {items.map((s, i) => (
          <li key={s.id}>
            <button
              type="button"
              onClick={(e) => {
                openerRef.current = e.currentTarget;
                setActive(i);
              }}
              aria-haspopup="dialog"
              className="group block w-full text-left"
            >
              <div className="@container aspect-[4/5] overflow-hidden rounded-card border border-line bg-surface transition-[transform,border-color] duration-300 ease-out group-hover:-translate-y-1 group-hover:border-brand/40">
                <DocPreview service={s.service} title={s.title} />
              </div>
              <p className="eyebrow mt-4">{serviceTitle(s.service)}</p>
              <h3 className="mt-2 text-lg font-bold leading-snug tracking-tight group-hover:text-brand">{s.title}</h3>
              <p className="mt-1 text-sm text-muted">{s.meta}</p>
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {active !== null && items[active] && (
          <Lightbox
            key="lightbox"
            index={active}
            total={items.length}
            sample={items[active]}
            onClose={close}
            onNavigate={(n) => setActive((n + items.length) % items.length)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function Lightbox({
  index,
  total,
  sample,
  onClose,
  onNavigate,
}: {
  index: number;
  total: number;
  sample: (typeof siteConfig.samples)[number];
  onClose: () => void;
  onNavigate: (n: number) => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Lock page scroll while open
  useEffect(() => {
    lockScroll();
    dialogRef.current?.focus();
    return unlockScroll;
  }, []);

  // Keyboard: Esc closes, arrows navigate, Tab is trapped inside the dialog
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key === "ArrowRight") return onNavigate(index + 1);
      if (e.key === "ArrowLeft") return onNavigate(index - 1);
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>("a[href],button:not([disabled])");
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, onClose, onNavigate]);

  const navBtn =
    "grid size-12 place-items-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-white/20";

  return (
    <motion.div
      className="on-dark fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-3 backdrop-blur-sm sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      data-lenis-prevent
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${sample.title} — sample preview`}
        tabIndex={-1}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="grid max-h-full w-full max-w-4xl overflow-y-auto rounded-2xl bg-paper text-ink outline-none md:grid-cols-[1fr_1.1fr]"
      >
        <div className="@container aspect-[4/5] max-h-[55vh] w-full bg-surface md:max-h-none">
          <DocPreview service={sample.service} title={sample.title} />
        </div>
        <div className="flex flex-col p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <p className="eyebrow">{serviceTitle(sample.service)}</p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close preview"
              className="-mr-2 -mt-2 grid size-11 place-items-center rounded-full hover:bg-brand-soft"
            >
              <Close />
            </button>
          </div>
          <h2 className="h3 mt-3 !text-2xl">{sample.title}</h2>
          <p className="mt-1 text-sm text-muted">{sample.meta}</p>
          <p className="mt-5 text-muted">{sample.blurb}</p>
          <p className="mt-4 text-sm text-muted">
            Samples are anonymised. Want to see a full one for your field? Ask us on WhatsApp.
          </p>

          <div className="mt-auto flex flex-col gap-4 pt-8">
            <OrderButton
              service={sample.service}
              label="Order something like this"
              note={`I liked the sample "${sample.title}".`}
              className="w-full"
            />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted" aria-live="polite">
                {index + 1} of {total}
              </span>
              <div className="flex gap-2 text-ink">
                <button type="button" onClick={() => onNavigate(index - 1)} aria-label="Previous sample" className={`${navBtn} !bg-brand-soft !text-ink hover:!bg-line`}>
                  <ArrowLeft />
                </button>
                <button type="button" onClick={() => onNavigate(index + 1)} aria-label="Next sample" className={`${navBtn} !bg-brand-soft !text-ink hover:!bg-line`}>
                  <ArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
