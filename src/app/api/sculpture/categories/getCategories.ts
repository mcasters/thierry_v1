import prisma from '@/lib/prisma';
import { SculptureCategory } from '@prisma/client';
import 'server-only';

export async function getSculptureCategoriesFull() {
  return await prisma.sculptureCategory.findMany({
    include: { sculptures: true },
  });
}

export async function getSculptureCategories() {
  return (await prisma.sculptureCategory.findMany()) as SculptureCategory[];
}
