import { GetServerSideProps } from 'next';
import { Label } from '@prisma/client';

import Layout from '@/components/layout-components/Layout';
import prisma from '@/lib/prisma';
import { Image, Content } from '@/interfaces';
import Slideshow from '@/components/image/slideshow';
import s from '@/styles/Home.module.css';

export type Props = {
  content?: Content[];
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await prisma.content.findMany({
    include: {
      images: {
        select: {
          filename: true,
          height: true,
          width: true,
        },
      },
    },
  });
  const contents = JSON.parse(JSON.stringify(res));
  return {
    props: {
      contents,
    },
  };
};

export default function Index({ contents }: Props) {
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
