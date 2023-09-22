import { getServerSession } from 'next-auth/next';

import { authOptions } from '../auth/[...nextauth]';
import { getContentFull } from '../../../interfaces';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    const contents = await getContentFull();
    return contents
      ? res.status(200).json(contents)
      : res.status(404).json({ message: `No content found.` });
  } else {
    return res.status(401).send({ message: 'Unauthorized' });
  }
}
