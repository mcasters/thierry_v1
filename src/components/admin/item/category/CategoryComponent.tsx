"use client";

import CategoryListComponent from "@/components/admin/item/category/CategoryListComponent";
import CategoryForm from "@/components/admin/form/CategoryForm";
import s from "../../../../styles/admin/AdminList.module.css";
import { PaintingCategoryFull } from "@/app/api/peinture/category/category";
import { SculptureCategoryFull } from "@/app/api/sculpture/category/category";

interface Props {
  type: string;
  categories: PaintingCategoryFull[] | SculptureCategoryFull[];
}
export default function CategoryComponent({ type, categories }: Props) {
  const title = "Gestion des catégories";

  return (
    <div className={s.listContainer}>
      <h2>{title}</h2>
      <CategoryListComponent type={type} categories={categories} />
      <CategoryForm type={type} />
    </div>
  );
}
