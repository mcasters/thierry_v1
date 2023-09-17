import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

import prisma from '@/lib/prisma';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { deleteFile, getMiscellaneousDir } from '@/utils/server';
import { join } from 'path';
import { Label } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // @ts-ignore
  const session = await getServerSession(req, res, authOptions);

  if (!session) return res.status(401).send({ message: 'Unauthorized' });

  const { label } = req.query;

  if (req.method === 'DELETE') {
    if (label !== Label.INTRO) {
      const dir = getMiscellaneousDir();
      const BDContent = await prisma.content.findUnique({
        where: { label: Label[label as keyof typeof Label] },
      });
      if (!BDContent)
        return res.status(404).send({ message: 'Content not found' });
      deleteFile(join(`${dir}`, `${BDContent.filename}`));
    }
    const content = await prisma.content.delete({
      where: { label: Label[label as keyof typeof Label] },
    });

    return content
      ? res.status(200).send('Content deleted')
      : res.status(404).json({ message: 'Error' });
  } else {
    const content = await prisma.content.findFirst({
      where: {
        label: Label[label as keyof typeof Label],
      },
    });

    return content || content === null
      ? res.status(200).json(content)
      : res.status(404).json({ message: 'Error' });
  }
}
