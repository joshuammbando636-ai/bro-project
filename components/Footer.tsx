import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Logo } from "./Logo";
import { Container } from "./Container";
import { Mail, Phone, Pin } from "./Icons";

export function Footer() {
  const { contact } = siteConfig;
  return (
    <footer className="on-dark border-t border-white/10 bg-ink text-white/80">
      <Container className="py-14 md:py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="text-white">
              <Logo />
            </div>
            <p className="mt-5 max-w-sm text-[0.95rem] text-white/70">
              {siteConfig.tagline}. Research papers, CVs, proposals and business plans, written with care and delivered on time.
            </p>
            <p className="mt-6 text-sm text-white/60">
              We accept {siteConfig.payments.methods.join(", ")}.
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-white/50">Explore</h2>
            <ul className="space-y-1">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-flex min-h-9 items-center hover:text-white link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-white/50">Get in touch</h2>
            <ul className="space-y-3 text-[0.95rem]">
              <li className="flex gap-3">
                <Phone width={20} height={20} className="mt-0.5 shrink-0 text-white/50" />
                <a className="link hover:text-white" href={`tel:${contact.phone.replace(/\s/g, "")}`}>
                  {contact.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail width={20} height={20} className="mt-0.5 shrink-0 text-white/50" />
                <a className="link hover:text-white" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Pin width={20} height={20} className="mt-0.5 shrink-0 text-white/50" />
                <span>
                  {contact.location.city}, {contact.location.country}
                  <br />
                  <span className="text-white/60">{contact.location.hours}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          {/* Phase 2 (deferred): Blog / News and Shop links go here */}
          <p>Made in Tanzania</p>
        </div>
      </Container>
    </footer>
  );
}
