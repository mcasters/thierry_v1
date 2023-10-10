import { NextResponse, NextRequest } from 'next/server';
import { join } from 'path';
import { getOptimizedImage } from '@/utils/serverUtils';
const serverLibraryPath = process.env.PHOTOS_PATH;

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const filename = searchParams.get('filename');
    const width = searchParams.get('w');

    const path = join(`${serverLibraryPath}`, 'sculpture', `${filename}`);

    const optimizedImage = await getOptimizedImage(path, width);

    return new Response(optimizedImage, {
      status: 200,
      headers: { 'Content-Type': 'image/webp' },
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: 'Error' }, { status: 404 });
  }
}
