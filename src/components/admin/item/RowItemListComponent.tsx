import Image from 'next/legacy/image';

import DeleteButton from '@/components/admin/form/DeleteButton';
import UpdateButton from '@/components/admin/form/UpdateButton';
import { Item } from '@/interfaces';
import { TYPE } from '@/constants';
import s from './ListComponent.module.css';
import { PaintingCategoryFull } from '@/app/api/peinture/category/category';
import { SculptureCategoryFull } from '@/app/api/sculpture/category/category';

interface Props {
  item: Item;
  categories: PaintingCategoryFull[] | SculptureCategoryFull[];
}

export default function RowItemListComponent({ item, categories }: Props) {
  const src =
    item.type === TYPE.SCULPTURE
      ? `/images/${item.type}/${item.images[0].filename}`
      : `/images/${item.type}/${item.image.filename}`;
  return (
    <ul className={s.item}>
      <li className={s.itemTitle}>
        <span className={s.name}>{item.title}</span>
      </li>
      <li className={s.itemImage}>
        <Image src={src} alt="image" height={50} width={50} />
      </li>
      <li className={s.itemIcon}>
        <UpdateButton item={item} type={item.type} categories={categories} />
      </li>
      <li className={s.itemIcon}>
        <DeleteButton
          api={`api/${item.type}/delete/${item.id}`}
          apiToUpdate={`api/${item.type}`}
        />
      </li>
    </ul>
  );
}
