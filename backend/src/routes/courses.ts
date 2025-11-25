import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { getPrismaClient } from '../lib/prisma';

const router = Router();

router.get('/', authMiddleware, async (_req, res) => {
  const prisma = await getPrismaClient();
  const courses = await prisma.course.findMany({
    include: {
      instructor: {
        select: {
          firstName: true,
          lastName: true,
          email: true,
        },
      },
      lessons: {
        select: { id: true },
      },
      _count: {
        select: { enrollments: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const response = courses.map((course: any) => ({
    id: course.id,
    title: course.title,
    description: course.description,
    level: course.level,
    status: course.status,
    tags: course.tags,
    language: course.language,
    instructorName:
      course.instructor && (course.instructor.firstName || course.instructor.lastName)
        ? `${course.instructor.firstName ?? ''} ${course.instructor.lastName ?? ''}`.trim()
        : course.instructor?.email ?? 'Instructor',
    enrollmentCount: course._count?.enrollments ?? 0,
    lessonCount: course.lessons.length,
  }));

  res.json({ courses: response });
});

export const courseRoutes = router;
