import Link from "next/link";
import type { Service } from "@/config/site";
import { OrderButton } from "./Button";
import { Check, Clock, ServiceGlyph } from "./Icons";

/** Full service card (Services page). */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <article
      id={service.slug}
      className="group flex scroll-mt-28 flex-col rounded-card border border-line bg-surface p-6 transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-brand/40 sm:p-8"
    >
      <div className="grid size-12 place-items-center rounded-xl bg-brand-soft text-brand">
        <ServiceGlyph name={service.icon} />
      </div>
      <h3 className="h3 mt-6">{service.title}</h3>
      <p className="mt-3 text-muted">{service.description}</p>

      <ul className="mt-6 space-y-2.5 text-[0.95rem]">
        {service.includes.map((item) => (
          <li key={item} className="flex gap-3">
            <Check width={20} height={20} className="mt-0.5 shrink-0 text-brand" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col gap-5 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted">From</p>
          <p className="text-xl font-extrabold tracking-tight">{service.from}</p>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
            <Clock width={16} height={16} /> {service.turnaround}
          </p>
        </div>
        <OrderButton service={service.slug} label="Order this" />
      </div>
    </article>
  );
}

/** Compact tile (Home strip). */
export function ServiceTile({ service }: { service: Service }) {
  return (
    <Link
      href={`/services#${service.slug}`}
      className="group flex h-full flex-col rounded-card border border-line bg-surface p-6 transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-brand/40"
    >
      <div className="grid size-11 place-items-center rounded-xl bg-brand-soft text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-brand-contrast">
        <ServiceGlyph name={service.icon} />
      </div>
      <h3 className="h3 mt-5">{service.title}</h3>
      <p className="mt-2 text-[0.95rem] text-muted">{service.short}</p>
      <p className="mt-auto pt-5 text-sm font-semibold text-brand">
        From {service.from} <span aria-hidden className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
      </p>
    </Link>
  );
}
