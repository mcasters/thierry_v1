import { NextResponse, NextRequest } from 'next/server';
import { imageOptimizer } from './optimizer-image';
import sharp from 'sharp';
import { unlinkSync } from 'fs';
import { join } from 'path';
const serverLibraryPath = process.env.PHOTOS_PATH;

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const href = searchParams.get('url');
    const width = searchParams.get('w');
    const quality = searchParams.get('q');

    console.log(href);
    //const buffer = Buffer.from(await file.arrayBuffer());
    // const sharpStream = sharp({ failOn: 'none' });

    if (href && width) {
      const image = join(`${serverLibraryPath}`, `${href.slice(8)}`);
      let imageOptimized: string = '';
      let dataImage;

      await sharp(image, {
        sequentialRead: true,
      })
        .rotate()
        .resize(parseInt(width), undefined, {
          withoutEnlargement: true,
        })
        .toBuffer()
        .then((data) => {
          dataImage = data;
          imageOptimized = `data:image/webp;base64,${data.toString('base64')}`;
        })
        .catch((err) => NextResponse.json({ error: 'Error' }, { status: 404 }));

      if (imageOptimized)
        return new Response(dataImage, {
          status: 200,
          headers: { 'Content-Type': 'image/webp' },
        });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: 'Error' }, { status: 404 });
  }
}
