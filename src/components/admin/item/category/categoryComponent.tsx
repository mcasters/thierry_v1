"use client";

import RowCategoryListComponent from "./rowCategoryListComponent";
import React from "react";
import s from "@/components/admin/adminList.module.css";
import style from "@/components/admin/admin.module.css";
import { Category, ItemFull, Type } from "@/lib/type";
import AddUpdateCategoryButton from "@/components/admin/form/category/addUpdateCategoryButton";
import { getEmptyCategory } from "@/utils/commonUtils";

interface Props {
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING;
  categories: Category[];
  items: ItemFull[];
}
export default function CategoryComponent({ type, categories, items }: Props) {
  const message = `Une catégorie ne peut être supprimée que lorsqu'il n'y a pas ou plus de ${type} qui y est classée.`;

  return (
    <div className={style.container}>
      <h2 className={style.title2}>Gestion des catégories</h2>
      <div className={`${s.categoryListWrapper} area`}>
        {categories.map((category) => {
          let itemTab;
          if (category.key === "no-category")
            itemTab = items.filter((item) => item.categoryId === null);
          else
            itemTab = items.filter((item) => item.categoryId === category.id);
          return (
            <RowCategoryListComponent
              key={category.id}
              category={category}
              items={itemTab}
              type={type}
            />
          );
        })}
      </div>
      <h5>{message}</h5>
      <AddUpdateCategoryButton
        category={getEmptyCategory()}
        items={items}
        type={type}
      />
    </div>
  );
}
