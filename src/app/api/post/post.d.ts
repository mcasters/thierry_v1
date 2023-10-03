import { Prisma } from '@prisma/client';
import { getPostsFull } from '@/app/api/post/getPosts';

const PostFull = Prisma.validator<Prisma.PostDefaultArgs>()({
  include: { mainImage: true, images: true },
});

export type PostFull = Prisma.PostGetPayload<typeof PostFull>;

export type PostsFull = Prisma.PromiseReturnType<typeof getPostsFull>;
