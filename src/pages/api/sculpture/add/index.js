import formidable from 'formidable';
import { parse } from 'date-fns';
import { getServerSession } from 'next-auth/next';

import prisma from '../../../../lib/prisma';
import {
  resizeAndSaveImage,
  createDirIfNecessary,
  getSculptureDir,
} from '../../../../utils/server';
import { authOptions } from '../../auth/[...nextauth]';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    const dir = getSculptureDir();
    createDirIfNecessary(dir);

    let fields, files, newSculpture;
    // const form = formidable({ maxFiles: 8, maxFileSize: 3072 * 3072 });
    const form = formidable({ maxFiles: 8, maxFileSize: 4096 * 4096 });
    try {
      [fields, files] = await form.parse(req);
    } catch (err) {
      console.log(err);
      return res.status(400).send({ message: 'error parsing form' });
    }

    if (!fields || !files)
      return res.status(400).send({ message: 'Error parsing form' });

    const newFiles = files.files;
    if (newFiles?.[0].size === 0)
      return res.status(404).send({ message: 'Images are missing' });

    let images = [];
    for (const file of newFiles) {
      const fileInfo = await resizeAndSaveImage(file, dir);
      images.push({
        filename: `${file.newFilename}.${fileInfo.format}`,
        width: fileInfo.width,
        height: fileInfo.height,
      });
    }

    const category =
      fields.categoryId[0] === ''
        ? {}
        : {
            connect: {
              id: Number(fields.categoryId),
            },
          };

    newSculpture = await prisma.sculpture.create({
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

    return newSculpture
      ? res.status(200).send({ message: 'ok' })
      : res.status(404).send({ message: 'Add error' });
  } else {
    return res.status(401).send({ message: 'Unauthorized' });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
