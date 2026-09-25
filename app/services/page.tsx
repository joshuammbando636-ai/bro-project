import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Container, SectionHeading } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { ServiceCard } from "@/components/ServiceCard";
import { OrderButton } from "@/components/Button";
import { CTASection } from "@/components/CTASection";
import { Check } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Services",
  description: "Research papers, CVs and cover letters, proposals and business plans, with clear prices and turnaround times.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="pb-12 pt-10 md:pb-16 md:pt-20">
        <Container>
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-5">Services</p>
            <h1 className="display">Pick what you need. We&apos;ll handle the writing.</h1>
            <p className="lead mt-7">
              Every project starts with a quick chat and a fixed quote. Prices below are starting points; the final price
              depends on length, deadline and complexity.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-[var(--space-section)]">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {siteConfig.services.map((s) => (
              <Reveal key={s.slug} className="h-full [&>*]:h-full">
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Payments */}
      <section className="section bg-brand-soft" aria-labelledby="pay">
        <Container>
          <SectionHeading
            eyebrow="How you pay"
            title={<span id="pay">Simple mobile money. No card needed.</span>}
            intro={siteConfig.payments.note}
          />
          <Reveal stagger className="mt-12 grid gap-5 md:grid-cols-3">
            {siteConfig.payments.methods.map((m) => (
              <div key={m} className="flex items-center gap-4 rounded-card border border-line bg-surface p-6">
                <span className="grid size-11 place-items-center rounded-full bg-brand text-brand-contrast">
                  <Check width={20} height={20} />
                </span>
                <span className="text-lg font-bold tracking-tight">{m}</span>
              </div>
            ))}
          </Reveal>
          <Reveal className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <OrderButton size="lg" label="Ask for a quote" />
            <p className="text-sm text-muted">Not sure which service fits? Book a free 10-minute consultation.</p>
          </Reveal>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
