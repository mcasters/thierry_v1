import { Prisma } from '@prisma/client';
import { getPaintingCategoriesFull } from '@/app/api/peinture/categories/getCategories';

export type PaintingCategoryFull = Prisma.PromiseReturnType<
  typeof getPaintingCategoriesFull
>;
