import prisma from '@/lib/prisma';
import { SculptureCategory } from '@prisma/client';
import 'server-only';

export async function getSculptureCategoriesFull() {
  const res = await prisma.sculptureCategory.findMany({
    include: { sculptures: true },
  });
  return JSON.parse(JSON.stringify(res));
}

export async function getSculptureCategories() {
  return (await prisma.sculptureCategory.findMany()) as SculptureCategory[];
}
