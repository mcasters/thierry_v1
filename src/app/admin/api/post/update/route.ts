import { join } from 'path';
import { parse } from 'date-fns';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

import { deleteFile, resizeAndSaveImage, getPostDir } from '@/utils/server';
import prisma from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (session) {
    try {
      const dir = getPostDir();

      const formData = await req.formData();
      const id = Number(formData.get('id'));
      const oldPost = await prisma.post.findUnique({
        where: { id },
        include: {
          images: {
            select: {
              filename: true,
              isMain: true,
            },
          },
        },
      });

      if (oldPost) {
        let images = [];
        const mainFile = formData.get('file') as File;
        if (mainFile.size > 0) {
          const fileInfo = await resizeAndSaveImage(mainFile, dir, undefined);
          if (fileInfo)
            images.push({
              filename: fileInfo.filename,
              width: fileInfo.width,
              height: fileInfo.height,
              isMain: true,
            });

          const oldMainImage = oldPost.images.filter((i) => i.isMain);
          if (oldMainImage.length > 0) {
            const filename = oldMainImage[0].filename;
            const pathOldMainImage = join(`${dir}`, `${filename}`);
            deleteFile(pathOldMainImage);
            await prisma.post.update({
              where: { id },
              data: {
                images: {
                  delete: { filename },
                },
              },
            });
          }
        }

        const files = formData.getAll('files') as File[];
        for (const file of files) {
          if (file.size > 0) {
            const fileInfo = await resizeAndSaveImage(file, dir, undefined);
            if (fileInfo)
              images.push({
                filename: fileInfo.filename,
                width: fileInfo.width,
                height: fileInfo.height,
              });
          }
        }

        await prisma.post.update({
          where: { id },
          data: {
            title: formData.get('title') as string,
            date: parse(formData.get('date') as string, 'yyyy', new Date()),
            text: formData.get('text') as string,
            images: {
              create: images,
            },
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
