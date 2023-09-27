import prisma from '@/lib/prisma';
import 'server-only';

export async function getContentFull() {
  const res = await prisma.content.findMany({ include: { images: true } });
  return JSON.parse(JSON.stringify(res));
}
