import { getServerSession } from 'next-auth/next';
import formidable from 'formidable';

import {
  createDirIfNecessary,
  getMiscellaneousDir,
  resizeAndSaveImage,
} from '../../../../utils/server';
import prisma from '../../../../lib/prisma';
import { authOptions } from '../../auth/[...nextauth]';
import { Label } from '@prisma/client';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    const dir = getMiscellaneousDir();
    createDirIfNecessary(dir);

    let fields, files;

    const form = formidable({
      maxFiles: 10,
      maxFileSize: 4096 * 4096,
      allowEmptyFiles: true,
      minFileSize: 0,
    });

    try {
      [fields, files] = await form.parse(req);
    } catch (err) {
      console.log(err);
      return res.status(400).send({ message: 'Error parsing form' });
    }

    const label = fields.label[0];
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

    let content;
    if (label === Label.INTRO) {
      if (!BDContent) {
        content = await prisma.content.create({
          data: {
            label,
            title: '',
            text: fields.text[0],
          },
        });
      } else {
        content = await prisma.content.update({
          where: {
            id: BDContent.id,
          },
          data: {
            text: fields.text[0],
          },
        });
      }
    } else if (label === Label.SLIDER) {
      const filesTab = files.files;
      let images = [];
      for (const file of filesTab) {
        const fileInfo = await resizeAndSaveImage(file, dir, 2000);
        images.push({
          filename: `${file.newFilename}.${fileInfo.format}`,
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

    return content
      ? res.status(200).send({ message: 'ok' })
      : res.status(404).send({ message: 'Update error' });
  } else {
    return res.status(401).send({ message: 'Unauthorized' });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
