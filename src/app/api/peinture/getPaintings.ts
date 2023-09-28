import prisma from '@/lib/prisma';
import { PaintingFull } from '@/app/api/peinture/painting';
import 'server-only';

export async function getPaintingsFull() {
  return await prisma.Painting.findMany({
    include: { image: true, category: true },
  });
  // return JSON.parse(JSON.stringify(res));
}

export async function getPaintingsFullByCategory(categoryKey: string) {
  const res =
    categoryKey === 'no-category'
      ? await prisma.Painting.findMany({
          where: {
            category: null,
          },
          include: { image: true, category: true },
        })
      : await prisma.Painting.findMany({
          where: {
            category: {
              key: categoryKey,
            },
          },
          include: { image: true, category: true },
        });

  return JSON.parse(JSON.stringify(res)) as PaintingFull[];
}
