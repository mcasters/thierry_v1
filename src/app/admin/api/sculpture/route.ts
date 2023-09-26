import { NextResponse } from 'next/server';
import { getSculpturesFull } from '@/app/api/sculpture/getSculptures';

export async function GET() {
  const res = await getSculpturesFull();

  //const data = await res.json();
  // await JSON.parse(JSON.stringify(res))
  return NextResponse.json({ res });
}
