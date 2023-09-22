import { getServerSession } from 'next-auth/next';

import { authOptions } from '../../auth/[...nextauth]';
import { getCategoryPaintingFull } from '../../../../interfaces';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    const categories = await getCategoryPaintingFull();

    return categories
      ? res.status(200).json(categories)
      : res.status(404).json({ message: `No painting found.` });
  } else {
    return res.status(401).send({ message: 'Unauthorized' });
  }
}
