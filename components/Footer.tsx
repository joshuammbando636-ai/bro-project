import Link from "next/link";
import { siteConfig } from "@/config/site";
import { posts } from "@/config/posts";
import { Container } from "./Container";
import { BackToTop, FooterNav } from "./FooterParts";
import { SocialLinks } from "./SocialLinks";

const links = [
  { label: "How it works", href: "/#process" },
  { label: "Questions", href: "/#faq" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const ring = "rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-white";

/**
 * Phones get a short footer: logo, links, socials, phone and the bottom bar.
 * The detail columns (location note, latest posts, languages) are desktop only.
 */
export function Footer() {
  const { contact } = siteConfig;
  const services = siteConfig.services.map((s) => ({ label: s.title, href: `/services/${s.slug}` }));

  return (
    <footer className="on-dark">
      <div className="bg-[#242424] text-white">
        <Container className="flex flex-col-reverse gap-8 py-12 md:flex-row md:items-start md:justify-between md:gap-12 md:py-24">
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

        {/* Phone: socials as icons + the number, nothing else */}
        <Container className="flex items-center justify-between gap-4 py-6 md:hidden">
          <SocialLinks variant="icon" />
          <a href={contact.phoneHref} className={`text-white/85 ${ring}`}>
            {contact.phone}
          </a>
        </Container>

        <Container className="hidden py-16 md:block">
          <SocialLinks variant="text" className="justify-end" />

          <div className="mt-12 grid grid-cols-2 gap-12 lg:grid-cols-12">
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
              <p className="text-lg font-medium">Latest updates</p>
              <ul className="mt-4 max-w-sm space-y-2 text-white/85">
                {posts.slice(0, 3).map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}`} className={`transition-colors hover:text-white ${ring}`}>
                      {p.title}
                    </Link>
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

        {/* Phase 2 (deferred): Shop link goes in FooterNav */}
        <Container className="flex items-center justify-between gap-4 py-6 text-sm md:py-8">
          <p className="text-white/50">
            © {new Date().getFullYear()} <span className="md:hidden">{siteConfig.shortName}</span>
            <span className="hidden md:inline">{siteConfig.name}. All rights reserved.</span>
          </p>
          <BackToTop />
        </Container>
      </div>
    </footer>
  );
}
