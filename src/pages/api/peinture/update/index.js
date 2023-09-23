import { join } from 'path';
import { parse } from 'date-fns';
import { getServerSession } from 'next-auth/next';
import formidable from 'formidable';

import {
  deleteFile,
  resizeAndSaveImage,
  getPaintingDir,
} from '../../../../utils/server';
import prisma from '../../../../lib/prisma';
import { authOptions } from '../../auth/[...nextauth]';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    const dir = getPaintingDir();

    let fields;
    let files;

    const form = formidable({
      maxFiles: 1,
      maxFileSize: 3072 * 3072,
      allowEmptyFiles: true,
      minFileSize: 0,
    });

    try {
      [fields, files] = await form.parse(req);
    } catch (err) {
      console.log(err);
      return res.status(400).send({ message: 'error' });
    }

    const paintId = Number(fields.id);
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
      const newFile = files.files?.[0];
      if (newFile.size !== 0) {
        const path = join(`${dir}`, `${oldPaint.image.filename}`);
        deleteFile(path);
        fileInfo = await resizeAndSaveImage(newFile, dir);
        image = {
          create: {
            filename: `${newFile.newFilename}.${fileInfo.format}`,
            width: fileInfo.width,
            height: fileInfo.height,
          },
        };
      }

      const category =
        fields.categoryId[0] === ''
          ? {
              disconnect: {
                id: oldPaint.categoryId,
              },
            }
          : {
              connect: {
                id: Number(fields.categoryId),
              },
            };

      const updatedPaint = await prisma.painting.update({
        where: { id: paintId },
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
          image,
        },
      });

      if (newFile.size !== 0) {
        const deletedImage = await prisma.image.delete({
          where: {
            filename: oldPaint.image.filename,
          },
        });
        if (!deletedImage)
          return res.status(404).send({ message: 'Image update error' });
      }

      return updatedPaint
        ? res.status(200).send({ message: 'ok' })
        : res.status(404).send({ message: 'Update error' });
    } else {
      return res.status(404).json({ message: 'No painting found' });
    }
  } else {
    return res.status(401).send({ message: 'Unauthorized' });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
