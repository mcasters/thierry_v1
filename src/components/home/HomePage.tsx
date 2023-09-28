'use client';

import { Image } from '.prisma/client';
import MySlideshow from '@/components/image/slideshow/MySlideshow';

export type Props = {
  images?: Image[];
};

export default function HomePage({ images }: Props) {
  return <>{images && <MySlideshow images={images} />}</>;
}
