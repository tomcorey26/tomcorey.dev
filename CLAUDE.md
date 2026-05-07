# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with Astro, featuring blog functionality, MDX support, and React components. The site is for Tom Corey, a software engineer showcasing his work experience and blog posts.

## Commands

```bash
# Install dependencies
npm install

# Start development server at localhost:3000
npm run dev

# Build production site to ./dist/
npm run build

# Preview built site locally
npm run preview

# Run Astro CLI commands
npm run astro [command]

# Check project for errors
npx astro check
```

## Architecture

### Technology Stack
- **Framework**: Astro v1.6.7 with SSG (Static Site Generation)
- **UI Components**: Mix of Astro components (.astro) and React components (.tsx)
- **Styling**: CSS modules with global styles in `src/styles/global.css`
- **Content**: MDX for blog posts and pages, supporting both Markdown and React components
- **Integrations**: React, MDX, Sitemap generation, RSS feed

### Project Structure
- **src/pages/**: Routes - each .astro or .md file becomes a route
  - `index.astro`: Homepage with job experience showcase
  - `about.mdx`: About page using MDX
  - `blog.astro`: Blog listing page
  - `blog/`: Individual blog posts in Markdown
- **src/components/**: Reusable components
  - Astro components: BaseHead, Footer, Header, HeaderLink
  - React components: Card, Dialog, JobExperience, ParticleBackground, TechCell
- **src/layouts/**: Layout templates (BlogPost.astro for blog posts)
- **src/config.ts**: Global site configuration (SITE_TITLE, SITE_DESCRIPTION)
- **public/**: Static assets served directly (images, audio files)

### Key Patterns
- Components use TypeScript interfaces for props
- Blog posts use frontmatter for metadata
- Global styles imported via BaseHead component
- React components use client directives (client:load) for hydration
- Site configuration centralized in src/config.ts