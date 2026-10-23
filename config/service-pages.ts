/**
 * SERVICE PAGES — the long-form content behind each "Learn more" (/services/<slug>).
 * Titles, images and the "what's included" list come from siteConfig.services;
 * this file holds the story of how we write each one.
 */

import type { ServiceSlug } from "./site";

export interface ServicePage {
  /** Quiet line above the statement */
  tagline: string;
  /** The large opening statement */
  statement: string;
  /** Running text in two columns: how we write it */
  paragraphs: string[];
  /** "What we pay attention to": short title + one line each */
  principles: { title: string; body: string }[];
  /** Kinds of work, shown as an image grid: two small, then one large. TODO: final photos */
  gallery: { image: string; title: string; caption: string }[];
}

export const servicePages: Record<ServiceSlug, ServicePage> = {
  "research-papers": {
    tagline: "Research papers. Written to be defended.",
    statement:
      "A good research paper isn't just written, it's argued. We build every paper around a clear question, honest evidence and a structure your supervisor can follow at a glance.",
    paragraphs: [
      "We start where your supervisor will start: the research problem. Before a single chapter is drafted, we make sure the problem, the objectives and the research questions line up, because that is where most weak papers fail first.",
      "Your work is matched with a writer who knows the field, so a public health dissertation is written by someone who reads public health literature and a finance paper by someone who understands the numbers. Sources are recent, peer-reviewed and cited the way your university asks, whether APA, Harvard or MLA.",
      "When there is data, we explain it in plain language: what was found, what it means and where its limits are. Every table and figure is labelled, discussed and tied back to your objectives.",
      "Each paper is written from scratch for you, in your institution's format, and we walk you through the reasoning so you can explain and defend it with confidence. A plagiarism report is available on request.",
    ],
    principles: [
      { title: "Problem first", body: "One clear problem statement that every chapter answers to." },
      {
        title: "Literature by theme",
        body: "Sources grouped into arguments that lead to the gap your study fills, not summarised one by one.",
      },
      { title: "Methods you can justify", body: "Design, sampling and analysis, each with the reason behind the choice." },
      { title: "Formatting done right", body: "Headings, tables, citations and references consistent from first page to last." },
    ],
    gallery: [
      { image: "/images/img-01.webp", title: "Term papers & assignments", caption: "Essays, reports and case studies" },
      { image: "/images/img-07.webp", title: "Journal articles", caption: "Formatted for submission" },
      { image: "/images/img-03.webp", title: "Dissertations & theses", caption: "Undergraduate, Masters and PhD" },
    ],
  },

  cvs: {
    tagline: "CVs & cover letters. Built to be shortlisted.",
    statement:
      "A recruiter decides in seconds. We make sure the first thing they see is the reason to call you: your strongest results, in the words their advert uses.",
    paragraphs: [
      "It starts with a conversation on WhatsApp. We ask about the work you have done, the problems you solved and the numbers behind them, the details people usually leave out of their own CV.",
      "Then we rewrite duties as achievements, put the most relevant experience first and cut what doesn't help. The layout is clean and single-column, so it reads well for a person and for the screening software many employers now use.",
      "Every CV is written for a target. A bank, a government post, an NGO, the UN system and a scholarship panel each look for different things. Your cover letter answers the question every reader has: why you, for this role, now?",
      "You receive an editable Word file and a PDF, plus tips for your LinkedIn headline and summary, so your profile tells the same story as your application.",
    ],
    principles: [
      { title: "Achievements, not duties", body: "Each role shows what changed because you were there, with numbers wherever possible." },
      { title: "Written for the advert", body: "The same keywords and priorities as the job you are applying for." },
      { title: "Readable by people and software", body: "A clean structure that screening systems read correctly." },
      { title: "Sounds like you", body: "Confident and honest, never inflated." },
    ],
    gallery: [
      { image: "/images/img-08.webp", title: "NGO & UN applications", caption: "Competency-based CVs and letters" },
      { image: "/images/img-06.webp", title: "Scholarships & study abroad", caption: "Academic CVs and personal statements" },
      { image: "/images/img-02.webp", title: "Job applications", caption: "Private sector, government and banks" },
    ],
  },

  proposals: {
    tagline: "Proposals. Shaped the way funders read.",
    statement:
      "Funders read dozens of proposals for every one they fund. We write yours so the problem, the plan and the budget tell one clear story that is easy to say yes to.",
    paragraphs: [
      "We begin by reading the call for proposals with you: the eligibility rules, the scoring criteria, the page limits and the template. Every section we write is aimed at the points a reviewer is asked to score.",
      "Then we sharpen your idea into a problem statement backed by evidence, objectives that are specific and measurable, and activities that clearly lead to results. Where a logical framework or theory of change is required, we build it with you.",
      "The work plan and budget narrative are written to match the activities line by line, because a budget that doesn't fit the plan is one of the quickest ways to lose a reviewer's confidence.",
      "For research proposals, we follow your department's structure and make sure your methodology can actually answer your questions. Two rounds of revisions are included, so the final version reflects your voice and your organisation.",
    ],
    principles: [
      { title: "Scored, not just read", body: "Each section answers the criteria reviewers use." },
      { title: "Evidence for the need", body: "Data and sources that show why the problem matters now." },
      { title: "Results you can measure", body: "Objectives, indicators and activities that connect." },
      { title: "A budget that fits", body: "Every cost traced back to an activity in the plan." },
    ],
    gallery: [
      { image: "/images/img-07.webp", title: "Concept notes", caption: "Short first-round submissions" },
      { image: "/images/img-01.webp", title: "Research proposals", caption: "Masters and PhD" },
      { image: "/images/img-05.webp", title: "Grant proposals", caption: "NGOs, CBOs and foundations" },
    ],
  },

  "business-plans": {
    tagline: "Business plans. With numbers that hold up.",
    statement:
      "A business plan is a promise in numbers. We build yours on real market research and honest forecasts, so a bank, an investor or a judge can see how the business works and how it will grow.",
    paragraphs: [
      "We start by understanding your business: what you sell, who buys, what it costs to run and what the money you are raising will do. If you are applying to a bank, a SACCO or a competition, we follow their format and requirements.",
      "Market research comes next: customers, competitors, prices and demand in your area. Local evidence, such as supplier quotes and prices you have checked, makes a plan believable in a way that general statistics never do.",
      "The financials are built in TZS: start-up costs, monthly cash flow, a three-year profit and loss and the assumptions behind every figure. Forecasts are realistic, because lenders trust modest numbers they can follow.",
      "You receive a complete plan with an executive summary and a pitch outline, ready for the questions a loan officer or investor will ask. And because you understand every number, you can run the business by it too.",
    ],
    principles: [
      { title: "Research before writing", body: "Customers, competitors and prices checked, not assumed." },
      { title: "Cash flow first", body: "Month-by-month numbers that show you can repay." },
      { title: "Assumptions on the page", body: "Every forecast explained, so the reader can follow it." },
      { title: "Ready for questions", body: "An executive summary and pitch outline to present with confidence." },
    ],
    gallery: [
      { image: "/images/img-06.webp", title: "Investor pitches", caption: "Plans and pitch outlines" },
      { image: "/images/img-08.webp", title: "Competitions & grants", caption: "Youth and start-up programmes" },
      { image: "/images/img-04.webp", title: "Bank & SACCO loans", caption: "Plans built around cash flow" },
    ],
  },
};
