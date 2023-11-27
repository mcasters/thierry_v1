"use client";

import Image from "next/image";
import type { ContainerRect, Slide } from "yet-another-react-lightbox";
import s from "./slideshow/slideshow.module.css";

type Props = {
  slide: Slide;
  rect: ContainerRect;
};

export default function NextJsImage({ slide, rect }: Props) {
  const width =
    slide.width && slide.height
      ? Math.round(
          Math.min(rect.width, (rect.height / slide.height) * slide.width),
        )
      : rect.width;

  const height =
    slide.width && slide.height
      ? Math.round(
          Math.min(rect.height, (rect.width / slide.width) * slide.height),
        )
      : rect.height;
  return (
    <Image
      width={width}
      height={height}
      alt=""
      src={slide.src}
      loading="eager"
      draggable={false}
      sizes={`${Math.ceil((rect.width / window.innerWidth) * 100)}vw`}
      className={s.image}
    />
  );
}
