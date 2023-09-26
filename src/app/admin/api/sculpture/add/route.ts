import formidable from 'formidable';
import { parse } from 'date-fns';
import { getServerSession } from 'next-auth/next';

import prisma from '@/lib/prisma';
import {
  resizeAndSaveImage,
  createDirIfNecessary,
  getSculptureDir,
} from '@/utils/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (session) {
    try {
      const dir = getSculptureDir();
      createDirIfNecessary(dir);

      const formData = await req.formData();

      const files = [];
      const values = Array.from(formData.values());
      for (const value of values) {
        if (typeof value === 'object' && 'arrayBuffer' in value) {
          files.push(value);
        }
      }

      let images = [];
      for (const file of files) {
        const fileInfo = await resizeAndSaveImage(file, dir, undefined);
        images.push({
          filename: `${fileInfo.filename}`,
          width: fileInfo.width,
          height: fileInfo.height,
        });
      }

      const categoryId = formData.get('categoryId');
      const category =
        categoryId === ''
          ? {}
          : {
              connect: {
                id: Number(categoryId),
              },
            };

      const newSculpture = await prisma.sculpture.create({
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
