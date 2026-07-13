import app from './app.js';
import { env } from './config/env.js';
import { connectDB } from './db/connect.js';

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
