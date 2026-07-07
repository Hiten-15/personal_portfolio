import { z } from 'zod';

const envSchema = z.object({
  MONGODB_URI: z.string().default('mongodb://127.0.0.1:27017/portfolio'),
  PORT: z.coerce.number().default(5000),
  FRONTEND_URL: z.string().default('http://localhost:5173'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

export const env = envSchema.parse(process.env);
