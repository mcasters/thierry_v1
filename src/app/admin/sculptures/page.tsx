import { TYPE } from '@/constants';
import ItemListComponent from '@/components/admin/item/ItemListComponent';
import ItemForm from '@/components/admin/form/ItemForm';
import CategoryComponent from '@/components/admin/item/category/CategoryComponent';
import { getSculpturesFull } from '@/app/api/sculpture/getSculptures';
import { getSculptureCategoriesFull } from '@/app/api/sculpture/category/getCategories';
import { getEmptySculpture } from '@/utils/commonUtils';

export default async function Sculptures() {
  const sculptures = await getSculpturesFull();
  const categories = await getSculptureCategoriesFull();

  return (
    <>
      <ItemListComponent
        type={TYPE.SCULPTURE}
        items={sculptures}
        categories={categories}
      />
      <ItemForm item={getEmptySculpture()} categories={categories} />
      <CategoryComponent type={TYPE.SCULPTURE} categories={categories} />
    </>
  );
}
