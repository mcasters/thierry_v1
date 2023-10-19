'use client';

import React, {useRef, useState} from 'react';
import toast from 'react-hot-toast';
import {useRouter} from 'next/navigation';

import s from '../form.module.css';
import {PaintingCategory, SculptureCategory} from '@prisma/client';

interface Props {
  category?: PaintingCategory | SculptureCategory;
  type: string;
  toggleModal?: () => void;
}
export default function CategoryForm({ category, type, toggleModal }: Props) {
  const [text, setText] = useState<string>(category?.value || '');
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const api = category
    ? `api/${type}/category/update`
    : `api/${type}/category/add`;
  const title = category ? 'Modifier une catégorie' : 'Ajouter une catégorie';

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef.current && confirm('Tu confirmes ?')) {
      const formData = new FormData(formRef.current);
      fetch(api, { method: 'POST', body: formData }).then((res) => {
        if (res.ok) {
          toast(category ? 'Catégorie modifiée' : 'Catégorie ajoutée');
          toggleModal ? toggleModal() : setText('');
          router.refresh();
        } else toast("Erreur à l'enregistrement");
      });
    }
  };
  return (
    <div className={s.formContainer}>
      <h4>{title}</h4>
      <form ref={formRef} onSubmit={submit}>
        {category && <input type="hidden" name="id" value={category.id} />}
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
            toggleModal ? toggleModal() : setText('');
          }}
        >
          Annuler
        </button>
      </form>
    </div>
  );
}
