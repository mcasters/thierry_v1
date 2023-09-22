import useSWR from 'swr';

import { CategoryPaintingFull, CategorySculptureFull } from '@/interfaces';
import RowCategoryListComponent from './RowCategoryListComponent';
import React from 'react';
import s from '../ListComponent.module.css';

interface Props {
  type: string;
}
export default function CategoryListComponent({ type }: Props) {
  const title = 'Liste des catégories';
  const api = `/api/${type}/category`;
  const { data: categories } = useSWR(api, (apiURL: string) =>
    fetch(apiURL).then((res) => res.json()),
  );

  return (
    <div className={s.listContainer}>
      <h4>{title}</h4>
      <div className={s.list}>
        {categories &&
          categories.map(
            (category: CategorySculptureFull | CategoryPaintingFull) => {
              return (
                <RowCategoryListComponent
                  key={category.id}
                  category={category}
                  type={type}
                />
              );
            },
          )}
      </div>
    </div>
  );
}
