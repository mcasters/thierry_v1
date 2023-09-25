import prisma from '@/lib/prisma';
import 'server-only';
import { SculptureFull } from '@/app/api/sculpture/sculpture';

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
