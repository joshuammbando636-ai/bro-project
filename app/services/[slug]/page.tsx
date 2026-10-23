import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig, type Service } from "@/config/site";
import { servicePages } from "@/config/service-pages";
import { Container } from "@/components/Container";
import { ArrowPill } from "@/components/ArrowPill";
import { CallButton, OrderButton } from "@/components/Button";
import { Check } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { Statement } from "@/components/Statement";

export const dynamicParams = false;

export function generateStaticParams() {
  return siteConfig.services.map((s) => ({ slug: s.slug }));
}

function find(slug: string): Service | undefined {
  return siteConfig.services.find((s) => s.slug === slug);
}

export async function generateMetadata(props: PageProps<"/services/[slug]">): Promise<Metadata> {
  const service = find((await props.params).slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.short,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title: service.title, description: service.short, images: [service.image] },
  };
}

/** Bottom-right corner cut off the large gallery image */
const CUT = "polygon(0 0, 100% 0, 100% calc(100% - 4.5rem), calc(100% - 4.5rem) 100%, 0 100%)";

export default async function ServicePage(props: PageProps<"/services/[slug]">) {
  const service = find((await props.params).slug);
  if (!service) notFound();
  const page = servicePages[service.slug];
  const [small1, small2, large] = page.gallery;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    serviceType: service.title,
    url: `${siteConfig.url}/services/${service.slug}`,
    areaServed: siteConfig.contact.location.country,
    provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url, telephone: siteConfig.contact.phone },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* How we write it */}
      <section className="pb-16 pt-6 md:pb-24 md:pt-10">
        <Container>
          <Statement tagline={page.tagline} title={page.statement} as="h1">
            {page.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <div className="mt-8 flex break-inside-avoid flex-wrap gap-3">
              <OrderButton service={service.slug} />
              <CallButton variant="secondary" />
            </div>
          </Statement>
        </Container>
      </section>

      {/* What we pay attention to */}
      <section className="section bg-brand-soft" aria-labelledby="principles">
        <Container>
          <Reveal>
            <p className="border-b border-ink/10 pb-5 text-muted">What we pay attention to</p>
            <h2 id="principles" className="sr-only">
              What we pay attention to
            </h2>
          </Reveal>
          <Reveal stagger>
            {page.principles.map((item, i) => (
              <div key={item.title} className="grid grid-cols-[2.5rem_1fr] gap-2 border-b border-ink/10 py-5 md:grid-cols-12 md:gap-10 md:py-7">
                <p className="text-muted md:col-span-1">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="text-[clamp(1.4rem,1.1rem+1vw,2rem)] leading-tight tracking-[-0.025em] md:col-span-5">
                  {item.title}
                </h3>
                <p className="hidden text-muted md:col-span-5 md:col-start-8 md:block md:pt-1">{item.body}</p>
              </div>
            ))}
          </Reveal>
          <Reveal className="mt-14 grid gap-6 md:grid-cols-12 md:gap-10">
            <p className="text-lg md:col-span-6">Included with every order</p>
            <ul className="grid gap-3 sm:grid-cols-2 md:col-span-6">
              {service.includes.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <Check width={18} height={18} className="mt-1 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* Kinds of work */}
      <section className="section" aria-label={`Kinds of ${service.title.toLowerCase()} we write`}>
        <Container className="grid gap-x-3 gap-y-14 lg:grid-cols-2">
          <div className="flex flex-col justify-between gap-14">
            <Reveal stagger className="grid gap-x-3 gap-y-10 sm:grid-cols-2">
              {[small1, small2].map((g) => (
                <figure key={g.title}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-line">
                    <Image src={g.image} alt="" fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                  </div>
                  <figcaption className="mt-4">
                    <span className="block text-lg tracking-[-0.015em]">{g.title}</span>
                    <span className="hidden text-sm text-muted md:inline">{g.caption}</span>
                  </figcaption>
                </figure>
              ))}
            </Reveal>

            <Reveal className="hidden lg:block">
              <AllServices />
            </Reveal>
          </div>

          <Reveal>
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden bg-line lg:aspect-[16/11]" style={{ clipPath: CUT }}>
                <Image src={large.image} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              </div>
              <figcaption className="mt-4">
                <span className="block text-lg tracking-[-0.015em]">{large.title}</span>
                <span className="hidden text-sm text-muted md:inline">{large.caption}</span>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal className="lg:hidden">
            <AllServices />
          </Reveal>
        </Container>
      </section>
    </>
  );
}

function AllServices() {
  return (
    <>
      <h2 className="h2">View all services</h2>
      <Link href="/services" className="arrow-host mt-8 inline-flex items-center gap-3 text-lg">
        <span className="border-b border-ink pb-1">Services</span>
        <ArrowPill />
      </Link>
    </>
  );
}
