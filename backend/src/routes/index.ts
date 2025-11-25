import { Router } from 'express';
import { authRoutes } from './auth';
import { courseRoutes } from './courses';

const router = Router();

router.get('/version', (_req, res) => {
  res.json({ service: 'EduFlow API', version: '0.1.0' });
});

router.use('/auth', authRoutes);
router.use('/courses', courseRoutes);

export { router };
