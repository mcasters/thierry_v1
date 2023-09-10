import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

import prisma from '@/lib/prisma';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { TYPE } from '@/constants';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
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
        type: TYPE.PAINTING,
      },
    });
    return paintings
      ? res.status(200).json(paintings)
      : res.status(404).json({ message: `No painting found.` });
  } else {
    return res.status(401).send({ message: 'Unauthorized' });
  }
}
