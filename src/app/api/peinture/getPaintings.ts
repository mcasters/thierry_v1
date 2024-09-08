import prisma from "@/lib/db/prisma";
import { PaintingFull } from "@/app/api/peinture/painting";
import "server-only";

export async function getPaintingsFull() {
  const res = await prisma.painting.findMany({
    include: { image: true, category: true },
  });
  return JSON.parse(JSON.stringify(res));
}

export async function getPaintingsFullByCategory(categoryKey: string) {
  const res =
    categoryKey === "no-category"
      ? await prisma.painting.findMany({
          where: {
            category: null,
          },
          include: { image: true, category: true },
        })
      : await prisma.painting.findMany({
          where: {
            category: {
              key: categoryKey,
            },
          },
          include: { image: true, category: true },
        });

  return JSON.parse(JSON.stringify(res)) as PaintingFull[];
}
