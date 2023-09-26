import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '../../auth/[...nextauth]/route';
import { getPaintingCategoriesFull } from '@/app/api/peinture/category/getCategories';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (session) {
    const res = await getPaintingCategoriesFull();
    return NextResponse.json({ res });
  } else {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}
