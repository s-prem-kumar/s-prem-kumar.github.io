import type { Project } from "@/types/portfolio";

/**
 * ============================================================================
 * PROJECTS — the single source of truth for the whole portfolio.
 * ============================================================================
 *
 * Adding a project:
 *   1. Copy the template at the bottom of this file.
 *   2. Paste it into the array below, in the position you want it displayed.
 *   3. Drop a screenshot in `public/images/projects/` and set `image`.
 *
 * That's it. The card, the /projects grid, the /projects/<slug> case study
 * page and the sitemap all generate themselves. You never need to touch a
 * component to add, remove or reorder a project.
 *
 * BUTTON RULES (so you never ship a dead link):
 *   🚀 Live Demo   renders only when `demoAvailable: true` AND `liveDemo` is set
 *   💻 GitHub      renders only when `github` is set
 *   📖 Case Study  always renders — it's an internal page
 *
 * ---------------------------------------------------------------------------
 * ⚠️  TWO THINGS TO REVIEW BEFORE YOU PUBLISH
 * ---------------------------------------------------------------------------
 *
 * 1. `github` is omitted on every project below because none of these repos
 *    are public on github.com/s-prem-kumar yet. Push each project,
 *    then add its `github` URL here.
 *
 * 2. The `technologies` lists were assembled from your resume's skills section
 *    combined with each project's bullet points. A few entries are reasonable
 *    inferences rather than things the resume states outright (marked with a
 *    // verify comment). Read each list and delete anything you didn't
 *    actually use — an interviewer will ask about every chip on the card.
 * ---------------------------------------------------------------------------
 */
export const projects: Project[] = [
  /* ======================================================================== */
  {
    slug: "cashpilot",
    title: "CashPilot",
    category: "Full-Stack",
    date: "2026",
    sortKey: "2026-08",
    featured: true,

    // "Live" because the demo below genuinely is — it ships as part of this
    // site. The full application isn't publicly deployed; that's stated plainly
    // in the deployment section rather than implied away by the badge.
    status: "Live",

    shortDescription:
      "Open-source personal finance platform that extracts transactions from bank statement PDFs.",

    description:
      "A personal finance tracker built around one idea: the data you need is already in the statements your bank sends you, so you shouldn't have to type it in again. Upload a statement PDF and CashPilot extracts the transactions, detects which of ten Indian banks issued it, classifies each row as debit or credit, and maps them against income and expense records you keep by hand. From there it builds a live dashboard and seven exportable reports. The extraction runs entirely on npm packages — pdfjs-dist for embedded text, tesseract.js for scanned statements — with no LLM, no external OCR binary and no paid API anywhere in the pipeline.",

    /* Taken from the repo's own README and package manifests. */
    technologies: [
      "Next.js 15",
      "React 19",
      "NestJS 10",
      "TypeScript",
      "PostgreSQL",
      "Prisma 6",
      "JWT",
      "Tailwind CSS",
      "pdfjs-dist",
      "tesseract.js",
      "Docker",
      "Playwright",
    ],

    features: [
      "Bank statement upload (PDF, ≤20 MB) with automatic detection across 10 Indian banks",
      "Transaction extraction from both text-based and scanned statements, via OCR fallback",
      "Duplicate-safe re-uploads — a review dialog shows what will import and what will be skipped before anything is committed",
      "Manual income and expense records, mapped one-to-one against extracted bank transactions",
      "Reusable master data: parent categories, categories, vendors and employees, with soft delete and multi-select",
      "Dashboard with six charts, rule-based insights and date-range filters",
      "Seven analytical reports with filtering, sorting, pagination and Excel/PDF export",
      "Email OTP verification, password reset, avatar upload and account deletion",
      "One-command local setup with Docker Compose — Postgres, API and frontend",
    ],

    /* No `github` field, so no 💻 View source button renders — on the card or
     * on the case study. Add the line back to bring it straight back:
     *   github: "https://github.com/s-prem-kumar/cashpilot-",
     */

    /* 🚀 Try Demo — a static, client-side replica that ships with this
     * portfolio. See src/demo/cashpilot/. No backend, no database, no real
     * data, so it never sleeps and costs nothing to keep running. */
    liveDemo: "/demo/cashpilot",
    demoAvailable: true,
    demoCredentials: {
      email: "cashpilot@gmail.com",
      password: "Demo@123",
      note: "For illustration only. This is a simplified, read-only replica built to show how CashPilot works — it does not reproduce the real application's user experience. Invented data throughout. You can map and unmap transactions; creating, deleting and uploading are disabled. Refresh to reset.",
    },

    problem:
      "Every bank hands you your own transaction history as a PDF built for archiving, not for reading. Getting it into a form you can reason about means either retyping hundreds of rows into a spreadsheet or handing your statements to an aggregator that wants your net-banking credentials. Most personal finance apps solve this by asking you to link your bank account; the ones that don't, leave you doing data entry, and nobody keeps that up past the second month.",

    solution:
      "CashPilot takes the statement PDF as the input and does the extraction itself. The file never leaves the server it's uploaded to, there are no bank credentials involved, and the parsing is rule-based rather than model-based — so the output is inspectable and the same input always produces the same rows. Extracted transactions can then be mapped one-to-one against manually kept income and expense records, which is what turns a list of bank rows into a categorised picture of where the money went.",

    architecture: [
      "The backend is a modular NestJS application where each domain — auth, user, income, expense, masters, bank-statement, transaction, mapping, dashboard, reports, mail — is a self-contained controller, service and DTO set sharing one PrismaService. The frontend is a separate Next.js App Router application, so the two deploy independently.",
      "PostgreSQL holds eleven Prisma models. The interesting ones are BankStatement and BankTransaction (what was extracted), Income and Expense (what you recorded by hand), and TransactionMapping, the join that links the two — keeping the bank's version of events and yours as separate records that reference each other rather than merging them.",
      "Authentication is JWT carried in an HttpOnly cookie, with bcrypt password hashing and email OTP verification. Because the token lives in a cookie rather than local storage, the frontend never handles it directly.",
      "Two maintenance services run on boot without any external scheduler: one purges expired OTP rows so the table can't grow forever, the other marks statements left mid-processing by a crash as failed, so nothing hangs in limbo after a restart.",
      "The whole stack starts with one `docker compose up --build` — Postgres, then the API (which runs Prisma migrations before serving), then the frontend, ordered by health checks. Postgres is bound to 127.0.0.1 rather than 0.0.0.0, so the database is reachable by local tooling but never exposed to the network.",
    ],

    /* The statement pipeline is the technically interesting part and the
     * hardest thing to convey in a screenshot — hence its own section. */
    challenges: [
      "The same statement could be ingested twice, and nothing on screen looked wrong. Re-uploading a PDF re-imported every row and doubled income and expenses, while Current Balance still read correctly — it takes the statement's closing row rather than summing. Each upload is now identified by the SHA-256 of its bytes, unique per user, so renaming the file doesn't slip past it and a repeat is refused with a 409 naming the existing statement.",
      "File hashing only catches identical files, which isn't the real case. A bank that re-issues a statement with one extra row produces a different file, and an Apr–Jun statement genuinely overlaps a May–Jul one. Rejecting the second isn't acceptable — its new rows matter — so duplicates are dropped per row instead: by reference number where one exists, and by a content fingerprint where it doesn't.",
      "Per-row deduplication has to be enforced by the database, not the application. Two concurrent uploads each read before the other writes, so both pass any application-level check. A unique constraint on (userId, referenceNumber) plus `skipDuplicates` on the insert makes the loser's rows a no-op rather than a failed import.",
      "The fingerprint deliberately excludes the running balance. A balance describes the account at a moment rather than the transaction, and one backdated row shifts the balance printed on every row after it — which used to make a re-issued statement re-import its entire remainder. Matching is by count rather than presence, because coffee → refund → the same coffee again hashes identically, and silently dropping the second would delete real money from someone's history.",
      "Row order had no reliable key. Statement dates carry no time, and every row of a statement is written in one `createMany` so they share a `createdAt` — ordering by either tied, and Postgres returned same-day rows in whatever order it liked, which made Current Balance report an arbitrary row from the final day instead of the closing balance. The parser emits rows in printed order, so that index is now stored explicitly and every ordered read uses it.",
      "OCR can hard-crash the process. pdfjs's canvas renderer segfaults on some scanned images, so rasterisation runs in an isolated child process that decodes the page's image directly rather than calling `page.render()`. A crash marks the statement for review instead of taking the API down with it.",
    ],

    learnings: [
      "Correctness bugs in a finance app don't announce themselves. The double-import was invisible on the dashboard because the one number a user would sanity-check — the balance — was computed from a source that stayed right.",
      "Uniqueness belongs in the database. Every application-level duplicate check I wrote had a race condition; the constraint doesn't.",
      "What you choose *not* to hash matters as much as what you do. Including the balance in the fingerprint made re-issued statements re-import everything; hashing presentational fields would have done the same.",
      "When two dedupe strategies exist, order them by cost — the reference-number lookup runs first, so a statement whose rows all carry references computes no fingerprints at all.",
      "Isolating anything that can segfault into a child process is cheap insurance. The alternative is a PDF upload that takes down the whole API.",
      "A rule-based parser is slower to write than prompting a model, but it's deterministic, free to run, and you can explain any row it produced.",
    ],

    /* Real security posture, read from the repo — not aspirational. */
    security: [
      "JWT stored in an HttpOnly cookie, so the token is never exposed to client-side JavaScript.",
      "bcrypt password hashing, with email OTP verification on signup and password reset.",
      "Helmet security headers and @nestjs/throttler rate limiting — 60 requests/min/IP globally, tightened to 5/min on credential endpoints and 10/min on OTP.",
      "Uploads restricted to PDF and capped at 20 MB, stored in a private directory that is never served statically.",
      "Postgres bound to loopback only, never 0.0.0.0, so the database isn't reachable from the network.",
      "Secrets read from environment variables with a committed .env.example carrying placeholders only; .env is gitignored, as are database dumps, which contain real rows and password hashes.",
      "OWASP ZAP baseline and authenticated scans scripted in the repo under security/.",
    ],

    testing: [
      "Playwright end-to-end suites covering authentication, bank statements and reports.",
      "A live API test suite under qa/ that exercises the running backend rather than mocks.",
      "Backend unit tests with coverage reporting.",
      "A performance benchmark script under perf/ for load testing, with rate limits raised only for those runs.",
      "OWASP ZAP baseline and authenticated security scans.",
    ],

    /* ⚠️ Aspirational until a demo actually exists — this documents the plan,
     * and the limitations are stated openly per the free-tier rule. */
    deployment: {
      frontend: "Vercel (Hobby) — planned",
      backend: "Render (free web service) — planned",
      database: "Neon (free Postgres) — planned",
      storage: "Render disk or Supabase Storage — planned",
      limitations: [
        "Nothing is deployed yet. The rows above are the intended free-tier target, not a description of something running.",
        "OCR is the real blocker on free hosting: tesseract.js runs as WASM and rasterising a scanned page is memory-hungry, which sits badly inside a 512 MB free instance. Text-based statements parse fine; scanned ones would likely need a paid tier.",
        "A free Render web service sleeps after ~15 minutes idle, so the first request can take ~50 seconds while the instance wakes.",
        "Free Render instances have ephemeral disks — uploaded PDFs would not survive a restart without object storage.",
        "Free Postgres tiers cap storage and may autosuspend, so a public demo database would need periodic reset regardless.",
      ],
    },
  },

  /* ======================================================================== */
  {
    slug: "llm-accuracy-query-refinement-knowledge-graphs",
    title:
      "Enhancing LLM Accuracy and Reducing Hallucinations using Query Refinement and Knowledge Graphs",
    category: "Research",
    date: "May 2025",
    sortKey: "2025-05",
    featured: true,
    status: "Completed",

    /* Final-year B.Tech project, Periyar Maniammai Institute of Science &
     * Technology. Everything below comes from the project report and the
     * Authorea preprint — no figure here is estimated. */
    team: "Prem Kumar S and team",
    // ⚠️ TODO: add your own contribution, e.g.
    // role: "Built the Cypher query-checker module and the evaluation harness."
    // The report credits the three of you jointly and doesn't split the work,
    // so I've left this out rather than assign you something you didn't do.
    // It's the first thing an interviewer will ask about a team project.

    shortDescription:
      "A Cypher query-checker and UMLS knowledge graph that cut LLM hallucination in medical Q&A.",

    description:
      "A question-answering system for biomedical questions that refuses to let the language model answer from memory. Instead of generating prose directly, the LLM generates a Cypher query; that query is then repaired by a three-phase checker and executed against a knowledge graph built from the UMLS Metathesaurus, and only the facts it returns are handed back to the model to phrase an answer. Every claim therefore traces to a node in the graph.",

    /* The checker is the actual contribution — it's what turns "the LLM writes
     * a query" into something you can trust in a high-stakes domain. */
    technologies: [
      "Python",
      "Neo4j",
      "Cypher",
      "LangChain",
      "Ollama",
      "Llama 3.2",
      "Streamlit",
      "UMLS",
      "Knowledge Graphs",
      "Prompt Engineering",
      "scikit-learn",
    ],

    features: [
      "Natural-language questions translated into Cypher queries against a biomedical knowledge graph",
      "Three-phase query checker: syntax, node-type and relationship-direction correction",
      "Re-prompt loop that returns invalid queries to the LLM with specific error feedback",
      "Knowledge graph built from UMLS 2024AB — ~1.5M concept nodes, 62.7M relationships",
      "Answers cite the UMLS concept IDs (CUIs) they were derived from",
      "Streamlit interface for asking questions and inspecting the generated query",
      "Evaluation harness comparing six LLMs, with and without the knowledge graph",
    ],

    problem:
      "Large language models answer confidently whether or not they have grounds to. In medicine that isn't a quirk, it's a hazard — a fluent, plausible, wrong answer about a drug interaction is worse than no answer. Existing mitigations (curating training data, re-testing, response templates) are expensive and don't adapt to new questions. Grounding the model in a knowledge graph solves the source-of-truth problem but introduces a new failure: the model now has to write a correct Cypher query, and it reliably gets specific structural details wrong — mislabelled node types, reversed relationships, returning whole node objects instead of names.",

    solution:
      "The system treats the generated query, not the generated text, as the thing to validate. A question and the live graph schema go to the LLM, which returns a Cypher query. That query passes through a checker with three independent phases — syntax, node type, relationship direction — each of which repairs a specific, recurring class of error rather than rejecting the query outright. Only a query that survives all three runs against the graph; anything unfixable goes back to the LLM with the concrete reason it failed, so the next attempt is informed rather than a re-roll. The model's fluency is preserved, but it is only ever allowed to phrase facts the graph actually returned.",

    architecture: [
      "Data preprocessing runs as four stages over the raw UMLS 2024AB release. An extraction step parses concepts from MRCONSO.RRF, semantic types from MRSTY.RRF, definitions from MRDEF.RRF and relationships from MRREL.RRF, filtering to English terms and mapping semantic type identifiers onto ten labels: Disease, Symptom, Treatment, Drug, Body_Part, Gene, Procedure, Test, Risk_Factor and Concept. Validation then checks every relationship endpoint against the concept set, cleaning drops the relationships that reference concepts which didn't survive filtering, and a merge step consolidates the chunked CSVs into the two files Neo4j's bulk importer expects.",
      "The graph itself is loaded with neo4j-admin rather than through the driver — roughly 1.5 million nodes and 62.7 million relationships import in about 45 seconds that way, where row-by-row insertion would take hours. Relationship names from UMLS are normalised through mapping dictionaries first, so semantically identical relations from different source vocabularies collapse into one edge type.",
      "At query time the schema — the live node labels and relationship types — is read back out of Neo4j through LangChain's Neo4jGraph and injected into the prompt, so the LLM is always writing against the graph as it currently exists rather than a schema hard-coded months earlier. Zero-shot, few-shot and chain-of-thought prompt variants were all tested at this stage.",
      "The query checker is the core of the system. The syntax phase appends .name to RETURN clauses so the query returns readable names instead of whole node objects. The node phase re-derives entity types from the question and corrects mislabelled nodes — 'multiple sclerosis' typed as a pathway becomes a Disease. The relation phase checks each edge against the schema's valid directions and reverses the ones pointing the wrong way, which matters because a reversed contraindication edge is a query that returns the opposite of what was asked.",
      "Validated queries execute against Neo4j; the returned concept names and CUIs are composed into a context block and passed back to the LLM under a prompt that permits it to answer only from that context and requires it to state where in the context the answer came from. The Streamlit front end surfaces the answer alongside the CUIs that produced it.",
    ],

    /* Measured, not estimated. Figures from the report's abstract, conclusion
     * and Table 6.1 / Fig. 6.7. */
    results: [
      {
        // ⚠️ Your report is inconsistent here: the abstract and conclusion both
        // say 91.1% for MedQA, but Table 6.1 lists 90.0 for the same model and
        // dataset. I've used the abstract's figure since it appears twice, but
        // check which is right before anyone reads the paper and asks.
        label: "F1 — MedQA (USMLE)",
        value: "91.1%",
        note: "Llama-3.1-8B-UltraMedical with knowledge graph. State-of-the-art on MedQA sits around 67%.",
      },
      {
        label: "F1 — custom dataset",
        value: "86.0%",
        note: "100-question biomedical set built for this project.",
      },
      {
        label: "Faulty queries repaired",
        value: "85%",
        note: "Share of invalid Cypher queries the three-phase checker corrected before execution.",
      },
      {
        label: "Knowledge graph size",
        value: "62.7M",
        note: "Relationships across ~1.5M UMLS concept nodes, bulk-imported in ~45 seconds.",
      },
      {
        label: "GPT-4-turbo, MedQA F1",
        value: "63.5% → 90.1%",
        note: "The same model without, then with, the knowledge graph — the clearest measure of what grounding is worth.",
      },
      {
        label: "Correct answers",
        value: "47 / 50",
        note: "GPT-4-turbo; the best open-source model, Llama-3.1-8B-UltraMedical, reached 45/50.",
      },
    ],

    challenges: [
      "UMLS at full scale breaks naive processing. The release is large enough that extraction has to write chunked CSVs, and a single pass that holds everything in memory simply doesn't finish.",
      "Referential integrity between the two import files. Filtering concepts down to ten semantic groups orphans every relationship pointing at a dropped concept, and neo4j-admin rejects the whole import over them — so validation had to run first and produce an explicit list of missing concept IDs for the cleaning pass to strip.",
      "The LLM's Cypher errors were systematic rather than random, which is what made the checker viable: the same three failure modes recurred, so each could be repaired deterministically instead of being handed back to the model to guess again.",
      "Relationship direction is the failure that hides. A wrong node label usually returns nothing and is obvious; a reversed edge returns a confident, well-formed, wrong answer.",
      "Evaluating 'did it hallucinate' at all. The final approach scored answers with a separate judge model and reported precision, recall and F1 against it, rather than reading through outputs and forming an impression.",
    ],

    learnings: [
      "Validating the query is far more tractable than validating the answer. Cypher has a schema to check against; free text doesn't.",
      "Deterministic repair beats re-prompting where the error class is known. Re-prompting is the fallback for what the checker can't fix, not the first move.",
      "Grounding did more for accuracy than model size did — an 8B open-source model with the knowledge graph outperformed the same model without it by a wide margin, and closed most of the gap to GPT-4-turbo.",
      "Prompt strategy compounds with grounding rather than substituting for it: on Llama-3.1-8B-UltraMedical, moving from a standard prompt to few-shot and chain-of-thought took correct answers from 23 to 40 out of 50.",
      "Loading tools matter. Choosing neo4j-admin over driver inserts turned a multi-hour step into a 45-second one and made it practical to rebuild the graph whenever the filtering changed.",
      "Writing the work up for a conference forced a level of rigour on the evaluation that a personal project never demands.",
    ],

    /* An interactive walkthrough of the query checker stands in for the live
     * demo — see `src/components/demos/QueryCheckerDemo.tsx`. It uses the
     * worked example from §5.4 of the report. */
    interactiveDemo: "query-checker",

    links: [
      {
        label: "Read the preprint",
        // Authorea (Wiley), preprinted 17 April 2025. If this ever 404s, the
        // report also prints the URL without the slash before v1.
        url: "https://doi.org/10.22541/au.174491149.99244128/v1",
      },
    ],

    demoAvailable: false,
    demoNote:
      "This one genuinely can't be hosted for free, and it's worth being precise about why: the system needs a Neo4j instance holding 62.7 million relationships and a Llama model served locally through Ollama on a GPU. No free tier offers either, let alone both. Rather than fake it with screenshots, the case study below includes a walkthrough of the query checker you can click through — it uses the exact example from the report, and the repairs shown are the ones the code actually performs.",
  },

  /* ======================================================================== */
  {
    slug: "llm-link-pdf-reader",
    title: "LLM-based Link & PDF Reader",
    category: "LLM Application",
    date: "Dec 2024",
    sortKey: "2024-12",
    featured: true,
    status: "Completed",

    shortDescription:
      "Extracts and summarizes content from PDFs and web links using a locally-run LLM.",

    description:
      "A document question-answering tool that takes a PDF or a web link and turns it into something you can actually query. Content is extracted, chunked, and embedded for semantic search, so retrieval pulls the passages that are genuinely relevant rather than the ones that happen to share keywords. Generation runs locally through Ollama, which means documents never leave the machine.",

    technologies: [
      "Python",
      "Ollama",
      "RAG",
      "Semantic Search",
      "LangChain", // verify — listed in your LLM stack; confirm it's what you used here
    ],

    features: [
      "Extracts and summarizes data from PDF documents",
      "Extracts and summarizes content from web links",
      "Semantic search over document content",
      "Chunking strategy tuned for better retrieval quality",
      "Runs locally through Ollama — documents stay on your machine",
    ],

    problem:
      "Long PDFs and dense web pages hold answers that are tedious to dig out by hand, and pasting them into a hosted chatbot means handing over the document itself. Naive approaches also fail on retrieval: feeding an entire document into a prompt is expensive and dilutes the parts that matter.",

    solution:
      "Source content is extracted from the PDF or URL, split into chunks sized for retrieval rather than for reading, and embedded so questions can be matched semantically instead of by keyword. Only the relevant chunks reach the model. Running generation through Ollama keeps the whole pipeline local, which sidesteps the privacy question entirely.",

    architecture: [
      "Ingestion accepts either a PDF upload or a URL and normalizes both into plain text.",
      "The text is chunked with attention to boundaries — chunk size and overlap were tuned, since retrieval quality is far more sensitive to chunking than it first appears.",
      "Chunks are embedded and indexed for semantic search. A question retrieves the closest chunks, which are composed into the prompt.",
      "A local model served by Ollama generates the summary or answer from that retrieved context.",
    ],

    challenges: [
      "PDF extraction is messy in practice — multi-column layouts, headers and footers, and tables all leak noise into the text if you extract naively.",
      "Choosing chunk size and overlap: too small and a chunk loses the context that makes it meaningful, too large and retrieval returns mostly irrelevant text.",
      "Working within the memory and speed limits of running a model locally rather than calling a hosted API.",
    ],

    learnings: [
      "Chunking is the highest-leverage knob in a RAG system, and it's the one most tutorials gloss over.",
      "Semantic search and keyword search fail differently — semantic retrieval handles paraphrasing, but will happily return something topically close and factually irrelevant.",
      "Running models locally with Ollama makes the cost and latency of every design decision immediately visible.",
    ],

    demoAvailable: false,
    demoNote:
      "The project runs its language model locally through Ollama, which no free hosting tier can run as-is. A public demo is planned that swaps the local model for a hosted free-tier inference endpoint while keeping the same retrieval pipeline.",
  },

  /* ======================================================================== */
  {
    slug: "traffic-light-vehicle-detection",
    title: "Traffic Light Vehicle Detection",
    category: "Computer Vision",
    date: "Sep 2024",
    sortKey: "2024-09",
    featured: true,
    status: "Completed",

    shortDescription:
      "Real-time vehicle detection with YOLO, driving adaptive traffic signal timing.",

    description:
      "A real-time vehicle detection system built on YOLO that feeds a dynamic traffic signal controller. Instead of cycling on a fixed timer, the signal reads how many vehicles are actually waiting at each approach and allocates green time based on measured density.",

    technologies: [
      "Python",
      "YOLO",
      "OpenCV", // verify — listed in your AI/ML skills; confirm it's what you used here
      "Computer Vision",
      "Object Detection",
    ],

    features: [
      "Real-time vehicle detection from traffic camera feeds using YOLO",
      "Vehicle counting per approach to estimate traffic density",
      "Dynamic signal control that allocates green time based on measured density",
    ],

    problem:
      "Fixed-timer traffic signals give every approach the same green time regardless of how many vehicles are actually waiting. An empty lane holds its green while a queue builds on the cross street — congestion caused by the controller rather than by traffic volume.",

    solution:
      "A YOLO detector runs over the camera feed for each approach and counts vehicles in real time. Those counts become a density signal, and the controller allocates green time in proportion to it, so the approach with the queue gets the time. The detection has to keep up with the video feed for the signal decision to be based on current conditions rather than stale ones.",

    architecture: [
      "Frames are captured from the traffic camera feed and passed to the YOLO detector.",
      "Detections are filtered to vehicle classes and counted per approach, producing a density estimate for each direction of the junction.",
      "The signal controller consumes those densities and decides green-time allocation, replacing the fixed cycle timer.",
    ],

    challenges: [
      "Keeping inference fast enough to be genuinely real-time — a detection pipeline that lags behind the feed makes decisions on traffic that has already moved.",
      "Detection reliability under real conditions: overlapping and partially occluded vehicles in dense queues are exactly the case where an accurate count matters most.",
      "Translating a raw vehicle count into a sensible green-time allocation without starving a low-volume approach entirely.",
    ],

    learnings: [
      "Detection accuracy and inference speed pull against each other, and the right trade-off is set by the application, not by the benchmark.",
      "A model's output is rarely the finished product — turning bounding boxes into a decision took as much thought as the detection itself.",
      "Real footage exposes failure modes that curated datasets don't: lighting shifts, occlusion, and unusual camera angles.",
    ],

    demoAvailable: false,
    demoNote:
      "The system runs inference on live video, which free hosting tiers can't sustain. A planned demo will accept an uploaded traffic image, run detection on it, and show the resulting density and green-time allocation.",
  },

  /* ======================================================================== */
  {
    slug: "image-classification-cnn-transfer-learning",
    title: "Image Classification using CNN & Transfer Learning",
    category: "Deep Learning",
    date: "Mar 2024",
    sortKey: "2024-03",
    status: "Completed",

    shortDescription:
      "A CNN image classifier improved with transfer learning from pre-trained models.",

    description:
      "A deep learning image classifier built with a convolutional neural network, then improved by applying transfer learning. Starting from features learned by a pre-trained network and fine-tuning on the target dataset produced meaningfully better accuracy than training the same architecture from scratch.",

    technologies: ["Python", "TensorFlow", "Keras", "CNN", "Transfer Learning"],

    features: [
      "Convolutional neural network trained for image classification",
      "Transfer learning from pre-trained models to improve accuracy",
      "Comparison of from-scratch training against a fine-tuned pre-trained baseline",
    ],

    problem:
      "Training a convolutional network from scratch needs a large labelled dataset and a lot of compute. With a modest dataset, the model has enough capacity to memorize the training set and not enough data to generalize from it.",

    solution:
      "Transfer learning reuses the low-level features a network has already learned from a much larger corpus — edges, textures, shapes — and only adapts the later layers to the target classes. That removes the need to learn general visual features from scratch and made the difference in classification accuracy on a dataset that was too small to support full training.",

    architecture: [
      "A baseline CNN was built and trained directly on the target dataset to establish a reference point.",
      "A pre-trained backbone was then used as a feature extractor, with the classification head replaced for the target classes.",
      "Fine-tuning adapted the upper layers to the dataset while keeping the general features learned upstream intact.",
    ],

    challenges: [
      "Overfitting on a limited dataset — the from-scratch model fit the training data long before it learned anything that generalized.",
      "Choosing how much of the pre-trained network to freeze: unfreeze too much and the pre-trained features get destroyed, too little and the model can't adapt to the new classes.",
      "Reading validation curves honestly rather than reporting the single best epoch.",
    ],

    learnings: [
      "With a small dataset, transfer learning isn't an optimization — it's usually the only approach that works.",
      "Which layers you freeze matters as much as the architecture you pick.",
      "A from-scratch baseline is worth the time it costs, because without it you can't tell how much the pre-trained features actually contributed.",
    ],

    demoAvailable: false,
    demoNote:
      "No live demo yet. This is the most straightforward of the four to deploy — an image-upload classifier on a free Hugging Face Space is the planned next step.",
  },
];

/* ============================================================================
 * TEMPLATE — copy this into the array above to add a new project.
 * ============================================================================
 *
 * Shown fully populated so you can see every available field, including the
 * full-stack / live-demo ones. Delete any line you don't need; everything
 * except slug, title, shortDescription, description, technologies, features
 * and status is optional.
 *
 * {
 *   slug: "cashpilot",                       // becomes /projects/cashpilot
 *   title: "CashPilot",
 *   category: "Full-Stack",
 *   date: "Aug 2026",
 *   sortKey: "2026-08",                      // YYYY-MM, used for ordering
 *   featured: true,                          // pins it to the homepage
 *   status: "Live",                          // Live | Completed | In Development | Coming Soon | Archived
 *
 *   shortDescription: "A personal finance management platform.",
 *   description: "A paragraph or two for the top of the case study page.",
 *
 *   technologies: ["Next.js", "NestJS", "PostgreSQL", "Prisma", "JWT"],
 *   features: [
 *     "Bank statement upload",
 *     "Transaction management",
 *     "Expense and income tracking",
 *   ],
 *
 *   github: "https://github.com/s-prem-kumar/cashpilot",
 *   liveDemo: "https://cashpilot-demo.vercel.app",
 *   demoAvailable: true,                     // 🚀 button needs BOTH this and liveDemo
 *
 *   // ⚠️ SYNTHETIC DATA ONLY. This file is public. Never put a real account here.
 *   demoCredentials: {
 *     email: "demo@example.com",
 *     password: "demo-password",
 *     note: "Sandbox account with fake transactions. Data resets daily.",
 *   },
 *
 *   image: "/images/projects/cashpilot.png",
 *   screenshots: [
 *     { src: "/images/projects/cashpilot-dashboard.png", alt: "CashPilot dashboard showing monthly spend by category", caption: "Dashboard" },
 *   ],
 *
 *   problem: "What problem it solves.",
 *   solution: "How you solved it.",
 *   architecture: ["One paragraph per string."],
 *   challenges: ["One bullet per string."],
 *   learnings: ["One bullet per string."],
 *
 *   deployment: {
 *     frontend: "Vercel (Hobby)",
 *     backend: "Render (free web service)",
 *     database: "Neon (free Postgres)",
 *     limitations: [
 *       "The backend sleeps after 15 minutes idle — the first request can take ~50s to wake it.",
 *     ],
 *   },
 * }
 * ========================================================================== */

/* ============================================================================
 * Helpers used by the pages. You shouldn't need to change these.
 * ========================================================================== */

/** Newest first, using `sortKey` when present. */
export const sortedProjects: Project[] = [...projects].sort((a, b) =>
  (b.sortKey ?? b.date ?? "").localeCompare(a.sortKey ?? a.date ?? ""),
);

/** Projects pinned to the homepage. Falls back to the first three. */
export const featuredProjects: Project[] = sortedProjects.some((p) => p.featured)
  ? sortedProjects.filter((p) => p.featured)
  : sortedProjects.slice(0, 3);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** True when the 🚀 Live Demo button should render. */
export function hasLiveDemo(
  project: Project,
): project is Project & { liveDemo: string } {
  return project.demoAvailable === true && Boolean(project.liveDemo);
}

