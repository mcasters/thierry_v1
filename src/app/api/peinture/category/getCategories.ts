import prisma from '@/lib/prisma';
import { PaintingCategory } from '@prisma/client';
import 'server-only';

export async function getPaintingCategoriesFull() {
  const res = await prisma.paintingCategory.findMany({
    include: { paintings: true },
  });
  return JSON.parse(JSON.stringify(res));
}

export async function getPaintingCategories() {
  const res = (await prisma.paintingCategory.findMany()) as PaintingCategory[];
  return JSON.parse(JSON.stringify(res));
}