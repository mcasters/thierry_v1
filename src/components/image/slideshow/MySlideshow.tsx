'use client';

import Lightbox from 'yet-another-react-lightbox';
import Inline from 'yet-another-react-lightbox/plugins/inline';
import 'yet-another-react-lightbox/styles.css';

import { Image } from '@/interfaces';
import { getSrcMisc } from '@/utils/common';
import NextJsImage from '@/components/image/slideshow/NextJsImage';

type Props = {
  images: Image[];
};

export default function MySlideshow({ images }: Props) {
  const slides = images.map(({ filename, width, height }) => ({
    src: getSrcMisc(filename),
    width,
    height,
  }));

  return (
    <Lightbox
      slides={slides}
      render={{ slide: NextJsImage }}
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