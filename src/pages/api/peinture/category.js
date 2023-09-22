import { getServerSession } from 'next-auth/next';

import prisma from '../../../lib/prisma';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    const categories = await prisma.categorySculpture.findMany();
    return categories
      ? res.status(200).json(categories)
      : res.status(404).json({ message: `No painting found.` });
  } else {
    return res.status(401).send({ message: 'Unauthorized' });
  }
}
