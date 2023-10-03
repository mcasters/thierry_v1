import { Prisma } from '@prisma/client';
import { getPaintingsFull } from '@/app/api/peinture/getPaintings';

const PaintingFull = Prisma.validator<Prisma.PaintingDefaultArgs>()({
  include: { image: true, category: true },
});

export type PaintingFull = Prisma.PaintingGetPayload<typeof PaintingFull>;

export type PaintingsFull = Prisma.PromiseReturnType<typeof getPaintingsFull>;
