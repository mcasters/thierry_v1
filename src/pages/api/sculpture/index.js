import { getServerSession } from 'next-auth/next';

import prisma from '../../../lib/prisma';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    const sculptures = await prisma.sculpture.findMany({
      include: {
        images: {
          select: {
            filename: true,
            height: true,
            width: true,
          },
        },
      },
    });
    return sculptures
      ? res.status(200).json(sculptures)
      : res.status(404).json({ message: `No sculpture found.` });
  } else {
    return res.status(401).send({ message: 'Unauthorized' });
  }
}
