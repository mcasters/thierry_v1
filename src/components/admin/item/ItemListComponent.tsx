'use client';

import useSWR from 'swr';

import { Item } from '@/interfaces';
import RowItemListComponent from './RowItemListComponent';
import React from 'react';
import s from './ListComponent.module.css';

interface Props {
  type: string;
}
export default function ItemListComponent({ type }: Props) {
  const api = `/api/${type}`;
  const title = `Liste des ${type}s`;
  const { data: items, error } = useSWR(api, (apiURL: string) =>
    fetch(apiURL).then((res) => res.json()),
  );

  if (error) return <div>failed to load</div>;

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
