"use client";

import Image from "next/image";
import type { ContainerRect, Slide } from "yet-another-react-lightbox";
import { useLightboxProps, useLightboxState } from "yet-another-react-lightbox";
import { DEVICE } from "@/constants/image";

type Props = {
  slide: Slide;
  rect: ContainerRect;
};

export default function NextJsImage({ slide, offset, rect }) {
  const {
    on: { click },
    carousel: { imageFit },
  } = useLightboxProps();

  const { currentIndex } = useLightboxState();

  const width = Math.round(
    Math.min(rect.width, (rect.height / slide.height) * slide.width),
  );

  const height = Math.round(
    Math.min(rect.height, (rect.width / slide.width) * slide.height),
  );

  return (
    <div style={{ position: "relative", width, height }}>
      <Image
        fill={true}
        sizes="100vw"
        style={{
          objectFit: "contain",
          padding: rect.width <= DEVICE.SMALL ? "1em" : "2em",
        }}
        src={slide}
        loading="eager"
        draggable={false}
        alt={slide.alt}
      />
    </div>
  );
}
