import { CategoryPainting, CategorySculpture } from '@prisma/client';
import DeleteButton from '@/components/admin/form/DeleteButton';
import UpdateItemButton from '@/components/admin/form/UpdateItemButton';
import { TYPE } from '@/constants';
import s from '../ListComponent.module.css';
import { CategoryPaintingFull } from '@/interfaces';

interface Props {
  category: CategorySculpture | CategoryPaintingFull;
  type: string;
}

export default function RowCategoryListComponent({ category, type }: Props) {
  console.log(category);
  return (
    <ul className={s.item}>
      <li className={s.itemTitle}>
        <span className={s.name}>{category.value}</span>
      </li>
      <li className={s.itemInfo}>
        <span>
          (
          {type === TYPE.SCULPTURE
            ? category.sculptures.length
            : category.paintings.length}{' '}
          items)
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
