import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createApp } from '../src/app';
import { connectDatabase } from '../src/lib/prisma';

let appPromise: Promise<ReturnType<typeof createApp>> | null = null;

async function getApp() {
  if (!appPromise) {
    appPromise = (async () => {
      await connectDatabase();
      return createApp();
    })();
  }
  return appPromise;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const app = await getApp();
  return app(req as any, res as any);
}
