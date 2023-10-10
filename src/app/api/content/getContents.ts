import prisma from '@/lib/prisma';
import { Content, Label } from '@prisma/client';
import 'server-only';

export async function getContents(): Promise<Content[]> {
  return prisma.content.findMany();
  // return JSON.parse(JSON.stringify(res));
}

export async function getContentsFull() {
  return prisma.content.findMany({ include: { images: true } });
  // return JSON.parse(JSON.stringify(res));
}

export async function getContentFullByLabel(label: Label) {
  return prisma.content.findUnique({
    where: {
      label,
    },
    include: {
      images: true,
    },
  });
  //return JSON.parse(JSON.stringify(res));
}
