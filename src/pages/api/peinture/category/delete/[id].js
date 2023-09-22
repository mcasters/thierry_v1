import { getServerSession } from 'next-auth/next';
import prisma from '../../../../../lib/prisma';
import { authOptions } from '../../../auth/[...nextauth]';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const id = Number(req.query.id);

    let paintingDeleted = null;
    const category = await prisma.categoryPainting.findUnique({
      where: { id },
      include: {
        paintings: true,
      },
    });

    console.log(category);
    if (category) {
      if (category.paintings.length > 0)
        return res
          .status(404)
          .send({ error: "Impossible d'effacer, Catégorie utilisée" });
      paintingDeleted = await prisma.categoryPainting.delete({
        where: { id },
      });
    }
    return paintingDeleted
      ? res.status(200).send({ message: 'ok' })
      : res.status(404).send({ error: 'Delete error' });
  } else {
    return res.status(401).send({ error: 'Unauthorized' });
  }
}
