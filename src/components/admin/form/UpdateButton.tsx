'use client';

import { GrUpdate } from '@react-icons/all-files/gr/GrUpdate';

import { PaintingCategory, SculptureCategory } from '@prisma/client';
import useModal from '@/components/admin/form/modal/useModal';
import Modal from '@/components/admin/form/modal/Modal';
import ItemForm from '@/components/admin/form/ItemForm';
import CategoryForm from '@/components/admin/form/CategoryForm';
import { SculptureFull } from '@/app/api/sculpture/sculpture';
import { PaintingFull } from '@/app/api/peinture/painting';
import { PaintingCategoryFull } from '@/app/api/peinture/category/category';
import { SculptureCategoryFull } from '@/app/api/sculpture/category/category';
import PostForm from '@/components/admin/form/PostForm';
import { PostFull } from '@/app/api/post/post';
import {
  isPaintingFull,
  isPostFull,
  isSculptureFull,
} from '@/utils/commonUtils';

type Props = {
  item:
    | PaintingFull
    | SculptureFull
    | PaintingCategory
    | SculptureCategory
    | PostFull;
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
        <GrUpdate />
      </button>
      <Modal isOpen={isOpen} toggle={toggle}>
        {isPaintingFull(item) || isSculptureFull(item) ? (
          <ItemForm item={item} toggleModal={toggle} categories={categories} />
        ) : isPostFull(item) ? (
          <PostForm post={item} toggleModal={toggle} />
        ) : (
          <CategoryForm category={item} type={type} toggleModal={toggle} />
        )}
      </Modal>
    </>
  );
}
