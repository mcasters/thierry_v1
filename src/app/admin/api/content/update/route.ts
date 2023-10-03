import { getServerSession } from 'next-auth/next';
import { join } from 'path';

import {
  createDirIfNecessary,
  deleteFile,
  getMiscellaneousDir,
  resizeAndSaveImage,
} from '../../../../../utils/server';
import prisma from '../../../../../lib/prisma';
import { authOptions } from '../../../../api/auth/[...nextauth]/route';
import { Label } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (session) {
    try {
      const dir = getMiscellaneousDir();
      createDirIfNecessary(dir);

      const formData = await req.formData();
      const label = formData.get('label');
      const BDContent = await prisma.content.findUnique({
        where: {
          label: label,
        },
        include: {
          images: {
            select: {
              filename: true,
            },
          },
        },
      });

      // Content with only images (Label.SLIDER)
      if (label === Label.SLIDER) {
        if (!BDContent) {
          await prisma.content.create({
            data: {
              label: label,
              title: '',
              text: '',
            },
          });
        }
        const files = formData.getAll('files');
        for (const file of files) {
          if (file.size > 0) {
            const fileInfo = await resizeAndSaveImage(file, dir, undefined);
            await prisma.contentImage.create({
              data: {
                filename: fileInfo.filename,
                width: fileInfo.width,
                height: fileInfo.height,
                content: {
                  connect: { label },
                },
              },
            });
          }
        }
      } else {
        if (!BDContent) {
          await prisma.content.create({
            data: {
              label,
              title: '',
              text: formData.get('text'),
            },
          });
        } else {
          await prisma.content.update({
            where: {
              id: BDContent.id,
            },
            data: {
              text: formData.get('text'),
            },
          });
        }

        // Contents with one image (PRESENTATION)
        if (label === Label.PRESENTATION) {
          const file = formData.get('file');
          if (file.size > 0) {
            if (BDContent.images.length > 0) {
              const oldFilename = BDContent.images[0].filename;
              deleteFile(join(`${dir}`, `${oldFilename}`));
              await prisma.contentImage.delete({
                where: { oldFilename },
              });
            }
            const fileInfo = await resizeAndSaveImage(file, dir, undefined);
            await prisma.contentImage.create({
              data: {
                filename: fileInfo.filename,
                width: fileInfo.width,
                height: fileInfo.height,
                content: {
                  connect: { label },
                },
              },
            });
          }
        }
      }
      return NextResponse.json({ message: 'ok' });
    } catch (e) {
      console.log(e);
      return NextResponse.json({ error: 'Error' });
    }
  } else {
    return NextResponse.json({ message: 'Unauthorized' });
  }
}
