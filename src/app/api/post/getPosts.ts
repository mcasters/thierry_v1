import prisma from '@/lib/prisma';
import 'server-only';

export async function getPostsFull() {
  return await prisma.Post.findMany({
    include: { mainImage: true, images: true },
  });
}
