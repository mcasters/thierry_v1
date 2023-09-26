import { getServerSession } from 'next-auth/next';
import prisma from '../../../../../lib/prisma';
import { deleteAllFiles, getPaintingImagePath } from '@/utils/server';
import { authOptions } from '../../../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);

  if (session) {
    try {
      const id = params.id;

      let paintingDeleted = null;
      let imageDBDeleted = null;
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
          await prisma.painting.delete({
            where: { id },
          });
          const filename = painting.image.filename;
          await prisma.image.delete({
            where: { filename },
          });
        }
      }
      return NextResponse.json({ message: 'ok' }, { status: 200 });
    } catch (e) {
      console.log(e);
      return NextResponse.json({ error: 'Error' }, { status: 404 });
    }
  } else {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}
