import Image from 'next/legacy/image';
import React from 'react';
import { getContentsFull } from '@/app/api/content/getContents';
import { getPresentationContent } from '@/utils/common';
import s from '@/styles/presentation.module.css';

export default async function Presentation() {
  const contents = await getContentsFull();
  const { presentationContent, demarcheContent, inspirationContent } =
    getPresentationContent(contents);

  return (
    <div className={s.presentationContainer}>
      <h1 className={s.title}>Présentation</h1>

      <div className={s.contentWrapper}>
        {presentationContent.images.length > 0 && (
          <div className={s.imageContainer}>
            <Image
              src={`/images/miscellaneous/${presentationContent.images[0].filename}`}
              alt="image"
              layout="fill"
              sizes="200px"
              className={s.image}
            />
          </div>
        )}
        <p>{presentationContent.text}</p>
      </div>

      {demarcheContent.text !== '' && (
        <div className={s.contentWrapper}>
          <h2>Démarche artistique</h2>
          <p>{demarcheContent.text}</p>
        </div>
      )}
      {inspirationContent.text !== '' && (
        <div className={s.contentWrapper}>
          <h2>Inspirations</h2>
          <p>{inspirationContent.text}</p>
        </div>
      )}
    </div>
  );
}
