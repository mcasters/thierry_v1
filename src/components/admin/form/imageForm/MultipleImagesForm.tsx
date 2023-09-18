import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { Item } from '@/interfaces';
import s from '@/components/admin/form/form.module.css';
import { FileUploader } from '@/components/admin/form/FileUploader';

type Props = {
  item?: Item;
  setHasImage: (arg0: boolean) => void;
  reset: number;
};

export default function MultipleImagesForm({
  item,
  setHasImage,
  reset,
}: Props) {
  const [newAlbum, setNewAlbum] = useState<string[]>([]);
  const [existantAlbum, setExistantAlbum] = useState<string[]>(() => {
    return item ? item.images.map((image) => image.filename) : [];
  });
  const path = item !== null ? `/images/${item?.type}` : undefined;

  useEffect(() => {
    setHasImage(newAlbum.length > 0 || existantAlbum.length > 0);
  }, [newAlbum, existantAlbum, setHasImage]);

  useEffect(() => {
    setNewAlbum([]);
  }, [reset]);

  const deleteAlbumFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { filename } = e.currentTarget.dataset;
    const tab = existantAlbum.filter((f) => {
      return f !== filename;
    });
    setExistantAlbum(tab);
  };

  const getAlbumPreview = (filesUploaded: FileList) => {
    if (filesUploaded?.length > 0) {
      const albumFiles = Array.from(filesUploaded);

      const newAlbumSrc: string[] = [];
      albumFiles.forEach((file) => {
        newAlbumSrc.push(URL.createObjectURL(file));
      });
      setNewAlbum(newAlbumSrc);
    }
  };

  return (
    <div className={s.imageFormContainer}>
      <h4>Images :</h4>
      {existantAlbum.length > 0 &&
        existantAlbum.map((filename) => (
          <div key={filename} className={s.imageContainer}>
            <Image
              src={`${path}/${filename}`}
              alt="image"
              layout="fill"
              sizes="150px"
              className={s.image}
            />
          </div>
        ))}
      <input type="hidden" name="existentFiles" value={existantAlbum} />
      <FileUploader
        name="files"
        handleFiles={getAlbumPreview}
        isMultiple={true}
      />
      {newAlbum.length > 0 &&
        newAlbum.map((src) => (
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
    </div>
  );
}
