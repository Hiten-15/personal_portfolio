import mongoose from 'mongoose';
import { env } from '../config/env.js';

export async function connectDB(): Promise<void> {
  await mongoose.connect(env.MONGODB_URI);
  const { host, name } = mongoose.connection;
  console.log(`MongoDB connected → ${name} @ ${host}`);
}
