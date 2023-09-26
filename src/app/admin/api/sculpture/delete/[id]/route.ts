import { getServerSession } from 'next-auth/next';
import prisma from '@/lib/prisma';
import { deleteFile, getSculptureDir } from '@/utils/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (session) {
    const dir = getSculptureDir();
    try {
      const id = Number(params.id);
      const sculpture = await prisma.sculpture.findUnique({
        where: { id },
        include: {
          images: {
            select: {
              filename: true,
            },
          },
        },
      });
      for (const image of sculpture.images) {
        deleteFile(`${dir}/${image.filename}`);
        await prisma.image.delete({
          where: {
            filename: image.filename,
          },
        });
      }
      await prisma.sculpture.delete({
        where: {
          id,
        },
      });

      return NextResponse.json({ message: 'ok' });
    } catch (e) {
      console.log(e);
      return NextResponse.json({ error: 'Error' }, { status: 404 });
    }
  } else {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}
