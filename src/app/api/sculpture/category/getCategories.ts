import prisma from "@/lib/db/prisma";
import { SculptureCategory } from "@prisma/client";
import "server-only";

export async function getSculptureCategoriesFull() {
  const res = await prisma.sculptureCategory.findMany({
    include: { sculptures: true },
  });
  return JSON.parse(JSON.stringify(res));
}

export async function getSculptureCategoriesForMenu() {
  const categories =
    (await prisma.sculptureCategory.findMany()) as SculptureCategory[];
  const sculptureWithoutCategory = await prisma.sculpture.findFirst({
    where: {
      category: null,
    },
  });
  if (categories.length > 0 && sculptureWithoutCategory)
    categories.push({
      key: "no-category",
      value: "Sans catégorie",
      id: 0,
    } as SculptureCategory);
  return JSON.parse(JSON.stringify(categories));
}

export async function getSculptureCategories() {
  return (await prisma.sculptureCategory.findMany()) as SculptureCategory[];
}
