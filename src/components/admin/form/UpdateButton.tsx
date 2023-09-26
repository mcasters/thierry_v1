import { RxUpdate } from 'react-icons/rx';

import { PaintingCategory, SculptureCategory } from '@prisma/client';
import useModal from '@/components/admin/form/modal/useModal';
import Modal from '@/components/admin/form/modal/Modal';
import ItemForm from '@/components/admin/form/ItemForm';
import CategoryForm from '@/components/admin/form/CategoryForm';
import { SculptureFull } from '@/app/api/sculpture/sculpture';
import { PaintingFull } from '@/app/api/peinture/painting';
import { PaintingCategoryFull } from '@/app/api/peinture/category/category';
import { SculptureCategoryFull } from '@/app/api/sculpture/category/category';
import { ca } from 'date-fns/locale';

type Props = {
  item: PaintingFull | SculptureFull | PaintingCategory | SculptureCategory;
  type: string;
  categories?: PaintingCategoryFull[] | SculptureCategoryFull[];
};
export default function UpdateButton({ item, type, categories }: Props) {
  const { isOpen, toggle } = useModal();

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          toggle();
        }}
        className="iconButton"
        aria-label="Mise à jour"
      >
        <RxUpdate />
      </button>
      <Modal isOpen={isOpen} toggle={toggle}>
        {categories ? (
          <ItemForm
            item={item}
            type={type}
            toggleModal={toggle}
            categories={categories}
          />
        ) : (
          <CategoryForm category={item} type={type} toggleModal={toggle} />
        )}
      </Modal>
    </>
  );
}
