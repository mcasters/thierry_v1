import React, { useRef, useState } from 'react';
import Image from 'next/image';

import { Image as IImage } from '@/interfaces';
import s from '@/components/admin/form/form.module.css';
import { FileUploader } from '@/components/admin/form/imageForm/FileUploader';
import toast from 'react-hot-toast';
import { Label } from '@prisma/client';
import { FiTrash2 } from 'react-icons/fi';

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

  const handleDelete = (filename) => {
    if (confirm('Sûr de vouloir supprimer ?')) {
      fetch(`/api/home/delete-image-slider/${filename}`).then((res) => {
        if (res.ok) {
          const tab = existantImages.filter((f) => {
            return f !== filename;
          });
          setExistantImages(tab);
          toast('Image supprimée');
        } else toast('Erreur à la suppression');
      });
    }
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
    <>
      <div className={s.imagesContainer}>
        {existantImages.length > 0 &&
          existantImages.map((filename) => (
            <div key={filename} className={s.imageButtonWrapper}>
              <div className={s.imageContainer}>
                <Image
                  src={`${dir}/${filename}`}
                  alt="image"
                  layout="fill"
                  sizes="150px"
                  className={s.image}
                />
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete(filename);
                }}
                className={s.iconButton}
                aria-label="Supprimer"
              >
                <FiTrash2 />
              </button>
            </div>
          ))}
      </div>
      <FileUploader
        name="files"
        handleFiles={getAlbumPreview}
        isMultiple={isMultiple}
      />
      <div className={s.imagesContainer}>
        {newImages.length > 0 &&
          newImages.map((src) => (
            <div key={src} className={s.newImagesContainer}>
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
    </>
  );
}
