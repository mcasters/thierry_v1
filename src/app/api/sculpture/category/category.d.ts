import { Prisma } from '@prisma/client';
import { getSculptureCategoriesFull } from '@/app/api/sculpture/category/getCategories';

export type SculptureCategoryFull = Prisma.PromiseReturnType<
  typeof getSculptureCategoriesFull
>;
