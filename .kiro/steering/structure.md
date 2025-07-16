# Project Structure & Organization

## Root Directory

```
├── docs/                    # VitePress documentation source
├── dist/                    # Build output (generated)
├── scripts/                 # Automation scripts
├── .husky/                  # Git hooks configuration
├── .kiro/                   # Kiro AI assistant configuration
└── node_modules/            # Dependencies
```

## Documentation Structure (`docs/`)

### Core VitePress Files

- `docs/.vitepress/` - VitePress configuration and theme
  - `config.ts` - Main site configuration
  - `configs/` - Modular config files (nav, sidebar, algolia, head)
  - `theme/` - Custom theme components and styles
  - `components/` - Reusable Vue components

### Content Organization

- `docs/index.md` - Homepage
- `docs/about.md` - About page
- `docs/nav.md` - Navigation/tools page
- `docs/friends.md` - Friend links page

### Main Content Sections

- `docs/fe/` - Frontend fundamentals (JavaScript, CSS, HTML, browser, network)
- `docs/workflow/` - Development workflows and tools
- `docs/efficiency/` - Productivity tools and software recommendations
- `docs/pit/` - Troubleshooting and common pitfalls
- `docs/interview/` - Interview preparation materials
- `docs/notes/` - Learning notes and references

### Library Documentation

- `docs/nextjs-cn/` - Next.js Chinese documentation
- `docs/gsap/` - GSAP animation library docs
- `docs/html2canvas/` - html2canvas library docs
- `docs/hammerjs/` - Hammer.js touch gesture docs
- `docs/sweetalert/` - SweetAlert dialog docs

### Dynamic Content

- `docs/content/` - Blog-style articles with data.ts index
- `docs/analysis/` - Source code analysis articles

### Assets & Resources

- `docs/public/` - Static assets (favicon, images, icons, manifest)
- `docs/assets/` - Content-specific assets organized by article ID
- `docs/nav/` - Navigation page specific styles and data

## Configuration Patterns

### File Naming

- Use kebab-case for file and folder names
- Markdown files use `.md` extension
- TypeScript config files use `.ts` extension
- Scripts use `.mjs` for ES modules

### Content Structure

- Each major section has its own folder under `docs/`
- Subsections organized logically (e.g., `fe/javascript/`, `fe/css/`)
- Assets stored in `docs/assets/` with numeric folder organization
- Public assets in `docs/public/` for global resources

### Navigation & Sidebar

- Navigation configured in `docs/.vitepress/configs/nav.ts`
- Sidebar configured in `docs/.vitepress/configs/sidebar.ts`
- Dynamic content uses data files (e.g., `docs/content/data.ts`)

## Scripts & Automation

- `scripts/create-article.mjs` - Interactive article creation
- `scripts/fix-routing-links.mjs` - Link validation and fixing
- `scripts/update-links.mjs` - Bulk link updates
- All scripts use ES module format (`.mjs`)

## Development Conventions

- Use pnpm as package manager
- Follow Prettier formatting rules (@femm/prettier)
- Commit messages follow conventional commit format
- Pre-commit hooks ensure code quality
- TypeScript strict mode enabled
- ES modules throughout the project
