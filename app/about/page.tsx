import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Container, SectionHeading } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { ProcessSteps } from "@/components/ProcessSteps";
import { StatsRow } from "@/components/Testimonials";
import { CTASection } from "@/components/CTASection";
import { Clock, Shield, Feather, Check } from "@/components/Icons";

export const metadata: Metadata = {
  title: "About",
  description: "Who we are, why clients trust us, and exactly how an order works from first message to final delivery.",
};

// PLACEHOLDER copy: replace with the real story and values
const reasons = [
  {
    icon: Feather,
    title: "Written by people, for people",
    body: "Every document is written by a real writer who reads your brief, asks questions and adapts to your voice. No templates, no recycled text.",
  },
  {
    icon: Clock,
    title: "Honest deadlines",
    body: "We tell you up front what's possible. If we accept the job, it is delivered on the date we agreed.",
  },
  {
    icon: Shield,
    title: "Private by default",
    body: "Your documents and details are never shared or reused. Samples on this site are approved by clients and anonymised.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="pb-12 pt-10 md:pb-20 md:pt-20">
        <Container className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <p className="eyebrow mb-5">About us</p>
            <h1 className="display">We help good ideas sound as good as they are.</h1>
          </Reveal>
          <Reveal className="lg:col-span-4 lg:self-end" delay={0.1}>
            <p className="lead">
              {siteConfig.name} is a small team of writers and editors based in {siteConfig.contact.location.city}. We
              started because too many capable students, job seekers and entrepreneurs were losing opportunities to
              documents that didn&apos;t do them justice.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-[var(--space-section)]">
        <Container>
          <StatsRow />
        </Container>
      </section>

      {/* Why trust us */}
      <section className="section bg-brand-soft" aria-labelledby="why">
        <Container>
          <SectionHeading
            eyebrow="Why trust us"
            title={<span id="why">Built on a few simple promises.</span>}
            intro="We work with students, small businesses and professionals across Tanzania, and we treat every project like it matters, because to you it does."
          />
          <Reveal stagger className="mt-12 grid gap-5 md:grid-cols-3">
            {reasons.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-card border border-line bg-surface p-7">
                <span className="grid size-12 place-items-center rounded-xl bg-brand-soft text-brand">
                  <Icon />
                </span>
                <h3 className="h3 mt-6">{title}</h3>
                <p className="mt-3 text-muted">{body}</p>
              </div>
            ))}
          </Reveal>
          <Reveal className="mt-10">
            <ul className="flex flex-wrap gap-x-8 gap-y-3 text-[0.95rem] font-medium">
              {["English & Kiswahili", "Word + PDF delivery", "Plagiarism report on request", "Remote clients welcome"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check width={18} height={18} className="text-brand" /> {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* Process */}
      <section className="section" aria-labelledby="process">
        <Container className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow mb-4">How an order works</p>
              <h2 className="h2" id="process">From first message to final file, in five steps.</h2>
              <p className="lead mt-6">
                No forms to fight with and no card checkout. You chat with us, agree a price, and pay by mobile money.
              </p>
            </div>
          </Reveal>
          <div className="lg:col-span-7">
            <ProcessSteps />
          </div>
        </Container>
      </section>

      <CTASection title="Let's start with a quick chat." />
    </>
  );
}
