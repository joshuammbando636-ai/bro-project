import Link from "next/link";
import type { ReactNode } from "react";
import { orderProvider, telUrl } from "@/lib/order";
import type { ServiceSlug } from "@/config/site";
import { siteConfig } from "@/config/site";
import { ArrowRight, Phone, WhatsAppIcon } from "./Icons";

type Variant = "primary" | "secondary" | "light" | "ghost";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-brand-contrast hover:bg-brand-strong shadow-[0_1px_0_rgba(255,255,255,.15)_inset]",
  secondary: "bg-surface text-ink border border-line hover:border-ink",
  light: "bg-paper text-ink hover:bg-white",
  ghost: "text-ink hover:bg-brand-soft",
};
const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 text-[0.95rem]",
  lg: "min-h-13 px-7 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", extra = "") {
  return [
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap",
    "transition-[background-color,border-color,transform] duration-200 ease-out",
    "active:scale-[0.97] active:duration-100",
    variants[variant],
    sizes[size],
    extra,
  ].join(" ");
}

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  arrow?: boolean;
}

/** Internal link styled as a button */
export function ButtonLink({ href, children, variant, size, className, arrow }: ButtonProps) {
  return (
    <Link href={href} className={buttonClasses(variant, size, className)}>
      {children}
      {arrow && <ArrowRight width={18} height={18} />}
    </Link>
  );
}

interface OrderButtonProps {
  service?: ServiceSlug;
  label?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  note?: string;
}

/**
 * "Order / Book" CTA. The URL comes from `orderProvider` (lib/order.ts), so
 * swapping WhatsApp for a payment gateway later never touches this component.
 */
export function OrderButton({
  service,
  label = "Order on WhatsApp",
  variant = "primary",
  size = "md",
  className,
  note,
}: OrderButtonProps) {
  return (
    <a
      href={orderProvider.getOrderUrl({ service, note })}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonClasses(variant, size, className)}
    >
      <WhatsAppIcon width={18} height={18} />
      {label}
      <span className="sr-only"> (opens WhatsApp in a new tab)</span>
    </a>
  );
}

/** Primary contact action: tap-to-call. */
export function CallButton({
  label = "Call us",
  showNumber = false,
  variant = "primary",
  size = "md",
  className,
}: {
  label?: string;
  showNumber?: boolean;
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  return (
    <a
      href={telUrl()}
      className={buttonClasses(variant, size, className)}
      aria-label={`Call us on ${siteConfig.contact.phone}`}
    >
      <Phone width={18} height={18} />
      {showNumber ? siteConfig.contact.phone : label}
    </a>
  );
}
