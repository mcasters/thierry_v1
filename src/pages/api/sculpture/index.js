import { getServerSession } from 'next-auth/next';

import { authOptions } from '../auth/[...nextauth]';
import { getSculptureFull } from '../../../interfaces';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    const sculptures = await getSculptureFull();
    return sculptures
      ? res.status(200).json(sculptures)
      : res.status(404).json({ message: `No sculpture found.` });
  } else {
    return res.status(401).send({ message: 'Unauthorized' });
  }
}
