import { Item } from '@/interfaces';
import s from './ListComponent.module.css';
import UpdateItemButton from '@/components/admin/item/UpdateItemButton';
import DeleteItemButton from '@/components/admin/item/DeleteItemButton';

interface Props {
  item: Item;
}

export default function RowItemListComponent({ item }: Props) {
  return (
    <ul className={s.item}>
      <li>
        <span className={s.name}>{item.title}</span>
      </li>
      <li>
        <UpdateItemButton item={item} />
      </li>
      <li>
        <DeleteItemButton id={item.id} type={item.type} />
      </li>
    </ul>
  );
}
