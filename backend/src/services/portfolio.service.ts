import type { PortfolioContent } from '@portfolio/shared/types/portfolio';
import { Portfolio } from '../models/Portfolio.js';

const MEMORY_TTL_MS = 5 * 60 * 1000;

type CacheEntry = {
  data: PortfolioContent;
  expiresAt: number;
};

let memoryCache: CacheEntry | null = null;

export async function getPortfolio(): Promise<PortfolioContent | null> {
  const now = Date.now();
  if (memoryCache && memoryCache.expiresAt > now) {
    return memoryCache.data;
  }

  const doc = await Portfolio.findOne().lean<PortfolioContent>().exec();
  if (doc) {
    memoryCache = { data: doc, expiresAt: now + MEMORY_TTL_MS };
  }
  return doc;
}

export function clearPortfolioCache(): void {
  memoryCache = null;
}
