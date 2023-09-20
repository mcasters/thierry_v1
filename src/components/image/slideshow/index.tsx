import Lightbox from 'yet-another-react-lightbox';
import Inline from 'yet-another-react-lightbox/plugins/inline';
import 'yet-another-react-lightbox/styles.css';

import { Image as IImage } from '@/interfaces';
import { getSrcMisc } from '@/utils/common';

type Props = {
  images: IImage[];
};

const imageSizes = [16, 32, 48, 64, 96, 128, 256, 384];
const deviceSizes = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

const nextImageUrl = (src: string, size: number) =>
  `/_next/image?url=${encodeURIComponent(src)}&w=${size}&q=75`;

export default function Slideshow({ images }: Props) {
  const slides = images.map(({ filename, width, height }) => ({
    width,
    height,
    src: nextImageUrl(getSrcMisc(filename), width),
    srcSet: imageSizes
      .concat(...deviceSizes)
      .filter((size) => size <= width)
      .map((size) => ({
        src: nextImageUrl(getSrcMisc(filename), size),
        width: size,
        height: Math.round((height / width) * size),
      })),
  }));

  return (
    <Lightbox
      slides={slides}
      plugins={[Inline]}
      inline={{
        style: {
          width: '100%',
          maxWidth: '2000px',
          aspectRatio: '3 / 2',
          margin: '0 auto',
        },
      }}
      carousel={{
        spacing: 0,
        padding: 0,
        imageFit: 'cover',
      }}
    />
  );
}
