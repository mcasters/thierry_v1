import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Prisma } from '@prisma/client';
import 'server-only';

export type PaintingFull = Prisma.PromiseReturnType<typeof getPaintingFull>;

export async function getPaintingFull() {
  return await prisma.painting.findMany({
    include: { image: true, category: true },
  });
}

export async function getPaintingsFullByCategory(category: string) {
  const res = await prisma.painting.findMany({
    where: {
      category,
    },
    include: { image: true, category: true },
  });

  const paintings = (await JSON.parse(JSON.stringify(res))) as PaintingFull[];

  if (paintings.length === 0) {
    notFound();
  }

  return paintings;
}

export async function getPaintingsFull() {
  const res = await prisma.painting.findMany({
    include: { image: true, category: true },
  });

  const paintings = (await JSON.parse(JSON.stringify(res))) as PaintingFull[];
  if (paintings.length === 0) {
    notFound();
  }
  return paintings;
}
