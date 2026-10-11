import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Hero } from "@/components/Hero";
import { Container } from "@/components/Container";
import { ArrowRight } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { ServiceFeatureCard, ServiceTextCard } from "@/components/ServiceCard";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Accordion } from "@/components/Accordion";

// TODO: swap for the final FAQ background photo
const FAQ_IMAGE = "/images/img-01.webp";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* What we do */}
      <section className="section pt-8 md:pt-12" aria-labelledby="what-we-do">
        <Container>
          <Reveal>
            <h2 className="h2" id="what-we-do">What we do</h2>
            <div className="mt-10 flex flex-col gap-6 border-b border-line pb-6 lg:flex-row lg:items-center lg:justify-between">
              <Link href="/services" className="group inline-flex items-center gap-3 text-lg">
                All services
                <span className="grid size-9 place-items-center rounded-full bg-line transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight width={16} height={16} />
                </span>
              </Link>
              <ul className="flex flex-wrap gap-x-8 gap-y-2 text-lg text-muted">
                {siteConfig.services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services#${s.slug}`} className="transition-colors hover:text-ink">
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-5">
            <Reveal>
              <ServiceFeatureCard service={siteConfig.services[0]} />
            </Reveal>
            <Reveal stagger className="grid gap-5 sm:grid-cols-3">
              {siteConfig.services.slice(1).map((s) => (
                <ServiceTextCard key={s.slug} service={s} />
              ))}
            </Reveal>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="section bg-brand-soft" aria-labelledby="process">
        <Container className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow mb-4">How it works</p>
            <h2 className="h2" id="process">From first call to final file.</h2>
            <p className="lead mt-5">Five clear steps. You always know the price and the date before we start.</p>
          </Reveal>
          <div className="lg:col-span-7 lg:col-start-6">
            <ProcessSteps />
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section id="faq" className="section relative isolate overflow-hidden" aria-labelledby="faq-title">
        {/* Soft image backdrop, frosted so the questions stay easy to read */}
        <div className="absolute inset-0 -z-10" aria-hidden>
          <Image src={FAQ_IMAGE} alt="" fill sizes="100vw" className="scale-110 object-cover blur-[6px]" />
          <div className="absolute inset-0 bg-paper/80 backdrop-blur-sm" />
        </div>
        <Container className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow mb-4">Questions</p>
            <h2 className="h2" id="faq-title">Good to know before you call.</h2>
            <p className="lead mt-5">Can&apos;t find your answer? Call us and ask.</p>
          </Reveal>
          <Reveal className="lg:col-span-8">
            <Accordion items={siteConfig.faqs} />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
