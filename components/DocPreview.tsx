import type { ServiceSlug } from "@/config/site";

/**
 * Designed placeholder "document" preview per service.
 * TODO: replace with real sample images (add `image` to samples in config/site.ts
 * and render them with next/image here).
 */
const bar = (w: string, strong = false) => (
  <span
    className={`block h-[0.4em] rounded-full ${strong ? "bg-ink/80" : "bg-ink/15"}`}
    style={{ width: w }}
  />
);

export function DocPreview({ service, title }: { service: ServiceSlug; title: string }) {
  return (
    <div
      aria-hidden
      className="relative flex h-full w-full flex-col overflow-hidden rounded-[inherit] bg-surface p-[7%] text-[clamp(7px,1.6cqw,13px)]"
    >
      {service === "research-papers" && (
        <div className="flex h-full flex-col gap-[1.1em]">
          <div className="space-y-[0.7em]">
            {bar("85%", true)}
            {bar("60%", true)}
          </div>
          <div className="space-y-[0.6em] pt-[0.5em]">
            {bar("100%")}
            {bar("96%")}
            {bar("100%")}
            {bar("70%")}
          </div>
          <div className="grid flex-1 place-items-end rounded-md bg-brand-soft p-[6%]">
            <div className="flex h-full w-full items-end gap-[6%]">
              {[40, 65, 50, 85, 60].map((h, i) => (
                <span key={i} className="w-full rounded-t-sm bg-brand/70" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          <div className="space-y-[0.6em]">
            {bar("100%")}
            {bar("88%")}
          </div>
        </div>
      )}

      {service === "cvs" && (
        <div className="flex h-full gap-[6%]">
          <div className="w-[34%] space-y-[0.8em] rounded-md bg-brand-soft p-[8%]">
            <span className="mx-auto block aspect-square w-[60%] rounded-full bg-brand/60" />
            {bar("100%", true)}
            {bar("70%")}
            {bar("90%")}
            {bar("60%")}
          </div>
          <div className="flex-1 space-y-[0.9em]">
            {bar("70%", true)}
            {bar("40%")}
            <div className="space-y-[0.6em] pt-[0.6em]">
              {bar("100%")}
              {bar("95%")}
              {bar("80%")}
            </div>
            <div className="space-y-[0.6em] pt-[0.6em]">
              {bar("45%", true)}
              {bar("100%")}
              {bar("90%")}
              {bar("60%")}
            </div>
          </div>
        </div>
      )}

      {service === "proposals" && (
        <div className="flex h-full flex-col gap-[1.2em]">
          <div className="grid flex-[0_0_38%] content-end gap-[0.7em] rounded-md bg-brand p-[8%]">
            <span className="block h-[0.5em] w-[35%] rounded-full bg-white/50" />
            <span className="block h-[0.9em] w-[85%] rounded-full bg-white" />
            <span className="block h-[0.9em] w-[55%] rounded-full bg-white" />
          </div>
          <div className="space-y-[0.6em]">
            {bar("100%")}
            {bar("92%")}
            {bar("100%")}
            {bar("64%")}
          </div>
          <div className="mt-auto grid grid-cols-3 gap-[4%]">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-[3.2em] rounded-md border border-ink/10 bg-paper" />
            ))}
          </div>
        </div>
      )}

      {service === "business-plans" && (
        <div className="flex h-full flex-col gap-[1.1em]">
          <div className="space-y-[0.7em]">
            {bar("75%", true)}
            {bar("45%")}
          </div>
          <div className="grid grid-cols-3 gap-[4%]">
            {["+24%", "TZS", "3 yrs"].map((t) => (
              <span
                key={t}
                className="grid h-[4.2em] place-items-center rounded-md bg-brand-soft font-bold text-brand"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="relative flex-1 rounded-md border border-ink/10 p-[6%]">
            <svg viewBox="0 0 100 50" className="h-full w-full" preserveAspectRatio="none">
              <polyline
                points="0,42 20,34 40,38 60,20 80,14 100,4"
                fill="none"
                stroke="var(--brand)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
          <div className="space-y-[0.6em]">
            {bar("100%")}
            {bar("80%")}
          </div>
        </div>
      )}

      <span className="sr-only">{title}</span>
    </div>
  );
}
