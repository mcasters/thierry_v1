'use client';

import Slideshow from '@/components/image/slideshow';
import { Image } from '.prisma/client';

export type Props = {
  images?: Image[];
};

export default function HomePage({ images }: Props) {
  return <>{images && <Slideshow images={images} />}</>;
}
