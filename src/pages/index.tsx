import { GetServerSideProps } from 'next';

import s from '@/styles/Home.module.css';
import Layout from '../components/layout-components/Layout';
import HomePart from '@/components/home/HomePart';
import HomeContactPart from '@/components/home/HomeContactPart';
import prisma from '@/lib/prisma';
import { Image, Content } from '@/interfaces';
import { Label } from '@prisma/client';
import Slideshow from '@/components/image/slideshow';

export type Props = {
  images: Image[];
  content: Content;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const resImages = await prisma.image.findMany();
  const resContent = await prisma.content.findFirst({
    where: {
      label: Label.INTRO,
    },
  });
  const images = JSON.parse(JSON.stringify(resImages));
  const content = JSON.parse(JSON.stringify(resContent));
  return {
    props: {
      images,
      content,
    },
  };
};

export default function Index({ images, content }: Props) {
  return (
    <Layout introduction={content.text}>
      <Slideshow images={images} />
      <HomeContactPart title="Contact" imageSrc="2.jpeg" />
    </Layout>
  );
}
