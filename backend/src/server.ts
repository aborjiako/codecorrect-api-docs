import { env } from './config/env';
import { connectDatabase } from './lib/prisma';
import { createApp } from './app';

async function bootstrap() {
  await connectDatabase();
  const app = createApp();

  app.listen(env.port, () => {
    console.log(`Backend server listening on http://localhost:${env.port}`);
  });
}

bootstrap().catch((error) => {
  console.error('Failed to bootstrap server', error);
  process.exit(1);
});
