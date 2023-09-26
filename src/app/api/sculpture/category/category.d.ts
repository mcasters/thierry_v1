import { Prisma } from '@prisma/client';
import { getSculptureCategoriesFull } from '@/app/api/sculpture/categories/getCategories';

export type SculptureCategoryFull = Prisma.PromiseReturnType<
  typeof getSculptureCategoriesFull
>;
