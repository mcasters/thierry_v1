import AdminNav from '@/components/layout-components/AdminNav';
import { TYPE } from '@/constants';
import ItemListComponent from '@/components/admin/item/ItemListComponent';
import ItemForm from '@/components/admin/form/ItemForm';
import s from '@/styles/admin.module.css';
import CategoryComponent from '@/components/admin/item/category/CategoryComponent';
import { getSculpturesFull } from '@/app/api/sculpture/getSculptures';
import { getSculptureCategoriesFull } from '@/app/api/sculpture/category/getCategories';

export default async function Sculptures() {
  const sculptures = await getSculpturesFull();
  const categories = await getSculptureCategoriesFull();

  return (
    <>
      <AdminNav />
      <div className={s.adminWrapper}>
        <ItemListComponent
          type={TYPE.SCULPTURE}
          items={sculptures}
          categories={categories}
        />
        <ItemForm type={TYPE.SCULPTURE} categories={categories} />
        <CategoryComponent type={TYPE.SCULPTURE} categories={categories} />
      </div>
    </>
  );
}
