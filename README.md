# Daily Devotionals

A lightweight daily devotional website built with Astro. Displays Bible-based devotional readings with automatic redirection to today's devotional.

## Features

- **Automatic Daily Redirect**: Index page redirects to today's devotional (`/{day}-{month}`)
- **Multi-Year History**: Shows devotionals for the same day from previous years
- **Static Generation**: All pages pre-generated at build time for maximum performance
- **Markdown-Based**: Devotionals written in Markdown with frontmatter
- **Terminal-Style Theme**: Consistent with other nievas.dev projects (dark theme, monospace font, green accents)

## Project Structure

```
daily/
├── src/
│   ├── data/
│   │   └── devotionals/          # Devotional markdown files
│   │       ├── 22-10-2023.md
│   │       ├── 22-10-2024.md
│   │       └── 22-10-2025.md
│   ├── layouts/
│   │   └── Layout.astro          # Base layout with terminal theme
│   ├── pages/
│   │   ├── index.astro           # Redirects to today's devotional
│   │   └── [day]-[month].astro   # Dynamic devotional page
│   └── utils/
│       └── devotionalLoader.ts   # Utility to load/parse devotionals
├── astro.config.mjs
└── package.json
```

## Devotional File Format

Devotionals are stored in `src/data/devotionals/` with the naming format: `DD-MM-YYYY.md`

Example: `22-10-2025.md`

```markdown
---
title: Trust in the Lord
---

## Proverbs 3:5-6

> Trust in the Lord with all your heart...

Your devotional content here in Markdown format.

### Reflection

- Reflection points
- Questions to consider

**Prayer**: Your prayer here.
```

## Adding New Devotionals

1. Create a new `.md` file in `src/data/devotionals/`
2. Name it using the format: `DD-MM-YYYY.md` (e.g., `15-12-2025.md`)
3. Add frontmatter with `title` field
4. Write your devotional content in Markdown
5. Rebuild the site

The system will automatically:
- Generate a page for that day-month combination
- Group it with other devotionals from the same day in previous years
- Sort by year (most recent first)

## Development

```bash
npm install       # Install dependencies
npm run dev       # Start dev server (http://localhost:4321)
npm run build     # Build for production
npm run preview   # Preview production build
```

## Page Behavior

- **`/` (index)**: Automatically redirects to today's date (e.g., `/22-10` on October 22)
- **`/{day}-{month}`**: Shows all devotionals for that day across all years
  - Most recent year appears first
  - Each year's devotional is in its own section
  - Older years displayed below separated by horizontal rules

## Styling

Terminal-style theme matching other nievas.dev projects:
- Background: Black (#000)
- Text: Light gray (#ddd)
- Accent: Neon green (#08CB00)
- Font: Monaco, Courier New (monospace)

## Deployment

The site is fully static and can be deployed to any static hosting provider:
- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages
- Any static file server

Build output is in `dist/` directory after running `npm run build`.
# daily
