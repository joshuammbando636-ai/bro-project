/**
 * BLOG POSTS — "Latest updates".
 *
 * Newest first. To publish a post, add an object at the top of `posts`:
 * every post gets its own page at /blog/<slug>, a sitemap entry and
 * search-engine metadata automatically. Keep slugs short, lowercase and
 * hyphenated (they become the URL and should never change once live).
 *
 * Body blocks: { p } paragraph · { h2 } subheading · { ul } bullet list.
 * Links inside text: [words](/blog/other-post) or [words](/services/cvs).
 * Link each new post to one or two older ones (and back): it helps readers
 * and helps Google find and rank every post.
 */

import type { ServiceSlug } from "./site";

export type PostBlock = { p: string } | { h2: string } | { ul: string[] };

export interface Post {
  slug: string;
  title: string;
  /** One or two sentences: shown on cards and used as the search-result description */
  excerpt: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  category: string;
  /** Cover image in /public */
  image: string;
  /** The service this post leads to (call-to-action at the end) */
  service: ServiceSlug;
  body: PostBlock[];
}

// TODO: check the dates and wording before launch; add new posts at the top
export const posts: Post[] = [
  {
    slug: "cv-that-gets-shortlisted",
    title: "How to write a CV that gets you shortlisted",
    excerpt:
      "A step-by-step guide to writing your own CV: what to include, what to leave out, and how to turn your duties into results a recruiter notices in seconds.",
    date: "2026-10-12",
    category: "CVs & careers",
    image: "/images/img-02.webp",
    service: "cvs",
    body: [
      {
        p: "Most CVs are rejected not because the person is unqualified, but because the reader could not find the evidence quickly. A shortlister may be going through a hundred applications for one post, giving each one a first read of less than a minute. Your job is to make their decision easy. This guide takes you through writing your CV section by section, with examples you can adapt.",
      },
      { h2: "Before you write: collect your evidence" },
      {
        p: "A strong CV is built from facts, so gather them first. Open a blank page and, for every job, internship, volunteer role or major project you have done, answer these questions:",
      },
      {
        ul: [
          "What was I responsible for, and for how many people, clients, sites or shillings?",
          "What did I improve, start, fix or finish?",
          "Is there a number I can attach: a percentage, a total, a deadline met?",
          "What did my supervisor or customers thank me for?",
        ],
      },
      {
        p: "This becomes your master list. You will not use all of it in every application, but you will never again sit in front of an advert wondering what to say.",
      },
      { h2: "1. Contact details: short and professional" },
      {
        p: "Put your full name at the top, then your phone number with the country code (+255), a professional email address, your town and, if you have one, your LinkedIn profile. That is all. Date of birth, religion, marital status, tribe and a photo are not needed unless the advert asks for them, and leaving them out keeps the reader focused on your skills.",
      },
      {
        p: "If your email is something like sweetboy99@…, create a new one with your name in it. It costs nothing and it is the first impression.",
      },
      { h2: "2. A profile written for this job" },
      {
        p: "Under your name, write three or four lines that say who you are, what you are good at and what you have achieved. Replace the old \"Career objective\" line, which talks about what you want, with a profile that talks about what you offer.",
      },
      {
        p: "Before: \"Seeking a challenging position in a reputable organisation where I can utilise my skills.\"",
      },
      {
        p: "After: \"Accountant with four years' experience in SACCO finance, managing monthly reporting for 2,000+ members. Introduced a reconciliation process that cut month-end closing from ten days to four. CPA (T) finalist.\"",
      },
      {
        p: "Read the job advert and use the same words it uses. If it asks for \"monitoring and evaluation\", say monitoring and evaluation, not \"tracking project progress\".",
      },
      { h2: "3. Experience: results, not duties" },
      {
        p: "List your jobs with the most recent first: job title, organisation, town and dates (month and year). Under each, write three to six bullet points. The simple formula is: action word + what you did + scale + result.",
      },
      {
        ul: [
          "Instead of \"Responsible for data collection\", write \"Collected and cleaned survey data from 1,200 households across three regions, delivered two weeks ahead of schedule\"",
          "Instead of \"Handled customers\", write \"Served 60+ customers a day and resolved complaints, raising the branch's satisfaction score from 72% to 88%\"",
          "Instead of \"Taught mathematics\", write \"Taught Form III and IV mathematics to classes of 70; pass rate rose from 41% to 63% in two years\"",
        ],
      },
      {
        p: "Start each point with a strong verb: led, managed, trained, designed, reduced, increased, organised, wrote, analysed. If you do not have exact numbers, a careful estimate (\"about 30 clients a week\") is better than none.",
      },
      { h2: "4. Education, training and skills" },
      {
        p: "List qualifications with the most recent first: the award, the institution and the year. Recent graduates can add their GPA or class if it is strong and a line about their final-year project. Short courses and certificates go here too, but only those relevant to the job.",
      },
      {
        p: "For skills, be specific. \"Computer literate\" says little; \"Advanced Excel (pivot tables, VLOOKUP), SPSS, QuickBooks\" says a lot. Add languages with your level, for example Kiswahili (native) and English (fluent).",
      },
      { h2: "5. Referees" },
      {
        p: "Give two or three referees, ideally a recent supervisor and someone who taught or mentored you. Include each person's name, title, organisation, phone number and email. Always ask them first, and tell them which job you have applied for so they are ready when the call comes.",
      },
      { h2: "Layout that people and software can both read" },
      {
        p: "Many organisations now screen CVs with software before a person reads them. Fancy tables, text boxes, columns and graphics can confuse it. Keep it simple:",
      },
      {
        ul: [
          "A single column with clear headings",
          "One clear font such as Calibri or Arial, size 10–12",
          "Two pages for most roles; academic and UN-style CVs can be longer",
          "Consistent dates, spacing and bullet style throughout",
          "Saved as a PDF named with your name, for example Amina-Juma-CV.pdf, unless the advert asks for Word",
        ],
      },
      { h2: "Tailor it every time" },
      {
        p: "Sending one CV to every job is the most common mistake. Keep your full master CV, then for each application make a copy that moves the most relevant experience to the top and cuts what does not fit. It takes twenty minutes and it is the difference between a CV that is read and one that is filed. Pair it with a short cover letter that answers one question: why you, for this role, now?",
      },
      { h2: "A final check before you send" },
      {
        ul: [
          "Does my profile match the job advert?",
          "Does every bullet show a result, not just a duty?",
          "Have I checked spelling, especially names of organisations?",
          "Are my phone number and email correct?",
          "Have I asked someone else to read it once?",
        ],
      },
      {
        p: "Applying for a Masters or PhD scholarship? Most panels ask for a research proposal alongside your CV. Our guide to [research proposal structure](/blog/research-proposal-structure) walks through each section step by step.",
      },
      {
        p: "If you have written your CV and want a second pair of eyes, or would rather we write it with you, we interview you on WhatsApp and turn your experience into a [CV and cover letter](/services/cvs) that sound like you at your best.",
      },
    ],
  },
  {
    slug: "research-proposal-structure",
    title: "How to write a research proposal, step by step",
    excerpt:
      "A practical guide to writing your own research proposal: each section your supervisor expects, a worked example, and the mistakes that most often send drafts back.",
    date: "2026-10-12",
    category: "Research & study",
    image: "/images/img-03.webp",
    service: "research-papers",
    body: [
      {
        p: "A research proposal is an argument: this problem matters, nobody has fully answered it, and here is a realistic way to study it. Every section should support that argument. Universities differ in the details, so always check your department's guidelines first, but most proposals follow the same backbone. Below we go through it in the order you should actually write it, using one example topic throughout.",
      },
      {
        p: "Our example: a student studying why few women small traders in Dodoma use mobile money to save, even though most of them use it to send and receive money.",
      },
      { h2: "Step 1: Choose a topic you can actually study" },
      {
        p: "A good topic is narrow, current and possible with your time and budget. \"Mobile money in Tanzania\" is too broad. \"Factors influencing the use of mobile money savings among women small traders in Dodoma City\" names who, what and where. Before you commit, check three things: is there literature on it, can you reach the people you need, and can you finish data collection in the time you have?",
      },
      { h2: "Step 2: Write the problem statement" },
      {
        p: "This is the heart of the proposal, so write it before anything else. In one focused paragraph, say what is happening, why it is a problem, who is affected and what is still unknown. A useful pattern is: the ideal situation, the reality, the consequence, and the gap.",
      },
      {
        p: "Example: \"Mobile money is widely used by small traders in Tanzania to send and receive payments, and savings products are available on every major network. However, studies suggest that few women traders use these products to save, keeping cash at home or in informal groups instead. This leaves their savings exposed to loss and limits their access to credit. Little is known about the reasons behind this pattern among women traders in Dodoma.\"",
      },
      {
        p: "Test it: can you say your problem in one sentence? If your supervisor cannot repeat it back to you, it is not clear enough yet.",
      },
      { h2: "Step 3: Set objectives and research questions" },
      {
        p: "Write one general objective, then three or four specific objectives. Each specific objective should match one research question, and each question must be answerable with the data you plan to collect. Start objectives with measurable verbs: to determine, to assess, to examine, to identify. Avoid \"to understand\" and \"to know\", which cannot be measured.",
      },
      {
        ul: [
          "General objective: to assess the factors influencing the use of mobile money savings among women small traders in Dodoma City",
          "Specific objective 1: to determine the level of awareness of mobile money savings products. Question: how aware are women traders of these products?",
          "Specific objective 2: to examine the influence of trust in mobile network operators. Question: does trust affect their decision to save?",
          "Specific objective 3: to identify the costs and barriers traders face. Question: what stops them from saving this way?",
        ],
      },
      { h2: "Step 4: Review the literature by theme" },
      {
        p: "The most common mistake is summarising sources one by one: \"Smith (2019) found… Juma (2021) found…\". Instead, group your reading by theme, usually one theme per specific objective. Under each theme, show where authors agree, where they disagree and what they have not covered. End the chapter by pointing clearly at the gap your study fills.",
      },
      {
        p: "Use recent, peer-reviewed sources where you can; Google Scholar and your university library databases are good starting points. Keep a record of every source as you read, with author, year, title and page, so referencing at the end is easy. Free tools like Zotero or Mendeley do this for you.",
      },
      { h2: "Step 5: Plan your methodology" },
      {
        p: "Here you explain exactly how you will answer your questions. Cover each of the following, and give a reason for each choice, not just the choice itself:",
      },
      {
        ul: [
          "Research design: for example, a cross-sectional survey, a case study or a mixed-methods design",
          "Study area: where, and why there",
          "Target population and sample size, with the formula you used (for example Yamane's or Cochran's)",
          "Sampling technique: random, stratified, purposive and so on",
          "Data collection tools: questionnaire, interview guide, observation checklist",
          "Data analysis: for example descriptive statistics and regression in SPSS for numbers, thematic analysis for interviews",
          "Validity, reliability and ethics: pilot testing, informed consent and research permits",
        ],
      },
      { h2: "Step 6: Work plan, budget and references" },
      {
        p: "Show a realistic timeline, often as a simple Gantt chart, from proposal approval to final submission. Your budget should match your methods: if you plan to interview 200 traders, it should include transport, printing and research assistants. Finally, check that every source you cited appears in the reference list, in the style your university uses, such as APA or Harvard.",
      },
      { h2: "Step 7: Write the introduction and title last" },
      {
        p: "The background section and your title are much easier to write once you know exactly what your study will do. Start the background broad, with the global or national picture, then narrow quickly to your specific setting and problem. Two to three pages is usually enough.",
      },
      { h2: "Why proposals come back, and how to avoid it" },
      {
        ul: [
          "A vague problem statement that describes a topic instead of a problem",
          "Objectives that do not match the research questions, or cannot be measured",
          "A literature review that lists sources instead of building an argument",
          "Methods that are named but not justified",
          "Inconsistent referencing and formatting",
        ],
      },
      {
        p: "Fix those five and you are most of the way there. Read your proposal once more asking a single question: does every section support the problem I stated at the start?",
      },
      {
        p: "Sending your proposal with a scholarship or funding application? You will usually need a strong CV too. Here is [how to write a CV that gets you shortlisted](/blog/cv-that-gets-shortlisted).",
      },
      {
        p: "Stuck on a section, or short on time? See [how we work on research papers and proposals](/services/research-papers). We can review your draft or work through it with you.",
      },
    ],
  },
];

/** Inline link markup in post text: [words](/path) */
export const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Rough reading time at ~220 words a minute */
export function readingMinutes(post: Post) {
  const words = post.body
    .flatMap((b) => ("p" in b ? b.p : "h2" in b ? b.h2 : b.ul.join(" ")))
    .join(" ")
    .replace(LINK, "$1")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}
