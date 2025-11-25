import { env } from '../config/env';

type PrismaClientType = import('@prisma/client').PrismaClient;

let prismaInstance: PrismaClientType | null = null;

async function ensurePrisma(): Promise<PrismaClientType> {
  if (!prismaInstance) {
    const { PrismaClient } = await import('@prisma/client');
    prismaInstance = new PrismaClient();
  }
  return prismaInstance;
}

export async function getPrismaClient(): Promise<PrismaClientType> {
  if (!env.databaseUrl) {
    throw new Error('DATABASE_URL is not configured. Please set it in backend/.env (e.g. your Neon connection string).');
  }
  return ensurePrisma();
}

export async function connectDatabase() {
  try {
    const prisma = await getPrismaClient();
    await prisma.$connect();
    console.log('[db] Connected to PostgreSQL');
  } catch (error) {
    console.error('[db] Failed to connect to PostgreSQL', error);
    throw error;
  }
}
