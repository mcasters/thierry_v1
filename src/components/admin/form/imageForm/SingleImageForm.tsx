import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import s from '@/components/admin/form/form.module.css';
import { FileUploader } from '@/components/admin/form/FileUploader';

type Props = {
  existantImageSrc?: string;
  setHasImage: (boolean) => void;
  reset: number;
};

export default function SingleImageForm({
  existantImageSrc,
  setHasImage,
  reset,
}: Props) {
  const [newImage, setNewImage] = useState<string>('');

  useEffect(() => {
    setHasImage(existantImageSrc !== '' || newImage !== '');
  }, [newImage]);

  useEffect(() => {
    setNewImage('');
  }, [reset]);

  const getPreview = (filesUploaded: FileList) => {
    if (filesUploaded?.length) {
      const file = filesUploaded[0];
      if (file) {
        setNewImage(URL.createObjectURL(file));
      }
    }
  };

  return (
    <div className={s.imageFormContainer}>
      {existantImageSrc && (
        <>
          <h4>Image actuelle</h4>
          <div className={s.imageContainer}>
            <Image
              src={`${existantImageSrc}`}
              alt="image"
              layout="fill"
              sizes="150px"
              className={s.image}
            />
          </div>
        </>
      )}
      {newImage !== '' && (
        <>
          <h4>Nouvelle image</h4>
          <div className={s.imageContainer}>
            <Image
              src={newImage}
              alt="image"
              layout="fill"
              sizes="150px"
              className={s.image}
            />
          </div>
        </>
      )}
      <FileUploader name="file" handleFile={getPreview} isMultiple={false} />
    </div>
  );
}
