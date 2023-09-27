import prisma from '@/lib/prisma';
import { PaintingCategory } from '@prisma/client';
import 'server-only';

export async function getPaintingCategoriesFull() {
  const res = await prisma.PaintingCategory.findMany({
    include: { paintings: true },
  });
  return JSON.parse(JSON.stringify(res));
}

export async function getPaintingCategoriesForMenu() {
  const categories =
    (await prisma.PaintingCategory.findMany()) as PaintingCategory[];
  const paintingWithoutCategory = await prisma.Painting.findFirst({
    where: {
      category: null,
    },
  });
  if (categories.length > 0 && paintingWithoutCategory)
    categories.push({
      key: 'no-category',
      value: 'Sans catégorie',
      id: undefined,
    } as PaintingCategory);
  return JSON.parse(JSON.stringify(categories));
}
