import { getServerSession } from 'next-auth/next';
import prisma from '../../../../lib/prisma';
import { authOptions } from '../../auth/[...nextauth]';
import { deleteAllFiles, getPaintingImagePath } from '../../../../utils/server';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const id = Number(req.query.id);

    let paintingDeleted = null;
    let imageDBDeleted = null;
    const painting = await prisma.painting.findUnique({
      where: { id },
      include: {
        image: {
          select: {
            filename: true,
          },
        },
      },
    });

    if (painting) {
      const imageToDelete = getPaintingImagePath(painting);
      if (deleteAllFiles(imageToDelete)) {
        paintingDeleted = await prisma.painting.delete({
          where: { id },
        });
        const filename = painting.image.filename;
        imageDBDeleted = await prisma.image.delete({
          where: { filename },
        });
      }
    }
    return paintingDeleted && imageDBDeleted
      ? res.status(200).send({ message: 'ok' })
      : res.status(404).send({ error: 'Delete error' });
  } else {
    return res.status(401).send({ error: 'Unauthorized' });
  }
}
