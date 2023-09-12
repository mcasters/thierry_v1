import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import type { Image as IImage } from '@/interfaces/index';
import s from './Slider.module.css';
import { TYPE } from '@/constants';

type PostProps = {
  images: IImage[];
  type: string;
  alt: string;
};

export default function Slider({ images, type, alt }: PostProps) {
  const imageTab = images.map((image, _) => {
    return {
      original: `/images/${type}/${image.filename}`,
      originalHeight: Number(image.height),
      originalWidth: Number(image.width),
    };
  });

  return (
    <ImageGallery
      additionalClass={s.gallery}
      items={imageTab}
      showBullets
      autoPlay
      showNav={false}
      showPlayButton={false}
    />
  );
}
