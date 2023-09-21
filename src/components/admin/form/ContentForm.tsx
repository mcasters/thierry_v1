import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useSWRConfig } from 'swr';

import { Label } from '@prisma/client';
import { Content } from '@/interfaces';
import s from './form.module.css';
import ImagesForm from '@/components/admin/form/imageForm/ImagesForm';

interface Props {
  content: Content;
  isTextArea: boolean;
  label: Label;
  textLabel: string;
  withImage: boolean;
}
export default function ContentForm({
  content,
  isTextArea,
  label,
  textLabel,
  withImage,
}: Props) {
  const [text, setText] = useState<string>(content?.text || '');
  const [isChanged, setIsChanged] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { mutate } = useSWRConfig();

  const api = '/api/content/update';
  const apiToUpdate = '/api/content';

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef.current && confirm('Tu confirmes ?')) {
      const formData = new FormData(formRef.current);
      fetch(api, { method: 'POST', body: formData }).then((res) => {
        if (res.ok) {
          toast('Contenu modifié');
          setIsChanged(false);
          mutate(apiToUpdate);
        } else toast("Erreur à l'enregistrement");
      });
    }
  };

  return (
    <div className={s.formContainer}>
      <form ref={formRef} onSubmit={submit}>
        <input type="hidden" name="label" value={label} />
        {!isTextArea && (
          <label>
            {textLabel}
            <input
              placeholder={label}
              name="text"
              type="text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setIsChanged(true);
              }}
            />
          </label>
        )}
        {isTextArea && (
          <label>
            {textLabel}
            <textarea
              placeholder={label}
              name="text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setIsChanged(true);
              }}
            />
          </label>
        )}
        {withImage && (
          <ImagesForm
            images={content?.images}
            pathImage="/images/miscellaneous"
            apiForDelete="/api/content/delete-image-slider"
            isMultiple={false}
          />
        )}
        {isChanged && (
          <>
            <button className="adminButton" type="submit">
              OK
            </button>
            <button
              className="adminButton"
              onClick={(e) => {
                e.preventDefault();
                mutate(apiToUpdate);
                setIsChanged(false);
              }}
            >
              Annuler
            </button>
          </>
        )}
      </form>
    </div>
  );
}
