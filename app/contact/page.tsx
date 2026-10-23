import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { ContactCard } from "@/components/ContactCard";
import { Container, SectionHeading } from "@/components/Container";
import { CallButton, OrderButton } from "@/components/Button";
import { Check } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: `Call or WhatsApp ${siteConfig.contact.phone} about research papers, CVs, proposals and business plans. Dar es Salaam, Tanzania.`,
};

// TODO: swap for the final photo (landscape, at least 1920px wide; this one is 736px)
const CONTACT_IMAGE = "/images/img-06.webp";

/**
 * One big rounded image panel: the white "Let's talk" card on the left,
 * the statement bottom-right over the photo. Payment details follow below.
 */
export default function ContactPage() {
  return (
    <>
      <section className="px-3 pb-6 sm:px-5 sm:pb-8">
        <div className="relative mx-auto flex min-h-[calc(100svh-6.5rem)] max-w-[1440px] flex-col overflow-hidden rounded-[2rem] lg:grid lg:grid-cols-[minmax(0,460px)_1fr] lg:items-end">
          <Image src={CONTACT_IMAGE} alt="" fill priority sizes="100vw" className="object-cover object-center" />
          {/* Shade bottom-right so the statement reads on any photo */}
          <div className="absolute inset-0 bg-linear-to-tl from-black/45 via-black/5 to-transparent" aria-hidden />

          <Reveal className="relative order-2 p-3 sm:p-5 lg:order-1 lg:self-stretch lg:py-5">
            <div className="flex h-full items-center">
              <ContactCard />
            </div>
          </Reveal>

          <Reveal className="relative order-1 flex min-h-[38svh] items-end p-6 sm:p-10 lg:order-2 lg:min-h-0 lg:justify-end">
            <p className="max-w-[15ch] text-[clamp(2.2rem,1.4rem+2.8vw,3.75rem)] leading-[1.05] tracking-[-0.035em] text-white lg:text-right">
              We turn your deadline into{" "}
              <span className="font-accent text-[1.12em] tracking-normal">finished work</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Payments */}
      <section className="section" aria-labelledby="pay">
        <Container>
          <SectionHeading
            eyebrow="How you pay"
            title={<span id="pay">Simple mobile money. No card needed.</span>}
            intro={siteConfig.payments.note}
          />
          <Reveal stagger className="mt-8 grid gap-3 md:mt-12 md:grid-cols-3 md:gap-5">
            {siteConfig.payments.methods.map((m) => (
              <div key={m} className="flex items-center gap-4 rounded-card border border-line bg-surface p-4 md:p-6">
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
            <p className="hidden text-sm text-muted sm:block">
              Not sure which service fits? Call and we&apos;ll point you to the right one.
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
