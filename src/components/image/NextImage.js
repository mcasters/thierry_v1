"use client";

import Image from "next/image";

export default function NextJsImage({ slide, offset, rect }) {
  const width = Math.round(
    Math.min(rect.width, (rect.height / slide.height) * slide.width),
  );
  const height = Math.round(
    Math.min(rect.height, (rect.width / slide.width) * slide.height),
  );

  return (
    <div style={{ position: "relative", width, height }}>
      <Image
        fill
        alt=""
        src={slide}
        loading="eager"
        draggable={false}
        style={{
          objectFit: "contain",
        }}
        unoptimized
      />
    </div>
  );
}
