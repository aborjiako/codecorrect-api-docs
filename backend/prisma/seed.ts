import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('ChangeMe123!', 10);

  const [maya, mason, jordan, student] = await Promise.all([
    prisma.user.upsert({
      where: { email: 'maya@eduflow.dev' },
      update: { firstName: 'Maya', lastName: 'Hollis', role: 'INSTRUCTOR' },
      create: {
        email: 'maya@eduflow.dev',
        passwordHash,
        firstName: 'Maya',
        lastName: 'Hollis',
        role: 'INSTRUCTOR',
      },
    }),
    prisma.user.upsert({
      where: { email: 'mason@eduflow.dev' },
      update: { firstName: 'Mason', lastName: 'Lee', role: 'INSTRUCTOR' },
      create: {
        email: 'mason@eduflow.dev',
        passwordHash,
        firstName: 'Mason',
        lastName: 'Lee',
        role: 'INSTRUCTOR',
      },
    }),
    prisma.user.upsert({
      where: { email: 'jordan@eduflow.dev' },
      update: { firstName: 'Jordan', lastName: 'Steele', role: 'INSTRUCTOR' },
      create: {
        email: 'jordan@eduflow.dev',
        passwordHash,
        firstName: 'Jordan',
        lastName: 'Steele',
        role: 'INSTRUCTOR',
      },
    }),
    prisma.user.upsert({
      where: { email: 'student@eduflow.dev' },
      update: { firstName: 'Avery', lastName: 'Learner', role: 'STUDENT' },
      create: {
        email: 'student@eduflow.dev',
        passwordHash,
        firstName: 'Avery',
        lastName: 'Learner',
        role: 'STUDENT',
      },
    }),
  ]);

  const [pythonCourse, htmlCourse, jsCourse] = await Promise.all([
    prisma.course.upsert({
      where: { slug: 'python-foundations' },
      update: {},
      create: {
        title: 'Python Foundations',
        slug: 'python-foundations',
        description: 'Build automation scripts and data pipelines.',
        level: 'Beginner',
        tags: ['python', 'automation'],
        language: 'en',
        status: 'PUBLISHED',
        instructorId: maya.id,
        lessons: {
          create: [
            { title: 'Intro to Python', order: 1, content: 'Welcome to Python.' },
            { title: 'Working with Data', order: 2, content: 'Lists, dicts, and loops.' },
          ],
        },
      },
    }),
    prisma.course.upsert({
      where: { slug: 'creative-html-css' },
      update: {},
      create: {
        title: 'Creative HTML & CSS',
        slug: 'creative-html-css',
        description: 'Design modern, responsive interfaces.',
        level: 'Beginner',
        tags: ['html', 'css', 'design'],
        language: 'en',
        status: 'PUBLISHED',
        instructorId: mason.id,
        lessons: {
          create: [
            { title: 'Semantic Structure', order: 1, content: 'HTML fundamentals.' },
            { title: 'Modern Layouts', order: 2, content: 'Flexbox and Grid.' },
          ],
        },
      },
    }),
    prisma.course.upsert({
      where: { slug: 'javascript-problem-solving' },
      update: {},
      create: {
        title: 'JavaScript Problem Solving',
        slug: 'javascript-problem-solving',
        description: 'Bring ideas to life with interactivity.',
        level: 'Intermediate',
        tags: ['javascript', 'async'],
        language: 'en',
        status: 'PUBLISHED',
        instructorId: jordan.id,
        lessons: {
          create: [
            { title: 'Async Foundations', order: 1, content: 'Promises and async/await.' },
            { title: 'Building Interactions', order: 2, content: 'DOM and events.' },
          ],
        },
      },
    }),
  ]);

  await prisma.enrollment.upsert({
    where: {
      userId_courseId: {
        userId: student.id,
        courseId: pythonCourse.id,
      },
    },
    update: {},
    create: {
      userId: student.id,
      courseId: pythonCourse.id,
      status: 'ACTIVE',
      progress: 45,
    },
  });

  console.log('✅ Database seeded. Default accounts use password "ChangeMe123!".');
}

main()
  .catch((err) => {
    console.error('❌ Seeding error', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

