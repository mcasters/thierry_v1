import Layout from '@/components/layout-components/Layout';
import AdminNav from '@/components/layout-components/AdminNav';
import { TYPE } from '@/constants';
import ItemListComponent from '@/components/admin/item/ItemListComponent';
import ItemForm from '@/components/admin/form/ItemForm';
import s from '@/styles/admin.module.css';
import CategoryComponent from '@/components/admin/item/category/CategoryComponent';

export default function Peintures() {
  return (
    <>
      <AdminNav />
      <div className={s.adminWrapper}>
        <ItemListComponent type={TYPE.PAINTING} />
        <ItemForm type={TYPE.PAINTING} />
        <CategoryComponent type={TYPE.PAINTING} />
      </div>
    </>
  );
}
