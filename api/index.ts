import '../backend/src/config/loadEnv.js';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../backend/src/app.js';
import { connectDB } from '../backend/src/db/connect.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await connectDB();
  return app(req, res);
}
