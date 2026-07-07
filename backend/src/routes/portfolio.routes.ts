import { Router } from 'express';
import { getPortfolioHandler, healthHandler } from '../controllers/portfolio.controller.js';

const router = Router();

router.get('/health', healthHandler);
router.get('/portfolio', getPortfolioHandler);

export default router;
