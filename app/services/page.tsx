import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Container, SectionHeading } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { ServicesShowcase } from "@/components/ServicesShowcase";
import { CallButton, OrderButton } from "@/components/Button";
import { Check } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Services",
  description: "Research papers, CVs and cover letters, proposals and business plans, with clear turnaround times.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesShowcase />

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
                <span className="text-lg font-medium tracking-tight">{m}</span>
              </div>
            ))}
          </Reveal>
          <Reveal className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <CallButton size="lg" showNumber />
            <OrderButton size="lg" variant="secondary" label="WhatsApp us" />
            <p className="text-sm text-muted">Not sure which service fits? Call and we&apos;ll point you to the right one.</p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
