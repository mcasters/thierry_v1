import { getServerSession } from 'next-auth/next';
import prisma from '../../../../../lib/prisma';
import { deleteAllFiles, getSculptureImagePaths } from '@/utils/server';
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
      const sculpture = await prisma.sculpture.findUnique({
        where: { id },
        include: {
          image: {
            select: {
              filename: true,
            },
          },
        },
      });
      if (sculpture) {
        const imageToDelete = getSculptureImagePaths(sculpture);
        if (deleteAllFiles(imageToDelete)) {
          await prisma.sculpture.delete({
            where: { id },
          });
          const filename = sculpture.image.filename;
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
