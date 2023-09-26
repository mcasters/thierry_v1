import formidable from 'formidable';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

import { authOptions } from '../../../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (session) {
    try {
      let fields;
      const form = formidable();
      [fields] = await form.parse(req);

      const newCategory = await prisma.PaintingCategory.create({
        data: {
          value: fields.text[0],
        },
      });
      return NextResponse.json({ message: 'ok' }, { status: 200 });
    } catch (e) {
      console.log(e);
      return NextResponse.json({ error: 'Error' }, { status: 404 });
    }
  } else {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
