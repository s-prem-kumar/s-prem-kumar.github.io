# Portfolio — Prem Kumar Selvakumar

A personal developer portfolio built to run on free-tier infrastructure only:
Next.js exported to static files and served from GitHub Pages on a free
`*.github.io` domain. No server, no database, no CMS, no paid APIs.
Target cost: **₹0/month**.

It's content-driven. Every project, skill, role and certificate lives in
`src/data/` as typed data. The UI reads that data and renders itself — adding a
project means editing one file and dropping in an image, never touching a
component.

---

## Table of contents

1. [What this is](#1-what-this-is)
2. [Tech stack](#2-tech-stack)
3. [Project structure](#3-project-structure)
4. [Running it locally](#4-running-it-locally)
5. [Adding a project](#5-adding-a-project)
6. [Adding skills](#6-adding-skills)
7. [Adding experience](#7-adding-experience)
8. [Adding education](#8-adding-education)
9. [Adding certificates](#9-adding-certificates)
10. [Updating the résumé](#10-updating-the-résumé)
11. [Adding project screenshots](#11-adding-project-screenshots)
12. [Adding live demo links](#12-adding-live-demo-links)
13. [Deploying the portfolio to GitHub Pages](#13-deploying-the-portfolio-to-github-pages)
14. [Deploying the individual projects](#14-deploying-the-individual-projects)
15. [How demo credentials work](#15-how-demo-credentials-work)
16. [Free-tier limitations](#16-free-tier-limitations)
17. [Before you publish](#17-before-you-publish)

---

## 1. What this is

Not a gallery of screenshots. The goal is that a visitor can walk the whole
path in one sitting:

```text
Who am I?  →  What can I do?  →  What have I built?
           →  How did I build it?  →  Can I read the source?  →  Can I use it?
```

So every project supports up to three actions:

```text
Project
│
├── 📖 Case Study   — always (an internal page at /projects/<slug>)
├── 💻 GitHub       — only when `github` is set
└── 🚀 Live Demo    — only when `demoAvailable: true` AND `liveDemo` is set
```

A button that has nothing to point at is never rendered. When a project can't
have a live demo, the case study says so and explains what's planned instead —
that's the `demoNote` field.

**Pages**

| Route              | What it is                                              |
| ------------------ | ------------------------------------------------------- |
| `/`                | Hero, about, skills, experience, featured projects, education, certifications, achievements, contact |
| `/projects`        | Every project, newest first                              |
| `/projects/<slug>` | Full case study, generated from the project data         |
| `/sitemap.xml`     | Generated from the project list                          |
| `/robots.txt`      | Generated                                                |

Everything is statically prerendered at build time — there is no server-side
work at request time, which is what keeps it comfortably inside the free tier.

---

## 2. Tech stack

| Layer      | Choice                                     |
| ---------- | ------------------------------------------ |
| Framework  | Next.js 16 (App Router)                    |
| Language   | TypeScript                                 |
| Styling    | Tailwind CSS v4                            |
| Icons      | Hand-written inline SVG (no icon package)  |
| OG image   | `next/og` (ships with Next.js)             |
| Hosting    | GitHub Pages (static export)               |

**Runtime dependencies: `next`, `react`, `react-dom`. That's it.** No animation
library, no icon library, no UI kit, no analytics. Scroll reveals use the
browser's `IntersectionObserver`; the theme toggle uses a class on `<html>`.

Please keep it that way — every dependency added here is one you'll have to
keep updating for the next several years.

---

## 3. Project structure

```text
portfolio/
├── public/
│   ├── images/
│   │   ├── profile/          ← your photo (optional)
│   │   ├── projects/         ← project screenshots
│   │   └── certificates/     ← certificate scans
│   └── resume/
│       └── resume.pdf        ← ⚠️ you need to add this file
│
├── src/
│   ├── app/
│   │   ├── layout.tsx              root layout, SEO metadata, navbar/footer
│   │   ├── page.tsx                homepage (composes the sections)
│   │   ├── globals.css             design tokens + Tailwind
│   │   ├── icon.tsx                favicon, generated from your initials
│   │   ├── opengraph-image.tsx     social share card, generated from profile.ts
│   │   ├── not-found.tsx           404
│   │   ├── robots.ts               /robots.txt
│   │   ├── sitemap.ts              /sitemap.xml
│   │   └── projects/
│   │       ├── page.tsx            /projects
│   │       └── [slug]/page.tsx     /projects/<slug> case study
│   │
│   ├── components/
│   │   ├── Navbar.tsx  Hero.tsx  About.tsx  Skills.tsx  Experience.tsx
│   │   ├── Projects.tsx  ProjectCard.tsx  Education.tsx
│   │   ├── Certifications.tsx  Achievements.tsx  Contact.tsx  Footer.tsx
│   │   ├── ThemeScript.tsx  ThemeToggle.tsx
│   │   └── ui/                     Container, SectionHeading, Badge, Icons, Reveal
│   │
│   ├── data/                       ← 🟢 this is the part you edit
│   │   ├── profile.ts   skills.ts   projects.ts   experience.ts
│   │   ├── education.ts certifications.ts achievements.ts social.ts
│   │
│   ├── lib/
│   │   └── jsonld.ts               structured data for SEO
│   │
│   └── types/
│       └── portfolio.ts            the shape of everything in src/data
```

**The rule of thumb:** content changes happen in `src/data/` and `public/`.
If you find yourself editing a component to add content, something's off.

---

## 4. Running it locally

```bash
npm install
npm run dev          # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

Lint:

```bash
npm run lint
```

Requires Node 20 or newer.

---

## 5. Adding a project

Open `src/data/projects.ts`. There's a fully-commented template at the bottom
of the file — copy it into the `projects` array at the position you want the
project displayed.

Minimum viable project:

```ts
{
  slug: "cashpilot",                    // → /projects/cashpilot, must be unique
  title: "CashPilot",
  shortDescription: "A personal finance management platform.",
  description: "A paragraph or two for the top of the case study.",
  technologies: ["Next.js", "NestJS", "PostgreSQL", "Prisma"],
  features: ["Bank statement upload", "Transaction management"],
  status: "Live",                       // Live | Completed | In Development | Coming Soon | Archived
}
```

That alone gets you a card on the homepage, an entry on `/projects`, a case
study page, and a sitemap entry.

Then fill in as much of the case study as you have. Every one of these is
optional and the page skips whatever's missing:

| Field                     | Renders as                                    |
| ------------------------- | --------------------------------------------- |
| `problem`                 | "Problem" section                             |
| `solution`                | "Solution" section                            |
| `architecture: string[]`  | "Architecture" — one paragraph per string      |
| `challenges: string[]`    | "Challenges" — one bullet per string           |
| `learnings: string[]`     | "What I learned" — one bullet per string       |
| `screenshots: []`         | Screenshot gallery                             |
| `deployment: {}`          | Deployment table + free-tier limitations       |
| `featured: true`          | Pins the project to the homepage               |
| `category`, `date`        | The small label above the title                |
| `sortKey: "2025-06"`      | Sort order (`YYYY-MM`, newest first)           |

You never edit `ProjectCard.tsx` or the case study page. They're driven
entirely by this data.

---

## 6. Adding skills

`src/data/skills.ts` — a list of categories, each with a flat list of items:

```ts
{
  category: "Databases",
  items: ["SQL", "Neo4j", "Pinecone"],
}
```

Add to `items` for a new skill, or append a new object for a whole new
category. The grid lays itself out.

There are deliberately **no proficiency percentages or skill bars.** They can't
be justified in an interview and recruiters discount them.

---

## 7. Adding experience

`src/data/experience.ts`, newest first:

```ts
{
  company: "Avivo AI",
  role: "Junior Data Science Intern",
  location: "Remote",             // optional
  startDate: "Jan 2025",          // optional
  endDate: "Jun 2025",            // optional — or "Present"
  url: "https://...",             // optional company site
  responsibilities: ["..."],
  technologies: ["RAG", "Pinecone"],
}
```

`location`, `startDate` and `endDate` are currently omitted because they aren't
on the résumé. **Add them when you have them** — the timeline renders fine
without, but dates make a real difference to a recruiter reading it.

---

## 8. Adding education

`src/data/education.ts`:

```ts
{
  institution: "...",
  degree: "B.Tech",
  field: "Computer Science Engineering (Data Science)",
  location: "Thanjavur, Tamil Nadu",
  startYear: "2021",
  endYear: "2025",
  details: ["Coursework, focus areas, honours — one bullet per string."],
}
```

---

## 9. Adding certificates

`src/data/certifications.ts`:

```ts
{
  name: "Data Science",
  organization: "PRAG Robotics",
  date: "Mar 2024",                              // optional
  credentialUrl: "https://...",                  // optional → "Verify credential" link
  image: "/images/certificates/prag.png",        // optional → shows the scan
}
```

Put the scan in `public/images/certificates/` and reference it with a path
starting `/images/...` (not `public/`).

---

## 10. Updating the résumé

Put the PDF at:

```text
public/resume/resume.pdf
```

The "Download résumé" buttons in the hero and contact section point at
`profile.resumeUrl`, which is already set to `/resume/resume.pdf`.

> ⚠️ **This file does not exist yet.** Until you add it, both résumé buttons
> will 404. Either drop the PDF in, or remove the buttons.

The file is served straight from the site — no Google Drive, no Dropbox, no
external document host.

---

## 11. Adding project screenshots

1. Save the image to `public/images/projects/`.
2. Reference it on the project:

```ts
image: "/images/projects/cashpilot.png",        // card thumbnail + case study hero

screenshots: [                                   // extra gallery images
  {
    src: "/images/projects/cashpilot-dashboard.png",
    alt: "Dashboard showing monthly spend grouped by category",
    caption: "Dashboard",
  },
],
```

Notes:

- `alt` is **required** on gallery screenshots — describe what the image shows,
  not "screenshot of the app". It's what a screen-reader user gets.
- 16:9 crops look best; cards use `aspect-video`.
- Keep files under a few hundred KB. Next.js optimizes them, but a 4 MB PNG
  still has to be uploaded and processed.
- Projects with no `image` get a neutral placeholder — nothing breaks.

---

## 12. Adding live demo links

The 🚀 button needs **both** fields, which is what makes a dead demo link
impossible:

```ts
liveDemo: "https://cashpilot-demo.vercel.app",
demoAvailable: true,
```

Set `demoAvailable: false` (or leave both out) and the button disappears. Use
`demoNote` to explain why, and it's shown on the case study in place of the
button:

```ts
demoAvailable: false,
demoNote: "The model runs locally through Ollama, which no free tier can host.
           A demo using a hosted free inference endpoint is planned.",
```

Also set `status` honestly — `"Live"` gets a pulsing green dot, and it should
mean the thing is genuinely reachable right now.

---

## 13. Deploying the portfolio to GitHub Pages

```text
Local  →  git push  →  GitHub Actions  →  GitHub Pages
                                          s-prem-kumar.github.io
```

The site is a **static export**: `next build` writes every route to `out/` as
plain HTML, and Pages serves those files. No server runs anywhere.

### The URL is your username

A GitHub Pages *user site* is served from `https://<username>.github.io`, and
that only works when a repository is named **exactly** `<username>.github.io`.
The URL is not a setting — it follows the account name. Rename the account and
the site address changes with it.

### One-time setup

1. Name the repository `<your-username>.github.io`.
2. **Settings → Pages → Build and deployment → Source → GitHub Actions.**

> ⚠️ Step 2 is the one people miss. The default is **"Deploy from a branch"**,
> which ignores the workflow entirely and runs Jekyll over the repository
> instead — the result is your `README.md` rendered as the homepage. If you see
> this README when you visit the site, that setting is wrong.

After that, `.github/workflows/deploy.yml` handles everything on every push to
`main`: install, lint, build, publish. Watch it in the **Actions** tab; the
first run takes about two minutes.

### What makes the export work

| Piece | Why it's needed |
| ----- | --------------- |
| `output: "export"` in `next.config.ts` | Writes the site to `out/` instead of expecting a server |
| `trailingSlash: true` | Emits `/projects/cashpilot/index.html`, which Pages resolves from a bare directory URL |
| `images: { unoptimized: true }` | On-demand image optimisation needs a server. **Compress images before committing** |
| `public/.nojekyll` | Without it Pages runs Jekyll, which ignores the `_next` folder — you'd get an unstyled page |
| `export const dynamic = "force-static"` | On `icon.tsx`, `opengraph-image.tsx`, `sitemap.ts` and `robots.ts`. These routes are dynamic by default and block the export |

`NEXT_PUBLIC_SITE_URL` is set by the workflow from the repository owner, so
canonical URLs, Open Graph tags and the sitemap stay correct even if you rename
your account. Nothing to configure by hand.

### Using a custom domain later

Add a `CNAME` file to `public/` containing the domain, point the domain's DNS
at GitHub Pages, then set the domain under Settings → Pages.

---

## 14. Deploying the individual projects

The portfolio and the projects are **separate repos and separate deployments.**
The portfolio only links out to them.

```text
                     GitHub
                       │
          ┌────────────┴────────────┐
          ↓                         ↓
     Portfolio repo            Project repos
          ↓                         ↓
     GitHub Pages           Free hosting
          ↓                         ↓
  yourname.github.io        Live applications
```

GitHub Pages only serves static files, so it can host this portfolio but not an
application with a backend. Pick per component:

| Component                   | Free option                        | Watch out for                          |
| --------------------------- | ---------------------------------- | -------------------------------------- |
| Static site / export        | GitHub Pages, Cloudflare Pages     | No server-side rendering                |
| Next.js needing a server    | Vercel Hobby, Netlify              | —                                      |
| Node / NestJS / FastAPI API | Render free web service            | Sleeps after ~15 min idle              |
| Python ML inference         | Hugging Face Spaces (CPU basic)    | Sleeps after ~48 h idle; CPU only      |
| PostgreSQL                  | Neon, Supabase                     | Storage cap; Neon autosuspends         |
| File storage                | Supabase Storage, Cloudinary free  | Bandwidth cap                          |

**Never hardcode** a database URL, JWT secret, API key or password. Use
environment variables set in the host's dashboard, and keep `.env*` out of git
(the `.gitignore` already covers this).

Then document the deployment on the project itself:

```ts
deployment: {
  frontend: "Vercel (Hobby)",
  backend: "Render (free web service)",
  database: "Neon (free Postgres)",
  limitations: [
    "The backend sleeps after 15 minutes idle — the first request can take ~50s.",
  ],
},
```

That renders as a deployment table plus a "Free-tier limitations" list on the
case study page.

### Current status of the four projects

None of the four have a live demo yet, and each case study says so explicitly
via `demoNote`. In rough order of how easy they are to deploy:

1. **Image Classification (CNN + transfer learning)** — easiest. An image-upload
   classifier on a free Hugging Face Space.
2. **Traffic Light Vehicle Detection** — upload a traffic photo, run detection,
   show the density and green-time allocation. Live video won't work on a free
   tier; a single-image demo will.
3. **LLM Link & PDF Reader** — swap the local Ollama model for a hosted
   free-tier inference endpoint, keep the same retrieval pipeline.
4. **LLM Accuracy research** — a side-by-side demo: the same question answered
   with and without query refinement + graph grounding.

Also: `github` is currently omitted on all four, because the repos aren't public
yet. Push them, then add each `github` URL — that alone turns on four 💻 buttons.

---

## 15. How demo credentials work

For any project with authentication, the case study can show a demo account:

```ts
demoCredentials: {
  email: "demo@example.com",
  password: "demo-password",
  note: "Sandbox account with synthetic transactions. Data resets daily.",
},
```

**These are rendered publicly on a public page, in a public repo.** So the rules
are absolute:

- ✅ A throwaway account in a dedicated demo environment.
- ✅ Synthetic data only — fake users, fake transactions, fake statements.
- ❌ Never a real account, real bank data, real personal information.
- ❌ Never an account that can reach production data.
- ❌ Never an API key, database URL or JWT secret — those belong in env vars.

For anything finance-, document- or auth-related, stand up a **separate demo
deployment with its own database**, seeded with generated data. Ideally give the
demo user read-only or reset-on-a-schedule permissions, so a visitor can't
break it for the next visitor.

---

## 16. Free-tier limitations

State these on the project rather than hiding them — a recruiter who hits a
50-second cold start with no explanation assumes the app is broken. One who
reads "this is a free Render instance, it's waking up" is looking at an honest
engineer.

Common ones worth documenting:

- Backends sleep after inactivity; the first request wakes them (~30–60 s).
- Free Postgres has a storage cap and may autosuspend.
- Hosted inference endpoints have rate limits and monthly caps.
- File storage and bandwidth are capped.
- Free CPU-only inference is much slower than a local GPU.

The portfolio itself has none of these problems: it's fully static, so it's
always instant.

---

## 17. Before you publish

Content:

- [ ] Add `public/resume/resume.pdf` (both résumé buttons 404 without it).
- [ ] Add your LinkedIn URL in `src/data/social.ts` — it's commented out rather
      than guessed.
- [ ] Push the four project repos and add each `github` URL in `projects.ts`.
- [ ] Read every entry in each project's `technologies` list **and in
      `skills.ts`**, and delete anything you didn't actually use. Several are
      marked `// verify` — an interviewer will ask about every chip on the card.
- [ ] Keep `skills.ts` and `projects.ts` in agreement: a technology shown on a
      project card but missing from the skills list looks like an oversight.
- [ ] Add `startDate` / `endDate` / `location` to the Avivo AI role.
- [ ] Optional: add a photo at `public/images/profile/avatar.jpg` and uncomment
      `avatar` in `profile.ts`. Without it the hero shows your initials.
- [ ] Confirm Settings → Pages → Source is **GitHub Actions**, not "Deploy from a branch".

Technical:

```bash
npm run lint      # must be clean
npm run build     # must succeed
```

- [ ] Check it on a phone-width viewport — cards and the case study especially.
- [ ] Tab through the page: focus rings must be visible everywhere.
- [ ] Toggle light/dark; confirm text stays readable in both.
- [ ] Click every external link.
- [ ] Confirm no `.env`, secret or real credential is committed.
