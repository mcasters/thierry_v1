'use client';

import { Label } from '@prisma/client';
import Layout from '@/components/layout-components/Layout';
import Slideshow from '@/components/image/slideshow';
import { ContentFull } from '@/interfaces';

export type Props = {
  contents?: ContentFull[];
};

export default function HomePage({ contents }: Props) {
  let intro, sliderImages;
  contents?.forEach((content) => {
    if (content.label === Label.INTRO) intro = content.text;
    if (content.label === Label.SLIDER) sliderImages = content.images;
  });
  return (
    <Layout introduction={intro}>
      {sliderImages && <Slideshow images={sliderImages} />}
    </Layout>
  );
}
