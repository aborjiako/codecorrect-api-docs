import express from 'express';
import cors from 'cors';
import { router } from './routes';

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/api', router);

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  return app;
}
