import { getServerSession } from 'next-auth/next';

import { authOptions } from '../auth/[...nextauth]';
import { getPaintingFull } from '../../../interfaces';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    const paintings = await getPaintingFull();
    return paintings
      ? res.status(200).json(paintings)
      : res.status(404).json({ message: `No painting found.` });
  } else {
    return res.status(401).send({ message: 'Unauthorized' });
  }
}
