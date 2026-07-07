# API skill examples (read only when you need patterns)

## Example: List endpoint with pagination + stable sort

```js
const { page, limit, skip } = parseOffsetPagination(req.query);
const sortSpec = parseSortParam(req.query.sort, ['createdAt'], { field: 'createdAt', direction: -1 });
const sortWithTie = { ...sortSpec, _id: 1 };
const filter = { isDeleted: { $ne: true } };

const [rows, total] = await Promise.all([
  Model.find(filter).sort(sortWithTie).skip(skip).limit(limit).lean(),
  Model.countDocuments(filter),
]);

return res.json({
  data: rows,
  meta: buildPaginationMeta(page, limit, total),
});
```

## Example: Validate and normalize query params

```js
const status = String(req.query.status || '').trim().toLowerCase();
if (status && !['all', 'pending', 'approved', 'rejected'].includes(status)) {
  return res.status(400).json({ message: 'Invalid status' });
}
```

## Example: Avoid overfetch in list responses

```js
const rows = await User.find(filter)
  .select('_id firstName lastName employeeNumber isActive')
  .lean();
```

## Example: Consistent error response

```js
try {
  // ...
} catch (err) {
  console.error('Endpoint failed:', err);
  return res.status(500).json({ message: 'Server error' });
}
```
