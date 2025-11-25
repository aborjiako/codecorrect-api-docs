import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { signToken } from '../lib/jwt';
import { authMiddleware } from '../middleware/auth';
import { getPrismaClient } from '../lib/prisma';

const router = Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  role: z.enum(['student', 'instructor']).default('student'),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const normalizeRole = (role: string | null | undefined) => {
  if (role?.toLowerCase() === 'instructor' || role === 'INSTRUCTOR') {
    return 'INSTRUCTOR';
  }
  return 'STUDENT';
};

const toClientUser = (user: any) => {
  const { passwordHash, ...rest } = user;
  return {
    ...rest,
    role: typeof rest.role === 'string' ? rest.role.toLowerCase() : rest.role,
  };
};

router.post('/register', async (req, res) => {
  const parseResult = registerSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ message: 'Invalid data', errors: parseResult.error.flatten() });
  }

  const prisma = await getPrismaClient();
  const payload = parseResult.data;
  const email = payload.email.toLowerCase();
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  const passwordHash = await bcrypt.hash(payload.password, 10);
  const newUser = await prisma.user.create({
    data: {
      email,
      passwordHash,
      firstName: payload.firstName ?? null,
      lastName: payload.lastName ?? null,
      role: normalizeRole(payload.role),
    },
  });

  const token = signToken({ userId: newUser.id, role: newUser.role });
  return res.status(201).json({ user: toClientUser(newUser), token });
});

router.post('/login', async (req, res) => {
  const parseResult = loginSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ message: 'Invalid data', errors: parseResult.error.flatten() });
  }

  const prisma = await getPrismaClient();
  const payload = parseResult.data;
  const email = payload.email.toLowerCase();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const valid = await bcrypt.compare(payload.password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = signToken({ userId: user.id, role: user.role });
  return res.json({ user: toClientUser(user), token });
});

router.get('/me', authMiddleware, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const prisma = await getPrismaClient();
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  return res.json({ user: toClientUser(user) });
});

export const authRoutes = router;
