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
    setHasImage(existantImageSrc || newImage !== '');
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
    <>
      <h4 className={s.separate}>Image :</h4>
      {existantImageSrc && (
        <div className={s.imageContainer}>
          <Image
            src={`${existantImageSrc}`}
            alt="image"
            layout="fill"
            sizes="150px"
            className={s.image}
          />
        </div>
      )}
      <input
        type="hidden"
        name="existentFile"
        value={existantImageSrc?.split('/')[existantImageSrc?.length - 1]}
      />
      <FileUploader name="file" handleFile={getPreview} isMultiple={false} />
      {newImage !== '' && (
        <div className={s.imageContainer}>
          <Image
            src={newImage}
            alt="image"
            layout="fill"
            sizes="150px"
            className={s.image}
          />
        </div>
      )}
    </>
  );
}
