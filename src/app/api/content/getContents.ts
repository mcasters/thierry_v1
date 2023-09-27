import prisma from '@/lib/prisma';
import { Content, Label } from '@prisma/client';
import { ContentFull } from '@/app/api/content/content';
import 'server-only';

export async function getContents(): Promise<Content[]> {
  return await prisma.Content.findMany({ include: { images: true } });
  // return JSON.parse(JSON.stringify(res));
}

export async function getContentsFull() {
  return await prisma.Content.findMany({ include: { images: true } });
  // return JSON.parse(JSON.stringify(res));
}

export async function getContentFullByLabel(
  label: Label,
): Promise<ContentFull> {
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
