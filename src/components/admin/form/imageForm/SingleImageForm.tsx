import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { Item } from '@/interfaces';
import s from '@/components/admin/form/form.module.css';
import { FileUploader } from '@/components/admin/form/FileUploader';

type Props = {
  item?: Item;
  setHasImage: (boolean) => void;
  reset: number;
};

export default function SingleImageForm({ item, setHasImage, reset }: Props) {
  const [newImage, setNewImage] = useState<string>('');
  const [existantImage, setExistantImage] = useState<string>(() =>
    item ? item.image.filename : '',
  );
  const path = item ? `/images/${item.type}` : undefined;

  useEffect(() => {
    setHasImage(existantImage !== '' || newImage !== '');
  }, [newImage, existantImage]);

  useEffect(() => {
    setNewImage('');
  }, [reset]);

  const getPreview = (filesUploaded: FileList) => {
    if (filesUploaded?.length) {
      const file = filesUploaded[0];
      if (file) {
        setNewImage(URL.createObjectURL(file));
        setExistantImage('');
      }
    }
  };

  return (
    <>
      <h4 className={s.separate}>Image :</h4>
      {existantImage !== '' && (
        <div className={s.imageContainer}>
          <Image
            src={`${path}/${existantImage}`}
            alt="image"
            layout="fill"
            sizes="150px"
            className={s.image}
          />
        </div>
      )}
      <input type="hidden" name="existentFile" value={existantImage} />
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
