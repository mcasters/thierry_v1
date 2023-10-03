import prisma from '@/lib/prisma';
import 'server-only';

export async function getPostsFull() {
  return await prisma.post.findMany({
    include: { mainImage: true, images: true },
  });
}
