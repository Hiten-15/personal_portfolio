import mongoose from 'mongoose';
import { env } from '../config/env.js';

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = globalThis.mongooseCache ?? {
  conn: null,
  promise: null,
};
globalThis.mongooseCache = cached;

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(env.MONGODB_URI, {
      // Serverless-friendly: small pool, fail fast if Atlas is unreachable
      maxPoolSize: 1,
      minPoolSize: 0,
      serverSelectionTimeoutMS: 10_000,
      socketTimeoutMS: 20_000,
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  const { host, name } = mongoose.connection;
  console.log(`MongoDB connected → ${name} @ ${host}`);
  return cached.conn;
}
