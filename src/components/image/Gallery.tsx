"use client";

import { useState } from "react";
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import Lightbox from "yet-another-react-lightbox";
import { PostImage } from ".prisma/client";
import Image from "next/image";
import { DEVICE, IMAGE_SIZE } from "@/constants/image";

interface Props {
  images: PostImage[];
  alt: string;
}

const breakpoints = [IMAGE_SIZE.MD_PX, IMAGE_SIZE.SM_PX];

export default function Gallery({ images, alt }: Props) {
  const [index, setIndex] = useState(-1);

  const slides = images.map((image) => {
    const width = image.width;
    const height = image.height;
    return {
      src: `/images/post/${image.filename}`,
      width,
      height,
      alt,
      srcSet: breakpoints.map((breakpoint) => ({
        src: `/images/post/${breakpoint === IMAGE_SIZE.MD_PX ? "md" : "sm"}/${image.filename}`,
        width: breakpoint,
        height: Math.round((height / width) * breakpoint),
      })),
    };
  });
  return (
    <>
      <RowsPhotoAlbum
        photos={slides}
        onClick={({ index: current }) => setIndex(current)}
        breakpoints={[IMAGE_SIZE.SM_PX, IMAGE_SIZE.MD_PX]}
      />
      <Lightbox
        index={index}
        slides={slides}
        open={index >= 0}
        close={() => setIndex(-1)}
        controller={{
          closeOnPullDown: true,
          closeOnBackdropClick: true,
        }}
        render={{
          slide: ({ slide, rect }) => (
            <Image
              loader={({ src, width, quality }) => {
                return `${src}`;
              }}
              fill={true}
              sizes="100vw"
              style={{
                objectFit: "contain",
                padding: rect.width <= DEVICE.SMALL ? "1em" : "2em",
              }}
              src={slide.src}
              loading="eager"
              draggable={false}
              alt="image"
            />
          ),
        }}
      />
    </>
  );
}
