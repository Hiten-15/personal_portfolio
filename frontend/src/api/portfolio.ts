import type { ApiResponse, PortfolioContent } from '@portfolio/shared/types/portfolio';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function parsePortfolio(res: Response): Promise<PortfolioContent> {
  const json: ApiResponse<PortfolioContent> | PortfolioContent = await res.json();
  if (json && typeof json === 'object' && 'data' in json && json.data) {
    return json.data;
  }
  return json as PortfolioContent;
}

/**
 * Prefer the static CDN file (no serverless/DB cold start).
 * Fall back to the API if the static asset is missing.
 */
export async function fetchPortfolio(): Promise<PortfolioContent> {
  try {
    const staticRes = await fetch('/portfolio.json', { cache: 'force-cache' });
    if (staticRes.ok) {
      return parsePortfolio(staticRes);
    }
  } catch {
    // Fall through to API
  }

  const res = await fetch(`${API_BASE}/portfolio`);
  if (!res.ok) {
    throw new Error('Failed to load portfolio content');
  }
  return parsePortfolio(res);
}
