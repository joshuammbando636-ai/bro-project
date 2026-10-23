import type { CSSProperties } from "react";
import { ArrowRight } from "./Icons";

/**
 * Round arrow badge for links and buttons. Hovering the badge itself stretches
 * it, slowly fills it from the side the cursor came in and flies the arrow
 * through. Put `arrow-host` on the clickable parent so keyboard focus shows the
 * fill too (styles: .arrow-pill in globals.css).
 *
 * Tones: light (grey on light pages), glass (on photos), outline (on dark video).
 */
export function ArrowPill({
  size = 36,
  tone = "light",
  className = "",
}: {
  size?: number;
  tone?: "light" | "glass" | "outline";
  className?: string;
}) {
  const icon = Math.round(size * 0.44);
  return (
    <span
      aria-hidden
      className={`arrow-pill ${tone === "light" ? "" : `arrow-pill--${tone}`} ${className}`}
      style={{ "--pill-h": `${size / 16}rem` } as CSSProperties}
    >
      <ArrowRight width={icon} height={icon} />
    </span>
  );
}
