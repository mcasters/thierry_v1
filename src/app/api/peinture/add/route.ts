import formidable from 'formidable';
import { parse } from 'date-fns';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

import {
  resizeAndSaveImage,
  createDirIfNecessary,
  getPaintingDir,
} from '@/utils/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (session) {
    try {
      const dir = getPaintingDir();
      createDirIfNecessary(dir);

      let fields, files, newPainting;
      const form = formidable({ maxFiles: 1, maxFileSize: 3072 * 3072 });

      /*
    const formData = await request.formData()
    const name = formData.get('name')
    const email = formData.get('email')
     */

      [fields, files] = await form.parse(req);

      const file = files.files?.[0];
      const fileInfo = await resizeAndSaveImage(file, dir);
      const category =
        fields.categoryId[0] === ''
          ? {}
          : {
              connect: {
                id: Number(fields.categoryId),
              },
            };
      newPainting = await prisma.painting.create({
        data: {
          title: fields.title[0],
          date: parse(fields.date[0], 'yyyy', new Date()),
          technique: fields.technique[0],
          description: fields.description[0],
          height: Number(fields.height),
          width: Number(fields.width),
          isToSell: fields.isToSell[0] === 'true',
          price: Number(fields.price),
          category,
          image: {
            create: {
              filename: `${file.newFilename}.${fileInfo.format}`,
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
