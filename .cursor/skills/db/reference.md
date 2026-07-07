# DB skill reference (read only if needed)

Read this file only when you hit a decision point in `SKILL.md`.

## Aggregation + $facet pagination (Mongo)

Use `aggregate([...])` + `$facet` when you need to:
- join-like data (`$lookup`)
- compute derived fields (`$addFields`)
- apply search filters on derived/joined fields
- return both `data` + `total` in one round-trip

Default structure:
- `$match` as early as possible (reduces scan)
- `$lookup` / `$unwind` only when needed
- `$addFields` / `$project` early to shrink payload
- `$match` for search (after fields exist)
- `$sort` with deterministic tie-breaker
- `$facet` with `data: [$skip,$limit,$project]` and `meta: [$count]`

Pitfalls:
- Sorting before `$match` on derived fields forces extra work.
- Missing tie-breaker makes pagination unstable.
- Regex search without supporting indexes becomes unbounded (avoid unless bounded + necessary).

## “Aggregate to get IDs → refetch docs” pattern

You have endpoints that:
1) run an `aggregate()` to apply complex filters/search/sort
2) capture ordered `_id`s
3) refetch full documents by `_id` (often with `.populate(...)`)
4) re-order in memory to match aggregate order

This can be acceptable when:
- you must use Mongoose document methods/virtuals/populate on the final docs
- you keep final projection tight (don’t pull whole docs unnecessarily)
- you preserve ordering deterministically (map from id → index)

But it becomes expensive when:
- refetch returns large payloads (“select *”)
- the aggregate already had everything you needed (double work)

Optimization options:
- push more fields into the aggregate `$project` so you can avoid the refetch
- or refetch with explicit `.select()` and lean where possible

## Populate guidance (Mongoose)

Prefer:
- One base query with `.populate({ path, select })`
- Keep `select` tight; avoid deep nested populate unless necessary

Avoid:
- populate inside loops
- populating fields that are never used in the response

## Batch join with $in (classic N+1 fix)

When you have rows `A[]` and each needs related `B` by key:
- Collect keys once: `const keys = rows.map(r => r.bId)`
- Fetch `B` once: `const bs = await B.find({ _id: { $in: keys } }).select(...)`
- Build map: `const byId = new Map(bs.map(b => [String(b._id), b]))`
- Join in memory: `rows.map(r => ({...r, b: byId.get(String(r.bId)) }))`

## Pagination guardrails (offset)

Offset pagination (`skip/limit`) is fine for admin screens when:
- you cap `limit`
- sort is indexed
- dataset isn’t massive

If you see “deep pages” performance problems:
- consider cursor pagination (by createdAt/_id)
- or add a more selective filter requirement

## Index checklist (Mongo/Mongoose)

For each list endpoint, write down:
- filter fields (e.g. `status`, `date range`, `userId`)
- sort fields
- soft-delete filters (e.g. `isDeleted != true`)

Then ensure an index exists with key order:
`{ filter1: 1, filter2: 1, sortKey: -1, _id: 1 }` (direction as needed)

## Transactions (Mongo)

Use sessions/transactions when updating multiple collections/documents and the operation must be atomic.
If you can’t use a transaction, document compensating behavior and add tests.
