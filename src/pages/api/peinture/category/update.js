import { getServerSession } from 'next-auth/next';
import formidable from 'formidable';
import prisma from '../../../../lib/prisma';
import { authOptions } from '../../auth/[...nextauth]';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    let fields;
    const form = formidable();

    try {
      [fields] = await form.parse(req);
    } catch (err) {
      console.log(err);
      return res.status(400).send({ message: 'error' });
    }

    const id = Number(fields.id);
    const updatedPaint = await prisma.categoryPainting.update({
      where: { id },
      data: {
        value: fields.text[0],
      },
    });

    return updatedPaint
      ? res.status(200).send({ message: 'ok' })
      : res.status(404).send({ message: 'Update error' });
  } else {
    return res.status(401).send({ message: 'Unauthorized' });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
