import { Prisma } from '@prisma/client';
import { getPaintingCategoriesFull } from '@/app/api/peinture/category/getCategories';

export type PaintingCategoryFull = Prisma.PromiseReturnType<
  typeof getPaintingCategoriesFull
>;
