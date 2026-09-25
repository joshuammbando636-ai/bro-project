"use client";

import { useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Faq } from "@/config/site";
import { Plus } from "./Icons";

/**
 * Accessible accordion (WAI-ARIA pattern): buttons with aria-expanded/aria-controls,
 * Enter/Space toggle natively, plus Arrow Up/Down, Home and End move between headers.
 */
export function Accordion({ items, defaultOpen = 0 }: { items: Faq[]; defaultOpen?: number | null }) {
  const uid = useId();
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const last = items.length - 1;
    const next =
      e.key === "ArrowDown" ? (i === last ? 0 : i + 1)
      : e.key === "ArrowUp" ? (i === 0 ? last : i - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    buttons.current[next]?.focus();
  };

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${uid}-btn-${i}`;
        const panelId = `${uid}-panel-${i}`;
        return (
          <div key={item.q}>
            <h3>
              <button
                ref={(el) => {
                  buttons.current[i] = el;
                }}
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className="group flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left text-lg font-semibold tracking-tight transition-colors hover:text-brand sm:text-xl"
              >
                <span>{item.q}</span>
                <span
                  aria-hidden
                  className={`grid size-9 shrink-0 place-items-center rounded-full border border-line transition-[transform,background-color,color] duration-300 ease-out group-hover:border-brand ${
                    isOpen ? "rotate-45 bg-brand text-brand-contrast" : "bg-surface"
                  }`}
                >
                  <Plus width={18} height={18} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[65ch] pb-6 pr-14 text-muted">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
