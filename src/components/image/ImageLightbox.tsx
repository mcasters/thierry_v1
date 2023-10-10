import { useState } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { TYPE } from '@/constants';

import s from './lightbox.module.css';
import { PostImage, Image as IImage } from '.prisma/client';
import { getSrcItem } from '@/utils/commonUtils';

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

const imageApi = (filename: string, size: number) =>
  `api/image?filename=${encodeURIComponent(filename)}&w=${size}`;

export default function ImageLightbox({
  images,
  type,
  alt,
  maxHeight,
  isCentred,
}: Props) {
  const oneImage = type === TYPE.PAINTING || images.length === 1;
  const [open, setOpen] = useState(false);
  const slides = images.map((image) => ({
    width: image.width,
    height: image.height,
    src: nextImageUrl(`${getSrcItem(type, image.filename)}`, image.width),
    srcSet: deviceSizes
      .filter((size) => size <= image.width)
      .map((size) => ({
        src: nextImageUrl(`${getSrcItem(type, image.filename)}`, size),
        width: size,
        height: Math.round((image.height / image.width) * size),
      })),
  }));

  return (
    <div
      className={
        !oneImage
          ? s.sculptureButtonWrapper
          : isCentred
          ? s.buttonCentred
          : undefined
      }
    >
      {images.map((image) => {
        return (
          <button
            key={image.id}
            type="button"
            onClick={() => setOpen(true)}
            className={s.imageButton}
            style={
              maxHeight ? { height: `${maxHeight}vh` } : { height: '50vh' }
            }
          >
            <Image
              src={`/images/${type}/${image.filename}`}
              layout="fill"
              alt={alt}
              className={s.image}
            />
          </button>
        );
      })}

      {oneImage && (
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
      )}
      {!oneImage && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={slides}
          controller={{
            closeOnPullDown: true,
            closeOnBackdropClick: true,
          }}
        />
      )}
    </div>
  );
}
