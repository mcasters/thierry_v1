import prisma from '@/lib/prisma';
import { Prisma, SculptureCategory } from '@prisma/client';
import { notFound } from 'next/navigation';
import 'server-only';

export type SculptureCategoryFull = Prisma.PromiseReturnType<
  typeof getSculptureCategoriesFull
>;

export async function getSculptureCategoriesFull() {
  const res = await prisma.paintingCategory.findMany({
    include: { paintings: true },
  });

  const categories = (await JSON.parse(
    JSON.stringify(res),
  )) as SculptureCategoryFull[];

  if (categories.length === 0) {
    notFound();
  }

  return categories;
}

export async function getSculptureCategories() {
  const res = await prisma.paintingCategory.findMany();

  const categories = (await JSON.parse(
    JSON.stringify(res),
  )) as SculptureCategory[];

  if (categories.length === 0) {
    notFound();
  }

  return categories;
}
