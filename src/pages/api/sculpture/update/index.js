import { join } from 'path';
import { parse } from 'date-fns';
import { getServerSession } from 'next-auth/next';
import formidable from 'formidable';

import {
  deleteFile,
  resizeAndSaveImage,
  getSculptureDir,
} from '../../../../utils/server';
import prisma from '../../../../lib/prisma';
import { authOptions } from '../../auth/[...nextauth]';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    const dir = getSculptureDir();

    let fields;
    let files;

    const form = formidable({
      maxFiles: 8,
      maxFileSize: 4096 * 4096,
      allowEmptyFiles: true,
      minFileSize: 0,
    });

    try {
      [fields, files] = await form.parse(req);
    } catch (err) {
      console.log(err);
      return res.status(400).send({ message: 'error' });
    }

    const sculpId = Number(fields.id);
    const oldSculpt = await prisma.sculpture.findUnique({
      where: { id: sculpId },
      include: {
        images: {
          select: {
            filename: true,
          },
        },
      },
    });

    if (oldSculpt) {
      let images = [];
      const newFiles = files.files;
      if (newFiles?.[0].size !== 0) {
        for (const file of newFiles) {
          const fileInfo = await resizeAndSaveImage(file, dir);
          images.push({
            filename: `${file.newFilename}.${fileInfo.format}`,
            width: fileInfo.width,
            height: fileInfo.height,
          });

          oldSculpt.images.forEach((image) => {
            const path = join(`${dir}`, `${image.filename}`);
            deleteFile(path);
          });
        }
        for (const image of oldSculpt.images) {
          await prisma.image.delete({
            where: {
              filename: image.filename,
            },
          });
        }
      }

      const category =
        fields.categoryId[0] === ''
          ? {
              disconnect: {
                id: oldSculpt.categoryId,
              },
            }
          : {
              connect: {
                id: Number(fields.categoryId),
              },
            };

      const updatedSculpt = await prisma.sculpture.update({
        where: { id: sculpId },
        data: {
          title: fields.title[0],
          date: parse(fields.date[0], 'yyyy', new Date()),
          technique: fields.technique[0],
          description: fields.description[0],
          height: Number(fields.height),
          width: Number(fields.width),
          length: Number(fields.length),
          isToSell: fields.isToSell[0] === 'true',
          price: Number(fields.price),
          category,
          images: {
            create: images,
          },
        },
      });

      return updatedSculpt
        ? res.status(200).send({ message: 'ok' })
        : res.status(404).send({ message: 'Update error' });
    } else {
      return res.status(404).json({ message: 'No Sculpture to update found' });
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
