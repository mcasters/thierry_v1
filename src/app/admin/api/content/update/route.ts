import { getServerSession } from 'next-auth/next';
import { join } from 'path';

import {
  createDirIfNecessary,
  deleteFile,
  getMiscellaneousDir,
  resizeAndSaveImage,
} from '@/utils/server';
import prisma from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Label } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (session) {
    try {
      const dir = getMiscellaneousDir();
      createDirIfNecessary(dir);

      const formData = await req.formData();

      const label = formData.get('label');
      const BDContent = await prisma.Content.findUnique({
        where: {
          label,
        },
        include: {
          images: {
            select: {
              filename: true,
            },
          },
        },
      });

      let content;
      if (
        // Contents without image
        label === Label.INTRO ||
        label === Label.ADDRESS ||
        label === Label.PHONE ||
        label === Label.EMAIL ||
        label === Label.TEXT_CONTACT ||
        label === Label.DEMARCHE ||
        label === Label.INSPIRATION
      ) {
        if (!BDContent) {
          content = await prisma.Content.create({
            data: {
              label,
              title: '',
              text: formData.get('text'),
            },
          });
        } else {
          content = await prisma.Content.update({
            where: {
              id: BDContent.id,
            },
            data: {
              text: formData.get('text'),
            },
          });
        }
        // Contents with text and image
      } else if (label === Label.PRESENTATION) {
        let fileInfo = null;
        let images = [];
        const file = formData.get('files') as File;

        if (!BDContent) {
          if (file.size !== 0) {
            const fileInfo = await resizeAndSaveImage(file, dir, undefined);
            images.push({
              filename: `${fileInfo.filename}`,
              width: fileInfo.width,
              height: fileInfo.height,
            });
          }
          content = await prisma.Content.create({
            data: {
              label,
              title: '',
              text: formData.get('text'),
              images: {
                create: images,
              },
            },
          });
        } else {
          if (file.size !== 0) {
            fileInfo = await resizeAndSaveImage(file, dir, undefined);
            images.push({
              filename: `${fileInfo.filename}`,
              width: fileInfo.width,
              height: fileInfo.height,
            });

            if (BDContent.images.length > 0) {
              const filename = BDContent.images[0].filename;
              deleteFile(join(`${dir}`, `${filename}`));
              await prisma.ContentImage.delete({
                where: {
                  filename,
                },
              });
            }
          }
          content = await prisma.content.update({
            where: {
              id: BDContent.id,
            },
            data: {
              text: formData.get('text'),
              images: {
                create: images,
              },
            },
          });
        }
        // Content with only images (Label.SLIDER)
      } else if (label === Label.SLIDER) {
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

          if (!BDContent) {
            content = await prisma.content.create({
              data: {
                label,
                title: '',
                text: '',
                images: {
                  create: images,
                },
              },
            });
          } else {
            content = await prisma.content.update({
              where: {
                id: BDContent.id,
              },
              data: {
                images: {
                  create: images,
                },
              },
            });
          }
        }
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
