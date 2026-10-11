"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/config/site";
import { whatsappUrl } from "@/lib/order";
import { InstagramIcon, Phone, WhatsAppIcon } from "./Icons";
import { CopyButton } from "./CopyButton";

const TOPICS = [
  ...siteConfig.services.map((s) => s.title),
  "Editing & proofreading",
  "Translation",
  "Other",
];

const field =
  "w-full rounded-xl border border-line bg-surface px-4 text-[0.95rem] placeholder:text-muted/70 transition-colors focus:border-ink outline-none";

/**
 * "Let's talk" card. No server: the brief message is composed into a
 * ready-to-send WhatsApp (or email) message in the visitor's own app.
 */
export function ContactCard() {
  const { contact } = siteConfig;
  const [name, setName] = useState("");
  const [reply, setReply] = useState("");
  const [message, setMessage] = useState("");
  const [topics, setTopics] = useState<string[]>([]);

  const toggle = (t: string) => setTopics((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));

  const compose = () =>
    [
      `Hello ${siteConfig.name}! I'm ${name.trim() || "[your name]"}.`,
      topics.length ? `I'm looking for: ${topics.join(", ")}.` : "",
      message.trim(),
      reply.trim() ? `You can reach me at: ${reply.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    window.open(whatsappUrl(compose()), "_blank", "noopener,noreferrer");
  };

  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(`Order enquiry: ${siteConfig.name}`)}&body=${encodeURIComponent(compose())}`;

  const quick = [
    { label: "WhatsApp", href: whatsappUrl(), external: true, Icon: WhatsAppIcon },
    ...(contact.instagram ? [{ label: "Instagram", href: contact.instagram, external: true, Icon: InstagramIcon }] : []),
    { label: `Call ${contact.phone}`, href: contact.phoneHref, external: false, Icon: Phone },
  ];

  return (
    <div className="w-full rounded-[1.5rem] bg-surface p-6 text-ink shadow-[0_30px_80px_-30px_rgba(0,0,0,.45)] sm:p-7">
      <h1 className="text-2xl font-medium tracking-[-0.02em]">
        Let&apos;s talk <span aria-hidden>👋</span>
      </h1>

      {/* Direct contact */}
      <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl bg-paper p-4">
        <div className="min-w-0">
          <p className="text-sm font-medium">Mail us at</p>
          <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1">
            <a href={`mailto:${contact.email}`} className="link truncate text-sm">
              {contact.email}
            </a>
            <CopyButton value={contact.email} />
          </div>
        </div>
        <ul className="flex shrink-0 gap-2">
          {quick.map(({ label, href, external, Icon }) => (
            <li key={label}>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                aria-label={`${label}${external ? " (opens in a new tab)" : ""}`}
                className="grid size-9 place-items-center rounded-lg bg-surface text-ink ring-1 ring-line transition-colors hover:bg-ink hover:text-white"
              >
                <Icon width={17} height={17} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="my-5 flex items-center gap-3 text-xs text-muted" aria-hidden>
        <span className="h-px flex-1 bg-line" /> OR <span className="h-px flex-1 bg-line" />
      </div>

      {/* Brief message → WhatsApp */}
      <form onSubmit={onSubmit} className="space-y-3">
        <p className="text-sm font-medium">Leave us a brief message</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="sr-only" htmlFor="cc-name">Your name</label>
          <input
            id="cc-name"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className={`${field} h-11`}
          />
          <label className="sr-only" htmlFor="cc-reply">Phone or email (optional)</label>
          <input
            id="cc-reply"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Phone or email (optional)"
            className={`${field} h-11`}
          />
        </div>
        <label className="sr-only" htmlFor="cc-msg">What do you need?</label>
        <textarea
          id="cc-msg"
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Briefly describe what you need: topic, length, deadline…"
          className={`${field} resize-none py-3`}
        />

        <fieldset className="pt-1">
          <legend className="mb-2 text-sm font-medium">I&apos;m looking for…</legend>
          <div className="flex flex-wrap gap-2">
            {TOPICS.map((t) => {
              const on = topics.includes(t);
              return (
                <button
                  key={t}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(t)}
                  className={`rounded-lg border px-3 py-1.5 text-[0.8rem] transition-colors ${
                    on ? "border-ink bg-ink text-white" : "border-line text-muted hover:border-ink/40 hover:text-ink"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </fieldset>

        <button
          type="submit"
          className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-ink font-medium text-white transition-colors hover:bg-black"
        >
          <WhatsAppIcon width={18} height={18} /> Send on WhatsApp
          <span className="sr-only"> (opens in a new tab)</span>
        </button>
        <p className="text-center text-sm text-muted">
          Prefer email?{" "}
          <a href={mailto} className="link text-ink">
            Send it by email instead
          </a>
        </p>
      </form>
    </div>
  );
}
