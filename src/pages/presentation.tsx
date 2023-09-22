import prisma from '@/lib/prisma';
import { Label } from '@prisma/client';

import Layout from '@/components/layout-components/Layout';
import { ContentFull, getContentFull } from '@/interfaces';
import Image from 'next/image';
import React from 'react';
import s from '@/styles/presentation.module.css';
import { getPresentationContent } from '@/utils/common';

interface Props {
  presentation: ContentFull;
  demarche: ContentFull;
  inspiration: ContentFull;
}

export async function getServerSideProps() {
  const contents = await getContentFull();
  const { presentationContent, demarcheContent, inspirationContent } =
    getPresentationContent(contents);

  return {
    props: {
      presentation: presentationContent,
      demarche: demarcheContent,
      inspiration: inspirationContent,
    },
  };
}
export default function Presentation({
  presentation,
  demarche,
  inspiration,
}: Props) {
  return (
    <Layout>
      <div className={s.presentationContainer}>
        <h1 className={s.title}>Présentation</h1>
        {presentation && (
          <div className={s.contentWrapper}>
            <div key={presentation.id} className={s.imageContainer}>
              <Image
                src={`/images/miscellaneous/${presentation.images[0].filename}`}
                alt="image"
                layout="fill"
                sizes="200px"
                className={s.image}
              />
            </div>
            <p>{presentation.text}</p>
          </div>
        )}
        {demarche && (
          <div className={s.contentWrapper}>
            <h2>Démarche artistique</h2>
            <p>{demarche.text}</p>
          </div>
        )}
        {inspiration && (
          <div className={s.contentWrapper}>
            <h2>Inspirations</h2>
            <p>{inspiration.text}</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
