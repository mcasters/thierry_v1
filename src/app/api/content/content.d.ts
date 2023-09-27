import { Prisma } from '@prisma/client';
import { getContentFull } from '@/app/api/content/getContents';

export type ContentFull = Prisma.PromiseReturnType<typeof getContentFull>;
