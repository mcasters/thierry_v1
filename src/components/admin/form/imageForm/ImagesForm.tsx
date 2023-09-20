import React, { useRef, useState } from 'react';
import Image from 'next/image';

import { Image as IImage } from '@/interfaces';
import s from '@/components/admin/form/form.module.css';
import { FileUploader } from '@/components/admin/form/imageForm/FileUploader';
import toast from 'react-hot-toast';
import { Label } from '@prisma/client';

type Props = {
  images?: IImage[];
  dir: string;
  isMultiple: boolean;
};

export default function ImagesForm({ images, dir, isMultiple }: Props) {
  const [newImages, setNewImages] = useState<string[]>([]);
  const [existantImages, setExistantImages] = useState<string[]>(() => {
    return images ? images.map((image) => image.filename) : [];
  });

  const deleteAlbumFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { filename } = e.currentTarget.dataset;
    const tab = existantImages.filter((f) => {
      return f !== filename;
    });
    setExistantImages(tab);
  };

  const getAlbumPreview = (filesUploaded: FileList) => {
    if (filesUploaded?.length > 0) {
      const albumFiles = Array.from(filesUploaded);

      const newAlbumSrc: string[] = [];
      albumFiles.forEach((file) => {
        newAlbumSrc.push(URL.createObjectURL(file));
      });
      setNewImages(newAlbumSrc);
    }
  };

  return (
    <div className={s.imageFormContainer}>
      <h4>Images :</h4>
      {existantImages.length > 0 &&
        existantImages.map((filename) => (
          <div key={filename} className={s.imageContainer}>
            <Image
              src={`${dir}/${filename}`}
              alt="image"
              layout="fill"
              sizes="150px"
              className={s.image}
            />
          </div>
        ))}
      <input type="hidden" name="existentFiles" value={existantImages} />
      <FileUploader
        name="files"
        handleFiles={getAlbumPreview}
        isMultiple={isMultiple}
      />
      {newImages.length > 0 &&
        newImages.map((src) => (
          <div key={src} className={s.imageContainer}>
            <Image
              src={src}
              alt="image"
              layout="fill"
              sizes="150px"
              className={s.image}
            />
          </div>
        ))}
      <div className="separate"></div>
    </div>
  );
}
