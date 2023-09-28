import { join } from 'path';
import { parse } from 'date-fns';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

import {
  deleteFile,
  resizeAndSaveImage,
  getSculptureDir,
  getPostDir,
} from '@/utils/server';
import prisma from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (session) {
    try {
      const dir = getPostDir();

      const formData = await req.formData();
      const postId = Number(formData.get('id'));
      const oldPost = await prisma.Post.findUnique({
        where: { id: postId },
        include: {
          mainImage: {
            select: {
              filename: true,
            },
          },
          images: {
            select: {
              filename: true,
            },
          },
        },
      });

      const mainFile = formData.get('file') as File;
      const files = formData.getAll('files') as File[];

      let mainImage = {};
      if (mainFile.size > 0) {
        const fileInfo = await resizeAndSaveImage(mainFile, dir, undefined);
        mainImage = {
          create: {
            filename: `${fileInfo.filename}`,
            width: fileInfo.width,
            height: fileInfo.height,
          },
        };
        const pathOldMainImage = join(
          `${dir}`,
          `${oldPost.mainImage.filename}`,
        );
        deleteFile(pathOldMainImage);
        await prisma.PostImage.delete({
          where: {
            filename: oldPost.mainImage.filename,
          },
        });
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

      const updatedPost = await prisma.Post.update({
        where: { id: postId },
        data: {
          title: formData.get('title'),
          date: parse(formData.get('date') as string, 'yyyy', new Date()),
          content: formData.get('content'),
          mainImage,
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
