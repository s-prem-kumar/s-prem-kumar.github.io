import type { Profile } from "@/types/portfolio";

/**
 * Core identity. Edit this file to change your name, headline, bio, contact
 * details and the canonical site URL used for SEO.
 */
export const profile: Profile = {
  name: "Prem Kumar Selvakumar",
  shortName: "Prem Kumar",
  headline: "Data Science Engineer — LLM, RAG & Computer Vision",

  tagline:
    "I build retrieval-augmented LLM systems and computer vision models — from vector database design to knowledge-graph grounding.",

  /**
   * The "Background" section. Each string renders as its own paragraph.
   *
   * Written from what's actually on the site — the roles in `experience.ts`,
   * the projects in `projects.ts`, the research in `achievements.ts`. When you
   * add something new (a certification, a shipped feature, a new role), come
   * back and work it in here too, otherwise the summary quietly falls behind
   * the evidence below it.
   */
  bio: [
    "I'm a Computer Science Engineering (Data Science) graduate from Periyar Maniammai Institute of Science & Technology, Thanjavur, currently working as a Developer Intern at Arivar Techlabs. My work sits across two things that usually get kept apart: retrieval systems that keep language models honest, and the ordinary full-stack engineering that turns either of them into something a person can actually use.",

    "Most of my recent time has gone into CashPilot, a personal finance platform built with Next.js and NestJS on PostgreSQL and Prisma. It takes the bank statement PDFs you already receive and pulls the transactions out of them — reading embedded text where the PDF has it, falling back to OCR in an isolated worker where it doesn't — then reconciles those rows against records you keep by hand. The problems worth solving there weren't the CRUD. They were making sure the same statement can't be counted twice, that a re-issued statement doesn't re-import rows you already hold, and that a crashing OCR worker can't take the API down with it.",

    "Earlier, as a Junior Data Science Intern at Avivo AI, I engineered RAG-based LLM pipelines that improved response relevance by 25–35%, and designed the vector database architecture on Pinecone and Neo4j that cut query latency by 30%.",

    "My final-year research went at LLM hallucination from an unusual angle: instead of trying to validate the model's prose, it makes the model emit a Cypher query and validates that instead. A three-phase checker repairs syntax, node types and relationship directions before the query ever reaches a UMLS knowledge graph of roughly 1.5 million concepts and 62.7 million relationships. It corrected 85% of faulty queries and reached an F1 of 91.1% on MedQA. The work was presented at ICASTM-II 2025 and preprinted on Authorea.",

    "Alongside that I work with classical deep learning — CNNs and transfer learning for image classification, and real-time object detection with YOLO for a traffic signal controller that allocates green time from measured vehicle density rather than a fixed timer.",
  ],

  location: "Thanjavur, Tamil Nadu, India",
  email: "premkumar28504@gmail.com",
  phone: "+91 8015649963",

  resumeUrl: "/resume/resume.pdf",

  // Your GitHub Pages user site. This is derived from your GitHub *username* —
  // the repository must be named exactly "<username>.github.io" for it to serve
  // from the root. Change your username and this changes with it.
  //
  // Drives canonical URLs, Open Graph tags, the sitemap and the JSON-LD.
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://premkumar28504-boop.github.io",

  // Flip to false to hide the "Open to opportunities" badge in the hero.
  openToWork: true,

  // Remove this line to fall back to an initials monogram in the hero.
  avatar: "/images/profile/avatar.png",
};
