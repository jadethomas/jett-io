export type FaqItem = {
  id: string
  question: string
  answer: string
}

export const faqItems: FaqItem[] = [
  {
    id: "who-runs-jett-io",
    question: "Who runs jett.io?",
    answer:
      "Jade Thomas — an Engineering Manager at BNZ with 6+ years leading digital engineering teams. The blog is a personal project, written and edited by Jade.",
  },
  {
    id: "what-do-you-write-about",
    question: "What topics does the blog cover?",
    answer:
      "Engineering leadership in the age of AI: AI/ML in production, DevOps practices that actually ship, security beyond theatre, and resilient systems. Posts focus on what works in real engineering teams, not vendor pitches or theory.",
  },
  {
    id: "how-often-do-you-post",
    question: "How often do new posts go up?",
    answer:
      "There's no fixed cadence. Posts ship when there's something worth saying — usually one or two per month. Quality over volume.",
  },
  {
    id: "is-there-an-rss-feed",
    question: "Is there an RSS feed?",
    answer:
      "Not yet — it's on the roadmap. In the meantime, the newsletter is the most reliable way to be notified of new posts.",
  },
  {
    id: "how-do-i-subscribe",
    question: "How do I subscribe to the newsletter?",
    answer:
      "Use the signup form at the bottom of the home page or any blog post. You'll get an email when a new post goes up. No spam, no marketing — just posts.",
  },
  {
    id: "opinions-vs-employer",
    question: "Do these posts represent your employer's views?",
    answer:
      "No. All posts on jett.io are personal opinions. They do not represent the views or positions of BNZ or any other organisation. If a post references a specific company, it's either public information or used with permission.",
  },
  {
    id: "can-i-quote-or-reuse-content",
    question: "Can I quote or reuse posts in my own work?",
    answer:
      "Short quotations with attribution are welcome — a link back to the original post is appreciated. For full reposts, translations, or commercial use, please get in touch first.",
  },
  {
    id: "can-i-suggest-topics",
    question: "Can I suggest a topic or ask a question?",
    answer:
      "Yes — reach out via the contact links on the About page. Reader questions often turn into posts, and good ones get a reply.",
  },
  {
    id: "how-do-i-report-an-issue",
    question: "I found a typo or broken link — how do I report it?",
    answer:
      "The fastest path is an email via the About page. Include the URL of the post and a brief description; fixes usually ship the same week.",
  },
  {
    id: "is-the-site-open-source",
    question: "Is the site open source?",
    answer:
      "The site is a personal project and its source is not currently public. If that changes, this answer will be updated.",
  },
]
