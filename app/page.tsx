import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Hero } from "@/components/Hero";
import { Container, SectionHeading } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { ServiceTile } from "@/components/ServiceCard";
import { DocPreview } from "@/components/DocPreview";
import { StatsRow, Testimonials } from "@/components/Testimonials";
import { Accordion } from "@/components/Accordion";
import { ButtonLink } from "@/components/Button";
import { CTASection } from "@/components/CTASection";

export default function HomePage() {
  const previews = [siteConfig.samples[0], siteConfig.samples[1], siteConfig.samples[2], siteConfig.samples[3]];

  return (
    <>
      <Hero />

      {/* What we do */}
      <section className="section pt-8 md:pt-12" aria-labelledby="what-we-do">
        <Container>
          <SectionHeading
            eyebrow="What we do"
            title={<span id="what-we-do">Four kinds of writing. One reliable team.</span>}
            intro="Whether it's a deadline, an interview or a funding call, we help you put your best work forward."
          />
          <Reveal stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {siteConfig.services.map((s) => (
              <ServiceTile key={s.slug} service={s} />
            ))}
          </Reveal>
        </Container>
      </section>

      {/* Sample works */}
      <section className="section bg-brand-soft" aria-labelledby="samples">
        <Container>
          <SectionHeading
            eyebrow="Sample works"
            title={<span id="samples">See the standard before you order.</span>}
            intro="A few anonymised examples of the structure, clarity and finish you can expect."
            action={
              <ButtonLink href="/gallery" variant="secondary" arrow>
                Browse all samples
              </ButtonLink>
            }
          />
          <Reveal stagger className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {previews.map((s, i) => (
              <Link key={s.id} href="/gallery" className={`group block ${i % 2 === 1 ? "lg:translate-y-8" : ""}`}>
                <div className="@container aspect-[4/5] overflow-hidden rounded-card border border-line bg-surface transition-[transform,border-color] duration-300 ease-out group-hover:-translate-y-1 group-hover:border-brand/40">
                  <DocPreview service={s.service} title={s.title} />
                </div>
                <p className="mt-3 text-sm font-semibold leading-snug group-hover:text-brand sm:text-base">{s.title}</p>
              </Link>
            ))}
          </Reveal>
          <div className="h-8 hidden lg:block" />
        </Container>
      </section>

      {/* Trust */}
      <section className="section" aria-labelledby="trust">
        <Container>
          <SectionHeading
            eyebrow="Why people trust us"
            title={<span id="trust">Clear prices. Honest timelines. Work you can be proud of.</span>}
          />
          <div className="mt-12">
            <StatsRow />
          </div>
          <div className="mt-12">
            <Testimonials />
          </div>
          <p className="mt-6 text-sm text-muted">
            {/* PLACEHOLDER: fictional testimonials and figures. Replace before launch. */}
            Client names shortened for privacy.
          </p>
        </Container>
      </section>

      {/* FAQ teaser */}
      <section className="section pt-0" aria-labelledby="faq">
        <Container className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow mb-4">Questions</p>
            <h2 className="h2" id="faq">Good to know before you start.</h2>
            <div className="mt-6">
              <ButtonLink href="/faq" variant="secondary" arrow>
                All FAQs
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-8">
            <Accordion items={siteConfig.faqs.slice(0, 4)} />
          </Reveal>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
