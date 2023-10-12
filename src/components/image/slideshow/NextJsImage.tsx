'use client';

import Image from 'next/image';
import type { Slide, ContainerRect } from 'yet-another-react-lightbox';
import s from './slideshow.module.css';

type Props = {
  slide: Slide;
  rect: ContainerRect;
};

export default function NextJsImage({ slide, rect }: Props) {

  return (
      <Image
          width={rect.width}
          height={rect.height}
          alt=""
          src={slide.src}
        loading="eager"
        draggable={false}
        sizes={`${Math.ceil((rect.width / window.innerWidth) * 100)}vw`}
        className={s.image}
      />
  );
}
