import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Label } from '@prisma/client';

import SingleImageForm from '@/components/admin/form/imageForm/SingleImageForm';
import { Content } from '@/interfaces';
import { useSWRConfig } from 'swr';
import s from './form.module.css';

interface Props {
  content?: Content;
  label: Label;
  toggleModal: () => void;
}
export default function HomeForm({ content, label, toggleModal }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const resetImageRef = useRef<number>(0);
  const api = '/api/home/update';
  const apiToUpdate = '/api/home';
  const { mutate } = useSWRConfig();

  const [title, setTitle] = useState<string>(content?.title || '');
  const [text, setText] = useState<string>(content?.text || '');
  const [hasImage, setHasImage] = useState<boolean>(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef.current && confirm('Tu confirmes ?')) {
      const formData = new FormData(formRef.current);
      fetch(api, { method: 'POST', body: formData }).then((res) => {
        if (res.ok) {
          toast('contenu modifié');
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
        {label !== Label.INTRO && (
          <input
            autoFocus={label === Label.HOME_1}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre (facultatif)"
            name="title"
            type="text"
            value={title}
          />
        )}
        <textarea
          autoFocus={label === Label.INTRO}
          onChange={(e) => setText(e.target.value)}
          placeholder="Texte"
          name="text"
          rows={10}
          value={text}
          required
        />
        {label !== Label.INTRO && (
          <SingleImageForm
            existantImageSrc={
              content ? `/images/miscellaneous/${content.filename}` : undefined
            }
            setHasImage={setHasImage}
            reset={resetImageRef.current}
          />
        )}
        <div>
          {label !== Label.INTRO && <div className="separate"></div>}
          <input
            disabled={label === Label.INTRO ? !text : !text || !hasImage}
            type="submit"
            value="Enregistrer"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleModal();
            }}
            className="adminButton"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
