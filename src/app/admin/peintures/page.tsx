import { TYPE } from '@/constants';
import ItemListComponent from '@/components/admin/item/ItemListComponent';
import ItemForm from '@/components/admin/form/ItemForm';
import CategoryComponent from '@/components/admin/item/category/CategoryComponent';
import { getPaintingsFull } from '@/app/api/peinture/getPaintings';
import { getPaintingCategoriesFull } from '@/app/api/peinture/category/getCategories';

export default async function Peintures() {
  const paintings = await getPaintingsFull();
  const categories = await getPaintingCategoriesFull();
  return (
    <>
      <ItemListComponent
        type={TYPE.PAINTING}
        items={paintings}
        categories={categories}
      />
      <ItemForm type={TYPE.PAINTING} categories={categories} />
      <CategoryComponent type={TYPE.PAINTING} categories={categories} />
    </>
  );
}
