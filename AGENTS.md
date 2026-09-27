# Agent guidelines

Instructions for AI coding agents (Claude Code, Codex, Cursor…) working in this repository.

## Git: commit often, push once

Every push to `main` triggers a Vercel production build, and every push to another branch triggers a preview build. Builds are billed per push, not per commit.

- Commit locally as often as you like, but **never push after each commit**. One task = one push, at the end, once the checks pass.
- Batch work that touches many icons (one commit per icon is fine) and push the whole series in a single `git push`.
- Do not push to `main` directly unless the maintainer asks for it. Work on a branch and open a pull request.
- Never force-push `main`.
- No scripts or loops that run `git push` repeatedly.

## Registry: always run `pnpm gen-cli`

After adding or changing any icon component, run `pnpm gen-cli` before committing. It lints the sources, syncs the registry manifest, rebuilds `registry.json`, `public/r/` and the Vue/Svelte ports, then checks them. Without it, new or changed icons are not published.

## Project

- Package manager: `pnpm`. Canonical icons are React components in `icons/<library>/*.tsx`, listed in `icons/<library>/index.ts`.
- Generated files, never edited by hand: `frameworks/` (Vue and Svelte ports), `public/r/`, `registry.json`, `scripts/registry-components.ts`.
- After changing an icon, update its entry in `docs/animation-parity.json` (including `sourceSha256`, computed after formatting) and, if its mapping changes, `docs/catalog-coverage.json` and `docs/CATALOG_COVERAGE.md`.
- Before pushing, run: `pnpm gen-cli`, `pnpm check-imports`, `pnpm check-duplicates`, `pnpm check-catalog-coverage`, `pnpm check-animation-parity`, `pnpm check-frameworks`, `pnpm check-icon-content`, `pnpm exec tsc --noEmit`.
- Commit messages follow Conventional Commits with a scope, for example `feat(icons): …`, `fix(ports): …`, `docs(catalog): …`.

See [CONTRIBUTING.md](CONTRIBUTING.md), [docs/CATALOG_COVERAGE.md](docs/CATALOG_COVERAGE.md) and [docs/ANIMATION_PARITY.md](docs/ANIMATION_PARITY.md) for details.
