import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { Image as IImage } from '@/interfaces';
import s from '@/components/admin/form/form.module.css';
import { FileUploader } from '@/components/admin/form/imageForm/FileUploader';
import toast from 'react-hot-toast';
import { mutate } from 'swr';
import { FiTrash2 } from 'react-icons/fi';

type Props = {
  Images?: IImage;
  setHasImage?: (arg0: boolean) => void;
  reset?: number;
  pathImage: string;
  apiForDelete?: string;
  apiToUpdate?: string;
};

export default function MultipleImagesForm({
  images,
  setHasImage,
  reset,
  pathImage,
  apiForDelete,
  apiToUpdate,
}: Props) {
  const [newImages, setNewImages] = useState<string[]>([]);
  const [existantImages, setExistantImages] = useState<string[]>(() => {
    return images ? images.map((image) => image.filename) : [];
  });

  useEffect(() => {
    if (setHasImage)
      setHasImage(newImages.length > 0 || existantImages.length > 0);
  }, [newImages, existantImages, setHasImage]);

  useEffect(() => {
    if (reset) setNewImages([]);
  }, [reset]);

  const handleDelete = (filename) => {
    if (apiForDelete && confirm('Sûr de vouloir supprimer ?')) {
      fetch(`${apiForDelete}/${filename}`).then((res) => {
        if (res.ok) {
          const tab = existantImages.filter((f) => {
            return f !== filename;
          });
          setExistantImages(tab);
          toast('Image supprimée');
          mutate(apiToUpdate);
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
      <h4>Images :</h4>
      <div>
        {existantImages.length > 0 &&
          existantImages.map((filename) => (
            <div className={s.wrapper}>
              <div key={filename} className={s.imageContainer}>
                <Image
                  src={`${pathImage}/${filename}`}
                  alt="image"
                  layout="fill"
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
                  className={s.iconButton}
                  aria-label="Supprimer"
                >
                  <FiTrash2 />
                </button>
              )}
            </div>
          ))}
      </div>
      <FileUploader
        name="files"
        handleFiles={getAlbumPreview}
        isMultiple={true}
      />
      <div>
        {newImages.length > 0 &&
          newImages.map((src) => (
            <div key={src} className={s.wrapper}>
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
    </>
  );
}
