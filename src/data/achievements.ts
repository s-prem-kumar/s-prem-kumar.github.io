import type { Achievement } from "@/types/portfolio";

/**
 * Notable achievements — papers, talks, competitions, awards.
 * The section hides itself entirely if this array is empty.
 */
export const achievements: Achievement[] = [
  {
    title: "Paper presented at ICASTM-II 2025",
    description:
      "Gave an oral presentation of “Improving LLM Accuracy and Minimizing Hallucinations with Query Refinement and Knowledge Graphs” at the Second International Conference on Advancements in Science, Technology and Management, jointly organised by St. Xavier's College of Management & Technology, Patna and Global Conference Hub, Coimbatore, on 11–12 April 2025.",
    date: "Apr 2025",
  },
  {
    title: "Preprint published on Authorea (Wiley)",
    description:
      "“Enhancing LLM Accuracy and Reducing Hallucinations using Query Refinement Technique and Knowledge Graphs”, written with my project team under the guidance of Dr. T. Kavitha. Open for feedback and citation.",
    date: "Apr 2025",
    url: "https://doi.org/10.22541/au.174491149.99244128/v1",
  },
];
