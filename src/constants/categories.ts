export const BLOG_CATEGORIES = [
  {
    name: "Engineering Diaries",
    description: "Personal stories and lessons from real-world software engineering experiences.",
  },
  {
    name: "Deep Dives",
    description: "In-depth technical explorations of technologies, patterns, or concepts.",
  },
  {
    name: "System Design",
    description: "Discussions on architecture, scalability, trade-offs, and real-world design strategies.",
  },
  {
    name: "Tech Reviews & Opinions",
    description: "Insights, critiques, and opinions on tools, frameworks, and emerging tech trends.",
  },
  {
    name: "Quick Overviews",
    description: "Concise summaries and introductions to new technologies or concepts.",
  },
] as const;


export const BLOG_CATEGORY_NAMES = BLOG_CATEGORIES.map((c) => c.name);

export type BlogCategory = (typeof BLOG_CATEGORY_NAMES)[number];