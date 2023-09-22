import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useSWRConfig } from 'swr';

import { Label } from '@prisma/client';
import ImagesForm from '@/components/admin/form/imageForm/ImagesForm';
import { ContentFull } from '@/interfaces';
import s from './form.module.css';

interface Props {
  label: Label;
  content?: ContentFull;
  isTextArea: boolean;
  textLabel: string;
  withImage: boolean;
}
export default function ContentForm({
  label,
  content,
  isTextArea,
  textLabel,
  withImage,
}: Props) {
  const [text, setText] = useState<string>(content?.text || '');
  const [isChanged, setIsChanged] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { mutate } = useSWRConfig();
  const withoutText = label === Label.SLIDER;

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef.current && confirm('Tu confirmes ?')) {
      const formData = new FormData(formRef.current);
      fetch('/api/content/update', { method: 'POST', body: formData }).then(
        (res) => {
          if (res.ok) {
            toast('Contenu modifié');
            setIsChanged(false);
            mutate('/api/content');
          } else toast("Erreur à l'enregistrement");
        },
      );
    }
  };

  return (
    <div className={s.formContainer}>
      <form ref={formRef} onSubmit={submit}>
        <input type="hidden" name="label" value={label} />
        {withoutText && <p className={s.sliderLabel}>Slider</p>}
        {!isTextArea && !withoutText && (
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
        {isTextArea && !withoutText && (
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
            apiForDelete="/api/content/delete-content-image"
            isMultiple={false}
            setHasNewImages={setIsChanged}
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
                mutate('/api/content');
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
