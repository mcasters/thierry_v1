'use client';

import useSWR from 'swr';

import { Item } from '@/interfaces';
import RowItemListComponent from './RowItemListComponent';
import React from 'react';
import s from './ListComponent.module.css';
import { PaintingFull } from '@/app/api/peinture/painting';
import { SculptureFull } from '@/app/api/sculpture/sculpture';

interface Props {
  type: string;
  items: PaintingFull[] | SculptureFull[];
}
export default function ItemListComponent({ type, items }: Props) {
  const title = `Liste des ${type}s`;

  return (
    <div className={s.listContainer}>
      <h2>{title}</h2>
      <div className={s.list}>
        {items &&
          items.map((item: Item) => {
            return <RowItemListComponent key={item.id} item={item} />;
          })}
      </div>
    </div>
  );
}
