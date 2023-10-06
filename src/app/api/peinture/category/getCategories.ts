import prisma from '@/lib/prisma';
import { PaintingCategory } from '@prisma/client';
import 'server-only';

export async function getPaintingCategoriesFull() {
  const res = await prisma.paintingCategory.findMany({
    include: { paintings: true },
  });
  return JSON.parse(JSON.stringify(res));
}

export async function getPaintingCategoriesForMenu() {
  const categories =
    (await prisma.paintingCategory.findMany()) as PaintingCategory[];
  const paintingWithoutCategory = await prisma.painting.findFirst({
    where: {
      category: null,
    },
  });
  if (categories.length > 0 && paintingWithoutCategory)
    categories.push({
      key: 'no-category',
      value: 'Sans catégorie',
      id: 0,
    } as PaintingCategory);
  return JSON.parse(JSON.stringify(categories));
}
