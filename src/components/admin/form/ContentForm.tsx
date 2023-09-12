import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useSWRConfig } from 'swr';

import { Content } from '@/interfaces';
import s from './form.module.css';
import SingleImageForm from '@/components/admin/form/imageForm/SingleImageForm';

interface Props {
  content: Content;
}
export default function ContentForm({ content }: Props) {
  const formRef = useRef<HTMLFormElement>();
  const resetImageRef = useRef<number>(0);
  const { mutate } = useSWRConfig();
  const [title, setTitle] = useState<string>(content.title || '');
  const [text, setText] = useState<string>(content.text || '');

  const [hasImage, setHasImage] = useState<boolean>(false);
  const api = '/api/content/update';
  const apiToUpdate = '/api/content';

  const reset = () => {
    setTitle('');
    setText('');
    resetImageRef.current = resetImageRef.current + 1;
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef.current && confirm('Tu confirmes ?')) {
      const formData = new FormData(formRef.current);
      fetch(api, { method: 'POST', body: formData }).then((res) => {
        if (res.ok) {
          toast('contenu modifié');
          mutate(apiToUpdate);
        } else toast("Erreur à l'enregistrement");
      });
    }
  };

  return (
    <div className={s.formContainer}>
      <h2>Ajout/modification du contenu {content.label}</h2>
      <form ref={formRef} onSubmit={submit}>
        <input type="hidden" name="id" value={content.id} />
        <input
          autoFocus
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
              reset();
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
