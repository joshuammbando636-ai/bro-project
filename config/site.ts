/**
 * SITE CONFIG — the single source of truth.
 *
 * Contact details below are real. Anything still marked PLACEHOLDER or TODO is
 * unfinished: search the repo for both before launch.
 */

export type ServiceSlug =
  | "research-papers"
  | "cvs"
  | "proposals"
  | "business-plans";

export interface Service {
  slug: ServiceSlug;
  /** Card image in /public. TODO: swap the placeholders for final photos. */
  image: string;
  title: string;
  /** One-liner used on cards and the home strip */
  short: string;
  description: string;
  includes: string[];
  turnaround: string;
  /** Who it is for, used in the WhatsApp prefill */
  audience: string;
}

export interface Faq {
  q: string;
  a: string;
}

export const siteConfig = {
  // TODO: swap in real brand — name, tagline and description
  name: "Kalamu Writers",
  shortName: "Kalamu",
  tagline: "Professional & academic writing, made in Tanzania",
  description:
    "Research papers, CVs, proposals and business plans written by experienced Tanzanian writers. Order on WhatsApp and pay with M-Pesa, Tigo Pesa or Airtel Money.",
  // TODO: set NEXT_PUBLIC_SITE_URL in Vercel to the production domain
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",

  contact: {
    // Same number for calls and WhatsApp. whatsappNumber: digits only, country code first, no "+"
    whatsappNumber: "255777561651",
    whatsappDisplay: "+255 777 561 651",
    phone: "+255 777 561 651",
    phoneHref: "tel:+255777561651",
    email: "joshua050mmbando@gmail.com",
    // TODO: full Instagram profile URL, e.g. "https://instagram.com/kalamuwriters". Icons hide while empty.
    instagram: "",
    location: {
      city: "Dar es Salaam",
      country: "Tanzania",
      // TODO: add street address and opening hours once confirmed (not shown until then)
    },
  },

  /** Default WhatsApp prefill when no specific service is chosen */
  defaultOrderMessage:
    "Hello! I'd like to place an order / book a free consultation. Can you help me?",

  payments: {
    // Manual mobile money for v1. See lib/order.ts to plug in a real gateway.
    methods: ["M-Pesa", "Tigo Pesa", "Airtel Money"],
    note: "We confirm your quote on WhatsApp, then you pay a deposit by mobile money. No card needed.",
  },

  /** Phase 2 (deferred): Blog / News and Shop. Left out of nav on purpose. */
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ],

  services: [
    {
      slug: "research-papers",
      image: "/images/img-03.webp",
      title: "Research papers",
      short: "Term papers, dissertations and journal-ready articles with clean referencing.",
      description:
        "From a first outline to a fully referenced final draft. We help with literature reviews, methodology, data write-up and formatting in APA, Harvard or your university's style.",
      includes: [
        "Topic refinement and outline",
        "Literature review and referencing (APA / Harvard / MLA)",
        "Data analysis write-up",
        "Plagiarism report on request",
      ],
      turnaround: "3–10 days depending on length",
      audience: "a research paper",
    },
    {
      slug: "cvs",
      image: "/images/img-02.webp",
      title: "CVs & cover letters",
      short: "A sharp, honest CV that gets you shortlisted for jobs, scholarships and NGOs.",
      description:
        "We turn your experience into a clear, ATS-friendly CV and a cover letter that sounds like you at your best. Suitable for local employers, NGOs, the UN system and study abroad.",
      includes: [
        "One-on-one WhatsApp interview",
        "Modern CV design (Word + PDF)",
        "Tailored cover letter",
        "LinkedIn headline & summary tips",
      ],
      turnaround: "24–48 hours",
      audience: "a CV / cover letter",
    },
    {
      slug: "proposals",
      image: "/images/img-05.webp",
      title: "Proposals",
      short: "Grant, project and research proposals structured the way funders read them.",
      description:
        "Clear problem statement, objectives, methodology, work plan and budget narrative. We shape your idea into a proposal that is easy to say yes to.",
      includes: [
        "Concept note or full proposal",
        "Logical framework and work plan",
        "Budget narrative",
        "Two rounds of revisions",
      ],
      turnaround: "3–7 days",
      audience: "a proposal",
    },
    {
      slug: "business-plans",
      image: "/images/img-04.webp",
      title: "Business plans",
      short: "Bank-ready and investor-ready plans with realistic numbers in TZS.",
      description:
        "Market analysis, operations plan, marketing strategy and simple three-year financials. Built for loan applications, SACCOs, competitions and your own clarity.",
      includes: [
        "Market and competitor analysis",
        "Operations and marketing plan",
        "3-year financial projections",
        "Executive summary and pitch outline",
      ],
      turnaround: "5–10 days",
      audience: "a business plan",
    },
  ] satisfies Service[],

  // PLACEHOLDER — replace with the real order flow
  process: [
    {
      title: "Tell us what you need",
      body: "Call us, message us on WhatsApp or fill in the form. Share the topic, length, deadline and any guidelines you were given.",
    },
    {
      title: "Get a clear quote",
      body: "We give you a fixed price and a delivery date. No hidden fees.",
    },
    {
      title: "Pay a deposit",
      body: "Pay by M-Pesa, Tigo Pesa or Airtel Money. Work starts as soon as we confirm your deposit.",
    },
    {
      title: "Review your draft",
      body: "You receive the draft on WhatsApp or email. Tell us what to change — two rounds of revisions are included.",
    },
    {
      title: "Final delivery",
      body: "Pay the balance and get your final files in Word and PDF, ready to submit, print or send.",
    },
  ],

  // PLACEHOLDER — write final policy wording before launch
  faqs: [
    {
      q: "How do I place an order?",
      a: "Call us, tap any Order button to open WhatsApp with a ready message, or use the contact form. Tell us what you need, the deadline and any guidelines, and we'll give you a quote.",
    },
    {
      q: "How much does it cost?",
      a: "It depends on the type of document, length, deadline and complexity. Call us with the details and you get a fixed quote before paying anything.",
    },
    {
      q: "How do I pay?",
      a: "By mobile money: M-Pesa, Tigo Pesa or Airtel Money. We usually ask for a deposit to start and the balance on final delivery. There is no online card payment at the moment.",
    },
    {
      q: "How long does it take?",
      a: "CVs are usually ready in 24–48 hours, proposals in 3–7 days, research papers in 3–10 days and business plans in 5–10 days. Need it faster? Ask us, rush delivery is often possible.",
    },
    {
      q: "Can I ask for changes?",
      a: "Yes. Every order includes two rounds of revisions within 7 days of receiving your draft, as long as the changes stay within the original brief.",
    },
    {
      q: "Is my information kept private?",
      a: "Yes. Your documents and personal details are never shared, published or reused. We only use samples that clients have approved and that have been fully anonymised.",
    },
    {
      q: "Will my paper be original?",
      a: "Every document is written from scratch for you. On request we can share a plagiarism-check report with your draft.",
    },
    {
      q: "Is it acceptable to use academic writing help?",
      a: "Our academic work is provided as drafting support and as a model to learn from: how to structure, argue and reference. Please follow your institution's rules on how you use it. We also offer editing and proofreading of your own writing.",
    },
    {
      q: "Do you write in Kiswahili?",
      a: "Yes. We work in both English and Kiswahili, including translation between the two.",
    },
    {
      q: "I'm not in Dar es Salaam. Can you still help?",
      a: "Absolutely. Everything happens over phone, WhatsApp, email and mobile money, so we work with clients across Tanzania and abroad.",
    },
  ] satisfies Faq[],
};

export type SiteConfig = typeof siteConfig;
