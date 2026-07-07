# DB skill examples (read only when you need patterns)

## Example: N+1 → batch with $in

**Before (N+1):**

```js
const rows = await A.find(filter).lean();
const out = [];
for (const row of rows) {
  const b = await B.findById(row.bId).select('name').lean();
  out.push({ ...row, bName: b?.name ?? null });
}
return res.json(out);
```

**After (batched):**

```js
const rows = await A.find(filter).select('bId x y').lean();
const bIds = [...new Set(rows.map(r => String(r.bId)).filter(Boolean))];
const bs = await B.find({ _id: { $in: bIds } }).select('name').lean();
const bById = new Map(bs.map(b => [String(b._id), b]));
return res.json(rows.map(r => ({
  ...r,
  bName: bById.get(String(r.bId))?.name ?? null,
})));
```

## Example: List + count share identical filter

**Before (bug-prone):**

```js
const rows = await Model.find({ status }).skip(skip).limit(limit);
const total = await Model.countDocuments({});
```

**After:**

```js
const filter = { status };
const [rows, total] = await Promise.all([
  Model.find(filter).skip(skip).limit(limit),
  Model.countDocuments(filter),
]);
```

## Example: Populate once (not per row)

**Before:**

```js
const rows = await Leave.find({ status: 'pending' });
for (const row of rows) {
  await row.populate('userId', 'firstName lastName employeeNumber');
}
```

**After:**

```js
const rows = await Leave.find({ status: 'pending' })
  .populate('userId', 'firstName lastName employeeNumber')
  .lean();
```

## Example: Aggregate + $facet for stable pagination

```js
const pipeline = [
  { $match: baseMatch },
  { $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'user' } },
  { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
  { $addFields: { employeeName: { $concat: ['$user.firstName', ' ', '$user.lastName'] } } },
  ...(search ? [{ $match: { employeeName: { $regex: rx, $options: 'i' } } }] : []),
  { $sort: { createdAt: -1, _id: 1 } },
  {
    $facet: {
      data: [{ $skip: skip }, { $limit: limit }, { $project: { user: 0 } }],
      meta: [{ $count: 'total' }],
    },
  },
];
const [agg] = await Model.aggregate(pipeline);
return res.json({
  data: agg?.data ?? [],
  meta: { total: agg?.meta?.[0]?.total ?? 0 },
});
```

## Example: “Load all then paginate in memory” (block-merge smell)

**Before:**

```js
const rows = await Model.find(filter).sort(sortSpec);
const paged = rows.slice(skip, skip + limit);
```

**After:**

```js
const rows = await Model.find(filter).sort(sortSpec).skip(skip).limit(limit);
```
