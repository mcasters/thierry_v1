import prisma from '@/lib/prisma';
import 'server-only';
import { SculptureFull } from '@/app/api/sculpture/sculpture';
import { PaintingCategory, SculptureCategory } from '@prisma/client';

export async function getSculpturesFull() {
  const res = await prisma.Sculpture.findMany({
    include: { images: true, category: true },
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

export async function getSculpturesFullByCategory(categoryKey: string) {
  const res = await prisma.Sculpture.findMany({
    where: {
      category: {
        key: categoryKey,
      },
    },
    include: { images: true, category: true },
  });
  return JSON.parse(JSON.stringify(res)) as SculptureFull[];
}
