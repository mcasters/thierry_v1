"use client";

import { useState } from "react";
import { PhotoAlbum, RenderPhotoProps } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import { PostImage } from ".prisma/client";
import Image from "next/image";
import { DEVICE } from "@/constants/image";
import s from "@/components/image/lightbox.module.css";

interface Props {
  images: PostImage[];
  type: string;
}

const breakpoints = [3840, 2048, 1920, 1200, 1080, 750, 640];

const nextImageUrl = (src: string, size: number) =>
  `/_next/image?url=${encodeURIComponent(src)}&w=${size}&q=75`;

export default function Gallery({ images, type }: Props) {
  const [index, setIndex] = useState(-1);

  const slides = images.map((image) => {
    const width = image.width;
    const height = image.height;
    return {
      src: `${image.filename}`,
      width,
      height,
      srcSet: breakpoints
        .filter((breakpoint) => breakpoint <= width)
        .map((breakpoint) => ({
          src: nextImageUrl(`/images/${type}/${image.filename}`, breakpoint),
          width: breakpoint,
          height: Math.round((height / width) * breakpoint),
        })),
    };
  });
  return (
    <>
      <PhotoAlbum
        layout="rows"
        photos={slides}
        renderPhoto={({
          photo,
          imageProps: { alt, title, sizes, className, onClick },
          wrapperStyle,
        }: RenderPhotoProps) => {
          return (
            <div style={{ ...wrapperStyle, position: "relative" }}>
              <Image
                fill
                src={photo}
                loader={({ src, width, quality }) => {
                  const directory = width <= DEVICE.SMALL ? "sm/" : "md/";
                  return `/images/${type}/${directory}${src}`;
                }}
                {...{ alt, title, sizes, className, onClick }}
              />
            </div>
          );
        }}
        targetRowHeight={400}
        onClick={({ index: current }) => setIndex(current)}
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
        // styles={{
        //   container: {
        //     padding: "2em",
        //   },
        // }}
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
                padding: "2em",
              }}
              src={slide.src}
              loading="eager"
              draggable={false}
              className={s.image}
              alt="image"
            />
          ),
        }}
      />
    </>
  );
}
