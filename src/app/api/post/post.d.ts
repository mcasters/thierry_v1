import { Prisma } from '@prisma/client';
import { getPostsFull } from '@/app/api/post/getPosts';

export type PostFull = Prisma.PromiseReturnType<typeof getPostsFull>;
