import useSWR from 'swr';

import RowCategoryListComponent from './RowCategoryListComponent';
import React from 'react';
import s from '../ListComponent.module.css';
import { CategoryPainting, CategorySculpture } from '@prisma/client';

interface Props {
  type: string;
}
export default function CategoryListComponent({ type }: Props) {
  const api = `/api/${type}/category`;
  const title = 'Liste des catégories';
  const { data: categories } = useSWR(api, (apiURL: string) =>
    fetch(apiURL).then((res) => res.json()),
  );

  return (
    <div className={s.listContainer}>
      <h4>{title}</h4>
      <div className={s.list}>
        {categories &&
          categories.map((category: CategorySculpture | CategoryPainting) => {
            return (
              <RowCategoryListComponent
                key={category.id}
                category={category}
                type={type}
              />
            );
          })}
      </div>
    </div>
  );
}
