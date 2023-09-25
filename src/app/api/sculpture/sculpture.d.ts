import { Prisma } from '@prisma/client';
import { getSculpturesFull } from '@/app/api/sculpture/getSculptures';

export type SculptureFull = Prisma.PromiseReturnType<typeof getSculpturesFull>;
