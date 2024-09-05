"use client";

import RowItemListComponent from "./RowItemListComponent";
import React from "react";
import s from "../../../styles/admin/AdminListComponent.module.css";
import { PaintingFull } from "@/app/api/peinture/painting";
import { SculptureFull } from "@/app/api/sculpture/sculpture";
import { PaintingCategoryFull } from "@/app/api/peinture/category/category";
import { SculptureCategoryFull } from "@/app/api/sculpture/category/category";

interface Props {
  type: string;
  items: PaintingFull[] | SculptureFull[];
  categories: PaintingCategoryFull[] | SculptureCategoryFull[];
}
export default function ItemListComponent({ type, items, categories }: Props) {
  const title = `Liste des ${type}s`;

  return (
    <div className={s.listContainer}>
      <h2>{title}</h2>
      <div className={s.list}>
        {items &&
          items.map((item: PaintingFull | SculptureFull) => {
            return (
              <RowItemListComponent
                key={item.id}
                item={item}
                categories={categories}
              />
            );
          })}
      </div>
    </div>
  );
}
