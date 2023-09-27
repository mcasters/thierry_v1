import prisma from '@/lib/prisma';
import 'server-only';
import { Label } from '@prisma/client';

export async function getContentFull() {
  const res = await prisma.content.findMany({ include: { images: true } });
  return JSON.parse(JSON.stringify(res));
}

export async function getContentFullByLabel(label: Label) {
  const res = await prisma.content.findMany({
    where: {
      label,
    },
    include: {
      images: true,
    },
  });
  return JSON.parse(JSON.stringify(res[0]));
}
