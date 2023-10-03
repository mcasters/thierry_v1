import Image from 'next/legacy/image';
import React from 'react';
import { getContentsFull } from '@/app/api/content/getContents';
import {
  getDemarche,
  getInspiration,
  getPresentationContent,
} from '@/utils/common';
import s from '@/styles/presentation.module.css';

export default async function Presentation() {
  const contents = await getContentsFull();
  const presentation = getPresentationContent(contents);
  const demarche = getDemarche(contents);
  const inspiration = getInspiration(contents);

  return (
    <div className={s.presentationContainer}>
      <h1 className={s.title}>Présentation</h1>

      <div className={s.contentWrapper}>
        {presentation?.images.length > 0 && (
          <div className={s.imageContainer}>
            <Image
              src={`/images/miscellaneous/${presentation.images[0].filename}`}
              alt="image"
              layout="fill"
              sizes="200px"
              className={s.image}
            />
          </div>
        )}
        <p>{presentation?.text}</p>
      </div>

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
