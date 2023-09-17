import { join } from 'path';
import { getServerSession } from 'next-auth/next';
import formidable from 'formidable';

import {
  createDirIfNecessary,
  deleteFile,
  getMiscellaneousDir,
  resizeAndSaveImage,
} from '../../../../utils/server';
import prisma from '../../../../lib/prisma';
import { authOptions } from '../../auth/[...nextauth]';
import { Label } from '@prisma/client';

export default async function handler(req, res) {
  // @ts-ignore
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    const dir = getMiscellaneousDir();
    createDirIfNecessary(dir);

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
      return res.status(400).send({ message: 'Error parsing form' });
    }

    let content;
    let fileInfo = undefined;
    const file = files.file?.[0];
    if (file && file.size !== 0) fileInfo = await resizeAndSaveImage(file, dir);

    const label = fields.label[0];

    const BDContent = await prisma.content.findUnique({
      where: { label },
    });

    if (!BDContent) {
      let filename, title;
      if (fileInfo && file !== undefined) {
        filename = `${file.newFilename}.${fileInfo.format}`;
        title = fields.title[0];
      } else if (label === Label.INTRO) {
        filename = '';
        title = '';
      } else {
        return res.status(400).send({ message: 'Image is missing' });
      }
      content = await prisma.content.create({
        data: {
          label,
          title,
          text: fields.text[0],
          filename,
        },
      });
    } else {
      let filename = undefined;
      let title;
      if (fileInfo && file !== undefined) {
        filename = `${file.newFilename}.${fileInfo.format}`;
        deleteFile(join(`${dir}`, `${BDContent.filename}`));
      }

      if (label === Label.INTRO) {
        filename = '';
        title = '';
      } else {
        title = fields.title[0];
      }

      content = await prisma.content.update({
        where: {
          label,
        },
        data: {
          title,
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
