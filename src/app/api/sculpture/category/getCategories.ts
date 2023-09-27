import prisma from '@/lib/prisma';
import { SculptureCategory } from '@prisma/client';
import 'server-only';

export async function getSculptureCategoriesFull() {
  const res = await prisma.SculptureCategory.findMany({
    include: { sculptures: true },
  });
  return JSON.parse(JSON.stringify(res));
}

export async function getSculptureCategoriesForMenu() {
  const res =
    (await prisma.SculptureCategory.findMany()) as SculptureCategory[];
  if (res.length > 0)
    res.push({
      key: 'no-category',
      value: 'Sans catégorie',
      id: undefined,
    } as SculptureCategory);
  return JSON.parse(JSON.stringify(res));
}

export async function getSculptureCategories() {
  return (await prisma.SculptureCategory.findMany()) as SculptureCategory[];
}
