---
description: "Implement a Jira ticket end-to-end: build with feature-dev, test, PR, review"
argument-hint: "MAT-123"
---

# Implement Feature from Jira Ticket

You are implementing a feature for the Kaitiaki project. Follow the workflow below exactly. Do not skip steps. Do not proceed to the next phase until the current phase is fully complete.

## Ticket ID: $ARGUMENTS

---

## Phase 1: Understand

1. Fetch the Jira ticket $ARGUMENTS — read the summary, description, and acceptance criteria
2. Check if a feature spec exists in `docs/features/` that matches this ticket. If yes, read it.
3. Summarise what you need to build in 3–5 bullet points and confirm your understanding with the user before proceeding

## Phase 2: Prepare

1. Ensure the working directory is clean: `!git status`
2. Pull latest main: `git checkout main && git pull`
3. Create a feature branch: `git checkout -b feature/$ARGUMENTS` (lowercase the ticket ID)
4. Add a comment to the Jira ticket: "🚀 Development started on branch `feature/$ARGUMENTS`"
5. Transition the ticket to **In Progress**

## Phase 3: Implement (via /feature-dev)

**This phase MUST use the /feature-dev plugin.** Do not implement the feature manually.

1. Invoke `/feature-dev` and provide it with:
   - The Jira ticket requirements (summary, description, acceptance criteria) from Phase 1
   - The feature spec from `docs/features/` if one exists
   - The project conventions from CLAUDE.md
2. Let `/feature-dev` handle the full implementation cycle:
   - Codebase exploration and architecture planning
   - Implementation (backend first, frontend second per CLAUDE.md)
   - Code review via the feature-dev review agent
3. Commit regularly with conventional commits: `feat($ARGUMENTS): description`
4. When `/feature-dev` completes, verify that all acceptance criteria from the Jira ticket are addressed in the implementation

## Phase 4: Verify

1. **Unit & integration tests**: Write tests for all new functionality. Run the full test suite and confirm everything passes:
   - Backend: `cd backend && pytest --tb=short`
   - Frontend: `cd frontend && npm run build && npm run lint`
2. **E2E tests (for UI tasks)**: If the ticket involves frontend/UI changes:
   - Write Playwright E2E tests in `frontend/e2e/` covering the acceptance criteria
   - Use the shared `loginAndGetPage` helper from `e2e/helpers.ts` for authentication
   - Run the full E2E suite: `cd frontend && npx playwright test --project=chromium`
   - All tests must pass (skipped tests for missing data are acceptable). Fix any failures before proceeding.
3. **Regression**: Run the complete existing test suite to confirm nothing is broken
4. **Validation criteria**: If the feature spec has validation criteria (V1, V2, etc.), verify each one and record pass/fail
5. **Docker**: Run `docker compose up --build` and confirm the application starts and the feature works end-to-end
6. If ANY test or validation criterion fails, fix it before proceeding. Do not move on with failures.

## Phase 5: Pull Request

1. Stage and commit any remaining changes
2. Push the branch: `git push -u origin feature/$ARGUMENTS`
3. Create a Pull Request using gh CLI:
   ```
   gh pr create \
     --title "feat($ARGUMENTS): {ticket summary}" \
     --body "{see PR template below}"
   ```
4. Capture the PR URL from the output

### PR Body Template

Use this structure for the PR body:

```
## Jira Ticket
[$ARGUMENTS](https://your-jira.atlassian.net/browse/$ARGUMENTS)

## Summary
{What was built and why — 2-3 sentences}

## Changes
{List the key changes made}

## Validation Results
{For each validation criterion from the feature spec, list pass/fail}

## How to Test
{Step-by-step manual testing instructions}

## Checklist
- [ ] All tests pass
- [ ] No regression failures
- [ ] Docker build succeeds
- [ ] Feature spec validation criteria all pass
- [ ] Code follows CLAUDE.md conventions
- [ ] Built using /feature-dev plugin
```

## Phase 6: Update Jira

1. Transition the ticket to **In Review**
2. Add a comment to the Jira ticket with:
   - The PR URL
   - A summary of what was implemented
   - The validation results (pass/fail for each criterion)
3. Add a **Manual Test Script** as a comment on the ticket using this format:

```
📋 Manual Test Script for $ARGUMENTS

Prerequisites:
- Application running via docker compose up --build
- Access to http://localhost:3000 (frontend) and http://localhost:8000 (backend)

Test Steps:

Step 1: {description}
Expected: {what should happen}
Result: [ ] Pass  [ ] Fail

Step 2: {description}
Expected: {what should happen}
Result: [ ] Pass  [ ] Fail

{...continue for each testable behaviour from the acceptance criteria}

Edge Cases:

Step N: {edge case description}
Expected: {what should happen}
Result: [ ] Pass  [ ] Fail
```

The manual test steps must cover every acceptance criterion from the Jira ticket AND every validation criterion from the feature spec.

## Phase 7: Code Review

1. Run `/code-review` to execute the automated code review
2. Review the findings
3. Fix any issues with confidence score >= 80
4. If fixes were made, commit, push, and re-run `/code-review` until clean
5. Add a comment to the Jira ticket: "✅ Automated code review complete. {N} issues found and resolved."

## Phase 8: Handoff

Summarise to the user:
- What was built (features implemented)
- How it was built (confirm /feature-dev was used)
- Which tests pass (unit, regression, validation criteria)
- The PR URL
- The manual test script has been added to the Jira ticket
- What the user needs to do next: **manually test using the test script on the Jira ticket, review the PR, merge, and move the ticket to Done**

---

**IMPORTANT**: If at any point something fails or is unclear, STOP and ask the user. Do not guess. Do not skip steps. Phase 3 MUST use /feature-dev — do not implement features directly.