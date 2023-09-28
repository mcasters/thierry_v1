import { parse } from 'date-fns';
import { getServerSession } from 'next-auth/next';

import prisma from '@/lib/prisma';
import {
  resizeAndSaveImage,
  createDirIfNecessary,
  getSculptureDir,
  getPostDir,
} from '@/utils/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (session) {
    try {
      const dir = getPostDir();
      createDirIfNecessary(dir);

      const formData = await req.formData();

      const mainFile = formData.get('file') as File;
      const files = formData.getAll('files') as File[];

      let image = {};
      if (mainFile.size > 0) {
        const fileInfo = await resizeAndSaveImage(mainFile, dir, undefined);
        image = {
          filename: `${fileInfo.filename}`,
          width: fileInfo.width,
          height: fileInfo.height,
        };
      }

      let images = [];
      for (const file of files) {
        if (file.size > 0) {
          const fileInfo = await resizeAndSaveImage(file, dir, undefined);
          images.push({
            filename: `${fileInfo.filename}`,
            width: fileInfo.width,
            height: fileInfo.height,
          });
        }
      }

      const newPost = await prisma.Post.create({
        data: {
          title: formData.get('title'),
          date: parse(formData.get('date') as string, 'yyyy', new Date()),
          content: formData.get('content'),
          mainImage: {
            create: image,
          },
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
