"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/config/site";
import { whatsappUrl } from "@/lib/order";
import { validateContact, type ContactErrors, type ContactValues } from "@/lib/validation";
import { Check, WhatsAppIcon } from "./Icons";
import { buttonClasses } from "./Button";

const serviceOptions = [
  ...siteConfig.services.map((s) => ({ value: s.slug as string, label: s.title })),
  { value: "consultation", label: "Free consultation / not sure yet" },
];
const serviceValues = serviceOptions.map((o) => o.value);

const empty: ContactValues = { name: "", contact: "", service: "", message: "" };
type Status = "idle" | "submitting" | "success" | "error";

const field =
  "mt-2 w-full rounded-xl border bg-surface px-4 min-h-12 text-base transition-colors duration-200 placeholder:text-muted/60 hover:border-ink focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15";

export function ContactForm() {
  const [values, setValues] = useState<ContactValues>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const set = (k: keyof ContactValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const serviceLabel = serviceOptions.find((o) => o.value === values.service)?.label;
  const waMessage = `Hello ${siteConfig.shortName}! I'm ${values.name || "[name]"}. I need help with: ${serviceLabel ?? "a document"}.\n\n${values.message}\n\nContact: ${values.contact}`.trim();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateContact(values, serviceValues);
    setErrors(found);
    if (Object.keys(found).length) {
      // Move focus to the first invalid field
      const first = (["name", "contact", "service", "message"] as const).find((k) => found[k]);
      if (first) document.getElementById(`cf-${first}`)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const form = new FormData(e.currentTarget);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: form.get("website") }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      setValues(empty);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-card border border-line bg-surface p-8 sm:p-10">
        <span className="grid size-12 place-items-center rounded-full bg-brand text-brand-contrast">
          <Check />
        </span>
        <h2 className="h3 mt-6 !text-2xl">Thank you, we&apos;ve got your message.</h2>
        <p className="mt-3 text-muted">
          We&apos;ll reply within one working hour. For the fastest response, continue the chat on WhatsApp.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={buttonClasses("primary", "lg")}>
            <WhatsAppIcon width={18} height={18} /> Continue on WhatsApp
          </a>
          <button type="button" onClick={() => setStatus("idle")} className={buttonClasses("secondary", "lg")}>
            Send another message
          </button>
        </div>
      </div>
    );
  }

  const err = (k: keyof ContactValues) => (errors[k] ? `cf-${k}-err` : undefined);
  const invalid = (k: keyof ContactValues) => (errors[k] ? "border-red-700" : "border-line");

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-card border border-line bg-surface p-6 sm:p-9">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="font-semibold">Full name</label>
          <input
            id="cf-name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={set("name")}
            aria-invalid={!!errors.name}
            aria-describedby={err("name")}
            className={`${field} ${invalid("name")}`}
            placeholder="e.g. Neema Mushi"
          />
          {errors.name && <p id="cf-name-err" className="mt-2 text-sm font-medium text-red-700">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="cf-contact" className="font-semibold">Phone or email</label>
          <input
            id="cf-contact"
            name="contact"
            autoComplete="tel"
            inputMode="text"
            value={values.contact}
            onChange={set("contact")}
            aria-invalid={!!errors.contact}
            aria-describedby={err("contact")}
            className={`${field} ${invalid("contact")}`}
            placeholder="0712 345 678 or you@email.com"
          />
          {errors.contact && <p id="cf-contact-err" className="mt-2 text-sm font-medium text-red-700">{errors.contact}</p>}
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="cf-service" className="font-semibold">Service needed</label>
        <select
          id="cf-service"
          name="service"
          value={values.service}
          onChange={set("service")}
          aria-invalid={!!errors.service}
          aria-describedby={err("service")}
          className={`${field} ${invalid("service")}`}
        >
          <option value="" disabled>Choose a service…</option>
          {serviceOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        {errors.service && <p id="cf-service-err" className="mt-2 text-sm font-medium text-red-700">{errors.service}</p>}
      </div>

      <div className="mt-6">
        <label htmlFor="cf-message" className="font-semibold">Tell us about your project</label>
        <textarea
          id="cf-message"
          name="message"
          rows={6}
          value={values.message}
          onChange={set("message")}
          aria-invalid={!!errors.message}
          aria-describedby={err("message")}
          className={`${field} min-h-36 py-3 ${invalid("message")}`}
          placeholder="Topic, length, deadline, and any guidelines you've been given…"
        />
        {errors.message && <p id="cf-message-err" className="mt-2 text-sm font-medium text-red-700">{errors.message}</p>}
      </div>

      {/* Honeypot: hidden from people, tempting to bots */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === "error" && (
        <p role="alert" className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-900">
          Sorry, something went wrong sending your message. Please try again, or message us directly on WhatsApp.
        </p>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "submitting"}
          className={buttonClasses("primary", "lg", "disabled:opacity-60")}
        >
          {status === "submitting" ? "Sending…" : "Send message"}
        </button>
        <a
          href={whatsappUrl(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses("secondary", "lg")}
        >
          <WhatsAppIcon width={18} height={18} /> Send via WhatsApp instead
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </form>
  );
}
