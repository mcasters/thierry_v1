import { Prisma } from '@prisma/client';
import { getPaintingsFull } from '@/app/api/peinture/getPaintings';

export type PaintingFull = Prisma.PromiseReturnType<typeof getPaintingsFull>;
