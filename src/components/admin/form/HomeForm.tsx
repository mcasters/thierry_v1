import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Label } from '@prisma/client';
import { useRouter } from 'next/router';

import s from './form.module.css';
import SingleImageForm from '@/components/admin/form/imageForm/SingleImageForm';
import { Content } from '@/interfaces';
import { useSWRConfig } from 'swr';

interface Props {
  content?: Content;
  label: Label;
  toggleModal: () => void;
}
export default function HomeForm({ content, label, toggleModal }: Props) {
  const formRef = useRef<HTMLFormElement>();
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

  const cancel = (e) => {};

  return (
    <div className={s.homeFormContainer}>
      <h2>{label}</h2>
      <form ref={formRef} onSubmit={submit}>
        <input type="hidden" name="label" value={label} />
        <input
          autoFocus={label === Label.HOME_1}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre (facultatif)"
          name="title"
          type="text"
          value={title}
          required
        />
        <textarea
          onChange={(e) => setText(e.target.value)}
          placeholder="Texte"
          name="text"
          rows={10}
          value={text}
        />
        <SingleImageForm
          existantImageSrc={
            content ? `/images/miscellaneous/${content.filename}` : undefined
          }
          setHasImage={setHasImage}
          reset={resetImageRef.current}
        />
        <div>
          <div className={s.separate}></div>
          <input
            disabled={!text || !hasImage}
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
