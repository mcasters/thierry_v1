import prisma from '@/lib/prisma';
import { PaintingCategory, Prisma } from '@prisma/client';
import { notFound } from 'next/navigation';
import 'server-only';

export type PaintingCategoryFull = Prisma.PromiseReturnType<
  typeof getPaintingCategoriesFull
>;

export async function getPaintingCategoriesFull() {
  const res = await prisma.paintingCategory.findMany({
    include: { paintings: true },
  });

  const categories = (await JSON.parse(
    JSON.stringify(res),
  )) as PaintingCategoryFull[];

  if (categories.length === 0) {
    notFound();
  }

  return categories;
}

export async function getPaintingCategories() {
  const res = await prisma.paintingCategory.findMany();

  const categories = (await JSON.parse(
    JSON.stringify(res),
  )) as PaintingCategory[];

  if (categories.length === 0) {
    notFound();
  }

  return categories;
}
