import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

import prisma from '@/lib/prisma';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // @ts-ignore
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    const { label } = req.query;

    const content = await prisma.content.findFirst({
      where: {
        label,
      },
    });

    return content || content === null
      ? res.status(200).json(content)
      : res.status(404).json({ message: 'Error' });
  } else {
    return res.status(401).send({ message: 'Unauthorized' });
  }
}
