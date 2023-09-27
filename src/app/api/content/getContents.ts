import prisma from '@/lib/prisma';
import { Label } from '@prisma/client';
import 'server-only';

export async function getContentFull() {
  return await prisma.Content.findMany({ include: { images: true } });
  // return JSON.parse(JSON.stringify(res));
}

export async function getContentFullByLabel(label: Label) {
  return await prisma.Content.findUnique({
    where: {
      label,
    },
    include: {
      images: true,
    },
  });
  //return JSON.parse(JSON.stringify(res));
}
