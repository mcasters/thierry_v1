import prisma from '@/lib/prisma';
import { Prisma, SculptureCategory } from '@prisma/client';
import 'server-only';

export type SculptureCategoryFull = Prisma.PromiseReturnType<
  typeof getSculptureCategoriesFull
>;

export async function getSculptureCategoriesFull() {
  return await prisma.sculptureCategory.findMany({
    include: { sculptures: true },
  });
}

export async function getSculptureCategories() {
  return (await prisma.sculptureCategory.findMany()) as SculptureCategory[];
}
