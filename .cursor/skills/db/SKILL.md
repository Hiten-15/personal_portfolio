---
name: db
description: DB schema review + API query optimization checklist for backend work. Use when changing data models, Mongo/Mongoose queries, indexing, pagination, list/count endpoints, or when investigating performance, N+1 query patterns, populate/aggregate usage, slow queries, overfetching, p95/p99 latency, or API payload size in this repo.
---

# DB

## Quick start (token-optimized)

- Use this file as the **router**. Do **not** read `reference.md` / `examples.md` unless you hit a decision point below.
- Default loop: **reproduce → measure → fix (query count / payload) → re-measure**.

## Triage: what kind of DB work is this?

- **Schema/model change** (new fields, new collection/model, relationship change, soft delete, unique/index changes) → use **DB A+ grade checklist** below first.
- **Slow endpoint** (latency / timeouts) → go to **Measure** then **Fix order**.
- **List endpoint wrong or inconsistent** (count mismatch, missing rows) → go to **List/Count contract**.
- **Suspected N+1** (looping queries, per-row populate, “enrich each row”) → go to **N+1 detection** then **Fix order**.

## Measure (minimum evidence before/after)

- **Pick 1 endpoint** and 1 representative request.
- **Capture**:
  - total response time (local or logs)
  - **query count** per request (rough is fine)
  - the **slowest query shape** (collection + filter + sort + limit)
- Optional (only if needed): temporarily enable Mongoose debug logging while investigating.

## N+1 detection (fast heuristics)

Smells to search for in route handlers (see `backend/routes/*.js`):
- `for (...) { await Model.find... }`
- `map(async () => Model.find...)` without batching
- `.populate(...)` executed inside loops
- “load list → for each row fetch details → merge”

If you see these, prefer **batching** or **aggregation** over per-row queries.

## Fix order (defaults)

Apply in this order unless the endpoint is special-cased.

1) **Stop overfetch**
   - Use `select()` / projection for list endpoints (return only UI-needed fields).
   - Prefer `lean()` when you do not mutate documents.

2) **Remove N+1**
   - Batch by IDs: `find({ foreignKey: { $in: ids } })` then map/join in memory.
   - If you need “join-like” behavior, prefer `aggregate()` with `$lookup` + `$project`.

3) **Pagination guardrails**
   - Ensure pagination happens in DB (skip/limit or cursor), not in memory.
   - Enforce max `limit` on list endpoints.

4) **Index for the real query shape**
   - Add/adjust indexes for the actual `{filter}+{sort}` paths.
   - If most queries filter on soft-delete, include it in the index key order.
   - Validate compound index ordering: **filters first, then sort keys**.

5) **Only then consider denormalization/caching**
   - Denormalize only with a sync strategy + a test proving consistency.
   - Cache only when the data is stable enough (and you have invalidation rules).

Decision points:
- Complex post-join search/sort/pagination? → read `reference.md` section “Aggregation + $facet pagination”.
- Need concrete before/after patterns? → read `examples.md`.

## List/Count contract (must-haves)

- List and count must share **identical filters** (including soft-delete).
- Pagination must be stable: deterministic sort + tie-breaker (e.g. `_id`).
- Never: “load all → enrich → in-memory paginate”.

## DB A+ grade checklist (generic, reusable)

DB A+ grade checklist (generic, reusable)
1) Schema (data model correctness)
ERD/FRD alignment: model matches requirements and ERD docs are updated in same PR.
Ownership fields: every owned entity has userId (or orgId/tenant key) and ownership is enforceable.
Soft delete policy: implement soft-delete where required; consistently model isDeleted / deletedAt.
Delete behavior: onDelete semantics correct (Restrict vs Cascade) per domain relationships.
Uniqueness constraints: add tenant-scoped uniqueness (e.g., @@unique([ownerId, …])) to prevent dupes.
2) Indexes (query-path coverage)
Index every list/filter/sort path used by APIs and admin screens.
Compound index ordering matches real query shapes (filters first, then sort keys).
Include soft-delete filter in indexes if nearly all queries filter it.
3) Relationships / FKs
Real relations when possible (ORM relation/foreign key).
If not possible (e.g., Mongo logical refs), document logical FK + integrity expectations.
4) Authorization & ownership enforcement
Never trust client userId / owner id; derive from session/auth context.
Centralize owned-row fetch: service layer enforces getOwnedRow / admin hierarchy rules.
Repository may fetch by id only if service guarantees ownership checks.
5) Secret/sensitive field hygiene
Explicit select in repositories; avoid select *.
Never include secrets/sensitive fields in list/admin selects unless absolutely required (and tightly scoped).
6) Embed vs reference vs denormalize decisions
Embed only for bounded 1:1 / small bounded subdocuments.
Reference for unbounded relationships (growing lists).
Denormalize only with a sync strategy (function/job) plus a test proving it stays consistent.
Derived data: compute on read unless materialization is justified and profiled.
7) Correctness of list/count + multi-write integrity
List and count must share identical where (including soft-delete).
Multi-write operations are atomic: use transactions ($transaction / session txn) for multi-document updates.
8) Performance guardrails
DB-level pagination (skip/take / cursor) — never “load all then paginate in memory”.
No N+1 patterns: use joins/include/select appropriately, or batch via groupBy/aggregates.
Search is bounded: case-insensitive where intended; avoid unbounded regex scans; ensure indexes support it.
“Block merge” smells (hard fails unless explicitly approved as debt)
Load-all → enrich → in-memory paginate
Count filter differs from list filter
Case-sensitive search when UX expects insensitive
N+1 enrichment in lists
Selecting secrets/sensitive fields in list/admin paths
Recommended implementation flow (repeatable)
Requirements/ERD → embed/ref/denorm decision → schema + indexes → repository → service (ownership) → list-query contract validation → repo tests verifying query shape → PR gate
Minimum PR gate for DB work
8 dimensions satisfied or explicitly tracked as debt
ERD/docs updated if schema changed
Repository tests assert where/orderBy/skip/take/select shape + ownership/soft-delete edges
All checks pass (lint/typecheck/tests)

## Repo-specific pointers (where to look)

- Routes: `backend/routes/*.js`
  - Complex list aggregation + `$facet` patterns exist (e.g. `backend/routes/attendance.js`, `backend/routes/leave.js`, `backend/routes/payroll.js`).
- Pagination helpers: `backend/utils/offsetPagination.js`
- Watch-outs already present in code:
  - In-memory search/sort/pagination in some flows (avoid scaling issues).
  - “list rows via aggregate → then refetch docs by `_id`” (can be OK, but guard payload + ordering; see `reference.md`).
