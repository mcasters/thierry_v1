"use client";

import { useState } from "react";
import Image from "next/image";
import { Lightbox } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { TYPE } from "@/constants";

import s from "./lightbox.module.css";
import { Image as IImage, PostImage } from ".prisma/client";
import { DEVICE } from "@/constants/image";

type Props = {
  images: IImage[] | PostImage[];
  type: string;
  alt: string;
  heightVh?: number;
  isCentred?: boolean;
};

export default function ImageLightbox({
  images,
  type,
  alt,
  heightVh,
  isCentred,
}: Props) {
  const oneImage = type === TYPE.PAINTING || images.length === 1;
  const [open, setOpen] = useState(false);
  const slides = images.map(({ filename, width, height }) => ({
    src: filename,
    width,
    height,
  }));

  return (
    <div
      className={
        !oneImage
          ? s.imageGridContainer
          : isCentred
          ? s.imageCentredContainer
          : undefined
      }
    >
      {images.map((image) => {
        return (
          <button
            key={image.id}
            type="button"
            onClick={() => setOpen(true)}
            className={s.imageWrap}
            style={{
              height: heightVh ? `${heightVh}vh` : "45vh",
              width: "100%",
            }}
          >
            <Image
              loader={({ src, width, quality }) => {
                const directory = width <= DEVICE.SMALL ? "sm/" : "md/";
                return `/images/${type}/${directory}${src}`;
              }}
              src={`${image.filename}`}
              fill={true}
              sizes="(max-width: 768px) 80vw, 50vw"
              style={{
                objectFit: "contain",
              }}
              alt={alt}
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
            slide: ({ slide, rect }) => (
              <Image
                loader={({ src, width, quality }) => {
                  const directory = width <= DEVICE.SMALL ? "md/" : "";
                  return `/images/${type}/${directory}${src}`;
                }}
                fill={true}
                sizes="100vw"
                style={{
                  objectFit: "contain",
                }}
                alt={alt}
                src={slide.src}
                loading="eager"
                draggable={false}
                className={s.image}
              />
            ),
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
          render={{
            slide: ({ slide, rect }) => (
              <Image
                loader={({ src, width, quality }) => {
                  const directory = width <= DEVICE.SMALL ? "md/" : "";
                  return `/images/${type}/${directory}${src}`;
                }}
                fill={true}
                sizes="100vw"
                style={{
                  objectFit: "contain",
                }}
                alt={alt}
                src={slide.src}
                loading="eager"
                draggable={false}
                className={s.image}
              />
            ),
          }}
        />
      )}
    </div>
  );
}
