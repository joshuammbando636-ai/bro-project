import { siteConfig } from "@/config/site";
import { Reveal } from "./Reveal";
import { Quote } from "./Icons";

/** Stats row + testimonials. All figures/quotes are PLACEHOLDERS (see config/site.ts). */
export function StatsRow() {
  return (
    <Reveal stagger className="grid grid-cols-2 gap-x-6 gap-y-10 border-y border-line py-10 md:grid-cols-4">
      {siteConfig.stats.map((s) => (
        <div key={s.label}>
          <p className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">{s.value}</p>
          <p className="mt-2 text-sm text-muted">{s.label}</p>
        </div>
      ))}
    </Reveal>
  );
}

export function Testimonials() {
  return (
    <Reveal stagger className="grid gap-5 md:grid-cols-3">
      {siteConfig.testimonials.map((t) => (
        <figure key={t.name} className="flex flex-col rounded-card border border-line bg-surface p-7">
          <Quote width={28} height={28} className="text-brand" />
          <blockquote className="mt-4 flex-1 text-[1.05rem] leading-relaxed">{t.quote}</blockquote>
          <figcaption className="mt-6 border-t border-line pt-4">
            <span className="block font-semibold">{t.name}</span>
            <span className="text-sm text-muted">{t.role}</span>
          </figcaption>
        </figure>
      ))}
    </Reveal>
  );
}
