import React, { MutableRefObject, useRef } from 'react';
import toast from 'react-hot-toast';

import { useSWRConfig } from 'swr';
import ItemForm from '@/components/admin/form/ItemForm';

interface Props {
  type: string;
}
export default function AddItemComponent({ type }: Props) {
  const form = useRef<HTMLFormElement>();
  const { mutate } = useSWRConfig();
  const api = `/api/${type}/add`;
  // const apiToUpdate = `/api/${type}`;

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.current && confirm('Tu confirmes ?')) {
      const formData = new FormData(form.current);
      fetch(api, { method: 'POST', body: formData }).then((res) => {
        if (res.ok) {
          toast(`${type} ajoutée`);
          // mutate(apiToUpdate);
          form.current?.reset();
        } else toast("Erreur à l'enregistrement");
      });
    }
  };

  return <ItemForm formRef={form} onSubmit={submit} type={type} />;
}
