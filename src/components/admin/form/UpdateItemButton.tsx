import { RxUpdate } from 'react-icons/rx';

import { CategoryPainting, CategorySculpture } from '@prisma/client';
import useModal from '@/components/admin/form/modal/useModal';
import Modal from '@/components/admin/form/modal/Modal';
import { PaintingFull, SculptureFull } from '@/interfaces';
import ItemForm from '@/components/admin/form/ItemForm';
import s from './form.module.css';
import CategoryForm from '@/components/admin/form/CategoryForm';

type Props = {
  item: PaintingFull | SculptureFull | CategoryPainting | CategorySculpture;
  type: string;
  isCategory: boolean;
};
export default function UpdateItemButton({ item, type, isCategory }: Props) {
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
        {isCategory ? (
          <CategoryForm item={item} type={type} toggleModal={toggle} />
        ) : (
          <ItemForm item={item} type={type} toggleModal={toggle} />
        )}
      </Modal>
    </>
  );
}
