# Home Page Resume Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the home page's bio + experience data with current resume content, and add Projects and Education sections.

**Architecture:** Edit the `jobs` data array and hero copy in `src/pages/index.astro`; add a new self-contained `Projects.astro` component and an inline Education `Card`. Reuse existing `Card`/`JobExperience` components and the established CSS-file-per-component pattern.

**Tech Stack:** Astro 5 (SSG), React 19 components, plain CSS modules.

**Testing note:** Repo has no test harness (no Playwright/Vitest, not in package.json). Per spec, standing up a framework for a static content swap is out of scope (YAGNI); verification is `npx astro check` + `npm run build` + visual dev check. This is a deliberate, user-confirmed deviation from default TDD.

---

### Task 1: Update hero bio copy

**Files:**
- Modify: `src/pages/index.astro:90-101` (the `<p class="bio">` block)

- [ ] **Step 1: Replace the bio paragraph**

Replace lines 90–101 (the `<p class="bio">...</p>` element) with:

```astro
          <p class="bio">
            Hey I'm Tom, a full-stack software engineer from Rhode Island with
            {yearsOfExperience}+ years shipping production web applications at
            scale. I'm strong in <strong
              >TypeScript, React, Node.js</strong
            > and modern frontend tooling, with full-stack experience spanning
            distributed systems and external partner integrations.
            <strong
              >I'm currently looking for a new job, so if you're hiring:</strong
            >
          </p>
```

Leave the `.cta-buttons` block and everything else in the section unchanged.

- [ ] **Step 2: Type/build check**

Run: `npx astro check`
Expected: completes with no new errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "Update home page bio from resume"
```

---

### Task 2: Update experience data

**Files:**
- Modify: `src/pages/index.astro:15-75` (the `jobs` array)

- [ ] **Step 1: Replace the `jobs` array**

Replace the entire `const jobs: JobExperience[] = [ ... ];` (lines 15–75) with the block below. Existing `emoji`, `logo`, `companyUrl` values are preserved verbatim from the current file.

```ts
const jobs: JobExperience[] = [
  {
    title: "Full-Stack Software Engineer",
    company: "DealerOn",
    companyUrl: "https://www.dealeron.com/",
    emoji: "🚗",
    logo: "https://media.licdn.com/dms/image/v2/D4E0BAQE0rro_noAHwA/company-logo_100_100/B4EZeyBk_QG4AU-/0/1751038448044/dealeron_inc_logo?e=1758758400&v=beta&t=9DLVRNbAbHuJisAREn8yCxqV8-2CNqpiRNASLBgkXjU",
    startDate: new Date("2020-12-23"),
    points: [
      `Built and shipped a greenfield React application enabling operations teams to self-serve OEM feed configuration, eliminating developer-blocking work and accelerating onboarding of new inventory integrations, with full Playwright test coverage`,

      `Sole frontend owner of the dealer-facing pricing configuration application serving 7,000+ automotive dealerships, controlling vehicle pricing, financing offers, and OEM CTAs across every dealer website on the platform; modernized framework and state management across 100+ components`,

      `Delivered full-stack integrations with 10+ major partners including Ford, GM, and Capital One, working to external partnership deadlines`,

      `Contributed full-stack across a 4-service inventory pipeline processing 200,000+ daily vehicle updates; architected priority queue expansion across 3 microservices and resolved production incidents including a queue storm (25,793 messages) and an Elasticsearch indexer bug affecting 3,876 dealerships`,
    ],
    skills: [
      "React",
      "TypeScript",
      "Playwright",
      ".NET",
      "C#",
      "RabbitMQ",
      "Microservices",
      "Elasticsearch",
    ],
  },
  {
    title: "Software Engineer (Contract)",
    company: "CVS Health",
    companyUrl: "https://www.cvshealth.com/",
    emoji: "🏥",
    logo: "https://media.licdn.com/dms/image/v2/C4E0BAQEhOw_KVli-CQ/company-logo_100_100/company-logo_100_100/0/1669901807779/cvs_health_logo?e=1758758400&v=beta&t=igAalYXweOJbVvykHVkz6Bzb6srgc3mZBFKl-F1ww6M",
    startDate: new Date("2020-10-01"),
    endDate: new Date("2020-12-20"),
    points: [
      "Built a TypeScript/React tool for automated API proxy generation on Google Cloud's Apigee platform, supporting public CVS Health API infrastructure",
    ],
    skills: ["TypeScript", "React", "Node.js"],
  },
  {
    title: "Software Engineer",
    company: "Maverick Investment Technologies",
    companyUrl: "https://www.linkedin.com/company/maverick-investment-tech/",
    emoji: "📈",
    logo: "https://media.licdn.com/dms/image/v2/C4D0BAQET0W6apKlh9Q/company-logo_100_100/company-logo_100_100/0/1630521649519/maverick_investment_tech_logo?e=1758758400&v=beta&t=5w8-3djs2yQDjORC_e8QEuiLaiLLdDMqMLPwVN7Ebx0",
    startDate: new Date("2020-01-01"),
    endDate: new Date("2020-10-01"),
    points: [
      "Developed a React-based financial analysis platform with real-time stock data visualization and PHP REST API integration",
    ],
    skills: ["React", "JavaScript", "PHP", "PostgreSQL"],
  },
];
```

- [ ] **Step 2: Type/build check**

Run: `npx astro check`
Expected: no new errors (shape matches the `JobExperience` interface already used).

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "Update experience entries from resume"
```

---

### Task 3: Create Projects component

**Files:**
- Create: `src/components/Projects.astro`
- Create: `src/styles/projects.css`

- [ ] **Step 1: Create `src/styles/projects.css`**

```css
.projects {
  display: flex;
  flex-direction: column;
}

.project__name {
  margin: 0 0 0.25rem;
  font-size: clamp(1.4rem, 3vw, 1.9rem);
  color: var(--text-primary);
}

.project__links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 1rem;
  margin-bottom: 0.75rem;
}

.project__links a {
  color: var(--accent-light);
  font-weight: 600;
  text-decoration: none;
  word-break: break-word;
}

.project__links a:hover {
  text-decoration: underline;
}

.project__desc {
  margin: 0;
  line-height: 1.7;
  color: var(--text-secondary);
}
```

- [ ] **Step 2: Create `src/components/Projects.astro`**

```astro
---
import { Card } from "./Card";
import "../styles/projects.css";

type ProjectLink = { label: string; href: string };
type Project = {
  name: string;
  links: ProjectLink[];
  description: string;
};

const projects: Project[] = [
  {
    name: "LogBro",
    links: [
      { label: "logbro.tomvolt.com", href: "https://logbro.tomvolt.com" },
      {
        label: "github.com/tomcorey26/LogBro",
        href: "https://github.com/tomcorey26/LogBro",
      },
    ],
    description:
      "Time-blocking web app for tracking deliberate skill practice. Solo-built with Next.js 16, React 19, TypeScript, Drizzle/SQLite, and custom JWT auth. Implemented real-time timer state sync across client, server, and database with optimistic UI updates; Playwright and Vitest test coverage. Developed using Claude Code agent workflows while owning all architectural decisions.",
  },
  {
    name: "Speech Islands",
    links: [
      { label: "speechislands.com", href: "https://speechislands.com/" },
    ],
    description:
      "Full-stack language learning platform built with React, Node.js, and Next.js; integrates the OpenAI API for AI-generated personalized vocabulary flashcards.",
  },
];
---

<div class="projects">
  {
    projects.map((project) => (
      <Card>
        <h2 class="project__name">{project.name}</h2>
        <div class="project__links">
          {project.links.map((link) => (
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          ))}
        </div>
        <p class="project__desc">{project.description}</p>
      </Card>
    ))
  }
</div>
```

- [ ] **Step 3: Type/build check**

Run: `npx astro check`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/Projects.astro src/styles/projects.css
git commit -m "Add Projects component"
```

---

### Task 4: Wire Projects + Education into the page

**Files:**
- Modify: `src/pages/index.astro` (imports near top; section markup after `#experience`)

- [ ] **Step 1: Add the Projects import**

In the frontmatter imports of `src/pages/index.astro`, directly after the
`import JobExperience from "../components/JobExperience";` line, add:

```astro
import Projects from "../components/Projects.astro";
```

- [ ] **Step 2: Add the Projects and Education sections**

In `src/pages/index.astro`, find:

```astro
      <section id="experience">
        {jobs.map((job) => <JobExperience {...job} />)}
      </section>
    </main>
```

Replace it with:

```astro
      <section id="experience">
        {jobs.map((job) => <JobExperience {...job} />)}
      </section>

      <section id="projects">
        <h2 class="section-heading">Projects</h2>
        <Projects />
      </section>

      <section id="education">
        <h2 class="section-heading">Education</h2>
        <Card>
          <h3 class="education__degree">Bachelor of Computer Science</h3>
          <p class="education__school">The University of Rhode Island</p>
        </Card>
      </section>
    </main>
```

- [ ] **Step 3: Add section styles**

In the `<style>` block of `src/pages/index.astro`, add the following rules immediately after the `.hamster-section { ... }` rule:

```css
      .section-heading {
        max-width: 1000px;
        margin: 3rem auto 1rem;
        padding: 0 2rem;
        font-size: clamp(1.6rem, 4vw, 2.2rem);
        color: var(--text-primary);
      }

      .education__degree {
        margin: 0 0 0.25rem;
        color: var(--text-primary);
        font-size: clamp(1.3rem, 3vw, 1.7rem);
      }

      .education__school {
        margin: 0;
        color: var(--text-secondary);
      }

      @media (max-width: 768px) {
        .section-heading {
          padding: 0 1rem;
          margin: 2rem auto 0.75rem;
        }
      }
```

- [ ] **Step 4: Verify `Card` is imported**

Confirm `import { Card } from "../components/Card";` already exists in the
frontmatter of `src/pages/index.astro` (it does, used by the hero). The
Education `Card` reuses it — no new import needed.

- [ ] **Step 5: Type/build check**

Run: `npx astro check && npm run build`
Expected: check passes; build writes `./dist/` with no errors.

- [ ] **Step 6: Visual check**

Run: `npm run dev`, open `http://localhost:3000`. Confirm: reworded bio + CTA buttons; three experience cards with updated text and skill chips; Projects section with LogBro (two links) and Speech Islands (one link); Education card. Stop the dev server.

- [ ] **Step 7: Commit**

```bash
git add src/pages/index.astro
git commit -m "Add Projects and Education sections to home page"
```

---

### Task 5: Land on main

**Files:** none (git only)

- [ ] **Step 1: Merge branch into main and push**

```bash
git checkout main
git merge --no-ff home-page-resume-update -m "Update home page from resume"
git push origin main
```

- [ ] **Step 2: Delete the working branch**

```bash
git branch -d home-page-resume-update
```

- [ ] **Step 3: Confirm clean state**

Run: `git status`
Expected: `nothing to commit, working tree clean` on `main`.

---

## Self-Review

- **Spec coverage:** Hero (Task 1), Experience incl. Dec 2020 start / dropped "currently in UAT" / kept chips (Task 2), Projects plain text + links (Tasks 3–4), Education (Task 4), Skills section & phone excluded (not added anywhere), land on main per user instruction (Task 5). All covered.
- **Placeholder scan:** No TBD/TODO; all code blocks complete.
- **Type consistency:** Task 2 data conforms to the existing `JobExperience` interface consumed by the unchanged component. `Project`/`ProjectLink` types defined and used only within `Projects.astro` (Task 3), referenced by Task 4 import only by component name.
