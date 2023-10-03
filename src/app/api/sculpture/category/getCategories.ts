import prisma from '@/lib/prisma';
import { SculptureCategory } from '@prisma/client';
import 'server-only';

export async function getSculptureCategoriesFull() {
  const res = await prisma.sculptureCategory.findMany({
    include: { sculptures: true },
  });
  return JSON.parse(JSON.stringify(res));
}

export async function getSculptureCategoriesForMenu() {
  const categories =
    (await prisma.sculptureCategory.findMany()) as SculptureCategory[];
  const sculptureWithoutCategory = await prisma.painting.findFirst({
    where: {
      category: null,
    },
  });
  if (categories.length > 0 && sculptureWithoutCategory)
    categories.push({
      key: 'no-category',
      value: 'Sans catégorie',
      id: undefined,
    } as SculptureCategory);
  return JSON.parse(JSON.stringify(categories));
}

export async function getSculptureCategories() {
  return (await prisma.sculptureCategory.findMany()) as SculptureCategory[];
}
