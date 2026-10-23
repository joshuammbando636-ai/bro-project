import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/**
 * Editorial intro: a quiet tagline over a hairline, then one large statement.
 * Optional body copy sits to the right and flows across two columns on desktop.
 */
export function Statement({
  tagline,
  title,
  as: Heading = "h2",
  id,
  children,
}: {
  tagline: string;
  title: ReactNode;
  as?: "h1" | "h2";
  id?: string;
  children?: ReactNode;
}) {
  return (
    <>
      <Reveal>
        <p className="border-b border-line pb-5 text-muted">{tagline}</p>
        <Heading
          id={id}
          className="mt-8 max-w-[34ch] text-[clamp(1.85rem,1.2rem+2.4vw,3.25rem)] leading-[1.12] tracking-[-0.03em] md:mt-10"
        >
          {title}
        </Heading>
      </Reveal>
      {children && (
        <Reveal className="mt-8 grid md:mt-20 lg:grid-cols-12">
          {/* Phones keep only the first paragraph (plus any buttons) */}
          <div className="text-[1.0625rem] leading-relaxed lg:col-span-9 lg:col-start-4 md:columns-2 md:gap-10 [&>p+p]:mt-4 max-md:[&>p:not(:first-child)]:hidden">

            {children}
          </div>
        </Reveal>
      )}
    </>
  );
}
