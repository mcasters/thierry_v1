'use client';

import s from '@/components/image/slideshow/slideshow.module.css';

const deviceSizes = [3840, 2048, 1920, 1200, 1080, 750, 640];

type Props = {
  src: string;
  width: number;
  height: number;
  rectWidth: number;
  rectHeight: number;
};

const imageApi = (src: string, size: number) =>
  `api/image?url=${encodeURIComponent(src)}&w=${size}&q=75`;

export default function ImageOptimized({
  src,
  width,
  height,
  rectWidth,
  rectHeight,
}: Props) {
  const getSrcSet = () => {
    let string: string = '';
    deviceSizes
      .filter((size) => size <= width)
      .forEach((size) => {
        if (string.endsWith('w')) string += ', ';
        string += `${imageApi(src, size)} ${size}w`;
      });
    return string;
  };
  return (
    <div style={{ position: 'relative', width: rectWidth, height: rectHeight }}>
      <img
        alt=""
        loading="eager"
        draggable={false}
        src={src}
        srcSet={getSrcSet()}
        className={s.image}
      />
    </div>
  );
}
