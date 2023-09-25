import prisma from '@/lib/prisma';
import { PaintingCategory } from '@prisma/client';
import 'server-only';

export async function getPaintingCategoriesFull() {
  return await prisma.paintingCategory.findMany({
    include: { paintings: true },
  });
}

export async function getPaintingCategories() {
  return (await prisma.paintingCategory.findMany()) as PaintingCategory[];
}
