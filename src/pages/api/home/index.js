import { getServerSession } from 'next-auth/next';

import prisma from '../../../lib/prisma';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    const contents = await prisma.content.findMany({
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
    return contents
      ? res.status(200).json(contents)
      : res.status(404).json({ message: `No content found.` });
  } else {
    return res.status(401).send({ message: 'Unauthorized' });
  }
}
