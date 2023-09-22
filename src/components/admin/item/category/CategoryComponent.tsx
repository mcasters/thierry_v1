import useSWR from 'swr';

import CategoryListComponent from '@/components/admin/item/category/CategoryListComponent';
import CategoryForm from '@/components/admin/form/CategoryForm';
import s from '../ListComponent.module.css';

interface Props {
  type: string;
}
export default function CategoryComponent({ type }: Props) {
  const title = 'Gestion des catégories';

  return (
    <div className={s.listContainer}>
      <h2>{title}</h2>
      <CategoryListComponent type={type} />
      <CategoryForm type={type} />
    </div>
  );
}
