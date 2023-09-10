import React, { useState } from 'react';
import Image from 'next/image';
import { FiTrash2 } from 'react-icons/fi';

import { Item, Post } from '@/interfaces';
import { getPath } from '@/utils/common';
import s from '@/components/admin/form/form.module.css';

type Props = {
  item: Item | null;
};

export default function MultipleImagesForm({ item }: Props) {
  const [newAlbum, setNewAlbum] = useState<string[]>([]);
  const [existantAlbum, setExistantAlbum] = useState<string[]>(() => {
    return item && item.images
      ? item.images.map((image) => image.filename)
      : [];
  });
  const path = item !== null ? `/images/${item.type}` : undefined;

  const deleteAlbumFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { filename } = e.currentTarget.dataset;
    const tab = existantAlbum.filter((f) => {
      return f !== filename;
    });
    setExistantAlbum(tab);
  };

  const getAlbumPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const albumFiles = Array.from(e.target.files);

      if (albumFiles.length) {
        const newAlbumSrc: string[] = [];
        albumFiles.forEach((file) => {
          newAlbumSrc.push(URL.createObjectURL(file));
        });
        setNewAlbum(newAlbumSrc);
      }
    }
  };

  return (
    <>
      <h4 className={s.separate}>Images :</h4>
      {existantAlbum.length > 0 &&
        existantAlbum.map((filename) => (
          <div key={filename} className={s.imageContainer}>
            <Image
              src={`${path}/${filename}`}
              alt="image"
              width={100}
              height={100}
            />
            <button
              onClick={deleteAlbumFile}
              data-filename={filename}
              className={s.trash}
            >
              <FiTrash2 />
            </button>
          </div>
        ))}
      <input type="hidden" name="existentFiles" value={existantAlbum} />
      <input type="file" name="files" onChange={getAlbumPreview} multiple />
      {newAlbum.length > 0 &&
        newAlbum.map((src) => (
          <Image key={src} src={src} alt="image" width={100} height={100} />
        ))}
    </>
  );
}
