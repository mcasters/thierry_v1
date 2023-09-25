import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import 'server-only';
import { PaintingFull } from '@/app/api/peinture/getPaintings';

export type SculptureFull = Prisma.PromiseReturnType<typeof getSculpturesFull>;

export async function getSculpturesFull() {
  const res = await prisma.sculpture.findMany({
    include: { images: true, category: true },
  });
  return JSON.parse(JSON.stringify(res));
}

export async function getSculpturesFullByCategory(categoryKey: string) {
  const res = await prisma.sculpture.findMany({
    where: {
      category: {
        key: categoryKey,
      },
    },
    include: { images: true, category: true },
  });
  return JSON.parse(JSON.stringify(res)) as SculptureFull[];
}
