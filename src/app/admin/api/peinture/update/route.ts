import { join } from 'path';
import { parse } from 'date-fns';
import { getServerSession } from 'next-auth/next';

import { deleteFile, resizeAndSaveImage, getPaintingDir } from '@/utils/server';
import prisma from '../../../../../lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (session) {
    try {
      const dir = getPaintingDir();

      const formData = await req.formData();

      const paintId = Number(formData.get('id'));
      const oldPaint = await prisma.painting.findUnique({
        where: { id: paintId },
        include: {
          image: {
            select: {
              filename: true,
            },
          },
        },
      });

      if (oldPaint) {
        let fileInfo = null;
        let image = {};
        const newFile = formData.get('files') as File;
        if (newFile.size !== 0) {
          const path = join(`${dir}`, `${oldPaint.image.filename}`);
          deleteFile(path);
          const deletedImage = await prisma.image.delete({
            where: {
              filename: oldPaint.image.filename,
            },
          });
          fileInfo = await resizeAndSaveImage(newFile, dir, undefined);
          image = {
            create: {
              filename: `${fileInfo.filename}`,
              width: fileInfo.width,
              height: fileInfo.height,
            },
          };
        }

        const category =
          formData.get('categoryId') === ''
            ? {
                disconnect: {
                  id: oldPaint.categoryId,
                },
              }
            : {
                connect: {
                  id: Number(formData.get('categoryId')),
                },
              };

        const updatedPaint = await prisma.painting.update({
          where: { id: paintId },
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
            image,
          },
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
