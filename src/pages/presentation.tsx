import prisma from '@/lib/prisma';
import { Label } from '@prisma/client';

import Layout from '@/components/layout-components/Layout';
import { Content } from '@/interfaces';
import Image from 'next/image';
import React from 'react';
import s from '@/styles/presentation.module.css';

interface Props {
  presentation: Content;
  demarche: Content;
  inspiration: Content;
}

export async function getServerSideProps() {
  const resPresentation = await prisma.content.findFirst({
    where: {
      label: Label.PRESENTATION,
    },
    include: {
      images: {
        select: {
          filename: true,
          width: true,
          height: true,
        },
      },
    },
  });
  const resDemarche = await prisma.content.findFirst({
    where: {
      label: Label.DEMARCHE,
    },
  });
  const resInspiration = await prisma.content.findFirst({
    where: {
      label: Label.INSPIRATION,
    },
  });
  let presentation, demarche, inspiration;
  if (resPresentation !== undefined)
    presentation = JSON.parse(JSON.stringify(resPresentation));
  if (resDemarche !== undefined)
    demarche = JSON.parse(JSON.stringify(resDemarche));
  if (resInspiration !== undefined)
    inspiration = JSON.parse(JSON.stringify(resInspiration));
  return {
    props: {
      presentation: presentation,
      demarche: demarche,
      inspiration: inspiration,
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
