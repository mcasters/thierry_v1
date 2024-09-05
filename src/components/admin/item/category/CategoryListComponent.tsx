"use client";

import RowCategoryListComponent from "./RowCategoryListComponent";
import React from "react";
import s from "../../../../styles/admin/AdminListComponent.module.css";
import { SculptureCategoryFull } from "@/app/api/sculpture/category/category";
import { PaintingCategoryFull } from "@/app/api/peinture/category/category";

interface Props {
  type: string;
  categories: PaintingCategoryFull[] | SculptureCategoryFull[];
}
export default function CategoryListComponent({ type, categories }: Props) {
  const title = "Liste des catégories";
  const message = `Une catégorie ne peut être supprimée que lorsqu'il n'y a pas ou plus de ${type} qui y est classée.`;

  return (
    <div className={s.listContainer}>
      <h4>{title}</h4>
      <div className={s.list}>
        {categories.map(
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
