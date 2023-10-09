import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Image from 'next/image';
import { TYPE } from '@/constants';

import s from './lightbox.module.css';
import { PostImage, Image as IImage } from '.prisma/client';

type Props = {
  images: IImage[] | PostImage[];
  type: string;
  alt: string;
  maxHeight?: number;
  isCentred?: boolean;
};

const deviceSizes = [3840, 2048, 1920, 1200, 1080, 750, 640];

const nextImageUrl = (src: string, size: number) =>
  `/_next/image?url=${encodeURIComponent(src)}&w=${size}&q=75`;

export default function ImageLightbox({
  images,
  type,
  alt,
  maxHeight,
  isCentred,
}: Props) {
  const [open, setOpen] = useState(false);
  const slides = images.map((image) => ({
    width: image.width,
    height: image.height,
    src: nextImageUrl(`/images/${type}/${image.filename}`, image.width),
    srcSet: deviceSizes
      .filter((size) => size <= image.width)
      .map((size) => ({
        src: nextImageUrl(`/images/${type}/${image.filename}`, size),
        width: size,
        height: Math.round((image.height / image.width) * size),
      })),
  }));

  if (type === TYPE.PAINTING || images.length === 1) {
    return (
      <div className={isCentred ? s.buttonCentred : undefined}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={s.imageButton}
          style={maxHeight ? { height: `${maxHeight}vh` } : { height: '50vh' }}
        >
          <Image
            src={`/images/${type}/${images[0].filename}`}
            layout="fill"
            alt={alt}
            sizes="(min-width: 765px) 100vw,50vw"
            className={s.image}
          />
        </button>
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={slides}
          controller={{
            closeOnPullDown: true,
            closeOnBackdropClick: true,
          }}
          render={{
            buttonPrev: () => null,
            buttonNext: () => null,
          }}
        />
      </div>
    );
  } else {
    return (
      <>
        <div className={s.sculptureButtonWrapper}>
          {images.map((image) => {
            return (
              <button
                key={image.filename}
                type="button"
                onClick={() => setOpen(true)}
                className={s.imageButton}
                style={
                  maxHeight ? { height: `${maxHeight}vh` } : { height: '50vh' }
                }
              >
                <Image
                  src={`/images/${type}/${image.filename}`}
                  alt={alt}
                  layout="fill"
                  sizes="(min-width: 765px) 100vw,50vw"
                  className={s.image}
                />
              </button>
            );
          })}
        </div>

        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={slides}
          controller={{
            closeOnPullDown: true,
            closeOnBackdropClick: true,
          }}
        />
      </>
    );
  }
}
