import './config/loadEnv.js';
import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { connectDB } from './db/connect.js';
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

async function start(): Promise<void> {
  await connectDB();

  const server = app.listen(env.PORT, () => {
    console.log(`Server running on http://localhost:${env.PORT}`);
  });

  server.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${env.PORT} is already in use. Stop the other process or change PORT in .env`);
    } else {
      console.error('Server failed to start:', err.message);
    }
    process.exit(1);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
