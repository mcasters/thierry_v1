import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Image from 'next/image';
import { TYPE } from '@/constants';

import { Image as IImage } from '@/interfaces';
import s from './lightbox.module.css';
import { getSrc } from '@/utils/common';

type Props = {
  images: IImage[];
  type: string;
  alt: string;
};

const imageSizes = [16, 32, 48, 64, 96, 128, 256, 384];
const deviceSizes = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

const nextImageUrl = (src: string, size: number) =>
  `/_next/image?url=${encodeURIComponent(src)}&w=${size}&q=75`;

export default function ImageWithLightbox({ images, type, alt }: Props) {
  const [open, setOpen] = useState(false);
  const slides = images.map(({ filename, width, height }) => ({
    width,
    height,
    src: nextImageUrl(getSrc(type, filename), width),
    srcSet: imageSizes
      .concat(...deviceSizes)
      .filter((size) => size <= width)
      .map((size) => ({
        src: nextImageUrl(getSrc(type, filename), size),
        width: size,
        height: Math.round((height / width) * size),
      })),
  }));

  if (type === TYPE.PAINTING || images.length === 1) {
    return (
      <>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={s.imageButton}
        >
          <Image
            src={`/images/${type}/${images[0].filename}`}
            alt={alt}
            layout="fill"
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
      </>
    );
  } else {
    return (
      <>
        <div className={s.buttonWrapper}>
          {images.map((image) => {
            return (
              <button
                key={image.filename}
                type="button"
                onClick={() => setOpen(true)}
                className={s.imageButton}
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
