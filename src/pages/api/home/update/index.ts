import { NextApiRequest, NextApiResponse } from 'next';
import { join } from 'path';
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

    let content;
    let fileInfo = undefined;
    const file = files.file?.[0];
    if (file.size !== 0) fileInfo = await resizeAndSaveImage(file, dir);

    const label = fields.label[0];
    const BDContent = await prisma.content.findUnique({
      where: { label },
    });

    if (!BDContent) {
      if (!fileInfo)
        return res.status(400).send({ message: 'Image is missing' });
      else
        content = await prisma.content.create({
          data: {
            label,
            title: fields.title[0],
            text: fields.text[0],
            filename: `${file.newFilename}.${fileInfo.format}`,
          },
        });
    } else {
      let filename = undefined;
      if (fileInfo) {
        filename = `${file.newFilename}.${fileInfo.format}`;
        deleteFile(join(`${dir}`, `${BDContent.filename}`));
      }

      content = await prisma.content.update({
        where: {
          label,
        },
        data: {
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
