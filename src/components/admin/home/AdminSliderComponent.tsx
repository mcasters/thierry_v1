import { Label } from '@prisma/client';

import { Content } from '@/interfaces';
import Image from 'next/image';
import React from 'react';
import UpdateHomeButton from '@/components/admin/form/UpdateHomeButton';
import DeleteHomeButton from '@/components/admin/form/DeleteHomeButton';
import s from './AdminSliderComponent.module.css';

interface Props {
  content?: Content;
  label: Label;
}
export default function AdminHomeComponent({ content, label }: Props) {
  return (
    <>
      <div className={s.adminHomeContainer}>
        <h2>{label}</h2>
        <UpdateHomeButton
          content={content}
          label={label}
          buttonText={content ? 'Modifier' : 'Ajouter'}
        />
        <DeleteHomeButton label={label} disabled={!content} />
        {!content ? (
          <p>Aucun contenu</p>
        ) : (
          <>
            {label !== Label.INTRO && (
              <>
                <h4>Titre :</h4>
                <p>{content.title}</p>
              </>
            )}
            <h4>Texte :</h4>
            <p>{content.text}</p>
            {label !== Label.INTRO && (
              <>
                <h4>Image :</h4>
                <div className={s.imageContainer}>
                  <Image
                    src={`/images/miscellaneous/${content.filename}`}
                    alt="image"
                    layout="fill"
                    sizes="200px"
                    className={s.image}
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>
      <div className="separate"></div>
    </>
  );
}
