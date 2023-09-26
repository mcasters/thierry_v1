import formidable from 'formidable';
import { parse } from 'date-fns';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

import {
  resizeAndSaveImage,
  createDirIfNecessary,
  getPaintingDir,
} from '@/utils/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (session) {
    try {
      const dir = getPaintingDir();
      createDirIfNecessary(dir);

      const formData = await req.formData();

      const file = formData.get('files');
      const fileInfo = await resizeAndSaveImage(file, dir, undefined);
      const categoryId = formData.get('categoryId');
      const category =
        categoryId === ''
          ? {}
          : {
              connect: {
                id: Number(categoryId),
              },
            };

      const newPainting = await prisma.painting.create({
        data: {
          title: formData.get('title'),
          date: parse(formData.get('date') as string, 'yyyy', new Date()),
          technique: formData.get('technique'),
          description: formData.get('description'),
          height: Number(formData.get('height')),
          width: Number(formData.get('width')),
          isToSell: formData.get('isToSell') === 'true',
          price: Number(formData.get('price')),
          category,
          image: {
            create: {
              filename: `${fileInfo.filename}`,
              width: fileInfo.width,
              height: fileInfo.height,
            },
          },
        },
      });

      return NextResponse.json({ message: 'ok' }, { status: 200 });
    } catch (e) {
      console.log(e);
      return NextResponse.json({ error: 'Error' }, { status: 404 });
    }
  } else {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}
