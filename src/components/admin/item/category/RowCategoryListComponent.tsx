import DeleteButton from '@/components/admin/form/DeleteButton';
import UpdateItemButton from '@/components/admin/form/UpdateItemButton';
import { TYPE } from '@/constants';
import s from '../ListComponent.module.css';
import { SculptureCategoryFull } from '@/app/api/sculpture/category/category';
import { PaintingCategoryFull } from '@/app/api/peinture/category/category';

interface Props {
  category: SculptureCategoryFull | PaintingCategoryFull;
  type: string;
}

export default function RowCategoryListComponent({ category, type }: Props) {
  return (
    <ul className={s.item}>
      <li className={s.itemTitle}>
        <span className={s.name}>{category.value}</span>
      </li>
      <li className={s.itemInfo}>
        <span>
          {type === TYPE.SCULPTURE
            ? category.sculptures.length
            : category.paintings.length}{' '}
          {type}(s)
        </span>
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
