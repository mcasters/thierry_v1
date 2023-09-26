import { join } from 'path';
import { parse } from 'date-fns';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

import {
  deleteFile,
  resizeAndSaveImage,
  getSculptureDir,
} from '@/utils/server';
import prisma from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (session) {
    try {
      const dir = getSculptureDir();

      const formData = await req.formData();
      const sculptId = Number(formData.get('id'));
      const oldSculpt = await prisma.sculpture.findUnique({
        where: { id: sculptId },
        include: {
          images: {
            select: {
              filename: true,
            },
          },
        },
      });

      const files = [];
      const values = Array.from(formData.values());
      for (const value of values) {
        if (typeof value === 'object' && 'arrayBuffer' in value) {
          if (value.size !== 0) files.push(value);
        }
      }

      let images = [];
      if (files.length > 0) {
        for (const file of files) {
          const fileInfo = await resizeAndSaveImage(file, dir, undefined);
          images.push({
            filename: `${fileInfo.filename}`,
            width: fileInfo.width,
            height: fileInfo.height,
          });
        }
        for (const image of oldSculpt.images) {
          const path = join(`${dir}`, `${image.filename}`);
          deleteFile(path);
          await prisma.image.delete({
            where: {
              filename: image.filename,
            },
          });
        }
      }

      const category =
        formData.get('categoryId') !== ''
          ? {
              connect: {
                id: Number(formData.get('categoryId')),
              },
            }
          : oldSculpt.categoryId !== null
          ? {
              disconnect: {
                id: oldSculpt.categoryId,
              },
            }
          : {};

      const updatedSculpt = await prisma.sculpture.update({
        where: { id: sculptId },
        data: {
          title: formData.get('title'),
          date: parse(formData.get('date') as string, 'yyyy', new Date()),
          technique: formData.get('technique'),
          description: formData.get('description'),
          height: Number(formData.get('height')),
          width: Number(formData.get('width')),
          length: Number(formData.get('length')),
          isToSell: formData.get('isToSell') === 'true',
          price: Number(formData.get('price')),
          category,
          images: {
            create: images,
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
