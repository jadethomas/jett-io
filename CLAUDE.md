# CLAUDE.md — jett.io

> **jett.io** — A static personal blog on engineering leadership, AI, DevOps, security and resilience. "Signal over noise."

---

## Project Overview

A statically-exported Next.js site with MDX-authored blog posts, served from Cloudflare's edge. It has no backend, no database, and no runtime — every page is HTML generated at build time.

Practically, that means: content lives in files, data loading happens at build time via Node `fs`, and anything that needs a server belongs in a different project.

---

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| **Framework** | Next.js 15 (App Router) | `output: 'export'` — static HTML into `/out` |
| **Language** | TypeScript 5 | strict mode |
| **Styling** | Tailwind CSS v4 | CSS-first config; **there is no `tailwind.config.*`** |
| **Components** | shadcn/ui | `components/ui/`, "new-york" style, CSS variables |
| **Content** | MDX via `next-mdx-remote` + `gray-matter` | read at build time from `content/posts/` |
| **Icons** | lucide-react | |
| **Dates** | date-fns | |
| **Hosting** | Cloudflare Pages | project `jett-io`, auto-deploys from `main` |
| **Analytics** | `@vercel/analytics` | |

### Key config (`next.config.mjs`)

```js
output: 'export'          // static export, no server runtime
trailingSlash: true       // links resolve as /blog/slug/
images: { unoptimized: true }
eslint: { ignoreDuringBuilds: true }      // see Traps
typescript: { ignoreBuildErrors: true }   // see Traps
```

---

## Repository Structure

```
jett.io/
├── CLAUDE.md                  # ← This file
├── DEPLOYMENT.md              # Cloudflare Pages setup and troubleshooting
├── README.md
├── next.config.mjs
├── wrangler.toml              # Cloudflare project name + build output dir
├── components.json            # shadcn/ui config
├── .claude/
│   └── commands/implement.md  # The authoritative build workflow
├── .github/workflows/
│   └── deploy.yml             # Build + deploy to Cloudflare Pages on push to main
│
├── app/                       # App Router pages
│   ├── layout.tsx             # Root layout, next/font wiring, metadata
│   ├── globals.css            # ALL design tokens live here (see Styling)
│   ├── page.tsx               # Homepage
│   ├── about/page.tsx
│   └── blog/
│       ├── page.tsx           # Listing
│       └── [slug]/page.tsx    # Post — generateStaticParams + MDXRemote
│
├── components/                # Shared components
│   └── ui/                    # shadcn primitives
│
├── content/posts/             # MDX blog posts (frontmatter + body)
├── lib/
│   ├── blog.ts                # Build-time content loader, post types
│   └── utils.ts               # cn()
└── public/images/             # Committed, pre-optimised images
```

There is no `backend/`, no `frontend/`, no `docs/features/`, and no test directory. Do not invent them.

---

## Three Traps That Fail Silently

These have each cost real time. Read them before changing anything.

### 1. The build ignores lint and type errors

`next.config.mjs` sets both `eslint.ignoreDuringBuilds` and `typescript.ignoreBuildErrors`. A green `npm run build` proves the site compiled, not that it is correct.

**Always run `npx tsc --noEmit` separately.**

Known baseline: `app/blog/[slug]/page.tsx` uses Next 15's old synchronous `params` signature and reports one error. Leave it unless you are fixing it deliberately; treat any *other* error as yours.

### 2. Tailwind v4 emits nothing for an unknown utility

There is no config file and no error on an unrecognised class. A deleted, renamed, or misspelled design token produces an element with **no styling at all**, a passing build, and no warning anywhere.

If you change tokens in `app/globals.css`, you must:

```bash
# 1. Sweep for stragglers — expect zero hits
grep -rn "<old-token-name>" app/ components/ lib/

# 2. Confirm new utilities actually generated CSS
grep -o -E '[^{}]*<expected-value>[^{}]*' out/_next/static/css/*.css
```

Grep for the **property value** (`1.5px`, `#feebca`), not the class name — escaped class selectors make name-based greps report false misses.

### 3. `npm run lint` hangs

ESLint was never configured. `next lint` drops into an interactive setup prompt and will block. **Do not run it.** Use `tsc --noEmit` as the static check.

---

## Coding Standards

### TypeScript / React

- **Strict mode, no `any`.** Define real interfaces.
- **Server components by default** — add `"use client"` only when state, effects, or event handlers demand it.
- **shadcn/ui first.** Check `components/ui/` before building custom UI. If a variant does not exist, *extend* `buttonVariants` with a new variant or size rather than hand-rolling classes on a raw element — this is a recurring code-review finding.
- **Tailwind only.** No CSS modules, no styled-components, no inline `style` for anything a utility can express. Use `cn()` for conditional classes.
- **Naming** — PascalCase components, camelCase functions and hooks, kebab-case files.

### Styling and design tokens

All tokens live in `app/globals.css`, in two blocks:

- `:root` — raw brand values plus the shadcn semantic set (`--primary`, `--card`, `--border`, `--ring`, …)
- `@theme inline` — maps those into Tailwind utilities (`--color-*`, `--radius-*`, `--font-*`, custom `--text-*`)

Rules:
- **Never hardcode a colour, radius, or font in a component.** Add or reuse a token.
- Keep the shadcn semantic names — `components.json` has `cssVariables: true`, so any future `npx shadcn add` emits components expecting them.
- Radii derive from a single `--radius` anchor; pills use `rounded-full`.

### Static export constraints

- No server-only APIs, route handlers, `headers()`, `cookies()`, or runtime data fetching.
- `next/image` works because `images.unoptimized` is set, but any `fill` image **requires a positioned ancestor** or the layout breaks silently.
- Internal links use `next/link` with no manual trailing slash — Next adds it.
- Dynamic routes need `generateStaticParams`.

### Content

- Posts are `.mdx` files in `content/posts/`; the filename is the slug.
- Frontmatter is the data contract, typed as `PostMetadata` in `lib/blog.ts`. Adding a field means updating the interface, both loader functions, and every post.
- `lib/blog.ts` is synchronous and uses Node `fs` — build-time only, never import it into a client component.
- Custom components available inside MDX are registered in the `components` map in `app/blog/[slug]/page.tsx`.

---

## Verification

**There is no test suite.** No pytest, no Vitest, no Playwright, no Docker. Do not claim tests pass, and do not tick a checklist item for a suite that does not exist — mark it N/A with the reason.

Verification for any change is:

1. `npm run build` — must succeed
2. `npx tsc --noEmit` — clean beyond the known baseline
3. Stale-token sweep, if `app/globals.css` changed
4. Compiled-CSS check for any new or unusual utility
5. **Browser pass** — serve the real export and look at it:
   ```bash
   npm run build && npx serve out -p 4321
   ```
   Check every affected route — `/`, `/blog/`, `/about/`, and one post — plus hover and focus states.
6. Preview deploy: `wrangler pages deploy out --project-name=jett-io`

Restyling a shared component (`navigation`, `footer`, `post-card`, anything in `components/ui/`) silently changes pages the ticket never mentions. **Always check `/about/` and `/blog/` afterwards.**

If the browser will not resize below ~1440px, do not claim a mobile visual pass. Verify the responsive classes sit inside the right `@media` block in the compiled CSS, and say plainly that it was verified statically.

### Adding tests

If a change genuinely warrants automated tests, propose setting up Vitest as its own ticket rather than bolting a half-suite onto a feature branch.

---

## Deployment

Cloudflare Pages, project `jett-io`. Every push to `main` triggers `.github/workflows/deploy.yml`, which builds and deploys `/out` via `wrangler-action`.

Requires two repository secrets: `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.

See `DEPLOYMENT.md` for setup, custom domains, preview deployments, and troubleshooting.

---

## Commands Reference

```bash
# Development
npm install
npm run dev                  # dev server
npm run build                # static export into /out
npx tsc --noEmit             # the real static check — run this, not `npm run lint`

# Preview the actual export
npx serve out -p 4321
npx wrangler pages dev out   # closer to production routing

# shadcn/ui
npx shadcn@latest add <component>

# Deploy
wrangler pages deploy out --project-name=jett-io               # preview
wrangler pages deploy out --project-name=jett-io --branch=main # production
wrangler whoami
```

---

## Development Workflow

All feature work is Jira-driven and runs through **`/implement <TICKET>`**.

**`.claude/commands/implement.md` is the authoritative workflow.** It defines all nine phases in detail. This file deliberately does not restate them — that duplication is how the two drifted apart before. Read the command.

The essentials:

### Required plugins

```
/plugin install feature-dev@claude-plugins-official
/plugin install code-review@claude-plugins-official
```

### Ticket states

```
To Do → In Progress → In Review → Done
         (Phase 2)     (Phase 6)   (Phase 9, on user approval)
```

### Branch naming

```
feature/jett-42     # feature work
fix/jett-42         # bug fixes
```

Lowercase ticket ID, prefixed.

### Commit convention

```
feat(JETT-42): add category filter to blog listing
fix(JETT-42): stop nav overlapping the hero on mobile
chore(JETT-42): update Cloudflare deploy workflow
docs(JETT-42): document the token sweep
```

Every commit references the ticket.

### Non-negotiables

1. **Every change starts with a Jira ticket.**
2. **Features are built with `/feature-dev`** — exploration and architecture before code. For genuinely trivial single-file changes (a doc fix, a typo), say so and skip it rather than pretending.
3. **Acceptance criteria are the validation set.** There is no `docs/features/`; the ticket is the spec.
4. **Verify before opening a PR** — build, types, browser pass.
5. **Two layers of review** — `/feature-dev`'s reviewer, then `/code-review` on the PR. Fix everything scoring ≥80; below that use judgement, and fix cheap clearly-correct things rather than leaving them on a technicality.
6. **Every PR gets a manual test script** on the ticket.
7. **Acceptance criteria are ticked in Jira** only when actually verified. Anything you could not verify is reported as NOT DONE with the reason — never quietly ticked.
8. **Wrap-up on approval only** — merge, pull `main`, move tickets to Done, confirm production deployed.

### Claude vs human

| Step | Claude | Human |
|------|--------|-------|
| Read ticket, create branch | ✅ | |
| Implement via `/feature-dev` | ✅ | |
| Build, type-check, browser pass | ✅ | |
| Preview deploy | ✅ | |
| Validate + tick acceptance criteria | ✅ | |
| Create PR, write manual test script | ✅ | |
| Move ticket to In Review | ✅ | |
| Run `/code-review`, fix findings | ✅ | |
| Manual testing on a real device | | ✅ |
| Review and approve the PR | | ✅ |
| DNS / Cloudflare dashboard changes | | ✅ |
| Merge, pull main, tickets to Done | ✅ (on approval) | |

---

## Honesty Requirements

These matter more than any convention above.

- Never report a step as passing when you did not run it.
- Distinguish "checked in a browser" from "verified in compiled CSS" — both are legitimate, conflating them is not.
- A criterion you could not complete is information the user needs, not a failure to conceal.
- If a workflow step cannot be executed in this repo, say so and propose the closest real equivalent instead of silently skipping it.

---

## Context7 Integration

Use Context7 MCP whenever you need library, framework, or API documentation — Next.js, Tailwind, shadcn/ui, date-fns, Wrangler — without being asked. Prefer it over web search and over recalling from memory, since these libraries move quickly.

Do not use it for refactoring, debugging business logic, code review, or general programming concepts.
