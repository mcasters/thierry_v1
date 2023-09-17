import { getServerSession } from 'next-auth/next';

import prisma from '@/lib/prisma';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function handler(req, res) {
  // @ts-ignore
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    const paintings = await prisma.painting.findMany({
      include: {
        image: {
          select: {
            filename: true,
            height: true,
            width: true,
          },
        },
      },
    });
    return paintings
      ? res.status(200).json(paintings)
      : res.status(404).json({ message: `No painting found.` });
  } else {
    return res.status(401).send({ message: 'Unauthorized' });
  }
}
