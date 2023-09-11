import { GrDocumentUpdate } from 'react-icons/gr';
import { FormEvent, useRef } from 'react';

import useModal from '@/components/admin/form/modal/useModal';
import Modal from '@/components/admin/form/modal/Modal';
import { Item } from '@/interfaces';
import AddItemForm from '@/components/admin/form/AddItemForm';
import { useSWRConfig } from 'swr';
import toast from 'react-hot-toast';
import s from './ListComponent.module.css';

type Props = {
  item: Item;
};
export default function UpdateItemButton({ item }: Props) {
  const form = useRef<HTMLFormElement>();
  const { isOpen, toggle } = useModal();
  const { mutate } = useSWRConfig();
  const api = `/api/${item.type}/update`;
  const apiToUpdate = `/api/${item.type}/update`;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.current && confirm('Tu confirmes ?')) {
      const formData = new FormData(form.current);
      fetch(api, { method: 'POST', body: formData }).then((res) => {
        if (res.ok) {
          toast(`${item.type} modifiée`);
          // mutate(apiToUpdate);
        } else toast("Erreur à l'enregistrement");
      });
    }
  };

  return (
    <>
      <button
        onClick={() => toggle()}
        className={s.iconButton}
        aria-label="Mise à jour"
      >
        <GrDocumentUpdate />
      </button>
      <Modal isOpen={isOpen} toggle={toggle}>
        <AddItemForm
          formRef={form}
          onSubmit={handleSubmit}
          item={item}
          type={item.type}
        />
      </Modal>
    </>
  );
}
