import './config/loadEnv.js';
import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import portfolioRoutes from './routes/portfolio.routes.js';

const app = express();

app.use(
  cors({
    origin: env.FRONTEND_URL,
  }),
);

app.use(express.json());

app.use('/api', portfolioRoutes);

app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error(err);
    res.status(500).json({
      message: env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
    });
  },
);

export default app;
