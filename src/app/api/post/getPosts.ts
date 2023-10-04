import prisma from '@/lib/prisma';
import 'server-only';

export async function getPostsFull() {
  const res = await prisma.post.findMany({
    include: { images: true },
  });
  return JSON.parse(JSON.stringify(res));
}
