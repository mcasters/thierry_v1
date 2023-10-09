import Image from 'next/image';
import type { Slide, ContainerRect } from 'yet-another-react-lightbox';
import s from './slideshow.module.css';

type Props = {
  slide: Slide;
  rect: ContainerRect;
};

export default function NextJsImage({ slide, rect }: Props) {
  const width = rect.width;
  const height = rect.height;

  return (
    <div style={{ position: 'relative', width, height }}>
      <Image
        layout="fill"
        alt=""
        src={slide.src}
        loading="eager"
        draggable={false}
        sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
        className={s.image}
      />
    </div>
  );
}
