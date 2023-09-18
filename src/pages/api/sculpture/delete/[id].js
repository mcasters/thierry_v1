import { getServerSession } from 'next-auth/next';
import prisma from '../../../../lib/prisma';
import { authOptions } from '../../auth/[...nextauth]';
import {
  deleteAllFiles,
  deleteFile,
  getSculptureDir,
  getSculptureImagePaths,
} from '../../../../utils/server';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const id = Number(req.query.id);

    let sculptureDeleted = null;
    const sculpture = await prisma.sculpture.findUnique({
      where: { id },
      include: {
        images: {
          select: {
            filename: true,
          },
        },
      },
    });

    if (sculpture) {
      const imagesToDelete = getSculptureImagePaths(sculpture);
      imagesToDelete.forEach((path) => {
        deleteFile(path);
      });

      sculptureDeleted = await prisma.sculpture.delete({
        where: { id },
      });
    }
    return sculptureDeleted
      ? res.status(200).send({ message: 'ok' })
      : res.status(404).send({ error: 'Delete error' });
  } else {
    return res.status(401).send({ error: 'Unauthorized' });
  }
}
