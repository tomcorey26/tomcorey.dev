# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site for Tom Corey, a software engineer. Built with Astro (SSG) + React. Features a retro amber-on-black terminal/Fallout aesthetic throughout. Homepage showcases job experience; blog section uses Markdown/MDX.

## Commands

```bash
npm run dev          # Dev server at localhost:3000
npm run build        # Build to ./dist/
npm run preview      # Preview production build
npx astro check      # Type-check the project
```

No test framework is configured.

## Architecture

- **Astro v1.6.7** with React integration for interactive components
- **Styling**: Global CSS variables in `src/styles/global.css` define the amber terminal theme (`--accent: #ffb000`, `--primary: #1a1a0a`, etc.). Component-specific CSS lives in `src/styles/` and is imported by the corresponding React component
- **Site config**: `src/config.ts` exports `SITE_TITLE` and `SITE_DESCRIPTION`
- **Global types**: `src/pages/types.d.ts` declares ambient types (e.g., `JobExperience` interface) available project-wide

### Key Components

- **Card** (`Card.tsx`): Generic wrapper used by most page sections. Supports polymorphic `tag` prop
- **JobExperience** (`JobExperience.tsx`): Renders job entries on homepage. Job data is defined inline in `src/pages/index.astro`
- **Dialog** (`Dialog.tsx`): Interactive "Wasteland Hamster" chat with typewriter effect and audio. Dialog tree defined in `src/constants.ts` as a state machine with numbered keys
- **BaseHead** (`BaseHead.astro`): Imports global CSS and sets meta/OG tags. Included on all pages

### Content

- Blog posts live in `src/pages/blog/` as `.md`/`.mdx` files with frontmatter (`title`, `description`, `pubDate`, `heroImage`, etc.)
- Blog post layout is `src/layouts/BlogPost.astro`
- Static assets (images, audio) go in `public/`
