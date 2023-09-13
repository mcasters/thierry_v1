import { NextApiRequest, NextApiResponse } from 'next';
import { join } from 'path';
import { parse } from 'date-fns';
import { getServerSession } from 'next-auth/next';
import formidable from 'formidable';

import {
  createDirIfNecessary,
  deleteFile,
  getMiscellaneousDir,
  resizeAndSaveImage,
} from '@/utils/server';
import prisma from '@/lib/prisma';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getPaintingDir } from '@/utils/server';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // @ts-ignore
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    const dir = getMiscellaneousDir();
    createDirIfNecessary(dir);

    let fields;
    let files;

    const form = formidable({
      maxFile: 1,
      maxFileSize: 3072 * 3072,
      allowEmptyFiles: true,
      minFileSize: 0,
    });

    try {
      [fields, files] = await form.parse(req);
    } catch (err) {
      console.log(err);
      return res.status(400).send({ message: err.message });
    }

    const contentId = Number(fields.id);
    let content;
    let fileInfo = undefined;
    const file = files.file?.[0];

    if (file.size !== 0) fileInfo = await resizeAndSaveImage(file, dir);

    if (contentId === 0) {
      if (!fileInfo)
        return res.status(400).send({ message: 'Image is missing' });
      else
        content = await prisma.content.create({
          data: {
            label: fields.label[0],
            title: fields.title[0],
            text: fields.text[0],
            filename: `${file.newFilename}.${fileInfo.format}`,
          },
        });
    } else {
      const BDContent = await prisma.painting.findUnique({
        where: { id: contentId },
      });

      let filename = {};
      if (fileInfo) {
        filename = `${file.newFilename}.${fileInfo.format}`;
        deleteFile(join(`${dir}`, `${BDContent.filename}`));
      }

      content = await prisma.content.update({
        where: {
          id: contentId,
        },
        data: {
          label: fields.label[0],
          title: fields.title[0],
          text: fields.text[0],
          filename,
        },
      });
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
