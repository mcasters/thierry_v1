import React, { useEffect, useState } from 'react';
import Image from 'next/legacy/image';
import { FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';

import { FileUploader } from '@/components/admin/form/imageForm/FileUploader';
import s from '@/components/admin/form.module.css';
import { ContentImage, PostImage, Image as IImage } from '.prisma/client';

type Props = {
  images?: ContentImage[] | PostImage[] | IImage[];
  setHasImages?: (arg0: boolean) => void;
  setHasNewImages?: (arg0: boolean) => void;
  reset?: number;
  pathImage: string;
  apiForDelete?: string;
  isMultiple: boolean;
  title?: string;
};

export default function ImagesForm({
  images,
  setHasImages,
  setHasNewImages,
  reset,
  pathImage,
  apiForDelete,
  isMultiple,
  title,
}: Props) {
  const [newImages, setNewImages] = useState<string[]>([]);
  const [existantImages, setExistantImages] = useState<string[]>(() => {
    return !images ||
      images.length === 0 ||
      images[0] === undefined ||
      images[0] === null
      ? []
      : images.map((image) => image.filename);
  });

  useEffect(() => {
    if (setHasImages !== undefined)
      setHasImages(newImages.length > 0 || existantImages.length > 0);
    if (setHasNewImages !== undefined) setHasNewImages(newImages.length > 0);
  }, [newImages, existantImages, setHasImages, setHasNewImages]);

  useEffect(() => {
    if (reset !== undefined) setNewImages([]);
  }, [reset]);

  const handleDelete = (filename: string) => {
    if (apiForDelete && confirm('Sûr de vouloir supprimer ?')) {
      fetch(`${apiForDelete}/${filename}`).then((res) => {
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
      const files = Array.from(filesUploaded);

      const newFiles: string[] = [];
      files.forEach((file) => {
        newFiles.push(URL.createObjectURL(file));
      });
      setNewImages(newFiles);
    }
  };

  return (
    <div className={s.imageFormContainer}>
      <h4 className={s.imageTitle}>
        {title !== undefined ? title : isMultiple ? 'Images :' : 'Image :'}
      </h4>
      <div>
        {existantImages.length > 0 &&
          existantImages.map((filename) => (
            <div key={filename} className={s.imageWrapper}>
              <div className={s.imageContainer}>
                <img
                  src={`${pathImage}/${filename}`}
                  alt="image"
                  sizes="150px"
                  className={s.image}
                />
              </div>
              {apiForDelete && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(filename);
                  }}
                  className="iconButton"
                  aria-label="Supprimer"
                >
                  <FiTrash2 />
                </button>
              )}
            </div>
          ))}
      </div>
      <FileUploader
        name={isMultiple ? 'files' : 'file'}
        handleFiles={getAlbumPreview}
        isMultiple={isMultiple}
      />
      <div>
        {newImages.length > 0 &&
          newImages.map((src) => (
            <div key={src} className={s.imageWrapper}>
              <div key={src} className={s.imageContainer}>
                <Image
                  src={src}
                  alt="image"
                  layout="fill"
                  sizes="150px"
                  className={s.image}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
