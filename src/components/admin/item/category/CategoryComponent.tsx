import useSWR from 'swr';

import { Item } from '@/interfaces';
import RowItemListComponent from '../RowItemListComponent';
import React from 'react';
import s from '../ListComponent.module.css';
import { CategoryPainting } from '@prisma/client';
import CategoryListComponent from '@/components/admin/item/category/CategoryListComponent';
import CategoryForm from '@/components/admin/form/CategoryForm';

interface Props {
  type: string;
}
export default function CategoryComponent({ type }: Props) {
  const api = `/api/${type}/category`;
  const title = 'Gestion des catégories';
  const { data: categories } = useSWR(api, (apiURL: string) =>
    fetch(apiURL).then((res) => res.json()),
  );

  return (
    <div className={s.listContainer}>
      <h2>{title}</h2>
      <CategoryListComponent type={type} />
      <CategoryForm type={type} />

      {/*<label htmlFor="category">Catégorie (facultatif) :</label>*/}
      {/*<select name="category" id="category">*/}
      {/*  <option value="">--Please choose an option--</option>*/}
      {/*  {categories.map((cat: CategoryPainting) => (*/}
      {/*    <option key={cat.key} value={cat.key}>*/}
      {/*      {cat.value}*/}
      {/*    </option>*/}
      {/*  ))}*/}
      {/*</select>*/}
    </div>
  );
}
