import { useState } from 'react';
import PhotoAlbum from 'react-photo-album';
import Lightbox from 'yet-another-react-lightbox';
import { PostFull } from '@/app/api/post/post';

interface Props {
  images: PostFull[];
  type: string;
}

const breakpoints = [3840, 2048, 1920, 1200, 1080, 750, 640];

const nextImageUrl = (src: string, size: number) =>
  `/_next/image?url=${encodeURIComponent(src)}&w=${size}&q=75`;

export default function Gallery({ images, type }: Props) {
  const [index, setIndex] = useState(-1);

  const slides = images.map((image) => {
    const width = image.width * 4;
    const height = image.height * 4;
    console.log(`/images/${type}/${image.filename}`);
    return {
      src: nextImageUrl(`/images/${type}/${image.filename}`, width),
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
        targetRowHeight={400}
        onClick={({ index: current }) => setIndex(current)}
      />
      <Lightbox
        index={index}
        slides={slides}
        open={index >= 0}
        close={() => setIndex(-1)}
      />
    </>
  );
}
