---
name: api
description: API design + performance + reliability checklist for backend endpoints. Use when changing Express routes/controllers, request/response contracts, pagination/search/sort, authz/authn, error handling, caching, idempotency, payload shaping, or when debugging slow endpoints (p95/p99), overfetching, N+1 enrichment, or inconsistent list/count responses.
---

# API

## Quick start (token-optimized)

- This file is the **router**. Don’t read `reference.md` / `examples.md` unless you hit a decision point.
- Default loop: **contract → measure → optimize → re-measure**.

## Triage

- **New endpoint / contract change** → use **API A+ checklist**.
- **Slow endpoint** → go to **Measure** then **Fix order**.
- **List endpoint** → go to **List contract** then **Fix order**.
- **Auth bug / data leak** → go to **Auth & data exposure** (block merge until fixed).

## Measure (minimum evidence)

- Pick 1 endpoint + 1 representative request.
- Capture:
  - response time (and where time goes if known)
  - payload size (rough)
  - DB query count if relevant
  - any “hot path” loops / fanout

## Fix order (defaults)

1) **Return less**
   - Trim response shape (no extra fields).
   - Avoid returning huge nested objects; prefer summaries + follow-up endpoints.

2) **Do less work**
   - Remove N+1 enrichment (batch or aggregate on DB side; see `../db/` skill when DB is involved).
   - Parallelize independent I/O with `Promise.all` (but keep concurrency bounded).

3) **Paginate correctly**
   - DB-level pagination; enforce max `limit`.
   - Stable sort + tie-breaker.

4) **Cache only when safe**
   - Client caching (React Query) for stable reads.
   - Server caching only with invalidation rules.

Decision points:
- Need an error contract template / idempotency patterns / caching guidance? → read `reference.md`.
- Need before/after snippets? → read `examples.md`.

## API A+ checklist (generic, reusable)

### Contract & correctness

- **Input validation**: reject invalid params/body early; normalize types (`page`, `limit`, dates).
- **Consistent shapes**:
  - List endpoints: `{ data, meta }` (or a clearly documented legacy array).
  - Include deterministic pagination metadata when paginated.
- **List/count consistency**: list and count share identical filters (including soft-delete/active filters).
- **Deterministic ordering**: always add a tie-breaker (e.g. `_id`) for stable paging.

### Auth & data exposure (block-merge)

- **Never trust client ownership fields** (derive from token/session).
- **AuthZ enforced for reads and writes** (admin vs employee; row ownership).
- **Sensitive fields excluded by default** (`password`, tokens, secrets, large blobs).
- **Least privilege selection**: explicit `select()` / projection for list/admin paths.

### Performance guardrails

- **No load-all then paginate in memory**.
- **No N+1 enrichment** in lists.
- **Search is bounded**: avoid unbounded regex scans; prefer indexed filters; cap expensive searches.
- **Payload is bounded**: cap list `limit`; avoid huge embedded fields; stream/download for files.

### Reliability & ops

- **Status codes**: 400/401/403/404/409/422/429/500 used intentionally.
- **Error response shape**: consistent `{ message, ... }` (do not leak secrets/stack in prod).
- **Idempotency** for safe retries on non-GET where appropriate (see `reference.md`).
- **Timeouts** on external I/O; avoid hanging requests.

## Repo-specific pointers

- Backend routes are in `backend/routes/*.js` and already use pagination helpers in `backend/utils/offsetPagination.js`.
- Auth middleware examples: `backend/middleware/auth.js`, `backend/middleware/adminAuth.js`.
- Several routes use `$facet` pagination + derived-field search; keep filters/sorts/indexes aligned.
