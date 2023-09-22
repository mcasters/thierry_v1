import { getServerSession } from 'next-auth/next';
import prisma from '../../../../../lib/prisma';
import { authOptions } from '../../../auth/[...nextauth]';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const id = Number(req.query.id);

    let sculptureDeleted = null;
    const category = await prisma.categorySculpture.findUnique({
      where: { id },
      include: {
        sculptures: true,
      },
    });

    if (category) {
      if (category.sculptures.length > 0)
        return res
          .status(404)
          .send({ error: "Impossible d'effacer, Catégorie utilisée" });
      sculptureDeleted = await prisma.categorySculpture.delete({
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
