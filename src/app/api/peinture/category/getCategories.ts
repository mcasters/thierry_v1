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
  const res = (await prisma.PaintingCategory.findMany()) as PaintingCategory[];
  if (res.length > 0)
    res.push({
      key: 'no-category',
      value: 'Sans catégorie',
      id: undefined,
    } as PaintingCategory);
  return JSON.parse(JSON.stringify(res));
}
