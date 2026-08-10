import type { Experience } from "@/types/portfolio";

/**
 * Work history, newest first.
 *
 * NOTE: `startDate`, `endDate` and `location` are optional. Add them when you
 * have them — the timeline renders fine without, but dates are one of the
 * first things a recruiter looks for.
 */
export const experience: Experience[] = [
  {
    company: "Arivar Techlabs Pvt Ltd",
    parentCompany: "Yakka Services Pvt Ltd",

    role: "Developer Intern",

    // ⚠️ ADD: the month you started, e.g. startDate: "Jun 2026".
    endDate: "Present",

    // ⚠️ ADD: location, e.g. location: "Chennai, Tamil Nadu" or "Remote".

    /* ⚠️ EMPTY ON PURPOSE.
     *
     * I don't know what you're working on here, and inventing bullets for a
     * live internship is the fastest way to get caught out in an interview.
     * Add 2–4 lines describing what you're actually building. The most useful
     * shape is "did X, which achieved Y":
     *
     *   "Built <thing> using <tech>, which <measurable outcome>."
     *
     * The section renders cleanly with this empty until then. */
    responsibilities: [],

    // ⚠️ ADD once you know the stack you're using here.
    // technologies: ["Python", "..."],

    // ⚠️ ADD the company site if it has one — your email domain suggests
    // arivar.io, but I've left it out rather than ship a link I haven't checked.
    // url: "https://arivar.io",
  },

  {
    company: "Avivo AI",
    role: "Junior Data Science Intern",

    responsibilities: [
      "Engineered RAG-based LLM pipelines improving response relevance by 25–35%.",
      "Designed vector database architecture (Pinecone, Neo4j), reducing query latency by 30%.",
      "Built modular backend components improving scalability and code reusability.",
      "Optimized frontend-backend interaction for faster response time.",
    ],

    technologies: ["RAG", "LLM Pipelines", "Pinecone", "Neo4j", "Python"],
  },
];
