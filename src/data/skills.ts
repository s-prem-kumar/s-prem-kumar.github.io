import type { SkillCategory } from "@/types/portfolio";

/**
 * Skills, grouped by category. Deliberately no proficiency bars or
 * percentages — recruiters don't believe them and they're impossible to
 * justify in an interview.
 *
 * To add a skill: find the right category and append to `items`. To add a
 * whole category: append a new object. The UI loops over this array, so
 * nothing else needs to change.
 *
 * ---------------------------------------------------------------------------
 * KEEP THIS IN SYNC WITH `projects.ts`
 * ---------------------------------------------------------------------------
 * A technology that appears as a chip on a project card but is missing here
 * reads as an oversight — the visitor sees you shipped with it, then can't
 * find it in your skill list.
 *
 * Everything below was read off a real source: the CashPilot repository's
 * package manifests, the LLM research project's report, or your résumé.
 * Anything marked `// verify` is an inference rather than something stated —
 * read each one and delete it if you wouldn't want to be questioned on it.
 * ---------------------------------------------------------------------------
 */
export const skills: SkillCategory[] = [
  {
    category: "Programming Languages",
    items: ["Python", "TypeScript", "JavaScript", "C", "C++", "R"],
  },
  {
    category: "LLM & Generative AI",
    items: [
      "LangChain",
      "LangGraph",
      "Ollama",
      "Llama 3.2",
      "RAG",
      "Vector Embeddings",
      "HuggingFace Embeddings",
      "Semantic Search",
      "Knowledge Graphs",
      "Prompt Engineering",
      "LLM Evaluation",
    ],
  },
  {
    category: "AI / Machine Learning",
    items: [
      "TensorFlow",
      "Keras",
      "Scikit-learn",
      "OpenCV",
      "CNNs",
      "Transfer Learning",
      "Computer Vision",
      "YOLO",
      "Object Detection",
    ],
  },
  {
    category: "Data & Analytics",
    items: [
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "Plotly",
      "NetworkX",
      "Power BI",
      "Tableau",
    ],
  },
  {
    // CashPilot's frontend and this portfolio, both Next.js.
    category: "Frontend",
    items: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "React Hook Form",
      "Zod",
      "Streamlit",
      "HTML",
    ],
  },
  {
    // CashPilot's API layer.
    category: "Backend",
    items: [
      "NestJS",
      "Node.js",
      "REST APIs",
      "JWT & Passport",
      "bcrypt",
      "Helmet",
      "Rate limiting",
      "Nodemailer",
    ],
  },
  {
    category: "Databases",
    items: [
      "SQL",
      "PostgreSQL",
      "Prisma ORM",
      "Schema migrations",
      "Neo4j",
      "Cypher",
      "Pinecone",
      "FAISS",
    ],
  },
  {
    // The bank-statement pipeline in CashPilot, plus its report exports.
    category: "Document & File Processing",
    items: [
      "pdfjs-dist",
      "PyPDF2",
      "Tesseract.js (OCR)",
      "SheetJS",
      "jsPDF",
      "Multer",
    ],
  },
  {
    // Every one of these has a script or suite in the CashPilot repository.
    category: "Testing & QA",
    items: [
      "Jest",
      "Playwright",
      "Supertest",
      "React Testing Library",
      "k6",
      "OWASP ZAP",
    ],
  },
  {
    category: "Tools & Deployment",
    items: [
      "Git",
      "GitHub",
      "Docker",
      "Docker Compose",
      "GitHub Actions",
      "GitHub Pages",
      "CI/CD",
      "Vercel",
      "Claude Code",
      "VS Code",
      "RStudio",
    ],
  },
];
