import { Label } from '@prisma/client';

import { Content } from '@/interfaces';
import Image from 'next/image';
import React from 'react';
import UpdateContentButton from '@/components/admin/form/UpdateContentButton';
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
            {label === Label.INTRO && <p>{content.text}</p>}
            {label === Label.SLIDER && (
              <>
                <div>
                  {content.images?.map((image) => {
                    return (
                      <div key={image.filename} className={s.imageContainer}>
                        <Image
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
        <div className={s.controls}>
          <UpdateContentButton
            content={content}
            label={label}
            buttonText={content ? 'Modifier' : 'Ajouter'}
          />
        </div>
      </div>
      <div className="separate"></div>
    </>
  );
}
