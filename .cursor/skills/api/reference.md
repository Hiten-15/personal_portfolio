# API skill reference (read only if needed)

Read this only when a decision point in `SKILL.md` requires it.

## Error contract (recommended)

Keep errors consistent and non-leaky:
- 4xx: `{ message, details? }` where `details` is safe for clients
- 5xx: `{ message: "Server error" }` (optionally include a request id)

Avoid returning stack traces or secrets.

## Status codes quick map

- 200/201: success
- 204: success with no body (rare; only if clients handle it)
- 400: malformed input
- 401: unauthenticated (missing/invalid token)
- 403: authenticated but not authorized
- 404: not found (don’t leak existence across tenants)
- 409: conflict (duplicate key / already exists / state conflict)
- 422: semantically invalid input (optional; use consistently if adopted)
- 429: rate limited (if implemented)
- 500: unexpected server error

## Pagination (offset) contract

Prefer:
- Request: `?page=&limit=&sort=field:asc,other:desc`
- Response: `{ data, meta: { page, limit, total, totalPages } }`

Hard rules:
- cap `limit` (your repo already uses `MAX_LIMIT` in `backend/utils/offsetPagination.js`)
- include a tie-breaker in sort to keep pages stable
- list and count use identical filters

## Search guardrails

Regex search can be expensive:
- escape user input
- bound search scope (require other filters when possible)
- prefer indexed fields and exact matches where feasible

If search must be regex:
- ensure it’s case-insensitive only when UX needs it
- consider “startsWith” style patterns (more index-friendly in some cases)

## Caching guidance

Client-side:
- Prefer React Query caching for read endpoints with stable keys.

Server-side:
- Only cache GET responses when you have invalidation rules.
- For user-specific responses, cache privately (per user/role/tenant).

## Idempotency (safe retries)

Use idempotency keys for endpoints that might be retried (network flakiness) and would otherwise double-write:
- Client sends `Idempotency-Key`
- Server stores key + result for a time window
- Repeat request with same key returns the same result

If you don’t implement full idempotency:
- ensure duplicate submissions are prevented by a DB uniqueness constraint
- make writes resilient to “already exists” situations (409)

## Streaming / large downloads

For large files:
- avoid embedding file bytes in JSON
- stream responses and add cache headers intentionally
- keep auth checks before streaming starts
