import Link from "next/link";
import { type Service } from "@/config/site";
import { ArrowPill } from "./ArrowPill";
import { MediaCard } from "./MediaCard";

/** Larger "hero" card for the home services grid: text + the service image. */
export function ServiceFeatureCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="arrow-host group grid gap-6 rounded-card border border-line bg-surface p-5 transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-brand/40 active:scale-[0.98] sm:p-8 md:grid-cols-2 md:items-center md:gap-10"
    >
      <div>
        <h3 className="h3">{service.title}</h3>
        <p className="mt-3 text-muted md:hidden">{service.short}</p>
        <p className="mt-3 hidden text-muted md:block">{service.description}</p>
        <p className="mt-6 inline-flex items-center gap-3 text-sm font-semibold text-brand">
          Learn more
          <ArrowPill size={32} />
        </p>
      </div>
      <MediaCard src={service.image} title={service.title} className="aspect-4/3" />
    </Link>
  );
}

/**
 * Compact card for the home services grid. Phones: one slim row (thumbnail,
 * title, arrow). From sm up: image on top, then a label and a link.
 */
export function ServiceTextCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="arrow-host group flex h-full items-center gap-4 rounded-card border border-line bg-surface p-3 transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-brand/40 active:scale-[0.98] sm:flex-col sm:items-stretch sm:gap-0 sm:p-4"
    >
      <MediaCard
        src={service.image}
        title={service.title}
        caption=""
        sizes="(min-width: 640px) 33vw, 80px"
        className="aspect-square w-20 shrink-0 rounded-xl sm:aspect-4/3 sm:w-auto sm:rounded-[1.25rem]"
      />
      <div className="flex flex-1 items-center justify-between gap-3 sm:flex-col sm:items-stretch sm:px-2 sm:pb-2">
        <h3 className="h3 sm:mt-5">{service.title}</h3>
        <p className="mt-2 hidden text-[0.95rem] text-muted sm:block">{service.short}</p>
        <p className="flex items-center gap-3 text-sm font-semibold text-brand sm:mt-auto sm:pt-5">
          <span className="hidden sm:inline">Learn more</span>
          <ArrowPill size={32} />
        </p>
      </div>
    </Link>
  );
}
