import { CategoryPainting, CategorySculpture } from '@prisma/client';
import DeleteButton from '@/components/admin/form/DeleteButton';
import UpdateItemButton from '@/components/admin/form/UpdateItemButton';
import s from '../ListComponent.module.css';

interface Props {
  category: CategorySculpture | CategoryPainting;
  type: string;
}

export default function RowCategoryListComponent({ category, type }: Props) {
  return (
    <ul className={s.item}>
      <li className={s.itemTitle}>
        <span className={s.name}>{category.value}</span>
      </li>
      <li className={s.itemIcon}>
        <UpdateItemButton item={category} type={type} isCategory={true} />
      </li>
      <li className={s.itemIcon}>
        <DeleteButton
          api={`/api/${type}/category/delete/${category.id}`}
          apiToUpdate={`/api/${type}/category`}
        />
      </li>
    </ul>
  );
}
