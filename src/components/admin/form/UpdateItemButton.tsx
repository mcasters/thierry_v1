import { RxUpdate } from 'react-icons/rx';

import useModal from '@/components/admin/form/modal/useModal';
import Modal from '@/components/admin/form/modal/Modal';
import { Item } from '@/interfaces';
import ItemForm from '@/components/admin/form/ItemForm';
import s from './form.module.css';

type Props = {
  item: Item;
};
export default function UpdateItemButton({ item }: Props) {
  const { isOpen, toggle } = useModal();

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          toggle();
        }}
        className={s.iconButton}
        aria-label="Mise à jour"
      >
        <RxUpdate />
      </button>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ItemForm toggleModal={toggle} item={item} type={item.type} />
      </Modal>
    </>
  );
}
