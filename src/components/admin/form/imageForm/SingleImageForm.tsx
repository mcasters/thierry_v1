import React, { useState } from 'react';
import Image from 'next/image';
import { FiTrash2 } from 'react-icons/fi';

import { Item } from '@/interfaces';
import { getDirnameFromNameOrTitle, getPath } from '@/utils/common';
import s from '@/components/admin/form/form.module.css';
import { FileUploader } from '@/components/admin/form/FileUploader';

type Props = {
  item: Item | null;
};

export default function SingleImageForm({ item }: Props) {
  const [newImage, setNewImage] = useState<string>('');
  const [existantImage, setExistantImage] = useState<string>(() =>
    item ? item.image.filename : '',
  );
  const path = item !== null ? `/images/${item.type}` : undefined;

  const deleteFile = () => {
    setExistantImage('');
  };

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
        <>
          <Image
            src={`${path}/${existantImage}`}
            alt="image"
            width={100}
            height={100}
          />
          <button onClick={deleteFile} className={s.trash}>
            <FiTrash2 />
          </button>
        </>
      )}
      <input type="hidden" name="existentFile" value={existantImage} />
      <FileUploader name="file" handleFile={getPreview} isMultiple={false} />
      {newImage !== '' && (
        <div>
          <Image src={newImage} alt="image" width={100} height={100} />
        </div>
      )}
    </>
  );
}
