import { Label } from '@prisma/client';

import Image from 'next/legacy/image';
import React from 'react';
import s from '@/styles/presentation.module.css';
import { getContentFullByLabel } from '@/app/api/content/getContents';

export default async function Presentation() {
  const presentation = await getContentFullByLabel(Label.PRESENTATION);
  const demarche = await getContentFullByLabel(Label.DEMARCHE);
  const inspiration = await await getContentFullByLabel(Label.INSPIRATION);

  return (
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
  );
}
