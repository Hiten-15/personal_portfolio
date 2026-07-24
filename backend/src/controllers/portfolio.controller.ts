import type { Request, Response, NextFunction } from 'express';
import { getPortfolio } from '../services/portfolio.service.js';

/** CDN caches the response so later visitors skip the serverless + Atlas cold path. */
const PORTFOLIO_CACHE_CONTROL =
  'public, max-age=60, s-maxage=300, stale-while-revalidate=86400';

export async function getPortfolioHandler(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const data = await getPortfolio();
    if (!data) {
      res.status(404).json({ message: 'Portfolio content not found. Run npm run seed.' });
      return;
    }

    res.setHeader('Cache-Control', PORTFOLIO_CACHE_CONTROL);
    res.setHeader('CDN-Cache-Control', PORTFOLIO_CACHE_CONTROL);
    res.setHeader('Vercel-CDN-Cache-Control', PORTFOLIO_CACHE_CONTROL);
    res.json({ data });
  } catch (error) {
    next(error);
  }
}

export function healthHandler(_req: Request, res: Response): void {
  res.setHeader('Cache-Control', 'no-store');
  res.json({ status: 'ok' });
}
