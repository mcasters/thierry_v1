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
    let fields;
    const form = formidable();
    try {
      [fields] = await form.parse(req);
    } catch (err) {
      return res.status(400).send({ message: 'error parsing form' });
    }

    const newCategory = await prisma.categoryPainting.create({
      data: {
        value: fields.text[0],
      },
    });

    return newCategory
      ? res.status(200).send({ message: 'ok' })
      : res.status(404).send({ message: 'Error' });
  } else {
    return res.status(401).send({ message: 'Unauthorized' });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
