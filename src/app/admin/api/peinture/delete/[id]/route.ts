import { getServerSession } from 'next-auth/next';
import prisma from '@/lib/prisma';
import { deleteFile, getPaintingDir } from '@/utils/serverUtils';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (session) {
    const dir = getPaintingDir();
    try {
      const id = Number(params.id);
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
        const filename = painting.image.filename;
        deleteFile(`${dir}/${filename}`);
        await prisma.image.delete({
          where: { filename },
        });
        await prisma.painting.delete({
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
