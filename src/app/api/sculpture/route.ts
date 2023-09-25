import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Prisma } from '@prisma/client';
import 'server-only';

export type SculptureFull = Prisma.PromiseReturnType<typeof getSculptureFull>;

export async function getSculptureFull() {
  return await prisma.painting.findMany({
    include: { image: true, category: true },
  });
}

export async function getSculpturesFullByCategory(category: string) {
  const res = await prisma.painting.findMany({
    where: {
      category,
    },
    include: { image: true, category: true },
  });

  const sculptures = (await JSON.parse(JSON.stringify(res))) as SculptureFull[];

  if (sculptures.length === 0) {
    notFound();
  }

  return sculptures;
}

export async function getSculpturesFull() {
  const res = await prisma.painting.findMany({
    include: { image: true, category: true },
  });

  const sculptures = (await JSON.parse(JSON.stringify(res))) as SculptureFull[];
  if (sculptures.length === 0) {
    notFound();
  }
  return sculptures;
}
