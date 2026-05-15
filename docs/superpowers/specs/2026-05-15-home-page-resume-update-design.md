# Home Page Resume Update — Design

Date: 2026-05-15

## Goal

Replace the home page (`src/pages/index.astro`) content with information from
Tom Corey's current resume. Drop stale job content; keep the page's existing
voice, components, and styling system. The resume's Skills section is
intentionally excluded.

## Decisions (confirmed with user)

- **Bio tone:** Keep the casual voice, the "currently looking for a job" line,
  and both CTA buttons. Fold in the resume Summary's substance.
- **Earlier roles:** CVS Health and Maverick stay as their own full
  `JobExperience` cards (not collapsed into one block).
- **Skill chips:** Keep skill-tag chips on job cards; derive tags from each
  role's resume bullets.
- **New sections:** Add Projects and Education sections below Experience.
- **DealerOn start date:** Keep existing `2020-12-23` start (NOT the resume's
  Jan 2021). Tenure display continues from Dec 2020.
- **Project cards:** Plain text only — no tech-chip rows.
- **Phone number:** Not on the page; not added.
- **Resume Skills section:** Ignored entirely.

## Changes

### 1. Hero / bio (`index.astro`)

Rewrite the `.bio` paragraph to incorporate the resume Summary: full-stack
software engineer, ~6 years shipping production web apps at scale, strong in
TypeScript/React/Node.js and modern frontend tooling, full-stack experience
across distributed systems and external partner integrations. Keep the existing
casual opener ("Hey I'm Tom..."), the `{yearsOfExperience}+` interpolation
(unchanged — its 2020-01-01 base yields ~6, matching the resume), the
"I'm currently looking for a new job" line, and the existing `.cta-buttons`
block (View My Experience ↓ / Shoot Me an Email) unchanged.

### 2. Experience (`jobs` array in `index.astro`)

Three `JobExperience` cards, component unchanged. Update the `jobs` data:

- **DealerOn** — title `Full-Stack Software Engineer`; `startDate`
  `2020-12-23` (unchanged); `endDate` undefined (Present). Replace `points`
  with the resume's 4 DealerOn bullets (OEM feed config app — drop the
  trailing "currently in UAT" phrase, keep "full Playwright test coverage";
  dealer-facing pricing config for 7,000+ dealerships; 10+ partner
  integrations incl. Ford/GM/Capital One; 4-service inventory pipeline /
  priority queue / incident response). `skills`: React, TypeScript,
  Playwright, .NET, C#, RabbitMQ, Microservices, Elasticsearch.
- **CVS Health** — title `Software Engineer (Contract)`; dates unchanged
  (`2020-10-01` – `2020-12-20`). Single `point` from resume: TypeScript/React
  tool for automated API proxy generation on Google Cloud Apigee, supporting
  public CVS Health API infrastructure. `skills`: TypeScript, React, Node.js.
- **Maverick** — `company` updated to `Maverick Investment Technologies`;
  title `Software Engineer`; dates unchanged (`2020-01-01` – `2020-10-01`).
  Single `point` from resume: React-based financial analysis platform with
  real-time stock data visualization and PHP REST API integration. `skills`:
  React, JavaScript, PHP, PostgreSQL.

Existing emoji/logo/companyUrl fields retained as-is.

### 3. Projects section (new)

New component `src/components/Projects.tsx` rendering one `Card` per project,
reusing the existing `Card` component and site styling. No tech chips. Each
entry: project name (linked to its primary URL), secondary links (GitHub where
applicable), and the resume blurb as plain text.

- **LogBro** — links: https://logbro.tomvolt.com and
  https://github.com/tomcorey26/LogBro. Blurb: time-blocking web app for
  tracking deliberate skill practice; Next.js 16 / React 19 / TypeScript /
  Drizzle-SQLite / custom JWT auth; real-time timer state sync across client,
  server, DB with optimistic UI; Playwright + Vitest coverage; built with
  Claude Code agent workflows while owning architectural decisions.
- **Speech Islands** — link: https://speechislands.com/. Blurb: full-stack
  language-learning platform (React, Node.js, Next.js); OpenAI API for
  AI-generated personalized vocabulary flashcards.

Rendered in `index.astro` as a new `<section id="projects">` below
`#experience`. Component-scoped styles in a new
`src/styles/projects.css` (mirroring the `job-experience.css` pattern), or
reuse existing card styles if sufficient.

### 4. Education section (new)

A single `Card` (inline in `index.astro` or a tiny component) reading:
**B.S. Computer Science** — The University of Rhode Island. Placed below
Projects.

## Components & Boundaries

- `index.astro` — page composition + `jobs` data + hero copy. Owns section
  ordering: Hero → Experience → Projects → Education → Footer.
- `JobExperience.tsx` — unchanged; consumes updated `jobs` data.
- `Projects.tsx` (new) — self-contained; takes a typed `projects` array
  (name, primaryUrl, links[], description), renders `Card`s. No external deps
  beyond `Card`.
- Education — minimal, no new abstraction unless reuse emerges.

## Out of Scope

- Resume Skills section.
- Phone number.
- Restyling Header/Footer or global theme.
- Changing `JobExperience`, `Card`, or `TechCell` internals.
- Unrelated refactors.

## Testing

Per project TDD preference: site is Astro SSG with no current test harness for
pages. Verification approach:

- `npx astro check` passes (no type errors on updated `jobs` data and new
  `Projects` component props).
- `npm run build` succeeds.
- Manual/visual check via `npm run dev`: hero copy correct, three experience
  cards render with updated content + chips, Projects section shows both
  projects with working links, Education renders.
- If a Playwright smoke test is cheap to add (page renders key headings),
  add one; otherwise rely on build + visual check. (Confirm during planning.)

## Open Questions

None.
