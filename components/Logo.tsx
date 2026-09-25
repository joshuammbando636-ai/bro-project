import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Feather } from "./Icons";

// TODO: swap in real brand — replace the mark + wordmark with the real logo
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 font-extrabold tracking-tight ${className}`} aria-label={`${siteConfig.name} — home`}>
      <span className="grid size-9 place-items-center rounded-xl bg-brand text-brand-contrast">
        <Feather width={20} height={20} />
      </span>
      <span className="text-lg">{siteConfig.name}</span>
    </Link>
  );
}
