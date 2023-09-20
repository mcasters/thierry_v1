import formidable from 'formidable';
import { parse } from 'date-fns';
import { getServerSession } from 'next-auth/next';

import prisma from '../../../../lib/prisma';
import {
  resizeAndSaveImage,
  createDirIfNecessary,
  getPaintingDir,
} from '../../../../utils/server';
import { authOptions } from '../../auth/[...nextauth]';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    const dir = getPaintingDir();
    createDirIfNecessary(dir);

    let fields, files, newPainting;
    const form = formidable({ maxFiles: 1, maxFileSize: 3072 * 3072 });
    try {
      [fields, files] = await form.parse(req);
    } catch (err) {
      return res.status(400).send({ message: 'error parsing form' });
    }

    if (!fields || !files)
      return res.status(400).send({ message: 'Error parsing form' });

    try {
      const file = files.files?.[0];
      if (!file) return res.status(404).send({ message: 'Image is missing' });

      const fileInfo = await resizeAndSaveImage(file, dir);

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
          image: {
            create: {
              filename: `${file.newFilename}.${fileInfo.format}`,
              width: fileInfo.width,
              height: fileInfo.height,
            },
          },
        },
      });
    } catch (e) {
      return res.status(404).send({ message: 'error' });
    }

    return newPainting
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
