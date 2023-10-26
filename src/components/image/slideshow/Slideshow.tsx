"use client";

import Lightbox from "yet-another-react-lightbox";
import Inline from "yet-another-react-lightbox/plugins/inline";
import "yet-another-react-lightbox/styles.css";

import { getSrcMisc } from "@/utils/commonUtils";
import NextJsImage from "@/components/image/slideshow/NextJsImage";
import { ContentImage } from ".prisma/client";

type Props = {
  images: ContentImage[];
};

export default function Slideshow({ images }: Props) {
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
          width: "100%",
          maxWidth: "2000px",
          height: "140vh",
          margin: "0 auto",
        },
      }}
      carousel={{
        spacing: 0,
        padding: 0,
      }}
    />
  );
}
