import prisma from '@/lib/prisma';
import { SculptureFull } from '@/app/api/sculpture/sculpture';
import 'server-only';

export async function getSculpturesFull() {
  const res = await prisma.sculpture.findMany({
    include: { images: true, category: true },
  });
  return JSON.parse(JSON.stringify(res));
}

export async function getSculpturesFullByCategory(categoryKey: string) {
  const res =
    categoryKey === 'no-category'
      ? await prisma.sculpture.findMany({
          where: {
            category: null,
          },
          include: { images: true, category: true },
        })
      : await prisma.sculpture.findMany({
          where: {
            category: {
              key: categoryKey,
            },
          },
          include: { images: true, category: true },
        });
  return JSON.parse(JSON.stringify(res)) as SculptureFull[];
}
