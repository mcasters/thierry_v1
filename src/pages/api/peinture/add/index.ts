import formidable from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import { join } from 'path';
import { parse } from 'date-fns';
import { getServerSession } from 'next-auth/next';

import prisma from '@/lib/prisma';
import { resizeAndSaveImage, createDir } from '@/utils/server';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { TYPE } from '@/constants';

const serverLibraryPath = process.env.PHOTOS_PATH;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // @ts-ignore
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    const dir = join(`${serverLibraryPath}`, `${TYPE.PAINTING}`);
    createDir(dir);

    const form = formidable({ maxFile: 1, maxFileSize: 1024 * 1024 });
    let fields;
    let files;

    try {
      [fields, files] = await form.parse(req);
    } catch (err) {
      return res.status(400).send({ message: err.message });
    }

    const file = files.file?.[0];
    if (!file) return res.status(404).send('Image is missing');

    const fileInfo = await resizeAndSaveImage(file, dir);

    const newPainting = await prisma.painting.create({
      data: {
        title: fields.title[0],
        date: parse(fields.date[0], 'dd/MM/yyyy', new Date()),
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

    return res.status(200).send({ message: 'ok' });
  } else {
    return res.status(401).send({ message: 'Unauthorized' });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
