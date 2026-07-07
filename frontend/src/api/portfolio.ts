import type { ApiResponse, PortfolioContent } from '@portfolio/shared/types/portfolio';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export async function fetchPortfolio(): Promise<PortfolioContent> {
  const res = await fetch(`${API_BASE}/portfolio`);
  if (!res.ok) {
    throw new Error('Failed to load portfolio content');
  }
  const json: ApiResponse<PortfolioContent> = await res.json();
  return json.data;
}
