import { getServerSession } from 'next-auth/next';
import { join } from 'path';

import prisma from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { deleteFile, getSculptureDir } from '@/utils/server';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { filename: string } },
) {
  const session = await getServerSession(authOptions);

  if (session) {
    try {
      const filename = params.filename;

      let imageDBDeleted = null;
      const dir = getSculptureDir();

      if (deleteFile(join(`${dir}`, `${filename}`))) {
        imageDBDeleted = await prisma.Image.delete({
          where: { filename },
        });
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
