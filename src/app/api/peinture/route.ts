import { NextResponse } from 'next/server';
import { getPaintingsFull } from '@/app/api/peinture/getPaintings';

export async function GET() {
  const res = await getPaintingsFull();
  const data = await res.json();

  return NextResponse.json({ data });
}
