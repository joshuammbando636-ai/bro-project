import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

/**
 * Asymmetric section heading: title hangs left, intro sits to the right on desktop.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  action,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <Reveal className="grid gap-5 md:grid-cols-12 md:items-end md:gap-10">
      <div className="md:col-span-7">
        <p className="eyebrow mb-4">{eyebrow}</p>
        <h2 className="h2">{title}</h2>
      </div>
      {(intro || action) && (
        <div className="flex flex-col items-start gap-5 md:col-span-5">
          {intro && <p className="lead">{intro}</p>}
          {action}
        </div>
      )}
    </Reveal>
  );
}
