import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.resolve(
  __dirname,
  '../Hiten Mehta - Portfolio (standalone).html',
);
const outPath = path.resolve(__dirname, '../frontend/public/profile.jpg');
const targetUuid = 'dc6f0795-bd0c-4a37-9ff6-ad129a10b568';

const html = fs.readFileSync(htmlPath, 'utf8');
const manifestMatch = html.match(
  /<script type="__bundler\/manifest">([\s\S]*?)<\/script>/,
);

if (!manifestMatch) {
  console.error('Manifest not found in HTML file');
  process.exit(1);
}

const manifest = JSON.parse(manifestMatch[1]);
const entry = manifest[targetUuid];

if (!entry?.data) {
  console.error(`Asset ${targetUuid} not found in manifest`);
  process.exit(1);
}

const bytes = Buffer.from(entry.data, 'base64');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, bytes);
console.log(`Profile image written to ${outPath} (${bytes.length} bytes)`);
