'use client';

import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import { ContentFull } from '@/app/api/content/content';
import { Label } from '@prisma/client';
import ImagesForm from '@/components/admin/form/imageForm/ImagesForm';
import s from '../form.module.css';

interface Props {
  label: Label;
  content?: ContentFull;
  isTextArea: boolean;
  textLabel: string;
}
export default function ContentForm({
  label,
  content,
  isTextArea,
  textLabel,
}: Props) {
  const [text, setText] = useState<string>(content?.text || '');
  const [isChanged, setIsChanged] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef.current && confirm('Tu confirmes ?')) {
      const formData = new FormData(formRef.current);
      fetch('api/content/update', { method: 'POST', body: formData }).then(
        (res) => {
          if (res.ok) {
            toast('Contenu modifié');
            setIsChanged(false);
            router.refresh();
          } else toast("Erreur à l'enregistrement");
        },
      );
    }
  };

  return (
    <div className={s.formContainer}>
      <form ref={formRef} onSubmit={submit}>
        <input type="hidden" name="label" value={label} />
        {label === Label.SLIDER && <p className={s.sliderLabel}>Slider</p>}
        {!isTextArea && label !== Label.SLIDER && (
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
        {isTextArea && label !== Label.SLIDER && (
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
        {label === Label.SLIDER && (
          <ImagesForm
            images={content?.images}
            pathImage="/images/miscellaneous"
            apiForDelete="api/content/delete-image"
            isMultiple={true}
            setHasNewImages={setIsChanged}
          />
        )}
        {label === Label.PRESENTATION && (
          <ImagesForm
            images={content?.images}
            pathImage="/images/miscellaneous"
            apiForDelete="api/content/delete-image"
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
                router.refresh();
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
