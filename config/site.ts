/**
 * SITE CONFIG — the single source of truth.
 *
 * Everything marked PLACEHOLDER is invented copy so the site reads like a real
 * product while content is being finalised. Search the repo for "PLACEHOLDER"
 * and "TODO" before launch.
 */

export type ServiceSlug =
  | "research-papers"
  | "cvs"
  | "proposals"
  | "business-plans";

export type ServiceIcon = "research" | "cv" | "proposal" | "plan";

export interface Service {
  slug: ServiceSlug;
  icon: ServiceIcon;
  title: string;
  /** One-liner used on cards and the home strip */
  short: string;
  description: string;
  includes: string[];
  turnaround: string;
  /** PLACEHOLDER pricing — shown as "From …" */
  from: string;
  /** Who it is for, used in the WhatsApp prefill */
  audience: string;
}

export interface Sample {
  id: string;
  service: ServiceSlug;
  title: string;
  blurb: string;
  meta: string;
  // TODO: add `image: "/samples/xyz.jpg"` once real (redacted) samples exist.
  // Until then the UI renders a designed document preview.
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
    // TODO: real WhatsApp number — digits only, country code first, no "+"
    whatsappNumber: "255700000000",
    whatsappDisplay: "+255 700 000 000",
    // TODO: real email
    email: "hello@example.com",
    phone: "+255 700 000 000",
    location: {
      city: "Dar es Salaam",
      country: "Tanzania",
      // TODO: real address / or remove the street line
      address: "Sample Street, Mikocheni, Dar es Salaam",
      hours: "Mon–Sat, 8:00–18:00 (EAT)",
      // TODO: real coordinates for the map embed
      lat: -6.8155,
      lng: 39.2883,
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
    { label: "Samples", href: "/gallery" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],

  services: [
    {
      slug: "research-papers",
      icon: "research",
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
      from: "TZS 60,000",
      audience: "a research paper",
    },
    {
      slug: "cvs",
      icon: "cv",
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
      from: "TZS 15,000",
      audience: "a CV / cover letter",
    },
    {
      slug: "proposals",
      icon: "proposal",
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
      from: "TZS 50,000",
      audience: "a proposal",
    },
    {
      slug: "business-plans",
      icon: "plan",
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
      from: "TZS 120,000",
      audience: "a business plan",
    },
  ] satisfies Service[],

  // PLACEHOLDER — replace with the real order flow
  process: [
    {
      title: "Tell us what you need",
      body: "Message us on WhatsApp or fill in the form. Share the topic, length, deadline and any guidelines you were given.",
    },
    {
      title: "Get a clear quote",
      body: "We reply within the hour during working days with a fixed price and delivery date. No hidden fees.",
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

  // PLACEHOLDER — invented numbers. Replace with real ones or remove.
  stats: [
    { value: "500+", label: "Documents delivered" },
    { value: "48h", label: "Typical CV turnaround" },
    { value: "2", label: "Free revision rounds" },
    { value: "1h", label: "Average first reply" },
  ],

  // PLACEHOLDER — fictional testimonials. Replace with real, permissioned ones.
  testimonials: [
    {
      quote:
        "I sent my old CV on Monday and had a new one by Tuesday evening. I was shortlisted for two interviews the following week.",
      name: "Neema M.",
      role: "Graduate, Dar es Salaam",
    },
    {
      quote:
        "They turned my rough idea into a proposal that a funder actually understood. The budget narrative alone saved me days.",
      name: "Juma K.",
      role: "Founder, agri-business, Morogoro",
    },
    {
      quote:
        "Clear communication, fair price and paid with Tigo Pesa. The business plan helped me get my SACCO loan approved.",
      name: "Asha R.",
      role: "Small business owner, Arusha",
    },
  ],

  // PLACEHOLDER — sample works. Titles and descriptions are invented.
  samples: [
    {
      id: "s1",
      service: "research-papers",
      title: "Mobile money and household savings",
      blurb: "A 6,000-word paper on how mobile money use changes saving habits in urban Tanzania.",
      meta: "Research paper · 24 pages · APA 7",
    },
    {
      id: "s2",
      service: "cvs",
      title: "Graduate CV, public health",
      blurb: "A one-page CV that leads with field experience and a clear professional summary.",
      meta: "CV · 1 page · Word + PDF",
    },
    {
      id: "s3",
      service: "proposals",
      title: "Youth skills programme proposal",
      blurb: "A donor-style proposal with objectives, activities, logframe and a costed work plan.",
      meta: "Proposal · 18 pages · Logframe included",
    },
    {
      id: "s4",
      service: "business-plans",
      title: "Poultry farm business plan",
      blurb: "A loan-ready plan with a market study, operating costs and 3-year cash flow.",
      meta: "Business plan · 32 pages · TZS projections",
    },
    {
      id: "s5",
      service: "research-papers",
      title: "Solar adoption in rural districts",
      blurb: "A literature review and mixed-methods write-up on barriers to household solar.",
      meta: "Research paper · 30 pages · Harvard",
    },
    {
      id: "s6",
      service: "cvs",
      title: "Mid-career CV, logistics",
      blurb: "Two-page CV for a senior role, built around measurable results and certifications.",
      meta: "CV · 2 pages · Cover letter included",
    },
    {
      id: "s7",
      service: "proposals",
      title: "Community water project concept note",
      blurb: "A tight 3-page concept note written to pass the first screening round.",
      meta: "Concept note · 3 pages",
    },
    {
      id: "s8",
      service: "business-plans",
      title: "Coffee shop business plan",
      blurb: "Location analysis, menu strategy and a break-even model for a first café.",
      meta: "Business plan · 26 pages · Pitch outline",
    },
  ] satisfies Sample[],

  // PLACEHOLDER — write final policy wording before launch
  faqs: [
    {
      q: "How do I place an order?",
      a: "Tap any Order button to open WhatsApp with a ready message, or use the contact form. Tell us what you need, the deadline and any guidelines, and we'll send a quote.",
    },
    {
      q: "How much does it cost?",
      a: "It depends on the type of document, length, deadline and complexity. CVs start from TZS 15,000 and research papers from TZS 60,000. You always get a fixed quote before paying anything.",
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
      a: "Absolutely. Everything happens over WhatsApp, email and mobile money, so we work with clients across Tanzania and abroad.",
    },
  ] satisfies Faq[],
};

export type SiteConfig = typeof siteConfig;
