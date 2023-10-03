'use client';

import { ContentImage } from '.prisma/client';
import MySlideshow from '@/components/image/slideshow/MySlideshow';

export type Props = {
  images?: ContentImage[];
};

export default function HomePage({ images }: Props) {
  return <>{images && <MySlideshow images={images} />}</>;
}
