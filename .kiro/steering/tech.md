# Tech Stack & Build System

## Core Technologies

- **Static Site Generator**: VitePress 2.0.0-alpha.5
- **Framework**: Vue 3.4.27
- **Language**: TypeScript with ES modules
- **Package Manager**: pnpm 9.1.0 (preferred)
- **Styling**: Sass/SCSS with custom themes
- **Content**: Markdown with frontmatter

## Key Dependencies

- **Documentation**: VitePress with custom theme and components
- **Comments**: Giscus integration via vitepress-plugin-comment-with-giscus
- **Search**: Algolia DocSearch
- **Animations**: oh-my-live2d for interactive elements
- **Image Zoom**: medium-zoom for image interactions
- **Sitemap**: Automatic sitemap generation

## Development Tools

- **Code Quality**: Prettier with @femm/prettier config
- **Git Hooks**: Husky with lint-staged for pre-commit formatting
- **Commit Validation**: @femm/verify-commit for conventional commits
- **Cross-platform**: cross-env for environment variables

## Common Commands

### Development

```bash
# Start development server (port 8732)
npm run dev
# or
pnpm dev
```

### Building

```bash
# Build for production
npm run build
# or
pnpm build

# Build for GitHub Pages deployment
npm run build:github
```

### Content Management

```bash
# Create new article (interactive)
npm run create:article

# Fix broken links
npm run fix:links
npm run fix:common-links
```

### Code Quality

```bash
# Format all files with Prettier
npm run lint
```

### Deployment

```bash
# Upload to server
npm run up:dist
```

## Configuration Files

- **VitePress**: `docs/.vitepress/config.ts` - main site configuration
- **TypeScript**: `tsconfig.json` - ES modules with strict mode
- **Package Manager**: `.npmrc` - pnpm configuration
- **Git Hooks**: `.husky/` - pre-commit and commit-msg hooks
- **Prettier**: Uses @femm/prettier shared config

## Build Output

- Output directory: `dist/` (configured in VitePress config)
- Static assets: `docs/public/` copied to build root
- Automatic sitemap generation at build time
