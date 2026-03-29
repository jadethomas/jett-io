# CLAUDE.md — Kaitiaki Project

> **Kaitiaki** (Te Reo Māori: guardian, steward) — An AI-powered security assessment tool that enables security teams to create assessments from templates and use AI to draft, review, and manage them.

---

## Project Overview

Kaitiaki is a full-stack application for managing AI/technology security assessments at scale. It provides:

- **Template-driven assessments** — Create and manage reusable security assessment templates
- **AI-assisted drafting** — Use LLMs to draft assessment responses from context and evidence
- **Assessment lifecycle management** — Track assessments through draft → review → approved states
- **Collaboration** — Multiple reviewers can contribute to and sign off on assessments

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Backend** | Python + FastAPI | Python 3.12+, FastAPI latest |
| **ORM** | SQLModel (Pydantic + SQLAlchemy) | Latest |
| **Database** | SQLite | Via aiosqlite for async |
| **Migrations** | Alembic | Latest |
| **Frontend** | Next.js (App Router) | 14.x |
| **UI Components** | shadcn/ui | Latest |
| **Styling** | Tailwind CSS | 3.x |
| **Containerisation** | Docker + Docker Compose | Multi-stage builds |

---

## Repository Structure

```
kaitiaki/
├── CLAUDE.md                   # ← This file (project instructions for Claude Code)
├── docker-compose.yml          # Full stack orchestration
├── .github/
│   └── workflows/              # CI/CD pipelines
│
├── backend/
│   ├── Dockerfile
│   ├── pyproject.toml          # Python project config (use uv or pip)
│   ├── alembic.ini
│   ├── alembic/
│   │   └── versions/           # Migration scripts
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py             # FastAPI app entry point
│   │   ├── config.py           # Settings via pydantic-settings
│   │   ├── database.py         # SQLite engine + session management
│   │   ├── models/             # SQLModel table definitions
│   │   │   ├── __init__.py
│   │   │   ├── template.py     # Assessment templates
│   │   │   ├── assessment.py   # Assessment instances
│   │   │   ├── question.py     # Template questions / assessment answers
│   │   │   └── user.py         # Users (assessors, reviewers)
│   │   ├── schemas/            # Pydantic request/response schemas (if needed beyond SQLModel)
│   │   ├── routers/            # API route modules
│   │   │   ├── __init__.py
│   │   │   ├── templates.py
│   │   │   ├── assessments.py
│   │   │   ├── questions.py
│   │   │   └── ai.py           # AI drafting endpoints
│   │   ├── services/           # Business logic layer
│   │   │   ├── __init__.py
│   │   │   ├── assessment_service.py
│   │   │   ├── template_service.py
│   │   │   └── ai_service.py   # LLM integration for drafting
│   │   └── utils/
│   │       └── __init__.py
│   └── tests/
│       ├── conftest.py         # Fixtures: test DB, client
│       ├── test_templates.py
│       └── test_assessments.py
│
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   ├── components.json         # shadcn/ui config
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx      # Root layout with providers
│   │   │   ├── page.tsx        # Dashboard / home
│   │   │   ├── templates/
│   │   │   │   ├── page.tsx            # Template list
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx        # Template detail/edit
│   │   │   ├── assessments/
│   │   │   │   ├── page.tsx            # Assessment list
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx        # Create from template
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx        # Assessment workspace
│   │   │   └── api/                    # Next.js API routes (proxy if needed)
│   │   ├── components/
│   │   │   ├── ui/             # shadcn/ui components (auto-generated)
│   │   │   ├── layout/         # Shell, sidebar, header
│   │   │   ├── templates/      # Template-specific components
│   │   │   ├── assessments/    # Assessment-specific components
│   │   │   └── ai/             # AI drafting UI (draft panel, suggestions)
│   │   ├── lib/
│   │   │   ├── api.ts          # Backend API client (fetch wrapper)
│   │   │   ├── utils.ts        # shadcn/ui cn() utility
│   │   │   └── types.ts        # Shared TypeScript types
│   │   └── hooks/
│   │       └── use-api.ts      # Data fetching hooks
│   └── tests/
│       └── ...
│
└── docs/
    ├── architecture.md
    └── api.md
```

---

## Feature Development Workflow (Feature-Dev Plugin)

**All feature work MUST follow this workflow.** Do not skip steps.

### 1. Understand the Feature

Before writing any code, create or locate the feature specification:

```
docs/features/FEATURE-NAME.md
```

Each feature spec must contain:
- **Goal** — What problem does this solve?
- **User stories** — Who benefits and how?
- **Acceptance criteria** — How do we know it's done?
- **Technical approach** — High-level design decisions
- **API changes** — New/modified endpoints
- **Database changes** — New/modified models or migrations
- **UI changes** — New/modified pages or components

### 2. Plan the Implementation

Break the feature into ordered tasks. Create a checklist:

```markdown
## Implementation Plan: [Feature Name]

- [ ] Database models / migrations
- [ ] Service layer logic
- [ ] API endpoints + tests
- [ ] Frontend types + API client
- [ ] UI components
- [ ] Page integration
- [ ] Docker validation
- [ ] Update docs
```

### 3. Implement Backend First

Follow this order strictly:

1. **Models** — Define SQLModel tables in `backend/app/models/`
2. **Migration** — Generate Alembic migration: `alembic revision --autogenerate -m "description"`
3. **Service** — Business logic in `backend/app/services/`
4. **Router** — API endpoints in `backend/app/routers/`, register in `main.py`
5. **Tests** — Cover happy path + edge cases in `backend/tests/`

### 4. Implement Frontend Second

Follow this order:

1. **Types** — Add TypeScript types in `src/lib/types.ts` matching API response shapes
2. **API client** — Add fetch functions in `src/lib/api.ts`
3. **Components** — Build UI components, use shadcn/ui primitives
4. **Pages** — Wire components into App Router pages
5. **Test** — Verify end-to-end flow works

### 5. Validate

- Run backend tests: `cd backend && pytest`
- Run frontend build: `cd frontend && npm run build`
- Run full stack: `docker compose up --build`
- Verify the feature works end-to-end

---

## Coding Standards

### Python / Backend

- **Type hints everywhere** — All function signatures must have type annotations
- **Async by default** — Use `async def` for all route handlers and DB operations
- **SQLModel for models** — Define tables as `SQLModel` classes with `table=True`
- **Pydantic for validation** — Request/response schemas leverage SQLModel or standalone Pydantic models
- **Service layer pattern** — Routers call services, services call the DB. Routers never query the DB directly.
- **Dependency injection** — Use FastAPI `Depends()` for DB sessions, auth, config
- **Error handling** — Raise `HTTPException` with meaningful status codes and detail messages
- **Naming** — snake_case for files, functions, variables. PascalCase for classes.

```python
# Example: router pattern
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel.ext.asyncio.session import AsyncSession
from app.database import get_session
from app.services.assessment_service import AssessmentService

router = APIRouter(prefix="/assessments", tags=["assessments"])

@router.get("/{assessment_id}")
async def get_assessment(
    assessment_id: int,
    session: AsyncSession = Depends(get_session),
) -> AssessmentRead:
    service = AssessmentService(session)
    assessment = await service.get_by_id(assessment_id)
    if not assessment:
        raise HTTPException(status_code=404, detail="Assessment not found")
    return assessment
```

### TypeScript / Frontend

- **TypeScript strict mode** — No `any` types. Define proper interfaces.
- **Server components by default** — Only add `"use client"` when state/interactivity is needed
- **shadcn/ui first** — Always check if a shadcn/ui component exists before building custom UI
- **Tailwind only** — No CSS modules, no styled-components. Use `cn()` utility for conditional classes.
- **Colocation** — Keep components close to where they're used. Shared components go in `components/ui/` or `components/layout/`
- **Naming** — PascalCase for components, camelCase for functions/hooks, kebab-case for files

```tsx
// Example: API client pattern
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export async function getAssessments(): Promise<Assessment[]> {
  const res = await fetch(`${API_BASE}/assessments`);
  if (!res.ok) throw new Error("Failed to fetch assessments");
  return res.json();
}
```

### Database Conventions

- **SQLite file location** — `backend/data/kaitiaki.db` (gitignored, volume-mounted in Docker)
- **Alembic for all schema changes** — Never modify the DB manually
- **Soft deletes** — Add `deleted_at: datetime | None` rather than hard-deleting records
- **Timestamps on everything** — All models include `created_at` and `updated_at`
- **UUID primary keys** — Use UUID strings as primary keys for all user-facing entities

```python
# Example: Base model pattern
import uuid
from datetime import datetime
from sqlmodel import SQLModel, Field

class BaseModel(SQLModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    deleted_at: datetime | None = Field(default=None)
```

---

## Test Strategy

The goal is **high confidence with minimal friction** — test the things that break, skip the things that don't.

### Principles

- **Test behaviour, not implementation** — assert on outcomes, not internal method calls
- **Real DB for backend tests** — use an in-memory SQLite database, no mocking the ORM
- **One assertion focus per test** — test one logical behaviour; multiple `assert` statements are fine if they verify the same thing
- **Tests live next to code** — frontend tests colocated with components, backend tests in `backend/tests/`
- **CI must pass before merge** — all test suites run in GitHub Actions on every PR

### Backend — pytest + httpx

| Layer | What to test | What to skip |
|-------|-------------|-------------|
| **Services** | Business logic, state transitions, validation rules, edge cases | Trivial getters that just proxy the DB |
| **Routers (integration)** | Full request → response cycle via `AsyncClient` against a real test DB | Don't duplicate service-level assertions |
| **Models** | Only if the model has custom validators or computed properties | Basic field definitions — SQLModel handles that |

#### Setup

```python
# backend/tests/conftest.py
import pytest_asyncio
from httpx import AsyncClient, ASGITransport
from sqlmodel import SQLModel
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlmodel.ext.asyncio.session import AsyncSession as SQLModelSession

@pytest_asyncio.fixture
async def session():
    engine = create_async_engine("sqlite+aiosqlite://", echo=False)
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)
    async with AsyncSession(engine) as s:
        yield s

@pytest_asyncio.fixture
async def client(session):
    from app.main import app
    from app.database import get_session
    app.dependency_overrides[get_session] = lambda: session
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as c:
        yield c
    app.dependency_overrides.clear()
```

#### Conventions

- File naming: `test_<module>.py`
- Use `pytest.mark.asyncio` for all async tests
- Use factories or fixtures for test data — no raw dict literals repeated across tests
- Test the happy path first, then edge cases and error responses (404, 422, 409)

```bash
cd backend && pytest                  # Run all
cd backend && pytest -x               # Stop on first failure
cd backend && pytest --cov=app        # With coverage
cd backend && pytest -k "template"    # Filter by name
```

### Frontend — Vitest + React Testing Library

| Layer | What to test | What to skip |
|-------|-------------|-------------|
| **Components** | Interactive behaviour (clicks, form submissions, conditional rendering) | Static display-only components — the build catches those |
| **Hooks** | Custom hooks with non-trivial logic (data transforms, state machines) | Simple `useState` wrappers |
| **API client (`lib/api.ts`)** | Response parsing, error handling | Don't mock fetch internals — use MSW |
| **Pages** | Only if the page has meaningful orchestration logic | Pages that just compose components |

#### Setup

```typescript
// frontend/vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    css: false,
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
```

```typescript
// frontend/tests/setup.ts
import "@testing-library/jest-dom/vitest";
```

#### Conventions

- File naming: `<component>.test.tsx` colocated next to the component
- Use `screen.getByRole` over `getByTestId` — test what the user sees
- Use [MSW](https://mswjs.io/) (Mock Service Worker) to intercept API calls in tests — no mocking `fetch` directly
- Keep component tests focused: render → act → assert

```bash
cd frontend && npx vitest             # Watch mode
cd frontend && npx vitest run         # Single run (CI)
cd frontend && npx vitest --coverage  # With coverage
```

### UI / E2E — Playwright

Use Playwright sparingly for **critical user journeys only**. These are slow and brittle if overused.

#### What to cover

- Create assessment from template (happy path)
- Assessment state transitions (draft → review → approved)
- AI drafting flow (when `ENABLE_AI_DRAFTING=true`)
- Auth flows (once auth is implemented)

#### What NOT to cover with E2E

- Individual component behaviour — that's what Vitest is for
- API edge cases — that's what pytest is for
- Visual regressions — not worth the maintenance cost at this stage

#### Setup

```typescript
// frontend/playwright.config.ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  webServer: {
    command: "docker compose up --build",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: "http://localhost:3000",
  },
});
```

#### Conventions

- Tests live in `frontend/e2e/`
- File naming: `<journey>.spec.ts`
- Use page object pattern only if tests get unwieldy — start simple
- Run against the full Docker stack so the backend is real
- Keep the suite under ~10 tests — if it grows beyond that, re-evaluate what actually needs E2E coverage

```bash
cd frontend && npx playwright test              # Run all
cd frontend && npx playwright test --ui         # Interactive mode
cd frontend && npx playwright test --project=chromium  # Single browser
```

### Coverage Targets

| Suite | Target | Rationale |
|-------|--------|-----------|
| Backend (pytest) | **80%+ line coverage** | Services and routers are the core — aim high here |
| Frontend (Vitest) | **70%+ on components with logic** | Don't chase coverage on wrapper/layout components |
| E2E (Playwright) | **Critical paths only** | No coverage target — measure by journey count, not % |

These are guides, not gates. A well-tested 75% codebase beats a poorly-tested 95% one.

### CI Integration

All three suites run in GitHub Actions on every PR:

```yaml
# .github/workflows/test.yml (simplified)
jobs:
  backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: "3.12" }
      - run: pip install -e ".[dev]"
        working-directory: backend
      - run: pytest --cov=app --cov-report=term-missing
        working-directory: backend

  frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: "20" }
      - run: npm ci
        working-directory: frontend
      - run: npx vitest run
        working-directory: frontend

  e2e:
    runs-on: ubuntu-latest
    needs: [backend, frontend]
    steps:
      - uses: actions/checkout@v4
      - run: docker compose up --build -d
      - uses: actions/setup-node@v4
        with: { node-version: "20" }
      - run: npm ci
        working-directory: frontend
      - run: npx playwright install --with-deps chromium
        working-directory: frontend
      - run: npx playwright test --project=chromium
        working-directory: frontend
```

---

## Docker Setup

### docker-compose.yml structure

```yaml
services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    volumes:
      - ./backend/data:/app/data    # SQLite persistence
      - ./backend/app:/app/app      # Hot reload in dev
    environment:
      - DATABASE_URL=sqlite+aiosqlite:///./data/kaitiaki.db
      - ENVIRONMENT=development

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    volumes:
      - ./frontend/src:/app/src     # Hot reload in dev
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:8000
    depends_on:
      - backend
```

### Backend Dockerfile pattern

```dockerfile
FROM python:3.12-slim AS base
WORKDIR /app
COPY pyproject.toml .
RUN pip install --no-cache-dir -e .
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
```

### Frontend Dockerfile pattern

```dockerfile
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .

FROM base AS dev
CMD ["npm", "run", "dev"]

FROM base AS build
RUN npm run build

FROM node:20-alpine AS prod
WORKDIR /app
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
CMD ["node", "server.js"]
```

---

## Domain Model (Core Entities)

| Entity | Description |
|--------|-------------|
| **Template** | A reusable assessment template with sections and questions |
| **TemplateSection** | A grouping of questions within a template |
| **TemplateQuestion** | A question/prompt within a section, with guidance text |
| **Assessment** | An instance created from a template, for a specific subject |
| **AssessmentAnswer** | An answer to a template question, can be AI-drafted or manual |
| **AuditLog** | Generic audit log for tracking entity changes (status transitions, etc.) |
| **User** | An assessor or reviewer |

### Assessment States

```
CREATED → EVIDENCE_GATHERING → ASSESSMENT_IN_PROGRESS → IN_REVIEW → APPROVED
                                                                   → CHANGES_REQUESTED → ASSESSMENT_IN_PROGRESS (loop back)

Revert transitions also allowed:
  EVIDENCE_GATHERING → CREATED
  ASSESSMENT_IN_PROGRESS → EVIDENCE_GATHERING
```

---

## AI Drafting Behaviour

- The AI drafting service (`backend/app/services/ai_service.py`) takes a question, its guidance text, and any provided context/evidence as input
- It returns a draft answer that the assessor can accept, edit, or regenerate
- **The AI endpoint must be behind a feature flag** — allow the app to function fully without AI enabled
- Keep the LLM provider abstracted behind a service interface so it can be swapped (Anthropic, Azure OpenAI, Bedrock, etc.)
- Never persist raw LLM API keys in the database — use environment variables

---

## Commands Reference

```bash
# Backend
cd backend
pip install -e ".[dev]"          # Install with dev dependencies
uvicorn app.main:app --reload    # Run dev server
alembic upgrade head             # Apply migrations
alembic revision --autogenerate -m "msg"  # Create migration
pytest                           # Run tests
pytest --cov=app                 # Run tests with coverage

# Frontend
cd frontend
npm install                      # Install dependencies
npx shadcn-ui@latest init        # Initialise shadcn/ui (first time)
npx shadcn-ui@latest add button  # Add a component
npm run dev                      # Run dev server
npm run build                    # Production build
npm run lint                     # Lint check

# Docker
docker compose up --build        # Build and run full stack
docker compose down              # Stop all services
docker compose logs -f backend   # Tail backend logs
```

---

## Important Constraints

1. **SQLite only** — No Postgres, no MySQL. SQLite is the database. Keep queries compatible.
2. **No ORM magic** — Prefer explicit queries over lazy-loading or deep relationship chains.
3. **API-first** — The frontend consumes the backend exclusively via REST API. No direct DB access from Next.js.
4. **Feature flags** — AI features must be toggleable via environment variable (`ENABLE_AI_DRAFTING=true`).
5. **No secrets in code** — All credentials via environment variables, documented in `.env.example`.
6. **Conventional commits** — Use `feat:`, `fix:`, `chore:`, `docs:` prefixes.

---

## When Starting a New Feature

Always follow this checklist:

```
□ Create feature spec in docs/features/
□ Plan implementation tasks  
□ Implement backend (models → migration → service → router → tests)
□ Implement frontend (types → api client → components → pages)
□ Verify with docker compose up --build
□ Update CLAUDE.md if new patterns emerge
```

---

## Context7 Integration

Always use Context7 MCP when you need library/API documentation, code generation, setup or configuration steps without being explicitly asked.

# Development Workflow — CLAUDE.md Addendum

> Add this section to your existing CLAUDE.md file.

---

## Development Workflow (Mandatory)

All feature work in this project follows a strict Jira-driven workflow using the `/implement` command and the `/feature-dev` plugin. **No code changes should be made outside of this workflow.**

### Required Plugins

These plugins MUST be installed before starting work:

```
/plugin install feature-dev@claude-plugins-official
/plugin install code-review@claude-plugins-official
```

### How to Start Work

```
/implement MAT-42
```

This triggers an 8-phase automated workflow. Do not deviate from it.

### Workflow Phases

```
Phase 1: Understand     → Fetch ticket from Jira, read feature spec, confirm scope with user
Phase 2: Prepare        → Clean working directory, create feature branch, update Jira to In Progress
Phase 3: Implement      → MUST use /feature-dev plugin (explore → architect → implement → review)
Phase 4: Verify         → Run all tests, check regression, validate against feature spec criteria, Docker build
Phase 4b: Accept. Crit. → Validate each acceptance criterion from the Jira ticket, tick them off in Jira
Phase 5: Pull Request   → Push branch, create PR via gh CLI with structured body
Phase 6: Update Jira    → Move ticket to In Review, add PR link, add manual test script
Phase 7: Code Review    → Run /code-review, fix findings >= 80 confidence, re-run until clean
Phase 8: Handoff        → Summarise to user what was done and what they need to do next
Phase 9: Wrap-up        → When user approves: merge PR, switch to main, pull, move all tickets to Done
```

### Implementation MUST Use /feature-dev

Phase 3 is non-negotiable. The `/feature-dev` plugin provides three specialised agents:

- **code-explorer** — Analyses the codebase to understand existing patterns and architecture
- **code-architect** — Plans the implementation approach before any code is written
- **code-reviewer** — Reviews the implementation for quality and correctness

Direct implementation (writing code without going through /feature-dev) is not permitted. This ensures every feature gets proper exploration, architecture planning, and built-in review before the outer /code-review pass.

### Phase 9: Wrap-up (on user approval)

When the user approves the work (after manual testing or review), execute this wrap-up sequence:

1. **Move all associated tickets to Done** — the bundle ticket AND any sub-stories it covers
2. **Push any remaining changes** to origin
3. **Merge the PR** — `gh pr merge <number> --merge --delete-branch`
4. **Switch to main and pull** — `git checkout main && git pull`
5. **Confirm** — report that all tickets are Done, PR is merged, and local repo is on main

### Jira Ticket States

```
To Do → In Progress → In Review → Done
         (Phase 2)    (Phase 6)   (Phase 9 — on user approval)
```

### Phase 4b: Acceptance Criteria Validation

After all tests pass and before creating the PR, validate every acceptance criterion from the Jira ticket:

1. **Read the acceptance criteria** from the Jira ticket description (the `- [ ]` checklist items)
2. **Verify each criterion** against the implementation — confirm the code, tests, or behaviour satisfies it
3. **Update the Jira ticket** — edit the description to tick off each completed criterion (`- [x]`), or add a comment listing each criterion with PASS/FAIL status
4. **If any criterion is not met**, fix the implementation before proceeding. Do not create a PR with unmet acceptance criteria.
5. **For bundle tickets with sub-stories**, also verify the acceptance criteria on each sub-story ticket

This ensures the Jira ticket is the single source of truth for what was delivered.

### Rules

1. **Every change starts with a Jira ticket.** No ticket, no code.
2. **Every feature is built with /feature-dev.** No direct implementation.
3. **Feature specs live in `docs/features/`.** If a ticket references a spec, the spec's validation criteria are the acceptance test.
4. **All tests must pass before a PR is created.** No exceptions.
5. **Regression tests run on every feature.** The full existing test suite runs, not just new tests.
6. **Docker must build.** `docker compose up --build` must succeed before the PR is created.
7. **Manual test scripts are mandatory.** Every PR gets a manual test script added to the Jira ticket.
8. **Two layers of code review.** First /feature-dev's built-in review agent, then /code-review on the PR.
9. **Wrap-up on approval.** When the user approves, Claude merges the PR, pulls main, and moves all associated tickets to Done.
10. **Acceptance criteria must be validated and ticked off in Jira.** Every criterion on the ticket must be verified and marked as complete before the PR is created.

### Branch Naming

```
feature/mat-42        # Feature work
fix/mat-42            # Bug fixes
```

Branch name is always the lowercase ticket ID prefixed with `feature/` or `fix/`.

### Commit Convention

```
feat(MAT-42): add template catalog API endpoints
fix(MAT-42): handle missing template gracefully
test(MAT-42): add regression tests for chat endpoint
chore(MAT-42): update Docker compose config
```

Every commit references the ticket ID.

### PR Structure

All PRs must include:
- Link to the Jira ticket
- Summary of changes
- Validation results (pass/fail per criterion)
- Manual testing instructions
- Checklist confirming tests, regression, Docker, conventions, and /feature-dev usage

### What Claude Does vs What the Human Does

| Step | Claude | Human |
|------|--------|-------|
| Read Jira ticket | ✅ | |
| Create branch | ✅ | |
| Implement via /feature-dev | ✅ | |
| Write tests | ✅ | |
| Run tests + regression | ✅ | |
| Validate Docker build | ✅ | |
| Validate + tick off acceptance criteria in Jira | ✅ | |
| Create PR | ✅ | |
| Write manual test script | ✅ | |
| Move ticket to In Review | ✅ | |
| Run /code-review | ✅ | |
| Fix code review findings | ✅ | |
| Manual testing | | ✅ |
| Review PR | | ✅ |
| Approve wrap-up | | ✅ |
| Merge PR (Phase 9) | ✅ | |
| Pull main (Phase 9) | ✅ | |
| Move all tickets to Done (Phase 9) | ✅ | |