import prisma from '@/lib/prisma';
import { Content, Label } from '@prisma/client';
import 'server-only';

export async function getContents(): Promise<Content[]> {
  return await prisma.content.findMany({ include: { images: true } });
  // return JSON.parse(JSON.stringify(res));
}

export async function getContentsFull() {
  return await prisma.content.findMany({ include: { images: true } });
  // return JSON.parse(JSON.stringify(res));
}

export async function getContentFullByLabel(label: Label) {
  return await prisma.content.findUnique({
    where: {
      label,
    },
    include: {
      images: true,
    },
  });
  //return JSON.parse(JSON.stringify(res));
}
