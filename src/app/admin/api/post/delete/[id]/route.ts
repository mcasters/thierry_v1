import { getServerSession } from 'next-auth/next';
import prisma from '@/lib/prisma';
import { deleteFile, getPostDir } from '@/utils/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (session) {
    const dir = getPostDir();
    try {
      const id = Number(params.id);
      const post = await prisma.post.findUnique({
        where: { id },
        include: {
          images: {
            select: {
              filename: true,
            },
          },
        },
      });

      if (post) {
        for (const image of post.images) {
          deleteFile(`${dir}/${image.filename}`);
          await prisma.postImage.delete({
            where: {
              filename: image.filename,
            },
          });
        }
        await prisma.post.delete({
          where: {
            id,
          },
        });
      }
      return NextResponse.json({ message: 'ok' });
    } catch (e) {
      console.log(e);
      return NextResponse.json({ error: 'Error' }, { status: 404 });
    }
  } else {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}
