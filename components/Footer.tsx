import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "./Container";
import { BackToTop, FooterNav } from "./FooterParts";
import { SocialLinks } from "./SocialLinks";

const links = [
  { label: "Services", href: "/services" },
  { label: "How it works", href: "/#process" },
  { label: "Questions", href: "/#faq" },
  { label: "Contact", href: "/contact" },
];

const ring = "rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-white";

export function Footer() {
  const { contact } = siteConfig;
  const services = siteConfig.services.map((s) => ({ label: s.title, href: `/services#${s.slug}` }));

  return (
    <footer className="on-dark">
      <div className="bg-[#242424] text-white">
        <Container className="flex flex-col-reverse gap-12 py-16 md:flex-row md:items-start md:justify-between md:py-24">
          <nav aria-label="Footer">
            <FooterNav services={services} links={links} />
          </nav>
          <Link
            href="/"
            aria-label={`${siteConfig.name} — home`}
            className="shrink-0 rounded-sm text-[clamp(2.5rem,4vw,3.5rem)] font-light leading-none tracking-[-0.04em] outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {siteConfig.shortName}
          </Link>
        </Container>

        <div className="border-t border-white/10" />

        <Container className="py-12 md:py-16">
          <SocialLinks variant="text" className="md:justify-end" />

          <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <p className="text-lg font-medium">{contact.location.city}</p>
              <p className="mt-4 text-white/85">
                {contact.location.country}
                <br />
                Working with clients across Tanzania and abroad
              </p>
              <p className="mt-3">
                <a href={contact.phoneHref} className={ring}>
                  {contact.phone}
                </a>
              </p>
            </div>

            <div className="lg:col-span-5">
              <p className="text-lg font-medium">Delivery times</p>
              <ul className="mt-4 max-w-sm space-y-2 text-white/85">
                {siteConfig.services.map((s) => (
                  <li key={s.slug} className="flex justify-between gap-6">
                    <Link href={`/services#${s.slug}`} className={`transition-colors hover:text-white ${ring}`}>
                      {s.title}
                    </Link>
                    <span className="shrink-0 text-white/50">{s.turnaround.replace(/ depending.*$/, "")}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3 lg:col-start-10">
              <p className="text-lg font-medium">We write in</p>
              <p className="mt-4 text-white/85">
                English
                <br />
                Kiswahili
              </p>
              <p className="mt-3 text-white/50">Translation between the two on request.</p>
            </div>
          </div>
        </Container>

        <div className="border-t border-white/10" />

        {/* Phase 2 (deferred): Blog / News and Shop links go in FooterNav */}
        <Container className="grid gap-4 py-8 text-sm sm:grid-cols-3 sm:items-center">
          <p className="text-white/50">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="sm:justify-self-center">
            <BackToTop />
          </div>
          <p className="text-white/50 sm:justify-self-end">
            Made in <span className="text-white">Tanzania</span>
          </p>
        </Container>
      </div>
    </footer>
  );
}
