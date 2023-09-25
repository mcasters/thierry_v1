import useSWR from 'swr';

import RowCategoryListComponent from './RowCategoryListComponent';
import React from 'react';
import s from '../ListComponent.module.css';
import { SculptureCategoryFull } from '@/app/api/sculpture/categories/category';
import { PaintingCategoryFull } from '@/app/api/peinture/categories/category';

interface Props {
  type: string;
}
export default function CategoryListComponent({ type }: Props) {
  const title = 'Liste des catégories';
  const api = `/api/${type}/category`;
  const { data: categories } = useSWR(api, (apiURL: string) =>
    fetch(apiURL).then((res) => res.json()),
  );
  const message = `Une catégorie ne peut être supprimée que lorsqu'il n'y a pas ou plus de ${type} qui y est classée.`;

  return (
    <div className={s.listContainer}>
      <h4>{title}</h4>
      <div className={s.list}>
        {categories &&
          categories.map(
            (category: SculptureCategoryFull | PaintingCategoryFull) => {
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
      <p>{message}</p>
    </div>
  );
}
