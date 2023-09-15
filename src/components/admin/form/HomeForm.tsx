import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import useSWR, { useSWRConfig } from 'swr';
import { Label } from '@prisma/client';

import s from './form.module.css';
import SingleImageForm from '@/components/admin/form/imageForm/SingleImageForm';

interface Props {
  label: Label;
}
export default function HomeForm({ label }: Props) {
  const api = `/api/home/${label}`;
  const apiToUpdate = '/api/home/update';
  const { data: content, error } = useSWR(api, (apiURL: string) =>
    fetch(apiURL).then((res) => res.json()),
  );
  const formRef = useRef<HTMLFormElement>();
  const resetImageRef = useRef<number>(0);
  const { mutate } = useSWRConfig();

  const [title, setTitle] = useState<string>(content?.title || '');
  const [text, setText] = useState<string>(content?.text || '');
  const [hasImage, setHasImage] = useState<boolean>(false);

  useEffect(() => {
    if (content) {
      setTitle(content.title);
      setText(content.text);
    }
  }, [content]);

  const resetNewImage = () => {
    resetImageRef.current = resetImageRef.current + 1;
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef.current && confirm('Tu confirmes ?')) {
      const formData = new FormData(formRef.current);
      fetch(apiToUpdate, { method: 'POST', body: formData }).then((res) => {
        if (res.ok) {
          toast('contenu modifié');
          mutate(api);
          resetNewImage();
        } else toast("Erreur à l'enregistrement");
      });
    }
  };

  if (error) return <div>failed to load</div>;

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
          <input
            disabled={!text || !hasImage}
            type="submit"
            value="Enregistrer"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              resetNewImage();
              mutate(api);
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
