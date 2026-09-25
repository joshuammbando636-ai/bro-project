import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Accordion } from "@/components/Accordion";
import { ButtonLink, OrderButton } from "@/components/Button";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about pricing, payment by mobile money, turnaround times, revisions and privacy.",
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: siteConfig.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="section pt-10 md:pt-20">
        <Container className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow mb-5">FAQ</p>
            <h1 className="display !text-[clamp(2.4rem,1.3rem+4.5vw,4.5rem)]">Questions, answered.</h1>
            <p className="lead mt-7">Can&apos;t find what you&apos;re looking for? Ask us directly. We usually reply within the hour.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <OrderButton label="Ask on WhatsApp" />
              <ButtonLink href="/contact" variant="secondary">
                Contact form
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-7">
            <Accordion items={siteConfig.faqs} />
          </Reveal>
        </Container>
      </section>
      <CTASection />
    </>
  );
}
