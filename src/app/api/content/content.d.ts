import { Prisma } from '@prisma/client';
import { getContentsFull } from '@/app/api/content/getContents';

const ContentFull = Prisma.validator<Prisma.ContentDefaultArgs>()({
  include: { images: true },
});

export type ContentFull = Prisma.ContentGetPayload<typeof ContentFull>;

export type ContentsFull = Prisma.PromiseReturnType<typeof getContentsFull>;

const ContentImageFull = Prisma.validator<Prisma.ContentImageDefaultArgs>()({
  include: { content: true },
});

export type ContentImageFull = Prisma.ContentImageGetPayload<
  typeof ContentImageFull
>;
