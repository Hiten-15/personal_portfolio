import type { PortfolioContent } from '@portfolio/shared/types/portfolio';
import { Portfolio } from '../models/Portfolio.js';

export async function getPortfolio(): Promise<PortfolioContent | null> {
  const doc = await Portfolio.findOne().lean<PortfolioContent>().exec();
  return doc;
}
