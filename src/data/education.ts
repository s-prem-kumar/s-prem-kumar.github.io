import type { Education } from "@/types/portfolio";

/** Academic history, newest first. */
export const education: Education[] = [
  {
    institution: "Periyar Maniammai Institute of Science & Technology",
    degree: "B.Tech",
    field: "Computer Science Engineering (Data Science)",
    location: "Thanjavur, Tamil Nadu",
    startYear: "2021",
    endYear: "2025",
    details: [
      "Final-year project: “Enhancing LLM Accuracy and Reducing Hallucinations using Query Refinement Technique and Knowledge Graphs”, supervised by Dr. T. Kavitha.",
      "Presented at ICASTM-II 2025 and preprinted on Authorea; achieved an F1 of 91.1% on MedQA by grounding LLM output in a UMLS knowledge graph.",
    ],
  },
];
