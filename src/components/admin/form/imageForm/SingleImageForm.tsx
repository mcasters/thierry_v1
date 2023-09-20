import { useEffect, useState } from 'react';
import Image from 'next/image';

import { FileUploader } from '@/components/admin/form/imageForm/FileUploader';
import { Item } from '@/interfaces';
import s from '@/components/admin/form/form.module.css';

type Props = {
  item?: Item;
  setHasImage: (arg0: boolean) => void;
  reset: number;
};

export default function SingleImageForm({ item, setHasImage, reset }: Props) {
  const [newImage, setNewImage] = useState<string>('');
  let existantImageSrc = undefined;
  if (item) existantImageSrc = `/images/${item.type}/${item.image.filename}`;

  useEffect(() => {
    setHasImage(existantImageSrc !== '' || newImage !== '');
  }, [newImage, existantImageSrc, setHasImage]);

  useEffect(() => {
    setNewImage('');
  }, [reset]);

  const getPreview = (filesUploaded: FileList) => {
    if (filesUploaded?.length > 0) {
      const file = filesUploaded[0];
      if (file) {
        setNewImage(URL.createObjectURL(file));
      }
    }
  };

  return (
    <>
      <h4>Image :</h4>
      <div className={s.imagesContainer}>
        {existantImageSrc && (
          <>
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
      </div>
      <FileUploader name="file" handleFiles={getPreview} isMultiple={false} />
      {newImage !== '' && (
        <div className={s.imagesContainer}>
          <div className={s.imageContainer}>
            <Image
              src={newImage}
              alt="image"
              layout="fill"
              sizes="150px"
              className={s.image}
            />
          </div>
        </div>
      )}
    </>
  );
}
