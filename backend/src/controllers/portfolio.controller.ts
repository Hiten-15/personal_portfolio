import type { Request, Response, NextFunction } from 'express';
import { getPortfolio } from '../services/portfolio.service.js';

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
    res.json({ data });
  } catch (error) {
    next(error);
  }
}

export function healthHandler(_req: Request, res: Response): void {
  res.json({ status: 'ok' });
}
