import { Item } from '@/interfaces';
import s from './ListComponent.module.css';
import UpdateItemButton from '@/components/admin/item/UpdateItemButton';
import DeleteItemButton from '@/components/admin/item/DeleteItemButton';
import Image from 'next/image';
import React from 'react';

interface Props {
  item: Item;
}

export default function RowItemListComponent({ item }: Props) {
  return (
    <ul className={s.item}>
      <li className={s.itemTitle}>
        <span className={s.name}>{item.title}</span>
      </li>
      <li className={s.itemImage}>
        <Image
          src={`/images/${item.type}/${item.image.filename}`}
          alt="image"
          height={50}
          width={50}
        />
      </li>
      <li className={s.itemIcon}>
        <UpdateItemButton item={item} />
      </li>
      <li className={s.itemIcon}>
        <DeleteItemButton id={item.id} type={item.type} />
      </li>
    </ul>
  );
}
