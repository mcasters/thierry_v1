'use client';

import { ContentImage } from '.prisma/client';
import Slideshow from '@/components/image/slideshow/Slideshow';

export type Props = {
  images?: ContentImage[];
};

export default function HomePage({ images }: Props) {
  return <>{images && <Slideshow images={images} />}</>;
}
