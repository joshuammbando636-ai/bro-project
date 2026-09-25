import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { OrderButton } from "@/components/Button";
import { Clock, Mail, Phone, Pin } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact",
  description: "Order or book a free consultation. Message us on WhatsApp or use the contact form. Based in Dar es Salaam, Tanzania.",
};

export default function ContactPage() {
  const { contact } = siteConfig;
  const { lat, lng } = contact.location;
  const bbox = `${lng - 0.03},${lat - 0.025},${lng + 0.03},${lat + 0.025}`;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  const rows = [
    { icon: Phone, label: "Phone", value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` },
    { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { icon: Pin, label: "Location", value: `${contact.location.address}` },
    { icon: Clock, label: "Hours", value: contact.location.hours },
  ];

  return (
    <>
      <section className="pb-10 pt-10 md:pt-20">
        <Container>
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-5">Contact</p>
            <h1 className="display">Tell us what you need.</h1>
            <p className="lead mt-7">
              The fastest way is WhatsApp. Prefer a form? Fill it in and we&apos;ll reply within one working hour.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-[var(--space-section)]">
        <Container className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-7">
            <ContactForm />
          </Reveal>

          <Reveal stagger className="space-y-6 lg:col-span-5">
            <div className="on-dark rounded-card bg-ink p-7 text-white">
              <h2 className="h3">Chat on WhatsApp</h2>
              <p className="mt-2 text-white/70">
                Quickest replies and easiest for sharing files. Tap to start with a ready-made message.
              </p>
              <OrderButton variant="light" size="lg" className="mt-6 w-full" label={`Chat: ${contact.whatsappDisplay}`} />
            </div>

            <ul className="space-y-5 rounded-card border border-line bg-surface p-7">
              {rows.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
                    <Icon width={20} height={20} />
                  </span>
                  <div>
                    <p className="text-sm text-muted">{label}</p>
                    {href ? (
                      <a href={href} className="link font-semibold">{value}</a>
                    ) : (
                      <p className="font-semibold">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="overflow-hidden rounded-card border border-line bg-surface">
              <iframe
                title={`Map: ${contact.location.city}, ${contact.location.country}`}
                src={mapSrc}
                loading="lazy"
                className="h-64 w-full border-0"
              />
              <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="link block px-5 py-4 text-sm font-semibold">
                Open in Google Maps<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
