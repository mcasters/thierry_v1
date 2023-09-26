import { getServerSession } from 'next-auth/next';
import prisma from '@/lib/prisma';
import { deleteAllFiles, getPaintingImagePath } from '@/utils/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  console.log('/// enter');
  const session = await getServerSession(authOptions);
  if (session) {
    try {
      const id = Number(params.id);
      console.log('/// id');
      console.log(id);

      const painting = await prisma.painting.findUnique({
        where: { id },
        include: {
          image: {
            select: {
              filename: true,
            },
          },
        },
      });

      if (painting) {
        const imageToDelete = getPaintingImagePath(painting);
        if (deleteAllFiles(imageToDelete)) {
          // painting also deleted as it is cascade mode
          const filename = painting.image.filename;
          await prisma.image.delete({
            where: { filename },
          });
        }
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
