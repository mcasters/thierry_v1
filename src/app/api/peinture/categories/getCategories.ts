import prisma from '@/lib/prisma';
import { PaintingCategory, Prisma } from '@prisma/client';
import 'server-only';

export type PaintingCategoryFull = Prisma.PromiseReturnType<
  typeof getPaintingCategoriesFull
>;

export async function getPaintingCategoriesFull() {
  return await prisma.paintingCategory.findMany({
    include: { paintings: true },
  });
}

export async function getPaintingCategories() {
  return (await prisma.paintingCategory.findMany()) as PaintingCategory[];
}
