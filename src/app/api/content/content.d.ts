import { Prisma } from '@prisma/client';
import { getContentsFull } from '@/app/api/content/getContents';

export type ContentFull = Prisma.PromiseReturnType<typeof getContentsFull>;
