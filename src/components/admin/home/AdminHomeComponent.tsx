import { Label } from '@prisma/client';

import { Content } from '@/interfaces';
import Image from 'next/image';
import React from 'react';
import UpdateHomeButton from '@/components/admin/form/UpdateHomeButton';
import DeleteHomeButton from '@/components/admin/form/DeleteHomeButton';
import s from './AdminHomeComponent.module.css';

interface Props {
  content?: Content;
  label: Label;
}
export default function AdminHomeComponent({ content, label }: Props) {
  return (
    <>
      <div className={s.adminHomeContainer}>
        <h2>{label}</h2>
        {!content ? (
          <p>Aucun contenu</p>
        ) : (
          <>
            {label === Label.INTRO && (
              <>
                <h4>Texte :</h4>
                <p>{content.text}</p>
              </>
            )}
            {label === Label.SLIDER && (
              <>
                <h4>Images :</h4>
                <div className={s.imagesContainer}>
                  {content.images.map((image) => {
                    return (
                      <div className={s.imageContainer}>
                        <Image
                          key={image.filename}
                          src={`/images/miscellaneous/${image.filename}`}
                          alt="image"
                          layout="fill"
                          sizes="200px"
                          className={s.image}
                        />
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </>
        )}
        <UpdateHomeButton
          content={content}
          label={label}
          buttonText={content ? 'Modifier' : 'Ajouter'}
        />
        <DeleteHomeButton label={label} disabled={!content} />
      </div>
      <div className="separate"></div>
    </>
  );
}
