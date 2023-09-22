import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useSWRConfig } from 'swr';

import s from './form.module.css';
import { CategoryPainting, CategorySculpture } from '@prisma/client';

interface Props {
  category?: CategoryPainting | CategorySculpture | null;
  type: string;
  toggleModal?: () => void;
}
export default function CategoryForm({ category, type, toggleModal }: Props) {
  const [text, setText] = useState<string>(category?.value || '');
  const formRef = useRef<HTMLFormElement>(null);
  const { mutate } = useSWRConfig();
  const api = category
    ? `/api/${type}/category/update`
    : `/api/${type}/category/add`;
  const apiToUpdate = `/api/${type}/category`;

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef.current && confirm('Tu confirmes ?')) {
      const formData = new FormData(formRef.current);
      fetch(api, { method: 'POST', body: formData }).then((res) => {
        if (res.ok) {
          toast(category ? 'Catégorie modifiée' : 'Catégorie ajoutée');
          toggleModal ? toggleModal() : reset();
          mutate(apiToUpdate);
        } else toast("Erreur à l'enregistrement");
      });
    }
  };

  const reset = () => {
    setText('');
  };

  return (
    <div className={s.formContainer}>
      <h4>Ajouter une catégorie</h4>
      <form ref={formRef} onSubmit={submit}>
        <input
          placeholder="catégorie"
          name="text"
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button className="adminButton" type="submit">
          OK
        </button>
        <button
          className="adminButton"
          onClick={(e) => {
            e.preventDefault();
            toggleModal ? toggleModal() : reset();
          }}
        >
          Annuler
        </button>
      </form>
    </div>
  );
}
