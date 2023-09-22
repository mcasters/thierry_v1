import { getServerSession } from 'next-auth/next';

import prisma from '../../../../lib/prisma';
import { authOptions } from '../../auth/[...nextauth]';
import { deleteFile, getMiscellaneousDir } from '../../../../utils/server';
import { join } from 'path';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const { filename } = req.query;

    let imageDBDeleted = null;
    const dir = getMiscellaneousDir();

    if (deleteFile(join(`${dir}`, `${filename}`))) {
      imageDBDeleted = await prisma.contentImage.delete({
        where: { filename },
      });
    }
    return imageDBDeleted
      ? res.status(200).send({ message: 'ok' })
      : res.status(404).send({ error: 'Delete error' });
  } else {
    return res.status(401).send({ error: 'Unauthorized' });
  }
}
