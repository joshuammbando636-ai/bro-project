import type { ComponentType, SVGProps } from "react";
import { siteConfig } from "@/config/site";
import { orderProvider } from "@/lib/order";
import { InstagramIcon, Mail, WhatsAppIcon } from "./Icons";

interface Social {
  label: string;
  href: string;
  external: boolean;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

/** WhatsApp, Instagram (only once a URL is set in config) and Email. */
function socials(): Social[] {
  const { contact } = siteConfig;
  return [
    { label: "WhatsApp", href: orderProvider.getOrderUrl({}), external: true, Icon: WhatsAppIcon },
    ...(contact.instagram ? [{ label: "Instagram", href: contact.instagram, external: true, Icon: InstagramIcon }] : []),
    { label: "Email", href: `mailto:${contact.email}`, external: false, Icon: Mail },
  ];
}

/**
 * Row of social links for dark surfaces.
 *  - "icon": round icon buttons (menu)
 *  - "text": label with a small icon (footer)
 * Carries .nav-group so hovering one blurs its siblings.
 */
export function SocialLinks({ variant, className = "" }: { variant: "icon" | "text"; className?: string }) {
  return (
    <ul className={`nav-group flex flex-wrap items-center ${variant === "icon" ? "gap-3" : "gap-x-8 gap-y-3"} ${className}`}>
      {socials().map(({ label, href, external, Icon }) => (
        <li key={label}>
          <a
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            aria-label={variant === "icon" ? `${label}${external ? " (opens in a new tab)" : ""}` : undefined}
            className={
              variant === "icon"
                ? "grid size-11 place-items-center rounded-full border border-white/25 transition-colors hover:bg-white/10 outline-none focus-visible:ring-2 focus-visible:ring-white"
                : "inline-flex items-center gap-2 text-lg text-white/80 transition-colors hover:text-white rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-white"
            }
          >
            <Icon width={variant === "icon" ? 20 : 18} height={variant === "icon" ? 20 : 18} />
            {variant === "text" && (
              <>
                {label}
                {external && <span className="sr-only"> (opens in a new tab)</span>}
              </>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}
