import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Label } from '@prisma/client';

import SingleItemImageForm from '@/components/admin/form/imageForm/SingleItemImageForm';
import { Content } from '@/interfaces';
import { useSWRConfig } from 'swr';
import s from './form.module.css';
import ImagesForm from '@/components/admin/form/imageForm/ImagesForm';

interface Props {
  content?: Content;
  label: Label;
  toggleModal: () => void;
}
export default function HomeForm({ content, label, toggleModal }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const { mutate } = useSWRConfig();
  const [text, setText] = useState<string>(content?.text || '');
  const api = '/api/home/update';
  const apiToUpdate = '/api/home';

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef.current && confirm('Tu confirmes ?')) {
      const formData = new FormData(formRef.current);
      fetch(api, { method: 'POST', body: formData }).then((res) => {
        if (res.ok) {
          toast('Contenu modifié');
          toggleModal();
          mutate(apiToUpdate);
        } else toast("Erreur à l'enregistrement");
      });
    }
  };

  return (
    <div className={s.formContainer}>
      <h2 className={s.titleForm}>{label}</h2>
      <form ref={formRef} onSubmit={submit}>
        <input type="hidden" name="label" value={label} />
        {label === Label.INTRO && (
          <textarea
            autoFocus={label === Label.INTRO}
            onChange={(e) => setText(e.target.value)}
            placeholder="Texte"
            name="text"
            rows={10}
            value={text}
            required
          />
        )}
        {label === Label.SLIDER && (
          <ImagesForm
            images={content?.images}
            isMultiple={true}
            dir="/images/miscellaneous"
          />
        )}
        {label !== Label.INTRO && <div className="separate"></div>}
        <input type="submit" value="Enregistrer" />
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleModal();
          }}
          className="adminButton"
        >
          Annuler
        </button>
      </form>
    </div>
  );
}
