import prisma from "@/lib/db/prisma";
import { Content, Label } from "@prisma/client";
import "server-only";

export async function getContents(): Promise<Content[]> {
  const res = await prisma.content.findMany();
  return JSON.parse(JSON.stringify(res));
}

export async function getContentsFull() {
  const res = await prisma.content.findMany({ include: { images: true } });
  return JSON.parse(JSON.stringify(res));
}

export async function getContentFullByLabel(label: Label) {
  const res = await prisma.content.findUnique({
    where: {
      label,
    },
    include: {
      images: true,
    },
  });
  return JSON.parse(JSON.stringify(res));
}
