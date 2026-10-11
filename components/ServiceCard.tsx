import Link from "next/link";
import { type Service } from "@/config/site";
import { ArrowRight } from "./Icons";
import { MediaCard } from "./MediaCard";

/** Larger "hero" card for the home services grid: text + the service image. */
export function ServiceFeatureCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services#${service.slug}`}
      className="group grid gap-8 rounded-card border border-line bg-surface p-6 transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-brand/40 sm:p-8 md:grid-cols-2 md:items-center md:gap-10"
    >
      <div>
        <h3 className="h3">{service.title}</h3>
        <p className="mt-3 text-muted">{service.description}</p>
        <p className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
          Learn more
          <ArrowRight width={16} height={16} className="transition-transform duration-200 group-hover:translate-x-1" />
        </p>
      </div>
      <MediaCard src={service.image} title={service.title} className="aspect-4/3" />
    </Link>
  );
}

/** Compact card for the home services grid: image on top, then a label and a link. */
export function ServiceTextCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services#${service.slug}`}
      className="group flex h-full flex-col rounded-card border border-line bg-surface p-4 transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-brand/40"
    >
      <MediaCard
        src={service.image}
        title={service.title}
        caption=""
        sizes="(min-width: 640px) 33vw, 100vw"
        className="aspect-4/3"
      />
      <div className="flex flex-1 flex-col px-2 pb-2">
        <h3 className="h3 mt-5">{service.title}</h3>
        <p className="mt-2 text-[0.95rem] text-muted">{service.short}</p>
        <p className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand">
          Learn more
          <ArrowRight width={16} height={16} className="transition-transform duration-200 group-hover:translate-x-1" />
        </p>
      </div>
    </Link>
  );
}
