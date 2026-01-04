# Repository Guidelines

## Project Structure & Module Organization

- `docs/`: VitePress site root (pages, content, and static assets).
- `docs/.vitepress/`: site config and theme code (`config.ts`, `theme/`, `components/`, `configs/`).
- `docs/content/`: blog-style content source:
  - `docs/content/docs/`: articles as numbered files (e.g. `12.md`).
  - `docs/content/data.ts`: article metadata/index used by the site.
- `docs/assets/` and `docs/public/`: images and static files.
- `scripts/`: maintenance utilities (article creation, link fixing).
- `dist/`: build output (generated); do not edit by hand.

## Build, Test, and Development Commands

- `pnpm install`: install dependencies (repo uses `pnpm@9`).
- `pnpm dev`: start local dev server for `docs/` (defaults to port `8732`).
- `pnpm build`: build static site into `dist/`.
- `pnpm build:github`: build with GitHub Pages base path (`/vitepress_blog/`).
- `pnpm lint`: format the repo with Prettier (writes files).
- `pnpm create:article`: interactive post generator; creates `docs/content/docs/<id>.md` and updates `docs/content/data.ts`.
- `pnpm fix:links` / `pnpm fix:common-links`: run link-rewrite helpers when content routes change.

## Coding Style & Naming Conventions

- Indentation: 2 spaces; LF line endings (see `.editorconfig`).
- Formatting: Prettier (`@femm/prettier`). Pre-commit runs `lint-staged`.
- Articles: use numeric filenames (`<id>.md`) and keep frontmatter fields consistent (`title`, `date`, `permalink`, etc.).

## Testing Guidelines

This repo does not include a dedicated automated test runner. Before opening a PR, run:

- `pnpm lint`
- `pnpm build` (catches most VitePress/markdown issues)

## Deployment & Configuration

- GitHub Pages deploys via `.github/workflows/deploy.yml` on pushes to `main` that change `docs/**`.
- Optional server upload: `pnpm up:dist` uses `upload.serve.mjs` and a local `server-config.mjs` (gitignored). Never commit real credentials.

## Commit & Pull Request Guidelines

- Commit messages must pass the `commit-msg` hook (`npx femm-verify-commit`). Use Conventional Commits like `feat: ...`, `fix: ...`, `docs: ...` (optionally `feat(scope): ...`).
- PRs should include: a clear description, linked issues (if any), and screenshots/GIFs for UI/theme changes.
- Avoid committing generated output (`dist/`) unless the change explicitly requires it.
