# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Daily Devotionals is a static website built with Astro 5 for displaying Bible-based devotional readings. It features automatic daily redirection and shows historical devotionals from the same day in previous years.

## Commands

```bash
npm install       # Install dependencies
npm run dev       # Start dev server (http://localhost:4321)
npm run build     # Build for production
npm run preview   # Preview production build
```

### Node.js Version
- Requires Node.js >= 18.20.8 or >= 20.0.0
- Use `nvm use 20.0.0` to set correct version (as specified in .nvmrc)

## Architecture

### Data Flow
Markdown files → devotionalLoader.ts → Static pages generated at build time

**Key principle**: All devotionals are Markdown files in `src/data/devotionals/` with the naming format `DD-MM-YYYY.md`. Pages are generated automatically at build time using Astro's `getStaticPaths()`.

### Component Structure
- **`src/pages/index.astro`**: Detects current date and redirects to `/{day}-{month}`
- **`src/pages/[day]-[month].astro`**: Dynamic route that generates static pages for each unique day-month combination
- **`src/layouts/Layout.astro`**: Base layout with terminal-style theme
- **`src/utils/devotionalLoader.ts`**: Core utility for loading, parsing, and organizing devotionals

### File Naming Convention
Devotional files must follow the format: `DD-MM-YYYY.md`
- DD: Day (1-31, can be single or double digit)
- MM: Month (1-12, can be single or double digit)
- YYYY: Four-digit year

Examples:
- `22-10-2025.md` ✓
- `1-5-2024.md` ✓
- `15-12-2023.md` ✓
- `2025-10-22.md` ✗ (wrong format)

### Markdown File Structure
Each devotional uses frontmatter for metadata:

```markdown
---
title: Devotional Title
---

Markdown content here...
```

**Required fields:**
- `title`: Displayed as the devotional heading

**Markdown processing:**
- Parsed with `gray-matter` for frontmatter extraction
- Converted to HTML with `marked` library
- Rendered with Astro's `set:html` directive

### Static Site Generation
- Output: Fully static HTML (configured in `astro.config.mjs`)
- Build process:
  1. `devotionalLoader.ts` scans `src/data/devotionals/`
  2. Groups devotionals by day-month
  3. Generates one page per unique day-month combination
  4. Each page includes all years for that day, sorted newest first
- No server-side rendering or API routes
- Optimized with compression (gzip/brotli), minification, and inlined stylesheets

### Page Behavior

**Index page (`/`)**:
- Calculates current date server-side
- Redirects to `/{day}-{month}` format
- Example: On October 22, redirects to `/22-10`

**Day-Month pages (`/{day}-{month}`)**:
- Shows all devotionals for that specific day across all years
- Most recent year appears first (e.g., 2025, then 2024, then 2023)
- Each year's devotional is in its own section
- Sections separated by styled dividers

## Adding New Devotionals

**Process:**
1. Create a new `.md` file in `src/data/devotionals/`
2. Name it using format: `DD-MM-YYYY.md`
3. Add frontmatter with `title` field
4. Write devotional content in Markdown
5. Run `npm run build` to regenerate static pages

**Automatic behavior:**
- System detects new file
- If day-month combination is new, creates new page route
- If day-month exists, adds to existing page with other years
- Sorts by year automatically (newest first)

## Styling

Terminal-style theme matching other nievas.dev projects:

**Colors:**
- Background: `#000` (pure black)
- Text: `#ddd` (light gray)
- Accent: `#08CB00` (neon green)
- Accent Light: `#10E000` (bright green for hovers)
- Border: `#333` (dark gray)

**Typography:**
- Font family: Monaco, 'Courier New', monospace
- Monospace design throughout
- Line height: 1.6 for readability

**Layout:**
- Max width: 900px centered container
- 2rem padding around body
- Responsive design

**Custom CSS classes:**
- `.date-header`: Uppercase date display with letter-spacing
- `.year-section`: Separates different years with top border
- `.year-header`: Year display in accent-light color

## Deployment

The site is fully static and can be deployed to any static hosting:
- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages
- Any static file server

**Build output:** `dist/` directory
**Compression:** Both gzip (.gz) and brotli (.br) files generated for optimal serving

## Development Notes

### Devotional Management
- All content is file-based (no database)
- Version control friendly
- Easy backup and migration
- Supports unlimited historical devotionals

### Performance
- Zero runtime JavaScript for content rendering
- All pages pre-generated at build time
- Compressed assets (gzip + brotli)
- Inlined critical CSS
- Lightning-fast page loads

### Extensibility
- Easy to add new devotionals (just add Markdown files)
- Simple to modify theme (update Layout.astro)
- Can add additional frontmatter fields as needed
- Straightforward to implement additional features (search, categories, etc.)
